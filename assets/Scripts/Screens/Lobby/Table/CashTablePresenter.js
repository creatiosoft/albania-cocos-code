// inherits Table.js
// 
var JoinData = require('PostTypes').JoinChannel;
var Table = require('Table');
var TableContent = require('TableContent');
// var Checkbox = require('Checkbox');
var DropDownType = require('DropDown');
var timerID = null;
var LoginData = require('PostTypes').Login;
var PopUpType = require('PopUpManager').PopUpType;

/**
 * @class CashTablePresenter
 * @classdesc handles table view manipulation for cash 
 * @extends Table
 * @memberof Screens.Lobby.Table
 */
var CashTablePresenter = cc.Class({
    extends: Table,

    properties: {
        top: {
            default: null,
            type: cc.Node,
        },
        top2: {
            default: null,
            type: cc.Node,
        },
        room: {
            default: null,
            type: cc.Label,
        },
        tables: {
            default: null,
            type: cc.Label,
        },
        blinds: {
            default: null,
            type: cc.Label,
        },
        players: {
            default: null,
            type: cc.Label,
        },
        minbuyin: {
            default: null,
            type: cc.Label,
        },
        buyCounter: {
            default: 0,
            visible: false,
        },
        playerCounter: {
            default: 0,
            visible: false,
        },
        gameTypeDropdown: {
            default: null,
            type: DropDownType,
        },
        stakesDropdown: {
            default: null,
            type: DropDownType,
        },
        maxPlayersDropdown: {
            default: null,
            type: DropDownType,
        },
        hideFullTablesCB: {
            default: null,
            type: cc.Toggle
        },
        favTableCB: {
            default: null,
            type: cc.Toggle
        },
        sideTableInfoPrefab: {
            default: null,
            type: cc.Node,
        },
        tableInfoHolder: {
            default: null,
            type: cc.Node,
        },
        // tempSelection: null,
        favPrimaryCB: {
            default: null,
            type: cc.Toggle,
        },
        sideTableNameLbl: {
            default: null,
            type: cc.Label,
        },
        sideTableInfo: {
            default: null,
            type: cc.Node,
        },
        selectedTableDetails: {
            default: null,
            type: cc.Node,
        },
        selectedTableDetailsTour: {
            default: null,
            type: cc.Node,
        },
        joinWaitingListBtn: {
            default: null,
            type: cc.Button,
        },

        joinBtn: {
            default: null,
            type: cc.Node,
        },

        avgPotLbl: {
            default: null,
            type: cc.Label,
        },
        numWaitingPlayers: {
            default: null,
            type: cc.Label,
        },
    },

    statics: {
        init: false,
    },

    /**
     * @method onEnable
     * @description Life Cycle callback, call super() method; 
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    onEnable: function () {
        this._super();

        if (!GameManager.isMobile) {
            // this.selectedTableDetails.active = true;
            // this.selectedTableDetailsTour.active = false;
        }

        if (!GameManager.isMobile && this.DropDownData) {
            // this.initDropDowns(this.DropDownData.normal);
        }


        GameManager.on("waiting_List_Event", function (channelId, flag) {
            if (TableContent.prevSelection !== null && TableContent.prevSelection.channelData._id == channelId) {
                this.onAlreadyJoined(flag);
            }
        }.bind(this));

    },

    onRoomUpdate: function (eventData) {
        console.log('onRoomUpdate', eventData);
        GameManager.emit("onRoomUpdate2", eventData);
        if (eventData._id == this.roomId) {
            if (eventData.updated) {
                // this.players.string = 'Players: ' + eventData.updated.playingPlayers;
            }
        }
    },


    /**
     * @method tableContentClick
     * @description Method called for everytime a table is clicked
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    tableContentClick: function () {
        if (TableContent.prevSelection !== null) {
            this.tempSelection = this.contentPool.indexOf(TableContent.prevSelection.node);
        }
        // if (!GameManager.isMobile)
        //     this.refreshSideTable();
    },

    /**
     * @method addTable
     * @description Add Table From DashBoard to lobby!
     * @param {object} data -Table content data!
     * @memberof  CashTablePresenter#
     */
    addTable: function (data) {
        if (data.updated.channelType == K.ChannelType.Normal) {
            this._super(data);
        }
    },


    onHFTSound: function () {
        GameManager.playSound(K.Sounds.click);
// console.log("HFT")
        this.applyFilter();
    },
    
    formatNumber: function(num) {
        if (num < 1000) {
            return num;
        }
        if (num < 1000000) {
            if (num == 1000) {
                return '1k';
            }
            else {
                return (num / 1000).toFixed(1) + 'k';
            }
        }
        return (num / 1000000).toFixed(1) + 'm';
    },
    


    /**
     * @method makeContent
     * @description Returns content array based on table data
     * @param {object} data -
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    makeContent: function (data) {

        // make data - need more datas from server
        if (this.variation == K.Variation.OpenFaceChinesePoker) {
            var content = [data.channelName, data.chipsPointRatio, data.channelVariation, GameManager.getGameTypeByValue(data.turnTime), data.minBuyIn, data.maxBuyIn, data.playingPlayers + "/" + data.maxPlayers, data.queuePlayers];
        } else {
            if (data && data.avgPot) {
                //this is done because the avg stack is  used to set avgpot; askVivek
                data.avgStack = data.avgPot;
            }
            let variation = data.channelVariation;
            switch (data.channelVariation) {
                case K.Variation.TexasHoldem:
                    variation = LocalizedManager.t( 'TXT_HOLDEM' );
                    break;
                case K.Variation.Omaha:
                    variation = LocalizedManager.t( 'TXT_OMAHA' );
                    break;
                case K.Variation.OmahaHiLo:
                    variation = LocalizedManager.t( 'TXT_OMAHA_HI_LO' );
                    break;
                default:
                    variation = data.channelVariation;
                     break;
            }
            // if (!GameManager.isMobile)
            // var content = [data.channelName, data.smallBlind + "/" + data.bigBlind, variation, data.minBuyIn, data.maxBuyIn, data.playingPlayers + "/" + data.maxPlayers, data.queuePlayers, " " + data.avgStack, parseInt(data.flopPercent)];
                // var content = [data.channelName, data.smallBlind + "/" + data.bigBlind, variation, data.minBuyIn, data.maxBuyIn, data.playingPlayers + "/" + data.maxPlayers, parseInt(data.flopPercent), " " + data.avgStack, data.queuePlayers];
            // else
            var content = [
                data.channelName, 
                "" + GameManager.convertChips(data.smallBlind) + "/" + "" + GameManager.convertChips(data.bigBlind), 
                "" + GameManager.convertChips(data.minBuyIn), 
                "",
                "",
                data.playingPlayers + "/" + data.maxPlayers
            ];
        }

        return content;
    },

    /**
     * @method onJoinTable
     * @description Join button callback(Observe btn)
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    onJoinTable: function () {
        // GameManager.playSound(K.Sounds.click);
        if (TableContent.prevSelection === null) {
            return;
        }
        var data = new JoinData(TableContent.prevSelection.channelData);
        console.log('onJoinTable ',  data);
        var route = K.PomeloAPI.joinChannel;
        if (this.variation == window.K.Variation.OpenFaceChinesePoker) {
            route = require("OFCConfigs").PomeloAPI.joinChannel;
        }
        GameManager.join(TableContent.prevSelection.channelData._id, route, data);
    },

    /**
     * @method onJoinWaitinList
     * @description Show Join Waiting List String over join Button and call joinWaitingList  of TableHandler
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    onJoinWaitingList: function () {
        // console.log("JOIN TABLE CLICKED ")
        if (TableContent.prevSelection === null) {
            return;
        }
        var flag = this.joinWaitingListBtn.node.children[0].children[2].getComponent(cc.Label).string == LocalizedManager.t('TXT_JOIN_WAITTING');
        if (TableContent.prevSelection.channelData.isPrivateTabel == "true" && !TableContent.prevSelection.joinEffect.active && flag) {
            let func = function (response, closePopupFunc) {
                if (response.success) {
                    GameManager.emit("waiting_List_Event", response.channelId, flag);
                    // this.onAlreadyJoined(flag);
                    closePopupFunc();
                }
            }.bind(this);

            let privateData = {
                type: "WAITING_LIST",
                flag: flag,
                id: TableContent.prevSelection.channelData._id,
                cb: func,
                toCallFunction: this.handler.joinWaitingList,
            };
            GameManager.popUpManager.show(30, privateData, function () {});

        } else {
            this.handler.joinWaitingList(flag, TableContent.prevSelection.channelData._id, function (response) {
                if (response.success) {

                    GameManager.emit("waiting_List_Event", response.channelId, flag);
                    // this.onAlreadyJoined(flag);
                }
            }.bind(this), function (errorResponse) {});
        }
    },

    /**
     * @method onAlreadyJoined
     * @description set join/unjoin value of join button!
     * @param {boolean} flag -
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    onAlreadyJoined: function (flag) {
        if (!GameManager.isMobile)
            this.joinWaitingListBtn.node.children[0].children[2].getComponent(cc.Label).string = flag ? LocalizedManager.t('TXT_UNJOIN_WAITTING') : LocalizedManager.t('TXT_JOIN_WAITTING');;
    },


    /**
     * @method onAutoSit
     * @description Autosit callback(join button)
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    onAutoSit: function () {
        // GameManager.playSound(K.Sounds.click);
        if (TableContent.prevSelection === null) {
            return;
        }
        var data = new JoinData(TableContent.prevSelection.channelData);
        data.seatIndex = GameManager.getPreferredSeat(data.maxPlayers);
        data.imageAvtar = ""; //GameManager.user.profileImage;
        var route = K.PomeloAPI.autoSit;
        if (this.variation == window.K.Variation.OpenFaceChinesePoker) {
            route = require("OFCConfigs").PomeloAPI.autoSit;
        }
        GameManager.join(TableContent.prevSelection.channelData._id, route, data)
    },

    /**
     * @method onSideTableUpdate
     * @description Update the side table of Cash
     * @param {object} data -Data for side table update
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    onSideTableUpdate: function (data) {
        if (TableContent.prevSelection == null || this.contentPool.length == 0) {
            return;
        }
        if (!data.tournamentId) {
            if (TableContent.prevSelection.channelData._id == data._id && this.currentSideTableData) {
                switch (data.event) {
                    case "TABLEVIEWNEWPLAYER":
                        data.updated.playerId = data.playerId;
                        this.currentSideTableData.players.push(data.updated);
                        this.currentSideTableData.isTableFull = TableContent.prevSelection.channelData.maxPlayers == this.currentSideTableData.players.length;
                        if (!this.currentSideTableData.isAlreadyPlaying)
                            this.currentSideTableData.isAlreadyPlaying = (data.playerId == GameManager.user.playerId);
                        break;
                    case "TABLEVIEWLEFTPLAYER":
                        this.removePlayer(data.playerId, this.currentSideTableData.players);
                        this.currentSideTableData.isTableFull = TableContent.prevSelection.channelData.maxPlayers == this.currentSideTableData.players.length;
                        if (data.playerId == GameManager.user.playerId)
                            this.currentSideTableData.isAlreadyPlaying = false;
                        break;
                    case "TABLEVIEWCHIPSUPDATE":
                        this.updateChips(data.playerId, data.updated.chips);
                        break;
                    case "TABLEVIEWNEWWAITINGPLAYER":
                        data.updated.playerId = data.playerId;
                        this.currentSideTableData.waitingPlayer.push(data.updated);
                        if (!this.currentSideTableData.isJoinedWaitingList)
                            this.currentSideTableData.isJoinedWaitingList = (data.playerId == GameManager.user.playerId);
                        break;
                    case "TABLEVIEWLEFTWAITINGPLAYER":
                        this.removePlayer(data.playerId, this.currentSideTableData.waitingPlayer);
                        if (data.playerId == GameManager.user.playerId)
                            this.currentSideTableData.isJoinedWaitingList = false;
                        break;
                }
                // if (!GameManager.isMobile)
                //     this.refreshSideTable(false);
            }
        }
    },

    /**
     * @method setSideTableData
     * @description setSideTableData
     * @param {object} response - Data received from server to set in side table!
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    setSideTableData: function (response) {
        GameManager.removeAllChildren(this.tableInfoHolder);
        // callback
        if (TableContent.prevSelection != null && !GameManager.isMobile) {

            this.sideTableNameLbl.string = TableContent.prevSelection.channelData.channelName;
        }
        // console.log("VICTIMISED", response);
        if (response.success) {
            this.currentSideTableData = response;
            this.joinWaitingListBtn.node.active = response.isTableFull;
            this.onAlreadyJoined(response.isJoinedWaitingList);
            this.joinBtn.active = !response.isAlreadyPlaying;

            this.avgPotLbl.string = response.avgStack;
            this.numWaitingPlayers.string = response.waitingPlayer.length;

            if (response.isAlreadyPlaying) {
                this.joinWaitingListBtn.node.active = response.isAlreadyPlaying ? false : true;
            }
            if (TableContent.prevSelection != null && TableContent.prevSelection.channelData.isPrivateTabel == "true") {
                if (!TableContent.prevSelection.joinEffect.active) {
                    return;
                }
            }
            if (!GameManager.isMobile) {
                if (response.players.length > 0) {
                    for (var i = 0; i < response.players.length; i++) {
                        this.addPlayerInView(response.players[i]);
                    }
                }
                if (response.waitingPlayer.length > 0) {
                    for (var i = 0; i < response.waitingPlayer.length; i++) {
                        this.addPlayerInView(response.waitingPlayer[i], true);
                    }
                }
            }
        }
    },

    /**
     * @method addPlayerInView
     * @description  Display player's name in side table
     * @param {object} player -Player's data
     * @param {boolean} isWaiting -flag to show if player is waiting or not
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    addPlayerInView: function (player, isWaiting = false) {
        if (GameManager.isMobile) {
            return;
        }
        var obj = cc.instantiate(this.sideTableInfoPrefab);
        obj.active = true
        this.tableInfoHolder.addChild(obj);
        obj.getChildByName('Name').getComponent(cc.Label).string = player.playerName;
        var text = isWaiting ? "Waiting" : (player.chips || player.points || 0).roundOff(2);
        obj.getChildByName('Chips').getComponent(cc.Label).string = text;
    },


    /**
     * @method removePLayer
     * @description Remove player from data.
     * @param {String} playerId -Id to check
     * @param {Array} playerArray -List of all players!   
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    removePlayer: function (playerId, playersArray) {

        if (playersArray.length > 0) {
            var index = -1;
            for (var i = 0; i < playersArray.length; i++) {
                if (playersArray[i].playerId == playerId) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                playersArray.splice(index, 1);
            }
        }
    },

    /**
     * @method updateChips
     * @description updateChips of any player
     * @param {String} playerId -Id to check
     * @param {Array} playerArray -List of players!
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    updateChips: function (playerId, chips) {
        if (this.currentSideTableData.players.length > 0) {
            var index = -1;
            for (var i = 0; i < this.currentSideTableData.players.length; i++) {
                if (this.currentSideTableData.players[i].playerId == playerId) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                this.currentSideTableData.players[index].chips = chips;
            }
        }
    },

    onBuyInConfirm: function (index, amount) {
        let self = this;
        ServerCom.pomeloRequest(
            'room.channelHandler.quickSeat', 
            {
                roomId: this.roomId,
                isLoggedIn: true,
                access_token: K.Token.access_token,
                imageAvtar: '',
                chips: Number(amount),
                playerId: GameManager.user.playerId,
                playerName: GameManager.user.userName,
                isRequested: true,
                // channelVariation: "All",
                // minBuyIn: room.minBuyIn,
                // maxPlayers: room.maxPlayers

            }, 
            function (response) {
                console.log(response);
                // console.log(self.handler.contents);
                // var data = new JoinData(TableContent.prevSelection.channelData);
                var route = K.PomeloAPI.joinChannel;
                GameManager.join2(response.data.channelId, route, {
                    "channelId": response.data.channelId, 
                    "isRequested": true,  
                    "channelType": response.data.channelType,
                    "tableId": '',
                    "playerId": GameManager.user.playerId,
                    "playerName": GameManager.user.userName,
                    "networkIp": LoginData.ipV4Address,
                    'maxPlayers': 5,
                    'isPrivateTable': false
                });
            }
        );
    },

    quickSeat: function() {

        console.log(this.roomData);

        let room = null;
        for (var i = 0; i < this.roomData.length; i++) {
            if (this.roomData[i]._id == this.roomId) {
                room = this.roomData[i];
                break;
            }
        }
        if (!room) {
            return;
        }



        if (GameScreen != null) {
            if(GameManager.isMobile) {
                GameManager.activeTableCount = GameScreen.gridParent.getComponent(cc.PageView).getPages().length;
            }
            else {
                GameManager.activeTableCount = GameScreen.gridParent.children.length;
            }
        } else {
            GameManager.activeTableCount = 0;
        }

        if (GameManager.activeTableCount >= GameManager.maxTableCounts) {
            GameManager.popUpManager.show(PopUpType.MaxTablesJoinedPopup, null, function () { });
            return;
        }


        var data = {};
        data.minValue = room.minBuyIn;
        data.maxValue = room.maxBuyIn;
        const text_chips = LocalizedManager.t('TXT_AVAILABLE_CHIPS') + ':';
        if (GameManager.user.category == "DIAMOND") {
            data.totalChips = GameManager.user.realChips;
        } else {
            data.totalChips = GameManager.user.freeChips;
        }
        data.dialogHeadingText = text_chips;

        data.autoBuyIn = GameManager.user.autoBuyIn;
        // data.index = index;
        data.confirm = this.onBuyInConfirm.bind(this);
        // data.onSitHere = true;
        data.channelId = room._id;
        data.isRealMoney = true;
        data.autoConfirm = true;
        data.isAllInAndFold = room.isAllInAndFold;
        data.topHeading = LocalizedManager.t('TXT_BUY_IN');
        data.quickSeat = true;
        GameManager.popUpManager.show(PopUpType.BuyInPopup, data, function () { });

    },

    leaveLobby: function () {
        this.contentHolder.removeAllChildren();
    },

});
