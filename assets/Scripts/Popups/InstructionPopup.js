var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
/**
 * @classdesc
 * @class InstructionPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {
        
        infoLbl: {
            default: null,
            type: cc.Label,
        },
        headingLbl: {
            default: null,
            type: cc.Label,
        }
    },

    /**
     * @description Set labels of popup and auto hide the popup after 4 seconds
     * @method onShow
     * @param {Object} data
     * @memberof Popups.InstructionPopup#
     */
    onShow: function (data) {
        
    },

    /**
     * @description Cancel button callback
     * @method onClickEnter
     * @memberof Popups.InstructionPopup#
     */
    onClickEnter: function () {
       this.cancel();
    },

    /**
     * @description Cancek button callback
     * @method cancel
     * @memberof Popups.InstructionPopup#
     */
    cancel: function () {
        GameManager.popUpManager.hide(PopUpType.InstructionPopup, function () { });
    },
});
