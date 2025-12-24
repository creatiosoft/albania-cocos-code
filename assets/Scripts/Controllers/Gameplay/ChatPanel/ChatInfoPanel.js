/** 
 * @namespace Controllers.Gameplay.ChatPanel
 */
var ChatPanel = require('ChatPanel');
var ChatData = require('PostTypes').ChatData;
var emojiNames = [];

/**
 * @class ChatInfoPanel
 * @classdesc 
 * @memberof Controllers.Gameplay.ChatPanel
 */
cc.Class({
    extends: cc.Component,

    properties: {
        empty: {
            default: null,
            type: cc.Node,
        },
        chatLbl: {
            default: null,
            type: cc.EditBox,
        },
        chatPrefab: {
            default: null,
            type: cc.Prefab,
        },
        chatGridParent: {
            default: null,
            type: cc.Node,
        },
        chat: [],
        richTexts: {
            default: [],
            type: cc.RichText,
        },

        emoticonBox: {
            default: null,
            type: cc.Node,
        },
        emoticons: {
            default: [],
            type: cc.SpriteFrame,
        },
        emoticonPrefab: {
            default: null,
            type: cc.Node,
        },
        emotParent: {
            default: null,
            type: cc.Node,
        },
        pokerModel: {
            default: null,
            type: cc.Node,
        },
        pokerGame: null,
        otherPopup: {
            default: null,
            type: cc.Node,
        },
        emotiBtns: {
            default: null,
            type: cc.Node,
        },
        chatContent: {
            default: null,
            type: cc.Prefab
        },
        chatMeContent: {
            default: null,
            type: cc.Prefab
        },
        chatPopUp: null,
        onChatFunc: null,
        isLoaded: false,
        editBoxData: "",

        loaded: false,

        playerNameColor: new cc.Color(0, 0, 0, 255),
        textColor: new cc.Color(0, 0, 0, 255)
    },



    /**
 * @description This is used for initialisation
 * @method onLoad
 * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
 */
    onLoad: function () {
        if (this.loaded)
            return;

        this.loaded = true;

        this.___height = this.node.height;

        if (!!this.otherPopup) {
            this.otherPopup.getComponent('ChatInfoPanel').onLoad();
        }

        this.onChatFunc = this.onChat.bind(this);
        this.pokerGame = this.pokerModel.getComponent('PokerModel');
        this.generateEmoticons();
        this.registerBroadcast();
        this.isLoaded = true;

        this.empty.active = true;

        if (this.pokerGame.chat) {
            this.generateChat(this.pokerGame.chat);
            this.scrollToBottom();
        }
    },

    /**
     * @description
     * @method onEnable
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    onEnable: function () {
        this.scheduleOnce(function () {
            // this.chatLbl.setFocus(); // if it is removed then font size of editbox becomes very small
            this.chatLbl.string = this.editBoxData;
        }, 0.2);

        if (K.PORTRAIT) {
            if (this.chatGridParent.children.length == 0) {
                this.empty.active = true;
            }
            else {
                this.empty.active = false;
            }
        }
    },


    /**
     * @description
     * @method enableotherPopup
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    enableotherPopup: function () {
        if (!this.otherPopup.getComponent('ChatInfoPanel').isLoaded) {
            var chats = [];
            this.chatGridParent.children.forEach(function (element) {
                chats.push(element.getComponent(cc.RichText).string);
            }, this);
            this.otherPopup.getComponent('ChatInfoPanel').showBackUp(chats);
        }

        this.otherPopup.active = true;
        this.node.active = false;
    },


    /**
     * @description
     * @method showBackUp
     * @param {Array} chats
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    showBackUp: function (chats) {
        chats.forEach(function (element) {
            this.generateChat(element);
        }, this);
        this.scrollToBottom();
    },


    /**
     * @description
     * @method close
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    close: function () {
        this.onEditEnd();
        this.node.active = false;
    },

    /**
     * @description
     * @method showChatPopUp
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    showChatPopUp: function () {
        this.node.active = true;
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
            this.scrollToBottom();
        // }
    },//-151.3


    /**
     * @description
     * @method generateChat
     * @param {String} msg
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    generateChat: function (msg) {
        this.empty.active = false;
        if (K.PORTRAIT) {
            var obj = null;
            if (msg.split("|")[3] == GameManager.user.playerId) {
                obj = cc.instantiate(this.chatMeContent);
            }
            else {
                obj = cc.instantiate(this.chatContent);
            }
            if (!obj.children[1].children[1].getComponent(cc.RichText)) {
                return;
            }
            obj.children[1].children[1].getComponent(cc.RichText).string = msg.split("|")[1];
            obj.children[1].children[0].children[0].getComponent(cc.Label).string = msg.split("|")[0];
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes();
            obj.children[1].children[0].children[1].getComponent(cc.Label).string = time;
            this.chatGridParent.addChild(obj);

            if (!msg.split("|")[2]) {
                var randomIndex = Math.round(Math.random() * GameManager.avatarImages.length - 1);
                obj.children[0].children[1].children[0].getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[randomIndex];
            }
            else {
                obj.children[0].children[1].children[0].getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[parseInt(msg.split("|")[2])];
            }

            // this.scheduleOnce(function () {
            //     obj.children[1].width = obj.children[1].children[0].children[0].width;
            // }, 0.2);
        }
        else {
            var obj = cc.instantiate(this.chatContent);
            obj.getComponent(cc.RichText).string = msg;
            this.chatGridParent.addChild(obj);
        }
    },

    /**
     * @description
     * @method scrollToBottom
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    scrollToBottom: function () {
        var chatScroll = this.chatGridParent.parent.parent;
        var scrollView = chatScroll.getComponent(cc.ScrollView);
        scrollView.scrollToBottom(0.5);
    },

    /**
     * @description
     * @method onSubmit
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    onSubmit: function () {
        this.onEditEnd();
        // console.log(this.pokerGame,"pg,",this.pokerModel,"PM")
        if (!this.pokerGame.gameData.settings.muteGameSound) {
            GameManager.playSound(K.Sounds.click);
        }

        // this.playAudio(K.Sounds.click);
        this.emoticonBox.active = false;
        var tempData = this.chatLbl.string.trim();
        if (!this.pokerGame.gameData.settings.playerChat || this.pokerGame.isPlayerStandUp()) {
            this.chatLbl.string = "";
            this.chatLbl.string = this.chatLbl.string.trim();
            return;
        }

        if (tempData != "") {

            var chatString = tempData;
            var rightEmoji = chatString.split(">");
            if (rightEmoji.length > 0) {
                rightEmoji.forEach(function (element) {
                    if (!!element) {
                        var leftEmoji = element.split("<");
                        if (leftEmoji[1]) {
                            chatString = chatString.replace("<" + leftEmoji[1] + ">", "<img src = '" + leftEmoji[1] + "'/>");
                        }
                    }
                }, this);
            }

            {
                var data = new ChatData(GameManager.user.playerId, GameManager.user.userName, this.pokerGame.gameData.channelId, chatString);
                ServerCom.pomeloRequest(K.PomeloAPI.chatRequest, data, function (response) {
                    if (response.success) {
                            // if (GameScreen.isMobile)// 
                        //     this.enableotherPopup();
                    }
                }.bind(this), null, 5000, false);
                }

            // ServerCom.socketIORequest(K.SocketIOAPI.Game.TournamentChat, data, function (response) {
            //     if (response.success) {
            //         // if (GameScreen.isMobile)// 
            //         //     this.enableotherPopup();
            //     }
            // }.bind(this), null, 5000, false);


            this.chatLbl.string = "";
            this.chatLbl.string = this.chatLbl.string.trim();
            if (!GameScreen.isMobile)
                this.chatLbl.setFocus();
        }
        this.editBoxData = "";


        this.pokerGame.presenter.onClose();
    },

    /**
     * @description
     * @method registerBroadcast
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    registerBroadcast: function () {

        if (!this.pokerGame) {
            this.pokerGame = this.pokerModel.getComponent('PokerModel');
        }
        // console.error("broad cast register", this.pokerModel.name, this.pokerGame.name);
        this.pokerGame.off(K.PokerEvents.OnChat, this.onChat.bind(this));
        this.pokerGame.on(K.PokerEvents.OnChat, this.onChat.bind(this));
        // this.pokerGame.off(K.PokerEvents.OnDealerChat, this.onChatFunc);
        // this.pokerGame.on(K.PokerEvents.OnDealerChat, this.onChatFunc);
    },

    getPlayerName(playerId) {
        for (var i = 0; i < this.pokerGame.gameData.tableDetails.players.length; i++) {
            if (this.pokerGame.gameData.tableDetails.players[i].playerId == playerId) {
                return this.pokerGame.gameData.tableDetails.players[i].playerName;
            }
        }
        return "N/A";
    },

    getPlayerAvatar(playerId) {
        for (var i = 0; i < this.pokerGame.gameData.tableDetails.players.length; i++) {
            if (this.pokerGame.gameData.tableDetails.players[i].playerId == playerId) {
                return this.pokerGame.gameData.tableDetails.players[i].imageAvtar;
            }
        }
        return null;
    },

    /**
     * @description
     * @method onChat
     * @param {Object} response
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    onChat: function (response) {
        // console.error("chat info panel", this.node.name, this.node.parent.name, response, this.playerNameColor.toHEX("#rrggbb"), this.textColor.toHEX("#rrggbb"));
        let message = "<color=#" + this.playerNameColor.toHEX("#rrggbb") + ">" + this.getPlayerName(response.playerId) + ": " + "</c>" + "<color=#" + this.textColor.toHEX("#rrggbb") + ">" + response.message + "</c>";
        if (K.PORTRAIT) {
            message = this.getPlayerName(response.playerId) + "|" + response.message + "|" + (Number(response.profileImage) - 1) + "|" + response.playerId;
        }
        this.showMessages(message);
    },

    /**
     * @description
     * @method onShowEmoticons
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    onShowEmoticons: function () {
        if (!!this.emoticonBox) {
            this.emoticonBox.active = !this.emoticonBox.active;
        }
    },

    recordMessage: function () {
        this.editBoxData = this.chatLbl.string;
    },
    /**
     * @description
     * @method disableEmoticons
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    disableEmoticons: function () {
        this.emoticonBox.active = false;
        this.emotiBtns.active = false;
    },

    /**
     * @description
     * @method enableEmoticons
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    enableEmoticons: function () {
        this.emotiBtns.active = true;
    },

    /**
     * @description
     * @method onEmoticonClicked
     * @param {Object} btnEvent
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    onEmoticonClicked: function (btnEvent) {
        if (!GameScreen.isMobile)
            this.chatLbl.setFocus();
        var emot = btnEvent.target.getComponent(cc.Sprite).spriteFrame.name;
        // this.chatLbl.string += "<img src = '" + emot + "'/>";
        let t = this.chatLbl.string;
        if ((t += "<" + emot + ">").length > 140) {
            return;
        }

        this.chatLbl.string += "<" + emot + ">";
        // this.chatLbl.string += "iughihiuuiobh";
        this.recordMessage();

    },

    /**
     * @description
     * @method generateEmoticons
     * @memberof Controllers.Gameplay.ChatPanel.ChatInfoPanel#
     */
    generateEmoticons: function () {
        if (!!this.emotParent) {
            GameManager.removeAllChildren(this.emotParent);
        }
        var obj = null;
        for (var i = 0; i < this.emoticons.length; i++) {
            obj = cc.instantiate(this.emoticonPrefab);
            obj.active = true;
            obj.getComponent(cc.Sprite).spriteFrame = this.emoticons[i];
            this.emotParent.addChild(obj);
        }
    },

    onEditBegan:function () {
        // console.log("onEditBegan");
        // this.node.height = this.___height * 6 / 10;
    },

    onEditEnd:function () {
        // console.log("onEditEnd");
        // this.node.height = this.___height;
    },
});
