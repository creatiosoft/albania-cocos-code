// attached to table row prefab
// var JoinData = require('PostTypes').JoinChannel;
// var PopupManagerType = require('PopUpManager').PopUpManager;
// var PopUpType = require('PopUpManager').PopUpType;

/**
 * @class TableContent
 * @classdesc This class is used in content node to manage view and maintain the selection / update records. 
 * @memberof Screens.Lobby.Table
 */
var BuddiesItemContent = cc.Class({
    extends: cc.Component,

    properties: {
        bg_1: {
            default: null,
            type: cc.Node,
        },
        bg_2: {
            default: null,
            type: cc.Node,
        },
        playerNameLbl: {
            default: null,
            type: cc.Label
        },
        statusLbl: {
            default: null,
            type: cc.Label
        },
        onlineStat: {
            default: null,
            type: cc.Node
        },
        offlineStat: {
            default: null,
            type: cc.Node
        },
        buddiesStatus: {
            default: null,
            type: cc.Node
        },
        inviteStatus: {
            default: null,
            type: cc.Node
        },
        addFriendStatus: {
            default: null,
            type: cc.Node
        },
        avatarImage: {
            default: null,
            type: cc.Sprite
        },
        addFriendBtn: {
            default: null,
            type: cc.Button
        },        
        playerName : '',
    },
    

    // statics: {
    //     prevSelection: null,
    //     callback: null,
    //     registered: false,
    // },

    /**
     * @method onLoad 
     * @description Use this for initialization
     * @memberof Screens.Lobby.Table.TableContent#
     */
    onLoad: function () {
        var inst = this;
        this.friendId = '';
        
    },

    loadAvatar(avatarUrl) {
        const t = this;
        let urlImg;
        console.log('Load Avatar 1111 , ',avatarUrl)
        if (isNaN(avatarUrl) && isNaN(parseInt(avatarUrl)) && avatarUrl != "") {
            cc.loader.load(avatarUrl + "?w=125&h=125", function (err, tex) {
                if (!!err) {
                    urlImg = GameManager.avatarImages[1];
                } else {
                    urlImg = new cc.SpriteFrame(tex);
                }
                console.log('Load Avatar 22222222 , ',urlImg)
                t.avatarImage.spriteFrame = urlImg;
            });
    
        } else {
            if (avatarUrl == "") {
                avatarUrl = 1;
            }
            urlImg = GameManager.avatarImages[avatarUrl];
                console.log('Load Avatar 3333333333 , ',urlImg)
            t.avatarImage.spriteFrame = urlImg;
        }
    },
    
    initInfo(data, isBuddies) {
        this.bg_1.active = data.index % 2 == 0;
        this.bg_2.active = data.index % 2 != 0;        
        this.playerNameLbl.string = this.playerName = data.userName;
        this.statusLbl.string = data.megaPointLevel;
        this.statusLbl.node.active = isBuddies;
        this.onlineStat.active = isBuddies && data.isOnline;
        this.offlineStat.active = isBuddies && !data.isOnline;
        this.buddiesStatus.active = isBuddies;
        this.inviteStatus.active = !isBuddies && !data.isAddFriend;
        this.addFriendStatus.active = !isBuddies && data.isAddFriend;
        this.loadAvatar(data.profileImage)
        this.friendId = data.playerId;
        // this.node.active = true;


        
    },

    onClickRemoveBtn() {
        this.removeFriend();
    },

    onClickAcceptBtn() {
        this.acceptFriendRequest();
    },

    onClickRejectBtn() {
        this.rejectFriendRequest();
    },

    onClickAddFriendBtn() {
        this.addFriendRequest();
    },

    acceptFriendRequest() {
        let payload = {};
        payload.playerId = GameManager.user.playerId;
        payload.friendId = this.friendId;
        const requestCallback = (response) => {
            this.node.parent = null;
            this.node.destroy();
        };         
        
        ServerCom.pomeloRequest(K.BuddyAPI.acceptFriendRequest, payload, function(response){
            console.log("acceptFriendRequest reponse", response);
            if(response.success) {
                requestCallback(response);
            }
        }, null, 5000, false);
        
    },

    getName() {
        return this.playerName;
    },

    rejectFriendRequest() {
        let payload = {};
        payload.playerId = GameManager.user.playerId;
        payload.friendId = this.friendId;
        const requestCallback = (response) => {
            this.node.parent = null;
            this.node.destroy();
        };         
        
        ServerCom.pomeloRequest(K.BuddyAPI.rejectFriendRequest, payload, function(response){
            console.log("rejectFriendRequest reponse", response);
            if(response.success) {
                requestCallback(response);
            }
        }, null, 5000, false);
        
    },

    addFriendRequest() {
        let payload = {};
        payload.playerId = GameManager.user.playerId;
        payload.friendId = this.friendId;
        const requestCallback = (response) => {
            // this.node.parent = null;
            // this.node.destroy();
            // BuddiesTablePresenter.showInvitesList();
            this.addFriendBtn.interactable = false;
            const label = this.addFriendBtn.node.children[0];
            LocalizedManager.setTextKey(label, 'TXT_SENT');

        };         
        
        ServerCom.pomeloRequest(K.BuddyAPI.sendFriendRequest, payload, function(response){
            console.log("addFriendRequest reponse", response);
            if(response.success) {
                requestCallback(response);
            }
        }, null, 5000, false);
        
    },

    removeFriend() {
        let payload = {};
        payload.playerId = GameManager.user.playerId;
        payload.friendId = this.friendId;
        const requestCallback = (response) => {
            this.node.parent = null;
            this.node.destroy();
        };         
        
        ServerCom.pomeloRequest(K.BuddyAPI.removeFriend, payload, function(response){
            console.log("removeFriend reponse", response);
            if(response.success) {
                requestCallback(response);
            }
        }, null, 5000, false);
        
    },
});