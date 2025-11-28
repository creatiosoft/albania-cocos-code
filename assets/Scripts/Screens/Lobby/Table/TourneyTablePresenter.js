
var JoinData = require('PostTypes').JoinChannel;
var Table = require('Table');
var TableContent = require('TableContent');
var Checkbox = require('Checkbox');
var DropDownType = require('DropDown');
var PopUpType = require('PopUpManager').PopUpType;
var timerID = null;
/**
 * @class Manages the view of Tournament 
 * @classdesc handles table view manipulation for tournaments
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
        channelNameLbl: {
            default: null,
            type: cc.Label,
        },
        prizePoolLbl: {
            default: null,
            type: cc.Label,
        },
        startsAtLbl: {
            default: null,
            type: cc.Label,
        },
        startsInLbl: {
            default: null,
            type: cc.Label,
        },
        lateRegisterationLbl: {
            default: null,
            type: cc.Label,
        },
        lateRegTillTimeLbl: {
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
        sideTableInfo: { //may not be in use
            default: null,
            type: cc.Node,
        },
        // rebuyBtn: {
        //     default: null,
        //     type: cc.Node,
        // },
        stateViewNode: { //activates or deactivates node based on tournament state
            default: null,
            type: cc.Node,
        }
    },

    /**
     * @method addTable
     * @description Add table content(row) in lobby!
     * @param {Object} data -data to set in table content
     * @memberof Screens.Lobby.Table.TourneyTablePresenter# 
     */
    addTable: function (data) {
        if (data.updated.channelType == K.ChannelType.Tournament && data.updated.tournamentType != K.TournamentType.SitNGo) {
            this._super(data);
        }
    },

    /**
     * @description to register broadcasts
     * @method onLoad
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    onLoad: function () {
        this._super();
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tableView, function (responseObject) {
            if (responseObject.event == "PRIZEPOOL") {
                this.setPrizePoolLbel(responseObject.updated.prizePool);
            }
        });
    },

    /**
     * @method makeContent
     * @description  Returns content array based on table data
     * @param {object} data -data to generate a content!
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    makeContent: function (data) {
        // TODO: Modify as per needs
        // TODO: make data - need more datas from server
        if (this.variation == K.Variation.OpenFaceChinesePoker) {
            var content = [data.channelName, data.chipsPointRatio, data.channelVariation, GameManager.getGameTypeByValue(data.turnTime), data.minBuyIn, data.maxBuyIn, data.playingPlayers + "/" + data.maxPlayers];
        } else {
            var content = [data.channelName, data.channelVariation, data.buyIn, GameManager.getTimeByMilli(data.tournamentStartTime), data.prizePool || "-", GameManager.getGameTypeByValue(data.turnTime), this.capitalizeFirstLetter(data.state), data.enrolledPlayers];
        }
        return content;
    },

    /**
     * @method filterByTournamentType
     * @description call super method;
     * @param {object} content
     * @param {boolean} pass
     * @param {boolean} checkSitNGo
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    filterByTournamentType: function (content, pass = true, checkSitNGo = true) {
        return this._super(content, false, false);
    },

    /**
     * @method onGetTableData
     * @description Gets table data from the server
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    onGetTableData: function () {
        this._super(K.ChannelType.Tournament);
    },

    /**
     * @method onTournamentLobbyInfo 
     * @description Show Tournament Lobby Info PopUp
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    onTournamentLobbyInfo: function () {
        if (TableContent.prevSelection === null) {
            return;
        }
        var inst = this;
        this.handler.tournamentLobbyInfo(TableContent.prevSelection.channelData, function (response) {
            if (!!response.tableData) {
                this.popUpManager.show(PopUpType.TournamentLobbyInfoPopup, response, function () { });
            } else { }
        }.bind(this), function (response) { }.bind(this));
    },

    /**
     * @method tableContentClick
     * @description Handle content click 
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    tableContentClick: function () {
        if (TableContent.prevSelection == null) {
            return;
        }
        var inst = this;
        var useLateRegCall = false;
        this.handler.checkRegistration(TableContent.prevSelection.channelData, function (response) {
            // callback
            if (response.success) {
                inst.switchButtons(response.result.isRegistered, response.result.tournamentState, TableContent.prevSelection.channelData.isLateRegistrationOpened, response.result.isEliminated);
                inst.tempSelection = inst.contentPool.indexOf(TableContent.prevSelection.node);
            } else { }
        }, function (response) { });
        this.refreshSideTable();
    },

    /**
     * @method refreshSideTable
     * @description Refresh table specific details
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    refreshSideTable: function (downloadAgain = true) {
        this._super(false);
    },

    /**
     * @method setSideTableData
     * @description set Side Table Data based on state of Tournament
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    //setSideTableData: function (response) {
    setSideTableData: function () {
        var data = TableContent.prevSelection.channelData;
        this.channelNameLbl.string = data.channelName;
        this.prizePoolLbl.string = data.prizePool;
      //  this.stateViewNode.active = true;
        // if (data.channelType == K.ChannelType.Tournament && data.tournamentType == K.TournamentType.Normal) {
        //     let registerViewNode = this.stateViewNode.getChildByName("RegisterStateView");
        //     let runningViewNode = this.stateViewNode.getChildByName("RunningStateView");
        //     let finishedViewNode = this.stateViewNode.getChildByName("FinishedStateView");
        //     switch (data.state) {
        //         case K.TournamentState.Upcoming:
        //         case K.TournamentState.Register:
        //             registerViewNode.getChildByName("TournamentStartTimeValue").getComponent(cc.Label).string = GameManager.getTimeByMilli(data.tournamentStartTime);
        //             let registrationEndTime = data.lateRegistrationAllowed ? (data.lateRegistrationTime * 60 * 1000 + data.tournamentStartTime) : data.tournamentStartTime;
        //             registerViewNode.getChildByName("RegistationEndTimeValue").getComponent(cc.Label).string = GameManager.getTimeByMilli(registrationEndTime);
        //             //registerViewNode.getChildByName("AddonValue").getComponent(cc.Label).string;
        //             registerViewNode.getChildByName("RebuyValue").getComponent(cc.Label).string = data.isRebuyAllowed ? (data.numberOfRebuy) : "Not Available";
        //             registerViewNode.active = true;
        //             runningViewNode.active = false;
        //             finishedViewNode.active = false;
        //             break;
        //         case K.TournamentState.Running:
        //             //runningViewNode.getChildByName("RunningForValue").getComponent(cc.Label).string;
        //             //runningViewNode.getChildByName("LateRegistrationEndTimeValue").getComponent(cc.Label).string;
        //             runningViewNode.getChildByName("StartingChipsValue").getComponent(cc.Label).string = data.noOfChipsAtGameStart;
        //             runningViewNode.active = true;
        //             registerViewNode.active = false;
        //             finishedViewNode.active = false;
        //             break;
        //         case K.TournamentState.Finished:
        //             //finishedViewNode.getChildByName("StartTimeValue").getComponent(cc.Label).string;
        //             //finishedViewNode.getChildByName("EndTimeValue").getComponent(cc.Label).string;
        //             finishedViewNode.active = true;
        //             runningViewNode.active = false;
        //             registerViewNode.active = false;
        //             break;
        //     }
        //  }
         this.startsAtLbl.string = GameManager.getTimeByMilli(data.tournamentStartTime) + " IST";
        this.startsInLbl.string = GameManager.getTimeDuration(data.tournamentStartTime, false);
        var lateRegDate = data.lateRegistration ? (data.tournamentStartTime + data.lateRegistrationTime) : data.tournamentStartTime;
        var ms_in_a_min = 60000;
        var myStartDate = (data.tournamentStartTime - data.registrationBeforeStarttime * ms_in_a_min);
        this.lateRegisterationLbl.string = GameManager.getTimeByMilli(myStartDate) + " IST"; //lateRegDate
        this.lateRegTillTimeLbl.string = GameManager.getTimeDuration(lateRegDate, false);
    },

    /**
     * @method OnRegisterTournament
     * @description Register for selected tournament
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    OnRegisterTournament: function () {
        // check for already registered
        if (TableContent.prevSelection === null) {
            return;
        }
        // fire join table api
        var inst = this;
        var useLateRegCall = false;
        if (K.TournamentType.Normal == TableContent.prevSelection.channelData.tournamentType && TableContent.prevSelection.channelData.state == K.SitNGoState.RUNNING && TableContent.prevSelection.channelData.isLateRegistrationOpened && TableContent.prevSelection.channelData.lateRegistrationAllowed) {
            useLateRegCall = true;
        }
        this.handler.registerTournament(TableContent.prevSelection.channelData, function (response) {
            // callback
            if (response.success) {
                inst.switchButtons(true);
                inst.refreshSideTable();
                return false;
            } else {
                if (response.info === "user already registered in this tournament") {
                    inst.refreshSideTable();
                    return true;
                } else {
                    return false;
                }
            }
        }, function (response) {
            // error
        }, useLateRegCall);
    },

    /**
     * @method OnDeRegisterTournament
     * @description Register for selected tournament
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    OnDeRegisterTournament: function () {
        // check for already registered
        if (TableContent.prevSelection === null) {
            return;
        }
        var inst = this;
        // fire join table api
        this.handler.deRegisterTournament(TableContent.prevSelection.channelData, function (response) {
            // callback
            if (response.success) {
                inst.switchButtons(false);
            } else { }
        }, function (response) {
            // error
        });
        this.refreshSideTable();
    },

    /**
     * @method onJoinTournament
     * @description join api for current running tournament
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    onJoinTournament: function () {
        // check for already registered
        if (TableContent.prevSelection === null) {
            return;
        }
        var data = new JoinData(TableContent.prevSelection.channelData);
        //data.isRebuyOpened = TableContent.prevSelection.channelData.isRebuyOpened;
        data.tableId = TableContent.prevSelection.channelData._id;
        data.channelId = "";
        GameManager.join(data.tableId, K.PomeloAPI.joinChannel, data);
    },

    // /**
    //  * @method onRebuy
    //  * @description Rebuy if available.
    //  * @memberof Screens.Lobby.Table.TourneyTablePresenter#
    //  */
    // onRebuy: function() {
    //     if (TableContent.prevSelection === null) {
    //         return;
    //     }
    //     // var data = new JoinData(TableContent.prevSelection.channelData);
    //     var data = {
    //         playerId: GameManager.user.playerId,
    //         tournamentId: TableContent.prevSelection.channelData._id,
    //         //gameVersionCount: TableContent.prevSelection.channelData.gameVersionCount,

    //     };
    //     var inst = this;
    //     this.handler.rebuyInTournament(data, function(response) {
    //         if (response.success) {
    //             inst.rebuyBtn.active = false;
    //             //show success popup..(to do)
    //         } else {
    //             inst.rebuyBtn.active = true;
    //         }
    //         var data = {
    //             info: response.info,
    //             heading: "Rebuy",
    //         };
    //         inst.popUpManager.show(PopUpType.PlayerInfoPopup, data, function() {});
    //     }, function(response) {});
    //     // GameManager.join(data.tableId, K.PomeloAPI.joinChannel, data);
    // },

    /**
     * @method switchButtons
     * @description changes the button of sit-n-go table according to tournament state and registeration
     * @param {boolean} isRegistered -true if player is registered in tournament
     * @param {String} state - Show state of the game!
     * @param {boolean} lateRegOpened - true if late registration is allowed in the game
     * @param {boolean} isEliminated 
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    switchButtons: function (isRegistered, state, lateRegOpened, isEliminated) {
        this.registerBtn.active = !isRegistered;
        this.deregisterBtn.active = isRegistered;
        // if (!!TableContent.prevSelection && isRegistered) {
        //     this.rebuyBtn.active = TableContent.prevSelection.channelData.isRebuyOpened ? true : false;
        // } else {
        //     this.rebuyBtn.active = false;
        //}
        if (!!state) {
            switch (state) {
                case K.SitNGoState.RUNNING:
                    this.registerBtn.active = false || lateRegOpened;
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

    /**
     * @description set prize pool value in side table 
     * @method setPrizePool
     * @param {Number} prize - value of prize pool
     * @memberof Screens.Lobby.Table.TourneyTablePresenter#
     */
    setPrizePoolLbel: function (prize) {
        this.prizePoolLbl = prize;
    }

});