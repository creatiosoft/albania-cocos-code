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
        EmailId: {
            default: null,
            type: cc.EditBox
        },
        ResponseLabel: {
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

        background: {
            default: null,
            type: cc.Node
        },

        DarkBoundarybackground: {
            default: null,
            type: cc.Node
        },

    },

    onForgotPasswordResponse: function (response) {
        // console.log("FORGOT PASSWORD STATUS ", response.info)
        // if (response.success) {
        // this.ResponseLabel.string = response.info;
        // this.ResponseLabel.node.active = true;

        // this.background.scaleY = 1;
        // this.DarkBoundarybackground.scaleY = 1;
        // this.submitButton.node.setPositionY(-166);
        // this.quitButton.node.setPositionY(-166);
        // }
    },

    onLoad: function () {
        this.EmailId.placeholder = LocalizedManager.t('TXT_ENTER_YOUR_REGISTERED_EMAIL');
    },

    /**
     * @description Called everytime pop is shown. Initializes data
     * @method onShow
     * @memberof CashoutPopup#
     */
    onShow: function () {
        this.ResponseLabel.string = "";
        // this.ResponseLabel.node.active = false;

        // this.background.scaleY = 0.56;
        // this.DarkBoundarybackground.scaleY = 0.77;
        // this.submitButton.node.setPositionY(-65);
        // this.quitButton.node.setPositionY(-65);
         this.EmailId.placeholder = LocalizedManager.t('TXT_ENTER_YOUR_REGISTERED_EMAIL');

    },

    /**
     * @description Quit button callback
     * @method onQuit
     * @memberof CashoutPopup#
     */
    onQuit: function () {
        GameManager.playSound(K.Sounds.click);
        this.EmailId.string = "";
        this.popUpManager.hide(PopUpType.ForgotPasswordPopUp, function () { });
       
    },

    /**
     * @description Handles input of cashout editbox. Call at text change
     * @method getAmount
     * @memberof CashoutPopup#
    */
    // getAmount: function() {
    //     let amount;
    //     let minAmount = 1;
    //     let maxAmount = parseInt(GameManager.user.realChips);
    //     if (isNaN(this.cashoutAmount.string)) {
    //         /**
    //          * To not allow first character to be 0.
    //          */
    //         var pat = /\d+/g;
    //         var x = this.cashoutAmount.string.match(pat);
    //         var t = "";
    //         if (x) {
    //             for (var count = 0; count < x.length; count++) {
    //                 t += x[count];
    //             }
    //         }
    //         this.cashoutAmount.string = t;
    //     } else {
    //         /**
    //          * to not allow spaces to be entered.
    //          */
    //         if (/\s/.test(this.cashoutAmount.string)) {
    //             var temp = this.cashoutAmount.string.toString().trim();
    //             this.cashoutAmount.string = temp;
    //         }
    //         /**
    //          * isNaN accepts decimal, so to avoid it.
    //          */
    //         var t = ".";
    //         if (this.cashoutAmount.string.indexOf(t) != -1) {
    //             var x = this.cashoutAmount.string;
    //             x = x.replace('.', '');
    //             this.cashoutAmount.string = x;
    //         }
    //         /**
    //          * to avoid character 'e' in between.
    //          */
    //         var t = "e";
    //         if (this.cashoutAmount.string.indexOf(t) != -1) {
    //             var x = this.cashoutAmount.string;
    //             x = x.replace('e', '');
    //             this.cashoutAmount.string = x;
    //         }
    //         var t = "-";
    //         if (this.cashoutAmount.string.indexOf(t) != -1) {
    //             var x = this.cashoutAmount.string;
    //             x = x.replace('-', '');
    //             this.cashoutAmount.string = x;
    //         }
    //         var patt = (this.cashoutAmount.string.length > 1) ? (/[0-9]/) : (/[1-9]/);
    //         if (patt.test(this.cashoutAmount.string)) { } else {
    //             var x = this.cashoutAmount.string;
    //             x = x.replace('0', '');
    //             this.cashoutAmount.string = x;
    //         }
    //     }

    //     if (this.cashoutAmount.string >= minAmount && this.cashoutAmount.string <= maxAmount) {
    //         this.submitButton.interactable = true;
    //     }
    //     // if (this.cashoutAmount.string > maxAmount) {
    //     //      this.submitButton.interactable = true;
    //     //     console.log("You don't have that many chips");
    //     // } 
    //     // if (this.cashoutAmount.string < minAmount) {
    //     //     this.submitButton.interactable = false;
    //     //     console.log("Enter minimum allowed chips");
    //     // }
    // },

    /**
     * @description onSubmit button callback. Sends cashout request to server.
     * @method onSubmit
     * @memberof CashoutPopup#
     */
    onSubmit: function () {
        GameManager.playSound(K.Sounds.click);
        
        if (!K.internetAvailable) {
            GameManager.popUpManager.show(PopUpType.NotificationPopup, "Please check your\n Internet Connection.", function () { });
            return;
        }
        if (this.EmailId.string == "" || this.EmailId.string.length <= 0) {
            this.EmailId.placeholder = "Enter A Valid Email Id";
            return;
        }

        var address = K.ServerAddress.ipAddress + ":" + K.ServerAddress.port + K.ServerAPI.forgotPassword;
        var data = {
            emailId: this.EmailId.string,
        };
        // data.appVersion = K.ServerAddress.clientVer;
        // console.log("Server CALL FORGOT PASSWORD", address, data);
        ServerCom.httpPostRequest(address, data, function (response) {
            // console.log("FORGOTRESPONSE ", response)
            if (response.keepPopUpAlive != null && response.keepPopUpAlive) {
                // do nothing
            }else{
                this.onQuit();
            }
            // console.log(response)
        }.bind(this));
        
    
           

    },
});
