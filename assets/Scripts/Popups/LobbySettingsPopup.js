var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

/**
 * @classdesc
 * @class LobbySettingsPopup
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



    // use this for initialization
    onLoad: function () {

    },

    onShow: function (data) {

    },

    onHide: function () {
    },

    /**
     * @description Cancel button callback
     * @method onCancel
     * @memberof Popups.LobbySettingsPopup#
     */
    onCancel: function () {

        this.popUpManager.hide(PopUpType.LobbySettingsPopup, function () {  });

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
