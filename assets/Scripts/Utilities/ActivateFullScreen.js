/**
 * @namespace Utilities
 */

/**
 * @class ActivatFullScreen
 * @classdesc ActivateFullScreen.js is used to fullScreen when gameLoads initially.
 * @memberof Utilities
 */
var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;

cc.Class({
    extends: cc.Component,
    properties: {
        heightNode: {
            default: null,
            type: cc.Node,
        }
    },
    /**
     * @description Uses cocos inbuilt function to fullScreen!
     * @method onLoad
     * @memberof Utilities.ActivateFullScreen#
     */
    onLoad: function () {
        window.GameScreen = null;
        // var aspect = this.node.width / this.node.height;
        if (cc.sys.platform == cc.sys.MOBILE_BROWSER && (cc.sys.os == cc.sys.OS_IOS)) {
            this.heightNode.height = 790;
        } else {
            this.heightNode.height = 1080;
        }
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: (touch, event) => {
                // window.alert("adasdasdjkasdhajkdasjkdh");
                if (cc.sys.platform == cc.sys.MOBILE_BROWSER && (cc.sys.os != cc.sys.OS_OSX && cc.sys.os != cc.sys.OS_IOS)) {
                    cc.screen.autoFullScreen(cc.game.frame);
                }
            },
        });
        cc.eventManager.addListener(this.listener, this.node);
    },
});