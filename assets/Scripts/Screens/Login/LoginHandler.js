var Login = require('PostTypes').Login;
var userID = require('PostTypes').UserID;
var forgotPassword = require('PostTypes').ForgotPassword;
var resetPassword = require('PostTypes').ResetPassword;
var OTP = require('PostTypes').OTP;
var transactionHistory = require('PostTypes').TransactionHistory;
var EventEmitter = require('EventEmitter');
var PopUpType = require('PopUpManager').PopUpType;

var profileData = {
    query: {
        playerId: "hsdfhd"
    },
    updateKeys: {
        mobileNumber: "012345",
    },
};

/**
 * @classdesc Handles background process for login
 * @class LoginHandler
 * @extends EventEmitter
 * @memberof Screens.Login
 */
cc.Class({
    extends: EventEmitter,

    properties: {
        clientIPv4: {
            default: "",
            visible: false,
        },
        clientIPv6: {
            default: "",
            visible: false,
        },
        login: {
            default: null,
            visible: false,
        },
        isLoading: false,
    },

    /**
     * @description use this for initializations 
     * @method onLoad
     * @memberof Screens.Login.LoginHandler#
     */
    onLoad: function () {
        window.LoginHandler = this;
    },

    /**
     * @description Initialise Login based on the device types
     * @method init
     * @memberof Screens.Login.LoginHandler#
     */
    init: function (deviceType) {
        this.login = Login;
        this.login.deviceType = deviceType;
        this.login.appVersion = K.ServerAddress.clientVer;
    },

    /**
     * @description Check server for maintainance status 
     * @method checkServerStatus
     * @param {Object} callback -callback to excute after successful operation
     * @param {String} error -Describes the type of error
     * @memberof Screens.Login.LoginHandler#
     */
    checkServerStatus: function (callback, error) {
        var address = K.ServerAddress.maintainanceIP + ":" + K.ServerAddress.maintainancePort + K.ServerAPI.maintainance;
        var data = K.AppVersion;
        data.appVersion = K.ServerAddress.clientVer;
        data.deviceType = this.login.deviceType;
        console.log("@@@@ checkServerStatus ", address, data);
        ServerCom.httpPostRequest(address, data, callback, error);
    },

    /**
     * @description Start connection with game server 
     * @method startPomelo
     * @param {String} host -Host Address 
     * @param {String} port - Port Number
     * @param {Object} callback -callback to excute after successful operation
     * @memberof Screens.Login.LoginHandler#
     */
    startPomelo: function (host, port, callback) {
        // pomelo int
        console.log("!!!!!!!!!! START POMELO LOGIN HANDLER", host, port);
        ServerCom.loading.active = true;
        this.isLoading = true;
        ServerCom.loading.active = false;
        this.isLoading = false;
        var inst = this;
        pomelo.init({
            host: host,
            port: port,
            // encrypt: true,
            log: true,
        }, function (cb) {
            console.log("!!!!!!!!!! START POMELO INIT CALLBACK ", JSON.stringify(cb));
            ServerCom.loading.active = false;
            inst.isLoading = false;
            if (callback !== null && callback !== undefined) {
                callback();
                inst.emit('Init');
            }
        });
    },

    loginPassword: function(email, password, callback) {

        ServerCom.httpPostRequest(
            K.ServerAddress.otp_server + "/api/auth/loginRequest", 
            {
                "emailId": email,
                "password": password
            }, 
            callback
        );
    },

    loginSTD: function(mobileNumber, callback) {

        ServerCom.httpPostRequest(
            K.ServerAddress.otp_server + "/api/auth/loginSTD", 
            {
                "phoneNumber": mobileNumber
            }, 
            callback
        );
    },

    sendOtp: function(mobileNumber, userName, inviteCode, callback) {

        ServerCom.httpPostRequest(
            K.ServerAddress.otp_server + "/api/auth/sendOtp", 
            {
                "phoneNumber": mobileNumber,
                "userName": userName,
                "inviteCode": inviteCode,
            }, 
            callback
        );
    },

    verifyOtp: function(otpNumber, callback) {

        ServerCom.httpPostRequest(
            K.ServerAddress.otp_server + "/api/auth/verifyOtp", 
            {
                "otpNumber": otpNumber
            }, 
            callback
        );
    },

    findUserResetPassword: function(name, callback) {

        ServerCom.httpPostRequest(
            K.ServerAddress.otp_server + "/api/auth/findUserResetPassword", 
            {
                "name": "3434343434"
            }, 
            callback
        );
    },

    checkOTPRestPassword: function(otpNumber, token, callback) {

        ServerCom.httpPostRequest(
            K.ServerAddress.otp_server + "/api/auth/checkOTPRestPassword", 
            {
                "otpNumber": otpNumber,
                "token": token
            }, 
            callback
        );
    },

    resetPassword: function(confirmPassword, newPassword, callback) {

        ServerCom.httpPostRequest(
            K.ServerAddress.otp_server + "/api/auth/resetPassword", 
            {
                "confirmPassword": confirmPassword,
                "newPassword": newPassword,
                "token": token,
            }, 
            callback
        );
    },


    /**
     * @description Login Game 
     * @method loginGame
     * @param {String} userName -userName
     * @param {String} emailId -email id of the user
     * @param {String} password -password
     * @param {String} loginType 
     * @param {String} loginMode 
     * @param {Object} callback -callback to execute after successful login 
     * @memberof Screens.Login.LoginHandler#
     */
    loginGame: function (userName, emailId, password, loginType, loginMode, callback, otp, mobileNumber, affiliateId) {
        // console.log("GETCONNECTOR")
        this.login.loginType = loginType;
        this.login.loginMode = "authtk";
        // this.login.loginMode = loginMode;
        this.login.userName = userName;
        this.login.emailId = emailId;
        this.login.password = password;
        window.ipV4Address = this.login.ipV4Address = this.clientIPv4;
        this.login.ipV6Address = this.clientIPv6;
        this.login.isLoggedIn = false;

        this.login.client = cc.sys.isMobile ? "webmobile" : "webdesktop";
        if (cc.sys.os === cc.sys.OS_WINDOWS) {
            this.login.os = "windows";
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            this.login.os = "android";
        }
        else if (cc.sys.os === cc.sys.OS_IOS) {
            this.login.os = "Ios";
        }

        function myFunction() {
              if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                return 'opera';
              } else if (navigator.userAgent.indexOf("Edg") != -1) {
                return 'edge';
              } else if (navigator.userAgent.indexOf("Chrome") != -1) {
                return 'chrome';
              } else if (navigator.userAgent.indexOf("Safari") != -1) {
                return 'safari';
              } else if (navigator.userAgent.indexOf("Firefox") != -1) {
                return 'firefox';
              } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
                return 'ie';
              } else {
                return 'unknown';
              }
        }

        this.login.userAgent = myFunction();

        const v7 = () => {
          return 'tttttttt-tttt-7xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.trunc(Math.random() * 16);
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          }).replace(/^[t]{8}-[t]{4}/, function() {
            const unixtimestamp = Date.now().toString(16).padStart(12, '0');
            return unixtimestamp.slice(0, 8) + '-' + unixtimestamp.slice(8);
          });
        }

        let deviceId = cc.sys.localStorage.getItem("DEVICE_ID");
        if (!deviceId) {
            deviceId = v7();
            cc.sys.localStorage.setItem("DEVICE_ID", deviceId);
        }
        this.login.deviceId = deviceId;   
        this.login.appVersion = K.ServerAddress.clientVer;

        if (loginType == "registration") {
            // this.login.regotp = otp; //"";
            // this.login.mobileNumber = mobileNumber;
            // this.login.isParentUserName = affiliateId;
        }
        // console.log("LOGIN CLICKED LOGIN GAME INITIATED", this.login);

        this.login.access_token = K.Token.access_token;
        this.login.refresh_token = K.Token.refresh_token;

        ServerCom.pomeloRequest(K.PomeloAPI.gateLogin, this.login, callback, null, 5000, false);
    },

    /** 
     * @description Login Game - Social
     * @method loginGameSocial
     * @param socialObject
     * @param {String} userName -userName
     * @param {String} emailId -email id of the user
     * @param {String} password -password
     * @param {String} loginType 
     * @param {String} loginMode 
     * @param {Object} callback -callback to execute after successful login 
     * @memberof Screens.Login.LoginHandler#
     */
    loginGameSocial: function (userName, emailId, password, loginType, loginMode, socialObject, callback) {
        this.login.loginType = loginType;
        this.login.loginMode = loginMode;
        this.login.userName = userName;
        this.login.emailId = emailId;
        this.login.password = password;
        window.ipV4Address = this.login.ipV4Address = this.clientIPv4;
        this.login.ipV6Address = this.clientIPv6;
        this.login.isLoggedIn = false;
        this.login.appVersion = K.ServerAddress.clientVer;
        if (loginMode === "facebook") {
            this.login.fbObject = socialObject;
        } else if (loginMode === "google") {
            this.login.fbObject = socialObject;
        }
        ServerCom.pomeloRequest(K.PomeloAPI.gateLogin, this.login, callback, null, 5000, false);
    },

    /**
     * @description Check for multi login
     * @method checkForMultiClient
     * @param {Object} callback -callback to execute
     * @param {String} error -Describes error
     * @memberof Screens.Login.LoginHandler#
     */
    checkForMultiClient: function (callback, error) {
        console.log("checkForMultiClient1");
        var data = {};
        data.playerId = GameManager.user.playerId;
        data.isRequested = true;
        data.isLoggedIn = false;
        data.playerName = GameManager.user.userName;
        data.deviceType = this.login.deviceType;
        data.appVersion = K.ServerAddress.clientVer;
        // ServerCom.pomeloRequest(K.PomeloAPI.checkForMultiClient, data, callback, error, 5000);

        console.log("checkForMultiClient2");
        ServerCom.socketIORequest("common|" + K.PomeloAPI.checkForMultiClient, data, callback, null, 5000, false);
    },


    /** ?????????????????????????????????????   Depricated now not in use.
     * @description Check for single login
     * @param {Object} callback -callback to execute
     * @param {String} error -Describes error
     * @memberof Screens.Login.LoginHandler#
     */
    singleLogin: function (callback, error) {
        var data = {};
        data.playerId = GameManager.user.playerId;
        data.isRequested = true;
        data.isLoggedIn = false;
        data.userDeviceType = this.login.deviceType;
        ServerCom.pomeloRequest(K.PomeloAPI.singleLogin, data, callback, error);
    },

    /**
     * @description Handle Login Response
     * @method setAddress
     * @param {String} v4 -IPv4 Address
     * @param {String} v6 -IPv6 Address
     * @memberof Screens.Login.LoginHandler# 
     */
    setAddress: function (v4, v6) {
        this.clientIPv4 = v4;
        this.clientIPv6 = v6;
        window.ipV4Address = Login.ipV4Address = v4;
        Login.ipV6Address = v6;
    },

    /**
     * @description  NOT IN USE
     * @param {String} userName -userName
     * @param {String} emailId -email id of the user
     * @param {object} callback -callback to execute
     * @method forgotPassword
     * @memberof Screens.Login.LoginHandler#
     */
    // forgotPassword: function (userName, emailId, callback) {
    //     var address = K.ServerAddress.ipAddress + ":" + K.ServerAddress.port + K.ServerAPI.forgotPassword;
    //     var data = forgotPassword;
    //     data.userName = userName;
    //     data.emailId = emailId;
    //     data.isLoggedIn = false;
    //     ServerCom.httpPostRequest(address, data, callback);
    // },

    /**
     * @description Submit new password
     * @param resetToken
     * @param {String} password -Password
     * @param {Object} callback -callback to excute after successful operation
     * @method resetPassword
     * @memberof Screens.Login.LoginHandler#
     */
    resetPassword: function (resetToken, password, callback) {
        var address = K.ServerAddress.ipAddress + ":" + K.ServerAddress.port + K.ServerAPI.resetPassword;
        var data = resetPassword;
        data.passwordResetToken = resetToken;
        data.password = password;
        data.isLoggedIn = false;
        ServerCom.httpPostRequest(address, data, callback);
    },

    /**
     * @description Verify email
     * @param {Object} callback -callback to execute
     * @method verifyEmail
     * @memberof Screens.Login.LoginHandler#
     */
    verifyEmail: function (callback) {
        var address = K.ServerAddress.ipAddress + ":" + K.ServerAddress.port + K.ServerAPI.emailVerification;
        var data = userID;
        data.playerId = GameManager.user.playerId;
        data.isLoggedIn = false;
        ServerCom.httpPostRequest(address, data, callback);
    },

    /**
     * @description Request OTP to verify mobile number
     * @param {Object} callback -callback to execute
     * @method sendOTP
     * @memberof Screens.Login.LoginHandler#
     */
    sendOTP: function (callback, mobileNumber) {
        if (!K.internetAvailable) {
            GameManager.popUpManager.show(PopUpType.NotificationPopup, "Please check your\n Internet Connection.", function () {});
            return;
        }
        var address = K.ServerAddress.ipAddress + ":" + K.ServerAddress.port + K.ServerAPI.sendotp;
        var data = {};
        data.mobileNumber = mobileNumber;
        ServerCom.httpPostRequest(address, data, function (response) {
            if (callback) callback(response);
        }.bind(this));
    },

    /**
     * @description Verify mobile number using OTP
     * @param otp
     * @param {Object} callback -callback to execute
     * @method verifyOTP
     * @memberof Screens.Login.LoginHandler#
     */
    verifyOTP: function (otp, callback) {
        var address = K.ServerAddress.ipAddress + ":" + K.ServerAddress.port + K.ServerAPI.verifyOTP;
        var data = OTP;
        data.playerId = GameManager.user.playerId;
        data.otp = otp;
        data.isLoggedIn = false;
        ServerCom.httpPostRequest(address, data, callback);
    },

    /**
     * @description Update user profile
     * @param updateKeys
     * @param {Object} callback -callback to execute
     * @method updateMobile
     * @memberof Screens.Login.LoginHandler#
     */
    updateMobile: function (updateKeys, callback) {
        var data = profileData;
        data.query.playerId = GameManager.user.playerId;
        data.updateKeys = updateKeys;
        data.isLoggedIn = false;
        ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, callback);
    },

    // 
    vpRegister: function(userName, emailId, password, confirmPassword, mobileNumber, isAbove18, callback) {

        ServerCom.httpPostRequest(
            K.Token.auth_server + "/api/auth/register", 
            {
                "userName": userName,
                "emailId": emailId,
                "password": password,
                "confirmPassword": confirmPassword,
                "mobileNumber": mobileNumber,
                "isAbove18": isAbove18
            }, 
            callback
        );
    },

    vpLogin: function(userName, password, callback, error) {
        GameManager.notification = null;

        ServerCom.httpPostRequest(
            K.Token.auth_server + "/api/auth/login", 
            {
                "userName": userName,
                "password": password,
            }, 
            callback, error
        );
    },

    vpSendOTP: function(userName, callback) {

        ServerCom.httpPostRequest(
            K.Token.auth_server + "/api/auth/sendOtp", 
            {
                "userName": userName
            }, 
            callback
        );
    },

    vpVerifyOTP: function(emailId, otp, callback) {

        ServerCom.httpPostRequest(
            K.Token.auth_server + "/api/auth/verifyOtpEmail", 
            {
                "emailId": emailId,
                "otp": otp,
            }, 
            callback
        );
    },

    vpResetPassword: function(emailId, newPassword, confirmNewPassword, resetToken, callback) {

        ServerCom.httpPatchRequest(
            K.Token.auth_server + "/api/auth/resetPassword", 
            {
                "emailId": emailId,
                "newPassword": newPassword,
                "confirmNewPassword": confirmNewPassword,
                "resetToken": resetToken,
            }, 
            callback
        );
    },

    vpUpdateContactInfo: function(phoneNumber, emailId, callback) {
        ServerCom.httpPostRequest(
            K.Token.auth_server + "/api/users/update-contact-info", 
            {
                "phoneNumber": phoneNumber,
                "emailId": emailId,
            }, 
            callback
        );
    },

    vpWithdrawChips: function(amount, callback) {
        ServerCom.httpPostRequest(
            K.Token.auth_server + "/api/cashout/player/request", 
            {
                "amount": amount
            }, 
            callback
        );
    },

    vpWithdrawHistory: function(callback) {
        ServerCom.httpGetRequest(
            K.Token.auth_server + "/api/cashout/player/history", 
            null, 
            callback
        );
    },

    vpWShop: function(callback) {
        ServerCom.httpGetRequest(
            K.Token.auth_server + "/api/users/shop", 
            null,
            callback
        );
    },

    vpSendGift: function(name, amount, mobileNumber, callback) {
        ServerCom.httpPostRequest(
            K.Token.auth_server + "/api/wallet/send-gift", 
            {
                "name": name,
                "amount": amount,
                "mobileNumber": mobileNumber,
            }, 
            callback
        );
    },

    vpListGift: function(callback) {
        ServerCom.httpGetRequest(
            K.Token.auth_server + "/api/wallet/get-gift-history", 
            null, 
            callback
        );
    },
});
