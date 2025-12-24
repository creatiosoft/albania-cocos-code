// Base class for all server API handlers

var root = window;
var EventEmitter = require('EventEmitter');
var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
/**
 * @classdesc After some data handling, Communicate with server through pomelo-client.js
 * @class ServerCom
 * @extends EventEmitter
 * @memberof Utilities
 */

cc.Class({
    extends: EventEmitter,
    properties: {
        // count : 0,
        tracker: {
            default: {},
        },
        launch: {
            default: null,
            type: cc.Node,
        },
        loading: {
            default: null,
            type: cc.Node,
        },
        reconnecting: {
            default: null,
            type: cc.Node,
        },
        preLogin: {
            default: null,
            type: cc.Node,
        },
        trackerCount: 0,
        cconnectCB: null,
        forceKeepLoading: false,
        // 
        inGame: false,
        sessionExpired: false,
        pomeloConnected: true,
        socketConnected: true,
        pomeloReconnecting: true,
        socketReconnecting: true,
        pomeloReconnectedCount: 0,
        socketReconnectedCount: 0,
        socketReconnected: false,
        pomeloReconnected: false,
        reconncetTimer: null,
        reconnectionDelay: 1000,
        reconnectMaxAttempts: 3,
    },

    // use this for initialization
    onLoad: function () {
        // this.socketReconnectedCount = 0;
        root.ServerCom = this;

        if (!cc.sys.isNative) {
            // Object.defineProperty(
            //     this.preLogin,
            //     "active",
            //     {
            //         set: (val) => {
            //             console.trace("PANDA", "preLogin", "active", val);
            //             this.preLogin._active = val;
            //         }
            //     }
            // )

            // Object.defineProperty(
            //     this.loading,
            //     "active",
            //     {
            //         set: (val) => {
            //             console.trace("PANDA", "loading", "active", val);
            //             this.loading._active = val;
            //         }
            //     }
            // )
        }
    },

    /**
     * @method httpPostRequest
     * @description HTTP request - POST data 
     * @param {String} address -address of Server 
     * @param {Object} data -Data/PayLoad to be sent
     * @param {method} callback -Callback to be executed if response.succss is true!
     * @param {method} error -Callback to be executed if response.success is false!
     * @param {Number} timeout -value in milli seconds, Specify request timeout time! 
     * @memberof Utilities.ServerCom#
     */
    httpPostRequest: function (address, data, callback, error, timeout) {
        console.log(ServerCom.getFormattedTime(), "Network [REQ] httpPostRequest", address, data);
        var inst = this;
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        if (ServerCom.loading) {
            if (!ServerCom.preLogin.active) {
                ServerCom.loading.active = true;
            }
            ServerCom.loading.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
        }
        xhr.onreadystatechange = function () {
            K.internetAvailable = true;
            if (ServerCom.loading) {
                ServerCom.loading.active = false;
            }
            if (xhr.status == 403) {
                GameManager.popUpManager.hideAllPopUps();
                var param = {
                    code: K.Error.SessionError,
                    response: "Session error, please reload the game."
                };
                GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
                return;
            }
            if (xhr.status == 400 || xhr.status == 401 || xhr.status == 429) {
                if (callback !== null && callback !== undefined && xhr.responseText) {
                    callback(JSON.parse(xhr.responseText));
                }
                return;
            }
            // if (xhr.status == 0) {
            //     if (callback !== null && callback !== undefined) {
            //         callback();
            //     }
            //     return;
            // }
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                if (callback !== null && callback !== undefined) {
                    var data = JSON.parse(response);
                    console.log(ServerCom.getFormattedTime(), "Network [RES] httpPostRequest", address, data);
                    if (!data.success && (!data.status || data.status != "success")) {
                        var param = {
                            code: K.Error.SuccessFalseError,
                            response: data.info,
                            errorType: data.errorType || "",
                            isRetry: (response.isRetry !== undefined && response.isRetry !== null) ? response.isRetry : false
                        };
                        var isDisplay = (response.isDisplay !== undefined && response.isDisplay !== null) ? response.isDisplay : true;
                        if (isDisplay) {
                            inst.emit('error', param);
                        }
                        if (error !== null && error !== undefined) {
                            error(param);
                        }
                    }
                    if (callback !== null && callback !== undefined) {
                        callback(data);
                    }
                }
            }
        };
        xhr.onerror = function (err) {
            if (ServerCom.loading) {
                ServerCom.loading.active = false;
            }
            ServerCom.preLogin.active = false;
            K.disconnectRequestedByPlayer = false;
            K.internetAvailable = false;
            // console.error("ON_ERROR ", err)

            inst.emit('error', {
                code: K.Error.ConnectionError,
                response: err,
            });
            if (error !== null && error !== undefined) {
                error({
                    code: K.Error.ConnectionError,
                    response: err,
                });
            }
        };
        xhr.ontimeout = function (timeout) {
            if (ServerCom.loading) {
                ServerCom.loading.active = false;
            }
            ServerCom.preLogin.active = false;
            // console.error("ON_timeout ", timeout)
            K.disconnectRequestedByPlayer = false;
            K.internetAvailable = false;
            inst.emit('error', {
                code: K.Error.TimeOutError,
                response: "Timeout" + address
            });
            if (error !== null && error !== undefined) {
                error({
                    code: K.Error.TimeOutError,
                    response: "Timeout" + address,
                });
            }
        };
        xhr.open("POST", address, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        if (K.Token.access_token != "") {
            let token = K.Token.access_token;
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        }
        xhr.send(JSON.stringify(data));
    },

    httpPatchRequest: function (address, data, callback, error, timeout) {
        var inst = this;
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        if (ServerCom.loading) {
            if (!ServerCom.preLogin.active) {
                ServerCom.loading.active = true;
            }
            ServerCom.loading.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
        }
        xhr.onreadystatechange = function () {
            K.internetAvailable = true;
            if (ServerCom.loading) {
                ServerCom.loading.active = false;
            }
            if (xhr.status == 403) {
                GameManager.popUpManager.hideAllPopUps();
                var param = {
                    code: K.Error.SessionError,
                    response: "Session error, please reload the game."
                };
                GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
                return;
            }
            if (xhr.status == 400 || xhr.status == 401 || xhr.status == 429) {
                if (callback !== null && callback !== undefined && xhr.responseText) {
                    callback(JSON.parse(xhr.responseText));
                }
                return;
            }
            // if (xhr.status == 0) {
            //     if (callback !== null && callback !== undefined) {
            //         callback();
            //     }
            //     return;
            // }
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                if (callback !== null && callback !== undefined) {
                    var data = JSON.parse(response);
                    if (!data.success && (!data.status || data.status != "success")) {
                        var param = {
                            code: K.Error.SuccessFalseError,
                            response: data.info,
                            errorType: data.errorType || "",
                            isRetry: (response.isRetry !== undefined && response.isRetry !== null) ? response.isRetry : false
                        };
                        var isDisplay = (response.isDisplay !== undefined && response.isDisplay !== null) ? response.isDisplay : true;
                        if (isDisplay) {
                            inst.emit('error', param);
                        }
                        if (error !== null && error !== undefined) {
                            error(param);
                        }
                    }
                    if (callback !== null && callback !== undefined) {
                        callback(data);
                    }
                }
            }
        };
        xhr.onerror = function (err) {
            if (ServerCom.loading) {
                ServerCom.loading.active = false;
            }
            ServerCom.preLogin.active = false;
            K.disconnectRequestedByPlayer = false;
            K.internetAvailable = false;
            // console.error("ON_ERROR ", err)

            inst.emit('error', {
                code: K.Error.ConnectionError,
                response: err,
            });
            if (error !== null && error !== undefined) {
                error({
                    code: K.Error.ConnectionError,
                    response: err,
                });
            }
        };
        xhr.ontimeout = function (timeout) {
            if (ServerCom.loading) {
                ServerCom.loading.active = false;
            }
            ServerCom.preLogin.active = false;
            // console.error("ON_timeout ", timeout)
            K.disconnectRequestedByPlayer = false;
            K.internetAvailable = false;
            inst.emit('error', {
                code: K.Error.TimeOutError,
                response: "Timeout" + address
            });
            if (error !== null && error !== undefined) {
                error({
                    code: K.Error.TimeOutError,
                    response: "Timeout" + address,
                });
            }
        };
        xhr.open("PATCH", address, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        if (K.Token.access_token != "") {
            let token = K.Token.access_token;
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        }
        xhr.send(JSON.stringify(data));
    },

    httpGetRequest: function (address, data, callback, error, timeout) {
        console.log(ServerCom.getFormattedTime(), "Network [REQ] httpGetRequest", address, data);
        var inst = this;
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        if (ServerCom.loading) {
            if (!ServerCom.preLogin.active) {
                ServerCom.loading.active = true;
            }
            ServerCom.loading.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
        }
        xhr.onreadystatechange = function () {
            K.internetAvailable = true;
            if (ServerCom.loading) {
                ServerCom.loading.active = false;
            }
            if (xhr.status == 403) {
                GameManager.popUpManager.hideAllPopUps();
                var param = {
                    code: K.Error.SessionError,
                    response: "Session error, please reload the game."
                };
                GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
                return;
            }
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                if (callback !== null && callback !== undefined) {
                    var data = JSON.parse(response);
                    console.log(ServerCom.getFormattedTime(), "Network [RES] httpGetRequest", address, data);
                    if (!data.success && (!data.status || data.status != "success")) {
                        var param = {
                            code: K.Error.SuccessFalseError,
                            response: data.info,
                            errorType: data.errorType || "",
                            isRetry: (response.isRetry !== undefined && response.isRetry !== null) ? response.isRetry : false
                        };
                        var isDisplay = (response.isDisplay !== undefined && response.isDisplay !== null) ? response.isDisplay : true;
                        if (isDisplay) {
                            inst.emit('error', param);
                        }
                        if (error !== null && error !== undefined) {
                            error(param);
                        }
                    }
                    if (callback !== null && callback !== undefined) {
                        callback(data);
                    }
                }
            }
        };
        xhr.onerror = function (err) {
            if (ServerCom.loading) {
                ServerCom.loading.active = false;
            }
            K.disconnectRequestedByPlayer = false;
            K.internetAvailable = false;
            ServerCom.preLogin.active = false;
            // console.error("ON_ERROR ", err)

            inst.emit('error', {
                code: K.Error.ConnectionError,
                response: err,
            });
            if (error !== null && error !== undefined) {
                error({
                    code: K.Error.ConnectionError,
                    response: err,
                });
            }
        };
        xhr.ontimeout = function (timeout) {
            if (ServerCom.loading) {
                ServerCom.loading.active = false;
            }
            ServerCom.preLogin.active = false;
            // console.error("ON_timeout ", timeout)
            K.disconnectRequestedByPlayer = false;
            K.internetAvailable = false;
            inst.emit('error', {
                code: K.Error.TimeOutError,
                response: "Timeout" + address
            });
            if (error !== null && error !== undefined) {
                error({
                    code: K.Error.TimeOutError,
                    response: "Timeout" + address,
                });
            }
        };
        xhr.open("GET", address, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        if (K.Token.access_token != "") {
            let token = K.Token.access_token;
            if (address.indexOf("/api/auth/refresh") != "-1") {
                token = K.Token.refresh_token;
            }
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        }
        xhr.send();
    },

    /**
     * 
     * @method pomeloRequest
     * @description this method calls pomelo.request() method of pomelo-client after some data handling!
     * @param {String} address - Pomelo API route
     * @param {Object} data -PayLoad/Data to be sent with Request to server
     * @param {callback} callback -Callback to be called after successful response
     * @param {callback} error -Callback to be executed if response.success is false!
     * @param {Number} timeout - Value in milli seconds, Specify request timeout time!
     * @param {boolean} showLoading - boolean value used for active/deactive Loading Node!
     * @param {boolean} showError - boolean value used to decide if error event to be fired or not if response.success is false!
     * @memberof Utilities.ServerCom#
     */
    pomeloRequest: function (address, data, callback, error, timeout, showLoading = true, showError = true, callback2) {

        ServerCom.socketIORequest("common|" + address, data, callback, error, timeout, showLoading, showError, "", callback2);

        return;

        var inst = this;

        if (typeof data != 'object') {
            let dat = {};
            dat.data = data;
            data = dat;
        }

        if (!data) {
            data = {};
        }

        if (typeof data == 'object') {
            if (data.isLoggedIn == null || data.isLoggedIn == undefined)
                data.isLoggedIn = true;
            if (data.isLoggedIn) {
                if (!GameManager.isConnected) {
                    inst.emit('error', {
                        code: K.Error.ConnectionError,
                        response: "You are not logged in !!",
                    });
                    return;
                }
            }
        } else {
            if (!GameManager.isConnected) {
                inst.emit('error', {
                    code: K.Error.ConnectionError,
                    response: "You are not logged in !!",
                });
                return;
            }
        }

        var timeoutFlag = false;
        /* Used only for game request - Start */

        this.tracker = this.tracker || {};
        var key = data.channelId || "";
        if (data.channelId == "") {
            key = data.tableId || "";
        }
        key = key + address;
        //  console.log("request key " + key);
        if (this.tracker[key] !== undefined) {
            if (this.tracker[key]) {
                //console.log("false " + key);
                // return;
            } else {
                this.updateTracker(true, key, showLoading);
            }
        } else {
            //TODO 
            this.updateTracker(true, key, showLoading);
        }
        /** Used only for game request - End */

        var timer = setTimeout(function() {
            // console.log("uno pakda, ", address);
            // inst.emit('error', {
            //     code: K.Error.TimeOutError,
            //     response: "Timeout at " + address
            // });
            // timeoutFlag = true;
            // if (error !== null && error !== undefined) {
            //     error({
            //         code: K.Error.TimeOutError,
            //         response: "Timeout at " + address,
            //     });
            // }

            // reset multi request block
            inst.tracker[key] = false;
            this.updateTracker(false, key, showLoading);

        }.bind(this), timeout || 5000); // Discuss timeout

        if (!data.access_token && K.Token.access_token) {
            data.access_token = K.Token.access_token;
        }
        console.log("pomelo.request", address, data);
        pomelo.request(address, data, function (response) {
            console.log("%c[response] \n%o", 'color: Blue;', response);
              // console.log("response : " + response.route);
            //   console.log(JSON.stringify(response));
            clearTimeout(timer);
            // reset multi request block
            var respKey = response.channelId || "";
            if (!!response.tableId) {
                respKey = response.tableId || "";
            }
            respKey = respKey + response.route;
            //console.log('reponse key : ' + respKey);
            inst.updateTracker(false, respKey, showLoading);
            var isDisplay = (response.isDisplay !== undefined && response.isDisplay !== null) ? response.isDisplay : !response.success;
            var param = {
                code: K.Error.SuccessFalseError,
                response: response.info,
                errorType: response.errorType || "",
                channelId: response.channelId || "",
                isRetry: (response.isRetry !== undefined && response.isRetry !== null) ? response.isRetry : false
            };
            if (!response.success) {
                if (showError && isDisplay) {
                    inst.emit('error', param);
                }
                if (error !== null && error !== undefined) {
                    error(param);
                }
            } else {
                if (isDisplay) {
                    inst.emit('error', param);
                }
            }
            if (callback !== null && callback !== undefined && !timeoutFlag) {
                // console.log("LP request", JSON.parse(JSON.stringify(response)), data);
                // callback(response, data);
                // console.log("LP request", JSON.stringify(response), data);
            }
        });
    },
    //https://blogs.sap.com/2014/05/21/how-to-modify-an-apk-file/
    /**
     * 
     * @method pomeloBroadcast
     * @description Pomelo broadcast listener
     * @param {string} address - Pomelo API route
     * @param {method} callback -callback to be execute when the broadcast is fired from server!
     * @memberof Utilities.ServerCom#
     * 
     */
    pomeloBroadcast: function (address, callback) {


        // pomelo.on(address, function (data) {

        //     console.log("%c[broadcast] \n%o", 'color: Green;', data);
        //     if (callback !== null && callback !== undefined) {
        //         callback(data);
        //     }
        // });

        cc.systemEvent.on(address, function (data) {
            console.log("%c[broadcast] \n%o", 'color: Green;', data);
            if (callback !== null && callback !== undefined) {
                if (!data.route) {
                    data.route = address;
                }
                callback(data);
            }
        });
    },

    /**
     * @method updateTracker
     * @description Maintain and track the record of request and their response!
     * @param {boolean} val -status of request whether sent or not
     * @param {String} key - Unique key for each request
     * @param {boolean} showLoading -sets Loading screen either active or De-Active
     * @memberof Utilities.ServerCom#
     */
    updateTracker: function (val, key, showLoading) {
        var incr = val ? +1 : -1;
        this.trackerCount = this.trackerCount + incr;
        if (ServerCom.loading) {
            this.loading.active = val && showLoading;
        }
        if (ServerCom.forceKeepLoading) {
            if (!ServerCom.preLogin.active) {
                this.loading.active = true;
            }
            ServerCom.loading.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
        }
        this.tracker[key] = val;
    },


    /*********************************************************************************************************/
    refreshConnectToServer: function(serverURL, onSuccessCB, onFailCB) {
        console.log('socket.io refreshConnectToServer')
        socketIO.emit("RefreshToken", K.Token.access_token, function(response) {
            console.log(response);
        });
    },

    refreshConnectToPomelo: function(onSuccessCB, onFailCB) {
        console.log('pomelo refreshConnectToServer')
        var data = { access_token: K.Token.access_token };
        // pomelo.request("connector.entryHandler.updateAccessTokenForSession", data, function (response) {
        //     console.log(response);
        // }.bind(this));
    },

    socketIOConnectTable: function(host, accesstoken, channelid, cb) {
        // console.trace("socketIOConnect");
        if (!ServerCom.preLogin.active) {
            // this.loading.active = true;
        }
    },

    clearConnectCB() {
        this.cconnectCB = null;
    },

    socketIOConnect: function(host, cb) {
        if (!ServerCom.preLogin.active) {
            this.loading.active = true;
        }
        ServerCom.loading.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
        this.isLoading = true;
        this.cconnectCB = cb;

        var root = window;
        var socketIO = new window.SocketService();

        if (!cc.sys.isNative) {
            socketIO.io(host, {
                reconnection: false,
                pingTimeout: 500, 
                pingInterval: 100,
                auth: {
                    access_token: K.Token.access_token,
                }
            });
        }
        else {
            socketIO.io(host, {
                // autoConnect: false,
                reconnection: false,
                rejectUnauthorized: false,
                auth: {
                    access_token: K.Token.access_token,
                }
            });
        }
        root.socketIO = socketIO;
        //
        console.log(ServerCom.getFormattedTime(), "Network [connect] Socket", host);
        socketIO.socket.on("connect", (arg) => {
            console.log(ServerCom.getFormattedTime(), "Network [connected] Socket", host);
            GameManager.isSocketIOConnected = true;
            ServerCom.socketConnected = true;
            clearTimeout(this.reconncetTimer);

            ServerCom.reconnecting.active = false;
            this.preLogin.active = false;
            // this.loading.active = false;
            // this.isLoading = false;
            if (this.cconnectCB) {
                this.cconnectCB();
            }
            if (this.socketReconnectedCount > 0) {
                this.socketReconnected = true;
            }
            this.socketReconnectedCount = 0;
            // 
            // GameManager.startRefreshTokenTimer(() => {
            //     console.log("startRefreshTokenTimer");
            //     this.refreshConnectToServer("", () => {}, () => {});
            //     // this.refreshConnectToPomelo();
            // }); 
        });
        socketIO.socket.on("disconnect", (reason) => {
            console.log("disconnect", reason);
            GameManager.isSocketIOConnected = false;
            ServerCom.socketConnected = false;
            ServerCom.socketReconnected = false;
            K.disconnectRequestedByPlayer = false;

            if (K.disconnectMultiLogin) {
                K.disconnectMultiLogin = false
                return;
            }

            if (GameManager.isConnected && this.socketReconnectedCount < this.reconnectMaxAttempts && !this.sessionExpired) {
                this.socketReconnectedCount += 1;
                ServerCom.reconnecting.active = true;
                ServerCom.reconnecting.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
                this.reconncetTimer = setTimeout(function () {
                    console.log("socket retry: ", this.socketReconnectedCount);
                    socketIO.socket.disconnect();
                    socketIO.socket.connect();
                }.bind(this), this.reconnectionDelay);
            }
            else {
                ServerCom.reconnecting.active = false;
                clearTimeout(this.reconncetTimer);
                this.socketReconnectedCount = 0;
                this.preLogin.active = false;
                console.log("socket retry over");
            }
        });
        socketIO.socket.on('connect_error', (error) => {
            console.log("Connect error:", error);
            console.log(JSON.stringify(error));
            console.log(JSON.stringify(error,null));
            GameManager.isSocketIOConnected = false;
            ServerCom.socketConnected = false;
            this.preLogin.active = false;
            ServerCom.loading.active = false;
            ServerCom.reconnecting.active = false;

            GameManager.isConnected = true;
            K.disconnectRequestedByPlayer = false;

            cc.sys.localStorage.setItem("auto_login_token", null);
            cc.sys.localStorage.setItem("auto_login_refresh_token", null);
            cc.sys.localStorage.setItem("auto_login_access_token_expire_at", null);
            cc.sys.localStorage.setItem("auto_login_refresh_token_expire_at", null);
            cc.sys.localStorage.setItem("auto_login_username", null);
            
            if (error.message == "jwt expired" || error.message == "Invalid Session") {
                // this.sessionExpired = true;
                // GameManager.popUpManager.hideAllPopUps();
                // var param = {
                //     code: K.Error.SessionError,
                //     response: "Session error, please reload the game."
                // };
                // GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
            }
            else {
                if (LoginHandler.isLoading) {
                    GameManager.popUpManager.hide(PopUpType.NotificationPopup, function () {});

                    // if (!!GameScreen && GameScreen.tabRetrying) {
                    //     return;
                    // }

                    // console.error("GAME CONNECTED EXCEPTION WHILE LOADING", K.disconnectRequestedByPlayer);
                    if (K.disconnectRequestedByPlayer) {
                        K.disconnectRequestedByPlayer = false;
                    } else {

                        GameManager.popUpManager.show(PopUpType.NotificationPopup, "Please check your\n Internet Connection.", function () {});
                        LoginHandler.isLoading = false;
                    }
                    // console.error("DISCONNECTION RESOLVED AND BOOL IS IS_LOADING", K.disconnectRequestedByPlayer);
                }
                console.log(this.socketReconnectedCount, this.reconnectMaxAttempts);
                ServerCom.loading.active = false;
                // console.log(GameManager.isConnected)
                if (GameManager.isConnected && !GameManager.isSocketIOConnected && this.socketReconnectedCount >= this.reconnectMaxAttempts) {
                    ServerCom.reconnecting.active = false;
                    // console.log("uno 1")
                    GameManager.isConnected = false;
                    var param = {
                        code: K.Error.ConnectionError,
                        response: "Connection error",
                    };
                    GameManager.popUpManager.hideAllPopUps();
                    // if (!!GameScreen && GameScreen.tabRetrying) {
                    //     return;
                    // }
                    // console.error("GAME CONNECTED EXCEPTION", K.disconnectRequestedByPlayer);
                    if (K.disconnectRequestedByPlayer) {
                        ServerCom.launch.active = false;
                        K.disconnectRequestedByPlayer = false;
                    } else {
                        ServerCom.launch.active = false;
                        if ((ScreenManager.currentScreen === K.ScreenEnum.LoginScreen || ScreenManager.currentScreen === K.ScreenEnum.SignupScreen)) {

                        } else {
                            GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
                        }
                    }
                    // console.error("DISCONNECTION RESOLVED AND BOOL IS IS_CONNECTED", K.disconnectRequestedByPlayer);
                }
                else {
                    console.log(this.socketReconnectedCount, this.reconnectMaxAttempts);
                    console.log("GameManager.isConnected", GameManager.isConnected);
                    console.log("this.sessionExpired", this.sessionExpired);
                    if (GameManager.isConnected && this.socketReconnectedCount < this.reconnectMaxAttempts && !this.sessionExpired) {
                        this.socketReconnectedCount += 1;
                        ServerCom.reconnecting.active = true;
                        ServerCom.reconnecting.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
                        this.reconncetTimer = setTimeout(function () {
                            console.log("socket retry: ", this.socketReconnectedCount);
                            socketIO.socket.disconnect();
                            socketIO.socket.connect();
                        }.bind(this), this.reconnectionDelay);
                    }
                    else {
                        ServerCom.reconnecting.active = false;
                        clearTimeout(this.reconncetTimer);
                        this.socketReconnectedCount = 0;
                        this.preLogin.active = false;
                        console.log("socket retry over");

                        var param = {
                            code: K.Error.ConnectionError,
                            response: "Connection error",
                        };
                        GameManager.popUpManager.hideAllPopUps();
                        // if (!!GameScreen && GameScreen.tabRetrying) {
                        //     return;
                        // }
                        // console.error("GAME CONNECTED EXCEPTION", K.disconnectRequestedByPlayer);
                        if (K.disconnectRequestedByPlayer) {
                            K.disconnectRequestedByPlayer = false;
                        } else {
                            if ((ScreenManager.currentScreen === K.ScreenEnum.LoginScreen || ScreenManager.currentScreen === K.ScreenEnum.SignupScreen)) {
                            } else {
                                GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
                            }
                        }
                    }
                }
                if (!GameManager.isConnected && !LoginHandler.isLoading && K.disconnectRequestedByPlayer) {
                    K.disconnectRequestedByPlayer = false;
                    // console.error("DISCONNECTION RESOLVED AND BOOL IS IS_LOADING", K.disconnectRequestedByPlayer);
                }
            }    
        });
        socketIO.onAny((event, ...args) => {
            // if (event != "Tournament:Refresh") {
            // console.log("%c[socketIO/onAny] %s\n%o", 'color: Tomato;', event, args);
            // }

            if (event == "commonEventResponse" && args[0].eventOrigin) {
                cc.systemEvent.emit(args[0].eventOrigin, args[0].data);

                console.log(ServerCom.getFormattedTime(), "Network [onAny] Socket", args[0].eventOrigin, args[0].data);
            }
            else {

                console.log(ServerCom.getFormattedTime(), "Network [onAny] Socket", event, args);

                if (args[0].channelId) {
                    // console.log("!!!!!!!!", args, args[0].channelId);
                    // 668bf41ed55da2200ae8c90e
                    // 0bc6fa18-02b1-4de9-b5ec-cb05daf409dc
                    if (args[0].channelId.length > 30 && args[0].channelId.indexOf("-") != -1) {
                        console.log("!!!!!!!! filter");
                    }
                    else {
                        if (!args[0].eventName) {
                            if (args[0].route && args[0].route == "playerCoins") {
                                cc.systemEvent.emit(args[0].route, args[0].data);
                            }
                        }
                        else {
                            cc.systemEvent.emit(args[0].eventName, args[0].data);
                        }
                    }
                }
                else if (args[0].data && args[0].data.channelId) {
                    cc.systemEvent.emit(args[0].route, args[0].data);
                }
                else if (!args[0].data && event.indexOf('Tournament') != -1) {
                    cc.systemEvent.emit(args[0].eventName, args);
                }
                else if (event == "forcedisconnect") {
                    K.disconnectMultiLogin = true;
                    cc.systemEvent.emit("forcedisconnect", args);
                }
                else if (event == "buddyResponseEvent") {
                    cc.systemEvent.emit("buddyResponseEvent", args[0]);
                }
            }
            // else if (args[0].data.eventName) {
            //     cc.systemEvent.emit(args[0].eventName, args[0].data);
            // }
        });

    },

    socketIORequest: function(address, data, callback, error, timeout, showLoading = true, showError = true, showLabel = "", callback2) {
        var inst = this;
        if (typeof data != 'object') {
            let dat = {};
            dat.data = data;
            data = dat;
        }

        if (!data) {
            data = {};
        }

        if (typeof data == 'object') {
            if (data.isLoggedIn == null || data.isLoggedIn == undefined)
                data.isLoggedIn = true;
            if (data.isLoggedIn) {
                if (!GameManager.isConnected) {
                    inst.emit('error', {
                        code: K.Error.ConnectionError,
                        response: "You are not logged in !!",
                    });
                    return;
                }
            }
        } else {
            if (!GameManager.isConnected) {
                inst.emit('error', {
                    code: K.Error.ConnectionError,
                    response: "You are not logged in !!",
                });
                inst.preLogin.active = false;
                return;
            }
        }

        if (!GameManager.isSocketIOConnected) {
            inst.emit('error', {
                code: K.Error.ConnectionError,
                response: "socket.io connection error",
            });
            
            ServerCom.loading.active = false;
            ServerCom.preLogin.active = false;
            ServerCom.launch.active = false;
            
            return;
        }

        var timeoutFlag = false;
        /* Used only for game request - Start */

        this.tracker = this.tracker || {};
        // var key = "";
        var key = data.channelId || "";
        if (key == "") {
            key = data.tableId || "";
        }
        key = key + address;
        // console.log("%c[R]Request Key: %s", 'color: Purple;', key);
        if (this.tracker[key] !== undefined) {
            if (this.tracker[key]) {
                console.log("false " + key);
                // return;
            } else {
                this.updateTracker(true, key, showLoading, showLabel);
            }
        } else {
            //TODO 
            this.updateTracker(true, key, showLoading, showLabel);
        }
        /** Used only for game request - End */

        var timer = setTimeout(function() {
            // console.log("uno pakda, ", address);
            // inst.emit('error', {
            //     code: K.Error.TimeOutError,
            //     response: "Timeout at " + address
            // });
            // timeoutFlag = true;
            // if (error !== null && error !== undefined) {
            //     error({
            //         code: K.Error.TimeOutError,
            //         response: "Timeout at " + address,
            //     });
            // }

            // reset multi request block
            inst.tracker[key] = false;
            this.updateTracker(false, key, showLoading);

            ServerCom.loading.active = false;
            ServerCom.preLogin.active = false;

        }.bind(this), timeout || 5000); // Discuss timeout

        delete data.isLoggedIn;

        console.log(ServerCom.getFormattedTime(), "Network [REQ] Socket", address, data);
        socketIO.emit(address.split("|")[0], { eventName: address.split("|")[1], data: data},
            function(response) {
                console.log(ServerCom.getFormattedTime(), "Network [RES] Socket", address, response);
                // console.log(JSON.stringify(response));
                // 
                // clearTimeout(timer);
                // reset multi request block
                var respKey = response.channelId || "";
                if (respKey == "") {
                    respKey = response.tableId || "";
                }
                respKey = respKey + address;
                // console.log("Network  %c[R/CB] Key: %s", 'color: Purple;', respKey);
                inst.updateTracker(false, respKey, showLoading, showLabel);
                var isDisplay = (response.isDisplay !== undefined && response.isDisplay !== null) ? response.isDisplay : !response.success;
                var param = {
                    code: K.Error.SuccessFalseError,
                    response: response.info,
                    errorType: response.errorType || "",
                    channelId: response.channelId || "",
                    isRetry: (response.isRetry !== undefined && response.isRetry !== null) ? response.isRetry : false
                };
                if (!response.success) {
                    if (showError && isDisplay) {
                        inst.emit('error', param);
                    }
                    if (error !== null && error !== undefined) {
                        error(param);
                    }
                } else {
                    if (isDisplay) {
                        inst.emit('error', param);
                    }
                }
                if (callback !== null && callback !== undefined && !timeoutFlag) {

                    if ((response.action == "resume" || response.action == "preCheck" || response.action == "sitOut") && response.success) {
                        callback(response, data);
                    }
                    // console.log("LP request", JSON.parse(JSON.stringify(response)), data);
                    // callback(response, data);
                    // console.log("LP request", JSON.stringify(response), data);
                }

                if (callback2 !== null && callback2 !== undefined && !timeoutFlag) {
                    // console.log("LP request", JSON.parse(JSON.stringify(response)), data);
                    callback2(response, data);
                    // console.log("LP request", JSON.stringify(response), data);
                }                
            }
        ).then(data => {
            console.log("then", data);
            clearTimeout(timer);
            if (callback !== null && callback !== undefined && !timeoutFlag) {
                callback(data.data, data);
            }
        });
    },

    socketIOBroadcast: function(address, callback) {
        // console.log("Network [B/ON] Socket", address);
        socketIO.socket.on(address, function(data) {
            if (address != "Tournament:Refresh") {
                console.log(ServerCom.getFormattedTime(), "Network [B/REV] Socket", address, data);
            }
            if (callback !== null && callback !== undefined) {
                callback(data);
            }
        });
    },

    getFormattedTime: function() {
        const now = new Date();
        const now2 = Date.now();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
        return `[${hours}:${minutes}:${seconds}.${milliseconds}/${now2}]`;
    }

});

//user data in getConnector
//remove online players number
//table update relevent broadcasts
//side table broadcasts
