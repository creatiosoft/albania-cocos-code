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
 * @class TournamentHandler
 * @classdesc Handles the communication with server in three tournaments
 * @extends TableHandler
 * @memberof Screens.Lobby.Table
 */
cc.Class({
    extends: TableHandler,

    onLoad: function () {
        window.TournamentHandler = this;
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tournamentLobby, this.onTournamentLobbyBroadcast.bind(this));
    },

    /**
    * @method registerTournament
    * @description Register for a tournament
    * @param  {object} data
    * @param {callback} callback
    * @param {callback} error
    * @param {boolean} isLate
    * @memberof Screens.Lobby.Table.TournamentHandler#
    */
    registerTournament: function (data, callback, error, isLate) {
        var tournament = new TourData(data._id, GameManager.user.playerId, data.gameVersionCount);
        if (isLate) {
            ServerCom.pomeloRequest(K.PomeloAPI.lateRegistration, tournament, callback, error, 5000, false);
        } else {
            ServerCom.pomeloRequest(K.PomeloAPI.registerTournament, tournament, callback, error, 5000, false);
        }
    },

    /**
    * @method refreshSideTable
    * @description request to get registered users for sit and go tournament
    * @param {object} data
    * @param {callback} callback
    * @param {callback} error
    * @memberof Screens.Lobby.Table.TournamentHandler#
    */
    refreshSideTable: function (data, callback, error) {
        var tableInfo = new TableInfo(GameManager.user.playerId, data._id, data.gameVersionCount);
        ServerCom.pomeloRequest(K.PomeloAPI.getUsers, tableInfo, callback, error, 5000, false);
    },
    //.playersInfo = response.result.ranks

    /**
    * @method tournamentLobbyInfo
    * @description Info for tournament lobby popup
    * @param {Object} data
    * @param {Object} callback
    * @param {} error -Describes the type of error 
    * @memberof Screens.Lobby.Table.TournamentHandler#
    */
    tournamentLobbyInfo: function (data, callback, error) {
        var inst = this;
        var lobbyInfo = new TournamentLobbyInfo(data._id, data.gameVersionCount);
        var blindPrizeInfo = null;
        // var blindPrizeInfo = (data.tournamentType == K.TournamentType.Normal || data.tournamentType == K.TournamentType.Satellite) ? this.blindAndPrizeInfoForTournament : this.blindAndPrizeInfo;
        switch (data.tournamentType) {
            case K.TournamentType.Normal:
                blindPrizeInfo = this.blindAndPrizeInfoForTournament;
                break;
            case K.TournamentType.Satellite:
                blindPrizeInfo = this.blindAndPrizeInfoForSatellite;
                break;
            case K.TournamentType.SitNGo:
                blindPrizeInfo = this.blindAndPrizeInfo;
                break;

        }
        blindPrizeInfo(data, function (newResponse) {
            if (newResponse.success) {
                ServerCom.pomeloRequest(K.PomeloAPI.getTableStructure, lobbyInfo, function (response) {
                    inst.refreshSideTable(data, function (playersResponse) {
                        data.playersInfo = playersResponse.result.ranks;
                        var newData = {
                            tableData: data,
                            lobbyInfo: response,
                            blindInfo: newResponse.result.blindRule[0] || newResponse.result.blindRule,
                        };

                        if (data.tournamentType == K.TournamentType.Normal) {
                            newData.prizeInfo = !!newResponse.result.prizeRule && !!newResponse.result.prizeRule[0] ? newResponse.result.prizeRule : [];

                        } else if (data.tournamentType == K.TournamentType.Satellite) {
                            newData.prizeInfo = {};
                            newData.prizeInfo.parentTournament = newResponse.result.parentTournament;
                            newData.prizeInfo.usersPerPrize = newResponse.result.usersPerPrize;

                        } else {
                            newData.prizeInfo = !!newResponse.result.prizeRule && !!newResponse.result.prizeRule[0] ? newResponse.result.prizeRule[0] : [];

                        }
                        newData.isPrizeDecided = (newResponse.result.isPrizeDecided !== null && newResponse.result.isPrizeDecided !== undefined) ? newResponse.result.isPrizeDecided : true;
                        callback(newData);
                    }.bind(this), null);
                    // var newData = {
                    //     tableData: data,
                    //     lobbyInfo: response,
                    //     blindInfo: newResponse.result.blindRule[0] || newResponse.result.blindRule,
                    // };
                    // if (data.tournamentType == K.TournamentType.Normal) {
                    //     newData.prizeInfo = !!newResponse.result.prizeRule && !!newResponse.result.prizeRule[0] ? newResponse.result.prizeRule : [];
                    // } else {
                    //     newData.prizeInfo = !!newResponse.result.prizeRule && !!newResponse.result.prizeRule[0] ? newResponse.result.prizeRule[0] : [];

                    // }
                    // callback(newData);
                }.bind(this), error, 5000, false, false);
            } else {
                // callback(newResponse);
            }
        }, function (err) {
        });
    },

    /**
    * @method deRegisterTournament
    * @description De-Register for a tournament
    * @param {object} data
    * @param {callback} callback
    * @param {callback} error
    * @memberof Screens.Lobby.Table.TournamentHandler# 
    */
    deRegisterTournament: function (data, callback, error) {
        // make data
        var tournament = new TourData(data._id, GameManager.user.playerId, data.gameVersionCount);
        ServerCom.pomeloRequest(K.PomeloAPI.deRegisterTournament, tournament, callback, error, 5000, false);
    },

    /**
    * @method checkRegistration
    * @description request to check if the user is registered or not
    * @param {object} data
    * @param {callback} callback
    * @param {callback} error
    * @memberof Screens.Lobby.Table.TournamentHandler#
    */
    checkRegistration: function (data, callback, error) {
        var tournament = new TourData(data._id, GameManager.user.playerId, data.gameVersionCount);
        ServerCom.pomeloRequest(K.PomeloAPI.checkRegistration, tournament, callback, error, 5000, false);
    },

    /**
    * @method blindAndPrizeInfo
    * @description Info for tournament lobby popup for blind structure 
    * @param {object} data -
    * @param {callback} callback
    * @param {callback} error
    * @memberof Screens.Lobby.Table.TournamentHandler#
    */
    blindAndPrizeInfo: function (data, callback, error) {
        var blindInfo = new blindAndPrizeData(data.blindRule, data.gameVersionCount, data.prizeRule);
        ServerCom.pomeloRequest(K.PomeloAPI.getBlindAndPrize, blindInfo, callback, error, 5000, false, false);
    },

    // blindAndPrizeInfoForTournament: function (data, callback, error) {
    //     var randomPlayers = parseInt(Math.random() * (data.maxPlayersForTournament - data.minPlayersForTournament) + data.minPlayersForTournament);
    //     var blindInfo = new blindAndPrizeTourData(data._id, randomPlayers);
    //     ServerCom.pomeloRequest(K.PomeloAPI.getBlindPrizeTournament, blindInfo, callback, error, 5000, false, false);
    // },

    /**
    * @method blindAndPrizeInfoForTournament
    * @description Info for tournament lobby popup for blind structure
    * @param {object} data 
    * @param {callback} callback
    * @param {callback} error
    * @memberof Screens.Lobby.Table.TournamentHandler#
    */
    blindAndPrizeInfoForTournament: function (data, callback, error) {
        var randomPlayers = parseInt(Math.random() * (data.maxPlayersForTournament - data.minPlayersForTournament) + data.minPlayersForTournament);
        if (!data.isLateRegistrationOpened && data.state == K.SitNGoState.RUNNING) {
            randomPlayers = data.enrolledPlayers;
        }
        var blindInfo = new blindAndPrizeTourData(data._id, randomPlayers);
        ServerCom.pomeloRequest(K.PomeloAPI.getBlindPrizeTournament, blindInfo, callback, error, 5000, false, false);
    },

    rebuyInTournament: function (data, callback, error) {
        ServerCom.pomeloRequest(K.PomeloAPI.rebuyInTournament, data, callback, error, 5000, false, false);
    },

    blindAndPrizeInfoForSatellite: function (data, callback, error) {
        var blindInfo = new blindAndPrizeSatelliteData(data._id, data.gameVersionCount);
        ServerCom.pomeloRequest(K.PomeloAPI.getBlindAndPrizeForSatellite, blindInfo, callback, error, 5000, false, false);
    },

    /**
     * @description Callback tournamentLobby Broadcast. Emits prizePoolUpdated event on TourneyTablePresenter
     * @method onTournamentLobbyBroadcast
     * @param {Object} response -holds new pool prize, type of event and tournamentId
     * @memberof Screens.Lobby.Table.TournamentHandler#
     */
    onTournamentLobbyBroadcast: function (response) {
        if(response.event == "PRIZEPOOL" && response.updated) {
            this.emit(K.LobbyEvents.prizePoolUpdated);
        }
    }

});