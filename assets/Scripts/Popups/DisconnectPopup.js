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
        preLogin: {
            default: null,
            type: cc.Node,
        },
        popUpManager: {
            default: null,
            type: PopUpManager
        },
        popUpHeading: {
            default: null,
            type: cc.Label,
        },
        infoLbl: {
            default: null,
            type: cc.Label,
        },
        code: {
            default: 0,
        },

        retryNode: {
            default: null,
            type: cc.Node,
        },

        simpleNode: {
            default: null,
            type: cc.Node,
        },

        quitNode: {
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
        console.log("max disconnect", JSON.stringify(data));
        
        if (this.holdSessionPopup) {
            return;
        }
        this.preserveState = false;
        // console.log("uno ", data.code);
        if (data != null) {
            this.retryNode.active = false;
            this.simpleNode.active = false;
            // this.quitNode.active = true;
            this.infoLbl.string = data.response || "";
            this.code = data.code || 0;
            this.errorType = data.errorType || "";
            this.popUpHeading.string = LocalizedManager.t( 'TXT_INFORMATION' );
            switch (this.code) {
                case 9999:
                    // this.infoLbl.string = data.response;
                    this.infoLbl.string = data.response;
                    this.simpleNode.active = true;
                    break;
                case 6666:
                    // this.infoLbl.string = data.response;
                    this.infoLbl.string = data.response;
                    this.simpleNode.active = true;
                case 3333:
                    // this.infoLbl.string = data.response;
                    this.infoLbl.string = data.response;
                    this.simpleNode.active = true;
                    break;
                case K.Error.TimeOutError:
                    // this.infoLbl.string = data.response;
                    this.infoLbl.string = LocalizedManager.t('TXT_CHECK_YOUR_CONNECTION');
                    break;
                case K.Error.ConnectionError:
                    // this.infoLbl.string = data.response;
                    this.quitNode.active = false;
                    this.simpleNode.active = false;
                    this.retryNode.active = true;

                    this.infoLbl.string = LocalizedManager.t('TXT_CONNECTION_LOST');
                    break;
                case K.Error.SuccessFalseError:
                    this.quitNode.active = false;
                    this.retryNode.active = data.isRetry;
                    this.simpleNode.active = !data.isRetry;
                    this.infoLbl.string = data.response;
                    break;
                case K.Error.KeyMissingBroadcasts:
                    // this.infoLbl.string = data.response;
                    this.retryNode.active = true;
                    this.infoLbl.string = LocalizedManager.t('TXT_CONNECTION_LOST');
                    break;

                case K.Error.PlayerSessionShiftedOnServer:
                    this.simpleNode.active = true;
                    this.infoLbl.string = data.response;
                    this.holdSessionPopup = true;
                    break;

                case K.Error.FeatureComingSoon:
                    this.simpleNode.active = true;
                    this.infoLbl.string = data.response;

                    break;

                case K.Error.ServerDown:
                    this.quitNode.active = false;
                    this.retryNode.active = false;
                    this.simpleNode.active = true;
                    this.infoLbl.string = data.response;
                    this.popUpHeading.string = data.heading;
                    this.holdSessionPopup = true;
                    this.preserveState = data.preserveState;
                    break;
                
                case K.Error.SessionError:
                    this.retryNode.active = false;
                    this.simpleNode.active = true;
                    // this.downloadNode.active = false;
                    // this.whiteNode.active = false;
                    this.quitNode.active = false;
                    this.infoLbl.string = data.response;
                    this.errorType = K.Error.SessionError;
                    break;
                default:
                    // this.infoLbl.string = data.response;
                    this.retryNode.active = true;
                    this.infoLbl.string = LocalizedManager.t('TXT_CONNECTION_LOST');
                    break;
            }

            //AUTO RETRY
            // if (this.retryNode.active && ServerCom.reconnectingTryingFlag) {
            //     console.log("uno auto retrying");
            //     console.log("my retry condition", this.retryNode.active, ServerCom.reconnectingTryingFlag)

            //     this.popUpManager.hide(PopUpType.DisconnectDialog, function () {});
            //     ServerCom.reconnecting.active = true;
            //     pomelo.disconnect();
            // }
        }
    },

    onLoad: function () {
        // cc.game.on(cc.game.EVENT_SHOW, function () {
        //     console.log("event show fired");
        //     console.log(GameManager);
        //     console.log("event show ismobile",GameManager.isMobile,this.retryNode.active);
        //     if(GameManager.isMobile && this.retryNode.active){
        //         this.onRetry();
        //     }
        // }.bind(this));
        this.holdSessionPopup = false;
        this.preserveState = false;
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
    onCancel: function () {
        GameManager.logout();
        // switch (this.code) {
        //     case K.Error.TimeOutError:
        //         this.popUpManager.hide(PopUpType.DisconnectDialog, function () {
        //         });
        //         break;
        //     case K.Error.ConnectionError:
        //         GameManager.logout();
        //         break;
        //     case K.Error.SuccessFalseError:
        //         //Table not found
        //         this.popUpManager.hide(PopUpType.DisconnectDialog, function () {
        //         });
        //         break;
        //     case K.Error.KeyMissingBroadcasts:
        //         this.popUpManager.hide(PopUpType.DisconnectDialog, function () {
        //         });
        //         break;
        //     default:
        //         GameManager.logout();
        //         break;
        // }
    },

    /**
     * @description Hides disconnect popUp
     * @method onIgnore
     * @memberof Popups.DisconnectPopup#
     */
    onIgnore: function () {
        //console.log("onIgnore function called");
        GameManager.playSound(K.Sounds.click);
        this.popUpManager.hide(PopUpType.DisconnectDialog, function () {});

        if (this.errorType == K.Error.UpdateAvailable) {

            if (GameManager.isMobile) {
                cc.sys.openURL(K.ServerAddress.update_Required_URL);
            } else {
                GameManager.logout();
            }
        }

        if (this.errorType == 9999 || this.errorType == 3333) {
            if (this.holdSessionPopup) {
                this.holdSessionPopup = false;
            }
            GameManager.logout3();
            return;
        }

        if (this.errorType == K.Error.SessionError) {
            if (this.holdSessionPopup) {
                this.holdSessionPopup = false;
            }
            // GameManager.logout();

            this.popUpManager.hideAllPopUps();

            cc.systemEvent.emit("leaveLobby");

            cc.sys.localStorage.setItem("auto_login_token", null);
            cc.sys.localStorage.setItem("auto_login_refresh_token", null);
            cc.sys.localStorage.setItem("auto_login_access_token_expire_at", null);
            cc.sys.localStorage.setItem("auto_login_refresh_token_expire_at", null);
            cc.sys.localStorage.setItem("auto_login_username", null);

            ScreenManager.showScreen(K.ScreenEnum.LoginScreen, false, function () {
                // socketIO.socket.disconnect();
                if (((!(cc.sys.os === cc.sys.OS_WINDOWS)) || cc.sys.isBrowser) && !!self) {
                    ServerCom.inGame = true;
                    // self.close();
                }
            });
            return;
        }

        if (this.holdSessionPopup && !this.preserveState) {

            this.holdSessionPopup = false;

            if (GameManager.isMobile) {
                GameManager.logout();
            } else {
                // cc.game.end();
                GameManager.logout();

            }
        }

        if (this.holdSessionPopup) {
            this.holdSessionPopup = false;
        }
        // this.popUpManager.hide(PopUpType.DisconnectDialog, function () {});

        if (this.code == K.Error.SessionError) {
            window.location.reload();
        }

        if (this.code == 9999) {
            GameManager.logout();
        }
    },

    onDownload: function () {
        //console.log("onIgnore function called");
        GameManager.playSound(K.Sounds.click);
        this.popUpManager.hide(PopUpType.DisconnectDialog, function () {});
        cc.sys.openURL("https://metamask.io/download/");
    },

    onWhite: function () {
        //console.log("onIgnore function called");
        GameManager.playSound(K.Sounds.click);
        this.popUpManager.hide(PopUpType.DisconnectDialog, function () {});
        // window.location.reload();
        GameManager.logout();
    },


    /**
     * @description Calls for logout internally
     * @method onRetryCancel
     * @memberof Popups.DisconnectPopup#
     */
    onRetryCancel: function () {
        GameManager.logout();
    },

    /**
     * @description Retry for login again in case of disconnection
     * @method onRetry
     * @memberof Popups.DisconnectPopup#
     */
    onRetry: function () {
        // if (GameManager.isPokerGame) {
            // LoginScreen.clientInit(true);

            this.popUpManager.hide(PopUpType.DisconnectDialog, function () {});
            this.preLogin.active = true;
            socketIO.socket.disconnect();
            socketIO.socket.connect();
        // }
        // else {
        //     GameManager.popUpManager.hideAllPopUps();
        //     window.BingoNetworkHandler.socket.connect();
        // }
    }

});
