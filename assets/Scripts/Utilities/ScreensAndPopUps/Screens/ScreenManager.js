var AbstractScreen = require('AbstractScreen');
var root = window;
var ScreenEnum = new cc.Enum({
    SplashScreen: 0,
    SignupScreen: 1,
    LoginScreen: 2,
    LobbyScreen: 3,
    GamePlayScreen: 4,
    ForgotPasswordScreen:5,
    None: 100
});

var ScreenState = new cc.Enum({
    SHOWN: 0,
    HIDDEN: 1,
});

/**
 * @classdesc Screen Manager Class, Handles all screens -show/hide!!
 * @class ScreenManager
 * @memberof Utilities.ScreensAndPopUps.Screens
 * @author modified: #1 Dharmaraj P - Animation callBack bug fix
 */
var ScreenManager = cc.Class({
    extends: cc.Component,

    properties: {

        screens: {
            default: [],
            type: AbstractScreen,
        },

        currentScreen: {
            default: ScreenEnum.LoginScreen,
            type: ScreenEnum
        },

        screenState: {
            default: null,
            type: ScreenState,
            visible: false,
        },

    },

    statics: {
        instance: null,
    },

    onLoad: function() {
        // window.close();
        root.ScreenManager = this;
        ScreenManager.instance = this;
    },

    /**
     * @description API for showing screens
     * @method showScreen
     * @param {Number} screen -index
     * @param {Object} optionalData 
     * @param {callBack} callBack -callback to be execute
     * @memberof Utilities.ScreensAndPopUps.Screens.ScreenManager#
     */
    showScreen: function(screen, optionalData, callBack) {
        // console.log("show screen");
        this.enableNewScreen(screen, optionalData, callBack);

        if (K.PORTRAIT) {
            // GameManager._orientationCheck();
        }
    },

    /** 
     * @description Handle show new screen
     * @method enableNewScreen
     * @param {Number} screen -index
     * @param {Object} optionalData -data
     * @param {callBack} callBack -callBack to be execute!
     * @memberof Utilities.ScreensAndPopUps.Screens.ScreenManager#
     */
    enableNewScreen: function(screen, optionalData, callBack) {
        console.log("enableNewScreen", screen);
        if (this.currentScreen !== K.ScreenEnum.None) {
            this.hideCurrentScreen(screen, optionalData, callBack);
        } else {
            this.showNextScreen(screen, optionalData, callBack);
        }
        // return this.screens[this.currentScreen];
    },

    /** 
     * @description Handles animations for new screen
     * @method showNextScreen
     * @param {Number} screen -screen to show
     * @param {Object} optionalData - Data
     * @param {callBack} callBack - callBack to be execute
     * @memberof Utilities.ScreensAndPopUps.Screens.ScreenManager#
     */
    showNextScreen: function(screen, optionalData, callBack) {
        console.log("showNextScreen", screen);
        this.screens[screen].node.active = true;
        this.currentScreen = screen;
        // var anim = this.screens[screen].getComponent('AnimBase');
        // if (anim === null) {
            this.screens[screen].onShow(optionalData);
            if (callBack !== null)
                callBack();
            this.screenState = ScreenState.SHOWN;
            return;
        // }
        // var inst = this;
        // anim.play("showScreen", function() {
        //     inst.screens[screen].onShow(optionalData);
        //     if (callBack !== null)
        //         callBack();
        // });
        this.screenState = ScreenState.SHOWN;
    },

    /** 
     * @description Handles animations for closing old screen
     * @method hideCurrentScreen
     * @param {Number} screen -screen to hide
     * @param {Object} optionalData -Data
     * @param {callBack} nextCallBack -callBack to be execute
     * @memberof Utilities.ScreensAndPopUps.Screens.ScreenManager#
     */
    hideCurrentScreen: function(nextScreen, nextOptionalData, nextCallBack) {
        console.log("hideCurrentScreen", nextScreen);
        // var anim = this.screens[this.currentScreen].getComponent('AnimBase');
        var inst = this;
        // if (anim === null) {
            inst.screens[inst.currentScreen].onHide();
            inst.screens[inst.currentScreen].node.active = false;
            inst.screenState = ScreenState.HIDDEN;
            inst.currentScreen = ScreenEnum.None;

            if (nextScreen !== null && nextScreen !== undefined) {
                inst.showNextScreen(nextScreen, nextOptionalData, nextCallBack);
            }
            return;
        // }
        // anim.play("hidePopUp", function() {
        //     inst.screens[inst.currentScreen].onHide();
        //     inst.screens[inst.currentScreen].node.active = false;
        //     inst.screenState = ScreenState.HIDDEN;
        //     inst.currentScreen = K.ScreenEnum.None;

        //     if (nextScreen !== null && nextScreen !== undefined) {
        //         inst.showNextScreen(nextScreen, nextOptionalData, nextCallBack);
        //     }
        // });
    },
});

module.exports = {
    ScreenManager: ScreenManager,
    ScreenEnum: ScreenEnum
}