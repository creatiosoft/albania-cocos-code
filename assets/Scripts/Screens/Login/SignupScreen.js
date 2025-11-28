/**
 * @namespace Screens.Login
 */
var AbstractScreen = require('AbstractScreen');
var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var LoginHandler = require('LoginHandler');
var CustomEditBox = require('CustomEditBox'); //for password purpose

const UP = -220;
const DOWN = -280;
/**
 * @classdesc Handles User SignUp Screen
 * @class Screens.Login.SignUpScreen
 * @extends Utilities.ScreensAndPopUps.Screens.AbstractScreen
 * @memberof Screens.Login
 */
var inst;
cc.Class({
    extends: AbstractScreen,

    properties: {
        // 
        vpRegister: {
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
        vpEmailId: {
            default: null,
            type: cc.EditBox,
        },
        vpPassword: {
            default: null,
            type: cc.EditBox,
        },
        vpConfirmPassword: {
            default: null,
            type: cc.EditBox,
        },
        vpMobileNumber: {
            default: null,
            type: cc.EditBox,
        },
        vpIsAbove18: {
            default: null,
            type: cc.Toggle,
        },
        // 
        countryCode: {
            default: null,
            type: cc.EditBox,
        },
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
        timerNode: {
            default: null,
            type: cc.Node,
        },
        resendNode: {
            default: null,
            type: cc.Node,
        },
        loginNode: {
            default: null,
            type: cc.Node,
        },
        otpNode: {
            default: null,
            type: cc.Node,
        },
        phone: {
            default: null,
            type: cc.EditBox,
        },
        showInviteCode: {
            default: null,
            type: cc.Node,
        },
        inviteCode: {
            default: null,
            type: cc.EditBox,
        },
        loginHandler: {
            default: null,
            type: LoginHandler,
        },
        userName: {
            default: null,
            type: cc.EditBox,
        },
        email: {
            default: null,
            type: cc.EditBox,
        },
        password: {
            default: null,
            type: cc.EditBox,
        },
        signupDebug: {
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
        userNameEdit: {
            default: null,
            type: cc.Label,
        },
        passwordEdit: {
            default: null,
            type: cc.Label,
        },
        affiliateId: {
            default: null,
            type: cc.EditBox
        },
        // emailEdit: {
        //     default: null,
        //     type: cc.Label,
        // },
        isWindows: false,
        customEditBox: {
            default: null,
            type: CustomEditBox,
        },
        //for Mobile Scene
        sendOtpButton: {
            default: null,
            type: cc.Button,
        },
        resendOtpButton: {
            default: null,
            type: cc.Button,
        },
        buttonsNode: {
            default: null,
            type: cc.Node
        },
        otpBlock: {
            default: null,
            type: cc.Node,
        },
        mobileNumber: {
            default: null,
            type: cc.EditBox
        },
        timer: {
            default: null,
            type: cc.Label
        },
        otp: {
            default: null,
            type: cc.EditBox
        },
        lobbySelectorNode: {
            default: null,
            type: cc.Node
        },
        lobbyScreen: {
            default: null,
            type: cc.Node
        },
        time: 0, //otp validation time
        timerSchedule: null,
        resendTimer: 60,
        verfyOtpClickable: true
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
                cc.resources.load("flags/" + window.CountryCodes[i].code.toLowerCase(), cc.SpriteFrame, function (err, tex) {
                    if (err) {
                    } 
                    else {
                        inst.flagNode.getComponent(cc.Sprite).spriteFrame = tex;
                    }
                });
                return;
            }
        }

        cc.resources.load("flags/" + window.CountryCodes[230].code.toLowerCase(), cc.SpriteFrame, function (err, tex) {
            if (err) {
            } 
            else {
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

        cc.resources.load("flags/" + customEventData.code.toLowerCase(), cc.SpriteFrame, function (err, tex) {
            if (err) {
            } 
            else {
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
        }
        else {
            cc.sys.localStorage.setItem('country', window.CountryCodes[230].code);
            cc.resources.load("flags/" + window.CountryCodes[230].code.toLowerCase(), cc.SpriteFrame, function (err, tex) {
                if (err) {
                } 
                else {
                    inst.flagNode.getComponent(cc.Sprite).spriteFrame = tex;
                }
            });
            this.countryCode.string = window.CountryCodes[230].dial_code;
        }

        for (var i = 0; i < window.CountryCodes.length; i++) {
            const instance =  cc.instantiate(this.flagItem);
            instance.setPosition(0, 0);
            instance.active = true;
            instance.children[0].active = false;
            instance.children[2].getComponent(cc.Label).string = "+" + window.CountryCodes[i].dial_code;
            cc.resources.load("flags/" + window.CountryCodes[i].code.toLowerCase(), cc.SpriteFrame, function (err, tex) {
                if (err) {
                } 
                else {
                    instance.children[1].getComponent(cc.Sprite).spriteFrame = tex;
                }
            });
            instance.getComponent(cc.Button).clickEvents[0].customEventData = window.CountryCodes[i];
            instance.parent = this.flagScrollViewContent;
            instance.__data = window.CountryCodes[i];

            if (cc.sys.localStorage.getItem('country') == window.CountryCodes[i].code) {
                instance.children[0].active = true;
                cc.resources.load("flags/" + window.CountryCodes[i].code.toLowerCase(), cc.SpriteFrame, function (err, tex) {
                    if (err) {
                    } 
                    else {
                        inst.flagNode.getComponent(cc.Sprite).spriteFrame = tex;
                    }
                });
            }
        }
    },

    /**
     * @description Check if systme is windows, and Activate custom editbox!
     * @method onLoad
     * @memberof Screens.Login.SignUpScreen#
     */
    onLoad: function () {
        inst = this;
        // this.loadFlags();
        // this.validateRegisterMobile_Pattern();
        this.time = 300000;
        this.submitEnter();
    },

    togglePassword: function() {
        if (this.password.inputFlag == cc.EditBox.InputFlag.DEFAULT) {
            this.password.inputFlag = cc.EditBox.InputFlag.PASSWORD;
        }
        else {
            this.password.inputFlag = cc.EditBox.InputFlag.DEFAULT;
        }
    },
    
    onShow: function () {
        this.verfyOtpClickable = true;
        this.hideInviteCodeButton();
        // console.log(this.mobileNumber.string);
        // if (this.mobileNumber.string.length < 10) {
        //     this.sendOtpButton.node.color = new cc.Color(99, 70, 70);
        //     this.sendOtpButton.interactable = false;
        //     this.resendOtpButton.node.color = new cc.Color(99, 70, 70);
        //     this.resendOtpButton.interactable = false;
        // }

        this.resetAll();
        if (GameManager.isP) {
            // this.affiliateId.node.parent.active = true;
            // this.affiliateId.string = "";
            this.sendOtpButton.node.active = false;
        }


    },

    /**
     * @description Validates Mobile Number against ASCII/non-ASCII invalid Values
     * @method validateMobileEditBoXInput
     * @memberof Screens.Login.SignUpScreen#
     */
    validateOTPEditBoxInput: function () {
        this.validateNumericValue(this.otp);
    },

     NumericValue: function (editBoxInstance) {
        if (isNaN(editBoxInstance.string)) {
            var pat = /\d+/g;
            var x = editBoxInstance.string.match(pat);
            var t = "";
            if (x) {
                for (var count = 0; count < x.length; count++) {
                    t += x[count];
                }
            }
            editBoxInstance.string = t;
            // this.editBox.proto.value = t;
        } else {
            /**
             * to not allow spaces to be entered.
             */
            if (/\s/.test(editBoxInstance.string)) {
                var temp = editBoxInstance.string.toString().trim();
                editBoxInstance.string = temp;
                // this.editBox.proto.value = temp;
            }
            /**
             * isNaN accepts decimal, so to avoid it.
             */
            var t = ".";
            if (editBoxInstance.string.indexOf(t) != -1) {
                var x = editBoxInstance.string;
                x = x.replace('.', '');
                editBoxInstance.string = x;
                // this.editBox.proto.value = x;
            }
            /**
             * to avoid character 'e' in between.
             */
            var t = "e";
            if (editBoxInstance.string.indexOf(t) != -1) {
                var x = editBoxInstance.string;
                x = x.replace('e', '');
                editBoxInstance.string = x;
                // this.editBox.proto.value = x;
            }
            var t = "-";
            if (editBoxInstance.string.indexOf(t) != -1) {
                var x = editBoxInstance.string;
                x = x.replace('-', '');
                editBoxInstance.string = x;
                // this.editBox.proto.value = x;
            }
            var patt = (editBoxInstance.string.length > 1) ? (/[0-9]/) : (/[1-9]/);
            if (patt.test(editBoxInstance.string)) {} else {
                var x = editBoxInstance.string;
                x = x.replace('0', '');
                editBoxInstance.string = x;
                // this.editBox.proto.value = x;
            }
        }
    },

    /**
     * @description Validates Mobile Number against ASCII/non-ASCII invalid Values
     * @method validateMobileEditBoXInput
     * @memberof Screens.Login.SignUpScreen#
     */
    validateMobileEditBoXInput: function () {
        // console.log("VALIDATING");
        this.validateNumericValue(this.mobileNumber);
    },

    /**
     * @description Adds Listener to listen Enter keypress event
     * @method submitEnter
     * @memberof Screens.Login.SignUpScreen#
     */
    submitEnter: function () {
        return
        var enterKeyRef = this;
        this.enterListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed(key, event) {
                if (enterKeyRef.node.active && key == cc.KEY.enter) {
                    enterKeyRef.onRegister();
                    event.stopPropagation();
                }
            },
        });
        cc.eventManager.addListener(this.enterListener, this.node.zIndex + 1);
    },

    resetAll: function() {
        this.vpRegister.interactable = false;
        this.vpUserName.string = ""
        this.vpPassword.string = "";
        this.vpConfirmPassword.string = "";
        this.vpEmailId.string = "";
        this.vpMobileNumber.string = "";
        this.vpIsAbove18.isChecked = false;
    },

    onCheck: function() {
        this.vpRegister.interactable = false;
        if (this.vpUserName.string === "") {
            return;
        }
        if (this.vpPassword.string === "") {
            return;
        }
        if (this.vpConfirmPassword.string === "") {
            return;
        }
        if (this.vpEmailId.string === "") {
            return;
        }
        if (this.vpMobileNumber.string === "") {
            return;
        }
        if (!this.vpIsAbove18.isChecked) {
            return;
        }

        this.vpRegister.interactable = true;
    },

    /**
     * @description 
     * @method onHide
     * @memberof Screens.Login.SignUpScreen#
     */
    onHide: function () {
        // if (!!this.timer)
        // this.timer.string = "";
        this.password.string = "";
        this.email.string = "";
        this.userName.string = "";
        // this.mobileNumber.string = "";
        // this.otp.string = "";
        // this.affiliateId.string = "";
        // this.buttonsNode.getChildByName('TermsOfUse').getComponent(cc.Toggle).isChecked = false;

        // this.validateRegisterMobile_Pattern();

        if (GameManager.isMobile || (cc.sys.os === cc.sys.OS_WINDOWS && !cc.sys.isBrowser)) this.manageOtpView(false);

        this.hideInviteCodeButton();
    },

    /**
     * @description Handles Register button on SignUpScreen
     * @method onRegister
     * @memberof Screens.Login.SignUpScreen#
     */
    onRegister: function () {
        this.vpErrorMessage.string = "";

        this.vpUserName.node.getChildByName("red").active = false;
        this.vpPassword.node.getChildByName("red").active = false;
        this.vpConfirmPassword.node.getChildByName("red").active = false;
        this.vpEmailId.node.getChildByName("red").active = false;
        this.vpMobileNumber.node.getChildByName("red").active = false;

        if (this.vpPassword.string != this.vpConfirmPassword.string) {
            this.vpErrorMessage.node.active = true;
            this.vpErrorMessage.string = "Password unmatched";
            this.vpPassword.node.getChildByName("red").active = true;
            this.vpConfirmPassword.node.getChildByName("red").active = true;
            return;
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(this.vpEmailId.string)) {
            this.vpErrorMessage.node.active = true;
            this.vpErrorMessage.string = "Invalid email address";
            this.vpEmailId.node.getChildByName("red").active = true;
            return;
        }

        inst.loginHandler.vpRegister(
            this.vpUserName.string,
            this.vpEmailId.string,
            this.vpPassword.string,
            this.vpConfirmPassword.string,
            "+976" + this.vpMobileNumber.string,
            this.vpIsAbove18.isChecked,
            function (data) {
                if (!data.success || data.status == "fail") {
                    inst.vpErrorMessage.node.active = true;
                    if (data.message) {
                        inst.vpErrorMessage.string = data.message;
                    }
                    else {
                        inst.vpErrorMessage.string = data.error[0].message;
                    }

                    if (inst.vpErrorMessage.string.indexOf("email") != -1) {
                        inst.vpEmailId.node.getChildByName("red").active = true;
                    }
                    if (inst.vpErrorMessage.string.indexOf("Username") != -1) {
                        inst.vpUserName.node.getChildByName("red").active = true;
                    }
                    if (inst.vpErrorMessage.string.indexOf("Password") != -1) {
                        inst.vpPassword.node.getChildByName("red").active = true;
                        inst.vpConfirmPassword.node.getChildByName("red").active = true;
                    }
                    if (inst.vpErrorMessage.string.indexOf("Mobile") != -1) {
                        inst.vpMobileNumber.node.getChildByName("red").active = true;
                    }
                }
                else {
                    cc.sys.localStorage.setItem('vpUserName', inst.vpUserName.string);
                    cc.sys.localStorage.setItem('vpPassword', inst.vpPassword.string);
                    K.Token.access_token = data.access_token;
                    K.Token.refresh_token = data.refresh_token;
                    K.Token.access_token_expire_at = data.access_token_expire_at;
                    K.Token.refresh_token_expire_at = data.refresh_token_expire_at;

                    inst.vpErrorMessage.string = "";
                    inst.node.active = false;
                    ServerCom.socketIOConnect(K.ServerAddress.gameServer + ":" + K.ServerAddress.gamePort, () => {
                        if (!ServerCom.socketConnected) {
                            return;
                        }

                        GameManager.setUserData(data.user);
                        setTimeout(function () {
                            inst.loginNode.getComponent("LoginScreen").onSuccessfullLogin(inst.loginNode.getComponent("LoginScreen"));
                        }, 100);
                    });
                }
            
                // console.log("otp", data);

                // if (!data) {
                //     return;
                // }

                // if (data.success) {
                //     inst.otpNode.active = true;
                //     inst.resendNode.active = false;
                //     inst.resendTimer = 61;
                //     inst.schedule(inst.updateResend, 1);

                //     cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", inst.otpNode).active = true;
                //     cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", inst.otpNode).getComponent(cc.Label).string = "OTP sent successfully:" + " " + data.data;
                // }
                // else {
                //     inst.signupDebug[2].getComponent(cc.Label).string = data.message;
                //     inst.signupDebug[2].active = true;
                // }
            }
        );


            // this.loginHandler.loginGame(userNameReg, emailReg, pwdReg, "registration", "normal", function (data) {
            //     // console.log("lg", data)
            //     if (data.success) {
            //         // GameManager.setUserData(data.user);
            //         // BingoGameData.setUserData(data.user);
            //         // K.disconnectRequestedByPlayer = true;
            //         // pomelo.disconnect();
            //         // setTimeout(function () {
            //         //     inst.ConnectToGameSever(data.user.host, data.user.port, inst);
            //         // }, 100);
            //         GameManager.getToken(
            //             userNameReg,
            //             pwdReg,
            //             function (response) {
            //                 if (response.status == "success") {
            //                     setTimeout(function () {
            //                         inst.logcnHandler.loginGame(userNameReg, "", pwdReg, "login", "normal", inst.lobbyScreen.getComponent("LoginScreen").onLoginCallBack);
            //                     }, 100);
            //                 }
            //             }.bind(this)
            //         );
            //     } else {
            //         // console.log(data);
            //         K.disconnectRequestedByPlayer = true;
            //         // pomelo.disconnect();
            //         if (data.info === "userName already Exists try with diffrent playerId") {
            //             inst.signupDebug[0].active = true;
            //             var rand = Math.floor((Math.random() * data.suggestions.length));
            //             inst.userName.string = data.suggestions[rand];

            //         } else if (data.info === "password should contain atleast one capital letter and one number") {

            //             inst.signupDebug[1].active = true;

            //         } else if (data.info === "EmailId already Exists try with diffrent emailId") {
            //             inst.signupDebug[2].active = true;
            //             inst.signupDebug[2].string = LocalizedManager.t('TXT_EMAIL_REGISTERED');
            //         } else if (data.info === "emailId is invalid") {
            //             inst.signupDebug[2].active = true;
            //         } else if (data.info === "For affiliate id") {
            //             // inst.signupDebug[5].active = true;
            //         } else {
            //             // inst.signupDebug[3].active = true;
            //             // inst.signupDebug[3].getComponent(cc.Label).string = data.info;

            //             // inst.signupDebug[4].getComponent(cc.Label).string = data.info;
            //             // inst.signupDebug[4].active = true;
            //             // console.log("Else", data.info)
            //         }
            //     }
            // }, otp, mobileNumber, null);


        // });
    },

    updateResend(dt) {
        this.resendTimer -= 1;
        if (this.resendTimer == 0) {
            this.unschedule(this.updateResend);
            this.timerNode.active = false;
            this.resendNode.active = true;
        }
        else {
            this.timerNode.active = true;
            this.timerNode.getChildByName("timer2").getComponent(cc.Label).string = this.resendTimer + "s";
        }
    },

    onResend() {
        let inst = this;
        inst.loginHandler.sendOtp(this.phone.string, this.userName.string, this.inviteCode.string, function (data) {
            console.log("loginSTD", data);

            if (!data) {
                return;
            }
            cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", inst.otpNode).active = false;

            inst.preLogin.active = false;
            ServerCom.loading.active = false;

            if (data.success) {
                cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", inst.otpNode).active = true;
                cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", inst.otpNode).getComponent(cc.Label).string = "OTP sent successfully:" + " " + data.data;

                inst.otpNode.active = true;
                inst.resendNode.active = false;
                inst.resendTimer = 61;
                inst.schedule(inst.updateResend, 1);
            }
            else {
                inst.signupDebug[2].getComponent(cc.Label).string = data.message;
                inst.signupDebug[2].active = true;
            }
        });
    },

    onCloseOtp: function() {
        cc.find("InvisibleWhenBuilt/Inputs/ErrorMessage1", this.otpNode).active = false;
        this.unschedule(this.updateResend);
        this.resendNode.active = false;
        this.otpNode.active = false;
        this.otp.string = '';
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
        this.loginHandler.verifyOtp(this.otp.string, function (response) {
            console.log("otp", response);

            if (response.status == "success") {
                inst.otpNode.active = false;

                cc.sys.localStorage.setItem('countryCode', inst.countryCode.string);
                cc.sys.localStorage.setItem('phone', inst.phone.string);

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
                    setTimeout(function () {
                        inst.loginNode.getComponent("LoginScreen").onSuccessfullLogin(inst.loginNode.getComponent("LoginScreen"));
                    }, 100);
                });
            }
            else {
                inst.verfyOtpClickable = true;
            }
        });
    },

    /**
     * @description Connects to gameServer (Pomelo init)
     * @method ConnectToGameSever
     * @memberof Screens.Login.SignUpScreen#
     */
    ConnectToGameSever: function (host, port, inst) {
        inst.loginHandler.startPomelo(host, port, function () {
            inst.onSuccessfullLogin(inst);
        });
    },

    /**
     * @description Multi-login check after successfull login
     * @method onSuccessfullLogin
     * @memberof Screens.Login.SignUpScreen#
     */
    onSuccessfullLogin: function (inst) {
        GameManager.isConnected = false;
        this.lobbySelectorNode.active = true;
        const mainLobbyComp = this.lobbySelectorNode.getComponent("MainLobby");

        cc.sys.localStorage.setItem("auto_login_token", K.Token.access_token);
        cc.sys.localStorage.setItem("auto_login_refresh_token", K.Token.refresh_token);
        cc.sys.localStorage.setItem("auto_login_access_token_expire_at", K.Token.access_token_expire_at);
        cc.sys.localStorage.setItem("auto_login_refresh_token_expire_at", K.Token.refresh_token_expire_at);
        cc.sys.localStorage.setItem("auto_login_username", GameManager.user.userName);
        
        // Handle POKER
        mainLobbyComp.setOnClickCallback("POKER", () => {
            this.lobbySelectorNode.active = false;
            inst.loginHandler.checkForMultiClient(function (response) {
                console.log("MULTI CLIENT RESPONSE ", response);
                if (response.success) {
                    
                    GameManager.isConnected = true;
                    GameManager.reset();
                    // AutoJoin last logged in tables
                    // cc.eventManager.removeListener(inst.enterListener);
                    if (!!response.joinChannels && response.joinChannels.length > 0) {
                        GameManager.scheduleOnce(function () {
                            var joinCount = response.joinChannels.length;
                            response.joinChannels.forEach(function (element, index) {
                                var newData = new JoinData(element);
                                if (!!newData.channelId) {
                                    TableHandler.joinTableList.push(newData.channelId);
                                    newData.tableId = "";
                                    GameManager.join(newData.channelId, K.PomeloAPI.joinChannel, newData, null, null, index + 1, joinCount);
                                } else {
                                    GameManager.join(newData.tableId, K.PomeloAPI.joinChannel, newData, null, null, index + 1, joinCount);
                                }
                                // GameManager.join(data.channelId, K.PomeloAPI.joinChannel, data);
                            }, this);
                        }, 0.1);
                    } else {
                        ScreenManager.showScreen(K.ScreenEnum.LobbyScreen, 10, function () { }, false);
                    }
                } else {
                    inst.verfyOtpClickable = true;
                    K.disconnectRequestedByPlayer = true;
                    pomelo.disconnect();
                    ScreenManager.showScreen(K.ScreenEnum.LoginScreen, 10, function () { }, false);
                }
            });
        })
        // Handle BINGO
        mainLobbyComp.setOnClickCallback("BINGO", () => {
            this.lobbySelectorNode.active = false;
            console.log("Successfully login into BINGO!");
        })

        // var inst = this;
        // inst.loginHandler.checkForMultiClient(function (response) {
        //     if (response.success) {
        //         GameManager.reset();
        //         GameManager.isConnected = true;
        //         // AutoJoin last logged in tables
        //         if (!!response.joinChannels && response.joinChannels.length > 0) {
        //             var joinCount = response.joinChannels.length;
        //             response.joinChannels.forEach(function (element) {
        //                 var data = new JoinData(element);
        //                 if (!!newData.tableId) {
        //                     newData.channelId = "";
        //                     GameManager.join(newData.tableId, K.PomeloAPI.joinChannel, newData);
        //                 } else {
        //                     GameManager.join(newData.channelId, K.PomeloAPI.joinChannel, newData);
        //                 }
        //                 // GameManager.join(data.channelId, K.PomeloAPI.joinChannel, data);
        //             }, this);
        //         } else {
        //             ScreenManager.showScreen(K.ScreenEnum.LobbyScreen, 10, function () {}, false);
        //         }
        //     } else {
        //         K.disconnectRequestedByPlayer = true;
        //         pomelo.disconnect();
        //         ScreenManager.showScreen(K.ScreenEnum.LoginScreen, 10, function () {}, false);
        //     }
        // });
    },

    /**
     * @description Displays Login screen
     * @method onAlreadyRegistered
     * @memberof Screens.Login.SignUpScreen#
     */
    onAlreadyRegistered: function () {
        // this.phone.string = "";
        // this.userName.string = "";
        // this.inviteCode.string = "";
        // console.log("cancel on signup")

        this.resetAll();
        ScreenManager.showScreen(K.ScreenEnum.LoginScreen, 10, function () {}, false);
    },

    /**
     * @description Manages view of OTP block. Show OTP block when flag is true else hide
     * @method manageOtpView
     * @param {bool} flag
     * @memberof Screens.Login.SignUpScreen#
     */
    manageOtpView: function (flag) {
        this.sendOtpButton.node.active = !flag;
        // flag ? this.buttonsNode.setPositionY(DOWN) : this.buttonsNode.setPositionY(UP);
        this.otpBlock.active = flag;
    },

    /**
     * @description sendnOtp button callback. Used in mobile only
     * @method sendOtp
     * @param {bool} flag
     * @memberof Screens.Login.SignUpScreen#
     */
    sendOtp: function () {
        // console.log("sendotp");
        // this.timer.string = "";
        if (this.mobileNumber.string == "") {
            this.mobileNumber.string = "";
            this.mobileNumber.placeholder = "     Enter your mobile number";
            this.signupDebug[4].getComponent(cc.Label).string = LocalizedManager.t('TXT_ENTER_10_NUMBER');
            this.signupDebug[4].active = true;
        } else if (this.mobileNumber.string.length < 10) {
            // this.mobileNumber.string = "";
            // this.mobileNumber.placeholder = "Enter 10 digit mobile number";

            this.signupDebug[4].getComponent(cc.Label).string = LocalizedManager.t('TXT_ENTER_10_NUMBER');
            this.signupDebug[4].active = true;
        } else {
            // console.log("MAKING HIT")
            this.loginHandler.sendOTP(function (response) {
                // console.log("OTP STATUS ", response);

                if (response.success) {
                    this.otpStartTimer = new Date();
                    this.manageOtpView(true);
                    // this.startOtpTimer();
                }
            }.bind(this), this.mobileNumber.string);
        }
    },

    /**
     * @description starts otp timer
     * @method startOtpTimer
     * @memberof Screens.Login.SignUpScreen#
     */
    startOtpTimer: function () {
        (this.otpTimeRef != null) ? this.clearOtpTimer(this.otpTimeRef): true;
        this.otpTimeRef = setInterval(function () {
            let laps = (new Date() - this.otpStartTimer);
            // this.timer.string = GameManager.getJohnnyTimeDuration(parseInt(this.time - laps), true);
            // this.time -= 1000;
            if (this.time - laps <= 0) {
                this.time = 0;
                this.clearOtpTimer(this.otpTimeRef);
                this.manageOtpView(false);
            }
        }.bind(this), 1000);
    },

    /**
     * @description clears otp timer
     * @method clearOtpTimer
     * @memberof Screens.Login.SignUpScreen#
     */
    clearOtpTimer: function (timeRef) {
        clearInterval(timeRef);
        timeRef = null;
        this.time = 300000;
    },

    ///////////////////// Realtime Local Validation

    validateRegisterUserNamePattern: function (nodeData, custom) {
        // console.log("VALIDATING")
        // let data = this.userName.string;
        // // let regEx = '^[A-Za-z_]+$';
        // if (data.match(/[^A-Za-z0-9_]/)) {
        //     !!custom ? this.signupDebug[0].getComponent(cc.Label).string = LocalizedManager.t('TXT_ONLY_IN_AFFFILATE') : this.signupDebug[0].getComponent(cc.Label).string = LocalizedManager.t('TXT_ONLY_IN_USER');
        //     this.signupDebug[4].active = true;
        // }
    },

    validateRegisterPasswordPattern: function () {
        // let data = this.password.string;
        // if (data.length < 6 || data.length > 24) {
        //     this.signupDebug[1].getComponent(cc.Label).string = LocalizedManager.t('TXT_PASSWORD_MUST_LONG');
        //     this.signupDebug[1].active = true;
        // }
    },

    validateRegisterEmailID_Pattern: function () {
        console.log("VALIDATING EMAIL", this.email.string)
        let data = this.email.string;
        if (data == "") {
            this.signupDebug[2].getComponent(cc.Label).string = LocalizedManager.t('TXT_PLS_ENTER_EMAIL_ID');
            this.signupDebug[2].active = true;
            return;
        }

        if (!data.match(/[^A-Za-z0-9@_.]/)) {
            if ((data.indexOf('@', 1) === -1) || (data.indexOf('.', 2) === -1)) {
                this.signupDebug[2].getComponent(cc.Label).string = LocalizedManager.t('TXT_INVALID_EMAIL');
                this.signupDebug[2].active = true;
            }
        }
    },

    validateRegisterMobile_Pattern: function () {
        // if (this.mobileNumber.string.length < 10) {
        //     this.sendOtpButton.node.color = new cc.Color(99, 70, 70);
        //     this.sendOtpButton.interactable = false;
        //     this.resendOtpButton.node.color = new cc.Color(99, 70, 70);
        //     this.resendOtpButton.interactable = false;

        //     this.signupDebug[4].getComponent(cc.Label).string = LocalizedManager.t('TXT_ENTER_10_NUMBER');
        //     this.signupDebug[4].active = true;

        // } else {
        //     this.sendOtpButton.node.color = cc.Color.WHITE;
        //     this.sendOtpButton.interactable = true;
        //     this.resendOtpButton.node.color = cc.Color.WHITE;
        //     this.resendOtpButton.interactable = true;
        // }
    },

    showInviteCodeButton: function() {
        this.showInviteCode.active = false;
        this.inviteCode.node.parent.active = true;
    },

    hideInviteCodeButton: function() {
        this.showInviteCode.active = true;
        this.inviteCode.node.parent.active = false;
    }
});