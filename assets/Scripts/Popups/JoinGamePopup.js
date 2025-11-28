var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

/**
 * @classdesc
 * @class JoinGamePopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {
        infoLbl: {
            default: null,
            type: cc.Label,
        },
        headingLbl: {
            default: null,
            type: cc.Label,
        },
        callback: null,
        joinData: null,
        playerInfoRef: null,
    },

    /**
     * @description This is used for initialisation
     * @method onLoad
     * @memberof Popups.JoinGamePopup#
     */
    onLoad: function () {
        this.playerInfoRef = this.onPlayerInfo.bind(this);
        GameManager.on("playerInfo", this.playerInfoRef);
    },

    /**
     * @description Set labels of popup and auto hide the popup after 4 seconds
     * @method onShow
     * @param {Object} data
     * @memberof Popups.JoinGamePopup#
     */
    onShow: function (data) {
        if (data !== null) {
            this.infoLbl.string = data.info;
            this.joinData = data.joinData;
            this.callback = data.callback;
            if (!!data.heading)
                this.headingLbl.string = data.heading;
        }
    },

    /**
     * @description Cancel button callback
     * @method onCancel
     * @memberof Popups.JoinGamePopup#
     */
    onCancel: function () {
        GameManager.popUpManager.hide(PopUpType.JoinGamePopup, function () {});
        GameManager.playSound(K.Sounds.click);

    },
              
    /**
     * @description Called when Enter button is clicked
     * @method onClickEnter
     * @memberof Popups.JoinGamePopup#
     */
    onClickEnter: function () {
       this.onClick();
    },

    /**
     * @description Callback joindata function and hides Join Game Popup when clicked
     * @method onClick
     * @memberof Popups.JoinGamePopup#
     */
    onClick: function () {
        if (!!this.callback) {
            this.callback(this.joinData);
            GameManager.popUpManager.hide(PopUpType.JoinGamePopup, function () {});
            GameManager.playSound(K.Sounds.click);

        }
    },

    /**
     * @description Hides the Join game popup
     * @method onPlayerInfo
     * @param {Object} response
     * @memberof Popups.JoinGamePopup#
     */
    onPlayerInfo: function (response) {
        GameManager.popUpManager.hide(PopUpType.JoinGamePopup, function () {
        });
    },

});