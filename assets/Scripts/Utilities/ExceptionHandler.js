/**
 * @classdesc ExceptionHandler class deal with exception/error! also Registers listeners for pomelo disconnect / error events
 * @class ExceptionHandler
 * @memberof Utilities
 */
var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var Emitter = require('EventEmitter');
var inst = null;

cc.Class({
    extends: cc.Component,

    properties: {
        popUpManager: {
            default: null,
            type: PopUpManager,
        },
        errorEmitters: {
            default: [],
            type: Emitter,
        },
    },

    /**
     * @description Cocos2d-js lifeCycle callback
     * @method start
     * @memberof Utilities.ExceptionHandler# 
     */
    start: function () {
        inst = this;
        this.registerListeners();
    },
    /**
     * @description Register PomeloEvent
     * @method registerPomeloEvent
     * @param {Object} data -Data to be sent.
     * @memberof Utilities.ExceptionHandler#
     */
    registerPomeloEvent: function (data) {
        // console.log("DISCONNECTION RETURNED");
        return function (event) {
            if (LoginHandler.isLoading) {
                inst.popUpManager.hide(PopUpType.NotificationPopup, function () {});

                // if (!!GameScreen && GameScreen.tabRetrying) {
                //     return;
                // }

                // console.error("GAME CONNECTED EXCEPTION WHILE LOADING", K.disconnectRequestedByPlayer);
                if (K.disconnectRequestedByPlayer) {
                    K.disconnectRequestedByPlayer = false;
                } else {

                    inst.popUpManager.show(PopUpType.NotificationPopup, "Please check your\n Internet Connection.", function () {});
                    LoginHandler.isLoading = false;
                }
                // console.error("DISCONNECTION RESOLVED AND BOOL IS IS_LOADING", K.disconnectRequestedByPlayer);
            }
            ServerCom.loading.active = false;
            // console.log(GameManager.isConnected)
            if (GameManager.isConnected) {
                // console.log("uno 1")
                GameManager.isConnected = false;
                var param = {
                    code: K.Error.ConnectionError,
                    response: data
                };
                inst.popUpManager.hideAllPopUps();
                // if (!!GameScreen && GameScreen.tabRetrying) {
                //     return;
                // }
                // console.error("GAME CONNECTED EXCEPTION", K.disconnectRequestedByPlayer);
                if (K.disconnectRequestedByPlayer) {
                    K.disconnectRequestedByPlayer = false;
                } else {
                    if ((ScreenManager.currentScreen === K.ScreenEnum.LoginScreen || ScreenManager.currentScreen === K.ScreenEnum.SignupScreen)) {} else {
                        inst.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
                    }
                }
                // console.error("DISCONNECTION RESOLVED AND BOOL IS IS_CONNECTED", K.disconnectRequestedByPlayer);
            }
            if (!GameManager.isConnected && !LoginHandler.isLoading && K.disconnectRequestedByPlayer) {
                K.disconnectRequestedByPlayer = false;
                // console.error("DISCONNECTION RESOLVED AND BOOL IS IS_LOADING", K.disconnectRequestedByPlayer);
            }
            // console.error("DISCONNECTION none Satisfied o.O");
        };
    },
    /**
     * Checks if a object has value/exist or valid
     * @method isValid
     * @param {Object} obj- Object to validate
     * @memberof Utilities.ExceptionHandler#
     */

    isValid: function (obj) {
        return obj != null && obj != undefined;
    },

    /**
     * Register listeners
     * @method registerListeners 
     * @memberof Utilities.ExceptionHandler#
     */
    registerListeners: function () {
        // pomelo.on("heartbeat timeout", this.registerPomeloEvent("heartbeat timeout"));
        // pomelo.on("io-error", this.registerPomeloEvent("io-error"));
        // pomelo.on("disconnect", this.registerPomeloEvent("disconnect"));
        // pomelo.on("no-internet", this.registerPomeloEvent("Internet or Server issue."));
        // pomelo.on("PlayerLoggedInFromDifferentDevice", this.PlayerSessionShifted());
        // this.errorEmitters.forEach(function (emitter) {
        //     emitter.on('error', function (error) {
        //         console.log("@@@@@@@ Exception HAndler ", JSON.stringify(error));
        //         // console.log(JSON.stringify(error));
        //         if (error.code == K.Error.TimeOutError) {
        //             inst.popUpManager.hide(PopUpType.NotificationPopup, function () {});
        //             inst.popUpManager.show(PopUpType.NotificationPopup, "Too Slow!! Please check your\n Internet Connection.", function () {});
        //             // console.log("uno 2");
        //             var param = {
        //                 code: K.Error.ConnectionError,
        //                 response: "disconnected"
        //             };

        //             if ((ScreenManager.currentScreen === K.ScreenEnum.LoginScreen || ScreenManager.currentScreen === K.ScreenEnum.SignupScreen)) {} else {
        //                 inst.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
        //             }

        //         } else if (GameManager.isConnected) {
        //             inst.handleSuccessFalse(error);
        //         } else if (error.code != K.Error.ConnectionError) {
        //             inst.handleSuccessFalse(error);
        //         }
        //     });
        // }, this);
    },

    /**
     * When Player logs in from different device then this will be called 
     */
    PlayerSessionShifted: function (deviceType) {
        return function (deviceType) {
            // console.log("INSIDE PLAYER SESSION MSG TYPE ", deviceType, GameManager.isConnected)
            GameManager.isConnected = false;
            var data = "";
            if (deviceType == "browser") {
                data = LocalizedManager.t('TXT_LOGGED_OTHER_DEVICE_WEB');
            } else if (deviceType == "androidApp") {
                data = LocalizedManager.t('TXT_LOGGED_IN_ANDROID');
                // data = "You have logged in from an Android device."
            } else if (deviceType == "iosApp") {
                data = LocalizedManager.t('TXT_LOGGED_IN_IOS');
                // data = "You have logged in from an iOS device."
            } else if (deviceType == "windows" || deviceType == "mac") {
                data = LocalizedManager.t('TXT_LOGGED_PC');
                // data = "You have logged in from a Windows PC."
            } else if (deviceType == "another device") {
                data = LocalizedManager.t('TXT_LOGGED_IN_OTHER_DEVICE');
                // data = "You have logged in from another device."
            } else if (deviceType == "ServerDown") {
                data = LocalizedManager.t('TXT_LOGOUT_SERVER_MAINTENANCE');
                // data = "You have been logged out due to server going into Maintenance, please try later!"
                var param = {
                    code: K.Error.ServerDown,
                    heading: "Server Down",
                    response: data,
                    preserveState: false,
                };
                // console.log("SHOWING LOGOUT POPUP WITH PARAM ", param)
                inst.popUpManager.hideAllPopUps();
                inst.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});

            }

            var param = {
                code: K.Error.PlayerSessionShiftedOnServer,
                response: data
            };
            // console.log("SHOWING LOGOUT POPUP WITH PARAM ELSE", param)
            inst.popUpManager.hideAllPopUps();
            inst.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});

        };

    },

    /**
     * handles error in tables
     * @method handleSuccessFalse
     * @param {String} error
     * @memberof Utilities.ExceptionHandler# 
     */
    handleSuccessFalse: function (error) {
        if (!!error.channelId && !!GameScreen) {
            for (var index = 0; index < GameScreen.gameModel.activePokerModels.length; index++) {
                if (error.channelId === GameScreen.gameModel.activePokerModels[index].gameData.channelId) {
                    GameScreen.gameModel.activePokerModels[index].popUpManager.show(PopUpType.DisconnectDialog, error, function () {});
                    return;
                }
            }
        }
        this.popUpManager.hide(PopUpType.DisconnectDialog, function () {});
        if (error.response == "Specified verison does not exist!" || error.response == "An updated version is required to continue playing the game. Kindly reload the game." || error.response == "An updated version is required to continue playing the game. Kindly download the updated build.") { //updateJuly

        } else
            this.popUpManager.show(PopUpType.DisconnectDialog, error, function () {});
    },
});
