var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

/**
 * @classdesc
 * @class PlayerInfoPopup
 * @memberof Popups
 */

cc.Class({
    extends: cc.Component,

    properties: {
        desc: {
            default: null,
            type: cc.Node,
        },
        descLabel: {
            default: null,
            type: cc.Label,
        },
        stickerTemp: {
            default: null,
            type: cc.Node,
        },
        stickers: {
            default: null,
            type: cc.Node,
        },
        playerName: {
            default: null,
            type: cc.Label,
        },
        playerImg: {
            default: null,
            type: cc.Sprite,
        },
        balance: {
            default: null,
            type: cc.Label,
        },
        balance2: {
            default: null,
            type: cc.Label,
        },
        noteNode: {
            default: null,
            type: cc.Node,
        },
        days: {
            default: null,
            type: cc.Label,
        },
        daysD: {
            default: null,
            type: cc.Node,
        },

        resData: null
    },

    /**
     * @description Set labels of popup and auto hide the popup after 4 seconds
     * @method onShow
     * @param {Object} data
     * @memberof Popups.PlayerInfoPopup#
     */

    onLoad: function () {
        // stickerTemp
        // this.stickers.removeAllChildren();
        // for (var i = 0; i < GameManager.stickerImages.length; i++) {
        //     let stickerImages = GameManager.stickerImages[i];
        //     let poolObject = cc.instantiate(this.stickerTemp);
        //     poolObject.active = true;
        //     poolObject.y = 0;
        //     poolObject.parent = this.stickers;

        //     poolObject.getComponent('StickerBase').stickerId = (i + 1);
        //     poolObject.getComponent(cc.Button).clickEvents[0].customEventData = (i + 1);
        //     // poolObject.getComponent(cc.Button).clickEvents[0].customEventData = stickerImages.___id;
        //     poolObject.children[0].getComponent(cc.Sprite).spriteFrame = stickerImages;
        // }
    },

    onShow: function (data, gameData, resData) {

        this.resData = resData;

        console.log("data", data);

        GameManager.emit("disablePageView");
        this.daysD.active = false;
        this.days.string = "1 Day";

        if (data.playerId == GameManager.user.playerId) {
            this.noteNode.active = false;
            this.playerName.string = GameManager.user.userName;
            this.playerImg.spriteFrame = GameManager.user.urlImg;
            this.balance.string = Number((data.chips).toFixed(2));
        }
        else {
            this.noteNode.active = true;
            this.playerName.string = data.playerName;
        }

        this.balance.string = Number((data.chips).toFixed(2));
        if (!data.urlImg) {
            this.playerImg.spriteFrame = GameManager.user.urlImg;
        }
        else {
            this.playerImg.spriteFrame = data.urlImg;
        }

        this.balance2.string = "(" + Number((data.chips / gameData.tableDetails.bigBlind).toFixed(2)) + "BB)";

        this.updateUI();
    },

    onShowD: function() {
        this.daysD.active = true;
    },
    
    onHideD: function() {
        this.daysD.active = false;
    },

    onDays: function(event, custom) {
        this.onHideD();
        this.days.string = event.target.children[0].getComponent(cc.Label).string;

        let inst = this;
        ServerCom.pomeloRequest('connector.entryHandler.getPlayerStats', {'playerId': GameManager.user.playerId, "range": Number(custom)}, function (response) {
            if (response.success) {
                console.log(response);

                inst.resData = response.data;
                inst.updateUI();
            }
        }, null, 5000, false);
    },

    updateUI () {
        // {
        //     "bbValue": 0.04,
        //     "vpipValue": 16,
        //     "pfrValue": 0,
        //     "t3betPFValue": null,
        //     "wtsdValue": 50,
        //     "wsdValue": 0,
        //     "foldTo3betValue": null,
        //     "foldTo4betValue": null,
        //     "foldTo5betValue": null,
        //     "call3BetValue": null,
        //     "raiseFCBetValue": null,
        //     "foldsPostFlopValue": 50,
        //     "callsPostFlopValue": 0,
        //     "raisesPostFlopValue": 0,
        //     "foldPFAfterRValue": null,
        //     "totalAFValue": null,
        //     "buttonFoldTo3BetValue": null,
        //     "attToStealValue": 0,
        //     "stealFromCOValue": null,
        //     "stealFromBTNValue": null,
        //     "foldToStealValue": 0,
        //     "sbFoldToStealValue": null,
        //     "bbFoldToStealValue": 0,
        //     "currentTime": 1722514272955,
        //     "prevTimeValue": 1722427872955
        // }

        cc.find('base/Keys', this.node).children[0].children[0].getComponent(cc.Label).string = (this.resData.vpipValue || 0) + "%";
        cc.find('base/Keys', this.node).children[1].children[0].getComponent(cc.Label).string = (this.resData.pfrValue || 0) + "%";
        cc.find('base/Keys', this.node).children[2].children[0].getComponent(cc.Label).string = (this.resData.t3betPFValue || 0) + "%";
        cc.find('base/Keys', this.node).children[3].children[0].getComponent(cc.Label).string = (this.resData.foldTo3betValue || 0) + "%";
        cc.find('base/Keys', this.node).children[5].children[0].getComponent(cc.Label).string = (this.resData.raiseFCBetValue || 0) + "%";
        cc.find('base/Keys', this.node).children[6].children[0].getComponent(cc.Label).string = (this.resData.stealFromCOValue || 0) + "%";
        cc.find('base/Keys', this.node).children[7].children[0].getComponent(cc.Label).string = (this.resData.attToStealValue || 0) + "%";
        cc.find('base/Keys', this.node).children[8].children[0].getComponent(cc.Label).string = (this.resData.bbValue || 0) + "%";

        cc.find('base/wtrd', this.node).children[0].getComponent(cc.Label).string = "WTSD " + (this.resData.wtsdValue || 0) + "%";
        cc.find('base/wtrd', this.node).children[2].getComponent(cc.Label).string = "WSD " + (this.resData.wsdValue || 0) + "%";
    },

    onDetail(event, data) {
        this.desc.active = true;
        this.desc.opacity = 255;
        this.descLabel.string = {
            "VPIP": "Percentage of the time that a player voluntarily contributed money to the pot, given that he had a chance to do so",
            "PFR": "The percentage of hands where the player made any raise pre-flop",
            "3-Bet": "Percentage of the time that a player 3Bet preflop given that he had a chance to do so",
            "Fold to 3-bet": "Percentage of the time that a player folded to a 3 Bet on any street in any situation regardless of prior action, given that he had a chance to do so",
            "C-Bet": "Percentage of the time that a player raised a continuation bet on the flop",
            "Steal from CO": "Percentage of the time that a player opened the pot by raising from the cutoff.",
            "Steal": "Percentage of the time that a player opened the pot by raising from the cutoff, button, or small blind",
            "BB/100": "Net amount of money that a player won per 100 hands played in terms of big blinds",
            "WTSD": "Percentage of the time that a player went to showdown, given that he saw the flop",
            "WSD": "Percentage of the time that a player won some money at showdown, given that he got to showdown",
        }[data];

        this.desc.stopAllActions();
        this.desc.runAction(cc.sequence(cc.delayTime(2), cc.fadeOut(0.5)));
    },

    onHideDetail() {
        this.desc.stopAllActions();
        this.desc.active = false;
    },

    onClose: function () {
        this.daysD.active = false;
        GameManager.emit("enablePageView");
        this.node.active = false;
        GameManager.emit("showJoinSimlar");
    },
});