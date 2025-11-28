var Emitter = require('EventEmitter');
var tableFilter = require('PostTypes').TableFilter;
var GameData = require('ResponseTypes').GameData;
var TableContent = require('TableContent');
var FavTable = require('PostTypes').FavTableData;
var OpenTable = require('PostTypes').OpenTable;
var RemoveFavTable = require('PostTypes').RemoveFavTableData;

/**
 * @class TableHandler
 * @classdesc Handler for Table data maintain the recored of joinTableList, sorting and filtering methods
 * @extends EventEmitter
 * @memberof Screens.Lobby.Table
 */
cc.Class({
    extends: Emitter,

    properties: {

        joinTableList: []
    },

    onLoad: function () {
        window.TableHandler = this;
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.joinTableList, this.onJoinTableList.bind(this));
    },

    /**
     * @method onJoinTableList
     * @description Broadcast callback
     * @param {object} data
     * @memberof Screens.Lobby.Table.TableHandler#
     */
    onJoinTableList: function (data) {

        var roomIdx = this.joinTableList.indexOf(data.channelId);
        if (data.event == "PLAYERJOINTABLE") {
            if (roomIdx == -1) {
                this.joinTableList.push(data.channelId);
            }
        } else if (data.event == "PLAYERLEAVETABLE") {
            if (roomIdx !== -1) {
                this.joinTableList.splice(roomIdx, 1);
            }
        }
    },

    /**
     * @method getTableData
     * @description Get table datas from the server based on filter
     * @param {boolean} money 
     * @param {String} filter
     * @param {callback} callback
     * @param {String} channel
     * @memberof Screens.Lobby.Table.TableHandler#
     */
    getTableData: function (money, filter, blindsType, callback, channel) {
        var data = tableFilter;
        data.isRealMoney = true;
        data.channelVariation = filter;
        data.isLoggedIn = true;
        data.access_token = K.Token.access_token;
        // var value = this.getFilter(filter);
        // if (value !== "") {
        //     data.channelVariation = "All";
        // }
        // if (arguments.length > 3 && !!channel) {
        //     data.channelType = channel;
        // } else {
        //     if (data.channelType) {
        //         delete data.channelType;
        //     }
        // }
        data.isPracticeGame = true;
        data.blindsType = blindsType; //: "Low" // Low, Mid, High
        data.playerId = GameManager.user.playerId;
        ServerCom.pomeloRequest(K.PomeloAPI.getTables, data, callback, null, 5000, false);
    },

    getTableData2: function (roomId, filter, callback) {
        ServerCom.pomeloRequest("connector.entryHandler.getTableByRoomId", {
            isRealMoney: true,
            channelVariation: "All",
            playerId: GameManager.user.playerId,
            isLoggedIn: true,
            access_token: K.Token.access_token,
            roomId: roomId
        }, callback, null, 5000, false);
    },

    /**
     * @method getFilter
     * @description Returns filter based on variation(enum)
     * @param {String} variation - Channel Variation
     * @memberof Screens.Lobby.Table.TableHandler#
     */
    getFilter: function (variation) {
        return variation;
    },

    /**
     * @method sort
     * @description Sorting algo using js arrays
     * @param {string} field -Field to sort
     * @param {boolean} reverse -Order of sorting
     * @param {object} primer - convert  to integer datatype
     * @memberof Screens.Lobby.Table.TableHandler#
     */
    sort: function (field, reverse, primer) {
        var key = primer ?
            function (x) {
                return primer(x[field])
            } :
            function (x) {
                return x[field]
            };
        reverse = !reverse ? 1 : -1;
        // comparer function
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },

    /**
     * @method sortByString
     * @description Sort JSON object array using any one of it's key - string case insensitive
     * @param {Object} contents
     * @param {boolean} reverse
     * @param {String} key -value to sort
     * @memberof Screens.Lobby.Table.TableHandler#
     */
    sortByString: function (contents, reverse, key) {
        var arr = [];
        arr = arr.concat(contents);
        // return arr.sort(this.sort(key, reverse, function(a) {
        //     return a.toUpperCase()
        // }));
        return arr.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            //   reverse = !reverse ? 1 : -1;
            //var val = reverse * ((x < y) ? -1 : ((x > y) ? 1 : 0))
            if (reverse) {
                return ((y < x) ? -1 : ((y > x) ? 1 : 0));
            } else {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }

            // return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            //return val;
        });
    },

    /**
     * @method sortByString
     * @description Request to Save as favourite table
     * @param {string} playerId -Current player's id
     * @param {string} channelId -Channel id of selected table
     * @param {string} gameType - Game Type of selected table
     * @param {callback} callback - Callback to be executed after receiving response
     * @memberof Screens.Lobby.Table.TableHandler#
     */
    setFavTable: function (playerId, channelId, gameType, callback) {
        var data = new FavTable(playerId, channelId, gameType);
        ServerCom.pomeloRequest(K.PomeloAPI.setFavTable, data, function (response) {
            callback(response);
        }, function (error) { }, 5000, false);
    },

    /**
     * @method removeFavTable
     * @description Request to Remove from favourite table
     * @param {string} playerId -Current player id
     * @param {string} channelId - Channel id of selected table
     * @param {callback} callback -callback to be execute
     * @memberof Screens.Lobby.Table.TableHandler#
     */
    removeFavTable: function (playerId, channelId, callback) {
        var data = new RemoveFavTable(playerId, channelId);
        ServerCom.pomeloRequest(K.PomeloAPI.removeFavTable, data, function (response) {
            callback(response);
        }, function (error) { }, 5000, false);
    },

    /**
     * @method refreshSideTable
     * @description get enrolled players of specific table
     * @param {object}  data - Data to be updated in side table
     * @param {callback} callback - callback to executed
     * @param {callback} error - error callback
     * @memberof Screens.Lobby.Table.TableHandler#
     */
    refreshSideTable: function (data, callback, error) {
        var tableInfo = {
            channelId: data._id,
            playerId: GameManager.user.playerId,
        };
        ServerCom.pomeloRequest(K.PomeloAPI.getTableData, tableInfo, callback, error, 5000, false);
    },

    /**
     * @method sortByNumber
     * @description Sort JSON object array using any one of it's key - numerals 
     * @param {object} contents -
     * @param {object} reverse - sorting order
     * @param {object} key - key/index in object to be sorted
     * @memberof Screens.Lobby.Table.TableHandler#
     */
    sortByNumber: function (contents, reverse, key) {

        // console.log("sort by number called");
        var arr = [];
        arr = arr.concat(contents);
        // return contents;
        return arr.sort(this.sort(key, reverse, parseInt));

    },

    sortByJoined: function (contents) {
        // console.log("sort by joined called");
        // var arr = [];
        // var index = [];
        // arr = arr.concat(contents);
        if (this.joinTableList.length > 0) {
            // console.log("!!!", contents[0]);
            // console.log("!!!11", this.joinTableList.length);
            for (var i = 0; i < contents.length; i++) {
                this.joinTableList.forEach(element => {
                    if (contents[i]._id == element) {

                        var temp = contents[i];
                        // index.push(temp);
                        contents.splice(i, 1)
                        contents.unshift(temp);
                        // contents[i].zIndex = 0;
                    }
                });
            }
            // console.log("###", contents.length);
        }
        return contents;
        // console.log( [...index,...contents].length);
        // return [...index,...contents];
        // return index.concat(contents);
    },

    /**
     * @method joinWaitingList
     * @description Request server to keep record of join/unjoin list! 
     * @param {boolean} join - Join/Unjoin Value
     * @param {Stirng} channelId -Channel id of this table content
     * @param {callback} callback - callback for successful response
     * @param {callback} error - callback for un-successful response
     * @memberof Screens.Lobby.Table.TableHandler#
     */
    joinWaitingList: function (join, channelId, callback, error, password) {
        var data = {
            channelId: channelId,
            playerId: GameManager.user.playerId,
            isRequested: true,
            playerName: GameManager.user.userName,
        };
        if (!!password) {
            data.password = password;
        }
        var route = K.PomeloAPI.joinWaitingList;
        if (join) {
            if (tableFilter.channelVariation == "Open Face Chinese Poker") {
                route = require("OFCConfigs").PomeloAPI.joinWaitingList;
            }
        } else {
            route = K.PomeloAPI.unJoinWaitingList;
        }

        ServerCom.pomeloRequest(route, data, callback, error, 5000, false);
    },

});