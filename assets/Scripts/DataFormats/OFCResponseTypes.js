/**
 * @class OFCResponseTypes
 * @memberof DataFormats
 */
var changeAvatar = require('ResponseTypes').changeAvatar;

/**
 * @description
 * @method gameData
 * @param {Object} data
 * @memberof DataFormats.OFCResponseTypes#
 */
function gameData(data) {
    this.success = data.success;
    this.channelId = data.channelId;
    this.playerId = data.playerId;
    this.playerName = data.playerName;
    this.tableDetails = {};
    this.tableDetails.state = data.tableDetails.state;
    this.tableDetails.turnTime = data.tableDetails.turnTime;
    var array = [];
    data.tableDetails.players.forEach(function (element) {
        var playerData = new player(element);
        array.push(playerData);
        if (this.playerId == playerData.playerId) {
            playerData.currentCards = data.currentCards;
            playerData.discardedCards = data.discardedCard;
        }
    }, this);
    this.tableDetails.remainingMoveTime = data.tableDetails.remainingMoveTime;
    this.tableDetails.players = array;
    this.tableDetails.roundName = data.tableDetails.roundName;
    this.tableDetails.roundCount = data.tableDetails.roundCount;
    this.tableDetails.dealerIndex = data.tableDetails.dealerIndex;
    this.tableDetails.currentMoveIndex = data.tableDetails.currentMoveIndex;
    this.tableDetails.actionName = data.tableDetails.actionName;
};

/**
 * @description
 * @method player
 * @param {Object} data
 * @memberof DataFormats.OFCResponseTypes#
 */
function player(data) {
    this.playerId = data.playerId;
    this.channelId = data.channelId;
    this.playerName = data.playerName;
    this.points = data.points || 0;
    this.seatIndex = data.seatIndex || -1;
    this.imageAvtar = ""; //data.imageAvtar;
    var profileData = {
        playerId: data.playerId,
        keys: ['profileImage'],
    };
    var self = this;
    pomelo.request(K.PomeloAPI.getProfile, profileData, function (data) {
        self.imageAvtar = data.result.profileImage;
        changeAvatar(self.imageAvtar, self);
    }, null, 5000, false);
    this.currentCards = data.currentCards || [];
    this.discardedCards = data.discardedCard || [];
    this.cards = data.cards || null;
    this.state = data.state || K.PlayerState.Waiting;
    this.sitoutNextHand = data.sitoutNextHand || false;
    this.rowPoints = data.rowPoints;
    this.roundName = data.roundName;
    this.autoSitOut = data.autoSitOut;
    this.royalities = data.royalities;
    this.isTournamentSitout = data.isTournamentSitout;
};


player.prototype.reset = function (data) {
    this.points = data.points;
    this.state = data.state;
    this.cards = [];
    this.currentCards = [];
    this.discardedCards = [];
    this.royalities = [];
    this.rowPoints = [];
    this.roundName = "ONE";
}



module.exports = {
    Player: player,
    GameData: gameData,
};