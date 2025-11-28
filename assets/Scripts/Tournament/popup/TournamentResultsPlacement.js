var K = require("GameConfig").K;

cc.Class({
    extends: cc.Component,

    properties: {
        settingAvatar: {
            default: null,
            type: cc.Node,
        },
        playerName: {
            default: null,
            type: cc.Label,
        },
        tournamentName: {
            default: null,
            type: cc.Label,
        },
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
        this.pokerPresenter.getComponent("PokerPresenter").model.kickPlayerOutOfTheGame(this.pokerPresenter.getComponent("PokerPresenter").model);
        // GameScreen.onShowLobby();
        // GameScreen.leaveCurrent();
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

        function ordinal_suffix_of(i) {
            var j = i % 10,
                k = i % 100;
            if (j == 1 && k != 11) {
                return i + "st";
            }
            if (j == 2 && k != 12) {
                return i + "nd";
            }
            if (j == 3 && k != 13) {
                return i + "rd";
            }
            return i + "th";
        }

        let raw = this.pokerPresenter.getComponent("PokerPresenter").model.gameData.raw.tourData.raw;

        cc.find('PositionResult/Rectangle 1661/place', this.node).getComponent(cc.Label).string = "Eliminated";
        cc.find('Nameplate/PlayerName', this.node).getComponent(cc.Label).string = GameManager.user.userName;
        cc.find('Avatar/Frame/Mask/avatarSprite', this.node).getComponent(cc.Sprite).spriteFrame = GameManager.user.urlImg ? GameManager.user.urlImg : GameManager.avatarImages[0];

        let timeRemaining = GameManager.getMTimeDuration3(raw.tournamentStartDetails.startTime);

        // tournament name
        cc.find('Info/Info/title', this.node).getComponent(cc.Label).string = raw.tournamentName;
        cc.find('Info/Info/date', this.node).getComponent(cc.Label).string = raw.tournamentStartDetails.displayStartTime;
        cc.find('Info/Info/playTimeValue', this.node).getComponent(cc.Label).string = timeRemaining + "";
        cc.find('Info/Info/place', this.node).getComponent(cc.Label).string = data.playerRank + "/" + (data.totalPlayers || 0);

        // cc.find('PositionResult/Rectangle 1661/place', this.node).getComponent(cc.Label).string = ordinal_suffix_of(data.playerRank);
        cc.find('Info/Info/placement', this.node).getComponent(cc.Label).string = ordinal_suffix_of(data.playerRank);

        this.settingAvatar.getComponent(cc.Sprite).spriteFrame = GameManager.user.urlImg;
        this.playerName.string = GameManager.user.userName;
        this.tournamentName.string = raw.tournamentName;
    }

});
