var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var CheckBoxType = require('Checkbox');
var GameData = require('ResponseTypes').GameData;
var JoinSimilar = require('PostTypes').JoinSimilar;
var Toggle = require('Toggle');
var gameScreen = require('GameScreen');
var pokerModel = require('PokerModel').PokerModel;


/**
 * @classdesc 
 * @class InGamePreferencesPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        content1: {
            default: null,
            type: cc.Node
        },
        content2: {
            default: null,
            type: cc.Node
        },

        top1: {
            default: null,
            type: cc.Node
        },
        top2: {
            default: null,
            type: cc.Node
        },

        content1Tab: {
            default: null,
            type: cc.Node
        },
        content2Tab: {
            default: null,
            type: cc.Node
        },
        popUpManager: {
            default: null,
            type: PopUpManager
        },
        tableTheme: {
            default: null,
            type: cc.Node,
        },
        tileViewSelection: {
            default: null,
            type: cc.Toggle,
        },
        unTileViewSelection: {
            default: null,
            type: cc.Toggle,
        },
        dealerChat: {
            default: null,
            type: Toggle,
        },
        Chat: {
            default: null,
            type: Toggle,
        },
        soundToggle: {
            default: null,
            type: Toggle,
        },
        joinSimilarBtn: {
            default: null,
            type: cc.Button,
        },
        tableColor: {
            default: null,
            type: cc.Node,
        },
        tableLayout: {
            default: null,
            type: cc.Node,
        },
        muckHandToggle: {
            default: null,
            type: cc.Toggle,
        },
        showFoldHandToggle: {
            default: null,
            type: Toggle,
        },
        coloredCardToggle: {
            default: null,
            type: Toggle,
        },
        activeModel: null,
        pokerVersionString: {
            default: null,
            type: cc.RichText,
        },
        gameVersionString: {
            default: null,
            type: cc.RichText,
        },
        playerImg: {
            default: null,
            type: cc.Sprite
        },

        model : {
            default : null,
            type : pokerModel,
        },

        handSToggle: {
            default: null,
            type: Toggle,
        },

        BBToggle: {
            default: null,
            type: Toggle,
        },
    },

    onContent1: function() {
        this.content1.active = true;
        this.content2.active = false;


        this.content1Tab.children[0].active = true;
        this.content1Tab.children[1].color = cc.Color.WHITE;
        this.content2Tab.children[0].active = false;
        this.content2Tab.children[1].color = cc.Color.BLACK;
    },

    onContent2: function() {
        this.content1.active = false;
        this.content2.active = true;

        this.content2Tab.children[0].active = true;
        this.content2Tab.children[1].color = cc.Color.WHITE;
        this.content1Tab.children[0].active = false;
        this.content1Tab.children[1].color = cc.Color.BLACK;
    },

    /**
     * @description For initialization.
     * @method onLoad
     * @memberof Popups.InGamePreferencesPopup#
     */
    onLoad: function () {

        // console.error("*************************Game Screen",gameScreen.viewType)

        // this.viewType = gameScreen.viewType;

        //this.tableLayout.active = !GameScreen.isMobile;
        // console.log("VIew Type Is...",this.viewType)
        // console.log("GameScreen ViewType...",GameScreen.viewType)
        // this.tileViewSelection.isChecked = true;
        // this.unTileViewSelection.isChecked = true;
        // if (!GameScreen.isMobile && !GameScreen.isWindows) {
            
        //     if(GameScreen.viewType === 1){
        //         this.tileViewSelection.isChecked = true;
        //         this.unTileViewSelection.isChecked = false;
        //     }else if (GameScreen.viewType === 2){
        //         this.unTileViewSelection.isChecked = true;
        //         this.tileViewSelection.isChecked = false;
        //     }
           
        // }
        // this.tileViewSelection.isChecked = false;
        // this.unTileViewSelection.isChecked = false;
        
    },

    /**
     * @description Manage default states of buttons in popup.
     * @method onShow
     * @param {Object} data
     * @memberof Popups.InGamePreferencesPopup#
     */
    onShow: function (data) {
        //  console.error('ONSHOW', data);
        this.activeModel = data;
        // console.log("pokermodel...",this.model);
        // var isJoinSimilarAllowed = this.activeModel.isPlayerStandUp() ? (this.activeModel.roomConfig.maxPlayers == this.activeModel.gameData.tableDetails.players.length) : true;

        // this.playerImg.spriteFrame = GameManager.user.urlImg;
        // console.log(GameManager.user.profileImage,GameManager.user.urlImg);
        // this.gameVersionString.string = "<color=#ffffff>Build Version:  " + K.ServerAddress.clientVer + "</color>";
        // this.pokerVersionString.string = "<color=#ffffff>Poker Version:  " + K.ServerAddress.pokerVer + "</color>";


        // if (GameManager.isP) {
        //     this.gameVersionString.string = "<color=#00ff00>Build Version:   " + K.ServerAddress.clientVer + "</color>"; //</c><color=#0fffff>
        //     this.pokerVersionString.string = "<color=#00ff00>PLA-IEW POKER Version: " + K.ServerAddress.pokerVer + "</color>";
        // } else if (GameManager.isSD) {
        //     this.gameVersionString.string = "<color=#00ff00>" + LocalizedManager.t('TXT_BUILD_VERSION') + ":   " + K.ServerAddress.clientVer + "</color>"; //</c><color=#0fffff>
        //     this.pokerVersionString.string = "<color=#00ff00>POKER " + LocalizedManager.t('TXT_VERSION') + ":      " + K.ServerAddress.pokerVer + "</color>";            
        // }

        // this.joinSimilarBtn.interactable = !(this.activeModel.gameData.channelType == K.ChannelType.Tournament) && isJoinSimilarAllowed; //johnny
        // this.tableColor.active = !(this.activeModel.roomConfig.channelVariation == "Open Face Chinese Poker");//johnny
        // if (this.dealerChat.state !== GameManager.user.dealerChat) {
        //     this.dealerChat.onToggle();
        // }
        // if (GameManager.user.playerChat !== this.Chat.state) {
        //     this.Chat.onToggle();
        // }
        if (this.activeModel.gameData.settings.muteGameSound == this.soundToggle.state) {
            this.soundToggle.onToggle();
        }
        // if (this.activeModel.gameData.settings.isMuckHand !== this.muckHandToggle.state) {
        //     this.muckHandToggle.onToggle();
        // }
        if (this.activeModel.gameData.settings.isShowCard !== this.showFoldHandToggle.state) {
            this.showFoldHandToggle.onToggle();
        }

        // console.log(this.activeModel.gameData.settings.cardColor, this.coloredCardToggle.state)
        // if (this.activeModel.gameData.settings.cardColor !== this.coloredCardToggle.state) {
        //     this.coloredCardToggle.onToggle();
        // }


        if (GameManager.user.settings.stackInBB !== this.BBToggle.state) {
            this.BBToggle.onToggle();
        }

        // if (GameManager.user.settings.handStrength !== this.handSToggle.state) {
        //     this.handSToggle.onToggle();
        // }
       
            
        //     if(this.viewType == 1){
        //         this.tileViewSelection.isChecked = true;
        //         this.unTileViewSelection.isChecked = false;
        //     }else /*if (GameScreen.viewType == 2)*/{
        //         this.unTileViewSelection.isChecked = true;
        //         this.tileViewSelection.isChecked = false;
        //     }
           
        
        // console.log("########View Type",gameScreen.viewType)


        // this.onContent1();

        // this.top1.active = true;
        // this.top2.active = false;

        GameManager.emit("disablePageView");

    },



    toggleSwitch: function(){

        var activeTables = this.node.parent.parent.parent.parent.children.length;
        // console.log("VIew Type Is...",this.viewType)
       
    },

    /**
     * @description join another table of similar configuration
     * @method onJoinSimilar
     * @memberof Popups.InGamePreferencesPopup#
     */
    onJoinSimilar: function () {
        if (!this.activeModel.gameData.settings.muteGameSound) {
            GameManager.playSound(K.Sounds.click);
        }
        if (GameManager.activeTableCount >= GameManager.maxTableCounts) {
            GameManager.popUpManager.show(PopUpType.MaxTablesJoinedPopup, null, function () {});
            return;
        }
        var data = new JoinSimilar(this.activeModel.roomConfig.isRealMoney, this.activeModel.roomConfig.channelVariation,
            this.activeModel.roomConfig.smallBlind, this.activeModel.roomConfig.bigBlind, this.activeModel.roomConfig.maxPlayers,
            this.activeModel.roomConfig.turnTime, GameManager.user.playerId);
        data.channelId = this.activeModel.gameData.channelId;
        ServerCom.pomeloRequest(K.PomeloAPI.joinSimilar, data, function (response) {
            var data = response;
            if (response.success) {
                var channel = {};
                channel.channelId = data.similarChannelId || "";
                channel.channelType = "NORMAL";
                channel.tableId = "";
                channel.isRequested = true;
                var route = K.PomeloAPI.joinChannel;
                if (this.activeModel.roomConfig.channelVariation == "Open Face Chinese Poker") {
                    route = require("OFCConfigs").PomeloAPI.joinChannel;
                }
                GameManager.join(channel.channelId, route, channel);
            }
        }.bind(this), function (error) {});
        // GameManager.playSound(K.Sounds.click);

    },

    // /**
    //  * Leave current table
    //  */
    // onLeave: function () {
    //     this.popUpManager.hide(PopUpType.GamePreferencesPopup, function () { });
    //     this.gameScreen.leaveCurrent();
    // },

    // /**
    //  * StandUp from table.
    //  */
    // onStandup: function () {
    //     this.gameScreen.standUp();
    //     this.popUpManager.hide(PopUpType.GamePreferencesPopup, function () { });
    // },

    // /**
    //  * Show seat preference popup passing the number of max players in table.
    //  */
    // onSelectSeatPreferences: function () {
    //     this.popUpManager.show(PopUpType.SeatPreferenceDialog, this.gameScreen.gameModel.activePokerModels[this.gameScreen.prevSelection].roomConfig.maxPlayers, function () { });
    // },

    // /**
    //  * Play tutorial
    //  */
    // onTutorialPlay: function () {
    // },
    /**
     * @description Change Avatar
     * @method onChooseAvatarSound
     * @memberof Popups.GamePreferencesPopup#
     */
    onChooseAvatarSound: function () {
        this.onSettingsClose();
        GameManager.popUpManager.show(PopUpType.AvatarDialog, this.activeModel.gameData.settings.muteGameSound, function () {});
        // GameManager.playSound(K.Sounds.click);

    },
    /**
     * @description Toggle Sound and update player settings.
     * @method onToggleSound
     * @memberof Popups.InGamePreferencesPopup#
     */
    onToggleSound: function () {

        var data = {};
        data.channelId = this.activeModel.gameData.channelId;
        data.playerId = GameManager.user.playerId;
        data.key = 'muteGameSound';
        if (!this.activeModel.gameData.settings.muteGameSound) {
            GameManager.playSound(K.Sounds.click);
        }
        this.activeModel.gameData.settings.muteGameSound = !this.activeModel.gameData.settings.muteGameSound;
        // console.log("val changed from", this.activeModel.gameData.settings.muteGameSound, "to", !this.activeModel.gameData.settings.muteGameSound);
        data.value = this.activeModel.gameData.settings.muteGameSound;
        // if (this.activeModel.gameData.settings.muteGameSound) {
        //     cc.audioEngine.stopAll();
        // }
        // GameManager.playMusic(!this.activeModel.gameData.settings.muteGameSound);
        ServerCom.pomeloRequest(K.PomeloAPI.updateTableSettings, data, function (data) {
            if (data.success) {} else {}
        }.bind(this), null, 5000, false);
        // GameManager.playSound(K.Sounds.click);

    },



    /**
     * @description Toggle Muck Hand and update player settings.
     * @method onToggleMuckHand
     * @memberof Popups.InGamePreferencesPopup#
     */
    onToggleMuckHand: function () {
        var data = {};
        data.channelId = this.activeModel.gameData.channelId;
        data.playerId = GameManager.user.playerId;
        data.key = 'isMuckHand';
        data.value = this.muckHandToggle.state;
        ServerCom.pomeloRequest(K.PomeloAPI.updateTableSettings, data, function (response) {
            if (response.success) {
                this.activeModel.gameData.settings.isMuckHand = !this.activeModel.gameData.settings.isMuckHand;
            } else {
                this.muckHandToggle.onToggle();
            }
        }.bind(this), null, 5000, false);
        // GameManager.playSound(K.Sounds.click);
    },

    onToggleShowFoldHand: function () {
        var data = {};
        data.channelId = this.activeModel.gameData.channelId;
        data.playerId = GameManager.user.playerId;
        data.key = 'isShowCard';
        data.value = this.showFoldHandToggle.state;
        ServerCom.pomeloRequest(K.PomeloAPI.updateTableSettings, data, function (response) {
            if (response.success) {
                this.activeModel.gameData.settings.isShowCard = !this.activeModel.gameData.settings.isShowCard;
                this.activeModel.presenter.showFoldBtn.node.parent.getChildByName("tick").active = this.activeModel.gameData.settings.isShowCard;
            } else {
                this.showFoldHandToggle.onToggle();
            }
        }.bind(this), null, 5000, false);
        // GameManager.playSound(K.Sounds.click);
    },

    /**
     * @description Toggle Player Chat and update player settings.
     * @method onTogglePlayerChat
     * @memberof Popups.InGamePreferencesPopup#
     */
    onTogglePlayerChat: function () {
        if (!this.activeModel.gameData.settings.muteGameSound) {
            GameManager.playSound(K.Sounds.click);
        }
        // var data = {};
        // data.channelId = this.activeModel.gameData.channelId;
        // data.playerId = GameManager.user.playerId;
        // data.key = 'playerChat';
        // data.value = this.Chat.state;
        // ServerCom.pomeloRequest(K.PomeloAPI.updateTableSettings, data, function (response) {
        //     if (response.success) {
        //         this.activeModel.gameData.settings.playerChat = !this.activeModel.gameData.settings.playerChat;
        //         // GameManager.emit(K.PokerEvents.onChatSettingsChanged);
        //     } else {
        //         this.Chat.onToggle();
        //     }
        // }.bind(this));

        var data = {};
        data.query = {};
        data.updateKeys = {};
        data.query.playerId = GameManager.user.playerId;
        data.updateKeys["settings.playerChat"] = this.Chat.state;
        ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (data) {
            if (data.success) {
                GameManager.user.playerChat = !GameManager.user.playerChat;
                GameManager.emit(K.PokerEvents.onChatSettingsChanged);
            } else {
                this.Chat.onToggle();
            }
        }.bind(this), null, 5000, false);


        // if (!GameManager.user.muteGameSound)
        // GameManager.playSound(K.Sounds.click);3
        // this.playAudio(K.Sounds.click);



    },

    /**
     * @description Toggle Four color card
     * @method onToggleFourColorCard
     * @memberof Popups.InGamePreferencesPopup#
     */
    onToggleFourColorCard: function () {
        if (!this.activeModel.gameData.settings.muteGameSound) {
            GameManager.playSound(K.Sounds.click);
        }

        var data = {};
        data.channelId = this.activeModel.gameData.channelId;
        data.playerId = GameManager.user.playerId;
        data.key = 'cardColor';
        data.value = this.coloredCardToggle.state;
        ServerCom.pomeloRequest(K.PomeloAPI.updateTableSettings, data, function (response) {
            // console.log(response, this.coloredCardToggle.state)
            if (response.success) {
                this.activeModel.gameData.settings.cardColor = this.coloredCardToggle.state;
                this.setColorCardPref(this.coloredCardToggle.state);
            } else {
                this.coloredCardToggle.onToggle();
            }
        }.bind(this), null, 5000, false);
        // GameManager.playSound(K.Sounds.click);


    },

    /**
     * @description This is used for setting color preferences of card
     * @method setColorCardPref
     * @param {boolean} state
     * @memberof Popups.InGamePreferencesPopup#
     */
    setColorCardPref: function (state) {
        // GameManager.user.cardColor = state;

        if (state) {
            this.activeModel.emit(K.PokerEvents.onCardColorChange, K.CardColoring.FourCardColor, this.model);
        } else {
            this.activeModel.emit(K.PokerEvents.onCardColorChange, K.CardColoring.TwoCardColor, this.model);
        }
    },

    /**
     * @description Set Tiled LayOut
     * @method onSetTiledLayOut
     * @memberof Popups.InGamePreferencesPopup#
     */
    onSetTiledLayOut: function () {
        //  console.error("tiled", this.activeModel.valueChange);
        if(this.activeModel.valueChange) {
            // console.error("tiled view and again tiled view called...",this.activeModel.valueChange)
            // this.activeModel.valueChange = !this.activeModel.valueChange;
            this.unTileViewSelection.isChecked = false;
            this.tileViewSelection.isChecked = true;
            GameScreen.setTiledView();
        }       
    },

    /**
     * @description Set UnTiled LayOut
     * @method onSetUnTiledLayOut
     * @memberof Popups.InGamePreferencesPopup#
     */
    onSetUnTiledLayOut: function () {
        //  console.error("untiled", this.activeModel.valueChange);

        // console.log("*******************************this",this.node.parent.parent.parent.parent.children.length)
        if(this.activeModel.valueChange) {
            // console.error("untiled view and again untiled view called...",this.activeModel.valueChange)
            // this.activeModel.valueChange = !this.activeModel.valueChange;
        this.unTileViewSelection.isChecked = true;
        this.tileViewSelection.isChecked = false;
        GameScreen.setUnTiledView();
        }
    },

    // /**
    //  * Show Table Color popup
    //  */
    // onOpenTableColorSelection: function () {
    //     this.popUpManager.show(PopUpType.TableColorPreferenceDialog, null, function () { });
    // },

    /**
     * @description Toggle Dealer Chat
     * @method onToggleDealerChat
     * @memberof Popups.InGamePreferencesPopup#
     */
    onToggleDealerChat: function () {
        if (!this.activeModel.gameData.settings.muteGameSound) {
            GameManager.playSound(K.Sounds.click);
        }
        // var data = {};
        // data.channelId = this.activeModel.gameData.channelId;
        // data.playerId = GameManager.user.playerId;
        // data.key = 'dealerChat';
        // data.value = this.dealerChat.state;
        // ServerCom.pomeloRequest(K.PomeloAPI.updateTableSettings, data, function (response) {
        //     if (response.success) {
        //         this.activeModel.gameData.settings.dealerChat = !this.activeModel.gameData.settings.dealerChat;
        //         // GameManager.emit(K.PokerEvents.onDealerChatSettingsChanged);
        //     } else {
        //         this.dealerChat.onToggle();
        //     }
        // }.bind(this));

        var data = {};
        data.query = {};
        data.updateKeys = {};
        data.query.playerId = GameManager.user.playerId;
        data.updateKeys["settings.dealerChat"] = this.dealerChat.state;
        ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (data) {
            if (data.success) {
                GameManager.user.dealerChat = !GameManager.user.dealerChat;
                GameManager.emit(K.PokerEvents.onDealerChatSettingsChanged);
            } else {
                this.dealerChat.onToggle();
            }
        }.bind(this), null, 5000, false);

        // GameManager.playSound(K.Sounds.click);

    },

    /**
     * @description This is used for setting color of table
     * @method setTableColor
     * @param {Object} event
     * @param {Number} parameter
     * @memberof Popups.InGamePreferencesPopup#
     */

    setTableColor: function (event, parameter) {
        this.activeModel.gameData.settings.tableColor = parameter;
        var data = {};
        data.channelId = this.activeModel.gameData.channelId;
        data.playerId = GameManager.user.playerId;
        data.key = 'tableColor';
        data.value = parameter;
        ServerCom.pomeloRequest(K.PomeloAPI.updateTableSettings, data, function (response) {
            if (response.success) {
                GameManager.user.tableColor = parameter;

                // this.activeModel.gameData.settings.dealerChat = !this.activeModel.gameData.settings.dealerChat;
                // GameManager.emit(K.PokerEvents.onDealerChatSettingsChanged);
            } else {
                // this.dealerChat.onToggle();
            }
        }.bind(this), null, 5000, false);
    },

    /**
     * @description Cancel button callback
     * @method onSettingsClose
     * @memberof Popups.InGamePreferencesPopup#
     */
    onSettingsClose: function () {
        if (!this.activeModel.gameData.settings.muteGameSound) {
            GameManager.playSound(K.Sounds.click);
        }
        GameManager.emit("enablePageView");
        this.popUpManager.hide(1, function () {});
        // GameManager.playSound(K.Sounds.click);

    },

    onLogOut: function () {
        if (!this.activeModel.gameData.settings.muteGameSound) {
            GameManager.playSound(K.Sounds.click);
        }
        GameManager.popUpManager.show(PopUpType.OnLogOutPopup, null, function () {});
        // GameManager.playSound(K.Sounds.click);

    },

    onChangeTheme: function () {
        if (!this.activeModel.gameData.settings.muteGameSound) {
            GameManager.playSound(K.Sounds.click);
        }
        this.tableTheme.active = true;
        GameManager.emit("enablePageView");
        this.popUpManager.hide(1, function () {});
    },

    onToggleHandS: function () {

        var data = {};
        // data.channelId = this.activeModel.gameData.channelId;
        data.playerId = GameManager.user.playerId;
        // data.handStrength = 'isMuckHand';
        // data.handStrength = this.handSToggle.state;
        data.showHandStrength = this.handSToggle.state;
        data.access_token = K.Token.access_token;
        data.isLoggedIn = true;
        ServerCom.pomeloRequest('connector.entryHandler.changeHandStrength', data, function (response) {
            if (response.success) {
                // GameManager.user.settings.handStrength = !GameManager.user.settings.handStrength;
                this.activeModel.gameData.showHandStrength = !this.activeModel.gameData.showHandStrength;
            } else {
                this.handSToggle.onToggle();
            }
        }.bind(this), null, 5000, false);
        // GameManager.playSound(K.Sounds.click);


    },

    onToggleBB: function () {

        var data = {};
        // data.channelId = this.activeModel.gameData.channelId;
        data.playerId = GameManager.user.playerId;
        // data.handStrength = 'isMuckHand';
        data.stackInBB = this.BBToggle.state;
        data.access_token = K.Token.access_token;
        data.isLoggedIn = true;
        ServerCom.pomeloRequest('connector.entryHandler.changeStackInBB', data, function (response) {
            if (response.success) {
                GameManager.user.settings.stackInBB = !GameManager.user.settings.stackInBB;
                GameManager.isBB = GameManager.user.settings.stackInBB;
                GameManager.emit("switchBB");
            } else {
                this.BBToggle.onToggle();
            }
        }.bind(this), null, 5000, false);
        // GameManager.playSound(K.Sounds.click);



    },
});
