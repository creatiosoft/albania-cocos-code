/**
 * @class ResponsesTypes
 * @classdesc Methods to set user and game data
 * @memberof DataFormats
 */

/**
 * @method user 
 * @param {Object} data -All the data related to user!!!
 * @memberof DataFormats.ResponseTypes#
 */
function user(data) {
    // console.error(data);
    // console.error(data.profileImage)
    this.category = "DIAMOND";
    this.isParentUserName = data.isParentUserName || "";
    this.claimedFreeChipsAt = data.claimedFreeChipsAt;
    this.nextClaimBonusTime = data.nextClaimBonusTime;
    this.defaultTheme = data.defaultTheme || "";
    this.defaultCard = data.defaultCard || "";
    this.defaultGameBackground = data.defaultGameBackground || "";

    this.defaultTourCard = data.defaultTourCard || "";
    this.defaultTourGameBackground = data.defaultTourGameBackground || "";
    this.defaultTourTheme = data.defaultTourTheme || "";

    this.tableCountAllowed = data.tableCountAllowed || {
        "browser": 6,
        "phone": 2,
        "androidApp": 2,
        "iosApp": 2,
        "windows": 6,
        "mac": 6
    };
    GameManager.emit("updateTableImage");
    GameManager.emit("updateTableBgImage");

    var device = "";
    if (cc.sys.isBrowser) {
        device = "browser";
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            device = "androidApp";
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            device = "iosApp";
        } else if (cc.sys.os === cc.sys.OS_OSX) {

            device = "mac";
        }

    } else if (cc.sys.os === cc.sys.OS_ANDROID) {
        device = "androidApp";
    } else if (cc.sys.os === cc.sys.OS_IOS) {
        device = "iosApp";
    } else if (cc.sys.os === cc.sys.OS_WINDOWS) {
        device = "windows";
    } else if (cc.sys.os === cc.sys.OS_OSX) {
        device = "mac";
    }

    GameManager.maxTableCounts = 2;
    console.log(">>>GameManager.maxTableCounts", GameManager.maxTableCounts);

    this.mobileNumber = data.mobileNumber;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.emailId = data.emailId;
    this.playerId = data.playerId;
    this.userName = data.userName;
    this.tribeName = data.tribeName;
    this.settings = data.settings || {};
    this.profileImage = (data.profileImage == "" || data.profileImage == "undefined") ? (1) : (Number(data.profileImage) - 1) // || 0; //"http://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Olympic_rings_without_rims.svg/200px-Olympic_rings_without_rims.svg.png";
    changeAvatar(this.profileImage, this);
    this.muteGameSound = data.settings.muteGameSound;
    GameManager.playMusic(!this.muteGameSound);
    this.runItTwice = (data.settings.runItTwice !== undefined && data.settings.runItTwice != null) ? data.settings.runItTwice : false;
    this.isMuckHand = (data.isMuckHand !== undefined && data.isMuckHand != null) ? data.isMuckHand : false;
    this.isShowCard = (data.isShowCard !== undefined && data.isShowCard != null) ? data.isShowCard : false;
    this.cardColor = (data.prefrences.cardColor !== undefined && data.prefrences.cardColor !== null) ? data.prefrences.cardColor : true;
    this.seatPreferances = (data.settings.seatPrefrence !== undefined && data.settings.seatPrefrence != null && data.settings.seatPrefrence != "") ? data.settings.seatPrefrence : 1;
    this.seatPreferancesTwo = (data.settings.seatPrefrenceTwo !== undefined && data.settings.seatPrefrenceTwo != null && data.settings.seatPrefrenceTwo != "") ? data.settings.seatPrefrenceTwo : 1;
    this.seatPreferancesSix = (data.settings.seatPrefrenceSix !== undefined && data.settings.seatPrefrenceSix != null && data.settings.seatPrefrenceSix != "") ? data.settings.seatPrefrenceSix : 1;
    this.dealerChat = (data.settings.dealerChat !== undefined && data.settings.dealerChat != null) ? data.settings.dealerChat : true;
    this.playerChat = (data.settings.playerChat !== undefined && data.settings.playerChat != null) ? data.settings.playerChat : true;
    this.tableColor = (data.settings.tableColor !== undefined && data.settings.tableColor !== null && data.settings.tableColor !== "") ? data.settings.tableColor : 3;
    this.tableLayout = data.tableLayout;
    this.autoBuyIn = data.autoBuyIn;
    this.autoBuyInAmountInPercent = data.autoBuyInAmountInPercent;
    this.isEmailVerified = data.isEmailVerified;
    this.isMobileNumberVerified = data.isMobileNumberVerified;
    this.dailyBonusCollectionTime = data.dailyBonusCollectionTime;
    this.freeChips = data.freeChips;
    this.realChips = data.realChips;
    this.loyalityRakeLevel = data.loyalityRakeLevel;
    this.host = data.host;
    this.port = data.port;
    this.megaPointDetail = {};
    this.megaPointDetail.megaPointLevel = data.statistics.megaPointLevel;
    this.megaPointDetail.megaPoints = data.statistics.megaPoints;
    this.megaPointDetail.megaPointsPercent = data.statistics.megaPointsPercent;
    this.affiliateId = data.isParentUserName ? data.isParentUserName : null;
    this.isCashout = data.cashoutGamePlay ? data.cashoutGamePlay : null;
    this.unclamedBonus = data.unclamedBonus || 0;
    this.password = "";
};


