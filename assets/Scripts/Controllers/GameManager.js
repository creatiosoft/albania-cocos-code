/**
 * @namespace Controllers
 */
var root = window;
var userData = require('ResponseTypes').User;
var Emitter = require('EventEmitter');
var AvatarSelection = require('AvatarSelection');
var PopUpType = require('PopUpManager').PopUpType;
var PopUpManager = require('PopUpManager').PopUpManager;
var GameData = require('ResponseTypes').GameData;
var OFCGameData = require('OFCResponseTypes').GameData;
var LoginData = require('PostTypes').Login;
var JoinData = require('PostTypes').JoinChannel;
var changeAvatar = require('ResponseTypes').changeAvatar;
var LoginHandler = require('LoginHandler');
// var BingoNetworkHandler = require('../../BINGO/Scripts/BingoNetworkHandler').BingoNetworkHandler;

// console.log("BingoNetworkHandler", BingoNetworkHandler);
// var popUpManager = require('PopUpManager').PopUpManager;
// var PopUpType = require('PopUpManager').PopUpType;
//var loginStatus = false;

var BuildType = cc.Enum({
    Android : 0,
    iOS : 1,
    Mac : 2,
    WebMobile : 3,
    WebDesktop : 4,
    Windows: 5,
    None: 100,
});

/**
 * @classdesc GameManager class manages the common behaviour/functionality of the game! 
 * @classdesc It manages join/joinSuccess Request, verifyTable and having common function which may be needed any where in the Game Application! 
 * @class GameManager
 * @extends EventEmitter
 * @memberof Controllers
 */
