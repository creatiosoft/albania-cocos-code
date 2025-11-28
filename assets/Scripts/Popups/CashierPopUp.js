var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var SliderTouchType = require('SliderTouch');
var CheckBoxType = require('Checkbox');

var megaCircleType = cc.Enum({
    Bronze: 0,
    Chrome: 1,
    Silver: 2,
    Gold: 3,
    Diamond: 4,
    Platinum: 5,
});
/**
 * @classdesc Manages Cashier PopUp
 * @class CashierPopUp
 * @extends PopUpBase
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        popUpManager: {
            default: null,
            type: PopUpManager
        },
        playerID: {
            default: null,
            type: cc.Label,
        },
        email: {
            default: null,
            type: cc.Label,
        },
        TournamentEarningsUnclaimed: {
            default: null,
            type: cc.Label,
        },
        megaBonusUnclaimed: {
            default: null,
            type: cc.Label,
        },
        megaBonusClaimed: {
            default: null,
            type: cc.Label,
        },
        megaChipsAvailable: {
            default: null,
            type: cc.Label,
        },
        megaChipsInPlay: {
            default: null,
            type: cc.Label,
        },
        megaChips: {
            default: null,
            type: cc.Label,
        },
        playChipsInPlay: {
            default: null,
            type: cc.Label,
        },
        playChipsAvailable: {
            default: null,
            type: cc.Label,
        },
        playChips: {
            default: null,
            type: cc.Label,
        },
        megaPoints: {
            default: null,
            type: cc.Label,
        },
        megaChipsClaimed: {
            default: null,
            type: cc.Label,
        },
        megaPointLevel: {
            default: null,
            type: cc.Label,
        },
        megaLevelSprites: {
            default: [],
            type: cc.SpriteFrame,
        },
        circleInScene: {
            default: null,
            type: cc.Sprite,
        },
        cashierView: {
            default: null,
            type: cc.Node
        },
        cashoutView: {
            default: null,
            type: cc.Node
        },
        cashoutAmount: {
            default: null,
            type: cc.EditBox
        },
        affiliateId: {
            default: null,
            type: cc.Label
        },
        stars: {
            default: [],
            type: cc.Sprite
        },
        playerImg: {
            default: null,
            type: cc.Sprite
        },
        temporary: {
            default: null,
            type: cc.Label
        },
        buttons: {
            default: null,
            type: cc.Node
        },
        instantBonusChips: {
            default: null,
            type: cc.Label
        },
        withdrawableChips: {
            default: null,
            type: cc.Label
        }
    },

    onLoad: function () {
        var color = cc.Color.BLACK;
        this.colorObj = {
            Bronze: color.fromHEX("#B76316"),
            Chrome: color.fromHEX("#685F2D"),
            Silver: color.fromHEX("#606060"),
            Gold: color.fromHEX("#BB8000"),
            Diamond: color.fromHEX("#32C1CE"),
            Platinum: color.fromHEX("#653A38"),
        };
    },

    /**
     * @description Used to initialize the popUp
     * @method onShow
     * @param {Object} data -data from server
     * @memberof Popups.CashierPopup#
     */
    onShow: function (data) {
        if (data == null)
            return;

        this.playerID.string = data.userName;
        this.megaBonusUnclaimed.string = parseInt(data.unClaimedMegaBonus);
        this.megaBonusClaimed.string = parseInt(data.claimedMegaBonus);
        this.playChipsAvailable.string = Number(data.freeChips.toFixed(2));//(data.freeChips);
        this.megaPointLevel.string = data.megaPointLevel;

        this.playerImg.spriteFrame = GameManager.user.urlImg;
        this.cb = data.restoreActiveTab;
        this.megaStarsUpdateInView();

        this.temporary.string = Number(data.realChips.toFixed(2));//(data.realChips);
        this.instantBonusChips.string = !!data.instantBonusAmount ? (data.instantBonusAmount).roundOff(2) : 0;
        this.withdrawableChips.string = Number(data.withdrawableChips.toFixed(2));//(data.withdrawableChips);
        // this.email.string = data.emailId;
        // console.log(parseInt(data.freeChips), parseInt(data.totalFreeChips));
        //GameManager.user.megaPointDetail.megaPointLevel - bronze
        if (GameManager.isP) {
            this.cashierView.active = false;
            this.cashoutView.active = true;
            this.buttons.active = false;
            this.onShowCashout();
        }
        return;
        // this.TournamentEarningsUnclaimed.string = parseInt(data.tourChips);
        // this.megaBonusUnclaimed.string = parseInt(data.unClaimedMegaBonus);
        // this.megaBonusClaimed.string = parseInt(data.claimedMegaBonus);
        // this.megaChipsAvailable.string = parseInt(data.realChips);
        // this.megaChipsInPlay.string = parseInt(data.inGameRealChips);
        // this.megaChips.string = parseInt(data.totalRealChips);
        // this.playChipsAvailable.string = parseInt(data.freeChips);
        // this.playChipsInPlay.string = parseInt(data.inGameFreeChips);
        // this.playChips.string = parseInt(data.totalFreeChips);
        // this.megaPoints.string = parseInt(data.megaPoints);
        // this.megaChipsClaimed.string = parseInt(data.totalMegaChipsClaimed);
        // this.megaPointLevel.string = data.megaPointLevel;
        // this.megaPointLevel.node.color = this.colorObj[data.megaPointLevel];
        // this.circleInScene.spriteFrame = this.megaLevelSprites[megaCircleType[data.megaPointLevel]];
        // this.circleInScene.fillRange = data.percentOfLevel / 100;

    },

    onCashout: function () {
        if (GameManager.user.affiliateId != null || GameManager.isMobile) { //Mobile condition update By Rajat 
            this.popUpManager.show(PopUpType.CashoutPopup, null, function () {});
        } else {
            let url = K.ServerAddress.cashier_CashOut_URL;
            // window.open(url);
            cc.sys.openURL(url);
            // console.log("you are not affiliate");
        }
    },

    //AUTHOR: Rajat Khurana
    //Date: 5/9/2018
    onWithdrawChips: function () {
        GameManager.playSound(K.Sounds.click);
        if (this.cashoutView.active)
            return;

        // console.log("aff ", GameManager.user.affiliateId)

        if (!GameManager.user.isCashout) {
            /*foR cashout view*/
            // window.open(K.ServerAddress.cashier_CashOut_URL); /*foR cashout view*/
            cc.sys.openURL(K.ServerAddress.cashier_CashOut_URL); /*directly go to  WEBSITE*/
            return;
        } /*foR cashout view*/

        this.cashierView.active = false;
        this.cashoutView.active = true;

        this.onShowCashout();

    },

    onAddChips: function () {
        if (this.cashierView.active)
            return;

        this.cashoutView.active = false;
        this.cashierView.active = true;
    },



    onAddCash: function () {
        GameManager.playSound(K.Sounds.click);
        let url = K.ServerAddress.cashier_AddCash_URL;
        // window.open(url);
        cc.sys.openURL(url);

    },

    onMyTransactions: function () {
        GameManager.playSound(K.Sounds.click);
        // let url = "http://192.168.2.178/megapoker_new/profile/?transaction=history";
        let url = K.ServerAddress.cashier_MyTransaction_URL;
        // window.open(url);
        cc.sys.openURL(url);

    },

    onMyTickets: function () {
        GameManager.playSound(K.Sounds.click);

        this.showComingSoonPopup();

    },

    onMerchandise: function () {
        this.showComingSoonPopup();

    },
    onTournamentHistory: function () {
        GameManager.playSound(K.Sounds.click);
        this.showComingSoonPopup();

    },


    showComingSoonPopup: function () {
        GameManager.playSound(K.Sounds.click);
        var param = {
            code: K.Error.FeatureComingSoon,
            response: "Feature Coming Soon!!!"
        };
        GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
    },

    onInfo: function () {
        console.log('info clicked');
        GameManager.playSound(K.Sounds.click);
        let url2 = K.ServerAddress.cashier_Profile_URL;
        // window.open(url2);
        cc.sys.openURL(url2);


    },
    /**
     * @description Quit button callback 
     * @method onQuit
     * @memberof Popups.CashierPopup#
     */
    onQuit: function () {
        GameManager.playSound(K.Sounds.click);
        this.popUpManager.hide(PopUpType.CashierPopup, function () {});


    },


    //Author: Rajat
    //Date: 5/9/18

    onShowCashout() {
        if (!!GameManager.user.affiliateId)
            this.affiliateId.string = GameManager.user.affiliateId;
        else
            this.affiliateId.string = "Not an Affiliate."

        this.cashoutAmount.string = "";
    },

    getAmount: function () {
        let amount;
        let minAmount = 1;
        let maxAmount = Number(GameManager.user.realChips.toFixed(2));
        if (isNaN(this.cashoutAmount.string)) {
            /**
             * To not allow first character to be 0.
             */
            var pat = /\d+/g;
            var x = this.cashoutAmount.string.match(pat);
            var t = "";
            if (x) {
                for (var count = 0; count < x.length; count++) {
                    t += x[count];
                }
            }
            this.cashoutAmount.string = t;
        } else {
            /**
             * to not allow spaces to be entered.
             */
            if (/\s/.test(this.cashoutAmount.string)) {
                var temp = this.cashoutAmount.string.toString().trim();
                this.cashoutAmount.string = temp;
            }
            /**
             * isNaN accepts decimal, so to avoid it.
             */
            var t = ".";
            if (this.cashoutAmount.string.indexOf(t) != -1) {
                var x = this.cashoutAmount.string;
                x = x.replace('.', '');
                this.cashoutAmount.string = x;
            }
            /**
             * to avoid character 'e' in between.
             */
            var t = "e";
            if (this.cashoutAmount.string.indexOf(t) != -1) {
                var x = this.cashoutAmount.string;
                x = x.replace('e', '');
                this.cashoutAmount.string = x;
            }
            var t = "-";
            if (this.cashoutAmount.string.indexOf(t) != -1) {
                var x = this.cashoutAmount.string;
                x = x.replace('-', '');
                this.cashoutAmount.string = x;
            }
            var patt = (this.cashoutAmount.string.length > 1) ? (/[0-9]/) : (/[1-9]/);
            if (patt.test(this.cashoutAmount.string)) {} else {
                var x = this.cashoutAmount.string;
                x = x.replace('0', '');
                this.cashoutAmount.string = x;
            }
        }

        if (this.cashoutAmount.string >= minAmount && this.cashoutAmount.string <= maxAmount) {
            this.submitButton.interactable = true;
        }
        // if (this.cashoutAmount.string > maxAmount) {
        //      this.submitButton.interactable = true;
        //     console.log("You don't have that many chips");
        // } 
        // if (this.cashoutAmount.string < minAmount) {
        //     this.submitButton.interactable = false;
        //     console.log("Enter minimum allowed chips");
        // }
    },

    /**
     * @description onSubmit button callback. Sends cashout request to server.
     * @method onSubmit
     * @memberof CashoutPopup#
     */
    onSubmit: function () {

        if (this.affiliateId.string == "Not an Affiliate.") {
            return;
        }

        let amount = parseInt(this.cashoutAmount.string);
        // if (amount > parseInt(GameManager.user.realChips))
        //     return;
        var data = {
            playerId: GameManager.user.playerId,
            realChips: amount,
        };
        ServerCom.pomeloRequest(K.PomeloAPI.cashoutRequest, data, function (response) {
            // console.log("ruyutytru", response);
            if (response.success) {
                this.popUpManager.hide(PopUpType.CashierPopup, function () {});
            } else {
                // console.log("asfdjhdsgfkfsdafasdfsadf");
            }
        }.bind(this), null);
    },


    onHide() {
        this.cashoutView.active = false;
        this.cashierView.active = true;
        if (!!this.cb)
            this.cb();
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
        for (let i = 0; i < 5; i++) {
            this.stars[i].spriteFrame = this.megaLevelSprites[megaCircleType[GameManager.user.megaPointDetail.megaPointLevel]];
            this.stars[i].fillRange = 0;
        }
        //set fill range
        let megaPtPrcnt = GameManager.user.megaPointDetail.megaPointsPercent;
        let starPercentfill = (megaPtPrcnt % 20) * 5;
        if (megaPtPrcnt <= 20) this.fillStar(0, starPercentfill);
        else if (megaPtPrcnt > 20 && megaPtPrcnt <= 40) this.fillStar(1, starPercentfill);
        else if (megaPtPrcnt > 40 && megaPtPrcnt <= 60) this.fillStar(2, starPercentfill);
        else if (megaPtPrcnt > 60 && megaPtPrcnt <= 80) this.fillStar(3, starPercentfill);
        else this.fillStar(4, starPercentfill);
    },

    validateCashoutAmount :  function() {
        let str = this.cashoutAmount.string;
        let value = parseInt(str.getDecimal());
        this.cashoutAmount.string = isNaN(value)? "" : value.toString();
    },
});
