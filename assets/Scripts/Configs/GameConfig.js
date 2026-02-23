/**
 * @namespace Configs
 */

/**
 * @class GameConfig
 * @memberof Configs
 */

/** 
 * @alias window
 * @name root
 * @memberof Configs.GameConfig#
 */
var root = window;
console.log = function () {};
cc.log = function () {};

root.K = {};

/**
 * @description  Move Display Time 
 * @name moveDisplayTime
 * @memberof Configs.GameConfig#
 */
root.K.moveDisplayTime = 2500;

/** 
 * @description Player is allowed to join more than one table or not
 * @name  multiTableJoin
 * @memberof Configs.GameConfig#
 */
root.K.multiTableJoin = true;

root.K.disconnectRequestedByPlayer = false;
root.K.internetAvailable = true;

root.K.disconnectMultiLogin = false;

/** 
 * @description Maximum tables a player can join on desktop 
 * @name MaxTableCount
 * @memberof Configs.GameConfig#
 * */
root.K.MaxTableCount = 4;

/** 
 * @description Maximum tables a player can join on mobile 
 * @name MaxTableCountInMobile
 * @memberof Configs.GameConfig#
 * */
root.K.MaxTableCountInMobile = 2;

root.K.TestingBuildVersion = "web-31.3.1(IP-77)PC_LOCAL"; // NAme of the Build Goes Here(for Local Build Testing Version Tacking)

/**
 * @enum {Number} Represents possible errors in the game
 * @name Error
 * @memberof Configs.GameConfig#
 */
root.K.Error = cc.Enum({
    TimeOutError: 504,
    ConnectionError: 444,
    SuccessFalseError: 454,
    KeyMissingBroadcasts: 1001,
    ServerDown: 3001,
    PlayerSessionShiftedOnServer: 5001,
    FeatureComingSoon: 5010,
    UpdateAvailable: 5011,
    SessionError: 5015,

});

/**
 * @enum {Number|String} Represents different types of Games
 * @name ChannelVariation
 * @memberof Configs.GameConfig#
 */
root.K.Variation = cc.Enum({
    None: -1,
    TexasHoldem: "Texas Hold’em",
    Omaha: "Omaha",
    OmahaHiLo: "Omaha Hi-Lo",
    OpenFaceChinesePoker: "Open Face Chinese Poker",
    All: "All"
});

/**
 * @description Represents types of channels
 * @name ChannelType
 * @memberof Configs.GameConfig#
 */
root.K.ChannelType = {
    Normal: "NORMAL",
    Tournament: "TOURNAMENT"
};

/**
 * @description Represents types of tournament
 * @name TournamentType
 * @memberof Configs.GameConfig#
 */
root.K.TournamentType = {
    Normal: "NORMAL",
    SitNGo: "SIT N GO",
    Satellite: "SATELLITE",
};

// /**
//  * @deprecated
//  */
// root.K.RoundNames = cc.Enum({
//     ONE: 0,
//     TWO: 1,
//     THREE: 2,
//     FOUR: 3,
//     FIVE: 4,
// });

/**
 * @description Represents different rounds in a Game
 * @name RoundNames
 * @memberof Configs.GameConfig#
 */
root.K.RoundNames = {
    one: "ONE",
    two: "TWO",
    three: "THREE",
    four: "FOUR",
    five: "FIVE",
    finished: "FINISHED",
};

/**
 * @description Mapping String value to number
 * @name RoundToCards
 * @memberof Configs.GameConfig#
 */
root.K.RoundToCards = {};
root.K.RoundToCards[root.K.RoundNames.one] = 0;
root.K.RoundToCards[root.K.RoundNames.two] = 1;
root.K.RoundToCards[root.K.RoundNames.three] = 2;
root.K.RoundToCards[root.K.RoundNames.four] = 3;
root.K.RoundToCards[root.K.RoundNames.five] = 4;

/**
 * @description Represents card colors
 * @name CardColoring
 * @memberof Configs.GameConfig#
 */
root.K.CardColoring = {
    TwoCardColor: "TwoCardColor",
    FourCardColor: "FourCardColor"
};

/**
 * @enum {String} Represents type of Game
 * @name GameType
 * @memberof Configs.GameConfig#
 */
root.K.GameType = cc.Enum({
    None: -1,
    CashGames: 1,
    SitAndGo: 2,
    Tournaments: 3,
});

