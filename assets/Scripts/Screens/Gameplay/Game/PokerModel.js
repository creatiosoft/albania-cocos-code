var login = require('PostTypes').Login;
var leaveData = require('PostTypes').LeaveData;
var addChipsData = require('PostTypes').AddChipsData;
var connectAckData = require('PostTypes').ConnectAckData;
var sitOutData = require('PostTypes').SitOutData;
var ResetSitoutData = require('PostTypes').ResetSitout;
var SetPlayerValData = require('PostTypes').SetPlayerValData;
var GetNote = require('PostTypes').GetNote;
var ReplayData = require('PostTypes').ReplayData;
var emitter = require('EventEmitter');
var changeAvatar = require('ResponseTypes').changeAvatar;
var card = require('CardTypes').Card;
var suit = require('CardTypes').Suit;
var Queue = require('Queue.src');
var PopUpType = require('PopUpManager').PopUpType;


/**
 * @description Possible ways a player can sitout
 * @enum {Number}
 * @memberof Screens.Gameplay.Game.PokerModel#
 */
var SitOutMode = cc.Enum({
    SitOutNextHand: 1,
    SitOueNextBB: 2,
    None: -1,
});

/**
 * @classdesc Handles active poker game
 * @class PokerModel
 * @extends EventEmitter
 * @memberof Screens.Gameplay.Game
 */
