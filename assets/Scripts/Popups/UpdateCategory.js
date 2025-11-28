var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

/**
 * @classdesc
 * @class OnLogOutPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {
        title: {
            default: null,
            type: cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    onShow: function (data) {
        this.title.string = data.message;
    },

    /**
     * @description Called when enter button is clicked
     * @method onOkBtn
     * @memberof Popups.OnLogOutPopup#
     */
    onOkBtn: function () {
        if (this.soundValue == null || this.soundValue == false) {
            GameManager.playSound(K.Sounds.click);
        }
        GameManager.popUpManager.hide(PopUpType.NotificationPopup, function () { });
        GameManager.popUpManager.hide(PopUpType.OnLogOutPopup, function () { });
        GameManager.logout();
    }
});
