/**
 * @namespace Controllers.Tournament.TournamentLobby_TablePrefabsScripts 
 */
var RunningTableInfo = require('TournamentTableRunningTableInfo');
var SpecificTableInfo = require('TournamentTablePlayersOnTableInfo');
var PlayersInfo = require('TournamentTablePlayersInfo');
var GameData = require('ResponseTypes').GameData;
/**
 * @classdesc
 * @class TournamentLobbyTableMain
 * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts
 */
cc.Class({
    extends: cc.Component,

    properties: {
        tableData: null,
        runningInfoOddPrefab: {
            default: null,
            type: cc.Prefab,
        },
        runningInfoEvenPrefab: {
            default: null,
            type: cc.Prefab,
        },
        runningInfoGrid: {
            default: null,
            type: cc.Node
        },
        specificTableInfoOddPrefab: {
            default: null,
            type: cc.Prefab,
        },
        specificTableInfoEvenPrefab: {
            default: null,
            type: cc.Prefab,
        },
        specificTableInfoGrid: {
            default: null,
            type: cc.Node,
        },
        PlayersInfoOddPrefab: {
            default: null,
            type: cc.Prefab,
        },
        PlayersInfoEvenPrefab: {
            default: null,
            type: cc.Prefab,
        },
        PlayersInfoGrid: {
            default: null,
            type: cc.Node,
        },
        selection: -1,
        tableDataMain: null,
        cancelPopup: null,
        observeBtn: {
            default: null,
            type: cc.Button,
        },
        warningLbl: {
            default: null,
            type: cc.Label,
        },
        setPlayersRankFunc: null,
        checkData: null,
    },

    /**
     * @description This is used for intialisation
     * @method onLoad
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    onLoad: function() {
        this.setPlayersRankFunc = this.setPlayersRank1.bind(this);
        this.checkData = this.destroyData.bind(this);
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tableView, this.setPlayersRankFunc);
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tournament, this.destroyData.bind(this));
        // pomelo.on(K.LobbyBroadcastRoute.tournament, this.onPlayerShufffle.bind(this));
    },

    /**
     * @description Destroy the specified data
     * @method destroyData
     * @param {Object} data
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    destroyData: function(data) {

        if (TableContent.prevSelection && TableContent.prevSelection.channelData._id == data.tournamentId) {
            for (var i = 0; i < this.tableData.length; i++) {
                if (data.updated.channelId == this.tableData[i].channelId) {
                    this.tableData.splice(i, 1);
                    this.modifyTableData(this.tableData);
                    break;
                }
            }
        }

    },

    /**
     * @description Turn off the broadcast on player ranks
     * @method onDestroy
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    onDestroy: function() {
        pomelo.off(K.LobbyBroadcastRoute.tableView, this.setPlayersRankFunc);
    },

    /**
     * @description Updates the player ranking
     * @method setPlayersRank1
     * @param {OPbject} data
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    setPlayersRank1: function(data) {
        if (data.tournamentId == TableContent.prevSelection.channelData._id) {
            this.updateTotalPlayers(data.updated.ranks);
        }
    },

    /**
     * @description 
     * @method allowObserve
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    allowObserve: function() {
        var state = !(this.selection == -1 || this.tableDataMain.state !== K.GameState.Running);
        this.warningLbl.node.active = !state;
        if (!state && this.selection == -1 && this.tableDataMain.state === K.GameState.Running) {
            this.warningLbl.string = "No table selected";
        }
        return state;
    },

    /**
     * @description
     * @method onEnable
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    onEnable: function() {
        this.observeBtn.interactable = this.allowObserve();
    },

    /**
     * @description Sets the table data.
     * @method setTableData
     * @param {Object} data
     * @param {Object} playerRanks
     * @param {callback} cancelPopup
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    setTableData: function(data, playerRanks, tableData, cancelPopup) {
        // this.runningInfoGrid.removeAllChildren();
        this.tableDataMain = tableData;
        this.cancelPopup = cancelPopup;
        this.updateTotalPlayers(playerRanks);
        this.tableData = data;
        this.modifyTableData(data);


    },

    /**
     * @description 
     * @method onPlayerShufffle
     * @param {Object} data
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    onPlayerShufffle: function(data) {
        var channelIdx, playerIdx, toChannelIdx = -1;
        if (TableContent.prevSelection && TableContent.prevSelection.channelData._id == data.tournamentId) {
            for (var i = 0; i < this.tableData.length; i++) {
                if (data.updated.fromChannelId == this.tableData[i].channelId) {
                    channelIdx = i;
                    for (var j = 0; j < this.tableData[i].players.length; j++) {
                        if (data.updated.playerId == this.tableData[i].players[j].channelId) {
                            playerIdx = j;
                            break;
                        }
                    }
                } else if (data.updated.toChannelId == this.tableData[i].channelId) {
                    toChannelIdx = i;
                }
            }

            if (channelIdx >= 0 && toChannelIdx >= 0 && playerIdx >= 0) {
                this.tableData[toChannelIdx].players.push(this.tableData[channelIdx].players[playerIdx]);
                this.tableData[channelIdx].players.splice(playerIdx, 1);
                this.modifyTableData(this.tableData);
            }
        }
    },


    /**
     * @description 
     * @method modifyTableData
     * @param {Object} data
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    modifyTableData: function(data) {
        GameManager.removeAllChildren(this.runningInfoGrid);
        var selected = 0;
        for (var i = 0; i < data.length; i++) {
            if (this.selection == data[i].channelId) {
                selected = i;
            }
            if (data[i].players.length !== 0) {
                var obj = null;
                if (i % 2 == 0) {
                    obj = cc.instantiate(this.runningInfoEvenPrefab);
                } else {
                    obj = cc.instantiate(this.runningInfoOddPrefab);
                }
                //var obj = cc.instantiate(this.runningInfoPrefab);
                this.runningInfoGrid.addChild(obj);
                obj.getComponent(RunningTableInfo).setValues(data[i], i);
                obj.getComponent(RunningTableInfo).callback = this.updateTableDetails.bind(this);
            }
        }
        if (data.length > 0) {
            this.runningInfoGrid.children[selected].getComponent(RunningTableInfo).onClick();
        }
    },

    /**
     * @description
     * @method updateTableDetails
     * @param {Object} players
     * @param {Number} id
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    updateTableDetails: function(players, id) {
        this.selection = id;
        this.removePrevSelection(id);
        this.observeBtn.interactable = this.allowObserve();
        // this.specificTableInfoGrid.removeAllChildren();
        GameManager.removeAllChildren(this.specificTableInfoGrid);
        for (var i = 0; i < players.length; i++) {
            var obj = null;
            if (i % 2 == 0) {
                obj = cc.instantiate(this.specificTableInfoEvenPrefab);
            } else {
                obj = cc.instantiate(this.specificTableInfoOddPrefab);
            }
            // var obj = cc.instantiate(this.specificTableInfoPrefab);
            this.specificTableInfoGrid.addChild(obj);
            obj.getComponent(SpecificTableInfo).setValues(players[i], id);
        }
    },

    /**
     * @description
     * @method removePrevSelection
     * @param {Number} id
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    removePrevSelection: function(id) {
        for (var i = 0; i < this.runningInfoGrid.children.length; i++) {
            var component = this.runningInfoGrid.children[i].getComponent(RunningTableInfo);
            if (component.id !== id) {
                component.removeSelection();
            }
        }
    },

    /**
     * @description Updates total number of player
     * @method updateTotalPlayers
     * @param {Obejct} players
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    updateTotalPlayers: function(players) {
        // this.PlayersInfoGrid.removeAllChildren();
        GameManager.removeAllChildren(this.PlayersInfoGrid);

        for (var i = 0; i < players.length; i++) {
            var obj = null;
            if (i % 2 == 0) {
                obj = cc.instantiate(this.PlayersInfoEvenPrefab);
            } else {
                obj = cc.instantiate(this.PlayersInfoOddPrefab);
            }
            //  var obj = cc.instantiate(this.PlayersInfoPrefab);
            this.PlayersInfoGrid.addChild(obj);
            obj.getComponent(PlayersInfo).setValues(players[i]);
        }

    },

    /**
     * @description Handles Observe Button in tournament lobby  
     * @method observeTable
     * @memberof Controllers.Tournament.TournamentLobby_TablePrefabsScripts.TournamentLobbyTableMain#
     */
    observeTable: function() {
        if (this.selection == -1 || this.tableDataMain.state !== K.GameState.Running) {
            return;
        }
        var data = this.tableData;
        var channel = {};
        channel.channelId = data[this.selection].channelId;
        channel.channelType = "TOURNAMENT";
        channel.tableId = "";
        channel.isRequested = true;
        if (GameManager.join(channel.channelId, K.PomeloAPI.joinChannel, channel)) {
            this.cancelPopup();
        }
    },
});