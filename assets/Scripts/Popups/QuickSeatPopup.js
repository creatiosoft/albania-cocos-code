var DropDownType = require("DropDown");
var PopUpBase = require('PopUpBase');
var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var JoinSimilar = require('PostTypes').JoinSimilar;
var QuickSeatSitNGo = require('PostTypes').QuickSeatSitNGo;
var QuickSeatTourn = require('PostTypes').QuickSeatTourn;

/**
 * @description Represents Tournament Start Time
 * @memberof Popups.QuickSeatPopup#
 */
var TourneyStartTimes = {
    ThirtyMin: "30 Mins",
    TwoHr: "2 hrs",
    FourHr: "4 hrs",
    TwelveHr: "12 hrs",
    OneDay: "1 day",
    OneWeek: "1 week",
    Anytime: "Anytime"
};

/**
 * @alias this 
 * @memberof Popups.QuickSeatPopup#
*/
var self = null;

/**
 * @classdesc used to manage quick seat PopUps, the tabs and its dropdowns, also extends PopUpBase
 * @class QuickSeatPopup
 * @extends PopUpBase
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {
        popupManager: {
            default: null,
            type: PopUpManager,
        },
        tournGameDropDown: {
            default: null,
            type: DropDownType,
        },

        tournBuyInDropDown: {
            default: null,
            type: DropDownType,
        },

        tourntypeDropDown: {
            default: null,
            type: DropDownType,
        },

        tournStartingDropDown: {
            default: null,
            type: DropDownType,
        },

        tournGamesGrid: {
            default: null,
            type: cc.Node,
        },

        tournPrefab: {
            default: null,
            type: cc.Prefab,
        },

        cashGameDropDown: {
            default: null,
            type: DropDownType,
        },

        cashSmallBlindDropDown: {
            default: null,
            type: DropDownType,
        },

        cashBigBlindDropDown: {
            default: null,
            type: DropDownType,
        },

        cashSpeedDropDown: {
            default: null,
            type: DropDownType,
        },

        cashPlayersReqDropDown: {
            default: null,
            type: DropDownType,
        },
        sitNGoGameDropDown: {
            default: null,
            type: DropDownType,
        },

        sitNGoBuyInDropDown: {
            default: null,
            type: DropDownType,
        },

        sitNGoSpeedDropDown: {
            default: null,
            type: DropDownType,
        },

        sitNGoPlayersReqDropDown: {
            default: null,
            type: DropDownType,
        },
        // prizePoolLbl: {
        //     default: null,
        //     type: cc.Label,
        // },
    },

    /**
     * @description initialization and registeration of callbacks
     * @method onLoad
     * @memberof Popups.QuickSeatPopup#
     */
    onLoad: function() {
        //this.initDropdowns();
        self = this;
        //register callbacks
        this.sitNGoBuyInDropDown.registerCallback(this.onSitNGo.bind(this));
        this.sitNGoPlayersReqDropDown.registerCallback(this.onSitNGo.bind(this));
    },

    /**
     * @description Method called from popUpManager to set initial view of this popUp using some data
     * @method onShow
     * @param {Object} data
     * @memberof Popups.QuickSeatPopup#
     */
    onShow: function(data) {
        this.realMoney = data;
        ServerCom.pomeloRequest(K.PomeloAPI.getFilters, data, function(response) {
            self.initDropdowns(response);
        }, function(error) {
        });
    },

    /**
     * @description initialises drop down options in 3 different tabs in QuickseatPopup
     * @method initDropdowns
     * @param {Object} data -stores the options to be displayed in drop down menu
     * @memberof Popups.QuickSeatPopup#
     */
    initDropdowns: function(data) {
        //for cashtable---------
        this.cashGameDropDown.setContent(data.normal.game);
        this.cashSmallBlindDropDown.setContent(this.getStakesData(data.normal.smallBlind, data.normal.bigBlind));
        // this.cashBigBlindDropDown.setContent(data.normal.bigBlind);
        this.cashSpeedDropDown.setContent(this.getSpeedData(data.normal.speed));
        this.cashPlayersReqDropDown.setContent(data.normal.playersRequired);
        //for sitNgo--------------
        this.sitNGoGameDropDown.setContent(data.sitNGo.game);
        this.sitNGoBuyInDropDown.setContent(data.sitNGo.buyIn);
        this.sitNGoSpeedDropDown.setContent(this.getSpeedData(data.normal.speed));
        this.sitNGoPlayersReqDropDown.setContent(data.sitNGo.playersRequired);
        //for tournament----------
        this.tournGameDropDown.setContent(data.tournament.game);
        this.tournBuyInDropDown.setContent(data.tournament.buyIn);
        this.tourntypeDropDown.setContent(data.tournament.type);
        var tourneyStartArr = [TourneyStartTimes.ThirtyMin, TourneyStartTimes.TwoHr, TourneyStartTimes.FourHr, TourneyStartTimes.TwelveHr, TourneyStartTimes.OneDay, TourneyStartTimes.OneWeek, TourneyStartTimes.Anytime];
        this.tournStartingDropDown.setContent(tourneyStartArr);
        // this.tournStartingDropDown.setContent(data.tournament.starting);
    },
     /**
     * @description returns the possible stakes
     * @method getStakesData
     * @param {Array} smallBlinds
     * @param {Array} bigBlinds 
     * @memberof Popups.QuickSeatPopup#
     * @returns {Array} stakes
     */
    getStakesData: function(smallBlinds, bigBlinds) {
        var stakes = [];
        for (var i = 0; i < smallBlinds.length; i++) {
            if (bigBlinds.indexOf(smallBlinds[i] * 2) != -1) {
                stakes.push(smallBlinds[i] + "/" + (smallBlinds[i] * 2));
            }
        }
        return stakes;
    },
     /**
     * @method getSpeedData
     * @param {Array} speeds 
     * @memberof Popups.QuickSeatPopup#
     * @returns {Arrray} gameTypes
     */
    getSpeedData: function(speeds) {
        var gameTypes = [];
        for (var i = speeds.length - 1; i >= 0; i--) {
            gameTypes.push(GameManager.getGameTypeByValue(speeds[i]));
        }
        return gameTypes;
    },

     /**
     * @method updateGameTypeVal
     * @param {Object} data
     * @memberof Popups.QuickSeatPopup#
     */
    updateGameTypeVal: function(data) { },

    /**
     * @description handles cash games tab in QuickseatPopup
     * @method onCashTab
     * @memberof Popups.QuickSeatPopup#
     */
    onCashTab: function() { },
    
     /**
     * @description handles Sit N Go tab in QuickseatPopup
     * @method onSitNGo
     * @memberof Popups.QuickSeatPopup#
     */
    onSitNGo: function() {
        var buyIn = this.sitNGoBuyInDropDown.getSelection();
        var playersReq = this.sitNGoPlayersReqDropDown.getSelection();
        // this.prizePoolLbl.string = "PRIZE POOL: " + buyIn * playersReq * 0.85;
    },
    
    /**
     * @description handles Tournament tab in QuickseatPopup
     * @method onTournnTab
     * @memberof Popups.QuickSeatPopup#
     */
    onTournnTab: function() { },
    
     /**
     * @description handles confirm button in tournament tab
     * @method TournConfirm
     * @memberof Popups.QuickSeatPopup#
     */
    onTournConfirm: function() {
        var gameType = this.tournGameDropDown.getSelection();
        var buyIn = this.tournBuyInDropDown.getSelection();
        var type = this.tourntypeDropDown.getSelection();
        var starting = this.getTimeVal(this.tournStartingDropDown.getSelection());
        // var isRealMoney = thi;
        var data = new QuickSeatTourn(this.realMoney, gameType, buyIn, type, starting);
      //  console.log(data);
        ServerCom.pomeloRequest(K.PomeloAPI.quickSeatTournament, data, function(response) {
            if (response.success) {
                GameManager.removeAllChildren(this.tournGamesGrid);
                for (var i = 0; i < response.result.length; i++) {
                    var dummy = cc.instantiate(this.tournPrefab);
                    // response.result[i].data = data;
                    dummy.getComponent("QSTournamentDetail").setValues(response.result[i]);
                    this.tournGamesGrid.addChild(dummy);
                }
            }
        }.bind(this), function(error) {
        });
    },
     
     /**
     * @description sends request to server to play the cash game
     * @method onCashPlayNow
     * @memberof Popups.QuickSeatPopup#
     */
    onCashPlayNow: function() {
        this.joinRequest(true);
    },

     /**
     * @description sends request to server to observe cash game
     * @method onCashObserve
     * @memberof Popups.QuickSeatPopup#
     */
    onCashObserve: function() {
        this.joinRequest(false);
    },
    
     /**
     * @description Extracts the inputs from cash games tab and sends play/observe request to server
     * @method joinRequest
     * @param {boolean} isAutoSit - if true play the cash game, if false observe the cash game
     * @memberof Popups.QuickSeatPopup#
     */
    joinRequest: function(isAutosit) {
        var gameType = this.cashGameDropDown.getSelection();
        var smallBlind = parseInt(this.cashSmallBlindDropDown.getSelection().split('/')[0]);
        var bigBlind = parseInt(this.cashSmallBlindDropDown.getSelection().split('/')[1]);
        var playersReq = parseInt(this.cashPlayersReqDropDown.getSelection());
        var speed = parseInt(GameManager.getValueByGameType(this.cashSpeedDropDown.getSelection()));
        // var isRealMoney = true;
        var data = new JoinSimilar(this.realMoney, gameType, smallBlind, bigBlind, playersReq, speed, GameManager.user.playerId);
        ServerCom.pomeloRequest(K.PomeloAPI.joinSimilar, data, function(response) {
            if (response.success) {
                var data = response;
                var route = null;
                var routeSource = K.PomeloAPI;
                // if (gameType == "Open Face Chinese Poker") {
                //     routeSource = require("OFCConfigs").PomeloAPI;
                // }
                if (isAutosit) {
                    route = routeSource.autoSit;
                } else {
                    route = routeSource.joinChannel;
                }
                var channel = {};
                channel.channelId = data.similarChannelId || "";
                channel.channelType = "NORMAL";;
                channel.tableId = "";
                channel.isRequested = true;
                if (isAutosit) {
                    channel.seatIndex = GameManager.getPreferredSeat(playersReq);
                    channel.imageAvtar = ""; //GameManager.user.profileImage;
                }
                GameManager.join(channel.channelId, route, channel);
            }
        }, function(error) {
        });

    },
     /**
     * @description Handles register button in SitNGo tab
     * @method onSitRegister
     * @memberof Popups.QuickSeatPopup#
     */
    onSitRegister: function() {
        var gameType = this.sitNGoGameDropDown.getSelection();
        var buyIn = parseInt(this.sitNGoBuyInDropDown.getSelection());
        var playersReq = parseInt(this.sitNGoPlayersReqDropDown.getSelection());
        var speed = GameManager.getValueByGameType(this.sitNGoSpeedDropDown.getSelection());
        // var isRealMoney = thi;
        var data = new QuickSeatSitNGo(this.realMoney, gameType, buyIn, playersReq, speed);
        ServerCom.pomeloRequest(K.PomeloAPI.quickSeatSitNGo, data, function(response) {
            if (response.success) {
                response.data = data;
                this.popupManager.show(PopUpType.ConfirmDialogQuickSeatSitNGo, response, function() { });
            }
        }.bind(this), function(error) {
        });
    },
     /**
     * @description Converts and returns the time in minutes
     * @method getTimeVal
     * @param {number} val - time duration in minutes or hours
     * @memberof Popups.QuickSeatPopup#
     * @returns {number} returnVal - time duration in minutes
     */
    getTimeVal: function(val) {
        var returnVal = 0;
        switch (val) {
            case TourneyStartTimes.ThirtyMin:
                returnVal = 30;
                break;
            case TourneyStartTimes.TwoHr:
                returnVal = 2 * 60;
                break;
            case TourneyStartTimes.FourHr:
                returnVal = 60 * 4;
                break;
            case TourneyStartTimes.TwelveHr:
                returnVal = 60 * 12;
                break;
            case TourneyStartTimes.OneDay:
                returnVal = 60 * 24;
                break;
            case TourneyStartTimes.OneWeek:
                returnVal = 60 * 24 * 7 * 60;
                break;
            default:
                returnVal = 10000000;
        }
        return returnVal;
    },

     /**
     * @description Hides QuickSeatPopup when cancel button is pressed
     * @method onCancel
     * @memberof Popups.QuickSeatPopup#
     */
    onCancel: function() {
        this.popupManager.hide(PopUpType.QuickSeatPopUp, function() { });
    },

});