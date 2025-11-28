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
    },

    // use this for initialization
    onLoad: function () {

    },

    onShow: function () {
    },

    /**
     * @description Called when enter button is clicked
     * @method onOkBtn
     * @memberof Popups.OnLogOutPopup#
     */
    onOkBtn: function () {

        var device = "";
        if (cc.sys.isBrowser) {
            device = "browser";
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                device = "androidApp";
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                device = "iosApp";
            } else if (cc.sys.os === cc.sys.OS_OSX) {
                device = "mac";
            }

        } 
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            device = "androidApp";
            cc.sys.openURL("https://play.google.com/store/apps/details?id=com.atozgames.bbpokergame");
        } 
        else if (cc.sys.os === cc.sys.OS_IOS) {
            device = "iosApp";
            cc.sys.openURL("https://apps.apple.com/us/app/bb-poker-play-with-friends/id6737835776");
        } 
        else if (cc.sys.os === cc.sys.OS_WINDOWS) {
            device = "windows";
        }else if (cc.sys.os === cc.sys.OS_OSX) {
            device = "mac";
            cc.sys.openURL("https://play.google.com/store/apps/details?id=com.atozgames.bbpokergame");
        }
    }
});
