var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var JoinData = require('PostTypes').JoinChannel;
/**
 * @classdesc 
 * @class InviteToPlayPopup
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
        infoLbl: {
            default: null,
            type: cc.Label,
        },
    },

    /**
     * @description Method called from popUpManager to set initial view of this popUp using some data
     * @method onShow
     * @param {Object} data
     * @memberof Popups.InviteToPlayPopup#
     */
    onShow: function (data) {
        console.log("InviteToPlayPopup data ", JSON.stringify(data));
        let text = LocalizedManager.t('TXT_HAS_INVITED_YOU');
        const playerName = data.playerName;
        const roomName = data.channelName + '( ' + data.smallBlind + '/' + data.bigBlind + ' )';
        text = text.replace(/XXX/gi, playerName);
        text = text.replace(/YYY/gi, roomName);
        this.infoLbl.string = text;
        this.channelId = data.channelId;        
        this.joinChannelData = {};
        this.joinChannelData.playerId = GameManager.user.playerId;
        this.joinChannelData.channelId = this.channelId;
        // this.joinChannelData.tableId = data.tableDetails.tableId || '';
        this.joinChannelData.channelType = data.channelVariation;
        // this.joinChannelData.maxPlayers = data.tableDetails.maxPlayers;
        // this.joinChannelData.isPrivateTabel = data.tableDetails.isPrivateTabel;;
    },

    onClickRejectBtn() {
        this.popUpManager.hide(PopUpType.InviteToPlayPopup, function () { });
        GameManager.playSound(K.Sounds.click);
    },

    onClickAcceptBtn() {
        var newData = new JoinData(this.joinChannelData);

        // data.callback = function () {
        //     if (!!newData.channelId) {
        //         newData.tableId = "";
        //         let pop = GameManager.join(newData.channelId, K.PomeloAPI.joinChannel, newData);
        //         if (pop) {
        //             GameManager.emit("openBuyInPopup", data.channelId);
        //         }

        let pop = GameManager.join(this.channelId, K.PomeloAPI.joinChannel, newData);

        this.popUpManager.hide(PopUpType.InviteToPlayPopup, function () { });
        // if (pop) {
        //     GameManager.emit("openBuyInPopup", this.channelId);
        // }
    },

});