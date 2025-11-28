var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

/**
 * @classdesc
 * @class PlayerInfoPopup
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
            type: cc.Label,
        },
        headingLbl: {
            default: null,
            type: cc.Label,
        },
    },

    /**
     * @description Set labels of popup and auto hide the popup after 4 seconds
     * @method onShow
     * @param {Object} data
     * @memberof Popups.PlayerInfoPopup#
     */

    onShow: function (data) {
        if (data !== null) {
            this.infoLbl.string = data.info;
            if (!!data.heading)
                this.headingLbl.string = data.heading;
            var disableTimer = false;
            if (!!data.disableTimer)
                disableTimer = true;
            if (!disableTimer) {
                var timer = 4;
                if (!!data.timer)
                    timer = data.timer;
                setTimeout(function () {
                    if (!!this.popUpManager) {
                        if (this.popUpManager != GameManager.popUpManager) {
                            this.popUpManager.hide(2);
                        } else {
                            this.popUpManager.hide(PopUpType.PlayerInfoPopup);
                        }
                    }
                }.bind(this), timer * 1000);
            }
        }
    },
});