var gameModelType = require("GameModel");
var pokerPresenterType = require("PokerPresenter");
var popUpManagerType = require("PopUpManager").PopUpManager;
var abstractScreen = require('AbstractScreen');
var tableTab = require('TableTab');
var SitNGoModelHandler = require('SitNGoModelHandler').SitNGoModelHandler;
var TournamentModelHandler = require('TournamentModelHandler').TournamentModelHandler;
var PopUpType = require('PopUpManager').PopUpType;

var root = window;

/** 
 * @enum {Number} 
 * @description Used to represent Tiled/untiled view 
 * @memberof Screens.Gameplay.GameScreen#
 */
window.LayoutType = new cc.Enum({
    Tiled: 1,
    UnTiled: 2,
});

/**
 * @classdesc Manges the game view, Used on the node where game is instatntiated, Manages size of game during tiled/Untiled view
 * @class GameScreen
 * @extends AbstractScreen
 * @memberof Screens.Gameplay
 */
cc.Class({
    extends: abstractScreen,

    static: {
        PER: 1
    },

    properties: {
        preLogin: {
            default: null,
            type: cc.Node,
        },
        verticleBorder: {
            default: null,
            type: cc.Node,
        },
        horizontalBorder: {
            default: null,
            type: cc.Node,
        },

        gameModel: {
            default: null,
            type: gameModelType,
        },

        popUpManager: {
            default: null,
            type: popUpManagerType,
        },

        sitNGoModelHandler: {
            default: null,
            type: SitNGoModelHandler,
        },

        texasHoldemPrefab: {
            default: null,
            type: cc.Prefab,
        },

        omahaHiLoPrefab: {
            default: null,
            type: cc.Prefab,
        },

        omahaPrefab: {
            default: null,
            type: cc.Prefab,
        },

        ofcPrefab: {
            default: null,
            type: cc.Prefab,
        },

        gridParent: {
            default: null,
            type: cc.Node,
        },

        tableTabs: {
            default: [],
            type: [cc.Node],
        },
        viewType: LayoutType.UnTiled,
        prevSelection: {
            default: null,
        },
        unTiledView: {
            default: null,
            type: cc.Node,
        },
        tiledView: {
            default: null,
            type: cc.Node,
        },
        chatBtn: {
            default: null,
            type: cc.Button,
        },
        isMobile: false,
        isWindows: false,

        preferences: {
            default: null,
            type: cc.Node,
        },
        gridRefreshing: false,
    },
    /**
     * @method onLoad
     * @description Register Event of table close!
     * @memberof Screens.Gameplay.GameScreen#
     */
    onLoad: function () {
        ServerCom.inGame = true;
        this.checkForWindowScene = false;
        if (cc.sys.os === cc.sys.OS_WINDOWS && !cc.sys.isBrowser) {
            this.checkForWindowScene = true;
        }

        root.GameScreen = this;

        GameManager.on(K.GameEvents.OnTableClosed, this.onRemove.bind(this));

        GameManager.on("updateTableBgImage", this.onUpdateTableBgImage.bind(this));
        GameManager.on("showJoinSimlar", this.showJoinSimlar.bind(this));
        GameManager.on("hideJoinSimlar", this.hideJoinSimlar.bind(this));

        if(!GameManager.isMobile && (cc.sys.isBrowser || cc.sys.os === cc.sys.OS_WINDOWS)) {
            cc.view.on('canvas-resize', () => {
                clearTimeout(this.resizeId);
                // this.resizeId = setTimeout(this.refreshGrid(), 100);
            });
        }

        if(GameManager.isMobile) {
            this.gridParent.on('scroll-ended', () => {
                console.log('scroll-ended', this.gridParent.getComponent(cc.PageView).getCurrentPageIndex());
                GameScreen.onTabSelection(this.gridParent.getComponent(cc.PageView).getCurrentPageIndex());
                

                for (var index = 0; index < this.gameModel.activePokerModels.length; index++) {
                    var presenter = this.gameModel.activePokerModels[index].node.children[0].getComponent('PokerPresenter');
                    presenter.gameOptionButton.active = true;
                    if (!presenter.isTournament2) {
                        presenter.gameResultButton.active = true;
                        presenter.gameLeaveButton.active = true;
                    }
                }
            }, this);

            this.gridParent.on('scrolling', () => {

                for (var index = 0; index < this.gameModel.activePokerModels.length; index++) {
                    var presenter = this.gameModel.activePokerModels[index].node.children[0].getComponent('PokerPresenter');
                    presenter.gameOptionButton.active = false;
                    presenter.gameResultButton.active = false;
                    presenter.gameLeaveButton.active = false;
                }

            }, this);
        }
    },

    /**
     * @description Sets tiled view on desktop
     * @method setTiledView
     * @memberof Screens.Gameplay.GameScreen#
     */
    setTiledView: function () {
        if (this.isMobile) {
            return;
        }
        this.viewType = LayoutType.Tiled;
        // this.viewType = LayoutType.UnTiled;
        this.refreshGrid();
    },

    /**
     * @description Sets untiled view
     * @method setUnTiledView
     * @memberof Screens.Gameplay.GameScreen#
     */
    setUnTiledView: function () {
        this.viewType = LayoutType.UnTiled;
        this.refreshGrid();
    },

    /**
     * @description Callback from ScreenManager, check for view and instantiate game!
     * @method onShow
     * @callback show screen callback
     * @memberof Screens.Gameplay.GameScreen#
     * @param {Object} data -Data
     */
    onShow: function (data) {
        this.node.opacity = 255;
        
        this.onUpdateTableBgImage();

        // console.log("onshow called game screen");

        GameManager.playMusic(false);
        if (this.isMobile) {
            this.viewType = LayoutType.UnTiled;
        }
        if (GameManager.isConnected) {
            GameManager.popUpManager.hideAllPopUps();
        }
        if (!isNaN(data)) {
            this.prevSelection = data;
            ServerCom.forceKeepLoading = false;
            ServerCom.loading.active = false;
            return;
        }

        if (data.isRejoin) {
            // this.prevSelection = data;
            GameManager.gameModel.activePokerModels[data.indexFound].presenter.resetGameForReshuffle(true);
            if (GameManager.gameModel.activePokerModels[data.indexFound].resetGameForReshuffle) {
                GameManager.gameModel.activePokerModels[data.indexFound].resetGameForReshuffle();
            }
            GameManager.gameModel.activePokerModels[data.indexFound].initiliazePoker(data);
            // this.refreshGrid();
            ServerCom.preLogin.active = false;
            ServerCom.forceKeepLoading = false;
            ServerCom.loading.active = false;
            return;
        }

        var instance = null;
        var model = null;
        var presenter = null;
        if (data.roomConfig.channelVariation == "Open Face Chinese Poker") {
            instance = cc.instantiate(this.ofcPrefab);
            model = instance.getComponent('OFCModel');
            presenter = instance.children[0].getComponent('OFCPresenter');
        } else {
            instance = cc.instantiate(this.texasHoldemPrefab);
            model = instance.getComponent('PokerModel');
            presenter = instance.children[0].getComponent('PokerPresenter');
        }
        if (data.roomConfig.channelVariation === "Omaha" || data.roomConfig.channelVariation === "Omaha Hi-Lo") {
            model.dummyCardsCount = 4;
        } 
        else if (data.roomConfig.channelVariation === "Omaha 5") {
            model.dummyCardsCount = 5;
        } 
        else if (data.roomConfig.channelVariation === "Omaha 6") {
            model.dummyCardsCount = 6;
        } 
        else if (data.roomConfig.channelVariation === "Mega Hold’em") {
            model.dummyCardsCount = 3;
        } 
        else {
            model.dummyCardsCount = 2;
        }
        presenter.isTournament2 = false;
        if (data.roomConfig.channelType == K.ChannelType.Tournament) {
            this.tournamentModelHandler = new TournamentModelHandler();
            this.tournamentModelHandler.setModel(model);
            this.tournamentModelHandler.setPresenter(presenter);

            presenter.isTournament2 = true;
        }


        if(GameManager.isMobile) {
            this.gridParent.getComponent(cc.PageView).addPage(instance);
        }
        else {
            this.gridParent.addChild(instance);
        }
        
        this.gameModel.addGame(model);
        model.initiliazePoker(data);
        if(GameManager.isMobile) {
            GameManager.activeTableCount = this.gridParent.getComponent(cc.PageView).getPages().length;
        }
        else {
            GameManager.activeTableCount = this.gridParent.children.length;
        }

        this.prevSelection = GameManager.activeTableCount - 1;
        // if (GameManager.isMobile || K.PORTRAIT) {
            // instance.setPosition((GameManager.activeTableCount - 1) * ScreenManager.node.width, 0);

            // this.scheduleOnce(() => {
            instance.width = ScreenManager.node.width;

            // this.scheduleOnce(() => {
            // if( GameManager.user.userName =="zz"|| GameManager.user.userName =="pokerroyal")
            // {
            //     instance.getChildByName("GameplayOptions").getComponent(cc.Widget).alignMode = cc.Widget.AlignMode.ONCE;
            //     let a =  instance.getChildByName("GameplayOptions").getComponentsInChildren(cc.Widget);
            //     a.forEach((elem)=>{
            //         a.alignMode = cc.Widget.AlignMode.ONCE;
            //     },this);
            // } else{
            this.scheduleOnce(() => {

                this.preLogin.active = false;

                // if (K.PORTRAIT) {
                    // this.gridParent.getComponent("TableSwiper").getPositionsForResolution();
                // }
                // else {
                //     instance.getChildByName("GameplayOptions").getComponent(cc.Widget).alignMode = cc.Widget.AlignMode.ONCE;
                //     let a = instance.getChildByName("GameplayOptions").getComponentsInChildren(cc.Widget);
                //     a.forEach((elem) => {
                //         a.alignMode = cc.Widget.AlignMode.ONCE;
                //     }, this);
                // }
            }, 1);
            // }
            //wdiget always once.

            // }, 0.1);
        // }
        this.refreshGrid();
        // console.log("game models...",GameScreen.gameModel.activePokerModels[0].node.children[0].getComponent("PokerPresenter"))
        // var pp = GameScreen.gameModel.activePokerModels[0].node.children[0].getComponent("PokerPresenter");
        //  var playerPresenter = pp.playerHand[pp.getRotatedSeatIndex(pp.model.gameData.tableDetails.currentMoveIndex)];
        //  console.log("Player Presenter is...",playerPresenter)
        // pp.displayMoves(playerPresenter,playerPresenter.playerData.moves);
        model.on(K.PokerEvents.onTurnInOtherRoom, this.onTurn.bind(this));

        GameManager.emit("updateTableImage");
        // this.scheduleOnce(this.refreshGrid(), 0.5).bind(this);

        // Emitting Pre Check Before initializing Data 

        // data.tableDetails.players.forEach(function (element) {
        //     if (element.playerId == GameManager.user.playerId) {
        //         console.error("EMMITING MY PRECHECK LOCALLY", GameManager.user.playerId)
        //         var data = { channelId: element.channelId, playerId: element.playerId, set: element.preCheck, preCheckValue: element.precheckValue, route: "preCheck" }
        //         model.emit(K.PokerEvents.onPreCheck, data);
        //     }
        // }, this);

        // if (K.PORTRAIT) {
        //     // GameManager._orientationChange(true);
        //     GameManager._orientationCheck();
        // }

        ServerCom.forceKeepLoading = false;
        ServerCom.loading.active = false;
    },

    /**
     * @description Life cycle call back dummy as of now
     * @method start
     * @memberof Screens.Gameplay.GameScreen#
     */
    start: function () { },

    /**
     * @description Stops playing sound effects 
     * @method onHide
     * @callback Hide screen callback
     * @memberof Screens.Gameplay.GameScreen#
     */
    onHide: function () {
        if (!!GameManager.user)
            GameManager.playMusic(!GameManager.user.muteGameSound);

    },

    /**
     * @description Updates pokermodel on  player's turn and show notification if game in tiled mode and It's User's Turn!
     * @method onTurn
     * @callback Player turn callback
     * @memberof Screens.Gameplay.GameScreen#
     * @param {Object} pokerModel -current poker model
     * @param {boolean} selfTurn -Specify it is my player's turn!
     */
    onTurn: function (pokerModel, selfTurn) {
        // console.log(cc.isValid(pokerModel));
        // console.log(pokerModel.K);
        //error here need to resolve
        if (this.viewType == LayoutType.UnTiled) {
            var pokerModelIndex = -1;
            for (var index = 0; index < this.gameModel.activePokerModels.length; index++) {
                if (pokerModel === this.gameModel.activePokerModels[index]) {
                    pokerModelIndex = index;
                    break;
                }
            }
            //Will not be activated if only one table is joined.
            if (this.tableTabs[pokerModelIndex] != undefined) {

                if (selfTurn && this.gameModel.activePokerModels.length > 1) {
                    this.tableTabs[pokerModelIndex].getComponent(tableTab).showAlert(selfTurn);

                    if (GameManager.isMobile) {
                        // GameScreen.gridParent.getComponent(cc.PageView).scrollToPage(pokerModelIndex, 0);
                        if (pokerModelIndex != this.prevSelection) {
                            GameScreen.onTabSelection(pokerModelIndex);
                        }
                    }
                }
                else if (!selfTurn && this.gameModel.activePokerModels.length >= 1) {
                    this.tableTabs[pokerModelIndex].getComponent(tableTab).showAlert(selfTurn);
                }
            }
        } else {
            if (selfTurn && this.gameModel.activePokerModels.length > 1) {
                // pokerModel.node.runAction(cc.blink(0.2, 9));
                // pokerModel.node.runAction(cc.blink(0.2, 5).easing(cc.easeBackInOut()));
                // setTimeout(function () {
                //     // console.log("opacity stored");
                //     pokerModel.node.opacity = 255;
                // }, 220);
                this.shakeScreen(pokerModel.node);
            }
        }

    },

    /**
     * @description Realign gameplay view when player leaves a table
     * @method onRemove
     * @param {Object} pokerModel - Reference of poker model!
     * @memberof Screens.Gameplay.GameScreen#
     */
    onRemove: function (pokerModel) {
        // TODO: listen event
        // TODO: destroy object
        if (K.GoToTable) {
            window.close();
        }
        else {
            this.refreshGrid();
        }
    },

    /**
     * @description Set scale for any children
     * @method setScale
     * @memberof Screens.Gameplay.GameScreen#
     * @param {Number} scale -scale value!
     * @param {String} name - child node name!
     * @param {number} scaleY -default value -1
     */
    setScale: function (scale, name, scaleY = -1) {
        var children = null;
        if(GameManager.isMobile) {
            children = this.gridParent.getComponent(cc.PageView).getPages().length;
        }
        else {
            children = this.gridParent.children.length;
        }
        children.forEach(function (element) {
            // element = element.children[0];
            var target = element.getChildByName(name);
            if (!!target) {
                target.scale = scale;
                if (!!target) {
                    target.scale = scale;
                    if (scaleY != -1) {
                        target.scaleY = scaleY;
                    }
                }
            } else { }
        }, this);
    },

    /**
     * @description Hack for using widget inside layout(turn on only when required)
     * @method switchWidgets
     * @memberof Screens.Gameplay.GameScreen#
     * @param {boolean} toState - boolean value to switch widgets for tiled and untiled view!
     */
    switchWidgets: function (toState) {
        var children = null;
        if(GameManager.isMobile) {
            children = this.gridParent.getComponent(cc.PageView).getPages().length;
        }
        else {
            children = this.gridParent.children.length;
        }
        if (!GameManager.isMobile) {
            children.forEach(function (element) {
                element.getComponent(cc.Widget).enabled = toState;
            }, this);
        }

        this.unTiledView.active = toState;
        this.tiledView.active = !toState;
        for (var i = 0; i < this.gameModel.activePokerModels.length; i++) {
            var component = null;
            if (this.gameModel.activePokerModels[i].roomConfig.channelVariation == "Open Face Chinese Poker") {
                component = "OFCPresenter";
            } else {
                component = "PokerPresenter";
            }
            this.gameModel.activePokerModels[i].node.children[0].getComponent(component).setTiledView(!toState);
        }
        if (!this.isMobile) {
            // this.repositionPlayerInput(!toState);
            this.repositionHandStrength(!toState);
        }

    },

    /**
     * @description Redraws grid size based on game count 
     * @method refreshGrid 
     * @memberof Screens.Gameplay.GameScreen#
     */
    refreshGrid: function () {

        GameManager.updateActiveTables();

        // this.viewType = LayoutType.UnTiled;
        // console.log("***********refresh grid*************");
        // this.gameModel.presenter.playerHand[3].setBetPosition(500,500);
        // for (let i = 0; i < GameManager.activeTableCount; i++) {
        //     // console.log("inside", i);
        //     this.gameModel.activePokerModels[i].presenter.playerHand[3].setBetPosition(500,500);
        // }

        if (ScreenManager.currentScreen != K.ScreenEnum.GamePlayScreen) {
            console.log("TableSwiper refreshGrid 1");
            return;
        }
        console.log("TableSwiper refreshGrid 2");
        this.gridRefreshing = true;
        this.node.opacity = 0;

        if(GameManager.isMobile) {
            GameManager.activeTableCount = this.gridParent.getComponent(cc.PageView).getPages().length;
        }
        else {
            GameManager.activeTableCount = this.gridParent.children.length;
        }

        if (this.isMobile || this.isWindows) {
            this.viewType = LayoutType.UnTiled;
        }
        var layout = this.gridParent.getComponent(cc.Layout);
        for (var k = 0; k < GameManager.activeTableCount; k++) {
            if (!!this.gameModel.activePokerModels[k])
                this.gameModel.activePokerModels[k].node.active = false;
        }
        for (var j = 0; j < this.tableTabs.length; j++) {
            this.tableTabs[j].active = false;
        }
        if (this.prevSelection == null || ((this.prevSelection == GameManager.activeTableCount) && GameManager.activeTableCount > 0)) {
            this.prevSelection = GameManager.activeTableCount - 1;
        }
        if (this.viewType == LayoutType.UnTiled || (this.viewType == LayoutType.Tiled && GameManager.activeTableCount == 1)) {
            this.setViewForOneTable();
        }
        // this.scheduleOnce(function () {
            if(GameManager.isMobile) {
                GameManager.activeTableCount = this.gridParent.getComponent(cc.PageView).getPages().length;
            }
            else {
                GameManager.activeTableCount = this.gridParent.children.length;
            }
            this.gridRefreshing = false;

            var screenSize = cc.size(this.gridParent.width, this.gridParent.height);
            // if (!GameManager.isMobile) {
            //     layout.active = true;
            // }
            for (var k = 0; k < GameManager.activeTableCount; k++) {
                let model = this.gameModel.activePokerModels[k];
                if(!!model && cc.isValid(model.node)){
                    model.node.active = true;
                }
            }
            //Tanuj
            this.viewType == LayoutType.UnTiled
            // if (this.viewType == LayoutType.Tiled) {
            //     // console.log(" refreshgrid untile====> tile change", GameManager.activeTableCount);

            //     if (this.gameModel.activePokerModels.length > 1) {
            //         for (let i = 0; i < GameManager.activeTableCount; i++) {
            //             // console.log("insideTiled", i);
            //             this.gameModel.activePokerModels[i].presenter.onViewChangedToTiled();
            //         }
            //     }

            //     switch (GameManager.activeTableCount) {
            //         case 0:
            //             ScreenManager.showScreen(K.ScreenEnum.LobbyScreen, 10, function () { }, false);
            //             break;
            //         case 1:
            //             if (!!this.horizontalBorder && !!this.verticleBorder) {
            //                 this.horizontalBorder.active = false;
            //                 this.verticleBorder.active = false;
            //             }
            //             layout.cellSize = screenSize;
            //             this.scaleGroup(1, 1, 1, 1, 1, 1, 1, 1, true);
            //             // this.onTabSelection(this.prevSelection);

            //             break;
            //         case 2:
            //             layout.cellSize = cc.size(parseInt(screenSize.width / 2), screenSize.height);
            //             if (!!this.horizontalBorder && !!this.verticleBorder) {
            //                 this.verticleBorder.active = true;
            //                 this.horizontalBorder.active = false;
            //             }
            //             this.manageButtonsInTwoTable();
            //             this.scaleGroup(0.56, 0.51, 0.9, 0.7, 0.5, 0.9, 0.7, 0.7, false);
            //             break;
            //         case 3:
            //         case 4:
            //             if (!!this.horizontalBorder && !!this.verticleBorder) {
            //                 this.horizontalBorder.active = true;
            //                 this.verticleBorder.active = true;
            //             }
            //             layout.cellSize = cc.size(parseInt(screenSize.width / 2), parseInt(screenSize.height / 2));
            //             this.manageButtonsInFourTable();
            //             this.scaleGroup(0.5, 0.51, 0.5, 0.5, 0.5, 0.9, 0.53, 0.5, false);
            //             break;
            //         case 5:
            //         case 6:
            //             layout.cellSize = cc.size(parseInt(screenSize.width / 3), parseInt(screenSize.height / 2));
            //             this.scaleGroup(0.33, 0.4, 0.33, 0.4, 0.4, 0.4, 0.4, 0.4, false);
            //             break;
            //         default:
            //             break;
            //     }
            // } 
            // else 
            // if (this.viewType == LayoutType.UnTiled) {
                // console.log("rajatk", GameManager.activeTableCount)
                if (GameManager.activeTableCount == 0) {
                    ScreenManager.showScreen(K.ScreenEnum.LobbyScreen, 10, function () { }, false);
                } else {
                    // if (!GameManager.isMobile) {
                    //     layout.active = false;
                    //     layout.cellSize = screenSize;
                    // }
                    // if (GameScreen.isMobile && (cc.sys.browserType == cc.sys.BROWSER_TYPE_SAFARI || cc.sys.platform == cc.sys.IPAD)){
                    //     this.scaleGroup(1, 1, 1, 1, 1, 1, 1, 1, true);
                    // }
                    // else if (!GameManager.isMobile) {

                    //     // console.log(" refreshgrid tile====> untile", GameManager.activeTableCount);
                    //     // if (this.gameModel.activePokerModels.length > 1) {
                    //     //     for (let i = 0; i < GameManager.activeTableCount; i++) {
                    //     //         // console.log("inside", i);
                    //     //         this.gameModel.activePokerModels[i].presenter.onViewChangedToUnTiled();
                    //     //     }
                    //     // }
                    //     this.scaleGroup(1, 1, 1, 1, 1, 1, 1, 1, true);
                    // }

                    this.scaleGroup();
                    this.onTabSelection(this.prevSelection);
                }
            // }
            this.node.opacity = 255;
            GameScreen.node.emit("grid-refreshed");
        // });
    },

    /**
     * @description set view when the selection is unTiled!
     * @method setViewForOneTable
     * @memberof Screens.Gameplay.GameScreen#
     */
    setViewForOneTable: function () {

        // console.log("Set view for one table called...")

        //For Tile View
        // console.log("active tables", GameManager.activeTableCount);
        // console.log(GameManager.activeTableCount == 1, !GameManager.isMobile, !GameManager.isWindows, GameScreen.viewType == 1);
        if (GameManager.activeTableCount == 1 && !GameManager.isMobile && !GameManager.isWindows) {
            var presenter = this.gameModel.activePokerModels[0].presenter;
            if (GameScreen.viewType == 1) {
                presenter.onViewChangedToUnTiled();
            } else {
                // presenter.onViewChangedToUnTiled();
            }
        }

        //for untile view

        var tabInstance, tableTabComp;
        for (var i = 0; i < GameManager.activeTableCount; i++) {
            tabInstance = this.tableTabs[i]; //cc.instantiate(this.tableTabPrefab);
            tabInstance.active = true;
            // this.tabContainer.addChild(tabInstance);
            tableTabComp = tabInstance.getComponent(tableTab);
            tableTabComp.tabId = i;
            tableTabComp.removeAllListeners();
            tableTabComp.showAlert(false);
            tableTabComp.on(K.PokerEvents.onTableTabSelected, this.onTabSelection.bind(this));
            tableTabComp.setModel(this.gameModel.activePokerModels[i]);
            this.tableTabs[i] = tabInstance;
        }
    },

    /**
     * @description Used for scaling when layout changes from tiled to untiled or vice versa
     * @method scaleGroup
     * @memberof Screens.Gameplay.GameScreen#
     * @param {Number} factor1 - scale factor
     * @param {boolean} switchWidg -boolean value to switch widgets for tiled and untiled view!
     */
    // scaleGroup: function (factor1, factor2, factor3, factor4, factor5, factor6, factor7, factor8, switchWidg) {
    //     var size = cc.size(this.gridParent.width, this.gridParent.height);
    //     var count = 1;
    //     if (this.viewType == LayoutType.Tiled) {
    //         count = GameManager.activeTableCount;
    //     }

    //     var per = 1;
    //     if (GameScreen.isMobile && cc.sys.browserType !== cc.sys.BROWSER_TYPE_SAFARI) {
    //         // per = 1.2;
    //     }

    //     var aspect = size.width / size.height;
    //     var diff = 1.77 - aspect;
    //     if (diff >= 0) {
    //         per = (1 - diff / aspect);
    //     }


    //     // if (aspect >= 1) {
    //     //     // wide
    //     //     1               ?
    //     //             = 
    //     //     1.77            aspect
    //     // }
    //     // else {
    //     //     // thin
    //     // }

    //     if (diff < 0) {
    //         // per = aspect / 1.77 * 0.78;
    //     }
    //     else {
    //         per = aspect / 1.77 * 0.95;
    //     }


    //     console.log("aspect, diff, per ==> ", aspect, diff, per);

    //     // cc.log("per", per);
    //     // GameScreen.PER = per;
    //     // if mobile then do not scale need to test impact on every platform.

    //     // console.log("PLATFORM NAME ",  cc.sys.IPAD);
    //     // console.log("PLATFORM NAME ",  cc.sys.IPHONE);
    //     // console.log("Running PLATFORM NAME ",  cc.sys.platform);
    //     // console.log("Running PLATFORM NAME BROWSER ",  cc.sys.DESKTOP_BROWSER);

    //     //     console.log("OS NAME ", cc.sys.os);


    //     ////**********************    
    //     /*
    //     Checks for Tablets(ANDROID ONLY) are required to implement.
    //     */
    //     if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
    //         // console.log("Mobile Detected : - ", cc.sys.os);
    //         // console.log("Mobile Detected number : - ", cc.sys.IPHONE);
    //         if (cc.sys.platform == cc.sys.IPHONE) {
    //             // console.log("IPAD Detected PLATFORM IS : - ", cc.sys.platform);
    //             this.setScale(1, "PokerPresenter");
    //         } else if (cc.sys.platform == cc.sys.IPAD) {
    //             // console.log("Mobile Detected PLATFORM IS : - ", cc.sys.platform);
    //             this.setScale(factor1 * per, "PokerPresenter");
    //             // this.setScale(factor1 * per + 0.1, "PokerPresenter"); // Readjusting by .2 for IPAD devices
    //             // this.setScale(1, "PokerPresenter");
    //         } else if (cc.sys.platform == cc.sys.ANDROID) {
    //             this.setScale(1, "PokerPresenter");
    //         }

    //         // Running browser on Native Platforms
    //         if (cc.sys.isBrowser) {
    //             this.setScale(factor1 * per, "PokerPresenter");
    //         }

    //     } else {
    //         //CHECK FOR PER WORKING
    //         // console.log("Running for Browsers");
    //         if (switchWidg) {
    //             this.setScale(factor1 * per, "PokerPresenter");
    //             // this.setScale(1, "PokerPresenter");


    //             // console.log("poker presenter,", factor1, per, factor1 * per)
    //         } else
    //             this.setScale(factor1 * per, "PokerPresenter");
    //     }

    //     this.setScale(factor2 * per, "MobilePlayerInput")
    //     this.setScale(factor2 * per, "PlayerInput");
    //     this.setScale(factor3 * per, "Popups");
    //     this.setScale(factor4 * per, "TopRight");
    //     this.setScale(factor5 * per, "TiledView");
    //     this.setScale(factor5 * per, "MobileChatView"); //for chatpanel         //for bottom left pannel
    //     this.setScale(factor6 * per, "OptionalPlayerInput");
    //     this.setScale(factor7 * per, "GameplayOptions");
    //     this.setScale(factor8 * per, "MobileView");
    //     // this.gridParent.children[0].children[0].setScale(0.8, 0.8);
    //     // console.log("player input", factor2, factor2 * per)
    //     // console.log("popups", factor3, factor3 * per)
    //     // console.log("tiled view", factor5, factor5 * per)
    //     // console.log(factor6, factor6 * per, "OptionalPlayerInput");
    //     // console.log(factor7, factor7 * per, "GameplayOptions");


    //     // this.setScale(factor9, "GameplayOptions");        // this.chatPanel.active = false;
    //     this.switchWidgets(switchWidg);
    // },

    scaleGroup: function (factor1, factor2, factor3, factor4, factor5, factor6, factor7, factor8, switchWidg) {
        if (K.PORTRAIT) {
            if (GameManager.isZFold()) {
                this.gridParent.parent.getChildByName("TableTabs").scale = 0.65;
                this.gridParent.parent.getChildByName("TableTabs2").scale = 0.65;
                var children = this.gridParent.getComponent(cc.PageView).getPages();
                children.forEach(function (element) {
                    console.log("scaleGroup", element);

                    element.getChildByName("PokerPresenter").scale = 0.6;
                    element.getChildByName("PlayerInput").scale = 0.5;
                    element.getChildByName("RaisePanel").scale = 0.8;
                    element.getChildByName("OptionalPlayerInput").scale = 0.5;
                    element.getChildByName("HandHistoryButton").scale = 0.8;
                    element.getChildByName("ChatButton").scale = 0.8;
                    element.getChildByName("GameplayOptions").scale = 0.6;
                    element.getChildByName("Popups").scale = 0.8;
                    element.getChildByName("UntiledView").scale = 0.8;
                }, this);
            }
            else if (GameManager.isShorter()) {

                if (cc.sys.os == cc.sys.OS_IOS) {
                    this.gridParent.parent.getChildByName("TableTabs").scale = 0.8;
                    this.gridParent.parent.getChildByName("TableTabs2").scale = 0.8;
                    var children = this.gridParent.getComponent(cc.PageView).getPages();
                    children.forEach(function (element) {
                        console.log("scaleGroup", element);

                        element.getChildByName("PokerPresenter").scale = 0.878;
                        element.getChildByName("PokerPresenter").getChildByName("TableBg").scale = 1.1;
                        element.getChildByName("PokerPresenter").getChildByName("TableBg").y = -20;
                        element.getChildByName("PokerPresenter").getChildByName("HandHolder").y = 0;

                        element.getChildByName("PlayerInput").scale = 0.75;
                        element.getChildByName("RaisePanel").scale = 0.75;
                        element.getChildByName("OptionalPlayerInput").scale = 0.75;
                        element.getChildByName("HandHistoryButton").scale = 1;
                        element.getChildByName("ChatButton").scale = 1;
                        element.getChildByName("GameplayOptions").scale = 0.9;
                        element.getChildByName("Popups").scale = 0.9;
                        element.getChildByName("UntiledView").scale = 0.8;
                    }, this);
                }
                else {
                    this.gridParent.parent.getChildByName("TableTabs").scale = 0.65;
                    this.gridParent.parent.getChildByName("TableTabs2").scale = 0.65;
                    var children = this.gridParent.getComponent(cc.PageView).getPages();
                    children.forEach(function (element) {
                        console.log("scaleGroup", element);

                        element.getChildByName("PokerPresenter").scale = 0.75;
                        element.getChildByName("PlayerInput").scale = 0.6;
                        element.getChildByName("RaisePanel").scale = 0.6;
                        element.getChildByName("OptionalPlayerInput").scale = 0.6;
                        element.getChildByName("HandHistoryButton").scale = 0.8;
                        element.getChildByName("ChatButton").scale = 0.8;
                        element.getChildByName("GameplayOptions").scale = 0.8;
                        element.getChildByName("Popups").scale = 0.8;
                        element.getChildByName("UntiledView").scale = 0.8;
                    }, this);
                }
            }
            return;
        }
        var size = cc.size(this.gridParent.width, this.gridParent.height);
        var count = 1;
        if (this.viewType == LayoutType.Tiled) {
            count = GameManager.activeTableCount;
        }

        var per = 1;
        if (GameScreen.isMobile && cc.sys.browserType !== cc.sys.BROWSER_TYPE_SAFARI) {
            // per = 1.2;
        }

        var aspect = size.width / size.height;
        var diff = 1.77 - aspect;
        if (diff >= 0) {
            per = (1 - diff / aspect);
        }
        // if mobile then do not scale need to test impact on every platform.

        // console.log("PLATFORM NAME ",  cc.sys.IPAD);
        // console.log("PLATFORM NAME ",  cc.sys.IPHONE);
        // console.log("Running PLATFORM NAME ",  cc.sys.platform);
        // console.log("Running PLATFORM NAME BROWSER ",  cc.sys.DESKTOP_BROWSER);

        //     console.log("OS NAME ", cc.sys.os);


        ////**********************    
        /*
        Checks for Tablets(ANDROID ONLY) are required to implement.
        */
        if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
            // console.log("Mobile Detected : - ", cc.sys.os);
            // console.log("Mobile Detected number : - ", cc.sys.IPHONE);
            if (cc.sys.platform == cc.sys.IPHONE) {
                // console.log("IPAD Detected PLATFORM IS : - ", cc.sys.platform);
                this.setScale(1, "PokerPresenter");
            } else if (cc.sys.platform == cc.sys.IPAD) {
                // console.log("Mobile Detected PLATFORM IS : - ", cc.sys.platform);
                this.setScale(factor1 * per, "PokerPresenter");
                // this.setScale(factor1 * per + 0.1, "PokerPresenter"); // Readjusting by .2 for IPAD devices
                // this.setScale(1, "PokerPresenter");
            } else if (cc.sys.platform == cc.sys.ANDROID) {
                this.setScale(1, "PokerPresenter");
            }

            // Running browser on Native Platforms
            if (cc.sys.isBrowser) {
                this.setScale(factor1 * per, "PokerPresenter");
            }

        } else {
            //CHECK FOR PER WORKING
            // console.log("Running for Browsers");
            if (switchWidg) {
                this.setScale(factor1 * per, "PokerPresenter");
                // this.setScale(1, "PokerPresenter");


                // console.log("poker presenter,", factor1, per, factor1 * per)
            } else
                this.setScale(factor1 * per, "PokerPresenter");
        }

        this.setScale(factor2 * per, "MobilePlayerInput")
        this.setScale(factor2 * per, "PlayerInput");
        this.setScale(factor3 * per, "Popups");
        this.setScale(factor4 * per, "TopRight");
        this.setScale(factor5 * per, "TiledView");
        this.setScale(factor5 * per, "MobileChatView"); //for chatpanel         //for bottom left pannel
        this.setScale(factor6 * per, "OptionalPlayerInput");
        this.setScale(factor7 * per, "GameplayOptions");
        this.setScale(factor8 * per, "MobileView");
        // this.gridParent.children[0].children[0].setScale(0.8, 0.8);
        // console.log("player input", factor2, factor2 * per)
        // console.log("popups", factor3, factor3 * per)
        // console.log("tiled view", factor5, factor5 * per)
        // console.log(factor6, factor6 * per, "OptionalPlayerInput");
        // console.log(factor7, factor7 * per, "GameplayOptions");


        // this.setScale(factor9, "GameplayOptions");        // this.chatPanel.active = false;
        this.switchWidgets(switchWidg);
    },

    /**
     * @description Move up or down player input and gameplay options node according to tile view selected or untiled view.
     * @method repositionPlayerInput
     * @memberof Screens.Gameplay.GameScreen#
     * @param {boolean} val -Used to set the position of player input
     */
    repositionPlayerInput: function (val) {
        // console.log("reposition player input called...");
        var children = null;
        if(GameManager.isMobile) {
            children = this.gridParent.getComponent(cc.PageView).getPages().length;
        }
        else {
            children = this.gridParent.children.length;
        }

        children.forEach(function (element) {
            var target2 = element.getChildByName('GameplayOptions');
            if (!!target2) {
                // target2.getComponent(cc.Widget).bottom = val ? 5 : 171;
                // target2.getComponent(cc.Widget).enabled = false
                // if (val) {
                // console.log(target2.getComponent(cc.Widget).isAbsoluteLeft, target2.getComponent(cc.Widget))
                //     target2.setPosition(1055, -422);
                //     console.log(target2)
                // } else {
                //     target2.setPosition(144, -213.7)
                //     console.log(target2)
                // }
                target2.getComponent(cc.Widget).left = val ? 0.4956 : 0.004;
                target2.getComponent(cc.Widget).bottom = val ? 0.0123 : 0.204;
                target2.getComponent(cc.Widget).right = val ? 0.3622 : 0.8539;
            }
            let target3 = element.getChildByName('PokerPresenter').getChildByName("HandStrength");
            if (!!target3) {
                target3.getComponent(cc.Widget).right = val ? 0.0309 : 0.4111;
                target3.getComponent(cc.Widget).bottom = val ? 0.2830 : 0.0725;
            }
        }, this);
    },
    repositionHandStrength: function (val) {
        // console.log("reposition hand strength called...");
        var children = null;
        if(GameManager.isMobile) {
            children = this.gridParent.getComponent(cc.PageView).getPages().length;
        }
        else {
            children = this.gridParent.children.length;
        }
        children.forEach(function (element) {

            let target3 = element.getChildByName('PokerPresenter').getChildByName("HandStrength");
            if (!!target3) {
                target3.getComponent(cc.Widget).right = val ? 0.0309 : 0.4111;
                target3.getComponent(cc.Widget).bottom = val ? 0.2830 : 0.0725;
            }
        }, this);
    },

    /**
     * @description View Handling after player joins a table
     * @method onTabSelection
     * @memberof Screens.Gameplay.GameScreen#
     * @param {number} index -show Selected tab's Game/Model! 
     */
    onTabSelection: function (index) {
        console.log("!!!!!!onTabSelection", index);
        for (var i = 0; i < this.gameModel.activePokerModels.length; i++) {
            if (i == index) {
                // console.log("ROMM CONFIG ", this.gameModel.activePokerModels[i])

                GameManager.emit("onTabSelection", (this.gameModel.activePokerModels[i].roomConfig.channelType != K.ChannelType.Tournament));
                this.tableTabs[i].getComponent(tableTab).setActiveView(this.gameModel.activePokerModels[i].roomConfig.channelName, this.gameModel.activePokerModels[i].roomConfig.bigBlind, this.gameModel.activePokerModels[i].roomConfig.smallBlind);
                this.gameModel.activePokerModels[i].node.active = true;
                this.gameModel.activePokerModels[i].node.y = 0;
                this.prevSelection = i;
                if (this.gameModel.activePokerModels[i].roomConfig.channelType == "NORMAL") {
                    if (this.unTiledView.getChildByName('LeaveButton')) {
                        this.unTiledView.getChildByName('LeaveButton').active = true;
                    }

                    this.unTiledView.getChildByName('TableTabs2').getChildByName('TabsContainer').getChildByName('AddButton').active = false;
                    if (this.gameModel.activePokerModels[i].isPrivateTable) {
                        this.unTiledView.getChildByName('TableTabs2').getChildByName('TabsContainer').getChildByName('AddButton').active = false;
                    }
                    else {
                        let popups = this.gameModel.activePokerModels[i].node.getChildByName("Popups").children[0].children;
                        console.log(popups);

                        let popupOn = false;
                        for (var z = 0; z < popups.length; z++) {
                            if (popups[z].active && popups[z].name != "DummyStickerPop") {
                                popupOn = true;
                                break;
                            }
                        }

                        let popups2 = this.gameModel.activePokerModels[i].node.getChildByName("Tournament").children;
                        console.log(popups2);

                        let popupOn2 = false;
                        for (var z = 0; z < popups2.length; z++) {
                            if (popups2[z].active) {
                                popupOn2 = true;
                                break;
                            }
                        }

                        if (!this.gameModel.activePokerModels[i].presenter.mobileGamePlayOptionsVisible &&
                            !this.gameModel.activePokerModels[i].presenter.mobileSliderChatSection.active &&
                            !popupOn &&
                            !popupOn2) {
                            this.unTiledView.getChildByName('TableTabs2').getChildByName('TabsContainer').getChildByName('AddButton').active = true;
                        }
                    }
                }
                else {
                    if (this.unTiledView.getChildByName('LeaveButton')) {
                        this.unTiledView.getChildByName('LeaveButton').active = false;
                    }

                    this.unTiledView.getChildByName('TableTabs2').getChildByName('TabsContainer').getChildByName('AddButton').active = false;
                    // this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('LeaveButton').active = false;
                }

                if (this.gameModel.activePokerModels[i].presenter.playerInput[0].active) {
                    GameManager.emit("disablePageView");
                }

            } else {
                this.tableTabs[i].getComponent(tableTab).setDeactiveView(this.gameModel.activePokerModels[i].roomConfig.channelName, this.gameModel.activePokerModels[i].roomConfig.bigBlind, this.gameModel.activePokerModels[i].roomConfig.smallBlind);
                this.gameModel.activePokerModels[i].node.active = GameManager.isMobile;
            }
        }
        if (GameManager.isMobile) {
            // GameScreen.gridParent.getComponent("TableSwiper").restoreEverything(index);

            GameScreen.gridParent.getComponent(cc.PageView).scrollToPage(index, 0);
        }


        if (this.gameModel.activePokerModels.length == 2) {
            this.unTiledView.getChildByName('TableTabs2').getChildByName('TabsContainer').getChildByName('AddButton').active = false;
        }

        this.onUpdateTableBgImage();

    },

    /**
     * @description Player is seated on a given table
     * @method selectTable
     * @param {String} channelId -Uniquely identifies a game
     * @memberof Screens.Gameplay.GameScreen#
     */
    selectTable: function (channelId) {
        var i = -1;
        for (var index = 0; index < this.gameModel.activePokerModels.length; index++) {
            if (channelId === this.gameModel.activePokerModels[index].gameData.channelId) {
                i = index;
                break;
            }
        }
        if (i != -1) {
            this.onTabSelection(i);
        }
    },

    /**
     * @description Show the lobby button callback
     * @method onShowLobby
     * @memberof Screens.Gameplay.GameScreen#
     */
    onShowLobby: function () {
        // console.log(this.gameModel,"GM")
        // this.playAudio(K.Sounds.click);
        if (this.gameModel.activePokerModels[this.prevSelection].node.children[0].getComponent('PokerPresenter').isObserver()) {
            this.leaveCurrent();
            return;
        }
        ScreenManager.showScreen(K.ScreenEnum.LobbyScreen, 10, function () { }, false);
        this.gameModel.activePokerModels[this.prevSelection].node.children[0].getComponent('PokerPresenter').playAudio(K.Sounds.click)
    },

    /**
     * @description Handling view when player leaves current Game
     * @method leaveCurrent
     * @memberof Screens.Gameplay.GameScreen#
     */
    leaveCurrent: function () {
        this.gameModel.activePokerModels[this.prevSelection].node.children[0].getComponent('PokerPresenter').playAudio(K.Sounds.click)
        if (!this.gridRefreshing && this.gameModel.activePokerModels.length > 0 && !!this.gameModel.activePokerModels[this.prevSelection]) {
            this.gameModel.activePokerModels[this.prevSelection].node.children[0].getComponent('PokerPresenter').onLeaveTableClicked();
            this.tableTabs[this.prevSelection].getComponent(tableTab).showAlert(false);
        }
    },

    /**
     * @description Player stands up in previously joined games
     * @method standUp
     * @memberof Screens.Gameplay.GameScreen#
     */
    standUp: function () {
        this.gameModel.activePokerModels[this.prevSelection].node.children[0].getComponent('PokerPresenter').standUp();
    },

    /**
     * @description Shows video player popUp to replay moves
     * @method onReplay
     * @memberof Screens.Gameplay.GameScreen#
     * @param {Object} data -
     */
    onReplay: function (data) {

        GameManager.popUpManager.show(PopUpType.VideoPlayerPopup, data, function () { });
        //GameManager.popUpManager.show(PopUpType.VideoPlayerPopup, data, function () {});
    },

    /**
     * @description Determines if player has already joined the game
     * @method isAlreadyJoined
     * @memberof Screens.Gameplay.GameScreen#
     * @param {String} channelId -ChannelId of the game
     * @returns {bool} true if player has already join the given table otherwise false
     */
    isAlreadyJoined: function (channelId) {
        if (this.viewType == LayoutType.Tiled) {
            var isPresent = false;
            for (var index = 0; index < this.gameModel.activePokerModels.length; index++) {
                if (channelId === this.gameModel.activePokerModels[index].gameData.channelId) {
                    isPresent = true;
                    break;
                }
            }
            return isPresent;
        } else {
            if (this.gameModel.activePokerModels.length > 0) {
                return (channelId == this.gameModel.activePokerModels[this.prevSelection].gameData.channelId);
            } else {
                return false;
            }
        }
    },

    /**
     * @description Resumes game from the point where the popup showed up
     * @method resumeAll
     * @memberof Screens.Gameplay.GameScreen#
     */
    resumeAll: function () {
        for (var index = 0; index < this.gameModel.activePokerModels.length; index++) {
            var presenter = this.gameModel.activePokerModels[index].node.children[0].getComponent('PokerPresenter');
            if (presenter.resumeBtn.active) {
                presenter.onResume();
            }
        }
    },


    shakeScreen: function (sreenNodeToShake) {
        // console.log("SHAKE CALLED ");

        var initialPos = sreenNodeToShake.getPosition();
        // console.log("SHAKE CALLED ", initialPos);
        this.node.getChildByName("Grid").getComponent(cc.Layout).enabled = false;
        sreenNodeToShake.setPosition(initialPos);
        this.gridRestoreTiming = 0;

        // experiment more with these four values until you rest with something you like!
        var interval = 1 / 60;
        var duration = 0.6;
        var speed = 4;
        var magnitude = 2;
        var elapsed = 0;

        var scheduledShaker = function (dt) {
            // if (sreenNodeToShake.getPosition().equals(cc.Vec2.ZERO)) {
            //     sreenNodeToShake.setPosition(initialPos);
            // }
            var randomStart = this.getRandomInt(-1000, 1000);
            // console.log("RANDOM POS ", randomStart);
            elapsed += dt;
            this.gridRestoreTiming += dt;

            var percentComplete = elapsed / duration;

            // We want to reduce the shake from full power to 0 starting half way through
            // var damper = 1 - (2 * percentComplete - 1).clampf(0, 1);//cc.clampf(2 * percentComplete - 1, 0, 1);
            var damper = cc.misc.clampf(2 * percentComplete - 1, 0, 1);

            // Calculate the noise parameter starting randomly and going as fast as speed allows
            var alpha = randomStart + speed * percentComplete;

            // map noise to [-1, 1]
            var x = this.getNoise(alpha, 0) * 2 - 1;
            var y = this.getNoise(0, alpha) * 2 - 1;

            x *= magnitude * damper;
            y *= magnitude * damper;

            sreenNodeToShake.setPosition(initialPos.x + x, initialPos.y + y); // get refence of screen where event occured and make it shake.

            this.count = 0;

            if (elapsed >= duration) {
                elapsed = 0;

                // console.log("Unschedule Called ");
                if (this.gridRestoreTiming >= 0.6) {
                    // console.log("Unschedule Called Grid RESTORED");
                    this.node.getChildByName("Grid").getComponent(cc.Layout).enabled = true;
                }
                this.unschedule(scheduledShaker, this);
            }
        };
        this.schedule(scheduledShaker, interval);
    },

    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getNoise: function (x, y) {
        var n = x + y * 57;
        n = (n << 13) ^ n;
        return (1.0 - ((n * ((n * n * 15731) + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);
    },


    // onEnable: function () {
    //     //18oct
    //     // console.log("game enabled")
    //     if (GameManager.isMobile) {
    //         let inst = this;
    //         this.backKeyListener = cc.eventManager.addListener({
    //             event: cc.EventListener.KEYBOARD,
    //             onKeyPressed: function (kcode, e) {
    //                 if (kcode == cc.KEY.back || kcode == cc.KEY.backspace) {

    //                     GameManager.popUpManager.show(PopUpType.NotificationPopup, "Please click on Lobby Button to go back to Lobby", function () { });
    //                     // if(GameManager.popUpManager.checkIfPopupActive()){
    //                     //     GameManager.popUpManager.hideCurrentPopUp();
    //                     // }else{
    //                     //     inst.onShowLobby();
    //                     // }
    //                     // e.stopPropagation();
    //                 }
    //             }.bind(this)
    //         }, this.node);
    //     }
    //     //end
    // },

    // onDisable: function () {
    //     // console.log("game disabled");
    //     if (GameManager.isMobile) {
    //         cc.eventManager.removeListener(this.backKeyListener);
    //     }
    // }

    /*
    * @method resizeWithBrowserSize
    * @param {Boolean} enabled - Whether enable automatic resize with browser's resize event
    */
    resizeWithBrowserSize: function (enabled) {

        // console.log("this code runs on every window resize")

        if (enabled) {
            //enable
            if (!this._resizeWithBrowserSize) {
                console.log("this code runs on every window resize")
                this._resizeWithBrowserSize = true;
                window.addEventListener('resize', this._resizeEvent);
                window.addEventListener('orientationchange', this._orientationChange);
            }
        } else {
            //disable
            if (this._resizeWithBrowserSize) {
                this._resizeWithBrowserSize = false;
                window.removeEventListener('resize', this._resizeEvent);
                window.removeEventListener('orientationchange', this._orientationChange);
            }
        }
    },
    update: function () {
        //    this.resizeWithBrowserSize(true);
    },

    manageButtonsInTwoTable: function () {
        // console.error("This Function called...");
        for (var i = 0; i < 2; i++) {
            var addChipsButton = this.gameModel.activePokerModels[i].presenter.addChipsButton;
            var replayButton = this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('ReplayButton');
            var target1 = this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('LobbyButton').getComponent(cc.Widget);
            var target2 = this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('LeaveButton').getComponent(cc.Widget);
            var target3 = this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('SettingsButton').getComponent(cc.Widget);
            var target4 = this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('HandInfoButton').getComponent(cc.Widget);
            var target5 = addChipsButton.getComponent(cc.Widget);
            var target6 = replayButton.getComponent(cc.Widget);
            var target7 = this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('Tile_Untile').getComponent(cc.Widget);
            // console.log("widgets", target2.top, target3.top, target4.top);
            target1.top = target2.top = 0.2;
            target5.top = target3.top = 0.25;
            target6.top = target4.top = 0.302;
            target7.top = 0.15;

        }

    },
    manageButtonsInFourTable: function () {
        // console.error("This Function called...1");
        for (var i = 0; i < GameManager.activeTableCount; i++) {
            var addChipsButton = this.gameModel.activePokerModels[i].presenter.addChipsButton;
            var replayButton = this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('ReplayButton');
            var target1 = this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('LobbyButton').getComponent(cc.Widget);
            var target2 = this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('LeaveButton').getComponent(cc.Widget);
            var target3 = this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('SettingsButton').getComponent(cc.Widget);
            var target4 = this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('HandInfoButton').getComponent(cc.Widget);

            var target5 = addChipsButton.getComponent(cc.Widget);
            var target6 = replayButton.getComponent(cc.Widget);
            var target7 = this.gameModel.activePokerModels[i].presenter.tiledView.getChildByName('Tile_Untile').getComponent(cc.Widget);
            // console.log("widgets", target2.top, target3.top, target4.top);
            target1.top = target2.top = 0.161111;
            target5.top = target3.top = 0.261111;
            target6.top = target4.top = 0.363;
            target7.top = 0.0534;

        }

    },

    onUpdateTableBgImage: function () {
        for (var z = 0; z < this.gameModel.activePokerModels.length; z++) {
            if (z == this.prevSelection) {
                var presenter = this.gameModel.activePokerModels[z].node.children[0].getComponent('PokerPresenter');
                if (presenter.isTournament2) {
                    for (var i = 0; i < GameManager.tableBgImagesTour.length; i++) {
                        let stickerImages = GameManager.tableBgImagesTour[i];
                        if (GameManager.user.defaultTourGameBackground != "" && GameManager.user.defaultTourGameBackground._id) {
                            console.log("!!!!!! onUpdateTableBgImage", GameManager.user.defaultTourGameBackground._id);
                            if (stickerImages.___data._id == GameManager.user.defaultTourGameBackground._id) {
                                this.node.getChildByName('Bg').getComponent(cc.Sprite).spriteFrame = GameManager.tableBgImagesTour[i];
                            };
                        }
                    }
                }
                else {
                    for (var i = 0; i < GameManager.tableBgImages.length; i++) {
                        let stickerImages = GameManager.tableBgImages[i];
                        if (GameManager.user.defaultGameBackground != "" && GameManager.user.defaultGameBackground._id) {
                            console.log("!!!!!! onUpdateTableBgImage", GameManager.user.defaultGameBackground._id);
                            if (stickerImages.___data._id == GameManager.user.defaultGameBackground._id) {
                                this.node.getChildByName('Bg').getComponent(cc.Sprite).spriteFrame = GameManager.tableBgImages[i];
                            };
                        }
                    }
                }
            }
        }


        // for (var i = 0; i < GameManager.tableBgImages.length; i++) {
        //     let stickerImages = GameManager.tableBgImages[i];
        //     if (GameManager.user.defaultGameBackground != "" && GameManager.user.defaultGameBackground._id) {
        //         console.log("!!!!!! onUpdateTableBgImage", GameManager.user.defaultGameBackground._id);
        //         if (stickerImages.___data._id == GameManager.user.defaultGameBackground._id) {
        //             this.node.getChildByName('Bg').getComponent(cc.Sprite).spriteFrame = GameManager.tableBgImages[i];
        //         };
        //     }
        // }
    },


    showJoinSimlar: function () {
        // console.trace("!!!!!!!!!!!!!!showJoinSimlar");
        let index = this.prevSelection;
        for (var i = 0; i < this.gameModel.activePokerModels.length; i++) {
            // console.trace("!!!!!!!!!!!!!!showJoinSimlar1", this.prevSelection);
            if (i == index || this.prevSelection == -1) {
                // console.trace("!!!!!!!!!!!!!!showJoinSimlar2");
                this.unTiledView.getChildByName('TableTabs2').getChildByName('TabsContainer').getChildByName('AddButton').active = false;
                if (this.gameModel.activePokerModels[i].roomConfig.channelType == "NORMAL") {
                    if (this.gameModel.activePokerModels[i].isPrivateTable) {
                        this.unTiledView.getChildByName('TableTabs2').getChildByName('TabsContainer').getChildByName('AddButton').active = false;
                    }
                    else {
                        let popups = this.gameModel.activePokerModels[i].node.getChildByName("Popups").children[0].children;
                        console.log(popups);

                        let popupOn = false;
                        for (var z = 0; z < popups.length; z++) {
                            if (popups[z].active && popups[z].name != "DummyStickerPop") {
                                popupOn = true;
                                // console.trace("!!!!!!!!!!!!!!showJoinSimlar3");
                                break;
                            }
                        }

                        let popups2 = this.gameModel.activePokerModels[i].node.getChildByName("Tournament").children;
                        console.log(popups2);

                        let popupOn2 = false;
                        for (var z = 0; z < popups2.length; z++) {
                            if (popups2[z].active) {
                                popupOn2 = true;
                                // console.trace("!!!!!!!!!!!!!!showJoinSimlar4");
                                break;
                            }
                        }

                        if (!this.gameModel.activePokerModels[i].presenter.mobileGamePlayOptionsVisible &&
                            !this.gameModel.activePokerModels[i].presenter.mobileSliderChatSection.active &&
                            !popupOn &&
                            !popupOn2) {
                            // console.trace("!!!!!!!!!!!!!!showJoinSimlar5");
                            this.unTiledView.getChildByName('TableTabs2').getChildByName('TabsContainer').getChildByName('AddButton').active = true;
                        }
                        else {
                            // console.trace("!!!!!!!!!!!!!!showJoinSimlar6");
                        }
                    }
                }
                else {
                    // console.trace("!!!!!!!!!!!!!!showJoinSimlar7");
                    this.unTiledView.getChildByName('TableTabs2').getChildByName('TabsContainer').getChildByName('AddButton').active = false;
                }
                // console.trace("!!!!!!!!!!!!!!showJoinSimlar8");
            }
            // console.trace("!!!!!!!!!!!!!!showJoinSimlar9");
        }


        if (this.gameModel.activePokerModels.length == 2) {
            this.unTiledView.getChildByName('TableTabs2').getChildByName('TabsContainer').getChildByName('AddButton').active = false;
        }
        // console.trace("!!!!!!!!!!!!!!showJoinSimlar10");
    },

    hideJoinSimlar: function () {
        // console.trace("!!!!!!!!!!!!!!hideJoinSimlar");
        this.unTiledView.getChildByName('TableTabs2').getChildByName('TabsContainer').getChildByName('AddButton').active = false;
    },

    updateTabImage: function(isTournament, act, deact) {
        for (var index = 0; index < this.gameModel.activePokerModels.length; index++) {
            let pokerModel = this.gameModel.activePokerModels[index];
            var presenter = pokerModel.node.children[0].getComponent('PokerPresenter');
            // if (pokerModel === this.gameModel.activePokerModels[index]) {
            //     pokerModelIndex = index;
            //     break;
            // }

            if (isTournament) {
                if (presenter.isTournament2) {
                    this.tableTabs[index].getChildByName("Active").getChildByName("Base").getComponent(cc.Sprite).spriteFrame = act;
                    this.tableTabs[index].getChildByName("Deactive").getChildByName("Base").getComponent(cc.Sprite).spriteFrame = deact;
                }
            }
            else {
                if (!presenter.isTournament2) {
                    this.tableTabs[index].getChildByName("Active").getChildByName("Base").getComponent(cc.Sprite).spriteFrame = act;
                    this.tableTabs[index].getChildByName("Deactive").getChildByName("Base").getComponent(cc.Sprite).spriteFrame = deact;
                }
            }
        }

        // if (this.tableTabs[pokerModelIndex] != undefined) {
        //     this.tableTabs[pokerModelIndex].getChildByName("Active").getChildByName("Base").getComponent(cc.Sprite).spriteFrame = act;
        //     this.tableTabs[pokerModelIndex].getChildByName("Deactive").getChildByName("Base").getComponent(cc.Sprite).spriteFrame = deact;
        // }
    }

});
