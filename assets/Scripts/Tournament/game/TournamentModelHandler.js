var PopUpType = require('PopUpManager').PopUpType;
var sitOutData = require('../../DataFormats/PostTypes').SitOutData;

var SitOutMode = cc.Enum({
    SitOutNextHand: 1,
    SitOueNextBB: 2,
    None: -1,
});

function TournamentModelHandler() {

}

TournamentModelHandler.prototype.setModel = function (pokerModel) {

    pokerModel.resetGameForReshuffle = function () {
        pokerModel.gameModel.removeBroadcastCallbacks(pokerModel.gameData.channelId);
        // 
        socketIO.socket.off(pokerModel.gameData.channelId);
        socketIO.socket.off(pokerModel.gameData.channelId + ":" + pokerModel.gameData.playerId);
        socketIO.socket.off(K.SocketIOBroadcast.Lobby.TournamentUpdated);
        cc.systemEvent.off(K.SocketIOEvent.Lobby.TournamentRefresh);
    };

    pokerModel.onDestroy = function () {
        pokerModel.kickPlayerOutOfTheGame(pokerModel);
        cc.director.getActionManager().removeAllActions();
        pokerModel.gameModel.removeBroadcastCallbacks(pokerModel.gameData.channelId);
        // 
        socketIO.socket.off(pokerModel.gameData.channelId);
        socketIO.socket.off(pokerModel.gameData.channelId + ":" + pokerModel.gameData.playerId);
        socketIO.socket.off(K.SocketIOBroadcast.Lobby.TournamentUpdated);
        cc.systemEvent.off(K.SocketIOEvent.Lobby.TournamentRefresh);
        // socketIO.off(K.SocketIOBroadcast.Lobby.TournamentRefresh);
    };

    pokerModel.sitOutNextHand = function (callback) { 
        ServerCom.socketIORequest(
            K.SocketIOAPI.Game.TournamentSitOut, 
            {
                channelId: pokerModel.gameData.channelId,
                playerId: pokerModel.gameData.playerId,
                isRequested: true,
            },
            (response) => {
                if (response.success) {
                    pokerModel.sitOutValue = SitOutMode.SitOutNextHand;
                }
                if (callback !== null && callback !== undefined) {
                    callback(response);
                }
            },
            null,
            5000,
            false
        );
    };

    pokerModel.resetSitout = function (callback) { 
        ServerCom.socketIORequest(
            K.SocketIOAPI.Game.TournamentResetSitout, 
            {
                channelId: pokerModel.gameData.channelId,
                playerId: pokerModel.gameData.playerId,
                isRequested: true,
            },
            (response) => {
                if (response.success) {
                    pokerModel.sitOutValue = SitOutMode.None;
                }
                if (callback !== null && callback !== undefined) {
                    callback(response);
                }
            },
            null,
            5000,
            false
        );
    };

    pokerModel.makeMove = function (amount, action) { 
        ServerCom.socketIORequest(
            K.SocketIOAPI.Game.TournamentMakeMove, 
            {
                channelId: pokerModel.gameData.channelId,
                // playerId: pokerModel.gameData.playerId,
                // isRequested: true,
                amount: amount,
                // channelType: "",
                // tableId: pokerModel.gameData.channelId,
                action: action
            },
            null,
            null,
            5000,
            false
        );
    };

    pokerModel.fireMuckHandEvent = function () {
        // var input = {};
        // input.channelId = this.gameData.channelId;
        // input.data = {
        //     seatIdx: this.getMyPlayer().seatIndex
        // };
        // input.route = this.K.BroadcastRoute.onFireEvent;
        // ServerCom.pomeloRequest(this.K.PomeloAPI.fireChannelEvent, input, function (response) {
        //     if (response.success) {

        //     }
        // }.bind(this), null, 5000, false, true);

        ServerCom.socketIORequest(
            K.SocketIOAPI.Game.TournamentFire, 
            {
                channelId: pokerModel.gameData.channelId,
                seatIndex: pokerModel.getMyPlayer().seatIndex,
                channelType: "TOURNAMENT",
                route: "fireEvent",
                playerId: pokerModel.gameData.playerId,
                isRequested: true
            },
            null,
            null,
            5000,
            false
        );
    },

    pokerModel.resume = function (callback) {
        ServerCom.socketIORequest(
            K.SocketIOAPI.Game.TournamentResume, 
            {
                channelId: pokerModel.gameData.channelId,
                playerId: pokerModel.gameData.playerId,
                isRequested: true
            },  
            (response) => {
                if (response.success) {
                    pokerModel.sitOutValue = 3;
                    var playerData = pokerModel.gameData.tableDetails.players[pokerModel.getPlayerById(pokerModel.gameData.playerId)];
                    // playerData.state = response.state;
                    // if (playerData.isTournamentSitout) {
                    playerData.isTournamentSitout = false;
                    playerData.state = K.PlayerState.Playing;
                    // }
                    // process response
                    if (callback !== null && callback !== undefined) {
                        callback();
                    }
                }
            },
            null,
            5000,
            false
        );
    };

    // pokerModel.onTournamentUpdated = function(data) {
    //     console.log("%c[pokerModel.onTournamentUpdated] %s %o", 'color: blue;', data);
    //     pokerModel.onTournamentUpdated(data.data);
    // };

    pokerModel.onTournamentRefresh = function(data) {
        console.log("%c[pokerModel.onTournamentRefresh] %s %o", 'color: blue;', data);
        if (!pokerModel.gameData) {
            return;
        }
        if (data._id == pokerModel.gameData.raw.tournamentId && data.state == "CLOSED") {
            // pokerModel.onTournamentRefresh(data.data);
            pokerModel.emit(K.SocketIOEvent.Game.TournamentClosed, data);
        }

        if (data.lastTableId && 
            data.lastTableId != "" &&
            pokerModel.gameData.channelId == data.lastTableId) {
            pokerModel.gameData.raw.tourData.raw.lastTableId = data.lastTableId;
            pokerModel.presenter.changeTableFinal();
        }

        if (data._id == pokerModel.gameData.raw.tournamentId) {
            pokerModel.gameData.raw.tourData.raw.currentBlindLevel = data.currentBlindLevel;
        }
    };

    pokerModel.onTournamentTableBroadcast = function(data) {
        console.log("%c[pokerModel.onTournamentTableBroadcast] %s %o", 'color: blue;', data.eventName, data);
        if (data.eventName == K.BroadcastRoute.dealerrChat) {
            pokerModel.onDealerChat(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.blindDeduction) {
            pokerModel.onBlindDeducted(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.gamePlayers) {
            pokerModel.onGamePlayers(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.startGame) {
            pokerModel.onGameStart(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.turn) {
            pokerModel.onMoveMade(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.roundOver) {
            pokerModel.onRoundOver(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.gameOver) {
            pokerModel.onGameOver(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.playerState) {
            pokerModel.onPlayerStateChange(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.breakTime) {
            pokerModel.onBreakTime(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.sit) {
            pokerModel.onSit(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.onTimeBank) {
            pokerModel.onTimeBank(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.handTab) {
            pokerModel.onHandTab(data.data);
        }
        else if (data.eventName == "emoji") {
            pokerModel.onSendSticker(data.data);
        }
        else if (data.eventName == "message") {
            pokerModel.onChat(data.data);
        }
        else if (data.eventName == "startDisconnectTime") {
            pokerModel.onDisconnectTime(data.data);
        }
        else if (data.eventName == "tableDestroyed") {
            pokerModel.onTableDestroyed(data.data);
        }
        else if (data.eventName == "fireEvent") {
            pokerModel.onFireEvent(data.data);
        }
        else if (data.eventName == "addonBreakTime") {
            pokerModel.onAddonBreakTime(data.data);
        }
        else if (data.eventName == "addonBreakTimeOver") {
            pokerModel.onAddonBreakTimeOver(data.data);
        }
        else if (data.eventName == "leave") {
            var player = null;
            var index = this.getPlayerById(data.data.playerId);
            if (index !== -1) {
                player = this.gameData.tableDetails.players.splice(index, 1);
                pokerModel.emit(K.PokerEvents.OnLeave, player);
            }
        }
    };


    // {
    //     "eventTo": "b1aa1d94-9f23-48bc-a7d9-7b9a746b1b5c:69220e63-e9bd-49d1-8b32-a3a8d98324fe",
    //     "eventName": "rebuyActivated",
    //     "playerId": "69220e63-e9bd-49d1-8b32-a3a8d98324fe",
    //     "channelId": "b1aa1d94-9f23-48bc-a7d9-7b9a746b1b5c",
    //     "data": {
    //         "tableId": "b1aa1d94-9f23-48bc-a7d9-7b9a746b1b5c",
    //         "playerId": "69220e63-e9bd-49d1-8b32-a3a8d98324fe",
    //         "tournamentId": "6646bbb6320775728a661255",
    //         "expiry": "2024-05-17T02:11:36.885Z"
    //     }
    // }
    pokerModel.onTournamentTableUserBroadcast = function(data) {
        console.log("%c[pokerModel.onTournamentTableUserBroadcast] %s %o", 'color: blue;', data.eventName, data);
        if (data.eventName == K.BroadcastRoute.connectionAck) {
            pokerModel.onConnectionAck(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.playerCards) {
            pokerModel.onPlayerCards(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.preCheck) {
            pokerModel.onPreCheck(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.eliminated) {
            pokerModel.onEliminated(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.tournamentWinner) {
            pokerModel.onTournamentWinner(data.data);
        }
        else if (data.eventName == K.BroadcastRoute.bestHands) {
            pokerModel.onBestHands(data.data);
        }
        else if (data.eventName == 'rebuyActivated') {
            pokerModel.onRebuyActivated(data.data);
        }
        else if (data.eventName == 'rebuyDeactivated') {
            pokerModel.onRebuyDeactivated(data.data);
        }
        else if (data.eventName == 'Res-Rebuy') {
            pokerModel.onResRebuy(data);
        }
        else if (data.eventName == 'Res-AddOn') {
            pokerModel.onResAddon(data.data);
        }
        else if (data.eventName == 'inactiveKicked') {
            pokerModel.onInactiveKicked(data.data);
        }
        else if (data.eventName == 'tournamentCancelled') {
            pokerModel.onTournamentCancelled(data.data);
        }
        
    };

    pokerModel.onEliminatedBroadcast = function(data) {
        pokerModel.onEliminated(data.data);
    };

    pokerModel.onInitializePoker = function () {

        // console.log("%conInitializePoker %o", 'color: green;', pokerModel.gameData);
        ServerCom.socketIOBroadcast(pokerModel.gameData.channelId, this.onTournamentTableBroadcast.bind(this));
        ServerCom.socketIOBroadcast(pokerModel.gameData.channelId + ":" + pokerModel.gameData.playerId, this.onTournamentTableUserBroadcast.bind(this));
        // ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentRefresh, this.onTournamentRefresh.bind(this));
        cc.systemEvent.on(K.SocketIOEvent.Lobby.TournamentRefresh, this.onTournamentRefresh.bind(this), this.node);
        ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentUpdated, this.onTournamentUpdated.bind(this));
        ServerCom.socketIOBroadcast("Tournament:Break", this.onTournamentsBreakStarts.bind(this));
        // ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentClosed, this.onTournamentClosed.bind(this));
        // var newTableEvent = K.SocketIOBroadcast.Lobby.TournamentElimination.replace("<TournamentId>", pokerModel.gameData.channelId).replace("<PlayerId>", pokerModel.gameData.playerId);
        // ServerCom.socketIOBroadcast(newTableEvent, this.onEliminatedBroadcast.bind(this));
    };

    pokerModel.onTournamentsBreakStarts = function(data) {
        if (data.eventType == 'TournamentsBreakStarts') {
            pokerModel.emit('TournamentsBreakStarts', data);
        }
    };

    pokerModel.onTableDestroyed = function(data) {
        // console.log("pokerModel.onDisconnectTime");
        if (data.tableId == pokerModel.gameData.raw.channelId) {
            // pokerModel.onTournamentRefresh(data.data);
            pokerModel.emit(K.SocketIOEvent.Game.TableDestroyed, data);
        }
    };

    pokerModel.onDisconnectTime = function(data) {
        // console.log("pokerModel.onDisconnectTime");
        pokerModel.emit(K.SocketIOEvent.Game.DisconnectTime, data);
    };

    pokerModel.onEliminated = function(data) {
        // console.log("pokerModel.onEliminated");
        pokerModel.emit(K.SocketIOEvent.Game.Eliminated, data);
    };

    pokerModel.onTournamentWinner = function(data) {
        // console.log("pokerModel.onTournamentWinner");
        pokerModel.emit(K.SocketIOEvent.Game.TournamentWinner, data);
    };

    pokerModel.onBreakTime = function(data) {
        // console.log("pokerModel.onBreakTime");
        pokerModel.emit(K.SocketIOEvent.Game.BreakTime, data);
    };

    pokerModel.onAddonBreakTime = function(data) {
        pokerModel.emit("addonBreakTime", data);
    };

    pokerModel.onAddonBreakTimeOver = function(data) {
        pokerModel.emit("addonBreakTimeOver", data);
    };

    pokerModel.onTournamentUpdated = function(data) {
        // console.log("pokerModel.onTournamentUpdated");
        pokerModel.emit(K.SocketIOEvent.Game.TournamentUpdated, data);
    };

    pokerModel.leave = function(kick) {
        GameManager.playerRequestedToLeaveTable[pokerModel.gameData.raw.tournamentId] = true
        pokerModel.alreadyKickingOut = true;
        if (kick) {
            pokerModel.kickPlayerOutOfTheGame(pokerModel);
        }
    };
}

TournamentModelHandler.prototype.setPresenter = function (pokerPresenter) {
    
    pokerPresenter.onTournamentUpdated = function (data) {
        if (data.eventName == "TournamentBlindUpdate") {
            if (data.tournamentId == pokerPresenter.model.gameData.raw.tournamentId) {
                if (pokerPresenter.node.getChildByName("winnerBannerBg2")) {
                    let tmp = pokerPresenter.node.getChildByName("winnerBannerBg2");
                    tmp.active = true;
                    tmp.getChildByName("winningText").getComponent(cc.Label).string = "New Blind Level - " + data.data.smallBlind + "/" + data.data.bigBlind;
                    cc.director.getScheduler().schedule((dt) => { tmp.active = false; }, pokerPresenter, 1.3);
                }
                pokerPresenter.model.gameData.raw.tourData.raw.currentBlindLevel = data.data;
                pokerPresenter.updateBlind();
            }
        }
    };

    pokerPresenter.onTournamentClosed = function (data) {
        // if (data._id == pokerPresenter.model.gameData.raw.tournamentId) {
        // console.log("onTournamentClosed", data);

        if (pokerPresenter.tournamentResultPlacement.active) {
            return;
        }
        
        if (pokerPresenter.isObserver()) {
            pokerPresenter.tournamentKickInfo.active = true;
            pokerPresenter.tournamentKickInfo.getComponent("TournamentInfo").setData({
                "title": "Information",
                "content": "The tournament is closed."
            });
        }
        // }
    };

    pokerPresenter.onTableDestroyed = function (data) {
        // if (data._id == pokerPresenter.model.gameData.raw.tournamentId) {
        // console.log("onTableDestroyed", data);
        if (pokerPresenter.tournamentResultPlacement.active) {
            return;
        }

        if (pokerPresenter.isObserver()) {
            pokerPresenter.tournamentKickInfo.active = true;
            pokerPresenter.tournamentKickInfo.getComponent("TournamentInfo").setData({
                "title": "Information",
                "content": "The table is closed."
            });
        }
        else {
            // pokerPresenter.resetView();
            // pokerPresenter.resetGame();
        }
        // }
    };

    pokerPresenter.onDisconnectTime = function (data) {
        pokerPresenter.model.startTimerTick(data.disconnectTime);
        // 
        var playerPresenter = pokerPresenter.playerHand[pokerPresenter.getRotatedSeatIndex(pokerPresenter.model.gameData.tableDetails.currentMoveIndex)];
        if (!playerPresenter.playerData) {
            // cc.error("!playerPresenter", playerPresenter);
        }
        else {
            playerPresenter.timeBank.active = false;
            playerPresenter.onDisconnectTime(data.disconnectTime);
        }
    };

    pokerPresenter.onBreakTime = function (data) {
        console.log("onBreakTime", data);
        // window.GameScreen.onShowLobby();
        if (pokerPresenter.tournamentResultPlacement.active) {
            return;
        }
        if (data.isInBreak) {
            pokerPresenter.breakInfoNode.active = false;
            pokerPresenter.breakInfoPopupNode.active = false;
            pokerPresenter.tournamentBreakTime.active = true;

            if (pokerPresenter.mobileGamePlayOptionsVisible) {
                pokerPresenter.mobileGamePlayOptions();
            }

            pokerPresenter.model.gameData.raw.tourData.raw.isInBreak = true;
            pokerPresenter.tournamentBreakTime.getComponent("TournamentBreakTime").setData(data);
        }
        else {
            pokerPresenter.model.gameData.raw.tourData.raw.isInBreak = false;
            pokerPresenter.tournamentBreakTime.active = false;
        }
    };

    pokerPresenter.onAddonBreakTime = function (data) {
        // console.log(data);
        // window.GameScreen.onShowLobby();
        // if (data.isInBreak) {
            pokerPresenter.tournamentBreakTimeAddon.active = true;
            pokerPresenter.tournamentBreakTimeAddon.getComponent("TournamentBreakTimeAddon").setData(data);
        // }
        // else {
        //     pokerPresenter.tournamentBreakTime.active = false;
        // }
    };

    pokerPresenter.onAddonBreakTimeOver = function (data) {
        // console.log(data);
        // window.GameScreen.onShowLobby();
        // if (data.isInBreak) {
        //     pokerPresenter.tournamentBreakTime.active = true;
        //     pokerPresenter.tournamentBreakTime.getComponent("TournamentBreakTime").setData(data);
        // }
        // else {
            pokerPresenter.tournamentBreakTimeAddon.active = false;
        // }
    };

    pokerPresenter.onResRebuy = function (data) {
        pokerPresenter.updateRebuyChips(data);
    };

    pokerPresenter.onResAddon = function (data) {
        pokerPresenter.tournamentBreakTimeAddon.getComponent("TournamentBreakTimeAddon").addonDone(data);
    };

    pokerPresenter.onInactiveKicked = function (data) {
        if (data.playerId == GameManager.user.playerId) {
            pokerPresenter.tournamentKickInfo.active = true;
            pokerPresenter.tournamentKickInfo.getComponent("TournamentInfo").setData({
                "title": "Information",
                "content": "Your have been elimnated for being inactive."
            });
        }
    };

    pokerPresenter.onTournamentCancelled = function (data) {
        pokerPresenter.tournamentKickInfo.active = true;
        pokerPresenter.tournamentKickInfo.getComponent("TournamentInfo").setData({
            "title": "Information",
            "content": "The tournament has been cancelled."
        });
    };

    pokerPresenter.onEliminated = function (data) {
        pokerPresenter.tournamentBreakTime.active = false;
        pokerPresenter.tournamentKickInfo.active = false;

        // console.log("pokerPresenter.onEliminated");
        pokerPresenter.tournamentResultWinner.active = false;
        pokerPresenter.tournamentResultPlacement.getComponent("TournamentResultsPlacement").setData(data);
        pokerPresenter.tournamentResultPlacement.active = true;
        // 
        pokerPresenter.model.gameModel.removeBroadcastCallbacks(pokerPresenter.model.gameData.channelId);
        // 
        socketIO.socket.off(pokerPresenter.model.gameData.channelId);
        socketIO.socket.off(pokerPresenter.model.gameData.channelId + ":" + pokerPresenter.model.gameData.playerId);
        socketIO.socket.off(K.SocketIOBroadcast.Lobby.TournamentUpdated);
        // socketIO.off(K.SocketIOBroadcast.Lobby.TournamentRefresh);
        cc.systemEvent.off(K.SocketIOEvent.Lobby.TournamentRefresh);


        
    };

    pokerPresenter.onTournamentWinner = function (data) {
        // console.log("pokerPresenter.onTournamentWinner");
        pokerPresenter.tournamentKickInfo.active = false;
        pokerPresenter.tournamentResultPlacement.active = false;
        pokerPresenter.tournamentResultPlacement.getComponent("TournamentResultsPlacement").setData(data);
        pokerPresenter.tournamentResultPlacement.active = true;
    };

    pokerPresenter.onSitnGoElimination = function (data) {
        if (data.playerId == GameManager.user.playerId) {
            data.pokerPresenter = pokerPresenter;
            setTimeout(function () {
                //user might leave the current game in this time out.
                if (!!pokerPresenter) {
                    pokerPresenter.popUpManager.show(PopUpType.SitNGoResultPopup, data, function () { });
                }
            }, 2000);
        }
    };

    /**
     * @method tempOnLoad
     * @description Register Some broadcast for pokerpresenter 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.tempOnLoad = function () {
        pokerPresenter.model.on(K.SocketIOEvent.Game.Eliminated, pokerPresenter.onEliminated.bind(pokerPresenter));
        pokerPresenter.model.on(K.SocketIOEvent.Game.TournamentWinner, pokerPresenter.onTournamentWinner.bind(pokerPresenter));
        pokerPresenter.model.on(K.SocketIOEvent.Game.BreakTime, pokerPresenter.onBreakTime.bind(pokerPresenter));
        pokerPresenter.model.on('addonBreakTime', pokerPresenter.onAddonBreakTime.bind(pokerPresenter));
        pokerPresenter.model.on('addonBreakTimeOver', pokerPresenter.onAddonBreakTimeOver.bind(pokerPresenter));
        pokerPresenter.model.on('resRebuy', pokerPresenter.onResRebuy.bind(pokerPresenter));
        pokerPresenter.model.on('resAddon', pokerPresenter.onResAddon.bind(pokerPresenter));
        pokerPresenter.model.on('inactiveKicked', pokerPresenter.onInactiveKicked.bind(pokerPresenter));
        pokerPresenter.model.on('TournamentCancelled', pokerPresenter.onTournamentCancelled.bind(pokerPresenter));
        pokerPresenter.model.on(K.SocketIOEvent.Game.TournamentUpdated, pokerPresenter.onTournamentUpdated.bind(pokerPresenter));
        pokerPresenter.model.on(K.SocketIOEvent.Game.TournamentClosed, pokerPresenter.onTournamentClosed.bind(pokerPresenter));
        pokerPresenter.model.on(K.SocketIOEvent.Game.TableDestroyed, pokerPresenter.onTableDestroyed.bind(pokerPresenter));
        pokerPresenter.model.on(K.SocketIOEvent.Game.DisconnectTime, pokerPresenter.onDisconnectTime.bind(pokerPresenter));
        pokerPresenter.model.on("TournamentsBreakStarts", pokerPresenter.onTournamentsBreakStarts.bind(pokerPresenter));

    };
    pokerPresenter.onTournamentsBreakStarts = function() {
        if (this.model.gameData.raw.tourData.raw.tournamentType != "SIT N GO") {
            if (pokerPresenter.mobileGamePlayOptionsVisible) {
                pokerPresenter.mobileGamePlayOptions();
            }
            pokerPresenter.breakInfoNode.active = true;
            pokerPresenter.breakInfoPopupNode.active = false;
        }
    };
    pokerPresenter.tempOnJoinSuccess = function()
    {
     if (this.model.roomConfig.tournamentType == this.model.K.TournamentType.Normal) {
        this.setCheckBoxValues();
        this.rebuyBtn.active = this.model.gameData.tableDetails.isRebuy && !this.model.gameData.tableDetails.isAutoAddOn;
     }
         this.tournamentAlreadyOver();
               if (!!this.model.gameData.tableDetails.isOnBreak) {
            var breakEnds = this.model.gameData.tableDetails.breakEnds;
          
            this.startBreakTimer(( breakEnds !== undefined) ? breakEnds : false); //key needed
        
    }
};
    
    pokerPresenter.setCheckBoxValues = function() {
        this.sitOutNextBBCheckBox.node.parent.active = false;
        // this.straddleCheckBox.node.parent.active = false;
       this.autoAddOnCheckBox.node.parent.active = true;
       this.autoBuyInCheckBox.node.parent.active = true;
       this.autoAddOnCheckBox.setSelection(this.model.gameData.tableDetails.isAutoAddOn);
       this.autoBuyInCheckBox.setSelection(this.model.gameData.tableDetails.isAutoRebuy);
    //     if(this.model.gameData.tableDetails.isAddon)
    //    { 
    //        this.autoAddOnCheckBox.node.parent.active = true;
    //    this.autoAddOnCheckBox.setSelection(this.model.gameData.tableDetails.isAutoAddOn);
    // }
    //  if(this.model.gameData.tableDetails.isRebuy)
    //    { 
    //        this.autoBuyInCheckBox.node.parent.active
    //    this.autoBuyInCheckBox.setSelection(this.model.gameData.tableDetails.isAutoRebuy);
    // }
    },
    /**
     * @method resetView
     * @description reset the view for each player in table
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.resetView = function () {
        pokerPresenter.indexOffset = 0;
        for (var index = 0; index < pokerPresenter.playerHand.length; index++) {
            pokerPresenter.playerHand[index].resetSeat();
        }
        // reallocate seat
        pokerPresenter.allocateSeat();
        pokerPresenter.playerHand.forEach(function (element) {
            if (element.seatState === K.SeatState.Free) {
                element.disableView();
            }
        }, pokerPresenter);
    };

    /**
     * @method onBrakTime , nn
     * @description shows notification of Break Time Start
     * @param {object} data - 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    // pokerPresenter.onBreakTime = function (data) {
    //     var newData = {};
    //     newData.info = "Break Time Starts...";
    //     pokerPresenter.popUpManager.show(PopUpType.PlayerInfoPopup, newData, function () { });
    // };

    /**
     * @method onBrakTimeStart
     * @description shows a timer in view which indicate break time
     * @param {object} data -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.onBreakTimeStart = function (data) {
        //  var newData = {};
        // newData.info = "There will be a break of " + data.breakTime + " mins";
        pokerPresenter.startBreakTimer(data.breakTime);
        // pokerPresenter.popUpManager.show(PopUpType.PlayerInfoPopup, newData, function () { });
    };

    /**
     * @method onRebuyStatus
     * @description Active/Deactive rebuy button
     * @param {object} data-
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.onRebuyStatus = function (data) {
        pokerPresenter.rebuyBtn.active = data.status;
    };
      /**
     * @method startBreakTimer
     * @description Called to startBreakTimer
     * @param {Number} timer -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.startBreakTimer = function(timer) { 
        this.tournamentInfo.parent.active = true;
        this.tournamentInfo.active = true;
        // console.log("i have been callled");
        // console.log(timer);
        var label = this.tournamentInfo.getComponent(cc.Label);
        if(!timer)
        {
            label.string = "This table is on Break";
        }
        var timeLeft;
        if (timer > 1000) { //THIS WILL CHANGE
         timeLeft = parseInt(parseInt(timer)/1000);
        }
        else
        {
              timeLeft = parseInt(timer) * 60;
        }      
       
        this.timerSchedule = setInterval(function() {
             label.string = "Break Time Starts...\n" + "Time Left : " + parseInt(timeLeft / 60) + ":" + (timeLeft % 60);
            timeLeft--;
            if(timeLeft <= 0)
            {
                clearInterval(this.timerSchedule.bind(this));
                  this.tournamentInfo.parent.active = false;

            }
        }.bind(this), 1000);
        // this.timerOffSchedule = setTimeout(
        //     function() {
        //         clearInterval(this.timerSchedule);
        //         if (!!this.tournamentInfo) {
        //             this.tournamentInfo.parent.active = false;
        //         }
        //     }.bind(this), timeLeft * 1000);
    };

    /**
     * @method playerLeft
     * @description reset seat view for the player
     * @param {Object} data 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.playerLeft = function (data) {
        // reset seat view for the player
        if (data === null) {
            // already stand!
            return;
        }
        //If my player then reset the whole view
        if (data[0].playerId === pokerPresenter.model.gameData.playerId) {
            this.handleSitOutBtns(true);
            pokerPresenter.resetView();
        }
        //For another player
        pokerPresenter.playerHand[pokerPresenter.getRotatedSeatIndex(data[0].seatIndex)].disableView();
        this.scheduleOnce(function () {
            if (pokerPresenter.model.gameData.tableDetails.players.length == 0) {
                var data = {};
                data.pokerPresenter = pokerPresenter;
                pokerPresenter.popUpManager.show(PopUpType.SitNGoResultPopup, data, function () { });
            }
        }, 5);
    };

    /**
     * @description Called when game starts and when blindsChange poker event occurs. Show a popUp notification when blind changes (or K.PokerEvents.onblindsChangedEvent Occurs)
     * @method notifyBlindsChanged
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.notifyBlindsChanged = function () {
        pokerPresenter.notificationBox.active = true;
        let str;
        // if (pokerPresenter.model.gameData.tableDetails.blindTimeRemaining <= 0) {
        //     pokerPresenter.stopBlindsChangeNotification();
        // } else {
        //     let timeRemaining = GameManager.getTimeDuration(pokerPresenter.model.gameData.tableDetails.blindTimeRemaining);
        //     str = "In " + timeRemaining + " mins ";
        //     str += "Blinds " + pokerPresenter.model.roomConfig.nextSmallBlind + "/" + pokerPresenter.model.roomConfig.nextBigBlind + " Ante " + pokerPresenter.model.roomConfig.nextAnte;
        // }
        if (pokerPresenter.model.gameData.tableDetails.nextSmallBlind <= 0) {
            pokerPresenter.stopBlindsChangeNotification();
        } else {
            str = "";
            str += "Next Blinds " + pokerPresenter.model.roomConfig.nextSmallBlind + "/" + pokerPresenter.model.roomConfig.nextBigBlind + "Next Ante " + pokerPresenter.model.roomConfig.nextAnte;
        }

        pokerPresenter.notificationBox.getChildByName("Message").getComponent(cc.Label).string = str;
    };

    /**
     * @description Stops Notifying the player about blind change notification
     * @method stopBlindsChangeNotification
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.stopBlindsChangeNotification = function () {
        pokerPresenter.notificationBox.active = false;
        // clearInterval(this.timerRef);
    };

    /**
     * @description Called when AddonTimeEnd Event occurs.
     * @method onAddonTimeEnd
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.onAddonChanged = function () {
        this.addonBtn.active = this.model.gameData.tableDetails.isAddon;
        //this.autoAddOnCheckBox.node.parent.active = this.model.gameData.tableDetails.isAddOnAllowed;
    };

    pokerPresenter.onAddOnCheckBox = function () {
        var selection = pokerPresenter.autoAddOnCheckBox.getSelection();
        this.model.gameData.isAutoRebuy = selection;
        this.model.setAddOnCheckbox(selection, function (response) {
            if (!response.success) {
                this.model.gameData.isAutoRebuy = !selection;
            }
            this.addOnCheckCB.bind(this)
        }.bind(this));
    };

    pokerPresenter.addOnCheckCB = function () {
        this.autoAddOnCheckBox.setSelection(this.model.gameData.isAutoRebuy);
    };
    pokerPresenter.onRebuyCheckBox = function () {
        var selection = pokerPresenter.autoBuyInCheckBox.getSelection();
        this.model.setRebuyCheckBox(selection, function (response) {
            if (!response.success) {
                this.model.gameData.isAutoRebuy = !selection;
            }
            this.reBuyCheckCB.bind(this)
        }.bind(this));
    };
    pokerPresenter.reBuyCheckCB = function (response) {
      
        pokerPresenter.autoBuyInCheckBox.setSelection(this.model.gameData.isAutoRebuy);
    };
}

module.exports = {
    TournamentModelHandler: TournamentModelHandler,
};

