var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var SliderTouchType = require('SliderTouch');
// var CheckBoxType = require('Checkbox');
var EditBoxType = require('CustomEditBox');
var UtilEditBoxType = require('EditBoxUtil');
var SetPlayerValData = require('PostTypes').SetPlayerValData;
const timeCountDown = 10;

/**
 * @classdesc Manages Buyin popup
 * @class BuyInPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        goldSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        diamondSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        autoBuyIn: {
            default: null,
            type: cc.Node,
        },
        disable: {
            default: null,
            type: cc.Node,
        },
        buyinContent: {
            default: null,
            type: cc.Node,
        },

        rebuyContent: {
            default: null,
            type: cc.Node,
        },

        rebuyMyChipsLbl: {
            default: null,
            type: cc.Label,
        },

        rebuyChipsLbl: {
            default: null,
            type: cc.Label,
        },

        rebuyAmountLbl: {
            default: null,
            type: cc.Label,
        },

        rebuyHoursFeeLbl: {
            default: null,
            type: cc.Label,
        },

        rebuyTotalChipsLbl: {
            default: null,
            type: cc.Label,
        },

        rebuyTimer: {
            default: null,
            type: cc.Label,
        },

        popUpManager: {
            default: null,
            type: PopUpManager
        },

        totalChipsLbl: {
            default: null,
            type: cc.Label,
        },

        buyInLbl: {
            default: null,
            type: cc.Label,
        },

        defaultBuyInLbl: {
            default: null,
            type: cc.Label,
        },

        minLbl: {
            default: null,
            type: cc.Label,
        },

        maxLbl: {
            default: null,
            type: cc.Label,
        },

        sliderTouch: {
            default: null,
            type: SliderTouchType,
        },

        checkBox: {
            default: null,
            type: cc.Toggle,
        },

        editBox: {
            default: null,
            type: cc.EditBox,
        },

        defaultBuyInEdit: {
            default: null,
            type: UtilEditBoxType,
        },

        callback: {
            default: null,
            visible: false,
        },

        index: {
            default: 0,
            visible: false,
        },

        minAmount: {
            default: 0,
            visible: false,
        },

        maxAmount: {
            default: 10,
            visible: false,
        },
        onSitHere: false,
        isWindows: false,

        checkMinUpdatedInAndroid: false,
        playerStandUp: false,
        disableUI: {
            default: null,
            type: cc.Node,
        },

        msgLbl: {
            default: null,
            type: cc.Label,
        },
        confirmBtn: {
            default: null,
            type: cc.Button
        },
        buyChipsButton: {
            default: null,
            type: cc.Button
        },
        claimButton: {
            default: null,
            type: cc.Button
        },
        cancelCallback: null,
        // gridRefreshedRef: null,
        playerInfoRef: null,
        lbs: {
            default: [],
            type: [cc.Label],
        },
        tiledSize: 0,
        untiledSize: 0,
        rebuyTimerCount: 0,
        isMobile: false,
        mobEditBox: {
            default: null,
            type: cc.EditBox,
        },

        dialogHeadingText: {
            default: null,
            type: cc.Label
        },
        topHeadingLbl: {
            default: null,
            type: cc.Label
        },
        timeDonw: {
            default: null,
            type: cc.Label
        },
    },

    /**
     * @description This is used for resizing of node (Grid)
     * @method gridRefreshed
     * @memberof Popups.BuyInPopup#
     */
    gridRefreshed: function () {
        // var flag = (GameManager.activeTableCount == 1 || GameScreen.viewType == 2);
        // this.lbs.forEach(function (element) {
        //     if (flag) {
        //         element.node.scale = 0.8;
        //     } else {
        //         element.node.scale = 1;
        //     }
        // }, this);
    },

    /**
     * @description Destroy Callback method
     * @method onDestroy
     * @memberof Popups.BuyInPopup#
     */
    onDestroy: function () {
        // GameScreen.node.off("grid-refreshed", this.gridRefreshedRef);
        GameManager.off("playerInfo", this.playerInfoRef);
    },

    /**
     * @description Calls gridRefreshed method
     * @method onEnable
     * @memberof Popups.BuyInPopup#
     */
    onEnable: function () {
        // this.gridRefreshed();
    },

    /** 
     * @method onPlayerInfo
     * @param {Object} response
     * @memberof Popups.BuyInPopup#
     */
    onPlayerInfo: function (response = null) {

        if (!!response.channelId && !!GameScreen && ScreenManager.currentScreen == K.ScreenEnum.GamePlayScreen) {
            for (var index = 0; index < GameScreen.gameModel.activePokerModels.length; index++) {
                // console.log("ACTIVE CHANNELS : -  ", GameScreen.gameModel.activePokerModels[index].gameData.channelId);
                if (response.channelId === GameScreen.gameModel.activePokerModels[index].gameData.channelId) {
                    //In channels popupmanager, at 2nd index PlayerInfoPopup is stored.
                    GameScreen.gameModel.activePokerModels[index].popUpManager.hide(PopUpType.BuyInPopup, function () { });
                    return;
                }
            }
        } else {
            this.popUpManager.hide(PopUpType.BuyInPopup, function () { });
        }

    },

    /**
     * @description Calls onConfirm method when enter button is clicked
     * @method onClickEnter
     * @memberof Popups.BuyInPopup#
     */
    onClickEnter: function () {
        this.onConfirm();
    },

    /**
     * @description This is used for Initialisation
     * @method onLoad
     * @memberof Popups.BuyInPopup#
     */
    onLoad: function () {
        this.isMobile = cc.sys.isMobile && !cc.sys.isBrowser;
        if (this.isMobile) {
            this.editBox.InputFlag  = cc.EditBox.InputFlag.SENSITIVE;
            this.editBox.InputMode  = cc.EditBox.InputMode.NUMERIC;
        }
        // this.gridRefreshedRef = this.gridRefreshed.bind(this);
        this.playerInfoRef = this.onPlayerInfo.bind(this);
        // GameScreen.node.on("grid-refreshed", this.gridRefreshedRef);
        GameManager.on("playerInfo", this.playerInfoRef);
        this.sliderTouch.registerCallback(this.onSliderValueChange.bind(this));
    },
    //  onClickEnter : function(){
    //  this.onConfirm();
    //  },
    /**
     * @description Method called from popUpManager to set initial view of this popUp using some data
     * @method onShow
     * @param {Object} data -Stores the min, max values which is used in buyIn popup
     * @memberof Popups.BuyInPopup#
     */
    updateRebuy() {
        this.rebuyTimerCount -= 1;
        if (this.rebuyTimerCount <= 0) {
            this.rebuyTimerCount = 0;
            this.unschedule(this.updateRebuy);
        }
        this.rebuyTimer.string = '(' + this.rebuyTimerCount + 's)';
    },
    onShow: function (data) {
        this.data = data;
        GameManager.emit("disablePageView");

        this.claimButton.node.active = false;

        if (GameManager.user.category == "GOLD") {
            cc.find('Container/header/r2/icon', this.node).getComponent(cc.Sprite).spriteFrame = this.goldSprite;
            cc.find('Container/Cashier/icon', this.node).getComponent(cc.Sprite).spriteFrame = this.goldSprite;
            cc.find('Container/Center/InputBox/editbox/chips', this.node).getComponent(cc.Sprite).spriteFrame = this.goldSprite;
            cc.find('Container/min/icon', this.node).getComponent(cc.Sprite).spriteFrame = this.goldSprite;
            cc.find('Container/max/icon', this.node).getComponent(cc.Sprite).spriteFrame = this.goldSprite;
        }
        else {
            cc.find('Container/header/r2/icon', this.node).getComponent(cc.Sprite).spriteFrame = this.diamondSprite;
            cc.find('Container/Cashier/icon', this.node).getComponent(cc.Sprite).spriteFrame = this.diamondSprite;
            cc.find('Container/Center/InputBox/editbox/chips', this.node).getComponent(cc.Sprite).spriteFrame = this.diamondSprite;
            cc.find('Container/min/icon', this.node).getComponent(cc.Sprite).spriteFrame = this.diamondSprite;
            cc.find('Container/max/icon', this.node).getComponent(cc.Sprite).spriteFrame = this.diamondSprite;
        }

        
        // console.trace("BUY IN DATA ", data);
        if (data.isRebuy) {
            this.buyinContent.active = false;
            this.rebuyContent.active = true;
            this.callback = data.confirm;
            
            this.rebuyMyChipsLbl.string = GameManager.convertChips(data.totalChips);
            this.rebuyChipsLbl.string = GameManager.convertChips(data.rebuyChips);
            this.rebuyAmountLbl.string = GameManager.convertChips(data.rebuyAmount);
            this.rebuyHoursFeeLbl.string = GameManager.convertChips(data.rebuyHoursFee);
            this.rebuyTotalChipsLbl.string = GameManager.convertChips(data.rebuyTotalChips);
            this.rebuyTimerCount = data.rebuyTimer;
            this.updateRebuy();
            this.schedule(this.updateRebuy, 1);
        }
        else {
            this.buyinContent.active = true;
            this.rebuyContent.active = false;

            
            if (data.quickSeat === true) {

            }
            else {
                cc.find('Container/header/r1/vari', this.node).getComponent(cc.Label).string = data.config.channelName;
                cc.find('Container/header/r2/blind', this.node).getComponent(cc.Label).string = GameManager.convertChips(data.config.smallBlind) + "/" + GameManager.convertChips(data.config.bigBlind);
            }
            cc.find('Container/min/realMoney', this.node).getComponent(cc.Label).string = GameManager.convertChips(data.minValue);
            cc.find('Container/max/realMoney', this.node).getComponent(cc.Label).string = GameManager.convertChips(data.maxValue);

            this.sound = data.playSound;
            // this.dialogHeadingText.string = data.dialogHeadingText;
            // this.scheduleOnce(function () {
            this.topHeadingLbl.string = data.topHeading;
            var info = data.maxValue <= 0 ? "" : LocalizedManager.t('TXT_FUNDS_INSUFFICIENT');
            if (data.minValue <= 0) {
                data.minValue = 1;
            }
            if (data.maxValue > 0) {
                data.maxValue = data.maxValue < data.totalChips ? data.maxValue : data.totalChips;
            }
            this.disableView((data.maxValue < data.minValue), info, data.maxValue <= 0 && !data.quickSeat);
            if (data.maxValue < data.minValue) {
                data.minValue = 0;
                data.maxValue = 0;
            }

            data.minValue = Math.floor(data.minValue);
            data.maxValue = Math.floor(data.maxValue);

            this.editBox.string = data.minValue.toString();
            this.minLbl.string = GameManager.convertChips(data.minValue.toString());
            this.maxLbl.string = GameManager.convertChips(data.maxValue.toString());
            this.minAmount = data.minValue;
            this.maxAmount = data.maxValue;
            var midVal = (this.minAmount + this.maxAmount) / 2;
            if (data.isAllInAndFold) {
                midVal = this.minAmount
            }
            // console.log("------------" + midVal);
            if (midVal > 0) {
                if (data.isAllInAndFold) {
                    this.sliderTouch.setSliderValue(0);
                }
                else {
                    this.sliderTouch.setSliderValue(midVal / (this.maxAmount + this.minAmount));
                }
            }
            // this.checkBox.setSelection(false);
            //  data.totalChips = 10000.00005;
            this.totalChipsLbl.string = GameManager.convertChips(data.totalChips)
            this.callback = data.confirm;
            this.index = data.index;
            this.onSitHere = data.onSitHere;
            this.cancelCallback = data.cancelCallback;
            this.channelId = data.channelId;
            this.playerStandUp = data.playerStandUp;

            // if (data.maxValue == data.minValue) {
            this.disableUI.active = (data.maxValue == data.minValue);
            this.checkBox.node.parent.active = !this.disableUI.active;
            //  }
            // if (data.autoConfirm) {
            //     this.onConfirm();
            // }
            // }, 0.1);

            if (data.isAllInAndFold) {
                this.disable.active = true;
                this.msgLbl.string = "You can not change buyin amount in this room";
                this.checkBox.node.parent.active = false;
            }
            else {
                this.disable.active = false;
            }


            // if (data.isAddChips === true) {
            //     this.autoBuyIn.active = false;
            // }
        }

        if (!data.isRealMoney) {
            this.claimButton.node.active = true;
        }
        if (data.isAddChips === true) {
            this.timeDonw.string = "";
            this.unschedule(this.updateTimeDown);
        }
        else {
            this.startCountdown(timeCountDown);
        }
    },

    // updateEditLblMin: function () {
    //     if (this.  Lbl.string < this.minAmount) {
    //         this.checkMinUpdatedInAndroid = true;
    //         // this.defaultBuyInEdit.editBox.node.setTag();
    //         this.buyInLbl.string = this.minAmount;
    //         this.msgLbl.string = "You cannot add less than minimum allowed chips";
    //     }
    //     else {
    //         this.msgLbl.string = "";
    //     }
    //     //  this.sliderTouch.setSliderValue((this.buyInLbl.string - this.minAmount) / (this.maxAmount - this.minAmount + 1));
    // },
    // updateEditLblMax: function () {

    //     if (this.buyInLbl.string > this.maxAmount) {
    //         //this.buyInLbl.string = this.maxAmount;
    //         var t = this.buyInLbl.string;
    //         t = t.slice(0, t.length - 1);
    //         this.buyInLbl.string = t;
    //         this.msgLbl.string = "You cannot add more than maximum allowed chips";
    //     } else {
    //         this.msgLbl.string = "";
    //     }
    // },

    /**
     * @description This is called after typing every letter
     * @method updateDefaultEditMax
     * @memberof Popups.BuyInPopup#
     */
    updateDefaultEditMax: function () {
        /**
         * To not allow first character to be 0.
         */
        if (isNaN(this.editBox.string)) {
            var pat = /\d+/g;
            var x = this.editBox.string.match(pat);
            var t = "";
            if (x) {
                for (var count = 0; count < x.length; count++) {
                    t += x[count];
                }
            }
            this.editBox.string = t;
            // this.editBox.proto.value = t;
        } else {
            /**
             * to not allow spaces to be entered.
             */
            if (/\s/.test(this.editBox.string)) {
                var temp = this.editBox.string.toString().trim();
                this.editBox.string = temp;
                // this.editBox.proto.value = temp;
            }
            /**
             * isNaN accepts decimal, so to avoid it.
             */
            var t = ".";
            if (this.editBox.string.indexOf(t) != -1) {
                var x = this.editBox.string;
                x = x.replace('.', '');
                this.editBox.string = x;
                // this.editBox.proto.value = x;
            }
            /**
             * to avoid character 'e' in between.
             */
            var t = "e";
            if (this.editBox.string.indexOf(t) != -1) {
                var x = this.editBox.string;
                x = x.replace('e', '');
                this.editBox.string = x;
                // this.editBox.proto.value = x;
            }
            var t = "-";
            if (this.editBox.string.indexOf(t) != -1) {
                var x = this.editBox.string;
                x = x.replace('-', '');
                this.editBox.string = x;
                // this.editBox.proto.value = x;
            }
            var patt = (this.editBox.string.length > 1) ? (/[0-9]/) : (/[1-9]/);
            if (patt.test(this.editBox.string)) { } else {
                var x = this.editBox.string;
                x = x.replace('0', '');
                this.editBox.string = x;
                // this.editBox.proto.value = x;
            }
        }

        if (this.editBox.string >= this.minAmount && this.editBox.string <= this.maxAmount) {
            this.confirmBtn.interactable = true;
            this.msgLbl.string = "";
        }
        if (this.editBox.string > this.maxAmount) {
            // var t = this.editBox.string;
            // t = t.slice(0, t.length - 1);
            //this.defaultBuyInEdit.editBox.proto.value = t;
            this.msgLbl.string = LocalizedManager.t('TEXT_CANNOT_MORE_CHIPS');            
        } else if (this.editBox.string < this.minAmount) {
            this.confirmBtn.interactable = false;
            this.msgLbl.string = LocalizedManager.t('TXT_CANNOT_LESS_CHIPS');            
        }
        //   this.sliderTouch.setSliderValue((this.defaultBuyInLbl.string - this.minAmount) / (this.maxAmount - this.minAmount + 1));
    },

    /**
     * @description This is called when the edit ends, to check for minimum value
     * @method updateDefaultEditMin
     * @memberof Popups.BuyInPopup#
     */
    updateDefaultEditMin: function () {
        if (this.editBox.string < this.minAmount) {
            // this.defaultBuyInLbl.string = this.minAmount;
            // this.editBox.string = this.minAmount;
            this.msgLbl.string = LocalizedManager.t('TXT_CANNOT_LESS_CHIPS');            
            this.confirmBtn.interactable = false;
        } else if (this.editBox.string > this.maxAmount) {
            // this.defaultBuyInLbl.string = this.maxAmount;
            //  this.editBox.string = this.maxAmount;
            this.msgLbl.string = LocalizedManager.t('TEXT_CANNOT_MORE_CHIPS');            
            this.confirmBtn.interactable = false;
        } else {
            this.msgLbl.string = "";
            // this.confirmBtn.interactable = true;
        }
        this.sliderTouch.setSliderValue((this.editBox.string - this.minAmount) / (this.maxAmount - this.minAmount));
    },

    /**
     * @description Updates the countdown timer label
     * @method updateTimeDown
     * @memberof Popups.BuyInPopup#
     */
    updateTimeDown: function () {
        if (this.timeDonw) {
            let timeLeft = parseInt(this.timeDonw.string.split(':').reduce((acc, time) => (60 * acc) + +time));
            if (isNaN(timeLeft)) {
                timeLeft = 0;
            }
            if (timeLeft > 0) {
                timeLeft -= 1;
                let minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;
                this.timeDonw.string = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            } else {
                this.unschedule(this.updateTimeDown);
                this.onCancel();
            }
        }
    },

    /**
     * @description Starts the countdown timer
     * @method startCountdown
     * @param {number} duration - The duration for the countdown in seconds
     * @memberof Popups.BuyInPopup#
     */
    startCountdown: function (duration) {
        let minutes = Math.floor(duration / 60);
        let seconds = duration % 60;
        this.timeDonw.string = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        this.schedule(this.updateTimeDown, 1);
    },

    /**
     * @description Updates Min/Max value of chips
     * @method updateMobEditMax
     * @memberof Popups.BuyInPopup#
     */
    updateMobEditMax: function () {
        if (isNaN(this.editBox.string)) {
            this.msgLbl.string = LocalizedManager.t('TXT_ENTER_VALID_CHIPS');
            this.confirmBtn.interactable = false;
            return;
        }

        if (this.editBox.string >= this.minAmount && this.editBox.string <= this.maxAmount) {
            this.confirmBtn.interactable = true;
            this.msgLbl.string = "";
        }
        if (this.editBox.string > this.maxAmount) {
            this.msgLbl.string = LocalizedManager.t('TEXT_CANNOT_MORE_CHIPS');            
            this.confirmBtn.interactable = false;
        } else if (this.editBox.string < this.minAmount) {
            this.confirmBtn.interactable = false;
            this.msgLbl.string = LocalizedManager.t('TXT_CANNOT_LESS_CHIPS');            
        }
    },

    /**
     * @description Updates Min/Max value of chips
     * @method updateMobEditMin
     * @memberof Popups.BuyInPopup#
     */
    updateMobEditMin: function () {
        if (isNaN(this.editBox.string)) {
            this.msgLbl.string = LocalizedManager.t('TXT_ENTER_VALID_CHIPS');
            this.confirmBtn.interactable = false;
            return;
        }
        if (this.editBox.string < this.minAmount) {
            this.msgLbl.string = LocalizedManager.t('TXT_CANNOT_LESS_CHIPS');            
            this.confirmBtn.interactable = false;
        } else if (this.editBox.string > this.maxAmount) {
            this.msgLbl.string = LocalizedManager.t('TEXT_CANNOT_MORE_CHIPS');            
            this.confirmBtn.interactable = false;
        } else {
            this.msgLbl.string = "";
        }
        this.sliderTouch.setSliderValue((this.editBox.string - this.minAmount) / (this.maxAmount - this.minAmount + 1));
    },

    /**
     * @description Called when value of slider is changed
     * @method onSliderValueChange
     * @param {Number} value
     * @memberof Popups.BuyInPopup#
     */
    onSliderValueChange: function (value) {
        value = value < 0 ? 0 : value;
        value = value > 1 ? 1 : value;
        var amount = Math.floor(value * (this.maxAmount - this.minAmount + 1) + this.minAmount);
        amount = amount > this.maxAmount ? this.maxAmount : amount;
        this.editBox.string = isNaN(amount.toString()) ? "0" : amount.toString();
        // this.defaultBuyInLbl.string = amount;
        this.confirmBtn.interactable = true;
        // this.msgLbl.string = "";
    },

    /**
     * @description Save auto buy in option
     * @method onAutoBuySelected
     * @memberof Popups.BuyInPopup#
     */
    onAutoBuySelected: function () {
        GameManager.user.autoBuyIn = this.checkBox.isChecked; //getSelection();
        // console.log(GameManager.user.autoBuyIn)
        if (!this.playerStandUp) {
            var data = new SetPlayerValData(this.channelId, GameManager.user.playerId, "isAutoReBuy", GameManager.user.autoBuyIn);
            ServerCom.pomeloRequest(K.PomeloAPI.setPlayerValOnTable, data, function (response) {
                // console.log(response)
                if (response.success) { } else { }
            }, null, 5000, false, false);
        }

        if (this.sound) {
            this.sound(K.Sounds.click);
        }
    },

    /**
     * @description Min button callabck
     * @method onMin
     * @memberof Popups.BuyInPopup#
     */
    onMin: function () {
        this.sliderTouch.setSliderValue(0);
        // this.buyInLbl.string = this.minAmount;
        // this.defaultBuyInLbl.string = this.minAmount;

        // if (this.editBox.proto) {
        //     this.editBox.proto.value = this.minAmount.toString();
        // } else {
        //     this.editBox.string = this.minAmount.toString();
        // }

        this.editBox.string = this.minAmount.toString();

    },

    /**
     * @description Max button callabck
     * @method onMax
     * @memberof Popups.BuyInPopup#
     */
    onMax: function () {
        this.sliderTouch.setSliderValue(1);
        // this.buyInLbl.string = this.maxAmount;
        // this.defaultBuyInLbl.string = this.maxAmount;
        // this.editBox.proto.value = this.maxAmount;

        // if (this.editBox.proto) {
        //     this.editBox.proto.value = this.maxAmount.toString();
        // } else {
        //     this.editBox.string = this.maxAmount.toString();
        // }
        this.editBox.string = this.maxAmount.toString();
    },


    onIncrementSlider: function () {
        this.sliderTouch.setSliderValue(this.sliderTouch.getSliderValue() + 0.1);
        if (this.sound) {
            this.sound(K.Sounds.click);
        }

    },
    onDecrementSlider: function () {
        this.sliderTouch.setSliderValue(this.sliderTouch.getSliderValue() - 0.1);
        if (this.sound) {
            this.sound(K.Sounds.click);
        }

    },

    /**
     * @description Confirm button callback
     * @method onConfirm
     * @memberof Popups.BuyInPopup#
     */
    onConfirm: function () {
        if (this.checkVal()) {
            //   if (this.onSitHere) {
            //check if andorid or windows...so send tht label string accrdngl
            // if (this.isWindows) {
            //     if (this.editBox.string < this.minAmount) {
            //         this.editBox.string = this.minAmount;
            //         return;
            //     } else {
            //         this.callback(this.index, this.editBox.string);
            //     }
            // } else {
            this.callback(this.index, this.editBox.string);
            // }
            GameManager.emit("enablePageView");
            this.popUpManager.hide(PopUpType.BuyInPopup, function () { });
            if (this.sound) {
                this.sound(K.Sounds.click);
            }


            //make the sit request on the server
        }
    },

    onConfirmRebuy: function () {
        this.callback();
        GameManager.emit("enablePageView");
        this.popUpManager.hide(PopUpType.BuyInPopup, function () { });
        // this.sound(K.Sounds.click);
    },

    /**
     * @description Cancel Button callback
     * @method onCancel
     * @memberof Popups.BuyInPopup#
     */
    onCancel: function () {
        if (this.rebuyContent.active) {
            return;
        }
        if (this.cancelCallback != null) {
            this.cancelCallback();
        }
        GameManager.emit("enablePageView");
        this.popUpManager.hide(PopUpType.BuyInPopup, function () { });
        if (this.sound) {
            this.sound(K.Sounds.click);
        }

    },

    /**
     * @description Check whether suppied value lies within range
     * @method checkVal
     * @memberof Popups.BuyInPopup#
     */
    checkVal: function () {
        // var value = this.isWindows ? this.buyInLbl.string : this.editBox.string;
        var value = this.editBox.string;
        //   if (value > parseInt(this.totalChipsLbl.string)) {
        // this.disableView(true, "Insufficient Balance : Your balance is less than buy in amount");
        //     this.msgLbl.string = "Insufficient Balance : Your balance is less than buy in amount";
        //       return false;
        // } else {
        this.disableView(false);

        if (isNaN(value)) {
            this.msgLbl.string = LocalizedManager.t('TXT_ENTER_VALID_CHIPS');
            return false;
        }

        if (value >= this.minAmount) {
            if (value <= this.maxAmount) {
                return true;
            } else {
                this.msgLbl.string = LocalizedManager.t('TEXT_CANNOT_MORE_CHIPS');
                return false;
            }
        } else {
            this.msgLbl.string = LocalizedManager.t('TXT_CANNOT_LESS_CHIPS');
            return false;
        }
        //}
        //return true;

    },

    /**
     * @description Prevent from adding more chips in game
     * @method disableView
     * @param {boolean} val
     * @param {string} msg
     * @memberof Popups.BuyInPopup#
     */
    disableView: function (val, msg = "", promptBuy = false) {

        // this.popUpManager.hide(PopUpType.BuyInPopup, function () { });

        this.disableUI.active = val;
        this.checkBox.node.parent.active = !val;
        if (promptBuy) {
            this.confirmBtn.interactable = false;
            this.buyChipsButton.interactable = true;
            this.buyChipsButton.node.active = true;
        } else {
            this.confirmBtn.interactable = true;
            this.buyChipsButton.interactable = false;
            this.buyChipsButton.node.active = false;
        }
        msg = !!msg ? msg : LocalizedManager.t('TXT_ALREADY_MAXIMUM_CHIP');

        this.msgLbl.string = val ? msg : "";
        this.confirmBtn.interactable = !val;
        if (this.confirmBtn.interactable) {
            // var clr = new cc.Color(WHITE);
            this.confirmBtn.node.color = cc.Color.WHITE;

        } else {
            var color2 = new cc.Color(27, 53, 15);
            this.confirmBtn.node.color = color2;

        }
    },

    /**
     * @description Buy More Chips
     * @method onConfirm
     * @memberof Popups.BuyInPopup#
     */
    onBuyMoreChips: function () {
        // let url = K.ServerAddress.cashier_AddCash_URL;
        // if (GameManager.isMobile) {
        //     cc.sys.openURL(url);
        // } else {
        //     window.open(url);
        // }
        this.popUpManager.hide(PopUpType.BuyInPopup, function () { });
        GameManager.emit("onDashboardAddCash");
    },

    onClaim: function () {
        var inst = this;
        ServerCom.pomeloRequest("connector.entryHandler.playerClaimFreeChips", {
            playerId: GameManager.user.playerId,
        }, function (response) {
            console.log("onClaim", JSON.parse(JSON.stringify(response)));

            // {
            //     "success": true,
            //     "result": {
            //         "freeChips": 10000
            //     }
            // }

            if (response.success) {

                GameManager.popUpManager.show(PopUpType.NotificationPopup, "Claim free chips succeeded!", function () { });

                GameManager.user.freeChips = response.result.freeChips;

                inst.data.totalChips = GameManager.user.freeChips;
                inst.onShow(inst.data);
            }
            else {
                GameManager.popUpManager.show(
                    PopUpType.CommonDialog, 
                    {
                        "title": "Error!",
                        "content" : response.message
                    }, 
                    function () {}
                );
            }
        }, null, 5000, false);
    },

});