var PokerModel = cc.Class({
    extends: emitter,

    properties: {
        gameModel: null,
        gameData: null,
        tourData: null,
        roomConfig: null,
        handTabs: [],
        timer: null,
        timeOut: null,
        chatQueue: null,
        chat: "",
        sitOutValue: null,
        dummyCardsCount: 2,
        forceBlind: [],
        gameChatInfo: [],
        chatLimit: 1,
        chatCount: 0,
        myCards: [],
        K: null,
        moveData: null,
        sitData: null,
        player: null,
        popUpManager: null,
        antiBankingTimer: null,
        number0: 0,
        number1: null,
    },

    /**
     * @description initialization of variables
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @method onLoad
     */
    onLoad: function () {
        // console.log('shishir on load pm');
        // console.log("finding presenter...", this.node.children[0])
        // console.log("finding player data...",this.node.children[0].playerData)

        this.postBigBlindUserFlake = true;
        this.chatLimit = 20;
        this.K = K;
        this.moveData = require('PostTypes').MoveData;
        this.sitData = require('PostTypes').SitData;
        this.player = require('ResponseTypes').Player;
        this.valueChange = true;
        let child = this.node.children[0];
        this.presenter = child.getComponent("PokerPresenter") || child.getComponent('OFCPresenter');
        // if (GameScreen.viewType == LayoutType.Tiled) {
        //     this.valueChange = false;
        // } else if (GameScreen.viewType == LayoutType.UnTiled) {
        //     this.valueChange = true;
        // }
    },

    /**
     * @description removes broadcasts from poker model when the game ends
     * @method onDestroy
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onDestroy: function () {
        // cc.director.getScheduler().unscheduleAllWithMinPriority(0);
        // console.log('shishir on destroy', this.gameData.channelId);

        this.kickPlayerOutOfTheGame(this);
        cc.director.getActionManager().removeAllActions();
        this.gameModel.removeBroadcastCallbacks(this.gameData.channelId);
    },

    /**
     * @description Use this method to register for gameplay broadcasts like startGame or gameOver
     * @method initializePoker
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param {Object} data holds data used to initialize the game 
     */
    initiliazePoker: function (data) {

        // if (GameScreen.viewType == LayoutType.Tiled) {
        //     this.valueChange = false;
        // } else if (GameScreen.viewType == LayoutType.UnTiled) {
        //     this.valueChange = true;
        // }
        this.chatQueue = new Queue();
        this.gameData = data.gameData;
        if (data.tourData) {
            this.tourData = data.tourData;
        }
        this.isPrivateTable = data.tableDetails.isPrivate;
        this.roomConfig = data.roomConfig;
        this.roomConfig.tournamentType = data.roomConfig.tournamentType;
        this.roomConfig.originalMinBuyIn = this.roomConfig.minBuyIn;
        this.roomConfig.originalMaxBuyIn = this.roomConfig.maxBuyIn;
        this.roomConfig.extraAntiBankCase = false;
        this.postBigBlindUserFlake = data.isForceBlindEnable;
        this.alreadyKickingOut = false;
        // console.log(data.info)
        // console.log(this.gameData.antibanking);

        if (data.roomConfig.channelVariation != this.K.Variation.OpenFaceChinesePoker) {
            if (this.gameData.antibanking.isAntiBanking && this.roomConfig.minBuyIn < this.gameData.antibanking.amount) {
                this.antiBankingTimer = setTimeout(function () {

                    if (this.gameData && this.roomConfig) {

                        this.gameData.antibanking.isAntiBanking = false;
                        this.roomConfig.extraAntiBankCase = false;
                        this.roomConfig.minBuyIn = this.roomConfig.originalMinBuyIn;
                        this.roomConfig.maxBuyIn = this.roomConfig.originalMaxBuyIn;
                    }

                }.bind(this), this.gameData.antibanking.timeRemains * 1000);

                this.roomConfig.minBuyIn = this.gameData.antibanking.amount;

                if (this.roomConfig.minBuyIn >= this.roomConfig.maxBuyIn) {
                    this.roomConfig.extraAntiBankCase = true;
                    this.roomConfig.maxBuyIn = this.roomConfig.minBuyIn;
                }
            }
        }
        this.sitOutValue = SitOutMode.None;
        if (GameManager.user) {
            GameManager.user.autoBuyIn = false; //Kuchch to gadbad h
        }
        this.registerBroadcasts();
        this.onInitializePoker();
        // generateHoleCards
        this.generateHoleCards(this.gameData.tableDetails.boardCard, false);
        // check for game state
        this.onGameStateChange();
        if (this.getPlayerById(this.gameData.playerId) != -1) {
            this.myCards = this.getMyPlayer().cards;
            if (this.getMyPlayer().isTournamentSitout) {
                this.getMyPlayer().state = K.PlayerState.OnBreak;
                this.sitOutValue = SitOutMode.SitOutNextHand;
            }
            if (this.getMyPlayer().state === K.PlayerState.Reserved) {
                this.emit("ReservedState", {
                    extraAntiBankCase: this.roomConfig.extraAntiBankCase
                });
            }
        }

        if (this.gameData.tableDetails.players.length > 0) {
            this.getPlayerNotes();
        }
        // player joined event
        this.emit(K.PokerEvents.OnJoin, this.gameData);
        // this.getHandTab();
        if (this.gameData.tableDetails.state === K.GameState.Running) {
            if (this.gameData.tableDetails.currentMoveIndex !== -1) {
                // startTimerTick
                if (!this.gameData.tableDetails.isTimeBankUsed) {
                    var totalTime = this.gameData.tableDetails.additionalTurnTime;
                    this.startTimerTick(totalTime, totalTime - this.gameData.tableDetails.remainingMoveTime);

                } else {
                    var totalTime = this.gameData.tableDetails.totalTimeBank;
                    this.startTimerTick(totalTime, totalTime - this.gameData.tableDetails.timeBankLeft);
                    this.emit(K.PokerEvents.onTimeBank); //emit data also TODO
                }
            }
            this.emit(K.PokerEvents.onBestHand);

        }

        // if (this.roomConfig.tournamentType == TournamentType.Normal)
        //     this.startBlindChangeTimer();
        GameManager.playerRequestedToLeaveTable[this.gameData.channelId] = false;

        //rajat 14-08-2019
        if(this.gameData.tableDetails.isForceRit){
            this.presenter.runItTwiceCB.node.parent.active = false;
        }
    },

    /**
     * @description updates antibanking data when server stands up this player
     * @method onAntiBankingUpdate
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onAntiBankingUpdate: function (data) {
        // conso
        // console.log("ANTIBANKING DATA ", data);
        if (this.antiBankingTimer != null) {
            clearTimeout(this.antiBankingTimer);
            this.antiBankingTimer = null;
        }
        if (data.isAntiBanking) {
            this.roomConfig.minBuyIn = data.amount;
            this.antiBankingTimer = setTimeout(function () {
                this.gameData.antibanking.isAntiBanking = false;
                this.roomConfig.extraAntiBankCase = false;
                this.roomConfig.minBuyIn = this.roomConfig.originalMinBuyIn;
                this.roomConfig.maxBuyIn = this.roomConfig.originalMaxBuyIn;
            }.bind(this), data.timeRemains * 1000);
        } else {
            this.gameData.antibanking.isAntiBanking = false;
            this.roomConfig.extraAntiBankCase = false;
            this.roomConfig.minBuyIn = this.roomConfig.originalMinBuyIn;
            this.roomConfig.maxBuyIn = this.roomConfig.originalMaxBuyIn;
        }

        if (this.roomConfig.minBuyIn >= this.roomConfig.maxBuyIn) {
            this.roomConfig.extraAntiBankCase = true;
            this.roomConfig.maxBuyIn = this.roomConfig.minBuyIn;
        } else {
            this.roomConfig.extraAntiBankCase = false;
        }
        // }
    },

    /**
     * @description fetches my player object
     * @method getMyPlayer
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @returns {Object} player -my player object
     */
    getMyPlayer: function () {
        if (this.getPlayerById(this.gameData.playerId) != -1) {
            return this.gameData.tableDetails.players[this.getPlayerById(this.gameData.playerId)];
        } else {
            return null;
        }
    },

    /**
     * @description determines player is in stand up state or not and returns the result
     * @method isPlayerStandUp
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @returns {bool} expression -true if player is in stand up state otherwise false
     */
    isPlayerStandUp: function () {
        return this.getPlayerById(this.gameData.playerId) == -1;
    },

    /**
     * @description determines if player is my player
     * @method isMe
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @returns {bool} - true if player is my player otherwise false
     */
    isMe: function (playerId) {
        return (playerId == this.gameData.playerId);
    },

    /**
     * @description determines if seat is empty
     * @method isSeatEmpty
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @returns {bool} -true if seat is empty otherwise false
     */
    isSeatEmpty: function () {
        return (this.roomConfig.maxPlayers > this.gameData.tableDetails.players.length);
    },

    /**
     * @method onInitializePoker
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onInitializePoker: function () {

        // console.log("called on immediate joining of a new table")
        // console.log("grid reference...", this.node.parent);
        // console.log("Desktop input is active ...",!!this.node.getParent().children[0].getChildByName("DesktopPlayerInput").active);
        this.isOptionalPlayerInputActive = false;
        this.optionalPlayerInput = this.node.getParent().children[0].getChildByName("OptionalPlayerInput");

        this.optionalPlayerInput.children.forEach(function (element) {
            // console.log("elements", element)
            element.children.forEach(function (childs) {
                if (childs.active == true)
                    this.isOptionalPlayerInputActive = true;
            }, this)

        }, this)
        if (GameManager.gameModel.activePokerModels.length >= 2 && !GameManager.isMobile && !GameManager.isWindows && GameScreen.viewType == 1) {
            // console.log("desktop input is active or not...",this.node.getParent().children[0].getChildByName("DesktopPlayerInput").active)
            // if (!!this.node.getParent().children[0].getChildByName("DesktopPlayerInput").active && !this.isOptionalPlayerInputActive) {
                // && !!this.node.getParent().children[0].getChildByName("OptionalPlayerInput").active ){
                // console.log("####this block removes desktop input of !st ");
                // this.node.getParent().children[0].getChildByName("DesktopPlayerInput").active = false;
                // this.node.getParent().children[0].getChildByName("MobilePlayerInput").active = true;

                // for (var i = 1; i < this.presenter.playerInput.length; i++) {
                //     this.presenter.mobilePlayerInput[i].active = this.presenter.playerInput[i].active;
                // }
            // }
        }

    },

    /**
     * @description fetches player index of player sitting on a given seat
     * @method getPlayerBySeat
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param {number} seatIndex - seat index of the player
     * @returns {number} playerIndex - player index
     */
    getPlayerBySeat: function (seatIndex) {
        var playerIndex = -1;
        for (var index = 0; index < this.gameData.tableDetails.players.length; index++) {
            if (this.gameData.tableDetails.players[index].seatIndex === seatIndex) {
                playerIndex = index;
                break;
            }
        }
        return playerIndex;
    },

    /**
     * @description fetches all the notes applied on other players
     * @method getPlayerNotes
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    getPlayerNotes: function () {
        for (var i = 0; i < this.gameData.tableDetails.players.length; i++) {
            this.getNote(this.gameData.tableDetails.players[i].playerId);
        }
    },

    /**
     * @description fetches the player index of a given player id
     * @method getPlayerById
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param  {String} playerId -player Id
     * @returns {number} playerIndex - player index 
     */
    getPlayerById: function (playerId) {
        var playerIndex = -1;
        for (var index = 0; index < this.gameData.tableDetails.players.length; index++) {
            if (this.gameData.tableDetails.players[index].playerId === playerId) {
                playerIndex = index;
                break;
            }
        }
        return playerIndex;
    },

    /**
     * @description Makes the player sit on particular seat
     * @method sitHere
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param {number} Index -index of the seat
     * @param {number} buyIn -number of seats player buys
     * @param {Object} callback - Callback to execute after successful sit in
     */
    sitHere: function (index, buyIn, callback) {
        var data = new this.sitData(this.gameData.channelId, this.gameData.playerId, buyIn, index, this.gameData.playerName, GameManager.user.profileImage, GameManager.user.autoBuyIn);
        ServerCom.pomeloRequest(this.K.PomeloAPI.sitHere, data, function (response) {
            if (response.success) {
                // process response
                if (callback !== null && callback !== undefined) {
                    callback();
                }
                this.sitOutValue = SitOutMode.None;
            }
            else {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, response.info, function () { });
            }
        }.bind(this), null, 5000, false);
    },

    leaveNextHand: function (callback) {
        ServerCom.pomeloRequest('room.channelHandler.leaveNextHand', {
            "channelId": this.gameData.channelId,
            "playerId": this.gameData.playerId,
            "isRequested": true
        }, function (response) {
            console.log('leaveNextHand', response);
            if (response.success) {
                // process response
                if (callback !== null && callback !== undefined) {
                    callback();
                }
            }
        }.bind(this), null, 5000, false);
    },


    rebuy: function (newTableId, playerId, tournamentId, callback, error) {
        ServerCom.socketIORequest(
            "tournamentGameEvent|reBuy",
            {
                "channelId": newTableId,
                "playerId": playerId,
                "tournamentId": tournamentId
            }, 
            callback, 
            error, 
            null, 
            false
        );
    },

    addon: function (newTableId, playerId, tournamentId, callback, error) {
        ServerCom.socketIORequest(
            "tournamentGameEvent|addOn",
            {
                "channelId": newTableId,
                "playerId": playerId,
                "tournamentId": tournamentId
            }, 
            callback, 
            error, 
            null, 
            false
        );
    },

    /**
     * @description sits out player on the next hand
     * @method sitOutNextHand
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param {Object} callback - Callback to execute after successful sitOUt next hand
     */
    sitOutNextHand: function (callback) {
        var data = new sitOutData(this.gameData.channelId, this.gameData.playerId);
        ServerCom.pomeloRequest(this.K.PomeloAPI.sitOutNextHand, data, function (response) {
            if (response.success) {
                this.sitOutValue = SitOutMode.SitOutNextHand;
            } else {
                this.sitOutValue = SitOutMode.None;
            }
            // process response
            if (callback !== null && callback !== undefined) {
                callback(response);
            } else { }
            // }
        }.bind(this), null, 5000, false);
    },

    /**
     * @description sit out player on the next big blind turn
     * @method sitOutNextBB
     * @memberof Screens.Gameplay.Game.PokerModel#
     *@param {Object} callback - Callback to execute after successful next big blind
     */
    sitOutNextBB: function (callback) {
        var data = new sitOutData(this.gameData.channelId, this.gameData.playerId);
        ServerCom.pomeloRequest(this.K.PomeloAPI.sitOutNextBigBlind, data, function (response) {
            if (response.success) {
                this.sitOutValue = SitOutMode.SitOueNextBB;
            }
            if (callback !== null && callback !== undefined) {
                callback(response);
            }
        }.bind(this), null, 5000, false);
    },

    /**
     * @description Resets Sit out 
     * @method resetSitout
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param {Object} callback - Callback to execute after successful response
     */
    resetSitout: function (callback) {
        var data = new ResetSitoutData(this.gameData.channelId, this.gameData.playerId);
        ServerCom.pomeloRequest(this.K.PomeloAPI.resetSitout, data, function (response) {
            if (response.success) {
                this.sitOutValue = SitOutMode.None;
            }
            if (callback !== null && callback !== undefined) {
                callback(response);
            }
        }.bind(this), null, 5000, false);
    },

    /**
     * @description In game buy in request
     * @method addChips
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param {number} chips -chips value
     *  @param {Object} callback - Callback to execute after successful
     */
    addChips: function (chips, callback) {
        var data = new addChipsData(this.gameData.channelId, this.gameData.playerId, chips);
        ServerCom.pomeloRequest(this.K.PomeloAPI.addChips, data, function (response) {
            if (response.success) {
                // process response
                if (callback !== null && callback !== undefined) {
                    callback();
                }
            }
        }, null, 5000, false);
    },

    /**
     * @description Resumes player after sitout mode
     * @method resume
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param {Object} callback
     */
    resume: function (callback) {
        var data = new sitOutData(this.gameData.channelId, this.gameData.playerId);
        ServerCom.pomeloRequest(this.K.PomeloAPI.resume, data, function (response) {
            if (response.success) {
                this.sitOutValue = SitOutMode.None;
                var playerData = this.gameData.tableDetails.players[this.getPlayerById(this.gameData.playerId)];
                playerData.state = response.state;
                if (playerData.isTournamentSitout) {
                    playerData.isTournamentSitout = false;
                    playerData.state = K.PlayerState.Playing;
                }
                // process response
                if (callback !== null && callback !== undefined) {
                    callback();
                }
            }
        }.bind(this), null, 5000, false);
    },

    /**
     * @description Submits player input to server
     * @method makeMove
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param {number} amount - bet amount
     * @param {String} action -Describes what move user has made
     */
    makeMove: function (amount, action) { 
        var data = new this.moveData(this.gameData.channelId, this.gameData.playerId, this.gameData.playerName, amount, action);
        // console.log('make move', data);
        // ServerCom.pomeloRequest(this.K.PomeloAPI.makeMove, data, function (response) {
        //     if (response.success) {
        //         // process response
        //     }
        // }, null, 5000, false);
        // console.trace('make move', amount, action, data);
        data.access_token = K.Token.access_token;

        console.log("makeMove", data);
        // pomelo.notify(this.K.PomeloAPI.makeMove, data);

        cc.audioEngine.stopAllEffects();

        ServerCom.pomeloRequest(this.K.PomeloAPI.makeMove, data, function (response) {
            // if (response.success) {
            //     // process response
            // }
        }, null, 5000, false);
    },

    /**
     * @description Leave current table
     * @method leave
     * @param {bool} leave || standUp
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    leave: function (leave) {
        // makedata
        // isStandUp
        clearInterval(this.timerRef);
        var inst = this;
        var data = new leaveData(this.gameData.playerId, this.gameData.channelId, leave);
        data.playerName = this.gameData.playerName;
        ServerCom.pomeloRequest(this.K.PomeloAPI.leaveTable, data, function (response) {
            if (response.success || inst.gameData.channelType == K.ChannelType.Tournament) {
                // cc.director.getScheduler().schedule(function () {
                inst.emit(K.PokerEvents.onPlayerStandUp);
                inst.sitOutValue = SitOutMode.None;
                if (!leave) {
                    ServerCom.loading.active = true;
                    inst.alreadyKickingOut = true;
                    inst.kickPlayerOutOfTheGame(inst);
                }
                // }, GameManager,1);

            } else {
                GameManager.playerRequestedToLeaveTable[inst.gameData.channelId] = false;

            }

            if (!response.success && response.info) {
                // GameManager.popUpManager.show(
                //     PopUpType.CommonDialog, 
                //     {
                //         "title": "Error!",
                //         "content" : response.info
                //     }, 
                //     function () {}
                // );

                inst.leaveNextHand(() => {
                    GameManager.popUpManager.show(PopUpType.NotificationPopup, "You will leave the game after this hand.", function () { });
                    inst.emit('leaveNextHand');
                });
            }
        }, null, 5000, false, inst.gameData.channelType != K.ChannelType.Tournament);
    },

    leaveClosedTable: function () {
        // makedata
        // isStandUp
        clearInterval(this.timerRef);
        var inst = this;
        inst.emit(K.PokerEvents.onPlayerStandUp);
        inst.sitOutValue = SitOutMode.None;
        inst.alreadyKickingOut = true;
        inst.kickPlayerOutOfTheGame(inst);
    },

    /**
     * @description Callback after player is removed from the game
     * @method kickPlayerOutOfTheGame
     * @param {Object} inst
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    kickPlayerOutOfTheGame: function (inst) {
        clearTimeout(inst.antiBankingTimer);
        this.emit("clearTimers", null);
        // inst.emit(K.PokerEvents.onPlayerStandUp);
        // inst.sitOutValue = SitOutMode.None;
        // setTimeout(function () {
        // console.log("shishir kick model done", inst);
        if (inst.gameModel) {
            inst.gameModel.onLeave(inst);
        }

        // }, 1000);
        // inst.gameModel.onLeave(inst);
    },

    /**
     * @description Post acknowledgement for is Connected broadcast from server
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @method postConnectedAck
     */
    postConnectedAck: function () {
        var data = new connectAckData(this.gameData.channelId, this.gameData.playerId);
        ServerCom.pomeloRequest(this.K.PomeloAPI.connectionAck, data, function (response) {
            if (response.success) { } else { }
        }, null, 5000, false);
    },

    /**
     * @description Updates server when player selects straddle checkbox
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param selection
     * @method setStraddleSelection
     */
    setStraddleSelection: function (selection) {
        var data = new SetPlayerValData(this.gameData.channelId, this.gameData.playerId, "isStraddleOpted", selection);
        ServerCom.pomeloRequest(this.K.PomeloAPI.setPlayerValOnTable, data, function (response) {
            if (response.success) { } else { }
        }, null, 5000, false);
    },

    /**
     * @description 
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param selection
     * @method setPostBigBlind
     */
    setPostBigBlind: function (selection) {
        var data = new SetPlayerValData(this.gameData.channelId, this.gameData.playerId, "isForceBlindEnable", selection);
        this.postBigBlindUserFlake = selection;
        // console.log("POST BIG BLIND STATUS ", selection);
        ServerCom.pomeloRequest(this.K.PomeloAPI.setPlayerValOnTable, data, function (response) {
            if (response.success) { } else { }
        }, null, 5000, false);
    },

    /**
     * @description updates server when player selects/deselects run it twice checkbox
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param {bool} selection -true when player selects run it twice checkbox other false
     * @param {Object} callback -Callback to execute after response received is a success
     * @method setRunItTwice
     */
    setRunItTwice: function (selection, callback) {
        var data = new SetPlayerValData(this.gameData.channelId, this.gameData.playerId, "isRunItTwice", selection);
        ServerCom.pomeloRequest(this.K.PomeloAPI.setPlayerValOnTable, data, function (response) {
            if (!!callback) {
                callback(response);
            }
            if (response.success) { } else { }
        }, null, 5000, false);
    },

    /**
     * @description Call AsyncTask recursively
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param {String} playerId -Unique Id of the player in the game
     * @method getNote
     */
    getNote: function (playerId) {
        var data = new GetNote(GameManager.user.playerId, playerId);
        // pomelo.request(this.K.PomeloAPI.getNote, data, function (response) {
        //     if (response.success) {
        //         this.updateNotes(playerId, response.result.color, response.result.notes);
        //     } else { }
        // }.bind(this), null, 5000, false, false);
    },

    /**
     * @description updates the notes applied on players and emits event so that poker presenter can update the view
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @method updateNotes
     * @param {String} playerId -Unique Id of the player in the game
     * @param {} color 
     * @param {String} notes
     */
    updateNotes: function (playerId, color, notes) {
        this.gameData.tableDetails.players[this.getPlayerById(playerId)].noteColor = color;
        this.gameData.tableDetails.players[this.getPlayerById(playerId)].noteText = notes;

        this.emit(K.PokerEvents.onPlayerNotes, playerId);
    },

    /**
     * @description 
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @method updateNotes
     */
    getHandTab: function () {
        var data = {};
        data.channelId = this.gameData.channelId;
        this.handTabs = [];
        ServerCom.pomeloRequest(this.K.PomeloAPI.getHandTab, data, function (response) {
            if (response.success) {
                // console.log("digvijay  api", response)

                response.handHistory.forEach(function (element) {
                    // element.myCards = [];
                    this.handTabs.push(element);
                    // this.handTabs.push(element);
                    // this.handTabs.push(element);
                    // this.handTabs.push(element);

                }, this);
                this.emit(K.PokerEvents.onHandTab, this);
            } else { }
        }.bind(this), null, 5000, false, false);
    },

    /**
     * @description Requests handhistory from server
     * @param {String} handHistoryId -Unique id assigned to object
     * @param {} callback
     * @method getHandHistory
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    getHandHistory: function (handHistoryId, callback, newJohnnyDetail = false) {
        var data = {};
        data.channelId = this.gameData.channelId;
        data.handHistoryId = handHistoryId;

        ServerCom.pomeloRequest(this.K.PomeloAPI.getHandHistory, data, function (response) {
            if (response.success) {
                var newData = {
                    heading: "Hand History",
                    info: response.handHistory.historyLog
                };
                if (newJohnnyDetail) {

                } else {
                    if (GameScreen.isMobile && false) {
                        GameManager.popUpManager.show(PopUpType.HandHistoryPopup, newData, function () { });
                    } else {
                        this.popUpManager.show(PopUpType.HandHistoryPopup, newData, function () { });
                    }
                }
                if (!!callback) {
                    // callback(response);
                    callback(newData);
                }
            } else { }
        }.bind(this), null, 5000, false, true);
    },

    showHandHistoryDetail: function () {
        var inst = this;
        ServerCom.pomeloRequest("room.channelHandler.getHandHistory", {
            channelId: this.gameData.channelId,
            access_token: K.Token.access_token,
        }, function (response) {
            // console.log("getHandHistory", response);
            // inst.data = response.data;
            // inst.dataIndex = 0;

            // if (inst.data.length > 0) {
            //     cc.find('Center', inst.node).active = true;
            //     cc.find('empty', inst.node).active = false;
            //     cc.find('foot', inst.node).active = true;
            // }
            // else {
            //     cc.find('Center', inst.node).active = false;
            //     cc.find('empty', inst.node).active = true;   
            //     cc.find('foot', inst.node).active = false;
            // }
            // inst.updateHistory();
            inst.popUpManager.show(PopUpType.HandHistoryDetailPopup, response.data, function () { });

        }, null, 5000, false);
    },
    /**
     * Tournament
     * @description Updates server when player selects auto-rebuy checkbox
     * @method setAutoRebuyCheckbox
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    setAutoRebuyCheckbox: function () {
        //  ServerCom.pomeloRequest(address, data, callback, error, timeout, showLoading = true, showError = true);
        var data = {};
        data.playerId = GameManager.user.playerId;
        data.channelId = this.gameData.channelId;
        ServerCom.pomeloRequest(this.K.PomeloAPI.setAutoRebuy, data, function (response) {
            if (response.success && callback) {
                //update chips, rebuy notification
                callback(response);
            }
        }.bind(this), null, 5000, false, false);

    },

    /**
     * Tournament Specific
     * @description Request Server to Set the Auto Add on option
     * @method setAddOnCheckbox
     * @memberof Screens.Gameplay.Game.PokerModel#
     * @param {} selection
     * @param {} callback
     */


    /**
     * Tournament Specific
     * @description Request Server to Set the Double Rebuy option
     * @method setDoubleRebuy
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    setDoubleRebuy: function () {
        var data = {};
        data.playerId = "";
        data.channelId = "";
        ServerCom.pomeloRequest(this.K.PomeloAPI.setDoubleRebuy, data, function (response) {
            if (response.success && callback) {
                //update chips
                callback(response);
            } else {

            }
        }.bind(this), null, 5000, false, false);
    },

    /**      @@depricated This api has been depricated and not in use anywhere in current code base.
     * @description captures the hand moves and sends it to the server
     * @method saveReplay
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    saveReplay: function () {
        var replayData = new ReplayData(this.gameData.channelId, this.gameData.tableDetails.roundId, JSON.parse(cc.sys.localStorage.getItem(this.gameData.channelId)))
        ServerCom.pomeloRequest(this.K.PomeloAPI.saveVideo, replayData, function (response) {
            if (response.success) {

            } else { }
        }.bind(this), null, 5000, false, true);
    },

    /**
     * @description Requests the server to send the video
     * @method getVideo
     * @param {String} videoLogId -Unique id of the video logs 
     * @param {callback} callback
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    getVideo: function (videoLogId, callback) {
        var data = {};
        data.videoLogId = videoLogId;
        ServerCom.pomeloRequest(this.K.PomeloAPI.getVideo, data, function (response) {
            if (response.success) {
                if (!!callback)
                    callback(response);
            } else { }
        }.bind(this), null, 5000, false, true);
    },

    /**
     * @description 
     * @method fireMuckHandEvent
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    fireMuckHandEvent: function () {
        var input = {};
        input.channelId = this.gameData.channelId;
        input.data = {
            seatIdx: this.getMyPlayer().seatIndex
        };
        input.route = this.K.BroadcastRoute.onFireEvent;
        ServerCom.pomeloRequest(this.K.PomeloAPI.fireChannelEvent, input, function (response) {
            if (response.success) {

            }
        }.bind(this), null, 5000, false, true);
    },

    /**
     * @description Registers listeners for all broadcasts
     * @method registerBroadcasts
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    registerBroadcasts: function () {
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.sit, this.onSit.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.blindDeduction, this.onBlindDeducted.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.bankrupt, this.onBankrupt.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.gamePlayers, this.onGamePlayers.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.dealerrChat, this.onDealerChat.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.startGame, this.onGameStart.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.turn, this.onMoveMade.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.roundOver, this.onRoundOver.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.gameOver, this.onGameOver.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.leave, this.onLeft.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.chat, this.onChat.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.playerCards, this.onPlayerCards.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.playerState, this.onPlayerStateChange.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.connectionAck, this.onConnectionAck.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.preCheck, this.onPreCheck.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.playerCoins, this.onPlayerCoins.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.avatarChange, this.onAvatarChange.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.handTab, this.onHandTab.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.bestHands, this.onBestHands.bind(this));
        // this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.gameOverBestHands, this.onBestHandsGameOver.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.onTimeBank, this.onTimeBank.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.onFireEvent, this.onFireEvent.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.antiBankingUpdatedData, this.onAntiBankingUpdate.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.sendSticker, this.onSendSticker.bind(this));
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BuddyBroadcast.friendRequestReceived, this.onFriendRequestReceived.bind(this));
        //tournament specific
        //    this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.rebuyTimeEnds, this.onRebuyTimeEnds.bind(this));
        //    this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.rebuyStatus, this.onRebuyStatus.bind(this));
    },

    onFriendRequestReceived: function  (response) {
      console.log('onFriendRequestReceived Broadcast ',response);
    },

    /**
     * @description 
     * @method onTimeBank
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onFireEvent: function (response) {
        if (response.seatIdx == undefined || response.seatIdx == null) {
            response.seatIdx = response.seatIndex;
        }
        if (!this.getMyPlayer() || response.seatIdx != this.getMyPlayer().seatIndex)
            this.emit(K.PokerEvents.onChannelEvent, response.seatIdx);
    },

    /**
     * @description Time bank callback. Start timer if player has time bank.
     * @method onTimeBank
     * @param {Object} data 
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onTimeBank: function (data) {
        var playerIndex = this.getPlayerById(data.playerId);
        if (playerIndex === -1) {
            return;
        }
        var playerData = this.gameData.tableDetails.players[playerIndex];
        if (this.gameData.tableDetails.currentMoveIndex == playerData.seatIndex) {
            this.startTimerTick(data.totalTimeBank);
        }
        this.emit(K.PokerEvents.onTimeBank, data);
    },

    /**
     * @description GameOver broadcast callback
     * @method onGameOver
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onGameOver: function (data) {
        // console.error("Game Over ", data);
        // this.number0 = 0;
        // console.log("GAME OVER DATA ", JSON.parse(JSON.stringify(data)));
        let temp = {};
        for (let i = 0; i < data.cardsToShow.length; i++) {
            temp[data.cardsToShow[i].playerId] = data.cardsToShow[i].cards;
        }
        data.cardsToShow = temp;
        // console.log("GAME OVER DATA AFTER DJ SIR's CONVERSION", data);
        var cardsToShowPlayers = [];
        data.winners.forEach(function (element) {
            if (!this.gameData.tableDetails.players[this.getPlayerById(element.playerId)]) {
                return;
            }
            if (!this.isVideo)
                this.gameData.tableDetails.players[this.getPlayerById(element.playerId)].chips = element.chips;


            this.gameData.tableDetails.players[this.getPlayerById(element.playerId)].__isMuckHand = element.isMuckHand;

        }, this);
        var id = null;
        if (data.endingType != K.GameEndType.OnePlayerLeft) {
            for (id in data.cardsToShow) {
                // var =this.getPlayerById(id);
                // console.log("ID IS ", id);
                var player = null;
                if (this.gameData.tableDetails.players[this.getPlayerById(id)]) {

                    player = this.gameData.tableDetails.players[this.getPlayerById(id)];
                    cardsToShowPlayers.push(player.seatIndex);
                    player.cards = data.cardsToShow[id];
                }
            }
        }

        if (data.gameOverBestHands) {

            var time = 0;
            var zero = this.number0;
            var one = this.number1;
            if ((zero == 5) && ((one == 0) || (one == 5))) {
                time = 2000;
            }
            setTimeout(() => {
                this.onBestHandsGameOver(data.gameOverBestHands, data.winners);
            }, time);
        }

        this.clearTotalRoundBet();
        this.gameData.tableDetails.roundMaxBet = 0;
        this.gameData.tableDetails.state = K.GameState.GameOver;
        this.onGameStateChange();
        this.clearTimerTick();
        this.emit(K.PokerEvents.onTurnInOtherRoom, this, false);
        this.emit(K.PokerEvents.OnGameOver, data, cardsToShowPlayers);

    },

    /**
     * @description Sit broadcast callback
     * @method onSit
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onSit: function (data) {
        // update data
        if (this.getPlayerById(data.playerId) == -1) {
            var newPlayer = new this.player(data);
            var index = this.gameData.tableDetails.players.push(newPlayer);
            this.getNote(data.playerId);
            this.emit(K.PokerEvents.OnSit, newPlayer, index - 1);
        }
    },

    /**
     * @description Updates the total pot value
     * @method updateTotalPot
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    updateTotalPot: function () { 
        this.gameData.tableDetails.totalPot = 0;
        for (var index = 0; index < this.gameData.tableDetails.pot.length; index++) {
            this.gameData.tableDetails.totalPot += this.gameData.tableDetails.pot[index];
        }
    },

    /**
     * @description BlindDeducted broadcast callback
     * @method onBlindDeducted
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onBlindDeducted: function (data) {
        // console.clear();
        // console.log("BLIND DEUCTION DATA ",data);
        // if (this.roomConfig.smallBlind != data.tableSmallBlind && this.roomConfig.channelType == K.ChannelType.Tournament) {
        //     this.emit(K.PokerEvents.onBlindsChanged, data);
        // }
        // this.forceBlind = data.forceBlind || [];
        let temp = {};

        for (let i = 0; i < data.forceBlind.length; i++) {
            temp[data.forceBlind[i].playerId] = data.forceBlind[i].chips;
        }
        data.forceBlind = temp;
        // console.log("BLIND DEUCTION DATA AFTER DJ SIr's Conversion", JSON.parse(JSON.stringify(data)));

        var id = "";

        // var FBlindPlayerRef = null;
        for (id in data.forceBlind) {
            let player = this.gameData.tableDetails.players[this.getPlayerById(id)];
            if (player.seatIndex != data.smallBlindIndex && player.seatIndex != data.bigBlindIndex && player.seatIndex != data.straddleIndex) {
                this.gameData.tableDetails.players[this.getPlayerById(id)].totalRoundBet = data.forceBlind[id];
                this.gameData.tableDetails.players[this.getPlayerById(id)].chips = this.gameData.tableDetails.players[this.getPlayerById(id)].chips - data.forceBlind[id];
            }
        }


        this.roomConfig.smallBlind = data.tableSmallBlind;
        this.roomConfig.bigBlind = data.tableBigBlind;
        this.gameData.tableDetails.pot = data.pot;
        this.gameData.tableDetails.totalPot = data.totalPot;
        this.gameData.tableDetails.players.forEach(function (player) {

            // let ante = data.bigBlind - data.tableBigBlind;
            if (data.ante) {
                player.ante = data.ante[player.playerId] || 0;
                player.chips -= data.ante[player.playerId] || 0;
            }
            if (player.seatIndex === data.smallBlindIndex) {
                player.totalRoundBet = data.smallBlind;
                // player.totalRoundBet = (data.smallBlind < 1) ? (player.chips - data.smallBlindChips).roundOff(2) : Math.floor(player.chips - data.smallBlindChips);
                player.chips = data.smallBlindChips;
                // console.log("sb", player, player.totalRoundBet, player.chips);
            }
            else if (player.seatIndex === data.bigBlindIndex) {
                player.totalRoundBet = data.bigBlind;
                // player.totalRoundBet = (data.bigBlind < 1) ? (player.chips - data.bigBlindChips).roundOff(2) : Math.floor(player.chips - data.bigBlindChips);
                player.chips = data.bigBlindChips;
                // console.log("bb", player, player.totalRoundBet, player.chips);
            }
            else if (player.seatIndex === data.straddleIndex) {
                if (data.straddleChips === -1) {
                    return;
                }
                // check for isStraddleEnabled
                player.totalRoundBet = player.chips - data.straddleChips;
                player.chips = data.straddleChips;
                // console.log("STRADDLE", player.totalRoundBet, player.chips, data.straddleChips);
            }
            else {
                // if (player.totalRoundBet >= ante) {
                //     player.totalRoundBet -= ante;
                // }
            }
        }, this);

        // console.log("FORCE BLIND OF PLAYER", FBlindPlayerRef.playerName);
        // console.log("FORCE BLIND OF PLAYER", FBlindPlayerRef.totalRoundBet);

        this.emit(K.PokerEvents.OnBlindDeduction, data);
    },

    /**
     * @description Bankrupt broadcast callback
     * @method onBankrupt
     * @param {Object} data 
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onBankrupt: function (data) {
        if (data.playerId === this.gameData.playerId) {
            this.emit(K.PokerEvents.OnBankrupt, {});
        }
    },

    /**
     * @description Turn broadcast callback
     * @method onMoveMade
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onMoveMade: function (data) {
        // console.log("MOVE MADE DATA/TURN", data);
        // update data
        // var prevIndex = this.gameData.tableDetails.currentMoveIndex || -1;
        // try {
        if (data.playerId != "" && this.gameData.tableDetails.players[this.getPlayerById(data.playerId)]) {
            // if (data.roundName == K.Round.Showdown) {
            //     this.gameData.tableDetails.players[this.getPlayerById(data.playerId)].totalRoundLastBet = data.lastPlayerBet;
            // } else {
            this.gameData.tableDetails.players[this.getPlayerById(data.playerId)].totalRoundLastBet = data.lastPlayerBet + this.gameData.tableDetails.players[this.getPlayerById(data.playerId)].totalRoundBet;
        }

        if (data.isRoundOver) {
            this.clearTotalRoundBet();
            // this.scheduleOnce(
            //     function () {
            //         if (data.playerId != "") {
            //             // this.gameData.tableDetails.players[this.getPlayerById(data.playerId)].totalRoundLastBet = data.amount + this.gameData.tableDetails.players[this.getPlayerById(data.playerId)].totalRoundBet;
            //         }
            //     }.bind(this), 1
            // );
        }
        this.gameData.tableDetails.currentMoveIndex = data.currentMoveIndex === "" ? -1 : data.currentMoveIndex;
        // if (parseInt(data.currentMoveIndex) == 0) {
        //     this.gameData.tableDetails.currentMoveIndex = data.currentMoveIndex = this.gameData.tableDetails.players.length;
        // }
        this.gameData.tableDetails.roundMaxBet = data.roundMaxBet;
        this.gameData.tableDetails.pot = data.pot;
        this.gameData.tableDetails.totalPot = data.totalPot;
        this.gameData.tableDetails.minRaiseAmount = data.minRaiseAmount;
        this.gameData.tableDetails.maxRaiseAmount = data.maxRaiseAmount;
        var index;
        if (data.playerId != "" && this.gameData.tableDetails.players[this.getPlayerById(data.playerId)]) {
            index = this.getPlayerById(data.playerId);
            this.gameData.tableDetails.players[index].chips = data.chips;
            this.gameData.tableDetails.players[index].lastMove = data.action;
            this.gameData.tableDetails.players[index].lastBet = data.amount;
            this.gameData.tableDetails.players[index].moves = data.moves;
            this.gameData.tableDetails.players[index].totalRoundBet = data.totalRoundBet;
        } else {
            index = null;
        }
        this.gameData.tableDetails.roundName = data.roundName;
        // if(!data.isRoundOver){
        if (this.gameData.tableDetails.currentMoveIndex != -1) {
            if (data.isRoundOver) {
                this.clearTimerTick();
                setTimeout(function () {
                    if (cc.isValid(this.node)) {

                        this.startTimerTick(this.gameData.tableDetails.turnTime);
                    }
                }.bind(this), 1400);
            } else {
                this.startTimerTick(this.gameData.tableDetails.turnTime);
            }
        } else {
            this.clearTimerTick();
        }
        // }
        // emit events

        this.emit(K.PokerEvents.OnTurn, data, index)

        // } catch (err) {
        //     if (GameManager.isMobile) {
        //         if (window.GameScreen) {
        //             window.GameScreen.node.opacity = 0;
        //         }
        //         GameManager.isConnected = false;
        //         K.disconnectRequestedByPlayer = true;
        //         GameManager.popUpManager.hideAllPopUps();
        //         GameManager.popUpManager.hide(PopUpType.DisconnectDialog, function () { });
        //         LoginScreen.clientInit(true);
        //     }
        // }
    },

    /**
     * @description Reset player round total bet made
     * @method clearTotalRoundBet
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    clearTotalRoundBet: function () {
        for (var index = 0; index < this.gameData.tableDetails.players.length; index++) {
            this.gameData.tableDetails.players[index].totalRoundBet = 0;
        }
    },

    /**
     * @description Display current game state on view
     * @method onGameStateChange
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onGameStateChange: function () {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.emit(K.PokerEvents.onGameStateChange, this.gameData.tableDetails.state);
        // this.stateDisplay.node.active = true;
        // // this.stateDisplay.string = this.gameData.tableDetails.state;
        // this.timeOut = setTimeout(function() {
        //     if (this.stateDisplay !== null && this.stateDisplay !== undefined) {
        //         this.stateDisplay.node.active = false;
        //     }
        // }.bind(this), 5000);
    },

    /**
     * @description GamePlayers broadcast callback
     * @method onGamePlayers
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onGamePlayers: function (data) {
        // update data
        // console.log("game players",data)
        if (this.isVideo) {
            return;
        }

        // console.log('game players', cc.isValid(this.node), this.gameData);
        this.gameData.tableDetails.boardCard = [
            [],
            []
        ];
        for (var index = 0; index < data.players.length; index++) {
            var playerIndex = this.getPlayerById(data.players[index].playerId);
            var playerData = this.gameData.tableDetails.players[playerIndex];
            playerData.reset(data.players[index]);
            this.emit(K.PokerEvents.OnPlayerStateChange, playerData);
        }
        this.gameData.tableDetails.state = K.GameState.Idle;
        this.onGameStateChange();
        for (var playerIndex = this.gameData.tableDetails.players.length - 1; playerIndex >= 0 ; playerIndex--) {
            console.log("1this.gameData.tableDetails.players", playerIndex);
            console.log("1this.gameData.tableDetails.players", this.gameData.tableDetails.players[playerIndex].playerId);
            var isContinuing = false;
            for (var index = 0; index < data.players.length; index++) {
                if (this.gameData.tableDetails.players[playerIndex].playerId === data.players[index].playerId) {
                    isContinuing = true;
                }
            }
            if (!isContinuing) {
                // remove
                var params = {};
                params.playerId = this.gameData.tableDetails.players[playerIndex].playerId;
                console.log("!isContinuing", params.playerId);
                this.onLeft(params);
            }
        }
        this.clearTotalRoundBet();
        this.emit(K.PokerEvents.OnClearHoleCards);
        this.gameData.tableDetails.roundMaxBet = 0;
        for (var index = 0; index < data.removed.length; index++) {
            if (!!data.removed[index]) {
                var params = {};
                params.playerId = data.removed[index];
                this.onLeft(params);
            }
        }

        //   check for self and self playing state - fire onRotateView event
        if (!!this.getMyPlayer()) {
            var playerData = this.getMyPlayer();
            if (playerData.state === K.PlayerState.Playing) {
                var params = {};
                params.seatIndex = playerData.seatIndex;
                this.emit(K.PokerEvents.onRotateView, params);
            } else if (playerData.state === K.PlayerState.OutOfMoney) {
                this.roomConfig.minBuyIn = this.roomConfig.originalMinBuyIn;
                this.roomConfig.maxBuyIn = this.roomConfig.originalMaxBuyIn;
                this.emit(K.PokerEvents.OnBankrupt, {});
            }
            if (playerData.isTournamentSitout) {
                playerData.state = K.PlayerState.OnBreak;
                this.sitOutValue = SitOutMode.SitOutNextHand;
            }
            if (playerData.state === K.PlayerState.OnBreak) {
                this.sitOutValue = SitOutMode.SitOutNextHand;
            }
            this.emit(K.PokerEvents.onBestHand);
        }

        this.emit(K.PokerEvents.OnGamePlayers);
        // console.error("game players khatma");
    },

    /**
     * @description Starts new timer
     * @method startTimerTick
     * @param {Number} duration
     * @param {Number} startTime
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    startTimerTick: function (duration, startTime) {
        // console.log("start timer tick");
        this.clearTimerTick();
        var currentTime = new Date();
        var offset = 0;
        if (arguments.length > 1) {
            var offset = startTime * 1000;
        }
        var endTime = currentTime.getTime() + (1000 * duration);
        var time;
        this.timer = setInterval(function () {
            currentTime = new Date();
            var elapsed = (endTime - currentTime - offset) / 1000;

            time = (elapsed / (duration));

            if (time <= 0) {
                this.emit(K.PokerEvents.onTimerTick, time, elapsed);
                this.clearTimerTick();
                return;
            }
            // emit tick event with time
            elapsed = Math.floor(elapsed);
            // console.log("TIMER", elapsed);
            this.emit(K.PokerEvents.onTimerTick, time, elapsed);
        }.bind(this), 100);
    },

    /**
     * @description Clears existing timer
     * @method clearTimerTick
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    clearTimerTick: function () {
        if (this.timer !== null && this.timer !== undefined) {
            clearInterval(this.timer);
            this.timer = null;
        }
    },

    /**
     * @description player state broadcast callback
     * @method onPlayerStateChange
     * @param {} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onPlayerStateChange: function (data) {
        // console.log("PLAYER STATE CHANGED with DATA ", data);
        var playerIndex = this.getPlayerById(data.playerId);
        if (playerIndex === -1) {
            return;
        }
        var playerData = this.gameData.tableDetails.players[playerIndex];
        playerData.state = data.state;
        if (data.playerId == this.gameData.playerId && playerData.state == K.PlayerState.OnBreak) {
            this.sitOutValue = SitOutMode.SitOutNextHand;
        }
        if (playerData.state == K.PlayerState.Disconnected) {
            if (this.gameData.tableDetails.currentMoveIndex == this.gameData.tableDetails.players[playerIndex].seatIndex) {
                if (data.resetTimer) {
                    this.startTimerTick(this.gameData.tableDetails.extraTurnTime);
                }
            }
        }
        this.emit(K.PokerEvents.OnPlayerStateChange, playerData);
        this.emit(K.PokerEvents.onBestHand);
    },

    /**
     * @description Leave broadcast callback
     * @method onLeft
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onLeft: function (data) {
        // update data
        if (this.alreadyKickingOut) {
            return;
        }
        //currently not using this if condition as it is not requried for the broadcast
        //  if (this.gameData.tableDetails.state !== K.GameState.GameOver || this.gameData.channelType == K.ChannelType.Tournament) {
        var player = null;
        var index = this.getPlayerById(data.playerId);
        // remove data
        if (index !== -1) {
            player = this.gameData.tableDetails.players.splice(index, 1);
        } else {
            //player is not sitting
            if (this.isMe(data.playerId) && !data.isStandup) {
                this.kickPlayerOutOfTheGame(this);
            }
        }
        if (player && player[0]) {
            player[0].isStandup = data.isStandup;
        }
        this.emit(K.PokerEvents.OnLeave, player);
        //}
    },

    /**
     * @description GameStart broadcast callback
     * @method onGameStart
     * @param {Object} data -Stores data required to start the game 
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onGameStart: function (data) {
        // console.log("GAME START DATA ", data);
        // gameCount++;
        // this.checkChatLimit();
        // update 
        this.gameData.tableDetails.dealerIndex = data.dealerIndex;
        this.gameData.tableDetails.smallBlindIndex = data.smallBlindIndex;
        this.gameData.tableDetails.bigBlindIndex = data.bigBlindIndex;
        this.gameData.tableDetails.straddleIndex = data.straddleIndex;
        this.gameData.tableDetails.currentMoveIndex = (data.currentMoveIndex == undefined) ? -1 : data.currentMoveIndex;
        this.gameData.tableDetails.bigBlind = data.bigBlind;
        this.gameData.tableDetails.smallBlind = data.smallBlind;
        //this.gameData.tableDetails.pot = data.pot;
        // this.gameData.tableDetails.totalPot = data.totalPot;
        this.gameData.tableDetails.roundMaxBet = data.roundMaxBet;
        this.gameData.tableDetails.state = data.state;
        this.gameData.tableDetails.roundName = data.roundName;
        this.gameData.tableDetails.minRaiseAmount = data.minRaiseAmount;
        this.gameData.tableDetails.maxRaiseAmount = data.maxRaiseAmount;
        this.gameData.tableDetails.roundId = data.roundId;
        // this.startTimerTick(this.gameData.tableDetails.turnTime);//commented now
        // this.handlePlayerCards(data.playerCards);
        this.gameData.tableDetails.roundNumber = data.roundNumber;

        this.onGameStateChange();
        // this.handleDefaultRunItTwice();
        this.emit(K.PokerEvents.OnStartGame, data);
    },

    //@depricated
    handleDefaultRunItTwice : function () {
        // console.log("is force rit", this.gameData.tableDetails.isForceRit);
        if(this.gameData.tableDetails.isForceRit && !this.isPlayerStandUp() && this.getMyPlayer().state != K.PlayerState.OnBreak) {
            this.presenter.runItTwiceCB.node.parent.active = false;
            this.setRunItTwice(true, function(response) {
            }.bind(this));
        }
    },


    /**
     * @description Generates player cards and pushes into respective data
     * @method handlePlayerCards
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    handlePlayerCards: function (playerCards) {
        this.gameData.tableDetails.players.forEach(function (element) {
            var card = playerCards[element.playerId];
            var array = card;
            element.cards = array;
        }, this);
    },

    /**
     * @description Returns suit enum based on server data
     * @method getSuit
     * @param {String} suit
     * @returns {root.K.Suit}
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    getSuit: function (suit) {
        if (suit === "spade") {
            return K.Suit.Spade;
        } else if (suit === "heart") {
            return K.Suit.Heart;
        } else if (suit === "club") {
            return K.Suit.Club;
        } else if (suit === "diamond") {
            return K.Suit.Diamond;
        } else { }
    },

    /**
     * @description Popultes the community cards
     * @method generateHoleCards
     * @param {Object} boardCards
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    generateHoleCards: function (boardCards, ifAnimateHoleCards = true) {
        var array = [
            [],
            []
        ];
        // console.log("GENERATE HOLE CARDS WITH DATA ", boardCards)

        var i = 0;
        boardCards.forEach(function (element) {
            element.forEach(function (element1) {
                if (!!element1) {
                    var suit = this.getSuit(element1.type);
                    var cardType = new card(element1.rank, suit);
                    array[i].push(cardType);
                } else {
                    array[i].push(null);
                }
            }, this);
            i++;
        }, this);
        this.emit(K.PokerEvents.OnHoleCard, array, ifAnimateHoleCards);
    },

    /**
     * @description Round Over broadcast callback
     * @method onRoundOver
     * @param {Object} data 
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onRoundOver: function (data) {
        var t = 1;
        // console.log("On Round Over ", data);

        // console.log("DATA BOARD ROOM ", data.boardCard[0].length);

        this.number0 = data.boardCard[0].length;

        // console.log("Number 0 ", this.number0);

        this.number1 = data.boardCard[1].length;

        // console.log("Number 1 ",this.number1);
        // update boardCards in gameData
        // console.log("ro", JSON.parse(JSON.stringify(data)));
        // console.log("model data=", JSON.parse(JSON.stringify(this.gameData.tableDetails.boardCard)));
        this.gameData.tableDetails.roundName = data.roundName;
        this.emit(K.PokerEvents.OnRoundOver, data);

        //Changes to push null in run it twice case after 2g compression changes ,server is not sending in required manner.
        if (data.roundName == K.Round.Showdown && data.boardCard[1].length != 0) {
            this.gameData.tableDetails.boardCard[0].forEach(element => {
                this.gameData.tableDetails.boardCard[1].push(null);
            });
        }
        var i = 0;

        data.boardCard.forEach(function (element) {
            element.forEach(function (card) {

                this.gameData.tableDetails.boardCard[i].push(card);

            }, this)
            i++;
        }, this);

        //////////////////// REMOVING DUPLICATES FROM BOTH THE ARRAYS IF ANY DUPLICATE COMES DUE TO BOARDCAST OVERLAPS

        // console.log("BEFORE SHORTING ", JSON.parse(JSON.stringify(this.gameData.tableDetails.boardCard)));
        let tmpArray = this.gameData.tableDetails.boardCard[0].filter(function (item, index, arr) {
            if (!item) {
                return true;
            } else {
                return index === arr.findIndex(function (secondItem) {
                    return !!secondItem && secondItem.rank == item.rank && secondItem.type == item.type;
                })
            }
        });
        this.gameData.tableDetails.boardCard[0].length = 0;
        tmpArray.forEach(function (element) {
            this.gameData.tableDetails.boardCard[0].push(element);
        }, this)

        let tmpArray2 = this.gameData.tableDetails.boardCard[1].filter(function (item, index, arr) {
            if (!item) {
                return true;
            } else {
                return index === arr.findIndex(function (secondItem) {
                    return !!secondItem && secondItem.rank == item.rank && secondItem.type == item.type;
                })
            }
        });
        this.gameData.tableDetails.boardCard[1].length = 0;
        tmpArray2.forEach(function (element) {
            this.gameData.tableDetails.boardCard[1].push(element);
        }, this)

        // console.log("AFTER SHORTING ", this.gameData.tableDetails.boardCard);
        // console.log("model data after=", JSON.parse(JSON.stringify(this.gameData.tableDetails.boardCard)));
        if ((this.number0 == 5) && (this.number1 == 5)) {

            t = 5500 - 2500;
        } else if ((this.number0 == 5) && (this.number1 == 0)) {

            t = 4500 - 2500;
        }
        // console.log("T ", t);
        setTimeout(function () {
            if (cc.isValid(this.node)) {

                if (!!this.gameData)
                    this.generateHoleCards(this.gameData.tableDetails.boardCard);
            }
        }.bind(this), t);
    },


    /**
     * @description Manages Game chat
     * @method gameChat
     * @param {String} event -String describes event
     * @param {Object} richTextCode -used to display emoticons
     * @param {String} chatterName -Name of the player 
     * @param {Object} data 
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    gameChat: function (event, richTextCode1, richTextCode2, chatterName, data) {
        if (event == K.PokerEvents.OnChat)
            this.chat = data.message + "|" + "" + "|" + (Number(data.profileImage) - 1);
        data.orgMsg = data.message;
        data.message = richTextCode1 + chatterName + ": " + richTextCode2 + data.message + "</c>"; //\n";
        this.emit(event, data);
    },



    /**
     * @description DealerChat broadcast callback
     * @method onDealerChat
     * @param {Object} data 
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onDealerChat: function (data) {
        if(this.gameData.settings.dealerChat) {
            this.emit(K.PokerEvents.OnDealerChat, data);
        }

        // if (this.gameData.settings.dealerChat) {
        //     if (GameManager.isMobile) {
        //         data.message = data.message.replace(/Kicker/g, '<color=#FFFFFF>Kicker</color>')
        //         this.gameChat(K.PokerEvents.OnDealerChat, "<color=#FFFFFF>", "", "Dealer", data);
        //     }
        //     else {
        //         if (GameManager.gameModel.activePokerModels.length >= 2 && !GameManager.isMobile && !GameManager.isWindows && GameScreen.viewType == 1) {
        //             data.message = data.message.replace(/Kicker/g, '<color=#FFFFFF>Kicker</color>')
        //             this.gameChat(K.PokerEvents.OnDealerChat, "<color=#FFFFFF>", "", "Dealer", data);
        //         }
        //         else {
        //             data.message = data.message.replace(/Kicker/g, '<color=#000000>Kicker</color>')
        //             this.gameChat(K.PokerEvents.OnDealerChat, "<color=#000000>", "", "Dealer", data);
        //         }
        //     }
        // }
    },

    /**
     * @description Chat broadcast callback
     * @method onChat
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onChat: function (data) {
        // console.error("PlayerChat", data);
        if (data.playerId && GameManager.isPlayerMute(data.playerId)) {
            return;
        }

        if (this.gameData.settings.playerChat && !this.isPlayerStandUp()) {
            this.emit(K.PokerEvents.OnChat, data);
        }

        // if (this.gameData.settings.playerChat && !this.isPlayerStandUp()) {
        //     if (GameManager.isMobile) {
        //         this.gameChat(K.PokerEvents.OnChat, "<color=#CB2122>", "<color=#FFFFFF>", data.playerName, data);
        //     }
        //     else {
        //         if (GameManager.gameModel.activePokerModels.length >= 2 && !GameManager.isMobile && !GameManager.isWindows && GameScreen.viewType == 1) {
        //             this.gameChat(K.PokerEvents.OnChat, "<color=#CB2122>", "<color=#FFFFFF>", data.playerName, data);
        //         } else {
        //             this.gameChat(K.PokerEvents.OnChat, "<color=#000000>", "<color=#000000>", data.playerName, data);
        //         }
        //     }
        // }
    },

    /**
     * @description playerCards broadcast callback
     * @method onPlayerCards
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onPlayerCards: function (data) {
        var index = this.getPlayerById(data.playerId);
        var array = data.cards;
        this.gameData.tableDetails.players[index].cards = array;
        var cardType = []
        array.forEach(function (cardData) {
            var suit = this.getSuit(cardData.type);
            cardType.push(new card(cardData.rank, suit));
        }, this);

        if (data.playerId == this.gameData.playerId) {
            this.myCards = array;
        }
        this.emit(K.PokerEvents.OnPlayerCard, cardType, this.gameData.tableDetails.players[index].seatIndex);
    },

    /**
     * @description connectionAck broadcast callback
     * @method onConnectionAck
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onConnectionAck: function (data) {
        this.postConnectedAck();
    },

    /**
     * @description Broadcast callback on precheck
     * @method onPreCheck
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onPreCheck: function (data) {
        // console.error("PRECHECK SERVER ", data);
        this.emit(K.PokerEvents.onPreCheck, data);
    },

    /**
     * @description Updates Player's chips and emits the event
     * @method onPlayerCoins
     * @param {Object} data -channelId, playerId, amount
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onPlayerCoins: function (data) {
        if (data.channelId != this.gameData.channelId) {
            return;
        }
        var index = this.getPlayerById(data.playerId);
        this.gameData.tableDetails.players[index].chips = data.amount;
        this.emit(K.PokerEvents.onPlayerCoins, this.gameData.tableDetails.players[index]);
    },

    /**
     * @description Avatar change callback
     * @method onAvatarChange
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onAvatarChange: function (data) {
        // console.log("AVATAR CHANGE DATA POKER MODEL ", data)
        var player = this.gameData.tableDetails.players[this.getPlayerById(data.playerId)];
        if (player) {
        changeAvatar(data.avtarImage, player);
        }
    },

     /**
     * @description Avatar change callback
     * @method onSendSticker
     * @param {Object} data
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onSendSticker: function (data) {
        // const event = new cc.Event.EventCustom( K.PokerEvents.onSendSticker, true );
        // event.data = data;
        // cc.systemEvent.dispatchEvent( event );        
        GameManager.emit(K.PokerEvents.onSendSticker, data) 
    },

    /**
     * @description 
     * @method onHandTab
     * @param {Object} data 
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onHandTab: function (data) {
        // return;
        // console.log("digvijay ", data)
        if (!this.handTabs) {
            this.handTabs = [];
            // return;
        }
        if (this.handTabs.length > 10) {
            this.handTabs.shift();
        }
        data.handTab.myCards = this.myCards;
        this.myCards = [];
        this.handTabs.push(data.handTab);
        this.emit(K.PokerEvents.onHandTab, this);
    },

    /**
     * @description Broadcast callback received after the round is over.
     * @method onBestHands
     * @param {Object} data -data object stores the best hand of the player
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onBestHands: function (data) {

        if (!this.gameData.showHandStrength) {
            return;
        }

        // data.bestHand = data.bestHand.replace('Kicker', '<color=#32CD32>Kicker</color>')
        if (!!this.getMyPlayer()) {
            this.getMyPlayer().bestHand = data.bestHand;
            var playerIndex = this.getPlayerById(data.playerId);
            this.presenter.getPlayerByIdx(playerIndex).onBestHand(data.bestHand);
            this.emit(K.PokerEvents.onBestHand);
        }
    },

    onBestHandsGameOver: function (data, winners) {

        // if (!this.gameData.showHandStrength) {
        //     return;
        // }

        // data.bestHand = data.bestHand.replace('Kicker', '<color=#32CD32>Kicker</color>')
        // data.winners

        // [
        //     {
        //         "set": [
        //             {
        //                 "type": "spade",
        //                 "rank": 1,
        //                 "name": "A",
        //                 "priority": 14
        //             },
        //             {
        //                 "type": "heart",
        //                 "rank": 1,
        //                 "name": "A",
        //                 "priority": 14
        //             },
        //             {
        //                 "type": "diamond",
        //                 "rank": 12,
        //                 "name": "Q",
        //                 "priority": 12
        //             },
        //             {
        //                 "type": "spade",
        //                 "rank": 11,
        //                 "name": "J",
        //                 "priority": 11
        //             },
        //             {
        //                 "type": "club",
        //                 "rank": 9,
        //                 "name": "9",
        //                 "priority": 9
        //             }
        //         ],
        //         "type": "One Pair",
        //         "playerId": "5828855918",
        //         "priority": 2,
        //         "winnerRank": 1,
        //         "winningHand": [
        //             {
        //                 "type": "spade",
        //                 "rank": 1,
        //                 "name": "A",
        //                 "priority": 14
        //             },
        //             {
        //                 "type": "heart",
        //                 "rank": 1,
        //                 "name": "A",
        //                 "priority": 14
        //             }
        //         ],
        //         "text": "One Pair As, Q",
        //         "winningAmount": 19,
        //         "potIndex": 0,
        //         "amount": 19,
        //         "internalPotSplitIndex": "0",
        //         "isRefund": false,
        //         "isRit": false,
        //         "chips": 559,
        //         "handCard": [],
        //         "boardCard": [
        //             {
        //                 "type": "spade",
        //                 "rank": 1,
        //                 "name": "A",
        //                 "priority": 14
        //             },
        //             {
        //                 "type": "heart",
        //                 "rank": 1,
        //                 "name": "A",
        //                 "priority": 14
        //             }
        //         ]
        //     }
        // ]

        for (var i = 0; i < data.length; i++) {
            var playerIndex = this.getPlayerById(data[i].playerId);
            if (playerIndex != -1) {
                let player = this.presenter.getPlayerByIdx(playerIndex);
                if (player) {

                    let isWinner = false;
                    for (var j = 0; j < winners.length; j++) {
                        if (winners[j].playerId == data[i].playerId) {
                            isWinner = true;
                            break;
                        }
                    }
                    player.onBestHandsGameOver(data[i].bestHand, isWinner);
                }
            }
        }
    },

    onRebuyActivated: function (data) {

        // data.bestHand = data.bestHand.replace('Kicker', '<color=#32CD32>Kicker</color>')
        this.emit('rebuyActivated', data);
    },

    onRebuyDeactivated: function (data) {

        // data.bestHand = data.bestHand.replace('Kicker', '<color=#32CD32>Kicker</color>')
        this.emit('rebuyDeactivated', data);
    },

    onResRebuy: function (data) {

        // data.bestHand = data.bestHand.replace('Kicker', '<color=#32CD32>Kicker</color>')
        this.emit('resRebuy', data);
    },

    onResAddon: function (data) {

        // data.bestHand = data.bestHand.replace('Kicker', '<color=#32CD32>Kicker</color>')
        this.emit('resAddon', data);
    },

    onInactiveKicked: function (data) {

        // data.bestHand = data.bestHand.replace('Kicker', '<color=#32CD32>Kicker</color>')
        this.emit('inactiveKicked', data);
    },    

    onTournamentCancelled: function (data) {

        // data.bestHand = data.bestHand.replace('Kicker', '<color=#32CD32>Kicker</color>')
        this.emit('TournamentCancelled', data);
    },

    /**
     * @description creates and returns the card based on inputs
     * @method getCardByData
     * @param {Object} cardData -holds card value and suit
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    getCardByData: function (cardData) {
        var suit = this.getSuit(cardData.type);
        return (new card(cardData.rank, suit));
    },

    // onRebuyStart: function (response) {
    //     this.emit(K.PokerEvents.onRebuyStart, response);
    // },

    // /**
    // * @description Emits event on poker presenter when Rebuy timer starts
    // * @method onRebuyEnd
    // * @param {Object} response
    // * @memberof Screens.Gameplay.Game.PokerModel#
    // */
    // onRebuyEnd: function (response) {
    //     this.emit(K.PokerEvents.onRebuyEnd, response);
    // },

    // /**
    //  * @description Emits event on poker presenter when Break timer starts
    //  * @method onBreakStart
    //  * @param {Object} response
    //  * @memberof Screens.Gameplay.Game.PokerModel#
    //  */
    // onBreakStart: function (response) {
    //     this.emit(K.PokerEvents.onBreakTimeStart, response);
    // },

    // /**
    //  * @description Emits event on poker presenter when Break timer ends
    //  * @method onBreakEnd
    //  * @param {Object} response
    //  * @memberof Screens.Gameplay.Game.PokerModel#
    //  */
    // onBreakEnd: function (response) {
    //     this.emit(K.PokerEvents.onBreakTimeEnd, response);
    // },

    /**
     * @description Broadcast callback, emits event on poker presenter
     * @method onPlayerRankChange
     * @param {Object} response 
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    onPlayerRankChange: function (response) {
        this.emit(K.PokerEvents.onPlayerRankChange, response);
    },

    setMuckHand: function (selection, callback) {
        var data = new SetPlayerValData(this.gameData.channelId, this.gameData.playerId, "isMuckHand", selection);
        ServerCom.pomeloRequest(K.PomeloAPI.updateTableSettings, data, function (response) {
            if (response.success) {
                // this.getMyPlayer().isMuckHand = !this.getMyPlayer().isMuckHand;
                this.gameData.settings.isMuckHand = !this.gameData.settings.isMuckHand;
            }
            if (!!callback) {
                callback(response);
            }
        }.bind(this), null, 5000, false);

    },

    // getPlayerMute: function(channelId, cb) {
    //     let inst = this;

    //     // if (this.presenter.isTournament()) {
    //     //     ServerCom.socketIORequest("tournamentGameEvent|getPlayerMute", {
    //     //         "channelId": channelId
    //     //     }, 
    //     //     function(response){
    //     //         console.log("getPlayerMute", response);
    //     //         if(response.success) {
    //     //             inst.presenter.playerSettingMute = response.playerSettingMute;
    //     //             if (cb) {
    //     //                 cb(response);
    //     //             }
    //     //         }
    //     //         else {
    //     //         }
    //     //     }, null, null, false);
    //     // }
    //     // else {
    //         ServerCom.pomeloRequest("connector.entryHandler.getPlayerMute", {
    //             "playerId": GameManager.user.playerId,
    //             "isLoggedIn": true,
    //             "access_token": K.Token.access_token,
    //         }, function(response){
    //             console.log("connector.entryHandler.getPlayerMute", response);
    //             if(response.success) {
    //                 inst.presenter.playerSettingMute = response.playerSettingMute;
    //                 if (cb) {
    //                     cb(response);
    //                 }
    //             }
    //             else {
    //             }
    //         }, null, 5000, false);  
    //     // }
    // },

    // changePlayerMute: function(playerId, cb) {
    //     let inst = this;

    //     // if (this.presenter.isTournament()) {
    //     //     ServerCom.socketIORequest("tournamentGameEvent|changePlayerMute", {
    //     //         "channelId": channelId,
    //     //         "tournamentId": roomId,
    //     //         "players": [
    //     //             {
    //     //                 "playerId": playerId,
    //     //                 "playerName": playerName,
    //     //                 "mute": flag
    //     //             }
    //     //         ]
    //     //     }, 
    //     //     function(response){
    //     //         console.log("changePlayerMute", response);
    //     //         if(response.success) {
    //     //             inst.presenter.playerSettingMute = response.playerSettingMute;
    //     //             if (cb) {
    //     //                 cb(response);
    //     //             }
    //     //         }
    //     //         else {
    //     //         }
    //     //     }, null, null, false);
    //     // }
    //     // else {
    //         ServerCom.pomeloRequest("connector.entryHandler.changePlayerMute", {
    //             "playerId": GameManager.user.playerId,
    //             "isLoggedIn": true,
    //             "access_token": K.Token.access_token,
    //             "playerIdMute": playerId
    //         }, function(response){
    //             console.log("connector.entryHandler.changePlayerMute", response);
    //             if(response.success) {
    //                 inst.presenter.playerSettingMute = response.playerSettingMute;
    //                 inst.emit("changePlayerMute");
    //                 if (cb) {
    //                     cb(response);
    //                 }
    //             }
    //             else {
    //             }
    //         }, null, 5000, false); 
    //     // } 
    // },

    // isPlayerMute: function(playerId) {
    //     // [
    //     //     {
    //     //         "playerId": "d884bb8a-997a-4be7-ad87-bd35efb0df65",
    //     //         "playerName": "supersu92",
    //     //         "mute": false
    //     //     }
    //     // ]

    //     if (this.presenter.playerSettingMute) {
    //         for (var i = 0; i < this.presenter.playerSettingMute.players.length; i++) {
    //             if (this.presenter.playerSettingMute.players[i].playerId == playerId) {
    //                 return true;
    //             }
    //         }
    //     }

    //     return false;
    // }

});

module.exports = {
    SitOutMode: SitOutMode,
    PokerModel: PokerModel,
};


