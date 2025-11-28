// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var table = require('NewTable');
var FreeRoll = require('PostTypes').FreeRoll;

cc.Class({
    extends: cc.Component,

    properties: {

        textFields:{
            default: [],
            type: cc.Label
        },

        joinButton:{
            default: null,
            type: cc.Button
        },

        activeSprite : {
            default : null,
            type: cc.SpriteFrame
        },

        inactiveSprite : {
            default : null,
            type: cc.SpriteFrame
        },

        tableBg : {
            default: null,
            type: cc.Node
        },

        joinedBg :{ 
            default : null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, function() { console.log('touched', this.node.zIndex);
            // this.selection.active =  true;
            let current = this.getCurrentSelection();
            // console.log('current Selection', this == current);
            if(current == this) { 
                // console.log('inside', this.dblClick)
                if(this.dblClick){
                    this.onClickJoin();
                }
            }else{
                this.dblClick = true;
                this.timeout = setTimeout(() => {
                    this.dblClick = false;
                }, 200);
            }
            !this.onSelection || this.onSelection(this);
        }.bind(this));
    },


    init: function(data) {
        // console.log("free roll data", data.currentSelection);
        this.dblClick = false;
        this.getCurrentSelection = data.getCurrentSelection;
        this.onSelection =  data.onSelection;
        this.freeRoll = new FreeRoll(data);
        console.log("free roll data", this.freeRoll);
    },


    changeBgColor : function(color) {
        this.tableBg.color = color;
    },

    changeTextsColor : function(color) {
        this.textFields.forEach((e) => {
            e.node.color = color;
        });
    },


    changeSelection : function(bgColor, textsColor) {
        this.changeBgColor(bgColor);
        this.changeTextsColor(textsColor);
    },


    onClickJoin: function() {
        this.dblClick = false;
        console.log("on click join", this.freeRoll);
        let argument = {};
        argument.onSelectVariation = this.onJoin.bind(this);
        PopupManager.show(PopupManager.PopupType.GameVariation, argument);
    },


    onJoin : function(variation) {
        var payload = {
            raceId : this.freeRoll.raceId,
            configId: this.freeRoll.configId,
            channelVariation: variation,
            isRequested: this.freeRoll.isRequested,
            channelType: 'NORMAL'
        };
        // this.channelVariation = variation;
      
        ServerCom.pomeloRequest(K.PomeloAPI.getChannelId, payload, function(response) {
            console.log('get channel response', response);
            if(response.success) {
                payload.channelId = response.toJoinTableId;
                payload.playerId = GameManager.user.playerId;
                payload.playerName = GameManager.user.userName;
                payload.tableId = payload.configId;

                console.log("pl", payload);
                ServerCom.pomeloRequest(K.PomeloAPI.joinFreeRoll, payload, function(response){
                    console.log("join channel reponse", response);
                    if(response.success) {

                    }
                });
            }
        });
    },


    onStatusChange : function(state) {
        
    },

    // update (dt) {},
});
