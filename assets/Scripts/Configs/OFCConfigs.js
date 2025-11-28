/**
 * @namespace Configs
 */

/**
 * @class OFCConfigs
 * @memberof Config
 */
var configs = null;
(function() {
    configs = Object.create(K);
    configs.PomeloAPI = {
        joinChannel: "connector.ofcHandler.ofcJoinChannel",
        autoSit: "connector.ofcHandler.ofcAutoSit",
        sitHere: "connector.ofcHandler.ofcSit",
        makeMove: "connector.ofcHandler.ofcMakeMove",
        leaveTable: "connector.ofcHandler.ofcLeaveTable",
        addChips: "connector.ofcHandler.ofcAddPointsOnTable",
        joinWaitingList: "connector.ofcHandler.ofcJoinWaitingList",
        connectionAck: "connector.entryHandler.isConnected",
        registerTournament: "connector.entryHandler.registerTournament",
        deRegisterTournament: "connector.entryHandler.deRegisterTournament",
        checkRegistration: "connector.entryHandler.isRegisteredUserInTournament",
        reportIssue: "connector.entryHandler.reportIssue",
        chatRequest: "connector.entryHandler.chat",
        getProfile: "connector.entryHandler.getProfile",
        sitOutNextHand: "connector.entryHandler.sitoutNextHand",
        sitOutNextBigBlind: "connector.entryHandler.sitoutNextBigBlind",
        resume: "connector.entryHandler.resume",
        setAutoBuyIn: "connector.entryHandler.setAutoBuyIn",
        getTableStructure: "connector.entryHandler.getTableStructure",
        getUsers: "connector.entryHandler.getRegisteredTournamentUsers",
        resetSitout: "connector.entryHandler.resetSitout",
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
        // quickSeatSitNGo: "connector.entryHandler.getQuickSeatSitNGo",
        getBlindPrizeTournament: "connector.entryHandler.getBlindAndPrizeForNormalTournament",
        setPlayerValOnTable: "connector.entryHandler.setPlayerValueOnTable",
        getFilters: "connector.entryHandler.getFilters",
        quickSeatTournament: "connector.entryHandler.quickSeatInTournament",
        quickSeatSitNGo: "connector.entryHandler.quickSeatInSitNGo",
        getHandTab: "connector.entryHandler.getHandTab",
        getHandHistory: "connector.entryHandler.getHandHistory",
        lateRegistration: "connector.entryHandler.lateRegistration",
    };

})();
module.exports = configs;