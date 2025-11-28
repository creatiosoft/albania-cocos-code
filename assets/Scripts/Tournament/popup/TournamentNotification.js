var K = require("GameConfig").K;
var PopUpType = require('../../Utilities/ScreensAndPopUps/PopUps/PopUpManager').PopUpType;
var GameData = require("../../DataFormats/ResponseTypes").GameData;

cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel: {
            default: null,
            type: cc.Label
        },
        isTableExisting: false,
        isTournamentExisting: false,
        tournamentIndexFound: -1,
        indexFound: -1,
        data: null,
        tourData: null,
        index: -1,
    },

    onLoad: function () {

    },

    
    onDisable: function () {

    },

    onEnable: function () {
    },

    onClose: function() {
        this.node.active = false;
    },

    setData:function (data, tourData, index) {
        console.log(data);
        // 
        this.data = data.eventData;
        this.tourData = tourData;
        this.index = index;
        this.nameLabel.string = tourData.tournamentName;
    },

    onGoToTable: function() {
        this.onEnterTableButton(this.data.tournamentId);
    },

    onClose: function() {
        this.hide();
    },

    show: function() {
        this.node.active = true;
    },

    hide: function() {
        this.node.active = false;
    },

    onEnterTableButton: function() {
        cc.systemEvent.emit( "HideTournamentNotification" );  

        console.log('onEnterTableButton');
        this.hide();
        this.isTableExisting = false;
        this.isTournamentExisting = false;
        this.indexFound = -1;
        this.tournamentIndexFound = -1;
        for (var index = 0; index < GameManager.gameModel.activePokerModels.length; index++) {
            if (!GameManager.gameModel.activePokerModels[index].tourData) {
                continue;
            }
            var id = GameManager.gameModel.activePokerModels[index].tourData.id;
            if (this.data.tournamentId === id) {
                this.isTournamentExisting = true;
                this.tournamentIndexFound = index;
                break;
            }
        }
        for (var index = 0; index < GameManager.gameModel.activePokerModels.length; index++) {
            var id = GameManager.gameModel.activePokerModels[index].roomConfig._id;
            if (this.data.tableId === id) {
                this.indexFound = index;
                this.isTableExisting = true;
                break;
            }
        }
        if (this.isTableExisting) {
            // enter
            ServerCom.loading.active = false;
            ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, this.indexFound, function () { });
            this.data = null;
            this.tourData = null;
            return;
        }

        socketIO.socket.off(this.data.tableId + ":" + GameManager.user.playerId);
        ServerCom.socketIOBroadcast(this.data.tableId + ":" + GameManager.user.playerId, this.onTournamentTableUserBroadcast.bind(this));
        // 
        window.TournamentLobbyHandler.requestTournamentEnterTable(
            {
                tournamentId: this.data.tournamentId
            },
            (data) => {
            }, 
            (error) => {
            },
            "Enter table, please wait ......"
        );

        this.data = null;
    },

    onTournamentTableUserBroadcast: function(data) {
        console.log("GameManager.isActive", GameManager.isActive);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>onTournamentTableUserBroadcast", data);
        if (data.eventName == "enterChannelResponse") {

            if (data.data.success) {

                GameManager.popUpManager.hideAllPopUps();
                // socketIO.off(this.newTableData.eventData.tableId + ":" + this.newTableData.eventData.playerId);
                // socketIO.off(this.tourData.raw.playerData.tableId + ":" + this.tourData.raw.playerData.playerId);
                socketIO.socket.off(data.channelId + ":" + data.playerId);
                socketIO.socket.off(data.eventTo);

                if (!GameManager.isActive) {
                    ServerCom.forceKeepLoading = false;
                    ServerCom.loading.active = false;
                    return;
                }

                data.data.gameData = new GameData(data.data);
                data.data.tourData = this.tourData;
                if (this.isTournamentExisting) {
                    // GameManager.gameModel.activePokerModels[this.tournamentIndexFound];
                    GameManager.gameModel.activePokerModels[this.tournamentIndexFound].initiliazePoker(data.data);
                }
                else {
                    ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, data.data, function () { });
                }
                // 
                this.scheduleOnce(function () {
                    ServerCom.forceKeepLoading = false;
                    ServerCom.loading.active = false;
                }, 1.2);
            }
            else {
                ServerCom.forceKeepLoading = false;
                ServerCom.loading.active = false;
                // 
                GameManager.popUpManager.show(
                    PopUpType.CommonDialog, 
                    {
                        "title": "Error!",
                        "content" : data.data.info
                    }, 
                    function () {}
                );
            }
        }
    }

});
