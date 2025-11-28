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
            type: cc.Node
        },

        other : {
            default : null,
            type : cc.Node
        },

        loaded : false
    },


    onLoad() {
        // this.pokerGame = this.pokerModel.getComponent('PokerModel');
        // this.registerBroadcast();
        // console.error("Johny chat verified")
        // this.isLoaded = true;
        if(this.loaded)
            return;

        this.loaded = true;
        this.pokerGame = this.pokerModel.getComponent('PokerModel');
        this.registerBroadcast();

        // console.error("On load of johny");
        if(!!this.other)
            this.other.getComponent('DealerChatPanel').onLoad();
    },

    start() {
        
    },

    onEnable: function () {
        // if (K.PORTRAIT) {
        //     if (this.chatGridParent.children.length == 0) {
        //         this.node.parent.children[2].active = true;
        //     }
        //     else {
        //         this.node.parent.children[2].active = false;
        //     }

        //     this.scheduleOnce(function () {
        //         this.scrollToBottom();
        //     }, 0.01);
        // }
    },

    onDestroy() {
        if (!this.pokerGame)
        return;
            this.pokerGame.off(K.PokerEvents.OnDealerChat, this.onChat.bind(this));
    },

    scrollToBottom: function () {
        var chatScroll = this.chatGridParent.parent.parent;
        var scrollView = chatScroll.getComponent(cc.ScrollView);
        scrollView.scrollToBottom(0.5);
    },

    /**
     * @description
     * @method generateChat
     * @param {String} msg
     * @memberof Controllers.Gameplay.ChatPanel.DealerChatPanel#
     */
    generateChat: function (msg) {
        var obj = cc.instantiate(this.chatContent);
        obj.active = true
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
        // console.error("JohnyChat", response);
        let message = "<color=#ffffff>" + response.message + "</c>";
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
        if (this.chatGridParent.childrenCount >= 30) {
            this.chatGridParent.children[0].getComponent(cc.RichText).string = chat;
            this.chatGridParent.children[0].setSiblingIndex(30);
        } else {
            this.generateChat(chat);
            // this.scrollToBottom();
        }
    },

    onMinimise: function () {
        this.node.active = false;
        // console.log(this.pokerGame,"pG",this.pokerGame.gameData)
        if (!this.pokerGame.gameData.settings.muteGameSound) {
            // console.log("working")
            GameManager.playSound(K.Sounds.click);

            // GameManager.playSound(K.Sounds.click);
            // this.pokerGame.getHandHistory(handHistoryId);
          }  // this.pokerGame.showHandHistoryDetail();
        },
    });