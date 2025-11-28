var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

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
        
        regSuccessNode: {
            default: null,
            type: cc.Node,
        },

        regFailNode: {
            default: null,
            type: cc.Node,
        },
    },

    /**
     * @description Method called from popUpManager to set initial view of this popUp using some data
     * @method onShow
     * @param {Object} data
     * @memberof Popups.DisconnectPopup#
     */
    onShow: function (data) {
        console.log("onShow", data);

        if (data == 1) {
            this.regSuccessNode.active = true;
            this.regFailNode.active = false;
        }
        else {
            this.regSuccessNode.active = false;
            this.regFailNode.active = true;
        }
    },

    onLoad: function () {
    },

    onClose: function () {
        this.popUpManager.hide(PopUpType.RegDialog, function () {});
    }

});