/**
 * @enum {String} Represents type of Game
 * @name ScreenEnum
 * @memberof Configs.GameConfig#
 */
root.K.ScreenEnum = new cc.Enum({
    SplashScreen: 0,
    SignupScreen: 1,
    LoginScreen: 2,
    LobbyScreen: 3,
    GamePlayScreen: 4,
    ForgotPasswordScreen: 5,
    None: 100
});

/**
 * @description Represents state of a seat
 * @name SeatState
 * @memberof Configs.GameConfig#
 */
root.K.SeatState = {
    Free: "Free",
    Occupied: "Occupied",
    Hidden: "Hidden",
    Closed: "Closed",
};

/**
 * @description Represents state of a player
 * @name PlayerState
 * @memberof Configs.GameConfig#
 */
root.K.PlayerState = {
    None: "",
    Waiting: "WAITING",
    Playing: "PLAYING",
    OutOfMoney: "OUTOFMONEY",
    OnBreak: "ONBREAK",
    Disconnected: "DISCONNECTED",
    Left: "ONLEAVE",
    AllIn: "ALLIN",
    Fold: "FOLD",
    Reserved: "RESERVED",
    Rebuy: "REBUYING",
};

/**
 * @description Represents state of a game
 * @name GameState
 * @memberof Configs.GameConfig#
 */
root.K.GameState = {
    Idle: "IDLE",
    Running: "RUNNING",
    GameOver: "GAMEOVER",
};

/**
 * @description Represents Player moves
 * @name PlayerMove
 * @memberof Configs.GameConfig#
 */
root.K.PlayerMove = {
    Check: "CHECK",
    Call: "CALL",
    Bet: "BET",
    Raise: "RAISE",
    AllIn: "ALLIN",
    Fold: "FOLD",
};

/**
 * @description Represents the different ways a game can end
 * @name GameEndType
 * @memberof Configs.GameConfig#
 */
root.K.GameEndType = {
    GameCompleted: "GAMECOMPLETED",
    EverybodyPacked: "EVERYBODYPACKED",
    OnePlayerLeft: "ONLYONEPLAYERLEFT",
};

/**
 * @description Holds round names in a Game
 * @name Round
 * @memberof Configs.GameConfig#
 */
root.K.Round = {
    Preflop: "PREFLOP",
    Flop: "FLOP",
    Turn: "TURN",
    River: "RIVER",
    Showdown: "SHOWDOWN",
};

/**
 * @description Represents events related to lobby
 * @name LobbyEvents
 * @memberof Configs.GameConfig#
 */
root.K.LobbyEvents = {
    gameTypeFilterChanged: "gameTypeFilterChanged",
    maxPlayersFilter: "maxPlayersFilter",
    stakesFilterChanged: "stakesFilterChanged",
    joinTableListChanged: "joinTableListChanged",
    tableUpdated: "tableUpdated",
    sideTableUpdated: "sideTableUpdated",
    //rr
    prizePoolUpdated: "prizePoolUpdated",
};

/**
 * @description Represents generic events of the game
 * @name GameEvents
 * @memberof Configs.GameConfig#
 */
root.K.GameEvents = {
    OnTableClosed: "TableClosed",
    OnAvatarChange: "AvatarChanged",
    OnTableColorChange: "TableColorChanged",
    onReset: "onReset",
};

/**
 * @description Represents events related to a running game
 * @name PokerEvents
 * @memberof Configs.GameConfig#
 */
