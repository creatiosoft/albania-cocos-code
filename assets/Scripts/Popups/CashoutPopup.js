var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var SliderTouchType = require('SliderTouch');
var CheckBoxType = require('Checkbox');

cc.Class({
    extends: PopUpBase,

    properties: {
        popUpManager: {
            default: null,
            type: PopUpManager
        },
        cashoutAmount: {
            default: null,
            type: cc.EditBox
        },
        affiliateId: {
            default: null,
            type: cc.Label
        },
        submitButton: {
            default: null,
            type: cc.Button
        },
        quitButton: {
            default: null,
            type: cc.Button
        },

    },

    onLoad: function () {

    },

    /**
     * @description Called everytime pop is shown. Initializes data
     * @method onShow
     * @memberof CashoutPopup#
     */
    onShow: function () {
        if(!!GameManager.user.affiliateId)
            this.affiliateId.string = GameManager.user.affiliateId;
        else
            this.affiliateId.string = "Not an Affiliate."   
            
            this.cashoutAmount.string = "";
    },

    /**
     * @description Quit button callback
     * @method onQuit
     * @memberof CashoutPopup#
     */
    onQuit: function () {
        this.popUpManager.hide(PopUpType.CashoutPopup, function () { });
    },

    /**
     * @description Handles input of cashout editbox. Call at text change
     * @method getAmount
     * @memberof CashoutPopup#
     */
    getAmount: function () {
        let amount;
        let minAmount = 1;
        let maxAmount = parseInt(GameManager.user.realChips);
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
            if (patt.test(this.cashoutAmount.string)) { } else {
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
                this.popUpManager.hide(PopUpType.CashoutPopup, function () { });
            }
            else {
                // console.log("asfdjhdsgfkfsdafasdfsadf");
            }
        }.bind(this), null);
    },
});
