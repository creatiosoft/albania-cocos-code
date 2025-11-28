

function playerPayout(data) {
    this.playerId = data.playerId;
    this.playerName = data.playerName;
    this.payout = data.payout;
    this.rank = data.rank;
}

function playerChip(data) {
    this.playerId = data.playerId;
    this.chips = data.chips;
    this.playerName = data.playerName;
    this.updatedAt = data.updatedAt;
}

function tableStack(id, data) {
    this.id = id;
    this.minStack = data.minStack;
    this.maxStack = data.maxStack;
    this.playersCount = data.playersCount;
    this.tableMockName = data.tableMockName;
}

function currentBlindLevel(data) {
    this.level = data ? data.level : 0;
    this.smallBlind = data ? data.smallBlind : 0;
    this.bigBlind = data ? data.bigBlind : 0;
    this.ante = data ? data.ante : 0;
    this.minutes = data ? data.minutes : 0;
    this.levelIndex = data ? data.levelIndex : 0;
    this.nextBlindLevelTime = data ? data.nextBlindLevelTime : 0;
}

function payoutRecord(data) {
    this.playerRank = data.playerRank;
    this.playerPayout = data.playerPayout;
}

function payoutStructure(data) {
    this.id = data._id;
    this.playerRange = data.playerRange;
    this.createdAt = data.createdAt;
    this.noOfWinners = data.noOfWinners;
    this.minPlayer = data.minPlayer;
    this.maxPlayer = data.maxPlayer;
    
    var array = [];
    data.payoutRecord.forEach(function (element) {
        array.push(new payoutRecord(element));
    }, this);
    this.payoutRecord = array;
    this.payoutStructureId = data.payoutStructureId;
}

function blindRuleDetail(data) {
    this.level = data.level;
    this.smallBlind = data.smallBlind;
    this.bigBlind = data.bigBlind;
    this.ante = data.ante;
    this.minutes = data.minutes;
    this.levelIndex = data.levelIndex;
}

function blindRule(data) {
    this.id = data._id;
    this.ruleName = data.ruleName;
    this.description = data.description;
    // 
    var array = [];
    data.blindRuleArr.forEach(function (element) {
        array.push(new blindRuleDetail(element));
    }, this);
    this.blindRuleArr = array;
}

function leaderBoard(data) {
    this.playerId = data.playerId;
    this.playerName = data.playerName;
    this.chips = data.chips;
    this.updatedAt = data.updatedAt;
}

function seat(data) {
    this.playerId = data.playerId;
    this.status = data.status;
}

function table(data) {
    this.tableId = data.tableId;
    this.status = data.status;
    this.reShuffleStatus = data.reShuffleStatus;
    this.gameStatus = data.gameStatus;
    var array = [];
    data.seats.forEach(function (element) {
        array.push(new seat(element));
    }, this);
    this.seats = array;
}

function player(data) {
    this.userId = data.userId;
    this.playerId = data.playerId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.reentries = data.reentries;
    this.status = data.status;
    this.tableId = data.tableId;
}

function reentryPrice(data) {
    this.chips = data.chips;
    this.vipPoints = data.vipPoints;
    this.tickets = data.tickets;
    this.reentryChips = data.reentryChips;
    this.reentryHouseChips = data.reentryHouseChips;
}

