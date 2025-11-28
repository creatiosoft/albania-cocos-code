var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var SliderTouchType = require('SliderTouch');
// var CheckBoxType = require('Checkbox');
var EditBoxType = require('CustomEditBox');
var UtilEditBoxType = require('EditBoxUtil');
var SetPlayerValData = require('PostTypes').SetPlayerValData;

/**
 * @classdesc Manages Buyin popup
 * @class BuyInPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        popUpManager: {
            default: null,
            type: PopUpManager
        },

        totalChipsLbl: {
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

        editBox: {
            default: null,
            type: cc.EditBox,
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
        msgLbl: {
            default: null,
            type: cc.Label,
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
    },

    /**
     * @description Calls gridRefreshed method
     * @method onEnable
     * @memberof Popups.BuyInPopup#
     */
    onEnable: function () {
    },

    onLoad: function () {

    },
    
    onShow: function (data) {
        GameManager.emit("disablePageView");
        
        this.buyinContent.active = true;
        this.rebuyContent.active = false;

        this.sound = data.playSound;
        this.dialogHeadingText.string = data.dialogHeadingText;
        // this.scheduleOnce(function () {
        this.topHeadingLbl.string = data.topHeading;
        var info = data.maxValue <= 0 ? "" : LocalizedManager.t('TXT_FUNDS_INSUFFICIENT');
        if (data.minValue <= 0) {
            data.minValue = 1;
        }
        if (data.maxValue > 0) {
            data.maxValue = data.maxValue < data.totalChips ? data.maxValue : data.totalChips;
        }
        this.disableView((data.maxValue < data.minValue), info, data.maxValue <= 0);
        if (data.maxValue < data.minValue) {
            data.minValue = 0;
            data.maxValue = 0;
        }

        data.minValue = Math.floor(data.minValue);
        data.maxValue = Math.floor(data.maxValue);

        this.editBox.string =data.minValue.toString();
        this.minLbl.string = data.minValue.toString();
        this.maxLbl.string = data.maxValue.toString();
        this.minAmount = data.minValue;
        this.maxAmount = data.maxValue;
        var midVal = (this.minAmount + this.maxAmount) / 2;
        if (midVal > 0) {
            this.sliderTouch.setSliderValue(midVal / (this.maxAmount + this.minAmount));
        }
        this.totalChipsLbl.string = Number(data.totalChips.toFixed(2));
    },

    onMin: function () {
        this.sliderTouch.setSliderValue(0);
        this.editBox.string = this.minAmount.toString();

    },

    /**
     * @description Max button callabck
     * @method onMax
     * @memberof Popups.BuyInPopup#
     */
    onMax: function () {
        this.sliderTouch.setSliderValue(1);
        this.editBox.string = this.maxAmount.toString();
    },

    onConfirm: function () {
        if (this.checkVal()) {
            this.callback(this.index, this.editBox.string);
            GameManager.emit("enablePageView");
            this.popUpManager.hide(PopUpType.BuyInPopup, function () { });
            if (this.sound) {
                this.sound(K.Sounds.click);
            }


            //make the sit request on the server
        }
    },

    onCancel: function () {
        GameManager.emit("enablePageView");
        this.popUpManager.hide(PopUpType.BuyInPopup, function () { });
    },

    /**
     * @description Check whether suppied value lies within range
     * @method checkVal
     * @memberof Popups.BuyInPopup#
     */
    checkVal: function () {
        var value = this.editBox.string;
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
    },
});