root.K.PokerEvents = {
    OnJoin: "OnJoin",
    OnHoleCard: "HoleCard",
    OnPlayerCard: "PlayerCard",
    // OnRevealPlayerCard: "RevealPlayerCard",
    OnSit: "Sit",
    OnBlindDeduction: "BlindDeduction",
    OnGamePlayers: "GamePlayers",
    OnPlayerStateChange: "PlayerStateChange",
    OnDealerChat: "DealerChat",
    OnStartGame: "StartGame",
    OnTurn: "Turn",
    OnRoundOver: "RoundOver",
    OnGameOver: "GameOver",
    OnLeave: "Leave",
    OnChat: "Chat",
    onPlayerStandUp: "StandUp",
    onTimerTick: "TimerTick",
    onTableTabSelected: "TableTabSelected",
    onRotateView: "RotateView",
    onTurnInOtherRoom: "TurnInOtherRoom",
    // onResetView: "ResetView",
    OnClearHoleCards: "ClearHoleCards",
    onPreCheck: "onPreCheck",
    onSitnGoElimination: "sgoEliminated",
    onPlayerCoins: "onPlayerCoins",
    onDealerChatSettingsChanged: "onDealerChatSettingsChanged",
    onChatSettingsChanged: "onChatSettingsChanged",
    onBlindsChanged: "onBlindsChanged",
    onAddonChanged: "onAddonChanged",
    //   on
    OnBankrupt: "OnBankrupt",
    onPlayerNotes: "onPlayerNotes",
    onHandTab: "onHandTab",
    onGameStateChange: "onGameStateChanged",
    onBreakTime: "onbreakTime",
    onBreakTimeStart: "onBreakTimeStart",
    onOfcFirstRoundCards: "onOfcFirstRoundCards",
    onRebuyStatus: "onRebuyStatus",
    onBestHand: "onBestHand",
    onTimeBank: "startTimeBank",
    onCardColorChange: "CardColorChanged",
    onChannelEvent: "onChannelEvent",
    //tournament specific
    onAddonTimeStart: "onAddonTimeStart",
    onAddonTimeEnd: "onAddonTimeEnd",
    onAddonCheckBox: "onAddonCheckBox",
    onRebuyCheckBox: "onRebuyCheckBox",
    // onRebuyTimeEnds:"onRebuyTimeEnds",
    // onRebuyTimeStarts:"onRebuyTimeStarts",  
    onBreakTimeEnd: "onBreakTimeEnd",
    onPlayerRankChange: "onPlayerRankChange",
    onBlindsChangeStopped: "onBlindsChangeStopped",
    // sendSticker
    onSendSticker: "onSendSticker",    
};

/**
 * @description Represents States of Normal Tournament
 * @name TournamentState
 * @memberof Configs.GameConfig#
 */
root.K.TournamentState = {
    Upcoming: "UPCOMING",
    Register: "REGISTER",
    Running: "RUNNING",
    Finished: "FINISHED",
    Cancelled: "CANCELLED",
};

/**
 * @description Represents Tournament Event
 * @name TournamentEvents
 * @memberof Configs.GameConfig#
 */
root.K.TournamentEvents = {
    OnTournamentStart: "TournamentStart"
};
/**
 * @description Represents Sit N Go Tournament Events
 * @name SitNGoEvents
 * @memberof Configs.GameConfig#
 */
root.K.SitNGoEvents = {
    OnSitNGoTournamentStart: "SitNGoTournamentStart"
};

/**
 * @description Represents states in SitNGo Tournament
 * @name SintNGoState
 * @memberof Configs.GameConfig#
 */
root.K.SitNGoState = {
    RUNNING: "RUNNING",
    REGISTER: "REGISTER",
    FINISHED: "FINISHED",
    UPCOMING: "UPCOMING",
};

/**
 * @description Represents suit of card
 * @name Suit
 * @memberof Configs.GameConfig#
 */
root.K.Suit = cc.Enum({
    Spade: 1,
    Heart: 2,
    Club: 3,
    Diamond: 4,
});
root.useAnalytics = !true;
root.K.ServerAddress = {

    ipAddress: "https://connector.alb.poker",
    gameServer: "https://connector.alb.poker",
    gamePort: 443,
    maintainanceIP: "https://maintenance-dashboard-api.alb.poker",
    maintainancePort: 443,
    port: 443,
    wss: true,
    clientVer: "1.0",
    pokerVer: "0.0",
    assets_server: "https://auth-api.alb.poker/api/wpoker",
    assets_server_s: "https://albaniapoker-prod-assets.s3.us-east-1.amazonaws.com",
    otp_server: "",
    ads_server: ""
};

root.K.Token = {
    auth_server: "https://auth-api.alb.poker",
    auth_refresh_server: "",
    access_token: "",
    refresh_token: "",
    access_token_expire_at: 0,
    refresh_token_expire_at: 0
};

root.K.PORTRAIT = true;

/**
 * @description Server APIs
 * @name ServerAPI
 * @memberof Configs.GameConfig#
 */
root.K.ServerAPI = {
    maintainance: "/maintainanceAndUpdate",
    freeChips: "/collectFreeChips",
    forgotPassword: "/forgotPassword",
    resetPassword: "/resetPassword",
    emailVerification: "/resendEmailVerificationLink",
    requestOTP: "/sendOtp",
    verifyOTP: "/verifyOtp",
    transactionHistory: "/getTransactionHistory",
    wallet: "/getWalletInfo",
    imageUpload: "/profileImage",
    sendotp: "/sendOtpSignUP",
    forgotPassword: "/forgotPasswordUser",
};

