
var JoinData = require('PostTypes').JoinChannel;
var Table = require('Table');
var TableContent = require('TableContent');
var Checkbox = require('Checkbox');
var DropDownType = require('DropDown');
var PopUpType = require('PopUpManager').PopUpType;
var timerID = null;
/**
 * @class SitTablePresenter
 * @classdesc handles table view manipulation for sit n go
 * @extends Table
 * @memberof Screens.Lobby.Table 
 */
cc.Class({
    extends: Table,

    properties: {
        registerBtn: {
            default: null,
            type: cc.Node,
        },
        deregisterBtn: {
            default: null,
            type: cc.Node,
        },
        joinBtn: {
            default: null,
            type: cc.Node,
        },
        gameTypeDropdown: {
            default: null,
            type: DropDownType,
        },
        stakesDropdown: {
            default: null,
            type: DropDownType,
        },
        maxPlayersDropdown: {
            default: null,
            type: DropDownType,
        },
        hideFullTablesCB: {
            default: null,
            type: Checkbox
        },
        sideTableInfoPrefab: {
            default: null,
            type: cc.Prefab,
        },
        tournamentPlayersInfo: [],
        tableInfoHolder: {
            default: null,
            type: cc.Node,
        },
        warningLbl: {
            default: null,
            type: cc.Label,
        },
        //tempSelection: null,
        channelNameLbl: {
            default: null,
            type: cc.Label,
        },
        PrizePoolLbl: {
            default: null,
            type: cc.Label,
        },
        favTableCB: {
            default: null,
            type: Checkbox
        },
        favPrimaryCB: {
            default: null,
            type: Checkbox,
        },
        sideTableInfo: {
            default: null,
            type: cc.Node,
        },
    },

    /**
    * @method onEnable
    * @description Life Cycle callback, call super() method; 
    * @memberof SitTablePresenter#
    */
   onEnable: function() {
        this._super();
        this.switchButtons(false);
          if(!GameManager.isMobile && this.DropDownData)
        {
            this.initDropDowns(this.DropDownData.sitNGo);
        }
    },



    /**
    * @method addTable
    * @description Add Table From DashBoard, call super method
    * @param {object} data -Data needed to create a new table content!
    * @memberof Screens.Lobby.Table.SitTablePresenter#
    */
    addTable: function(data) {
        if (data.updated.channelType == K.ChannelType.Tournament && data.updated.tournamentType == K.TournamentType.SitNGo) {
            this._super(data);
        }
    },

 /**
    * @method filterByTournamentType
    * @description To filter table data by Tournament type
    * @param {Array} content -content to set in drop down
    * @param {boolean} pass - 
    * @param {boolean} checkSitNGo -check tournament type 
    * @memberof Screens.Lobby.Table.SitTablePresenter#
 */
   filterByTournamentType: function(content, pass = true, checkSitNGo = true) {
        return this._super(content, false);
    },


    /**
    * @method tableContentClick
    * @description Method called for everytime a table is clicked
    * @memberof Screens.Lobby.Table.SitTablePresenter#
    */
    tableContentClick: function() {
        var inst = this;
        this.handler.checkRegistration(TableContent.prevSelection.channelData, function(response) {
            if (response.success) {
                inst.switchButtons(response.result.isRegistered, response.result.tournamentState, response.result.isEliminated);
                if (TableContent.prevSelection !== null) {
                    inst.tempSelection = inst.contentPool.indexOf(TableContent.prevSelection.node);
                }
            } else {
                //isRegistered = false;
            }
        }, function(response) {});
        this.refreshSideTable();
    },



 /**
    * @method setSideTableData
    * @description Method to set Side Table data
    * @param {object} response
    * @memberof Screens.Lobby.Table.SitTablePresenter# 
    */
   setSideTableData: function(response) {
        GameManager.removeAllChildren(this.tableInfoHolder);
        var data = TableContent.prevSelection.channelData;
        var buyIn = data.entryfees + data.housefees + data.bountyfees;
        var prizePool = data.maxPlayersForTournament * data.entryfees;
        TableContent.prevSelection.channelData.buyIn = buyIn;
        TableContent.prevSelection.channelData.prizePool = prizePool;
        this.PrizePoolLbl.string = prizePool;
        this.channelNameLbl.string = data.channelName;
        if (response.success) {
            if (!!response.result.ranks) {
                this.currentSideTableData = response;
                if (TableContent.prevSelection != null) {
                    TableContent.prevSelection.channelData.playersInfo = response.result.ranks;
                }
                for (var i = 0; i < response.result.ranks.length; i++) {
                    var obj = cc.instantiate(this.sideTableInfoPrefab);
                    this.tableInfoHolder.addChild(obj);
                    if (TableContent.prevSelection.channelData.state == K.SitNGoState.REGISTER) {
                        var playerInfo = [response.result.ranks[i].userName, "", ""];
                    } else {
                        var rank = !!(response.result.ranks[i].rank) ? response.result.ranks[i].rank : "";
                        var playerInfo = [response.result.ranks[i].userName, rank, response.result.ranks[i].chipsWon];
                    }
                    obj.getComponent('TableContent').setContentText(playerInfo);
                    if (response.result.ranks[i].eliminated) {
                        obj.getChildByName('Bg').color = new cc.Color(182, 181, 163);
                    }
                }
            }
        }
    },


/**
    * @method onSideTableUpdate
    * @description To update side table data.
    * @param {object} data
    * @memberof Screens.Lobby.Table.SitTablePresenter#
 */
    onSideTableUpdate: function(data) {
        if (TableContent.prevSelection == null || this.contentPool.length == 0) {
            return;
        }
        if (data.tournamentId) {
            if (TableContent.prevSelection.channelData._id == data.tournamentId) {
                this.currentSideTableData = {};
                this.currentSideTableData.success = true;
                this.currentSideTableData.result = data.updated;
                this.refreshSideTable(false);
            }
        }
    },


 /**
    * @method OnRegisterTournament
    * @description Register for selected tournament
    * @memberof Screens.Lobby.Table.SitTablePresenter#
 */
   OnRegisterTournament: function() {
        // check for already registered
        if (TableContent.prevSelection === null) {
            return;
        }
        // fire join table api
        var inst = this;
        this.handler.registerTournament(TableContent.prevSelection.channelData, function(response) {
            // callback
            if (response.success) {
                inst.switchButtons(true);
                // inst.refreshSideTable();
                return false;
            } else {
                if (response.info === "user already registered in this tournament") {
                    // inst.refreshSideTable();
                    return true;
                } else {
                    return false;
                }
            }
        }, function(response) {
            // error
        });

    },


 /**
    * @method OnDeRegisterTournament
    * @description  Register for selected tournament
    * @memberof Screens.Lobby.Table.SitTablePresenter#
 */
   OnDeRegisterTournament: function() {
        // check for already registered
        if (TableContent.prevSelection === null) {
            return;
        }
        var inst = this;
        // fire join table api
        this.handler.deRegisterTournament(TableContent.prevSelection.channelData, function(response) {
            // callback
            if (response.success) {
                inst.switchButtons(false);
            } else {}
        }, function(response) {
            // error
        });
        // this.refreshSideTable();
    },


 /**
    * @method onTournamentLobbyInfo
    * @description Show Tournament Lobby Info PopUp
    * @memberof Screens.Lobby.Table.SitTablePresenter#
 */
   onTournamentLobbyInfo: function() {
        if (TableContent.prevSelection === null) {
            return;
        }
        var inst = this;
        this.handler.tournamentLobbyInfo(TableContent.prevSelection.channelData, function(response) {
            if (!!response.tableData) {
                this.popUpManager.show(PopUpType.TournamentLobbyInfoPopup, response, function() {});

            } else {}
        }.bind(this), function(response) {
            this.warningLbl.node.active = true;
            setTimeout(function() {
                this.warningLbl.node.active = false;
            }.bind(this), 2000);
        }.bind(this));
    },

 /**
    * @method onJoinTournament
    * @description join api for current running tournament
    * @memberof Screens.Lobby.Table.SitTablePresenter#
 */
   onJoinTournament: function() {
        // check for already registered
        if (TableContent.prevSelection === null) {
            return;
        }
        var data = new JoinData(TableContent.prevSelection.channelData);
        data.tableId = TableContent.prevSelection.channelData._id;
        data.channelId = "";
        GameManager.join(data.tableId, K.PomeloAPI.joinChannel, data);
    },

 /**
    * @method onGetTableData
    * @description Gets table data from the server
    * @memberof Screens.Lobby.Table.SitTablePresenter#
 */
   onGetTableData: function() {
        this._super(K.ChannelType.Tournament);
    },

 /**
    * @method makeContent
    * @description Returns content array based on table data
    * @param {object} data -Data to generate a row /Table Content
    * @memberof Screens.Lobby.Table.SitTablePresenter#
 */
   makeContent: function(data) {
        if (this.variation == K.Variation.OpenFaceChinesePoker) {
            var content = [data.channelName, data.chipsPointRatio, data.channelVariation, GameManager.getGameTypeByValue(data.turnTime), data.minBuyIn, data.maxBuyIn, data.playingPlayers + "/" + data.maxPlayers];
        } else {
            var content = [data.channelName, data.isPotLimit ? "L" : "NL", data.entryfees + data.housefees + data.bountyfees, GameManager.getGameTypeByValue(data.turnTime), data.channelVariation, this.capitalizeFirstLetter(data.state), (data.enrolledPlayers ? data.enrolledPlayers : 0) + "/" + data.maxPlayersForTournament, "0", "0"];
        }
        return content;
    },

 /**
    * @method switchButtons
    * @description changes the button of sit-n-go table according to tournament state and registeration
    * @param {boolean} isRegisterd - Status of player if he/she registed in tournament
    * @param {boolean} state - State of the tournament
    * @param {boolean} isEliminated - status of player if he/she is has been eliminated 
    * @memberof Screens.Lobby.Table.SitTablePresenter#
*/
   switchButtons: function(isRegistered, state, isEliminated) {
        // console.log("isregister " + isRegistered);
        this.registerBtn.active = !isRegistered;
        this.deregisterBtn.active = isRegistered;
        if (!!state) {
            switch (state) {
                case K.SitNGoState.RUNNING:
                    this.registerBtn.active = this.deregisterBtn.active = false;
                    this.joinBtn.active = isRegistered && !isEliminated;
                    this.deregisterBtn.active = false;
                    break;
                case K.SitNGoState.REGISTER:
                    this.joinBtn.active = false;
                    break;
                case K.SitNGoState.FINISHED:
                    this.joinBtn.active = this.registerBtn.active = this.registerBtn.active = false;
                    break;
                case K.SitNGoState.UPCOMING:
                    this.joinBtn.active = this.registerBtn.active = this.registerBtn.active = false;
                    break;
            }
        }
    },

});