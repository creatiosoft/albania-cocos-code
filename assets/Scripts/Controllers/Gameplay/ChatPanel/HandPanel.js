var ChatPanel = require('ChatPanel');
var Card = require('Card');
// var pokerModel = null;
var onHandTab = null;
var HandHistoryTab = require('HandHistoryTab');
var PopUpType = require('PopUpManager').PopUpType;
/**
 * @classdesc
 * @class HandPanel
 * @memberof Controllers.Gameplay.ChatPanel
 */
cc.Class({
    extends: cc.Component,

    properties: {
        chatPanel: {
            default: null,
            type: ChatPanel,
        },
        valuePrefab: {
            default: null,
            type: cc.Prefab,
        },
        handCardPrefab: {
            default: null,
            type: cc.Prefab,
        },
        valueParent: {
            default: null,
            type: cc.Node,
        },
        pokerModel: {
            default: null,
            type: cc.Node,
        },
        pokerGame: null,
        isMobileView: false,
        cardSeparatarPrefab: {
            default: null,
            type: cc.Prefab,
        }
    },


    /**
     * @description This is used for initialisation.
     * @method onLoad
     * @memberof Controllers.Gameplay.ChatPanel.HandPanel#
     */
    onLoad: function () {
        onHandTab = this.onNewTab.bind(this);
        this.pokerGame = this.pokerModel.getComponent('PokerModel');
        this.registerBroadcast();
        this.showHandTab();
        this.TabCounts = 0;
    },

    /**
     * @description Used to register broadcasts
     * @method registerBroadcast
     * @memberof Controllers.Gameplay.ChatPanel.HandPanel#
     */
    registerBroadcast: function () {
        this.pokerGame.off(K.PokerEvents.onHandTab, onHandTab);
        this.pokerGame.on(K.PokerEvents.onHandTab, onHandTab);
    },

    onEnable: function () {
        // if (GameScreen.prevSelection != null) {
        //     this.scheduleOnce(function () {

        //         this.showHandTab();
        //     }.bind(this), 0.2);
        // }

    },

    /**
     * @description 
     * @method showHandTab
     * @memberof Controllers.Gameplay.ChatPanel.HandPanel#
     */
    showHandTab: function () {
        GameManager.removeAllChildren(this.valueParent);

        var handTabContent = this.pokerGame.handTabs;
        if (handTabContent == null) {
            return;
        }
        for (var i = 0; i < handTabContent.length; i++) {
            this.initialize(handTabContent, i);
        }
    },

    /**
     * @description Handles new hand
     * @method onNewTab
     * @memberof Controllers.Gameplay.ChatPanel.HandPanel#
     */
    onNewTab: function () {
        // console.error("HAND TABS LENGTH ", this.pokerGame.handTabs.length - 1)
        // console.log(this.pokerGame.handTabs[this.pokerGame.handTabs.length - 1])
        this.initialize(this.pokerGame.handTabs, this.pokerGame.handTabs.length - 1);
    },

    /**
     * @description initializes new Hand
     * @method initialize
     * @param {Array} handTabContent
     * @param {Number} i
     * @memberof Controllers.Gameplay.ChatPanel.HandPanel#
     */
    initialize: function (handTabContent, i) {
        setTimeout(function () {

            this.TabCounts++;
            // console.error(" Hand Panel Index Child ", this.valuePrefab._name)
            var instance = cc.instantiate(this.valuePrefab);
            if (this.valueParent.children.length > 10) {
                this.valueParent.removeChild(this.valueParent.children[0]);
            }
            this.valueParent.addChild(instance);
            var baseColor = (this.TabCounts % 2 == 0) ? new cc.color(191, 191, 191) : new cc.color(255, 255, 255);
            instance.getChildByName('Base').color = baseColor;
            var myCardParent = instance.getChildByName('MyCardContainer');
            var boardCardParent = instance.getChildByName('BoardCardContainer');
            var cardsArr = null;
            if (!this.pokerGame.presenter.isTournament()) {
                cardsArr = handTabContent[i].hands;
            }
            else {
                cardsArr = handTabContent[i].value.hands;
            }
            // console.log("board CARD DATA ", cardsArr);
            if (!!cardsArr) {
                let numCards = this.countCards(cardsArr);
                let counter = 0;
                for (var j = 0; j < cardsArr.length; j++) {
                    for (var l = 0; l < cardsArr[j].length; l++) {
                        // console.log("CARD DATA ", j, l);
                        // console.log("CARD DATA OBJ ", cardsArr[j][l]);

                        if (numCards <= 5 && j == 1) {
                            break;
                        }
                        if (!!cardsArr[j][l]) {
                            this.generateCard(boardCardParent, this.pokerGame.getCardByData(cardsArr[j][l]), (j * cardsArr[j].length + l));
                            counter++;
                        } else

                        if (cardsArr[j][l] == null) {
                            // console.log("INSIDE CONDITION", j, l);
                            setTimeout(function () {

                                if (cc.isValid(this.handCardPrefab)) {
                                    // console.log("CARD DATA OBJ SPACE ADDED FOR CARD :-  ", cardsArr[j][l]);

                                    var cardInstance = cc.instantiate(this.handCardPrefab);
                                    cardInstance.scale = this.isMobileView ? new cc.Vec2(1.6, 1.6) : new cc.Vec2(1, 1);
                                    cardInstance.opacity = 2;
                                    // console.log("shishir", cardInstance)
                                    boardCardParent.addChild(cardInstance);
                                }
                            }.bind(this), 100 * (j * cardsArr[j].length + l));
                        }

                        if ((numCards == 10) && (counter == 5)) {
                            this.generateCard(boardCardParent, null, (j * cardsArr[j].length + l), true);
                        } else if (cardsArr[j][l + 1] && cardsArr[j][l + 1] != null) {
                            if ((numCards == 7) && (counter == 3 || counter == 5)) {
                                this.generateCard(boardCardParent, null, (j * cardsArr[j].length + l), true);
                            }
                            if ((numCards == 6) && (counter == 4 || counter == 5)) {
                                this.generateCard(boardCardParent, null, (j * cardsArr[j].length + l), true);
                            }
                        }
                    }
                }
            }
            //---------------------my cards generated here------------------------------------------//
            // console.log("myCards", handTabContent[i].myCards,handTabContent[i])
            if (!!handTabContent[i].myCards) {
                for (var k = 0; k < handTabContent[i].myCards.length; k++) {
                    this.generateCard(myCardParent, this.pokerGame.getCardByData(handTabContent[i].myCards[k]), i);
                }
            }
            if (handTabContent[i].pot) {
            instance.getChildByName('PotLabel').getComponent(cc.Label).string = handTabContent[i].pot.roundOff(2);
            }
            else if (handTabContent[i].value.pot) {
                instance.getChildByName('PotLabel').getComponent(cc.Label).string = handTabContent[i].value.pot.roundOff(2);
            }
            instance.getComponent('HandHistoryTab').handHistoryId = handTabContent[i].handHistoryId;
            instance.getComponent('HandHistoryTab').onClickCallback = this.showTabHistory.bind(this);
            if (!!handTabContent[i].videoId) {
                instance.getComponent('HandHistoryTab').replayId = handTabContent[i].videoId;
                instance.getComponent('HandHistoryTab').onReplayCallback = this.showReplay.bind(this);
                instance.getComponent('HandHistoryTab').id = i;

            } else {
                instance.getComponent('HandHistoryTab').replayId = "";
                instance.getComponent('HandHistoryTab').onReplayCallback = null;
            }
        }.bind(this), 100 * i);
    },
    /**
     * @description 
     * @method countCards
     * @param {Array} cardArr
     * @memberof Controllers.Gameplay.ChatPanel.HandPanel#
     */
    countCards: function (cardsArr) {
        let count = 0;
        for (let i = 0; i < cardsArr.length; i++) {
            for (let j = 0; j < cardsArr[i].length; j++) {
                if (cardsArr[i][j] && cardsArr[i][j] != null) count++;
            }
        }
        return count;
    },
    /**
     * @description Generates new cards
     * @method generateCard
     * @param {Object} parent
     * @param {Object} card
     * @memberof Controllers.Gameplay.ChatPanel.HandPanel#
     */

    generateCard: function (parent, card, i, flag = false) {
        setTimeout(function () {
            // console.error("generateCard", parent.name, card.pointName, i, flag)
            // console.log(flag)
            if (flag) {

                if (this.valuePrefab._name != "Values_Mobile") {
                    parent.parent.height = 78;
                    parent.parent.getChildByName('Base').height = 78;
                    // console.log(1,parent.parent.name,parent.parent.getChildByName('Base'))
                }
            } else {
                if (cc.isValid(this.handCardPrefab)) {
                    // console.log(2)
                    var cardInstance = cc.instantiate(this.handCardPrefab);
                    cardInstance.getComponent('Card').init((card), this.pokerGame);
                    cardInstance.getComponent('Card').reveal(true);
                    // cardInstance.setPosition(0,0);
                    cardInstance.scale = this.isMobileView ? new cc.Vec2(1.6, 1.6) : new cc.Vec2(1, 1);
                    parent.addChild(cardInstance);
                }
            }
        }.bind(this), 100 * i);

    },

    /**
     * @description shows hand history
     * @method showTabHistory
     * @param {Number} handHistoryId
     * @memberof Controllers.Gameplay.ChatPanel.HandPanel#
     */
    showTabHistory: function (handHistoryId) {
        // this.pokerGame.getHandHistory(handHistoryId);
        this.pokerGame.showHandHistoryDetail();
    },

    /**
     * @description Shows replay of the moves
     * @method showReplay
     * @param {Number} videoId
     * @param {Number} id
     * @memberof Controllers.Gameplay.ChatPanel.HandPanel#
     */
    showReplay: function (videoId, id) {

        if (this.pokerGame.isPlayerStandUp()) {
            return;
        }
        //this.pokerGame.getVideo(videoId, function (data) {
        var data = {};
        data.currentId = videoId;
        // data.currentId = "5a57c59d69cc0e1309eacbe1";
        data.refModel = this.pokerGame;
        data.id = id;
        // data.nextId = (id < this.pokerGame.handTabs.length - 1) ? this.pokerGame.handTabs[id + 1].videoId : null;
        // data.prevId = id > 0 ? this.pokerGame.handTabs[id - 1].videoId : null;

        this.pokerModel.children[0].getComponent('PokerPresenter').playAudio(K.Sounds.click);

        GameManager.popUpManager.show(PopUpType.VideoPlayerPopup, data, function () {});
        //});
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
