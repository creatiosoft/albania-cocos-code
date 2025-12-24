var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

cc.Class({
    extends: PopUpBase,

    properties: {
        popUpManager: {
            default: null,
            type: PopUpManager
        },
        cardPrefab: {
            default: null,
            type: cc.Prefab,
        },
        winnerPrefab: {
            default: null,
            type: cc.Node,
        },
        actionPrefab: {
            default: null,
            type: cc.Node,
        },
        rowPrefab: {
            default: null,
            type: cc.Prefab,
        },
        contentParent: {
            default: null,
            type: cc.Node,
        },
        pokerModel: {
            default: null,
            type: cc.Node,
        },
        pokerGame: null,
        historyText: {
            default: null,
            type: cc.Node
        },
        contentBlocker: {
            default: null,
            type: cc.Node
        },
        contentToMove: {
            default: null,
            type: cc.Node
        },
        infoLbl: {
            default: null,
            type: cc.RichText
        },
        shadow: {
            default: null,
            type: cc.Node
        },
        handIDLabel: {
            default: null,
            type: cc.Label
        },
        newHandIDLabel: {
            default: null,
            type: cc.Label
        },
        newPageLabel: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.pokerGame = this.pokerModel.getComponent('PokerModel');
        this.index = 0;
        // var onHandTab = this.onNewTab.bind(this);

        // this.pokerGame.off(K.PokerEvents.onHandTab, onHandTab);
        // this.pokerGame.on(K.PokerEvents.onHandTab, onHandTab);
    },

    start() {
        this.historyTextOpened = false;
        this.data = [];
        this.dataIndex = 0;
    },

    updateHistory() {
        let data = this.data[this.dataIndex];
        if (!data) {
            return;
        }
        cc.find("foot/hand", this.node).getComponent(cc.Label).string = "Hand: #" + data.handId;
        cc.find("foot/page", this.node).getComponent(cc.Label).string = (this.dataIndex + 1) + " of " + this.data.length;

        // summary
        cc.find("Item/Summary/stake", this.contentParent).getComponent(cc.Label).string = data.stakes;

        // cards
        cc.find("Item/Cards/pot", this.contentParent).getComponent(cc.Label).string = data.handHistory.summary.totalPot.toFixed(2);
        var boardCardParent = cc.find("Item/Cards/BoardCardContainer", this.contentParent);
        boardCardParent.removeAllChildren(true);
        this.createCards(data.handHistory.summary.boardCard, boardCardParent);

        // winners
        cc.find("Item/Winners", this.contentParent).removeAllChildren(true);
        if (data.handHistory.summary.playersCards) {
            for (var i = 0; i < data.handHistory.summary.playersCards.length; i++) {
                let winner = data.handHistory.summary.playersCards[i];
                var winnerInstance = cc.instantiate(this.winnerPrefab);
                winnerInstance.x = 0;
                winnerInstance.active = true;
                cc.find("Item/Winners", this.contentParent).addChild(winnerInstance);

                var boardCardParent = cc.find("MyCardContainer", winnerInstance);
                boardCardParent.removeAllChildren(true);

                for (var k = 0; k < winner.cards.length; k++) {
                    if (!winner.cards[k]) {
                        this.generateCard(boardCardParent, winner.cards[k]);
                    }
                    else {
                        winner.cards[k].point = winner.cards[k].rank;
                        winner.cards[k].pointName = winner.cards[k].name;
                        winner.cards[k].suit = this.getSuit(winner.cards[k].type);
                        this.generateCard(boardCardParent, winner.cards[k]);
                    }
                }

                cc.find("name", winnerInstance).getComponent(cc.Label).string = winner.playerName ? winner.playerName : "???";
                let www = winner.winning.toFixed(2);
                cc.find("winning", winnerInstance).getComponent(cc.Label).string = (www > 0 ? "+" : "" ) + www;

                if (www >= 0) {
                    cc.find("winning", winnerInstance).color = new cc.Color().fromHEX("#0E632A");            
                }
                else {
                    cc.find("winning", winnerInstance).color = new cc.Color().fromHEX("#FF0000");
                }

                cc.find("set", winnerInstance).getComponent(cc.Label).string = '';
            }
        }

        // PREFLOP
        cc.find("Item/Actions", this.contentParent).removeAllChildren(true);
        if (data.handHistory.PREFLOP) {
            if (data.handHistory.PREFLOP.actions) {
                this.makeActions(data.handHistory.PREFLOP.actions, cc.find("Item/Actions", this.contentParent));
            }
        }

        // FLOP
        cc.find("Item/Flop/BoardCardContainer", this.contentParent).removeAllChildren(true);
        cc.find("Item/Actions1", this.contentParent).removeAllChildren(true);
        cc.find("Item/Actions1", this.contentParent).height = 0;
        if (data.handHistory.FLOP) {
            this.createCards(data.handHistory.FLOP.boardCard, cc.find("Item/Flop/BoardCardContainer", this.contentParent));
            if (data.handHistory.FLOP.actions) {
                this.makeActions(data.handHistory.FLOP.actions, cc.find("Item/Actions1", this.contentParent));
            }
        }

        // TURN
        cc.find("Item/Turn/BoardCardContainer", this.contentParent).removeAllChildren(true);
        cc.find("Item/Actions2", this.contentParent).removeAllChildren(true);
        cc.find("Item/Actions2", this.contentParent).height = 0;
        if (data.handHistory.TURN) {
            this.createCards(data.handHistory.TURN.boardCard, cc.find("Item/Turn/BoardCardContainer", this.contentParent));
            if (data.handHistory.TURN.actions) {
                this.makeActions(data.handHistory.TURN.actions, cc.find("Item/Actions2", this.contentParent));
            }
        }

        // RIVER
        cc.find("Item/River/BoardCardContainer", this.contentParent).removeAllChildren(true);
        cc.find("Item/Actions3", this.contentParent).removeAllChildren(true);
        cc.find("Item/Actions3", this.contentParent).height = 0;
        if (data.handHistory.RIVER) {
            this.createCards(data.handHistory.RIVER.boardCard, cc.find("Item/River/BoardCardContainer", this.contentParent));
            if (data.handHistory.RIVER.actions) {
                this.makeActions(data.handHistory.RIVER.actions, cc.find("Item/Actions3", this.contentParent));
            }
        }
    },

    makeActions(actions, parent) {
        for (var i = 0; i < actions.length; i++) {
            let action = actions[i];
            if (action.action == "startGame" || 
                action.action == "Join Channel" ||
                action.action == "leave" || 
                action.action == "roundOver" || 
                action.action == undefined ||
                action.action == null ||
                action.playerName == undefined) {
                continue;
            }
            var actionNode = cc.instantiate(this.actionPrefab);
            actionNode.x = 0;
            actionNode.active = true;
            parent.addChild(actionNode);

            cc.find("name", actionNode).getComponent(cc.Label).string = action.playerName;
            if (action.chips) {
                cc.find("v", actionNode).getComponent(cc.Label).string = (Number(action.chips).toFixed(2) > 0 ? "" + Number(action.chips).toFixed(2) : Number(action.chips).toFixed(2));
            }
            else {
                cc.find("v", actionNode).getComponent(cc.Label).string = '';
            }
            
            if (!action.title || action.title == "") {
                cc.find("title", actionNode).active = false;
            }
            else {
                cc.find("title", actionNode).active = true;
                cc.find("title/name", actionNode).getComponent(cc.Label).string = action.title;
            }

            cc.find("check", actionNode).active = false;
            cc.find("allin", actionNode).active = false;
            cc.find("call", actionNode).active = false;
            cc.find("fold", actionNode).active = false;
            cc.find("raise", actionNode).active = false;
            cc.find("bet", actionNode).active = false;
            cc.find("bb", actionNode).active = false;
            cc.find("sb", actionNode).active = false;
            if (action.action == "CHECK") {
                cc.find("check", actionNode).active = true;
            }
            else if (action.action == "ALLIN") {
                cc.find("allin", actionNode).active = true;
            }
            else if (action.action == "CALL") {
                cc.find("call", actionNode).active = true;
            }
            else if (action.action == "FOLD") {
                cc.find("fold", actionNode).active = true;
            }
            else if (action.action == "RAISE") {
                cc.find("raise", actionNode).active = true;
            }
            else if (action.action == "BET") {
                cc.find("bet", actionNode).active = true;
            }
            else if (action.action == "SB") {
                cc.find("sb", actionNode).active = true;
            }
            else if (action.action == "BB") {
                cc.find("bb", actionNode).active = true;
            }
        }
    },

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

    createCards(cardsArr, boardCardParent) {
        if (!!cardsArr) {
            let numCards = this.countCards(cardsArr);
            let counter = 0;
            for (var j = 0; j < cardsArr.length; j++) {
                for (var l = 0; l < cardsArr[j].length; l++) {
                    if (numCards <= 5 && j == 1) {
                        break;
                    }
                    if (!!cardsArr[j][l]) {
                        this.generateCard(boardCardParent, this.pokerGame.getCardByData(cardsArr[j][l]), (j * cardsArr[j].length + l));
                        counter++;
                    } else if (cardsArr[j][l] == null) {
                        if (cc.isValid(this.cardPrefab)) {
                            var cardInstance = cc.instantiate(this.cardPrefab);
                            boardCardParent.addChild(cardInstance);
                        }
                    }

                    // if ((numCards == 10) && (counter == 5)) {
                    //     this.generateCard(boardCardParent, null, (j * cardsArr[j].length + l), true);
                    // } else if (cardsArr[j][l + 1] && cardsArr[j][l + 1] != null) {
                    //     if ((numCards == 7) && (counter == 3 || counter == 5)) {
                    //         this.generateCard(boardCardParent, null, (j * cardsArr[j].length + l), true);
                    //     }
                    //     if ((numCards == 6) && (counter == 4 || counter == 5)) {
                    //         this.generateCard(boardCardParent, null, (j * cardsArr[j].length + l), true);
                    //     }
                    // }
                }
            }
        }
    },

    onShow: function (data) {

        GameManager.emit("disablePageView");

        this.sound = data.playSound;
        // this.populateRows();

        cc.find('Center', this.node).active = false;
        cc.find('empty', this.node).active = false;
        cc.find('foot', this.node).active = false;

        var inst = this;
        ServerCom.pomeloRequest("room.channelHandler.getHandHistory", {
            channelId: this.pokerGame.gameData.channelId,
            access_token: K.Token.access_token,
        }, function (response) {
            console.log("getHandHistory", response);
            inst.data = response.data;
            inst.dataIndex = 0;

            if (inst.data.length > 0) {
                cc.find('Center', inst.node).active = true;
                cc.find('empty', inst.node).active = false;
                cc.find('foot', inst.node).active = true;
            }
            else {
                cc.find('Center', inst.node).active = false;
                cc.find('empty', inst.node).active = true;   
                cc.find('foot', inst.node).active = false;
            }

            inst.updateHistory();
        }, null, 5000, false);
    },
    /**
     * @description Handles new hand
     * @method onNewTab
     * @memberof Controllers.Popups.HandHistoryDetailPopup#
     */
    onNewTab: function () {
        // console.error("HAND TABS LENGTH ", this.pokerGame.handTabs.length - 1)

        // this.createRow(this.pokerGame.handTabs, this.pokerGame.handTabs.length - 1);
    },
    /**
     * @description 
     * @method populateRows
     * @memberof Controllers.Popups.HandHistoryDetailPopup#
     */
    populateRows: function () {
        GameManager.removeAllChildren(this.contentParent);

        var handTabContent = this.pokerGame.handTabs;
        if (handTabContent == null) {
            return;
        }
        for (var i = 0; i < handTabContent.length; i++) {
            this.createRow(handTabContent, i);
        }
    },

    createRow: function (handTabContent, i) {
        var instance = cc.instantiate(this.rowPrefab);
        if (this.contentParent.children.length > 10) {
            this.contentParent.removeChild(this.contentParent.children[0]);
        }
        this.contentParent.addChild(instance);
        var baseColor = (i % 2 == 0) ? new cc.color(179, 179, 179) : new cc.color(229, 229, 229);
        instance.getChildByName('Base').color = baseColor;
        var myCardParent = instance.getChildByName('MyCardContainer');
        var boardCardParent = instance.getChildByName('BoardCardContainer');
        var cardsArr = null;
            cardsArr = handTabContent[i].hands;
        // console.log(cardsArr)
        if (!!cardsArr) {
            let numCards = this.countCards(cardsArr);
            let counter = 0;
            for (var j = 0; j < cardsArr.length; j++) {
                for (var l = 0; l < cardsArr[j].length; l++) {
                    if (numCards <= 5 && j == 1) {
                        break;
                    }
                    if (!!cardsArr[j][l]) {
                        this.generateCard(boardCardParent, this.pokerGame.getCardByData(cardsArr[j][l]), (j * cardsArr[j].length + l));
                        counter++;
                    } else if (cardsArr[j][l] == null) {
                        if (cc.isValid(this.cardPrefab)) {
                            var cardInstance = cc.instantiate(this.cardPrefab);
                            boardCardParent.addChild(cardInstance);
                        }
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
        // console.log(handTabContent[i].myCards)

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
        // instance.getChildByName('PotLabel').getComponent(cc.Label).string = handTabContent[i].pot.roundOff(2);
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
    },

    generateCard: function (parent, card, i, flag = false) {
        // setTimeout(function () {
        // console.error("generateCard", parent.name, card.pointName, i, flag)
        if (false) {

            if (this.rowPrefab._name != "Values_Mobile") {
                parent.parent.height = 140;
                parent.parent.getChildByName('Base').height = 140;
            }
        } else {
            if (cc.isValid(this.cardPrefab)) {
                var cardInstance = cc.instantiate(this.cardPrefab);
                cardInstance.getComponent('Card').init((card), this.pokerGame);
                cardInstance.getComponent('Card').reveal(card ? true : false);
                // cardInstance.setPosition(0,0);
                parent.setScale(1, 1);
                // cardInstance.scale = this.isMobileView ? new cc.Vec2(1.6, 1.6) : new cc.Vec2(1, 1);
                parent.addChild(cardInstance);
            }
        }
        // }.bind(this), 100 * i);

    },

    countCards: function (cardsArr) {
        let count = 0;
        for (let i = 0; i < cardsArr.length; i++) {
            for (let j = 0; j < cardsArr[i].length; j++) {
                if (cardsArr[i][j] && cardsArr[i][j] != null) count++;
            }
        }
        return count;
    },



    showTabHistory: function (handHistoryId, tabInstance) {
        // this.moveContent();
        let func = function (data) {
            this.historyTextOpened = true;
            data.info = data.info.replace(/Kicker/g, '<color=#32CD32>Kicker</color>');
            data.info += "\n";
            this.contentBlocker.active = true;
            this.contentBlocker.opacity = 0;
            this.historyText.setScale(1, 0);
            this.historyText.active = true;

            let rn = data.info.substring(data.info.indexOf(": #") + 4, 200);
            let rn2 = rn.substring(0, rn.indexOf("-"));

            this.handIDLabel.string = "Hand ID  #" + rn2;

            this.infoLbl.string = data.info;

            let y = this.research(tabInstance.node);
            if (tabInstance.node.getChildByName("BoardCardContainer").childrenCount > 5) {
                this.historyText.y = (107);
                this.contentBlocker.y = (110);
                this.shadow.height = 77;
                this.shadow.y = (-6.5);
            } else {
                this.historyText.y = (161)
                this.contentBlocker.y = (164)
                this.shadow.height = 46;
                this.shadow.y = (-2.5);
            }
            this.moved = this.contentToMove.y;
            let historyTextAct1 = cc.scaleTo(0.3, 1, 1).easing(cc.easeIn(1));
            let shadowOn = cc.callFunc(() => {
                this.shadow.active = true;
                // this.infoLbl.string = data.info;
                this.infoLbl.node.parent.parent.getComponent(cc.ScrollView).scrollToTop();
            }, this);
            let contentAct1 = cc.moveTo(0.3, 3, 244 + y);
            let contentBlockAct1 = cc.fadeTo(0.3, 255);
            let contentBlockAct2 = cc.callFunc(() => {
                this.historyText.runAction(cc.sequence(historyTextAct1, shadowOn));
            }, this);
            let contentAct2 = cc.callFunc(() => {
                this.contentBlocker.runAction(cc.sequence(contentBlockAct1, contentBlockAct2));
            }, this);
            this.contentToMove.runAction(cc.sequence(contentAct1, contentAct2));
        }
        if (!this.historyTextOpened)
            this.pokerGame.getHandHistory(handHistoryId, func.bind(this), true);

    },

    research: function (tabClicked) {
        let y = 0;
        let bool = true;
        this.contentParent.children.forEach(function (element, i) {
            if (element == tabClicked) {
                bool = false;
            } else {
                if (bool) {
                    y += element.height - 4;
                }
            }
        }, this);
        return y;
    },

    minimiseHistoryText: function () {

        // this.historyText.setScale(1, 0)
        let shadowOff = cc.callFunc(() => {
            this.infoLbl.string = "";
            this.shadow.active = false;
        }, this);
        let historyAct1 = cc.scaleTo(0.3, 1, 0).easing(cc.easeIn(1));
        let cbAct1 = cc.fadeTo(0.3, 0);
        let conToMoveAct1 = cc.moveTo(0.3, 3, this.moved);

        let cf3 = cc.callFunc(() => {
            this.contentBlocker.active = false;
            this.historyText.active = false;
            this.historyTextOpened = false;
        }, this);
        let cf2 = cc.callFunc(() => {
            this.contentToMove.runAction(cc.sequence(conToMoveAct1, cf3))
        }, this);

        let cf = cc.callFunc(() => {
            this.contentBlocker.runAction(cc.sequence(cbAct1, cf2));
        }, this);

        this.historyText.runAction(cc.sequence(shadowOff, historyAct1, cf));


    },

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


        GameManager.popUpManager.show(PopUpType.VideoPlayerPopup, data, function () { });
        //});
    },

    onClose: function () {
        GameManager.emit("enablePageView");
        this.popUpManager.hide(PopUpType.HandHistoryDetailPopup, function () { });
        // console.log(this.pokerGame,"pG",this.pokerGame.gameData)
        if (!this.pokerGame.gameData.settings.muteGameSound) {
            // console.log("working")
            GameManager.playSound(K.Sounds.click);
        }
        // GameManager.playSound(K.Sounds.click);

        // this.scheduleOnce(() => {
        //     GameManager.emit("showJoinSimlar");
        // }, 0.5);
    },

    onLeft: function() {
        this.dataIndex -= 1;
        if (this.dataIndex < 0) {
            this.dataIndex = 0;
        }
        this.updateHistory();
    },

    onRight: function() {
        this.dataIndex += 1;
        if (this.dataIndex >= this.data.length) {
            this.dataIndex = this.data.length;
        }
        this.updateHistory();  
    }
});


