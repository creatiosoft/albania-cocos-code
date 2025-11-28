var K = require("GameConfig").K;

cc.Class({
    extends: cc.Component,

    properties: {
        pokerPresenter: {
            default: null,
            type: cc.Node
        },

        addonMyChipsLbl: {
            default: null,
            type: cc.Label,
        },

        addonChips: {
            default: null,
            type: cc.Label,
        },

        addonHouseFee: {
            default: null,
            type: cc.Label,
        },

        addonAmount: {
            default: null,
            type: cc.Label,
        },

        addonTimer: {
            default: null,
            type: cc.Label,
        },
        confirmButton: {
            default: null,
            type: cc.Button,
        },
        rebuyTimerCount: 0,
    },

    /**
     * @method onLoad
     * @description Lifecycle callback, Used to Register some broadcast as tableUpdate, Perform some alignmetn of widget!
     * @memberof Screens.Lobby.Table.Table#
     */
    onLoad: function () {

    },

    
    onDisable: function () {

    },

    onEnable: function () {
    },

    onBuy: function () {
        this.pokerPresenter.getComponent("PokerPresenter").model.addon(
            this.pokerPresenter.getComponent("PokerPresenter").model.gameData.channelId,
            GameManager.user.playerId,
            this.pokerPresenter.getComponent("PokerPresenter").model.gameData.raw.tourData.raw._id,
            (res) => {
                console.log("onAddon", res);
            },
            (error) => {
                console.log("onAddon", error);
            }
        );
    },

    onClose: function() {
        this.node.active = false
    },

    addonDone: function(data) {
        console.log("addonDone", data);
        this.unschedule(this.updateRebuy);
        this.addonTimer.string = ' ';
        this.confirmButton.interactable = false;
    },

    updateRebuy() {
        this.rebuyTimerCount -= 1000;
        if (this.rebuyTimerCount <= 0) {
            this.rebuyTimerCount = 0;
            this.unschedule(this.updateRebuy);
            this.confirmButton.interactable = false;

            this.scheduleOnce(() => {
                this.onClose();
            }, 1);
        }
        this.addonTimer.string = '(' + parseInt(this.rebuyTimerCount / 1000) + 's)';
    },

    setData:function (data) {
        this.data = data;

        this.confirmButton.interactable = true;
        let raw = this.pokerPresenter.getComponent("PokerPresenter").model.gameData.raw.tourData.raw;
        
        this.addonMyChipsLbl.string = GameManager.user.realChips;
        this.addonChips.string = raw.addonChips;
        this.addonHouseFee.string = raw.addonHouseFee;
        this.addonAmount.string = raw.addonAmount;
        
        this.rebuyTimerCount = data.breakTime;
        this.updateRebuy();
        this.schedule(this.updateRebuy, 1);
    },
});