/**
 * @description Represents sound effects played on user related events
 * @name Sounds
 * @memberof Configs.GameConfig#
 */
root.K.Sounds = {
    // gameEnd: 1,
    // playerAllIn: 2,
    // playerTurn: 3,
    // potChipTravel: 4,
    // playerCall: 5,
    // playerCheck: 6,
    // playerWin: 7,
    click: 13,
    // otherFold: 9,
    // playerRaise: 10,
    // playerFold: 11,
    // warning: 12,
    // playerBet: 13,
    // cardOpening: 14,
    // chipDistribution: 15,
    userTurn: 0,
    playerBet: 1,
    playerRaise: 2,
    playerAllIn: 3,
    playerCall: 4,
    playerFold: 5,
    endTimer: 6,
    cardOpening: 7,
    chipDistribution: 8,
    playerCheck: 9,
    playerCardFlip: 10,
    playerCardFlipSound: 11,
    turnSoundTopBar: 12,


};

/**
 * @description Represents Pomelo APIs
 * @name PomeloAPI
 * @memberof Configs.GameConfig#
 */
root.K.PomeloAPI = {
    gateLogin: "gate.gateHandler.getConnector",
    checkForMultiClient: "connector.entryHandler.enter",
    updateProfile: "connector.entryHandler.updateProfile",
    getTables: "connector.entryHandler.getLobbyTables",
    joinChannel: "room.channelHandler.joinChannel",
    autoSit: "room.channelHandler.autoSit",
    sitHere: "room.channelHandler.sitHere",
    makeMove: "room.channelHandler.makeMove",
    leaveTable: "room.channelHandler.leaveTable",
    connectionAck: "connector.entryHandler.isConnected",
    registerTournament: "connector.entryHandler.registerTournament",
    deRegisterTournament: "connector.entryHandler.deRegisterTournament",
    checkRegistration: "connector.entryHandler.isRegisteredUserInTournament",
    reportIssue: "connector.entryHandler.reportIssue",
    chatRequest: "room.channelHandler.chat",
    getProfile: "connector.entryHandler.getProfile",
    sitOutNextHand: "room.channelHandler.sitoutNextHand",
    sitOutNextBigBlind: "connector.entryHandler.sitoutNextBigBlind",
    addChips: "room.channelHandler.addChipsOnTable",
    resume: "room.channelHandler.resume",
    setAutoBuyIn: "connector.entryHandler.setAutoBuyIn",
    getTableStructure: "connector.entryHandler.getTableStructure",
    getUsers: "connector.entryHandler.getRegisteredTournamentUsers",
    resetSitout: "room.channelHandler.resetSitout",
    joinSimilar: "connector.entryHandler.joinSimilarTable",
    getBlindAndPrize: "connector.entryHandler.getBlindAndPrize",
    setFavTable: "connector.entryHandler.addFavourateTable",
    removeFavTable: "connector.entryHandler.removeFavourateTable",
    quickSeatCash: "connector.entryHandler.quickSeat",
    getPrizes: "connector.entryHandler.getPlayerPrize",
    collectPrize: "connector.entryHandler.collectPrize",
    getTableData: "connector.entryHandler.getTable",
    createNote: "connector.entryHandler.createNotes",
    getNote: "connector.entryHandler.getNotes",
    updateNote: "connector.entryHandler.updateNotes",
    deleteNote: "connector.entryHandler.deleteNotes",
    getBlindPrizeTournament: "connector.entryHandler.getBlindAndPrizeForNormalTournament",
    setPlayerValOnTable: "connector.entryHandler.setPlayerValueOnTable",
    getFilters: "connector.entryHandler.getFilters",
    quickSeatTournament: "connector.entryHandler.quickSeatInTournament",
    quickSeatSitNGo: "connector.entryHandler.quickSeatInSitNGo",
    getHandTab: "connector.entryHandler.getHandTab",
    getHandHistory: "connector.entryHandler.getHandHistory",
    lateRegistration: "connector.entryHandler.lateRegistration",
    joinWaitingList: "room.channelHandler.joinWaitingList",
    unJoinWaitingList: "room.channelHandler.leaveWaitingList",
    saveVideo: "room.channelHandler.insertVideoLog",
    getVideo: "room.channelHandler.getVideo",
    rebuyInTournament: "connector.entryHandler.rebuyInTournament",
    logout: "connector.entryHandler.logout",
    singleLogin: "connector.entryHandler.singleLogin",
    connectionAck2: "connector.entryHandler.acknowledgeIsConnected",
    getBlindAndPrizeForSatellite: "connector.entryHandler.getBlindAndPrizeForSatelliteTournament",
    updateTableSettings: "connector.entryHandler.updateTableSettings",
    fireChannelEvent: "room.channelHandler.channelBroadcast",
    //tournament
    addon: " connector.entryHandler.addOnInTournament",
    updateAutoRebuy: "connector.entryHandler.updateAutoRebuy",
    updateAutoAddon: "connector.entryHandler.updateAutoAddon",
    doubleRebuy: "connector.entryHandler.doubleRebuyInTournament",
    leaveTourney: "connector.entryHandler.leaveTournament",
    getCashDetails: "connector.entryHandler.getCashDetails",
    cashoutRequest: "connector.entryHandler.cashOutForPlayerAffilate",

    updatePreCheckOnServer: "room.channelHandler.updatePrecheck",
    
    //Free Roll API
    getFreeRollTables : "freeRoom.freeRollChannelHandler.getLobbyDetailsFreeRoll",
    getChannelId: "freeRoom.freeRollChannelHandler.getChannelId",
    joinFreeRoll : "freeRoom.freeRollChannelHandler.joinChannel",
    // sticker
    sendSticker: "room.channelHandler.sendSticker",    
};

