var TableHandler = require('TableHandler');
var TourData = require('PostTypes').Tournament;
var GameData = require('ResponseTypes').GameData;
var joinChannel = require('PostTypes').JoinChannel;
var TableInfo = require('PostTypes').GetRegisteredUsersData;
var TournamentLobbyInfo = require('PostTypes').GetTournamentLobbyInfo;
var blindAndPrizeData = require('PostTypes').BlindAndPrize;
var blindAndPrizeTourData = require('PostTypes').BlindAndPrizeTournament;
var blindAndPrizeSatelliteData = require('PostTypes').BlindAndPrizeSatellite;
/**
 * @class TournamentLobbyHandler
 * @classdesc Handles the communication with server in three tournaments
 * @extends TableHandler
 * @memberof Screens.Lobby.Table
 */
cc.Class({
    extends: TableHandler,

    onLoad: function () {
        window.TournamentLobbyHandler = this;
    },

    init:function() {
        console.log("init");
    },

    requestTableLobbyList: function(data, callback, error) {
        ServerCom.socketIORequest(K.SocketIOAPI.Lobby.GetAllTableList, data, callback, error, null, false);
    },

    requestTournamentLobbyList: function(data, callback, error) {
        ServerCom.socketIORequest(K.SocketIOAPI.Lobby.GetAllTournamentList, data, callback, error, null, false);
    },

    requestTournamentFreeRoll: function(data, callback, error) {
        ServerCom.socketIORequest(K.SocketIOAPI.Lobby.GetAllTournamentList, {isFreeRoll: true}, callback, error, null, false);
    },

    requestTournamentSitAndGoStages: function(data, callback, error) {
        ServerCom.socketIORequest(K.SocketIOAPI.Lobby.GetSitNGoStages, data, callback, error, null, false);
    },

    requestTournamentSitAndGoInStage: function(data, callback, error) {
        ServerCom.socketIORequest(K.SocketIOAPI.Lobby.GetSitNGoTournamentsInStage, data, callback, error, null, false);
    },

    requestTournamentSitAndGoRegister: function(data, callback, error) {
        // ServerCom.forceKeepLoading = true;
        ServerCom.socketIORequest(K.SocketIOAPI.Lobby.RegisterSNG, data, callback, error, null, false, true);
    },

    requestTournamentRegister: function(data, callback, error) {
        // ServerCom.forceKeepLoading = true;
        ServerCom.socketIORequest(K.SocketIOAPI.Lobby.RegisterTournament, data, callback, error, null, false, true);
    },

    requestTournamentDeRegister: function(data, callback, error) {
        ServerCom.socketIORequest(K.SocketIOAPI.Lobby.DeRegisterTournament, data, callback, error, null, false, true);
    },

    requestTournamentLateRegister: function(data, callback, error) {
        ServerCom.socketIORequest(K.SocketIOAPI.Lobby.LateRegisterTournament, data, callback, error);
    },

    requestTournamentJoinTable: function(data, callback, error) {
        ServerCom.socketIORequest(K.SocketIOAPI.Lobby.TournamentJoinTable, data, callback, error);
    },

    requestTournamentEnterTable: function(data, callback, error, label = "") {
        ServerCom.forceKeepLoading = true;
        ServerCom.socketIORequest(K.SocketIOAPI.Lobby.TournamentEnterTable, data, callback, error, null, true, true, label);
    },

    requestTournamentReEntry: function(data, callback, error) {
        ServerCom.socketIORequest(K.SocketIOAPI.Lobby.ReEntryTournament, data, callback, error);
    },

    requestTournamentData: function(data, callback, error) {
        ServerCom.socketIORequest("tournamentLobbyEvent|GetTournamentData", data, callback, error, null, false);
    },

});