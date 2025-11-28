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
var InvliteFriendsList = cc.Class({
    extends: cc.Component,

    properties: {
        contentNode: {
            default: null,
            type: cc.Node,
        },
        itemNode: {
            default: null,
            type: cc.Node,
        },
    },

    onDestroy: function () {
    },

    onEnable: function () {
    },

    onLoad: function () {
        // GameManager.on("sendBuddyRequestReceive", this.onSendBuddyRequestReceive.bind(this));
        // GameManager.on("handleBuddyRequestReceive", this.onHandleBuddyRequestReceive.bind(this));
    },
    
    onShow: function (data) {
        this.data = data;
        this.onFriendsList();
    },

    onClose: function () {
        this.node.active = false;
    },

    onFriendsList: function() {
        
        GameManager.friendRequstFriends(() => {
            this.contentNode.removeAllChildren();
            for (var i = 0; i < GameManager.buddies.length; i++) {
                const instance =  cc.instantiate(this.itemNode);
                instance.setPosition(0, 0);
                instance.active = true;
                cc.find('layout/name', instance).getComponent(cc.Label).string = GameManager.buddies[i].userName;
                cc.find('Avatar/online', instance).active = GameManager.buddies[i].isOnline;
                cc.find('Avatar/offline', instance).active = !GameManager.buddies[i].isOnline;
                cc.find('Avatar/Mask/avatarSprite', instance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[(GameManager.buddies[i].profileImage != "undefined") ? Number(GameManager.buddies[i].profileImage) : 1];
                cc.find('Avatar', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddies[i];
                instance.__data = GameManager.buddies[i];
                instance.parent = this.contentNode;
            }
        }); 
    },

    onSelect: function(event, customEventData) {
        console.log("onSelect", customEventData);
        console.log(this.data);

        let data = {
            "playerId": customEventData.playerId,
            "channelId": this.data.model.gameData.channelId,
            "channelName": this.data.model.roomConfig.channelName,
            "smallBlind": this.data.model.gameData.tableDetails.smallBlind,
            "bigBlind": this.data.model.gameData.tableDetails.bigBlind,
            "channelVariation": this.data.model.roomConfig.channelVariation
        }

        console.log(data);

        GameManager.inviteBuddy(data, (response) => {
            GameManager.popUpManager.show(PopUpType.NotificationPopup, response.message, function () {});
        });    
    }
});

