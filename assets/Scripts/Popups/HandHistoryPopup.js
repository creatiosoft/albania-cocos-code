var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

/**
 * @classdesc Manages handhistory in gamechat 
 * @class HandHistoryPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {
        popUpManager: {
            default: null,
            type: PopUpManager
        },
        infoLbl: {
            default: null,
            type: cc.RichText,
        },
        headingLbl: {
            default: null,
            type: cc.Label,
        },

        scrollView: {
            default: null,
            type: cc.ScrollView
        },
    },

    /**
     * @description Set labels of popup and auto hide the popup after 4 seconds
     * @method onShow
     * @param {Object} data
     * @memberof Popups.HandHistoryPopup#
     */
    onShow: function (data) {
        // console.log(data.info)
        if (data != null) {
            data.info = data.info.replace(/Kicker/g, '<color=#32CD32>Kicker</color>');
            this.infoLbl.string = data.info;
            this.headingLbl.string = data.heading;
        }

        if (!GameManager.isMobile) {
            this.registerUPandDOWN();
        }
    },

    /**
     * @description Called when enter button is clicked
     * @method onClickEnter
     * @memberof Popups.HandHistoryPopup#
     */
    onClickEnter: function () {
        this.cancel();
    },

    /**
     * @description Cancel button button callback
     * @method cancel
     * @memberof Popups.HandHistoryPopup#
     */
    cancel: function () {
        if (!GameManager.isMobile) {
            // cc.eventManager.removeListener(this.upDownListenerAvatarScrollView);
        }
        this.popUpManager.hide(PopUpType.HandHistoryPopup, function () { });
    },

    /**
  * @description Scroll Up by one line
  */
    onUpScrollClick: function () {

        let sView = this.scrollView;

        var currentOffset = sView.getScrollOffset();
        let viewChildrenCount = sView.content.children.length;

        var x = cc.v2(0, currentOffset.y - 26);
        this.scrollView.scrollToOffset(x, 0.2);

    },

    /**
     * @description Scroll Down by one line
     */
    onDownScrollClick: function () {
        let sView = this.scrollView;
        var currentOffset = sView.getScrollOffset();

        var x = cc.v2(0, currentOffset.y + 26);
        this.scrollView.scrollToOffset(x, 0.2);

    },


    registerUPandDOWN: function () {
        return
        var scrollView = this;
        this.upDownListenerAvatarScrollView = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed(key, event) {
                if (key == cc.KEY.down) {
                    // console.log("ScrollS CROLL DOWN ", )
                    scrollView.onDownScrollClick();
                    event.stopPropagation();
                } else if (key == cc.KEY.up) {
                    // console.log("ScrollS CROLL UP ", )
                    scrollView.onUpScrollClick();
                    event.stopPropagation();
                } else {
                    event.stopPropagation();
                }
            }
        })
        cc.eventManager.addListener(this.upDownListenerAvatarScrollView, this.node);
    },
});