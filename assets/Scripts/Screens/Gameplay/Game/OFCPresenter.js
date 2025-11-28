/**
 * @class OFCPresenter
 * @classdesc Handles OFCPresenter
 * @extends PokerPresenter
 * @memberof Screens.Gameplay.Game
 */
var OFCModelType = require('OFCModel');
var PokerPresenter = require("PokerPresenter");
var K = require("OFCConfigs");
var PopUpType = require('PopUpManager').PopUpType;

cc.Class({
    extends: PokerPresenter,

    properties: {
        model: {
            default: null,
            type: OFCModelType,
            override: true,
        },
        threePlayerView: {
            default: null,
            type: cc.Prefab,
        },
        ofcCardHolder: {
            default: null,
            type: cc.Node,
        },
        ofcCardPrefab: {
            default: null,
            type: cc.Prefab,
        },
        submitBtn: {
            default: null,
            type: cc.Node,
        },
        ofcDiscardedCardHolder: {
            default: null,
            type: cc.Node,
        },
        onCardDragStopRef: null,
        dragManager: null,
    },

    /**
     * @description Sets tiled/untiled view
     * @method setTiledView
     * @param {boolean} flag 
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    setTiledView: function (flag) {
        this.highlightBg.node.active = flag ? this.highLightCheckbox.getSelection() : false;
        this.unTiledView.active = !flag;
        this.tiledView.active = flag;
        this.unTiledView.active = false;
        this.tiledView.getChildByName('TopLeft').getChildByName('AddChipsButton').active = false;
        // var isTournament = this.model.gameData.channelType == K.ChannelType.Tournament || this.model.isPlayerStandUp();
        this.tiledView.getChildByName('TopLeft').getChildByName('StandUpButton').active = false;
    },

     /**
     * @description Manages buttons for ofc game
     * @method manageBtns
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    manageBtns: function (val) {
        this.sitOutNextHandCheckBox.node.parent.active = val;
        // var isTournament = this.model.gameData.channelType == K.ChannelType.Tournament || this.model.isPlayerStandUp();
        this.tiledView.getChildByName('TopLeft').getChildByName('StandUpButton').active = false;
    },

     /**
     * @description Sets tiled/untiled view
     * @method loadSeats
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    loadSeats: function () {
        switch (this.model.roomConfig.maxPlayers) {
            case 2:
                this.instantiateSeats(1, 2, cc.instantiate(this.twoPlayerView), this.twoPlayerView, "OFCPlayerPresenter");
                break;
            case 3:
                this.instantiateSeats(2, 3, cc.instantiate(this.threePlayerView), this.threePlayerView, "OFCPlayerPresenter");
                break;
            default:
                this.instantiateSeats(2, 3, cc.instantiate(this.threePlayerView), this.threePlayerView, "OFCPlayerPresenter");
                break;
        }
    },

    /**
     * @description Called after every game for resetting view
     * @method resetGame
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    resetGame: function () {
        this.popUpManager.hide(PopUpType.PlayerInfoPopup, function () { });
        this.clearHoleCards();
        this.clearDiscardedCards();
        this.initDropzones();
        this.playerHand.forEach(function (element) {
            element.resetPlayerView();
        }, this);
    },

    /**
     * @description 
     * @method allocateSeat
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    allocateSeat: function () {
        this._super();
        if (this.model.gameData.tableDetails.state !== K.GameState.Running) {
            this.submitBtn.active = false;
        }
    },

    /**
     * @description 
     * @method onLoad
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    onLoad: function () {
        this.K = require("OFCConfigs");
        this.dragManager = this.getComponent('DragManager');
        this.initDropzones();
        this.model.on(K.PokerEvents.OnJoin, this.onJoinSuccess.bind(this));
        this.model.on(K.PokerEvents.OnSit, this.sitSuccess.bind(this));
        this.model.on(K.PokerEvents.OnPlayerStateChange, this.playerStateChange.bind(this));
        this.model.on(K.PokerEvents.OnGamePlayers, this.resetGame.bind(this));
        this.model.on(K.PokerEvents.OnDealerChat, this.dealerChat.bind(this));
        this.model.on(K.PokerEvents.OnStartGame, this.startGame.bind(this));
        this.model.on(K.PokerEvents.OnTurn, this.nextTurn.bind(this));
        this.model.on(K.PokerEvents.OnGameOver, this.gameOver.bind(this));
        this.model.on(K.PokerEvents.OnLeave, this.playerLeft.bind(this));
        this.model.on(K.PokerEvents.OnChat, this.chat.bind(this));
        this.model.on(K.PokerEvents.OnPlayerCard, this.playerCards.bind(this));
        this.model.on(K.PokerEvents.onRotateView, this.rotateView.bind(this));
        this.model.on(K.PokerEvents.onPlayerNotes, this.onPlayerNotes.bind(this));
        this.model.on(K.PokerEvents.onPlayerCoins, this.onPlayerCoins.bind(this));
        this.model.on(K.PokerEvents.onGameStateChange, this.onGameStateChange.bind(this));
        this.model.on(K.PokerEvents.onOfcFirstRoundCards, this.onOfcFirstRoundCards.bind(this));
        this.model.on(K.PokerEvents.OnBankrupt, function (data) {
            this.onAddChips(this.model.roomConfig.minBuyIn);
        }.bind(this));
        this.sitOutNextHandCheckBox.registerCallback(this.onSitOutNextHand.bind(this));
        this.tempOnLoad();
        this.chatSubmitBtn = GameScreen.chatBtn;
        this.onCardDragStopRef = this.onCardDragStop.bind(this);
        this.dragManager.on('onCardDragStop', this.onCardDragStopRef);
    },

    /**
     * @description 
     * @method onCardDragStop
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    onCardDragStop: function (dropZone, dragElement) {
        var myPlayer = this.getMyPlayer();
        var cardHolder = this.playerHand[this.getRotatedSeatIndex(myPlayer.seatIndex)].cardHolder;
        if (dropZone == null) {
            dragElement.getComponent('Card').returnToOriginalPosition();
            return;
        } else if (dropZone.parent.parent != cardHolder || dragElement.parent.parent != dropZone.parent) {
            //Drop at the current dropzone and check for overlapping cards
            if (!!dropZone.getComponentInChildren('Card')) {
                dragElement.getComponent('Card').returnToOriginalPosition();
            } else {
                if (dropZone.parent.parent == cardHolder) {
                    for (var i = 0; i < dropZone.parent.children.length; i++) {
                        var element = dropZone.parent.children[i];
                        var temp1 = element.getComponentInChildren('Card');
                        if (!!temp1) {
                            temp1.getComponent('CardMovement').enableDragging = false;
                        }
                    }
                }
                if (dropZone.parent.parent != cardHolder || dragElement.parent.parent != dropZone.parent) {
                    for (var i = 0; i < dragElement.parent.parent.children.length; i++) {
                        var element = dragElement.parent.parent.children[i];
                        var temp1 = element.getComponentInChildren('Card');
                        if (!temp1) {
                            if (i > 1)
                                dragElement.parent.parent.children[i - 2].getComponentInChildren('CardMovement').enableDragging = true;
                            break;
                        } else if (i == dragElement.parent.parent.children.length - 1) {
                            dragElement.parent.parent.children[i - 1].getComponentInChildren('CardMovement').enableDragging = true;
                        }
                    }
                }

                if (dropZone.parent.parent == cardHolder) {
                    for (var i = 0; i < dropZone.parent.children.length; i++) {
                        var element = dropZone.parent.children[i];
                        if (!element.getComponentInChildren('Card')) {
                            dropZone = element;
                            break;
                        }
                    }
                }
                dragElement.parent = dropZone;
                dragElement.position = new cc.Vec2(0, 0);
                dragElement.width = dragElement.parent.getChildByName('base').width;
                dragElement.height = dragElement.parent.getChildByName('base').height;
                dragElement.getComponent('Card').setOriginalPosition(dragElement.position);
            }
            //stop dragging of discarded card
            var count = 0;
            var card = null;
            for (var i = 0; i < this.ofcCardHolder.children.length; i++) {
                var temp = this.ofcCardHolder.children[i].getComponentInChildren('Card');
                if (!!temp) {
                    count++;
                    temp.getComponent('CardMovement').enableDragging = true;
                    card = temp;
                }
            }
            var roundName = this.getMyPlayer().roundName || 'ONE';
            //discarded card dragging stop
            if (!!card && roundName != 'ONE') {
                this.activateSubmitBtn(count == 1);
                if (count == 1) {
                    card.getComponent('CardMovement').enableDragging = false;
                }
            } else {
                this.activateSubmitBtn(count == 0);
            }
        } else {
            dragElement.getComponent('Card').returnToOriginalPosition();
        }
    },

    /**
     * @description 
     * @method initDropzones
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    initDropzones: function () {
        this.dragManager.dropZones = [];
        for (var i = 0; i < this.ofcCardHolder.children.length; i++) {
            this.dragManager.addDropZone(this.ofcCardHolder.children[i]);
        }
    },

    /**
     * @description 
     * @method onDestroy
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    onDestroy: function () {
        this.model.removeAllListeners();
    },

    /**
     * @description sit out next bb btn is not there
     * @method handleSitOutBtns
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    handleSitOutBtns: function (val) {
        this.resumeBtn.active = !val;
        this.sitOutNextHandCheckBox.setSelection(!val);
        this.sitOutNextHandCheckBox.node.parent.active = val && this.model.gameData.channelType == K.ChannelType.Normal && !this.model.isPlayerStandUp();
    },

    /**
     * @description 
     * @method handleSitoutResponse
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    handleSitoutResponse: function (response) {
        if (response.success) {
            this.sitOutNextHandCheckBox.setSelection(true);
        } else {
            this.sitOutNextHandCheckBox.setSelection(false);
        }
    },

    /**
     * @description gameStart pokerModel event callback
     * @param {Object} data
     * @method startGame
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    startGame: function (data) {
        var players = this.model.gameData.tableDetails.players;
        for (var index = 0; index < players.length; index++) {
            var presenter = this.playerHand[this.getRotatedSeatIndex(players[index].seatIndex)];
            presenter.enablePlayerView(this.model.gameData.playerId);
        }
        this.playerHand[this.getRotatedSeatIndex(data.dealerIndex)].setDealer(true);
        this.enableCurrentPlayerTurn(true);
        //this.onGameStateChange(this.model.gameData.tableDetails.state);
    },

    /**
     * @description turn pokerModel event callback
     * @param {Object} data
     * @method nextTurn
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    nextTurn: function (data, previousIndex) {
        var previousIndex = this.model.gameData.tableDetails.players[previousIndex].seatIndex;
        if (!this.getMyPlayer() || previousIndex != this.getMyPlayer().seatIndex) {
            this.playerHand[this.getRotatedSeatIndex(previousIndex)].displayMove(data.cards);
        } else {
            if (data.isRequested) {
                this.playerHand[this.getRotatedSeatIndex(previousIndex)].resetTimer();
            } else {
                this.playerHand[this.getRotatedSeatIndex(previousIndex)].displayMove(data.cards);
            }
        }
        if (!!data.royalities)
            this.playerHand[this.getRotatedSeatIndex(previousIndex)].displayRoyalities(data.royalities);
        this.enableCurrentPlayerTurn();
    },

    /**
     * @description 
     * @method enableCurrentPlayerTurn
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    enableCurrentPlayerTurn: function (firstTurn = false) {
        this.activateSubmitBtn(false);
        var currentIdx = this.model.gameData.tableDetails.currentMoveIndex;
        if (currentIdx === "") {
            return;
        }
        if (currentIdx !== -1) {
            var playerPresenter = this.playerHand[this.getRotatedSeatIndex(currentIdx)];
            playerPresenter.onTurn(this.model.gameData.tableDetails.turnTime);
            if (!firstTurn && this.model.gameData.tableDetails.players[this.model.getPlayerBySeat(currentIdx)].roundName != K.RoundNames.one) {
                this.generateTableCards();
            }
        }
    },

    /**
     * @description 
     * @method activateSubmitBtn
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    activateSubmitBtn: function (flag) {
        // if (this.model.gameData.tableDetails.state == K.GameState.Running) {
        // var currentIdx = this.model.gameData.tableDetails.currentMoveIndex;
        // var flag = !!this.getMyPlayer() && (currentIdx == this.getMyPlayer().seatIndex);
        // var count = 0;
        // if (flag) {
        //     for (var i = 0; i < this.ofcCardHolder.children.length; i++) {
        //         var card = this.ofcCardHolder.children[i].getComponentInChildren('Card');
        //         if (!!card) {
        //             count++;
        //             if (this.getMyPlayer().roundName.toUpperCase() == 'ONE') {
        //                 if (count >= 1) {
        //                     flag = false;
        //                     break;
        //                 }
        //             } else if (count > 1) {
        //                 flag = false;
        //                 break;
        //             }
        //         }
        //     }
        this.submitBtn.active = flag;
        // }
        // }
    },

    /**
     * @description gameOver pokerModel event callback
     * @param {Object} data
     * @method gameOver
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    gameOver: function (data, playerIndex) {
        // var potSplitData = [];
        // this.enableTempPlayerInput(false);
        var log = "";
        var players = this.model.gameData.tableDetails.players;
        //show gameover
        for (var i = 0; i < data.winners.length; i++) {
            var index = this.model.getPlayerById(data.winners[i].playerId);
            log = log + "Winner: " + players[index].playerName + "   Points: " + data.winners[i].points + "   WinPoints: " + data.winners[i].winningPoints + "\n";
            this.playerHand[this.getRotatedSeatIndex(players[index].seatIndex)].gameOver(data.winners[i]);
        };
        this.playerHand[this.getRotatedSeatIndex(this.model.gameData.tableDetails.dealerIndex)].setDealer(false);
        // this.chatSubmitBtn.interactable = true;
    },

    /**
     * @description 
     * @method playerCards
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    //Called when players turn, board cards
    playerCards: function (data, seatIndex) {
        // if (data === null || data.length === 0) {
        //     return;
        // }
        // var count = 0;
        // data.forEach(function (element) {
        //     var instance = cc.instantiate(this.cardPrefab);
        //     var cardComponent = instance.getComponent('Card');
        //     instance.getComponent('CardMovement').enableDragging = true;
        //     cardComponent.cardData = this.getMyPlayer().currentCards[count];
        //     cardComponent.init(element);
        //     cardComponent.reveal(true);
        //     this.ofcCardHolder.children[count].addChild(instance);
        //     instance.position = new cc.Vec2(0, 0);
        //     instance.getComponent('Card').setOriginalPosition(instance.position);
        //     count++;
        // }, this);
        // this.activateSubmitBtn();
    },

    /**
     * @description 
     * @method onSubmit
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    onSubmit: function () {
        this.activateSubmitBtn(false);
        var myPlayer = this.getMyPlayer();
        var cardHolder = this.playerHand[this.getRotatedSeatIndex(myPlayer.seatIndex)].cardHolder;
        myPlayer.currentCards = [];
        var data = {
            top: [],
            middle: [],
            bottom: [],
        };
        for (var i = 0; i < cardHolder.children.length; i++) {
            for (var j = 0; j < cardHolder.children[i].children.length; j++) {
                var card = cardHolder.children[i].children[j].getComponentInChildren('Card');
             //   console.log("i=found cardat  i " + i + " n j " + j);
                if (!!card) {
                //    console.log("i=found card data at  i " + i + " n j " + j);
                    data[cardHolder.children[i].name].push(card.cardData);
                    card.getComponent('CardMovement').enableDragging = false;
                    this.dragManager.removeDropZone(cardHolder.children[i].children[j]);
                }
            }
        }
        for (var i = 0; i < this.ofcCardHolder.children.length; i++) {
            var card = this.ofcCardHolder.children[i].getComponentInChildren('Card');
            if (!!card) {
                card.getComponent('CardMovement').enableDragging = false;
                myPlayer.discardedCards.push(card.cardData);
                var roundName = this.getMyPlayer().roundName || "ONE";
                if (roundName != 'ONE') {
                    card.node.parent = this.ofcDiscardedCardHolder.children[K.RoundToCards[roundName] - 1];
                    card.node.position = new cc.Vec2(0, 0);
                }
            }
        }
        myPlayer.cards = data;
        this.model.makeMove();
    },

    /**
     * @description 
     * @method displayPots
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    displayPots: function () { }, //Called from enableCurrentPlayerTurn
    clearPots: function () { },
    checkInBetweenBlinds: function () { }, //called from sitsucces, playerstatechange and joinextras
    isStraddleAllowed: function () { },
    setPostBigBlind: function () { },
    roundOver: function () { },
    onBestHand: function() { },
    //  standUp: function() {}, // Called from onCancelBuyIn
    placeDummyCards: function () { }, //Called from allocate seats
    onJoinExtras: function () { //called from onJoinSuccess
        this.onGameStateChange(this.model.gameData.tableDetails.state);
        this.generateDiscardedCards();
    },

    handleRunItTwice: function(){ },

    /**
     * @description 
     * @method clearHoleCards
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    clearHoleCards: function () {
        for (var i = 0; i < this.ofcCardHolder.children.length; i++) {
            if (this.ofcCardHolder.children[i].children.length > 1) {
                this.ofcCardHolder.children[i].children.forEach(function (element) {
                    if (element.name.toUpperCase() != 'BASE')
                        //  element.destroy();
                        CardPool.destroyCard(element, function () { });
                }, this);
                // this.ofcCardHolder.children[i].children[1].destroy();
            }
        }


    },

    /**
     * @description 
     * @method clearDiscardedCards
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    clearDiscardedCards: function () {
        for (var i = 0; i < this.ofcDiscardedCardHolder.children.length; i++) {
            if (this.ofcDiscardedCardHolder.children[i].children.length > 1) {
                this.ofcDiscardedCardHolder.children[i].children.forEach(function (element) {
                    if (element.name.toUpperCase() != 'BASE')
                        // element.destroy();
                        CardPool.destroyCard(element, function () { });
                }, this);
            }
        }
    },

    /**
     * @description 
     * @method generateTableCards
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    generateTableCards: function () {
        var currentIdx = this.model.gameData.tableDetails.currentMoveIndex;
        var curPlayer = this.model.gameData.tableDetails.players[this.model.getPlayerBySeat(currentIdx)];
        this.clearHoleCards();
        var count = 0;
        if (!!this.getMyPlayer() && this.getMyPlayer().playerId == curPlayer.playerId) {
            curPlayer.currentCards.forEach(function (element) {
                // var instance = cc.instantiate(this.cardPrefab);
                var instance = CardPool.generateCard('Card', function () { });
                var cardComponent = instance.getComponent('Card');
                instance.getComponent('CardMovement').enableDragging = true;
                instance.getComponent('CardMovement').dragManager = this.dragManager;
                cardComponent.cardData = element;
                cardComponent.init(this.model.getCardByData(element), this.model);
                cardComponent.reveal(true);
                this.ofcCardHolder.children[count].addChild(instance);
                instance.position = new cc.Vec2(0, 0);
                instance.width = instance.parent.getChildByName('base').width;
                instance.height = instance.parent.getChildByName('base').height;
                instance.getComponent('Card').setOriginalPosition(instance.position);
                count++;
            }, this);
        } else {
            var maxCards = (curPlayer.roundName == K.RoundNames.one) ? 5 : 3;
            maxCards = curPlayer.roundName == K.RoundNames.finished ? 0 : maxCards;
            for (var i = 0; i < maxCards; i++) {
                //var instance = cc.instantiate(this.cardPrefab);
                var instance = CardPool.generateCard('Card', function () { });
                var cardComponent = instance.getComponent('Card');
                instance.getComponent('CardMovement').enableDragging = false;
                instance.getComponent('CardMovement').dragManager = this.dragManager;
                cardComponent.reveal(false);
                this.ofcCardHolder.children[i].addChild(instance);
                instance.position = new cc.Vec2(0, 0);
                instance.width = instance.parent.getChildByName('base').width;
                instance.height = instance.parent.getChildByName('base').height;
            }
        }
    },

    /**
     * @description 
     * @method generateDiscardedCards
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    generateDiscardedCards: function () {
        this.clearDiscardedCards();
        var myPlayer = this.getMyPlayer();
        if (!!myPlayer && myPlayer.discardedCards.length > 0) {
            var count = 0;
            myPlayer.discardedCards.forEach(function (element) {
                //var instance = cc.instantiate(this.cardPrefab);
                var instance = CardPool.generateCard('Card', function () { });
                var cardComponent = instance.getComponent('Card');
                instance.getComponent('CardMovement').enableDragging = false;
                instance.getComponent('CardMovement').dragManager = this.dragManager;
                cardComponent.cardData = element;
           //     console.log("khoj");
                cardComponent.init(this.model.getCardByData(element), this.model);
                cardComponent.reveal(true);
                this.ofcDiscardedCardHolder.children[count].addChild(instance);
                instance.position = new cc.Vec2(0, 0);
                instance.width = instance.parent.getChildByName('base').width;
                instance.height = instance.parent.getChildByName('base').height;
                instance.getComponent('Card').setOriginalPosition(instance.position);
                count++;
            }, this);

        }
    },

    /**
     * @description 
     * @method onGameStateChange
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    onGameStateChange: function (state) {
        if (state == K.GameState.Running) {
            this.ofcCardHolder.active = true;
            this.ofcDiscardedCardHolder.active = true;
        } else if (state == K.GameState.Idle) {
            this.ofcCardHolder.active = false;
            this.ofcDiscardedCardHolder.active = false;
        }
    },

    /**
     * @description 
     * @method onOfcFirstRoundCards
     * @memberof Screens.Gameplay.Game.OFCPresenter#
     */
    onOfcFirstRoundCards: function (originalCards, data, playerId) {
        if (data === null || data.length === 0) {
            return;
        }
        this.clearHoleCards();
        var enableDrag = playerId == this.getMyPlayer().playerId;
        var count = 0;
        data.forEach(function (element) {
            // var instance = cc.instantiate(this.cardPrefab);
            var instance = CardPool.generateCard('Card', function () { });
            var cardComponent = instance.getComponent('Card');
            instance.getComponent('CardMovement').enableDragging = enableDrag;
            instance.getComponent('CardMovement').dragManager = this.dragManager;
            cardComponent.cardData = originalCards[count];
            cardComponent.init(element);
            cardComponent.reveal(true);
            this.ofcCardHolder.children[count].addChild(instance);
            instance.position = new cc.Vec2(0, 0);
            instance.width = instance.parent.getChildByName('base').width;
            instance.height = instance.parent.getChildByName('base').height;
            instance.getComponent('Card').setOriginalPosition(instance.position);
            count++;
        }, this);
        // this.activateSubmitBtn();
    },
});