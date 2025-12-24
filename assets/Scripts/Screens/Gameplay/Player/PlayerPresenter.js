/**
 * @namespace Screens.Gameplay.Player
 */

var card = require('CardTypes').Card;
var suit = require('CardTypes').Suit;
var StickerController = require('StickerController');
var SliderTouchType = require('SliderTouch');

/**
 * @classdesc Handles player View
 * @class PlayerPresenter
 * @memberof Screens.Gameplay.Player
 */
var PlayerPresenter = cc.Class({
    extends: cc.Component,

    properties: {
        moveShower1: {
            default: null,
            type: cc.Node,
        },
        moveShower2: {
            default: null,
            type: cc.Node,
        },
        moveShower3: {
            default: null,
            type: cc.Node,
        },
        moveShower4: {
            default: null,
            type: cc.Node,
        },
        pokerPresenter: {
            default: null,
        },
        bestHandNode: {
            default: null,
            type: cc.Node,
        },
        glow: {
            default: null,
            type: cc.Node,
        },
        glowFrame: {
            default: null,
            type: cc.Node,
        },
        fillbg: {
            default: null,
            type: cc.Node,
        },
        inviteNode: {
            default: null,
            type: cc.Node,
        },
        inviteListNode: {
            default: null,
            type: cc.Node,
        },
        seatIndex: {
            default: -1,
        },
        cardHolder: {
            default: null,
            type: cc.Node,
        },
        cardHolderShow: {
            default: null,
            type: cc.Node,
        },
        cardHolderMyShow: {
            default: null,
            type: cc.Node,
        },
        cardHolderMy: {
            default: null,
            type: cc.Node,
        },
        cardHolder2: {
            default: null,
            type: cc.Node,
        },
        cardHolder3: {
            default: null,
            type: cc.Node,
        },
        cardHolder4: {
            default: null,
            type: cc.Node,
        },
        cardHolder5: {
            default: null,
            type: cc.Node,
        },
        cardHolder6: {
            default: null,
            type: cc.Node,
        },
        cardHolder2R: {
            default: null,
            type: cc.Node,
        },
        cardHolder3R: {
            default: null,
            type: cc.Node,
        },
        cardHolder4R: {
            default: null,
            type: cc.Node,
        },
        cardHolder5R: {
            default: null,
            type: cc.Node,
        },
        cardHolder6R: {
            default: null,
            type: cc.Node,
        },
        cardHolder2My: {
            default: null,
            type: cc.Node,
        },
        cardHolder3My: {
            default: null,
            type: cc.Node,
        },
        cardHolder4My: {
            default: null,
            type: cc.Node,
        },
        cardHolder5My: {
            default: null,
            type: cc.Node,
        },
        cardHolder6My: {
            default: null,
            type: cc.Node,
        },
        seatState: {
            default: "Free",
            visible: false,
        },

        sitHerePanel: {
            default: null,
            type: cc.Node,
        },
        occupiedPanel: {
            default: null,
            type: cc.Node,
        },
        avatarBtn: {
            default: null,
            type: cc.Button,
        },
        timerSprite: {
            default: null,
            type: cc.Sprite,
        },
        timerPSprite: {
            default: null,
            type: cc.Sprite,
        },

        baseSprite: {
            default: null,
            type: cc.Sprite,
        },
        selfSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
        },
        othersSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
        },
        // foldSpriteFrame:{
        //     default: null,
        //     type: cc.SpriteFrame,
        // },
        amountLabel: {
            default: null,
            type: cc.Label,
        },
        nameLabel: {
            default: null,
            type: cc.Label,
        },
        image: {
            default: null,
            type: cc.Sprite,
        },
        dealerSprite: {
            default: null,
            type: cc.Node,
        },
        dealerSprite2: {
            default: null,
            type: cc.Node,
        },
        dealerSprite3: {
            default: null,
            type: cc.Node,
        },
        playerBetLabel: {
            default: null,
            type: cc.Node,
        },

        moveDisplayTime: {
            default: -1,
            visible: false,
        },
        currentTurnDisplayTime: {
            default: -1,
            visible: false,
        },
        turnDisplayTime: {
            default: 0.5,
            visible: false,
        },
        playerData: {
            default: null,
            visible: false,
        },
        timer: {
            default: null,
            visible: false,
        },
        sysTime: {
            default: null,
            visible: false,
        },
        playerColor: {
            default: new cc.Color,
        },
        nonPlayerColor: {
            default: new cc.Color,
        },
        foldView: {
            default: null,
            type: cc.Node,
        },
        nameLblColor: {
            default: new cc.Color,
            visible: false
        },
        foldNameLblColor: {
            default: new cc.Color,
            visible: false
        },
        amountLblColor: {
            default: new cc.Color,
            visible: false
        },
        foldAmountLblColor: {
            default: new cc.Color,
            visible: false
        },
        reservedPanel: {
            default: null,
            type: cc.Node,
        },
        noteColorBase: {
            default: null,
            type: cc.Node,
        },
        noteButton: {
            default: null,
            type: cc.Node,
        },
        chatHead: {
            default: null,
            type: cc.Node,
        },
        chatLbl: {
            default: null,
            type: cc.RichText,
        },
        emptyPanel: {
            default: null,
            type: cc.Node
        },
        normalTimerLbl: {
            default: null,
            type: cc.Label,
        },

        selfNameLblColor: new cc.Color,
        selfFoldNameLblColor: new cc.Color,
        selfAmountLblColor: new cc.Color,
        selfFoldAmountLblColor: new cc.Color,
        othersNameLblColor: new cc.Color,
        othersFoldNameLblColor: new cc.Color,
        othersAmountLblColor: new cc.Color,
        othersFoldAmountLblColor: new cc.Color,
        gridRefreshedRef: null,
        imageLoadedRef: null,
        extra: {
            type: cc.Node,
            default: null,
        },
        timeBank: {
            type: cc.Node,
            default: null,
        },
        timeBankV: {
            default: null,
            type: SliderTouchType,
        },

        winnerBanner: {
            default: null,
            type: cc.Node,
        },
        imgHider: {
            default: null,
            type: cc.Node
        },
        winningNode: {
            default: null,
            type: cc.Node
        },
        moveShower: {
            default: null,
            type: cc.Node
        },
        grayer: {
            default: null,
            type: cc.Node
        },
        grayer2: {
            default: null,
            type: cc.Node
        },
        grayer3: {
            default: null,
            type: cc.Node
        },
        bestHands1: {
            default: null,
            type: cc.SpriteFrame,
        },
        bestHands2: {
            default: null,
            type: cc.SpriteFrame,
        },
        timersToKill: []
    },

    onLoad: function () {

        this.normalScale = 1;
        this.grayScale = 1;
        /**
         * Cards Size offset and position to put cards on player Hands
         */
        this.CardsFirstPositionOffset = 57; //johnny//75; // Hand Card First position offset, With old cards it was "60"
        this.CardsSecondPositionOffset = 130; // Hand Card Second position offset, With old cards it was "130"
        if (GameManager.isMobile) {
            // this.CardsFirstPositionOffset = 62; // Hand Card First position offset, With old cards it was "60"
        }

        // this.oldPlayerBetLabelPosition = this.playerBetLabel.parent.position;
        // this.selfPlayerBetLabelPosition = cc.v2(this.oldPlayerBetLabelPosition.x - 100, this.oldPlayerBetLabelPosition.y - 100);

        this.gridRefreshedRef = this.gridRefreshed.bind(this);
        this.imageLoadedRef = this.imageLoaded.bind(this);
        GameScreen.node.on("grid-refreshed", this.gridRefreshedRef);
        GameManager.on("image-loaded", this.imageLoadedRef);
        GameManager.on("updatePlayerImageInTable", this.updatePlayerImageInTable.bind(this));
        GameManager.on("switchBB", this.switchBBNow.bind(this));
        this.clearPlayerCards();
        // this.registerHoverEvents();
        this.isPlaying = false;
        this.displayDefaultTimer = this.resetBetTimer = 0;

        this.winningNode.children[1].getComponent(cc.Animation).on('stop', (event) => {
            // console.log("1st stop", event);
            if (cc.isValid(this.winningNode)) {
                this.winningNode.children[1].active = false;
                // this.winningNode.children[2].getComponent(cc.Animation).play();
                this.winningNode.children[3].active = true;
                this.winningNode.children[3].getComponent(cc.Animation).play();
            }
        }, this);

        this.winningNode.children[3].getComponent(cc.Animation).on('stop', (event) => {
            // console.log("crown stop", event);
            if (cc.isValid(this.winningNode)) {
                this.winningNode.children[2].active = this.winningNode.children[4].active = true;

                this.winningNode.children[2].getComponent(cc.Animation).play();
                this.winningNode.children[4].getComponent(cc.Animation).play();
            }
        }, this);


        // if (GameManager.user.category == "GOLD") {
        //     this.playerBetLabel.parent.getChildByName("gold").active = true;
        //     this.playerBetLabel.parent.getChildByName("diamond").active = false;
        // }
        // else {
        //     this.playerBetLabel.parent.getChildByName("gold").active = false;
        //     this.playerBetLabel.parent.getChildByName("diamond").active = true;
        // }
        this.playerBetLabel.parent.getChildByName("gold").active = true;
    },

    /**
     * @description Registers different mouse and touch events
     * @method registerHoverEvents
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    registerHoverEvents: function () {
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function (event) {
            if (cc.isValid(this.node)) {
                this.onMouse_Enter();
            }
        }.bind(this), this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
            if (cc.isValid(this.node))
                this.onMouse_Leave();
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (cc.isValid(this.node) && !this.pokerPresenter.isObserver()) {
                this.onMouse_Enter();
                // this.showMobileNotePopup();
                // this.showStickerBuddiesPopup(false);
            }
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (cc.isValid(this.node))
                this.onMouse_Leave();
        }.bind(this), this);
        this.noteButton.children[2].on(cc.Node.EventType.MOUSE_ENTER, function (event) {
            this.noteButton.children[0].active = true;
        }.bind(this), this);
        this.noteButton.children[2].on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
            this.noteButton.children[0].active = false;
        }.bind(this), this);
        this.noteButton.children[2].on(cc.Node.EventType.MOUSE_UP, function (event) {
            this.onClickAvatarBtn();
        }.bind(this), this);

        if(cc.sys.isMobile) {
            this.noteButton.children[2].on(cc.Node.EventType.TOUCH_END, function (event) {
                this.onClickAvatarBtn();
            }.bind(this), this); 
        }       

    },

    /**
     * @description Loads the image choosen by user
     * @method imageLoaded
     * @param {user} user
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    imageLoaded: function (user) {


        if (this.playerData != null && this.playerData.playerId == user.playerId) {
            if (!user.urlImg) {
                var randomIndex = Math.round(Math.random() * GameManager.avatarImages.length - 1);
                this.image.spriteFrame = GameManager.avatarImages[randomIndex];
            }
            else {
                this.image.spriteFrame = user.urlImg;
                // cc.find('PlayerImageMask/New Node/PlayerImage', this.inviteNode).getComponent(cc.Sprite).spriteFrame = user.urlImg;
            }
            // this.image.node.parent.parent.getChildByName("Profile_frame").getComponent(cc.Sprite).enabled = true;
            // if (this.image.node.parent.parent.getChildByName("Profile_frame_Glow")) {
            //     this.image.node.parent.parent.getChildByName("Profile_frame_Glow").active = false;
            // }
        }
    },

    /**
     * @description Scales the view when player joins tables
     * @method gridRefreshed
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    gridRefreshed: function () {
        if (GameManager.activeTableCount == 1 || GameScreen.viewType == 2) {
            if (K.PORTRAIT) {
            }
            else {
                this.node.scale = 1;
            }
            if (this.pokerPresenter.checkForSelfTurn(this.playerId)) {
                GameScreen.gameModel.emit("K.PokerEvents.onTurnInOtherRoom", this.pokerPresenter.model, true);
            }
        } else {
            if (K.PORTRAIT) {
            }
            else {
                // this.node.scale = 1.2;
            }
        }
    },

    /**
     * @description  Reset Seat UI
     * @method resetSeat
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    resetSeat: function () {
        if (!!this.chatHead.active) {
            this.chatHead.active = false;
        }
        this.resetTimer();
        this.activatePlayerBet(false);
        this.seatState = K.SeatState.Free;
        this.dealerSprite.active = false;
        this.dealerSprite2.active = false;
        this.dealerSprite3.active = false;
        this.bestHandNode.active = false;


        this.playerBetLabel.parent.scale = 1.6 / this.playerBetLabel.parent.parent.parent.parent.scale;

        // this.node.getChildByName("BB").active = false;
        // this.node.getChildByName("SB").active = false;
        // this.node.getChildByName("BB2").active = false;
        // this.node.getChildByName("SB2").active = false;

        this.timeBank.active = false;
        this.extra.active = false;
        if (this.isSelf() && this.playerData.state != K.PlayerState.Waiting) {
            this.timeBank.active = true;
        }
        this.timeBank.children[1].getComponent(cc.Label).string = "";
        this.image.node.active = true;
        this.timerPSprite.node.active = this.timerSprite.node.parent.active = false;
        // if (K.PORTRAIT) {
        //     this.timerPSprite.node.active = true;
        // }
        this.clearPlayerCards();
        this.setSelfPlayerView(false);
        this.unscheduleAllCallbacks();

        this.image.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
        this.node.scale = this.normalScale;
        this.timeBank.scale = 0.42;
        this.moveShower.scale = 0;
    },

    /**
     * @description  Sets all data and activates seat UI
     * @method enablePlayerView
     * @param {String} selfPlayerId
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    enablePlayerView: function (selfPlayerId, revealForSelfAtStartGame = true) {
        this.resetSeat();

        if (this.node.parent.x < 0 || this.isSelf()) {

            // this.node.getChildByName("BB2").active = false;
            // this.node.getChildByName("SB2").active = false;

            // this.node.getChildByName("BB").active = true;
            // this.node.getChildByName("SB").active = true;

            this.node.getChildByName("BB").x = 75.751;
            this.node.getChildByName("SB").x = 75.751;

            // this.node.getChildByName("BB2").x = 55.751;
            // this.node.getChildByName("SB2").x = 55.751;

            // this.moveShower.x = -71.298;
        }
        else {
            // this.node.getChildByName("BB").x = -58.46;
            // this.node.getChildByName("SB").x = -58.46;

            // this.node.getChildByName("BB2").x = -58.46;
            // this.node.getChildByName("SB2").x = -58.46;

            // this.node.getChildByName("BB2").active = true;
            // this.node.getChildByName("SB2").active = true;

            // this.node.getChildByName("BB").active = false;
            // this.node.getChildByName("SB").active = false;

            this.node.getChildByName("BB").x = -75.751;
            this.node.getChildByName("SB").x = -75.751;


            // this.moveShower.x = 71.298;
        }

        if (this.isSelf()) {
            this.moveShower.x = this.moveShower1.x;
            this.moveShower.y = this.moveShower1.y;
            // this.moveShower.anchorX = this.moveShower1.anchorX;
        }
        else {
            if (this.node.parent.x == 0) {
                this.moveShower.x = this.moveShower4.x;
                this.moveShower.y = this.moveShower4.y;
                // this.moveShower.anchorX = this.moveShower4.anchorX;
            }
            else {
                if (this.node.parent.x < 0) {
                    this.moveShower.x = this.moveShower2.x;
                    this.moveShower.y = this.moveShower2.y;
                    // this.moveShower.anchorX = this.moveShower2.anchorX;
                }
                else {
                    this.moveShower.x = this.moveShower3.x;
                    this.moveShower.y = this.moveShower3.y;
                    // this.moveShower.anchorX = this.moveShower3.anchorX;
                }
            }
        }

        // set image, name, chips
        // console.error(1, this.playerData.chips)
        this.amountLabel.string = GameManager.convertChips(this.playerData.chips);
        this.updateBB();
        this.nameLabel.string = (this.playerData.playerName.length > 8) ? this.playerData.playerName.substring(0, 8) + ".." : this.playerData.playerName;
        this.sitHerePanel.active = false;
        this.emptyPanel.active = false;
        this.occupiedPanel.active = true;
        this.onStateChange();
        this.seatState = K.SeatState.Occupied;
        // console.log("trb", this.playerData.totalRoundBet);
        // if bet value !== 0 open bet
        if (this.playerData.totalRoundBet !== 0) {
            this.displayBet(this.playerData.totalRoundBet.roundOff(2));
        }
        var self = (selfPlayerId === this.playerData.playerId);
        if (self) {
            this.avatarBtn.interactable = false;
            // this.emojiBtn.node.active = true;
            // this.addFriendBtn.node.active = false;

            this.updateTimeBank2(this.playerData.timeBankSec);
        } else {
            // this.avatarBtn.interactable = true;
            // this.emojiBtn.node.active = true && !this.reservedPanel.active;
            console.log('set EMOJIN ENABLE enablePlayerView')
            // this.addFriendBtn.node.active = false;            
        }
        this.setSelfPlayerView(self, revealForSelfAtStartGame);
        this.resetLblColor();
        this.displayNote(this.playerData.playerId);

        if (this.playerData.state == K.PlayerState.Playing && this.playerData.lastMove != "") {
            this.disPlayMoveUtil(this.playerData.playerName, this.playerData.lastMove);
        }
    },

    /**
     * @description Displays self or other players view on table
     * @method setSelfPlayerView
     * @param {bool} state if true sets my player's view otherwise sets other player's view
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    setSelfPlayerView: function (state, revealForSelfAtStartGame) {
        // console.log(GameManager.user.urlImg);
        if (this.playerData != null) {
            // console.log(this.playerData.urlImg)
        }
        this.gridRefreshed();
        if (state) {
            // change bg, scale, label 
            // this.node.scale = 1.2;
            // this.baseSprite.spriteFrame = this.selfSpriteFrame; //27aug2018
            // this.nameLblColor = this.selfNameLblColor;//27aug2018
            // this.foldNameLblColor = this.selfFoldNameLblColor;//27aug2018
            // this.amountLblColor = this.selfAmountLblColor;//27aug2018
            // this.foldAmountLblColor = this.selfFoldAmountLblColor;//27aug2018
            this.image.spriteFrame = GameManager.user.urlImg;
            if (this.playerData.state === K.PlayerState.Playing) {
                if (revealForSelfAtStartGame) {
                    this.revealCards(revealForSelfAtStartGame);
                }
                if (this.playerData.lastMove == "FOLD") {
                    this.scheduleOnce(function () {
                        // this.resetCards(false);
                    }, 0.1);
                }
            }

        } else {
            // reset bg, scale label color
            // this.node.scale = 1.0;
            // this.baseSprite.spriteFrame = this.othersSpriteFrame;//27aug2018
            // this.nameLblColor = this.othersNameLblColor;//27aug2018
            // this.foldNameLblColor = this.othersFoldNameLblColor;//27aug2018
            // this.amountLblColor = this.othersAmountLblColor;//27aug2018
            // this.foldAmountLblColor = this.othersFoldAmountLblColor;//27aug2018
            if (this.playerData != null) {
                if (!this.playerData.urlImg) {
                    // var randomIndex = Math.round(Math.random() * GameManager.avatarImages.length - 1);
                    // this.image.spriteFrame = GameManager.avatarImages[0];
                    this.image.spriteFrame = GameManager.user.urlImg;
                    if (this.image2) {
                        this.image2.spriteFrame = GameManager.user.urlImg;
                    }
                }
                else {
                    this.image.spriteFrame = this.playerData.urlImg;
                    if (this.image2) {
                        this.image2.spriteFrame = this.playerData.urlImg;
                    }
                }
            }
        }
    },

    /**
     * @description Displays player bet
     * @method displayBet
     * @param {number} bet
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    displayBet: function (bet) {
        // console.trace("DISPLAY BET AMUNT ", bet);
        //   console.log("DISPLAY BET AMUNT ",bet);
        if (bet < 0) {
            console.warn("bet", bet);
        }

        this.playerBetLabel.getComponent(cc.Label).string = GameManager.convertChips(bet);
        this.playerBetLabel.getComponent(cc.Label).__string = bet;
        this.updateBB();
        this.activatePlayerBet(true);

        this.playerBetLabel.children[0].getComponent('PokerChipsView').generateChips(bet);
    },

    /**
     * @description Sets player's bet amount label
     * @method setBetPosition
     * @param {Vec2} position 2D Vector
     * @memberof creens.Gameplay.Player.PlayerPresenter#
     */
    setBetPosition: function (position) {
        // console.log("PP setBetPosition called ",position);
        this.playerBetLabel.parent.setPosition(position);
    },

    /**
     * @description Sets dealer button on table
     * @method setDealerPosition
     * @param {Vec2} position 2D Vector
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    setDealerPosition: function (position) {
        // if (K.PORTRAIT) {
        //     return;
        // }
        this.dealerSprite.setPosition(position);
    },

    /**
     * @description Reset player turn timer
     * @method resetTimer
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    resetTimer: function () {
        // this.currentTurnDisplayTime = -1;
        this.timerSprite.fillRange = 0;
        if (K.PORTRAIT) {
            // this.timerPSprite.fillRange = 0;
            // this.timerPSprite.node.children[0].active = false;
        }
        // this.timerSprite.node.color = this.nonPlayerColor;//27aug2018
        this.timeBank.active = false;
        this.extra.active = false;
        if (this.isSelf() && this.playerData.state != K.PlayerState.Waiting) {
            this.timeBank.active = true;
        }
        // this.timeBank.children[1].getComponent(cc.Label).string = "";
        this.image.node.active = true;
        this.timerPSprite.node.active = this.timerSprite.node.parent.active = false;
        // if (K.PORTRAIT) {
        //     this.timerPSprite.node.active = true;
        // }
        // if (this.timer !== null) {
        //     clearInterval(this.timer);
        //     this.timer = null;
        this.imgHider.active = false;
        this.normalTimerLbl.string = "";
        this.normalTimerLbl.node.active = false;

        if (K.PORTRAIT) {
            this.normalTimerLbl.node.parent.active = false;
            this.normalTimerLbl.node.parent.children[0].active = false;
        }
        // }
    },

    /**
     * @description Displays notes applied on other player
     * @method displayNote
     * @param {String} playerId Player Id of the player
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    displayNote: function (playerId) {
        console.log(!!this.playerData && !!this.playerData.noteColor, this.playerData)
        if (!!this.playerData && !!this.playerData.noteColor) {
            this.noteColorBase.active = true;
            this.noteButton.active = true;
            this.noteButton.children[0].active = false;
            this.noteButton.children[0].children[1].children[0].children[0].getComponent(cc.RichText).string = "<color=#000000>" + this.playerData.noteText + "</c>";
            var rgbColor = cc.Color.BLUE;
            if (this.playerData.noteColor.r)
                var rgbColor = new cc.Color(this.playerData.noteColor.r, this.playerData.noteColor.g, this.playerData.noteColor.b);
            this.noteColorBase.color = new cc.Color(rgbColor);
            this.noteButton.color = new cc.Color(rgbColor);
            this.noteColorBase.children[0].color = new cc.Color(rgbColor);


            if (!this.playerData.noteText) {
                this.noteButton.active = false;
            }

            if (rgbColor.r == 255 && rgbColor.g == 255 && rgbColor.b == 255) {
                this.noteColorBase.active = false;
            }
        } else {
            this.noteColorBase.active = false;
            this.noteButton.active = false;
            this.noteButton.children[0].active = false;
        }
    },

    /**
     * @description Sets the Label Color
     * @method resetLblColor
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    resetLblColor: function () {
        // this.foldView.active = false;
        // this.nameLabel.node.color = this.nameLblColor;//27aug2018
        // this.amountLabel.node.color = this.amountLblColor;//27aug2018
    },

    /**
     * @description Changes the Label Colors
     * @method changeLblColor
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    changeLblColor: function () {
        // this.foldView.active = true;
        // this.nameLabel.node.color = this.foldNameLblColor; //27aug2018
        // this.amountLabel.node.color = this.foldAmountLblColor; //27aug2018
    },

    /**
     * @description Resets timer on when round completes
     * @method activatePlayerBet
     * @param {bool} flag -active/deactive playerBetLabel
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    activatePlayerBet: function (flag, animateToCenter) {
        // console.log("activate Player bet called...")
        if (animateToCenter) {
            let initPos = this.playerBetLabel.parent.getPosition();
            // console.log("POsition to movde " + this.pokerPresenter.potAmount[0].parent.getPosition());
            let worldPos = this.pokerPresenter.potAmount[0].parent.parent.convertToWorldSpaceAR(this.pokerPresenter.potAmount[0].parent.getPosition());
            // console.log("POsition to movde WP ", worldPos);
            let finalPos = this.playerBetLabel.parent.parent.convertToNodeSpaceAR(worldPos);
            // console.log("POsition to movde FINAL", finalPos);

            let func = cc.callFunc(() => {
                this.playerBetLabel.parent.active = flag;

                this.playerBetLabel.parent.setPosition(initPos);
                this.playerBetLabel.children[0].getComponent('PokerChipsView').destroyChips();

            });
            let moveToCenter = cc.moveTo(0.5, finalPos).easing(cc.easeCircleActionInOut());

            this.playerBetLabel.parent.runAction(cc.sequence(moveToCenter, func));


            this.resetBetTimer = setTimeout(function () {
                if (cc.isValid(this.node)) {
                    this.playerBetLabel.parent.active = flag;
                    this.playerBetLabel.parent.stopAllActions();
                    this.playerBetLabel.parent.setPosition(initPos);
                }
                this.playerBetLabel.children[0].getComponent('PokerChipsView').destroyChips();
            }.bind(this), 530);
            // setTimeout(function () {
            //     console.error(this.playerBetLabel.parent.getNumberOfRunningActions());
            // }.bind(this), 750);
        } else {
            // resets at each round end
            this.playerBetLabel.parent.active = flag;
            if (!flag)
                this.playerBetLabel.children[0].getComponent('PokerChipsView').destroyChips();
        }

    },

    /**
     * @description View handling after game is over
     * @method gameOver
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    gameOver: function () {
        // px?
        this.amountLabel.node.stopAllActions();
        this.resetTimer();
        // this.clearPlayerCards();
        // this.revealCards();
        this.timersToKill.push(setTimeout(function () {
        // setTimeout(function () {
            if (cc.isValid(this.node)) {
                if (!!this.playerData && this.amountLabel !== null && this.amountLabel !== undefined) {
                    //this.setDealer(false);


                    // this.amountLabel.string = Math.floor(this.playerData.chips);
                    this.activatePlayerBet(false);
                }
            }
        }.bind(this), 550));
        // setTimeout(function()
        // {
        //     this.clearPlayerCards();
        // }.bind(this), 5000);

        this.node.getChildByName("BB").active = false;
        this.node.getChildByName("SB").active = false;
        this.node.getChildByName("BB2").active = false;
        this.node.getChildByName("SB2").active = false;
    },

    /**
     * @description Displays player blind
     * @method displayBlind
     * @param {Number} amount
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    displayBlind: function (amount) {
        // update chips
        // set bet amount
        // turn on pot parent node
        this.amountLabel.string = GameManager.convertChips(this.playerData.chips);
        this.updateBB();
        this.displayBet(amount.roundOff(2));
    },

    /**
     * @description Sets dealer sprite
     * @method setDealer
     * @param {bool} state
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    setDealer: function (state) {
        // Deactivate prev. dealerBtn
        // activate curr. dealerBtn
        // if (this.playerData) {
        this.dealerSprite.active = state;
        this.dealerSprite2.active = false;
        this.dealerSprite3.active = false;

        if (state == true) {
            // console.trace("setDealer", this.playerData);
        }
        // }


        // if (state) {
        //     if (this.node.parent.x < 0) {
        //         this.dealerSprite.active = false;
        //         this.dealerSprite2.active = true;
        //         this.dealerSprite3.active = false;
        //     }
        //     else if (this.node.parent.x > 0) {
        //         this.dealerSprite.active = true;
        //         this.dealerSprite2.active = false;
        //         this.dealerSprite3.active = false;
        //     }
        //     else {
        //         if (this.node.parent.y < 0) {
        //             this.dealerSprite.active = true;
        //             this.dealerSprite2.active = false;
        //             this.dealerSprite3.active = false;
        //         }
        //         else if (this.node.parent.y > 0) {
        //             this.dealerSprite.active = false;
        //             this.dealerSprite2.active = false;
        //             this.dealerSprite3.active = true;
        //         }
        //     }
        // }

        if (!this.playerData) {
            this.dealerSprite.active = false;
            this.dealerSprite2.active = false;
            this.dealerSprite3.active = false;
        }
    },

    /**
     * @description Clears seat on player leave
     * @method disablePlayerView
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    disablePlayerView: function () {
        this.resetTimer();
        this.sitHerePanel.active = true;
        this.setDealer(false);
        this.bestHandNode.active = false;
        this.node.getChildByName("BB").active = false;
        this.node.getChildByName("SB").active = false;
        this.node.getChildByName("BB2").active = false;
        this.node.getChildByName("SB2").active = false;
        // this.sitHerePanel.getComponent(cc.Button).interactable = true;
        // this.sitHerePanel.children[0].children[1].active = true;
        // this.sitHerePanel.children[0].children[1].getComponent(cc.Label).string = "Sit Here";
        // this.sitHerePanel.children[0].children[1].getComponent(cc.Label).fontSize = 45;
        // this.sitHerePanel.children[1].children[1].active = true;
        this.reservedPanel.active = false;
        this.occupiedPanel.active = false;
        this.emptyPanel.active = false;
        this.seatState = K.SeatState.Free;
        this.noteColorBase.active = false;
        this.noteButton.active = false;
        this.noteButton.children[0].active = false;
        // this.emojiBtn.node.active = false;
        this.avatarBtn.node.active = false;
        console.log('RESEETTTT WWHEN LEAVEEEEEE disablePlayerView');
        this.playerData = null;
    },

    /**
     * @description Hides the seat UI
     * @method disableView
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    disableView: function () {
        this.bestHandNode.active = false;
        this.node.getChildByName("BB").active = false;
        this.node.getChildByName("SB").active = false;
        this.node.getChildByName("BB2").active = false;
        this.node.getChildByName("SB2").active = false;
        this.emptyPanel.active = true;
        this.sitHerePanel.active = false;
        // if (this.pokerPresenter.isTournament()) {
            this.emptyPanel.children[1].getComponent(cc.Label).string = "Empty";
        // }
        // else {
        //     this.emptyPanel.children[1].getComponent(cc.Label).string = "Invite";   
        // }
        this.occupiedPanel.active = false;
        this.reservedPanel.active = false;
        this.seatState = K.SeatState.Hidden;
        this.noteColorBase.active = false;
        this.noteButton.active = false;
        this.noteButton.children[0].active = false;
        // this.emojiBtn.node.active = false;
        this.avatarBtn.node.active = false;
        this.setDealer(false);
        console.log('RESEETTTT WWHEN LEAVEEEEEE disableView');
        this.playerData = null;        
    },

    /**
     * @description Handles note button in chat window
     * @method onNoteBtn
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    onNoteBtn: function () {
        // this.noteButton.children[0].active = !this.noteButton.children[0].active;
        this.showPlayerInfo();
    },

    /**
     * @description Utility method for displayMove 
     * @method displayMoveUtil
     * @param {String} playerName Name of the player
     * @param {String} move Move of the player
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    disPlayMoveUtil: function (playerName, move) {
        // setTimeout(function () {
        //     this.nameLabel.string = playerName + " " + move;
        // }.bind(this), 1);
        // this.nameLabel.string = playerName;
        // this.moveShower.setScale(0, 0);
        this.moveShower.stopAllActions();
        this.moveShower.active = true;
        let moveText = '';
        switch(move) {
            case "FOLD":
                moveText = LocalizedManager.t('TXT_FOLD');
                break;
            case "ALLIN":
                moveText = LocalizedManager.t('TXT_ALL_IN');
                break;
            case "CHECK":
                moveText = LocalizedManager.t('TXT_CHECK');
                break;
            case "RAISE":
                moveText = LocalizedManager.t('TXT_RAISE');
                break;
            case "BET":
                moveText = LocalizedManager.t('TXT_BET');
                break;                                                                                        
            case "CALL":
                moveText = LocalizedManager.t('TXT_CALL');
                break;                                                                                        

        }

        if (K.PORTRAIT) {

            switch(move) {
                case "FOLD":
                    // this.moveShower.children[0].color = new cc.Color().fromHEX("#B60838");
                    break;
                case "ALLIN":
                    // this.moveShower.children[0].color = new cc.Color().fromHEX("#B60838");
                    break;
                case "CHECK":
                    // this.moveShower.children[0].color = new cc.Color().fromHEX("#F96D0F");
                    break;
                case "RAISE":
                    // this.moveShower.children[0].color = new cc.Color().fromHEX("#10E496");
                    break;
                case "BET":
                    // this.moveShower.children[0].color = new cc.Color().fromHEX("#10E496");
                    break;                                                                                        
                case "CALL":
                    // this.moveShower.children[0].color = new cc.Color().fromHEX("#10E496");
                    break;                                                                                        

            }
        }

        this.moveShower.children.forEach(function (element) {
            element.active = false;
        }, this);

        // this.moveShower.children[0].children[0].getComponent(cc.Label).string = moveText;
        this.moveShower.getChildByName(move).active = true;
        this.moveShower.scale = (1 / this.moveShower.parent.parent.scale / this.moveShower.parent.parent.parent.scale) * 1.45;
        // this.moveShower.runAction(cc.sequence(cc.scaleTo(0.25, 1, 1), cc.delayTime(1.3), cc.scaleTo(0.25, 0, 0)));
        // this.timersToKill.push(setTimeout(() => {
        //     // setTimeout(() => {
        //     if (cc.isValid(this.moveShower)) {
        //         this.moveShower.stopAllActions();
        //         // this.moveShower.children[0].children[0].getComponent(cc.Label).string = "";
        //         this.moveShower.active = false;
        //     }
        // }, 2000));
    },
    /**
     * @description Called from PokerPresenter, when this player makes the turn
     * @method displayMove
     * @param {String} move Player's Move while playing game
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    displayMove: function (move) {
        this.amountLabel.string = GameManager.convertChips(this.playerData.chips);
        this.updateBB();
        // this.nameLabel.string = move;
        this.disPlayMoveUtil(this.playerData.playerName, move); //sitout handle

        if (move !== "FOLD" && move !== "ALLIN") {
            if (this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
                if (move == "CALL") {
                    this.pokerPresenter.playAudio(K.Sounds.playerCall);
                } else if (move == "CHECK") {
                    this.pokerPresenter.playAudio(K.Sounds.playerCheck);
                } else if (move == "RAISE") {
                    this.pokerPresenter.playAudio(K.Sounds.playerRaise);
                } else if (move == "BET") {
                    this.pokerPresenter.playAudio(K.Sounds.playerBet);
                }
            }
            this.displayDefault();

            // this.timerSprite.node.active = false;
        } else {
            if (move === "FOLD") {
                if (this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
                    this.pokerPresenter.playAudio(K.Sounds.playerFold);
                    // this.hideSelf();
                    this.graySelf();
                } else {
                    //this.pokerPresenter.playAudio(K.Sounds.otherFold);
                }
                this.enableFoldView();


            } else if (move === "ALLIN") {
                if (this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
                    this.pokerPresenter.playAudio(K.Sounds.playerAllIn);
                }
                this.enableAllInView();

            }
        }

        //Rajat(after decimal value integration in gameplay)
        let totalRoundBet = 0;
        if (this.playerData.totalRoundBet < 1) {
            totalRoundBet = Math.ceil(this.playerData.totalRoundBet);
        } else {
            if (this.pokerPresenter.isTournament()) {
            totalRoundBet = Math.floor(this.playerData.totalRoundBet);
            }
            else {
            totalRoundBet = Math.floor(this.playerData.totalRoundBet);
            }
        }

        // if (Math.floor(this.playerData.totalRoundBet) <= 0) {
        //     // update bet amount
        //     //this.displayBet(move);
        //     if (move === "CALL" && (Math.floor(this.playerData.totalRoundBet) == 0) || move === "ALLIN" && (Math.floor(this.playerData.totalRoundBet) == 0) && (this.playerData.totalRoundLastBet != undefined)) {
        //         this.displayBet(this.playerData.totalRoundLastBet.roundOff(2));
        //     }
        // } else {
        //     this.displayBet(this.playerData.totalRoundBet.roundOff(2));
        // }

        if (totalRoundBet <= 0) {
            // update bet amount
            //this.displayBet(move);
            if (move === "CALL" && (totalRoundBet == 0) || move === "ALLIN" && (totalRoundBet == 0) && (this.playerData.totalRoundLastBet != undefined)) {
                this.displayBet(this.playerData.totalRoundLastBet.roundOff(2));
            }
        } else {
            this.displayBet(this.playerData.totalRoundBet.roundOff(2));
        }

        // reset timer
        this.resetTimer();
    },

    /**
     * @description Enables fold view
     * @method enableFoldView
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    enableFoldView: function () {
        //gray
        // this.grayer.active = true;
        // console.error("ENABLE FOLD CALLED ", this.nameLabel.string, this.amountLabel.string)
        if (!!this.playerData) {
            this.nameLabel.string = LocalizedManager.t('TXT_FOLD');            
            if (this.playerData != null && this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
                this.amountLabel.string = GameManager.convertChips(this.playerData.chips);
                this.updateBB();
            } else {
                this.amountLabel.string = (this.playerData.playerName.length > 8) ? this.playerData.playerName.substring(0, 8) + ".." : this.playerData.playerName;
            }
        }

        this.changeLblColor();
        
        if (this.playerData != null && !this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
            this.cardHolder.children.forEach(function (element) {
                // element.opacity = 150;

            }, this);

            // if (K.PORTRAIT && this.cardHolderMy) {
            //     this.cardHolderMy.children.forEach(function (element) {
            //         // element.opacity = 150;
            //         element.getComponent("Card").gray();
            //     }, this);
            // }
        }

        if (this.playerData != null && this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
            this.pokerPresenter.model.emit("FoldEvent");
            // if (K.PORTRAIT && this.cardHolderMy) {
            //     this.cardHolderMy.children.forEach(function (element) {
            //         // element.opacity = 150;
            //         element.getComponent("Card").gray();
            //     }, this);
            // }
        }

        this.cardHolderMy.children.forEach(function (element) {
            // element.opacity = 150;
            element.getComponent("Card").gray();
        }, this);

        this.cardHolder.children.forEach(function (element) {
            // element.opacity = 150;
            element.getComponent("Card").gray();
        }, this);



        // this.clearPlayerCards();

        this.image.setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
        this.timeBank.active = false;
        this.node.scale = this.grayScale;
        this.timeBank.scale = 0.42 / this.grayScale;
    },

    /**
     * @description Enables fold view
     * @method displayDefault
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    displayDefault: function () {
        if (this.pokerPresenter.model.isVideo) {
            // console.log(K.moveDisplayTime / (this.pokerPresenter.model.videoSpeed))
            this.displayDefaultTimer = setTimeout(function () {
                if (cc.isValid(this.node)) {

                    if (!!this.playerData) {
                        this.onStateChange();
                    }
                }
            }.bind(this), K.moveDisplayTime / (this.pokerPresenter.model.videoSpeed));
        } else {
            this.displayDefaultTimer = setTimeout(function () {
                if (cc.isValid(this.node)) {

                    if (!!this.playerData) {
                        this.onStateChange();
                    }
                }
            }.bind(this), K.moveDisplayTime);
        }

    },

    /**
     * @description Called at the time  when this player leaves the table to clear pending timers
     * @method clearTimers
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    clearTimers: function () {
        // console.log("shishir kick pl presenter done");

        clearTimeout(this.displayDefaultTimer);
        clearTimeout(this.resetBetTimer);

        this.timersToKill.forEach(function (element) {
            clearTimeout(element);
        }, this);
        this.timersToKill = [];
    },
    /**
     * @description On Mouse Enter Callback
     * @method onMouse_Enter
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    onMouse_Enter: function () {
        if (this.playerData != null && this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
            if (this.playerData.lastMove === "FOLD" && this.playerData.state == K.PlayerState.Playing) {
                this.resetCards(true);
            }
        }


    },


    showMobileNotePopup() {
        if (GameScreen.isMobile && this.playerData != null && !this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
            let flag = !!this.playerData.noteColor;
            this.pokerPresenter.sureToFoldNode.parent.getChildByName("NotePopup").getComponent("MobileNotePopup").init(flag, this.playerData.noteColor, this.playerData.noteText, this.playerData.playerId, this.pokerPresenter);
        }
    },

    onClickEmojiBtn() {
        cc.log('onClickEmojiBtn')
        this.showStickerBuddiesPopup(true);
    },

    onClickAddFriendBtn() {
        cc.log('onClickAddFriendBtn')
        // this.clientSendAddFriendEvent();
        // this.addFriendBtn.node.active = false;
    },    

    clientSendAddFriendEvent: function() {
        let payload = {};
        const player = this.pokerPresenter.getMyPlayer();
        const opponent = this.playerData;        

        payload.playerId = GameManager.user.playerId;
        payload.friendId = opponent.playerId;
        console.log('clientSendAddFriendEvent ', payload);
        const _t = this;
        ServerCom.pomeloRequest(K.BuddyAPI.sendFriendRequest, payload, function(response){
            console.log("sendFriendRequest reponse", response);
            if(response.success) {
                _t.addFriendBtn.node.children[0].active = false;
                _t.addFriendBtn.node.children[1].active = true;
            }
            setTimeout( () => {
                _t.addFriendBtn.node.active = false;
            }, 1000)            
        }, null, 5000, false);
    },

    onClickAvatarBtn() {
        cc.log('onClickAvatarBtn')
        // if (this.addFriendBtn.node.active) {
        //     this.addFriendBtn.node.active = false;
        //     return;
        // }
        // this.addFriendBtn.node.active = true;
        // this.addFriendBtn.node.children[0].active = true;
        // this.addFriendBtn.node.children[1].active = false;
    },    

    showStickerBuddiesPopup(isShowSticker) {
        const isGameRunning = this.pokerPresenter.model.gameData.tableDetails.state === K.GameState.Running || this.pokerPresenter.model.gameData.tableDetails.state === K.GameState.GameOver;
        const player = this.pokerPresenter.getMyPlayer();
        const isPlayerPlaying = player && (player.state !== K.PlayerState.Waiting && player.state !== K.PlayerState.OnBreak);

        const opponent = this.playerData;
        // if (opponent === player) {
        //     cc.log('it me, do nothing');
        //     return;
        // }
        const opponentIdx = opponent && this.pokerPresenter.model.getPlayerById(opponent.playerId);        
        // cc.log('Sticker Pop opponent ',opponent);        
        // cc.log('Sticker Pop opponentIdx ',this.pokerPresenter.model.getPlayerById(opponent.playerId));        
        // cc.log('Sticker Pop opponentIdx 2 ',opponentIdx);        
        if( !opponent || opponentIdx == -1) {
            // if ( this.pokerPresenter.model.isPrivateTable )
            //     return;
            // const channelId = this.pokerPresenter.model.gameData.channelId;
            // this.pokerPresenter.sureToFoldNode.parent.getChildByName("BuddiesPopup").getComponent("BuddiesPopup").init(channelId);                        
            return;
        }

        if ( !isShowSticker )  {
            this.showMobileNotePopup();
            return;
        }

        const isOpponentPlaying = opponent && (opponent.state !== K.PlayerState.Waiting && opponent.state !== K.PlayerState.OnBreak);        
        // if (isPlayerPlaying && isOpponentPlaying && isGameRunning && !this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
        if (isGameRunning) {
            this.pokerPresenter.sureToFoldNode.parent.getChildByName("StickerPopup").getComponent("StickersPopup").init(this.playerData.playerId, this.pokerPresenter);            
        }
    },    

    /**
     * @description On Mouse Leave Callback
     * @method onMouse_Leave
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    onMouse_Leave: function () {
        if (this.playerData != null && this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
            if (this.playerData.lastMove === "FOLD" && this.playerData.state == K.PlayerState.Playing) {
                // this.resetCards(false);
            }
        }
    },

    /**
     * @description Enables all in view
     * @method enableAllInView
     * @memberof PlayerPresenter#
     */
    enableAllInView: function () {

        // return;
        // this.nameLabel.string = "All in";
        this.nameLabel.string = LocalizedManager.t('TXT_ALL_IN');
        this.timersToKill.push(setTimeout(function () {
        // setTimeout(function () {
            if (cc.isValid(this.node)) {

                if (!!this.playerData) {
                    if (this.nameLabel.string === LocalizedManager.t('TXT_ALL_IN'))
                        this.nameLabel.string = (this.playerData.playerName.length > 8) ? this.playerData.playerName.substring(0, 8) + ".." : this.playerData.playerName;;
                }
            }
        }.bind(this), K.moveDisplayTime));
        // setTimeout(function () {
        //     if (!!this.playerData) {
        //         this.nameLabel.string = this.playerData.playerName;
        //     }
        // }.bind(this), K.moveDisplayTime);
    },

    /**
     * @description Enables Waiting view
     * @method enableWaitingView
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    enableWaitingView: function () {
        // this.amountLabel.string = "Waiting";
        // this.nameLabel.string = LocalizedManager.t('TXT_WAITTING');
        LocalizedManager.setTextKey(this.nameLabel.node, 'TXT_WAITTING');
        if (this.playerData != null && this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
            this.amountLabel.string = GameManager.convertChips(this.playerData.chips);
            this.updateBB();
        } else {
            this.amountLabel.string = (this.playerData.playerName.length > 8) ? this.playerData.playerName.substring(0, 8) + ".." : this.playerData.playerName;
        }
        this.image.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
        this.node.scale = this.normalScale;
        this.timeBank.scale = 0.42;
        this.dealerSprite.active = false;
        this.clearPlayerCards(); // TODO: after using playercards broadcast - need to generate dummy cards for all other than self
        // this.nameLabel.string = "FOLD";
        this.moveShower.scale = 0;
    },

    /**
     * @description Enables OnBreak view
     * @method enableOnbreakView
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    enableOnbreakView: function () {
        this.grayer.active = true;

        // this.nameLabel.string = LocalizedManager.t('TXT_SITTING_OUT');
        LocalizedManager.setTextKey(this.nameLabel.node, 'TXT_SITTING_OUT');
        if (this.playerData != null && this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {

            this.amountLabel.string = GameManager.convertChips(this.playerData.chips);
            this.updateBB();
        } else {
            this.amountLabel.string = (this.playerData.playerName.length > 8) ? this.playerData.playerName.substring(0, 8) + ".." : this.playerData.playerName;;
        }
        this.changeLblColor();
        this.clearPlayerCards();
        this.moveShower.scale = 0;
    },

    enableRebuyingView: function () {
        this.nameLabel.string = "Rebuying";
        this.amountLabel.string = "0";
        this.updateBB();
        this.clearPlayerCards();
    },

    /**
     * @description Enables Disconnected view
     * @method enableDisconnectedView
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    enableDisconnectedView: function () {
        this.grayer2.active = true;
        this.nameLabel.string = LocalizedManager.t('TXT_DISCONECTED');
        if (this.playerData != null && this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
            // console.log("Ab")

            this.amountLabel.string = GameManager.convertChips(this.playerData.chips);
            this.updateBB();
        } else {
            this.amountLabel.string = (this.playerData.playerName.length > 8) ? this.playerData.playerName.substring(0, 8) + ".." : this.playerData.playerName;;
        }
        // this.clearPlayerCards();
    },

    /**
     * @description Enables Out Of Money view
     * @method enableOutOfMoneyView
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    enableOutOfMoneyView: function () {
        // this.nameLabel.string = LocalizedManager.t('TXT_SITTING_OUT');
        LocalizedManager.setTextKey(this.nameLabel.node, 'TXT_SITTING_OUT');        
        if (this.playerData != null && this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
            // console.log("Ac")

            this.amountLabel.string = GameManager.convertChips(this.playerData.chips);
            this.updateBB();
        } else {
            this.amountLabel.string = (this.playerData.playerName.length > 8) ? this.playerData.playerName.substring(0, 8) + ".." : this.playerData.playerName;;
        }
        this.activatePlayerBet(false);
        // this.clearPlayerCards();
    },

    /**
     * @description Enables Playing View
     * @method enablePlayingView
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    enablePlayingView: function () {
        this.amountLabel.node.stopAllActions();
        this.resetLblColor();
        // this.grayer.active = false;
        this.nameLabel.string = (this.playerData.playerName.length > 8) ? this.playerData.playerName.substring(0, 8) + ".." : this.playerData.playerName;
        if (this.playerData.lastMove === "FOLD") {
            this.enableFoldView();
        } else if (this.playerData.lastMove === "ALLIN") {
            this.enableAllInView();
        }
    },

    /**
     * @description Enables Reserved view
     * @method enableReservedView
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    enableReservedView: function () {
        this.reservedPanel.active = true;
        // this.emojiBtn.node.active = false;
        console.log('set EMOJIN ENABLE  OFF enableReservedView')
        this.addFriendBtn.node.active = false;
    },

    /**
     * @description Fade out cards of Other players who folded their turn
     * @method fadeOutFoldedCards
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    fadeOutFoldedCards: function () {
        var color = cc.Color.BLACK;
        // this.cardHolder.children.forEach(function (element) {
        //     element.color = color.fromHEX("#252020");
        // }, this);
    },


    /**
     * @description SetTimer Fill Color
     * @method setPlayerColor
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    setPlayerColor: function () {
        // this.timerSprite.node.color = this.playerColor;//27aug2018
    },

    /**
     * @description Called from PokerPresenter when there is turn of this player 
     * @method onTurn
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    onTurn: function (turnDisplayTime) {
        // remove all other timer listeners on pokermodel
        // add listener to tick event
        // console.log("********************* on  Turn ******************************");
        this.isTurned = false;
        this.pokerPresenter.model.off(K.PokerEvents.onTimerTick);
        this.normalTimerLbl.node.active = true;
        this.timerPSprite.node.active = this.timerSprite.node.parent.active = true;
        this.timerSprite.node.getChildByName("Dot").active = false;
        if (K.PORTRAIT) {
            this.normalTimerLbl.node.parent.active = true;
        }
        this.imgHider.active = true;
        this.pokerPresenter.model.on(K.PokerEvents.onTimerTick, function (time, elapsed) {
            if (this.extra.active) {
                this.timeBank.children[1].getComponent(cc.Label).string = Math.abs(parseInt(elapsed));

                if (this.timeBank.children[1].getComponent(cc.Label).string.length == 1) {
                    this.timeBank.children[1].getComponent(cc.Label).string = "0" + this.timeBank.children[1].getComponent(cc.Label).string;
                }

                if (K.PORTRAIT) {
                    this.timeBankV.node.parent.children[1].children[0].getComponent(cc.Label).string = Math.abs(parseInt(elapsed));
                    this.timeBankV.setSliderValue(time);
                }
            }
            this.timerSprite.fillRange = time;
            this.normalTimerLbl.node.parent.children[0].active = true;
            if (this.timerSprite.fillRange < 0) {
                this.timerSprite.fillRange = 0;
            }
            if (this.timerSprite.fillRange > 1) {
                this.timerSprite.fillRange = 1;
            }

            this.timerSprite.node.getChildByName("Dot").active = true;
            this.timerSprite.node.getChildByName("Dot").x = this.timerSprite.fillRange * 180 - 180 / 2;

            if (this.timerSprite.fillRange == 0) {
                // this.timerSprite.node.parent.active = false;
            }

            this.normalTimerLbl.string = Math.abs(parseInt(elapsed));
            // this.timerSprite.node.color = cc.Color.RED.lerp(cc.Color.GREEN, time);
            if (Math.floor(parseInt(elapsed)) == 5 && this.playerData.playerId == GameManager.user.playerId) {
                if (!this.isPlaying) {

                    this.timersToKill.push(setTimeout(function () {
                    // setTimeout(function () {
                        if (cc.isValid(this.node)) {

                            this.isPlaying = false
                        }
                    }.bind(this), 900));
                    this.pokerPresenter.playAudio(K.Sounds.endTimer);
                    this.isPlaying = true;
                }

                if (GameScreen.isMobile && !this.isTurned && !cc.sys.isBrowser) {
                    this.isTurned = true;
                    GameScreen.selectTable(this.pokerPresenter.model.gameData.channelId);
                }
            }
        }.bind(this));
        // console.log(5)
        if (this.playerData) {
            this.amountLabel.string = GameManager.convertChips(this.playerData.chips);
            this.updateBB();
            if (this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
                this.setPlayerColor();
            }
        }
    },

    /**
     * @description Enables Time Bank
     * @method enableTimeBank
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    enableTimeBank: function () {
        this.timeBank.active = true;
        if (this.isSelf()) {
            this.timeBank.opacity = 255;
        }
        else {
            this.timeBank.opacity = 0;
        }
        this.extra.active = true;
        this.timeBank.children[0].scaleY = 0;
        let act = cc.scaleTo(0.2, 1, 1);
        this.timeBank.children[0].runAction(act);
        // this.image.node.active = false;
        this.timerSprite.node.parent.active = false;
        this.timerPSprite.node.active = true;
        // if (K.PORTRAIT) {
        //     this.timerPSprite.node.active = false;
        // }
        if (K.PORTRAIT) {
            this.timeBankV.node.active = true;
            this.timeBankV.node.parent.children[1].children[0].getComponent(cc.Label).string = "";
            this.timeBankV.setSliderValue(1);
        }
    },

    /**
     * @description Sync UI on state change
     * @method onStateChange
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    onStateChange: function () { //console.trace("state", this.playerData.state);
        if (!!this.playerData.state) {
            this.reservedPanel.active = false;
            this.grayer.active = false;
            this.grayer2.active = false;
            // handle state change here
            switch (this.playerData.state) {
                case K.PlayerState.Waiting:
                    this.enableWaitingView();
                    break;
                case K.PlayerState.Playing:
                    this.enablePlayingView();
                    // console.error(6, this.playerData.chips)
                    this.amountLabel.string = GameManager.convertChips(this.playerData.chips);
                    this.updateBB();
                    break;
                case K.PlayerState.OutOfMoney:
                    this.enableOutOfMoneyView();
                    break;
                case K.PlayerState.OnBreak:
                    this.enableOnbreakView();
                    break;
                case K.PlayerState.Disconnected:
                    this.enableDisconnectedView();
                    break;
                case K.PlayerState.Left:
                    break;
                case K.PlayerState.None:
                    this.disableView();
                    break;
                case K.PlayerState.Reserved:
                    this.enableReservedView();
                    break;
                case K.PlayerState.Rebuy:
                    this.enableRebuyingView();
                    break;
                default:
                    break;
            }
        }
    },

    /**
     * @description Invoked when player clicks on sit here and passes the control to PokerPresenter
     * @method onSitHere
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    onSitHere: function () {
        this.pokerPresenter.onSitHere(this.seatIndex);
    },

    onInvite: function () {
        // if (this.pokerPresenter.isTournament()) {
        //     return;
        // }
        // this.pokerPresenter.onShowInviteFriendList();
    },

    isLeftPlayer: function (rIndex) {
        if (this.pokerPresenter.model.roomConfig.maxPlayers == 2) {
        }
        else if (this.pokerPresenter.model.roomConfig.maxPlayers == 3) {
        }
        else if (this.pokerPresenter.model.roomConfig.maxPlayers == 4) {
        }
        else if (this.pokerPresenter.model.roomConfig.maxPlayers == 5) {
        }
        else if (this.pokerPresenter.model.roomConfig.maxPlayers == 6) {
        }
        else if (this.pokerPresenter.model.roomConfig.maxPlayers == 7) {
        }
        else if (this.pokerPresenter.model.roomConfig.maxPlayers == 8) {
        }
        else if (this.pokerPresenter.model.roomConfig.maxPlayers == 9) {
        }
    },

    /**
     * @description Generates cards and passed control to poker presenter
     * @method addPlayerCards
     * @param {Card[]} card Array of cards representing player's cards
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    addPlayerCards: function (card, fromDisonnection) {
        if (card === null || card.length === 0) {
            return;
        }

        this.cardHolder.children.forEach(function (e) {
            e.active = false;
        })
        if (K.PORTRAIT && this.cardHolderMy) {
            this.cardHolderMy.children.forEach(function (e) {
                e.active = false;
            })
        }

        this.cardHolderShow.children.forEach(function (e) {
            e.active = false;
        })
        if (K.PORTRAIT && this.cardHolderMyShow) {
            this.cardHolderMyShow.children.forEach(function (e) {
                e.active = false;
            })
        }

        card.forEach(function (element, i) {
            //  var instance = cc.instantiate(this.pokerPresenter.cardPrefab);
            var instance = CardPool.generateCard(this.pokerPresenter.cardPrefab.name, function () {});
            var cardComponent = instance.getComponent('Card');
            cardComponent.init(element, this.pokerPresenter.model, true);
            cardComponent.reveal(true);

            if (this.playerData && this.playerData.lastMove == "FOLD") {
                cardComponent.gray();
            }

            if (K.PORTRAIT) {
                instance.parent = this.cardHolderMy;
                let x = 0;
                let y = 0;

                if (card.length == 2) {
                    if (this.isSelf()) {
                        if (i == 1) {
                            x = this.cardHolder2My.children[1].x;
                            y = this.cardHolder2My.children[1].y;
                            instance.setRotation(this.cardHolder2My.children[1].getRotation());
                        } 
                        else {
                            x = this.cardHolder2My.children[0].x;
                            y = this.cardHolder2My.children[0].y;
                            instance.setRotation(this.cardHolder2My.children[0].getRotation());
                        }
                    }
                    else {
                        if (i == 1) {
                            x = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[1].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[1].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[1].getRotation());
                        } else {
                            x = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[0].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[0].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[0].getRotation());
                        }
                    }
                } 
                else if (card.length == 3) {
                    if (this.isSelf()) {
                        if (i == 0) {
                            x = this.cardHolder3My.children[0].x;
                            y = this.cardHolder3My.children[0].y;
                            instance.setRotation(this.cardHolder3My.children[0].getRotation());
                        } 
                        else if (i == 1) {
                            x = this.cardHolder3My.children[1].x;
                            y = this.cardHolder3My.children[1].y;
                            instance.setRotation(this.cardHolder3My.children[1].getRotation());
                        } 
                        else {
                            x = this.cardHolder3My.children[2].x;
                            y = this.cardHolder3My.children[2].y;
                            instance.setRotation(this.cardHolder3My.children[2].getRotation());
                        }
                    }
                    else {
                        if (i == 0) {
                            x = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[0].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[0].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[0].getRotation());
                        } 
                        else if (i == 1) {
                            x = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[1].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[1].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[1].getRotation());
                        } 
                        else {
                            x = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[2].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[2].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[2].getRotation());
                        }
                    }
                } 
                else if (card.length == 4) {
                    if (this.isSelf()) {
                        if (i == 1) {
                            x = this.cardHolder4My.children[1].x;
                            y = this.cardHolder4My.children[1].y;
                            instance.setRotation(this.cardHolder4My.children[1].getRotation());
                        } 
                        else if (i == 3) {
                            x = this.cardHolder4My.children[3].x;
                            y = this.cardHolder4My.children[3].y;
                            instance.setRotation(this.cardHolder4My.children[3].getRotation());
                        }
                        else if (i == 2) {
                            x = this.cardHolder4My.children[2].x;
                            y = this.cardHolder4My.children[2].y;
                            instance.setRotation(this.cardHolder4My.children[2].getRotation());
                        }
                        else if (i == 0) {
                            x = this.cardHolder4My.children[0].x;
                            y = this.cardHolder4My.children[0].y;
                            instance.setRotation(this.cardHolder4My.children[0].getRotation());
                        }
                    }
                    else {
                        if (i == 1) {
                            x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[1].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[1].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[1].getRotation());
                        } 
                        else if (i == 3) {
                            x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[3].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[3].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[3].getRotation());
                        }
                        else if (i == 2) {
                            x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[2].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[2].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[2].getRotation());
                        }
                        else if (i == 0) {
                            x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[0].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[0].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[0].getRotation());
                        }
                    }
                }
                else if (card.length == 5) {
                    if (this.isSelf()) {
                        if (i == 1) {
                            x = this.cardHolder5My.children[1].x;
                            y = this.cardHolder5My.children[1].y;
                            instance.setRotation(this.cardHolder5My.children[1].getRotation());
                        } 
                        else if (i == 3) {
                            x = this.cardHolder5My.children[3].x;
                            y = this.cardHolder5My.children[3].y;
                            instance.setRotation(this.cardHolder5My.children[3].getRotation());
                        }
                        else if (i == 2) {
                            x = this.cardHolder5My.children[2].x;
                            y = this.cardHolder5My.children[2].y;
                            instance.setRotation(this.cardHolder5My.children[2].getRotation());
                        }
                        else if (i == 0) {
                            x = this.cardHolder5My.children[0].x;
                            y = this.cardHolder5My.children[0].y;
                            instance.setRotation(this.cardHolder5My.children[0].getRotation());
                        }
                        else if (i == 4) {
                            x = this.cardHolder5My.children[4].x;
                            y = this.cardHolder5My.children[4].y;
                            instance.setRotation(this.cardHolder5My.children[4].getRotation());
                        }
                    }
                    else {
                        if (i == 1) {
                            x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[1].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[1].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[1].getRotation());
                        } 
                        else if (i == 3) {
                            x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[3].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[3].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[3].getRotation());
                        }
                        else if (i == 2) {
                            x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[2].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[2].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[2].getRotation());
                        }
                        else if (i == 0) {
                            x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[0].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[0].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[0].getRotation());
                        }
                        else if (i == 4) {
                            x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[4].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[4].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[4].getRotation());
                        }
                    }
                }
                else if (card.length == 6) {
                    if (this.isSelf()) {
                        if (i == 1) {
                            x = this.cardHolder6My.children[1].x;
                            y = this.cardHolder6My.children[1].y;
                            instance.setRotation(this.cardHolder6My.children[1].getRotation());
                        } 
                        else if (i == 3) {
                            x = this.cardHolder6My.children[3].x;
                            y = this.cardHolder6My.children[3].y;
                            instance.setRotation(this.cardHolder6My.children[3].getRotation());
                        }
                        else if (i == 2) {
                            x = this.cardHolder6My.children[2].x;
                            y = this.cardHolder6My.children[2].y;
                            instance.setRotation(this.cardHolder6My.children[2].getRotation());
                        }
                        else if (i == 0) {
                            x = this.cardHolder6My.children[0].x;
                            y = this.cardHolder6My.children[0].y;
                            instance.setRotation(this.cardHolder6My.children[0].getRotation());
                        }
                        else if (i == 4) {
                            x = this.cardHolder6My.children[4].x;
                            y = this.cardHolder6My.children[4].y;
                            instance.setRotation(this.cardHolder6My.children[4].getRotation());
                        }
                        else if (i == 5) {
                            x = this.cardHolder6My.children[5].x;
                            y = this.cardHolder6My.children[5].y;
                            instance.setRotation(this.cardHolder6My.children[5].getRotation());
                        }
                    }
                    else {
                        if (i == 1) {
                            x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[1].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[1].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[1].getRotation());
                        } 
                        else if (i == 3) {
                            x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[3].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[3].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[3].getRotation());
                        }
                        else if (i == 2) {
                            x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[2].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[2].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[2].getRotation());
                        }
                        else if (i == 0) {
                            x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[0].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[0].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[0].getRotation());
                        }
                        else if (i == 4) {
                            x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[4].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[4].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[4].getRotation());
                        }
                        else if (i == 5) {
                            x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[5].x;
                            y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[5].y;
                            instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[5].getRotation());
                        }
                    }
                }
                instance.setPosition(x, y);
            }
        }, this);
    },

    addWinningPlayerCards: function (card, everybodyPacked = false) {
        if (card === null || card.length === 0) {
            return;
        }

        this.cardHolder.children.forEach(function (e) {
            e.active = false;
        })
        if (K.PORTRAIT && this.cardHolderMy) {
            this.cardHolderMy.children.forEach(function (e) {
                e.active = false;
            })
        }

        this.cardHolderShow.children.forEach(function (e) {
            e.active = false;
        })
        if (K.PORTRAIT && this.cardHolderMyShow) {
            this.cardHolderMyShow.children.forEach(function (e) {
                e.active = false;
            })
        }

        card.forEach(function (element, i) {
            //  var instance = cc.instantiate(this.pokerPresenter.cardPrefab);
            var instance = CardPool.generateCard(this.pokerPresenter.cardPrefab.name, function () {});
            var cardComponent = instance.getComponent('Card');
            cardComponent.init(element, this.pokerPresenter.model, true);
            cardComponent.reveal(true);

            if (K.PORTRAIT) {
                instance.setPosition(0, 0);
                instance.parent = this.cardHolderMyShow;

                if (!this.isSelf() && this.pokerPresenter.model.roomConfig.channelVariation == "Omaha") {
                    instance.scale = 0.82;
                    this.cardHolderMyShow.getComponent(cc.Layout).spacingX = -55;
                }
                else {
                    instance.scale = 1;
                    this.cardHolderMyShow.getComponent(cc.Layout).spacingX = -50;
                }
            }

            if (this.playerData && this.playerData.lastMove == "FOLD") {
                cardComponent.gray();
            }
            else {
                // if (this.playerData.__isMuckHand == true) {
                //     cardComponent.reveal(false);
                //     delete this.playerData.__isMuckHand;
                // }

                if (!this.isSelf()) {
                    if (everybodyPacked == true) {
                        cardComponent.reveal(false);
                    }
                }
            }
        }, this);
    },

    isSelf() {
        return (this.playerData && this.playerData.playerId && this.playerData.playerId == GameManager.user.playerId);
    },

    /**
     * @description Reveal other player cards on showdown
     * @method revealCards
     * @param {array} cardTypes
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    revealCards: function (fromDisonnection) {

        // console.error("Reveal Cards");

        var cardType = [];
        if (this.playerData.cards !== undefined && this.playerData.cards !== null && this.playerData.cards.length > 0) {
            this.playerData.cards.forEach(function (cardData) {

                var suit = this.pokerPresenter.model.getSuit(cardData.type);
                cardType.push(new card(cardData.rank, suit));
            }, this);
            this.addPlayerCards(cardType, fromDisonnection);
            this.playerData.cards = [];
        }
        // this.onStateChange();
    },

    winningRevealCards: function (everybodyPacked = false) {

        // console.error("Reveal Cards");

        var cardType = [];
        if (this.playerData.cards !== undefined && this.playerData.cards !== null && this.playerData.cards.length > 0) {
            this.playerData.cards.forEach(function (cardData) {
                var suit = this.pokerPresenter.model.getSuit(cardData.type);
                cardType.push(new card(cardData.rank, suit));
            }, this);
            this.addWinningPlayerCards(cardType, everybodyPacked);
            this.playerData.cards = [];
        }
        else {

            this.cardHolder.children.forEach((e) => {
                e.active = false;

                var instance = CardPool.generateCard(this.pokerPresenter.cardPrefab.name, function () {});
                var cardComponent = instance.getComponent('Card');
                cardComponent.init(e.getComponent('Card').card, this.pokerPresenter.model, true);
                cardComponent.reveal(false);
                instance.setPosition(0, 0);
                instance.parent = this.cardHolderMyShow;
            })

            if (this.cardHolderMy) {
                this.cardHolderMy.children.forEach((e) => {
                    e.active = false;

                    var instance = CardPool.generateCard(this.pokerPresenter.cardPrefab.name, function () {});
                    var cardComponent = instance.getComponent('Card');
                    cardComponent.init(e.getComponent('Card').card, this.pokerPresenter.model, true);
                    cardComponent.reveal(false);
                    instance.setPosition(0, 0);
                    instance.parent = this.cardHolderMyShow;
                })
            }

            // while (this.cardHolder.children.length > 0) {
            //     this.cardHolder.children[0].parent = this.cardHolderShow;
            //     this.cardHolder.children[0].getComponent('Card');
            //     this.cardHolder.children[0].getComponent('Card').reveal(false);
            // }

            // while (this.cardHolderMy.children.length > 0) {
            //     this.cardHolderMy.children[0].parent = this.cardHolderMyShow;
            //     this.cardHolderMy.children[0].getComponent('Card');
            //     this.cardHolderMy.children[0].getComponent('Card').reveal(false);
            // }

            // let len1 = this.cardHolder.children.length;
            // for (var i = len1 - 1; i >= 0; i--) {
            //     this.cardHolder.children[i].parent = this.cardHolderShow;

            //     this.cardHolder.children[i].getComponent('Card');
            //     this.cardHolder.children[i].reveal(false);
            // }

            // let len2 = this.cardHolderMy.children.length;
            // for (var i = len2 - 1; i >= 0; i--) {
            //     this.cardHolderMy.children[i].parent = this.cardHolderMyShow;

            //     this.cardHolderMy.children[i].getComponent('Card');
            //     this.cardHolderMy.children[i].reveal(false);
            // }

            // this.cardHolder.children.forEach((e) => {
            //     e.parent = this.cardHolderShow;
            //     e.active = true;
            // })

            // if (this.cardHolderMy) {
            //     this.cardHolderMy.children.forEach((e) => {
            //         e.parent = this.cardHolderMyShow;
            //         e.active = true;
            //     })
            // }
        }
        // this.onStateChange();
    },

    winningRevealCards2: function () {

        // console.error("Reveal Cards");

        this.cardHolderShow.children.forEach((e) => {
            e.getComponent('Card').reveal(true);
        });

        this.cardHolderMyShow.children.forEach((e) => {
            e.getComponent('Card').reveal(true);
        });
    },


    /**
     * @description Reset player cards to show back face
     * @method resetCards
     * @param {bool} flag
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    resetCards: function (flag, fadeView) {

        var children = this.cardHolder.children;
        for (var index = 0; index < children.length; index++) {
            children[index].getComponent('Card').reveal(flag);
            // if(fadeView)
            // children[index].opacity = 100;
            if (this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
                children[index].children[0].getComponent(cc.Sprite).enabled = flag;
            }
        }

        if (K.PORTRAIT && this.cardHolderMy) {
            children = this.cardHolderMy.children;
            for (var index = 0; index < children.length; index++) {
                children[index].getComponent('Card').reveal(flag);
                // if(fadeView)
                // children[index].opacity = 100;
                if (this.pokerPresenter.checkForSelfTurn(this.playerData.playerId)) {
                    children[index].children[0].getComponent(cc.Sprite).enabled = flag;
                }
            }
        }
    },

    /**
     * @description Fill dummy cards for players other than self
     * @method displayDummyCards
     * @param {Number} noOfCards
     * @param {String} selfPlayerId
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    displayDummyCards: function (noOfCards, selfPlayerId) {
        if (this.seatState !== K.SeatState.Occupied) {
            return;
        }
        if (this.playerData && this.playerData.state == "REBUYING") {
            return;
        }
        this.cardHolder.getComponent(cc.Layout).spacingX = (noOfCards == 4) ? -37 : 20;
        if (noOfCards == 2) {

        } else if (noOfCards == 4) {

        }


        if (this.isSelf()) {
            // this.cardHolderMy.anchorX = 0;
            // this.cardHolderMy.x = 19.318;
        }
        else {
            console.log("this.playerData", this.node.x);
            console.log("this.playerData", this.node.parent.x);
            console.log("this.playerData.seatIndex", this.playerData.seatIndex);
            console.log("this.playerData.getRotatedSeatIndex", this.pokerPresenter.getRotatedSeatIndex(this.playerData.seatIndex));

            let rIndex = this.pokerPresenter.getRotatedSeatIndex(this.playerData.seatIndex);
        }

        if (this.isSelf()) {
        }
        else {
            if (this.node.parent.x < 0) {
                this.cardHolder.x = 47;
            }
            else {
                this.cardHolder.x = -47;
            }
        }

        if (this.pokerPresenter.isTournament()) {
            if (((!!selfPlayerId && selfPlayerId !== this.playerData.playerId) || (!selfPlayerId))) {
            // if (((!!selfPlayerId && selfPlayerId !== this.playerData.playerId) || (!selfPlayerId)) && this.playerData.state === K.PlayerState.Playing) {
            // if (selfPlayerId !== this.playerData.playerId && this.playerData.state === K.PlayerState.Playing) {
            // console.log("inside dummy card");
                this.clearPlayerCards();

                for (var index = 0; index < noOfCards; index++) {
                    // var instance = cc.instantiate(this.pokerPresenter.cardPrefab);
                    var instance = CardPool.generateCard(this.pokerPresenter.cardPrefab.name, function () {});
                    // this.cardHolder.addChild(instance);
                    var cardComponent = instance.getComponent('Card');
                    cardComponent.reveal(false);
                    this.cardHolder.getComponent(cc.Layout).enabled = false;
                    if (K.PORTRAIT) {
                        instance.parent = this.isSelf() ? this.cardHolderMy : this.cardHolder;
                    }
                    else {
                        instance.parent = this.cardHolder;
                    }

                    if (K.PORTRAIT) {
                        let x = 0;
                        let y = 0;

                        if (noOfCards == 2) {
                            if (this.isSelf()) {
                                if (index == 1) {
                                    x = this.cardHolder2My.children[1].x;
                                    y = this.cardHolder2My.children[1].y;
                                    instance.setRotation(this.cardHolder2My.children[1].getRotation());
                                } 
                                else {
                                    x = this.cardHolder2My.children[0].x;
                                    y = this.cardHolder2My.children[0].y;
                                    instance.setRotation(this.cardHolder2My.children[0].getRotation());
                                }
                            }
                            else {
                                if (index == 1) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[1].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[1].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[1].getRotation());
                                } else {
                                    x = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[0].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[0].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[0].getRotation());
                                }
                            }
                        } 
                        else if (noOfCards == 3) {
                            if (this.isSelf()) {
                                if (index == 0) {
                                    x = this.cardHolder3My.children[0].x;
                                    y = this.cardHolder3My.children[0].y;
                                    instance.setRotation(this.cardHolder3My.children[0].getRotation());
                                } 
                                else if (index == 1) {
                                    x = this.cardHolder3My.children[1].x;
                                    y = this.cardHolder3My.children[1].y;
                                    instance.setRotation(this.cardHolder3My.children[1].getRotation());
                                } 
                                else {
                                    x = this.cardHolder3My.children[2].x;
                                    y = this.cardHolder3My.children[2].y;
                                    instance.setRotation(this.cardHolder3My.children[2].getRotation());
                                }
                            }
                            else {
                                if (index == 0) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[0].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[0].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[0].getRotation());
                                } 
                                else if (index == 1) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[1].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[1].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[1].getRotation());
                                } 
                                else {
                                    x = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[2].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[2].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[2].getRotation());
                                }
                            }
                        } 
                        else if (noOfCards == 4) {
                            if (this.isSelf()) {
                                if (index == 1) {
                                    x = this.cardHolder4My.children[1].x;
                                    y = this.cardHolder4My.children[1].y;
                                    instance.setRotation(this.cardHolder4My.children[1].getRotation());
                                } 
                                else if (index == 3) {
                                    x = this.cardHolder4My.children[3].x;
                                    y = this.cardHolder4My.children[3].y;
                                    instance.setRotation(this.cardHolder4My.children[3].getRotation());
                                }
                                else if (index == 2) {
                                    x = this.cardHolder4My.children[2].x;
                                    y = this.cardHolder4My.children[2].y;
                                    instance.setRotation(this.cardHolder4My.children[2].getRotation());
                                }
                                else if (index == 0) {
                                    x = this.cardHolder4My.children[0].x;
                                    y = this.cardHolder4My.children[0].y;
                                    instance.setRotation(this.cardHolder4My.children[0].getRotation());
                                }
                            }
                            else {
                                if (index == 1) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[1].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[1].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[1].getRotation());
                                } 
                                else if (index == 3) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[3].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[3].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[3].getRotation());
                                }
                                else if (index == 2) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[2].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[2].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[2].getRotation());
                                }
                                else if (index == 0) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[0].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[0].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[0].getRotation());
                                }
                            }
                        }
                        else if (noOfCards == 5) {
                            if (this.isSelf()) {
                                if (index == 1) {
                                    x = this.cardHolder5My.children[1].x;
                                    y = this.cardHolder5My.children[1].y;
                                    instance.setRotation(this.cardHolder5My.children[1].getRotation());
                                } 
                                else if (index == 3) {
                                    x = this.cardHolder5My.children[3].x;
                                    y = this.cardHolder5My.children[3].y;
                                    instance.setRotation(this.cardHolder5My.children[3].getRotation());
                                }
                                else if (index == 2) {
                                    x = this.cardHolder5My.children[2].x;
                                    y = this.cardHolder5My.children[2].y;
                                    instance.setRotation(this.cardHolder5My.children[2].getRotation());
                                }
                                else if (index == 0) {
                                    x = this.cardHolder5My.children[0].x;
                                    y = this.cardHolder5My.children[0].y;
                                    instance.setRotation(this.cardHolder5My.children[0].getRotation());
                                }
                                else if (index == 4) {
                                    x = this.cardHolder5My.children[4].x;
                                    y = this.cardHolder5My.children[4].y;
                                    instance.setRotation(this.cardHolder5My.children[4].getRotation());
                                }
                            }
                            else {
                                if (index == 1) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[1].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[1].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[1].getRotation());
                                } 
                                else if (index == 3) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[3].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[3].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[3].getRotation());
                                }
                                else if (index == 2) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[2].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[2].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[2].getRotation());
                                }
                                else if (index == 0) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[0].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[0].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[0].getRotation());
                                }
                                else if (index == 4) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[4].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[4].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[4].getRotation());
                                }
                            }
                        }
                        else if (noOfCards == 6) {
                            if (this.isSelf()) {
                                if (index == 1) {
                                    x = this.cardHolder6My.children[1].x;
                                    y = this.cardHolder6My.children[1].y;
                                    instance.setRotation(this.cardHolder6My.children[1].getRotation());
                                } 
                                else if (index == 3) {
                                    x = this.cardHolder6My.children[3].x;
                                    y = this.cardHolder6My.children[3].y;
                                    instance.setRotation(this.cardHolder6My.children[3].getRotation());
                                }
                                else if (index == 2) {
                                    x = this.cardHolder6My.children[2].x;
                                    y = this.cardHolder6My.children[2].y;
                                    instance.setRotation(this.cardHolder6My.children[2].getRotation());
                                }
                                else if (index == 0) {
                                    x = this.cardHolder6My.children[0].x;
                                    y = this.cardHolder6My.children[0].y;
                                    instance.setRotation(this.cardHolder6My.children[0].getRotation());
                                }
                                else if (index == 4) {
                                    x = this.cardHolder6My.children[4].x;
                                    y = this.cardHolder6My.children[4].y;
                                    instance.setRotation(this.cardHolder6My.children[4].getRotation());
                                }
                                else if (index == 5) {
                                    x = this.cardHolder6My.children[5].x;
                                    y = this.cardHolder6My.children[5].y;
                                    instance.setRotation(this.cardHolder6My.children[5].getRotation());
                                }
                            }
                            else {
                                if (index == 1) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[1].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[1].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[1].getRotation());
                                } 
                                else if (index == 3) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[3].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[3].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[3].getRotation());
                                }
                                else if (index == 2) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[2].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[2].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[2].getRotation());
                                }
                                else if (index == 0) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[0].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[0].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[0].getRotation());
                                }
                                else if (index == 4) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[4].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[4].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[4].getRotation());
                                }
                                else if (index == 5) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[5].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[5].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[5].getRotation());
                                }
                            }
                        }

                        // if (noOfCards == 2) {
                        //     if (this.isSelf()) {
                        //         if (index == 1) {
                        //             x = this.cardHolder2My.children[1].x;
                        //             y = this.cardHolder2My.children[1].y;
                        //             instance.setRotation(this.cardHolder2My.children[1].getRotation());
                        //         } 
                        //         else {
                        //             x = this.cardHolder2My.children[0].x;
                        //             y = this.cardHolder2My.children[0].y;
                        //             instance.setRotation(this.cardHolder2My.children[0].getRotation());
                        //         }
                        //     }
                        //     else {
                        //         if (index == 1) {
                        //             x = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[1].x;
                        //             y = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[1].y;
                        //             instance.setRotation((this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[1].getRotation());
                        //         } 
                        //         else {
                        //             x = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[0].x;
                        //             y = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[0].y;
                        //             instance.setRotation((this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[0].getRotation());
                        //         }
                        //     }

                        // } else {
                        //     if (this.isSelf()) {
                        //         if ((index % 2) == 1) {
                        //             // odd 1, 3
                        //             if (index < 2) {
                        //                 // 1
                        //                 x = this.cardHolder4My.children[1].x;
                        //                 y = this.cardHolder4My.children[1].y;
                        //                 instance.setRotation(this.cardHolder4My.children[1].getRotation());
                        //             }
                        //             else {
                        //                 // 3
                        //                 x = this.cardHolder4My.children[3].x;
                        //                 y = this.cardHolder4My.children[3].y;
                        //                 instance.setRotation(this.cardHolder4My.children[3].getRotation());
                        //             }
                        //         } 
                        //         else {
                        //             // even 0, 2
                        //             if (index == 2) {
                        //                 x = this.cardHolder4My.children[2].x;
                        //                 y = this.cardHolder4My.children[2].y;
                        //                 instance.setRotation(this.cardHolder4My.children[2].getRotation());
                        //             }
                        //             else {
                        //                 x = this.cardHolder4My.children[0].x;
                        //                 y = this.cardHolder4My.children[0].y;
                        //                 instance.setRotation(this.cardHolder4My.children[0].getRotation());
                        //             }
                        //         }
                        //     }
                        //     else {
                        //         if ((index % 2) == 1) {
                        //             // odd 1, 3
                        //             if (index < 2) {
                        //                 // 1
                        //                 x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[1].x;
                        //                 y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[1].y;
                        //                 instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[1].getRotation());
                        //             }
                        //             else {
                        //                 // 3
                        //                 x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[3].x;
                        //                 y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[3].y;
                        //                 instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[3].getRotation());
                        //             }
                        //         } 
                        //         else {
                        //             // even 0, 2
                        //             if (index == 2) {
                        //                 x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[2].x;
                        //                 y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[2].y;
                        //                 instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[2].getRotation());
                        //             }
                        //             else {
                        //                 x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[0].x;
                        //                 y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[0].y;
                        //                 instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[0].getRotation());
                        //             }
                        //         }
                        //     }
                        // }


                        instance.x = (x);
                        instance.y = (y);

                    }
                }
            } else {
            }
        }
        else {
            if (((!!selfPlayerId && selfPlayerId !== this.playerData.playerId) || (!selfPlayerId)) && this.playerData.state === K.PlayerState.Playing) {
                // if (selfPlayerId !== this.playerData.playerId && this.playerData.state === K.PlayerState.Playing) {
                // console.log("inside dummy card");
                this.clearPlayerCards();

                for (var index = 0; index < noOfCards; index++) {
                    // var instance = cc.instantiate(this.pokerPresenter.cardPrefab);
                    var instance = CardPool.generateCard(this.pokerPresenter.cardPrefab.name, function () {});
                    // this.cardHolder.addChild(instance);
                    var cardComponent = instance.getComponent('Card');
                    cardComponent.reveal(false);
                    this.cardHolder.getComponent(cc.Layout).enabled = false;
                    if (K.PORTRAIT) {
                        instance.parent = this.isSelf() ? this.cardHolderMy : this.cardHolder;
                    }
                    else {
                        instance.parent = this.cardHolder;
                    }
                    // instance.setScale(1.2);

                    if (K.PORTRAIT) {
                        let x = 0;
                        let y = 0;

                        if (noOfCards == 2) {
                            if (this.isSelf()) {
                                if (index == 1) {
                                    x = this.cardHolder2My.children[1].x;
                                    y = this.cardHolder2My.children[1].y;
                                    instance.setRotation(this.cardHolder2My.children[1].getRotation());
                                } 
                                else {
                                    x = this.cardHolder2My.children[0].x;
                                    y = this.cardHolder2My.children[0].y;
                                    instance.setRotation(this.cardHolder2My.children[0].getRotation());
                                }
                            }
                            else {
                                if (index == 1) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[1].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[1].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[1].getRotation());
                                } else {
                                    x = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[0].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[0].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder2 : this.cardHolder2R).children[0].getRotation());
                                }
                            }
                        } 
                        else if (noOfCards == 3) {
                            if (this.isSelf()) {
                                if (index == 0) {
                                    x = this.cardHolder3My.children[0].x;
                                    y = this.cardHolder3My.children[0].y;
                                    instance.setRotation(this.cardHolder3My.children[0].getRotation());
                                } 
                                else if (index == 1) {
                                    x = this.cardHolder3My.children[1].x;
                                    y = this.cardHolder3My.children[1].y;
                                    instance.setRotation(this.cardHolder3My.children[1].getRotation());
                                } 
                                else {
                                    x = this.cardHolder3My.children[2].x;
                                    y = this.cardHolder3My.children[2].y;
                                    instance.setRotation(this.cardHolder3My.children[2].getRotation());
                                }
                            }
                            else {
                                if (index == 0) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[0].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[0].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[0].getRotation());
                                } 
                                else if (index == 1) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[1].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[1].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[1].getRotation());
                                } 
                                else {
                                    x = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[2].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[2].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder3 : this.cardHolder3R).children[2].getRotation());
                                }
                            }
                        } 
                        else if (noOfCards == 4) {
                            if (this.isSelf()) {
                                if (index == 1) {
                                    x = this.cardHolder4My.children[1].x;
                                    y = this.cardHolder4My.children[1].y;
                                    instance.setRotation(this.cardHolder4My.children[1].getRotation());
                                } 
                                else if (index == 3) {
                                    x = this.cardHolder4My.children[3].x;
                                    y = this.cardHolder4My.children[3].y;
                                    instance.setRotation(this.cardHolder4My.children[3].getRotation());
                                }
                                else if (index == 2) {
                                    x = this.cardHolder4My.children[2].x;
                                    y = this.cardHolder4My.children[2].y;
                                    instance.setRotation(this.cardHolder4My.children[2].getRotation());
                                }
                                else if (index == 0) {
                                    x = this.cardHolder4My.children[0].x;
                                    y = this.cardHolder4My.children[0].y;
                                    instance.setRotation(this.cardHolder4My.children[0].getRotation());
                                }
                            }
                            else {
                                if (index == 1) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[1].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[1].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[1].getRotation());
                                } 
                                else if (index == 3) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[3].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[3].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[3].getRotation());
                                }
                                else if (index == 2) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[2].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[2].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[2].getRotation());
                                }
                                else if (index == 0) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[0].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[0].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder4 : this.cardHolder4R).children[0].getRotation());
                                }
                            }
                        }
                        else if (noOfCards == 5) {
                            if (this.isSelf()) {
                                if (index == 1) {
                                    x = this.cardHolder5My.children[1].x;
                                    y = this.cardHolder5My.children[1].y;
                                    instance.setRotation(this.cardHolder5My.children[1].getRotation());
                                } 
                                else if (index == 3) {
                                    x = this.cardHolder5My.children[3].x;
                                    y = this.cardHolder5My.children[3].y;
                                    instance.setRotation(this.cardHolder5My.children[3].getRotation());
                                }
                                else if (index == 2) {
                                    x = this.cardHolder5My.children[2].x;
                                    y = this.cardHolder5My.children[2].y;
                                    instance.setRotation(this.cardHolder5My.children[2].getRotation());
                                }
                                else if (index == 0) {
                                    x = this.cardHolder5My.children[0].x;
                                    y = this.cardHolder5My.children[0].y;
                                    instance.setRotation(this.cardHolder5My.children[0].getRotation());
                                }
                                else if (index == 4) {
                                    x = this.cardHolder5My.children[4].x;
                                    y = this.cardHolder5My.children[4].y;
                                    instance.setRotation(this.cardHolder5My.children[4].getRotation());
                                }
                            }
                            else {
                                if (index == 1) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[1].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[1].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[1].getRotation());
                                } 
                                else if (index == 3) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[3].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[3].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[3].getRotation());
                                }
                                else if (index == 2) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[2].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[2].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[2].getRotation());
                                }
                                else if (index == 0) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[0].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[0].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[0].getRotation());
                                }
                                else if (index == 4) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[4].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[4].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder5R).children[4].getRotation());
                                }
                            }
                        }
                        else if (noOfCards == 6) {
                            if (this.isSelf()) {
                                if (index == 1) {
                                    x = this.cardHolder6My.children[1].x;
                                    y = this.cardHolder6My.children[1].y;
                                    instance.setRotation(this.cardHolder6My.children[1].getRotation());
                                } 
                                else if (index == 3) {
                                    x = this.cardHolder6My.children[3].x;
                                    y = this.cardHolder6My.children[3].y;
                                    instance.setRotation(this.cardHolder6My.children[3].getRotation());
                                }
                                else if (index == 2) {
                                    x = this.cardHolder6My.children[2].x;
                                    y = this.cardHolder6My.children[2].y;
                                    instance.setRotation(this.cardHolder6My.children[2].getRotation());
                                }
                                else if (index == 0) {
                                    x = this.cardHolder6My.children[0].x;
                                    y = this.cardHolder6My.children[0].y;
                                    instance.setRotation(this.cardHolder6My.children[0].getRotation());
                                }
                                else if (index == 4) {
                                    x = this.cardHolder6My.children[4].x;
                                    y = this.cardHolder6My.children[4].y;
                                    instance.setRotation(this.cardHolder6My.children[4].getRotation());
                                }
                                else if (index == 5) {
                                    x = this.cardHolder6My.children[5].x;
                                    y = this.cardHolder6My.children[5].y;
                                    instance.setRotation(this.cardHolder6My.children[5].getRotation());
                                }
                            }
                            else {
                                if (index == 1) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[1].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[1].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[1].getRotation());
                                } 
                                else if (index == 3) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[3].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[3].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[3].getRotation());
                                }
                                else if (index == 2) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[2].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[2].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[2].getRotation());
                                }
                                else if (index == 0) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[0].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[0].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[0].getRotation());
                                }
                                else if (index == 4) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[4].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[4].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder5 : this.cardHolder6R).children[4].getRotation());
                                }
                                else if (index == 5) {
                                    x = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[5].x;
                                    y = (this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[5].y;
                                    instance.setRotation((this.node.parent.x < 0 ? this.cardHolder6 : this.cardHolder6R).children[5].getRotation());
                                }
                            }
                        }
                        instance.x = (x);
                        instance.y = (y);
                    }
                }
            } else {
            }
        }


        if (this.playerData && this.playerData.lastMove == "FOLD") {
            this.cardHolderMy.children.forEach(function (element) {
                // element.opacity = 150;
                element.getComponent("Card").gray();
            }, this);

            this.cardHolder.children.forEach(function (element) {
                // element.opacity = 150;
                element.getComponent("Card").gray();
            }, this);
        }
    },





    /**
     * @description Discard player hand on gameover
     * @method clearPlayerCards
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    clearPlayerCards: function () {
        var children = this.cardHolder.children;
        while (children.length > 0) {
            CardPool.destroyCard(children[0], function () {});
        }

        children = this.cardHolderShow.children;
        while (children.length > 0) {
            CardPool.destroyCard(children[0], function () {});
        }

        if (K.PORTRAIT && this.cardHolderMy) {
            children = this.cardHolderMy.children;
            while (children.length > 0) {
                CardPool.destroyCard(children[0], function () {});
            }
        }

        if (K.PORTRAIT && this.cardHolderMyShow) {
            children = this.cardHolderMyShow.children;
            while (children.length > 0) {
                CardPool.destroyCard(children[0], function () {});
            }
        }

        this.bestHandNode.active = false;
    },

    /**
     * @description Updates number of chips in view
     * @method updateCoins
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    updateCoins: function () {
        // console.log(7)
        this.amountLabel.string = GameManager.convertChips(this.playerData.chips);
        this.updateBB();
    },

    /**
     * @description Stops listening events
     * @method onDestroy
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    onDestroy: function () {
        // this.clearPlayerCards();
        GameScreen.node.off("grid-refreshed", this.gridRefreshedRef);
        GameManager.off("image-loaded", this.imageLoadedRef);
    },

    //not in use
    showChatOldie: function (message) {
        this.chatHead.active = true;
        var posY = this.chatLbl.node.position.y;
        // message = message.substring(0, message.indexOf(">") + 1) + message.substring(message.indexOf(":") + 1, message.length - 1);
        // this.chatLbl.string = message;
        // var prevSize = this.chatLbl.maxWidth;
        // var initialwidth = this.chatLbl.maxWidth;

        // AJAY IMPLEMENTATION
        // var base = this.chatHead.getChildByName('base');
        // let tmp = message;
        // let tempMsg = "";
        // // let myarr = [];
        // // let myarr2 = [];
        // let cropCount = 0;
        // for (var i = 0; i < tmp.length; i++) {
        //     let index = tmp.indexOf("<img src");
        //     if (index > -1 && index < 18) {
        //         let start = tmp.indexOf('<img');
        //         let end = tmp.indexOf('/>') + 1;
        //         // myarr.push(end - start + 1);
        //         // myarr2.push(start);
        //         // tempMsg = message.substring(0, start) + "   " + message.substring(end + 1, message.length);
        //         console.log(start);
        //         console.log(end);
        //         console.log("PROCESSING MSG :- ", tmp);
        //         tmp = tmp.substring(0, start) + "   " + tmp.substring(end + 1, tmp.length);
        //         console.log("PROCESSING MSG TMP :- ", tmp);
        //         // if (tempMsg.length + 3 > 18) {
        //         //     return;
        //         // } else {
        //             tempMsg += tmp;
        //         // }
        //         cropCount += ((end - start));
        //     }
        // }


        // if (tempMsg.length > 18) {
        //     message = message.substring(0, tempMsg.length + cropCount) + "...";
        //     this.chatLbl.maxWidth = tempMsg.length * 18.83;;
        //     console.log("ONE width", tempMsg.length, this.chatLbl.maxWidth, message.length);
        //     console.log("TMP MSG :- ", tempMsg);
        // } else 

        // if (tempMsg.length > 3 && tempMsg.length < 18) {
        //     let maxWidth = tempMsg.length * 18.83;
        //     this.chatLbl.maxWidth = maxWidth;
        //     console.log("two width", tempMsg.length, this.chatLbl.maxWidth, message.length);
        //     console.log("TMP MSG :- ", tempMsg);
        // } else if (tempMsg.length == 0) {
        //     message = (message.length > 18) ? message.substring(0, 18) + "..." : message;
        //     let maxWidth = message.length * 18.83;
        //     this.chatLbl.maxWidth = maxWidth;
        //     console.log("No EMOJI width", tempMsg.length, this.chatLbl.maxWidth, message.length);
        //     console.log("TMP MSG :- ", tempMsg);
        // }

        // base.setContentSize(cc.size(this.chatLbl.maxWidth, base.getContentSize().height));
        // this.chatLbl.string = message;
        // console.log("DISPLAYED MESSAGE IS :-  ", message);

        /////////////////////////////////////////////////// SHISHIR IMPLEMENTATION:-


        // var base = this.chatHead.getChildByName('base');
        // let tempMsg = message;
        // let myarr = [];
        // let myarr2 = [];
        // for (var i = 0; i < 5; i++) {
        //     let index = tempMsg.indexOf("<img src =");
        //     if (index > -1 && index < 18) {
        //         let start = tempMsg.indexOf('<img');
        //         let end = tempMsg.indexOf('/>') + 1;
        //         myarr.push(end - start + 1);
        //         myarr2.push(start);
        //         tempMsg = tempMsg.substring(0, start) + "   " + tempMsg.substring(end + 1, tempMsg.length);
        //     }
        // }
        // let limit = 16;
        // for (var i = 0; i < myarr.length; i++) {
        //     limit += myarr[i];
        // }
        // let in2 = tempMsg.indexOf("<img src");
        // if (in2 > -1 && in2 < 18) {
        //     let start = tempMsg.indexOf('<img');
        //     let end = tempMsg.indexOf('/>') + 1;
        //     tempMsg = tempMsg.substring(0, start);
        // }
        // if (message.length > limit) {
        //     message = message.substring(0, limit) + "...";
        //     let in3 = message.indexOf("<img src");
        //     if (in3 > -1 && in3 < 18) {
        //         let start = message.lastIndexOf('<img');
        //         let end = message.lastIndexOf('/>') + 1;
        //         if (start > end)
        //             message = message.substring(0, start);
        //     }
        //     //var base = this.chatHead.getChildByName('base');
        //     this.chatLbl.maxWidth = 250;

        // } else if (message.length > 3 && message.length < limit) {
        //     let maxWidth = tempMsg.length * 18.83;
        //     this.chatLbl.maxWidth = maxWidth;
        // }
        //base.setScaleX(this.chatLbl.maxWidth / base.getContentSize().width);
        // base.setContentSize(cc.size(this.chatLbl.maxWidth, base.getContentSize().height));
        //  console.log("this.chatLbl.node.width/message.length=" + this.chatLbl.node.width / message.length);
        // console.log("Max WIdth ", this.chatLbl.maxWidth);
        // console.log("BAse SCALE SIZE ", base.getContentSize().width);
        // console.log("scalin factor = " + this.chatLbl.maxWidth / base.getContentSize().width)
        // console.log(this.chatLbl.maxWidth);

        let tempMsg = message;
        if (tempMsg.length > 12) {
            message = message.substring(0, 9) + "...";
        }

        this.chatLbl.string = message;
        this.scheduleOnce(function () {
            this.chatHead.active = false;
            // this.chatLbl.node.y = posY;
            // this.chatLbl.maxWidth = 64;
            // base.setContentSize(cc.size(64, base.getContentSize().height));
        }.bind(this), 1);

        // var base = this.chatHead.getChildByName('base');
        //     console.log("msglength" + message.length);
        //    // console.log(this.chatLbl.maxWidth);
        //     if (message.length > 20) {
        //         this.chatLbl.maxWidth = 240;
        //         console.log("CHAT WIDTH RESIZED TO ", this.chatLbl.maxWidth);
        // base.setScaleY(this.chatLbl.node.getContentSize().height / this.chatLbl.lineHeight);
        // base.setScaleX(this.chatLbl.maxWidth/base.getContentSize().width);
        //         // console.log("BASE SCALE X",this.chatLbl.node.getContentSize().width / this.chatLbl.maxWidth);
        //         // console.log("BASE SCALE Y",this.chatLbl.node.getContentSize().height / this.chatLbl.lineHeight);
        //         // console.log("msglength" + message.length);
        //         // console.log(this.chatLbl.node.getComponent(cc.RichText).maxWidth)
        //     }
        // console.log("msg" + message);
        // console.log("msglength" + message.length);

        //  if (this.pokerPresenter.model.gameData.tableDetails.players.length == 9) {
        // if (this.pokerPresenter.getRotatedSeatIndex(this.playerData.seatIndex) == 5) {
        //     if (this.cardHolder.children.length != 0) {
        //         let posY = this.chatHead.y;
        //         this.chatHead.y = this.cardHolder.y + this.cardHolder.height * 0.4;
        //         this.scheduleOnce(function () {
        //             this.chatHead.y = posY;
        //         }.bind(this), 1);
        //     }
        // }

        // if (this.pokerPresenter.getRotatedSeatIndex(this.playerData.seatIndex) == 1) {
        //     this.chatHead.y = this.cardHolder.y + this.cardHolder.height * 0.2;
        // }

        // if (this.pokerPresenter.getRotatedSeatIndex(this.playerData.seatIndex) == 9) {
        //     this.chatHead.y = this.cardHolder.y + this.cardHolder.height * 0.2;
        // }
        //  }
    },

    // showChatRR: function (message) {
    //     message = message.trim();
    //     this.chatHead.active = true;
    //     var base = this.chatHead.getChildByName('base');
    //     if (message.indexOf("<img src") == -1) { //no emojis
    //         this.chatLbl.string = " " + message.substring(0, 18);
    //         if (message.length > 18)
    //             this.chatLbl.string += "...";
    //         base.width = this.chatLbl.node.width;
    //     }
    //     else { //emoji and text
    //         let numEmojis = 0;
    //         let tmpMsg = message;
    //         //count emojis
    //         let ind = tmpMsg.indexOf("/>");
    //         while (ind != -1) {
    //             numEmojis++;
    //             tmpMsg = tmpMsg.substring(ind + 2);
    //             ind = tmpMsg.indexOf("/>");
    //         }
    //         tmpMsg = message;
    //         let myarr = [];
    //         let myarr2 = [];
    //         console.log("EXTRACTING EMOJIS ", tmpMsg);
    //         // console.log("TMPMESSAGE ", tmpMsg);
    //         for (let i = 0; i < 5; i++) {
    //             let index = tmpMsg.indexOf("<img src =");
    //             if (index > -1 && index < 18) {
    //                 let start = tmpMsg.indexOf('<img');
    //                 let end = tmpMsg.indexOf('/>') + 1;
    //                 myarr.push(end - start + 1);
    //                 myarr2.push(start);
    //                 tmpMsg = tmpMsg.substring(0, start) + tmpMsg.substring(end + 1, tmpMsg.length);
    //             }
    //         }
    //         let count = 0;
    //         let limit = tmpMsg.length > 18 ? 18 : tmpMsg.length;
    //         console.log("TMPMESSAGE ", tmpMsg);
    //         for (let i = 0; i < limit; i++) {
    //             if (tmpMsg[i] == 't' || tmpMsg[i] == 'i' || tmpMsg[i] == 'j' || tmpMsg[i] == 'l' || tmpMsg[i] == 'j') {
    //                 count++;
    //             }
    //         }

    //         let width = numEmojis * 50 + count * 9 + (limit - count) * 19;
    //         base.width = width;
    //         for (let i = 0; i < myarr.length; i++) {
    //             limit += myarr[i];
    //         }
    //         let in2 = tmpMsg.indexOf("<img src");
    //         if (in2 > -1 && in2 < 18) {
    //             let start = tmpMsg.indexOf('<img');
    //             let end = tmpMsg.indexOf('/>') + 1;
    //             tmpMsg = tmpMsg.substring(0, start);
    //         }
    //         if (message.length > limit) {
    //             message = message.substring(0, limit) + "...";
    //             let in3 = message.indexOf("<img src");
    //             if (in3 > -1 && in3 < 18) {
    //                 let start = message.lastIndexOf('<img');
    //                 let end = message.lastIndexOf('/>') + 1;
    //                 if (start > end)
    //                     message = message.substring(0, start);
    //             }
    //         }
    //         console.log("TMPMESSAGE ", tmpMsg);
    //         console.log("MESSAGE ", message);
    //         this.chatLbl.string = message;
    //     }//outer else
    //     this.scheduleOnce(function () {
    //         this.chatHead.active = false;
    //         this.chatLbl.maxWidth = 0;
    //         this.chatLbl.string = "";
    //         base.width = 64;
    //     }.bind(this), 1);

    // },

    /**
     * @description shows chatHead
     * @method showChat
     * @param {String} message - message string from broadcast
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    showChat: function (message) {
        message = message.trim();
        this.chatHead.active = true;
        // this.chatLbl.maxWidth = 0;
        var showChatTime = 5;
        // var base = this.chatHead.getChildByName('base');
        if (message.indexOf("<img src") == -1) { //text only
            this.chatLbl.string = message.substring(0, 17);
            if (message.length >= 17) {
                this.chatLbl.string += "...";
            }

            // base.width = this.chatLbl.node.width;
            // if (base.width < 64)
            //     base.width = 64;
            // base.width += 10;
        } else {
            // showChatTime = 5;
            let string = this.determineString(message);
            // let width = this.determineWidth(string);
            if (message.length > 320)
                this.chatLbl.string = string + "...";
            else
                this.chatLbl.string = string;
            // base.width = width;
        }
        this.scheduleOnce(function () {
            this.chatLbl.string = "";
            // base.width = 64;
            this.chatHead.active = false;
        }.bind(this), showChatTime);

        if (this.pokerPresenter.getRotatedSeatIndex(this.playerData.seatIndex) == 5) {
            if (this.cardHolder.children.length != 0) {
                // let posY = this.chatHead.y;
                // this.chatHead.y = this.cardHolder.y + this.cardHolder.height * 0.4;
                // this.scheduleOnce(function () {
                //     this.chatHead.y = posY;
                // }.bind(this), showChatTime);
            }
        }

        if (this.pokerPresenter.getRotatedSeatIndex(this.playerData.seatIndex) == 1) {
            // this.chatHead.y = this.cardHolder.y + this.cardHolder.height * 0.2;
        }

        if (this.pokerPresenter.getRotatedSeatIndex(this.playerData.seatIndex) == 9) {
            // this.chatHead.y = this.cardHolder.y + this.cardHolder.height * 0.2;
        }
    },

    /**
     * @description utility method for showChat
     * @method determineWidth
     * @param {String} message - message string
     * @return {number} width of the string
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    determineWidth: function (message) {
        let numEmojis = 0;
        let tmpMsg = message;
        //count emojis
        let ind = tmpMsg.indexOf("/>");
        while (ind != -1) {
            numEmojis++;
            tmpMsg = tmpMsg.substring(ind + 2);
            ind = tmpMsg.indexOf("/>");
        }
        tmpMsg = message;
        let myarr = [];
        let myarr2 = [];
        for (let i = 0; i < tmpMsg.length; i++) {
            let index = tmpMsg.indexOf("<img src =");
            if (index > -1 && index < 18) {
                let start = tmpMsg.indexOf('<img');
                let end = tmpMsg.indexOf('/>') + 1;
                myarr.push(end - start + 1);
                myarr2.push(start);
                tmpMsg = tmpMsg.substring(0, start) + tmpMsg.substring(end + 1, tmpMsg.length);
            }
        }
        //tmpMsg has text only
        let count = 0;
        let limit = tmpMsg.length > 18 ? 18 : tmpMsg.length;
        for (let i = 0; i < limit; i++) {
            if (tmpMsg[i] == 't' || tmpMsg[i] == 'i' || tmpMsg[i] == 'j' || tmpMsg[i] == 'l' || tmpMsg[i] == 'j') {
                count++;
            }
        }
        let width = numEmojis * 50 + count * 9 + (limit - count) * 20;
        return width;
    },

    /**
     * @description utility method for showChat
     * @method determineString
     * @param {String} message - message string
     * @return {String} String to be displayed in chatHead
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    determineString: function (message) {
        //Emojis and text case 
        let limit = message.length > 320 ? 320 : message.length;
        let finalstr = "";
        let inEmoji = false;
        let que = "";
        let start = -1;
        for (let i = 0; i < limit; i++) {
            if (message[i] == "<") {
                inEmoji = true;
                start = i;
            }
            if (message[i] == ">") {
                inEmoji = false;
                finalstr += que;
                start = -1;
            }
            if (inEmoji) {
                que += message[i];
            } else {
                que = "";
                finalstr += message[i];
            }
        }

        if (que) { //que not empty
            if (!this.isEmoji(start, message)) { // string in the que is emoji
                finalstr += que;
            }
        }
        return finalstr;
    },

    /**
     * @description utility method for determingString. Checks if the string in the que is emoji?
     * @method isEmoji
     * @param {String} message - message string
     * @param {number} index - index of character '<'
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    isEmoji: function (index, message) {
        let temp = message.substring(index);
        return (temp.indexOf("<img") != -1) && (temp.indexOf("/>") != -1);
    },

    /**
     * @description  Showing Winner Banner to Player only. Will be called whever a player wins a pot.
     * @method showWinnerBanner
     * @memberof Screens.Gameplay.Player.PlayerPresenter#
     */
    showWinnerBanner: function () {
        // console.log("showingwinner")
        this.winningNode.active = true;
        this.winningNode.children[1].active = true;
        this.winningNode.children[1].getComponent(cc.Animation).play();
    },

    hideWinningAnim: function () {
        this.winningNode.active = false;
        this.winningNode.children[1].active = this.winningNode.children[2].active = this.winningNode.children[3].active = this.winningNode.children[4].active = false;
        this.winningNode.children[3].setScale(0, 0);
        this.winningNode.children[4].opacity = 0;
        this.winningNode.children[1].getComponent(cc.Animation).stop();
        this.winningNode.children[2].getComponent(cc.Animation).stop();
        this.winningNode.children[3].getComponent(cc.Animation).stop();
        this.winningNode.children[4].getComponent(cc.Animation).stop();
    },

    showSelf: function() {
        console.log("%c[Flow/showSelf]", 'Orange: Tomato;');
        if (this.playerData && this.playerData.playerId && this.playerData.playerId == GameManager.user.playerId) {
        //     this.selfPlayerHand = this.pokerPresenter.HandOther_Left;
        //     this.cardHolder = this.selfPlayerHand.parent.getChildByName("Cards");

            if (this.selfPlayerHand) {
                this.selfPlayerHand.active = true;
                this.selfTimerBox.active = true;
                this.timerSprite2.node.active = true;
                // this.selfPlayerHand.getChildByName("hand").active = true;
            }
            this.occupiedPanel.getChildByName("Player").active = false;
            this.occupiedPanel.getChildByName("Timer").active = false;

            this.cardHolder.children.forEach(function (element) {
                cc.find('FrontFace/Gray', element).active = true;
            }, this);

            this.playerBetLabel.parent.setPosition(this.playerBetHolder.position);
        }
    },

    hideSelf: function() {
        console.log("%c[Flow/hideSelf]", 'Orange: Tomato;');
        if (this.playerData && this.playerData.playerId && this.playerData.playerId == GameManager.user.playerId) {
        //     this.selfPlayerHand = this.pokerPresenter.HandOther_Left;
        //     this.cardHolder = this.selfPlayerHand.parent.getChildByName("Cards");

            if (this.selfPlayerHand) {
                this.selfPlayerHand.active = false;
                this.selfTimerBox.active = false;
                this.timerSprite2.node.active = false;
            }
            this.occupiedPanel.getChildByName("Player").active = true;
            this.occupiedPanel.getChildByName("Timer").active = true;

            this.playerBetLabel.parent.setPosition(this.oldPlayerBetLabelPosition);

            this.cardHolder.children.forEach(function (element) {
                cc.find('FrontFace/Gray', element).active = false;
            }, this);
        }
    },

    graySelf: function() {
        // console.log("%c[Flow/hideSelf]", 'Orange: Tomato;');
        if (this.playerData && this.playerData.playerId && this.playerData.playerId == GameManager.user.playerId) {
        //     this.selfPlayerHand = this.pokerPresenter.HandOther_Left;
        //     this.cardHolder = this.selfPlayerHand.parent.getChildByName("Cards");

            if (this.selfPlayerHand && this.selfPlayerHand.active) {
                // cc.find('Timer/PFPAvatar', this.selfPlayerHand).getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
                // cc.find('Timer/PlayerImageMask/PlayerImage', this.selfPlayerHand).getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));

                // this.cardHolder.children.forEach(function (element) {
                //     cc.find('FrontFace/Gray', element).active = true;
                // }, this);

                this.cardHolder.children.forEach(function (element) {
                    element.opacity = 150;
                }, this);
            }
        }
    },

    graySelf2: function() {
        // console.log("%c[Flow/hideSelf]", 'Orange: Tomato;');
        if (this.playerData && this.playerData.playerId && this.playerData.playerId == GameManager.user.playerId) {
        //     this.selfPlayerHand = this.pokerPresenter.HandOther_Left;
        //     this.cardHolder = this.selfPlayerHand.parent.getChildByName("Cards");

            if (this.selfPlayerHand && this.selfPlayerHand.active) {
                cc.find('Timer/PFPAvatar', this.selfPlayerHand).getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
                cc.find('Timer/PlayerImageMask/PlayerImage', this.selfPlayerHand).getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));

                // this.cardHolder.children.forEach(function (element) {
                //     cc.find('FrontFace/Gray', element).active = true;
                // }, this);

                this.cardHolder.children.forEach(function (element) {
                    element.opacity = 150;
                }, this);
            }
        }
    },

    ungraySelf: function() {
        // console.log("%c[Flow/hideSelf]", 'Orange: Tomato;');
        if (this.playerData && this.playerData.playerId && this.playerData.playerId == GameManager.user.playerId) {
        //     this.selfPlayerHand = this.pokerPresenter.HandOther_Left;
        //     this.cardHolder = this.selfPlayerHand.parent.getChildByName("Cards");

            if (this.selfPlayerHand) {
                cc.find('Timer/PFPAvatar', this.selfPlayerHand).getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
                cc.find('Timer/PlayerImageMask/PlayerImage', this.selfPlayerHand).getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));

                this.cardHolder.children.forEach(function (element) {
                    element.opacity = 255;
                }, this);
            }
        }
    },

    onDisconnectTime: function (turnDisplayTime) {
        this.pokerPresenter.model.off(K.PokerEvents.onTimerTick);
        if (!this.playerData) {
            cc.error("!this.playerData");
            return;
        }
        this.extra.active = false;
        this.normalTimerLbl.node.active = true;
        if (K.PORTRAIT) {
            this.normalTimerLbl.node.parent.active = true;
            this.normalTimerLbl.node.parent.children[0].active = true;
        }
        this.timerPSprite.node.active = this.timerSprite.node.parent.getChildByName("Base").active = true;
        // if (this.image.node.parent.parent.getChildByName("Profile_frame_Glow")) {
        //     this.image.node.parent.parent.getChildByName("Profile_frame_Glow").active = true;
        // }
        this.imgHider.active = true;
        this.pokerPresenter.model.on(K.PokerEvents.onTimerTick, function (time, elapsed) {

            this.timerSprite.fillRange = time;
            this.normalTimerLbl.node.parent.children[0].active = true;
            if (this.timerSprite.fillRange < 0) {
                this.timerSprite.fillRange = 0;
            }
            if (this.timerSprite.fillRange > 1) {
                this.timerSprite.fillRange = 1;
            }

            this.timerSprite.node.getChildByName("Dot").x = this.timerSprite.fillRange * 150 - 150 / 2;

            if (this.timerSprite.fillRange == 0) {
                this.timerSprite.node.parent.active = false;
            }

            // this.timerSprite.node.color = new cc.Color().fromHEX("#ffffff");
            // this.timerSprite.fillRange = Math.max(time, 0);
            // if (K.PORTRAIT) {
            //     this.timerPSprite.node.children[0].active = true;
            //     this.timerPSprite.fillRange = Math.max(time, 0);
            //     const angleDegrees = (this.timerPSprite.fillRange + 0.25) * 360;
            //     const angleRadians = angleDegrees * Math.PI / 180;                
            //     const x = 60 * Math.cos(angleRadians);
            //     const y = 60 * Math.sin(angleRadians);

            //     this.timerPSprite.node.children[0].x = x;
            //     this.timerPSprite.node.children[0].y = y;                
            // }
            this.normalTimerLbl.string = Math.abs(parseInt(elapsed));
        }.bind(this));
    },

    showPlayerInfo() {
        let inst = this;
        ServerCom.pomeloRequest('connector.entryHandler.getPlayerStats', {'playerId': GameManager.user.playerId, "range": 1}, function (response) {
            if (response.success) {
                console.log(response);

                inst.pokerPresenter.playerInfoPopup.active = true;
                inst.pokerPresenter.playerInfoPopup.opacity = 0;
                var anim = inst.pokerPresenter.playerInfoPopup.getComponent('AnimBase');
                if (anim !== null) {
                    anim.play("showPopUp", function () {});
                }

                // inst.inviteNode.active = false;
                inst.pokerPresenter.playerInfoPopup.getComponent("NewPlayerInfoPopup").onShow(inst.playerData, inst.pokerPresenter.model.gameData, response.data);
                let flag = !!inst.playerData.noteColor;
                inst.pokerPresenter.playerInfoPopup.getComponent("MobileNotePopup").init(flag, inst.playerData.noteColor, inst.playerData.noteText, inst.playerData.playerId, inst.pokerPresenter);
                inst.pokerPresenter.playerInfoPopup.getComponent("StickersPopup").init(inst.playerData.playerId, inst.pokerPresenter);

                GameManager.emit("hideJoinSimlar");
            }
        }, null, 5000, false);
    },

    switchBB () {
        if (GameManager.isBB) {
            GameManager.isBB = false;
        }
        else {
            GameManager.isBB = true;
        }
        GameManager.emit("switchBB");
    },

    updateBB () {
        // if (!GameManager.user.settings.stackInBB) {
        //     return;
        // }
        
        if (this.playerData) {
            this.amountLabel.node.parent.getChildByName("bb").getComponent(cc.Label).string = (Number(this.playerData.chips) / this.pokerPresenter.model.gameData.tableDetails.bigBlind).toFixed(1) + 'BB';
        }

        this.playerBetLabel.parent.getChildByName("bb").getComponent(cc.Label).string = (Number(this.playerBetLabel.getComponent(cc.Label).__string) / this.pokerPresenter.model.gameData.tableDetails.bigBlind).toFixed(1) + 'BB';

        if (GameManager.isBB && GameManager.user.settings.stackInBB) {
            // this.playerBetLabel.opacity = 0;
            this.playerBetLabel.active = false;
            // this.playerBetLabel.parent.getChildByName("bb").opacity = 255;
            this.playerBetLabel.parent.getChildByName("bb").active = true;

            this.amountLabel.node.opacity = 0;
            this.amountLabel.node.parent.getChildByName("bb").opacity = 255;
            // this.amountLabel.node.parent.getChildByName("bb").active = true;
        }
        else {
            // this.playerBetLabel.opacity = 255;
            this.playerBetLabel.active = true;
            // this.playerBetLabel.parent.getChildByName("bb").opacity = 0;
            this.playerBetLabel.parent.getChildByName("bb").active = false;

            this.amountLabel.node.opacity = 255;
            this.amountLabel.node.parent.getChildByName("bb").opacity = 0;
            // this.playerBetLabel.parent.getChildByName("bb").active = false;
        }
    },

    switchBBNow() {
        this.updateBB();
    },

    updateTimeBank() {
        if (this.isSelf() && this.playerData.state != K.PlayerState.Waiting) {
            let elapsed = this.pokerPresenter.model.gameData.timeBankLeft;
            this.timeBank.children[1].getComponent(cc.Label).string = Math.abs(parseInt(elapsed));
            if (this.timeBank.children[1].getComponent(cc.Label).string.length == 1) {
                this.timeBank.children[1].getComponent(cc.Label).string = "0" + this.timeBank.children[1].getComponent(cc.Label).string;
            }
        }
    },

    updateTimeBank2(val) {
        if (this.isSelf() && this.playerData.state != K.PlayerState.Waiting) {
            let elapsed = val;
            this.timeBank.children[1].getComponent(cc.Label).string = Math.abs(parseInt(elapsed));
            if (this.timeBank.children[1].getComponent(cc.Label).string.length == 1) {
                this.timeBank.children[1].getComponent(cc.Label).string = "0" + this.timeBank.children[1].getComponent(cc.Label).string;
            }
        }
    },

    showInvite() {
        return;
    },

    showInviteList() {
        if (this.playerData && this.playerData.playerId != GameManager.user.playerId) {
            this.inviteListNode.active = true;
        }
    },

    hideShowInvite() {
        this.inviteNode.active = false;
    },

    hideInviteList() {
        this.inviteListNode.active = false;
    },

    addFriend() {
        const opponent = this.playerData;
        GameManager.friendSendRequst(opponent.playerName, (data) => {
            this.inviteNode.active = false;
            // if (data.success) {
            //     cc.find('invite', this.inviteNode).getComponent(cc.Toggle).check();
            //     cc.find('invite', this.inviteNode).getComponent(cc.Toggle).enabled = false;
            // }
        });  
    },

    onMute() {
        const opponent = this.playerData;

        GameManager.changePlayerMute(
            opponent.playerId, 
            (data) => {
            }
        );

        // this.inviteNode.active = false;
    },

    updatePlayerImageInTable(data) {
        if (this.playerData != null && this.playerData.playerId == data.playerId) {
            this.playerData.imageAvtar = Number(data.imageAvtar) - 1;
            this.playerData.urlImg = GameManager.avatarImages[this.playerData.imageAvtar];
            this.imageLoaded(this.playerData);
        }
    },

    onBestHandsGameOver(bestHand, isWinner) {
        this.bestHandNode.active = true;
        this.bestHandNode.getChildByName("bg").getChildByName("info").getComponent(cc.Label).string = bestHand;
        if (isWinner) {
            this.bestHandNode.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = this.bestHands1;
        }
        else {
            this.bestHandNode.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = this.bestHands2;   
        }
    },

    onBestHand(bestHand) {
        console.log(">>>>>>>>>> onBestHand", this.pokerPresenter.model.gameData.tableDetails.roundName);
        if (this.pokerPresenter.model.gameData.tableDetails.roundName == K.Round.Preflop) {
            return;
        }

        if (!this.isSelf()) {
            return;
        }

        this.bestHandNode.active = true;
        // if (bestHand.indexOf(",") == -1) {
        //     this.bestHandNode.getChildByName("bg").getChildByName("info").getComponent(cc.Label).string = bestHand;
        // }
        // else {
        //     this.bestHandNode.getChildByName("bg").getChildByName("info").getComponent(cc.Label).string = bestHand.substring(0, bestHand.indexOf(","));
        // }

        function extractMiddle(str) {
              // 1. 删除第一个冒号前的所有内容
              let afterColon = str.includes(':') ? str.split(':')[1] : str;
              
              // 2. 删除最后一个逗号后的所有内容
              const lastCommaIndex = afterColon.lastIndexOf(',');
              let result = lastCommaIndex === -1 
                ? afterColon 
                : afterColon.slice(0, lastCommaIndex).trim();
              
              return result;
            }
        this.bestHandNode.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = this.bestHands2;   
        this.bestHandNode.getChildByName("bg").getChildByName("info").getComponent(cc.Label).string = bestHand;

        // this.scheduleOnce(function () {
        //     this.bestHandNode.active = false;
        // }, 1.5);
    },

    setNormalScale(normalScale) {
        this.normalScale = normalScale;
    },

    setGrayScale(grayScale) {
        this.grayScale = grayScale;
    }
});
