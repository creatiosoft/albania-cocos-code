// inherits Table.js
// 
// var JoinData = require('PostTypes').JoinChannel;
// var Table = require('Table');
// var TableContent = require('TableContent');
// // var Checkbox = require('Checkbox');
// var DropDownType = require('DropDown');
// var timerID = null;

/**
 * @class BuddiesTablePresenter
 * @classdesc handles buddies view
 * @extends Table
 * @memberof Screens.Lobby.Table
 */
var BuddiesTablePresenter = cc.Class({
    extends: cc.Component,

    properties: {
        findBtn: {
            default: null,
            type: cc.Button
        },
        contentHolder: {
            default: null,
            type: cc.Node,
        },
        buddiesItemContent: {
            default: null,
            type: cc.Node,
        },        
        tabBtnLbl: {
            default: [],
            type: cc.Label,
        },
        activeColor: {
            default: new cc.Color(),
            // type: cc.Color,
        },
        inactiveColor: {
            default: new cc.Color(),
            // type: cc.Color,
        },    
        inputName: {
            default: null,
            type: cc.EditBox,
        },        
        bottomInfo: {
            default: null,
            type: cc.Node,
        },        

        bottomInfoLbl: {
            default: null,
            type: cc.Label,
        },                        
        isBuddiesListTab: true,
        curTab: 0,
        currentTableData: [],        
    },

    /**
     * @method onEnable
     * @description Life Cycle callback, call super() method; 
     * @memberof Screens.Lobby.Table.BuddiesTablePresenter#
     */
    onEnable: function () {
        this.showBuddiesList();
    },

    onLoad() {
        window.BuddiesTablePresenter = this;        
        this.currentTableData = [];
        this.isBuddiesListTab = true;
        this.buddiesData  = [
            // {playerName : 'AAAAAAAAA', Rank: 'Bronze', isOnline: false, avatarURL : ''},
            // {playerName : 'BBBBBBBBB', Rank: 'Diamond', isOnline: true, avatarURL : ''},
            // {playerName : 'CCCCCCCCCCC', Rank: 'Bronze', isOnline: true, avatarURL : ''},
            // {playerName : 'DDDDDDDDD', Rank: 'Silver', isOnline: false, avatarURL : ''},
            // {playerName : 'EEEEEEEEE', Rank: 'Bronze', isOnline: true, avatarURL : ''},
            // {playerName : 'FFFFFFFFFF', Rank: 'Gold', isOnline: true, avatarURL : ''},
            // {playerName : 'GGGGGGGGGG', Rank: 'Bronze', isOnline: false, avatarURL : ''},
            // {playerName : 'HHHHHHH', Rank: 'Platinum', isOnline: true, avatarURL : ''},
            // {playerName : 'IIIIIIIIIII', Rank: 'Bronze', isOnline: false, avatarURL : ''},                 {playerName : 'AAAAAAAAA', Rank: 'Bronze', isOnline: false, avatarURL : ''},
            // {playerName : 'BBBBBBBBB', Rank: 'Diamond', isOnline: true, avatarURL : ''},
            // {playerName : 'CCCCCCCCCCC', Rank: 'Bronze', isOnline: true, avatarURL : ''},
            // {playerName : 'DDDDDDDDD', Rank: 'Silver', isOnline: false, avatarURL : ''},
            // {playerName : 'EEEEEEEEE', Rank: 'Bronze', isOnline: true, avatarURL : ''},
            // {playerName : 'FFFFFFFFFF', Rank: 'Gold', isOnline: true, avatarURL : ''},
            // {playerName : 'GGGGGGGGGG', Rank: 'Bronze', isOnline: false, avatarURL : ''},
            // {playerName : 'HHHHHHH', Rank: 'Platinum', isOnline: true, avatarURL : ''},
            // {playerName : 'IIIIIIIIIII', Rank: 'Bronze', isOnline: false, avatarURL : ''},                                                                                                
        ]
        this.invitesData = [];
        this.showBuddiesList();
    },

    setActiveButton: function (isBuddies) {
        console.log('setActiveButton ',isBuddies );
        this.tabBtnLbl[0].node.color = isBuddies ? this.activeColor : this.inactiveColor;
        this.tabBtnLbl[1].node.color = !isBuddies ? this.activeColor : this.inactiveColor;
    },

    showBuddiesList() {
        this.inputName.string = '';
        this.bottomInfo.active = false;        
        this.isBuddiesListTab = true;            
        this.getBuddiesListData();
        this.setActiveButton(true);
        this.removeTableContent();
        this.findBtn.node.active = false;
    },

    showInvitesList() {
        this.inputName.string = '';        
        this.bottomInfo.active = false;        
        this.isBuddiesListTab = false;        
        this.getInvitesListData();
        this.setActiveButton(false);
        this.removeTableContent();        
        this.findBtn.node.active = true;
    },

    getBuddiesListData() {
        let payload = {};

        payload.playerId = GameManager.user.playerId;
        console.log('getBuddiesListData ', payload);
        
        const requestCallback = (response) => {
            console.log("sendFriendRequest requestCallback reponse", response);
            this.createBuddiesList(response.friends || response.result);
        };

        ServerCom.pomeloRequest(K.BuddyAPI.getFriendList, payload, function(response){
            console.log("sendFriendRequest reponse", response);
            if(response.success) {
                requestCallback(response);
            }
        }, null, 5000, false);


        
    },

    getInvitesListData() {
        let payload = {};
        // const player = this.pokerPresenter.getMyPlayer();
        // const opponent = this.playerData;        

        payload.playerId = GameManager.user.playerId;
        console.log('getBuddiesListData ', payload);
        const requestCallback = (response) => {
            console.log("sendFriendRequest requestCallback reponse", response);
            this.createInvitesList(response.result);
        };         
        
        ServerCom.pomeloRequest(K.BuddyAPI.getFriendRequests, payload, function(response){
            console.log("sendFriendRequest reponse", response);
            if(response.success) {
                requestCallback(response);
            }
        }, null, 5000, false);
        
    },

    removeTableContent() {
        this.contentHolder.removeAllChildren();
    },

    createBuddiesList: function(data) {
        this.currentTableData = data || [];
        // this.isBuddiesListTab = true;
        if (data.length === 0) {
            LocalizedManager.setTextKey(this.bottomInfoLbl.node, 'TXT_NO_BUDDIES_AVAILABLE');
            this.bottomInfo.active = true;            
            return;
        }
        data.forEach((element, i) => {
            // content = this.makeContent(entry);
            // setTimeout( () => { 
            const instance =  cc.instantiate(this.buddiesItemContent);
            instance.setPosition(0, 0);
            instance.active = true;
            this.contentHolder.addChild(instance);
            const tableContent = instance.getComponent('BuddiesItemContent');
            element.index = i;
            tableContent.initInfo(element, this.isBuddiesListTab);
            // }, 0.1 * i);
        });
    },

    createInvitesList: function(data) {
        this.currentTableData = data || [];
        if (data.length === 0) {
            LocalizedManager.setTextKey(this.bottomInfoLbl.node, 'TXT_NO_FRIEND_INVITE_AVAILABLE');
            this.bottomInfo.active = true;            
            return;
        }
        data.forEach((element, i) => {
            // content = this.makeContent(entry);
            // setTimeout( () => { 
            const instance =  cc.instantiate(this.buddiesItemContent);
            instance.setPosition(0, 0);
            instance.active = true;
            this.contentHolder.addChild(instance);
            const tableContent = instance.getComponent('BuddiesItemContent');
            element.index = i;
            tableContent.initInfo(element, this.isBuddiesListTab);
            // }, 0.1 * i);
        });
    },
    createFriend: function(data) {
        if (data.length === 0) {
            LocalizedManager.setTextKey(this.bottomInfoLbl.node, 'TXT_USERNAME_NOT_EXIST');
            this.bottomInfo.active = true;            
            return;
        }
        this.bottomInfo.active = false;            
        data.forEach((element, i) => {
            // content = this.makeContent(entry);
            // setTimeout( () => { 
            const instance =  cc.instantiate(this.buddiesItemContent);
            instance.setPosition(0, 0);
            instance.active = true;
            this.contentHolder.addChild(instance);
            const tableContent = instance.getComponent('BuddiesItemContent');
            element.index = i;
            element.isAddFriend = true;
            tableContent.initInfo(element, this.isBuddiesListTab);
            // }, 0.1 * i);
        });
    },

    autoSearch() {
        if (!this.isBuddiesListTab) 
            return;
        if(this.inputName.string === '' && this.contentHolder.children.length > 0) {
            this.showAllContent();
            return;
        }
        if (this.inputName.string === GameManager.user.userName || this.inputName.string === null || this.inputName.string === '') {
            return;
        }
        if (this.isBuddiesListTab) {
            if(this.findLocalPlayer(this.inputName.string)){
                console.log('isBuddiesListTab: ',this.isBuddiesListTab ,'   FOUND');
            } else {
                console.log('isBuddiesListTab: ',this.isBuddiesListTab ,'  NOT FOUND');
            }
        } else {
            if(this.findLocalPlayer(this.inputName.string)){
                console.log('isBuddiesListTab: ',this.isBuddiesListTab ,'   FOUND');
            } else {
                console.log('isBuddiesListTab: ',this.isBuddiesListTab ,'  NOT FOUND');
                this.findRemotePlayer(this.inputName.string);
            }
        }
    },

    onClickFindBtn() {
        if(this.inputName.string === '' && this.contentHolder.children.length > 0) {
            this.showAllContent();
            return;
        }
        if (this.inputName.string === GameManager.user.userName || this.inputName.string === null || this.inputName.string === '') {
            return;
        }
        if (this.isBuddiesListTab) {
            if(this.findLocalPlayer(this.inputName.string)){
                console.log('isBuddiesListTab: ',this.isBuddiesListTab ,'   FOUND');
            } else {
                console.log('isBuddiesListTab: ',this.isBuddiesListTab ,'  NOT FOUND');
            }
        } else {
            if(this.findLocalPlayer(this.inputName.string)){
                console.log('isBuddiesListTab: ',this.isBuddiesListTab ,'   FOUND');
            } else {
                console.log('isBuddiesListTab: ',this.isBuddiesListTab ,'  NOT FOUND');
                this.findRemotePlayer(this.inputName.string);
            }
        }
    },

    showAllContent() {
        if (this.inputName.string == null || this.inputName.string == '' || this.inputName.string == undefined) {
            const child = this.contentHolder.children;
            child.forEach( e => {
                e.active = true;
            })
        }
    },

    findLocalPlayer(playerName) {
        const child = this.contentHolder.children;
        let isFound = false;
        child.forEach( e => {
            if(e.getComponent('BuddiesItemContent').getName().toLowerCase().indexOf(playerName.toLowerCase()) != -1) {
                isFound = true;
            }
            e.active = e.getComponent('BuddiesItemContent').getName().toLowerCase().indexOf(playerName.toLowerCase()) != -1;
        })

        return isFound;
    },

    findRemotePlayer(playerName) {
        let payload = {};
        // const player = this.pokerPresenter.getMyPlayer();
        // const opponent = this.playerData;        

        payload.userName = playerName;
        payload.playerId = GameManager.user.playerId;
        console.log('findPlayer ',payload);
        const requestCallback = (response) => {
            console.log("findRemotePlayer requestCallback reponse", response);
            this.createFriend(response.result);
        };                 
        ServerCom.pomeloRequest(K.BuddyAPI.searchPlayer, payload, function(response){
            // getFriendRequests
            // console.log("sendFriendRequest reponse", response);
            if(response.success) {
                requestCallback(response);
            }
        }, null, 5000, false);
    }


});