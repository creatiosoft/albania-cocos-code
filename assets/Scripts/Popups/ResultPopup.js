var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var dataA = null;

/**
 * @classdesc Displays result of the tournament
 * @class ResultPopup
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
        prizeInfo: null,
        messageLbl: {
            default: null,
            type: cc.Label,
        },
        headingLbl: {
            default: null,
            type: cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    /**
     * @description Method called from popUpManager to set initial view of this popUp using some data
     * @method onShow
     * @param {Object} data
     * @memberof Popups.ResultPopup#
     */
    onShow: function (data) {
        if (data != null) {
            this.prizeInfo = data;
            this.infoLbl.string = "Rank - " + data.rank + "\n Chips earned - " + data.chipsWon;
            this.headingLbl.string = (!!data.channelName ? data.channelName : "") + " Results";
            if (data.chipsWon < 1) {
                this.messageLbl.string = "Better Luck Next Time";
            }
            else {
                this.messageLbl.string = "Congratulations!!!"
                // switch (data.rank) {
                // case 1:
                // this.messageLbl.string += "";
                // }
            }
        }
    },

    /**
     * @description Called when enter button is click
     * @method onClickEnter
     * @memberof Popups.ResultPopup#
     */
    onClickEnter: function () {
       this.onCollectPrize();
    },

    /**
     * @description Sends request to server for prize collection after user click on enter button
     * @method onCollectPrize
     * @memberof Popups.ResultPopup#
     */
    onCollectPrize: function () {
        var data = {
            playerId: this.prizeInfo.playerId,
            gameVersionCount: this.prizeInfo.gameVersionCount,
            tournamentId: this.prizeInfo.tournamentId
        };
        ServerCom.pomeloRequest(K.PomeloAPI.collectPrize, data, function (response) {
            if (response.success) {
                if (this.prizeInfo.callback != null) {
                    this.prizeInfo.callback();
                }
                this.onExit();
            }
        }.bind(this));
    },

    /**
     * @description Exit button callback
     * @method onExit
     * @memberof Popups.ResultPopup#
     */
    onExit: function () {
        this.popUpManager.hide(PopUpType.ResultPopup, function () { });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