root.K.BuddyAPI = {
    sendFriendRequest: "buddy.buddyHandler.sendFriendRequest",
    getFriendRequests: "buddy.buddyHandler.getFriendRequests",
    acceptFriendRequest: "buddy.buddyHandler.acceptFriendRequest",
    rejectFriendRequest: "buddy.buddyHandler.rejectFriendRequest",
    searchPlayer: "buddy.buddyHandler.searchPlayer",
    getFriendList: "buddy.buddyHandler.getFriendList",
    removeFriend: "buddy.buddyHandler.removeFriend",
    playWithFriend: "buddy.buddyHandler.playWithFriend",
}

root.K.BuddyBroadcast = {
    friendRequestReceived: "friendRequestReceived",
    playRequestReceived: "playRequestReceived"
};

/**
 * @description Broadcast Route for Tournament Game
 * @memberof Configs.GameConfig#
 * @name TournamentBroadcastRoute
 */
root.K.TournamentBroadcastRoute = {
    tournamentGameStart: "tournamentGameStart"
};


root.K.SocketIOAPI = {
    Lobby: {
        GetAllTableList: "tournamentListEvent|GetAllTableList",
        GetAllTournamentList: "tournamentListEvent|GetAllTournamentList",
        GetSitNGoStages: "tournamentListEvent|GetSitNGoStages",
        GetSitNGoTournamentsInStage: "tournamentListEvent|GetSitNGoTournamentsInStage",
        RegisterSNG: "tournamentLobbyEvent|RegisterSNG",
        RegisterTournament: "tournamentLobbyEvent|Register",
        ReEntryTournament: "tournamentLobbyEvent|ReEntry",
        DeRegisterTournament: "tournamentLobbyEvent|Deregister",
        LateRegisterTournament: "tournamentLobbyEvent|LateRegister",
        TournamentJoinTable: "tournamentGameEvent|joinTable",
        TournamentEnterTable: "tournamentGameEvent|enterTable"
    },
    Game: {
        TournamentResume: "tournamentGameEvent|resume",
        TournamentMakeMove: "tournamentGameEvent|makeMove",
        TournamentPreAction: "tournamentGameEvent|preCheck",
        TournamentChat: "tournamentGameEvent|chat",
        TournamentSitOut: "tournamentGameEvent|sitOut",
        TournamentResetSitout: "tournamentGameEvent|resetSitout",
        TournamentBestHands: "tournamentGameEvent|bestHands",
        TournamentFire: "tournamentGameEvent|channelBroadcast",
    }
};

