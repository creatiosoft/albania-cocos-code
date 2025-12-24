var PokerModelType = require('PokerModel').PokerModel;
var BetBtnUtilType = require('BetBtnUtil');
var PlayerPresenterType = require('PlayerPresenter');
var PopupManagerType = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var card = require('CardTypes').Card;
var suit = require('CardTypes').Suit;
var OptionalPlayerInputManager = require('OptionalPlayerInput');
var PotSplitterType = require('PotSplitter');
var CardDistributerType = require('CardDistributer');
var Checkbox = require('Checkbox');
var SitOutMode = require('PokerModel').SitOutMode;
var wasPaused = false;
var isPaused = false;
var prevDelay = 0;
var StickerController = require('StickerController');
var Toggle = require('Toggle');
var LoginData = require('PostTypes').Login;

/**
 * @class PokerPresenter
 * @classdesc This class used to manage all the view(Presentation) in Game!
 * @memberof Screens.Gameplay.Game
 */
cc.Class({
    extends: cc.Component,

    properties: {
        addChipsButton: {
            default: null,
            type: cc.Node,
        },
        BBToggle: {
            default: null,
            type: Toggle,
        },
        inviteFirendsList: {
            default: null,
            type: cc.Node,
        },
        tourStartNode: {
            default: null,
            type: cc.Node,
        },
        tourStartLabel: {
            default: null,
            type: cc.Label,
        },
        realBetBtn: {
            default: null,
            type: cc.Node,
        },
        realRaiseBtn: {
            default: null,
            type: cc.Node,
        },
        playerChatBtn: {
            default: null,
            type: cc.Node,
        },
        tableTheme: {
            default: null,
            type: cc.Node,
        },
        settingAvatar: {
            default: null,
            type: cc.Node,
        },
        dealerChatToggle: {
            default: null,
            type: Toggle,
        },
        ChatToggle: {
            default: null,
            type: Toggle,
        },
        dealerChatBtn: {
            default: null,
            type: cc.Node,
        },
        playreChatBtn: {
            default: null,
            type: cc.Node,
        },
        reportBug: {
            default: null,
            type: cc.Node,
        },
        tableClosed: {
            default: null,
            type: cc.Node,
        },
        playerInfoPopup: {
            default: null,
            type: cc.Node,
        },
        gameOptionButton: {
            default: null,
            type: cc.Node,
        },
        gameResultButton: {
            default: null,
            type: cc.Node,
        },
        gameLeaveButton: {
            default: null,
            type: cc.Node,
        },
        gameResult: {
            default: null,
            type: cc.Node,
        },
        model: {
            default: null,
            type: PokerModelType,
        },
        playerName: {
            default: null,
            type: cc.Label,
        },
        playerTribeName: {
            default: null,
            type: cc.Label,
        },
        image: {
            default: null,
            type: cc.Sprite,
        },
        stickerCtrl: {
            default: null,
            type: StickerController,
        },
        popUpManager: {
            default: null,
            type: PopupManagerType,
        },
        ninePlayerView: {
            default: null,
            type: cc.Prefab,
        },
        eightPlayerView: {
            default: null,
            type: cc.Prefab,
        },
        sevenPlayerView: {
            default: null,
            type: cc.Prefab,
        },
        sixPlayerView: {
            default: null,
            type: cc.Prefab,
        },
        fivePlayerView: {
            default: null,
            type: cc.Prefab,
        },
        fourPlayerView: {
            default: null,
            type: cc.Prefab,
        },
        threePlayerView: {
            default: null,
            type: cc.Prefab,
        },
        twoPlayerView: {
            default: null,
            type: cc.Prefab,
        },
        rightSeatPrefab: {
            default: null,
            type: cc.Prefab,
        },
        leftSeatPrefab: {
            default: null,
            type: cc.Prefab,
        },

        placeholderParent: {
            default: null,
            type: cc.Node,
        },
        placeHolder: {
            default: null,
            type: cc.Node,
        },
        tiledToggle: {
            default: null,
            type: cc.Node,
        },
        untiledToggle: {
            default: null,
            type: cc.Node,
        },

        callAmountLabel: {
            default: null,
            type: cc.Label,
        },
        mobileCallAmountLabel: {
            default: null,
            type: cc.Label,
        },

        playerInputNode: {
            default: null,
            type: cc.Node,
        },
        raisePanelNode: {
            default: null,
            type: cc.Node,
        },

        playerInput: {
            default: [],
            type: cc.Node,
        },
        mobilePlayerInput: {
            default: [],
            type: cc.Node,
        },
        isMobile: false,
        optionalPlayerInput: {
            default: null,
            type: OptionalPlayerInputManager,
        },

        betBtnSlider: {
            default: null,
            type: BetBtnUtilType,
        },
        tileBetBtnSlider: {
            default: null,
            type: BetBtnUtilType,
        },

        cardPrefab: {
            default: null,
            type: cc.Prefab,
        },

        holeCardHolder: {
            default: null,
            type: cc.Node,
        },

        runItTwiceHolder: {
            default: null,
            type: cc.Node,
        },

        holeCardsWithTwiceHolder: {
            default: null,
            type: cc.Node,
        },

        playerHand: {
            default: [],
            type: [PlayerPresenterType],
        },

        potAmount: {
            default: [],
            type: cc.Node,
        },

        gameOverLabel: {
            default: null,
            type: cc.Label,
        },

        resetTimer: {
            default: null,
        },

        potAnimator: {
            default: null,
            type: PotSplitterType,
        },

        cardDistributer: {
            default: null,
            type: CardDistributerType,
        },

        indexOffset: {
            default: 0,
            // visible: false,
        },
        maxSeatIndex: {
            default: 9,
            // visible: false,
        },
        selfSeatIndex: {
            default: 5,
            // visible: false,
        },

        roomNameLbl: {
            default: null,
            type: cc.Label,
        },
        roomNameLbl2: {
            default: null,
            type: cc.Label,
        },
        table: {
            default: null,
            type: cc.Sprite,
        },
        tableColors: {
            default: [],
            type: cc.SpriteFrame,
        },
        tableHighlightColors: {
            default: [],
            type: cc.SpriteFrame,
        },
        colorChangeCb: {
            default: null,
        },
        highlightBg: {
            default: null,
            type: cc.Sprite,
        },
        highLightCheckbox: {
            default: null,
            type: Checkbox,
        },
        sitOutNextHandCheckBox: {
            default: null,
            type: Checkbox,
        },
        leaveNextHandCheckBox: {
            default: null,
            type: Checkbox,
        },
        leaveNextHandTag: {
            default: null,
            type: cc.Node,
        },
        // sitOutNextBBCheckBox: {
        //     default: null,
        //     type: Checkbox,
        // },
        straddleCheckBox: {
            default: null,
            type: Checkbox,
        },
        //VR
        autoBuyInCheckBox: {
            default: null,
            type: Checkbox
        },
        autoAddOnCheckBox: {
            default: null,
            type: Checkbox,
        },

        tiledView: {
            default: null,
            type: cc.Node,
        },
        unTiledView: {
            default: null,
            type: cc.Node,
        },
        resumeBtn: {
            default: null,
            type: cc.Node,
        },
        sitOutBtns: {
            default: null,
            type: cc.Node,
        },
        totalPotLbl: {
            default: null,
            type: cc.Label,
        },
        postBigBlindCheckBox: {
            default: null,
            type: Checkbox,
        },
        cardTimers: null,
        K: null,
        rebuyBtn: {
            default: null,
            type: cc.Node,
        },
        bestHand: {
            default: null,
            type: cc.Label,
        },
        joinBtn: {
            default: null,
            type: cc.Label,
        },
        showFoldBtn: {
            default: null,
            type: cc.Label,
        },

        chatPanel: {
            default: null,
            type: cc.Node,
        },
        timerSchedule: null,
        timerOffSchedule: null,
        chatSubmitBtn: {
            default: null,
            type: cc.Button,
        },

        runItTwiceCB: {
            default: null,
            type: Checkbox,
        },
        replayBtn: {
            default: null,
            type: cc.Node,
        },
        chatEditBox: {
            default: null,
            type: cc.EditBox
        },
        chatBtn: {
            type: cc.Node,
            default: null,
        },
        preferencesPopUp: {
            default: null,
            type: cc.Node,
        },
        mobGameOptions: {
            default: null,
            type: cc.Node,
        },
        muckHandNode: {
            default: null,
            type: cc.Node,
        },
        notificationBox: {
            default: null,
            type: cc.Node,
        },
        //   model.gameData.tableDetails: null,

        // doubleRebuyCheckbox: {
        //     default: null,
        //     type: Checkbox,
        // },

        doubleRebuyBtn: {
            default: null,
            type: cc.Button,
        },
        addonBtn: {
            default: null,
            type: cc.Button,
        },

        leaveBtn: {
            default: null,
            type: cc.Button,
        },
        lobbyBtn: {
            default: null,
            type: cc.Button,
        },
        fontFileName: {
            default: null,
            type: cc.Font,
        },
        sureToFoldNode: {
            default: null,
            type: cc.Node,
        },

        sureToLeaveNode: {
            default: null,
            type: cc.Node,
        },

        winnerBannerBase: {
            default: null,
            type: cc.SpriteFrame,
        },
        muckHandCheckbox: {
            default: null,
            type: Checkbox
        },
        dealerNode: {
            default: null,
            type: cc.Node
        },
        closeBtn: {
            default: null,
            type: cc.Node
        },
        chatCloseBtn: {
            default: null,
            type: cc.Node
        },

        mobileSliderChatSection: {
            default: null,
            type: cc.Node,
        },

        leaderboardSection: {
            default: null,
            type: cc.Node,
        },

        leaderboardDummySection: {
            default: null,
            type: cc.Node,
        },

        playerChatNode: {
            default: null,
            type: cc.Node
        },

        dummyStickerPop: {
            default: null,
            type: cc.Node
        },

        nameLabel: {
            default: null,
            type: cc.Label,
        },

        containerTabBtnUtil: {
            default: null,
            type: cc.Node
        },

        HandOther_Left: {
            default: null,
            type: cc.Node
        },

        showRaisePanel: {
            default: null,
            type: cc.Node
        },

        hideRaisePanel: {
            default: null,
            type: cc.Node
        },
    },

    /**
     * If Mobile view then disabling chat pannel when user switches tabs.
     */
    onEnable: function () {
    },

    /**
     * @method setTiledView
     * @param {boolean} flag -Flag to set tile/Untile view!
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     * @description Adjust view when in tiled mode 
     */
    setTiledView: function (flag) {
        // if (!GameManager.isMobile) {
            this.setChatPanel(flag);
        // }
        this.checkSitoutStatus();
        this.unTiledView.active = !flag;
        this.tiledView.active = flag;
        this.sureToFoldNode.parent.getChildByName("BuddiesPopup").getComponent("BuddiesPopup").hideIfShowing();                        
        // this.node.getChildByName('TableBg').getChildByName('DealerSprite').active = !flag && !GameScreen.isMobile;
        // if (flag && GameScreen.gameModel.activePokerModels.length > 2) {
        //     this.node.getChildByName('TableBg').getChildByName('DealerSprite').setScale(1.3, 1.3);
        // } else {
        //     this.node.getChildByName('TableBg').getChildByName('DealerSprite').setScale(1.8, 1.8);
        // }
        this.onValueChange();
        this.setTableColor();
        if (this.preferencesPopUp)
            this.preferencesPopUp.getComponent(cc.Widget).top = flag ? 0 : 91;
        this.onSettingsBtnClose();
        if (this.chatBtn) {
            this.chatBtn.active = flag;
        }
    },

    /**
     * @description Return the no of Player in the current Table! 
     * @method getNumPlayerInTable
     * @return {Number} -Number of Player
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    getNumPlayerInTable: function () {
        var count = 0;
        this.model.gameData.tableDetails.players.forEach(function (element) {
            if (element.state == K.PlayerState.Playing)
                count++;
        }, this);
        return count;
    },

    /**
     * @description handles btn for stand up and seated player
     * @method manageBtns
     * @param {Object} 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    manageBtns: function (val) {
        //this.sitOutNextBBCheckBox.node.parent.active = val;
        this.sitOutNextHandCheckBox.node.parent.active = val;

        var playerPresenter = this.getMyPlayer();
        if (playerPresenter && playerPresenter.sitoutNextHand && this.getMyPlayer().state == K.PlayerState.Playing) {
            this.sitOutNextHandCheckBox.node.parent.active = true;
            // this.sitOutNextHandCheckBox.setSelection(true);
        }
        if (this.model.roomConfig.isAllInAndFold) {
            //this.sitOutNextBBCheckBox.node.parent.active = false;
            this.straddleCheckBox.node.parent.active = false;
            this.addChipsButton.active = false;
        }
        this.unTiledView.getChildByName('ReplayButton').active = val;
        if (!GameScreen.isMobile)
            this.tiledView.getChildByName('ReplayButton').active = val;
        else
            this.unTiledView.getChildByName('ReplayButton').active = false;

        this.isStraddleAllowed();
        this.checkInBetweenBlinds();
        if (!this.model.roomConfig.isAllInAndFold) {
            // this.unTiledView.getChildByName('AddChipsButton').active = val;
            console.log('this.model.gameData.tableDetails.players.length', this.model.gameData.tableDetails.players);
            this.addChipsButton.active = val && this.model.gameData.tableDetails.players.length > 1;
        }

        if (this.getMyPlayer() && this.getMyPlayer().state != K.PlayerState.Playing) {
            this.addChipsButton.active = false;
        }

        if (!GameManager.isMobile && !GameManager.isWindows) {
            if (this.tiledView.getChildByName('TopLeft'))
                if (!this.model.roomConfig.isAllInAndFold) {
                    this.addChipsButton.active = val;
                }
        }
        // this.tiledView.getChildByName('TopLeft').getChildByName('AddChipsButton').active = val;

        // this.muckHandCheckbox.node.parent.active = val;

        this.disableShowFoldBtn();
    },

    /**
     * @description use this for initialization -  call instantiateSeats() method.
     * @method loadSeats
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    loadSeats: function () {
        // if (K.PORTRAIT) {

            if (this.model.roomConfig.maxPlayers == 2) {
                this.instantiateSeats(5, this.model.roomConfig.maxPlayers, cc.instantiate(this.twoPlayerView), this.twoPlayerView, "PlayerPresenter");
            }
            else if (this.model.roomConfig.maxPlayers == 3) {
                this.instantiateSeats(5, this.model.roomConfig.maxPlayers, cc.instantiate(this.threePlayerView), this.threePlayerView, "PlayerPresenter");
            }
            else if (this.model.roomConfig.maxPlayers == 4) {
                this.instantiateSeats(5, this.model.roomConfig.maxPlayers, cc.instantiate(this.fourPlayerView), this.fourPlayerView, "PlayerPresenter");
            }
            else if (this.model.roomConfig.maxPlayers == 5) {
                this.instantiateSeats(5, this.model.roomConfig.maxPlayers, cc.instantiate(this.fivePlayerView), this.fivePlayerView, "PlayerPresenter");
            }
            else if (this.model.roomConfig.maxPlayers == 6) {
                this.instantiateSeats(5, this.model.roomConfig.maxPlayers, cc.instantiate(this.sixPlayerView), this.sixPlayerView, "PlayerPresenter");
            }
            else if (this.model.roomConfig.maxPlayers == 7) {
                this.instantiateSeats(5, this.model.roomConfig.maxPlayers, cc.instantiate(this.sevenPlayerView), this.sevenPlayerView, "PlayerPresenter");
            }
            else if (this.model.roomConfig.maxPlayers == 8) {
                this.instantiateSeats(5, this.model.roomConfig.maxPlayers, cc.instantiate(this.eightPlayerView), this.eightPlayerView, "PlayerPresenter");
            }
            else if (this.model.roomConfig.maxPlayers == 9) {
                this.instantiateSeats(5, this.model.roomConfig.maxPlayers, cc.instantiate(this.ninePlayerView), this.ninePlayerView, "PlayerPresenter");
            }

        // this.instantiateSeats(5, this.model.roomConfig.maxPlayers, cc.instantiate(this.ninePlayerView), this.ninePlayerView, "PlayerPresenter");
    },

    /**
     * @method isSeatAllowed
     * @param {Number} seatIdx -Index to allocate
     * @param {Number} maxSeats - Maximum allowed seats
     * @param {Number} maxSeatsInView -Maximum seats allowed in view.
     * @return {boolean}
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    isSeatAllowed: function (seatIdx, maxSeats, maxSeatsInView) {
        // return true;
        if (seatIdx > 0 && maxSeatsInView == 10) {
            var allowedSeats = [];
            switch (maxSeats) {
                case 2:
                    allowedSeats = [3, 7];
                    break;
                case 3:
                    allowedSeats = [2, 5, 8];
                    break;
                case 4:
                    allowedSeats = [1, 4, 6, 9];
                    break;
                case 5:
                    allowedSeats = [1, 4, 5, 6, 9];
                    break;
                case 6:
                    allowedSeats = [1, 3, 4, 6, 7, 9];
                    break;
                case 7:
                    allowedSeats = [1, 2, 3, 5, 7, 8, 9];
                    break;
                case 8:
                    allowedSeats = [1, 2, 3, 4, 6, 7, 8, 9];
                    break;
                default:
                    return true;
            }
            if (allowedSeats.indexOf(seatIdx) != -1) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    },
    /**
     * @description It decides the position of user position in game
     * @method getSelfSeatIdx
     * @param {Number} maxSeats -
     * @return {Number}
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    getSelfSeatIdx: function (maxSeats) {
        switch (maxSeats) {
            case 2:
                return 1;
            case 3:
                return 2;
            case 4:
                return 2;
            case 5:
                return 3;
            case 6:
                return 2;
            case 7:
                return 4;
            case 8:
                return 3;
            case 9:
                return 5;
        }
    },

    /**
     * @method instantiateSeats
     * @param {param} selfSeatIndex -
     * @param {param} maxSeatIndex
     * @param {Object} placeHolder -Node where to put/add the child
     * @param {Object} prefab
     * @param {Object} presenter
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    instantiateSeats: function (selfSeatIndex, maxSeatIndex, placeHolder, prefab, presenter) {
        // this.selfSeatIndex = selfSeatIndex;
        this.placeHolder = placeHolder;
        this.selfSeatIndex = this.getSelfSeatIdx(maxSeatIndex);
        this.maxSeatIndex = (maxSeatIndex);
        this.placeholderParent.addChild(placeHolder);
        var children = placeHolder.children;
        var seatCounter = 0;
        // console.error("MAX", maxSeatIndex);
        for (var i = 0; i < children.length; i++) {
            if (this.isSeatAllowed(i, maxSeatIndex, children.length)) {
                // console.error("seat index allowed =",i,maxSeatIndex)
                var seat = null;
                var betPos = null;
                var dealerPos = null;
                if (i < ((children.length) / 2)) {
                    seat = cc.instantiate(this.rightSeatPrefab);
                    prefab = this.rightSeatPrefab;
                } else {
                    seat = cc.instantiate(this.leftSeatPrefab);
                    prefab = this.leftSeatPrefab;
                }
                seat.setPosition(0, 0);
                // var flag = false;
                // if(children.length>=6){
                //     betPos = children[i].children[0];
                //     flag = true;
                // }else{
                //     betPos = children[i].children[0];
                // }
                betPos = children[i].children[0];
                dealerPos = children[i].children[1];
                var playerPresenter = seat.getComponent(presenter);
                playerPresenter.seatIndex = seatCounter;
                playerPresenter.sitHerePanel.active = true;
                playerPresenter.occupiedPanel.active = !playerPresenter.sitHerePanel.active;

                if (!!betPos) {

                    // if ((maxSeatIndex == 6 || maxSeatIndex == 7) && (i == 0 || i == 8)) {
                    //     playerPresenter.setBetPosition(cc.v2(betPos.getPosition().x, betPos.getPosition().y - 45));
                    //     // console.log("sdnt print error")
                    // } else {
                    // console.log(dealerPos.getPosition(), i)

                    if (K.PORTRAIT) {

                    }
                    else {
                        if (maxSeatIndex == 7) {
                            if (i == 7) {
                                betPos.setPosition(betPos.x - 190, betPos.y + 150);
                            } else
                                if (i == 3) {
                                    betPos.setPosition(betPos.x + 190, betPos.y + 150);
                                }
                        }

                        if (GameManager.isMobile && maxSeatIndex > 3) {
                            if (i == 4) {
                                betPos.setPosition(betPos.x, betPos.y + 20);
                            } else
                                if (i == 6) {
                                    betPos.setPosition(betPos.x, betPos.y + 20);
                                }
                        }

                        if (i == 3 && maxSeatIndex > 8) {
                            // console.log("this condition works");
                            betPos.setPosition(betPos.x, betPos.y + 25);
                        }

                        if (i == 5 && maxSeatIndex > 4) {
                            betPos.setPosition(betPos.x + 150, betPos.y - 40);
                        }
                    }

                    playerPresenter.setBetPosition(betPos.getPosition());
                    // console.error("***POSITION...",betPos.getPosition());
                    // }
                }
                if (!!dealerPos)
                    playerPresenter.setDealerPosition(dealerPos.getPosition());

                if (K.PORTRAIT) {
                    // seat.scale = 0.95;
                }


                if (this.selfSeatIndex == playerPresenter.seatIndex) {
                    seat.scale = 1.1;
                    playerPresenter.setNormalScale(1.1);
                    playerPresenter.setGrayScale(0.9);

                    cc.find("HandSitHere", seat).scale = 0.85;
                    cc.find("HandReserve", seat).scale = 0.85;
                    cc.find("HandEmpty", seat).scale = 0.85;
                }
                else {
                    if (cc.sys.os == cc.sys.OS_IOS) {

                        if (GameManager.isShorter()) {
                            seat.scale = 1.15;
                            playerPresenter.setNormalScale(1.15);
                            playerPresenter.setGrayScale(0.95);
                        }
                        else {

                        }
                        cc.find("HandSitHere", seat).scale = 0.85;
                        cc.find("HandReserve", seat).scale = 0.85;
                        cc.find("HandEmpty", seat).scale = 0.85;

                        if (GameManager.isShorter()) {
                            // if (children[i].x < -50) {
                            //     seat.x -= 50;
                            // }
                            // else if (children[i].x > 50) {
                            //     seat.x += 50;   
                            // }
                        }
                    }
                    else {
                        seat.scale = 0.85;
                        playerPresenter.setNormalScale(0.85);
                        playerPresenter.setGrayScale(0.65);

                        cc.find("HandSitHere", seat).scale = 1.2;
                        cc.find("HandReserve", seat).scale = 1.2;
                        cc.find("HandEmpty", seat).scale = 1.2;
                    }
                }

                if ((maxSeatIndex == 8 && i == 8) ||
                    (maxSeatIndex == 6 && i == 7) ||
                    (maxSeatIndex == 4 && i == 9)) {
                    cc.find("HandSitHere", seat).y += 100;
                    cc.find("HandReserve", seat).y += 100;
                    cc.find("HandEmpty", seat).y += 100;
                }


                children[i].addChild(seat);
                seatCounter++;
            }
            else {
                if (!this.isMobile) {
                    
                }
            }
        }

        this.playerHand = placeHolder.getComponentsInChildren(PlayerPresenterType);
        this.playerHand.forEach(function (element) {
            element.pokerPresenter = this;
        }, this);
        if (!!this.betBtnSlider)
            this.betBtnSlider.pokerPresenter = this;
        if (!!this.tileBetBtnSlider)
            this.tileBetBtnSlider.pokerPresenter = this;
        this.setDealer();

        let roomWiseSeatPositions = [];
        let twoPos = [new cc.Vec2(268, 384), new cc.Vec2(699, 2), new cc.Vec2(-680, 13.2)];
        let threePos = [new cc.Vec2(268, 384), new cc.Vec2(699, 2), new cc.Vec2(4.4, -282), new cc.Vec2(-680, 13.2)];
        let fourPos = [new cc.Vec2(268, 384), new cc.Vec2(450, 302), new cc.Vec2(406, -283), new cc.Vec2(-361.2, -281.3), new cc.Vec2(-413.9, 309.1)];
        let fivePos = [new cc.Vec2(268, 384), new cc.Vec2(450, 302), new cc.Vec2(406, -283), new cc.Vec2(4.4, -282), new cc.Vec2(-361.2, -281.3), new cc.Vec2(-413.9, 309.1)];
        let sixPos = [new cc.Vec2(268, 384), new cc.Vec2(460.9, 294.1), new cc.Vec2(699, 2), new cc.Vec2(406, -283), new cc.Vec2(-361.2, -281.3), new cc.Vec2(-680, 13.2), new cc.Vec2(-440.9, 309.1)];
        let sevenPos = [new cc.Vec2(268, 384), new cc.Vec2(460.9, 294.1), new cc.Vec2(699, 2), new cc.Vec2(406, -283), new cc.Vec2(4.4, -282), new cc.Vec2(-361.2, -281.3), new cc.Vec2(-680, 13.2), new cc.Vec2(-440.9, 309.1)];
        let eightPos = [new cc.Vec2(268, 384), new cc.Vec2(460.9, 294.1), new cc.Vec2(700, 129.9), new cc.Vec2(706.3, -86.4), new cc.Vec2(406, -283), new cc.Vec2(-361.2, -274.3), new cc.Vec2(-679.5, -76.1), new cc.Vec2(-674.4, 140.3), new cc.Vec2(-440.9, 309.1)];
        let ninePos = [new cc.Vec2(268, 384), new cc.Vec2(460.9, 294.1), new cc.Vec2(700, 129.9), new cc.Vec2(706.3, -86.4), new cc.Vec2(406, -283), new cc.Vec2(4.4, -287), new cc.Vec2(-361.2, -274.3), new cc.Vec2(-679.5, -76.1), new cc.Vec2(-674.4, 140.3), new cc.Vec2(-440.9, 309.1)];
        roomWiseSeatPositions.push(null, null, twoPos, threePos, fourPos, fivePos, sixPos, sevenPos, eightPos, ninePos);

        if (K.PORTRAIT) {
            // twoPos = [new cc.Vec2(268, 384), new cc.Vec2(699, 2), new cc.Vec2(-680, 13.2)];
            // threePos = [new cc.Vec2(268, 384), new cc.Vec2(699, 2), new cc.Vec2(4.4, -282), new cc.Vec2(-680, 13.2)];
            // fourPos = [new cc.Vec2(268, 384), new cc.Vec2(450, 302), new cc.Vec2(406, -283), new cc.Vec2(-361.2, -281.3), new cc.Vec2(-413.9, 309.1)];
            // fivePos = [new cc.Vec2(268, 384), new cc.Vec2(450, 302), new cc.Vec2(406, -283), new cc.Vec2(4.4, -282), new cc.Vec2(-361.2, -281.3), new cc.Vec2(-413.9, 309.1)];
            // sixPos = [new cc.Vec2(268, 384), new cc.Vec2(460.9, 294.1), new cc.Vec2(699, 2), new cc.Vec2(406, -283), new cc.Vec2(-361.2, -281.3), new cc.Vec2(-680, 13.2), new cc.Vec2(-440.9, 309.1)];
            // sevenPos = [new cc.Vec2(268, 384), new cc.Vec2(460.9, 294.1), new cc.Vec2(699, 2), new cc.Vec2(406, -283), new cc.Vec2(4.4, -282), new cc.Vec2(-361.2, -281.3), new cc.Vec2(-680, 13.2), new cc.Vec2(-440.9, 309.1)];
            // eightPos = [new cc.Vec2(268, 384), new cc.Vec2(460.9, 294.1), new cc.Vec2(700, 129.9), new cc.Vec2(706.3, -86.4), new cc.Vec2(406, -283), new cc.Vec2(-361.2, -274.3), new cc.Vec2(-679.5, -76.1), new cc.Vec2(-674.4, 140.3), new cc.Vec2(-440.9, 309.1)];
            // ninePos = [new cc.Vec2(268, 384), new cc.Vec2(460.9, 294.1), new cc.Vec2(700, 129.9), new cc.Vec2(706.3, -86.4), new cc.Vec2(406, -283), new cc.Vec2(4.4, -287), new cc.Vec2(-361.2, -274.3), new cc.Vec2(-679.5, -76.1), new cc.Vec2(-674.4, 140.3), new cc.Vec2(-440.9, 309.1)];
            // roomWiseSeatPositions.push(null, null, twoPos, threePos, fourPos, fivePos, sixPos, sevenPos, eightPos, ninePos);
        }
        else {
            this.playerHand.forEach(function (element, i) {
                element.node.parent.setPosition(roomWiseSeatPositions[maxSeatIndex][i]);
            }, this);
        }

    },

    /**
     * @method resetGame 
     * @description Resets Game
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    resetGame: function () {
        if (this.node.getChildByName("winnerBannerBg")) {
            this.node.getChildByName("winnerBannerBg").active = false;
        }
        this.clearBreakTimer();
        this.popUpManager.hide(2, function () { });
        this.checkInBetweenBlinds();
        this.hideMoves();
        this.muckHandNode.active = false;
        this.playerHand.forEach((element, i) => {
            element.hideWinningAnim();
        }, this);

        this.manageBtns(!this.model.isPlayerStandUp() && this.getMyPlayer().state == K.PlayerState.Playing);
        if (this.model.gameData.tableDetails.players.length > 1) {

            this.timersToKill.push(setTimeout(function () {
                // var ante = this.model.gameData.raw.tourData.raw.currentBlindLevel.ante;
                // var totalAnte = ante * this.model.gameData.tableDetails.players.length;
                // var players = this.model.gameData.tableDetails.players;
                // for (var index = 0; index < players.length; index++) {
                //     var presenter = this.playerHand[this.getRotatedSeatIndex(players[index].seatIndex)];
                //     if (ante > 0) {
                //         // presenter.playerData.chips -= ante;
                //         presenter.displayBlind(ante);
                //         presenter.activatePlayerBet(false, true);
                //     }
                // }

                // if (totalAnte > 0) {
                //     this.timersToKill.push(setTimeout(function () {
                //         if (!this.totalPotLbl) {
                //             return;
                //         }
                //         this.totalPotLbl.node.parent.active = true;
                //         // this.totalPotLbl.string = totalAnte;
                //         this.totalPotLbl.string = GameManager.convertChips(totalAnte);
                //         this.totalPotLbl.__string = totalAnte;
                //         this.potAmount[0].getComponent(cc.Label).string = GameManager.convertChips(totalAnte);
                //         this.potAmount[0].getComponent(cc.Label).__string = totalAnte;
                //         this.potAmount[0].parent.active = true;
                //         this.potAmount[0].children[0].getComponent('PokerChipsView').generateChips(totalAnte);
                //     }.bind(this), 600));
                // }
            }.bind(this), 1));
        }

        if (!this.model.isPlayerStandUp() && this.getMyPlayer().state == K.PlayerState.Playing) {
            this.resumeBtn.active = false;
        }
    },

    resetGameForReshuffle: function (isRejoin=false) {
        if (isRejoin) {
            cc.director.getActionManager().removeAllActions();
            this.model.gameModel.removeBroadcastCallbacks(this.model.gameData.channelId);
            this.cardDistributer.clearTimers();
            this.killTimers();
        }
        console.log("%c[Flow/resetGameForReshuffle]", 'Orange: Tomato;');
        if (this.node.getChildByName("winnerBannerBg")) {
            this.node.getChildByName("winnerBannerBg").active = false;
        }
        this.clearBreakTimer();
        this.popUpManager.hide(2, function () { });
        this.checkInBetweenBlinds();
        this.hideMoves();
        this.clearHoleCards();
        this.handleSitOutBtns(true);
        this.resetView();
        this.muckHandNode.active = false;

        console.log("this.playerHand", this.playerHand);
        
        // this.playerHand.forEach((element, i) => {
        //     element.hideWinningAnim();
        //     // if (element.seatState === K.SeatState.Free) {
        //     //     element.disableView();
        //     // }
        //     // else {
        //     //     element.disablePlayerView();
        //     // }
        //     element.disableView();
        // }, this);

        if (this.placeHolder) {
            this.placeHolder.removeFromParent(true);
            this.placeHolder = null;
        }
    },

    setPostBigBlind: function (override = false, flag = true) { },

    /**
     * @method setChatPanel
     * @description enable/disable Chat Panel
     * @param {boolea} val
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    setChatPanel: function (val) {
        // this.chatPanel.active = !val;
        // console.log(this.chatEditBox,this.chatEditBox.stayOnTop)
        if (!GameScreen.isMobile) {

            // this.chatEditBox.stayOnTop = !val;
        }
    },


    //need to remove this

    getParent: function (box) {
        return this.box.node.parent;
    },

    /**
     * @method onLoad
     * @description BroadCasts are registered in this method which are emitted from PokerModel
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onLoad: function () {

        // ServerCom.pomeloRequest("connector.entryHandler.getCurrentJackpotPool", {
        //     "playerId": GameManager.user.playerId
        // }, function (response) {
        //     console.log("getCurrentJackpotPool response", response);
        //     if (response.success) {
                
        //     }
        // }, null, 5000, false, false);

        // GameManager.startRefreshTokenTimer(() => {
        //     console.log("startRefreshTokenTimer");
        //     ServerCom.refreshConnectToServer(K.ServerAddress.bingoServer, () => {}, () => {});
        //     ServerCom.refreshConnectToPomelo();
        // });

        this.checkForWindowScene = false;
        if (cc.sys.os === cc.sys.OS_WINDOWS && !cc.sys.isBrowser) {
            this.checkForWindowScene = true;
        }

        // this.isMobileInputActive = false;
        // this.isMobileInputAvailable = !!this.mobilePlayerInput;
        //if (!!this.mobilePlayerInput[0])
        //   this.isMobileInputActive = !!this.mobilePlayerInput[0].active;



        // console.log("grid reference....", this.node.parent.getParent().children);
        this.timersToKill = [];
        this.preCheckCounter = 0;


        /**
         *  Cards Sapcing to manage space between cards in community cards animations and player hands, these settings will be common for every type of game,
         * If cards size needs to be change then use thses variables to adjust spacing between them
         * 
         */
        this.CardStartingPositionOnTable = 226; //johnny//260; //starting position of cards on Table, With old Cards it was "240"
        this.CardsPositionOffset = 108; //130; // offset between any two cards on table or in player Hand, With old Cards it was "120"




        // ANIMATION DELAY CONTROLLER VARIABLES
        /**
         * DO NOT CHANGE THESE VALUES UN-KNOWINGLY AS THEY ARE CLOSESELY COUPLED WITH SERVER FOR SMOOTH ANIMATION AND GAME PLAY.
         */
        this.winnerBannerDeactivateTimerDelay = 1.3; // delay in hiding winner banner
        this.potDistributionTimerDelay = 1; // delay in processing one pot, untill next pot called
        this.potSplitterMoveActionDelay = 0.6; // delay in staring chips to move to subsicuent winners in relation with above delay.
        this.runItTwiceLowerCardDelay = 0.5; //delay in showing lower Table cards when run it twice called with aal in at first move.
        this.runItTwiceSlideToOpenDelay = .3; // delay in Slide to Open animation between each cards when run it twice selected



        this.K = K;
        this.isMobile = GameScreen.isMobile;
        this.playerInput[0].active = false;
        if (/*this.isMobileInputAvailable &&*/ !GameManager.isWindows && !GameManager.isMobile && GameScreen.viewType == 1) {
            this.mobilePlayerInput[0].active = false;
            // console.error("MOBILE INPUT DONE OFF...1");
        }
        this.setChatPanel(GameScreen.viewType == 1);
        this.cardTimers = [];
        GameManager.on("updateTableImage", this.onUpdateTableImage.bind(this));
        // GameManager.on("updateTableBgImage", this.onUpdateTableBgImage.bind(this));
        GameManager.on("switchBB", this.switchBBNow.bind(this));
        GameManager.on("removeTable", this.onRemoveTable.bind(this));
        this.model.on('leaveNextHand', this.onleaveNextHand.bind(this));
        this.model.on(K.PokerEvents.OnJoin, this.onJoinSuccess.bind(this));
        this.model.on(K.PokerEvents.OnHoleCard, this.addHoleCard.bind(this));
        this.model.on(K.PokerEvents.OnSit, this.sitSuccess.bind(this));
        this.model.on(K.PokerEvents.OnBlindDeduction, this.deductBlind.bind(this));
        this.model.on(K.PokerEvents.OnPlayerStateChange, this.playerStateChange.bind(this));
        this.model.on(K.PokerEvents.OnGamePlayers, this.resetGame.bind(this));
        this.model.on(K.PokerEvents.OnDealerChat, this.dealerChat.bind(this));
        this.model.on(K.PokerEvents.OnStartGame, this.startGame.bind(this));
        this.model.on(K.PokerEvents.OnTurn, this.nextTurn.bind(this));
        this.model.on(K.PokerEvents.OnRoundOver, this.roundOver.bind(this));
        this.model.on(K.PokerEvents.OnGameOver, this.gameOver.bind(this));
        this.model.on(K.PokerEvents.OnLeave, this.playerLeft.bind(this));
        this.model.on(K.PokerEvents.OnChat, this.chat.bind(this));
        this.model.on(K.PokerEvents.OnPlayerCard, this.playerCards.bind(this));
        this.model.on(K.PokerEvents.onPlayerStandUp, this.onStandUp.bind(this));
        this.model.on(K.PokerEvents.onRotateView, this.rotateView.bind(this));
        this.model.on(K.PokerEvents.OnClearHoleCards, this.clearTable.bind(this));
        this.model.on(K.PokerEvents.onPreCheck, this.onPreCheck.bind(this));
        this.model.on(K.PokerEvents.onPlayerNotes, this.onPlayerNotes.bind(this));
        this.model.on(K.PokerEvents.onPlayerCoins, this.onPlayerCoins.bind(this));
        this.model.on(K.PokerEvents.onBestHand, this.onBestHand.bind(this));
        this.model.on(K.PokerEvents.onTimeBank, this.onTimeBank.bind(this));
        this.model.on('rebuyActivated', this.onRebuyActivated.bind(this));
        this.model.on('rebuyDeactivated', this.onRebuyDeactivated.bind(this));
        this.model.on(K.PokerEvents.onChannelEvent, this.showWinnerCards.bind(this));
        this.model.on(K.PokerEvents.OnBankrupt, function (data) {
            this.onAddChips(this.model.roomConfig.minBuyIn);
        }.bind(this));
        this.model.on("ReservedState", function (data) {
            // console.error(1)
            let arg = (data.extraAntiBankCase) ? "extraAntiBankCase" : this.model.roomConfig.minBuyIn;
            this.onAddChips(arg, undefined, data.extraAntiBankCase);
        }.bind(this));
        this.model.on("clearTimers", function (data) {
            this.killTimers();
        }.bind(this));
        this.colorChangeCb = this.changeTableColor.bind(this);
        this.tempOnLoad();
        GameManager.on(K.GameEvents.OnTableColorChange, this.colorChangeCb);
        // this.openAddChipsCB = this.onAddChips.bind(this);

        GameManager.on("openBuyInPopup", function (data) {
            // console.log(!!this.model && data == this.model.gameData.channelId)
            if (!!this.model && data == this.model.gameData.channelId) {
                let arg = (this.model.roomConfig.extraAntiBankCase) ? "extraAntiBankCase" : this.model.roomConfig.minBuyIn;
                this.onAddChips(arg, true);
            }
        }.bind(this));

        GameManager.on("waiting_List_Event", function (channelId, flag) {
            if (!!this.model && this.model.gameData.channelId == channelId) {
                this.model.gameData.isJoinWaiting = flag;
                this.enableJoinBtn();
            }
        }.bind(this));

        // this.leaveNextHandCheckBox.registerCallback(this.onLeaveNextHand.bind(this));
        this.sitOutNextHandCheckBox.registerCallback(this.onSitOutNextHand.bind(this));
        //  this.sitOutNextBBCheckBox.registerCallback(this.onSitOutNextBB.bind(this));
        this.straddleCheckBox.registerCallback(this.onStraddle.bind(this));
        this.postBigBlindCheckBox.registerCallback(this.onPostBigBlind.bind(this));
        this.runItTwiceCB.registerCallback(this.onRunItTwice.bind(this));
        this.muckHandCheckbox.registerCallback(this.onMuckHand.bind(this));
        //VR
        GameScreen.node.on("grid-refreshed", this.checkNotification.bind(this));
        this.imageLoadedRef = this.imageLoaded.bind(this);
        GameManager.on("image-loaded", this.imageLoadedRef);
        // 
        // if (GameManager.user.urlImg) {
        //     this.image.spriteFrame = GameManager.user.urlImg;
        // }
        this.playerName.string = GameManager.user.userName;
        // this.playerTribeName.string = GameManager.user.tribeName || "N/A";
        // 
        cc.game.pause = function () {
            isPaused = true;
            wasPaused = true;

        };
        cc.game.resume = function () {
            isPaused = false;
        };
        GameManager.on(K.GameEvents.onReset, function () {
            if (this.playerHand) {
                for (var index = 0; index < this.playerHand.length; index++) {
                    this.playerHand[index].clearPlayerCards();
                }
            }
            this.clearPots();
            this.clearHoleCards();
        }.bind(this));

        this.singleTime = false;
        GameManager.on("connectionAcknowledged", function (data) {
            if (!!this.model && data == this.model.gameData.channelId) {
                this.hideMoves();
            }
        }.bind(this));

        this.mobileGamePlayOptionsVisible = false;

        this.node.parent.getChildByName("GameplayOptions").on("position-changed", (e) => {
            // console.error(e, this.node.parent.getChildByName("GameplayOptions").position);
        });
        // For Sticker
        // cc.systemEvent.on(K.PokerEvents.onSendSticker, this.displayStickers.bind(this));        
        GameManager.on(K.PokerEvents.onSendSticker, this.displayStickers.bind(this));        

        //Tanuj
        if (!GameManager.isMobile) {
            this.setTileUntileToggle();
        }

        // this.scheduleOnce(() => {
            this.onUpdateTableImage();
        // }, 0.1);

        // this.onUpdateTableImage();
        // this.onUpdateTableBgImage();

        this.settingAvatar.getComponent(cc.Sprite).spriteFrame = GameManager.user.urlImg;

        if (this.totalPotLbl) {
            if (GameManager.user.category == "GOLD") {
                // this.totalPotLbl.node.parent.getChildByName("gold").active = true;
                // this.totalPotLbl.node.parent.getChildByName("diamond").active = false;
            }
            else {
                // this.totalPotLbl.node.parent.getChildByName("gold").active = false;
                // this.totalPotLbl.node.parent.getChildByName("diamond").active = true;
            }
        }
        if (this.potAmount) {
            this.potAmount.forEach(function (element) {
                if (GameManager.user.category == "GOLD") {
                    // element.parent.getChildByName("gold").active = true;
                    // element.parent.getChildByName("diamond").active = false;
                }
                else {
                    // element.parent.getChildByName("gold").active = false;
                    // element.parent.getChildByName("diamond").active = true;
                }
            }, this);
        }
    },

    updateTourStartTimer:function() {
        console.log("tourStartTimer");
        this.unschedule(this.tourStartTimer);
        this.tourStartTimer();
        this.schedule(this.tourStartTimer, 1);
    },

    tourStartTimer() {
        console.log("tourStartTimer");
        var now = new Date().getTime();
        console.log("tourStartTimer", GameManager.tableStartTime, now, GameManager.tableStartTime - now);
        if (GameManager.tableStartTime - now < 0) {
            console.log("tourStartTimer2");
            this.unschedule(this.tourStartTimer);
            this.tourStartLabel.node.parent.parent.active = false;
            return;
        }
        console.log("tourStartTimer3");
        let timeRemaining = GameManager.getMTimeDurationEx(GameManager.tableStartTime);
        this.tourStartLabel.string = timeRemaining;
    },

    updateBlindTimer:function() {
        // this.unschedule(this.blindTimer);
        // this.blindTimer();
        // this.schedule(this.blindTimer, 1);
    },

    blindTimer() {
        // let timeRemaining = GameManager.getMTimeDuration(Number(this.model.gameData.raw.tourData.raw.currentBlindLevel.nextBlindLevelTime) * 1000);
        // this.blindLabel2.string = "Next Blind:" + timeRemaining;
    },

    imageLoaded: function (user) {
        if (this.model.gameData.playerId == user.playerId) {
            // this.image.spriteFrame = user.urlImg;
        }
    },

    updateBlind: function() {
        // this.blindLabel.string = "";
        // this.blindLabel2.string = "";

        // this.blindLabel.string  = "Current Blind:" + this.model.gameData.raw.tourData.raw.currentBlindLevel.smallBlind + "/" + this.model.gameData.raw.tourData.raw.currentBlindLevel.bigBlind;

        // let nextBlindLevel = null;
        // for(let i = 0; i < this.model.gameData.raw.tourData.raw.blindRule.blindRuleArr.length; i ++) {
        //     let blindRule = this.model.gameData.raw.tourData.raw.blindRule.blindRuleArr[i];
        //     if (blindRule.level == this.model.gameData.raw.tourData.raw.currentBlindLevel.level) {
        //         if (i == this.model.gameData.raw.tourData.raw.blindRule.blindRuleArr.length - 1) {
        //             nextBlindLevel = this.model.gameData.raw.tourData.raw.blindRule.blindRuleArr[i];
        //         }
        //         else {
        //             nextBlindLevel = this.model.gameData.raw.tourData.raw.blindRule.blindRuleArr[i + 1];
        //         }
        //         break;
        //     }
        // }
        // this.blindLabel2.string = "Next Blind:" + nextBlindLevel.smallBlind + "/" + nextBlindLevel.bigBlind;
    },

    getWorldPos: function(node) {
        return node.convertToWorldSpaceAR(cc.v2(0, 0));
    },

    setWorldPos: function(node, posWS) {
        node.setPosition(node.parent.convertToNodeSpaceAR(posWS));
    },


    displayStickers: function(event) {
    },    

    setTileUntileToggle: function () {
        // console.log("called A");
        if (GameScreen.viewType == LayoutType.UnTiled) {
            // console.log("called B");
            // this.untiledToggle.getChildByName("DoTile").getComponent(cc.Button).interactable = false;
            // this.untiledToggle.getChildByName("DoUntile").getComponent(cc.Button).interactable = true;
        } else {
            // console.log("called C");
            // this.tiledToggle.getChildByName("DoTile").getComponent(cc.Button).interactable = false;
            // this.tiledToggle.getChildByName("DoUntile").getComponent(cc.Button).interactable = true;
        }
    },

    changeToTiled: function () {
        // console.log("hehe"));
        GameScreen.setTiledView();
        for (var model in GameScreen.activePokerModels) {
            // console.log(GameScreen.viewType)
            model.presenter.setTileUntileToggle();
        }
    },
    changeToUntiled: function () {
        // console.log("haha");
        GameScreen.setUnTiledView();
        for (var model in GameScreen.activePokerModels) {
            // console.log(GameScreen.viewType)
            model.presenter.setTileUntileToggle();
        }
    },

    start() {
        this.mobileGamePlayOptionsInitPosition = this.node.parent.getChildByName("GameplayOptions").getPosition();
        // console.log("rajat 1", this.mobileGamePlayOptionsInitPosition.x);
        if (GameManager.isMobile) {
            // console.log("Hi");
            this.mobileChatOptionsInitPosition = this.mobileSliderChatSection.getPosition();
            // this.leaderboardInitPosition = this.leaderboardSection.getPosition();
            this.scheduleOnce(() => {
                this.mobileSliderChatSection.active = false;
                this.mobileGamePlayOptionsInitPosition = this.node.parent.getChildByName("GameplayOptions").getPosition();
                // console.log("rajat 2", this.mobileGamePlayOptionsInitPosition.x);

            }, 0.1);

        }

        if (K.PORTRAIT) {
            // this.scheduleOnce(() => {
            //     this.node.parent.getChildByName("GameplayOptions").width = this.node.parent.getChildByName("DummGameplayOpt").width;
            //     this.node.parent.getChildByName("GameplayOptions").x = -this.node.parent.getChildByName("GameplayOptions").width;
            // }, 0.5);
        }
    },

    checkNotification: function () {
        if (!!(this.playerInput) && this.unTiledView.active && ((this.playerInput[0].active) && GameManager.activeTableCount >= 1)) {
            this.model.emit(K.PokerEvents.onTurnInOtherRoom, this.model, true);
        }
        if (GameScreen.viewType == 1) {
            if (!!(this.playerInput) && this.unTiledView.active && ((this.playerInput[0].active || this.mobilePlayerInput[0].active) && GameManager.activeTableCount >= 1)) {
                this.model.emit(K.PokerEvents.onTurnInOtherRoom, this.model, true);
            }
        }

    },
    /**
     * @method onTimeBank
     * @description It's enable/disable TimeBank
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onTimeBank: function (data) {
        var playerPresenter = this.playerHand[this.getRotatedSeatIndex(this.model.gameData.tableDetails.currentMoveIndex)];
        if (!!data && !!this.selfLastMoveData && data.playerId === this.model.gameData.playerId) {
            this.enableSelfTurn(playerPresenter, this.selfLastMoveData);
        }
        playerPresenter.enableTimeBank();
    },
    /**
     * @method setTableColor
     * @description Set Table Color accordingly.
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    setTableColor: function () {
        this.model.emit(K.GameEvents.OnTableColorChange);
        var col = this.model.gameData.settings.tableColor + "";
        if (col !== undefined || col !== null) {
            if (this.tiledView.active) {
                this.table.spriteFrame = (this.highLightCheckbox && this.highLightCheckbox.getSelection()) ? this.tableHighlightColors[col] : this.tableColors[col];
            } else {
                this.table.spriteFrame = this.tableColors[col];
            }
        }
    },

    tempOnLoad: function () { },
    onDestroy: function () {
        this.cardTimers.forEach(function (element) {
            clearTimeout(element);
        }, this);
        this.cardTimers = [];
        this.model.removeAllListeners();
        this.clearBreakTimer();
        this.killTimers();
        GameManager.off(K.GameEvents.OnTableColorChange, this.colorChangeCb);
        // For Sticker
        // cc.systemEvent.off(K.PokerEvents.onSendSticker);                
        GameManager.off(K.PokerEvents.onSendSticker, this.displayStickers.bind(this));                
        GameManager.off("image-loaded", this.imageLoadedRef);               
    },

    /**
     * @description Set seatIndex offset for rotating the seats
     * @param {Number} desiredIndex -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    setIndexOffset: function (desiredIndex) {
        this.indexOffset = desiredIndex - this.selfSeatIndex;
    },

    /**
     * @description Get the rotatedSeatIndex
     * @param {Number} seatIndex
     * @returns: rotatedSeatIndex
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    getRotatedSeatIndex: function (seatIndex) {
        var index = 0;
        index = seatIndex - this.indexOffset;
        if (index < 1) {
            index = index + this.maxSeatIndex;
        }
        if (index > this.maxSeatIndex) {
            index = index - this.maxSeatIndex;
        }
        console.log("getRotatedSeatIndex", seatIndex, index);
        return index;
    },

    /**
     * @description Called when a player's turn come.
     * @method enableCurrentPlayerTurn
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    enableCurrentPlayerTurn: function () {
        if (this.model.gameData.tableDetails.currentMoveIndex !== -1) {
            this.displayPots();
            var playerPresenter = this.playerHand[this.getRotatedSeatIndex(this.model.gameData.tableDetails.currentMoveIndex)];
            //            a.displayPots();
            playerPresenter.onTurn(this.model.gameData.tableDetails.turnTime);
            if (this.checkForSelfTurn(playerPresenter.playerData.playerId)) {
                this.selfLastMoveData = playerPresenter.playerData.moves;
                this.enableSelfTurn(playerPresenter, playerPresenter.playerData.moves);
            } else {
                this.model.emit(K.PokerEvents.onTurnInOtherRoom, this.model, false);
            }
        }
    },
    /**
     * @method setDealer
     * @description set Dealer position
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    setDealer: function () {
        console.log("setDealer1");
        this.playerHand.forEach(function (element) {
            console.log("setDealer2");
            element.setDealer(false);
        }, this);
        console.log("this.model.gameData.tableDetails.dealerIndex", this.model.gameData.tableDetails.dealerIndex);
        if (this.model.gameData.tableDetails.dealerIndex >= 0) {
            this.getPlayerBySeat(this.model.gameData.tableDetails.dealerIndex).setDealer(true);
        }
    },

    /**
     * @method placeDummyCards
     * @description place the dummy card in specified position
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    placeDummyCards: function (id = null) {
        // set dealer btn
        for (var index = 0; index < this.playerHand.length; index++) {
            this.playerHand[index].displayDummyCards(this.model.dummyCardsCount, id);
        }
    },

    /**
     * @description Updates the seat view
     * @param {array} playerData
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    allocateSeat: function () {
        // seat players based on seat index 
        for (var index = 0; index < this.model.gameData.tableDetails.players.length; index++) {
            this.getPlayerByIdx(index).playerData = this.model.gameData.tableDetails.players[index];
            this.getPlayerByIdx(index).enablePlayerView(this.model.gameData.playerId);
        }
        // check for game state and update current turn a
        if (this.model.gameData.tableDetails.state === K.GameState.Running) {
            this.enableCurrentPlayerTurn();
            this.placeDummyCards(this.model.gameData.playerId);
            this.setDealer();

            this.enablePrecheckAfterRetry();
        }
    },
    enablePrecheckAfterRetry: function () {
        // console.log("shishir init precheck")
        if (this.model.gameData.tableDetails.currentMoveIndex !== -1) {
            var playerPresenter = this.getMyPlayer();
            //            a.displayPots();
            // console.log("shishir", playerPresenter)
            if (!!playerPresenter) {
                // let displayprecheck = true;
                // console.log("shishir condition ", playerPresenter.seatIndex == this.model.gameData.tableDetails.currentMoveIndex)

                if (playerPresenter.seatIndex == this.model.gameData.tableDetails.currentMoveIndex) {
                    // current move is Mine no precheck defined.
                } else {
                    let state = playerPresenter.state;
                    if (playerPresenter.chips < 0 || state == K.PlayerState.Waiting || state == K.PlayerState.OutOfMoney || state == K.PlayerState.OnBreak || state == K.PlayerState.Reserved || playerPresenter.lastMove == K.PlayerState.AllIn || playerPresenter.lastMove == K.PlayerState.Fold) {
                        //  
                        // console.error("HIDING PRECHECK ");

                    } else {
                        let data = {
                            channelId: playerPresenter.channelId,
                            playerId: playerPresenter.playerId,
                            set: playerPresenter.preCheck,
                            precheckValue: playerPresenter.precheckValue,
                            route: "preCheck"
                        }
                        this.onPreCheck(data);
                    }
                }
            }
        }
    },
    /**
     * @method getPlayerByIdx
     * @return {Number}
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    getPlayerByIdx: function (idx) {
        return this.getPlayerBySeat(this.model.gameData.tableDetails.players[idx].seatIndex);
    },

    /**
     * @method getPlayerBySeat
     * @param {Number} 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    getPlayerBySeat: function (seatIdx) {
        console.log("getPlayerBySeat", seatIdx);
        for (var index = 0; index < this.playerHand.length; index++) {
            console.log("index", index);
            console.log(this.playerHand[index]);
        }
        return this.playerHand[this.getRotatedSeatIndex(seatIdx)];
    },

    isObserver: function () {
        for (var index = 0; index < this.model.gameData.tableDetails.players.length; index++) {
            if (this.model.gameData.tableDetails.players[index].playerId === GameManager.user.playerId) {
                return false;
            }
        }
        return true;
    },

    isObserver2: function () {
        for (var index = 0; index < this.model.gameData.tableDetails.players.length; index++) {
            if (this.model.gameData.tableDetails.players[index].playerId === GameManager.user.playerId) {
                return false;
            }
        }
        return true;
    },


    /**
     * @description Event handler for OnJoin Event
     * @param {Object} tableData
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onJoinSuccess: function (data) {
        this.preCheckCounter = 0;
        if (this.muckHandNode) {
            this.muckHandNode.active = false;
        }
        this.model.popUpManager = this.popUpManager;
        this.loadSeats();
        this.clearPots(); //It was done in JoinExtras  ??? Why ?? for OFC ??
        var selfIndex = this.model.getPlayerById(this.model.gameData.playerId);
        this.onJoinExtras();
        this.tempOnJoinSuccess();
        this.enableJoinBtn();
        if (selfIndex !== -1) {
            this.model.gameData.isJoinWaiting = false; //TODO : Should be done in PokerModel
            for (var index = 0; index < this.playerHand.length; index++) {
                if (this.playerHand[index].seatState === K.SeatState.Free) {
                    this.playerHand[index].disableView();
                }
            }
            this.manageBtns(!this.model.isPlayerStandUp() && this.getMyPlayer().state == K.PlayerState.Playing);
            if (this.getMyPlayer().state == K.PlayerState.Playing || this.getMyPlayer().state == K.PlayerState.OnBreak) {
                this.rotateView({
                    seatIndex: this.model.gameData.tableDetails.players[selfIndex].seatIndex
                });
            } else {
                this.allocateSeat();
            }
            if (this.model.gameData.tableDetails.players[selfIndex].state === K.PlayerState.OnBreak) {
                this.handleSitOutBtns(false);
            }

            if (this.getMyPlayer().state == K.PlayerState.Playing && this.getMyPlayer().lastMove == K.PlayerState.Fold) {
                this.enableShowFoldBtn();
            }
            else {
                 this.disableShowFoldBtn();   
            }

            // this.unTiledView.getChildByName('AddChipsButton').x = this.playerHand[selfIndex].node.parent.x;
            // this.unTiledView.getChildByName('AddChipsButton').y = this.playerHand[selfIndex].node.parent.y;
        } else {
            this.allocateSeat();
            this.manageBtns(false);
        }

        this.handleRunItTwice(true, true, this.model.gameData.isRunItTwice);
        if (this.model.gameData.bestHands !== "") {
            if (this.getMyPlayer() !== null) {
                this.getMyPlayer().bestHand = this.model.gameData.bestHands;
            }
            // this.onBestHand();
        }
        this.showMuckHand();
        // if (this.model.gameData.settings.isMuckHand)
        //     this.muckHandCheckbox.setSelection(true);
        // else this.muckHandCheckbox.setSelection(false);
        this.muckHandCheckbox.setSelection(this.model.gameData.settings.isMuckHand);

        if (this.model.isVideo) {
            this.unTiledView.getChildByName('HandInfoButton').active = false
        }

        if (GameManager.isP && GameManager.isMobile) {
            this.unTiledView.getChildByName('HandInfoButton').active = false;
            this.unTiledView.getChildByName('HandHistoryButton').active = false;
        }

        if (GameManager.isSD) {
            // this.node.getChildByName('TableBg').children[0].getComponent(cc.Sprite).spriteFrame = GameManager.SDSprites[3];
            // this.node.getChildByName('TableBg').children[0].active = true;
        }


        // let players = this.model.gameData.tableDetails.players;
        // for (var index = 0; index < players.length; index++) {
        //     var presenter = this.playerHand[this.getRotatedSeatIndex(players[index].seatIndex)];
        //     presenter.node.getChildByName("BB").active = false;
        //     presenter.node.getChildByName("SB").active = false;
        //     presenter.node.getChildByName("BB2").active = false;
        //     presenter.node.getChildByName("SB2").active = false;

        //     if (players[index].seatIndex == this.model.gameData.tableDetails.bigBlindIndex) {
        //         presenter.node.getChildByName("BB").active = true;
        //     }
        //     else if (players[index].seatIndex == this.model.gameData.tableDetails.smallBlindIndex) {
        //         presenter.node.getChildByName("SB").active = true;
        //     }

        //     // if (presenter.playerData.ante > 0) {
        //     //     presenter.displayBlind(presenter.playerData.ante);
        //     //     presenter.activatePlayerBet(false, true);
        //     // }
        // }

        // if (GameScreen.isMobile ) {
        //     this.dealerNode.getComponent("JohnyChat").pokerGame = this.model;
        //     this.dealerNode.getComponent("JohnyChat").registerBroadcast();
        //     // setTimeout(() => {
        //     //     if (cc.isValid(this.node))
        //     //         this.node.parent.getChildByName("GameplayOptions").setPosition(-262, -235);
        //     // }, 500);
        // }

        // if (GameManager.isMobile) {
        //     // this.dealerNode.getComponent("JohnyChat").pokerGame = this.model;
        //     // this.dealerNode.getComponent("JohnyChat").registerBroadcast();
        //     this.dealerNode.getComponent('JohnyChat').onLoad();
        //     this.playerChatNode.getComponent("ChatInfoPanel").onLoad();
        // } 
        // else if (cc.sys.isBrowser && !!this.dealerNode && GameManager.isMobile) {
        //     // this.dealerNode.getComponent("JohnyChat").pokerGame = this.model;
        //     // this.dealerNode.getComponent("JohnyChat").registerBroadcast();
        //     this.dealerNode.getComponent('JohnyChat').onLoad();
        //     this.playerChatNode.getComponent("ChatInfoPanel").onLoad();
        // }

        // if(cc.sys.isBrowser && !GameManager.isMobile) {
        //     this.dealerNode.getComponent("JohnyChat").onLoad();
        //     this.playerChatNode.getComponent("ChatInfoPanel").onLoad();
        // }

        if (!!this.dealerNode) {
            this.dealerNode.getComponent('JohnyChat').onLoad();
        }
        if (!!this.playerChatNode) {
            this.playerChatNode.getComponent("ChatInfoPanel").onLoad();
        }

        
            this.leaveBtn.node.active = true;
            this.lobbyBtn.node.active = true;

        if (K.PORTRAIT) {
            cc.find("TableName", this.node).active = true;
        }
        else {
            cc.find("TableName", this.node).active = false;
        }

        // if (this.isTournament()) {
        //     if (this.model.gameData.raw.lastTableId && this.model.gameData.raw.lastTableId != "") {
        //         this.changeTableFinal();
        //     }
            // }
    },


    tempOnJoinSuccess: function () { },

    /**
     * @method enableJoinBtn
     * @description enable/disable / set string value on join button accordingly.
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    enableJoinBtn: function () {
        // var isTour = this.model.gameData.channelType == K.ChannelType.Tournament;
        var isTour = false;
        this.joinBtn.node.parent.parent.active = !isTour && this.getMyPlayer() == null && this.model.gameData.tableDetails.players.length == this.model.roomConfig.maxPlayers;
        if (this.model.gameData.isJoinWaiting) {
            // this.joinBtn.string = LocalizedManager.t("TXT_UNJOIN_WAITTING");
            this.joinBtn.node.parent.getChildByName("tick").active = true;
            // this.joinBtn.node.parent.parent.parent.getChildByName('FindGame').active = false;
        } else {
            // this.joinBtn.string = LocalizedManager.t("TXT_JOIN_WAITTING");
            this.joinBtn.node.parent.getChildByName("tick").active = false;
            // this.joinBtn.node.parent.parent.parent.getChildByName('FindGame').active = true;
        }

        if (this.joinBtn.node.parent.parent.active) {
            if (this.model.gameData.isJoinWaiting) {
                // this.joinBtn.string = LocalizedManager.t("TXT_UNJOIN_WAITTING");
                this.joinBtn.node.parent.parent.parent.getChildByName('FindGame').active = false;
            } else {
                // this.joinBtn.string = LocalizedManager.t("TXT_JOIN_WAITTING");
                this.joinBtn.node.parent.parent.parent.getChildByName('FindGame').active = true;
            }
        }
        else {
            this.joinBtn.node.parent.parent.parent.getChildByName('FindGame').active = false;
        }
    },
    /**
     * @method onJoinWaitingListBtnClick
     * @description Change the string value of Join Button.
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onJoinWaitingListBtnClick: function () {
        this.playAudio(K.Sounds.click);
        var flag = this.joinBtn.node.parent.getChildByName("tick").active;
        TableHandler.joinWaitingList(!flag, this.model.gameData.channelId, function (response) {
            if (response.success) {
                // this.model.gameData.isJoinWaiting = !flag;
                // this.enableJoinBtn();
                GameManager.emit("waiting_List_Event", response.channelId, !flag);
            }
        }.bind(this), function (error) { });
    },
    /**
     * @method onJoinExtras
     * @description 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onJoinExtras: function () {
        if (this.roomNameLbl) {
            // if game in progress allocate 
            // console.log("roomconfig", this.model.roomConfig, this.model.roomConfig.isRunItTwice);
            this.roomNameLbl.string = this.model.roomConfig.channelName;
            // this.roomNameLbl2.string = this.model.roomConfig.channelName;

            // if (this.tiledView.active || GameManager.isMobile) {
            let stakes = GameManager.convertChips(this.model.gameData.tableDetails.smallBlind) + "/" + GameManager.convertChips(this.model.gameData.tableDetails.bigBlind);
            // this.roomNameLbl.string += "  " + stakes; // " | " +
            this.roomNameLbl2.string = "Blinds: " + stakes; // " | " +

            // if (this.model.gameData.tableDetails.isForceRit) {
            //     this.roomNameLbl.string += " (RIT)"
            //     this.roomNameLbl2.string += " (RIT)"
            // }
        }
        this.playerInput[0].active = false;
        if (/*this.isMobileInputAvailable &&*/ !GameManager.isWindows && !GameManager.isMobile && GameScreen.viewType == 1) {
            this.mobilePlayerInput[0].active = false;
            // console.error("MOBILE INPUT DONE OFF...2");
        }
        this.straddleCheckBox.setSelection(false);
        this.checkInBetweenBlinds(true);
    },


    /**
     * @method onSitHere
     * @description Makes the player sit on the seat
     * @param {Number} index -Index of seat
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onSitHere: function (index) {
        var data = {};
        data.minValue = this.model.roomConfig.minBuyIn;
        data.maxValue = this.model.roomConfig.maxBuyIn;
        const text_chips = LocalizedManager.t('TXT_AVAILABLE_CHIPS') + ':';
        if (GameManager.user.category == "DIAMOND") {
            data.totalChips = GameManager.user.realChips;
            data.dialogHeadingText = text_chips;
        } else {
            data.totalChips = GameManager.user.freeChips;
            data.dialogHeadingText = text_chips;
        }
        if (GameManager.isMobile) {
            data.dialogHeadingText = text_chips;
        }

        data.autoBuyIn = GameManager.user.autoBuyIn;
        data.index = index;
        data.confirm = this.onBuyInConfirm.bind(this);
        data.onSitHere = true;
        data.channelId = this.model.gameData.channelId;
        data.playerStandUp = this.model.isPlayerStandUp();
        data.isRealMoney = this.model.roomConfig.isRealMoney;
        data.isAllInAndFold = this.model.roomConfig.isAllInAndFold;
        data.config = this.model.roomConfig;
        
            data.autoConfirm = this.model.roomConfig.extraAntiBankCase;
        data.topHeading = LocalizedManager.t('TXT_BUY_IN');
        data.playSound = this.playAudio.bind(this);
        if (data.autoConfirm) {
            this.onBuyInConfirm(data.index, data.minValue.toString());
        } else {
            this.popUpManager.show(PopUpType.BuyInPopup, data, function () { });
        }
        // }.bind(this), null, 5000, false);
    },
    /**
     * @method onBuyInConfirm
     * @description Mehtod called when user select a seat and then confirm BuyIn Amount
     * @param {Number} index - Seat Index
     * @param {Number} amount - BuyIn Amount
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onBuyInConfirm: function (index, amount) {

        this.model.sitHere(index, amount, function () { }.bind(this));
    },

    onLeaveNextHand: function () {
        this.model.leaveNextHand(function (response) { 
            console.log("onLeaveNextHand", response);
        }.bind(this));  
    },
    /**
     * @method onSitOutNextHand
     * @description called when sitOutNextHand is selected.
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onSitOutNextHand: function () {
        if (this.model.sitOutValue == SitOutMode.None) {
            this.model.sitOutNextHand(function (response) {
                this.handleSitoutResponse(response);
            }.bind(this));

        } else if (this.model.sitOutValue == SitOutMode.SitOueNextBB) {
            this.onResetSitout(function (callback) {
                if (callback) {
                    this.model.sitOutNextHand(function (response) {
                        this.handleSitoutResponse(response);
                    }.bind(this));
                }
            }.bind(this));
        } else if (this.model.sitOutValue == SitOutMode.SitOutNextHand) {
            if (this.getMyPlayer() != null && this.getMyPlayer().state == K.PlayerState.OnBreak) {
                this.onResume();
            } else {
                this.onResetSitout(function () { }.bind(this));
            }
        }
        this.handleRunItTwice();
    },
    /**
     * @method handleSitoutResponse
     * @description Disable sitOutNextBigBlind CheckBox when sitOutNextHand is selected!
     * @param {Object} response -Data Received from Server
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    handleSitoutResponse: function (response) {
        if (response.success) {
            // this.sitOutNextBBCheckBox.node.parent.active = false;
            this.sitOutNextHandCheckBox.setSelection(true);
        } else {
            this.sitOutNextHandCheckBox.setSelection(false);
        }
    },
    /**
     * @method onSitOutNextBB
     * @description called when sitOutNextBigBlind is selected
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onSitOutNextBB: function () {
        if (this.model.sitOutValue == SitOutMode.None) {

            this.model.sitOutNextBB(function (response) {
                this.handleSitoutBBResponse(response);
            }.bind(this));
        } else if (this.model.sitOutValue == SitOutMode.SitOueNextBB) {

            if (this.getMyPlayer() != null && this.getMyPlayer().state == K.PlayerState.OnBreak) {
                this.onResume();
            } else {
                this.onResetSitout(function () { }.bind(this));
            }
        }
        this.handleRunItTwice();
    },

    /**
     * @method checkSitoutStatus
     * @description local level status of sitout btns 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    checkSitoutStatus: function () {
        if (this.model.gameData.channelType == K.ChannelType.Tournament || this.model.isPlayerStandUp()) {
            // this.sitOutNextBBCheckBox.node.parent.active = false;
            if (this.model.sitOutValue == SitOutMode.SitOutNextHand && !this.model.isPlayerStandUp()) {
                this.sitOutNextHandCheckBox.node.parent.active = true;
                this.sitOutNextHandCheckBox.setSelection(true);
            }
        } else {
            switch (this.model.sitOutValue) {
                case SitOutMode.SitOutNextHand:
                    // this.sitOutNextBBCheckBox.node.parent.active = false;
                    this.sitOutNextHandCheckBox.setSelection(true);
                    break;
                case SitOutMode.SitOueNextBB:
                    //this.sitOutNextBBCheckBox.node.parent.active = true;
                    //this.sitOutNextBBCheckBox.setSelection(true);
                    this.sitOutNextHandCheckBox.setSelection(false);
                    break;
                case SitOutMode.None:
                    break;
            }
        }
    },
    /**
     * @method handleSitoutBBResponse
     * @description Disable checkBox if Response is not True;
     * @param {Object} response -Response received from server!
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    // handleSitoutBBResponse: function (response) {
    //     if (response.success) { } else {
    //         this.sitOutNextBBCheckBox.setSelection(false);
    //     }
    // },
    /**
     * @method onResetSitout
     * @description 
     * @param {Function} callback
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onResetSitout: function (callback) {
        this.model.resetSitout(function (response) {
            if (callback != null) {
                callback(response.success);
                if (response.success) {
                    this.handleSitOutBtns(true);
                }
            }
        }.bind(this));
    },

    /**
     * @method onAddChipsConfirm
     * @description Called form buyIn popup when amout is confiremed
     * @param {Number} index -SeatIndex
     * @param {Number} amount - BuyIn Amout
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onAddChipsConfirm: function (index, amount) {
        this.model.addChips(amount, function () { });

    },
    /**
     * @method onResume
     * @description called when a player in sitOut mode and then select to sit in on the table.
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onResume: function () {
        this.playAudio(K.Sounds.click)
        this.resumeBtn.active = false;
        // this.mobGameOptions.node.active = false;
        this.model.resume(function () {
            // this.resumeBtn.active = false;
            this.handleSitOutBtns(true);
            var playerPresenter = this.playerHand[this.getRotatedSeatIndex(this.model.gameData.tableDetails.currentMoveIndex)];
            if (playerPresenter.playerData && this.model.gameData.tableDetails.state === K.GameState.Running) {
                if (this.model.gameData.tableDetails.currentMoveIndex !== -1) {
                    if (this.checkForSelfTurn(playerPresenter.playerData.playerId)) {
                        this.enableSelfTurn(playerPresenter, playerPresenter.playerData.moves);
                    } else {
                        this.model.emit(K.PokerEvents.onTurnInOtherRoom, this.model, false);
                    }
                }
            }
        }.bind(this));
    },
    /**
     * @method onResumeAll 
     * @description called when sitall button is selected
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onResumeAll: function () {
        this.playAudio(K.Sounds.click)
        GameScreen.resumeAll();
    },

    onDisable: function () {

    },
    /**
     * @method onStraddle
     * @description CallBack for straddle button
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onStraddle: function () {
        var selection = this.straddleCheckBox.getSelection();
        this.model.setStraddleSelection(selection);
    },
    /**
     * @method onPostBigBlind
     * @description callBack for onPostBigBlind checkBox
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onPostBigBlind: function () {
        var selection = this.postBigBlindCheckBox.getSelection();
        this.model.setPostBigBlind(selection);

        if (selection) {
            this.postBigBlindCheckBox.node.parent.getChildByName("message").active = false;
        }
        else {
            this.postBigBlindCheckBox.node.parent.getChildByName("message").active = true;
        }
    },
    /**
     * @method onRunItTwice 
     * @description callback for runItTwice checkBox
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onRunItTwice: function () {
        var selection = this.runItTwiceCB.getSelection();
        this.model.setRunItTwice(selection, function (response) {
            if (!response.success) {
                this.runItTwiceCB.setSelection(!selection);
            }
        }.bind(this));
    },
    /**
     * @method handleRunItTwice
     * @description Handles run it twice checkbox
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    handleRunItTwice: function (forceVal = true, forceSelection = false, showSelection = false) {
        var val = !!this.getMyPlayer() && this.getMyPlayer().state == K.PlayerState.Playing && this.getMyPlayer().lastMove !== K.PlayerMove.AllIn;
        val = val && !(this.model.gameData.channelType == K.ChannelType.Tournament);

        //condition by rajat 14-08-2018
        if (!this.model.gameData.tableDetails.isForceRit) {
            this.runItTwiceCB.node.parent.active = (val && forceVal); //pre written
        }

        if (forceSelection) {
            this.runItTwiceCB.setSelection(showSelection);
        }
    },

    /**
     * @method onAddChips
     * @description this is called only when the button is clicked 
     * @param {Number} minVal - minimum value that must be added in order to add chips.
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onAddChips: function (minVal, joinWaitingCase = false, extraAntiBankCase) {
        // console.error(2, minVal)
        if (!this.model.isPlayerStandUp() || joinWaitingCase) {
            var data = {};
            var playerChips = 0;
            if (!joinWaitingCase) {
                playerChips = (this.model.roomConfig.channelVariation === "Open Face Chinese Poker") ? this.model.getMyPlayer().points : this.model.getMyPlayer().chips;
            }
            // console.log(playerChips, this.model.roomConfig.minBuyIn, this.model.roomConfig.maxBuyIn)
            // data.minValue = this.model.roomConfig.minBuyIn - playerChips;
            // data.maxValue = this.model.roomConfig.maxBuyIn - playerChips;

            data.minValue = this.model.roomConfig.originalMinBuyIn - playerChips;
            data.maxValue = this.model.roomConfig.originalMaxBuyIn - playerChips;

            if (data.minValue < 1) {
                data.minValue = 1;
            }

            if (extraAntiBankCase == false) {

                data.minValue = this.model.roomConfig.minBuyIn - playerChips;
                data.maxValue = this.model.roomConfig.maxBuyIn - playerChips
            }

            if (this.model.gameData.antibanking.isAntiBanking && this.model.roomConfig.minBuyIn < this.model.gameData.antibanking.amount) {

            }

            if (joinWaitingCase) {
                data.minValue = this.model.roomConfig.minBuyIn - playerChips;
                data.maxValue = this.model.roomConfig.maxBuyIn - playerChips
            }

            if (this.model.roomConfig.originalMaxBuyIn < playerChips) {
                data.maxValue = 0;
                data.minVal = 0;
            }

            // console.log("BUY IN DATA CONFIG", this.model.roomConfig.maxBuyIn, typeof (this.model.roomConfig.maxBuyIn))
            // console.log("BUY IN DATA ", playerChips, typeof (playerChips))
            // console.log("BUY IN DATA ", this.model.roomConfig.originalMaxBuyIn, typeof (this.model.roomConfig.originalMaxBuyIn))
            const text_chips = LocalizedManager.t('TXT_AVAILABLE_CHIPS') + ':';
            if (GameManager.user.category == "DIAMOND") {
                data.totalChips = GameManager.user.realChips;
                data.dialogHeadingText = text_chips;
            } else {
                data.totalChips = GameManager.user.freeChips;
                data.dialogHeadingText = text_chips;
            }
            if (GameManager.isMobile) {
                data.dialogHeadingText = text_chips;
            }
            data.autoBuyIn = GameManager.user.autoBuyIn;
            data.index = this.model.getPlayerById(this.model.gameData.playerId);
            data.confirm = this.onAddChipsConfirm.bind(this);
            data.onSitHere = false;
            data.cancelCallback = this.onCancelBuyIn.bind(this);
            data.playerStandUp = this.model.isPlayerStandUp();
            data.channelId = this.model.gameData.channelId;
            data.isAddChips = true;
            data.isRealMoney = this.model.roomConfig.isRealMoney;
            data.topHeading = LocalizedManager.t('TXT_ADD_CHIPS');
            data.playSound = this.playAudio.bind(this);
            data.config = this.model.roomConfig;
            if (joinWaitingCase) {
                data.topHeading = LocalizedManager.t('TXT_BUY_IN');
            }
            // data.autoConfirm = this.model.roomConfig.extraAntiBankCase;
            if (minVal === "extraAntiBankCase") {
                // console.log("EXTRA ANTI BANK CASE",playerChips,this.model.roomConfig.minBuyIn)

                this.onAddChipsConfirm(data.index, (this.model.roomConfig.minBuyIn - playerChips).toString());
                // console.log("EXTRA ANTI BANK CASE DATA ", data)
            } else {
                this.popUpManager.show(PopUpType.BuyInPopup, data, function () { });
            }
        }
        this.playAudio(K.Sounds.click);
    },
    /**
     * @method onCancelBuyIn
     * @description cancel button callback
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onCancelBuyIn: function () {
        if ((!!this.model.getMyPlayer()) && this.model.getMyPlayer().state == K.PlayerState.Reserved) {
            // GameManager.playerRequestedToLeaveTable = false;
            GameManager.playerRequestedToLeaveTable[this.model.gameData.channelId] = false;
            this.standUp();
        }
        if (((this.model.roomConfig.channelVariation === "Open Face Chinese Poker") ? this.model.getMyPlayer().points : this.model.getMyPlayer().chips) <= 0 && this.model.getMyPlayer().state != K.PlayerState.Playing) {
            this.resumeBtn.active = true;
            this.sitOutNextHandCheckBox.node.parent.active = false;
        }
    },

    /**
     * @method onAllIn
     * @description Send user action - allin to server
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onAllIn: function () {
        // console.log("ALL IN CLICKED");
        // no need for amount
        this.hideAllSBBB();
        this.model.makeMove("0", K.PlayerMove.AllIn);
        this.hideMoves();
        this.playAudio(K.Sounds.click);
    },

    /**
     * @method onCheck 
     * @description  Send user action - check to server
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onCheck: function (data, custom) {
        // no need for amount
        this.hideAllSBBB();
        this.model.makeMove("0", K.PlayerMove.Check);
        this.hideMoves();
        if (custom == "checkAction") {
            this.onCloseSureToFold();
            this.playAudio(K.Sounds.click);
        }

    },

    /**
     * @method onBet 
     * @description onBetBtn callback, send user action to server
     * @param {Number} amont - Betting Amont
     * @param {Number} action - 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onBet: function (amount, action) {
        // console.log("BET CLICKED");
        //implement bet slider and get amount
        this.hideAllSBBB();
        this.model.makeMove(amount, action);
        this.hideMoves();
    },

    /**
     * @method onFold
     * @description Fold Button Callback
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onFold: function (data, custom) {
        // no need for amount
        if (this.sureToFold && custom != "confirmAction") {
            this.sureToFoldNode.active = true;
            return;
        }
        this.hideAllSBBB();
        this.model.makeMove("0", K.PlayerMove.Fold);
        this.hideMoves();
        if (custom == "confirmAction") {
            this.onCloseSureToFold();
            this.playAudio(K.Sounds.click);
        }
    },
    /**
     * @method onCloseSureToFold
     * @description Close Button Callback
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onCloseSureToFold: function () {
        this.sureToFoldNode.active = false;
    },

    /**
     * @method onCall
     * @description  callBtn callBack
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onCall: function () {
        // no need for amount
        this.hideAllSBBB();
        this.model.makeMove("0", K.PlayerMove.Call);
        this.hideMoves();
    },


    /**
     * @method leaveTable 
     * @description leaveButton callBack
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    leaveTable: function (data, c) {
        this.playAudio(K.Sounds.click);
        if (this.sureToLeaveNode && this.sureToLeaveNode.active) {
            this.sureToLeaveNode.active = false;
        }
        // console.log("LEAVE CLICKED ", data.target.node);
        if (GameManager.playerRequestedToLeaveTable[this.model.gameData.channelId] === false) {
            GameManager.playerRequestedToLeaveTable[this.model.gameData.channelId] = true;
        }

        // this.unscheduleAllCallbacks();
        let cb = function () {
            for (var index = 0; index < this.playerHand.length; index++) {
                this.playerHand[index].clearPlayerCards();
            }
            this.clearHoleCards();
            this.clearPots();
        }
        this.model.leave(this.isObserver());
    },

    /**
     * @method onLeaveTableClicked called when player clicks on Leave button on Table 
     * @description onleaveButtonClicked callBack
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */

    onLeaveTableClicked: function (data) {
        // console.log("ON LEAVE CLICKED ");
        if (this.leaveNextHandTag.active) {
            GameManager.popUpManager.show(PopUpType.NotificationPopup, "You will leave the game after this hand.", function () { });
            return;
        }
        // if (this.sureToLeaveNode && !this.sureToLeaveNode.active && this.getMyPlayer() != null && this.getMyPlayer().state == K.PlayerState.Playing) {
        //     this.sureToLeaveNode.active = true;
        // } else {
        //     GameManager.popUpManager.hide(PopUpType.NotificationPopup, function () { });
        //     this.leaveTable();
        // }
        this.sureToLeaveNode.active = true;
    },


    /**
     * @method onLeaveTableCancel called when player clicks on Cancel button on leave Popup 
     * @description onleaveButtonCancel callBack
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */

    onLeaveTableCancel: function (data) {
        this.playAudio(K.Sounds.click);
        if (this.sureToLeaveNode && this.sureToLeaveNode.active) {
            this.sureToLeaveNode.active = false;
        }
    },

    leaveTournament: function() {},

    /**
     * @method standUp
     * @description  Stand up from current seat
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    standUp: function () {
        this.model.leave(true);
    },

    /**
     * @method onSettingsBtn 
     * @description Enable InGamePreferencesPopUp(Setting) popUp in game
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onSettingsBtn: function () {
        // console.error("ON SETTING");
        var inst = this.popUpManager.show(1, this.model, function () {
            // if (GameScreen.viewType == 2 && !GameManager.isMobile) {
            //     console.log("ISAVAILABLE and untiled view active", this.node.parent)
            //     // this.unTileViewSelection.isChecked = true;
            //     // this.tileViewSelection.isChecked = false;
            //     // this.node.parent.parent.children.forEach(function(){
            //     // console.log("this runs for each poker model")
            //     // this.node.parent.getChildByName("Popups").getChildByName('Johnny').getChildByName('GamePreferencesPopup').unTiledViewSelection.checked = false;

            //     // }.bind(this));

            // }
        });
        if (!!inst) {
            // console.error("Got inst");
            this.model.valueChange = false;
            if (GameScreen.viewType == 2 && !GameManager.isMobile && !GameManager.isWindows) {
                // console.error("TANUJ1", inst.unTileViewSelection.isChecked);
                inst.unTileViewSelection.isChecked = true;
                inst.tileViewSelection.isChecked = false;
                // console.error("TANUJ1", inst.unTileViewSelection.isChecked);
            }
            else
                if (GameScreen.viewType == 1 && !GameManager.isMobile && !GameManager.isWindows) {
                    // console.error("TANUJ2", inst.tileViewSelection.isChecked);
                    inst.unTileViewSelection.isChecked = false;
                    inst.tileViewSelection.isChecked = true;
                    // console.error("TANUJ1", inst.tileViewSelection.isChecked);
                }
            this.model.valueChange = true;
        }
        this.playAudio(K.Sounds.click);

        this.mobileGamePlayOptions();
    },

    onInfoBtn: function () {
        // console.log(this.model.roomConfig.info)
        this.mobileGamePlayOptions();

        var data = {};
            data.playSound = this.playAudio.bind(this);
            data.info = this.model.roomConfig.info
            // console.log("info close sound check")
            this.popUpManager.show(PopUpType.GameInfoPopup, data, function () { });
            this.playAudio(K.Sounds.click);
    },
    /**
     * @method onSettingsBtnClose 
     * @description Hides Prefereneces PopUp 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onSettingsBtnClose: function () {
        this.popUpManager.hide(1, null, function () { });
    },

    /**
     * @method addHoleCard
     * @description shows community card in Game
     * @param {Object} cardType - Array
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    addHoleCard: function (cardType, ifAnimateHoleCards) {
        if (this.model.gameData.tableDetails.roundName == K.Round.Showdown && this.holeCardHolder.getComponentsInChildren('Card').length == 5) {
            return;
        }
        prevDelay = 0;
        var a = this.holeCardHolder.getComponentsInChildren('Card').length;
        var b = this.holeCardsWithTwiceHolder.getComponentsInChildren('Card').length;
        var startIndex = a > b ? a : b;
        var endIndex = cardType[0].length;

        this.runItTwiceCaseRunning = (cardType[1].length > 0 && cardType[1].some(function (el) {
            return el !== null;
        })) ? true : false; // if every element is null?

        if (this.runItTwiceCaseRunning) {
            if (this.node.getChildByName("winnerBannerBg")) {
                // console.log("Winner Bg Should Be visible");
                let tmp = this.node.getChildByName("winnerBannerBg");
                tmp.active = true;
                tmp.width = 400;
                tmp.getChildByName("Rectangle 3289").getChildByName("layout1").active = false;
                tmp.getChildByName("Rectangle 3289").getChildByName("layout2").active = false;
                tmp.getChildByName("Rectangle 3289").getChildByName("winningText").getComponent(cc.Label).string = "Running it Twice...";

                // cc.director.getScheduler().schedule((dt) => { tmp.active = false; }, inst, inst.winnerBannerDeactivateTimerDelay);
            }
        }

        this.cardTimers.forEach(function (element) {
            clearTimeout(element);
        }, this);
        this.cardTimers = [];

        //custom arrays to hold the nodes of the cards.
        this.cardsFinalPosArray = [];
        this.runItTwiceUpperCardsFinalPosArray = [];
        this.runItTwiceLowerCardsFinalPosArray = [];

        // var Action = function () {
        var i = 0;
        var runItTwiceIdx = 0;
        while (cardType[1][runItTwiceIdx] == null && runItTwiceIdx < cardType[1].length) {
            runItTwiceIdx++;
        }
        if (cardType[1].length == runItTwiceIdx)
            runItTwiceIdx = -1;
        var delay = 200;

        for (var i = 0; i < cardType.length; i++) {
            for (var j = startIndex; j < endIndex; j++) {
                var x = endIndex - startIndex;
                if (!!cardType[i][j]) {
                    this.generateCard(i, j, runItTwiceIdx, delay, cardType[i][j], cardType, ifAnimateHoleCards, x);
                }
            }
        }
        if (x > 0) {
            if (ifAnimateHoleCards) { //29aug
                this.playAudio(K.Sounds.cardOpening);
            }
        }
        // };
        // this.cardTimers.push(setTimeout(Action.bind(this), 200));
    },

    /**
     * @method generateCard
     * @description Fetch object from cardPool and  generate the Card accordingly
     * @param {Number} i -
     * @param {Number} j -
     * @param {Number} runItTwiceIdx -
     * @param {Object} Card -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    generateCard: function (i, j, runItTwiceIdx, delay, card, cardData, ifAnimateHoleCards, numberOfTimesItWillCalled) {
        delay = 0;
        var inst = this;
        // this.cardTimers.push(setTimeout(function () {
        //      var instance = cc.instantiate(inst.cardPrefab);
        var instance = CardPool.generateCard(inst.cardPrefab.name, function () { });
        instance.opacity = 255;
        var cardComponent = instance.getComponent('Card');
        cardComponent.init(card, inst.model);
        cardComponent.isCommunityCard = true;
        cardComponent.reveal(true);
        if (runItTwiceIdx == -1) {
            // inst.holeCardHolder.addChild(instance);
            instance.parent = inst.holeCardHolder;
            if (!ifAnimateHoleCards) {
                var posX = -this.CardStartingPositionOnTable + (j * this.CardsPositionOffset);
                instance.setPosition(cc.v2(posX, 0));
            }
            instance.active = !ifAnimateHoleCards;
            inst.cardsFinalPosArray.push(instance);
        } else {
            var k = 0;
            while (inst.holeCardHolder.getComponentsInChildren('Card').length > 0) {
                var n = inst.holeCardHolder.children[0];
                // inst.holeCardHolder.removeChild(n);
                // inst.holeCardsWithTwiceHolder.children[k].addChild(n);
                n.parent = inst.holeCardsWithTwiceHolder.children[k];
                n.setPosition(0, 0);
                k++;
            }
            // setTimeout(function () {
            if (j < runItTwiceIdx) {
                // inst.holeCardsWithTwiceHolder.children[j].addChild(instance);
                instance.parent = inst.holeCardsWithTwiceHolder.children[j];
            } else if (i == 0) {
                // inst.runItTwiceHolder.children[j].addChild(instance);
                instance.parent = inst.runItTwiceHolder.children[j];
                inst.runItTwiceUpperCardsFinalPosArray.push(instance);
            } else {
                // inst.runItTwiceHolder.children[j + 5].addChild(instance);
                instance.parent = inst.runItTwiceHolder.children[j + 5];
                inst.runItTwiceLowerCardsFinalPosArray.push(instance);
            }
            instance.setPosition(0, 0);
            instance.active = !ifAnimateHoleCards;


            // instance.runAction(cc.sequence(cc.delayTime(.5), cc.moveTo(2, cc.v2(100, 100))));
            // },1);
        }
        // }, delay + prevDelay));
        // prevDelay += delay;

        if (ifAnimateHoleCards) {
            // console.log(cardData[0].length, cardData[1].length, this.runItTwiceUpperCardsFinalPosArray.length, this.runItTwiceLowerCardsFinalPosArray.length)
            if ((cardData[0].length == 3 && this.cardsFinalPosArray.length == 3) || (cardData[0].length == 5 && this.cardsFinalPosArray.length == 5 && cardData[1].length == 0)) {
                this.animateHoleCards(this.cardsFinalPosArray, "SLIDE_TO_OPEN", cc.v2(-this.CardStartingPositionOnTable, 0), this.CardsPositionOffset)
            } else if ((cardData[0].length > 3) && this.cardsFinalPosArray.length < 3 && this.holeCardHolder.childrenCount > 2) {
                // found fourth card instance
                // console.log(this.model.gameData.tableDetails.roundName);
                if (this.cardsFinalPosArray.length == 1 && numberOfTimesItWillCalled == 1) {
                    var posX = -this.CardStartingPositionOnTable + ((cardData[0].length - 1) * this.CardsPositionOffset);
                    this.animateHoleCards(this.cardsFinalPosArray, "FLIP_TO_OPEN", cc.v2(0, 250), this.CardsPositionOffset, cc.v2(posX, 0))
                } else if (this.cardsFinalPosArray.length == 2) {

                    let initialPosition = cc.v2(-this.CardStartingPositionOnTable, 0);
                    let positionOffset = this.CardsPositionOffset;
                    this.cardsFinalPosArray.forEach((element, i) => {
                        var posX = initialPosition.x + ((i + 3) * positionOffset);
                        element.setPosition(initialPosition);
                        if (i == 0) {
                            setTimeout(function () {
                                var moveAction = cc.moveTo(.85, cc.v2(posX, 0)).easing(cc.easeCubicActionOut());
                                element.active = true;
                                element.runAction(moveAction);
                            }.bind(this), 500);

                            this.timersToKill.push(setTimeout(function () {
                            // setTimeout(function () {
                                if (cc.isValid(this.node)) {
                                    if (element.getNumberOfRunningActions() > 0) {
                                        element.stopAllActions();
                                        element.setPosition(cc.v2(posX, 0));
                                    }
                                }
                            }.bind(this), 1350));
                        }
                        else if (i == 1) {
                            this.timersToKill.push(setTimeout(function () {
                            // setTimeout(function () {
                                var moveAction = cc.moveTo(.95, cc.v2(posX, 0)).easing(cc.easeCubicActionOut());
                                element.active = true;
                                element.runAction(moveAction);
                            }.bind(this), 1000));

                            this.timersToKill.push(setTimeout(function () {
                            // setTimeout(function () {
                                if (cc.isValid(this.node)) {
                                    if (element.getNumberOfRunningActions() > 0) {
                                        element.stopAllActions();
                                        element.setPosition(cc.v2(posX, 0));
                                    }
                                }
                            }.bind(this), 2200));
                        }
                    }, this);

                    // for (let p = 0; p < 2; p++) {
                    //     let ar = [];
                    //     ar[0] = this.cardsFinalPosArray[p];
                    //     let c = (p == 0) ? 3 : 4;
                    //     var posX = -this.CardStartingPositionOnTable + ((c) * this.CardsPositionOffset);
                    //     (function (ins, arr, x) {
                    //         ins.animateHoleCards(arr, "FLIP_TO_OPEN", cc.v2(0, 250), ins.CardsPositionOffset, cc.v2(x, 0))
                    //     })(this, ar, posX)
                    // }
                }
            } else if ((cardData[0].length == 5 && cardData[1].length == 5 && this.runItTwiceUpperCardsFinalPosArray.length == 5 && (this.runItTwiceLowerCardsFinalPosArray.length == 0 || this.runItTwiceLowerCardsFinalPosArray.length == 5))) {
                let convertedPosArr = [];
                if (this.runItTwiceLowerCardsFinalPosArray.length == 5) {
                    this.runItTwiceLowerCardsFinalPosArray.forEach(function (element) {
                        var WPcord = this.runItTwiceHolder.convertToWorldSpaceAR(cc.v2(this.runItTwiceHolder.children[5].getPosition()));
                        convertedPosArr.push(element.parent.convertToNodeSpaceAR(WPcord));
                    }, this);
                    // this.scheduleOnce(function () {
                    this.timersToKill.push(setTimeout(function () {
                        this.animateHoleCards(this.runItTwiceLowerCardsFinalPosArray, "SLIDE_TO_OPEN", this.runItTwiceHolder.children[5].getPosition(), 102, null, convertedPosArr);
                    }.bind(this), (5 * this.runItTwiceSlideToOpenDelay + 0.1) * 1000));
                    return;
                }
                this.runItTwiceUpperCardsFinalPosArray.forEach(function (element) {
                    var WPcord = this.runItTwiceHolder.convertToWorldSpaceAR(cc.v2(this.runItTwiceHolder.children[0].getPosition()));
                    convertedPosArr.push(element.parent.convertToNodeSpaceAR(WPcord));
                }, this);
                this.animateHoleCards(this.runItTwiceUpperCardsFinalPosArray, "SLIDE_TO_OPEN", this.runItTwiceHolder.children[0].getPosition(), 102, null, convertedPosArr);
            } else if (cardData[0].length == 5 && cardData[1].length == 5 && (this.runItTwiceUpperCardsFinalPosArray.length == 2 && this.runItTwiceLowerCardsFinalPosArray.length == 2) || (this.runItTwiceUpperCardsFinalPosArray.length == 1 && this.runItTwiceLowerCardsFinalPosArray.length == 1)) {
                let times = (this.runItTwiceUpperCardsFinalPosArray.length == 2) ? 4 : 2;
                for (let k = 0; k < times; k++) {
                    let crd = [];
                    if (k < (times / 2)) {
                        crd.push(this.runItTwiceUpperCardsFinalPosArray[k]);
                    } else {
                        crd.push(this.runItTwiceLowerCardsFinalPosArray[k - (times / 2)]);
                    }
                    var WPcord = this.runItTwiceHolder.convertToWorldSpaceAR(cc.v2(0, 250));
                    let init = (crd[0].parent.convertToNodeSpaceAR(WPcord));
                    // this.scheduleOnce(function () {
                    this.timersToKill.push(setTimeout(function () {
                        this.animateHoleCards(crd, "FLIP_TO_OPEN", init, this.CardsPositionOffset, cc.v2(0, 0));
                    }.bind(this), (this.runItTwiceLowerCardDelay * k) * 1000));
                }
            }
            // } else if ((cardData[0].length > 3 && cardData[1].length > 3) && (this.runItTwiceUpperCardsFinalPosArray.length == 1 || this.runItTwiceLowerCardsFinalPosArray.length == 1)) {
            //     // var posX = -240 + ((cardData[0].length - 1) * 120);

            //     var WPcord = this.runItTwiceHolder.convertToWorldSpaceAR(cc.v2(0, -150));
            //     let arr=[];
            //     let init = (instance.parent.convertToNodeSpaceAR(WPcord));
            //     arr[0]=instance;
            //     this.animateHoleCards(arr, "FLIP_TO_OPEN", init, 120, cc.v2(0, 0))

            // }
        }

    },

    /**
     * @method animateHoleCards : Animate hole cards on Table.
     * @description Fetch object from cardPool and  generate the Card accordingly
     * @param {Array} nodesToAnimate - Nodes to Animate on Table
     * @param {String} animationType - Animation Type, "SLIDE_TO_OPEN" or "FLIP_TO_OPEN"
     * @param {Number} initialPOsitionX - initial position of Cards froms where animation will start
     * @param {Number} positionOffset - Position offset of cards to manage scale factor and spacing while animating
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     * */

    animateHoleCards: function (nodesToAnimate, animationType, initialPosition, positionOffset = this.CardsPositionOffset, finalNodeDestination, runTwiceInitPosArr) {
        if (animationType == "SLIDE_TO_OPEN") {

            if (nodesToAnimate.length == 5) {
                nodesToAnimate.forEach((element, i) => {
                    var posX = initialPosition.x + (i * positionOffset);
                    if (!!runTwiceInitPosArr) {
                        initialPosition = runTwiceInitPosArr[i];
                        posX = 0;
                    }
                    element.setPosition(initialPosition);
                    if (i == 0 || i == 1 || i == 2) {
                        var moveAction = cc.moveTo(.15 * i, cc.v2(posX, 0)).easing(cc.easeCubicActionOut());
                        element.active = true;
                        element.runAction(moveAction);

                        this.timersToKill.push(setTimeout(function () {
                        // setTimeout(function () {
                            if (cc.isValid(this.node)) {
                                if (element.getNumberOfRunningActions() > 0) {
                                    element.stopAllActions();
                                    element.setPosition(cc.v2(posX, 0));
                                }
                            }
                        }.bind(this), 180 * i));
                    }
                    else if (i == 3) {
                        this.timersToKill.push(setTimeout(function () {
                        // setTimeout(function () {
                            var moveAction = cc.moveTo(.55, cc.v2(posX, 0)).easing(cc.easeCubicActionOut());
                            element.active = true;
                            element.runAction(moveAction);
                        }.bind(this), 1000));

                        this.timersToKill.push(setTimeout(function () {
                        // setTimeout(function () {
                            if (cc.isValid(this.node)) {
                                if (element.getNumberOfRunningActions() > 0) {
                                    element.stopAllActions();
                                    element.setPosition(cc.v2(posX, 0));
                                }
                            }
                        }.bind(this), 80));
                    }
                    else if (i == 4) {
                        this.timersToKill.push(setTimeout(function () {
                        // setTimeout(function () {
                            var moveAction = cc.moveTo(.55, cc.v2(posX, 0)).easing(cc.easeCubicActionOut());
                            element.active = true;
                            element.runAction(moveAction);
                        }.bind(this), 1500));

                        this.timersToKill.push(setTimeout(function () {
                        // setTimeout(function () {
                            if (cc.isValid(this.node)) {
                                if (element.getNumberOfRunningActions() > 0) {
                                    element.stopAllActions();
                                    element.setPosition(cc.v2(posX, 0));
                                }
                            }
                        }.bind(this), 2500));
                    }
                }, this);
            }
            else {
            nodesToAnimate.forEach((element, i) => {
                var posX = initialPosition.x + (i * positionOffset);
                if (!!runTwiceInitPosArr) {
                    initialPosition = runTwiceInitPosArr[i];
                    posX = 0;
                }
                element.setPosition(initialPosition);
                var moveAction = cc.moveTo(.18 * i, cc.v2(posX, 0)).easing(cc.easeCubicActionOut());
                element.active = true;
                element.runAction(moveAction);

                this.timersToKill.push(setTimeout(function () {
                // setTimeout(function () {
                    if (cc.isValid(this.node)) {
                        if (element.getNumberOfRunningActions() > 0) {
                            element.stopAllActions();
                            element.setPosition(cc.v2(posX, 0));
                        }
                    }
                }.bind(this), 200 * i));
            }, this);
            }
        } else if (animationType == "FLIP_TO_OPEN") {
            var moveAction = cc.moveTo(.18, finalNodeDestination).easing(cc.easeCubicActionOut());
            nodesToAnimate[0].setPosition(initialPosition);
            nodesToAnimate[0].active = true;
            nodesToAnimate[0].getComponent("Card").frontFace.node.active = false;
            nodesToAnimate[0].getComponent("Card").backFace.node.active = true;
            nodesToAnimate[0].runAction(moveAction);
            nodesToAnimate[0].runAction(cc.sequence(cc.delayTime(0.15), cc.callFunc(() => {
                nodesToAnimate[0].getComponent("Card").frontFace.node.active = true;
                nodesToAnimate[0].getComponent("Card").backFace.node.active = false;
            })));

            this.timersToKill.push(setTimeout(function () {
            // setTimeout(function () {
                // console.log("SHISHIR ", (nodesToAnimate[0].getNumberOfRunningActions() > 0))
                // if (nodesToAnimate[0].getNumberOfRunningActions() > 0) {
                if (cc.isValid(this.node)) {
                    nodesToAnimate[0].stopAllActions();
                    nodesToAnimate[0].setPosition(finalNodeDestination);
                    nodesToAnimate[0].getComponent("Card").frontFace.node.active = true;
                    nodesToAnimate[0].getComponent("Card").backFace.node.active = false;
                    // } else {
                    //     console.log("if callfunc nor called then error case");
                    // }
                }
            }.bind(this), 200));
        }
    },

    /**
     * @method clearHoleCards
     * @description Clears the existing community cards on the table
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    clearHoleCards: function () {
        if (this.holeCardHolder === null) {
            return;
        }
        var children = this.holeCardHolder.children;
        while (children.length > 0) {
            CardPool.destroyCard(children[0], function () { });
        }

        var children = this.runItTwiceHolder.children;
        for (var index = 0; index < children.length; index++) {
            while (children[index].children.length > 0) {
                CardPool.destroyCard(children[index].children[0], function () { });
            }
        }
        var children = this.holeCardsWithTwiceHolder.children;
        for (var index = 0; index < children.length; index++) {
            while (children[index].children.length > 0) {
                CardPool.destroyCard(children[index].children[0], function () { });
            }
        }
    },

    /**
     * @method clearTable
     * @description Clears the table
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    clearTable: function () {
        this.node.stopAllActions();
        this.unscheduleAllCallbacks();
        this.tourStartLabel.node.parent.parent.active = false;
        this.clearHoleCards();
        this.clearPots();
        this.killTimers();
        this.forceAddPlayercardsData = null;
        this.forceAddPlayercardsSeatIndex = null;
    },

    /** 
     * @method sitSuccess 
     * @description  OnSit event callback
     * @param {Object} data -Data received from Broadcast
     * @param {Number} playerIndex -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    sitSuccess: function (data, playerIndex) {
        if (data.playerId === this.model.gameData.playerId) {
            for (var index = 0; index < this.playerHand.length; index++) {
                if (this.playerHand[index].seatState === K.SeatState.Free) {
                    this.playerHand[index].disableView();
                }
            }
            this.handleSitOutBtns(true);
            this.manageBtns(true);
            this.model.gameData.isJoinWaiting = false; //TODO : Should be done in PokerModel
            this.showMuckHand();
        }
        // set data
        var index = this.model.getPlayerById(data.playerId);
        this.playerHand[this.getRotatedSeatIndex(data.seatIndex)].playerData = this.model.gameData.tableDetails.players[index];
        this.playerHand[this.getRotatedSeatIndex(data.seatIndex)].enablePlayerView(this.model.gameData.playerId);
        if (this.model.gameData.tableDetails.state === K.GameState.Running) {
            this.setDealer();
            if (data.playerId === this.model.gameData.playerId) {
                this.checkInBetweenBlinds(true);
            }
        }
        this.isStraddleAllowed(); // ||true;
        this.enableJoinBtn();
    },
    /** 
     * @method checkInBetweenBlinds
     * @description  Check if player wil sit between small blind and big blind.
     * @param {Object} data -Data received from Broadcast
     * @param {Number} playerIndex -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    checkInBetweenBlinds: function () {
        console.log("checkInBetweenBlinds 1");

        // if (this.model.gameData.channelType == K.ChannelType.Tournament) {
        var data = this.getMyPlayer();
        if (this.model.gameData.tableDetails.state === K.GameState.Running && data != null && data.state == K.PlayerState.Waiting) {
            console.log("checkInBetweenBlinds 2", this.model.gameData.tableDetails.state, data.state);
            // if (flag) {
            var sb = (this.model.gameData.tableDetails.smallBlindIndex);
            var bb = (this.model.gameData.tableDetails.bigBlindIndex) - sb;
            if (bb < 0) {
                bb += this.maxSeatIndex;
            }
            var p = (data.seatIndex) - sb;
            if (p < 0) {
                p += this.maxSeatIndex;
            }

            console.log("checkInBetweenBlinds 3", sb, bb, p);

            sb = 0;
            if (false) {
                console.log("checkInBetweenBlinds 4", false);
                var data = {};
                data.info = LocalizedManager.t('TXT_YOU_WILL_BE_DEAL');
                // data.info = "You will be dealt, once the dealer button passes you.";
                // data.disableTimer = true;
                if (!this.singleTime) {
                    this.popUpManager.show(2, data, function () { });
                    // GameManager.popUpManager.show(PopUpType.NotificationPopup, data.info, function () { });
                    this.singleTime = true;
                }
                //(when implemented ,remove comment)
                this.postBigBlindCheckBox.node.parent.active = false;
            } else {
                console.log("checkInBetweenBlinds 5", true);
                if (!this.postBigBlindCheckBox.node.parent.active) {
                    this.postBigBlindCheckBox.node.parent.active = true;
                    // this.postBigBlindCheckBox.setSelection(true);
                    // this.model
                    this.postBigBlindCheckBox.setSelection(this.model.postBigBlindUserFlake);
                }
            }
            // }
        } else {
            console.log("checkInBetweenBlinds 6");
            if (!!data && data.state !== K.PlayerState.Waiting) {
                console.log("checkInBetweenBlinds 7");
                this.postBigBlindCheckBox.node.parent.active = false;
            }
            this.popUpManager.hide(2, function () { });
        }


        if (this.model.gameData.tableDetails.state != K.GameState.Running && data != null && data.state == K.PlayerState.Waiting) {
            console.log("checkInBetweenBlinds 8");
            this.postBigBlindCheckBox.node.parent.active = false;
            this.postBigBlindCheckBox.setSelection(false);
        }
    },


    /** 
     * @method deductBlind 
     * @description  DeductBlind pokerModel event callback
     * @param {Object} data -Data received from Broadcast
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    deductBlind: function (data) {


        // disabling leave button till animation runs
        // this.leaveBtn.interactable = false;

        // this.cardDistributing = true;/sssss

        // scheduling leave to re-activte


        // let count = 0;
        // for (var index = 0; index < this.model.gameData.tableDetails.players.length; index++) {
        //     if (this.model.gameData.tableDetails.players[index].state === K.PlayerState.Playing) {
        //         count++;
        //     }
        // }

        // let delay = (count * 2 * 0.1) + 2;//sssss

        // cc.director.getScheduler().schedule(() => {
        //     this.cardDistributing = false;
        // }, this, 0, 1, delay);

        // this.scheduleOnce(() => {
        //     this.cardDistributing = false;ssss
        // }, delay)


        // setting winner banner visibility to OFF.
        if (this.node.getChildByName("winnerBannerBg")) {
            this.node.getChildByName("winnerBannerBg").active = false;
        }


        // this.clearPots();

        this.timersToKill.push(setTimeout(function () {
            this.displayPots();   
        }.bind(this), 1800));
        

        if (this.resetTimer !== null) {
            clearTimeout(this.resetTimer);
            this.resetTimer = null;
        }
        // this.scheduleOnce(() => {
        //     this.placeDummyCards();

        //     this.cardAnimation(this.model.gameData.tableDetails.players);

        // }, 0.3);
        // console.log("%c PokerPresenter deductBlind", 'color: green;');

        // this.timersToKill.push(setTimeout(function () {
        //     this.placeDummyCards();
        //     this.cardAnimation(this.model.gameData.tableDetails.players);
        // }.bind(this), 300));


        // player card distribution
        // loosely copuled dummy display cards on distribute cards animation.
        // this.scheduleOnce(this.placeDummyCards.bind(this), 1);

        var players = this.model.gameData.tableDetails.players;
        for (var index = 0; index < players.length; index++) {
            var presenter = this.playerHand[this.getRotatedSeatIndex(players[index].seatIndex)];
            presenter.node.getChildByName("BB").active = false;
            presenter.node.getChildByName("SB").active = false;

            if (players[index].seatIndex == data.bigBlindIndex) {
                presenter.node.getChildByName("BB").active = true;
            }
            else if (players[index].seatIndex == data.smallBlindIndex) {
                presenter.node.getChildByName("SB").active = true;
            }

            // if (presenter.playerData.ante > 0) {
            //     presenter.displayBlind(presenter.playerData.ante);
            //     presenter.activatePlayerBet(false, true);
            // }
        }

        // setTimeout(function () {
        //     this.hideAllSBBB();
        // }.bind(this), 1000);
    },

    /** 
     * @method sitSuccess 
     * @description  Rotate the seat view after setting offset
     * @param {Object} data -Data received from Broadcast
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    rotateView: function (data) {
        this.setIndexOffset(data.seatIndex);
        for (var index = 0; index < this.playerHand.length; index++) {
            this.playerHand[index].resetSeat();
        }

        this.allocateSeat();
        this.playerHand.forEach(function (element) {
            if (element.seatState === K.SeatState.Free) {
                element.disableView();
            }
        }, this);
    },

    hideAllSBBB: function() {
        var players = this.model.gameData.tableDetails.players;
        for (var index = 0; index < players.length; index++) {
            var presenter = this.playerHand[this.getRotatedSeatIndex(players[index].seatIndex)];
            presenter.node.getChildByName("BB").active = false;
            presenter.node.getChildByName("SB").active = false;
        }
    },

    /** 
     * @method resetView 
     * @description  Reset seat view
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    resetView: function () {
        this.indexOffset = 0;
        for (var index = 0; index < this.playerHand.length; index++) {
            this.playerHand[index].resetSeat();
        }
        // reallocate seat
        this.allocateSeat();

        this.playerHand.forEach(function (element) {
            if (element.seatState !== K.SeatState.Occupied) {
                element.disablePlayerView();
            }
        }, this);
    },

    /** 
     * @method playerStateChange 
     * @description  GamePlayers pokerModel event callback 
     * @param {Object} data -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    playerStateChange: function (data) {
        // manage sit out, disconnection, etc.
        // event for each active players
        if (this.gameOverLabel !== null) {
            this.gameOverLabel.string = "";
        }
        if (this.getMyPlayer() != null && this.getMyPlayer().seatIndex == data.seatIndex) {
            if (data.state === K.PlayerState.OnBreak) {
                this.handleSitOutBtns(false);
                    this.postBigBlindCheckBox.node.parent.active = false;
                this.singleTime = false;
            } else {
                if (this.model.sitOutValue == SitOutMode.None) {
                    this.handleSitOutBtns(true);
                }
            }

            if (data.state === K.PlayerState.Waiting) {
                this.resumeBtn.active = false;
            }
            this.showMuckHand();
            console.log("this.getMyPlayer()", this.getMyPlayer());
            this.getPlayerByIdx(this.model.getPlayerById(this.getMyPlayer().playerId)).updateTimeBank2(data.timeBankSec);
        }
        this.playerHand[this.getRotatedSeatIndex(data.seatIndex)].onStateChange();
        if (!!this.optionalPlayerInput) {
            this.optionalPlayerInput.selectedValue = null;
        }
        this.checkInBetweenBlinds();
        this.isStraddleAllowed();
        this.handleRunItTwice();
    },
    /**
     * @method handleSitOutBtns
     * @description Enable/Disable other sitOut checkBoxes Accordingly
     * @param {boolean} val - Value 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    handleSitOutBtns: function (val) {
        this.resumeBtn.active = !val;
        this.handleSitAllBtn();
        //this.sitOutNextBBCheckBox.setSelection(false);
        this.sitOutNextHandCheckBox.node.parent.active = val;
        this.sitOutNextHandCheckBox.setSelection(!val);
        // this.sitOutNextBBCheckBox.node.parent.active = val && this.model.gameData.channelType == K.ChannelType.Normal && !this.model.isPlayerStandUp();
    },
    /**
     * @method handleSitAllBtn
     * @description Active the Resume Button in all PokerPresenter
     * @param {boolean} val - Value 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    handleSitAllBtn: function () {
        var count = 0;
        for (var index = 0; index < GameScreen.gameModel.activePokerModels.length; index++) {
            var presenter = GameScreen.gameModel.activePokerModels[index].node.children[0].getComponent('PokerPresenter');
            if (presenter.resumeBtn.active) {
                count++;
                if (count > 1)
                    break;
            }
        }
        for (var index = 0; index < GameScreen.gameModel.activePokerModels.length; index++) {
            GameScreen.gameModel.activePokerModels[index].node.children[0].getComponent('PokerPresenter').resumeBtn.children[1].active = count > 1;
        }
    },
    /**
     * @method dealerChat
     * @description dummy methdo as of now
     * @param {boolean} val - Value 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    dealerChat: function (data) {

    },
    /**
     * @method chat
     * @description  Shows Last chat sent by any Player on it's position
     * @param {Object} val - Data/Message received from server 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    chat: function (data) {
        var index = this.model.getPlayerById(data.playerId);
        // this.playerHand[this.getRotatedSeatIndex(this.model.gameData.tableDetails.players[index].seatIndex)].showChat(data.orgMsg);
        this.playerHand[this.getRotatedSeatIndex(this.model.gameData.tableDetails.players[index].seatIndex)].showChat(data.message);
    },
    /**
     * @method onBestHand
     * @description Shows the best matches of a player/user hand card with against community card
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onBestHand: function () {
        return;
        let str = ""; // "<color=#FFA755>Hand Strength \n</color><color=#ECE5BB>";
        if (this.getMyPlayer() != null && this.getMyPlayer().state === K.PlayerState.Playing && !!this.getMyPlayer().bestHand && this.model.gameData.tableDetails.state !== K.GameState.GameOver) {
            // this.scheduleOnce(function () {
            this.timersToKill.push(setTimeout(function () {
                if (this.bestHand) {
                    this.bestHand.node.parent.active = true;
                    this.bestHand.string = this.getMyPlayer().bestHand; // + "</color>";
                }
                //this.bestHand.node.parent.getChildByName('bestHandHeading').active = true;
            }.bind(this), 2000));

        } else {
            // this.bestHand.node.parent.getChildByName('bestHandHeading').active = false;
            this.bestHand.node.parent.active = false;

        }
    },

    onReBuyInConfirm: function () {
        this.model.rebuy(
            this.model.gameData.channelId,
            GameManager.user.playerId,
            this.model.gameData.raw.tournamentId,
            (res) => {
                console.log("onReBuyInConfirm", res);
            },
            (error) => {
                console.log("onReBuyInConfirm error", error);
            }
        );
    },

    onRebuyDeactivated:function(data) {
        this.popUpManager.hide(PopUpType.BuyInPopup, function () { });
    },

    onRebuyActivated:function(data) {
        console.log('onRebuyActivated', data);
        const text_chips = LocalizedManager.t('TXT_AVAILABLE_CHIPS') + ':';
        if (GameManager.user.category == "DIAMOND") {
            data.totalChips = GameManager.user.realChips;
        }
        else {
            data.totalChips = GameManager.user.freeChips;
        }

        data.isRebuy = true;
        data.rebuyChips = this.model.gameData.raw.tourData.raw.rebuyChips;
        data.rebuyAmount = this.model.gameData.raw.tourData.raw.rebuy.rebuyPrice.rebuyAmount;
        data.rebuyHoursFee = this.model.gameData.raw.tourData.raw.rebuy.rebuyPrice.rebuyHouseFee;
        data.rebuyTotalChips = this.model.gameData.raw.tourData.raw.rebuy.rebuyPrice.totalRebuyChip;
        
        if (data.rebuyTimer) {
            // data.rebuyTimer = this.model.gameData.raw.tourData.raw.timeToRebuy;    
        }
        else {
            data.rebuyTimer = this.model.gameData.raw.tourData.raw.timeToRebuy;
        }
        
        
        data.confirm = this.onReBuyInConfirm.bind(this);
        data.channelId = this.model.gameData.channelId;
        data.playSound = this.playAudio.bind(this);
        this.popUpManager.show(PopUpType.BuyInPopup, data, function () { });
    },

    /**
     * @method checkForSelfTurn
     * @description  Check if current player is self using playerId
     * @param {Number} playerId -playerId of the player whose current turn it is.  
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    checkForSelfTurn: function (playerId) {
        if (this.model && this.model.gameData.playerId === playerId) {
            return true;
        } else {
            // this.model.emit(K.PokerEvents.onTurnInOtherRoom, this.model, false);
            return false;
        }
    },
    /**
     * @method getMyPlayer
     * @description 
     * @param {boolean} val - Value 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    getMyPlayer: function () {
        // console.log("20feb", this.model)
        var index = this.model.getPlayerById(this.model.gameData.playerId);
        var myPlayer = this.model.gameData.tableDetails.players[index];
        return (!!myPlayer) ? myPlayer : null;
    },

    /**
     * @method clearPots
     * @description Disables all table pots 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    clearPots: function () {
        if (this.totalPotLbl) {
            this.totalPotLbl.node.parent.active = false;
        }
        if (this.potAmount) {
            this.potAmount.forEach(function (element) {
                element.children[0].getComponent('PokerChipsView').destroyChips();
                element.parent.active = false;
            }, this);
        }
    },

    /**
     * @method displayPots
     * @description  Show pot amounts on view
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    displayPots: function () {
        if (!this.totalPotLbl) {
            return;
        }
        // console.trace('disp pot',  this.model.gameData.tableDetails.pot);
        this.totalPotLbl.node.parent.active = true;
        this.totalPotLbl.string = GameManager.convertChips(this.model.gameData.tableDetails.totalPot);
        this.totalPotLbl.__string = this.model.gameData.tableDetails.totalPot;
        this.updateBB();
        // check for round

        // console.log("DISPLAY POTS AT START ", this.model.gameData.tableDetails.pot)
        // console.log("DISPLAY POTS AT START ", this.model.gameData.tableDetails)
        if (this.model.gameData.tableDetails.roundName !== K.Round.Preflop) {
            for (var index = 0; index < this.model.gameData.tableDetails.pot.length; index++) {
                // console.log("DISPLAY AMOUNT IS ", this.model.gameData.tableDetails.pot[index]);
                // this.potAmount[index].getComponent(cc.Label).string = this.model.gameData.tableDetails.pot[index].roundOff(2);
                this.potAmount[index].getComponent(cc.Label).string = GameManager.convertChips(this.model.gameData.tableDetails.pot[index]);
                this.potAmount[index].getComponent(cc.Label).__string = this.model.gameData.tableDetails.pot[index];
                this.potAmount[index].parent.active = true;
                this.updateBB();
                // this.potAmount[index].children[0].getComponent('PokerChipsView').generateChips(parseInt(this.model.gameData.tableDetails.pot[index]));
            }
        }
        else {
            if (this.model.gameData.tableDetails.players.length > 1) {
                // var ante = this.model.gameData.raw.tourData.raw.currentBlindLevel.ante;
                // var totalAnte = ante * this.model.gameData.tableDetails.players.length;
                // if (totalAnte > 0) {
                //     if (!this.totalPotLbl) {
                //         return;
                //     }
                //     this.totalPotLbl.node.parent.active = true;
                //     this.totalPotLbl.string = GameManager.convertChips(totalAnte);
                //     this.totalPotLbl.__string = totalAnte;
                //     this.potAmount[0].getComponent(cc.Label).string = GameManager.convertChips(totalAnte);
                //     this.potAmount[0].getComponent(cc.Label).__string = totalAnte;
                //     this.potAmount[0].parent.active = true;
                //     this.potAmount[0].children[0].getComponent('PokerChipsView').generateChips(totalAnte);
                // }
            }
        }
        // }, 1
        // );

    },

    /**
     * @method startGame
     * @description  gameStart pokerModel event callback
     * @param {Object} data -Data received from server
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    startGame: function (data) {
        this.popUpManager.hide(PopUpType.SitNGoResultPopup, function () { }); //Bug No 0001709
        var moves = data.moves;
        this.playerInput[0].active = false;
        if (/*this.isMobileInputAvailable &&*/ !GameManager.isWindows && !GameManager.isMobile && GameScreen.viewType == 1) {
            this.mobilePlayerInput[0].active = false;
            // console.error("MOBILE INPUT DONE OFF...3");
        }
        // console.log("!!!!!! startGame tableDetails.players: %s", 'color: green;', this.model.gameData.tableDetails.players);
        var players = this.model.gameData.tableDetails.players;
        for (var index = 0; index < players.length; index++) {
            // console.log("start game chips", players[index].chips);
            // console.log("!!!!!! startGame seatIndex: %s", 'color: green;', this.model.gameData.tableDetails.players[index].seatIndex);
            // console.log("!!!!!! startGame getRotatedSeatIndex: %s", 'color: green;', this.getRotatedSeatIndex(this.model.gameData.tableDetails.players[index].seatIndex));

            var presenter = this.playerHand[this.getRotatedSeatIndex(players[index].seatIndex)];
            presenter.enablePlayerView(this.model.gameData.playerId, false);
            // console.log("START GAME PLAYER TOTAL ROUND BET :------- ", presenter.playerData.totalRoundBet);
            // console.log("START GAME PLAYER NAME  BET :------- ", presenter.playerData.playerName);
            // if (presenter.playerData.totalRoundBet > 0) {
            //     presenter.displayBlind(presenter.playerData.totalRoundBet);
            // }
        }
        this.timersToKill.push(setTimeout(function () {
            var players = this.model.gameData.tableDetails.players;
            for (var index = 0; index < players.length; index++) {
                // console.log("start game chips", players[index].chips);
                var presenter = this.playerHand[this.getRotatedSeatIndex(players[index].seatIndex)];
                // presenter.enablePlayerView(this.model.gameData.playerId, false);
                // console.log("START GAME PLAYER TOTAL ROUND BET :------- ", presenter.playerData.totalRoundBet);
                // console.log("START GAME PLAYER NAME  BET :------- ", presenter.playerData.playerName);
                if (presenter.playerData.totalRoundBet > 0) {
                    presenter.displayBlind(presenter.playerData.totalRoundBet);
                }
            }   
        }.bind(this), 1500));

        this.clearHoleCards();
        this.setDealer();


        this.placeDummyCards();
        this.cardAnimation(this.model.gameData.tableDetails.players);
            
        // this.playerHand[this.getRotatedSeatIndex(data.currentMoveIndex)].onTurn(this.model.gameData.tableDetails.turnTime);
        // var playerPresenter = this.playerHand[this.getRotatedSeatIndex(data.currentMoveIndex)];
        // var currentPlayerId = playerPresenter.playerData.playerId;

        // // for (var index = 0; index < this.playerHand.length; index++) {
        // //     this.playerHand[index].displayDummyCards(this.model.dummyCardsCount, this.model.gameData.playerId);
        // // }

        // // this.revealSelfCards();
        // if (this.checkForSelfTurn(playerPresenter.playerData.playerId)) {
        //     this.enableSelfTurn(playerPresenter, moves);
        // } else {
        //     this.model.emit(K.PokerEvents.onTurnInOtherRoom, this.model, false);
        // }
        this.handleRunItTwice();
        this.checkInBetweenBlinds();
        this.displayRoundNumber();
    },

    /**
     * @method cardAnimation
     * @description  Plays card distribution animation for active players
     * @param {Array} players - Array having players refrence or data 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    cardAnimation: function (players) {
        // generate data for all active players
        // call distribute cards
        var params = [];
        for (var index = 0; index < players.length; index++) {
            // var element = array[index];
            // check for player state
            if (players[index].state === K.PlayerState.Playing) {
                if (players[index].state == "REBUYING") {
                    continue;
                }
                // add data
                var cardData = {};
                cardData.targetNode = this.playerHand[this.getRotatedSeatIndex(players[index].seatIndex)].node;
                params.push(cardData);
            }
        }
        this.cardDistributer.distributeCards(this.model.dummyCardsCount, params, this);
    },

    /**
     * @method onStandUp
     * @description  onStandUp pokerModel event callback
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onStandUp: function () {
        this.hideMoves();
        this.enableTempPlayerInput(false);
        this.handleSitOutBtns(true);
        this.manageBtns(false);
        this.enableJoinBtn();
    },

    /**
     * @method nextTurn
     * @description turn pokerModel event callback
     * @param {Object} data - 
     * @param {Number} previousIndex -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    nextTurn: function (data, previousIndex) {

        this.onHideRaisePanel();

        // this.showRaisePanel.active = false;
        // this.hideRaisePanel.active = false;

        // console.error("Next Turn ", data);
        // console.error("linkin park ,NEXT TURN DATA ",data, previousIndex)
        // this.displayPots();
        var moves = data.moves;

        if (data.action.toUpperCase() == "RAISE" && this.optionalPlayerInput.selectedValue != null && this.optionalPlayerInput.selectedValue.toUpperCase() == "CALL") {
            this.optionalPlayerInput.selectedValue = null;
        }
        if ((data.action.toUpperCase() == "RAISE" || data.action.toUpperCase() == "BET" || data.action.toUpperCase() == "ALLIN") && this.optionalPlayerInput.selectedValue != null && (this.optionalPlayerInput.selectedValue.toUpperCase() == "CHECK" || this.optionalPlayerInput.selectedValue.toUpperCase() == "CALL")) {
            this.optionalPlayerInput.selectedValue = null;
        }
        if (data.action.toUpperCase() == "ALLIN" && GameManager.user.playerId == data.playerId) {
            // this.chatSubmitBtn.interactable = false;
            this.handleRunItTwice(false);
        }

        if (data.action.toUpperCase() == "FOLD" && GameManager.user.playerId != data.playerId) {
            // Other players folded fade their cards back.
            this.playerHand[this.getRotatedSeatIndex(this.model.gameData.tableDetails.players[previousIndex].seatIndex)].fadeOutFoldedCards();
        }

        if (data.action.toUpperCase() == "FOLD" && GameManager.user.playerId == data.playerId && this.getNumPlayerInTable() > 2) {
            // Other players folded fade their cards back.
            // this.playerHand[this.getRotatedSeatIndex(this.model.gameData.tableDetails.players[previousIndex].seatIndex)].fadeOutFoldedCards();

            this.enableShowFoldBtn();
        }


        this.playerInput[0].active = false;
        if (/*this.isMobileInputAvailable &&*/ !GameManager.isWindows && !GameManager.isMobile && GameScreen.viewType == 1) {
            //console.log("MOBILE INPUT IS AVAILABLE", this.isMobileInputAvailable);
            //console.log("MOBILE INPUT IS ACTIVE", this.isMobileInputActive)
            this.mobilePlayerInput[0].active = false;
            // console.error("MOBILE INPUT DONE OFF...4");
            // console.log(this.mobilePlayerInput)
        }
        if (previousIndex != null) {

            this.playerHand[this.getRotatedSeatIndex(this.model.gameData.tableDetails.players[previousIndex].seatIndex)].displayMove(data.action);
        }
        if (data.currentMoveIndex == -1) {
            this.hideMoves();
            this.enableTempPlayerInput(false);
            return;
        }
        if (data.currentMoveIndex === "") {
            return;
        }
        if (data.isRoundOver) {
            // setTimeout(function () {
            console.log("On TURN CURRENT MOVE INDEX ", data.currentMoveIndex);
            console.log(this.playerHand);
            console.log(this.getRotatedSeatIndex(data.currentMoveIndex));
            if (!this.playerHand[this.getRotatedSeatIndex(data.currentMoveIndex)]) {
                return;
            }
            this.playerHand[this.getRotatedSeatIndex(data.currentMoveIndex)].onTurn(this.model.gameData.tableDetails.turnTime);
            // this.disableShowFoldBtn();
            var playerPresenter = this.playerHand[this.getRotatedSeatIndex(data.currentMoveIndex)];
            if (this.checkForSelfTurn(this.playerHand[this.getRotatedSeatIndex(data.currentMoveIndex)].playerData.playerId)) {

                this.enableTempPlayerInput(false);

                this.timersToKill.push(setTimeout(function () {
                    this.selfLastMoveData = moves;
                    if (data.currentMoveIndex == this.model.gameData.tableDetails.currentMoveIndex) {
                        this.optionalPlayerInput.selectedValue = null;
                        this.enableSelfTurn(playerPresenter, moves);
                    }
                }.bind(this), 1400));
            } else {
                this.onCloseSureToFold(); //to deactivate confirm to fold popup
                this.model.emit(K.PokerEvents.onTurnInOtherRoom, this.model, false);
                var selfRef = this.getMyPlayer();
                if (selfRef !== null && selfRef !== undefined) {
                    if (selfRef.state == K.PlayerState.Playing) {
                        //  this.enableTempPlayerInput(true);
                    }
                }
            }
            // }.bind(this), 700);
        } else {
            this.playerHand[this.getRotatedSeatIndex(data.currentMoveIndex)].onTurn(this.model.gameData.tableDetails.turnTime);
            var playerPresenter = this.playerHand[this.getRotatedSeatIndex(data.currentMoveIndex)];
            if (!playerPresenter.playerData) {
                cc.error("!playerPresenter", playerPresenter);
            }
            else {
                playerPresenter.onTurn(this.model.gameData.tableDetails.turnTime);
                if (this.checkForSelfTurn(playerPresenter.playerData.playerId)) {
                this.selfLastMoveData = moves;

                this.enableTempPlayerInput(false);


                this.enableSelfTurn(playerPresenter, moves);
            } else {
                // this.optionalPlayerInput.selectedValue = null;

                this.onCloseSureToFold(); //to deactivate confirm to fold popup
                this.model.emit(K.PokerEvents.onTurnInOtherRoom, this.model, false);
                var selfRef = this.getMyPlayer();
                if (selfRef !== null && selfRef !== undefined) {
                    if (selfRef.state == K.PlayerState.Playing) {
                        //  this.enableTempPlayerInput(true);
                    }
                    }
                }
            }
        }
        if (data.runBy == "precheck" && (data.currentMoveIndex == this.model.gameData.tableDetails.currentMoveIndex)) {
            this.optionalPlayerInput.selectedValue = null;
        }

    },
    /**
     * @method playAudio
     * @description turn pokerModel event callback
     * @param {index} sound -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    playAudio: function (sound) {
        // return;
        // console.error("KAPIL", this.model.gameData.settings.muteGameSound);
        if (ScreenManager.currentScreen != K.ScreenEnum.GamePlayScreen) {
            return;
        }
        if (!this.model.gameData.settings.muteGameSound)
            GameManager.playSound(sound);
    },

    onSecondEventClickSoud: function () {
        this.playAudio(K.Sounds.click);
    },

    /**
     * @method enableSelfTurn
     * @description  called to initialise values for self player on turn
     * @param {Object} playerPresenter - current player's playerPresenter script 
     * @param {Number} previousIndex - current player index
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    enableSelfTurn: function (playerPresenter, moves) {
        // console.log("CHECKING SELF TURN ", playerPresenter)

        if (playerPresenter.playerData.state == K.PlayerState.Playing || playerPresenter.playerData.state == K.PlayerState.Disconnected) {
            this.playAudio(K.Sounds.userTurn);
            GameManager.popUpManager.hide(PopUpType.GamePreferencesPopup, function () { });
            // if (this.isMobile && this.mobChatPanel.getComponent('ChatPanel').isVisible)
            //     this.mobChatPanel.getComponent('ChatPanel').onHide();

            this.model.emit(K.PokerEvents.onTurnInOtherRoom, this.model, true);
            // set roundmaxbet
            // turn on bet buttons
            // playerPresenter.setPlayerColor();
            // console.error("Active poker models...", GameManager.gameModel.activePokerModels.length)

            //Tanuj
            if (!GameManager.isMobile && !!this.playerInput[0]) {
                if (GameManager.gameModel.activePokerModels.length >= 2 && !GameManager.isWindows && GameScreen.viewType == 1) {
                    // console.log("MObile player input active")
                    if (/*this.isMobileInputAvailable &&*/ !GameManager.isWindows)
                        this.mobilePlayerInput[0].active = true;
                    if (this.playerInput[0].active) {
                        this.playerInput[0].active = false;
                        this.mobilePlayerInput[0].active = true;
                    }


                } else {
                    // console.log("desktop player input ")
                    if (!!this.playerInput[0])
                        this.playerInput[0].active = true;

                }
            } else {
                this.playerInput[0].active = true;
            }
            //end

            // this.enableTempPlayerInput(false);
            this.hideMoves();
            var sliderData = {};
            var currentPlayerId = playerPresenter.playerData.playerId;
            var playerIndex = this.model.getPlayerById(currentPlayerId);
            sliderData.maxAmount = (this.model.gameData.tableDetails.maxRaiseAmount).roundOff(2);
            sliderData.minAmount = (this.model.gameData.tableDetails.minRaiseAmount).roundOff(2);
            sliderData.playerChips = this.getMyPlayer().chips;
            sliderData.roundBet = this.getMyPlayer().totalRoundBet || 0;
            sliderData.potAmount = this.model.gameData.tableDetails.totalPot;
            sliderData.roundName = this.model.gameData.tableDetails.roundName;
            sliderData.bb = this.model.gameData.tableDetails.bigBlind;
            sliderData.roundMaxBet = this.model.gameData.tableDetails.roundMaxBet;
            let flag = this.model.roomConfig.channelVariation === "Omaha" || this.model.roomConfig.channelVariation === "Omaha Hi-Lo" || this.model.roomConfig.channelVariation === "Omaha 5" || this.model.roomConfig.channelVariation === "Omaha 6";
            let flag2 = !this.model.roomConfig.isPotLimit && this.model.roomConfig.channelVariation === K.Variation.TexasHoldem && this.model.gameData.tableDetails.roundName === K.Round.Preflop;

            // console.log("untile bet slider called", sliderData)
            this.betBtnSlider.updateData(sliderData, flag, flag2);
            if (!!this.tileBetBtnSlider)
                this.tileBetBtnSlider.updateData(sliderData, flag, flag2);

            this.enableTempPlayerInput(false);
            this.sureToFold = (moves.includes(1) && moves.includes(6));
            this.displayMoves(moves, playerIndex);

            //if tile view 1 = tileview
            if (!GameManager.isMobile && !GameManager.isWindows && GameScreen.viewType == 1) {
                if (GameManager.gameModel.activePokerModels.length >= 2) {
                    // console.log("MObile player input active")
                    if (!!this.mobilePlayerInput[0])
                        this.mobilePlayerInput[0].active = true;
                    if (this.playerInput[0].active) {
                        this.playerInput[0].active = false;
                        this.mobilePlayerInput[0].active = true;
                    }

                } else {
                    // console.log("desktop player input ")
                    if (!!this.playerInput[0])
                        this.playerInput[0].active = true;
                    // console.log(this.playerInput[8]._name)
                }
            } else {
                // console.error("playerinput active");
                this.playerInput[0].active = true;
            }
            // this.playerInput[0].active = true;
        }
    },

    /**
     * @method displayMoves 
     * @description Display inputs
     * @param {Object} moves -
     * @param {Number} playerIndex -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    displayMoves: function (moves, playerIndex) {
        // console.log("linkin park DISPLAY MOVES  ", this.optionalPlayerInput.selectedValue);

        var selectedValue;
        selectedValue = this.optionalPlayerInput.selectedValue;
        // console.error("linkin park ,pokerpresenter, Selected Value = ", selectedValue, (selectedValue != null));
        if (selectedValue != null) {
            // console.log("inputs not shown because sel value = ", selectedValue)
            // this.makePredefinedMove(selectedValue, moves, playerIndex);
            // console.error("linkin park moves nahi dikhayi bcz sel value=", selectedValue)
            // this.optionalPlayerInput.selectedValue = null;
        } else {
            // console.log("active tables in display moves", GameManager.gameModel.activePokerModels);
            this.enableInputs(moves, playerIndex);
            if (GameManager.gameModel.activePokerModels.length >= 2 && !GameManager.isMobile && !GameManager.isWindows && GameScreen.viewType == 1) {
                console.log("display moves Tiled")
                // this.enableDifferentInputs(moves, playerIndex, this.mobilePlayerInput);
                // this.enableInputs(moves, playerIndex, this.mobilePlayerInput);
                this.enableInputsForTileAndUntiled(moves, playerIndex);
            } else {
                console.log("display moves UnTiled")

            }
        }

        if (GameScreen.gameModel.activePokerModels[GameScreen.prevSelection] && 
            GameScreen.gameModel.activePokerModels[GameScreen.prevSelection] &&
            GameScreen.gameModel.activePokerModels[GameScreen.prevSelection].gameData.channelId == this.model.gameData.channelId) {
            GameManager.emit("disablePageView");
        }
    },

    /**
     * @method enableInputs
     * @description Enable Inputs according to moves data.
     * @param {Object} data - 
     * @param {Number} previousIndex -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    enableInputs: function (moves, playerIndex, input = this.playerInput) {
        // console.log("AKSHAY chaal inputs show",moves)
        // console.trace("enable inputs", moves, playerIndex);
        var sceneName = cc.director.getScene().name;
        if (sceneName == "Login" || sceneName == "Mac" || sceneName == "Windows") {
            this.enableInputsForTileAndUntiled(moves, playerIndex);
            return;
        }

        if (K.PORTRAIT) {
            // this.showRaisePanel.active = false;
            // this.hideRaisePanel.active = false;
        }

        this.realBetBtn.active = false;
        this.realRaiseBtn.active = false;
        moves.forEach(function (element) {
            input[element].active = true; //true;
            // console.error("Player input name   ",this.playerInput[element]._name)
            if (element === 3 || element === 4) {
                // if (this.isMobile)
                //     this.mobInput[7].active = true; // raise slider
                // else
                // input[7].active = true; // raise slider
                // input[7].opacity = 0; // raise slider
                // input[7].children[2].opacity = 0; // raise slider
                // input[7].children[2].scale = 0; // raise slider
                if (K.PORTRAIT) {
                    // this.showRaisePanel.active = true;
                    // this.hideRaisePanel.active = false;

                    // input[5].active = false;
                }

                if (element === 3) {
                    this.realBetBtn.active = true;
                }
                else if (element === 4) {
                    this.realRaiseBtn.active = true;
                }
            }
            if (element === 2) {
                // set call amount
                this.callAmountLabel.string = (this.model.gameData.tableDetails.roundMaxBet - this.model.gameData.tableDetails.players[playerIndex].totalRoundBet).roundOff(2);
                this.updateBB();
                // if (!!this.mobileCallAmountLabel)
                // this.mobileCallAmountLabel.string = Math.floor(this.model.gameData.tableDetails.roundMaxBet - this.model.gameData.tableDetails.players[playerIndex].totalRoundBet);
            }

            if (K.PORTRAIT) {
                if (element === 5 && (input[3].active || input[4].active)) {
                    input[element].active = false;
                }
            }
        }, this);
    },

    enableInputsForTileAndUntiled: function (moves, playerIndex) {

        var input1 = this.mobilePlayerInput;
        var input2 = this.playerInput;

        moves.forEach(function (element) {
            input1[element].active = true; //true;
            input2[element].active = true;
            // console.error("Player input name   ",this.playerInput[element]._name)
            if (element === 3 || element === 4) {
                // if (this.isMobile)
                //     this.mobInput[7].active = true; // raise slider
                // else
                // input1[7].active = true; // raise slider
                // input2[7].active = true;
            }
            if (element === 2) {
                let value = (this.model.gameData.tableDetails.roundMaxBet - this.model.gameData.tableDetails.players[playerIndex].totalRoundBet).roundOff(2);
                // set call amount
                this.callAmountLabel.string = value;
                this.mobileCallAmountLabel.string = value;

                this.updateBB();
            }
        }, this);
    },


    /**
     * @method makePredefinedMove
     * @description calls Predefined moves
     * @param {Object} move -
     * @param {Object} movesAllowed - 
     * @param {Number} previousIndex -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    makePredefinedMove: function (move, movesAllowed, playerIndex) {
        setTimeout(function () {
            if (cc.isValid(this.node)) {
                switch (move) {
                    case "Call":
                        if (movesAllowed.indexOf(2) >= 0) {

                            // this.onCall();
                        } else {
                            this.enableInputs(movesAllowed, playerIndex);
                            // if (GameManager.gameModel.activePokerModels.length >= 2 && !GameManager.isMobile && !GameManager.isWindows && GameScreen.viewType == 1) {
                            //     console.log("predefined moves a")
                            //     this.enableInputsForTileAndUntiled(movesAllowed, playerIndex);
                            //     // this.enableInputs(movesAllowed, playerIndex, this.mobilePlayerInput, this.mobileCallAmountLabel);
                            //     // this.enableDifferentInputs(movesAllowed, playerIndex);
                            // } else {
                            //     console.log("predefined moves a1")
                            //     this.enableInputs(movesAllowed, playerIndex);
                            // }
                        }
                        break;
                    case "CallAny":
                        if (movesAllowed.indexOf(2) >= 0) {

                            // this.onCall();
                        } else {

                            // this.onAllIn();
                        }
                        break;
                    case "Fold":
                        this.sureToFold = false;

                        // this.onFold();
                        break;
                    case "Check":
                        if (movesAllowed.indexOf(1) >= 0) {

                            // this.onCheck();
                        } else {
                            this.enableInputs(movesAllowed, playerIndex);
                            // if (GameManager.gameModel.activePokerModels.length >= 2 && !GameManager.isMobile && !GameManager.isWindows && GameScreen.viewType == 1) {
                            //     console.log("predefined moves b")
                            //     this.enableInputsForTileAndUntiled(movesAllowed, playerIndex);
                            //     // this.enableInputs(movesAllowed, playerIndex, this.mobilePlayerInput, this.mobileCallAmountLabel);
                            //     // this.enableDifferentInputs(movesAllowed, playerIndex);
                            // } else {
                            //     console.log("predefined moves b1")
                            //     this.enableInputs(movesAllowed, playerIndex);
                            // }
                        }
                        break;
                    case "CallAny_Check":
                        if (movesAllowed.indexOf(1) >= 0) {
                            // this.onCheck();
                        } else if (movesAllowed.indexOf(2) >= 0) {
                            // this.onCall();
                        } else {
                            // this.onAllIn();
                        }
                        break;
                    case "AllIn":
                        // this.onAllIn();
                        break;
                    case "Check_Fold":
                        if (movesAllowed.indexOf(1) >= 0) {
                            // this.onCheck();
                        } else {
                            this.sureToFold = false;
                            // this.onFold();
                        }
                        break;
                }
                this.optionalPlayerInput.selectedValue = null;
            }
        }.bind(this), 500);

    },

    /**
     * @method hideMoves
     * @description Hide all inputs
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    hideMoves: function () {
        // console.error("AKSAHY hide moves chaal")
        // if (GameManager.gameModel.activePokerModels.length >= 2 && !GameManager.isMobile && !GameManager.isWindows && GameScreen.viewType == 1) {
        //     this.mobilePlayerInput.forEach(function (element) {
        //         element.active = false;
        //     }, this);
        // }
        this.mobilePlayerInput.forEach(function (element) {
            element.active = false;
        }, this);
        // else {
        this.playerInput.forEach(function (element) {
            element.active = false;
        }, this);
        // }

        // this.showRaisePanel.active = false;
        // this.hideRaisePanel.active = false;

        if (GameScreen.gameModel.activePokerModels[GameScreen.prevSelection] && 
            GameScreen.gameModel.activePokerModels[GameScreen.prevSelection] &&
            GameScreen.gameModel.activePokerModels[GameScreen.prevSelection].gameData.channelId == this.model.gameData.channelId) {
            GameManager.emit("enablePageView");
        }
    },


    /**
     * @method roundOver
     * @param {Object} data
     * @description roundOver pokerModel event callback;
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    roundOver: function (data) {

        // console.log("this.node.parent.number",this.node.parent.getComponent("PokerModel").number),
        // console.error("Round Over", data);
        // reset bet amount on active players
        // update pot amount
        // reset timer
        for (var index = 0; index < this.playerHand.length; index++) {
            this.playerHand[index].activatePlayerBet(false, true);

            if (this.playerHand[index].playerData && 
                this.playerHand[index].playerData.lastMove != "FOLD" &&
                this.playerHand[index].playerData.lastMove != "ALLIN") {
                this.playerHand[index].moveShower.scale = 0;
            }
        }
        // main pot
        // this.potAmount.node.parent.active = true;
        // this.potAmount.string = this.model.gameData.tableDetails.pot[0];
        // this.scheduleOnce(function () {
        //     this.displayPots();
        // }.bind(this), 0.7);
        this.timersToKill.push(setTimeout(function () {
            this.displayPots();
        }.bind(this), 700));
        //   this.enableTempPlayerInput(false);



        // this.optionalPlayerInput.selectedValue = null;
    },


    /**
     * @method gameOver
     * @param {Object} data -
     * @param {Number} playerIndex -
     * @description callBack called on gameOver
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    gameOver: function (data, playerIndex) {
        console.log("GAME OVER", data);
        // reveal cards of every player

        this.disableShowFoldBtn();
        // if (this.bestHand) {
        //     this.bestHand.node.parent.active = false;
        // }

        // if (data.endingType == K.GameEndType.GameCompleted) {
            playerIndex.forEach(function (element) {
                //  setTimeout(() => {
                this.playerHand[this.getRotatedSeatIndex(element)].winningRevealCards(data.endingType == K.GameEndType.EverybodyPacked);
                //  }, 0);
            }, this);


            this.model.gameData.tableDetails.players.forEach(function (element) {
                if (!playerIndex.includes(element.seatIndex) &&
                    this.playerHand[this.getRotatedSeatIndex(element.seatIndex)]) {
                    this.playerHand[this.getRotatedSeatIndex(element.seatIndex)].winningRevealCards(data.endingType == K.GameEndType.EverybodyPacked);
                }
            }, this);
        // }
        var time = 0;

        var zero = this.node.parent.getComponent("PokerModel").number0;

        var one = this.node.parent.getComponent("PokerModel").number1;
        if ((zero == 5) && ((one == 0) || (one == 5))) {

            time = 2200;

        }

        // console.log("time ", time);
        setTimeout(() => {
            if (cc.isValid(this.node)) {
                this.preCheckCounter = 0;
                this.optionalPlayerInput.requestMappings = {};
                this.runItTwiceCaseRunning = false;

                // this.onBestHand();
                //this.playAudio(K.Sounds.gameEnd);
                this.handleRunItTwice(false);
                this.enableTempPlayerInput(false);

                this.optionalPlayerInput.selectedValue = null;

                var myObj = {};
                let refundPot = {};
                for (let i = 0; i < data.winners.length; i++) {
                    var index = this.model.getPlayerById(data.winners[i].playerId);
                    if (data.winners[i].playerId == GameManager.user.playerId) {
                        let xxx = this.model.gameData.settings.isMuckHand;
                        console.log("this.model.gameData.settings.isMuckHand", xxx);
                        if (!xxx && data.endingType == K.GameEndType.EverybodyPacked) {
                            this.muckHandNode.active = true;
                        }
                    }
                    var splitData = {};
                    splitData.amount = data.winners[i].amount;
                    splitData.totalChips = data.winners[i].chips;
                    splitData.potIndex = data.winners[i].potIndex;
                    splitData.internalPotSplitIndex = data.winners[i].internalPotSplitIndex;

                    if (!this.model.gameData.tableDetails.players[index]) {
                        continue;
                    }

                    splitData.targetNode = this.playerHand[this.getRotatedSeatIndex(this.model.gameData.tableDetails.players[index].seatIndex)].node;
                    splitData.set = data.winners[i].set;
                    splitData.handCard = data.winners[i].handCard;
                    splitData.boardCard = data.winners[i].boardCard;
                    splitData.playerId = data.winners[i].playerId;
                    splitData.winningAmount = data.winners[i].winningAmount;
                    splitData.type = data.winners[i].type ? data.winners[i].type : "LOW CASE ";

                    // formatting data according to our needs, i,e RIT+HI-LO(OHAMA), RIT+OHAMA, RIT+HOLEDEM
                    if (!data.winners[i].isRefund) {
                        if (!myObj[data.winners[i].internalPotSplitIndex]) {
                            myObj[data.winners[i].internalPotSplitIndex] = [];
                        }
                        myObj[data.winners[i].internalPotSplitIndex].push(splitData);
                    } else {
                        if (!refundPot.playerId) {
                            refundPot = splitData;
                            refundPot.set = [];
                            refundPot.handCard = [];
                            refundPot.boardCard = [];
                            refundPot.type = "REFUND";
                        } else {
                            refundPot.winningAmount += data.winners[i].winningAmount;
                        }

                    }
                };
                let tempArray = [];
                if (!!refundPot.playerId) {
                    let v = [];
                    v.push(refundPot);
                    tempArray.push(v);
                }
                for (var property in myObj) {
                    if (myObj.hasOwnProperty(property)) {
                        tempArray.push(myObj[property]);
                    }
                }
                myObj = tempArray; //myObj now holds array of all splitted pots with their all winners.
                let count = new Array(9);
                count.fill(0);
                for (let t = 0; t < myObj.length; t++) {
                    count[myObj[t][0].potIndex] = count[myObj[t][0].potIndex] + 1;
                }
                // for each winner in subsiquent pot run animation.(highlight cards + move chips)
                var tmpPlayerCardRef = null;
                for (let m = 0; m < myObj.length; m++) {
                    (function (o, inst) {


                        // inst.scheduleOnce(function () {
                        inst.timersToKill.push(setTimeout(function () {
                            var potInstance = null;
                            (count[myObj[o][0].potIndex] > 1) ? count[myObj[o][0].potIndex] = count[myObj[o][0].potIndex] - 1 : potInstance = inst.potAmount[myObj[o][0].potIndex];
                            // let addedDelayForFirstTime=o==0?

                            // inst.scheduleOnce(function () {
                            inst.timersToKill.push(setTimeout(function () {

                                if (!potInstance) {
                                    let sumAmount = 0;
                                    for (var n = 0; n < myObj[o].length; n++) {
                                        sumAmount += myObj[o][n].winningAmount;
                                    }
                                    sumAmount = (sumAmount).roundOff(2);
                                    sumAmount = inst.potAmount[myObj[o][0].potIndex].getComponent(cc.Label).__string - sumAmount
                                    // inst.potAmount[myObj[o][0].potIndex].getComponent(cc.Label).string = sumAmount.roundOff(2);
                                    inst.potAmount[myObj[o][0].potIndex].getComponent(cc.Label).string = GameManager.convertChips(sumAmount);
                                    inst.potAmount[myObj[o][0].potIndex].getComponent(cc.Label).__string = sumAmount;
                                    inst.updateBB();
                                    // inst.potAmount[index].parent.active = true;
                                    // inst.potAmount[myObj[o][0].potIndex].children[0].getComponent('PokerChipsView').generateChips(Math.floor(sumAmount));
                                }
                                inst.playAudio(K.Sounds.chipDistribution); //29aug

                                inst.potAnimator.runPotSplitter(myObj[o], potInstance, function () { });
                            }.bind(inst), inst.potSplitterMoveActionDelay * 1000));

                            if (myObj[o][0].type != "Every Body Else Folded" && myObj[o][0].type != "REFUND") {
                                if (inst.node.getChildByName("winnerBannerBg")) {
                                    let tmp = inst.node.getChildByName("winnerBannerBg");
                                    tmp.active = true;
                                    tmp.width = 400;
                                    tmp.getChildByName("Rectangle 3289").getChildByName("layout1").active = false;
                                    tmp.getChildByName("Rectangle 3289").getChildByName("layout2").active = false;
                                    tmp.getChildByName("Rectangle 3289").getChildByName("winningText").getComponent(cc.Label).string = myObj[o][0].type;
                                    // [
                                    //     {
                                    //         "type": "heart",
                                    //         "rank": 2,
                                    //         "name": "2",
                                    //         "priority": 2
                                    //     },
                                    //     {
                                    //         "type": "heart",
                                    //         "rank": 3,
                                    //         "name": "3",
                                    //         "priority": 3
                                    //     },
                                    //     {
                                    //         "type": "heart",
                                    //         "rank": 8,
                                    //         "name": "8",
                                    //         "priority": 8
                                    //     },
                                    //     {
                                    //         "type": "heart",
                                    //         "rank": 7,
                                    //         "name": "7",
                                    //         "priority": 7
                                    //     },
                                    //     {
                                    //         "type": "heart",
                                    //         "rank": 9,
                                    //         "name": "9",
                                    //         "priority": 9
                                    //     }
                                    // ]

                                    tmp.getChildByName("Rectangle 3289").getChildByName("layout1").children.forEach(function (element) {
                                        element.active = false;
                                    }, this);
                                    tmp.getChildByName("Rectangle 3289").getChildByName("layout1").active = true;

                                    for (var zzz = 0; zzz < myObj[o][0].set.length; zzz++) {
                                        tmp.getChildByName("Rectangle 3289").getChildByName("layout1").children[zzz].active = true;
                                        tmp.getChildByName("Rectangle 3289").getChildByName("layout1").children[zzz].getChildByName("rank").getComponent(cc.Label).string = myObj[o][0].set[zzz].name;
                                        

                                        tmp.getChildByName("Rectangle 3289").getChildByName("layout1").children[zzz].getChildByName("1").active = false;
                                        tmp.getChildByName("Rectangle 3289").getChildByName("layout1").children[zzz].getChildByName("2").active = false;
                                        tmp.getChildByName("Rectangle 3289").getChildByName("layout1").children[zzz].getChildByName("3").active = false;
                                        tmp.getChildByName("Rectangle 3289").getChildByName("layout1").children[zzz].getChildByName("4").active = false;
                                        if (myObj[o][0].set[zzz].type === "spade") {
                                            tmp.getChildByName("Rectangle 3289").getChildByName("layout1").children[zzz].getChildByName("1").active = true;
                                        } 
                                        else if (myObj[o][0].set[zzz].type === "heart") {
                                            tmp.getChildByName("Rectangle 3289").getChildByName("layout1").children[zzz].getChildByName("2").active = true;
                                        } 
                                        else if (myObj[o][0].set[zzz].type === "club") {
                                            tmp.getChildByName("Rectangle 3289").getChildByName("layout1").children[zzz].getChildByName("3").active = true;
                                        } 
                                        else if (myObj[o][0].set[zzz].type === "diamond") {
                                            tmp.getChildByName("Rectangle 3289").getChildByName("layout1").children[zzz].getChildByName("4").active = true;
                                        }
                                    }

                                    // inst.scheduleOnce(function () {
                                    inst.timersToKill.push(setTimeout(function () {
                                        tmp.active = false;
                                    }, 3000));
                                    // cc.director.getScheduler().schedule((dt) => { tmp.active = false; }, inst, inst.winnerBannerDeactivateTimerDelay);
                                }
                            }

                            for (var j = 0; j < myObj[o].length; j++) {
                                // if (myObj[o][j].playerId == GameManager.user.playerId) {
                                //     inst.playAudio(K.Sounds.playerWin);
                                // }
                                if (tmpPlayerCardRef != null) {
                                    inst.dullAllCards(tmpPlayerCardRef, true);
                                }
                                let playerHandCards = myObj[o][j].targetNode.getChildByName("HandPlayer").getChildByName("MyCardsShow").getComponentsInChildren('Card');

                                tmpPlayerCardRef = playerHandCards;

                                let visibleHoleCards = inst.holeCardHolder.getComponentsInChildren('Card');
                                let runItTwiceCards = inst.holeCardsWithTwiceHolder.getComponentsInChildren('Card');
                                let runItTwiceholder = inst.runItTwiceHolder.getComponentsInChildren('Card');
                                let tmp = runItTwiceCards.concat(runItTwiceholder);
                                if (myObj[o][j].set.length != 0) {
                                    inst.highlightWinningCards(myObj[o][j].set, myObj[o][j].handCard, myObj[o][j].boardCard, visibleHoleCards.concat(tmp), playerHandCards);
                                }
                            }
                        }.bind(inst), o * inst.potDistributionTimerDelay * 1000));
                    })(m, this);
                }



                this.model.gameData.tableDetails.players.forEach(function (element) {
                    this.playerHand[this.getRotatedSeatIndex(element.seatIndex)].gameOver();
                }, this);
                // this.playerHand[this.getRotatedSeatIndex(this.model.gameData.tableDetails.dealerIndex)].setDealer(false);
                this.hideMoves();
                // this.chatSubmitBtn.interactable = true;
                // }.bind(this), 2);
            }
        }, time);

    },

    /**
     * @method highlight Winning Cards of Player
     * @param {Number} winnerSet - set of winner cards combinations provided by server 
     * @param {Number} cardsOnTable - cards on Table visible to all, HOLECARDS
     * @param {Number} playerHandCards - Player Hand cards which he holds
     * @description Method to highlight players cards who won.
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    highlightWinningCards: function (winnerSet, handCard, boardCard, cardsOnTable, playerHandCards) {
        this.dullAllCards(playerHandCards);
        for (var i = 0; i < handCard.length; i++) {
            var c = 0;
            switch (handCard[i].type) {
                case "spade":
                    c = 1;
                    break;
                case "heart":
                    c = 2;
                    break;
                case "club":
                    c = 3;
                    break;
                case "diamond":
                    c = 4;
                    break;
            }
            playerHandCards.forEach(function (element) {
                if (element.cardRank == handCard[i].rank && element.suit == c) {
                    element.node.getChildByName("CardGlow").active = true;
                    element.node.y = (10);
                    element.node.getChildByName("FrontFace").color = cc.Color.WHITE;
                }
            }, this);
        }

        this.dullAllCards(cardsOnTable);
        for (var i = 0; i < boardCard.length; i++) {
            var c = 0;
            switch (boardCard[i].type) {
                case "spade":
                    c = 1;
                    break;
                case "heart":
                    c = 2;
                    break;
                case "club":
                    c = 3;
                    break;
                case "diamond":
                    c = 4;
                    break;
            }
            cardsOnTable.forEach(function (element) {
                if (element.cardRank == boardCard[i].rank && element.suit == c) {
                    element.node.getChildByName("CardGlow").active = true;
                    element.node.y = (10);
                    element.node.getChildByName("FrontFace").color = cc.Color.WHITE;
                }
            }, this);
        }

        // var array = cardsOnTable.concat(playerHandCards);
        // this.dullAllCards(array);
        // var temp = winnerSet;
        // for (var i = 0; i < temp.length; i++) {
        //     var c = 0;
        //     switch (temp[i].type) {
        //         case "spade":
        //             c = 1;
        //             break;
        //         case "heart":
        //             c = 2;
        //             break;
        //         case "club":
        //             c = 3;
        //             break;
        //         case "diamond":
        //             c = 4;
        //             break;
        //     }
        //     array.forEach(function (element) {
        //         if (element.cardRank == temp[i].rank && element.suit == c) {
        //             element.node.getChildByName("CardGlow").active = true;
        //             element.node.y = (10);
        //             element.node.getChildByName("FrontFace").color = cc.Color.WHITE;
        //         }
        //     }, this);
        // }
    },


    /**
     * @method Reset highlight Winning Cards of Player
     * @param {Number} winnerSet - set of winner cards combinations provided by server 
     * @param {Number} cardsOnTable - cards on Table visible to all, HOLECARDS
     * @param {Number} playerHandCards - Player Hand cards which he holds
     * @description Method to reset highlight players cards who won.
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    dullAllCards: function (cardsToReset, unDull) {
        cardsToReset.forEach((e) => {
            var element = e.node;
            element.y = (0);
            element.getChildByName("FrontFace").color = new cc.Color(170, 161, 161);
            element.getChildByName("CardGlow").active = false;
            if (unDull) {
                element.getChildByName("FrontFace").color = cc.Color.WHITE;
            }
        });
    },

    /**
     * @method showWinnerCards
     * @param {Number} seatIndex -
     * @description Method to reveal winers hand card
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    showWinnerCards: function (seatIndex) {
        if (this.getRotatedSeatIndex(seatIndex) && this.playerHand[this.getRotatedSeatIndex(seatIndex)])
            this.playerHand[this.getRotatedSeatIndex(seatIndex)].winningRevealCards2();
        else {
            // console.error("Winner not found !!");
        }
    },

    /**
     * @method playerLeft
     * @param {Object} data -
     * @description  leave pokerModel event callback
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    playerLeft: function (data) {
        console.log('playerLeft ', data);
        // reset seat view for the player
        if (data === null) {
            // already stand!
            return;
        }
        //In case of standup

        if (data[0].playerId === this.model.gameData.playerId) {

            if (GameManager.playerRequestedToLeaveTable[this.model.gameData.channelId] === true) {
                GameManager.playerRequestedToLeaveTable[this.model.gameData.channelId] = false;
            } else {
                this.handleSitOutBtns(true);
                this.resetView();
                this.manageBtns(false);
                this.popUpManager.hide(2, function () { });
                this.popUpManager.hide(PopUpType.BuyInPopup, function () { });
                this.showMuckHand();
                this.handleRunItTwice(true, true);
                this.singleTime = false;
            }
        }
        var playerIndex = this.model.getPlayerById(this.model.gameData.playerId);

        if (playerIndex !== -1) {
            this.playerHand[this.getRotatedSeatIndex(data[0].seatIndex)].disableView();
        } else {
            this.playerHand[this.getRotatedSeatIndex(data[0].seatIndex)].disablePlayerView();
        }


        this.playerHand[this.getRotatedSeatIndex(data[0].seatIndex)].clearTimers();

        //  this.straddleCheckBox.node.parent.active = (this.getNumPlayerInTable() > 3) && (!this.model.roomConfig.isStraddleEnable) && (!!this.getMyPlayer); // ||true;
        this.isStraddleAllowed(); // ||true;
        this.enableJoinBtn();


        if (data[0].playerId == GameManager.user.playerId) {
            // this.leaveNextHandCheckBox.setSelection(false);
            // this.leaveNextHandTag.active = false;

            // if (GameManager.playerRequestedToLeaveTable[this.model.gameData.channelId] === false) {
            //     GameManager.playerRequestedToLeaveTable[this.model.gameData.channelId] = true;
            // }

            // // this.unscheduleAllCallbacks();
            // let cb = function () {
            //     for (var index = 0; index < this.playerHand.length; index++) {
            //         this.playerHand[index].clearPlayerCards();
            //     }
            //     this.clearHoleCards();
            //     this.clearPots();
            // }
            // this.model.leave(this.isObserver());

            this.onTableCloseLeave();
        }
    },

    /**
     * @method isAutoAddOnAllowed
     * @param {Object} data -
     * @param {Number} playerIndex -
     * @description will be used later
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    isAutoAddOnAllowed: function () {
        var val = (this.model.gameData.channelType == K.ChannelType.Tournament);
        val = val && !(!!this.getMyPlayer()) && (!this.model.roomConfig.isAutoAddOnEnable) && (this.getMyPlayer().state == K.PlayerState.Playing);
        //  this.autoAddOnCheckBox.node.parent.active = val;
        return val;


    },
    isAutoRebuyAllowed: function () {
        var val = (this.model.gameData.channelType == K.ChannelType.Tournament);

        return val;
    },
    /**
     * @method isStraddleAllowed   
     * @description straddle checkBox callback
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    isStraddleAllowed: function () {
        var val = !(this.model.gameData.channelType == K.ChannelType.Tournament);
        val = val && (!!this.getMyPlayer()) && (!this.model.roomConfig.isStraddleEnable) && (this.getMyPlayer().state == K.PlayerState.Playing) && (this.getNumPlayerInTable() > 3);
        this.straddleCheckBox.node.parent.active = val;
        return val;
    },
    /**
     * @method playerCards
     * @param {Object} data -
     * @param {Number} seatIndex -
     * @description shows playercard in players position 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    // playerCards: function (data, seatIndex) {
    //     let players = this.model.gameData.tableDetails.players;
    //     let count = 0;
    //     for (var index = 0; index < players.length; index++) {
    //         if (players[index].state === K.PlayerState.Playing) {
    //             count++;
    //         }
    //     }
    //     let delay = (count * this.model.dummyCardsCount * 0.1) + 0.6;
    //     // this.scheduleOnce(() => {
    //     //     this.playAudio(K.Sounds.playerCardFlip);//sssss
    //     //     this.playerHand[this.getRotatedSeatIndex(seatIndex)].addPlayerCards(data);//ssssss
    //     // }, delay);
    //     // this.selfHandCards = data;
    //     this.timersToKill.push(setTimeout(function () {
    //         // this.playAudio(K.Sounds.playerCardFlip);
    //         this.playerHand[this.getRotatedSeatIndex(seatIndex)].addPlayerCards(data);
    //     }.bind(this), delay * 1000));
    // },
    playerCards: function (data, seatIndex) {
        this.forceAddPlayercardsData = data;
        this.forceAddPlayercardsSeatIndex = seatIndex;
    },

    forceAddPlayerCards: function () {
        if (cc.isValid(this.node)) {
            if (!!this.forceAddPlayercardsData)
                this.playerHand[this.getRotatedSeatIndex(this.forceAddPlayercardsSeatIndex)].addPlayerCards(this.forceAddPlayercardsData);
            else {
                // console.error("cards not  opened coz of missing broadcast due to internet connectivity");
            }
        }
    },


    /**
     * @method onPreCheck
     * @param {Object} data -
     * @description It Enable specified prechecks accordingly.
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onPreCheck: function (data) {
        // console.error("on precheck broadcast ", data)
        // if (this.getMyPlayer().seatIndex == this.model.gameData.tableDetails.currentMoveIndex) {
        //     console.error("ONPRECHECK RETURN ");
        //     return;
        // }
        // console.log("linkin park PRECHECK from server CALLED with sel value= ", data.precheckValue);
        this.preCheckCounter++;
        var value = (this.model.gameData.tableDetails.roundMaxBet - this.model.gameData.tableDetails.players[this.model.getPlayerById(GameManager.user.playerId)].totalRoundBet).roundOff(2);
        this.optionalPlayerInput.selectedValue = (data.precheckValue == "NONE") ? null : data.precheckValue;
        this.enableTempPlayerInput(true, data.set, value, data.precheckValue);

        this.scheduleOnce(
            function () {
                var value = (this.model.gameData.tableDetails.roundMaxBet - this.model.gameData.tableDetails.players[this.model.getPlayerById(GameManager.user.playerId)].totalRoundBet).roundOff(2);
                this.optionalPlayerInput.tempTestFunction(value);

            }.bind(this), 1.0
        );
    },
    /**
     * @method onPlayerCoins
     * @param {Object} player -
     * @description Update players coin!
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onPlayerCoins: function (player) {
        this.playerHand[this.getRotatedSeatIndex(player.seatIndex)].updateCoins();
    },

    /**
     * @method enableTempPlayerInput
     * @param {} enable -
     * @param {} set -
     * @param {} val -
     * @description  handles input checkboxes to preselect the move player wants
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    enableTempPlayerInput: function (enable, set, val, selectedPreCheckValue = 'NONE') {
        // console.error("PRECHECK VAL ", selectedPreCheckValue)
        this.optionalPlayerInput.enableTempPlayerInput(enable, set, val, selectedPreCheckValue); //uncomment when implemented with data
    },
    /**
     * @method enableTempPlayerInput   
     * @param {cc.SpriteFrame} spriteFrame -
     * @description  handles input checkboxes to preselect the move player wants
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    changeTableColor: function (spriteFrame) {
        if (this.node.parent.active)
            this.table.spriteFrame = spriteFrame;
    },
    /**
     * @method onPlayerNotes
     * @param {Number} playerId -
     * @description  display any player's notes.
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */

    onPlayerNotes: function (playerId) {
        var index = this.model.getPlayerById(playerId);
        this.playerHand[this.getRotatedSeatIndex(this.model.gameData.tableDetails.players[index].seatIndex)].displayNote();
    },

    /**
     * @method onValueChange    
     * @description  Method to highlight table based on highlight checkbox
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onValueChange: function () {
        //this.highlightBg.node.active = this.highLightCheckbox.getSelection();

        var val = false;
        if (this.highLightCheckbox)
            this.highLightCheckbox.getSelection();
        var ind = -1;
        if (val && this.tiledView.active) {
            for (var i = 0; i < this.tableColors.length; i++) {
                if (this.table.spriteFrame == this.tableColors[i]) {
                    ind = i;
                    break;
                }
            }
            if (ind >= 0)
                this.table.spriteFrame = this.tableHighlightColors[ind];
        } else {
            for (var i = 0; i < this.tableHighlightColors.length; i++) {
                if (this.table.spriteFrame == this.tableHighlightColors[i]) {
                    ind = i;
                    break;
                }
            }
            if (ind >= 0)
                this.table.spriteFrame = this.tableColors[ind];
        }
    },
    toLobby: function () {
        if (K.PORTRAIT) {
            if (this.mobileGamePlayOptionsVisible) {
                this.mobileGamePlayOptions();
            }
        }

        if (GameManager.isMobile) {
            GameScreen.onShowLobby();
        }
        else {
            window.versions.ping()
        }
        // this.onHideRaisePanel();
        this.playAudio(K.Sounds.click);
    },

    /**
     * @method onRebuyTournament
     * @param {Number} amount -
     * @description  
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onRebuyTournament: function (amount) {
        var popUp = PopUpType.PlayerInfoPopup;

        if (amount) {
            popUp = Pop
        }
        var data = {
            playerId: GameManager.user.playerId,
            tournamentId: this.model.roomConfig.tableId,
            // gameVersionCount: this.model.roomConfig.gameVersionCount,
        };
        TournamentHandler.rebuyInTournament(data, function (response) {
            if (response.success) {

            } else {
                var data = {};
                data.info = response.info;
                // data.disableTimer = true;
                this.popUpManager.show(PopUpType.PlayerInfoPopup, data, function () { });
            }
        }.bind(this), null);
        this.playAudio(K.Sounds.click);
    },

    /**
     * @method clearBreakTimer
     * @description clear / UnSchedule the timers.  
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    clearBreakTimer: function () {
        clearTimeout(this.timerOffSchedule);
        clearInterval(this.timerSchedule);
    },
    /**
     * @method onReplay
     * @description Replay Button call back show a video Popup  
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onReplay: function (evntData, custom) {
        this.playAudio(K.Sounds.click);
        if (this.model.handTabs.length <= 0) {
            // console.error("NO VIDEO")
            return;
        }

        var data = {};
        data.currentId = this.model.handTabs[this.model.handTabs.length - 1].videoId;
        data.refModel = this.model;
        data.id = this.model.handTabs.length - 1;
        data.playSound = this.playAudio.bind(this);
        if (GameScreen.isMobile && this.model.handTabs && false) {
            this.model.getHandHistory(this.model.handTabs[this.model.handTabs.length - 1].handHistoryId);
        } else {
            // console.log("Click for popup");
            GameManager.popUpManager.show(PopUpType.VideoPlayerPopup, data, function () { });
        }
    },
    /**
     * @method onMobGameOptions
     * @description enable/disable some specific option for mobile view
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onMobGameOptions: function () {
        this.mobGameOptions.active = !this.mobGameOptions.active;
    },
    /**
     * @method showMuchHand
     * @param {object} eventData -
     * @param {boolean} flag -
     * @description  handles input checkboxes to preselect the move player wants
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    showMuchHand: function (eventData, flag) {
        this.playAudio(K.Sounds.click);
        this.muckHandNode.active = false;
        if (flag == "true") {
            this.model.fireMuckHandEvent();
        }
    },
    addOnBtnCallBack: function () {

    },
    /**
     * @method activeDeactiveReBuyInBtn
     * @description  
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    activeDeactiveReBuyInBtn: function (value) {
        this.reBuyBtn2.active = value;
    },
    onReBuyBtn2: function () {
        this.model.onReBuyCall();
    },

    reBuyBtnCallBack: function () {

    },
    showMuckHand: function () {
        // this.playAudio(K.Sounds.click);
        this.muckHandCheckbox.node.parent.active = (!!this.getMyPlayer() && (this.getMyPlayer().state == K.PlayerState.Playing));

    },
    /**
     * @method onMuckHand 
     * @description callback for muck hand checkBox
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    onMuckHand: function () {
        var selection = this.muckHandCheckbox.getSelection();
        this.model.setMuckHand(selection, function (response) {
            if (response.success) {
                this.muckHandCheckbox.setSelection(selection);
            } else {
                this.muckHandCheckbox.setSelection(!selection);
            }
        }.bind(this));
    },

    killTimers: function () {
        // console.log("shishir kick presenter done");

        this.timersToKill.forEach(function (element) {
            clearTimeout(element);
        }, this);
        this.timersToKill = [];
        this.playerHand.forEach(function (element) {
            element.clearTimers();
        }, this);
    },

    displayRoundNumber: function () {
        // console.log("roomconfig", this.model.roomConfig);
        // console.log("gamedata", this.model.gameData);
        // console.log("tableDetails", this.model.gameData.tableDetails)
        this.roomNameLbl.string = this.model.roomConfig.channelName;
        // this.roomNameLbl2.string = this.model.roomConfig.channelName;
        // console.log(this.model)
        // if (this.tiledView.active || GameManager.isMobile) {
        let stakes = GameManager.convertChips(this.model.gameData.tableDetails.smallBlind) + "/" + GameManager.convertChips(this.model.gameData.tableDetails.bigBlind);
        // this.roomNameLbl.string += "  " + stakes; // " | " +
        this.roomNameLbl2.string = "Blinds: " + stakes; // " | " +

        // if (this.model.gameData.tableDetails.isForceRit) {
        //     this.roomNameLbl.string += " (RIT)"
        //     this.roomNameLbl2.string += " (RIT)"
        // }
    },

    onLobby: function () {
        if (K.PORTRAIT) {
            if (this.mobileGamePlayOptionsVisible) {
                this.mobileGamePlayOptions();
            }
        }
        if (GameManager.isMobile) {
            GameScreen.onShowLobby();
        }
        else {
            window.versions.ping()
        }
        this.playAudio(K.Sounds.click);
    },
    OnLeaveJohny: function () {
        if (K.PORTRAIT) {
            if (this.mobileGamePlayOptionsVisible) {
                this.mobileGamePlayOptions();
            }
        }
        GameScreen.leaveCurrent();
        this.playAudio(K.Sounds.click);
    },
    mobileGamePlayOptions: function () {

        let pos = this.node.parent.getChildByName("DummGameplayOpt").getPosition();

        if (!this.mobileGamePlayOptionsVisible) {
            let seq = cc.sequence(cc.callFunc(() => {
                this.node.parent.getChildByName("GameplayOptions").children[1].active = true;
            }, this), cc.moveTo(0.1, pos.x, pos.y).easing(cc.easeCircleActionInOut()));
            this.node.parent.getChildByName("GameplayOptions").runAction(seq);

            GameManager.emit("hideJoinSimlar");

            //For Mobile Web Scene
            // if(GameManager.isMobile){
            // this.chatCloseBtn.active = false;
            // }

        } else {
            // console.log("rajat 4", this.mobileGamePlayOptionsInitPosition.x);

            
            let seq = cc.sequence(cc.moveTo(0, this.mobileGamePlayOptionsInitPosition.x, this.mobileGamePlayOptionsInitPosition.y).easing(cc.easeCircleActionIn()), cc.callFunc(() => {
                this.node.parent.getChildByName("GameplayOptions").children[1].active = false;
                GameManager.emit("showJoinSimlar");
            }, this));


            this.node.parent.getChildByName("GameplayOptions").runAction(seq);

            // var chatB = this.chatCloseBtn;
            // For Mobile Web Scene
            // if(GameManager.isMobile){
            //     setTimeout(function(){
            //         chatB.active = true;
            //         console.log("Hi");
            //     },400);
            //     }

        }

        this.mobileGamePlayOptionsVisible = !this.mobileGamePlayOptionsVisible;
    },

    mobileChatOptions: function () {

        if (!this.mobileSliderChatSection.active) {

            GameManager.emit("hideJoinSimlar");

            this.mobileChatOptionsInitPosition = this.mobileSliderChatSection.getPosition();
            let pos = this.mobileSliderChatSection.parent.getChildByName("DummyChatOpt").getPosition();

            // this.closeBtn.active = true;
            this.chatCloseBtn.active = true;
            this.mobileSliderChatSection.active = true;

            if (this.dealerChatToggle.state !== this.model.gameData.settings.dealerChat) {
                this.dealerChatToggle.onToggle();
            }
            if (this.model.gameData.settings.playerChat !== this.ChatToggle.state) {
                this.ChatToggle.onToggle();
            }

            // if (K.PORTRAIT) {
                this.mobileSliderChatSection.runAction(cc.moveTo(0.3, 786/2, 0).easing(cc.easeCircleActionInOut()));
            // }
            // else {
            //     this.mobileSliderChatSection.runAction(cc.moveTo(0.3, pos.x, pos.y).easing(cc.easeCircleActionInOut()));
            // }
        }

    },

    onClose: function () {
        // console.log("Onclose ", this.closeBtn.active);


        // var prev = this.node.parent.getChildByName("UntiledView").getChildByName("ChatPanelMain").getChildByName("ChatOptions").getChildByName("container").getComponent("TabBtnUtil").currentTab;


        // var tablet = this.node.parent.getChildByName("UntiledView").getChildByName("ChatPanelMain").getChildByName("ChatOptions").getChildByName("container").getComponent("TabBtnUtil");
        // if(prev == 1){

        //     setTimeout(function(){
        //         tablet.onShowTab_01();

        //     },400);
        // }
        // if (this.closeBtn.active) {

            
            let seq = cc.sequence(cc.moveTo(0.001, this.mobileChatOptionsInitPosition.x, this.mobileChatOptionsInitPosition.y).easing(cc.easeCircleActionIn()), cc.callFunc(() => {
                this.mobileSliderChatSection.active = false;
                GameManager.emit("showJoinSimlar");
            }, this));

            this.mobileSliderChatSection.runAction(seq);
            // this.closeBtn.active = false;
            // this.chatCloseBtn.active = true;
        // }
    },

    onLeaderboard: function () {
        this.leaderboardInitPosition = this.leaderboardSection.getPosition();
        this.leaderboardSection.x = this.leaderboardDummySection.x;

        GameManager.emit("hideJoinSimlar");
    },

    onCloseLeaderboard: function () {
        this.leaderboardSection.x = this.leaderboardInitPosition.x;

        GameManager.emit("showJoinSimlar");
    },

    onMobilDealerClick: function () {
        this.dealerNode.active = true;
        this.playAudio(K.Sounds.click);
    },

    onMobileHistoryClick: function () {
        GameManager.emit("hideJoinSimlar");
        this.model.showHandHistoryDetail();
        this.playAudio(K.Sounds.click);
    },


    onViewChangedToTiled() {
        // setTimeout(() => {
        // this.tiledToggle.getChildByName("DoTile").getComponent(cc.Button).interactable = false;
        // this.tiledToggle.getChildByName("DoUntile").getComponent(cc.Button).interactable = true;
        // console.log("Unitled to Tiled", this.playerInput[0].active);
        if (this.playerInput[0].active) {
            this.mobilePlayerInput[0].active = true;
            this.playerInput[0].active = false;

            for (var i = 1; i < this.playerInput.length; i++) {
                this.mobilePlayerInput[i].active = this.playerInput[i].active;
            }
        }
        // }, 100);
    },

    onViewChangedToUnTiled() {
        // setTimeout(() => {
        // this.untiledToggle.getChildByName("DoTile").getComponent(cc.Button).interactable = true;
        // this.untiledToggle.getChildByName("DoUntile").getComponent(cc.Button).interactable = false;
        // console.error("Tiled to Untiled", this.mobilePlayerInput[0].active);
        if (this.mobilePlayerInput[0].active) {
            this.mobilePlayerInput[0].active = false;
            this.playerInput[0].active = true;

            for (var i = 1; i < this.mobilePlayerInput.length; i++) {
                this.playerInput[i].active = this.mobilePlayerInput[i].active;
            }
        }
        // }, 100);
    },

    onShowRaisePanel() {
        if (K.PORTRAIT) {
            // this.showRaisePanel.active = false;
            // this.hideRaisePanel.active = true;

            this.playerInputNode.active = false;
            this.raisePanelNode.active = true;

            this.playerChatBtn.active = false;
        }
    },

    onHideRaisePanel() {
        if (K.PORTRAIT) {
            // this.showRaisePanel.active = true;
            // this.hideRaisePanel.active = false;

            this.playerInputNode.active = true;
            this.raisePanelNode.active = false;

            this.playerChatBtn.active = true;
        }
    },

    onGameResult() {
        let inst = this;
        ServerCom.pomeloRequest("room.channelHandler.getCurrentGameResult", {
            channelId: this.model.gameData.channelId,
            access_token: K.Token.access_token,
        }, function (response) {
            console.log("getCurrentGameResult", response);

            inst.gameResult.active = true;
            inst.gameResult.getComponent("GameResult").onShow(response.data);

            GameManager.emit("hideJoinSimlar");
        }, null, 5000, false);
    },

    onClosePlayerInfoPopup() {
        this.playerInfoPopup.active = false;
        GameManager.emit("showJoinSimlar");
    },

    updateBB() {
        // if (!GameManager.user.settings.stackInBB) {
        //     return;
        // }

        this.potAmount.forEach(function (element) {
            element.parent.getChildByName("bb").getComponent(cc.Label).string = (Number(element.getComponent(cc.Label).__string) / this.model.gameData.tableDetails.bigBlind).toFixed(1) + 'BB';
        }, this);

        this.totalPotLbl.node.parent.getChildByName("bb").getComponent(cc.Label).string = (Number(this.totalPotLbl.__string) / this.model.gameData.tableDetails.bigBlind).toFixed(1) + 'BB';

        this.callAmountLabel.node.parent.getChildByName("bb").getComponent(cc.Label).string = (Number(this.callAmountLabel.string) / this.model.gameData.tableDetails.bigBlind).toFixed(1) + 'BB';

        if (GameManager.isBB && GameManager.user.settings.stackInBB) {
            this.potAmount.forEach(function (element) {
                element.opacity = 0;
                element.parent.getChildByName("bb").opacity = 255;
            }, this);

            this.totalPotLbl.node.scale = 0;
            this.totalPotLbl.node.parent.getChildByName("bb").scale = 0.5;

            this.callAmountLabel.node.scale = 0;
            this.callAmountLabel.node.parent.getChildByName("bb").scale = 0.5;
        }
        else {
            this.potAmount.forEach(function (element) {
                element.opacity = 255;
                element.parent.getChildByName("bb").opacity = 0;
            }, this);   

            this.totalPotLbl.node.scale = 0.5;
            this.totalPotLbl.node.parent.getChildByName("bb").scale = 0;

            this.callAmountLabel.node.scale = 0.5;
            this.callAmountLabel.node.parent.getChildByName("bb").scale = 0;
        }

        this.betBtnSlider.updateBB();
    },

    switchBBUI() {
        console.log("switchBBUI");
        if (GameManager.user.settings.stackInBB !== this.BBToggle.state) {
            this.BBToggle.onToggle();
        }
    },

    switchBBNow() {
        console.log("switchBBNow");
        this.updateBB();
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

    onleaveNextHand: function() {
        this.leaveNextHandTag.active = true;                
    },

    onRemoveTable: function(data) {
        console.log("onRemoveTable", data);
        // {
        //     "channelId": "668511801f4de16ba5b6b72c",
        //     "route": "removeTable"
        // }
        if (this.model && this.model.gameData && (data.channelId == this.model.gameData.channelId || data._id == this.model.gameData.channelId)) {
            this.tableClosed.active = true;
        }
    },

    onTableCloseLeave: function() {
        if (GameManager.playerRequestedToLeaveTable[this.model.gameData.channelId] === false) {
            GameManager.playerRequestedToLeaveTable[this.model.gameData.channelId] = true;
        }

        // this.unscheduleAllCallbacks();
        let cb = function () {
            for (var index = 0; index < this.playerHand.length; index++) {
                this.playerHand[index].clearPlayerCards();
            }
            this.clearHoleCards();
            this.clearPots();
        }
        this.model.leaveClosedTable();
    },

    onTogglePlayerChat: function () {        
        // var data = {};
        // data.query = {};
        // data.updateKeys = {};
        // data.query.playerId = GameManager.user.playerId;
        // data.updateKeys["settings.playerChat"] = this.ChatToggle.state;
        // ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (data) {
        //     if (data.success) {
        //         GameManager.user.playerChat = !GameManager.user.playerChat;
        //         GameManager.emit(K.PokerEvents.onChatSettingsChanged);
        //     } else {
        //         this.ChatToggle.onToggle();
        //     }
        // }.bind(this));

        
            var data = {};
            data.channelId = this.model.gameData.channelId;
            data.playerId = GameManager.user.playerId;
            data.key = 'playerChat';
            data.value = this.ChatToggle.state;
            ServerCom.pomeloRequest(K.PomeloAPI.updateTableSettings, data, function (response) {
                if (response.success) {
                    this.model.gameData.settings.playerChat = !this.model.gameData.settings.playerChat;
                } else {
                    this.ChatToggle.onToggle();
                }
            }.bind(this), null, 5000, false);
    },

    onToggleDealerChat: function () {
        // var data = {};
        // data.query = {};
        // data.updateKeys = {};
        // data.query.playerId = GameManager.user.playerId;
        // data.updateKeys["settings.dealerChat"] = this.dealerChatToggle.state;
        // ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (data) {
        //     if (data.success) {
        //         GameManager.user.dealerChat = !GameManager.user.dealerChat;
        //         GameManager.emit(K.PokerEvents.onDealerChatSettingsChanged);
        //     } else {
        //         this.dealerChatToggle.onToggle();
        //     }
        // }.bind(this));

       
            var data = {};
            data.channelId = this.model.gameData.channelId;
            data.playerId = GameManager.user.playerId;
            data.key = 'dealerChat';
            data.value = this.dealerChatToggle.state;
            ServerCom.pomeloRequest(K.PomeloAPI.updateTableSettings, data, function (response) {
                if (response.success) {
                    this.model.gameData.settings.dealerChat = !this.model.gameData.settings.dealerChat;
                } else {
                    this.dealerChatToggle.onToggle();
                }
            }.bind(this), null, 5000, false);
    },

    onUpdateTableImage: function () {
       
            // console.log("!!!!!!!!!! 1GameManager.tableImages[i]", GameManager.tableImages);
            // console.log("!!!!!!!!!! 2GameManager.tableImages[i]", GameManager.user.defaultTheme);
            for (var i = 0; i < GameManager.tableImages.length; i++) {
                let stickerImages = GameManager.tableImages[i];
                if (GameManager.user.defaultTheme != "" && GameManager.user.defaultTheme._id) {
                    if (stickerImages.___data._id == GameManager.user.defaultTheme._id) {
                        // console.log("!!!!!!!!!! 3GameManager.tableImages[i]", GameManager.tableImages[i]);

                        // if ((GameManager.isShorter() && cc.sys.os == cc.sys.OS_IOS)) {
                            this.node.getChildByName('TableBg').getComponent(cc.Sprite).spriteFrame = GameManager.tableImagesTour[i];
                        // }
                        // else {
                            // this.node.getChildByName('TableBg').getComponent(cc.Sprite).spriteFrame = GameManager.tableImages[i];
                        // }

                        GameScreen.updateTabImage(false, GameManager.tabActImages[i], GameManager.tabDeactImages[i]);
                    };
                }
            }
    },

    onReport: function() {
        let inst = this;
        ServerCom.pomeloRequest("connector.entryHandler.getReportIssues", {}, function (response) {
            console.log("getReportIssues", response);

            inst.mobileGamePlayOptions();
            inst.reportBug.active = true;
            inst.reportBug.getComponent("ReportBug").onShow(response.data);

            inst.reportBug.opacity = 0;
            var anim = inst.reportBug.getComponent('AnimBase');
            if (anim !== null) {
                anim.play("showPopUp", function () {});
            }

        }, null, 5000, false);
    },

    updateRebuyChips: function(data) {
        console.log("updateRebuyChips", data);

        var playerIndex = this.model.getPlayerById(data.playerId);

        if (playerIndex !== -1) {
            const receiver = this.getPlayerByIdx(playerIndex);
            receiver.playerData.chips = data.data.chips;
            receiver.amountLabel.string = Number(data.data.chips.toFixed(2));
        }
    },

    onDebug: function() {
        console.log("onDebugxxx");
    },

    onChangeTheme: function () {
        this.tableTheme.active = true;
        GameManager.emit("enablePageView");
        this.popUpManager.hide(1, function () {});
        this.mobileGamePlayOptions();
        GameManager.emit("showJoinSimlar");
    },

    onDashboardAddCash: function(event, msg) {
        // GameManager.emit("onDashboardAddCash");

        GameManager.onDashboardAddCash();
    },

    onBuyInConfirmQuick: function (index, amount) {
        let self = this;
        ServerCom.pomeloRequest(
            'room.channelHandler.quickSeat', 
            {
                roomId: this.model.gameData.raw.tableDetails.roomId,
                isLoggedIn: true,
                access_token: K.Token.access_token,
                imageAvtar: '',
                chips: Number(amount),
                playerId: GameManager.user.playerId,
                playerName: GameManager.user.userName,
                isRequested: true,
                // channelVariation: "All",
                // minBuyIn: room.minBuyIn,
                // maxPlayers: room.maxPlayers

            }, 
            function (response, data) {
                if (!response) {
                    GameManager.popUpManager.show(PopUpType.NotificationPopup, data.err.info, function () {});
                    return;
                }
                console.log(response);
                // console.log(self.handler.contents);
                // var data = new JoinData(TableContent.prevSelection.channelData);
                var route = K.PomeloAPI.joinChannel;
                GameManager.join2(response.data.channelId, route, {
                    "channelId": response.data.channelId, 
                    "isRequested": true,  
                    "channelType": response.data.channelType,
                    "tableId": '',
                    "playerId": GameManager.user.playerId,
                    "playerName": GameManager.user.userName,
                    "networkIp": LoginData.ipV4Address,
                    'maxPlayers': 5,
                    'isPrivateTable': false
                });
            }, null, 5000, false
        );
    },

    quickSeat: function() {

        if(GameManager.isMobile) {
            GameManager.activeTableCount = GameScreen.gridParent.getComponent(cc.PageView).getPages().length;
        }
        else {
            GameManager.activeTableCount = GameScreen.gridParent.children.length;
        }

        if (GameManager.activeTableCount >= GameManager.maxTableCounts) {
            GameManager.popUpManager.show(PopUpType.MaxTablesJoinedPopup, null, function () { });
            return;
        }

        var data = {};
        data.minValue = this.model.roomConfig.minBuyIn;
        data.maxValue = this.model.roomConfig.maxBuyIn;
        const text_chips = LocalizedManager.t('TXT_AVAILABLE_CHIPS') + ':';
        if (GameManager.user.category == "DIAMOND") {
            data.totalChips = GameManager.user.realChips;
        } else {
            data.totalChips = GameManager.user.freeChips;
        }
        data.dialogHeadingText = text_chips;

        data.autoBuyIn = GameManager.user.autoBuyIn;
        // data.index = index;
        data.confirm = this.onBuyInConfirmQuick.bind(this);
        // data.onSitHere = true;
        data.channelId = this.model.gameData.raw.tableDetails.roomId;
        data.isRealMoney = true;
        data.autoConfirm = true;
        data.config = this.model.roomConfig;
        data.isAllInAndFold = this.model.roomConfig.isAllInAndFold;
        data.topHeading = LocalizedManager.t('TXT_BUY_IN');
        GameManager.popUpManager.show(PopUpType.BuyInPopup, data, function () { });

    },

    onDealerChatBtn: function() {
        this.dealerChatBtn.getChildByName("pressed").active = true;
        this.playreChatBtn.getChildByName("pressed").active = false;
        this.dealerNode.active = true;
        this.playerChatNode.active = false;
    },
    onChatBtn: function() {
        this.dealerChatBtn.getChildByName("pressed").active = false;
        this.playreChatBtn.getChildByName("pressed").active = true;
        this.dealerNode.active = false;
        this.playerChatNode.active = true;
    },
    onShowInviteFriendList: function () {
        this.inviteFirendsList.active = true;
        this.inviteFirendsList.getComponent('InvliteFriendsList').onShow(this);
    },

    playAudioClick: function() {
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
        this.playAudio(K.Sounds.click);
    },

    enableShowFoldBtn: function() {
        this.showFoldBtn.node.parent.parent.active = true;
        this.showFoldBtn.node.parent.getChildByName("tick").active = this.model.gameData.settings.isShowCard;
    },

    disableShowFoldBtn: function() {
        console.trace("disableShowFoldBtn");
        this.showFoldBtn.node.parent.parent.active = false;
        this.showFoldBtn.node.parent.getChildByName("tick").active = false;
    },

    onShowFoldCardsBtnClick: function () {
        this.playAudio(K.Sounds.click);
        var flag = this.showFoldBtn.node.parent.getChildByName("tick").active;

        var data = {};
        data.channelId = this.model.gameData.channelId;
        data.playerId = GameManager.user.playerId;
        data.key = 'isShowCard';
        data.value = !flag;
        ServerCom.pomeloRequest(K.PomeloAPI.updateTableSettings, data, function (response) {
            if (response.success) {
                this.showFoldBtn.node.parent.getChildByName("tick").active = data.value;
                this.model.gameData.settings.isShowCard = !this.model.gameData.settings.isShowCard;
            }
        }.bind(this), null, 5000, false);


        // TableHandler.joinWaitingList(!flag, this.model.gameData.channelId, function (response) {
        //     if (response.success) {
        //         // this.model.gameData.isJoinWaiting = !flag;
        //         // this.enableJoinBtn();
        //         GameManager.emit("waiting_List_Event", response.channelId, !flag);
        //     }
        // }.bind(this), function (error) { });
    },
});



