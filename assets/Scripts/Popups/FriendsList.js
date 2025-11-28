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
var FriendsList = cc.Class({
    extends: cc.Component,

    properties: {

        friendListBtn: {
            default: null,
            type: cc.Node,
        },
        inviteListBtn: {
            default: null,
            type: cc.Node,
        },
        contentNode: {
            default: null,
            type: cc.Node,
        },
        itemNode: {
            default: null,
            type: cc.Node,
        },
        itemNode2: {
            default: null,
            type: cc.Node,
        },
    },

    onDestroy: function () {
    },

    onEnable: function () {
    },

    onLoad: function () {
        cc.systemEvent.on("leaveLobby", this.leaveLobby, this);
        GameManager.on("BuddyIsOnline", this.onBuddyIsOnline.bind(this));
        GameManager.on("sendBuddyRequestReceive", this.onSendBuddyRequestReceive.bind(this));
        GameManager.on("handleBuddyRequestReceive", this.onHandleBuddyRequestReceive.bind(this));
        GameManager.on("removeBuddyReceive", this.onRemoveBuddyReceive.bind(this));
    },

    timeAgo:function fromNow(date) {
        const SECOND = 1000;
        const MINUTE = 60 * SECOND;
        const HOUR = 60 * MINUTE;
        const DAY = 24 * HOUR;
        const WEEK = 7 * DAY;
        const YEAR = 365 * DAY;
        const MONTH = YEAR / 12;
        const units = [
            { max: 30 * SECOND, divisor: 1, past1: 'just now', pastN: 'just now', future1: 'just now', futureN: 'just now' },
            { max: MINUTE, divisor: SECOND, past1: 'a second ago', pastN: '# seconds ago', future1: 'in a second', futureN: 'in # seconds' },
            { max: HOUR, divisor: MINUTE, past1: 'a minute ago', pastN: '# minutes ago', future1: 'in a minute', futureN: 'in # minutes' },
            { max: DAY, divisor: HOUR, past1: 'an hour ago', pastN: '# hours ago', future1: 'in an hour', futureN: 'in # hours' },
            { max: WEEK, divisor: DAY, past1: 'yesterday', pastN: '# days ago', future1: 'tomorrow', futureN: 'in # days' },
            { max: 4 * WEEK, divisor: WEEK, past1: 'last week', pastN: '# weeks ago', future1: 'in a week', futureN: 'in # weeks' },
            { max: YEAR, divisor: MONTH, past1: 'last month', pastN: '# months ago', future1: 'in a month', futureN: 'in # months' },
            { max: 100 * YEAR, divisor: YEAR, past1: 'last year', pastN: '# years ago', future1: 'in a year', futureN: 'in # years' },
            { max: 1000 * YEAR, divisor: 100 * YEAR, past1: 'last century', pastN: '# centuries ago', future1: 'in a century', futureN: 'in # centuries' },
            { max: Infinity, divisor: 1000 * YEAR, past1: 'last millennium', pastN: '# millennia ago', future1: 'in a millennium', futureN: 'in # millennia' },
        ];
        const diff = Date.now() - (typeof date === 'object' ? date : new Date(date)).getTime();
        const diffAbs = Math.abs(diff);
        for (const unit of units) {
            if (diffAbs < unit.max) {
                const isFuture = diff < 0;
                const x = Math.round(Math.abs(diff) / unit.divisor);
                if (x <= 1) return isFuture ? unit.future1 : unit.past1;
                return (isFuture ? unit.futureN : unit.pastN).replace('#', x);
            }
        }
    },

    // timeAgo: function (input) {
    //     const date = (input instanceof Date) ? input : new Date(input);
    //     const formatter = new Intl.RelativeTimeFormat('en');
    //     const ranges = [
    //         ['years', 3600 * 24 * 365],
    //         ['months', 3600 * 24 * 30],
    //         ['weeks', 3600 * 24 * 7],
    //         ['days', 3600 * 24],
    //         ['hours', 3600],
    //         ['minutes', 60],
    //         ['seconds', 1],
    //     ];
    //     const secondsElapsed = (date.getTime() - Date.now()) / 1000;

    //     for (const [rangeType, rangeVal] of ranges) {
    //         if (rangeVal < Math.abs(secondsElapsed)) {
    //             const delta = secondsElapsed / rangeVal;
    //             return formatter.format(Math.round(delta), rangeType);
    //         }
    //     }
    // },
    
    onShow: function (data) {
        this.onFriendsList();
    },

    leaveLobby: function (data) {
        this.friendListBtn.getChildByName("On").active = true;
        this.friendListBtn.getChildByName("Off").active = false;

        this.inviteListBtn.getChildByName("On").active = false;
        this.inviteListBtn.getChildByName("Off").active = true;

        this.contentNode.removeAllChildren();
    },

    updateNotification: function (noti) {
        for (var i = 0; i < this.contentNode.children.length; i++) {
            const instance =  this.contentNode.children[i];
            if (instance.__data._id == noti._id) {
                cc.find('content', instance).getComponent(cc.Label).string = noti.text;
                cc.find('read/time', instance).getComponent(cc.Label).string = this.timeAgo(noti.time);
                cc.find('red/red', instance).active = !noti.isRead;
                cc.find('read/read', instance).active = !noti.isRead;
                cc.find('read/read', instance).getComponent(cc.Button).clickEvents[0].customEventData = noti;
                instance.__data = noti;
                break;
            }
        }
    },

    onClose: function () {
        this.node.active = false;
    },

    onAccept: function(event, customEventData) {

        // {
        //     "err": null,
        //     "data": {
        //         "success": true,
        //         "message": "Accept success"
        //     },
        //     "requestedPlayerId": "32edd33b-d732-474c-b370-d66f9bfb64cd",
        //     "eventOrigin": "connector.entryHandler.handleBuddyRequest"
        // }

        GameManager.friendRequestAccept(customEventData, () => {
            GameManager.friendRequestReceive(() => {
                this.contentNode.removeAllChildren();
                for (var i = 0; i < GameManager.buddyRequestsReceived.length; i++) {
                    const instance =  cc.instantiate(this.itemNode);
                    instance.setPosition(0, 0);
                    instance.active = true;
                    cc.find('layout/name', instance).getComponent(cc.Label).string = GameManager.buddyRequestsReceived[i].userNameSend;
                    cc.find('online', instance).active = false;
                    cc.find('offline', instance).active = false;
                    cc.find('Avatar/Mask/avatarSprite', instance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[(GameManager.buddyRequestsReceived[i].profileImagePlayerSend != "undefined") ? Number(GameManager.buddyRequestsReceived[i].profileImagePlayerSend) - 1 : 1];
                    cc.find('accept', instance).active = true;
                    cc.find('reject', instance).active = true;
                    cc.find('remove', instance).active = false;
                    cc.find('accept', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddyRequestsReceived[i]._id;
                    cc.find('reject', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddyRequestsReceived[i]._id;
                    instance.__data = GameManager.buddyRequestsReceived[i];
                    instance.parent = this.contentNode;
                }
            }); 
        });
    },

    onReject: function(event, customEventData) {
        GameManager.friendRequestReject(customEventData, () => {
            GameManager.friendRequestReceive(() => {
                this.contentNode.removeAllChildren();
                for (var i = 0; i < GameManager.buddyRequestsReceived.length; i++) {
                    const instance =  cc.instantiate(this.itemNode);
                    instance.setPosition(0, 0);
                    instance.active = true;
                    cc.find('layout/name', instance).getComponent(cc.Label).string = GameManager.buddyRequestsReceived[i].userNameSend;
                    cc.find('online', instance).active = false;
                    cc.find('offline', instance).active = false;
                    cc.find('Avatar/Mask/avatarSprite', instance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[(GameManager.buddyRequestsReceived[i].profileImagePlayerSend != "undefined") ? Number(GameManager.buddyRequestsReceived[i].profileImagePlayerSend) - 1 : 1];
                    cc.find('accept', instance).active = true;
                    cc.find('reject', instance).active = true;
                    cc.find('remove', instance).active = false;
                    cc.find('accept', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddyRequestsReceived[i]._id;
                    cc.find('reject', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddyRequestsReceived[i]._id;
                    instance.__data = GameManager.buddyRequestsReceived[i];
                    instance.parent = this.contentNode;
                }
            }); 
        });
    },

    onRemove: function(event, customEventData) {
        // {
        //     "err": null,
        //     "data": {
        //         "message": "Not found buddy",
        //         "success": false
        //     },
        //     "requestedPlayerId": "32edd33b-d732-474c-b370-d66f9bfb64cd",
        //     "eventOrigin": "connector.entryHandler.removeBuddy"
        // }

        GameManager.friendRequestRemove(customEventData, () => {
            GameManager.friendRequstFriends(() => {
                this.contentNode.removeAllChildren();
                for (var i = 0; i < GameManager.buddies.length; i++) {
                    const instance =  cc.instantiate(this.itemNode);
                    instance.setPosition(0, 0);
                    instance.active = true;
                    cc.find('layout/name', instance).getComponent(cc.Label).string = GameManager.buddies[i].userName;
                    cc.find('online', instance).active = GameManager.buddies[i].isOnline;
                    cc.find('offline', instance).active = !GameManager.buddies[i].isOnline;
                    cc.find('Avatar/Mask/avatarSprite', instance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[(GameManager.buddies[i].profileImage != "undefined") ? Number(GameManager.buddies[i].profileImage) - 1 : 1];
                    cc.find('accept', instance).active = false;
                    cc.find('reject', instance).active = false;
                    cc.find('remove', instance).active = true;
                    cc.find('remove', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddies[i].playerId;
                    instance.__data = GameManager.buddies[i];
                    instance.parent = this.contentNode;
                }
            }); 
        });
    },

    onFriendsList: function() {
        if (this.friendListBtn.getChildByName("On").active) {
            return;
        }

        this.friendListBtn.getChildByName("On").active = true;
        this.friendListBtn.getChildByName("Off").active = false;

        this.inviteListBtn.getChildByName("On").active = false;
        this.inviteListBtn.getChildByName("Off").active = true;


        GameManager.friendRequstFriends(() => {
            this.contentNode.removeAllChildren();
            for (var i = 0; i < GameManager.buddies.length; i++) {
                const instance =  cc.instantiate(this.itemNode);
                instance.setPosition(0, 0);
                instance.active = true;
                cc.find('layout/name', instance).getComponent(cc.Label).string = GameManager.buddies[i].userName;
                cc.find('online', instance).active = GameManager.buddies[i].isOnline;
                cc.find('offline', instance).active = !GameManager.buddies[i].isOnline;
                cc.find('Avatar/Mask/avatarSprite', instance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[(GameManager.buddies[i].profileImage != "undefined") ? Number(GameManager.buddies[i].profileImage) - 1 : 1];
                cc.find('accept', instance).active = false;
                cc.find('reject', instance).active = false;
                cc.find('remove', instance).active = true;
                cc.find('remove', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddies[i].playerId;
                instance.__data = GameManager.buddies[i];
                instance.parent = this.contentNode;
            }
        }); 
    },

    onInviteList: function() {
        if (this.inviteListBtn.getChildByName("On").active) {
            return;
        }

        this.inviteListBtn.getChildByName("On").active = true;
        this.inviteListBtn.getChildByName("Off").active = false;

        this.friendListBtn.getChildByName("On").active = false;
        this.friendListBtn.getChildByName("Off").active = true;

        GameManager.friendRequestReceive(() => {
            this.contentNode.removeAllChildren();
            for (var i = 0; i < GameManager.buddyRequestsReceived.length; i++) {
                const instance =  cc.instantiate(this.itemNode);
                instance.setPosition(0, 0);
                instance.active = true;
                cc.find('layout/name', instance).getComponent(cc.Label).string = GameManager.buddyRequestsReceived[i].userNameSend;
                cc.find('online', instance).active = false;
                cc.find('offline', instance).active = false;
                cc.find('Avatar/Mask/avatarSprite', instance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[(GameManager.buddyRequestsReceived[i].profileImagePlayerSend != "undefined") ? Number(GameManager.buddyRequestsReceived[i].profileImagePlayerSend) - 1 : 1];
                cc.find('accept', instance).active = true;
                cc.find('reject', instance).active = true;
                cc.find('remove', instance).active = false;
                cc.find('accept', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddyRequestsReceived[i]._id;
                cc.find('reject', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddyRequestsReceived[i]._id;
                instance.__data = GameManager.buddyRequestsReceived[i];
                instance.parent = this.contentNode;
            }
        }); 
    },    

    onSendBuddyRequestReceive:function() {
        if (this.friendListBtn.getChildByName("On").active) {
            return;
        }
        this.contentNode.removeAllChildren();
        for (var i = 0; i < GameManager.buddyRequestsReceived.length; i++) {
            const instance =  cc.instantiate(this.itemNode);
            instance.setPosition(0, 0);
            instance.active = true;
            cc.find('layout/name', instance).getComponent(cc.Label).string = GameManager.buddyRequestsReceived[i].userNameSend;
            cc.find('online', instance).active = false;
            cc.find('offline', instance).active = false;
            cc.find('Avatar/Mask/avatarSprite', instance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[(GameManager.buddyRequestsReceived[i].profileImagePlayerSend != "undefined") ? Number(GameManager.buddyRequestsReceived[i].profileImagePlayerSend) - 1 : 1];
            cc.find('accept', instance).active = true;
            cc.find('reject', instance).active = true;
            cc.find('remove', instance).active = false;
            cc.find('accept', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddyRequestsReceived[i]._id;
            cc.find('reject', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddyRequestsReceived[i]._id;
            instance.__data = GameManager.buddyRequestsReceived[i];
            instance.parent = this.contentNode;
        }
    },

    onHandleBuddyRequestReceive:function() {
        if (this.inviteListBtn.getChildByName("On").active) {
            return;
        }
        this.contentNode.removeAllChildren();
        for (var i = 0; i < GameManager.buddies.length; i++) {
            const instance =  cc.instantiate(this.itemNode);
            instance.setPosition(0, 0);
            instance.active = true;
            cc.find('layout/name', instance).getComponent(cc.Label).string = GameManager.buddies[i].userName;
            cc.find('online', instance).active = GameManager.buddies[i].isOnline;
            cc.find('offline', instance).active = !GameManager.buddies[i].isOnline;
            cc.find('Avatar/Mask/avatarSprite', instance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[(GameManager.buddies[i].profileImage != "undefined") ? Number(GameManager.buddies[i].profileImage) : 1];
            cc.find('accept', instance).active = false;
            cc.find('reject', instance).active = false;
            cc.find('remove', instance).active = true;
            cc.find('remove', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddies[i].playerId;
            instance.__data = GameManager.buddies[i];
            instance.parent = this.contentNode;
        }
    },

    onRemoveBuddyReceive:function() {
        if (this.inviteListBtn.getChildByName("On").active) {
            return;
        }
        this.contentNode.removeAllChildren();
        for (var i = 0; i < GameManager.buddies.length; i++) {
            const instance =  cc.instantiate(this.itemNode);
            instance.setPosition(0, 0);
            instance.active = true;
            cc.find('layout/name', instance).getComponent(cc.Label).string = GameManager.buddies[i].userName;
            cc.find('online', instance).active = GameManager.buddies[i].isOnline;
            cc.find('offline', instance).active = !GameManager.buddies[i].isOnline;
            cc.find('Avatar/Mask/avatarSprite', instance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[(GameManager.buddies[i].profileImage != "undefined") ? Number(GameManager.buddies[i].profileImage) : 1];
            cc.find('accept', instance).active = false;
            cc.find('reject', instance).active = false;
            cc.find('remove', instance).active = true;
            cc.find('remove', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddies[i].playerId;
            instance.__data = GameManager.buddies[i];
            instance.parent = this.contentNode;
        }
    },

    onBuddyIsOnline:function() {
        if (this.inviteListBtn.getChildByName("On").active) {
            return;
        }
        this.contentNode.removeAllChildren();
        for (var i = 0; i < GameManager.buddies.length; i++) {
            const instance =  cc.instantiate(this.itemNode);
            instance.setPosition(0, 0);
            instance.active = true;
            cc.find('layout/name', instance).getComponent(cc.Label).string = GameManager.buddies[i].userName;
            cc.find('online', instance).active = GameManager.buddies[i].isOnline;
            cc.find('offline', instance).active = !GameManager.buddies[i].isOnline;
            cc.find('Avatar/Mask/avatarSprite', instance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[(GameManager.buddies[i].profileImage != "undefined") ? Number(GameManager.buddies[i].profileImage) : 1];
            cc.find('accept', instance).active = false;
            cc.find('reject', instance).active = false;
            cc.find('remove', instance).active = true;
            cc.find('remove', instance).getComponent(cc.Button).clickEvents[0].customEventData = GameManager.buddies[i].playerId;
            instance.__data = GameManager.buddies[i];
            instance.parent = this.contentNode;
        }
    },
});

