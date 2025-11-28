/**
 * @class Decks
 * @memberof Utilities.Cards
 */
var Types = require('CardTypes');

/**
 * @constructor Decks
 * @param {number} numberOfDecks
 * @memberof Utilities.Cards.Decks 
 */
function Decks(numberOfDecks) {
    this._numberOfDecks = numberOfDecks;
    this._cardIds = new Array(numberOfDecks * 52);

    this.reset();
}

/**
 * @method reset
 * @memberof Utilities.Cards.Decks
 */
Decks.prototype.reset = function() {
    this._cardIds.length = this._numberOfDecks * 52;
    var index = 0;
    var fromId = Types.Card.fromId;
    for (var i = 0; i < this._numberOfDecks; ++i) {
        for (var cardId = 0; cardId < 52; ++cardId) {
            this._cardIds[index] = fromId(cardId);
            ++index;
        }
    }
};

/**
 * @method draw
 * @return {Card} result
 * @memberof Utilities.Cards.Decks
 */
Decks.prototype.draw = function () {
    var cardIds = this._cardIds;
    var len = cardIds.length;
    if (len === 0) {
        return null;
    }

    var random = Math.random();
    var index = (random * len) || 0;
    var result = cardIds[index];

    var last = cardIds[len - 1];
    cardIds[index] = last;
    cardIds.length = len - 1;

    return result;
};

module.exports = Decks;