cc.Class({
    extends: Emitter,

    properties: {
        loadingDash: {
            default: null,
            type: cc.Node,
        },
        webViewContainer: {
            default: null,
            type: cc.Node,
        },
        webView: {
            default: null,
            type: cc.WebView,
        },
        activeTables: {
            default: null,
            type: cc.Node,
        },
        avatarDefault: {
            default: null,
            type: cc.SpriteFrame,
        },
        stickerDefault: {
            default: null,
            type: cc.SpriteFrame,
        },
        tableDefault: {
            default: null,
            type: cc.SpriteFrame,
        },
        tableActDefault: {
            default: null,
            type: cc.SpriteFrame,
        },
        tableDeactDefault: {
            default: null,
            type: cc.SpriteFrame,
        },
        tableBgDefault: {
            default: null,
            type: cc.SpriteFrame,
        },
        cardDefault: {
            default: null,
            type: cc.SpriteFrame,
        },
        nop: {
            default: null,
            type: cc.Node,
        },
        nol: {
            default: null,
            type: cc.Node,
        },
        loginHandler: {
            default: null,
            type: LoginHandler,
        },
        user: {
            default: null,
            visible: false,
        },
        gameModel: {
            default: null,
            visible: false,
        },
        activeTableCount: {
            default: 0,
        },
        maxTableCounts: 4,
        deckColor: {
            default: "TwoCardColor",
        },
        tableColor: {
            default: 0,
        },
        avatarImages: {
            default: [],
            type: cc.SpriteFrame,
        },
        stickerImages: {
            default: [],
            type: cc.SpriteFrame,
        },
        tableImages: {
            default: [],
            type: cc.SpriteFrame,
        },
        tabActImages: {
            default: [],
            type: cc.SpriteFrame,
        },
        tabDeactImages: {
            default: [],
            type: cc.SpriteFrame,
        },
        tabActImagesTour: {
            default: [],
            type: cc.SpriteFrame,
        },
        tabDeactImagesTour: {
            default: [],
            type: cc.SpriteFrame,
        },
        tableBgImages: {
            default: [],
            type: cc.SpriteFrame,
        },
        cardBackImages: {
            default: [],
            type: cc.SpriteFrame,
        },
        tableImagesTour: {
            default: [],
            type: cc.SpriteFrame,
        },
        tableBgImagesTour: {
            default: [],
            type: cc.SpriteFrame,
        },
        cardBackImagesTour: {
            default: [],
            type: cc.SpriteFrame,
        },
        sounds: {
            default: [],
            type: cc.AudioClip,
        },
        avatarPool: {
            default: [],
            type: cc.Node,
        },
        avatarPrefab: {
            default: null,
            type: cc.Prefab,
        },
        isRealMoney: false,
        popUpManager: {
            default: null,
            type: PopUpManager,
        },
        isPokerGame: false,
        isConnected: false,
        onlinePlayers: 0,
        isMobile: false,
        isWindows: false,
        isActive: true,
        isJ: true,
        isP: false,
        isSD: false,
        isBB: false,
        isLoaded: false,
        isForceDisconnection: false,
        needResetUser: false,

        lastClickTime: 0,
        clickInterval: 1000,

        hideTime: 0,
        tableStartTime: 0,

        tableImage: 0,
        tableBgImage: 0,
        cardBackImage: 0,

        refreshTokenLock: false,
        refreshTokenCB: null,
        getAllAssets: null,
        buddies: [],
        buddyRequestsSent: [],
        buddyRequestsReceived: [],

        JSprites: {
            default: [],
            type: cc.SpriteFrame
        },
        SDSprites: {
            default: [],
            type: cc.SpriteFrame
        },
        PSprites: {
            default: [],
            type: cc.SpriteFrame
        },
        variableLogos: {
            default: [],
            type: cc.Sprite
        },

        BuildType : {
            get() {
                return BuildType;
            },
            visible : false
        },

        buildType : {
            default : BuildType.None,
            type: BuildType
        },

        _visible : {
            get() {
                let e = this.buildType;
                if(e == BuildType.WebDesktop || e == BuildType.WebMobile) {
                    return true;
                }
                return false;
            }
        },

        isVisibleLogin : {
            default : true,
            visible: function() {
                return this._visible;
            },
            notify(oldValue) {
               this.visibleLogin.active = !oldValue;
               this.invisibleLogin.active = oldValue;
            }
        },

        visibleLogin : {
            default : null,
            type: cc.Node,
            visible : function() {
                return this._visible;
            } 
        },

        invisibleLogin : {
            default : null,
            type : cc.Node,
            visible : function() {
                return this._visible;
            } 
        }
    },

    /**
     * @description Play sound Effects in game
     * @method playSound
     * @param {Number} index -Identifies the sound effect in sounds Array
     * @memberof Controllers.GameManager#
     */
    playSound: function (index) {
        // if (!index)//return temporarily for not playing user turn sound
        //     return;
        // console.log(index, "sound", (!!GameManager.user && !GameManager.user.muteGameSound && ScreenManager.currentScreen != K.ScreenEnum.LoginScreen))
        if (!GameManager.isActive) {
            return;
        }
        if (!!GameManager.user && !GameManager.user.muteGameSound && ScreenManager.currentScreen != K.ScreenEnum.LoginScreen) {
            cc.audioEngine.playEffect(this.sounds[index], false);
        }
    },
    onEventSound: function () {
        this.playSound(K.Sounds.click);

    },

    /**
     * @description Play music in game, Not being used now.
     * @method playMusic
     * @param {bool} flag 
     * @memberof Controllers.GameManager#
     */
    playMusic: function (flag) {
        // if (flag) {
        //     GameManager.getComponent(cc.AudioSource).play();
        // } else {
        //     GameManager.getComponent(cc.AudioSource).stop();
        // }
    },

    _orientationCheck : function() {
        // console.warn("_orientationCheck window", window.innerWidth, window.innerHeight);
        // if (typeof(ScreenManager) != "undefined") {
        //     console.warn("_orientationCheck ScreenManager before", ScreenManager.node.width, ScreenManager.node.height);
        // }
        // this.nop.active = false;
        // this.nol.active = false;

        // if (window.innerHeight > window.innerWidth) {
        //     // p
        //     if (typeof(ScreenManager) != "undefined") {
        //         if (ScreenManager.currentScreen != K.ScreenEnum.GamePlayScreen) {
        //             this.nop.active = true;
        //         }
        //         else {
        //             cc.Canvas.instance.designResolution = new cc.Size(960, 1780);
        //             cc.view.setDesignResolutionSize(960, 1780, cc.ResolutionPolicy.FIX_WIDTH);
        //             this.scheduleOnce(function () {
        //                 // GameScreen.gridParent.getComponent("TableSwiper").restoreEverything(GameScreen.prevSelection);
        //                 for (var i = 0; i < GameScreen.gridParent.children.length; i++) {
        //                     let e = GameScreen.gridParent.children[i];
        //                     e.width = ScreenManager.node.width;
        //                     e.height = ScreenManager.node.height;

        //                     e.getChildByName("GameplayOptions").width = e.width;
        //                     e.getChildByName("GameplayOptions").x = -e.width;

        //                     console.warn("_orientationCheck ScreenManager after", ScreenManager.node.width, ScreenManager.node.height);
        //                 }
        //             }, 0.1);
        //         }
        //     }
        //     else {
        //         this.nop.active = true;
        //     }
        // }
        // else {
        //     // l
        //     if (typeof(ScreenManager) != "undefined") {
        //         if (ScreenManager.currentScreen == K.ScreenEnum.GamePlayScreen) {
        //             this.nol.active = true;
        //         }
        //         else {
        //             cc.Canvas.instance.designResolution = new cc.Size(1920, 1080);
        //             cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.FIX_HEIGHT);
        //         }
        //     }
        //     else {
        //         cc.Canvas.instance.designResolution = new cc.Size(1920, 1080);
        //         cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.FIX_HEIGHT);
        //     }
        // }
        // this.nop.active = false;
        // this.nol.active = false;
    },

    _orientationChange : function(isPotrait) {

        // if (isPotrait) {
        //     cc.Canvas.instance.designResolution = new cc.Size(960, 1780);
        //     cc.view.setDesignResolutionSize(960, 1780, cc.ResolutionPolicy.FIX_WIDTH);
        //     this.scheduleOnce(function () {
        //         // GameScreen.gridParent.getComponent("TableSwiper").restoreEverything(GameScreen.prevSelection);
        //         for (var i = 0; i < GameScreen.gridParent.children.length; i++) {
        //             let e = GameScreen.gridParent.children[i];
        //             e.width = ScreenManager.node.width;
        //             e.height = ScreenManager.node.height;
        //         }
        //     }, 0.01);
        // }
        // else {
        //     cc.Canvas.instance.designResolution = new cc.Size(1920, 1080);
        //     cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.FIX_HEIGHT);
        // }

        // onResize();

        // this._orientationCheck();
    },

    onLoad : function() {
        if(cc.sys.os === cc.sys.OS_WINDOWS && !cc.sys.isBrowser){
            this.isWindows = true;
        }

        cc.debug.setDisplayStats(false);
        //commented by rajat
        // if (cc.sys.os === cc.sys.OS_WINDOWS && !cc.sys.isBrowser) {
        //     cc.view.setResolutionPolicy(cc.ResolutionPolicy.EXACT_FIT);
        // }
        root.GameManager = this;
        root.GameScreen = null;
        GameManager.needResetUser = true;

        GameManager.openedWindow = {};
        GameManager.openedWindow2 = {};

        if (this.isMobile) {
            ServerCom.reconnectMaxAttempts = 3;
        }

        if (K.PORTRAIT) {
            cc.view.on('canvas-resize', () => {
                // this._orientationCheck();
            });

            // this._orientationCheck();
        }

        if (GameManager.isZFold()) {

            cc.find("LobbyHandlerNew", cc.Canvas.instance.node).scale = 0.65;
            cc.find("Popups/Johnny", cc.Canvas.instance.node).scale = 0.8;
            cc.find("Launch", cc.Canvas.instance.node).scale = 0.6;
            cc.find("NewVersionPopup", cc.Canvas.instance.node).scale = 0.8;
            cc.find("Loading", cc.Canvas.instance.node).scale = 0.6;
            cc.find("Reconnecting_Johnny", cc.Canvas.instance.node).scale = 0.6;
            cc.find("LoginPre", cc.Canvas.instance.node).scale = 0.6;
        }
    },



    /**
     * @description Generate avatarPool, Registered broadcast to get information about players.
     * @method init
     * @memberof Controllers.GameManager#
     */
    init: function () {

        ServerCom.httpGetRequest(K.ServerAddress.assets_server + "/getAllAssets", 
            null,
            (response) => {
                console.log("getAllAssets", response);

                this.getAllAssets = response.result;

                this.generateAvatarPool();
                // this.generateStickerPool();

                this.generateTablePool();
                this.generateTableBgPool();
                this.generateCardBackPool();

                this.generateTourTablePool();
                // this.generateTourTableBgPool();
                // this.generateTourCardBackPool();
            }
        );

        // this.manageByGameName();
        // cc.systemEvent.on(K.PomeloAPI.joinChannel, this.onJoinSuccess, this);
        // ServerCom.pomeloBroadcast('room.channelHandler.joinChannelByInvitecode', this.onJoinSuccess.bind(this));

        GameManager.on("onDashboardAddCash", this.onDashboardAddCash.bind(this));
        GameManager.on("enablePageView", this.onEnablePageView.bind(this));
        GameManager.on("disablePageView", this.onDisablePageView.bind(this));
        cc.systemEvent.on("forcedisconnect", this.onForcedisconnect.bind(this));
        ServerCom.pomeloBroadcast("refreshAccessToken", this.onRefreshAccessToken.bind(this));
        ServerCom.pomeloBroadcast("updatePlayerCategory", this.onUpdatePlayerCategory.bind(this));
        ServerCom.pomeloBroadcast(K.PlayerBroadcastRoute.playerInfo, this.onPlayerInfo.bind(this));
        ServerCom.pomeloBroadcast(K.BroadcastRoute.onOnlinePlayers, this.saveOnlinePlayers.bind(this));
        ServerCom.pomeloBroadcast("connector.entryHandler.sendBuddyRequest:receive", this.sendBuddyRequestReceive.bind(this));
        ServerCom.pomeloBroadcast("connector.entryHandler.handleBuddyRequest:receive", this.handleBuddyRequestReceive.bind(this));
        ServerCom.pomeloBroadcast("connector.entryHandler.removeBuddy:receive", this.removeBuddyReceive.bind(this));
        ServerCom.pomeloBroadcast("connector.entryHandler.inviteBuddy:receive", this.inviteBuddyReceive.bind(this));
        ServerCom.pomeloBroadcast("updatePlayerImageInTable", this.updatePlayerImageInTable.bind(this));
        ServerCom.pomeloBroadcast("notice", this.onAdminNotice.bind(this));
        cc.systemEvent.on("buddyResponseEvent", this.buddyResponseEvent.bind(this));
        ServerCom.pomeloBroadcast(K.PlayerBroadcastRoute.connectionAck2, function (response) {

            // console.log("ISCONNECTED ACK DATA ", response);

            if (!!response.data && !!response.data.channelId) {
                GameManager.emit("connectionAcknowledged", response.data.channelId);
            }
            response.data.access_token = K.Token.access_token;

            ServerCom.pomeloRequest(K.PomeloAPI.connectionAck2, {
                playerId: GameManager.user.playerId,
                data: response.data,
                access_token: K.Token.access_token
            }, function (response) {
                // if (response.success) {
                //     // process response
                // }
            }, null, 5000, false);
        });
        ServerCom.pomeloBroadcast(K.BuddyBroadcast.playRequestReceived, function (response) {

            // console.log("playRequestReceived playRequestReceived", response);
            GameManager.popUpManager.show(PopUpType.InviteToPlayPopup, response, function () { });
            // return;
            // if (!!response.data && !!response.data.channelId) {
            //     GameManager.emit("connectionAcknowledged", response.data.channelId);
            // }
            // pomelo.notify(K.PomeloAPI.connectionAck2, {
            //     playerId: GameManager.user.playerId,
            //     data: response.data,
            // });
        });

        // ServerCom.pomeloBroadcast(K.TournamentBroadcastRoute.tournamentGameStart, function (data) {
        //     // data.success = true;
        //     // GameManager.onJoinSuccess(data);
        //     // data.callback = GameManager.onJoinSuccess;
        //     var newData = new JoinData(data);
        //     newData.channelId = "";
        //     //error: newData undefined
        //     newData.channelType = data.tableDetails.channelType;
        //     data.callback = function () {
        //         GameManager.join(newData.tableId, K.PomeloAPI.joinChannel, newData);
        //     };
        //     data.joinData = newData;
        //     GameManager.popUpManager.show(PopUpType.JoinGamePopup, data, function () { });
        // });
        
        ServerCom.pomeloBroadcast(K.BroadcastRoute.autoJoinBroadcast, function (data) {
            var val = (!GameScreen || !GameScreen.node.active) ? true : !GameScreen.isAlreadyJoined(data.channelId);
            // console.log("auto join ", data, val)
            if (val) {
                var newData = new JoinData(data);

                data.callback = function () {
                    if (!!newData.channelId) {
                        newData.tableId = "";
                        let pop = GameManager.join(newData.channelId, K.PomeloAPI.joinChannel, newData);
                        if (pop) {
                            GameManager.emit("openBuyInPopup", data.channelId);
                        }
                    } else {
                        let pop = GameManager.join(newData.tableId, K.PomeloAPI.joinChannel, newData);
                        if (pop) {
                            GameManager.emit("openBuyInPopup", data.channelId);
                        }
                    }

                };
                data.joinData = newData;
                GameManager.popUpManager.show(PopUpType.JoinGamePopup, data, function () { });
            } else {
                if (!!GameScreen && GameScreen.isAlreadyJoined(data.channelId)) {
                    GameManager.emit("openBuyInPopup", data.channelId);
                }
            }
            // GameManager.join(data.channelId, K.PomeloAPI.joinChannel, data);
        });
        // this.getTimeDuration(542537);
        // if (this.isMobile)
        //     this.maxTableCounts = K.MaxTableCountInMobile;
        // else
        //     this.maxTableCounts = K.MaxTableCount;

        // this.maxTableCounts = 2;

        this.playerRequestedToLeaveTable = {};

        // AUto Retry Callbacks
        if (this.isMobile || cc.sys.isNative) {

            // /**
            cc.game.on(cc.game.EVENT_HIDE, function () {
                console.log("cc.game.EVENT_HIDE");
                GameManager.isActive = false;
                GameManager.hideTime = Date.now();
            }.bind(this));
            // window.onfocus = () =>{ console.error('focus');
            cc.game.on(cc.game.EVENT_SHOW, function () {
                // GameManager.isActive = true;
                console.log("cc.game.EVENT_SHOW1");
                // return
                if (GameManager.isActive) {
                    return;
                }
                if (ScreenManager.currentScreen == K.ScreenEnum.LoginScreen ||
                    ScreenManager.currentScreen == K.ScreenEnum.SignupScreen) {
                    return;
                }


                console.log("cc.game.EVENT_SHOW2");
                GameManager.isActive = true;

                // if (cc.sys.isBrowser) {
                //     return;
                // }

                let diff = Date.now() - GameManager.hideTime;
                console.log("cc.game.EVENT_SHOW3", diff);

                if (diff < 5 * 1000) {
                    return;
                }


                if (diff > 1000 * 60 * 30) {
                    console.log("cc.game.EVENT_SHOW4");
                    cc.sys.localStorage.setItem("auto_login_token", null);
                    cc.sys.localStorage.setItem("auto_login_refresh_token", null);
                    cc.sys.localStorage.setItem("auto_login_access_token_expire_at", null);
                    cc.sys.localStorage.setItem("auto_login_refresh_token_expire_at", null);
                    cc.sys.localStorage.setItem("auto_login_username", null);
                    GameManager.isConnected = false;
                    GameManager.popUpManager.hideAllPopUps();
                    var param = {
                        code: K.Error.SessionError,
                        response: "Session expired, please login again."
                    };
                    GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
                    return;
                }

                if (cc.sys.localStorage.getItem("auto_login_token") != null) {
                    let diff2 = Number(cc.sys.localStorage.getItem("auto_login_access_token_expire_at") - Date.now() / 1000);
                    console.log("cc.game.EVENT_SHOW5", diff2);
                    if (diff2 < 60) {
                        cc.sys.localStorage.setItem("auto_login_token", null);
                        cc.sys.localStorage.setItem("auto_login_refresh_token", null);
                        cc.sys.localStorage.setItem("auto_login_access_token_expire_at", null);
                        cc.sys.localStorage.setItem("auto_login_refresh_token_expire_at", null);
                        cc.sys.localStorage.setItem("auto_login_username", null);
                        GameManager.isConnected = false;
                        GameManager.popUpManager.hideAllPopUps();
                        var param = {
                            code: K.Error.SessionError,
                            response: "Session expired, please login again."
                        };
                        GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
                        return;
                    }
                }

                console.log("cc.game.EVENT_SHOW6");
                if (!ServerCom.inGame) {
                    LoginScreen.preLogin.active = false;
                    return;
                }
                console.log("cc.game.EVENT_SHOW7");

                if (diff > 1000 * 30) {
                    console.log("cc.game.EVENT_SHOW8");
                    LoginScreen.preLogin.active = true;
                    LoginScreen.preLogin.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
                    if (GameManager.user && GameManager.user.playerId) {
                        ServerCom.pomeloRequest("connector.entryHandler.disconnectfrombe", {
                            playerId: GameManager.user.playerId,
                            isLoggedIn: false
                        });
                        socketIO.socket.disconnect();
                        socketIO.socket.connect();
                        return;
                    }
                    else {
                        LoginScreen.preLogin.active = false;
                        return;
                    }
                }


                console.log("cc.game.EVENT_SHOW9");
                LoginScreen.preLogin.active = true;
                LoginScreen.preLogin.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();

                console.log("cc.game.EVENT_SHOW10");
                if (this.gameModel.activePokerModels.length > 0) {
                    let reloadFlag = false;
                    for (let index = 0; index < this.gameModel.activePokerModels.length; index++) {
                        let pMod = this.gameModel.activePokerModels[index];
                        // if (pMod.gameData.tableDetails.state === K.GameState.Running) {
                            reloadFlag = true;
                        // }
                    }
                    if (!reloadFlag) {
                        LoginScreen.preLogin.active = false;
                        return;
                    }
                }

                console.log("rajatk",ScreenManager.currentScreen);
                if (ScreenManager.currentScreen == K.ScreenEnum.GamePlayScreen || ScreenManager.currentScreen == K.ScreenEnum.LobbyScreen) {
                    if (window.GameScreen) {
                        // window.GameScreen.node.opacity = 0;
                        LoginScreen.preLogin.active = false;
                        // GameManager.reset();
                    }
                    GameManager.isConnected = false;
                    K.disconnectRequestedByPlayer = true;
                    var ifSettingPopupOpening = GameManager.popUpManager.checkIfPopupTypeActive(PopUpType.GamePreferencesPopup);
                    GameManager.popUpManager.hideAllPopUps();
                    GameManager.popUpManager.hide(PopUpType.DisconnectDialog, function () { });
                    console.log('@@@@@@ LoginScreen.clientInit(true);');
                    LoginScreen.preLogin.active = true;
                    LoginScreen.preLogin.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
                    GameManager.isForceDisconnection = true;
                    // LoginScreen.clientInit(true);

                    ServerCom.pomeloRequest("connector.entryHandler.disconnectfrombe", {
                        playerId: GameManager.user.playerId,
                        isLoggedIn: false
                    });

                    socketIO.socket.disconnect();
                    socketIO.socket.connect();
                    LoginScreen.preLogin.active = true;
                    if (ifSettingPopupOpening) {
                        GameManager.popUpManager.show(PopUpType.GamePreferencesPopup, null, function () { });
                    }

                } else if ((ScreenManager.currentScreen === K.ScreenEnum.LoginScreen || ScreenManager.currentScreen === K.ScreenEnum.SignupScreen) && window.LoginScreen) {
                    GameManager.isConnected = false;
                    K.disconnectRequestedByPlayer = true;
                    GameManager.popUpManager.hide(PopUpType.DisconnectDialog, function () { });
                    window.LoginScreen.clientInit(false, true);
                }
            }.bind(this));
            // };
            // */

            if (GameManager.isMobile) {
                window.BackPressed = {
                    javaCallJs: function(param) {
                        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!! BackPressed", param);
                        if (ScreenManager.currentScreen == K.ScreenEnum.GamePlayScreen) {
                            const text = LocalizedManager.t('TXT_HINT_BACK_LOBBY');
                            GameManager.popUpManager.show(PopUpType.NotificationPopup, text, function () { });
                        } 
                        else if (ScreenManager.currentScreen == K.ScreenEnum.LobbyScreen) {
                            let lobbyPresenter = ScreenManager.screens[ScreenManager.currentScreen];
                            console.log(lobbyPresenter);

                            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!! BackPressed1");

                            // if (lobbyPresenter.loadingDash.active) {
                            //     return;
                            // }

                            if (lobbyPresenter.webViewContainer.x != -10000) {
                                lobbyPresenter.onClose();
                            }
                            else if (lobbyPresenter.lbNode.active) {
                                lobbyPresenter.hideLB();
                            }
                            // else if (lobbyPresenter.privateNode.active) {
                            //     lobbyPresenter.onHidePrivate();
                            //     lobbyPresenter.onHome();
                            // }
                            else if (!lobbyPresenter.scrollViewNode.active && lobbyPresenter.roomTable.scale != 0) {
                                lobbyPresenter.onBackLobby();
                            }
                            else if (lobbyPresenter.cashierTable.active) {
                                lobbyPresenter.onBackLobby2();
                            }
                            else if (lobbyPresenter.tournamentLobbyDetail.active) {
                                // lobbyPresenter.node.parent.getChildByName('Tournament').getChildByName('TournamentBuyin').active = false;
                                lobbyPresenter.tournamentLobbyDetail.active = false;
                            }
                            // else if (lobbyPresenter.tournamentTable.active) {
                            //     // lobbyPresenter.node.parent.getChildByName('Tournament').getChildByName('TournamentBuyin').active = false;
                            //     lobbyPresenter.onBackLobby();
                            // }
                            else {
                                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!! BackPressed33", param);
                                GameManager.popUpManager.show(PopUpType.OnLogOutPopup, false, function () { });
                            }
                        } 
                        else if (ScreenManager.currentScreen == K.ScreenEnum.LoginScreen) {
                            GameManager.popUpManager.show(PopUpType.OnLogOutPopup, true, function () { });
                        } 
                        else if (ScreenManager.currentScreen == K.ScreenEnum.SignupScreen) {

                            ScreenManager.showScreen(K.ScreenEnum.LoginScreen, 10, function () { });
                        } 
                        else if (GameManager.popUpManager.currentPopUp == PopUpType.ForgotPasswordPopUp) {
                            GameManager.popUpManager.hide(PopUpType.ForgotPasswordPopUp, function () { });
                        }
                    },
                    sms: function(text) {
                        console.log("sms", text);
                    }
                }

                cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
                    switch (event.keyCode) {
                        case cc.macro.KEY.back:
                        case cc.macro.KEY.escape:
                            if (ScreenManager.currentScreen == K.ScreenEnum.GamePlayScreen) {
                                const text = LocalizedManager.t('TXT_HINT_BACK_LOBBY');
                                GameManager.popUpManager.show(PopUpType.NotificationPopup, text, function () { });
                            } 
                            else if (ScreenManager.currentScreen == K.ScreenEnum.LobbyScreen) {

                                let lobbyPresenter = ScreenManager.screens[ScreenManager.currentScreen];
                                console.log(lobbyPresenter);

                                // if (lobbyPresenter.loadingDash.active) {
                                //     return;
                                // }

                                if (lobbyPresenter.webViewContainer.x != -10000) {
                                    lobbyPresenter.onClose();
                                }
                                else if (lobbyPresenter.lbNode.active) {
                                    lobbyPresenter.hideLB();
                                }
                                // else if (lobbyPresenter.privateNode.active) {
                                //     lobbyPresenter.onHidePrivate();
                                //     lobbyPresenter.onHome();
                                // }
                                // else if (!lobbyPresenter.scrollViewNode.active && lobbyPresenter.roomTable.scale != 0) {
                                //     lobbyPresenter.onBackLobby();
                                // }
                                else if (lobbyPresenter.cashierTable.active) {
                                    lobbyPresenter.onBackLobby2();
                                }
                                else if (lobbyPresenter.tournamentLobbyDetail.active) {
                                    // lobbyPresenter.node.parent.getChildByName('Tournament').getChildByName('TournamentBuyin').active = false;
                                    lobbyPresenter.tournamentLobbyDetail.active = false;
                                }
                                // else if (lobbyPresenter.tournamentTable.active) {
                                //     // lobbyPresenter.node.parent.getChildByName('Tournament').getChildByName('TournamentBuyin').active = false;
                                //     lobbyPresenter.onBackLobby();
                                // }
                                else {
                                    GameManager.popUpManager.show(PopUpType.OnLogOutPopup, false, function () { });
                                }
                            } 
                            else if (ScreenManager.currentScreen == K.ScreenEnum.LoginScreen) {
                                GameManager.popUpManager.show(PopUpType.OnLogOutPopup, true, function () { });
                            } 
                            else if (ScreenManager.currentScreen == K.ScreenEnum.SignupScreen) {
                                ScreenManager.showScreen(K.ScreenEnum.LoginScreen, 10, function () { });
                            } 
                            else if (GameManager.popUpManager.currentPopUp == PopUpType.ForgotPasswordPopUp) {
                                GameManager.popUpManager.hide(PopUpType.ForgotPasswordPopUp, function () { });
                            }
                        default:
                            break;
                    }
                }.bind(this), this);
            }
        }

        this.registerImageUploadEvents();
    },

    onEnablePageView: function () {
        // if(GameManager.isMobile) {
        //     GameScreen.gridParent.getComponent(cc.PageView)._registerEvent();
        // }
    },
    
    onDisablePageView: function () {
        // if(GameManager.isMobile) {
        //     GameScreen.gridParent.getComponent(cc.PageView)._unregisterEvent();
        // }
    },

    manageByGameName: function () {
        // let l;
        // if (this.isJ) {
        //     l = this.JSprites;
        // } else if (this.isP) {
        //     l = this.PSprites;
        // } else if (this.isSD) {
        //     l = this.SDSprites;
        //     // this.variableLogos[0].node.setScale(2.5, 2.5);
        // }

        // this.avatarImages.push(l[1]); //avatar - logo
        // this.variableLogos[0].spriteFrame = l[0]; //splash
        // if (this.isMobile) {
        //     //login , signup logos
        //     this.variableLogos[1].spriteFrame = this.variableLogos[2].spriteFrame = l[1];
        //     this.variableLogos[3].spriteFrame = l[2];
        //     if (this.isP) {
        //         this.variableLogos[1].node.setScale(2.1, 1.31);
        //         this.variableLogos[2].node.setScale(1.9, 1.1);
        //     }
        // }


    },

    onUpdatePlayerCategory: function(data) {
        GameManager.popUpManager.show(PopUpType.UpdateCategory, data);
    },

    listenPomeloBroadcasts:function() {
        this.gameModel.listenPomeloBroadcasts();
    },

    registerImageUploadEvents: function () {
        // console.log("IMAGE UPLOAD EVENYTS REGISTERED ")

        // Fired when user updates his profile pic, he will need to notifyother running instance of change in profile image
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.profileImageUpdated, function (response) {

            if (response.success && response.code == 200) {
                // console.log("AVATAR BROADCAST RESPONSE ONJ------ ", response)
                var profileData = {
                    query: {
                        playerId: "hsdfhd"
                    },
                    updateKeys: {
                        profileImage: "0",
                    }
                };

                var data = profileData;
                data.query.playerId = GameManager.user.playerId;
                data.updateKeys.profileImage = response.data.url;

                GameManager.user.profileImage = WebImageUpload.base64Data;
                // GameManager.user.urlImg = WebImageUpload.spriteLoaded;
                GameManager.user.urlImg = changeAvatar(response.data.url, GameManager.user);

                // console.log("GAME MANAGER IMAGE LOADED ", GameManager.user.urlImg)
                // console.log("GAME MANAGER IMAGE LOADED IMAGE", GameManager.user.profileImage)

                // GameManager.emit("image-loaded", GameManager.user);

                ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (response2) {
                    // console.log("AVATAR UPLAOD DATA UPDATE PROFILE ", response2);
                    if (response2.success) {
                        // GameManager.user.profileImage = WebImageUpload.base64Data;
                        // GameManager.user.urlImg = WebImageUpload.spriteLoaded;
                        //         GameManager.emit("image-loaded", GameManager.user);

                    }
                }.bind(this));
            }

        }.bind(this));
    },

    /**
     * @description It is used for saving online players
     * @method saveOnlinePlayers
     * @param {Object} playersdata -Object having information/data about players in the game!
     * @memberof Controllers.GameManager#
     */
    saveOnlinePlayers: function (playersdata) {
        this.onlinePlayers = playersdata.data.onlinePlayers;
        GameManager.emit("onlinePlayers", null);
    },

    onRefreshAccessToken: function (response) {
        if (response.data) {
            K.Token.access_token = response.data.access_token;    
        }
        else {
            K.Token.access_token = response.access_token;
        }
    },

    onForcedisconnect: function (response) {
        cc.sys.localStorage.setItem("auto_login_token", null);
        cc.sys.localStorage.setItem("auto_login_refresh_token", null);
        cc.sys.localStorage.setItem("auto_login_access_token_expire_at", null);
        cc.sys.localStorage.setItem("auto_login_refresh_token_expire_at", null);

        var param = {
            code: K.Error.PlayerSessionShiftedOnServer,
            errorType: 9999,
            response: LocalizedManager.t('TXT_LOGGED_IN_OTHER_DEVICE')
        };
        // console.log("SHOWING LOGOUT POPUP WITH PARAM ELSE", param)
        this.popUpManager.hideAllPopUps();
        this.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
    },
    
    /**
     * @description Generate popup to display player information (Broadcast callback);
     * @method onPlayerInfo
     * @param {Object} response -Object/data Received from server via broadcast having information about player(Current User).
     * @memberof Controllers.GameManager#
     */
    onPlayerInfo: function (response) {

        // console.log("PLAYER INFO POPUP ", response);
        GameManager.emit("playerInfo", response);

        if (!!response.serverDown && response.serverDown) {
            var param = {
                code: K.Error.ServerDown,
                response: response.info,
                heading: response.heading,
                preserveState: true,
            };
            this.popUpManager.show(PopUpType.DisconnectDialog, param, function () { });
            return;
        }

        if (!!response.channelId && !!GameScreen && ScreenManager.currentScreen == K.ScreenEnum.GamePlayScreen) {
            for (var index = 0; index < GameScreen.gameModel.activePokerModels.length; index++) {
                // console.log("ACTIVE CHANNELS : -  ", GameScreen.gameModel.activePokerModels[index].gameData.channelId);
                if (response.channelId === GameScreen.gameModel.activePokerModels[index].gameData.channelId) {
                    //In channels popupmanager, at 2nd index PlayerInfoPopup is stored.
                    GameScreen.gameModel.activePokerModels[index].popUpManager.show(2, response, function () { });
                    return;
                }
            }
        }
        this.popUpManager.show(PopUpType.PlayerInfoPopup, response, function () { });
    },

    loadAvatar:function(avatarUrl, cb, index, data) {
        let self = this;
        cc.loader.load(avatarUrl + "", function (err, tex) {
            let poolObject = cc.instantiate(self.avatarPrefab);
            if (!!err) {
                self.avatarImages[index] = self.avatarDefault;
                poolObject.getComponent(AvatarSelection).setAvatarImg(self.avatarImages[index], index);
            } else {
                self.avatarImages[index] = new cc.SpriteFrame(tex);
                poolObject.getComponent(AvatarSelection).setAvatarImg(new cc.SpriteFrame(tex), index);
            }
            poolObject.active = false;
            self.avatarPool.push(poolObject);

            if (cb) {
                cb(index + 1, data);
            }
        });
    },

    loadNext:function(index, data) {
        if (data[index]) {
            let avatarUrl = K.ServerAddress.assets_server_s + data[index].path;
            this.loadAvatar(avatarUrl, this.loadNext.bind(this), index, data);
        }
    },

    loadEmoji:function(avatarUrl, cb, index, data) {
        let self = this;
        cc.loader.load(avatarUrl + "", function (err, tex) {
            if (!!err) {
                self.stickerImages[index] = self.stickerDefault;
                self.stickerImages[index].___id = 1;
                self.stickerImages[index].___data = data[index];
            } else {
                self.stickerImages[index] = new cc.SpriteFrame(tex);
                self.stickerImages[index].___id = data[index]._id;
                self.stickerImages[index].___data = data[index];
            }

            if (cb) {
                cb(index + 1, data);
            }
        });
    },

    loadNextEmoji:function(index, data) {
        if (data[index]) {
            let avatarUrl = K.ServerAddress.assets_server_s + data[index].path;
            this.loadEmoji(avatarUrl, this.loadNextEmoji.bind(this), index, data);
        }
    },

    loadTable:function(avatarUrl, cb, index, data) {
        let self = this;
        cc.loader.load(avatarUrl + "", function (err, tex) {
            if (!!err) {
                self.tableImages[index] = self.tableDefault;
                self.tableImages[index].___id = 0;
                self.tableImages[index].___data = data[index];
                self.tableImages[index].___data.___id = 0;
            } else {
                self.tableImages[index] = new cc.SpriteFrame(tex);
                self.tableImages[index].___id = data[index]._id;
                self.tableImages[index].___data = data[index];
                self.tableImages[index].___data.___id = index;
            }

            if (cb) {
                cb(index + 1, data);
            }
        });
    },

    loadTableAct:function(avatarUrl, cb, index, data) {
        let self = this;
        cc.loader.load(avatarUrl + "", function (err, tex) {
            if (!!err) {
                self.tabActImages[index] = self.tableActDefault;
                self.tabActImages[index].___id = 0;
                self.tabActImages[index].___data = data[index];
                self.tabActImages[index].___data.___id = 0;
            } else {
                self.tabActImages[index] = new cc.SpriteFrame(tex);
                self.tabActImages[index].___id = data[index]._id;
                self.tabActImages[index].___data = data[index];
                self.tabActImages[index].___data.___id = index;
            }

            if (cb) {
                cb(index + 1, data);
            }
        });
    },

    loadTableDeact:function(avatarUrl, cb, index, data) {
        let self = this;
        cc.loader.load(avatarUrl + "", function (err, tex) {
            if (!!err) {
                self.tabDeactImages[index] = self.tableDeactDefault;
                self.tabDeactImages[index].___id = 0;
                self.tabDeactImages[index].___data = data[index];
                self.tabDeactImages[index].___data.___id = 0;
            } else {
                self.tabDeactImages[index] = new cc.SpriteFrame(tex);
                self.tabDeactImages[index].___id = data[index]._id;
                self.tabDeactImages[index].___data = data[index];
                self.tabDeactImages[index].___data.___id = index;
            }

            if (cb) {
                cb(index + 1, data);
            }
        });
    },

    loadTourTable:function(avatarUrl, cb, index, data) {
        let self = this;
        cc.loader.load(avatarUrl + "", function (err, tex) {
            if (!!err) {
                self.tableImagesTour[index] = self.tableDefault;
                self.tableImagesTour[index].___id = 0;
                self.tableImagesTour[index].___data = data[index];
                self.tableImagesTour[index].___data.___id = 0;
            } else {
                self.tableImagesTour[index] = new cc.SpriteFrame(tex);
                self.tableImagesTour[index].___id = data[index]._id;
                self.tableImagesTour[index].___data = data[index];
                self.tableImagesTour[index].___data.___id = index;
            }

            if (cb) {
                cb(index + 1, data);
            }
        });
    },

    loadNextTable:function(index, data) {
        if (data[index]) {
            let avatarUrl = K.ServerAddress.assets_server_s + (GameManager.isMobile ? data[index].path : data[index].pathDesktop);
            this.loadTable(avatarUrl, this.loadNextTable.bind(this), index, data);
        }
    },

    loadNextTableAct:function(index, data) {
        if (data[index]) {
            let avatarUrl = K.ServerAddress.assets_server_s + (data[index].tabActive);
            this.loadTableAct(avatarUrl, this.loadNextTableAct.bind(this), index, data);
        }
    },

    loadNextTableDeact:function(index, data) {
        if (data[index]) {
            let avatarUrl = K.ServerAddress.assets_server_s + (data[index].tabDeactive);
            this.loadTableDeact(avatarUrl, this.loadNextTableDeact.bind(this), index, data);
        }
    },

    loadNextTourTable:function(index, data) {
        if (data[index]) {
            let avatarUrl = K.ServerAddress.assets_server_s + data[index].pathDesktop;
            this.loadTourTable(avatarUrl, this.loadNextTourTable.bind(this), index, data);
        }
    },

    loadTableBg:function(avatarUrl, cb, index, data) {
        let self = this;
        cc.loader.load(avatarUrl + "", function (err, tex) {
            if (!!err) {
                self.tableBgImages[index] = self.tableBgDefault;
                self.tableBgImages[index].___id = 0;
                self.tableBgImages[index].___data = data[index];
                self.tableBgImages[index].___data.___id = 0;
            } else {
                self.tableBgImages[index] = new cc.SpriteFrame(tex);
                self.tableBgImages[index].___id = data[index]._id;
                self.tableBgImages[index].___data = data[index];
                self.tableBgImages[index].___data.___id = index;
            }

            if (cb) {
                cb(index + 1, data);
            }
        });
    },

    loadTourTableBg:function(avatarUrl, cb, index, data) {
        let self = this;
        cc.loader.load(avatarUrl + "", function (err, tex) {
            if (!!err) {
                self.tableBgImagesTour[index] = self.tableBgDefault;
                self.tableBgImagesTour[index].___id = 0;
                self.tableBgImagesTour[index].___data = data[index];
                self.tableBgImagesTour[index].___data.___id = 0;
            } else {
                self.tableBgImagesTour[index] = new cc.SpriteFrame(tex);
                self.tableBgImagesTour[index].___id = data[index]._id;
                self.tableBgImagesTour[index].___data = data[index];
                self.tableBgImagesTour[index].___data.___id = index;
            }

            if (cb) {
                cb(index + 1, data);
            }
        });
    },

    loadNextTableBg:function(index, data) {
        if (data[index]) {
            let avatarUrl = K.ServerAddress.assets_server_s + (GameManager.isMobile ? data[index].path : data[index].pathDesktop);
            this.loadTableBg(avatarUrl, this.loadNextTableBg.bind(this), index, data);
        }
    },

    loadNextTourTableBg:function(index, data) {
        if (data[index]) {
            let avatarUrl = K.ServerAddress.assets_server_s + (GameManager.isMobile ? data[index].path : data[index].pathDesktop);
            this.loadTourTableBg(avatarUrl, this.loadNextTourTableBg.bind(this), index, data);
        }
    },

    loadCardBack:function(avatarUrl, cb, index, data) {
        let self = this;
        cc.loader.load(avatarUrl + "", function (err, tex) {
            if (!!err) {
                self.cardBackImages[index] = self.cardDefault;
                self.cardBackImages[index].___id = 0;
                self.cardBackImages[index].___data = data[index];
                self.cardBackImages[index].___data.___id = 0;
            } else {
                self.cardBackImages[index] = new cc.SpriteFrame(tex);
                self.cardBackImages[index].___id = data[index]._id;
                self.cardBackImages[index].___data = data[index];
                self.cardBackImages[index].___data.___id = index;
            }

            if (cb) {
                cb(index + 1, data);
            }
        });
    },

    loadTourCardBack:function(avatarUrl, cb, index, data) {
        let self = this;
        cc.loader.load(avatarUrl + "", function (err, tex) {
            if (!!err) {
                self.cardBackImagesTour[index] = self.cardDefault;
                self.cardBackImagesTour[index].___id = 0;
                self.cardBackImagesTour[index].___data = data[index];
                self.cardBackImagesTour[index].___data.___id = 0;
            } else {
                self.cardBackImagesTour[index] = new cc.SpriteFrame(tex);
                self.cardBackImagesTour[index].___id = data[index]._id;
                self.cardBackImagesTour[index].___data = data[index];
                self.cardBackImagesTour[index].___data.___id = index;
            }

            if (cb) {
                cb(index + 1, data);
            }
        });
    },

    loadNextCardBack:function(index, data) {
        if (data[index]) {
            let avatarUrl = K.ServerAddress.assets_server_s + data[index].path;
            this.loadCardBack(avatarUrl, this.loadNextCardBack.bind(this), index, data);
        }
    },

    loadNextTourCardBack:function(index, data) {
        if (data[index]) {
            let avatarUrl = K.ServerAddress.assets_server_s + data[index].path;
            this.loadTourCardBack(avatarUrl, this.loadNextTourCardBack.bind(this), index, data);
        }
    },

    /**
     * @description Generate an object pool for Avatar (Sprites) (called from onLoad() method)
     * @method ganerateAvatarPool
     * @memberof Controllers.GameManager#
     */
    generateAvatarPool: function () {
        var poolObject = null;

        let self = this;
        // ServerCom.httpGetRequest(K.ServerAddress.assets_server + "/getAllPlayerAvatar", 
        //     null,
        //     function (response) {
        //         console.log("getAllPlayerAvatar", response);

                let response = this.getAllAssets.getAllPlayerAvatar;
                // self.loadAvatars(response.result);
                let avatarUrl = K.ServerAddress.assets_server_s + response.result[0].path;
                self.loadAvatar(avatarUrl, self.loadNext.bind(self), 0, response.result);
            // }
        // );
    },

    generateStickerPool: function () {
        let self = this;
        // ServerCom.httpGetRequest(K.ServerAddress.assets_server + "/getAllEmojis", 
        //     null,
        //     function (response) {
        //         console.log("getAllEmojis", response);

                // self.loadAvatars(response.result);
                let response = this.getAllAssets.getAllEmojis;
                let avatarUrl = K.ServerAddress.assets_server_s + response.result[0].path;
                self.loadEmoji(avatarUrl, self.loadNextEmoji.bind(self), 0, response.result);
            // }
        // );
    },

    generateTablePool: function () {
        let self = this;
        // ServerCom.httpGetRequest(K.ServerAddress.assets_server + "/getAllTableTheme", 
        //     null,
        //     function (response) {
        //         console.log("getAllTableTheme", response);
                let response = this.getAllAssets.getAllTableTheme;

                let avatarUrl = K.ServerAddress.assets_server_s + (GameManager.isMobile ? response.result[0].path : response.result[0].pathDesktop);
                self.loadTable(avatarUrl, self.loadNextTable.bind(self), 0, response.result);

                // let tabAct = K.ServerAddress.assets_server + (response.result[0].tabActive);
                // self.loadTableAct(tabAct, self.loadNextTableAct.bind(self), 0, response.result);

                // let tabDeact = K.ServerAddress.assets_server + (response.result[0].tabDeactive);
                // self.loadTableDeact(tabDeact, self.loadNextTableDeact.bind(self), 0, response.result);
            // }
        // );
    },

    generateTableBgPool: function () {
        let self = this;
        // ServerCom.httpGetRequest(K.ServerAddress.assets_server + "/getAllGamePlayBG", 
        //     null,
        //     function (response) {
        //         console.log("getAllGamePlayBG", response);
                let response = this.getAllAssets.getAllGamePlayerBG;

                let avatarUrl = K.ServerAddress.assets_server_s + (GameManager.isMobile ? response.result[0].path : response.result[0].pathDesktop);
                self.loadTableBg(avatarUrl, self.loadNextTableBg.bind(self), 0, response.result);
            // }
        // );
    },

    generateCardBackPool: function () {
        let self = this;
        // ServerCom.httpGetRequest(K.ServerAddress.assets_server + "/getAllBackCard", 
        //     null,
        //     function (response) {
        //         console.log("getAllBackCard", response);
                let response = this.getAllAssets.getAllBackCard;

                let avatarUrl = K.ServerAddress.assets_server_s + response.result[0].path;
                self.loadCardBack(avatarUrl, self.loadNextCardBack.bind(self), 0, response.result);
        //     }
        // );
    },


    generateTourTablePool: function () {
        let self = this;
        // ServerCom.httpGetRequest(K.ServerAddress.assets_server + "/getAllTourTableTheme", 
        //     null,
        //     function (response) {
        //         console.log("getAllTourTableTheme", response);
                // let response = this.getAllAssets.getAllTourTableTheme;
                let response = this.getAllAssets.getAllTableTheme;
                let avatarUrl = K.ServerAddress.assets_server_s + response.result[0].pathDesktop;
                self.loadTourTable(avatarUrl, self.loadNextTourTable.bind(self), 0, response.result);
            // }
        // );
    },

    generateTourTableBgPool: function () {
        let self = this;
        // ServerCom.httpGetRequest(K.ServerAddress.assets_server + "/getAllTourGamePlayBG", 
        //     null,
        //     function (response) {
        //         console.log("getAllTourGamePlayBG", response);
                let response = this.getAllAssets.getAllTourGamePlayBG;
                let avatarUrl = K.ServerAddress.assets_server_s + (GameManager.isMobile ? response.result[0].path : response.result[0].pathDesktop);
                self.loadTourTableBg(avatarUrl, self.loadNextTourTableBg.bind(self), 0, response.result);
            // }
        // );
    },

    generateTourCardBackPool: function () {
        let self = this;
        // ServerCom.httpGetRequest(K.ServerAddress.assets_server + "/getAllTourBackCard", 
        //     null,
        //     function (response) {
                // console.log("getAllTourBackCard", response);
                let response = this.getAllAssets.getAllTourBackCard;
                let avatarUrl = K.ServerAddress.assets_server_s + response.result[0].path;
                self.loadTourCardBack(avatarUrl, self.loadNextTourCardBack.bind(self), 0, response.result);
        //     }
        // );
    },

    /**
     * @description Set user data (called from LoginScreen.js/SignupScreen.js)
     * @method setUserData
     * @param {Object} data - Data needed to be stored
     * @memberof Controllers.GameManager#
     */
    setUserData: function (data) {
        // console.log("setting", data)
        if (GameManager.needResetUser) {
            this.user = new userData(data);
            GameManager.needResetUser = false;
        }
        // console.log(this.user)

        // GameManager.preloadWebView();
    },

    /**
     * @description Emits event when a table is opened (Not being used now)
     * @method fireOpenTableEvent
     * @param {Object} channelData
     * @param {String} channel
     * @memberof Controllers.GameManager#
     */
    fireOpenTableEvent: function (channelData, channel) {
        // not used now
        this.emit('OpenTable', channelData, channel);
    },

    /**
     * @description It is used to verify, if table is already in running state for the user!
     * @method verifyTable
     * @param {String} _id -Id of Channel/GameTable
     * @param {boolean} checkExisting - true if needed to show a existing table in the game
     * @param {boolean} checkTournament - check if tournament is running!
     * @memberof Controllers.GameManager#
     */
    verifyTable: function (_id, checkExisting = true, checkTournament = false, isRejoin = false, data = null) {

        if (root.GameScreen != null) {
            if(GameManager.isMobile) {
                GameManager.activeTableCount = root.GameScreen.gridParent.getComponent(cc.PageView).getPages().length;
            }
            else {
                GameManager.activeTableCount = root.GameScreen.gridParent.children.length;
            }
        } 
        // else {
        //     GameManager.activeTableCount = 0;
        // }

        var isExisting = false;
        var indexFound = -1;
        for (var index = 0; index < this.gameModel.activePokerModels.length; index++) {
            var id = this.gameModel.activePokerModels[index].roomConfig._id;
            if (checkTournament)
                id = this.gameModel.activePokerModels[index].roomConfig.tableId;
            if (_id === id) {
                indexFound = index;
                isExisting = true;
            }
        }

        isExisting = isExisting && checkExisting;

        if (isRejoin && isExisting) {
            data.isRejoin = true;
            return true;
        }
        data.isRejoin = false;

        if (isExisting) {
            LoginScreen.preLogin.active = false;
            ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, indexFound, function () { });
            return false;
        }

        // check for live game count
        if (_id === null || _id === undefined) {
            return false;
        }
        if (GameManager.activeTableCount > 0) {
            if (GameManager.activeTableCount >= GameManager.maxTableCounts) {
                GameManager.popUpManager.show(PopUpType.MaxTablesJoinedPopup, null, function () { });
                return false;
            }
            if (K.multiTableJoin) { } else {
                return false;
            }
        }
        return true;
    },

    verifyTablePrivate: function (_id) {

        if (root.GameScreen != null) {
            if(GameManager.isMobile) {
                GameManager.activeTableCount = root.GameScreen.gridParent.getComponent(cc.PageView).getPages().length;
            }
            else {
                GameManager.activeTableCount = root.GameScreen.gridParent.children.length;
            }
        } else {
            GameManager.activeTableCount = 0;
        }

        var isExisting = false;
        var indexFound = -1;
        for (var index = 0; index < this.gameModel.activePokerModels.length; index++) {
            var id = this.gameModel.activePokerModels[index].roomConfig._id;
            if (_id === id) {
                indexFound = index;
                isExisting = true;
            }
        }

        // isExisting = isExisting;
        if (isExisting) {
            ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, indexFound, function () { });
            return false;
        }

        if (GameManager.activeTableCount > 0) {
            if (GameManager.activeTableCount >= GameManager.maxTableCounts) {
                GameManager.popUpManager.show(PopUpType.MaxTablesJoinedPopup, null, function () { });
                return false;
            }
        }
        return true;
    },

    /**
     * @description Time conversion to string in specified format
     * @method getTimeByMilli
     * @param {Number} milli - Value in Milli second
     * @memberof Controllers.GameManager#
     */
    getTimeByMilli: function (milli) {
        var date = new Date(milli);
        return (date.toDateString().split(" ")[1] + " " + date.toDateString().split(" ")[2] + " " + (date.toTimeString().split(" ")[0]).slice(0, date.toTimeString().lastIndexOf(':')));
    },

    /**
     * @description It is used for obtaining the time duration!
     * @method getTimeDuration
     * @param {Number} milli -value in milli second
     * @param {boolean} showSeconds - true if seconds should be considerd in time duration!
     * @memberof Controllers.GameManager#
     */
    getTimeDuration: function (milli, showSeconds = true) {
        var date = new Date();
        milli = parseInt(milli);
        if (date.getTime() < milli) {
            milli = milli - date.getTime();
        }
        var secs = milli / 1000;
        var days = parseInt(secs / 86400);
        secs = secs % 86400;
        var hours = parseInt(secs / 3600);
        secs = secs % 3600;
        var mins = parseInt(secs / 60);
        secs = parseInt(secs % 60);
        var result = "";
        if (days > 0) {
            result += parseInt(days) + " days ";
        }
        if (hours > 0) {
            result += parseInt(hours) + " hours ";
        }
        if (mins > 0) {
            result += parseInt(mins) + " mins ";
        }
        if (showSeconds) {
            result += parseInt(secs) + " secs ";
        }
        return result;
    },

    getMTimeDurationEx: function (milli, showSeconds = true) {
        var date = new Date();
        milli = parseInt(milli);
        if (date.getTime() < milli) {
            milli = milli - date.getTime();
        }
        else {
            milli = 0;
        }
        var secs = milli / 1000;
        var days = parseInt(secs / 86400);
        secs = secs % 86400;
        var hours = parseInt(secs / 3600);
        secs = secs % 3600;
        var mins = parseInt(secs / 60);
        secs = parseInt(secs % 60);
        var result = "";
        result += parseInt(secs).toString().padStart(2, '0');
        return result;
    },

    getMTimeDuration: function (milli, showSeconds = true) {
        var date = new Date();
        milli = parseInt(milli);
        if (date.getTime() < milli) {
            milli = milli - date.getTime();
        }
        else {
            milli = 0;
        }
        var secs = milli / 1000;
        var days = parseInt(secs / 86400);
        secs = secs % 86400;
        var hours = parseInt(secs / 3600);
        secs = secs % 3600;
        var mins = parseInt(secs / 60);
        secs = parseInt(secs % 60);
        var result = "";
        if (days > 0) {
            result += parseInt(days) + ":";
        }
        if (hours > 0) {
            result += parseInt(hours) + ":";
        }
        if (mins > 0 || true) {
            result += parseInt(mins).toString().padStart(2, '0') + ":";
        }
        if (showSeconds) {
            // result += parseInt(secs);
            result += parseInt(secs).toString().padStart(2, '0');
        }
        return result;
    },

    getMTimeDuration2: function (milli, showSeconds = true) {
        var date = new Date();
        milli = parseInt(milli);
        if (date.getTime() < milli) {
            milli = milli - date.getTime();
        }
        else {
            milli = 0;
        }
        var secs = milli / 1000;
        var days = parseInt(secs / 86400);
        secs = secs % 86400;
        var hours = parseInt(secs / 3600);
        secs = secs % 3600;
        var mins = parseInt(secs / 60);
        secs = parseInt(secs % 60);
        var result = "";
        if (days > 0) {
            result += parseInt(days) + ":";
        }
        if (hours > 0) {
            result += parseInt(hours) + ":";
        }
        if (mins > 0 || true) {
            result += parseInt(mins).toString().padStart(2, '0') + ":";
        }
        if (showSeconds) {
            // result += parseInt(secs);
            result += parseInt(secs).toString().padStart(2, '0');
        }
        return result;
    },

    getMTimeDuration3: function (milli, showSeconds = true) {
        var date = new Date();
        milli = parseInt(milli);
        if (date.getTime() > milli) {
            milli = date.getTime() - milli;
        }
        else {
            milli = 0;
        }
        var secs = milli / 1000;
        var days = parseInt(secs / 86400);
        secs = secs % 86400;
        var hours = parseInt(secs / 3600);
        secs = secs % 3600;
        var mins = parseInt(secs / 60);
        secs = parseInt(secs % 60);
        var result = "";
        if (days > 0) {
            result += parseInt(days) + ":";
        }
        if (hours > 0) {
            result += parseInt(hours) + ":";
        }
        if (mins > 0 || true) {
            result += parseInt(mins).toString().padStart(2, '0') + ":";
        }
        if (showSeconds) {
            // result += parseInt(secs);
            result += parseInt(secs).toString().padStart(2, '0');
        }
        return result;
    },

    getTimePassed: function (milli, showSeconds = true) {
        milli = new Date(milli);
        var date = new Date();
        // milli = parseInt(milli);
        if (date.getTime() < milli) {
            return "0 second";
        }
        milli = date.getTime() - milli;
        var secs = milli / 1000;
        var days = parseInt(secs / 86400);
        secs = secs % 86400;
        var hours = parseInt(secs / 3600);
        secs = secs % 3600;
        var mins = parseInt(secs / 60);
        secs = parseInt(secs % 60);
        var result = "";
        if (days > 0) {
            result += parseInt(days) + " days ";
        }
        if (hours > 0) {
            result += parseInt(hours) + " hours ";
        }
        if (mins > 0) {
            result += parseInt(mins) + " mins ";
        }
        // if (showSeconds) {
        //     result += parseInt(secs) + " secs ";
        // }
        if (result == "") {
            result += "Less than 1 min ";
        }
        return result.trim();
    },
    
    getJohnnyTimeDuration: function (milli, showSeconds = true) {
        var date = new Date();
        milli = parseInt(milli);
        if (date.getTime() < milli) {
            milli = milli - date.getTime();
        }
        var secs = milli / 1000;
        var days = parseInt(secs / 86400);
        secs = secs % 86400;
        var hours = parseInt(secs / 3600);
        secs = secs % 3600;
        var mins = parseInt(secs / 60);
        secs = parseInt(secs % 60);
        var result = "";
        if (days > 0) {
            result += parseInt(days) + ":";
        }
        if (hours > 0) {
            result += parseInt(hours) + ":";
        }
        if (mins > 0 || true) {
            result += parseInt(mins).toString().padStart(2, '0') + ":";
        }
        if (showSeconds) {
            // result += parseInt(secs);
            result += parseInt(secs).toString().padStart(2, '0');
        }
        return result;
    },

    /**
     * @description It is called when player joins a table
     * @method join
     * @param {String} _id - Channel_Id
     * @param {String} route -Request/Broadcast route
     * @param {Object} data - Object/data recevied from server
     * @param {callback} onSucess - callback for successful response
     * @param {callback} onFail - callback for response.sucess is false
     * @memberof Controllers.GameManager#
     */
    join: function (_id, route, data, onSuccess, onFail, iterationOfJoinsFromLoginScreen = null, totalJoinsFromLoginScreen = null, isRejoin = false) {
        
        console.trace("onGo join");

        GameManager.iterationOfJoinsFromLoginScreen = iterationOfJoinsFromLoginScreen;
        GameManager.totalJoinsFromLoginScreen = totalJoinsFromLoginScreen;

        if (GameManager.verifyTable(_id, true, data.tableId == _id, isRejoin, data)) {
            onSuccess = onSuccess || (data.isRejoin ? this.onJoinSuccess2 : this.onJoinSuccess);
            onFail = onFail || this.onJoinFail;
            data.playerId = GameManager.user.playerId;
            data.playerName = GameManager.user.userName;
            data.networkIp = LoginData.ipV4Address;
            if (iterationOfJoinsFromLoginScreen != null && iterationOfJoinsFromLoginScreen === 1) {
                GameManager.joinResponseCounter = totalJoinsFromLoginScreen;
                GameManager.joinSuccessResponseCounter = 0;
                GameManager.joinFailResponseCounter = 0;
                GameManager.joinFailResponses = [];
            }
            if (data.isPrivateTable == "true") {
                let privateData = {
                    route: route,
                    data: data,
                    onSuccess: onSuccess,
                    onFail: onFail,
                };
                GameManager.popUpManager.show(PopUpType.EnterPasswordPopup, privateData, function () { });
                return false;
            } else {
                ServerCom.forceKeepLoading = true;
                ServerCom.pomeloRequest(route, data,
                    /*function(response) {
                                   if (response.success) {
                                       GameManager.emit(K.LobbyBroadcastRoute.joinTableList, { channelId: _id });
                                   }
                                   onSuccess(response);
                               }*/
                    onSuccess, onFail, null, false);
                return false;
            }
        } else {
            return true;
        }
    },

    join2: function (_id, route, data) {

        if (!GameManager.isMobile && !K.GoToTable) {
            window.versions.new({
                "name": _id,
                "url": "?GoToTable=1&accesstoken=" + K.Token.access_token + "&channelid=" + _id + "&playerId=" + GameManager.user.playerId + "&playerName=" + GameManager.user.userName + "&networkIp=" + LoginData.ipV4Address + "&realChips=" + GameManager.user.realChips
            });
            return;
        }

        ServerCom.forceKeepLoading = true;
        ServerCom.pomeloRequest(route, data, this.onJoinSuccess.bind(this), this.onJoinFail.bind(this), null, false);
    },

    /**
     * @description It is Called when join method request handled successfully
     * @method onJoinSucess
     * @param {Object} response - Object/Data received from server.
     * @param {Object} data -
     * @memberof Controllers.GameManager#
     */
    onJoinSuccess: function (response, data) {
        // console.error("JOIN SUCESS DATA ", JSON.stringify(data));

        ServerCom.launch.active = false;

        if (GameManager.activeTableCount >= GameManager.maxTableCounts) {
            GameManager.popUpManager.show(PopUpType.MaxTablesJoinedPopup, null, function () { });
            ServerCom.forceKeepLoading = false;
            ServerCom.loading.active = false;
            return;
        }
        if (!!GameManager.iterationOfJoinsFromLoginScreen) {
            GameManager.joinResponseCounter--;
        }

        var isDisplay = (response.isDisplay !== undefined && response.isDisplay !== null) ? response.isDisplay : true;
        if (response.success) {
            // console.error("JOIN SUCESS DATA 2");
            if (!!GameManager.iterationOfJoinsFromLoginScreen) {
                GameManager.joinSuccessResponseCounter++;
            }
            if (response.roomConfig) {
                // GameManager
                if (response.roomConfig.channelVariation === "Open Face Chinese Poker") {
                    response.gameData = new OFCGameData(response);
                } else {
                    response.gameData = new GameData(response);
                }
                response.gameData.channelType = response.roomConfig.channelType;
                // response.roomConfig.isRealMoney = GameManager.isRealMoney == true;
                if (response.roomConfig.channelType == K.ChannelType.Tournament) {
                    response.type = 1;
                    response.roomConfig.isRebuyOpened = ((!!data) && (!!data.isRebuyOpened)) ? data.isRebuyOpened : false;
                }
                // console.error("JOIN SUCESS DATA 3");
                ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, response, function () { });
                return;
            }
            else {
                ServerCom.forceKeepLoading = false;
                ServerCom.loading.active = false;
            }
        } else if (isDisplay) {
            ServerCom.forceKeepLoading = false;
            ServerCom.loading.active = false;
            // console.error("JOIN SUCESS DATA 4");
            if (!!GameManager.iterationOfJoinsFromLoginScreen) {
                GameManager.joinFailResponseCounter++;
                GameManager.joinFailResponses.push(response);
            }

        } else {
            ServerCom.forceKeepLoading = false;
            ServerCom.loading.active = false;
            if (!!GameManager.iterationOfJoinsFromLoginScreen) {
                GameManager.joinFailResponseCounter++;
                GameManager.joinFailResponses.push(response);
            }
            ScreenManager.showScreen(K.ScreenEnum.LobbyScreen, 10, function () { }, false);
        }


        ServerCom.forceKeepLoading = false;
        ServerCom.loading.active = false;

        if (!!GameManager.iterationOfJoinsFromLoginScreen && (!!GameManager.joinResponseCounter == !!0)) {
            if (GameManager.joinSuccessResponseCounter == GameManager.totalJoinsFromLoginScreen) {


            } else if (GameManager.joinSuccessResponseCounter > 0) {
                if (GameManager.joinFailResponses.length == 1) {
                    var param = {
                        code: K.Error.SuccessFalseError,
                        response: GameManager.joinFailResponses[0].info,
                        channelId: GameManager.joinFailResponses[0].channelId || "",
                        isRetry: (response.isRetry !== undefined && response.isRetry !== null) ? response.isRetry : false
                    };
                    ServerCom.emit('error', param);
                } else if (GameManager.joinFailResponses.length > 1) {
                    var param = {
                        code: K.Error.SuccessFalseError,
                        response: GameManager.joinFailResponses[0].info,
                        channelId: GameManager.joinFailResponses[0].channelId || "",
                        isRetry: (response.isRetry !== undefined && response.isRetry !== null) ? response.isRetry : false
                    };
                    ServerCom.emit('error', param);
                }
            } else if (!!GameManager.joinSuccessResponseCounter == !!0) {
                var param = {
                    code: K.Error.SuccessFalseError,
                    response: GameManager.joinFailResponses[0].info,
                    channelId: GameManager.joinFailResponses[0].channelId || "",
                    isRetry: (response.isRetry !== undefined && response.isRetry !== null) ? response.isRetry : false
                };
                // GameManager.emit('error', param);
                ScreenManager.showScreen(K.ScreenEnum.LobbyScreen, 10, function () {
                    ServerCom.emit('error', param);
                }, false);
            }
        }
    },

    onJoinSuccess2: function (response, data) {
        // console.error("JOIN SUCESS DATA ", JSON.stringify(data));

        ServerCom.launch.active = false;

        if (response.success) {
            // console.error("JOIN SUCESS DATA 2");
            if (response.roomConfig) {
                // GameManager
                if (response.roomConfig.channelVariation === "Open Face Chinese Poker") {
                    response.gameData = new OFCGameData(response);
                } else {
                    response.gameData = new GameData(response);
                }
                response.gameData.channelType = response.roomConfig.channelType;
                // response.roomConfig.isRealMoney = GameManager.isRealMoney == true;
                if (response.roomConfig.channelType == K.ChannelType.Tournament) {
                    response.type = 1;
                    response.roomConfig.isRebuyOpened = ((!!data) && (!!data.isRebuyOpened)) ? data.isRebuyOpened : false;
                }
                response.isRejoin = true;

                var indexFound = -1;
                for (var index = 0; index < GameScreen.gameModel.activePokerModels.length; index++) {
                    var id = GameScreen.gameModel.activePokerModels[index].roomConfig._id;
                    if (data.data.roomConfig._id === id) {
                        response.indexFound = index;
                        break;
                    }
                    // else {
                    //     response.indexFound = GameScreen.gameModel.activePokerModels[index].roomConfig.tableId;
                    //     break;
                    // }
                }
                // console.error("JOIN SUCESS DATA 3");
                ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, response, function () { });
                return;
            }
            else {
                ServerCom.forceKeepLoading = false;
                ServerCom.loading.active = false;
            }
        }  
        else {
            console.log("onJoinSuccess2");
        }
    },

    /**
     * @description It is Called when join method request handled successfully
     * @method onJoinFail 
     * @param {Object} response - response received from server
     * @memberof Controllers.GameManager#
     */
    onJoinFail: function (response) {
        ServerCom.launch.active = false;
        ServerCom.forceKeepLoading = false;
        ServerCom.loading.active = false;
        console.log("JOIN FAIL RESPONSE", response);

        if (response.info) {
            GameManager.popUpManager.show(PopUpType.NotificationPopup, response.info, function () { });
        }
    },

    /**
     * @description It enables user to get his preffer seat
     * @method getPreferredSeat
     * @param {Number} maxPlayers - Maximum number of player in a table
     * @memberof Controllers.GameManager#
     */
    getPreferredSeat: function (maxPlayers) {
        var seatId = null;
        switch (maxPlayers) {
            case 2:
                seatId = GameManager.user.seatPreferancesTwo;
                break;
            case 3:
                seatId = 2;
                break;
            case 6:
                seatId = GameManager.user.seatPreferancesSix;
                break;
            case 9:
                seatId = GameManager.user.seatPreferances;
                break;
            default:
                seatId = GameManager.user.seatPreferancesTwo;
                break;
        }
        return seatId;
    },

    /**
     * @description Returns Game name depending on passed value
     * @method getGameTypeByValue
     * @param {Number} val - Numerical value represent turn time!
     * @memberof Controllers.GameManager#
     */
    getGameTypeByValue: function (val) {
        var returnVal = "";
        if (val == 10) {
            returnVal = "Hyper-Turbo";
        } else if (val == 20) {
            returnVal = "Turbo";
        } else if (val == 30) {
            returnVal = "Standard";
        }
        return (returnVal);
    },

    /**
     * @description It removes all the children from an Node
     * @method removeAllChildren
     * @param {Object} contentHolder - Node whose children will be removed
     * @memberof Controllers.GameManager#
     */
    removeAllChildren: function (contentHolder) {
        if (!!contentHolder) {
            var childs = contentHolder.children;
            childs.forEach(function (element) {
                element.destroy();
            }, this);
            // contentHolder.removeAllChildren();
        }
    },

    /**
     * @method getValueByGameType
     * @description Returns gameType/String value in numerical value, represent a turn time!
     * @param {String} gameType - String represent turn speed!
     * @memberof Controllers.GameManager#
     */
    getValueByGameType: function (gameType) {
        var returnVal = null;
        switch (gameType) {
            case "Hyper-Turbo":
                returnVal = 10;
                break;
            case "Turbo":
                returnVal = 20;
                break;
            case "Standard":
                returnVal = 30;
                break;
            default:
                returnVal = 30;
        }
        return (returnVal);
    },

    /**
     * @description  Reset/clear all the  game if any running and fire an event to reset data!
     * @method reset
     * @memberof Controllers.GameManager#
     */
    reset: function () {
        // GameManager.user = null;
        console.log("rajatk to be destroyed GameManager.reset");
        GameManager.activeTableCount = 0;
        TableHandler.joinTableList = [];
        GameManager.emit(K.GameEvents.onReset, null);
        if (!!GameScreen) {
            GameScreen.gameModel.activePokerModels.forEach(function (element) {

                if(GameManager.isMobile) {
                    GameScreen.gridParent.getComponent(cc.PageView).removePage(element.node);
                }
                else {
                    element.node.destroy();
                }
            }, this);
            GameScreen.gameModel.activePokerModels = [];
            if (GameManager.isMobile) {
                this.gameModel.emit("LEAVE FOR TABLE SWIPE");
            }
        }

        this.updateActiveTables();
    },

    /**
     * @description It is used for logging out from game, disconnet the pomelo and request is sent to server!
     * @method logout
     * @memberof Controllers.GameManager#
     */
    logout: function () {
        if (GameManager.isConnected) {
            GameManager.isConnected = false;
            var data = {
                playerId: GameManager.user.playerId,
                isLoggedIn: false
            };
            ServerCom.pomeloRequest(K.PomeloAPI.logout, data, null, null, null, true, true, function (response) {
                K.disconnectRequestedByPlayer = true;
                this.popUpManager.hideAllPopUps();

                cc.systemEvent.emit("leaveLobby");

                GameManager.isLoaded = false;

                cc.sys.localStorage.setItem("auto_login_token", null);
                cc.sys.localStorage.setItem("auto_login_refresh_token", null);
                cc.sys.localStorage.setItem("auto_login_access_token_expire_at", null);
                cc.sys.localStorage.setItem("auto_login_refresh_token_expire_at", null);
                cc.sys.localStorage.setItem("auto_login_username", null);


                ServerCom.inGame = false;
                GameManager.needResetUser = true;
                ServerCom.clearConnectCB();

                let lobbyPresenter = ScreenManager.screens[K.ScreenEnum.LobbyScreen];
                if (lobbyPresenter) {
                    lobbyPresenter.resetPrivateTable();
                    lobbyPresenter.onHidePrivate();
                    lobbyPresenter.friendsNode.active = false;
                    lobbyPresenter.onHome();
                    lobbyPresenter.onCashierGame2();
                }
                
                ScreenManager.showScreen(K.ScreenEnum.LoginScreen, false, function () {
                    if (((!(cc.sys.os === cc.sys.OS_WINDOWS)) || cc.sys.isBrowser) && !!self) {
                        // ServerCom.inGame = false;
                        // self.close();
                    }
                });
            }.bind(this));
        } else {
            this.scheduleOnce(function () {
                // cc.director.loadScene("Login");
                this.popUpManager.hideAllPopUps();

                cc.systemEvent.emit( "leaveLobby");

                if (ScreenManager.currentScreen != K.ScreenEnum.LoginScreen) {
                    ScreenManager.showScreen(K.ScreenEnum.LoginScreen, true, function () {

                        if (((!(cc.sys.os === cc.sys.OS_WINDOWS)) || cc.sys.isBrowser) && !!self) {
                            ServerCom.inGame = true;
                            self.close();
                        }
                    });
                }
            }, 0.5);
        }
        // var customWindow = window.open('', '_blank', '');
        //     customWindow.close();
    },

    logout3: function () {
        K.disconnectRequestedByPlayer = true;
        // pomelo.disconnect();
        //GameManager.isConnected = false;
        this.popUpManager.hideAllPopUps();

        cc.systemEvent.emit("leaveLobby");

        GameManager.isLoaded = false;

        cc.sys.localStorage.setItem("auto_login_token", null);
        cc.sys.localStorage.setItem("auto_login_refresh_token", null);
        cc.sys.localStorage.setItem("auto_login_access_token_expire_at", null);
        cc.sys.localStorage.setItem("auto_login_refresh_token_expire_at", null);
        cc.sys.localStorage.setItem("auto_login_username", null);

        let lobbyPresenter = ScreenManager.screens[K.ScreenEnum.LobbyScreen];
        if (lobbyPresenter) {
            lobbyPresenter.resetPrivateTable();
            lobbyPresenter.onHidePrivate();
            lobbyPresenter.friendsNode.active = false;
            lobbyPresenter.onHome();
            lobbyPresenter.onCashierGame2();
        }

        GameManager.needResetUser = true;

        ScreenManager.showScreen(K.ScreenEnum.LoginScreen, false, function () {
            if (((!(cc.sys.os === cc.sys.OS_WINDOWS)) || cc.sys.isBrowser) && !!self) {
                ServerCom.inGame = true;
                // self.close();
            }
        });
    },
    //window.alert('My Window is closing');

    getToken(userName, password, cb) {
        let inst = this;
        ServerCom.httpPostRequest(K.Token.auth_server, 
            {
                "userName": userName,
                "password": password,
            }, 
            function (response) {
                console.log("getToken", response);
                if (response.status == "success") {
                    K.Token.access_token = response.access_token;
                    K.Token.refresh_token = response.refresh_token;
                    K.Token.access_token_expire_at = response.access_token_expire_at;
                    K.Token.refresh_token_expire_at = response.refresh_token_expire_at;
                    cb(response);
                }
                else {
                    cb(response);
                    // GameManager.popUpManager.show(PopUpType.DisconnectDialog, {
                    //     code: K.Error.Whitelisting,
                    //     response: "Token refresh timeout please relogin."
                    // });
                }
            }
        );
    },

    startRefreshTokenTimer(cb) {
        // console.log("startRefreshTokenTimer");
        this.refreshTokenCB = cb;
        this.unschedule(this.refreshTokenTimer);
        this.schedule(this.refreshTokenTimer, 1);
    },

    stopRefreshTokenTimer() {
        this.refreshTokenCB = cb;
        this.unschedule(this.refreshTokenTimer);
    },

    refreshTokenTimer(dt) {
        let diff = (K.Token.access_token_expire_at - Date.now() / 1000);
        // console.log("refreshTokenTimer", diff);
        if (diff < 30 && !this.refreshTokenLock) {
            // do refresh
            this.refreshTokenLock = true;
            // console.log("refreshTokenrefreshTokenTimerrefreshTokenTimer");
            this.refreshToken();
        }
        else {

        }
    },

    forceRefreshToken(cb) {
        this.refreshTokenLock = true;
        this.refreshToken(cb);
    },

    refreshToken(cb) {
        let inst = this;
        if (K.Token.refresh_token && K.Token.refresh_token != "") {
            ServerCom.httpGetRequest(K.Token.auth_server + "/api/auth/refresh", 
                null,
                function (response) {
                    inst.refreshTokenLock = false;
                    console.log("refreshToken", response);
                    if (response.success) {
                        K.Token.access_token = response.access_token;
                        K.Token.refresh_token = response.refresh_token;
                        K.Token.access_token_expire_at = response.access_token_expire_at;
                        K.Token.refresh_token_expire_at = response.refresh_token_expire_at;

                        cc.sys.localStorage.setItem("auto_login_token", K.Token.access_token);
                        cc.sys.localStorage.setItem("auto_login_refresh_token", K.Token.refresh_token);
                        cc.sys.localStorage.setItem("auto_login_access_token_expire_at", K.Token.access_token_expire_at);
                        cc.sys.localStorage.setItem("auto_login_refresh_token_expire_at", K.Token.refresh_token_expire_at);
                        // cb(response);
                        // 
                        if (inst.refreshTokenCB) {
                            inst.refreshTokenCB();
                        }
                        else if (cb) {
                            cb();   
                        }
                    }
                    else {
                        GameManager.popUpManager.show(PopUpType.DisconnectDialog, {
                            code: K.Error.Whitelisting,
                            response: "Token refresh timeout please relogin."
                        });
                        // cb(response);
                    }
                }
            );
        }
        else {
            this.refreshTokenLock = false;
        }
    },

    joinSimilar() {
        let self = this;
        ServerCom.pomeloRequest(
            'connector.entryHandler.joinSimilarTable', 
            {
                channelId: this.gameModel.activePokerModels[GameScreen.prevSelection].gameData.channelId,
                playerId: GameManager.user.playerId,
                isLoggedIn: true,
                access_token: K.Token.access_token

            }, 
            function (response) {
                console.log(response.similarChannelId);
                // var data = new JoinData(TableContent.prevSelection.channelData);
                var route = K.PomeloAPI.joinChannel;
                GameManager.join2(response.similarChannelId, route, {
                    "channelId": response.similarChannelId, 
                    "isRequested": true,  
                    "channelType": response.similarChannelType,
                    "tableId": '',
                    "playerId": GameManager.user.playerId,
                    "playerName": GameManager.user.userName,
                    "networkIp": LoginData.ipV4Address,
                    'maxPlayers': 5,
                    'isPrivateTable': false
                });
            }
        );
    },

    updateActiveTables() {
        if (!GameScreen || !GameScreen.gridParent) {
            return
        }
        var children = 0;
        if(GameManager.isMobile) {
            children = GameScreen.gridParent.getComponent(cc.PageView).getPages().length;
        }
        else {
            return;
        }

        if (children == 0) {
            this.activeTables.active = false;
        }
        else {
            this.activeTables.children[1].getComponent(cc.Label).string = (children > 1 ? children + " Active Tables" : "1 Active Table");
            this.activeTables.active = true;

        }
    },

    gotoActiveTables() {
        ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, 0, function () { });
    },

    randomPick: function() {
        let array = [
            "Poker is 100% skill and 50% luck.",
            "You call, gonna be all over baby.",
            "Just play every hand, you can't miss them all.",
            "Poker has the feeling of a sport, but you don't have to do push-ups.",
        ];
        return array[Math.floor(Math.random() * array.length)]
    },


    preloadWebView: function() {
        return;
        // if (GameManager.isMobile) {
        //     if (this.isLoaded) {
        //         return;
        //     }
        //     this.isLoaded = true;
        //     this.webViewContainer.active = true;
        //     this.webViewContainer.getComponent(cc.Widget).enabled = false;
        //     // this.webViewContainer.x = -10000;
        //     this.webViewContainer.width = cc.Canvas.instance.node.width + 2;
        //     if (cc.sys.platform == cc.sys.ANDROID) {
        //         // this.webViewContainer.height = cc.Canvas.instance.node.height + 14;
        //     }
        //     else {
        //         // this.webViewContainer.height = cc.Canvas.instance.node.height + 10;
        //     }
        //     // this.webViewContainer.height = cc.Canvas.instance.node.height;
        //     this.webViewContainer.scale = 1;
        //     // this.webViewContainer.x = ScreenManager.node.width + 1;
        //     this.webViewContainer.x = -10000;
        //     this.webView.url = K.ServerAddress.dashboard_server + 'profile?accessToken=' + K.Token.access_token + '&playerId=' + GameManager.user.playerId;

        //     this.webView.setJavascriptInterfaceScheme("mypoker");
        //     this.webView.setOnJSCallback((target, url) => {
        //         this.webViewContainer.x = -10000;
        //         // this.webView.url = "about:blank";
        //     });

        //     // this.webView.node.on('loaded', () => {
        //     //     console.log("loadedloadedloaded");
        //     //     // this.webViewContainer.active = false;
        //     // });

        //     // this.scheduleOnce(() => {
        //     //     // this.loadingDash.active = this.webViewContainer.width / 2 - 1;
        //     //     // this.webViewContainer.active = false;
        //     //     this.webViewContainer.x = 0;
        //     // }, 1);
        // }
        // else {
        //     // window.versions.new({
        //     //     "name": "dashboard",
        //     //     "url": K.ServerAddress.dashboard_server + 'profile?accessToken=' + K.Token.access_token + '&playerId=' + GameManager.user.playerId,
        //     //     "dashboard": true
        //     // })
        // }
    },

    onDashboardAddCash: function() {
        let lobbyPresenter = ScreenManager.screens[K.ScreenEnum.LobbyScreen];
        if (lobbyPresenter) {
            lobbyPresenter.onDashboardAddCash();
        }
        // this.loadingDash.active = true;
        // this.loadingDash.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
        // if (GameManager.isMobile) {
        //     console.log("onDashboardAddCash1");
        //     this.webViewContainer.active = true;
        //     this.webViewContainer.x = -10000;
        //     // this.webView.url = K.ServerAddress.dashboard_server + 'transactions/:deposit?accessToken=' + K.Token.access_token + '&playerId=' + GameManager.user.playerId;
        //     // cc.sys.localStorage.setItem("last", this.webView.url);

        //     this.webView.evaluateJS("window.setAccessToken(\"" + K.Token.access_token + "\");");
        //     this.webView.evaluateJS("window.goToCash();");


        //     this.webView.setJavascriptInterfaceScheme("mypoker");
        //     this.webView.setOnJSCallback((target, url) => {
        //         this.webViewContainer.x = -10000;
        //         // this.webViewContainer.active = false;
        //         // this.webView.url = "about:blank";
        //     });

        //     // this.scheduleOnce(() => {
        //     //     this.loadingDash.active = false;
        //     //     this.webViewContainer.x = 0;
        //     // }, 1);

        //     this.scheduleOnce(() => {
        //         console.log("onDashboardAddCash2");
        //         this.loadingDash.active = false;
        //         this.webViewContainer.x = 0;
        //     }, 0.5);
        // }
        // else {
        //     window.versions.new({
        //         "name": "dashboard",
        //         "url": K.ServerAddress.dashboard_server + 'transactions/:deposit?accessToken=' + K.Token.access_token + '&playerId=' + GameManager.user.playerId,
        //         "dashboard": true
        //     })
        // }
    },

    isZFold: function() {
        var size = cc.size(cc.Canvas.instance.node.width, cc.Canvas.instance.node.height);
        var aspect = size.height / size.width;
        console.log("aspect", aspect);
        if (aspect > 1.5) {
            return false;
        }
        else {
            return true;
        }
    },

    isShorter: function() {
        var size = cc.size(cc.Canvas.instance.node.width, cc.Canvas.instance.node.height);
        var aspect = size.height / size.width;
        console.log("aspect", aspect);
        if (aspect > 1.8) {
            return false;
        }
        else {
            return true;
        }
    },

    friendSendRequst: function(userName, cb) {
        ServerCom.pomeloRequest("connector.entryHandler.sendBuddyRequest", {
            "userName": userName,
            "playerId": GameManager.user.playerId,
            "isLoggedIn": true,
            "access_token": K.Token.access_token
        }, function(response){
            console.log("sendFriendRequest reponse", response);

            // {
            //     "buddyRequest": {
            //         "_id": "67175cbe1e2a8f87a9a7ec95",
            //         "playerIdSend": "2b0eb8a7-8a4c-4223-8b2c-d639609687f2",
            //         "userNameSend": "supersu3",
            //         "profileImagePlayerSend": "undefined",
            //         "playerIdReceive": "32edd33b-d732-474c-b370-d66f9bfb64cd",
            //         "userNameReceive": "supersu4",
            //         "profileImagePlayerReceive": "undefined",
            //         "status": "waiting",
            //         "isCheckReject": false,
            //         "createdAt": 1729584318990
            //     },
            //     "success": true
            // }

            if(response.success) {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, "Your new request has been sent", function () { });
                GameManager.buddyRequestsSent.push(response.buddyRequest);
                if (cb) {
                    cb(response.buddyRequest);
                }
            }
            else {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, response.message, function () { });
            }
        }, null, 5000, false);  
    },

    friendRequstFriends: function(cb) {
        ServerCom.pomeloRequest("connector.entryHandler.myBuddies", {
            "playerId": GameManager.user.playerId,
            "isLoggedIn": true,
            "access_token": K.Token.access_token
        }, function(response){
            console.log("MyBuddies", response);
            if(response.success) {
                GameManager.buddies = response.buddies;
                if (cb) {
                    cb(response);
                }
            }
            else {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, response.message, function () { });
            }
        }, null, 5000, false);  
    },

    friendRequestSent: function(cb) {
        ServerCom.pomeloRequest("connector.entryHandler.listRequestSent", {
            "playerId": GameManager.user.playerId,
            "isLoggedIn": true,
            "access_token": K.Token.access_token
        }, function(response){
            console.log("connector.entryHandler.listRequestSent", response);

            // {
            //     "buddyRequests": [],
            //     "success": true
            // }

            if(response.success) {
                GameManager.buddyRequestsSent = response.buddyRequests;
                if (cb) {
                    cb(response);
                }
            }
            else {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, response.message, function () { });
            }
        }, null, 5000, false);  
    },

    friendRequestReceive: function(cb) {
        ServerCom.pomeloRequest("connector.entryHandler.listRequestReceive", {
            "playerId": GameManager.user.playerId,
            "isLoggedIn": true,
            "access_token": K.Token.access_token
        }, function(response){
            console.log("connector.entryHandler.listRequestReceive", response);
            if(response.success) {
                GameManager.buddyRequestsReceived = response.buddyRequests;
                if (cb) {
                    cb(response);
                }
            }
            else {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, response.message, function () { });
            }
        }, null, 5000, false);  
    },

    friendRequestAccept: function(requestId, cb) {
        ServerCom.pomeloRequest("connector.entryHandler.handleBuddyRequest", {
            "playerId": GameManager.user.playerId,
            "isLoggedIn": true,
            "access_token": K.Token.access_token,
            "requestId": requestId,
            "type": "accept"
        }, function(response){
            console.log("connector.entryHandler.handleBuddyRequest accept", response);
            if(response.success) {
                if (cb) {
                    cb(response);
                }
            }
            else {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, response.message, function () { });
            }
        }, null, 5000, false);  
    },

    friendRequestReject: function(requestId, cb) {
        ServerCom.pomeloRequest("connector.entryHandler.handleBuddyRequest", {
            "playerId": GameManager.user.playerId,
            "isLoggedIn": true,
            "access_token": K.Token.access_token,
            "requestId": requestId,
            "type": "reject"
        }, function(response){
            console.log("connector.entryHandler.handleBuddyRequest reject", response);
            if(response.success) {
                if (cb) {
                    cb(response);
                }
            }
            else {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, response.message, function () { });
            }
        }, null, 5000, false);  
    },

    friendRequestRemove: function(playerIdRemove, cb) {
        ServerCom.pomeloRequest("connector.entryHandler.removeBuddy", {
            "playerId": GameManager.user.playerId,
            "isLoggedIn": true,
            "access_token": K.Token.access_token,
            "playerIdRemove": playerIdRemove
        }, function(response){
            console.log("connector.entryHandler.removeBuddy", response);
            if(response.success) {
                if (cb) {
                    cb(response);
                }
            }
            else {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, response.message, function () { });
            }
        }, null, 5000, false);  
    },

    sendBuddyRequestReceive: function(data) { 
        // {
        //     "buddyRequest": {
        //         "_id": "671771da103fb28c52f8e846",
        //         "playerIdSend": "2b0eb8a7-8a4c-4223-8b2c-d639609687f2",
        //         "userNameSend": "supersu3",
        //         "profileImagePlayerSend": "4",
        //         "playerIdReceive": "32edd33b-d732-474c-b370-d66f9bfb64cd",
        //         "userNameReceive": "supersu4",
        //         "profileImagePlayerReceive": "4",
        //         "status": "waiting",
        //         "isCheckReject": false,
        //         "createdAt": 1729589722956
        //     },
        //     "success": true
        // }

        this.friendRequestReceive(() => {
            GameManager.emit("sendBuddyRequestReceive");
        });
        GameManager.popUpManager.show(PopUpType.NotificationPopup, "New buddy request received", function () { });
    },

    handleBuddyRequestReceive: function(data) { 
        // {
        //     "err": null,
        //     "data": {
        //         "message": "supersu3 has accepted your request",
        //         "success": true
        //     },
        //     "requestedPlayerId": "32edd33b-d732-474c-b370-d66f9bfb64cd",
        //     "eventOrigin": "connector.entryHandler.handleBuddyRequest:receive"
        // }

        this.friendRequstFriends(() => {
            GameManager.emit("handleBuddyRequestReceive");
        });
        GameManager.popUpManager.show(PopUpType.NotificationPopup, data.message, function () { });
    },

    removeBuddyReceive: function(data) { 
        // {
        //     "err": null,
        //     "data": {
        //         "message": "supersu3 has accepted your request",
        //         "success": true
        //     },
        //     "requestedPlayerId": "32edd33b-d732-474c-b370-d66f9bfb64cd",
        //     "eventOrigin": "connector.entryHandler.handleBuddyRequest:receive"
        // }

        this.friendRequstFriends(() => {
            GameManager.emit("removeBuddyReceive");
        });
        // GameManager.popUpManager.show(PopUpType.NotificationPopup, data.message, function () { });
    },

    buddyResponseEvent: function (data) {
        console.log("buddyResponseEvent", data);

        // {
        //     "eventName": "BuddyIsOnline",
        //     "data": {
        //         "success": true,
        //         "requestedTournamentId": null,
        //         "requesterPlayerId": "d884bb8a-997a-4be7-ad87-bd35efb0df65",
        //         "response": {
        //             "playerId": "989510c7-6846-40e3-be6c-84256091e466",
        //             "isOnline": false
        //         }
        //     }
        // }

        if (data.eventName == "BuddyIsOnline") {

            // data.data.response.playerId
            // data.data.response.isOnline

            for (var i = 0; i < GameManager.buddies.length; i++) {
                if (GameManager.buddies[i].playerId == data.data.response.playerId) {
                    GameManager.buddies[i].isOnline = data.data.response.isOnline;
                    break;
                }
            }
            GameManager.emit("BuddyIsOnline");
        }
    },

    inviteBuddyReceive: function(data) { 
        // {
        //     "inviteData": {
        //         "channelId": "6718605255f407a14b718a1e",
        //         "channelName": "pocket holdem",
        //         "channelVariation": "Texas Hold’em",
        //         "smallBlind": 5,
        //         "bigBlind": 10
        //     },
        //     "success": true
        // }

        GameManager.popUpManager.show(PopUpType.InviteToPlayPopup, data.inviteData);
    },

    inviteBuddy: function(data, cb) { 
        ServerCom.pomeloRequest("connector.entryHandler.inviteBuddy", {
            "playerId": GameManager.user.playerId,
            "isLoggedIn": true,
            "access_token": K.Token.access_token,
            "inviteData": data
        }, function(response){
            console.log("connector.entryHandler.removeBuddy", response);
            if(response.success) {
                if (cb) {
                    cb(response);
                }
            }
            else {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, response.message, function () { });
            }
        }, null, 5000, false);  
    },

    isMyFriend: function(playerId) {
        for (var i = 0; i < GameManager.buddies.length; i++) {
            if (GameManager.buddies[i].playerId == playerId) {
                return true;
            }
            else {
                return false;
            }
        }
    },

    isFriendRequestPending: function(playerId) {
        for (var i = 0; i < GameManager.buddyRequestsSent.length; i++) {
            if (GameManager.buddyRequestsSent[i].playerIdReceive == playerId) {
                return true;
            }
            else {
                return false;
            }
        }
    },

    updatePlayerImageInTable: function (data) {
        console.log("updatePlayerImageInTable", data);

        // {
        //     "player": {
        //         "playerId": "989510c7-6846-40e3-be6c-84256091e466",
        //         "imageAvtar": 6
        //     },
        //     "success": true,
        //     "route": "updatePlayerImageInTable"
        // }

        GameManager.emit("updatePlayerImageInTable", data.player);
    },

    getPlayerMute: function(cb) {
        let inst = this;

        ServerCom.pomeloRequest("connector.entryHandler.getPlayerMute", {
            "playerId": GameManager.user.playerId,
            "isLoggedIn": true,
            "access_token": K.Token.access_token,
        }, function(response){
            console.log("connector.entryHandler.getPlayerMute", response);
            if(response.success) {
                inst.playerSettingMute = response.playerSettingMute;
                if (cb) {
                    cb(response);
                }
            }
            else {
            }
        }, null, 5000, false);  
    },

    changePlayerMute: function(playerId, cb) {
        let inst = this;

        ServerCom.pomeloRequest("connector.entryHandler.changePlayerMute", {
            "playerId": GameManager.user.playerId,
            "isLoggedIn": true,
            "access_token": K.Token.access_token,
            "playerIdMute": playerId
        }, function(response){
            console.log("connector.entryHandler.changePlayerMute", response);
            if(response.success) {
                inst.playerSettingMute = response.playerSettingMute;
                if (cb) {
                    cb(response);
                }
            }
            else {
            }
        }, null, 5000, false); 
    },

    isPlayerMute: function(playerId) {
        // [
        //     {
        //         "playerId": "d884bb8a-997a-4be7-ad87-bd35efb0df65",
        //         "playerName": "supersu92",
        //         "mute": false
        //     }
        // ]

        if (GameManager.playerSettingMute && GameManager.playerSettingMute) {
            for (var i = 0; i < GameManager.playerSettingMute.players.length; i++) {
                if (GameManager.playerSettingMute.players[i].playerId == playerId) {
                    return true;
                }
            }
        }

        return false;
    },

    getBankList: function(callback) {
        ServerCom.httpGetRequest(
            "https://auth-api-albaniapoker.creatiosoft.dev/api/deposit/banks",
            null, 
            callback
        );
    },

    createRequest: function(accountHolderName, phoneNumber, productId, bankId, callback) {
        ServerCom.httpPostRequest(
            "https://auth-api-albaniapoker.creatiosoft.dev/api/deposit/request",
            {
                "accountHolderName": accountHolderName,
                "phoneNumber": phoneNumber,
                "productId": productId,
                "bankId": bankId
            }, 
            callback
        );
    },

    getHistory: function(callback) {
        ServerCom.httpGetRequest(
            "https://auth-api-albaniapoker.creatiosoft.dev/api/deposit/history",
            null,
            callback
        );
    },

    onAdminNotice: function(data) {
        GameManager.popUpManager.hide(PopUpType.AdminNoticePopup, function () {});
        GameManager.popUpManager.show(
            PopUpType.AdminNoticePopup, 
            {
                "title": data.heading,
                "content" : data.broadcastMessage
            }, 
            function () {}
        );
    },

    convertChips: function (num) {
        num = Number(num);
        if (num < 1000) {
            let value = num;
            return value % 1 === 0 ? value.toString() : value.toFixed(2).replace(/\.?0+$/, '');
        }
        if (num < 1000000) {
            if (num == 1000) {
                return '1K';
            }
            let value = num / 1000;
            let formatted = value % 1 === 0 ? value.toString() : value.toFixed(2).replace(/\.?0+$/, '');
            return formatted + 'K';
        }
        if (num < 1000000000) {
            if (num == 1000000) {
                return '1M';
            }
            let value = num / 1000000;
            let formatted = value % 1 === 0 ? value.toString() : value.toFixed(2).replace(/\.?0+$/, '');
            return formatted + 'M';
        }
        let value = num / 1000000000;
        let formatted = value % 1 === 0 ? value.toString() : value.toFixed(2).replace(/\.?0+$/, '');
        return formatted + 'B';
    },
});




