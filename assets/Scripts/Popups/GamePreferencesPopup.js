var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var CheckBoxType = require('Checkbox');
var GameScreen = require('GameScreen');
var GameData = require('ResponseTypes').GameData;
var JoinSimilar = require('PostTypes').JoinSimilar;
var Toggle = require('Toggle');
var AvatarSelection = require('AvatarSelection');
var LoginHandler = require('LoginHandler');

/**
 * @classdesc Manages gamepreferences popUp
 * @class GamePreferencesPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        popUpManager: {
            default: null,
            type: PopUpManager
        },
        widthdrawlHistory: {
            default: null,
            type: cc.Node,
        },
        widthdrawlHistoryScrollView: {
            default: null,
            type: cc.Node,
        },
        widthdrawlHistoryScrollViewItem: {
            default: null,
            type: cc.Node,
        },

        giftScrollViewEmpty: {
            default: null,
            type: cc.Node,
        },
        giftScrollView: {
            default: null,
            type: cc.Node,
        },
        giftScrollViewItem: {
            default: null,
            type: cc.Node,
        },

        vpGiftSubmit: {
            default: null,
            type: cc.Button,
        },

        vpGiftSendBtn: {
            default: null,
            type: cc.Node,
        },
        vpGiftListBtn: {
            default: null,
            type: cc.Node,
        },

        vpGiftErrorMessage: {
            default: null,
            type: cc.Label,
        },
        vpGiftBalance: {
            default: null,
            type: cc.Label,
        },
        vpGiftName: {
            default: null,
            type: cc.EditBox,
        },
        vpGiftAmount: {
            default: null,
            type: cc.EditBox,
        },
        vpGiftPhone: {
            default: null,
            type: cc.EditBox,
        },

        withdrawalProcessSuccess: {
            default: null,
            type: cc.Node,
        },

        countryCode: {
            default: null,
            type: cc.EditBox,
        },
        flagScrollView: {
            default: null,
            type: cc.Node,
        },
        banksScrollView: {
            default: null,
            type: cc.Node,
        },
        //
        loginHandler: {
            default: null,
            type: LoginHandler,
        },
        vpEditProfileSuccess: {
            default: null,
            type: cc.Node,
        },
        vpEditProfileErrorMessage: {
            default: null,
            type: cc.Label,
        },
        vpEditProfileSubmit: {
            default: null,
            type: cc.Button,
        },
        vpEditProfileEmail: {
            default: null,
            type: cc.EditBox,
        },
        vpEditProfilePhone: {
            default: null,
            type: cc.EditBox,
        },

        vpWithdrawErrorMessage: {
            default: null,
            type: cc.Label,
        },
        vpWithdrawSubmit: {
            default: null,
            type: cc.Button,
        },
        vpWithdrawBank: {
            default: null,
            type: cc.EditBox,
        },
        vpWithdrawName: {
            default: null,
            type: cc.EditBox,
        },
        vpWithdrawAmount: {
            default: null,
            type: cc.EditBox,
        },
        vpWithdrawAccount: {
            default: null,
            type: cc.EditBox,
        },
        vpWithdrawPhone: {
            default: null,
            type: cc.EditBox,
        },

        playerName: {
            default: null,
            type: cc.Label,
        },
        playerId: {
            default: null,
            type: cc.Label,
        }, 
        agentId: {
            default: null,
            type: cc.Label,
        }, 
        agentId2: {
            default: null,
            type: cc.Label,
        }, 
        selectAvatar: {
            default: null,
            type: cc.Node,
        },
        widthdrawl: {
            default: null,
            type: cc.Node,
        },
        gift: {
            default: null,
            type: cc.Node,
        },
        giftSend: {
            default: null,
            type: cc.Node,
        },
        giftList: {
            default: null,
            type: cc.Node,
        },
        deposit: {
            default: null,
            type: cc.Node,
        },
        depositScrollView: {
            default: null,
            type: cc.Node,
        },
        depositScrollViewItem: {
            default: null,
            type: cc.Node,
        },
        editProfile: {
            default: null,
            type: cc.Node,
        },
        // 
        balance: {
            default: null,
            type: cc.Label,
        },
        goldIcon: {
            default: null,
            type: cc.Node,
        },
        diamondIcon: {
            default: null,
            type: cc.Node,
        },
        claim: {
            default: null,
            type: cc.Button,
        },
        chips: {
            default: null,
            type: cc.Label,
        },
        version: {
            default: null,
            type: cc.Label,
        },
        tileViewSelection: {
            default: null,
            type: cc.Node,
        },
        unTileViewSelection: {
            default: null,
            type: cc.Node,
        },
        gameScreen: {
            default: null,
            type: GameScreen,
        },
        dealerChat: {
            default: null,
            type: Toggle,
        },
        Chat: {
            default: null,
            type: Toggle,
        },
        runItTwiceToggle: {
            default: null,
            type: Toggle,
        },
        soundToggle: {
            default: null,
            type: Toggle,
        },
        standUpBtn: {
            default: null,
            type: cc.Button,
        },
        joinSimilarBtn: {
            default: null,
            type: cc.Button,
        },
        tableColorBtn: {
            default: null,
            type: cc.Button,
        },
        seatPreferenceBtn: {
            default: null,
            type: cc.Button,
        },
        tutorial: {
            default: null,
            type: cc.Prefab,
        },
        tutorialNode: {
            default: null,
            type: cc.Node,
        },
        tableLayout: {
            default: null,
            type: cc.Node,
        },
        muckHandToggle: {
            default: null,
            type: Toggle,
        },
        coloredCardToggle: {
            default: null,
            type: Toggle,
        },
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
        avatarScrollViewRef: {
            default: null,
            type: cc.Node,
        },
        avatarGridParent: {
            default: null,
            type: cc.Node,
        },
        avatars: {
            default: [],
            type: AvatarSelection,
        },
        selectedAvatarID: 0,
    },

    /**
     * @description For initialization.
     * @method onLoad
     * @memberof Popups.GamePreferencesPopup#
     */
    onLoad: function () {
        // this.tableLayout.active = !GameScreen.isMobile;

        this.loadAvatars();
        GameManager.on("SelectedAvatar", this.onSelectAvatar.bind(this));
        GameManager.on("REALCHIPSUPDATE", this.onRealChipsUpdated.bind(this));
        this.avatars.forEach(function (element) {
            element.unSelectAvatar();
        }, this);

        this.vpGiftBalance.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));
        this.vpGiftBalance.string = GameManager.convertChips(this.vpGiftBalance.string);
    },

    /**
     * @description Manage default states of buttons in popup.
     * @method onShow
     * @param{Object} data
     * @memberof Popups.GamePreferencesPopup#   
     */

    onShow: function (data) {
        this.lockClick = false;
        
        if (GameManager.user.category == "GOLD") {
            this.goldIcon.active = true;
            this.diamondIcon.active = false;
        }
        else {
            this.goldIcon.active = false;
            this.diamondIcon.active = true;   
        }

        this.chips.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));
        this.version.string = "Albania Poker: v" + K.ServerAddress.clientVer;
        // console.log(GameManager.user.profileImage, GameManager.user.urlImg);
        this.playerImg.spriteFrame = GameManager.user.urlImg;

        this.gameVersionString.string = "<color=#00ff00>Build Version:   " + K.ServerAddress.clientVer + "</color>"; //</c><color=#0fffff>
        this.pokerVersionString.string = "<color=#00ff00>Poker Version:   " + K.ServerAddress.pokerVer + "</color>";
        // if (GameManager.isP) {
        //     this.gameVersionString.string = "<color=#00ff00>Build Version:   " + K.ServerAddress.clientVer + "</color>"; //</c><color=#0fffff>
        //     this.pokerVersionString.string = "<color=#00ff00>PLA-IEW POKER Version: " + K.ServerAddress.pokerVer + "</color>";
        // } else if (GameManager.isSD) {
        //     this.gameVersionString.string = "<color=#00ff00>" + LocalizedManager.t('TXT_BUILD_VERSION') + ":   " + K.ServerAddress.clientVer + "</color>"; //</c><color=#0fffff>
        //     this.pokerVersionString.string = "<color=#00ff00>POKER " + LocalizedManager.t('TXT_VERSION') + ":      " + K.ServerAddress.pokerVer + "</color>";
        // }
        if (this.dealerChat.state !== GameManager.user.dealerChat) {
            this.dealerChat.onToggle();
        }
        if (GameManager.user.playerChat !== this.Chat.state) {
            this.Chat.onToggle();
        }

        if (GameManager.user.muteGameSound == this.soundToggle.state) {
            this.soundToggle.onToggle();
        }
        // if (GameManager.user.isMuckHand !== this.muckHandToggle.state) {
        //     this.muckHandToggle.onToggle();
        // }
        if (GameManager.user.cardColor !== this.coloredCardToggle.state) {
            this.coloredCardToggle.onToggle();
        }

        this.balance.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));
        this.balance.string = GameManager.convertChips(this.balance.string);
        this.playerName.string = GameManager.user.userName;
        this.playerId.string = "Player ID : " + GameManager.user.playerId;
        if (GameManager.user.isParentUserName) {
            if (GameManager.user.isParentUserName == "") {
                this.agentId.string = "Agent ID : N/A";
            }
            else {
                this.agentId.string = "Agent ID : " + GameManager.user.isParentUserName;
            }
        }
        else {
            this.agentId.string = "Agent ID : N/A";
        }
        this.agentId2.string = GameManager.user.isParentUserName;
        this.vpGiftBalance.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));
        this.vpGiftBalance.string = GameManager.convertChips(this.vpGiftBalance.string);

        // if (GameScreen.isMobile == false) {
        //     if (this.gameScreen.viewType) {

        //         this.unTileViewSelection.active = (this.gameScreen.viewType == 2);
        //         this.tileViewSelection.active = (this.gameScreen.viewType == 1);
        //     } else {
        //         this.unTileViewSelection.active = false;
        //         this.tileViewSelection.active = true;

        //     }
        // }

        this.avatars.forEach(function (avatar) {
            avatar.unSelectAvatar();
        });

        this.selectedAvatarID = -1;
        var imageIndex = parseInt(GameManager.user.profileImage);
        if (imageIndex >= 0) {
            this.selectedAvatarID = imageIndex + 1;
            this.avatars[imageIndex].selection.active = true;
        }

        // if (GameManager.user.category == "GOLD") {
        //     this.claim.node.active = true;
        //     if (Date.now() < GameManager.user.nextClaimBonusTime) {
        //         this.claim.interactable = false;
        //     }
        //     else {
        //         this.claim.interactable = true;
        //     }
        // }
        // else {
        //     this.claim.node.active = false;
        // }
    },

    isInToday: function(inputDate) {
        var today = new Date();
        if (today.setHours(0,0,0,0) == inputDate.setHours(0,0,0,0)) { 
            return true; 
        }
        else { 
            return false; 
        }
    },

    onSelectAvatar: function (avatarId) {

        this.avatars.forEach(function (avatar) {
            avatar.unSelectAvatar();
        });

        this.avatars[avatarId].showSelection();
        this.selectedAvatarID = avatarId + 1;

        // this.updateAvatar(this.selectedAvatarID);
    },

    /**
     * @description Leave current table
     * @method onLeave
     * @memberof Popups.GamePreferencesPopup#
     */
    onLeave: function () {
        this.popUpManager.hide(PopUpType.GamePreferencesPopup, function () { });
        this.gameScreen.leaveCurrent();
    },

    /**
     * @description StandUp from table.
     * @method onStandup
     * @memberof Popups.GamePreferencesPopup#
     */
    onStandup: function () {
        this.gameScreen.standUp();
        this.popUpManager.hide(PopUpType.GamePreferencesPopup, function () { });
    },

    /**
     * @description Show seat preference popup passing the number of max players in table.
     * @method onSelectSeatPreferences
     * @memberof Popups.GamePreferencesPopup#
     */
    onSelectSeatPreferences: function () {
        this.popUpManager.show(PopUpType.SeatPreferenceDialog, this.gameScreen.gameModel.activePokerModels[this.gameScreen.prevSelection].roomConfig.maxPlayers, function () { });
    },

    /**
     * @description Play tutorial
     * @method onTutorialPlay
     * @memberof Popups.GamePreferencesPopup#
     */
    onTutorialPlay: function () { },

    /**
     * @description Toggle Sound and update player settings.
     * @method onToggleSound
     * @memberof Popups.GamePreferencesPopup#
     */
    onToggleSound: function () {
        GameManager.playSound(K.Sounds.click);
        var data = {};
        data.query = {};
        data.query.playerId = GameManager.user.playerId;
        data.updateKeys = {};
        GameManager.user.muteGameSound = !GameManager.user.muteGameSound;
        data.updateKeys["settings.muteGameSound"] = GameManager.user.muteGameSound;
        if (GameManager.user.muteGameSound) {
            cc.audioEngine.stopAll();
        }
        GameManager.playMusic(!GameManager.user.muteGameSound);
        ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (data) {
            if (data.success) { } else { }
        }.bind(this));
       

    },

    /**
     * @description Change Avatar
     * @method onChooseAvatarSound
     * @memberof Popups.GamePreferencesPopup#
     */
    onChooseAvatarSound: function () {
        this.onSettingsClose();
        this.popUpManager.show(PopUpType.AvatarDialog, null, function () { });
        GameManager.playSound(K.Sounds.click);

    },

    /**
     * @description Toggle Run it twice and update player settings.
     * @method onToggleRunItTwice
     * @memberof Popups.GamePreferencesPopup#
     */
    onToggleRunItTwice: function () {
        var data = {};
        data.query = {};
        data.query.playerId = GameManager.user.playerId;
        data.updateKeys = {};
        data.updateKeys["settings.runItTwice"] = this.runItTwiceToggle.state;
        ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (data) {
            if (data.success) {
                GameManager.user.runItTwice = !GameManager.user.runItTwice;
            } else {
                this.runItTwiceToggle.onToggle();
            }
        }.bind(this));
        GameManager.playSound(K.Sounds.click);


    },

    /**
     * @description Toggle Run it twice and update player settings.
     * @method onToggleMuckHand
     * @memberof Popups.GamePreferencesPopup#
     */
    onToggleMuckHand: function () {
        var data = {};
        data.query = {};
        data.query.playerId = GameManager.user.playerId;
        data.updateKeys = {};
        data.updateKeys["isMuckHand"] = this.muckHandToggle.state;
        ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (data) {
            if (data.success) {
                GameManager.user.isMuckHand = !GameManager.user.isMuckHand;
            } else {
                this.muckHandToggle.onToggle();
            }
        }.bind(this));

    },

    /**
     * @description Toggle Player Chat and update player settings.
     * @method onTogglePlayerChat
     * @memberof Popups.GamePreferencesPopup#
     */
    onTogglePlayerChat: function () {
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
        }.bind(this));
    },

    /**
     * @description Toggle Four color card
     * @method onToggleFourColorCard
     * @memberof Popups.GamePreferencesPopup#
     */
    onToggleFourColorCard: function () {
        var data = {};
        data.query = {};
        data.updateKeys = {};
        data.query.playerId = GameManager.user.playerId;
        data.updateKeys["prefrences.cardColor"] = this.coloredCardToggle.state;
        ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (data) {
            // console.log(data, this.coloredCardToggle.state)
            if (data.success) {
                GameManager.user.cardColor = this.coloredCardToggle.state;
            } else {
                this.coloredCardToggle.onToggle();
            }
        }.bind(this));
        GameManager.playSound(K.Sounds.click);


    },

    /**
     * @description Set Tiled LayOut
     * @method onSetTiledLayOut
     * @memberof Popups.GamePreferencesPopup#
     */
    onSetTiledLayOut: function () {
        this.unTileViewSelection.active = false;
        this.tileViewSelection.active = true;
        this.gameScreen.setTiledView();
    },

    /**
     * @description Set UnTiled LayOut
     * @method onSetUnTiledLayOut
     * @memberof Popups.GamePreferencesPopup#
     */
    onSetUnTiledLayOut: function () {
        this.unTileViewSelection.active = true;
        this.tileViewSelection.active = false;
        this.gameScreen.setUnTiledView();
    },

    /**
     * @description Show Table Color popup
     * @method onOpenTableColorSelection
     * @memberof Popups.GamePreferencesPopup#
     */
    onOpenTableColorSelection: function () {
        this.popUpManager.show(PopUpType.TableColorPreferenceDialog, null, function () { });
    },

    /**
     * @description Toggle Dealer Chat
     * @method onToggleDealerChat
     * @memberof Popups.GamePreferencesPopup#
     */
    onToggleDealerChat: function () {
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
        }.bind(this));
        GameManager.playSound(K.Sounds.click);

    },

    /**
     * @description Displays the popup for logout
     * @method onLogOut
     * @memberof Popups.GamePreferencesPopup#
     */
    onLogOut: function () {
        this.coloredCardToggle.onToggle();
        this.dealerChat.onToggle();
        GameManager.popUpManager.show(PopUpType.OnLogOutPopup, null, function () { });
        GameManager.playSound(K.Sounds.click);
    },

    onRemove: function () {
        GameManager.popUpManager.show(PopUpType.RemoveDataDialog, {
            callback: function() {
                ServerCom.pomeloRequest("connector.entryHandler.disablePlayer", {
                    playerId: GameManager.user.playerId,
                    isLoggedIn: true,
                    access_token: K.Token.access_token
                }, (response) => {
                    console.log(response);
                    if(response.success) {
                        var param = {
                            code: 3333,
                            errorType: 3333,
                            response: response.message
                        };
                        GameManager.popUpManager.show(PopUpType.DisconnectDialog, param, function () {});
                    }

                }, null, 5000, false);
            }
        }, function () { });
    },

    /**
     * @description Cancel button callback
     * @method onSettingsClose
     * @memberof Popups.GamePreferencesPopup#
     */
    onSettingsClose: function () {
        this.selectAvatar.active = false;
        this.widthdrawl.active = false;
        this.deposit.active = false;
        this.editProfile.active = false;
        this.gift.active = false;

        this.popUpManager.hide(PopUpType.GamePreferencesPopup, function () { });
        GameManager.playSound(K.Sounds.click);

    },

    // tutorialNode: cc.Node = null,

    onClickTutorial: function () {
        localStorage.setItem('FINISH_TUTORIAL', 'false');        
        GameManager.playSound(K.Sounds.click);
        if(this.tutorialNode) {
            this.tutorialNode.active = true;
            const tutoMgr = this.tutorialNode.getComponent('TutorialManager');
            tutoMgr.startTuto();
            return;
        }

        this.tutorialNode = cc.instantiate(this.tutorial); 
        this.tutorialNode.parent = this.node;
    },

    loadAvatars: function () {
        for (var i = 0; i < GameManager.avatarPool.length; i++) {
            this.avatarGridParent.addChild(GameManager.avatarPool[i]);
            GameManager.avatarPool[i].active = true;
            GameManager.avatarPool[i].getComponent("AvatarSelection").AvatarPopUp = this;
            this.avatars.push(GameManager.avatarPool[i].getComponent("AvatarSelection"));
            //this.avatars[i].on("SelectedAvatar", this.onSelectAvatar.bind(this));\
        }
    },

    updateAvatar: function (avatarId) {
        //------------------------------uncomment for api call---------------------------------//
        var profileData = {
            query: {
                playerId: "hsdfhd"
            },
            updateKeys: {
                profileImage: "0",
            }
        };
        var data = profileData;
        data.query.playerId = GameManager.user.playerId;
        data.updateKeys.profileImage = this.selectedAvatarID;

        ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (response) {
            if (response.success) {
                GameManager.user.profileImage = this.selectedAvatarID - 1;
                GameManager.user.urlImg = GameManager.avatarImages[GameManager.user.profileImage];
                this.playerImg.spriteFrame = GameManager.user.urlImg;
                // GameManager.user.profileImage = this.selectedAvatarID;
                // GameManager.user.urlImg = GameManager.avatarImages[GameManager.user.profileImage - 1];
                // this.playerImg.spriteFrame = GameManager.user.urlImg;
                GameManager.emit("image-loaded", GameManager.user);

                this.selectAvatar.active = false;
            }
        }.bind(this), null, 5000, false, false);
    },

    onClaim: function () {
        let inst = this;
         ServerCom.pomeloRequest("connector.entryHandler.playerClaimFreeChips", {
            "playerId": GameManager.user.playerId,
            "isLoggedIn": true,
            "access_token": K.Token.access_token,
        }, function(response){
            console.log("connector.entryHandler.playerClaimFreeChips", response);
            if(response.success) {
                GameManager.user.freeChips = response.result.freeChips;
                GameManager.user.claimedFreeChipsAt = response.result.claimedFreeChipsAt;
                GameManager.user.nextClaimBonusTime = response.result.nextClaimBonusTime;

                inst.chips.string = Number((GameManager.user.freeChips).toFixed(2));

                GameManager.popUpManager.show(PopUpType.NotificationPopup, "Player claim free chips succeeded", function () { });
                inst.claim.interactable = false;

                GameManager.emit("refreshPlayerChips");
            }
            else {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, response.message, function () { });
            }
        }, null, 5000, false);  
    },

    formatNumber: function(num) {
        return num.toLocaleString('en-US')
    },

    onDeposit: function() {
        this.selectAvatar.active = false;
        this.widthdrawl.active = false;
        this.deposit.active = true;
        this.editProfile.active = false;  

        this.loginHandler.vpWShop((data) => {
            console.log(data);
            this.depositScrollView.removeAllChildren();
            for (var i = 0; i < data.data.length; i++) {
                let winner = data.data[i];
                var winnerInstance = cc.instantiate(this.depositScrollViewItem);
                winnerInstance.x = 0;
                winnerInstance.active = true;
                this.depositScrollView.addChild(winnerInstance);

                cc.find("title/val", winnerInstance).getComponent(cc.Label).string = winner.price + " MNT";
                cc.find("price", winnerInstance).getComponent(cc.Label).string = this.formatNumber(winner.chipsValue);
                winnerInstance.getComponent(cc.Button).clickEvents[0].customEventData = winner.chipsValue;
                winnerInstance.__data = winner;
            }
        });
    },

    onWidthdrawl: function() {
        this.selectAvatar.active = false;
        this.widthdrawl.active = true;
        this.deposit.active = false;
        this.editProfile.active = false;
        this.gift.active = false;
    },

    onEditProfile: function() {
        this.selectAvatar.active = false;
        this.widthdrawl.active = false;
        this.deposit.active = false;
        this.editProfile.active = true;
        this.gift.active = false;

        this.vpEditProfileEmail.string = GameManager.user.emailId;
        this.vpEditProfilePhone.string = GameManager.user.mobileNumber.replace("+976", "");
        this.vpEditProfileErrorMessage.string = "";
    },

    onEditProfileBack: function() {
        this.vpEditProfileErrorMessage.string = "";
        this.selectAvatar.active = false;
        this.widthdrawl.active = false;
        this.deposit.active = false;
        this.editProfile.active = false;
    },

    onEditProfileCheck: function() {
        this.vpEditProfileErrorMessage.string = "";
        this.vpEditProfileSubmit.interactable = false;
        if (this.vpEditProfileEmail.string === "" || this.vpEditProfilePhone.string === "") {
            return;
        }
        this.vpEditProfileSubmit.interactable = true;
    },

    onEditProfileSubmit: function() {
        this.loginHandler.vpUpdateContactInfo("+976" + this.vpEditProfilePhone.string, this.vpEditProfileEmail.string, (data) => {
            console.log("vpUpdateContactInfo", JSON.stringify(data));

            if (data.success == true || data.status == "success") {
                GameManager.user.emailId = this.vpEditProfileEmail.string;
                GameManager.user.mobileNumber = "+976" + this.vpEditProfilePhone.string;
                this.vpEditProfileErrorMessage.string = "";
                this.vpEditProfileSuccess.active = true;
            }
            else {
                this.vpEditProfileErrorMessage.node.active = true;
                if (data.message) {
                    this.vpEditProfileErrorMessage.string = data.message;
                }
                else {
                    this.vpEditProfileErrorMessage.string = data.error[0].message;
                }
            }
        });
    },

    onEditProfileCloseSuccess:function() {
        this.vpEditProfileSuccess.active = false;
    },


    onDepositBack: function() {
        this.selectAvatar.active = false;
        this.widthdrawl.active = false;
        this.deposit.active = false;
        this.editProfile.active = false;
        this.gift.active = false;
    },

    onWidthdrawlBack: function() {
        this.selectAvatar.active = false;
        this.widthdrawl.active = false;
        this.deposit.active = false;
        this.editProfile.active = false;
        this.gift.active = false;

        this.vpWithdrawBank.string = "";
        this.vpWithdrawAccount.string = "";
        this.vpWithdrawAmount.string = "";
        this.vpWithdrawName.string = "";
        this.vpWithdrawPhone.string = "";
    },

    onWidthdrawlCheck: function() {
        this.vpWithdrawErrorMessage.string = "";
        this.vpWithdrawSubmit.interactable = false;
        if (this.vpWithdrawAmount.string === "") {
            return;
        }
        this.vpWithdrawSubmit.interactable = true;
    },

    onWidthdrawlSubmit: function() {
        this.vpWithdrawSubmit.interactable = false;
        this.loginHandler.vpWithdrawChips(
            parseInt(this.vpWithdrawAmount.string), (data) => {
            console.log("vpWithdrawChips", JSON.stringify(data));

            if (data.success == true || data.status == "success") {
                this.vpWithdrawErrorMessage.string = "";
                this.withdrawalProcessSuccess.active = true;
                this.withdrawalProcessSuccess.getChildByName("Background").getChildByName("ref").getChildByName("val").getComponent(cc.Label).string = data.data.referenceNumber;

                this.vpWithdrawAmount.string = "";
            }
            else {
                this.vpWithdrawErrorMessage.node.active = true;
                if (data.message) {
                    this.vpWithdrawErrorMessage.string = data.message;
                }
                else {
                    this.vpWithdrawErrorMessage.string = data.error[0].message;
                }
            }
        });
    },

    onWidthdrawlClosePopup: function() {
        this.withdrawalProcessSuccess.active = false;
        // this.onWidthdrawlBack();
    },

    showFlagScrollView: function() {
        this.flagScrollView.active = !this.flagScrollView.active;
    },

    hideFlagScrollView: function() {
        this.flagScrollView.active = false;
    },

    onBank: function(event, bank) {
        this.vpWithdrawBank.string = bank;
        this.hideFlagScrollView();
    },

    onAvatars: function() {
        this.selectAvatar.active = true;
        this.widthdrawl.active = false;
        this.deposit.active = false;
        this.editProfile.active = false;
        this.gift.active = false;

        this.avatars.forEach(function (element) {
            element.unSelectAvatar();
        }, this);
        this.selectedAvatarID = -1;
        var imageIndex = parseInt(GameManager.user.profileImage);
        if (imageIndex >= 0) {
            this.selectedAvatarID = imageIndex + 1;
            this.avatars[imageIndex].selection.active = true;
        }
    },

    onAvatarsBack: function() {
        this.selectAvatar.active = false;
        this.widthdrawl.active = false;
        this.deposit.active = false;
        this.editProfile.active = false;
        this.gift.active = false;
    },

    onAvatarsSubmit: function() {
        this.updateAvatar(this.selectedAvatarID);
    },

    onRealChipsUpdated: function() {
        this.balance.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));
        this.vpGiftBalance.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));

        this.balance.string = GameManager.convertChips(this.balance.string);
        this.vpGiftBalance.string = GameManager.convertChips(this.vpGiftBalance.string);
    },

    onGift: function() {
        this.selectAvatar.active = false;
        this.widthdrawl.active = false;
        this.deposit.active = false;
        this.editProfile.active = false;
        this.gift.active = true;
        this.giftSend.active = true;
        this.giftList.active = false;

        this.vpGiftSendBtn.getChildByName("pressed").active = true;
        this.vpGiftListBtn.getChildByName("pressed").active = false;

        this.vpGiftBalance.string = Number((GameManager.user.category == "GOLD" ? GameManager.user.freeChips : GameManager.user.realChips).toFixed(2));
        this.vpGiftBalance.string = GameManager.convertChips(this.vpGiftBalance.string);
    },

    onGiftBack: function() {
        this.selectAvatar.active = false;
        this.widthdrawl.active = false;
        this.deposit.active = false;
        this.editProfile.active = false;
        this.gift.active = false;

        this.vpGiftErrorMessage.string = "";
        this.vpGiftAmount.string = "";
        this.vpGiftName.string = "";
        this.vpGiftPhone.string = "";
        this.vpGiftSubmit.interactable = false;
    },

    onGiftSend: function() {
        this.giftSend.active = true;
        this.giftList.active = false;
        this.vpGiftSendBtn.getChildByName("pressed").active = true;
        this.vpGiftListBtn.getChildByName("pressed").active = false;
    },

    onGiftList: function() {
        this.giftSend.active = false;
        this.giftList.active = true;

        this.vpGiftSendBtn.getChildByName("pressed").active = false;
        this.vpGiftListBtn.getChildByName("pressed").active = true;

        this.loginHandler.vpListGift(
            (data) => {
            console.log("vpListGift", data);

            if (data.success == true || data.status == "success") {
                // {
                //     "transactionId": "OAPF66CGCE",
                //     "senderUsername": "sxc111",
                //     "senderPlayerId": "1531611013",
                //     "receiverUsername": "sxc222",
                //     "receiverPlayerId": "5273788908",
                //     "amount": 11,
                //     "type": "send",
                //     "status": "success",
                //     "transactionDate": "2025-07-23T06:18:16.111Z"
                // }

                this.giftScrollView.removeAllChildren();
                for (var i = 0; i < data.items.length; i++) {
                    let winner = data.items[i];
                    var winnerInstance = cc.instantiate(this.giftScrollViewItem);
                    winnerInstance.x = 0;
                    winnerInstance.active = true;
                    this.giftScrollView.addChild(winnerInstance);

                    if (winner.senderUsername == GameManager.user.userName) {
                        cc.find("left/PlayerName", winnerInstance).getComponent(cc.Label).string = winner.senderUsername;
                        cc.find("right/PlayerName", winnerInstance).getComponent(cc.Label).string = winner.receiverUsername;

                        cc.find("left/PlayerID", winnerInstance).getComponent(cc.Label).string = "ID: " + winner.senderPlayerId;
                        cc.find("right/PlayerID", winnerInstance).getComponent(cc.Label).string = "ID: " + winner.receiverPlayerId;

                        cc.find("left/Avatar/Mask/avatarSprite", winnerInstance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[parseInt(winner.senderProfileImage) - 1];
                        cc.find("right/Avatar/Mask/avatarSprite", winnerInstance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[parseInt(winner.receiverProfileImage) - 1];
                    }
                    else {
                        cc.find("right/PlayerName", winnerInstance).getComponent(cc.Label).string = winner.senderUsername;
                        cc.find("left/PlayerName", winnerInstance).getComponent(cc.Label).string = winner.receiverUsername;

                        cc.find("right/PlayerID", winnerInstance).getComponent(cc.Label).string = "ID: " + winner.senderPlayerId;
                        cc.find("left/PlayerID", winnerInstance).getComponent(cc.Label).string = "ID: " + winner.receiverPlayerId;

                        cc.find("right/Avatar/Mask/avatarSprite", winnerInstance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[parseInt(winner.senderProfileImage) - 1];
                        cc.find("left/Avatar/Mask/avatarSprite", winnerInstance).getComponent(cc.Sprite).spriteFrame = GameManager.avatarImages[parseInt(winner.receiverProfileImage) - 1];
                    }

                    cc.find("center/Cashier/realMoney", winnerInstance).getComponent(cc.Label).string = this.formatNumber(winner.amount);
                    if (winner.type == "send") {
                        cc.find("center/Cashier/realMoney", winnerInstance).color = cc.Color.RED;
                        cc.find("center/Cashier/realMoney", winnerInstance).getComponent(cc.Label).string = "-" + cc.find("center/Cashier/realMoney", winnerInstance).getComponent(cc.Label).string;
                    }
                    else {
                        cc.find("center/Cashier/realMoney", winnerInstance).color = cc.Color.GREEN;
                        cc.find("center/Cashier/realMoney", winnerInstance).getComponent(cc.Label).string = "+" + cc.find("center/Cashier/realMoney", winnerInstance).getComponent(cc.Label).string;
                    }

                    if (winner.type == "send") {
                        cc.find("center/left", winnerInstance).active = false;
                        cc.find("center/right", winnerInstance).active = true;
                    }
                    else {
                        cc.find("center/left", winnerInstance).active = true;
                        cc.find("center/right", winnerInstance).active = false;
                    }

                    cc.find("center/date", winnerInstance).getComponent(cc.Label).string = this.formatDateString(winner.transactionDate);
                }

                if (data.items.length == 0) {
                    this.giftScrollViewEmpty.active = true;
                }
                else {
                    this.giftScrollViewEmpty.active = false;
                }
            }
            else {
                this.giftScrollViewEmpty.active = true;
            }
        });
    },

    formatDateString:function(isoString) {
      const date = new Date(isoString);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    },

    onGiftSendCheck: function() {
        this.vpGiftErrorMessage.string = "";
        this.vpGiftSubmit.interactable = false;
        if (this.vpGiftAmount.string === "" ||
            this.vpGiftName.string === "" ||
            this.vpGiftPhone.string === "") {
            return;
        }
        this.vpGiftSubmit.interactable = true;
    },

    onGiftSendCall: function() {
        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 1);

        this.loginHandler.vpSendGift(
            this.vpGiftName.string, 
            parseInt(this.vpGiftAmount.string),
            "+976" + this.vpGiftPhone.string, (data) => {
            console.log("vpSendGift", data);

            if (data.success == true || data.status == "success") {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, data.message, function () { });
                this.vpGiftErrorMessage.string = "";
                this.vpGiftAmount.string = "";
                this.vpGiftName.string = "";
                this.vpGiftPhone.string = "";
                this.vpGiftSubmit.interactable = false;
            }
            else {
                this.vpGiftErrorMessage.node.active = true;
                if (data.message) {
                    this.vpGiftErrorMessage.string = data.message;
                }
                else {
                    this.vpGiftErrorMessage.string = data.error[0].message;
                }
            }
        });
    },

    onWidthdrawlHistory: function() {
        function formatDate(isoString) {
          // 创建 Date 对象
          const date = new Date(isoString);
          
          // 获取各个时间部分
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          
          // 组合成目标格式
          return `${day}-${month}-${year} ${hours}:${minutes}`;
        }

        this.loginHandler.vpWithdrawHistory((data) => {
            console.log("vpWithdrawHistory", data);

            // {
            //     "success": true,
            //     "data": [
            //         {
            //             "referenceNumber": "AC843096-174",
            //             "amount": 111,
            //             "status": "Pending",
            //             "createdAt": "2025-11-27T15:59:33.626Z"
            //         },
            //         {
            //             "referenceNumber": "9045682A-4FA",
            //             "amount": 321,
            //             "status": "Pending",
            //             "createdAt": "2025-11-27T15:58:06.993Z"
            //         },
            //         {
            //             "referenceNumber": "DE968A2C-D05",
            //             "amount": 123,
            //             "status": "Pending",
            //             "createdAt": "2025-11-27T15:57:44.531Z"
            //         },
            //         {
            //             "referenceNumber": "DAFA14FE-F97",
            //             "amount": 123,
            //             "status": "Pending",
            //             "createdAt": "2025-11-27T15:41:40.313Z"
            //         }
            //     ],
            //     "totalCount": 4,
            //     "currentPage": 1
            // }

            if (data.success == true || data.status == "success") {
                this.widthdrawlHistory.active = true;
                this.widthdrawlHistoryScrollView.removeAllChildren();

                for (var i = 0; i < data.data.length; i++) {
                    let winner = data.data[i];
                    var instance = cc.instantiate(this.widthdrawlHistoryScrollViewItem);
                    instance.x = 0;
                    instance.active = true;
                    instance.children[1].getComponent(cc.Label).string = formatDate(winner.createdAt);
                    instance.children[2].getComponent(cc.Label).string = GameManager.convertChips(winner.amount);
                    instance.children[3].getComponent(cc.Label).string = winner.referenceNumber;
                    
                    if (winner.status == "Pending") {
                        instance.children[4].active = false;
                        instance.children[5].active = true;
                        instance.children[6].active = false;
                    }
                    else if (winner.status == "Success") {
                        instance.children[4].active = true;
                        instance.children[5].active = false;
                        instance.children[6].active = false;
                    }
                    else {
                        instance.children[4].active = false;
                        instance.children[5].active = false;
                        instance.children[6].active = true;
                    }

                    instance.children[0].active = i % 2 ? false : true;
                    this.widthdrawlHistoryScrollView.addChild(instance);
                }
            }
        });
    },

    onWidthdrawlHistoryBack: function() {
        this.widthdrawlHistory.active = false;
    },

});
