var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

/**
 * @classdesc Manages quickseat popUp
 * @class ConfirmQuickSeatSitNGo
 * @extends PopUpBase
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {
        popUpManager: {
            default: null,
            type: PopUpManager
        },
        avlblMoneyLbl: {
            default: null,
            type: cc.Label,
        },
        chargeLbl: {
            default: null,
            type: cc.Label,
        },
        buyInLbl: {
            default: null,
            type: cc.Label,
        },
        entryFeeLbl: {
            default: null,
            type: cc.Label,
        },
        nameLbl: {
            default: null,
            type: cc.Label,
        },
        prizePoolLbl: {
            default: null,
            type: cc.Label,
        },
    },

    /**
     * @description Method called from popUpManager to set initial view of this popup using some data
     * @method onShow
     * @param {Object} data
     * @memberof Popups.ConfirmDialogQuickSeatSitNGo#
     */
    onShow: function(data) {
        if (data != null) {
            this.data = data;
        }
        this.nameLbl.string = data.result.channelName;
        this.buyInLbl.string = data.result.entryfees;
        this.entryFeeLbl.string = data.result.housefees + data.result.bountyfees;
        this.chargeLbl.string = data.result.buyIn;
        var calculatedPool = (parseInt(data.data.buyIn) * parseInt(data.data.maxPlayersForTournament) * 0.85);
        this.prizePoolLbl.string = "Prize Pool: " + (data.result.prizePool || calculatedPool);
        this.avlblMoneyLbl.string = (data.data.isRealMoney) ? GameManager.user.realChips : GameManager.user.freeChips; //?
    },

    /**
     * @description Confirm button callback
     * @method onConfirm
     * @memberof Popups.ConfirmDialogQuickSeatSitNGo#
     */
    onConfirm: function() {
        var data = {};
        data._id = this.data.result._id;
        data.gameVersionCount = this.data.result.gameVersionCount;
        TournamentHandler.registerTournament(data, function(response) {
            if (response.success) {
                var data = {};
                data.heading = this.nameLbl.string;
                data.info = "You are registered";
                GameManager.popUpManager.show(PopUpType.PlayerInfoPopup, data, function() { });
            } else {
                // data.info = "Registeration failed";
            }
            this.onExit();
        }.bind(this), function(response) { }, false);
    },

    /**
     * @description Exit button callback
     * @method onExit
     * @memberof Popups.ConfirmDialogQuickSeatSitNGo#
     */
    onExit: function() {
        this.popUpManager.hide(PopUpType.ConfirmDialogQuickSeatSitNGo, function() { });
    },

});