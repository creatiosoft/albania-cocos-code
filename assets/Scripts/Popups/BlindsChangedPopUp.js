var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

/**
 * @classdesc Manages blindchanged popup
 * @class BlindChangedPopUp
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        popUpManager: {
            default: null,
            type: PopUpManager
        },
        smallBlindLbl: {
            default: null,
            type: cc.Label,
        },

        bigBlindLbl: {
            default: null,
            type: cc.Label,
        },
    },

    /**
     * @description Method called from popUpManager to set initial view of popUp using some data
     * @method onShow
     * @param {Object} data
     * @memberof Popups.BlindChangedPopUp#
     */
    
    onShow: function (data) {
        if (data != null) {
            this.smallBlindLbl.string = data.tableSmallBlind;
            this.bigBlindLbl.string = data.tableBigBlind;
            this.scheduleOnce(function () {
                this.popUpManager.hide(PopUpType.BlindChangedPopup, function () {
                });
            }.bind(this), 1);
        }
    },

});