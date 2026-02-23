var AbstractScreen = require('AbstractScreen');
var LoginHandler = require('LoginHandler');
var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var CheckBoxType = require('Checkbox');
var CustomEditBox = require('CustomEditBox');
var JoinData = require('PostTypes').JoinChannel;
var GameData = require('ResponseTypes').GameData;

/**
 * @classdesc Handles User Login View/Screen
 * @class Screens.Login.LoginScreen
 * @extends AbstractScreen
 */
var inst;
cc.Class({
    extends: AbstractScreen,

    properties: {
        vpForgetPasswordSuccessPopup: {
            default: null,
            type: cc.Node,
        },
        vpForgetPasswordErrorMessage1: {
            default: null,
            type: cc.Label,
        },
        vpForgetPasswordErrorMessage2: {
            default: null,
            type: cc.Label,
        },
        vpForgetPasswordErrorMessage3: {
            default: null,
            type: cc.Label,
        },
        vpForgetPasswordSubmit: {
            default: null,
            type: cc.Button,
        },
        vpForgetPasswordSubmitOTP: {
            default: null,
            type: cc.Button,
        },
        vpForgetPasswordSubmitUpdate: {
            default: null,
            type: cc.Button,
        },
        vpForgetPasswordUsername: {
            default: null,
            type: cc.EditBox,
        },
        vpForgetPasswordEmail: {
            default: null,
            type: cc.EditBox,
        },
        vpForgetPasswordOTP: {
            default: null,
            type: cc.EditBox,
        },
        vpForgetPasswordNew: {
            default: null,
            type: cc.EditBox,
        },
        vpForgetPasswordNewConfirm: {
            default: null,
            type: cc.EditBox,
        },
        // 
        vpLogin: {
            default: null,
            type: cc.Button,
        },
        vpErrorMessage: {
            default: null,
            type: cc.Label,
        },
        vpUserName: {
            default: null,
            type: cc.EditBox,
        },
        vpPassword: {
            default: null,
            type: cc.EditBox,
        },
        // 
        flagScrollView: {
            default: null,
            type: cc.Node,
        },
        flagScrollViewContent: {
            default: null,
            type: cc.Node,
        },
        flagItem: {
            default: null,
            type: cc.Node,
        },
        flagNode: {
            default: null,
            type: cc.Node,
        },
        launch: {
            default: null,
            type: cc.Node,
        },
        tc: {
            default: null,
            type: cc.Node,
        },
        capture: {
            default: null,
            type: cc.Node,
        },
        gotoTable: {
            default: null,
            type: cc.Node,
        },
        timerNode: {
            default: null,
            type: cc.Node,
        },
        resendNode: {
            default: null,
            type: cc.Node,
        },
        loginUsingPasswordNode: {
            default: null,
            type: cc.Node,
        },
        loginUsingPasswordUsername: {
            default: null,
            type: cc.EditBox,
        },
        loginUsingPasswordPassword: {
            default: null,
            type: cc.EditBox,
        },
        forgetPasswordResendNode: {
            default: null,
            type: cc.Node,
        },
        forgetPasswordTimerNode: {
            default: null,
            type: cc.Node,
        },
        forgetPasswordNode: {
            default: null,
            type: cc.Node,
        },
        forgetPasswordOtp: {
            default: null,
            type: cc.EditBox
        },
        forgetPasswordNewPassword1: {
            default: null,
            type: cc.EditBox
        },
        forgetPasswordNewPassword2: {
            default: null,
            type: cc.EditBox
        },
        forgetPasswordContent1: {
            default: null,
            type: cc.Node
        },
        forgetPasswordContent2: {
            default: null,
            type: cc.Node
        },
        otpNode: {
            default: null,
            type: cc.Node,
        },
        otp: {
            default: null,
            type: cc.EditBox
        },
        preLogin: {
            default: null,
            type: cc.Node,
        },
        loginHandler: {
            default: null,
            type: LoginHandler,
        },
        userName: {
            default: null,
            type: cc.EditBox,
        },
        password: {
            default: null,
            type: cc.EditBox,
        },
        countryCode: {
            default: null,
            type: cc.EditBox,
        },
        phone: {
            default: null,
            type: cc.EditBox,
        },
        loginDebug: {
            default: [],
            type: cc.Node,
        },
        popupManager: {
            default: null,
            type: PopUpManager,
        },
        lobby: {
            default: null,
            type: cc.Node,
        },
        rememberMeCheckBox: {
            default: null,
            type: CheckBoxType,
        },
        rememberMe: {
            default: false,
            visible: false,
        },
        isWindows: false,
        userNameEdit: {
            default: null,
            type: cc.Label,
        },
        passwordEdit: {
            default: null,
            type: cc.Label,
        },
        customEditBox: {
            default: null,
            type: CustomEditBox,
        },
        loginNode: {
            default: null,
            type: cc.Node
        },
        //for getting password from password custom edit box label
        alreadyStoredPwd: false,
        enterPressedTime: true,
        tourData: null,
        //for mobile scene
        rememberMeMob: {
            default: null,
            type: cc.Toggle
        },
        lobbySelectorNode: {
            default: null,
            type: cc.Node
        },
        resendTimer: 61,

        forgetPasswordResendTimer: 61,

        verfyOtpClickable: true

        // loginDataFromInsta: {
        //     userName: null,
        //     password: null,
        // },

    },

    showFlagScrollView: function() {
        this.flagScrollView.active = !this.flagScrollView.active;

        for (var i = 0; i < this.flagScrollViewContent.children.length; i++) {
            this.flagScrollViewContent.children[i].children[0].active = false;

            if (this.flagScrollViewContent.children[i].__data.dial_code == this.countryCode.string) {
                this.flagScrollViewContent.children[i].children[0].active = true;
            }
        }
    },

    hideFlagScrollView: function() {
        this.flagScrollView.active = false;
    },

    onEndEdit: function() {
        for (var i = 0; i < window.CountryCodes.length; i++) {
            if (this.countryCode.string == window.CountryCodes[i].dial_code) {
                cc.sys.localStorage.setItem('country', window.CountryCodes[i].code);
                cc.sys.localStorage.setItem('countryCode', this.countryCode.string);
                cc.resources.load("flags/" + window.CountryCodes[i].code.toLowerCase(), cc.SpriteFrame, function(err, tex) {
                    if (err) {} else {
                        inst.flagNode.getComponent(cc.Sprite).spriteFrame = tex;
                    }
                });
                return;
            }
        }

        cc.resources.load("flags/" + window.CountryCodes[230].code.toLowerCase(), cc.SpriteFrame, function(err, tex) {
            if (err) {} else {
                inst.flagNode.getComponent(cc.Sprite).spriteFrame = tex;
            }
        });
        this.countryCode.string = window.CountryCodes[230].dial_code;
        cc.sys.localStorage.setItem('country', window.CountryCodes[230].code);
        cc.sys.localStorage.setItem('countryCode', window.CountryCodes[230].string);

        for (var i = 0; i < this.flagScrollViewContent.children.length; i++) {
            this.flagScrollViewContent.children[i].children[0].active = false;

            if (this.flagScrollViewContent.children[i].__data.dial_code == this.countryCode.string) {
                this.flagScrollViewContent.children[i].children[0].active = true;
            }
        }
    },

    onSelectFlag: function(event, customEventData) {
        // console.log("customEventData", event.target);

        for (var i = 0; i < this.flagScrollViewContent.children.length; i++) {
            this.flagScrollViewContent.children[i].children[0].active = false;
        }

        event.target.children[0].active = true;

        cc.sys.localStorage.setItem('country', customEventData.code);

        cc.resources.load("flags/" + customEventData.code.toLowerCase(), cc.SpriteFrame, function(err, tex) {
            if (err) {} else {
                inst.flagNode.getComponent(cc.Sprite).spriteFrame = tex;
            }
        });
        this.countryCode.string = customEventData.dial_code;
        cc.sys.localStorage.setItem('countryCode', this.countryCode.string);
        this.hideFlagScrollView();
    },

    loadFlags: function() {
        this.flagScrollViewContent.removeAllChildren();

        console.log(window.CountryCodes);

        if (cc.sys.localStorage.getItem('phone')) {
            this.countryCode.string = cc.sys.localStorage.getItem('countryCode');
        } else {
            cc.sys.localStorage.setItem('country', window.CountryCodes[230].code);
            cc.resources.load("flags/" + window.CountryCodes[230].code.toLowerCase(), cc.SpriteFrame, function(err, tex) {
                if (err) {} else {
                    inst.flagNode.getComponent(cc.Sprite).spriteFrame = tex;
                }
            });
            this.countryCode.string = window.CountryCodes[230].dial_code;
        }

        for (var i = 0; i < window.CountryCodes.length; i++) {
            const instance = cc.instantiate(this.flagItem);
            instance.setPosition(0, 0);
            instance.active = true;
            instance.children[0].active = false;
            instance.children[2].getComponent(cc.Label).string = "+" + window.CountryCodes[i].dial_code;
            cc.resources.load("flags/" + window.CountryCodes[i].code.toLowerCase(), cc.SpriteFrame, function(err, tex) {
                if (err) {} else {
                    instance.children[1].getComponent(cc.Sprite).spriteFrame = tex;
                }
            });
            instance.getComponent(cc.Button).clickEvents[0].customEventData = window.CountryCodes[i];
            instance.parent = this.flagScrollViewContent;
            instance.__data = window.CountryCodes[i];

            if (cc.sys.localStorage.getItem('country') == window.CountryCodes[i].code) {
                instance.children[0].active = true;
                cc.resources.load("flags/" + window.CountryCodes[i].code.toLowerCase(), cc.SpriteFrame, function(err, tex) {
                    if (err) {} else {
                        inst.flagNode.getComponent(cc.Sprite).spriteFrame = tex;
                    }
                });
            }
        }
    },

    onLoad: function() {

        console.log("==========================>isZFold", GameManager.isZFold());
        if (GameManager.isZFold()) {

            cc.find("EntryHandler", cc.Canvas.instance.node).scale = 0.8;
        }


        if (cc.sys.localStorage.getItem('vpUserName')) {
            this.vpUserName.string = cc.sys.localStorage.getItem('vpUserName');
        }
        if (cc.sys.localStorage.getItem('vpPassword')) {
            this.vpPassword.string = cc.sys.localStorage.getItem('vpPassword');
        }


        GameManager.init();
        // console.log = function () { };
        // console.error = function () { };
        this.loginDataFromInsta = {
            userName: null,
            password: null,
        };

        // console.log("BULD VERSION STRING :-**********    ", K.TestingBuildVersion);
        if (!GameManager.isMobile || cc.sys.isBrowser) {

            if (!!window.loginDataFromInsta && sessionStorage.getItem("userName") != null) {
                window.loginDataFromInsta.userName = sessionStorage.getItem("userName");
                window.loginDataFromInsta.password = sessionStorage.getItem("password");
                // console.log("SESSION RETRIVED WITH DATA ", window.loginDataFromInsta.userName + "  " + window.loginDataFromInsta.password)
            } else if (!window.loginDataFromInsta) {
                window.loginDataFromInsta = this.loginDataFromInsta
                // console.error("NO SESSION FOUND")
            }
        }

        cc.debug.setDisplayStats(false);

        if ((GameManager.isMobile) && (cc.sys.os === cc.sys.OS_ANDROID) && !cc.sys.isBrowser) {
            //call method to hide Splash :Image on Android
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "dismissLoader", "()V");
        }

        this.submitEnter();
        this.enterPressedTime = true;
    },

    /**
     * @description Handles submit button on login screen
     * @method submitEnter
     * @memberof Screens.Login.LoginScreen#
     */
    submitEnter: function() {
        return;
        var enterKeyRef = this;
        this.enterListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed(key, event) {
                //   console.log(enterKeyRef.enterPressedTime);
                if (enterKeyRef.node.active && (key == cc.KEY.enter && enterKeyRef.enterPressedTime)) {
                    //  console.log("submit btn pressed ");
                    enterKeyRef.enterPressedTime = false;
                    enterKeyRef.onLogin();
                    enterKeyRef.scheduleOnce(function() {
                        enterKeyRef.enterPressedTime = true
                    }, 2);
                    event.stopPropagation();
                }
            }
        });
        cc.eventManager.addListener(this.enterListener, this.node.zIndex + 1);
    },

    /**
     * @description Initialisations
     * @method start
     * @memberof Screens.Login.LoginScreen#
     */
    start: function() {
        inst = this;
        window.LoginScreen = this;


        this.preLogin.active = true;
        GameManager.scheduleOnce(function() {
            inst.clientInit();
        }, 2);

        // if ((window.loginDataFromInsta && window.loginDataFromInsta.userName != null && window.loginDataFromInsta.password != null) || (!!window.opener && !!window.opener.loginData)) {
        //     // console.log("WEB LOGIN DATA ", window.opener.loginData)
        //     // console.log("WEB LOGIN DATA PARSED ", JSON.parse(window.opener.loginData))

        //     if ((window.loginDataFromInsta.userName != null && window.loginDataFromInsta.password != null)) {
        //         this.onLoginCallBack(JSON.parse(window.loginDataFromInsta));

        //         if (typeof window.opener.loginData === "string") {
        //             inst.onLogin(false, false, JSON.parse(window.opener.loginData));
        //         } else {
        //             inst.onLogin(false, false, window.opener.loginData);
        //             // var loginCredientialsTmp = JSON.parse(window.opener.loginData);
        //         }
        //     } else {

        //         this.onLoginCallBack(JSON.parse(window.opener.loginData));
        //         // console.log("CHECK LOGIN DAddddddTA", JSON.parse(window.opener.loginData));
        //         // console.log(window.opener.loginData);
        //         let loginInfo = JSON.parse(window.opener.loginData);
        //         this.userName.string = loginInfo.userName;
        //         this.password.string = loginInfo.password;

        //         window.loginDataFromInsta.userName = loginInfo.userName;
        //         window.loginDataFromInsta.password = loginInfo.password;

        //         if (typeof window.opener.loginData === "string") {
        //             inst.onLogin(false, false, JSON.parse(window.opener.loginData));
        //         } else {
        //             inst.onLogin(false, false, window.opener.loginData);
        //             // var loginCredientialsTmp = JSON.parse(window.opener.loginData);
        //         }
        //     }
        //     // inst.onLogin(false, false, loginCredientialsTmp);
        // }
    },

    /**
     * @description callback called when the login screen is displayed, set cache user login details!
     * @method onShow
     * @memberof Screens.Login.LoginScreen#
     * @param {} init
     */
    onShow: function(init) {

        // this.loadFlags();

        if (cc.sys.localStorage.getItem('vpUserName')) {
            this.vpUserName.string = cc.sys.localStorage.getItem('vpUserName');
        } else {
            this.vpUserName.string = "";
        }
        if (cc.sys.localStorage.getItem('vpPassword')) {
            this.vpPassword.string = cc.sys.localStorage.getItem('vpPassword');
        } else {
            this.vpPassword.string = "";
        }


        this.verfyOtpClickable = true;

        // socketIO.socket.disconnect();
        // if (this.loginDataFromInsta.userName != null && this.loginDataFromInsta.password != null) {
        //     // if we have logged in from Insta Play then don't clear it will be used in retry
        // } else {

        // this.userName.string = "";
        // this.password.string = "";
        // }
        // if (cc.sys.os == cc.sys.OS_OSX) {
        //     // console.log("on load called...")
        //     this.userName.node.getComponent("EditBoxUtil").onEditEnd();
        //     this.password.node.getComponent("EditBoxUtil").onEditEnd();
        // }

        if (!!init && init === true) {
            //console.error("here " + init);
            this.clientInit();
        }
        var user = cc.sys.localStorage.getItem(K.SystemStorageKeys.userId);
        let rememberPrefs = cc.sys.localStorage.getItem(K.SystemStorageKeys.rememberMePreference);
        rememberPrefs = "true";
        // console.log("LOGIN SAVE PREF STATE SHOW ", rememberPrefs)

        if (rememberPrefs == "true") {
            // console.log("SHOWING SAVED DATA ");
            this.showUserLoginDetails(cc.sys.localStorage.getItem(K.SystemStorageKeys.userId), cc.sys.localStorage.getItem(K.SystemStorageKeys.password), rememberPrefs);
        } else {
            // console.log("PREFS NOT SHOWN");
            // this.rememberMeMob.isChecked = false;
            this.userName.string = "";
            this.password.string = "";
        }
        if (!GameManager.isMobile && false) {
            this.rememberMeCheckBox.registerCallback(this.setRememberMe.bind(this))
        };
    },

    /**
     * @description Dummy!
     * @method onHide
     * @memberof Screens.Login.LoginScreen#
     */
    onHide: function() {},

    togglePassword: function() {
        if (this.password.inputFlag == cc.EditBox.InputFlag.DEFAULT) {
            this.password.inputFlag = cc.EditBox.InputFlag.PASSWORD;
        } else {
            this.password.inputFlag = cc.EditBox.InputFlag.DEFAULT;
        }
    },

    /**
     * @description Updates user's view as he enters username and password
     * @method showUserLoginDetails
     * @param {String} userName -username of player
     * @param {String} password -password beign used for login
     * @memberof Screens.Login.LoginScreen#
     */
    showUserLoginDetails: function(userName, password, rememberPrefs) {
        if (!GameManager.isMobile) {

            if (cc.sys.os === cc.sys.OS_WINDOWS && !cc.sys.isBrowser) {
                if (userName && password && rememberPrefs) {

                    this.userName.string = userName;
                    this.password.string = password;
                    // console.log("CHECK BOX REMREMBER ME ", rememberPrefs);
                    // this.rememberMeMob.node.getComponent('cc.Toggle').isChecked = rememberPrefs;
                    this.rememberMeMob.isChecked = rememberPrefs;
                    // this.rememberMeCheckBox.checkMark.active = rememberPrefs;
                } else {
                    // if (this.loginDataFromInsta.userName != null && this.loginDataFromInsta.password != null) {
                    //     // if we have logged in from Insta Play then don't clear it will be used in retry
                    // } else {
                    this.userName.string = "";
                    this.password.string = "";
                    // }
                }
            } else {


                this.userName.string = userName;
                // this.userNameEdit.string = userName;

                // console.log("SHOW USER DATA WENT WRONG")

                this.password.string = password;
                //this.passwordEdit.node.tag = cc.sys.localStorage.getItem(K.SystemStorageKeys.password);
                var displayPassword = "";
                var u = password || "";
                for (var i = 0; i < u.length; i++) {
                    displayPassword += "*";
                }
                // this.passwordEdit.string = displayPassword;
                // this.customEditBox.setPassword(u);
                this.alreadyStoredPwd = true;
                // this.userName.node.getComponent('EditBoxUtil').onEditStarted();
                // this.password.node.getComponent('EditBoxUtil').onEditStarted();
                // this.userName.node.getComponent('EditBoxUtil').onEditEnd();
                // this.password.node.getComponent('EditBoxUtil').onEditEnd();

            }
        } else {
            // if (this.rememberMeMob.isChecked) {
            // console.log("ELSE IN SHOW")
            // if (userName && password && rememberPrefs) {

            //     this.userName.string = userName;
            //     this.password.string = password;
            //     // console.log("CHECK BOX REMREMBER ME ", rememberPrefs);
            //     // this.rememberMeMob.node.getComponent('cc.Toggle').isChecked = rememberPrefs;
            //     this.rememberMeMob.isChecked = rememberPrefs;
            //     // this.rememberMeCheckBox.checkMark.active = rememberPrefs;
            // } else {
            //     // if (this.loginDataFromInsta.userName != null && this.loginDataFromInsta.password != null) {
            //     //     // if we have logged in from Insta Play then don't clear it will be used in retry
            //     // } else {
            //     this.userName.string = "";
            //     this.password.string = "";
            //     // }
            // }
        }
    },

    /**
     * @description Determines the client being used fr login and checks server status
     * @method clientInit
     * @param {bool} autoLogin -default value false
     * @memberof Screens.Login.LoginScreen#
     */
    clientInit: function(autoLogin = false, noLoginSHow = false) {
        // console.log("client init")

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

        } else if (cc.sys.os === cc.sys.OS_ANDROID) {
            device = "androidApp";
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            device = "iosApp";
        } else if (cc.sys.os === cc.sys.OS_WINDOWS) {
            device = "windows";
        } else if (cc.sys.os === cc.sys.OS_OSX) {
            device = "mac";
        }
        // device = "windows";
        // device="androidApp"
        // console.log("device found is...", device);

        // this.loginNode.active = (!(window.opener && window.opener.loginData));
        this.loginNode.active = (!((window.loginDataFromInsta && window.loginDataFromInsta.userName != null && window.loginDataFromInsta.password != null) || (!!window.opener && !!window.opener.loginData)));
        this.loginHandler.init(device);
        if (K.GoToTable) {
            return;
        }

        // && !GameManager.isForceDisconnection
        // if (cc.sys.localStorage.getItem("auto_login_token") != null) {
        if (this.vpUserName.string != "" && this.vpPassword.string != "") {

            // let diff = Number(cc.sys.localStorage.getItem("auto_login_access_token_expire_at") - Date.now() / 1000);
            // // console.log("refreshTokenTimer", diff);
            // if (diff < 30) {
            //     cc.sys.localStorage.setItem("auto_login_token", null);
            //     cc.sys.localStorage.setItem("auto_login_refresh_token", null);
            //     cc.sys.localStorage.setItem("auto_login_access_token_expire_at", null);
            //     cc.sys.localStorage.setItem("auto_login_refresh_token_expire_at", null);
            //     cc.sys.localStorage.setItem("auto_login_username", null);

            //     this.launch.active = false;
            // }
            // else {
            // K.Token.access_token = cc.sys.localStorage.getItem("auto_login_token");
            // K.Token.refresh_token = cc.sys.localStorage.getItem("auto_login_refresh_token");
            // K.Token.access_token_expire_at = Number(cc.sys.localStorage.getItem("auto_login_access_token_expire_at"));
            // K.Token.refresh_token_expire_at = Number(cc.sys.localStorage.getItem("auto_login_refresh_token_expire_at"));

            this.preLogin.active = true;

            this.loginHandler.checkServerStatus(function(response) {
                console.log("RETRY SERVER STATUS ", response)
                // inst.preLogin.active = false;

                if (response.success) {

                    var result = response.result;
                    GameManager.serverStatus = result;
                    if (result.isUpdateRequired) {
                        // console.error("UPDATE REQUIRED POPUP",response);
                        inst.popupManager.show(PopUpType.NewVersionPopup, "Please update the game.", function() {});
                    } else if (result.isInMaintainance) {
                        // inst.popupManager.show(PopUpType.MaintenancePopup, "Server is under maintenance\n Please come back later.", function() {});
                        inst.popupManager.show(PopUpType.ServerMaintenancePopup, {
                            message: "Server is under maintenance\n Please come back later.",
                            action: "checkServerStatus"
                        });
                    } else {
                        inst.loginHandler.vpLogin(inst.vpUserName.string, inst.vpPassword.string, (data) => {
                            console.log("vpLogin", data);

                            inst.preLogin.active = false;
                            ServerCom.loading.active = false;

                            if (data.success == true || data.status == "success") {

                                cc.sys.localStorage.setItem('vpUserName', inst.vpUserName.string);
                                cc.sys.localStorage.setItem('vpPassword', inst.vpPassword.string);

                                K.Token.access_token = data.access_token;
                                K.Token.refresh_token = data.refresh_token;
                                K.Token.access_token_expire_at = data.access_token_expire_at;
                                K.Token.refresh_token_expire_at = data.refresh_token_expire_at;

                                ServerCom.socketIOConnect(K.ServerAddress.gameServer + ":" + K.ServerAddress.gamePort, () => {
                                    if (!ServerCom.socketConnected) {
                                        return;
                                    }
                                    GameManager.setUserData(data.user);
                                    if (data.notification) {
                                        GameManager.notification = data.notification;
                                    }
                                    inst.saveLoginData();
                                    setTimeout(function() {
                                        inst.onSuccessfullLogin(inst);
                                    }, 100);
                                });
                            } else {
                                inst.launch.active = false;
                                if (data.message) {
                                    inst.vpErrorMessage.string = data.message;
                                } else {
                                    inst.vpErrorMessage.string = data.error[0].message;
                                }
                            }
                        }, (error) => {
                            inst.popupManager.show(PopUpType.ServerMaintenancePopup, {
                                message: error.message,
                                action: "checkServerStatus"
                            });
                        });
                    }
                } else {
                    inst.popupManager.show(PopUpType.NewVersionPopup, "Please update the game.", function() {});
                }
            }, function(error) {
                inst.launch.active = false;
                inst.preLogin.active = false;
                inst.popupManager.show(PopUpType.NotificationPopup, "Please check your\nInternet Connection.", function() {});
                // if (!inst.popupManager.checkIfPopupActive()) {
                //     inst.popupManager.show(PopUpType.NotificationPopup, "Please check your\nInternet Connection.", function() {});
                // }
                // if (!GameManager.isConnected && ScreenManager.currentScreen != K.ScreenEnum.LoginScreen && ScreenManager.currentScreen != K.ScreenEnum.SignupScreen) {
                //     inst.popupManager.show(PopUpType.DisconnectDialog, function() {});
                // }
            });
            return;
            // }
        }


        GameManager.isForceDisconnection = false;
        setTimeout(() => {
            this.loginHandler.checkServerStatus(function(response) {
                console.log("RETRY SERVER STATUS ", response)
                inst.preLogin.active = false;

                if (response.success) {

                    var result = response.result;
                    GameManager.serverStatus = result;
                    //     console.log("result is ");
                    //       cosnole.log(result);
                    inst.loginHandler.setAddress(result.ipV4Address, result.ipV6Address);


                    if (result.isUpdateRequired) {
                        // console.error("UPDATE REQUIRED POPUP",response);
                        inst.popupManager.show(PopUpType.NewVersionPopup, "Please update the game.", function() {});
                    } else if (result.isInMaintainance) {
                        inst.popupManager.show(PopUpType.MaintenancePopup, "Server is under maintenance\n Please come back later.", function() {});
                    } else {
                        if (noLoginSHow) return;
                        if (autoLogin) {
                            // inst.onLogin();
                            inst.onSuccessfullLogin(inst);
                            return;
                        }
                        if (!(!!window.opener && !!window.opener.loginData)) {
                            inst.launch.active = false;
                            ScreenManager.showScreen(K.ScreenEnum.LoginScreen, 10, function() {}, false);
                        }
                    }
                } else {
                    inst.popupManager.show(PopUpType.NewVersionPopup, "Please update the game.", function() {});
                }
            }, function(error) {
                inst.launch.active = false;
                inst.preLogin.active = false;
                inst.popupManager.show(PopUpType.NotificationPopup, "Please check your\nInternet Connection.", function() {});
                // if (!inst.popupManager.checkIfPopupActive()) {

                // }
                // if (!GameManager.isConnected && ScreenManager.currentScreen != K.ScreenEnum.LoginScreen && ScreenManager.currentScreen != K.ScreenEnum.SignupScreen) {
                //     inst.popupManager.show(PopUpType.DisconnectDialog, function() {});
                // }
            });
        }, 1);
    },

    /**
     * @description Updates remember me Checkbox
     * @method setRememberMe
     * @memberof Screens.Login.LoginScreen#
     */
    setRememberMe: function() {
        this.rememberMe = this.rememberMeCheckBox.getSelection();
    },

    /**
     * @description Connects to gameServer (Pomelo init)
     * @method ConnectToGameSever
     * @param {Number} host -host address 
     * @param {Number} port -port number
     * @param {} inst - 
     * @memberof Screens.Login.LoginScreen#
     */
    ConnectToGameSever: function(host, port, inst) {
        this.preLogin.active = true;
        ServerCom.loading.active = false;
        // inst.loginHandler.startPomelo(host, port, function () {
        //     inst.preLogin.active = true;
        //     ServerCom.loading.active = false;
        //     inst.onSuccessfullLogin(inst);
        // });

        inst.preLogin.active = true;
        ServerCom.loading.active = false;
        inst.onSuccessfullLogin(inst);
    },

    onCloseOtp: function() {
        this.unschedule(this.updateResend);
        this.resendNode.active = false;
        this.otpNode.active = false;
        this.otp.string = '';
        cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", this.otpNode).active = false;
    },

    onVerfyOtp: function() {
        if (!this.verfyOtpClickable) {
            return;
        }
        this.verfyOtpClickable = false;

        setTimeout(() => {
            this.verfyOtpClickable = true;
        }, 2000);

        let inst = this;
        cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", inst.otpNode).active = false;
        this.loginHandler.verifyOtp(this.otp.string, function(response) {
            console.log("otp", response);

            inst.otp.string = "";

            if (response.status == "success") {

                setTimeout(() => {
                    inst.verfyOtpClickable = true;
                }, 1000);

                inst.otpNode.active = false;
                K.Token.access_token = response.access_token;
                K.Token.refresh_token = response.refresh_token;
                K.Token.access_token_expire_at = response.access_token_expire_at;
                K.Token.refresh_token_expire_at = response.refresh_token_expire_at;

                ServerCom.socketIOConnect(K.ServerAddress.gameServer + ":" + K.ServerAddress.gamePort, () => {
                    if (!ServerCom.socketConnected) {
                        return;
                    }
                    inst.otp.string = '';
                    inst.unschedule(inst.updateResend);
                    inst.timerNode.getChildByName("timer2").getComponent(cc.Label).string = '';
                    GameManager.setUserData(response.user);
                    inst.saveLoginData();
                    setTimeout(function() {
                        inst.onSuccessfullLogin(inst);
                    }, 100);
                });
            } else {
                inst.verfyOtpClickable = true;
                cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", inst.otpNode).active = true;
                cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", inst.otpNode).getComponent(cc.Label).string = response.messgae;
            }
        });
    },

    /**
     * @description Successfull login callback - multi-client check API
     * @method onSuccessfullLogin
     * @param {} inst
     * @memberof Screens.Login.LoginScreen#
     */
    onSuccessfullLogin: function(inst) {
        GameManager.isConnected = false;
        this.preLogin.active = true;
        console.log("onSuccessfullLogin", ServerCom.inGame);

        cc.sys.localStorage.setItem("auto_login_token", K.Token.access_token);
        cc.sys.localStorage.setItem("auto_login_refresh_token", K.Token.refresh_token);
        cc.sys.localStorage.setItem("auto_login_access_token_expire_at", K.Token.access_token_expire_at);
        cc.sys.localStorage.setItem("auto_login_refresh_token_expire_at", K.Token.refresh_token_expire_at);
        cc.sys.localStorage.setItem("auto_login_username", GameManager.user.userName);

        if (ServerCom.inGame || true) {
            if (this.lobbySelectorNode) {
                this.lobbySelectorNode.active = false;
            }
            console.log("onSuccessfullLogin3");
            inst.loginHandler.checkForMultiClient(function(response) {
                // ServerCom.loadingLogin.active = false;
                console.log("MULTI CLIENT RESPONSE ", response);
                if (response.success) {
                    GameManager.isConnected = true;

                    if (response.chips && GameManager.user) {
                        console.log("!!!!!!!!!!!!!!refreshPlayerChips");
                        GameManager.user.freeChips = response.chips.freeChips;
                        GameManager.user.realChips = response.chips.realChips;
                        GameManager.emit("refreshPlayerChips");
                    }


                    console.log("Active tables:", GameManager.activeTableCount);
                    // this.preLogin.active = false;
                    let currentActiveIds = [];
                    let currentActiveTableIds = [];
                    let prevSelection = GameScreen ? GameScreen.prevSelection : 0;
                    let hit = false;
                    GameManager.gameModel.activePokerModels.forEach(function(element, index) {
                        // console.log(element.gameData.channelId);
                        // console.log(element.gameData.raw.tournamentId);
                        if (element.gameData.raw.tournamentId) {
                            currentActiveIds.push(element.gameData.raw.tournamentId);
                            currentActiveTableIds.push(element.gameData.channelId);
                        }

                        if (currentActiveTableIds.length == 1) {
                            this.tourData = element.gameData.raw.tourData;
                        }
                    }, this);

                    console.log("currentActiveIds", currentActiveIds);

                    // Clear previous session data before joining new tables
                    // GameManager.reset();

                    if (GameManager.activeTableCount > 0 && response.joinChannels.length == 0) {
                        GameManager.reset();
                    }

                    // AutoJoin last logged in tables
                    // cc.eventManager.removeListener(inst.enterListener);
                    if (!!response.joinChannels && response.joinChannels.length > 0) {
                        hit = true;
                        this.preLogin.active = true;
                        GameManager.scheduleOnce(function() {
                            var joinCount = response.joinChannels.length;
                            response.joinChannels.forEach(function(element, index) {
                                var newData = new JoinData(element);
                                if (!!newData.channelId) {
                                    TableHandler.joinTableList.push(newData.channelId);
                                    newData.tableId = "";
                                    GameManager.join(newData.channelId, K.PomeloAPI.joinChannel, newData, null, null, index + 1, joinCount, true);
                                } else {
                                    GameManager.join(newData.tableId, K.PomeloAPI.joinChannel, newData, null, null, index + 1, joinCount, true);
                                }
                                // GameManager.join(data.channelId, K.PomeloAPI.joinChannel, data);
                            }, this);
                        }, 0.1);
                    }
                    if (currentActiveIds.length > 0) {
                        hit = true;
                        this.preLogin.active = true;
                        GameManager.scheduleOnce(function() {

                            if (!GameManager.isSocketIOConnected) {
                                this.preLogin.active = false;
                                return;
                            }

                            console.log("GameScreen.prevSelection", prevSelection);

                            ServerCom.socketIOBroadcast(currentActiveTableIds[0] + ":" + GameManager.user.playerId, this.onTournamentTableUserBroadcast.bind(this));
                            window.TournamentLobbyHandler.requestTournamentEnterTable({
                                    tournamentId: currentActiveIds[0]
                                },
                                (data) => {},
                                (error) => {},
                                "Enter table, please wait ......"
                            );
                        }.bind(this), 1);
                    } else {
                        if (this.preLogin.active) {
                            // if (!GameManager.isMobile) {
                            // this.preLogin.active = false;
                            if (!hit) {
                                this.preLogin.active = false;
                            }

                            if (!hit) {
                                this.launch.active = false;
                                if (ScreenManager.currentScreen == K.ScreenEnum.LobbyScreen) {
                                    GameManager.emit("forceReloadTable");
                                } else if (ScreenManager.currentScreen == K.ScreenEnum.LoginScreen ||
                                    ScreenManager.currentScreen == K.ScreenEnum.SignupScreen) {
                                    ScreenManager.showScreen(K.ScreenEnum.LobbyScreen, 10, function() {}, false);
                                } else {

                                }
                            }
                            // }
                        } else {
                            if (!hit) {
                                this.preLogin.active = false;
                            }
                            if (!hit) {
                                this.launch.active = false;
                                ScreenManager.showScreen(K.ScreenEnum.LobbyScreen, 10, function() {}, false);
                            }
                        }
                    }
                } else {
                    this.verfyOtpClickable = true;
                    K.disconnectRequestedByPlayer = true;
                    this.preLogin.active = false;
                    this.launch.active = false;
                    // pomelo.disconnect();
                    ScreenManager.showScreen(K.ScreenEnum.LoginScreen, 10, function() {}, false);
                }
            }.bind(this));
        }
    },

    /**
     * @description SignUp button callback
     * @method onSignUpFromLogin
     * @memberof Screens.Login.LoginScreen#
     */
    onSignUpFromLogin: function() {
        // window.loginData = {
        //     userName: "QQ",
        //     password: "Q1"
        // }
        // window.open("http://localhost:7456", "Poker", "fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=no,resizable=0");

        // this.loginUsingPasswordUsername.string = "";
        // this.loginUsingPasswordPassword.string = "";
        this.loginUsingPasswordNode.active = false;
        ScreenManager.showScreen(K.ScreenEnum.SignupScreen, 10, function() {}, false);

    },

    /**
     * @description Cancel button callback
     * @method onCancelLogin
     * @memberof Screens.Login.LoginScreen#
     */
    onCancelLogin: function() {},

    /**
     * @description Checks whether the entered email is valid
     * @method validateEmail
     * @param {String} email
     * @memberof Screens.Login.LoginScreen#
     */
    validateEmail: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    /**
     * @description Requests server to login
     * @method onLogin
     * @memberof Screens.Login.LoginScreen#
     */
    onLogin: function( /*data, custom, loginCredentials*/ ) {


        var timeout;
        if (K.internetAvailable) {
            K.disconnectRequestedByPlayer = true;
        } else {
            K.disconnectRequestedByPlayer = false;
        }

        this.vpErrorMessage.string = "";

        this.vpUserName.node.getChildByName("red").active = false;
        this.vpPassword.node.getChildByName("red").active = false;

        this.preLogin.active = true;
        ServerCom.loading.active = false;
        // inst.loginHandler.startPomelo(K.ServerAddress.gameServer, K.ServerAddress.gamePort, function () {
        this.preLogin.active = true;
        ServerCom.loading.active = false;

        // cc.sys.localStorage.setItem('countryCode', this.countryCode.string);
        // cc.sys.localStorage.setItem('phone', this.phone.string);

        ServerCom.loadingLogin.active = true;

        cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", this.otpNode).active = false;

        this.loginHandler.vpLogin(this.vpUserName.string, this.vpPassword.string, (data) => {
            console.log("vpLogin", JSON.stringify(data));

            if (!data) {
                return;
            }

            inst.preLogin.active = false;
            ServerCom.loading.active = false;

            if (data.success == true || data.status == "success") {

                cc.sys.localStorage.setItem('vpUserName', inst.vpUserName.string);
                cc.sys.localStorage.setItem('vpPassword', inst.vpPassword.string);

                K.Token.access_token = data.access_token;
                K.Token.refresh_token = data.refresh_token;
                K.Token.access_token_expire_at = data.access_token_expire_at;
                K.Token.refresh_token_expire_at = data.refresh_token_expire_at;

                ServerCom.socketIOConnect(K.ServerAddress.gameServer + ":" + K.ServerAddress.gamePort, () => {
                    if (!ServerCom.socketConnected) {
                        return;
                    }
                    GameManager.setUserData(data.user);
                    inst.saveLoginData();
                    setTimeout(function() {
                        inst.onSuccessfullLogin(inst);
                    }, 100);
                });
            } else {
                inst.launch.active = false;
                ServerCom.loadingLogin.active = false;
                inst.vpErrorMessage.node.active = true;
                if (data.message) {
                    inst.vpErrorMessage.string = data.message;
                } else {
                    inst.vpErrorMessage.string = data.error[0].message;
                }
            }
        }, (error) => {
            inst.preLogin.active = false;
            ServerCom.loading.active = false;
            ServerCom.loadingLogin.active = false;

            if (error.code == 444) {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, "Please check your\n Internet Connection.", function () {});
            }
            else {
                inst.popupManager.show(PopUpType.ServerMaintenancePopup, {
                    message: error.message,
                    action: "checkServerStatus"
                });
            }
        });
        // });

        this.preLogin.active = true;
        ServerCom.loading.active = false;
        this.preLogin.active = true;
        ServerCom.loading.active = false;
    },

    updateResend(dt) {
        this.resendTimer -= 1;
        if (this.resendTimer == 0) {
            this.unschedule(this.updateResend);
            this.timerNode.active = false;
            this.resendNode.active = true;
        } else {
            this.timerNode.active = true;
            this.timerNode.getChildByName("timer2").getComponent(cc.Label).string = this.resendTimer + "s";
        }
    },

    onResend() {
        let inst = this;
        this.loginHandler.loginSTD(this.phone.string, (data) => {
            console.log("loginSTD", data);

            if (!data) {
                return;
            }

            inst.preLogin.active = false;
            ServerCom.loading.active = false;

            if (data.success) {
                cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", inst.otpNode).active = true;
                cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", inst.otpNode).getComponent(cc.Label).string = "OTP sent successfully:" + " " + data.data;

                inst.otpNode.active = true;
                inst.resendNode.active = false;
                inst.resendTimer = 61;
                inst.schedule(inst.updateResend, 1);
            } else {
                inst.loginDebug[2].getComponent(cc.Label).string = data.message;
                inst.loginDebug[2].active = true;
            }
        });
    },

    /**
     * @description Login button callback
     * @method onLoginCallBack
     * @param {Object} data - holds client information
     * @memberof Screens.Login.LoginScreen#
     */
    onLoginCallBack: function(data) {
        console.log("Login Sucess with Dtaa", data);
        K.ServerAddress.pokerVer = data.serverVersion;
        // console.log("Login Sucess with Dtaa VERSION", K.ServerAddress.pokerVer);
        K.disconnectRequestedByPlayer = true;
        // pomelo.disconnect();
        if (data.success === true || data.status == "success") {
            // inst.response = data;
            // console.log("1")
            inst.saveLoginData(data);
            // console.log("2",JSON.parse(JSON.stringify(data.user)));
            GameManager.setUserData(data.user);
            if (data.notification) {
                GameManager.notification = data.notification;
            }

            // ServerCom.pomeloRequest("connector.entryHandler.getListPlayerTableTheme", {
            //     "playerId": GameManager.user.playerId
            // }, function (response) {
            //     console.log("getListPlayerTableTheme", response);

            //     GameManager.user.defaultTheme = response.defaultTheme;
            // });

            // ServerCom.pomeloRequest("connector.entryHandler.getListPlayerCard", {
            //     "playerId": GameManager.user.playerId
            // }, function (response) {
            //     console.log("getListPlayerCard", response);
            //     GameManager.user.defaultCard = response.defaultCard;
            // });

            // console.log("3")
            setTimeout(function() {
                // console.log("Connecting to GAte server @ ", data.user.host, " Port ", data.user.port)
                inst.ConnectToGameSever(data.user.host, data.user.port, inst);
            }, 100);
        } else {
            //TODO: handle error    ConnectToGameSever
            // if (data.info === "Invalid password") {
            // turn on debug info label
            // inst.loginDebug[2].getComponent(cc.Label).string = data.info;
            // inst.loginDebug[2].active = true;

            // } else {
            // turn on debug info label
            // console.log("ERROR",inst.loginDebug[0].getComponent(cc.Label).string)
            inst.loginDebug[2].getComponent(cc.Label).string = (!!data.info) ? data.info : "";
            inst.loginDebug[2].active = true;
            // }
        }

    },

    /**
     * @description saves login credentials
     * @method saveLoginData
     * @param {Object} data
     * @memberof Screens.Login.LoginScreen#
     */
    saveLoginData: function(data) {
        // if ((GameManager.isMobile)) {
        //     cc.sys.localStorage.setItem(K.SystemStorageKeys.rememberMePreference, this.rememberMeMob.isChecked);
        //     // console.log("LOGIN SAVE PREF STATE ", this.rememberMeMob.isChecked);

        //     // if (this.userName.string == "") {
        //     //     this.showUserLoginDetails(data.user.userName, data.user.password);
        //     // }
        //     if (this.rememberMeMob.isChecked) {
        //         cc.sys.localStorage.setItem(K.SystemStorageKeys.userId, this.userName.string);
        //         cc.sys.localStorage.setItem(K.SystemStorageKeys.password, this.password.string);
        //     }

        //     // this.userName.string = "";
        //     // this.password.string = "";
        // } else {
        //     if (cc.sys.os === cc.sys.OS_WINDOWS  && cc.sys.os == cc.sys.MACOS && !cc.sys.isBrowser) {
        //         cc.sys.localStorage.setItem(K.SystemStorageKeys.rememberMePreference, this.rememberMeMob.isChecked);
        //         // console.log("LOGIN SAVE PREF STATE ", this.rememberMeMob.isChecked);

        //         // if (this.userName.string == "") {
        //         //     this.showUserLoginDetails(data.user.userName, data.user.password);
        //         // }
        //         if (this.rememberMeMob.isChecked) {
        //             cc.sys.localStorage.setItem(K.SystemStorageKeys.userId, this.userName.string);
        //             cc.sys.localStorage.setItem(K.SystemStorageKeys.password, this.password.string);
        //         }
        //     }
        //     // cc.sys.localStorage.setItem(K.SystemStorageKeys.userId, "");
        //     // cc.sys.localStorage.setItem(K.SystemStorageKeys.password, "");
        // }

        // cc.sys.localStorage.setItem('countryCode', this.countryCode.string);
        // cc.sys.localStorage.setItem('phone', this.phone.string);
        // cc.sys.localStorage.setItem(K.SystemStorageKeys.userId, this.userName.string);
        // cc.sys.localStorage.setItem(K.SystemStorageKeys.password, this.password.string);
    },


    /**
     * @description Reset password button callback
     * @method onResetPassword
     * @memberof Screens.Login.LoginScreen#
     */
    onResetPassword: function() {
        // TODO: get reset token from mail / ask user to enter
        // TODO: get new password from user
        var token = this.userName.string;
        var newPass = this.password.string;
        this.loginHandler.resetPassword(token, newPass, function(data) {
            if (data.success) {
                // inst.response = data;
            } else {
                // TODO: handle error    
            }
        });
    },

    /**
     * @description Show forgot password screen
     * @method forgotPassword
     * @memberof Screens.Login.LoginScreen#
     */
    onForgotPassword: function() {
        // console.log("on  forgot pwd", PopUpType)
        // ScreenManager.showScreen(K.ScreenEnum.ForgotPasswordScreen, 10, function () { }, false);
        this.popupManager.show(PopUpType.ForgotPasswordPopUp, {}, function() {});
    },

    onTournamentTableUserBroadcast(data) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>onTournamentTableUserBroadcast", data);
        if (data.eventName == "enterChannelResponse") {

            if (data.data.success) {
                GameManager.popUpManager.hideAllPopUps();

                socketIO.socket.off(data.eventTo);
                socketIO.socket.off(data.channelId + ":" + data.playerId);

                if (!GameManager.isActive) {
                    ServerCom.forceKeepLoading = false;
                    ServerCom.loading.active = false;
                    if (this.gotoTable) {
                        this.gotoTable.active = false;
                    }
                    return;
                }
                data.data.gameData = new GameData(data.data);
                data.data.tourData = this.tourData;

                console.log('window.TournamentLobbyListPresenter');
                console.log(window.TournamentLobbyListPresenter);

                if (!K.GoToTable) {
                    for (var i = 0; i < window.TournamentLobbyListPresenter.contentHolderAll.children.length; i++) {
                        let instance = window.TournamentLobbyListPresenter.contentHolderAll.children[i];
                        let tourItemInfo = instance.getComponent("TournamentLobbyListItem").tourItemInfo;
                        if (this.tourData.id == tourItemInfo.id) {
                            data.data.tourData = tourItemInfo;
                            break;
                        }
                    }
                }

                let isTournamentExisting = false;
                let tournamentIndexFound = -1;
                for (var index = 0; index < GameManager.gameModel.activePokerModels.length; index++) {
                    if (!GameManager.gameModel.activePokerModels[index].tourData) {
                        continue;
                    }
                    var id = GameManager.gameModel.activePokerModels[index].tourData.id;
                    if (this.tourData.id === id) {
                        isTournamentExisting = true;
                        tournamentIndexFound = index;
                        break;
                    }
                }

                this.launch.active = false;
                data.data.isRejoin = isTournamentExisting;
                data.data.indexFound = tournamentIndexFound;
                ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, data.data, function() {});
                // 
                this.scheduleOnce(function() {
                    ServerCom.forceKeepLoading = false;
                    ServerCom.loading.active = false;
                    if (this.gotoTable) {
                        this.gotoTable.active = false;
                    }
                }, 1.2);

            } else {
                ServerCom.forceKeepLoading = false;
                ServerCom.loading.active = false;
                // 
                GameManager.popUpManager.show(
                    PopUpType.CommonDialog, {
                        "title": "Error!",
                        "content": (data.data.info ? data.data.info : data.data.response)
                    },
                    function() {}
                );
            }
        }
    },

    onScreenShot: function() {
        if (cc.sys.isNative) {
            this.capture.getComponent("capture_to_native").init();
            // this.capture.getComponent("capture_to_native").camera.enabled = true;
            this.scheduleOnce(() => {
                let picData = this.capture.getComponent("capture_to_native").initImage();
                this.capture.getComponent("capture_to_native").createCanvas(picData);
                this.capture.getComponent("capture_to_native").saveFile(picData);
                // this.capture.getComponent("capture_to_native").camera.enabled = false;
            }, 1);
        } else {
            this.capture.getComponent("capture_to_web").init();
            this.capture.getComponent("capture_to_web").createCanvas();
            var img = this.capture.getComponent("capture_to_web").createImg();
            this.scheduleOnce(() => {
                this.capture.getComponent("capture_to_web").showImage(img);
            }, 1);
        }
    },

    onLoginUsingPassword: function() {
        this.loginUsingPasswordNode.active = true;
    },

    onBackLoginUsingPassword: function() {
        this.loginUsingPasswordUsername.string = "";
        this.loginUsingPasswordPassword.string = "";
        this.loginUsingPasswordPassword.inputFlag = cc.EditBox.InputFlag.PASSWORD;
        this.loginUsingPasswordNode.active = false;
    },

    onLoginWithPasword: function() {
        if (this.loginUsingPasswordUsername.string.trim() == '') {
            return;
        }
        if (this.loginUsingPasswordPassword.string.trim() == '') {
            return;
        }

        GameManager.getToken(
            this.loginUsingPasswordUsername.string,
            this.loginUsingPasswordPassword.string,
            function(response) {
                this.loginUsingPasswordUsername.string = "";
                this.loginUsingPasswordPassword.string = "";
                if (response.status == "success") {
                    this.preLogin.active = true;
                    ServerCom.loading.active = false;

                    ServerCom.socketIOConnect(K.ServerAddress.gameServer + ":" + K.ServerAddress.gamePort, () => {
                        if (!ServerCom.socketConnected) {
                            return;
                        }

                        // inst.loginHandler.checkForMultiClient(function (response) {
                        // }.bind(this));

                        this.loginHandler.loginGame(this.loginUsingPasswordUsername.string, "", this.loginUsingPasswordPassword.string, "login", "normal", this.onLoginCallBack.bind(this));
                    });
                    // this.loginHandler.loginGame(this.userName.string, "", this.password.string, "login", "normal", this.onLoginCallBack);
                    // this.preLogin.active = true;
                    // ServerCom.loading.active = false;
                } else {
                    this.preLogin.active = false;
                    ServerCom.loading.active = false;
                    inst.loginDebug[2].getComponent(cc.Label).string = "Invalid username or password please try again";
                    inst.loginDebug[2].active = true;
                }
            }.bind(this)
        );
    },

    onTogglePassword: function(target) {
        if (target.isChecked) {
            this.loginUsingPasswordPassword.inputFlag = cc.EditBox.InputFlag.DEFAULT;
        } else {
            this.loginUsingPasswordPassword.inputFlag = cc.EditBox.InputFlag.PASSWORD;
        }
    },

    onToggleForgetPassword1: function(target) {
        if (target.isChecked) {
            this.forgetPasswordNewPassword1.inputFlag = cc.EditBox.InputFlag.DEFAULT;
        } else {
            this.forgetPasswordNewPassword1.inputFlag = cc.EditBox.InputFlag.PASSWORD;
        }
    },

    onToggleForgetPassword2: function(target) {
        if (target.isChecked) {
            this.forgetPasswordNewPassword2.inputFlag = cc.EditBox.InputFlag.DEFAULT;
        } else {
            this.forgetPasswordNewPassword2.inputFlag = cc.EditBox.InputFlag.PASSWORD;
        }
    },

    onUpdateNewPassword: function() {},

    onPasswordVerifyOtp: function() {},

    onShowTC: function(event, url) {
        this.tc.active = true;
        this.tc.getChildByName("Cover").getChildByName("WebView").getComponent(cc.WebView).url = "https://bbpoker.pro/terms-conditions/";
        this.tc.getChildByName("Cover").getChildByName("HeadingText").getComponent(cc.Label).string = "Terms-Conditions";
    },

    onShowPP: function(event, url) {
        this.tc.active = true;
        this.tc.getChildByName("Cover").getChildByName("WebView").getComponent(cc.WebView).url = "https://bbpoker.pro/privacy-policy/";
        this.tc.getChildByName("Cover").getChildByName("HeadingText").getComponent(cc.Label).string = "Privacy Policy";
    },

    onHideTC: function() {
        this.tc.getChildByName("Cover").getChildByName("WebView").getComponent(cc.WebView).url = "";
        this.tc.active = false;
    },

    onConfirmCustom: function() {
        if (this.node.getChildByName("Editable")) {
            this.node.getChildByName("Editable").active = false;

            K.ServerAddress.gameServer = this.node.getChildByName("Editable").getChildByName("gameServer").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.ServerAddress.gamePort = this.node.getChildByName("Editable").getChildByName("gamePort").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.ServerAddress.ipAddress = this.node.getChildByName("Editable").getChildByName("ipAddress").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.ServerAddress.port = this.node.getChildByName("Editable").getChildByName("port").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.ServerAddress.assets_server = this.node.getChildByName("Editable").getChildByName("assets_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.ServerAddress.otp_server = this.node.getChildByName("Editable").getChildByName("otp_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.ServerAddress.ads_server = this.node.getChildByName("Editable").getChildByName("ads_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.Token.auth_server = this.node.getChildByName("Editable").getChildByName("auth_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.Token.auth_refresh_server = this.node.getChildByName("Editable").getChildByName("auth_refresh_server").getChildByName("EditBox").getComponent(cc.EditBox).string;

            cc.sys.localStorage.setItem("EditablegameServer", this.node.getChildByName("Editable").getChildByName("gameServer").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("EditablegamePort", this.node.getChildByName("Editable").getChildByName("gamePort").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("EditableipAddress", this.node.getChildByName("Editable").getChildByName("ipAddress").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("Editableport", this.node.getChildByName("Editable").getChildByName("port").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("Editableassets_server", this.node.getChildByName("Editable").getChildByName("assets_server").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("Editableotp_server", this.node.getChildByName("Editable").getChildByName("otp_server").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("Editableads_server", this.node.getChildByName("Editable").getChildByName("ads_server").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("Editableauth_server", this.node.getChildByName("Editable").getChildByName("auth_server").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("Editableauth_refresh_server", this.node.getChildByName("Editable").getChildByName("auth_refresh_server").getChildByName("EditBox").getComponent(cc.EditBox).string);
        }
    },

    resetAll: function() {
        this.vpLogin.interactable = false;
        this.vpUserName.string = ""
        this.vpPassword.string = "";
    },

    onCheck: function() {
        this.vpLogin.interactable = false;
        if (this.vpUserName.string === "") {
            return;
        }
        if (this.vpPassword.string === "") {
            return;
        }
        this.vpLogin.interactable = true;
    },

    // 
    onForgetPasswordStep1Check: function() {
        this.vpForgetPasswordSubmit.interactable = false;
        if (this.vpForgetPasswordUsername.string === "") {
            return;
        }
        this.vpForgetPasswordSubmit.interactable = true;
    },

    onForgetPasswordStep2Check: function() {
        this.vpForgetPasswordSubmitOTP.interactable = false;
        if (this.vpForgetPasswordOTP.string === "") {
            return;
        }
        this.vpForgetPasswordSubmitOTP.interactable = true;
    },

    onForgetPasswordStep3Check: function() {
        this.vpForgetPasswordSubmitUpdate.interactable = false;
        if (this.vpForgetPasswordNew.string === "" ||
            this.vpForgetPasswordNewConfirm.string === "") {
            return;
        }
        this.vpForgetPasswordSubmitUpdate.interactable = true;
    },

    onForgetPassword: function() {
        this.vpForgetPasswordEmail.string = "";
        this.vpForgetPasswordUsername.string = "";
        this.vpForgetPasswordOTP.string = "";
        this.vpForgetPasswordNew.string = "";
        this.vpForgetPasswordNewConfirm.string = "";
        this.vpForgetPasswordErrorMessage1.string = "";
        this.vpForgetPasswordErrorMessage2.string = "";
        this.vpForgetPasswordErrorMessage3.string = "";

        this.forgetPasswordNode.active = true;
        this.forgetPasswordNode.getChildByName("Step1").active = true;
        this.forgetPasswordNode.getChildByName("Step2").active = false;
        this.forgetPasswordNode.getChildByName("Step3").active = false;

        this.vpForgetPasswordSubmit.interactable = false;
        this.vpForgetPasswordSubmitOTP.interactable = false;
        this.vpForgetPasswordSubmitUpdate.interactable = false;
    },

    onForgetPasswordStep1Back: function() {
        this.vpForgetPasswordEmail.string = "";
        this.vpForgetPasswordUsername.string = "";
        this.vpForgetPasswordOTP.string = "";
        this.vpForgetPasswordNew.string = "";
        this.vpForgetPasswordNewConfirm.string = "";
        this.vpForgetPasswordErrorMessage1.string = "";
        this.vpForgetPasswordErrorMessage2.string = "";
        this.vpForgetPasswordErrorMessage3.string = "";

        this.forgetPasswordNode.active = false;
        this.forgetPasswordNode.getChildByName("Step1").active = false;
        this.forgetPasswordNode.getChildByName("Step2").active = false;
        this.forgetPasswordNode.getChildByName("Step3").active = false;

        this.vpForgetPasswordSubmit.interactable = false;
        this.vpForgetPasswordSubmitOTP.interactable = false;
        this.vpForgetPasswordSubmitUpdate.interactable = false;
    },

    onForgetPasswordStep2Back: function() {
        this.vpForgetPasswordEmail.string = "";
        this.vpForgetPasswordUsername.string = "";
        this.vpForgetPasswordOTP.string = "";
        this.vpForgetPasswordNew.string = "";
        this.vpForgetPasswordNewConfirm.string = "";
        this.vpForgetPasswordErrorMessage1.string = "";
        this.vpForgetPasswordErrorMessage2.string = "";
        this.vpForgetPasswordErrorMessage3.string = "";

        this.forgetPasswordNode.getChildByName("Step1").active = true;
        this.forgetPasswordNode.getChildByName("Step2").active = false;
        this.forgetPasswordNode.getChildByName("Step3").active = false;

        this.vpForgetPasswordSubmit.interactable = false;
        this.vpForgetPasswordSubmitOTP.interactable = false;
        this.vpForgetPasswordSubmitUpdate.interactable = false;
    },

    onForgetPasswordStep3Back: function() {
        this.vpForgetPasswordEmail.string = "";
        this.vpForgetPasswordUsername.string = "";
        this.vpForgetPasswordOTP.string = "";
        this.vpForgetPasswordNew.string = "";
        this.vpForgetPasswordNewConfirm.string = "";
        this.vpForgetPasswordErrorMessage1.string = "";
        this.vpForgetPasswordErrorMessage2.string = "";
        this.vpForgetPasswordErrorMessage3.string = "";

        this.forgetPasswordNode.getChildByName("Step1").active = false;
        this.forgetPasswordNode.getChildByName("Step2").active = true;
        this.forgetPasswordNode.getChildByName("Step3").active = false;

        this.vpForgetPasswordSubmit.interactable = false;
        this.vpForgetPasswordSubmitOTP.interactable = false;
        this.vpForgetPasswordSubmitUpdate.interactable = false;
    },

    onForgetPasswordToStep2: function() {

        this.loginHandler.vpSendOTP(this.vpForgetPasswordUsername.string, (data) => {
            console.log("vpSendOTP", JSON.stringify(data));

            // {"success":true,"message":"You will receive an OTP shortly on sxc111@gmail.com","associatedEmailId":"sxc111@gmail.com","otp":"463573"}

            if (data.success == true || data.status == "success") {
                this.vpForgetPasswordEmail.string = "";
                // this.vpForgetPasswordUsername.string = "";
                this.vpForgetPasswordOTP.string = "";
                this.vpForgetPasswordNew.string = "";
                this.vpForgetPasswordNewConfirm.string = "";
                this.vpForgetPasswordErrorMessage1.string = "";
                this.vpForgetPasswordErrorMessage2.string = "";
                this.vpForgetPasswordErrorMessage3.string = "";

                this.forgetPasswordNode.getChildByName("Step1").active = false;
                this.forgetPasswordNode.getChildByName("Step2").active = true;
                this.forgetPasswordNode.getChildByName("Step3").active = false;

                this.forgetPasswordNode.getChildByName("Step2").getChildByName("Heading3").getComponent(cc.Label).string = data.associatedEmailId;
                this.forgetPasswordNode.getChildByName("Step2").getChildByName("debug").getComponent(cc.Label).string = data.otp || "";

                this.vpForgetPasswordSubmit.interactable = false;
                this.vpForgetPasswordSubmitOTP.interactable = false;
                this.vpForgetPasswordSubmitUpdate.interactable = false;
            } else {
                this.vpForgetPasswordErrorMessage1.node.active = true;
                this.vpForgetPasswordErrorMessage2.node.active = true;

                if (data.message) {
                    this.vpForgetPasswordErrorMessage1.string = data.message;
                    this.vpForgetPasswordErrorMessage2.string = data.message;
                } else {
                    this.vpForgetPasswordErrorMessage1.string = data.error[0].message;
                    this.vpForgetPasswordErrorMessage2.string = data.error[0].message;
                }
            }
        });
    },

    onForgetPasswordToStep3: function() {

        this.loginHandler.vpVerifyOTP(this.forgetPasswordNode.getChildByName("Step2").getChildByName("Heading3").getComponent(cc.Label).string, this.vpForgetPasswordOTP.string, (data) => {
            console.log("vpVerifyOTP", JSON.stringify(data));

            if (data.success == true || data.status == "success") {
                this.vpForgetPasswordEmail.string = "";
                this.vpForgetPasswordUsername.string = "";
                this.vpForgetPasswordOTP.string = "";
                this.vpForgetPasswordNew.string = "";
                this.vpForgetPasswordNewConfirm.string = "";
                this.vpForgetPasswordErrorMessage1.string = "";
                this.vpForgetPasswordErrorMessage2.string = "";
                this.vpForgetPasswordErrorMessage3.string = "";

                this.forgetPasswordNode.getChildByName("Step1").active = false;
                this.forgetPasswordNode.getChildByName("Step2").active = false;
                this.forgetPasswordNode.getChildByName("Step3").active = true;

                // {"success":true,"message":"OTP verified successfully","resetToken":"dda0018dc39d5e37d07f3b7eaabaededc0f4506fc8e9d777a04922234c84d1c7"}
                this.resetToken = data.resetToken;


                this.vpForgetPasswordSubmit.interactable = false;
                this.vpForgetPasswordSubmitOTP.interactable = false;
                this.vpForgetPasswordSubmitUpdate.interactable = false;
            } else {
                this.vpForgetPasswordErrorMessage2.node.active = true;
                if (data.message) {
                    this.vpForgetPasswordErrorMessage2.string = data.message;
                } else {
                    this.vpForgetPasswordErrorMessage2.string = data.error[0].message;
                }
            }
        });
    },

    onForgetPasswordToFinish: function() {

        this.loginHandler.vpResetPassword(this.forgetPasswordNode.getChildByName("Step2").getChildByName("Heading3").getComponent(cc.Label).string, this.vpForgetPasswordNew.string, this.vpForgetPasswordNewConfirm.string, this.resetToken, (data) => {
            console.log("vpResetPassword", JSON.stringify(data));

            if (data.success == true || data.status == "success") {
                this.vpForgetPasswordEmail.string = "";
                this.vpForgetPasswordUsername.string = "";
                this.vpForgetPasswordOTP.string = "";
                this.vpForgetPasswordNew.string = "";
                this.vpForgetPasswordNewConfirm.string = "";
                this.vpForgetPasswordErrorMessage1.string = "";
                this.vpForgetPasswordErrorMessage2.string = "";
                this.vpForgetPasswordErrorMessage3.string = "";

                // this.forgetPasswordNode.getChildByName("Step1").active = false;
                // this.forgetPasswordNode.getChildByName("Step2").active = false;
                // this.forgetPasswordNode.getChildByName("Step3").active = false;

                this.vpForgetPasswordSubmit.interactable = false;
                this.vpForgetPasswordSubmitOTP.interactable = false;
                this.vpForgetPasswordSubmitUpdate.interactable = false;

                this.vpForgetPasswordSuccessPopup.active = true;

            } else {
                this.vpForgetPasswordErrorMessage3.node.active = true;

                if (data.message) {
                    this.vpForgetPasswordErrorMessage3.string = data.message;
                } else {
                    this.vpForgetPasswordErrorMessage3.string = data.error[0].message;
                }
            }
        });
    },

    onForgetPasswordContinue: function() {
        this.forgetPasswordNode.active = false;
        this.forgetPasswordNode.getChildByName("Step1").active = false;
        this.forgetPasswordNode.getChildByName("Step2").active = false;
        this.forgetPasswordNode.getChildByName("Step3").active = false;
        this.vpForgetPasswordSuccessPopup.active = false;
    },

    checkForMultiClient: function() {
        inst.loginHandler.checkForMultiClient(function(response) {
            ServerCom.loadingLogin.active = false;
            console.log("MULTI CLIENT RESPONSE ", response);
            if (response.success) {
                GameManager.isConnected = true;

                console.log("Active tables:", GameManager.activeTableCount);
                // this.preLogin.active = false;
                let currentActiveIds = [];
                let currentActiveTableIds = [];
                let prevSelection = GameScreen ? GameScreen.prevSelection : 0;
                let hit = false;
                GameManager.gameModel.activePokerModels.forEach(function(element, index) {
                    // console.log(element.gameData.channelId);
                    // console.log(element.gameData.raw.tournamentId);
                    if (element.gameData.raw.tournamentId) {
                        currentActiveIds.push(element.gameData.raw.tournamentId);
                        currentActiveTableIds.push(element.gameData.channelId);
                    }

                    if (currentActiveTableIds.length == 1) {
                        this.tourData = element.gameData.raw.tourData;
                    }
                }, this);

                console.log("currentActiveIds", currentActiveIds);

                // Clear previous session data before joining new tables
                // GameManager.reset();

                if (response.chips && GameManager.user) {
                    console.log("!!!!!!!!!!!!!!refreshPlayerChips");
                    GameManager.user.freeChips = response.chips.freeChips;
                    GameManager.user.realChips = response.chips.realChips;
                    GameManager.emit("refreshPlayerChips");
                }

                if (GameManager.activeTableCount > 0 && response.joinChannels.length == 0) {
                    GameManager.reset();
                }

                // AutoJoin last logged in tables
                // cc.eventManager.removeListener(inst.enterListener);
                if (!!response.joinChannels && response.joinChannels.length > 0) {
                    hit = true;
                    this.preLogin.active = true;
                    GameManager.scheduleOnce(function() {
                        var joinCount = response.joinChannels.length;
                        response.joinChannels.forEach(function(element, index) {
                            var newData = new JoinData(element);
                            if (!!newData.channelId) {
                                TableHandler.joinTableList.push(newData.channelId);
                                newData.tableId = "";
                                GameManager.join(newData.channelId, K.PomeloAPI.joinChannel, newData, null, null, index + 1, joinCount, true);
                            } else {
                                GameManager.join(newData.tableId, K.PomeloAPI.joinChannel, newData, null, null, index + 1, joinCount, true);
                            }
                            // GameManager.join(data.channelId, K.PomeloAPI.joinChannel, data);
                        }, this);
                    }, 0.1);
                }
                if (currentActiveIds.length > 0) {
                    hit = true;
                    this.preLogin.active = true;
                    GameManager.scheduleOnce(function() {

                        if (!GameManager.isSocketIOConnected) {
                            this.preLogin.active = false;
                            return;
                        }

                        console.log("GameScreen.prevSelection", prevSelection);

                        ServerCom.socketIOBroadcast(currentActiveTableIds[0] + ":" + GameManager.user.playerId, this.onTournamentTableUserBroadcast.bind(this));
                        window.TournamentLobbyHandler.requestTournamentEnterTable({
                                tournamentId: currentActiveIds[0]
                            },
                            (data) => {},
                            (error) => {},
                            "Enter table, please wait ......"
                        );
                    }.bind(this), 1);
                } else {
                    if (this.preLogin.active) {
                        // if (!GameManager.isMobile) {
                        // this.preLogin.active = false;
                        if (!hit) {
                            this.preLogin.active = false;
                        }

                        if (!hit) {
                            this.launch.active = false;
                            if (ScreenManager.currentScreen == K.ScreenEnum.LobbyScreen) {
                                GameManager.emit("forceReloadTable");
                            } else if (ScreenManager.currentScreen == K.ScreenEnum.LoginScreen ||
                                ScreenManager.currentScreen == K.ScreenEnum.SignupScreen) {
                                ScreenManager.showScreen(K.ScreenEnum.LobbyScreen, 10, function() {}, false);
                            } else {

                            }
                        }
                        // }
                    } else {
                        if (!hit) {
                            this.preLogin.active = false;
                        }
                        if (!hit) {
                            this.launch.active = false;
                            ScreenManager.showScreen(K.ScreenEnum.LobbyScreen, 10, function() {}, false);
                        }
                    }
                }
            } else {
                this.verfyOtpClickable = true;
                K.disconnectRequestedByPlayer = true;
                this.preLogin.active = false;
                this.launch.active = false;
                // pomelo.disconnect();
                ScreenManager.showScreen(K.ScreenEnum.LoginScreen, 10, function() {}, false);
            }
        }.bind(this));
    }
});

//home/codes/localrepo/website