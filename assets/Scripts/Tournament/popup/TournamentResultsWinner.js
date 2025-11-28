var K = require("GameConfig").K;

cc.Class({
    extends: cc.Component,

    properties: {
        pokerPresenter: {
            default: null,
            type: cc.Node
        },
    },

    /**
     * @method onLoad
     * @description Lifecycle callback, Used to Register some broadcast as tableUpdate, Perform some alignmetn of widget!
     * @memberof Screens.Lobby.Table.Table#
     */
    onLoad: function () {

    },

    
    onDisable: function () {

    },

    onEnable: function () {
    },

    onClose: function() {
        this.node.active = false;
        // GameScreen.leaveCurrent();
        // this.pokerPresenter.getComponent("PokerPresenter").model.leave(true);
        this.pokerPresenter.getComponent("PokerPresenter").model.kickPlayerOutOfTheGame(this.pokerPresenter.getComponent("PokerPresenter").model);
        // GameScreen.onShowLobby();
        // window.GameScreen.onShowLobby();
        this.pokerPresenter.getComponent("PokerPresenter").leaveTable();
    },

    setData:function (data) {
        // {
        //     "eventTo": "eccce5bd-e3f1-4f38-84ea-5ccd0026fdc4:10ce9dda-3044-41d7-86a9-439b96accfb0",
        //     "eventName": "tournamentWinner",
        //     "playerId": "10ce9dda-3044-41d7-86a9-439b96accfb0",
        //     "channelId": "eccce5bd-e3f1-4f38-84ea-5ccd0026fdc4",
        //     "data": {
        //         "success": false,
        //         "message": "You are the winner!!"
        //     }
        // }
        let raw = this.pokerPresenter.getComponent("PokerPresenter").model.gameData.raw.tourData.raw;

        cc.find('Nameplate/PlayerName', this.node).getComponent(cc.Label).string = GameManager.user.userName;
        cc.find('Avatar/Frame/Mask/avatarSprite', this.node).getComponent(cc.Sprite).spriteFrame = GameManager.user.urlImg ? GameManager.user.urlImg : GameManager.avatarImages[0];

        let timeRemaining = GameManager.getMTimeDuration3(raw.tournamentStartDetails.startTime);

        // tournament name
        
        cc.find('Info/Info/title', this.node).getComponent(cc.Label).string = raw.tournamentName;
        cc.find('Info/Info/date', this.node).getComponent(cc.Label).string = raw.tournamentStartDetails.displayStartTime;
        cc.find('Info/Info/playTimeValue', this.node).getComponent(cc.Label).string = timeRemaining + "";
        cc.find('Info/Info/place', this.node).getComponent(cc.Label).string = "1/" + (data.totalPlayers || 0);
        // cc.find('Info/Info/placement', this.node).getComponent(cc.Label).string = "1st";

        // placement
        // play time
        // total player
    }

});