root.K.SocketIOBroadcast = {
    Lobby: {
        TournamentList: "tournamentListResponseEvent",
        TournamentLobbyEvent: "tournamentLobbyEvent",
        TournamentUpdated: "Tournament:Update",
        TournamentRefresh: "Tournament:Refresh",
        TournamentClosed: "Tournament:Closed",
        TournamentBroadcast: "TournamentBroadcast",
        TournamentLobbyResponseEvent: "tournamentLobbyResponseEvent",
        TournamentNewTable: "<TournamentId>:NewTable:<PlayerId>",
        TournamentElimination: "<TournamentId>:Elimination:<PlayerId>",
        // tournamentWinner

    },
    Game: {
        
    }
};

root.K.SocketIOEvent = {
    Lobby: {
        TournamentSelect: "TournamentSelect"
    },
    Game: {
        Eliminated: "Eliminated",
        TournamentWinner: "TournamentWinner",
        BreakTime: "BreakTime",
        TournamentUpdated: "TournamentUpdated",
        TournamentClosed: "TournamentClosed",
        TableDestroyed: "TableDestroyed",
        DisconnectTime: "DisconnectTime",
    }
};

/**
 * @description Broadcast Routes for Tournament Lobby events
 * @memberof Configs.GameConfig#
 * @name LobbyBroadcastRoute
 */
root.K.LobbyBroadcastRoute = {
    tableUpdate: "tableUpdate",
    tableView: "tableView",
    joinTableList: "joinTableList",
    updateProfile: "updateProfile",
    removeTable: "removeTable",
    addTable: "addTable",
    tournamentRoomChange: "tournamentRoomChange",
    tournamentTableUpdate: "tournamentTableUpdate",
    tournamentStateChange: "tournamentStateChange",
    tournamentRankUpdate: "tournamentRankUpdate",
    blindUpdated: "blindUpdated",
    tournamentLobby: "tournamentLobby",
    //prizePoolUpdate: "prizePoolUpdate",
    updateMegaPoints: "megaPoints",
    profileImageUpdated: "imageUpload",
};

/**
 * @description Broadcast Routes for gameplay
 * @memberof Configs.GameConfig#
 * @name BroadcastRoute
 */
root.K.BroadcastRoute = {
    sit: "sit",
    blindDeduction: "blindDeduction",
    gamePlayers: "gamePlayers",
    dealerrChat: "delaerChat",
    startGame: "startGame",
    turn: "turn",
    roundOver: "roundOver",
    gameOver: "gameOver",
    leave: "leave",
    chat: "chat",
    playerCards: "playerCards",
    playerState: "playerState",
    connectionAck: "connectionAck",
    preCheck: "preCheck",
    playerElimination: "playerElimination",
    playerCoins: "playerCoins",
    playerNewChannel: "playerNewChannelBroadcast",
    bankrupt: "bankrupt",
    avatarChange: "avatarChanged",
    autoJoinBroadcast: "autoJoinBroadcast",
    handTab: "handTab",
    breakTimerStart: "breakTimerStart",
    breakTime: "breakTime",
    ofcFirstRoundCards: "ofcFirstRoundCards",
    rebuyStatus: "rebuyStatus",
    bestHands: "bestHands",
    onTimeBank: "startTimeBank",
    onOnlinePlayers: "onlinePlayers",
    onFireEvent: "fireEvent",
    //tournament RR
    updateBlind: "updateBlind",
    addonTimeStarts: "addonTimeStarts",
    addonTimeEnds: "addonTimeEnds",
    //rebuyTimeEnds: "rebuyTimeEnds"
    antiBankingUpdatedData: "antiBankingUpdatedData",
    sendSticker: "sendSticker",    
    // 
    eliminated: "eliminated",
    tournamentWinner: "tournamentWinner",
};

/**
 * @description Broadcaste Route for player
 * @memberof Configs.GameConfig#
 * @name PlayerBroadcastRoute
 */
root.K.PlayerBroadcastRoute = {
    playerInfo: "playerInfo",
    connectionAck2: "isConnectedOnLogin",
};

/**
 * @description Application Version
 * @name AppVersion
 * @memberof Configs.GameConfig#
 */
root.K.AppVersion = {
    appVersion: "1.14",
};

/**
 * @description Data that maybe stored on a system
 * @name SystemStorageKeys
 * @memberof Configs.GameConfig
 */
root.K.SystemStorageKeys = {
    userId: "userId",
    password: "password",
    rememberMePreference: "rememberMePreference",
};

root.K.GoToTable = false;

root.K.PPC = true;

module.exports = {
    K: K,
}

