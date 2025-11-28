var pokerPresenterType = require("PokerPresenter");
var popUpManagerType = require("PopUpManager").PopUpManager;
var PopUpBase = require('PopUpBase');
var SitNGoModelHandler = require('SitNGoModelHandler').SitNGoModelHandler;
var PopUpType = require('PopUpManager').PopUpType;
var OFCGameData = require('OFCResponseTypes').GameData;
var JoinData = require('PostTypes').JoinChannel;
var GameData = require('ResponseTypes').GameData;
/**
 * @description Enumeration type to show videoPlayer State. 
 * @enum {number}  
 * @memberof Popups.VideoPopup#
 */
var VideoState = new cc.Enum({
    PAUSED: 1,
    RUNNING: 2,
    STOPPED: 3,
    NONE: 4,
    RESTART: 5,
});

/**
 * @classdesc This class is used to simulate video on videoPlayer popup
 * @class VideoPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,
    properties: {
        sitNGoModelHandler: {
            default: null,
            type: SitNGoModelHandler,
        },
        texasHoldemPrefab: {
            default: null,
            type: cc.Prefab,
        },
        ofcPrefab: {
            default: null,
            type: cc.Prefab,
        },
        contentHolder: {
            default: null,
            type: cc.Node,
        },
        videoDuration: 0,
        videoEvents: [],
        videoID: '0',
        speed: 1,
        state: {
            default: VideoState.NONE,
            type: VideoState,
        },
        currentTime: 0,
        currentEventIdx: 0,
        pokerModel: null,
        resetEvent: null,
        progressBar: {
            type: cc.ProgressBar,
            default: null,
        },
        presenter: null,
        oneXBtn: {
            default: null,
            type: cc.Node
        },
        twoXBtn: {
            default: null,
            type: cc.Node
        },
        threeXBtn: {
            default: null,
            type: cc.Node
        },
        playBtn: {
            default: null,
            type: cc.Node
        },
        pauseBtn: {
            default: null,
            type: cc.Node
        },
        nextVideoBtn: {
            default: null,
            type: cc.Button
        },
        prevVideoBtn: {
            default: null,
            type: cc.Button
        },
        activeSprite: {
            default: null,
            type: cc.SpriteFrame
        },
        deactiveSprite: {
            default: null,
            type: cc.SpriteFrame
        },
        activeFontColor: cc.Color,
        deactiveFontColor: cc.Color,
        knob: {
            default: null,
            type: cc.Node,
        },
        refModel: null,
        onShowData: null,


    },

    /**
     * @description Allback from screen manager - on enabled
     * @method onShow 
     * @param {Object} response
     * @memberof Popups.VideoPopup# 
     */
    onShow: function (response) {

        GameManager.removeAllChildren(this.contentHolder);
        this.removeAllListeners();
        this.refModel = response.refModel;
        this.onShowData = response;
        // {"playerId":"7ec80ae1-9abf-4dc8-9f08-babfb70f5e07","videoId":"5899a9647cf9fe5b40a80cc2","isRequested":true}
        this.pauseBtn.active = false;
        this.playBtn.active = true;
        var profileData = {
            playerId: GameManager.user.playerId,
            playerName: GameManager.user.userName,
            // videoId: '5899bbbc6aaa525f2f04718f',
            // videoId: '589acad9280d25f92183aac6',response
            videoId: response.currentId,
            isRequested: true,
        };
        ServerCom.pomeloRequest(K.PomeloAPI.getVideo, profileData, function (data) {
            if (data.success) {
                // response = data;
                this.onVideoLoaded(data);
            }
        }.bind(this));

        this.nextVideoBtn.interactable = (this.refModel.handTabs.length - 1 > this.onShowData.id);
        this.prevVideoBtn.interactable = (0 < this.onShowData.id);


    },

    /**
     * @description On this method the prefabs model are instantiated.
     * @method onVideoLoaded
     * @param {Object} data -
     * @memberof Popups.VideoPopup#
     */

    onVideoLoaded: function (data) {
        var response = data;
        // console.log(data);
        this.speed = 1;
        this.state = VideoState.NONE;
        this.handHistoryId = response.handHistoryId;
        this.videoDuration = response.duration;
        this.videoEvents = response.broadcasts;
        this.videoID = response.roundId;
        this.resetEvent = response.gamePlayers;
        var data = response.joinResponse;
        if (data.roomConfig.channelVariation === "Open Face Chinese Poker") {
            data.gameData = new OFCGameData(data);
        } else {
            data.gameData = new GameData(data);
        }
        data.gameData.channelType = data.roomConfig.channelType;
        // response.roomConfig.isRealMoney = GameManager.isRealMoney == true;
        if (data.roomConfig.channelType == K.ChannelType.Tournament) {
            data.type = 1;
            data.roomConfig.isRebuyOpened = false;
        }

        var instance = null;
        if (data.roomConfig.channelVariation == "Open Face Chinese Poker") {
            instance = cc.instantiate(this.ofcPrefab);
            this.pokerModel = instance.getComponent('OFCModel');
            this.presenter = instance.children[0].getComponent('OFCPresenter');
        } else {
            instance = cc.instantiate(this.texasHoldemPrefab);
            this.pokerModel = instance.getComponent('PokerModel');
            this.presenter = instance.children[0].getComponent('PokerPresenter');
            // this.presenter.node.getChildByName('TableBg').getChildByName('DealerSprite').setScale(1.5, 1.5);
        }
        instance.scaleX = 0.7;
        instance.scaleY = 0.7;
        if (data.roomConfig.channelVariation === "Omaha" || data.roomConfig.channelVariation === "Omaha Hi-Lo") {
            this.pokerModel.dummyCardsCount = 4;
        } else {
            this.pokerModel.dummyCardsCount = 2;
        }

        this.pokerModel.isVideo = true;

        if (!!data.type) {
            if (data.type == 1) {
                this.sitNGoModelHandler = new SitNGoModelHandler();
                this.sitNGoModelHandler.setSitNGoModel(this.pokerModel);
                this.sitNGoModelHandler.setSitNGoPresenter(this.presenter);
                this.pokerModel.playerNewChannel = function (data) {
                    //   console.log("Nothing");
                };
                this.pokerModel.onInitializePoker = this.sitNgoInitializePoker.bind(this);
            }
        }
        this.contentHolder.addChild(instance);

        this.pokerModel.registerBroadcasts = this.registerBroadcasts.bind(this);
        this.pokerModel.onDestroy = function () {
            //   console.log("Nothing");
        };
        this.pokerModel.startTimerTick = function (data) {
            //    console.log("Nothing");
        };

        this.myVideoData = data;
        this.changeState(VideoState.STOPPED);
    },
    /**
     * @description Initialize Sit and Go Poker
     * @method sigNgoInitializerPoker
     * @memberof Popups.VideoPopup#
     */

    sitNgoInitializePoker: function () {
        this.on(K.BroadcastRoute.playerNewChannel, this.pokerModel.playerNewChannel.bind(this.pokerModel));
        this.on(K.BroadcastRoute.playerElimination, this.pokerModel.playerElimination.bind(this.pokerModel));
        this.on(K.BroadcastRoute.breakTime, this.pokerModel.onBreakTime.bind(this.pokerModel));
        this.on(K.BroadcastRoute.breakTimerStart, this.pokerModel.onBreakTimeStart.bind(this.pokerModel));
        this.on(K.BroadcastRoute.rebuyStatus, this.pokerModel.onRebuyStatus.bind(this.pokerModel));
    },


    /**
     * @description Registers listeners for all broadcasts
     * @method registerBroadCast
     * @param {Object} route
     * @param {object} method
     * @memberof Popups.VideoPopup#
     */
    registerBroadcasts: function () {
        this.on(this.pokerModel.K.BroadcastRoute.sit, this.pokerModel.onSit.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.blindDeduction, this.pokerModel.onBlindDeducted.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.bankrupt, this.pokerModel.onBankrupt.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.gamePlayers, this.pokerModel.onGamePlayers.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.dealerrChat, this.pokerModel.onDealerChat.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.startGame, this.pokerModel.onGameStart.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.turn, this.pokerModel.onMoveMade.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.roundOver, this.pokerModel.onRoundOver.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.gameOver, this.pokerModel.onGameOver.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.leave, this.pokerModel.onLeft.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.chat, this.pokerModel.onChat.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.playerCards, this.pokerModel.onPlayerCards.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.playerState, this.pokerModel.onPlayerStateChange.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.connectionAck, this.pokerModel.onConnectionAck.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.preCheck, this.pokerModel.onPreCheck.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.playerCoins, this.pokerModel.onPlayerCoins.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.avatarChange, this.pokerModel.onAvatarChange.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.handTab, this.pokerModel.onHandTab.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.bestHands, this.pokerModel.onBestHands.bind(this.pokerModel));
        this.on(this.pokerModel.K.BroadcastRoute.onTimeBank, this.pokerModel.onTimeBank.bind(this.pokerModel));
    },

    /**
     * @description keeps checking the currenet State of video player 
     * state - stopped, running, paused
     * @function update
     * @memberof Popups.VideoPopup#
     */

    update: function (dt) {
        switch (this.state) {
            case VideoState.STOPPED:
                this.updateStopped(dt);
                break;
            case VideoState.RUNNING:
                this.updateRunning(dt);
                break;
            case VideoState.PAUSED:
                this.updatePaused(dt);
        }
    },
    /**
     * @description keeps checking for 
     * @method updateRunning
     * @memberof Popups.VideoPopup#
     */

    updateRunning: function (dt) {
        this.currentTime += dt * this.speed;
        this.progressBar.progress = this.currentTime / (this.videoDuration);
        var knobPos = (this.progressBar.progress * this.progressBar.totalLength) - (this.progressBar.totalLength / 2);
        if (knobPos > -(this.progressBar.totalLength / 2) && knobPos < (this.progressBar.totalLength / 2))
            this.knob.x = (knobPos);

        if (this.currentEventIdx < this.videoEvents.length && this.currentTime >= ((this.videoEvents[this.currentEventIdx].timestamp))) {
            // console.log('fired ', this.currentEventIdx, this.videoEvents[this.currentEventIdx].data.route);
            this.emit(this.videoEvents[this.currentEventIdx].data.route, this.videoEvents[this.currentEventIdx].data);
            this.currentEventIdx++;
            this.resetView();
        }
        // else if (this.currentEventIdx >= this.videoEvents.length) {
        //     this.onStop();
        // }


    },

    updateStopped: function (dt) {

    },

    updatePaused: function (dt) {

    },
    /**
     * @description Change the state of video player.
     * play/pause/stop/restart
     * @method changeState
     * @param {Object} newState 
     * @memberof Popups.VideoPopup#
     */

    changeState: function (newState) {
        if (this.state != newState) {
            this.state = newState;
            switch (this.state) {
                case VideoState.STOPPED:
                    this.pokerModel.initiliazePoker(this.myVideoData);
                    this.presenter.setTiledView(false);
                    this.currentTime = 0;
                    this.currentEventIdx = 0;
                    this.progressBar.progress = 0;
                    this.knob.x=(-this.progressBar.totalLength / 2);
                    this.emit(this.resetEvent.data.route, this.resetEvent.data);
                    this.resetView();
                    break;
                case VideoState.RUNNING:
                    this.onOneXSpeed();
                    break;
                case VideoState.PAUSED:
                    break;
                case VideoState.RESTART:
                    this.onClose();
                    this.pokerModel.emit("clearTimers", null);
                    GameManager.popUpManager.show(PopUpType.VideoPlayerPopup, this.onShowData, function () { });
                    break;
            }
        }
    },
    /**
     * @description reset View
     * @method resetView
     * @memberof Popups.VideoPopup#
     */
    resetView: function () {
        this.presenter.unTiledView.getChildByName('SettingsButton').active = false;
        this.presenter.unTiledView.getChildByName('Tile_Untile').active = false;

        this.presenter.unTiledView.getChildByName('AddChipsButton').active = false;
        // this.presenter.straddleCheckBox.node.parent.active = false;
        //  this.presenter.rebuyBtn.active = false;
        // this.presenter.sitOutNextBBCheckBox.node.parent.active = false;
        this.presenter.sitOutNextHandCheckBox.node.parent.active = false;
        this.presenter.postBigBlindCheckBox.node.parent.active = false;
        this.presenter.resumeBtn.active = false;
        this.presenter.runItTwiceCB.node.parent.active = false;
        // this.presenter.mobChatPanel.active = false;
        // this.presenter.mobPanelBtn.active = false;
        this.presenter.chatPanel.active = false;
        this.presenter.unTiledView.getChildByName('ReplayButton').active = false;
    },


    //Video Player Methods Starts

    onPlay: function () {
        // console.log("play clicked")
        this.changeState(VideoState.RUNNING);
        this.pauseBtn.active = true;
        this.playBtn.active = false;
        GameManager.playSound(K.Sounds.click);

    },

    onStop: function () {
        // console.log("stop clicked")

        this.pauseBtn.active = false;
        this.playBtn.active = true;
        this.changeState(VideoState.RESTART);
        GameManager.playSound(K.Sounds.click);

    },

    onPause: function () {
        // console.log("pausea clicked")

        this.changeState(VideoState.PAUSED);
        this.pauseBtn.active = false;
        this.playBtn.active = true;
        GameManager.playSound(K.Sounds.click);

    },


    increaseSpeed: function () {
        if (this.speed < 3) this.speed++;
    },

    onOneXSpeed: function () {
        this.resetSpeedView();
        this.speed = 1;
        this.pokerModel.videoSpeed = 1;
        this.oneXBtn.getComponent(cc.Sprite).spriteFrame = this.activeSprite;
        this.oneXBtn.children[0].color = this.activeFontColor;
        if (this.oneXBtn.children.length > 1)
            this.oneXBtn.children[1].color = this.activeFontColor;
        GameManager.playSound(K.Sounds.click);

    },
    onTwoXSpeed: function () {
        this.resetSpeedView();
        this.speed = 2;
        this.pokerModel.videoSpeed = 2;
        this.twoXBtn.getComponent(cc.Sprite).spriteFrame = this.activeSprite;
        this.twoXBtn.children[0].color = this.activeFontColor;
        if (this.twoXBtn.children.length > 1)
            this.twoXBtn.children[1].color = this.activeFontColor;
        GameManager.playSound(K.Sounds.click);

    },
    onThreeXSpeed: function () {
        // console.log("CLICKED")
        this.resetSpeedView();
        this.speed = 3;
        this.pokerModel.videoSpeed = 3;
        this.threeXBtn.getComponent(cc.Sprite).spriteFrame = this.activeSprite;
        this.threeXBtn.children[0].color = this.activeFontColor;
        if (this.threeXBtn.children.length > 1)
            this.threeXBtn.children[1].color = this.activeFontColor;
        GameManager.playSound(K.Sounds.click);

    },

    /**
     * @description reset view according to video play speed
     * @method {resetSpeedView}
     * @memberof Popups.VideoPopup#
     */
    resetSpeedView: function () {
        this.oneXBtn.getComponent(cc.Sprite).spriteFrame = this.deactiveSprite;
        this.twoXBtn.getComponent(cc.Sprite).spriteFrame = this.deactiveSprite;
        this.threeXBtn.getComponent(cc.Sprite).spriteFrame = this.deactiveSprite;
        this.oneXBtn.children[0].color = this.deactiveFontColor;
        if (this.oneXBtn.children.length > 1)
            this.oneXBtn.children[1].color = this.deactiveFontColor;
        this.twoXBtn.children[0].color = this.deactiveFontColor;
        if (this.twoXBtn.children.length > 1)
            this.twoXBtn.children[1].color = this.deactiveFontColor;
        this.threeXBtn.children[0].color = this.deactiveFontColor;
        if (this.threeXBtn.children.length > 1)
            this.threeXBtn.children[1].color = this.deactiveFontColor;

    },


    decreaseSpeed: function () {
        if (this.speed > 1) this.speed--;
    },

    /**
     * @description Play next video Methods Ends 
     * @method onNextVideo   
     * @memberof Popups.VideoPopup#
     */
    onNextVideo: function () {
        if (this.onShowData.id < this.refModel.handTabs.length - 1) {
            var data = {};
            //   console.log(this.refModel.handTabs[this.onShowData.id + 1]);
            data.currentId = this.refModel.handTabs[this.onShowData.id + 1].videoId;
            data.refModel = this.refModel;
            data.id = this.onShowData.id + 1;
            this.onClose();
            GameManager.popUpManager.show(PopUpType.VideoPlayerPopup, data, function () { });
        }
        GameManager.playSound(K.Sounds.click);

    },
    /**
     * @description play previous video
     * @method onPrevVideo
     * @memberof Popups.VideoPopup#
     */
    onPrevVideo: function () {
        if (this.onShowData.id > 0) {
            var data = {};
            //   console.log(this.refModel.handTabs[this.onShowData.id + 1]);
            data.currentId = this.refModel.handTabs[this.onShowData.id - 1].videoId;
            data.refModel = this.refModel;
            data.id = this.onShowData.id - 1;
            this.onClose();
            GameManager.popUpManager.show(PopUpType.VideoPlayerPopup, data, function () { });
        }

    },
    nextFrame: function () {
        this.currentTime = this.videoEvents[this.currentEventIdx].timestamp;
    },

    onHide: function () {

    },
    /**
     * @description showTabHistory
     * @method showTabHistory
     * @memberof Popups.VideoPopup#
     */

    showTabHistory: function () {
        this.pokerModel.getHandHistory(this.handHistoryId);
    },

    /**
     * @description close video popUp
     * @method onClose
     * @memberof Popups.VideoPopup#
     */
    onClose: function () {
        GameManager.playSound(K.Sounds.click);

        GameManager.popUpManager.hide(PopUpType.VideoPlayerPopup, function () { });

        

    },

});