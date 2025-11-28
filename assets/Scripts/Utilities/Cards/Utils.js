
// Return min , max points
function getMinMaxPoint (cards) {
    var hasAce = false;
    var min = 0;
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        if (card.point === 1) {
            hasAce = true;
        }
        min += Math.min(10, card.point);
    }
    var max = min;
    // Adjust Ace
    if (hasAce && min + 10 <= 21) {
        max += 10;
    }

    return {
        min: min,
        max: max
    };
}

function isBust (cards) {
    var sum = 0;
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        sum += Math.min(10, card.point);
    }
    return sum > 21;
}

var isMobile = function () {
    return cc.sys.isMobile;
};

module.exports = {
    isBust: isBust,
    getMinMaxPoint: getMinMaxPoint,
    isMobile: isMobile
};
