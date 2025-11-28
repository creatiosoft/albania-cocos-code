var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

/**
 * @classdesc
 * @class NotificationPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {
        infoLbl: {
            default: null,
            type: cc.Label,
        },
        timer: 3,
    },

    /**
     * @description Method called from popUpManager to set initial view of this popUp using some data
     * @method onShow
     * @param {Object} data
     * @memberof Popups.NotificationPopup#
     */
    onShow: function (data) {
        if (data != null) {
            this.infoLbl.string = data;
        }

        this.node.y = 200;

        this.node.runAction(
            cc.sequence(
                cc.moveTo(0.5, new cc.Vec2(0, 185)),
                cc.delayTime(1.5),
                cc.moveTo(0.5, new cc.Vec2(0, 185))
            )
        );

        this.scheduleOnce(function () {
            this.onClose();
        }, this.timer);
    },

    /**
     * @description Cancel button callback
     * @method onClose
     * @memberof Popups.NotificationPopup#
     */
    onClose: function () {
        GameManager.popUpManager.hide(PopUpType.NotificationPopup, function () {
        });
    },

});