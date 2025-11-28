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
        head: {
            default: null,
            type: cc.Label,
        },
        title: {
            default: null,
            type: cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    onShow: function (data) {
        this.soundValue = null;
        if (data != null) {
            this.soundValue = data;
        }
        console.log("LEAVE POPUP WITH DATA ", data)
        if (data) {
            this.closeGame = data;
            this.head.string = 'Quit';
            this.title.string = 'Are you sure you want to quit?';
        }
        else { 
            this.head.string = 'Logout';
            this.title.string = 'Are you sure you want to logout?';
        }
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
        cc.sys.localStorage.setItem('vpUserName', "");
        cc.sys.localStorage.setItem('vpPassword', "");
        GameManager.popUpManager.hide(PopUpType.NotificationPopup, function () { });
        GameManager.popUpManager.hide(PopUpType.OnLogOutPopup, function () { });
        if (this.closeGame) {
            this.closeGame = false;
            if (cc.sys.platform == cc.sys.ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "exitGame", "()V");
            }
            else {
                cc.game.end();    
            }
        } else {
            GameManager.logout();
        }
        // GameManager.playSound(K.Sounds.click);

    },

    /**
     * @description Cancel button callback
     * @method onCancelBtn
     * @memberof Popups.OnLogOutPopup#
     */
    onCancelBtn: function () {
        if (this.soundValue == null || this.soundValue == false) {
            GameManager.playSound(K.Sounds.click);
        }
        // this.popUpManager.hide(PopUpType.OnLogOutPopup, function() { });
        this.closeGame = false;
        GameManager.popUpManager.hide(PopUpType.OnLogOutPopup, function () { });
        // GameManager.playSound(K.Sounds.click);

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