function tournament(data) {
    this.raw = data;
    this.id = data._id;
    this.index = 0;
    this.addonBlindLevel = data.addonBlindLevel;
    this.rebuyPrice = data.rebuyPrice;
    if (data.reentryPrice) {
        this.reentryPrice = new reentryPrice(data.reentryPrice);
    }
    this.tournamentName = data.tournamentName;
    this.gameVariation = data.gameVariation;
    if (this.gameVariation == "NLH") {
        this.gameVariationFullName = "No Limit Holdem";
    }
    else if (this.gameVariation == "PLO") {
        this.gameVariationFullName = "Pot Limit Omaha";
    }
    else  {
        this.gameVariationFullName = "????";
    }
    this.tournamentType = data.tournamentType;
    this.isRealMoney = data.isRealMoney;
    this.isGtdEnabled = data.isGtdEnabled;
    this.guaranteedValue = data.guaranteedValue;
    this.noOfChipsAtGameStart = data.noOfChipsAtGameStart;
    this.turnTime = data.turnTime;
    if (this.turnTime == 10) {
        this.actionType = "HT";
        this.actionTypeFullName = "HYPER TURBO";
    }
    else if (this.turnTime == 15) {
        this.actionType = "T";
        this.actionTypeFullName = "TURBO";
    }
    else if (this.turnTime == 20) {
        this.actionType = "M";
        this.actionTypeFullName = "MEDIUM";
    }
    else if (this.turnTime == 30) {
        this.actionType = "S";
        this.actionTypeFullName = "STANDARD";
    }
    else {
        this.actionType = "?";
        this.actionTypeFullName = "??????";
    }
    this.minPlayersToStart = data.minPlayersToStart;
    this.maxPlayersForTournament = data.maxPlayersForTournament;
    this.maxPlayers = data.maxPlayers;
    this.registrationBeforeStarttime = data.registrationBeforeStarttime;
    this.tournamentStartTime = data.tournamentStartTime;
    this.displayStartTime = data.tournamentStartDetails ? data.tournamentStartDetails.displayStartTime : "";
    this.regCuttOffTime = data.regCuttOffTime;
    this.blindRuleId = data.blindRuleId;
    this.extraTimeAllowed = data.extraTimeAllowed;
    this.isAddonTimeEnabled = data.isAddonTimeEnabled;
    this.lateRegistrationAllowed = data.lateRegistrationAllowed;
    this.lateRegistrationTime = data.lateRegistrationTime;
    this.isRebuyAllowed = data.isRebuyAllowed;
    this.isReentryAllowed = data.isReentryAllowed;
    this.reentryChips = data.reentryChips;
    this.numberOfReentry = data.numberOfReentry;
    this.reentryTime = data.reentryTime;
    this.totalReentryChips = data.totalReentryChips;
    this.payoutType = data.payoutType;
    this.payoutId = data.payoutId;
    this.isAddonEnabled = data.isAddonEnabled;
    this.freezeout = data.freezeout;
    this.state = data.state;
    this.createdAt = data.createdAt;
    this.tournamentId = data.tournamentId;
    this.blindLevel = data.blindLevel;
    // 
    var player_list = [];
    for (let id in data.player_list) {
        player_list.push(new player(data.player_list[id]));
    }
    this.player_list = player_list;
    // 
    var tables = [];
    for (let id in data.tables) {
        tables.push(new table(data.tables[id]));
    }
    this.tables = tables;
    // 
    var leaderBoards = [];
    data.leaderBoard.forEach(function (element) {
        leaderBoards.push(new leaderBoard(element));
    }, this);
    this.leaderBoard = leaderBoards;
    // 
    this.inGamePlayers = data.playerRemainingRatio ? data.playerRemainingRatio.inGamePlayers : 0;
    this.registeredPlayers = data.playerRemainingRatio ? data.playerRemainingRatio.registeredPlayers : 0;
    // 
    this.playerAction = data.playerAction;
    this.totalEntryFees = data.totalEntryFees;
    this.isInBreak = data.isInBreak;
    this.breakStartTimeToDisplay = data.breakStartTimeToDisplay;
    this.breakStartTime = data.breakStartTime;
    this.breakEndTimeToDisplay = data.breakEndTimeToDisplay;
    this.breakEndTime = data.breakEndTime;
    this.blindRule = new blindRule(data.blindRule);
    this.timeBankRule = data.timeBankRule;
    this.payoutStructure = new payoutStructure(data.payoutStructure);
    this.baseTableId = data.baseTableId;
    this.currentBlindLevel = new currentBlindLevel(data.currentBlindLevel);
    this.nextBlindLevel = new currentBlindLevel(data.nextBlindLevel);
    // 
    var tablesStack = [];
    for (let id in data.tablesStack) {
        tablesStack.push(new tableStack(id, data.tablesStack[id]));
    }
    this.tablesStack = tablesStack;
    // 
    this.minStack = data.alltableStack ? data.alltableStack.minStack : 0;
    this.maxStack = data.alltableStack ? data.alltableStack.maxStack : 0;
    this.avgStack = data.alltableStack ? data.alltableStack.avgStack : 0;
    // 
    var playersChip = [];
    for (let id in data.playersChip) {
        playersChip.push(new playerChip(data.playersChip[id]));
    }
    this.playersChip = playersChip;
    // 
    var playersPayout = [];
    data.playersPayout.forEach(function (element) {
        playersPayout.push(new playerPayout(element));
    }, this);
    this.playersPayout = playersPayout;
};

module.exports = {
    Tournament: tournament,
};