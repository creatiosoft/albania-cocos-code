/**
 * @namespace Screens.Lobby 
 */
var LobbyHandler = require('LobbyHandler');
var Checkbox = require('Checkbox');
var Table = require('Table');
var abstractScreen = require('AbstractScreen');
var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var TabBtnUtil = require('TabBtnUtil');
var DropDownType = require('DropDown');
var GetPrize = require('PostTypes').GetPrizeData;
var LoginHandler = require('LoginHandler');
var CashRoom = require('CashRoom');
var changeAvatar = require('ResponseTypes').changeAvatar;
var megaCircleType = cc.Enum({
    Bronze: 0,
    Chrome: 1,
    Silver: 2,
    Gold: 3,
    Diamond: 4,
    Platinum: 5,
});
/**
 * @class LobbyPresenter
 * @classdesc Manage view of Lobby
 * @memberof Screens.Lobby
 */
cc.Class({
    extends: abstractScreen,
    properties: {
        gift: {
            default: null,
            type: cc.Node,
        },
        depositOne: {
            default: null,
            type: cc.Node,
        },
        deposit: {
            default: null,
            type: cc.Node,
        },
        depositScrollView: {
            default: null,
            type: cc.Node,
        },
        depositScrollViewItem: {
            default: null,
            type: cc.Node,
        },
        tournamentLobbyDetail: {
            default: null,
            type: cc.Node,
        },
        goldIcon: {
            default: null,
            type: cc.Node,
        },
        diamondIcon: {
            default: null,
            type: cc.Node,
        },
        goldIcon2: {
            default: null,
            type: cc.Node,
        },
        diamondIcon2: {
            default: null,
            type: cc.Node,
        },
        top: {
            default: null,
            type: cc.Node,
        },
        top2: {
            default: null,
            type: cc.Node,
        },
        friendsNode: {
            default: null,
            type: cc.Node,
        },
        centerNode: {
            default: null,
            type: cc.Node,
        },
        loadingDash: {
            default: null,
            type: cc.Node,
        },
        pokersFormat: {
            default: null,
            type: cc.Node,
        },
        mainButtons: {
            default: null,
            type: cc.Node,
        },
        leftNode: {
            default: null,
            type: cc.Node,
        },
        bottomNode: {
            default: null,
            type: cc.Node,
        },
        pageViewNode: {
            default: null,
            type: cc.PageView,
        },
        pageCell: {
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
        advancedFilter: {
            default: null,
            type: cc.Node,
        },
        adNode: {
            default: null,
            type: cc.Node,
        },
        adNodeMini: {
            default: null,
            type: cc.Node,
        },
        createPrivateNode: {
            default: null,
            type: cc.Node,
        },
        joinPrivateNode: {
            default: null,
            type: cc.Node,
        },
        privateNode: {
            default: null,
            type: cc.Node,
        },
        listNotificationsNode: {
            default: null,
            type: cc.Node,
        },
        lbNode: {
            default: null,
            type: cc.Node,
        },
        lbPoints1Node: {
            default: null,
            type: cc.Label,
        },
        lbPoints2Node: {
            default: null,
            type: cc.Label,
        },
        lbSetNode: {
            default: null,
            type: cc.Node,
        },
        lbSetContentNode: {
            default: null,
            type: cc.Node,
        },
        lbSetItemNode: {
            default: null,
            type: cc.Node,
        },
        lbsNode: {
            default: null,
            type: cc.Node,
        },
        lbsContentNode: {
            default: null,
            type: cc.Node,
        },
        lbsContentItemNode: {
            default: null,
            type: cc.Node,
        },
        lbsRankNode: {
            default: null,
            type: cc.Node,
        },
        lbCountNode: {
            default: null,
            type: cc.Node,
        },
        lbMeNode: {
            default: null,
            type: cc.Node,
        },
        lbRanksNode: {
            default: null,
            type: cc.Node,
        },
        lbRanksContentNode: {
            default: null,
            type: cc.Node,
        },
        lbRanksItemNode: {
            default: null,
            type: cc.Node,
        },
        lbEmpty: {
            default: null,
            type: cc.Node,
        },
        lbHide: {
            default: [],
            type: cc.Node,
        },
        //
        cashierTabNode: {
            default: null,
            type: cc.Node,
        },
        tournamentTabNode: {
            default: null,
            type: cc.Node,
        },
        practiceTabNode: {
            default: null,
            type: cc.Node,
        },
        freerollTabNode: {
            default: null,
            type: cc.Node,
        },
        activeTabSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        inactiveTabSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        activeTabSprite2: {
            default: null,
            type: cc.SpriteFrame,
        },
        inactiveTabSprite2: {
            default: null,
            type: cc.SpriteFrame,
        },
        scrollViewNode: {
            default: null,
            type: cc.Node,
        },
        tournamentTable: {
            default: null,
            type: cc.Node,
        },
        cashierTable: {
            default: null,
            type: cc.Node,
        },
        roomTable: {
            default: null,
            type: cc.Node,
        },
        badbeat: {
            default: null,
            type: cc.Label,
        },
        loginHandler: {
            default: null,
            type: LoginHandler,
        },
        handler: {
            default: null,
            type: LobbyHandler,
        },
        popUpManager: {
            default: null,
            type: PopUpManager,
        },
        innerTabs: {
            default: null,
            type: TabBtnUtil,
        },
        tabs: {
            default: null,
            type: cc.Node,
        },
        tables: {
            default: [],
            type: Table,
        },
        tabButtons: {
            default: [],
            type: cc.Sprite,
        },
        tabButtons2: {
            default: [],
            type: cc.Sprite,
        },
        playerName: {
            default: null,
            type: cc.Label,
        },
        playerId: {
            default: null,
            type: cc.Label,
        },
        playerImg: {
            default: null,
            type: cc.Sprite,
        },
        balance: {
            default: null,
            type: cc.Label,
        },
        balance2: {
            default: null,
            type: cc.Label,
        },
        playBalance: {
            default: null,
            type: cc.Label,
        },
        realMoneyCheck: {
            default: null,
            type: cc.Toggle,
        },
        playMoneyCheck: {
            default: null,
            type: cc.Toggle,
        },
        currentTab: {
            default: 0,
            visible: false,
            // type: cc.Node,
        },
        activeSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        inactiveSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        activeColor: {
            default: new cc.Color(),
            // type: cc.Color,
        },
        inactiveColor: {
            default: new cc.Color(),
            // type: cc.Color,
        },
        showGameBtn: {
            default: null,
            type: cc.Node,
        },
        prizes: [],
        claimChipsBtn: {
            default: null,
            type: cc.Node,
        },
        imageLoadedRef: {
            default: {},
        },
        realMoneyHeaderLbl: {
            default: null,
            type: cc.Node
        },
        playMoneyHeaderLbl: {
            default: null,
            type: cc.Node
        },
        onlinePlayersLbl: {
            default: null,
            type: cc.Label,
        },
        // loyaltyStars: {
        //     default: [],
        //     type: cc.Node
        // },
        megaStarsSprites: {
            default: [],
            type: cc.SpriteFrame,
        },
        stars: {
            default: [],
            type: cc.Sprite,
        },
        selectionColor: cc.Color,
        fadeColor: cc.Color,
        lockedBonus: {
            default: null,
            type: cc.Label
        },
        loyalityPoints: {
            default: null,
            type: cc.Label
        },
        loyalityLevel: {
            default: null,
            type: cc.Label
        },
        cashierPlayBalance: {
            default: null,
            type: cc.Label
        },
        mobileTable: {
            default: null,
            type: cc.Node
        },
        privNFav: {
            default: [],
            type: cc.Node
        },
        sets: [],
        lbTimer: 0,
        lockClick: false,
    },

    /**
     * @method onShow
     * @description Called every time the screen is enabled
     * @param {object} data 
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onShow: function (data) {
        // this.onDashboard(null, "hide");
        this.hideLB();
        // this.onHidePrivate();
        this.tournamentLobbyDetail.active = false;
        this.onBackLobby(null, null, false);
        // this.onBackLobby2(null, null, false);

        // this.webView.setJavascriptInterfaceScheme("mypoker");
        // this.webView.setOnJSCallback((target, url) => {
        //     console.log("target", url);
        //     // console.log("target", url.searchParams.get('action'));
        //     // if (url.searchParams.get('action') == "close") {
        //         // this.onClose();
        //         this.webViewContainer.x = -10000;
        //     // }
        // });

        // console.log("onshow called");
        // console.log(PopUpManager.currentOverLayedPopUps)
        // this.imageLoadedRef = this.imageLoaded.bind(this);
        // GameManager.on("image-loaded", this.imageLoadedRef);
        if (GameManager.isConnected)
            this.popUpManager.hideAllPopUps();
        this.refreshDetails();
        this.refreshPlayerChips();
        // this.getPlayerPrize();//enable it
        // this.showGameBtn.active = false; //(GameManager.activeTableCount > 0);
        this.displayOnlinePlayers();
        //  ServerCom.pomeloRequest(K.PomeloAPI.getFilters, data, function(response) {
        //     self.initDropdowns(response);
        // }, function(error) {
        // });

        this.megaStarsUpdateInView();
        if (GameManager.isMobile) {
            // this.manageTopTables();
        }

        // window.TournamentLobbyHandler.requestTournamentLobbyList(
        //     {},
        //     (data) => {
        //         // console.log("requestTournamentLobbyList okokok");
        //         // this.createTournamentList( this.tournamentData );
        //     }, 
        //     (error) => {
        //     }
        // );

        if (K.PORTRAIT) {
            // GameManager._orientationChange(false);
            // GameManager._orientationCheck();
        }

        ServerCom.pomeloRequest(
            "connector.entryHandler.listNotificationTransfer", 
            {
                "playerId": GameManager.user.playerId,
                "isLoggedIn": true,
                "access_token": K.Token.access_token
            }, 
            function (response) {
                console.log("listNotificationTransfer response", response);
            }, 
            null, 
            5000, 
            false, 
            false
        );

        this.playerImg.spriteFrame = GameManager.user.urlImg;

        GameManager.friendRequstFriends();
        GameManager.friendRequestSent();
        GameManager.friendRequestReceive();
        GameManager.getPlayerMute();

        if (GameManager.user.category == "GOLD") {
            // this.goldIcon.active = true;
            // this.diamondIcon.active = false;

            // // this.goldIcon2.active = true;
            // // this.diamondIcon2.active = false;
        }
        else {
            // this.goldIcon.active = false;
            // this.diamondIcon.active = true;   

            // // this.goldIcon2.active = false;
            // // this.diamondIcon2.active = true;   
        }
        
    },

    /**
     * @method manageTopTables
     * @description Method to manage top tables in lobby in mobile only.Called from on show
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    manageTopTables: function () {
        this.mobileTable.children.forEach((elem) => {
            elem.active = false;
        }, this);

        for (let i = 0; i < GameManager.activeTableCount; i++) {
            if (cc.isValid(this.mobileTable.children[i])) {
                this.mobileTable.children[i].active = true;

                let model = GameScreen.gameModel.activePokerModels[i];
                let stakes = model.gameData.tableDetails.smallBlind + "/" + model.gameData.tableDetails.bigBlind;

                this.mobileTable.children[i].getChildByName('stake').getComponent(cc.Label).string = stakes;
                let flag2 = !model.roomConfig.isPotLimit && model.roomConfig.channelVariation === K.Variation.TexasHoldem;
                if (flag2) {
                    this.mobileTable.children[i].getChildByName('variant').getComponent(cc.Label).string = "NL Hold'em";
                }
                let flag3 = model.roomConfig.isPotLimit && model.roomConfig.channelVariation === K.Variation.TexasHoldem;
                if (flag3) {
                    this.mobileTable.children[i].getChildByName('variant').getComponent(cc.Label).string = "PL Hold'em";
                }
                let flag4 = model.roomConfig.channelVariation === K.Variation.Omaha;
                if (flag4) {
                    this.mobileTable.children[i].getChildByName('variant').getComponent(cc.Label).string = "PL Omaha";
                }

                let flag5 = model.roomConfig.channelVariation === K.Variation.OmahaHiLo;
                if (flag5) {
                    this.mobileTable.children[i].getChildByName('variant').getComponent(cc.Label).string = "PL Omaha HL";
                }
                //  && this.model.gameData.tableDetails.roundName === K.Round.Preflop;

                // console.log(GameScreen.gameModel.activePokerModels[i].gameData)
            }
        }
    },


    /**
     * @method refreshPlayerChips
     * @description Method to keep player chips updated
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    refreshPlayerChips: function () {
        // if (GameManager.isMobile || this.realMoneyCheck.isSelected) {
        //     this.balance.string = parseInt(GameManager.user.realChips);
        // } else {
        //     this.balance.string = parseInt(GameManager.user.freeChips);
        // }
        this.balance.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));
        this.balance.string = GameManager.convertChips(this.balance.string);
        // // // this.balance2.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));
        // console.log(this)
        if (!GameManager.isMobile) {
            // this.playBalance.string = Number(GameManager.user.freeChips.toFixed(2));;
            // this.lockedBonus.string = parseInt(GameManager.user.unclamedBonus);
            // this.loyalityPoints.string = parseInt(GameManager.user.megaPointDetail.megaPoints);
            // this.loyalityLevel.string = GameManager.user.megaPointDetail.megaPointLevel;

        }
        // this.cashierPlayBalance.string = parseInt(GameManager.user.freeChips);

        // for (var i = 0; i < this.loyaltyStars.length; i++) {
        //     if (i < GameManager.user.refreshPlayerChips) {
        //         this.loyaltyStars[i].active = true;
        //     } else {
        //         this.loyaltyStars[i].active = false;
        //     }
        // }
    },
    /**
     * @description utility method to fill the megastars
     * @method fillStar
     * @param {number} starIndex fill Stars 100% till starIndex-1
     * @param {number} starPercentfill fill Star at starIndex to starPercentfill
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    fillStar: function (starIndex, starPercentfill) {
        for (let i = 0; i < starIndex; i++) {
            this.stars[i].fillRange = 1;
        }
        this.stars[starIndex].fillRange = starPercentfill / 100;
    },
    /**
     * @description updates the stars in view
     * @method megaStarsUpdateInView
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    megaStarsUpdateInView: function () {
        //set initial sprites and initial fillrange to 0
        // for (let i = 0; i < 5; i++) {
        //     this.stars[i].spriteFrame = this.megaStarsSprites[megaCircleType[GameManager.user.megaPointDetail.megaPointLevel]];
        //     this.stars[i].fillRange = 0;
        // }
        // //set fill range
        // let megaPtPrcnt = GameManager.user.megaPointDetail.megaPointsPercent;
        // let starPercentfill = (megaPtPrcnt % 20) * 5;
        // if (megaPtPrcnt <= 20) this.fillStar(0, starPercentfill);
        // else if (megaPtPrcnt > 20 && megaPtPrcnt <= 40) this.fillStar(1, starPercentfill);
        // else if (megaPtPrcnt > 40 && megaPtPrcnt <= 60) this.fillStar(2, starPercentfill);
        // else if (megaPtPrcnt > 60 && megaPtPrcnt <= 80) this.fillStar(3, starPercentfill);
        // else this.fillStar(4, starPercentfill);
    },

    /**
     * @method onMegapointUpdate
     * @description Broadcast callback on megapoint update
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onMegapointUpdate: function (data) {
        GameManager.user.megaPointDetail.megaPointsPercent = data.megaPointsPercent;
        GameManager.user.megaPointDetail.megaPoints = data.megaPoints;
        GameManager.user.megaPointDetail.megaPointLevel = data.megaPointLevel;
        this.refreshPlayerChips();
        this.megaStarsUpdateInView();
    },

    updatePlayerProfileLogout:function(data) {
        console.log("updatePlayerProfileLogout", data)
        this.webViewContainer.x = -10000;
        // this.webView.url = "about:blank";
        this.onLogOut();
    },

    /**
     * @method updatePlayerProfile
     * @description Method to Update Player Chips and Loyalty Stars on BroadCast
     * @param {object} data 
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    updatePlayerProfile: function (data) {
        // console.log("diggie required data", data);
        if (data.event == "REALCHIPSUPDATE") {
            let delta = Number(data.updated.realChips) - Number(GameManager.user.realChips);
            if (delta > 0) {
                GameManager.popUpManager.show(
                    PopUpType.CommonDialog, 
                    {
                        "title": "Congratulations!",
                        "content" : "You have received " + delta + " chips."
                    }, 
                    function () {}
                );
            }
        }
        for (var key in data.updated) {
            // if (GameManager.user[key] == 0 || GameManager.user[key]) {
            if (String(key).includes("mega")) {
                GameManager.user.megaPointDetail[key] = data.updated[key];
                if (String(key).includes("Percent")) {
                    this.megaStarsUpdateInView();
                }
            } else {
                GameManager.user[key] = data.updated[key];
            }

            if (String(key).includes("profileImage")) {
                GameManager.user.profileImage = Number(data.updated[key]) - 1;
                GameManager.user.urlImg = GameManager.avatarImages[Number(GameManager.user.profileImage)];
                GameManager.emit("image-loaded", GameManager.user);
            }
            // }
        }
        this.refreshPlayerChips();

        if (data.event == "REALCHIPSUPDATE") {
            GameManager.emit("REALCHIPSUPDATE");
        }
    },

    /**
     * @method getPlayerPrize
     * @description Method to check if any tournament prize haven't been collected yet 
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    getPlayerPrize: function () {
        var data = new GetPrize(GameManager.user.playerId);
        var inst = this;
        ServerCom.pomeloRequest(K.PomeloAPI.getPrizes, data, function (response) {
            if (response.success) {
                inst.prizes = response.result;
                inst.showPrizes();
            }
        }, null, 5000, false);
    },

    /**
     * @method showPrizes
     * @description Method to show won prizes one by one
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    showPrizes: function () {
        var data = null;
        if (this.prizes.length > 0) {
            data = this.prizes[0];
            this.popUpManager.show(PopUpType.ResultPopup, data, function () { });
        }
    },

    /**
     * @method onCollectPrize
     * @description Method to collect prize and inform server about the same
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onCollectPrize: function () {
        var data = this.prizes[0];
        var inst = this;
        var prizedata = {
            playerId: data.playerId,
            gameVersionCount: data.gameVersionCount,
            tournamentId: data.tournamentId
        };
        ServerCom.pomeloRequest(K.PomeloAPI.collectPrize, prizedata, function (response) {
            if (response.success) {
                inst.popUpManager.hide(PopUpType.ResultPopup, function () { });
                inst.prizes.shift();
                inst.showPrizes();
            }
        }, null, 5000, false);
    },

    /**
     * @method onHide
     * @description method called from base class befor the screen is switched to a different one
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onHide: function () {
        // GameManager.off("image-loaded", this.imageLoadedRef);

    },

    onBtnPageClick(event, msg) {
        if (!this.isScrollEnded) { return; }
    },
    /**
     * @method onLoad
     * @description use this for initialization
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onLoad: function () {
        console.log("==========================>isZFold", GameManager.isZFold());
        // if (GameManager.isZFold()) {

        //     cc.find("LobbyHandlerNew", cc.Canvas.instance.node).scale = 0.9;
        //     cc.find("GamePlayHandlerNew", cc.Canvas.instance.node).scale = 0.9;
        //     cc.find("Popups/Johnny", cc.Canvas.instance.node).scale = 0.8;
        //     cc.find("Launch", cc.Canvas.instance.node).scale = 0.8;
        //     cc.find("NewVersionPopup", cc.Canvas.instance.node).scale = 0.8;
        //     cc.find("Loading", cc.Canvas.instance.node).scale = 0.8;
        //     cc.find("Reconnecting_Johnny", cc.Canvas.instance.node).scale = 0.8;
        //     cc.find("LoginPre", cc.Canvas.instance.node).scale = 0.8;

        //     // this.lbNode.scale = 0.6;
        //     // this.privateNode.scale = 0.6;
        //     // this.node.parent.getChildByName("Popups").scale = 0.6;
        //     // this.node.parent.getChildByName("Tournament").scale = 0.6;
        //     // this.tournamentLobbyDetail.scale = 0.6;
        //     // this.node.getChildByName("Center").scale = 0.6;
        //     // this.node.getChildByName("LeftSection").scale = 0.6;
        //     // this.node.getChildByName("ScrollView").scale = 0.8;
        //     // this.scheduleOnce(() => {
        //     //     console.log("okokok", this.node.getChildByName("LeftSection").height);
        //     //     this.node.getChildByName("ScrollView").y = this.node.height / 2 - this.node.getChildByName("LeftSection").height * 0.6;
        //     //     this.node.getChildByName("ScrollView").getComponent(cc.Widget).enabled = false;
        //     // }, 0.1);
        // }

        this.scheduleOnce(() => {
            this.tournamentTable.active = false;
        }, 0.5);

        // ServerCom.pomeloRequest("connector.entryHandler.getListPlayerTableTheme", {
        //         "playerId": GameManager.user.playerId
        //     }, function (response) {
        //         console.log("getListPlayerTableTheme", response);

        //         GameManager.user.defaultTheme = response.defaultTheme;
        // });

        // ServerCom.pomeloRequest("connector.entryHandler.getListPlayerCard", {
        //     "playerId": GameManager.user.playerId
        // }, function (response) {
        //     console.log("getListPlayerCard", response);
        //     GameManager.user.defaultCard = response.defaultCard;
        // });

        let self = this;

        // [
        //     {
        //         "_id": "66875719ac93bc5fa53df10a",
        //         "image": "1720145689226-banner.png",
        //         "url": "https://creatiosoft.com/",
        //         "status": "active",
        //         "createdAt": "2024-07-05T02:14:49.807Z",
        //         "updatedAt": "2024-07-05T10:30:04.362Z"
        //     },
        //     {
        //         "_id": "6687cb10ac93bc5fa53df10b",
        //         "image": "1720175375065-banner.png",
        //         "url": "https://creatiosoftweb.pokermoogley.com/casino-game-development",
        //         "status": "active",
        //         "createdAt": "2024-07-05T10:29:36.011Z",
        //         "updatedAt": "2024-07-05T10:29:46.139Z"
        //     },
        //     {
        //         "_id": "6687cb39ac93bc5fa53df10c",
        //         "image": "1720175416649-banner-3.png",
        //         "url": "https://creatiosoft.com/",
        //         "status": null,
        //         "createdAt": "2024-07-05T10:30:17.530Z",
        //         "updatedAt": "2024-07-05T10:30:17.530Z"
        //     }
        // ]

        // self.count = 0;
        // let bannerCallback = (success, ret) => {
        //     if (success) {
        //         self.pageViewNode.node.on('scroll-ended', () => {
        //             self.isScrollEnded = true;
        //         }, self);

        //         self.pageViewNode.node.on('scrolling', () => {
        //             self.isScrollEnded = false;
        //         }, self);

        //         for (let i = 0; i < ret.length; i++) {
        //             if (i == 0) {
        //                 let cellNode = self.pageViewNode.content.children[0];
        //                 let btn = cellNode.getChildByName('btn');
        //                 let back = btn.getChildByName('Background').getComponent(cc.Sprite);
        //                 btn.getComponent(cc.Button).clickEvents[0].customEventData = ret[i].url;

        //                 let spriteUrl = K.ServerAddress.ads_server + ret[i].image;
        //                 cc.assetManager.loadRemote(spriteUrl, { ext: '.png' }, (error, texture) => {
        //                     self.count += 1;
        //                     if (self.count == ret.length) {
        //                         self.schedule(() => {
        //                             let count = ret.length;        
        //                             let index = self.pageViewNode.getCurrentPageIndex();
        //                             if (index >= (count - 1)) {
        //                                 self.pageViewNode.scrollToPage(0, 0);
        //                             }
        //                             else {
        //                                 index = index + 1;
        //                                 self.pageViewNode.scrollToPage(index, 2);
        //                             }
        //                          }, 3);
        //                     }
        //                     if (error) { 
        //                         return; 
        //                     }

        //                     let spriteFrame = new cc.SpriteFrame(texture);
        //                     back.spriteFrame = spriteFrame;
        //                 });
        //             }
        //             else {
        //                 let pacc = cc.instantiate(self.pageCell);
        //                 self.pageViewNode.insertPage(pacc, i);
                        
        //                 let btn = pacc.getChildByName('btn');
        //                 let back = btn.getChildByName('Background').getComponent(cc.Sprite);
        //                 btn.getComponent(cc.Button).clickEvents[0].customEventData = ret[i].url;

        //                 let spriteUrl = K.ServerAddress.ads_server + ret[i].image;
        //                 cc.assetManager.loadRemote(spriteUrl, { ext: '.png' }, (error, texture) => {
        //                     self.count += 1;
        //                     if (self.count == ret.length) {
        //                         self.schedule(() => {
        //                             let count = ret.length;        
        //                             let index = self.pageViewNode.getCurrentPageIndex();
        //                             if (index >= (count - 1)) {
        //                                 self.pageViewNode.scrollToPage(0, 0);
        //                             }
        //                             else {
        //                                 index = index + 1;
        //                                 self.pageViewNode.scrollToPage(index, 2);
        //                             }
        //                          }, 3);
        //                     }
        //                     if (error) { 
        //                         return; 
        //                     }

        //                     let spriteFrame = new cc.SpriteFrame(texture);
        //                     back.spriteFrame = spriteFrame;
        //                 });
        //             }
        //         }
        //     }
        //     else {
        //         self.scheduleOnce(() => {
        //             bannerCallback(true, [1, 1, 1, 1, 1, 1]);
        //         }, 2);
        //     }
        // };
        // bannerCallback(true, [1, 1, 1, 1]);

        // ServerCom.httpGetRequest(K.ServerAddress.ads_server + '/AdsManagement/getHomeAds', {}, function (response) {
        //     if (response.status) {
        //         console.log("getHomeAds", response.data);

        //         bannerCallback(true, response.data);
        //     }
        // }.bind(this));

        // bannerCallback(true, [1, 1, 1, 1, 1, 1]);

        // ServerCom.httpGetRequest('https://newcashgames.pokermoogley.com:4040/users/getFile/1720145689226-banner.png', {}, function (response) {
        //     console.log("banner", response);
        // }.bind(this));


        ServerCom.inGame = true;
        this.imageLoadedRef = this.imageLoaded.bind(this);
        // GameManager.on("onDashboardAddCash", this.onDashboardAddCash.bind(this));
        GameManager.on("joinChannelByInvitecode", this.onJoinChannelByInvitecode.bind(this));
        GameManager.on("image-loaded", this.imageLoadedRef);
        GameManager.on("refresh_private_table", this.refreshPrivateTable.bind(this));
        GameManager.on("refreshPlayerChips" , this.refreshPlayerChips.bind(this));
        GameManager.on("onTabSelection", (flag) => {
            console.log("onTabSelectiononTabSelectiononTabSelection", flag);
            if (self.badbeat) {
                self.badbeat.node.active = flag;
            }
        });

        GameManager.on("onlinePlayers", this.displayOnlinePlayers.bind(this));
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.updateProfile, this.updatePlayerProfile.bind(this));
        ServerCom.pomeloBroadcast("playerLogout", this.updatePlayerProfileLogout.bind(this));
        this.onShowAll(true);
        // this.onShowHoldem(true);
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.updateMegaPoints, this.onMegapointUpdate.bind(this));
        ServerCom.pomeloBroadcast("banPLayer", this.onBan.bind(this));
        ServerCom.pomeloBroadcast("increaseCurrentJackpotPool", this.onIncreaseCurrentJackpotPool.bind(this));
        ServerCom.pomeloBroadcast("jackpotWin", this.onJackpotWin.bind(this));

        ServerCom.pomeloBroadcast("playerSocialSharing", this.playerSocialSharing.bind(this));

        ServerCom.socketIOBroadcast(GameManager.user.playerId, this.onPlayerEvent.bind(this));

        if (GameManager.isP) {
            this.privNFav.forEach((elem) => {
                elem.active = false;
            }, this);

        }
        // 
        GameManager.startRefreshTokenTimer(() => {
            console.log("startRefreshTokenTimer");

            ServerCom.refreshConnectToServer("", () => {}, () => {});
            // ServerCom.refreshConnectToPomelo();
        });

        ServerCom.pomeloRequest(
            "connector.entryHandler.getCurrentJackpotPool", 
            {
                "playerId": GameManager.user.playerId
            }, 
            function (response) {
                console.log("getCurrentJackpotPool response", response);
                if (response && response.badBeatpool) {
                    if (self.badbeat) {
                        self.badbeat.string = "Bad Beat Pool:" + response.badBeatpool.toFixed(2);
                    }
                }
            }, 
            null, 
            5000, 
            false, 
            false
        );
        // this.scheduleOnce(() => {
        //     self.onJackpotWin({
        //        "info": "You win jackpot bad beat with 4.5",
        //         "route": "jackpotWin"
        //     });
        // }, 10);
    },

    playerSocialSharing:function(data) {
        console.log("playerSocialSharing", data);

        // {
        //     "event": "PLAYERSOCIALSHARING",
        //     "type": "twitter",
        //     "text": "Join and play poker with me. Here is my code 8H5IF2UO9ZW1",
        //     "route": "playerSocialSharing"
        // }

        if (data.type == "twitter") {
            var pageUrl = encodeURIComponent("https://mypoker.com/?v=" + GameManager.user.userName);
            var pageTitle = encodeURIComponent(data.text);
            let url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + pageTitle;
            var left = 100;
            var top = 100;
            var width = 500;
            var height = 500;
            var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
            if (cc.sys.isNative) {
                cc.sys.openURL(url);
            }
            else {
                window.open(url,"",params);
            }
        }
        else if (data.type == "whatsapp") {
            var pageUrl = encodeURIComponent("https://mypoker.com/?v=" + GameManager.user.userName);
            var pageTitle = encodeURIComponent(data.text);
            let url = "whatsapp://send?text=" + pageTitle + "%20" + pageUrl;
            var left = 100;
            var top = 100;
            var width = 500;
            var height = 500;
            var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
            if (cc.sys.isNative) {
                cc.sys.openURL(url);
            }
            else {
                window.open(url,"",params);
            }
        }
        else if (data.type == "telegram") {
            var pageUrl = encodeURIComponent("https://mypoker.com/?v=" + GameManager.user.userName);
            var pageTitle = encodeURIComponent(data.text);
            let url = "https://telegram.me/share/url?url=" + pageUrl + "&text=" + pageTitle;
            var left = 100;
            var top = 100;
            var width = 500;
            var height = 500;
            var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
            if (cc.sys.isNative) {
                cc.sys.openURL(url);
            }
            else {
                window.open(url,"",params);
            }
        }
        else if (data.type == "facebook") {
            var pageUrl = encodeURIComponent("https://mypoker.com/?v=" + GameManager.user.userName);
            var pageTitle = encodeURIComponent(data.text);
            let url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
            var left = 100;
            var top = 100;
            var width = 500;
            var height = 500;
            var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
            if (cc.sys.isNative) {
                cc.sys.openURL(url);
            }
            else {
                window.open(url,"",params);
            }
        }
    },

    onIncreaseCurrentJackpotPool:function(data) {
        console.log("onIncreaseCurrentJackpotPool", data);

        if (this.badbeat) {
            this.badbeat.string = "Bad Beat Pool:" + data.badBeatpool.toFixed(2);
        }
    },

    onJackpotWin:function(data) {
        console.log("onJackpotWin", data);

        var param = {
            code: 6666,
            response: data.info
        };
        GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
    },

    onBan:function(data) {
        console.log("onBan", data);

        var param = {
            code: 9999,
            response: data.info
        };
        GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
    },

    onPlayerEvent: function (response) {
        // response.data.realChips
        let delta = Number(response.data.realChips) - Number(GameManager.user.realChips);
        GameManager.user.realChips = response.data.realChips;
        this.balance.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));
        // // // this.balance2.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));
        // 
        if (delta > 0) {
            GameManager.popUpManager.show(
                PopUpType.CommonDialog, 
                {
                    "title": "Congratulations!",
                    "content" : "You have received " + delta + " chips."
                }, 
                function () {}
            );
        }
    },

    /**
     * @method displayOnlinePlayers
     * @description shows no of player online
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    displayOnlinePlayers: function () {
        // this.onlinePlayersLbl.string = GameManager.onlinePlayers;
    },
    // start: function () {
    //     this.refreshDetails();
    // },

    /**
     * @method imageLoaded
     * @description method to show image when ready on recieving the event.
     * @param {object} user
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    imageLoaded: function (user) {
        // console.error("LOBBY IMAGE DATA ", user)
        // console.log("LOBBY IMAGE DATA PLAYER ID ",user.urlImg)
        // console.log("android", user.urlImg)
        if (GameManager.user.playerId === user.playerId) {
            this.playerImg.spriteFrame = user.urlImg;
        }
    },

    /**
     * @method refreshDetails
     * @description Method to update player specific details, specifically after login
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    refreshDetails: function () {
        // console.error("22222",GameManager.user.urlImg)
        this.playerName.string = GameManager.user.userName;
        // console.log("android", GameManager.user.urlImg)
        this.playerImg.spriteFrame = GameManager.user.urlImg;
        // console.log("REFRRESH DETAILS LOBBY ", GameManager.user.urlImg)
        //this.balance.string = GameManager.user.realChips;
        this.playerId.string = "ID: " + GameManager.user.playerId;
    },

    /**
     * @method onValueChange
     * @description Updates chips amount based on user selection
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onValueChange: function () {
        GameManager.playSound(K.Sounds.click);
        var color = cc.Color.BLACK;
        // console.log(this.realMoneyCheck.isC)
        if (GameManager.isMobile || this.realMoneyCheck.isChecked) {
            this.balance.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));
            // // // this.balance2.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));
            // refresh tables            
            this.innerTabs.updateCurrentTable();
            // this.claimChipsBtn.active = false;
            // this.realMoneyHeaderLbl.color = this.selectionColor;
            // this.playMoneyHeaderLbl.color = this.fadeColor;

            this.realMoneyCheck.node.getChildByName('New Label').getComponent(cc.LabelOutline).color = color.fromHEX("#940808");
            this.playMoneyCheck.node.getChildByName('New Label').getComponent(cc.LabelOutline).color = color.fromHEX("#201D1D");


        } else {
            // this.balance.string = parseInt(GameManager.user.freeChips);
            // refresh tables
            this.innerTabs.updateCurrentTable();
            // this.claimChipsBtn.active = true;
            // this.realMoneyHeaderLbl.color = this.fadeColor;
            // this.playMoneyHeaderLbl.color = this.selectionColor;
            this.realMoneyCheck.node.getChildByName('New Label').getComponent(cc.LabelOutline).color = color.fromHEX("#201D1D");
            this.playMoneyCheck.node.getChildByName('New Label').getComponent(cc.LabelOutline).color = color.fromHEX("#940808");
        }
        GameManager.isRealMoney = (GameManager.isMobile) ? true : this.realMoneyCheck.isSelected;
    },

    // isShowHoldem: false,
    // isShowPLO: false,
    // isShowMega: false,
    // isShowAllIn: false,
    // isShowFast: false,
    // isShowAll: true

    onShowAll: function (fromMainMenu=false, cb=null) {
        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 0.3);

        // if (fromMainMenu == true) {
        //     CashRoom.isPriactice = false;
        // }
        // if (this.roomTable.active) {
            // this.roomTable.getComponent('CashRoom').isShowAll = true;
            // this.roomTable.getComponent('CashRoom').isShowHoldem = false;
            // this.roomTable.getComponent('CashRoom').isShowPLO = false;
            // this.roomTable.getComponent('CashRoom').isShowMega = false;
            // this.roomTable.getComponent('CashRoom').isShowAllIn = false;
            // this.roomTable.getComponent('CashRoom').isShowFast = false;

            CashRoom.isShowAll = true;
            CashRoom.isShowHoldem = false;
            CashRoom.isShowPLO = false;
            CashRoom.isShowMega = false;
            CashRoom.isShowAllIn = false;
            CashRoom.isShowFast = false;
            this.setActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
            this.setInActiveButton(this.tabButtons2[1], this.tabButtons2[1]);
            this.setInActiveButton(this.tabButtons2[2], this.tabButtons2[2]);
            this.setInActiveButton(this.tabButtons2[3], this.tabButtons2[3]);
            this.setInActiveButton(this.tabButtons2[4], this.tabButtons2[4]);
            this.setInActiveButton(this.tabButtons2[5], this.tabButtons2[5]);
            this.setInActiveButton(this.tabButtons2[6], this.tabButtons2[6]);
            // this.roomTable.getComponent('CashRoom').onEnable();

            // this.onGetTableData((data) => {
            //     if (cb) {
            //         cb();
            //     }
            //     if (fromMainMenu == true) {
            //         this.runShowAnimation();
            //     }
            //     this.roomTable.getComponent('CashRoom').onEnable2(data);
            // });
        // }
        // else {
        //     this.tables.forEach(function (element) {
        //         element.variation = K.Variation.All;
        //         // element.onEnable();
        //     }, this);
        //     this.setActiveButton(this.tabButtons[0], this.tabButtons[this.currentTab]);
        //     // this.innerTabs.updateCurrentTable();
        // }
        
        // this.tabs.active = true;
        // this.currentTab = 0;
        GameManager.playSound(K.Sounds.click);
    },


    /**
     * @method onShowHoldem
     * @description Show Holdem button handler
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onShowHoldem: function (fromMainMenu=false, cb=null) {
        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 0.3);
        
        // if (fromMainMenu == true) {
        //     CashRoom.isPriactice = false;
        // }
        
        // if (this.roomTable.active) {
            CashRoom.isShowAll = false;
            CashRoom.isShowHoldem = false;
            CashRoom.isShowPLO = false;
            CashRoom.isShowMega = false;
            CashRoom.isShowAllIn = false;
            CashRoom.isShowFast = false;
            this.setInActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
            this.setInActiveButton(this.tabButtons2[1], this.tabButtons2[1]);
            this.setInActiveButton(this.tabButtons2[2], this.tabButtons2[2]);
            this.setInActiveButton(this.tabButtons2[3], this.tabButtons2[3]);
            this.setInActiveButton(this.tabButtons2[4], this.tabButtons2[4]);
            this.setInActiveButton(this.tabButtons2[5], this.tabButtons2[5]);
            this.setInActiveButton(this.tabButtons2[6], this.tabButtons2[6]);
            // if (CashRoom.isShowHoldem) {
            //     CashRoom.isShowHoldem = false;
            //     this.setInActiveButton(this.tabButtons2[1], this.tabButtons2[1]);

            //     if (!CashRoom.isShowHoldem &&
            //         !CashRoom.isShowPLO &&
            //         !CashRoom.isShowMega &&
            //         !CashRoom.isShowAllIn &&
            //         !CashRoom.isShowFast) {
            //         this.onShowAll(fromMainMenu, cb);
            //         return;
            //     }

            // }
            // else {
                CashRoom.isShowHoldem = true;
                this.setActiveButton(this.tabButtons2[1], this.tabButtons2[1]);
        //     }
        //     this.setInActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
        //     // this.roomTable.getComponent('CashRoom').onEnable();

        //     this.onGetTableData((data) => {
        //         if (cb) {
        //             cb();
        //         }
        //         if (fromMainMenu == true) {
        //             this.runShowAnimation();
        //         }
        //         this.roomTable.getComponent('CashRoom').onEnable2(data);
        //     });
        // }
        // else {
        //     this.tables.forEach(function (element) {
        //         element.variation = K.Variation.TexasHoldem;
        //         // element.onEnable();
        //     }, this);
        //     this.setActiveButton(this.tabButtons[1], this.tabButtons[this.currentTab]);
        //     // this.innerTabs.updateCurrentTable();
        // }
        
        // this.innerTabs.updateCurrentTable();
        // this.tabs.active = true;
        // this.currentTab = 1;
        GameManager.playSound(K.Sounds.click);

    },

    forceKeepLoadingTimer() {
        console.log("!!!!!!forceKeepLoadingTimer");
        ServerCom.forceKeepLoading = true;
    },

    onGetTableData: function (cb) {
        var inst = this;
        
        // this.scheduleOnce(this.forceKeepLoadingTimer, 1);

        // ServerCom.pomeloRequest("connector.entryHandler.getLobbyRooms", {
        //     isRealMoney: true,
        //     channelVariation: "All",
        //     playerId: GameManager.user.playerId,
        //     isLoggedIn: true,
        //     access_token: K.Token.access_token
        // }, (response) => {
        //     console.log("TABLE DATA IS ", JSON.parse(JSON.stringify(response)));

        //     inst.unschedule(inst.forceKeepLoadingTimer);

        //     if (cb) {
        //         ServerCom.forceKeepLoading = false;
        //         ServerCom.loading.active = false;
        //         cb(response.result);
        //     }

        // }, null, 5000, false);
    },

    /**
     * @method onShowOmaha
     * @description Show Omaha button handler
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onShowOmaha: function (fromMainMenu=false, cb=null) {
        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 0.3);
        // if (fromMainMenu == true) {
        //     CashRoom.isPriactice = false;
        // }
        // if (this.roomTable.active) {
            CashRoom.isShowAll = false;
            CashRoom.isShowHoldem = false;
            CashRoom.isShowPLO = false;
            CashRoom.isShowMega = false;
            CashRoom.isShowAllIn = false;
            CashRoom.isShowFast = false;
            this.setInActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
            this.setInActiveButton(this.tabButtons2[1], this.tabButtons2[1]);
            this.setInActiveButton(this.tabButtons2[2], this.tabButtons2[2]);
            this.setInActiveButton(this.tabButtons2[3], this.tabButtons2[3]);
            this.setInActiveButton(this.tabButtons2[4], this.tabButtons2[4]);
            this.setInActiveButton(this.tabButtons2[5], this.tabButtons2[5]);
            this.setInActiveButton(this.tabButtons2[6], this.tabButtons2[6]);
            // if (CashRoom.isShowPLO) {
            //     CashRoom.isShowPLO = false;
            //     this.setInActiveButton(this.tabButtons2[2], this.tabButtons2[2]);

            //     if (!CashRoom.isShowHoldem &&
            //         !CashRoom.isShowPLO &&
            //         !CashRoom.isShowMega &&
            //         !CashRoom.isShowAllIn &&
            //         !CashRoom.isShowFast) {
            //         this.onShowAll(fromMainMenu, cb);
            //         return;
            //     }
            // }
            // else {
                CashRoom.isShowPLO = true;
                this.setActiveButton(this.tabButtons2[2], this.tabButtons2[2]);
            // }
            // this.setInActiveButton(this.tabButtons2[0], this.tabButtons2[0]);

            // this.onGetTableData((data) => {
            //     if (cb) {
            //         cb();
            //     }
            //     if (fromMainMenu == true) {
            //         this.runShowAnimation();
            //     }
            //     this.roomTable.getComponent('CashRoom').onEnable2(data);
            // });
        // }
        // else {
        //     this.tables.forEach(function (element) {
        //         element.variation = K.Variation.Omaha;
        //         // element.onEnable();
        //     }, this);
        //     this.setActiveButton(this.tabButtons[2], this.tabButtons[this.currentTab]);
        //     // this.innerTabs.updateCurrentTable();
        // }
        // // this.tabs.active = true;
        // this.currentTab = 2;
        GameManager.playSound(K.Sounds.click);
    },

    onShowMega: function (fromMainMenu=false, cb=null) {
        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 1);
        if (fromMainMenu == true) {
            CashRoom.isPriactice = false;
        }
        if (this.roomTable.active) {
            this.roomTable.getComponent('CashRoom').isShowAll = false;
            this.roomTable.getComponent('CashRoom').isShowHoldem = false;
            this.roomTable.getComponent('CashRoom').isShowPLO = false;
            this.roomTable.getComponent('CashRoom').isShowMega = false;
            this.roomTable.getComponent('CashRoom').isShowAllIn = false;
            this.roomTable.getComponent('CashRoom').isShowFast = false;
            this.setInActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
            this.setInActiveButton(this.tabButtons2[1], this.tabButtons2[1]);
            this.setInActiveButton(this.tabButtons2[2], this.tabButtons2[2]);
            this.setInActiveButton(this.tabButtons2[3], this.tabButtons2[3]);
            this.setInActiveButton(this.tabButtons2[4], this.tabButtons2[4]);
            this.setInActiveButton(this.tabButtons2[5], this.tabButtons2[5]);
            this.setInActiveButton(this.tabButtons2[6], this.tabButtons2[6]);
            if (this.roomTable.getComponent('CashRoom').isShowMega) {
                this.roomTable.getComponent('CashRoom').isShowMega = false;
                this.setInActiveButton(this.tabButtons2[3], this.tabButtons2[3]);

                if (!this.roomTable.getComponent('CashRoom').isShowHoldem &&
                    !this.roomTable.getComponent('CashRoom').isShowPLO &&
                    !this.roomTable.getComponent('CashRoom').isShowMega &&
                    !this.roomTable.getComponent('CashRoom').isShowAllIn &&
                    !this.roomTable.getComponent('CashRoom').isShowFast) {
                    this.onShowAll(fromMainMenu, cb);
                    return;
                }
            }
            else {
                this.roomTable.getComponent('CashRoom').isShowMega = true;
                this.setActiveButton(this.tabButtons2[3], this.tabButtons2[3]);
            }
            this.setInActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
            
            this.onGetTableData((data) => {
                if (cb) {
                    cb();
                }
                if (fromMainMenu == true) {
                    this.runShowAnimation();
                }
                this.roomTable.getComponent('CashRoom').onEnable2(data);
            });
        }
        this.tabs.active = true;
        GameManager.playSound(K.Sounds.click);
    },

    onShowFast: function (fromMainMenu=false, cb=null) {
        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 1);
        if (fromMainMenu == true) {
            CashRoom.isPriactice = false;
        }
        if (this.roomTable.active) {
            this.roomTable.getComponent('CashRoom').isShowAll = false;
            this.roomTable.getComponent('CashRoom').isShowHoldem = false;
            this.roomTable.getComponent('CashRoom').isShowPLO = false;
            this.roomTable.getComponent('CashRoom').isShowMega = false;
            this.roomTable.getComponent('CashRoom').isShowAllIn = false;
            this.roomTable.getComponent('CashRoom').isShowFast = false;
            this.setInActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
            this.setInActiveButton(this.tabButtons2[1], this.tabButtons2[1]);
            this.setInActiveButton(this.tabButtons2[2], this.tabButtons2[2]);
            this.setInActiveButton(this.tabButtons2[3], this.tabButtons2[3]);
            this.setInActiveButton(this.tabButtons2[4], this.tabButtons2[4]);
            this.setInActiveButton(this.tabButtons2[5], this.tabButtons2[5]);
            this.setInActiveButton(this.tabButtons2[6], this.tabButtons2[6]);
            if (this.roomTable.getComponent('CashRoom').isShowFast) {
                this.roomTable.getComponent('CashRoom').isShowFast = false;
                this.setInActiveButton(this.tabButtons2[4], this.tabButtons2[4]);

                if (!this.roomTable.getComponent('CashRoom').isShowHoldem &&
                    !this.roomTable.getComponent('CashRoom').isShowPLO &&
                    !this.roomTable.getComponent('CashRoom').isShowMega &&
                    !this.roomTable.getComponent('CashRoom').isShowAllIn &&
                    !this.roomTable.getComponent('CashRoom').isShowFast) {
                    this.onShowAll(fromMainMenu, cb);
                    return;
                }
            }
            else {
                this.roomTable.getComponent('CashRoom').isShowFast = true;
                this.setActiveButton(this.tabButtons2[4], this.tabButtons2[4]);
            }
            this.setInActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
            // this.roomTable.getComponent('CashRoom').onEnable();

            this.onGetTableData((data) => {
                if (cb) {
                    cb();
                }
                if (fromMainMenu == true) {
                    this.runShowAnimation();
                }
                this.roomTable.getComponent('CashRoom').onEnable2(data);
            });
        }
        this.tabs.active = true;
        GameManager.playSound(K.Sounds.click);
    },

    onShowAllin: function (fromMainMenu=false, cb=null) {
        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 1);
        if (fromMainMenu == true) {
            CashRoom.isPriactice = false;
        }
        if (this.roomTable.active) {
            this.roomTable.getComponent('CashRoom').isShowAll = false;
            this.roomTable.getComponent('CashRoom').isShowHoldem = false;
            this.roomTable.getComponent('CashRoom').isShowPLO = false;
            this.roomTable.getComponent('CashRoom').isShowMega = false;
            this.roomTable.getComponent('CashRoom').isShowAllIn = false;
            this.roomTable.getComponent('CashRoom').isShowFast = false;
            this.setInActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
            this.setInActiveButton(this.tabButtons2[1], this.tabButtons2[1]);
            this.setInActiveButton(this.tabButtons2[2], this.tabButtons2[2]);
            this.setInActiveButton(this.tabButtons2[3], this.tabButtons2[3]);
            this.setInActiveButton(this.tabButtons2[4], this.tabButtons2[4]);
            this.setInActiveButton(this.tabButtons2[5], this.tabButtons2[5]);
            this.setInActiveButton(this.tabButtons2[6], this.tabButtons2[6]);
            if (this.roomTable.getComponent('CashRoom').isShowAllIn) {
                this.roomTable.getComponent('CashRoom').isShowAllIn = false;
                this.setInActiveButton(this.tabButtons2[5], this.tabButtons2[5]);

                if (!this.roomTable.getComponent('CashRoom').isShowHoldem &&
                    !this.roomTable.getComponent('CashRoom').isShowPLO &&
                    !this.roomTable.getComponent('CashRoom').isShowMega &&
                    !this.roomTable.getComponent('CashRoom').isShowAllIn &&
                    !this.roomTable.getComponent('CashRoom').isShowFast) {
                    this.onShowAll(fromMainMenu, cb);
                    return;
                }
            }
            else {
                this.roomTable.getComponent('CashRoom').isShowAllIn = true;
                this.setActiveButton(this.tabButtons2[5], this.tabButtons2[5]);
            }
            this.setInActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
            // this.roomTable.getComponent('CashRoom').onEnable();

            this.onGetTableData((data) => {
                if (cb) {
                    cb();
                }
                if (fromMainMenu == true) {
                    this.runShowAnimation();
                }
                this.roomTable.getComponent('CashRoom').onEnable2(data);
            });
        }
        this.tabs.active = true;
        GameManager.playSound(K.Sounds.click);
    },

    onShowSpin: function () {
        GameManager.playSound(K.Sounds.click);
    },

    onShowAdvanced: function () {
        GameManager.playSound(K.Sounds.click);
        this.advancedFilter.active = true;
        this.advancedFilter.getComponent('Advancefilter').onShow({});

        this.advancedFilter.opacity = 0;
        var anim = this.advancedFilter.getComponent('AnimBase');
        var inst = this;
        if (anim !== null) {
            anim.play("showPopUp", function () {});
        }
    },

    /**
     * @method onShowOmahaHL
     * @description Show OmahaHiLow button handler
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onShowOmahaHL: function () {
        this.tables.forEach(function (element) {
            element.variation = K.Variation.OmahaHiLo;
            // element.onEnable();
        }, this);
        this.innerTabs.updateCurrentTable();
        this.tabs.active = true;
        this.setActiveButton(this.tabButtons[2], this.tabButtons[this.currentTab]);
        this.currentTab = 2;
        GameManager.playSound(K.Sounds.click);

    },

    /**
     * @method onShowOFC
     * @description Show OpenFaceChinese button handler
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onShowOFC: function () {
        this.tables.forEach(function (element) {
            element.variation = K.Variation.OpenFaceChinesePoker;
            // element.onEnable();
        }, this);
        this.innerTabs.updateCurrentTable();
        this.tabs.active = true;
        this.setActiveButton(this.tabButtons[3], this.tabButtons[this.currentTab]);
        this.currentTab = 3;
        GameManager.playSound(K.Sounds.click);

    },

    /**
     * @method onShowLobbySettings
     * @description Show Lobby Settings Dialog
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onShowLobbySettings: function () {
        this.popUpManager.show(PopUpType.GamePreferencesPopup, null, function () { });
        // this.popUpManager.show(PopUpType.LobbySettingsPopup, null, function () { });
        // if (!GameManager.user.muteGameSound) {

        GameManager.playSound(K.Sounds.click);
        // }
    },

    /**
     * @method onShowCashier
     * @description Show Cashier Dialog
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onShowCashier: function (event) {
        var requestObject = {
            playerId: GameManager.user.playerId,

        };
        //Simulate tab behaviour because of view for this popup.
        //Get current active tab and send it to be reopened when cashier popup closes.

        GameManager.playSound(K.Sounds.click);





        ServerCom.pomeloRequest(K.PomeloAPI.getCashDetails, requestObject, function (response) {
            if (response.success) {

                // if (GameManager.isMobile) {
                //     this.popUpManager.show(PopUpType.CashierPopup, response.result, function () {});
                //     return
                // }

                // let tbInst = this.tabs.getComponent('TabBtnUtil');
                // tbInst.tabButtons[tbInst.currentTab].getComponent(cc.Sprite).spriteFrame = tbInst.inactiveSprite;
                // tbInst.tabButtons[tbInst.currentTab].node.getChildByName("Label").color = tbInst.inactiveColor;




                // event.target.getComponent(cc.Sprite).spriteFrame = tbInst.activeSprite;

                // if (tbInst.ifSwitchOutline) {
                //     tbInst.tabButtons[tbInst.currentTab].node.getChildByName("Label").getComponent(cc.LabelOutline).color = tbInst.inactiveOutline;
                //     event.target.getChildByName('Label').getComponent(cc.LabelOutline).color = tbInst.activeOutline;
                // }

                // let scopedTarget = event.target;
                // let cb = function () {
                //     tbInst.tabButtons[tbInst.currentTab].getComponent(cc.Sprite).spriteFrame = tbInst.activeSprite;
                //     tbInst.tabButtons[tbInst.currentTab].node.getChildByName("Label").color = tbInst.activeColor;
                //     scopedTarget.getComponent(cc.Sprite).spriteFrame = tbInst.inactiveSprite;
                //     if (tbInst.ifSwitchOutline) {
                //         tbInst.tabButtons[tbInst.currentTab].node.getChildByName("Label").getComponent(cc.LabelOutline).color = tbInst.activeOutline;
                //         scopedTarget.getChildByName('Label').getComponent(cc.LabelOutline).color = tbInst.inactiveOutline;
                //     }
                // }

                // response.result.restoreActiveTab = cb;
                this.popUpManager.show(PopUpType.CashierPopup, response.result, function () { });
            }
        }.bind(this), null, 2000);
    },

    /**
     * @method collectFreeChips
     * @description Claim free chips
     * @param {callBack} callBack
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    collectFreeChips: function (callback) {
        var address = K.ServerAddress.ipAddress + ":" + K.ServerAddress.port + K.ServerAPI.freeChips;
        var data = {};
        data.playerId = GameManager.user.playerId;
        ServerCom.httpPostRequest(address, data, function (response) {
            if (response.success) {
                this.refreshPlayerChips();
                var msg = {};
                msg.heading = LocalizedManager.t( 'TXT_FREE_CHIPS' );
                msg.info = LocalizedManager.t( 'TXT_GET_FREE_CHIP' );
                // msg.info = "Congrats! You have received \n10,000 free Play money chips."
                GameManager.popUpManager.show(PopUpType.PlayerInfoPopup, msg, function () { });
            }
        }.bind(this));
        GameManager.playSound(K.Sounds.click);


    },

    /**
     * @method onShowQuickSeat
     * @description Show Quick Seat Container
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onShowQuickSeat: function () {
        this.popUpManager.show(PopUpType.QuickSeatPopUp, this.realMoneyCheck.isSelected, function () { });
    },

    /**
     * @method onShowProfile
     * @description Show Quick Seat Container
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onShowProfile: function () {
        this.popUpManager.show(PopUpType.AvatarDialog, null, function () { });
    },

    /**
     * @method setActiveButton
     * @description Handles tab button transition
     * @param {object} currBtn 
     * @param {object} prevBtn 
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    setActiveButton: function (currBtn) {
        // if (prevBtn !== null) // && prevBtn !== undefined)
        // {
        //     prevBtn.getComponent(cc.Sprite).spriteFrame = this.inactiveSprite;
        //     prevBtn.node.getChildByName("Label").color = this.inactiveColor;
        // }
        // currBtn.spriteFrame = this.activeSprite;
        // currBtn.node.getChildByName("Label").color = this.activeColor;

        if (currBtn.node.getChildByName("pressed")) {
            currBtn.node.getChildByName("pressed").active = true;
        }
    },

    setInActiveButton: function (currBtn) {
        // if (prevBtn !== null) // && prevBtn !== undefined)
        // {
        //     prevBtn.getComponent(cc.Sprite).spriteFrame = this.inactiveSprite;
        //     prevBtn.node.getChildByName("Label").color = this.inactiveColor;
        // }
        // currBtn.spriteFrame = this.activeSprite;
        // currBtn.node.getChildByName("Label").color = this.activeColor;

        // currBtn.getComponent(cc.Sprite).spriteFrame = this.inactiveSprite;
        // currBtn.node.getChildByName("Label").color = this.inactiveColor;

        if (currBtn.node.getChildByName("pressed")) {
            currBtn.node.getChildByName("pressed").active = false;
        }
    },

    /**
     * @method onShowGamePlay
     * @description Show gamePlay screen
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onShowGameplay: function () {
        if (GameManager.activeTableCount > 0) {
            ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, null, function () { }, false);
        }
    },

    onMobileCashOut: function () {
        this.popUpManager.show(PopUpType.CashoutPopup, null, function () { });
    },

    onLoyalityPoints: function () {
        GameManager.playSound(K.Sounds.click);
        let url2 = K.ServerAddress.cashier_AddCash_URL;
        // let url2 = K.ServerAddress.cashier_VIPCLUB_URL;
        window.open(url2);
    },

    onContactUs: function () {
        GameManager.playSound(K.Sounds.click);
        let url2 = K.ServerAddress.contact_us_URL;
        cc.sys.openURL(url2);
    },

    onTableClick: function (data, custom) {
        GameManager.playSound(K.Sounds.click);
        // GameScreen.gameModel.activePokerModels.forEach(function (element, i) {
        // element.node.destroy();  
        ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, custom, function () { });
        // }, this);
    },


    onShowFreeRoll : function() {
        console.log("free roll clicked");
    },

    onShowFundTransfer: function (event) {
        GameManager.playSound(K.Sounds.click);

        var requestObject = {
            senderUserName: GameManager.user.userName,
            receiverUserName: GameManager.user.userName,
            skip: 0,
            limit: 20,
            sortValue: "time"
        };

        ServerCom.pomeloRequest("connector.entryHandler.getP2PChipsTransferringHistory", {"query": requestObject}, function (response) {
            console.log("response", response);
            if (response.success) {

                let tbInst = this.tabs.getComponent('TabBtnUtil');
                tbInst.tabButtons[tbInst.currentTab].getComponent(cc.Sprite).spriteFrame = tbInst.inactiveSprite;
                tbInst.tabButtons[tbInst.currentTab].node.getChildByName("Label").color = tbInst.inactiveColor;

                event.target.getComponent(cc.Sprite).spriteFrame = tbInst.activeSprite;

                if (tbInst.ifSwitchOutline) {
                    tbInst.tabButtons[tbInst.currentTab].node.getChildByName("Label").getComponent(cc.LabelOutline).color = tbInst.inactiveOutline;
                    event.target.getChildByName('Label').getComponent(cc.LabelOutline).color = tbInst.activeOutline;
                }

                let scopedTarget = event.target;
                let cb = function () {
                    tbInst.tabButtons[tbInst.currentTab].getComponent(cc.Sprite).spriteFrame = tbInst.activeSprite;
                    tbInst.tabButtons[tbInst.currentTab].node.getChildByName("Label").color = tbInst.activeColor;
                    scopedTarget.getComponent(cc.Sprite).spriteFrame = tbInst.inactiveSprite;
                    if (tbInst.ifSwitchOutline) {
                        tbInst.tabButtons[tbInst.currentTab].node.getChildByName("Label").getComponent(cc.LabelOutline).color = tbInst.activeOutline;
                        scopedTarget.getChildByName('Label').getComponent(cc.LabelOutline).color = tbInst.inactiveOutline;
                    }
                }

                response.data.restoreActiveTab = cb;

                this.popUpManager.show(PopUpType.FundTransferPopup, response.data, function () { });
            }
            else {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, response.info, function () { });
            }
        }.bind(this), null, 5000);

        // this.popUpManager.show(PopUpType.FundTransferPopup, {}, function () { });
    },

    runShowAnimation: function() {
        return;
        // console.log("runShowAnimation getNumberOfRunningActions", this.leftNode.getNumberOfRunningActions());
        // if (this.leftNode.getNumberOfRunningActions() > 0) {
        //     return;
        // }

        // this.leftNode.active = true;
        // this.scrollViewNode.active = true;
        // this.bottomNode.active = true;
        // this.centerNode.x = this.node.width;

        // this.bottomNode.runAction(
        //     cc.moveTo(0.5, cc.v2(-this.node.width, this.bottomNode.y))
        // );
        // this.leftNode.runAction(
        //     cc.moveTo(0.5, cc.v2(-this.node.width, this.leftNode.y))
        // );
        // this.scrollViewNode.runAction(
        //     cc.moveTo(0.5, cc.v2(-this.node.width, this.scrollViewNode.y))
        // );
        // this.centerNode.runAction(
        //     cc.moveTo(0.5, cc.v2(0, this.centerNode.y))
        // );
    },

    runHideAnimation: function() {
        return;
        // console.log("runHideAnimation getNumberOfRunningActions", this.leftNode.getNumberOfRunningActions());
        // if (this.leftNode.getNumberOfRunningActions() > 0) {
        //     return;
        // }
        // this.leftNode.active = true;
        // this.scrollViewNode.active = true;
        // this.bottomNode.active = true;
        // this.leftNode.x = -this.node.width;
        // this.scrollViewNode.x = -this.node.width;
        // this.bottomNode.x = -this.node.width;
        // this.centerNode.x = 0;

        // console.log("!!!runHideAnimation");
        // this.leftNode.runAction(
        //     cc.sequence(
        //         cc.moveTo(0.5, cc.v2(0, this.leftNode.y)),
        //         cc.callFunc(() => {
        //             this.leftNode.x = 0;
        //         })
        //     )
        // );
        // this.bottomNode.runAction(
        //     cc.sequence(
        //         cc.moveTo(0.5, cc.v2(0, this.bottomNode.y)),
        //         cc.callFunc(() => {
        //             this.bottomNode.x = 0;
        //         })
        //     )
        // );
        // this.scrollViewNode.runAction(
        //     cc.sequence(
        //         cc.moveTo(0.5, cc.v2(0, this.scrollViewNode.y)),
        //         cc.callFunc(() => {
        //             this.scrollViewNode.x = 0;
        //         })
        //     )
        // );
        // this.centerNode.runAction(
        //     cc.sequence(
        //         cc.moveTo(0.5, cc.v2(this.node.width, this.centerNode.y)),
        //         cc.callFunc(() => {
        //             this.centerNode.x = 0;
        //         })
        //     )
        // );
    },

    onCashierGame: function () {
        // if (!GameManager.isMobile) {
        //     this.adNode.scale = 0.46;
        // }

        this.pokersFormat.active = false;
        // this.leftNode.active = false;
        // this.bottomNode.active = false;

        // this.scrollViewNode.active = false;
        this.tournamentTable.active = false;
        // this.cashierTable.active = false;
        this.roomTable.scale = 1;
        if (!GameManager.isMobile) {
            this.roomTable.scale = 0.8;
        }
        this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
        this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite2;
        this.cashierTabNode.children[0].children[0].color = cc.Color.WHITE;
        this.tournamentTabNode.children[0].children[0].color = cc.Color.BLACK;
        // this.onShowAll(true);
    },

    onCashierGame2: function () {
        // if (!GameManager.isMobile) {
        //     this.adNode.scale = 0.46;
        // }
        if (this.cashierTable.active) {
            this.top.active = true;
////            this.top2.active = false;
        }

        this.pokersFormat.active = false;
        this.privateNode.active = false;
        this.friendsNode.active = false;
        // this.leftNode.active = false;
        // this.bottomNode.active = false;

        // this.scrollViewNode.active = false;
        this.tournamentTable.active = false;
        // this.cashierTable.active = false;
        this.roomTable.scale = 1;
        if (!GameManager.isMobile) {
            this.roomTable.scale = 0.8;
        }
        this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
        this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite2;
        this.cashierTabNode.children[0].children[0].color = cc.Color.WHITE;
        this.tournamentTabNode.children[0].children[0].color = cc.Color.BLACK;
    },

    onTournamentList: function () {
        if (!GameManager.isMobile) {
            // this.adNode.scale = 0.46;
        }

        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 1);

        let needAnim = (this.scrollViewNode.x == 0);

        this.pokersFormat.active = false;
        this.privateNode.active = false;
        this.friendsNode.active = false;
        // this.leftNode.active = false;
        // this.bottomNode.active = false;

        // this.scrollViewNode.active = false;
        // this.cashierTable.active = false;
        this.tournamentTable.active = true;
        this.tournamentTable.opacity = 255;
        this.roomTable.scale = 0;
        this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite;
        this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite2;
        this.cashierTabNode.children[0].children[0].color = cc.Color.BLACK;
        this.tournamentTabNode.children[0].children[0].color = cc.Color.WHITE;

        if (needAnim) {
            this.runShowAnimation();
        }
    },

    onBackLobby: function (event, msg, animated=true) {
        if (!GameManager.isMobile) {
            // this.adNode.scale = 0.9;
        }

        if (this.roomTable.scale == 0 && !this.tournamentTable.active) {
            this.onBackLobby2(event, msg, animated && this.roomTable.scale != 0);
            return;
        }

        // this.top.active = true;
////        // this.top2.active = false;

        // this.leftNode.active = true;
        // this.bottomNode.active = true;

        // this.scrollViewNode.active = true;
        // this.cashierTable.active = false;
        // this.tournamentTable.active = false;

        // this.mainButtons.children.forEach((elem) => {
        //     elem.getChildByName("Background").color = cc.Color.WHITE;
        //     elem.getChildByName("Label").color = cc.Color.WHITE;
        // }, this);
        // this.mainButtons.children[0].getChildByName("Background").color = cc.Color.YELLOW;
        // this.mainButtons.children[0].getChildByName("Label").color = cc.Color.YELLOW;

        // this.roomTable.getComponent('CashRoom').isShowAll = true;
        // this.roomTable.getComponent('CashRoom').isShowHoldem = false;
        // this.roomTable.getComponent('CashRoom').isShowPLO = false;
        // this.roomTable.getComponent('CashRoom').isShowMega = false;
        // this.roomTable.getComponent('CashRoom').isShowAllIn = false;
        // this.roomTable.getComponent('CashRoom').isShowFast = false;
        // this.setActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
        // this.setInActiveButton(this.tabButtons2[1], this.tabButtons2[1]);
        // this.setInActiveButton(this.tabButtons2[2], this.tabButtons2[2]);
        // this.setInActiveButton(this.tabButtons2[3], this.tabButtons2[3]);
        // this.setInActiveButton(this.tabButtons2[4], this.tabButtons2[4]);
        // this.setInActiveButton(this.tabButtons2[5], this.tabButtons2[5]);
        // this.setInActiveButton(this.tabButtons2[6], this.tabButtons2[6]);



        this.top.active = true;
////        this.top2.active = false;
        
        // this.cashierTable.active = false;
        // this.roomTable.active = true;
        // this.roomTable.scale = 1;
        if (!GameManager.isMobile) {
            this.roomTable.scale = 0.8;
        }
        
        // this.roomTable.getComponent('CashRoom').onEnable();

        this.onGetTableData((data) => {
            this.roomTable.getComponent('CashRoom').onEnable2(data, false);
        });

        if (animated) {
            this.runHideAnimation();
        }
    },

    onBackLobby2: function  (event, msg, animated=true) {

        this.top.active = true;
////        this.top2.active = false;
        
        // this.cashierTable.active = false;
        this.roomTable.active = true;
        this.roomTable.scale = 1;
        if (!GameManager.isMobile) {
            this.roomTable.scale = 0.8;
        }
        
        // this.roomTable.getComponent('CashRoom').onEnable();

        this.onGetTableData((data) => {
            this.roomTable.getComponent('CashRoom').onEnable2(data, false);
        });

        if (animated) {
            this.runHideAnimation();
        }
    },

    onCashierGameTex: function () {

        // this.onShowHoldem(true, () => {

        //     // this.pokersFormat.active = false;
        //     // this.leftNode.active = false;
        //     // this.bottomNode.active = false;
        //     // this.scrollViewNode.active = false;
        //     this.cashierTable.active = false;
        //     this.tournamentTable.active = false;
        //     // this.roomTable.scale = 1;
        //     // if (!GameManager.isMobile) {
        //     // this.roomTable.scale = 0.8;
        // }
        //     this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
        //     this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite2;
        //     this.cashierTabNode.children[0].children[0].color = cc.Color.WHITE;
        //     this.tournamentTabNode.children[0].children[0].color = cc.Color.BLACK;
        // });

        // this.scheduleOnce(() => {

        //     if (!GameManager.isMobile) {
        //         // this.adNode.scale = 0.46;
        //     }

        //     this.scrollViewNode.active = false;
        //     this.cashierTable.active = false;
        //     this.tournamentTable.active = false;
        //     this.roomTable.active = true;
        //     this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
        //     this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite;
        // }, 0.6);
    },

    onCashierGameOhama: function () {

        // this.onShowOmaha(true, () => {
        //     // this.pokersFormat.active = false;
        //     // this.leftNode.active = false;
        //     // this.bottomNode.active = false;
        //     // this.scrollViewNode.active = false;
        //     this.cashierTable.active = false;
        //     this.tournamentTable.active = false;
        //     // this.roomTable.scale = 1;
        //     // if (!GameManager.isMobile) {
        //     // this.roomTable.scale = 0.8;
        // }
        //     this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
        //     this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite2;
        //     this.cashierTabNode.children[0].children[0].color = cc.Color.WHITE;
        //     this.tournamentTabNode.children[0].children[0].color = cc.Color.BLACK;
        // });

        // this.scheduleOnce(() => {
        //     if (!GameManager.isMobile) {
        //         // this.adNode.scale = 0.46;
        //     }
        //     this.scrollViewNode.active = false;
        //     this.cashierTable.active = false;
        //     this.tournamentTable.active = false;
        //     this.roomTable.active = true;
        //     this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
        //     this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite;
        // }, 0.6);
    },

    onCashierGameFast: function () {

        // this.onShowFast(true, () => {
        //     // this.pokersFormat.active = false;
        //     // this.leftNode.active = false;
        //     // this.bottomNode.active = false;
        //     // this.scrollViewNode.active = false;
        //     this.cashierTable.active = false;
        //     this.tournamentTable.active = false;
        //     // this.roomTable.scale = 1;
        //     // if (!GameManager.isMobile) {
        //     // this.roomTable.scale = 0.8;
        // }
        //     this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
        //     this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite2;
        //     this.cashierTabNode.children[0].children[0].color = cc.Color.WHITE;
        //     this.tournamentTabNode.children[0].children[0].color = cc.Color.BLACK;
        // });

        // this.scheduleOnce(() => {
        //     if (!GameManager.isMobile) {
        //         // this.adNode.scale = 0.46;
        //     }
        //     this.scrollViewNode.active = false;
        //     this.cashierTable.active = false;
        //     this.tournamentTable.active = false;
        //     this.roomTable.active = true;
        //     this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
        //     this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite;
        // }, 0.6);
    },

    onCashierGameAllin: function () {

        // this.onShowAllin(true, () => {
        //     // this.pokersFormat.active = false;
        //     // this.leftNode.active = false;
        //     // this.bottomNode.active = false;
        //     // this.scrollViewNode.active = false;
        //     this.cashierTable.active = false;
        //     this.tournamentTable.active = false;
        //     // this.roomTable.scale = 1;
        //     // if (!GameManager.isMobile) {
        //     // this.roomTable.scale = 0.8;
        // }
        //     this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
        //     this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite2;
        //     this.cashierTabNode.children[0].children[0].color = cc.Color.WHITE;
        //     this.tournamentTabNode.children[0].children[0].color = cc.Color.BLACK;
        // });

        // this.scheduleOnce(() => {
        //     if (!GameManager.isMobile) {
        //         // this.adNode.scale = 0.46;
        //     }
        //     this.scrollViewNode.active = false;
        //     this.cashierTable.active = false;
        //     this.tournamentTable.active = false;
        //     this.roomTable.active = true;
        //     this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
        //     this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite;
        // }, 0.6);
    },

    onCashierGameMega: function () {
        // this.onShowMega(true, () => {
        //     // this.pokersFormat.active = false;
        //     // this.leftNode.active = false;
        //     // this.bottomNode.active = false;
        //     // this.scrollViewNode.active = false;
        //     this.cashierTable.active = false;
        //     this.tournamentTable.active = false;
        //     // this.roomTable.scale = 1;
        //     // if (!GameManager.isMobile) {
        //     // this.roomTable.scale = 0.8;
        // }
        //     this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
        //     this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite2;
        //     this.cashierTabNode.children[0].children[0].color = cc.Color.WHITE;
        //     this.tournamentTabNode.children[0].children[0].color = cc.Color.BLACK;
        // });

        // this.scheduleOnce(() => {
        //     if (!GameManager.isMobile) {
        //         // this.adNode.scale = 0.46;
        //     }
        //     this.scrollViewNode.active = false;
        //     this.cashierTable.active = false;
        //     this.tournamentTable.active = false;
        //     this.roomTable.active = true;
        //     this.cashierTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
        //     this.tournamentTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite;
        // }, 0.6);
    },

    onTest: function() {

        this.pokersFormat.active = false;

        this.mainButtons.children.forEach((elem) => {
            elem.getChildByName("Background").color = cc.Color.WHITE;
            elem.getChildByName("Label").color = cc.Color.WHITE;
        }, this);
        this.mainButtons.children[2].getChildByName("Background").color = cc.Color.YELLOW;
        this.mainButtons.children[2].getChildByName("Label").color = cc.Color.YELLOW;

        // var param = {
        //     code: K.Error.SessionError,
        //     response: "Session expired, please login again."
        // };
        // GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
                    
        let self = this;
        self.sets = [];
        ServerCom.pomeloRequest('connector.entryHandler.getAllLeaderBoardSet', {'requestPlayerId': GameManager.user.playerId}, function (response) {
            if (response.success) {
                console.log(response);

                self.sets = response.data;
                self.showLB();
                self.updateLB();
            }
        }, null, 5000, false);
    },

    showLB: function() {
        this.privateNode.active = false;
        this.lbNode.active = true;
    },
    hideLB: function() {
        this.lbNode.active = false;
        // this.onBackLobby();
    },
    updateLB: function() {
        //
        if (this.sets.length == 0) {
            this.lbEmpty.active = true;
            this.lbHide.forEach((elem) => {
                elem.active = false;
            }, this);
        }
        else {
            this.lbEmpty.active = false;
            this.lbHide.forEach((elem) => {
                elem.active = true;
            }, this);

            // 
            this.lbSetContentNode.removeAllChildren();

            for (var i = 0; i < this.sets.length; i++) {
                const instance =  cc.instantiate(this.lbSetItemNode);
                instance.setPosition(0, 0);
                instance.active = true;
                instance.children[0].getComponent(cc.Label).string = this.sets[i].leaderboardSetName;
                instance.getComponent(cc.Button).clickEvents[0].customEventData = this.sets[i];
                instance.parent = this.lbSetContentNode;
                instance.__data = this.sets[i];
            }

            this.onLBSet(this.lbSetContentNode.children[0], this.sets[0]);
        }
    },
    onLBSet: function(event, msg) {
        this.unschedule(this.updateRebuy);
        this.lbCountNode.getComponent(cc.Label).string =  " ";
        console.log("onLBSet", msg);
        for (var i = 0; i < this.lbSetContentNode.children.length; i++) {
            this.lbSetContentNode.children[i].getComponent(cc.Sprite).enabled = false;
            this.lbSetContentNode.children[i].children[0].color = cc.Color.BLACK;
            if (this.lbSetContentNode.children[i].__data._id == msg._id) {
                this.lbSetContentNode.children[i].getComponent(cc.Sprite).enabled = true;
                this.lbSetContentNode.children[i].children[0].color = cc.Color.WHITE;
            }
        }

        // 
        this.lbsContentNode.removeAllChildren();
        for (var i = 0; i < msg.leaderboardList.length; i++) {
            const instance =  cc.instantiate(this.lbsContentItemNode);
            // instance.setPosition(0, 0);
            instance.active = true;
            instance.children[0].getComponent(cc.Label).string = msg.leaderboardList[i].leaderboardName;
            instance.children[0].getComponent(cc.Button).clickEvents[0].customEventData = msg.leaderboardList[i];
            instance.parent = this.lbsContentNode;
            instance.__data = msg.leaderboardList[i];
        }

        this.onLB(this.lbsContentNode.children[0], msg.leaderboardList[0]);
    },
    updateRebuy: function() {
        if ((new Date()).getTime() >= this.lbTimer) {
            this.unschedule(this.updateRebuy);
            this.lbCountNode.getComponent(cc.Label).string = "";
        }
        else {
            let res = GameManager.getTimeDuration(this.lbTimer)
            if (res.indexOf("days") != -1) {
                this.lbCountNode.getComponent(cc.Label).string =  " ";
            }
            else {
                this.lbCountNode.getComponent(cc.Label).string =  res + " left";
            }
        }
    },
    onLB: function(event, msg) {
        console.log("onLB", msg);
        for (var i = 0; i < this.lbsContentNode.children.length; i++) {
            this.lbsContentNode.children[i].getComponent(cc.Sprite).enabled = false;
            this.lbsContentNode.children[i].children[0].color = cc.Color.BLACK;
            if (this.lbsContentNode.children[i].__data.leaderboardId == msg.leaderboardId) {
                this.lbsContentNode.children[i].getComponent(cc.Sprite).enabled = true;
                this.lbsContentNode.children[i].children[0].color = new cc.Color().fromHEX("#056625");
            }
        }

        this.unschedule(this.updateRebuy);
        this.lbCountNode.getComponent(cc.Label).string =  " ";

        let self = this;
        ServerCom.pomeloRequest(
            'connector.entryHandler.getLeaderBoardById', 
            {
                'leaderboardId': msg.leaderboardId
            }, 
            function (response) {
                console.log(response);

                cc.find('name', self.lbsRankNode.children[1]).getComponent(cc.Label).string = "N/A";
                cc.find('value', self.lbsRankNode.children[1]).getComponent(cc.Label).string = "N/A";
                cc.find('name', self.lbsRankNode.children[0]).getComponent(cc.Label).string = "N/A";
                cc.find('value', self.lbsRankNode.children[0]).getComponent(cc.Label).string = "N/A";
                cc.find('name', self.lbsRankNode.children[2]).getComponent(cc.Label).string = "N/A";
                cc.find('value', self.lbsRankNode.children[2]).getComponent(cc.Label).string = "N/A";
                cc.find('Mask/avatarSprite', self.lbsRankNode.children[1]).getComponent(cc.Sprite).spriteFrame = null;
                cc.find('Mask/avatarSprite', self.lbsRankNode.children[0]).getComponent(cc.Sprite).spriteFrame = null;
                cc.find('Mask/avatarSprite', self.lbsRankNode.children[2]).getComponent(cc.Sprite).spriteFrame = null;


                self.lbRanksContentNode.removeAllChildren();
                let ranks = response.data.participantArray;
                let me = null;
                let urlImg = null;

                self.lbPoints1Node.string = (response.data.leaderboardType == "openVip" ? "Points" : "Hands");
                self.lbPoints2Node.string = (response.data.leaderboardType == "openVip" ? "Points" : "Hands");

                for (var i = 0; i < ranks.length; i++) {
                    const instance =  cc.instantiate(self.lbRanksItemNode);
                    instance.setPosition(0, 0);
                    instance.active = true;
                    cc.find('name', instance).getComponent(cc.Label).string = ranks[i]._id.userName;
                    cc.find('rank', instance).getComponent(cc.Label).string = ranks[i].rank;
                    cc.find('points', instance).getComponent(cc.Label).string = (response.data.leaderboardType == "openVip" ? ranks[i].total.toFixed(2) : ranks[i].myCount);

                    let avatarUrl = Number(ranks[i]._id.avatar) - 1;
                    if (isNaN(avatarUrl) && isNaN(parseInt(avatarUrl)) && avatarUrl != "") {
                        cc.loader.load(avatarUrl + "?w=125&h=125", function (err, tex) {
                            if (!!err) {
                                urlImg = GameManager.avatarImages[1];
                            } else {
                                urlImg = new cc.SpriteFrame(tex);
                            }
                            cc.find('Avatar/Mask/avatarSprite', instance).getComponent(cc.Sprite).spriteFrame = urlImg;

                            if (i == 0) {
                                cc.find('Mask/avatarSprite', self.lbsRankNode.children[1]).getComponent(cc.Sprite).spriteFrame = urlImg;
                            }
                            else if (i == 1) {
                                cc.find('Mask/avatarSprite', self.lbsRankNode.children[0]).getComponent(cc.Sprite).spriteFrame = urlImg;
                            }
                            else if (i == 2) {
                                cc.find('Mask/avatarSprite', self.lbsRankNode.children[2]).getComponent(cc.Sprite).spriteFrame = urlImg;
                            }
                        });
                    }
                    else {
                        cc.find('Avatar/Mask/avatarSprite', instance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[avatarUrl];

                        if (i == 0) {
                            cc.find('Mask/avatarSprite', self.lbsRankNode.children[1]).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[avatarUrl];
                        }
                        else if (i == 1) {
                            cc.find('Mask/avatarSprite', self.lbsRankNode.children[0]).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[avatarUrl];
                        }
                        else if (i == 2) {
                            cc.find('Mask/avatarSprite', self.lbsRankNode.children[2]).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[avatarUrl];
                        }
                    }
                    instance.parent = self.lbRanksContentNode;

                    if (GameManager.user.playerId == ranks[i]._id.pId) {
                        me = ranks[i];
                    }

                    if (i == 0) {
                        cc.find('name', self.lbsRankNode.children[1]).getComponent(cc.Label).string = ranks[i]._id.userName;
                        cc.find('value', self.lbsRankNode.children[1]).getComponent(cc.Label).string = (response.data.leaderboardType == "openVip" ? ranks[i].total.toFixed(2) : ranks[i].myCount);
                    }
                    else if (i == 1) {
                        cc.find('name', self.lbsRankNode.children[0]).getComponent(cc.Label).string = ranks[i]._id.userName;
                        cc.find('value', self.lbsRankNode.children[0]).getComponent(cc.Label).string = (response.data.leaderboardType == "openVip" ? ranks[i].total.toFixed(2): ranks[i].myCount);
                    }
                    else if (i == 2) {
                        cc.find('name', self.lbsRankNode.children[2]).getComponent(cc.Label).string = ranks[i]._id.userName;
                        cc.find('value', self.lbsRankNode.children[2]).getComponent(cc.Label).string = (response.data.leaderboardType == "openVip" ? ranks[i].total.toFixed(2): ranks[i].myCount);
                    }
                }

                cc.find('Content_Table/Avatar/Mask/avatarSprite', self.lbMeNode).getComponent(cc.Sprite).spriteFrame = GameManager.user.urlImg;
                if (me) {
                    cc.find('Content_Table/rank', self.lbMeNode).getComponent(cc.Label).string = me.rank;
                    cc.find('Content_Table/points', self.lbMeNode).getComponent(cc.Label).string = (response.data.leaderboardType == "openVip" ? me.total.toFixed(2) : me.myCount);
                }

                self.lbTimer = response.data.endTime;
                if ((new Date()).getTime() >= response.data.endTime) {

                }
                else {
                    self.updateRebuy();
                    self.schedule(self.updateRebuy, 1);
                }

            }, 
        null, 5000, false);
    },

    onPlayNow: function(event, msg) {
        var inst = this;
        ServerCom.pomeloRequest("connector.entryHandler.getLobbyRooms", {
            isRealMoney: true,
            channelVariation: "All",
            playerId: GameManager.user.playerId,
            isLoggedIn: true,
            access_token: K.Token.access_token
        }, function (response) {
            console.log("fast", JSON.parse(JSON.stringify(response)));

        }, null, 5000, false);
    },

    onFast: function(event, msg) {
        var inst = this;
        ServerCom.pomeloRequest("connector.entryHandler.getLobbyRooms", {
            isRealMoney: true,
            turnTime: 10,
            playerId: GameManager.user.playerId,
            isLoggedIn: true,
            access_token: K.Token.access_token
        }, function (response) {
            console.log("fast", JSON.parse(JSON.stringify(response)));

        }, null, 5000, false);
    },

    onFreeRoll: function(event, msg) {
        if (this.adNodeMini) {
            this.adNodeMini.active = true;
            this.adNode.active = false;
        }

        this.pokersFormat.active = false;
        // this.leftNode.active = false;
        // this.bottomNode.active = false;

        // this.scrollViewNode.active = false;
        // this.cashierTable.active = false;
        
        // this.roomTable.active = false;
        this.roomTable.scale = 0;

        this.practiceTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite;
        this.freerollTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite2;
        this.practiceTabNode.children[0].children[0].color = cc.Color.BLACK;
        this.freerollTabNode.children[0].children[0].color = cc.Color.WHITE;

        this.tournamentTable.getComponent('TournamentLobbyListPresenter').onShowTournamentNFT();
        this.tournamentTable.active = true;

        this.runShowAnimation();
    },

    onPractice: function(event, msg) {
        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 1);

        CashRoom.isPriactice = true;

        this.onGetTableData((data) => {

            this.pokersFormat.active = false;
            this.roomTable.scale = 1;
            if (!GameManager.isMobile) {
                this.roomTable.scale = 0.8;
            }

            // this.leftNode.active = false;
            // this.bottomNode.active = false;
            // this.scrollViewNode.active = false;
            // this.cashierTable.active = false;
            this.tournamentTable.active = false;
            this.practiceTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.activeTabSprite;
            this.freerollTabNode.children[0].getComponent(cc.Sprite).spriteFrame = this.inactiveTabSprite2;
            this.practiceTabNode.children[0].children[0].color = cc.Color.WHITE;
            this.freerollTabNode.children[0].children[0].color = cc.Color.BLACK;

            this.tabs.active = true;
            this.currentTab = 0;
            GameManager.playSound(K.Sounds.click);
            this.roomTable.getComponent('CashRoom').onEnable2(data);

            this.runShowAnimation();
        });
    },

    onPrivateTable: function(event, msg) {
        this.privateNode.active = true;
        this.refreshPrivateTable();
    },

    onHidePrivate: function(event, msg) {
        this.privateNode.active = false;
    },

    onCreatePrivate: function(event, msg) {
        this.createPrivateNode.active = true;
        this.joinPrivateNode.active = false;
    },

    onJoinPrivate: function(event, msg) {
        this.createPrivateNode.active = false;
        this.joinPrivateNode.active = true;
        this.joinPrivateNode.opacity = 0;
        var anim = this.joinPrivateNode.getComponent('AnimBase');
        var inst = this;
        if (anim !== null) {
            anim.play("showPopUp", function () {});
        }
    },

    onRemovePrivate: function(event, msg) {
        let self = this;
        ServerCom.pomeloRequest("connetor.entryHandler.deletePrivateTable", {
            "userName": GameManager.user.userName,
            "tableId": msg
        }, function (response) {
            console.log("onRemovePrivate", response);
            if (response.success) {
                self.refreshPrivateTable();
            }
        });
    },

    resetPrivateTable: function() {
        cc.find("ScrollView/view/content", this.privateNode).removeAllChildren(true);
        cc.find("empty", this.privateNode).active = true;
    },

    refreshPrivateTable: function() {
        let inst = this;
        ServerCom.pomeloRequest("connetor.entryHandler.listPrivateTable", {
            "playerId": GameManager.user.playerId,
            "channelVariation": "All",
            "isRealMoney": true
        }, function (response) {
            console.log("listPrivateTable", response);
            cc.find("ScrollView/view/content", inst.privateNode).removeAllChildren(true);

            if (response.success) {
                if (response.result.length == 0) {
                    cc.find("empty", inst.privateNode).active = true;
                }
                else {
                    cc.find("empty", inst.privateNode).active = false;

                    for (var i = 0; i < response.result.length; i++) {
                        let table = response.result[i];
                        var tableInstance = cc.instantiate(cc.find("ScrollView/Content_Table", inst.privateNode));
                        tableInstance.x = 0;
                        tableInstance.active = true;
                        cc.find("ScrollView/view/content", inst.privateNode).addChild(tableInstance);


                        tableInstance.getComponent("PrivateTableContent").init(table);
                    }
                }
            }
        }, null, 5000, false, false);  
    },

    onShareFb: function(event, msg) {
        // var left = (window.screen.width - width) / 2;
        // var top = (window.screen.height - height) / 2;
        var pageUrl = encodeURIComponent("");
        var pageTitle = encodeURIComponent("You have been invited by " + GameManager.user.userName + " to join the table and play with him on " + (cc.sys.platform == cc.sys.ANDROID ? "https://play.google.com/store/apps/details?id=com.atozgames.bbpokergame" : "https://apps.apple.com/us/app/bb-poker-play-with-friends/id6737835776") + " Poker. Invite Code = " + event.target.parent.parent.__inviteCode);
        let url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
        var left = 100;
        var top = 100;
        var width = 500;
        var height = 500;
        var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
        if (cc.sys.isNative) {
            cc.sys.openURL(url);
        }
        else {
            window.open(url,"",params);
        }
    },

    onShareTwitter: function(event, msg) {

        var pageUrl = encodeURIComponent("");
        var pageTitle = encodeURIComponent("You have been invited by " + GameManager.user.userName + " to join the table and play with him on " + (cc.sys.platform == cc.sys.ANDROID ? "https://play.google.com/store/apps/details?id=com.atozgames.bbpokergame" : "https://apps.apple.com/us/app/bb-poker-play-with-friends/id6737835776") + " Poker. Invite Code = " + event.target.parent.parent.__inviteCode);
        let url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + pageTitle;
        var left = 100;
        var top = 100;
        var width = 500;
        var height = 500;
        var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
        if (cc.sys.isNative) {
            cc.sys.openURL(url);
        }
        else {
            window.open(url,"",params);
        }
    },

    onShareTelegram: function(event, msg) {
        var pageUrl = encodeURIComponent("");
        var pageTitle = encodeURIComponent("You have been invited by " + GameManager.user.userName + " to join the table and play with him on " + (cc.sys.platform == cc.sys.ANDROID ? "https://play.google.com/store/apps/details?id=com.atozgames.bbpokergame" : "https://apps.apple.com/us/app/bb-poker-play-with-friends/id6737835776") + " Poker. Invite Code = " + event.target.parent.parent.__inviteCode);
        let url = "https://telegram.me/share/url?url=" + pageUrl + "&text=" + pageTitle;
        var left = 100;
        var top = 100;
        var width = 500;
        var height = 500;
        var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
        if (cc.sys.isNative) {
            cc.sys.openURL(url);
        }
        else {
            window.open(url,"",params);
        }
    },

    onShareWhats: function(event, msg) {
        var pageUrl = encodeURIComponent("");
        var pageTitle = encodeURIComponent("You have been invited by " + GameManager.user.userName + " to join the table and play with him on " + (cc.sys.platform == cc.sys.ANDROID ? "https://play.google.com/store/apps/details?id=com.atozgames.bbpokergame" : "https://apps.apple.com/us/app/bb-poker-play-with-friends/id6737835776") + " Poker. Invite Code = " + event.target.parent.parent.__inviteCode);
        let url = "whatsapp://send?text=" + pageTitle + "%20" + pageUrl;
        var left = 100;
        var top = 100;
        var width = 500;
        var height = 500;
        var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
        if (cc.sys.isNative) {
            cc.sys.openURL(url);
        }
        else {
            window.open(url,"",params);
        }
    },

    onShareInstgram: function(event, msg) {

    },

    onDashboard: function(event, msg) {

        // this.loadingDash.active = true;
        // this.loadingDash.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
        // if (GameManager.isMobile) {
        //     this.webViewContainer.active = true;
        //     this.webViewContainer.x = -10000;
        //     // this.webView.url = K.ServerAddress.dashboard_server + 'profile?accessToken=' + K.Token.access_token + '&playerId=' + GameManager.user.playerId;
        //     // cc.sys.localStorage.setItem("last", this.webView.url);

        //     console.log(this.webView.url);
        //     // this.webView.node.on('loaded', () => {

        //         console.log("onDashboard", K.Token.access_token);

        //         this.webView.evaluateJS("window.setAccessToken(\"" + K.Token.access_token + "\");");
        //         this.webView.evaluateJS("window.goToProfile();");

        //         this.scheduleOnce(() => {
        //             this.loadingDash.active = false;
        //             this.webViewContainer.x = 0;
        //         }, 1);
        //     // });

        //     this.webView.setJavascriptInterfaceScheme("mypoker");
        //     this.webView.setOnJSCallback((target, url) => {
        //         this.webViewContainer.x = -10000;
        //     });
        // }
        // else {
        //     window.versions.new({
        //         "name": "dashboard",
        //         "url": K.ServerAddress.dashboard_server + 'profile?accessToken=' + K.Token.access_token + '&playerId=' + GameManager.user.playerId,
        //         "dashboard": true
        //     })
        // }
    },

    onDashboardRef: function(event, msg) {

        // this.loadingDash.active = true;
        // this.loadingDash.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
        // if (GameManager.isMobile) {
        //     this.webViewContainer.active = true;
        //     this.webViewContainer.x = -10000;
        //     // this.webView.url = K.ServerAddress.dashboard_server + 'referEarn/:cash?accessToken=' + K.Token.access_token + '&playerId=' + GameManager.user.playerId;
        //     // cc.sys.localStorage.setItem("last", this.webView.url);

        //     this.webView.evaluateJS("window.setAccessToken(\"" + K.Token.access_token + "\");");
        //     this.webView.evaluateJS("window.goToReferAndEarn();");

        //         this.scheduleOnce(() => {
        //             this.loadingDash.active = false;
        //             this.webViewContainer.x = 0;
        //         }, 1);

        //     this.webView.setJavascriptInterfaceScheme("mypoker");
        //     this.webView.setOnJSCallback((target, url) => {
        //         this.webViewContainer.x = -10000;
        //         // this.webView.url = "about:blank";
        //     });

        //     // this.webViewContainer.parent.width = cc.Canvas.instance.width;
        //     // this.webViewContainer.parent.height = cc.Canvas.instance.height + 20;
        // }
        // else {
        //     window.versions.new({
        //         "name": "dashboard",
        //         "url": K.ServerAddress.dashboard_server + 'referEarn/:cash?accessToken=' + K.Token.access_token + '&playerId=' + GameManager.user.playerId,
        //         "dashboard": true
        //     })
        // }
    },

    onDashboardWallet: function(event, msg) {

        // this.loadingDash.active = true;
        // this.loadingDash.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
        // if (GameManager.isMobile) {
        //     this.webViewContainer.active = true;
        //     this.webViewContainer.x = -10000;
        //     // this.webView.url = K.ServerAddress.dashboard_server + 'wallet?accessToken=' + K.Token.access_token + '&playerId=' + GameManager.user.playerId;
        //     cc.sys.localStorage.setItem("last", this.webView.url);

        //     this.webView.evaluateJS("window.setAccessToken(\"" + K.Token.access_token + "\");");
        //     this.webView.evaluateJS("window.goToWallet();");

        //     // this.webView.node.on('loaded', () => {
        //         this.scheduleOnce(() => {
        //             this.loadingDash.active = false;
        //             this.webViewContainer.x = 0;
        //         }, 1);
        //     // });

        //     this.webView.setJavascriptInterfaceScheme("mypoker");
        //     this.webView.setOnJSCallback((target, url) => {
        //         this.webViewContainer.x = -10000;
        //         // this.webView.url = "about:blank";
        //     });
        // }
        // else {
        //     window.versions.new({
        //         "name": "dashboard",
        //         "url": K.ServerAddress.dashboard_server + 'wallet?accessToken=' + K.Token.access_token + '&playerId=' + GameManager.user.playerId,
        //         "dashboard": true
        //     })
        // }
    },

    onDashboardKYC: function(event, msg) {

        // https://mypokerdev.creatiosoft.poker:9988/addCard?access_token=..

        // this.loadingDash.active = true;
        // this.loadingDash.getChildByName("Label3").getComponent(cc.Label).string = GameManager.randomPick();
        // if (GameManager.isMobile) {
        //     this.webViewContainer.active = true;
        //     this.webViewContainer.x = -10000;
        //     // this.webView.url = K.ServerAddress.dashboard_server + 'addCard?accessToken=' + K.Token.access_token + '&playerId=' + GameManager.user.playerId;
        //     // cc.sys.localStorage.setItem("last", this.webView.url);

        //     this.webView.evaluateJS("window.setAccessToken(\"" + K.Token.access_token + "\");");
        //     this.webView.evaluateJS("window.goToKYC();");

        //         this.scheduleOnce(() => {
        //             this.loadingDash.active = false;
        //             this.webViewContainer.x = 0;
        //         }, 1);

        //     this.webView.setJavascriptInterfaceScheme("mypoker");
        //     this.webView.setOnJSCallback((target, url) => {
        //         this.webViewContainer.x = -10000;
        //         // this.webView.url = "about:blank";
        //     });
        // }
        // else {
        //     window.versions.new({
        //         "name": "dashboard",
        //         "url": K.ServerAddress.dashboard_server + 'addCard?accessToken=' + K.Token.access_token + '&playerId=' + GameManager.user.playerId,
        //         "dashboard": true
        //     })
        // }
    },

    onDashboardAddCash: function(event, msg) {
        this.onDeposit();
    },

    onBack: function(event, msg) {
        this.webView._impl.goBack();
    },

    onFoword: function(event, msg) {
        this.webView._impl.goForward();
    },

    onReload: function(event, msg) {
        this.webView._impl.reload();
    },

    onClose: function(event, msg) {
        this.webViewContainer.x = -10000;
        // this.webView.url = "about:blank";
        // this.webViewContainer.active = false;
        // this.webViewContainer.scale = 0.001;
        // cc.sys.localStorage.setItem("last", "");
    },

    onJoinChannelByInvitecode: function() {
        // this.privateNode.active = false;
    },

    onBtnPageClick(event, msg) {
        cc.sys.openURL(msg);
    },

    onHome() {
        this.lbNode.active = false;
        this.mainButtons.children.forEach((elem) => {
            elem.getChildByName("Background").color = cc.Color.WHITE;
            elem.getChildByName("Label").color = new cc.Color().fromHEX("#7B7B7B");
            elem.getChildByName("Shade").active = false;
            elem.getChildByName("star").active = false;
        }, this);
        this.mainButtons.children[0].getChildByName("Background").color = cc.Color.WHITE;
        this.mainButtons.children[0].getChildByName("Label").color = new cc.Color().fromHEX("#FDAB2E");
        this.mainButtons.children[0].getChildByName("Shade").active = true;
        this.mainButtons.children[0].getChildByName("star").active = true;
    },

    onTournament() {
        this.top.active = true;
////        this.top2.active = false;
        this.lbNode.active = false;
        this.mainButtons.children.forEach((elem) => {
            elem.getChildByName("Background").color = cc.Color.WHITE;
            elem.getChildByName("Label").color = new cc.Color().fromHEX("#7B7B7B");
            elem.getChildByName("Shade").active = false;
            elem.getChildByName("star").active = false;
        }, this);
        this.mainButtons.children[1].getChildByName("Background").color = cc.Color.WHITE;
        this.mainButtons.children[1].getChildByName("Label").color = new cc.Color().fromHEX("#FDAB2E");
        this.mainButtons.children[1].getChildByName("Shade").active = true;
        this.mainButtons.children[1].getChildByName("star").active = true;
    },

    onPrivate() {
        this.lbNode.active = false;
        this.mainButtons.children.forEach((elem) => {
            elem.getChildByName("Background").color = cc.Color.WHITE;
            elem.getChildByName("Label").color = new cc.Color().fromHEX("#7B7B7B");
            elem.getChildByName("Shade").active = false;
            elem.getChildByName("star").active = false;
        }, this);
        this.mainButtons.children[2].getChildByName("Background").color = cc.Color.WHITE;
        this.mainButtons.children[2].getChildByName("Label").color = new cc.Color().fromHEX("#FDAB2E");
        this.mainButtons.children[2].getChildByName("Shade").active = true;
        this.mainButtons.children[2].getChildByName("star").active = true;
    },

    onFriends() {

        // GameManager.onUpdatePlayerCategory();
        // return;
        // this.lbNode.active = false;
        this.mainButtons.children.forEach((elem) => {
            elem.getChildByName("Background").color = cc.Color.WHITE;
            elem.getChildByName("Label").color = new cc.Color().fromHEX("#7B7B7B");
            elem.getChildByName("Shade").active = false;
            elem.getChildByName("star").active = false;
        }, this);
        this.mainButtons.children[3].getChildByName("Background").color = cc.Color.WHITE;
        this.mainButtons.children[3].getChildByName("Label").color = new cc.Color().fromHEX("#FDAB2E");
        this.mainButtons.children[3].getChildByName("Shade").active = true;
        this.mainButtons.children[3].getChildByName("star").active = true;

        this.privateNode.active = false;

        this.friendsNode.active = true;
        this.friendsNode.getComponent('FriendsList').onShow({});
    },

    onLogOut: function () {
        GameManager.popUpManager.show(PopUpType.OnLogOutPopup, null, function () { });
        GameManager.playSound(K.Sounds.click);
    },

    onPokersFormat: function() {
        GameManager.playSound(K.Sounds.click);
        this.pokersFormat.active = true;

        this.pokersFormat.opacity = 0;
        var anim = this.pokersFormat.getComponent('AnimBase');
        var inst = this;
        if (anim !== null) {
            anim.play("showPopUp", function () {});
        }
    },

    onPokersFormatClose: function() {
        GameManager.playSound(K.Sounds.click);
        this.pokersFormat.active = false;
    },

    onListNotificationsNode:function() {
        listNotificationsNode.active = true;
    },

    formatNumber: function(num) {
        return num.toLocaleString('en-US')
    },

    onDeposit: function() {
        this.deposit.active = true;

        this.loginHandler.vpWShop((data) => {
            console.log(data);
            this.depositScrollView.removeAllChildren();
            for (var i = 0; i < data.data.length; i++) {
                let winner = data.data[i];
                var winnerInstance = cc.instantiate(this.depositScrollViewItem);
                winnerInstance.x = 0;
                winnerInstance.active = true;
                this.depositScrollView.addChild(winnerInstance);

                cc.find("title/val", winnerInstance).getComponent(cc.Label).string = winner.price + " MNT";
                cc.find("price", winnerInstance).getComponent(cc.Label).string = this.formatNumber(winner.chipsValue);
                winnerInstance.getComponent(cc.Button).clickEvents[0].customEventData = winner.chipsValue;
                winnerInstance.__data = winner;
            }
        });
    },

    onDepositOne: function(event, customEventData) {
        console.log(customEventData);
        this.deposit.active = false;
        this.depositOne.active = true;
        this.depositOne.getComponent("DepositOne").onShow(event.target.__data);
    },

    onDepositBack: function() {
        this.deposit.active = false;
    },
});

