var PokerModel = require("PokerModel").PokerModel;
cc.Class({
    extends: PokerModel,
    properties: {},

    onLoad: function() {
        this._super();
        this.K = require("OFCConfigs");
        this.moveData = require('OFCPostTypes').MoveData;
        this.sitData = require('OFCPostTypes').SitData;
        this.player = require('OFCResponseTypes').Player;
    },


    registerBroadcasts: function() {
        this._super();
        this.gameModel.registerBroadcastCallbacks(this.gameData.channelId, this.K.BroadcastRoute.ofcFirstRoundCards, this.onOfcFirstRoundCards.bind(this));
    },
    /**
     * @description Submits player input to server
     * @param betAmount, action
     * @method
     * @memberof 
     */
    makeMove: function() {
        // makedata : channelId, playerId, playerName, cards, discarded
        var data = new this.moveData(this.gameData.channelId, this.gameData.playerId, this.gameData.playerName, this.getMyPlayer().cards, this.getMyPlayer().discardedCards);
     //   console.log("make move data sent : " + JSON.stringify(data));
        ServerCom.pomeloRequest(this.K.PomeloAPI.makeMove, data, function(response) {
            if (response.success) {
                // process response
            }
        }, null, 5000, false);
    },


    /**
     * @description Turn broadcast callback
     * @param {data} data
     */
    onMoveMade: function(data) { 
        this.gameData.tableDetails.currentMoveIndex = data.currentMoveIndex === "" ? -1 : data.currentMoveIndex;
        var index = this.getPlayerById(data.playerId);
        this.gameData.tableDetails.players[index].cards = data.cards;
        this.gameData.tableDetails.players[index].royalities = data.royalities;
        this.gameData.tableDetails.players[index].roundName = data.roundName;
        if (this.gameData.tableDetails.currentMoveIndex != -1) {
            this.startTimerTick(this.gameData.tableDetails.turnTime);
        } else {
            this.clearTimerTick();
        }
        // emit events
        this.emit(this.K.PokerEvents.OnTurn, data, index);
    },

    /**
     * @description GameStart broadcast callback
     * @param {data} data
     */
    onGameStart: function(data) {
        this.gameData.tableDetails.dealerIndex = data.dealerIndex;
        this.gameData.tableDetails.currentMoveIndex = data.currentMoveIndex;
        this.gameData.tableDetails.state = data.state;
        this.gameData.tableDetails.roundName = data.roundName;
        this.startTimerTick(this.gameData.tableDetails.turnTime);
        this.onGameStateChange();
        this.emit(this.K.PokerEvents.OnStartGame, data);
    },

    /**
     * playerCards broadcast callback
     *  @params: {data} data
     */
    onPlayerCards: function(data) {
        var index = this.getPlayerById(data.playerId);
        var cardType = [];
        data.cards.forEach(function(cardData) {
            cardType.push(this.getCardByData(cardData));
        }, this);
        this.gameData.tableDetails.players[index].currentCards = data.cards;
        this.emit(K.PokerEvents.OnPlayerCard, cardType, this.gameData.tableDetails.players[index].seatIndex);
    },

    /**
   * GameOver broadcast callback
   *  @params: {data} data
   */
    onGameOver: function(data) {

        var index = [];
        data.winners.forEach(function(element) {
            // update player chips
            var playerIndex = this.getPlayerById(element.playerId);
            this.gameData.tableDetails.players[playerIndex].points = element.points;
            this.gameData.tableDetails.players[playerIndex].winningPoints = element.winningPoints;
            this.gameData.tableDetails.players[playerIndex].pointDetails = element.pointDetails;
            //.winningPoints
            if (data.endingType === K.GameEndType.GameCompleted) {
                index.push(this.gameData.tableDetails.players[playerIndex].seatIndex);
            }

        }, this);

        // var id = null;
        // for (id in data.cardsToShow) {
        //     // var =this.getPlayerById(id);
        //     this.gameData.tableDetails.players[this.getPlayerById(id)].cards = data.cardsToShow[id];
        // }

        // this.clearTotalRoundBet();
        // this.gameData.tableDetails.roundMaxBet = 0;

        this.gameData.tableDetails.state = K.GameState.GameOver;
        this.onGameStateChange();
        this.clearTimerTick();
        this.emit(K.PokerEvents.onTurnInOtherRoom, this, false);
        this.emit(K.PokerEvents.OnGameOver, data, index);
    },

    generateHoleCards: function() { },
     onDealerChat: function () { },
    onGameStateChange: function() {
        this.emit(K.PokerEvents.onGameStateChange, this.gameData.tableDetails.state);
    },
    clearTotalRoundBet: function() { },

    onOfcFirstRoundCards: function(data) {
        var index = this.getPlayerById(data.playerId);
        var cardType = [];
        data.cards.forEach(function(cardData) {
            cardType.push(this.getCardByData(cardData));
        }, this);
        this.gameData.tableDetails.players[index].currentCards = data.cards;
        this.emit(K.PokerEvents.onOfcFirstRoundCards, data.cards, cardType, data.playerId);
    },


});