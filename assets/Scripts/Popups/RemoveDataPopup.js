var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
// var BingoNetworkHandler = require('../../BINGO/Scripts/BingoNetworkHandler').BingoNetworkHandler;

/**
 * @classdesc 
 * @class DissconnectPopup
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
    },

    /**
     * @description Method called from popUpManager to set initial view of this popUp using some data
     * @method onShow
     * @param {Object} data
     * @memberof Popups.DisconnectPopup#
     */
    onShow: function (data) {
        this.data = data;
    },

    onLoad: function () {
    },
    /**
     * @description Called when enter button is clicked
     * @method onClickEnter
     * @memberof Popups.DisconnectPopup#
     */
    onClickEnter: function () {
        // console.log("before on ignore");
        // this.onIgnore();
    },

    /**
     * @description Cancel button callback
     * @method onCancel
     * @memberof Popups.DisconnectPopup#
     */
    onYES: function () {
        if (this.data.callback) {
            this.data.callback();
        }
        this.popUpManager.hide(PopUpType.RemoveDataDialog, function () {});
    },

    /**
     * @description Hides disconnect popUp
     * @method onIgnore
     * @memberof Popups.DisconnectPopup#
     */
    onNo: function () {
        //console.log("onIgnore function called");
        GameManager.playSound(K.Sounds.click);
        this.popUpManager.hide(PopUpType.RemoveDataDialog, function () {});
    }

});
