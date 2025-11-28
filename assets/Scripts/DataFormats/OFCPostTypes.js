/**
 * @namespace DataFormats
 */

/**
 * @class OFCPostTypes
 * @classdesc Methods to set user and game data
 * @memberof DataFormats
 * @memberof DataFormats.OFCPostTypes#
 */
var login = require("PostTypes").Login;


/**
 * @description
 * @method sitData 
 * @param {String} chennelID
 * @param {String} playerId
 * @param {Number} points
 * @param {Number} seatIndex
 * @param {String} playerName
 * @param {String} imageAvtar
 * @param {boolean} isAutoReBuy 
 * @memberof DataFormats.OFCPostTypes#
 */
function sitData(channelId, playerId, points, seatIndex, playerName, imageAvtar, isAutoReBuy) {
    this.channelId = channelId;
    this.playerId = playerId;
    this.points = points;
    this.seatIndex = seatIndex;
    this.playerName = playerName;
    this.imageAvtar = ""; //imageAvtar;
    this.isRequested = true;
    this.isAutoReBuy = isAutoReBuy;
    this.networkIp = login.ipV4Address;
    // return this;
};

/**
 * @description 
 * @method moveData
 * @param {String} channelId
 * @param {String} playerId
 * @param {String} playerName
 * @param {Object} cards
 * @param {boolean} discarded
 * @memberof DataFormats.OFCPostTypes#
 */
function moveData(channelId, playerId, playerName, cards, discarded) {
    this.channelId = channelId;
    this.playerId = playerId;
    this.playerName = playerName;
    this.cards = cards;
    this.discarded = discarded;
    this.isRequested = true;
    // return this;
};


module.exports = {
    SitData: sitData,
    MoveData: moveData,
};