/**
 * @method gameData
 * @param {Object} data -All the data Related to game play!!
 * @memberof DataFormats.ResponseTypes#
 */
function gameData(data) {
    this.success = data.success;
    this.raw = data;
    this.channelId = data.channelId;
    this.playerId = data.playerId;
    this.tableId = data.tableId;
    this.showHandStrength = data.showHandStrength || false;
    this.playerName = data.playerName;
    this.isJoinWaiting = data.isJoinWaiting;
    this.bestHands = data.bestHands;
    this.isRunItTwice = (!!data.isRunItTwice) ? data.isRunItTwice : false;
    this.antibanking = data.antibanking;
    this.settings = data.settings;
    this.timeBankLeft = data.timeBankLeft || 0;
    this.tableDetails = {};
    this.tableDetails.roundId = data.tableDetails.roundId;
    this.tableDetails.state = data.tableDetails.state;
    this.tableDetails.isStraddleEnable = data.tableDetails.isStraddleEnable;
    this.tableDetails.runItTwiceEnable = data.tableDetails.runItTwiceEnable;
    this.tableDetails.roundCount = data.tableDetails.roundCount;
    this.tableDetails.turnTime = data.tableDetails.turnTime;
    this.tableDetails.extraTurnTime = data.tableDetails.extraTurnTime || 10;
    this.tableDetails.additionalTurnTime = data.tableDetails.additionalTurnTime || 0;
    this.tableDetails.minRaiseAmount = data.tableDetails.minRaiseAmount;
    this.tableDetails.maxRaiseAmount = data.tableDetails.maxRaiseAmount;
    var array = [];
    data.tableDetails.players.forEach(function (element) {
        if (this.playerId == element.playerId)
            element.cards = data.cards;
        array.push(new player(element));
    }, this);
    this.tableDetails.remainingMoveTime = data.tableDetails.remainingMoveTime;
    this.tableDetails.players = array;
    this.tableDetails.roundName = data.tableDetails.roundName;
    this.tableDetails.roundNumber = data.tableDetails.roundNumber;
    this.tableDetails.roundBets = data.tableDetails.roundBets;
    this.tableDetails.roundMaxBet = data.tableDetails.roundMaxBet;
    this.tableDetails.smallBlind = data.tableDetails.smallBlind;
    this.tableDetails.bigBlind = data.tableDetails.bigBlind;
    this.tableDetails.maxBetAllowed = data.tableDetails.maxBetAllowed;
    this.tableDetails.pot = data.tableDetails.pot || [];
    this.tableDetails.totalPot = data.tableDetails.totalPot || 0;
    this.tableDetails.boardCard = data.tableDetails.boardCard;
    this.tableDetails.dealerIndex = data.tableDetails.dealerIndex;
    this.tableDetails.smallBlindIndex = data.tableDetails.smallBlindIndex;
    this.tableDetails.bigBlindIndex = data.tableDetails.bigBlindIndex;
    this.tableDetails.straddleIndex = data.tableDetails.straddleIndex;
    this.tableDetails.currentMoveIndex = data.tableDetails.currentMoveIndex;
    this.tableDetails.actionName = data.tableDetails.actionName;
    this.tableDetails.isTimeBankUsed = data.tableDetails.isTimeBankUsed;
    this.tableDetails.isPrivateTable = data.tableDetails.isPrivateTable;
    this.tableDetails.totalTimeBank = data.tableDetails.totalTimeBank;
    this.tableDetails.timeBankLeft = data.tableDetails.timeBankLeft;
    this.tableDetails.breakTimeLeft = data.tableDetails.breakTimeRemaining;
    this.tableDetails.isOnBreak = (data.tableDetails.isOnBreak !== undefined) ? data.tableDetails.isOnBreak : false;
    this.tableDetails.breakEnds = data.tableDetails.breakEnds;
    this.tableDetails.rebuyTimeRemaining = data.tableDetails.rebuyTimeRemaining;
    this.tableDetails.addonTimeRemaining = data.tableDetails.addonTimeRemaining;
    this.tableDetails.blindTimeRemaining = data.tableDetails.blindTimeRemaining;
    this.tableDetails.isAddonEnabled = data.tableDetails.isAddonEnabled;
    // this.tableDetails.isBreak = data.tableDetails.isBreak;
    this.tableDetails.isRebuy = data.tableDetails.isRebuy;
    this.tableDetails.isAutoRebuy = data.tableDetails.isAutoRebuy;
    this.tableDetails.isAutoAddOn = data.tableDetails.isAutoAddOn;
    this.tableDetails.isAddon = data.tableDetails.isAddon;
    this.tableDetails.isForceRit = !!data.tableDetails.isForceRit; //rajat 19-08-2019
};


