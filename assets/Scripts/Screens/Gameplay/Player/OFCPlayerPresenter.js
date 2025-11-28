

var PlayerPresenter = require("PlayerPresenter");
var K = require("OFCConfigs");

/**
 * @class OFCPlayePresenter
 * @description A script to manage player's view in OFC game!
 * @memberof Screens.Gameplay.Player
 * @extends PlayerPresenter
 */
cc.Class({
    extends: PlayerPresenter,
    properties: {
        topPointsLbl: {
            default: null,
            type: cc.Label,
        },
        bottomPointsLbl: {
            default: null,
            type: cc.Label,
        },
        middlePointsLbl: {
            default: null,
            type: cc.Label,
        },
        winPointsLbl: {
            default: null,
            type: cc.Label,
        },
        foul: {
            default: null,
            type: cc.Node,
        },
        pineapple: {
            default: null,
            type: cc.Node,
        },

    },

    /**
     * @method enablePlayerView
     * @param {String} selfPlayerId -this player's id!
     * @description Set all datas and activate seat UI
     * @memberof Screens.Gameplay.Player.OFCPlayerPresenter#
     */
    enablePlayerView: function (selfPlayerId) {
        this.resetSeat();
        this.amountLabel.string = Math.floor(this.playerData.points);
        this.nameLabel.string = this.playerData.playerName;
        this.sitHerePanel.active = false;
        this.occupiedPanel.active = true;
        this.onStateChange();
        this.seatState = K.SeatState.Occupied;
        var self = (selfPlayerId === this.playerData.playerId);
        this.setSelfPlayerView(self);
        this.resetLblColor();
        this.displayNote(this.playerData.playerId);

        if (!!this.playerData.cards && !!this.playerData.cards.top) {
            this.displayMove(this.playerData.cards);
        }
    },
/**
 * @method setSelfPlayerView 
 * @description Set current players data!
 * @param {object} self -reference of current/this script!
 * @memberof Screens.Gameplay.Player.OFCPlayerPresenter#
 */
    setSelfPlayerView: function (self) {
        this._super(self);
        if (self) {
            this.initDropzone();
        }
    },
/**
 * @method initDropzone 
 * @description Initialze/add drop zone for cards! 
 * @memberof Screens.Gameplay.Player.OFCPlayerPresenter#
 */
    initDropzone: function () {
        for (var i = 0; i < this.cardHolder.children.length; i++) {
            for (var j = 0; j < this.cardHolder.children[i].children.length; j++) {
                this.pokerPresenter.dragManager.addDropZone(this.cardHolder.children[i].children[j]);
            }
        }
    },

    /**
     * @method gamOver
     * @description Displays winner 
     * @param {object} data -Data having the winning data info as poins of winner
     * @memberof Screens.Gameplay.Player.OFCPlayerPresenter#
     */
    gameOver: function (data) {
        this.resetTimer();
        this.amountLabel.string = data.points;
        this.topPointsLbl.node.parent.parent.active = true;

        this.topPointsLbl.node.parent.active = true;
        this.middlePointsLbl.node.parent.active = true;
        this.bottomPointsLbl.node.parent.active = true;

        this.topPointsLbl.string = data.pointDetails.top;
        this.middlePointsLbl.string = data.pointDetails.middle;
        this.bottomPointsLbl.string = data.pointDetails.bottom;

        this.winPointsLbl.node.parent.active = true;
        this.winPointsLbl.string = data.winningPoints;
        if (data.isFoul) {
            this.foul.active = true;
        }
    },
/**
 * @method resetPlayerView
 * @description reset Player view/ remove cards!
 * @memberof Screens.Gameplay.Player.OFCPlayerPresenter#
 */

    resetPlayerView: function () {
        this.topPointsLbl.node.parent.parent.active = false;
        this.winPointsLbl.node.parent.active = false;
        this.foul.active = false;
        this.clearPlayerCards();
        this.checkForFantasyLand();
    },

    /**
     * @method displayMove 
     * @description Called from PokerPresenter, when this player makes the turn
     * @param {object} cards -Object having cards information
     * @memberof Screens.Gameplay.Player.OFCPlayerPresenter#
     */
    displayMove: function (cards) {
        this.clearPlayerCards();
        setTimeout(function () {
            // reset timer
            for (var i = 0; i < cards.top.length; i++) {
                this.generateCard(cards.top[i], 0, i);
            }
            for (var i = 0; i < cards.middle.length; i++) {
                this.generateCard(cards.middle[i], 1, i);
            }
            for (var i = 0; i < cards.bottom.length; i++) {
                this.generateCard(cards.bottom[i], 2, i);
            }
        }.bind(this), 500);
        this.resetTimer();
    },

/**
 * @method displayRoyalities
 * @description 
 * @memberof Screens.Gameplay.Player.OFCPlayerPresenter#
 */
    displayRoyalities: function (royalities) {
        if (royalities.top != null && royalities.top != undefined && royalities.top > -1) {

            this.topPointsLbl.node.parent.parent.active = true;
            this.topPointsLbl.node.parent.active = true;
            this.topPointsLbl.string = royalities.top;
        } else {
            this.topPointsLbl.node.parent.active = false;
        }
        if (royalities.middle != null && royalities.middle != undefined && royalities.middle > -1) {
            this.middlePointsLbl.node.parent.parent.active = true;
            this.middlePointsLbl.node.parent.active = true;
            this.middlePointsLbl.string = royalities.middle;
        } else {
            this.middlePointsLbl.node.parent.active = false;
        }

        if (royalities.bottom != null && royalities.bottom != undefined && royalities.bottom > -1) {
            this.bottomPointsLbl.node.parent.parent.active = true;
            this.bottomPointsLbl.node.parent.active = true;
            this.bottomPointsLbl.string = royalities.bottom;
        } else {
            this.bottomPointsLbl.node.parent.active = false;
        }
    },
/**
 * @method generateCard
 * @param {object} cardData 
 * @param {Number} row - row to create 
 * @param {Number} i - index
 * @memberof Screens.Gameplay.Player.OFCPlayerPresenter#
 */

    generateCard: function (cardData, row, i) {
        if (!!cardData) {

            //   var instance = cc.instantiate(this.pokerPresenter.cardPrefab);
            var instance = CardPool.generateCard(this.pokerPresenter.cardPrefab.name, function () { });
            var cardComponent = instance.getComponent('Card');
            cardData = this.pokerPresenter.model.getCardByData(cardData);
            instance.getComponent('CardMovement').enableDragging = false;
            instance.getComponent('CardMovement').dragManager = this.pokerPresenter.dragManager;
            cardComponent.init(cardData);
            cardComponent.reveal(true);
            this.cardHolder.children[row].children[i].addChild(instance);
            instance.position = new cc.Vec2(0, 0);
            instance.getComponent('Card').setOriginalPosition(instance.position);
        }
    },

    
    /**
     * @method onTurn
     * @param {Number} turnDisplayTime - Time duration for a turn!
     * @description Called from PokerPresenter when there is turn of this player  
     * @memberof Screens.Gameplay.Player.OFCPlayerPresenter#
     */
    onTurn: function (turnDisplayTime) {
        this.pokerPresenter.model.off(K.PokerEvents.onTimerTick);
        this.pokerPresenter.model.on(K.PokerEvents.onTimerTick, function (time) {
            this.timerSprite.fillRange = time;
            this.timerSprite.node.color = cc.Color.RED.lerp(cc.Color.GREEN, time);
        }.bind(this));

        this.amountLabel.string = Math.floor(this.playerData.points);

        if (this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
            this.setPlayerColor();
        }
    },

    /**
     * @description Sit here button callback
     * @method addPlayerCard
     * @param {card} card
     * @memberof Screens.Gameplay.Player.OFCPlayerPresenter#
     */
    addPlayerCards: function (card) {

    },

    /**
     * Reveal other player cards on showdown
     * @params: {array} cardTypes
     */
    revealCards: function () {

    },

    /**
     * Reset player cards to show back face
     */
    resetCards: function (flag) {

    },

    /**
     * @method clearPlayerCards
     * @description  Discard player hand on gameover
     * @memberof Screens.Gameplay.Player.OFCPlayerPresenter#
     */
    clearPlayerCards: function () {
        for (var i = 0; i < this.cardHolder.children.length; i++) {
            for (var j = 0; j < this.cardHolder.children[i].children.length; j++) {
                if (this.cardHolder.children[i].children[j].children.length > 1) {
                    this.cardHolder.children[i].children[j].children.forEach(function (element) {
                        if (element.name.toUpperCase() != 'BASE') {
                            //element.destroy();
                            CardPool.destroyCard(element, function () { });
                        }
                    }, this);
                    // this.cardHolder.children[i].children[j].children[1].destroy();
                }
            }
        }
    },

    showPoints: function () {

    },


    onMouse_Enter: function () { },
    registerHoverEvents: function () { },
    activatePlayerBet: function () { },
    setBetPosition: function () { },


    enableWaitingView: function () {
        this._super();
        this.cardHolder.active = false;
    },

    enablePlayingView: function () {
        this._super();
        this.cardHolder.active = true;
    },

    enableReservedView: function () {
        this._super();
        this.cardHolder.active = false;
    },

    checkForFantasyLand: function () {
        //console.log("this player is " + JSON.stringify(this.playerData));

    },

});