var chat = require('JohnyChat');

cc.Class({
    extends: cc.Component,

    properties: {
        pokerModel: {
            default: null,
            type: cc.Node,
        },
        pokerGame: null,
        chatGridParent: {
            default: null,
            type: cc.Node,
        },
        chatContent: {
            default: null,
            type: cc.Prefab
        },

        other : {
            default : null,
            type : cc.Node
        },

        loaded : false
    },


    onLoad() {

        if(this.loaded)
            return;

        this.loaded = true;    
        this.pokerGame = this.pokerModel.getComponent('PokerModel');
        this.registerBroadcast();
        // console.error("dealer chat verified");
        // this.isLoaded = true;

        // console.error("On load of dealer chat");
        if(!!this.other)
            this.other.getComponent('JohnyChat').onLoad();
    },

    onEnable: function () {
        if (this.chatGridParent.children.length == 0) {
            this.node.parent.children[2].active = true;
        }
        else {
            this.node.parent.children[2].active = false;
        }
    },

    start() {
        
    },

    onDestroy() {
        if (!this.pokerGame)
            this.pokerGame.off(K.PokerEvents.OnDealerChat, this.onChatFunc);
    },

    /**
     * @description
     * @method generateChat
     * @param {String} msg
     * @memberof Controllers.Gameplay.ChatPanel.DealerChatPanel#
     */
    generateChat: function (msg) {
        var obj = cc.instantiate(this.chatContent);
        obj.getComponent(cc.RichText).string = msg;
        this.chatGridParent.addChild(obj);
        // console.log(obj, obj.parent)
    },

    /**
     * @description
     * @method registerBroadcast
     * @memberof Controllers.Gameplay.ChatPanel.DealerChatPanel#
     */
    registerBroadcast: function () {
        if (!this.pokerGame)
            return;
        this.pokerGame.off(K.PokerEvents.OnDealerChat, this.onChat.bind(this));
        this.pokerGame.on(K.PokerEvents.OnDealerChat, this.onChat.bind(this));
    },

    /**
     * @description
     * @method onChat
     * @param {Object} response
     * @memberof Controllers.Gameplay.ChatPanel.DealerChatPanel#
     */
    onChat: function (response) {
        // console.error("DealerChat", response);
        let message = "<color=#000000>" + response.message + "</c>";
        this.showMessages(message);
    },


    /**
     * @description
     * @method showMessages
     * @param {String} chat
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    showMessages: function (chat) {
        this.unscheduleAllCallbacks();
        if (!this.pokerGame)
            return;
        // if (this.chatGridParent.childrenCount >= 30) {
        //     this.chatGridParent.children[0].getComponent(cc.RichText).string = chat;
        //     this.chatGridParent.children[0].setSiblingIndex(30);
        // } else {
            this.generateChat(chat);
            // this.scrollToBottom();
        // }
    },

    showTabHistory: function () {
        // this.pokerGame.getHandHistory(handHistoryId);
        this.pokerGame.showHandHistoryDetail();
    },
});