/**
 * @method player 
 * @param {Object} data -All the data related to playing player!!!
 * @memberof DataFormats.ResponseTypes#
 */
function player(data) {
    console.trace("?????? player", data);
    this.playerId = data.playerId;
    this.channelId = data.channelId;
    this.playerName = data.playerName;
    this.tribeName = data.tribeName;
    this.active = data.active || false;
    this.chips = data.chips || 0;
    // this.seatIndex = data.seatIndex || -1;
    this.seatIndex = data.seatIndex;
    this.imageAvtar = Number(data.imageAvtar) - 1;
    var profileData = {
        playerId: data.playerId,
        keys: ['profileImage'],
    };
    // var self = this;
    // // if (data.result && data.result.profileImage) {
    //     pomelo.request(K.PomeloAPI.getProfile, profileData, function (data) {
    //         // console.log(data.result, "of player")
    //         self.imageAvtar = data.result.profileImage;
    //         changeAvatar(self.imageAvtar, self);
    //     }, null, 5000, false);
    // // }
    changeAvatar(this.imageAvtar, this);
    var Cards = data.cards || null;
    this.cards = Cards || [];
    // this.moves = data.moves || {};
    if (data.moves) {
        console.log("?????? 111111player");
        this.moves = data.moves;
    }
    else {
        console.log("?????? 222222player");
        this.moves = [];
    }
    this.state = data.state || K.PlayerState.Waiting;
    this.lastBet = data.lastBet || 0;
    this.lastMove = data.lastMove || "";
    this.totalRoundBet = data.totalRoundBet || 0;
    this.isMuckHand = data.isMuckHand || false;
    this.isRunItTwice = data.isRunItTwice || false;
    this.bigBlindMissed = data.bigBlindMissed || false;
    this.isAutoReBuy = data.isAutoReBuy || false;
    this.autoReBuyAmount = data.autoReBuyAmount || 0;
    this.isPlayed = data.isPlayed || false;
    this.sitoutNextHand = data.sitoutNextHand || false;
    this.sitoutNextBigBlind = data.sitoutNextBigBlind || false;
    this.isTournamentSitout = data.isTournamentSitout || false;
    this.precheckValue = data.precheckValue;
    this.preCheck = data.preCheck;
    this.timeBankSec = data.timeBankSec || 0;
    if (this.timeBankSec < 0) {
        this.timeBankSec = 0;
    }
};

// Set default value of chips, cards, bestHand and lastMove

player.prototype.reset = function (data) {
    this.chips = data.chips;
    this.state = data.state;
    this.lastMove = "";
    this.cards = [];
    this.bestHand = null;
    this.timeBankSec = data.timeBankSec || 0;
    if (this.timeBankSec < 0) {
        this.timeBankSec = 0;
    }
}

/**
 * @method changeAvatar 
 * @param {Object} avatarUrl
 * @param {Object} user
 * @memberof DataFormats.ResponseTypes#
 */
function changeAvatar(avatarUrl, user) {
    if (isNaN(avatarUrl) && isNaN(parseInt(avatarUrl)) && avatarUrl != "") {
        //TODO Parsing URL: 
        cc.loader.load(avatarUrl + "?w=125&h=125", function (err, tex) {
            // cc.log('Should load a texture from external url: ' + (tex instanceof cc.Texture2D));
            if (!!err) {
                // this.profileImage = 1;
                // user.urlImg = GameManager.avatarImages[1];
                this.profileImage = Math.round(Math.random() * GameManager.avatarImages.length - 1);
                user.urlImg = GameManager.avatarImages[this.profileImage];
            } else {
                user.urlImg = new cc.SpriteFrame(tex);
            }
            GameManager.emit("image-loaded", user);
        });

        //TODO Parsing Base64: 
        // var imgElement = document.createElement("IMG");
        // imgElement.setAttribute("src", avatarUrl);
        // GameManager.scheduleOnce(function() {
        //     var texture2d = new cc.Texture2D();
        //     texture2d.initWithElement(imgElement);
        //     texture2d.handleLoadedTexture();
        //     user.urlImg = new cc.SpriteFrame(texture2d);
        //     GameManager.emit("image-loaded", user);
        // }, 0.2);
    } else {
        // if (avatarUrl == "") {
        //     avatarUrl = 1;
        // }
        if (!GameManager.avatarImages[avatarUrl]) {
            var randomIndex = Math.round(Math.random() * GameManager.avatarImages.length - 1);
            user.urlImg = GameManager.avatarImages[randomIndex];
        }
        else {
        user.urlImg = GameManager.avatarImages[avatarUrl];
        }
        GameManager.emit("image-loaded", user);
    }
    // return GameManager.avatarImages[avatarUrl];
};



module.exports = {
    User: user,
    Player: player,
    GameData: gameData,
    changeAvatar: changeAvatar
};


