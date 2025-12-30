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
        centerNode: {
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
        cashierTable: {
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
        privNFav: {
            default: [],
            type: cc.Node
        },
        lockClick: false,
    },

    /**
     * @method onShow
     * @description Called every time the screen is enabled
     * @param {object} data 
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    onShow: function (data) {
        ServerCom.loadingLogin.active = false;
        this.onBackLobby(null, null, false);
        if (GameManager.isConnected)
            this.popUpManager.hideAllPopUps();
        this.refreshDetails();
        this.refreshPlayerChips();
        this.displayOnlinePlayers();
        // this.megaStarsUpdateInView();
        this.playerImg.spriteFrame = GameManager.user.urlImg;
    },


    /**
     * @method refreshPlayerChips
     * @description Method to keep player chips updated
     * @memberof Screens.Lobby.LobbyPresenter#
     */
    refreshPlayerChips: function () {
        console.log("refreshPlayerChips");
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
        let self = this;
        ServerCom.inGame = true;
        ServerCom.loadingLogin.active = false;
        this.imageLoadedRef = this.imageLoaded.bind(this);
        // GameManager.on("onDashboardAddCash", this.onDashboardAddCash.bind(this));
        GameManager.on("image-loaded", this.imageLoadedRef);
        GameManager.on("refreshPlayerChips" , this.refreshPlayerChips.bind(this));
        GameManager.on("onlinePlayers", this.displayOnlinePlayers.bind(this));
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.updateProfile, this.updatePlayerProfile.bind(this));
        ServerCom.pomeloBroadcast("playerLogout", this.updatePlayerProfileLogout.bind(this));
        this.onShowAll(true);
        // this.onShowHoldem(true);
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.updateMegaPoints, this.onMegapointUpdate.bind(this));
        ServerCom.pomeloBroadcast("banPLayer", this.onBan.bind(this));
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

            CashRoom.isShowAll = true;
            CashRoom.isShowHoldem = false;
            CashRoom.isShowPLO = false;
            CashRoom.isShowMega = false;
            CashRoom.isShowAllIn = false;
            CashRoom.isShowFast = false;
            this.setActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
            this.setInActiveButton(this.tabButtons2[1], this.tabButtons2[1]);
            this.setInActiveButton(this.tabButtons2[2], this.tabButtons2[2]);
           
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
        
            CashRoom.isShowAll = false;
            CashRoom.isShowHoldem = false;
            CashRoom.isShowPLO = false;
            CashRoom.isShowMega = false;
            CashRoom.isShowAllIn = false;
            CashRoom.isShowFast = false;
            this.setInActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
            this.setInActiveButton(this.tabButtons2[1], this.tabButtons2[1]);
            this.setInActiveButton(this.tabButtons2[2], this.tabButtons2[2]);
         
                CashRoom.isShowHoldem = true;
                this.setActiveButton(this.tabButtons2[1], this.tabButtons2[1]);
      
        GameManager.playSound(K.Sounds.click);

    },

    forceKeepLoadingTimer() {
        console.log("!!!!!!forceKeepLoadingTimer");
        ServerCom.forceKeepLoading = true;
    },

    onGetTableData: function (cb) {
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
            CashRoom.isShowAll = false;
            CashRoom.isShowHoldem = false;
            CashRoom.isShowPLO = false;
            CashRoom.isShowMega = false;
            CashRoom.isShowAllIn = false;
            CashRoom.isShowFast = false;
            this.setInActiveButton(this.tabButtons2[0], this.tabButtons2[0]);
            this.setInActiveButton(this.tabButtons2[1], this.tabButtons2[1]);
            this.setInActiveButton(this.tabButtons2[2], this.tabButtons2[2]);
                CashRoom.isShowPLO = true;
                this.setActiveButton(this.tabButtons2[2], this.tabButtons2[2]);
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

   
    onLoyalityPoints: function () {
        GameManager.playSound(K.Sounds.click);
        let url2 = K.ServerAddress.cashier_AddCash_URL;
        // let url2 = K.ServerAddress.cashier_VIPCLUB_URL;
        window.open(url2);
    },

    onTableClick: function (data, custom) {
        GameManager.playSound(K.Sounds.click);
        // GameScreen.gameModel.activePokerModels.forEach(function (element, i) {
        // element.node.destroy();  
        ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, custom, function () { });
        // }, this);
    },

    onBackLobby: function (event, msg, animated=true) {
        this.onBackLobby2(event, msg, animated);
    },

    onBackLobby2: function  (event, msg, animated=true) {
        this.top.active = true;
    },

    onLogOut: function () {
        GameManager.popUpManager.show(PopUpType.OnLogOutPopup, null, function () { });
        GameManager.playSound(K.Sounds.click);
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



