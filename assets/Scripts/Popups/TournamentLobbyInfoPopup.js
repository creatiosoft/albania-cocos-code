var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var CheckBoxType = require('Checkbox');
var TourInfo = require('TournamentLobbyInfoMain');
var TourDetail = require('TournamentLobbyDetailsMain');
var TourTable = require('TournamentLobbyTableMain');
var TableContent = require('TableContent');

/**
 * @classdesc
 * @class TournamentLobbyInfoPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        popUpManager: {
            default: null,
            type: PopUpManager
        },

        tournNameLbl: {
            default: null,
            type: cc.Label,
        },

        startsAtLbl: {
            default: null,
            type: cc.Label,
        },

        startsAtHeaderLbl: {
            default: null,
            type: cc.Label,
        },

        runningForLbl: {
            default: null,
            type: cc.Label,
        },

        buyInLbl: {
            default: null,
            type: cc.Label,
        },

        prizePoolLbl: {
            default: null,
            type: cc.Label,
        },

        entriesLbl: {
            default: null,
            type: cc.Label,
        },

        playersGrid: {
            default: null,
            type: cc.Node,
        },

        prizeStructureGrid: {
            default: null,
            type: cc.Node,
        },
        handForHandGrid: {
            default: null,
            type: cc.Node,
        },

        blindStructureGrid: {
            default: null,
            type: cc.Node,
        },

        tournInfoGrid: {
            default: null,
            type: cc.Node,
        },

        runningTablesGrid: {
            default: null,
            type: cc.Node,
        },

        playersOnTableGrid: {
            default: null,
            type: cc.Node,
        },

        tablePlayersGrid: {
            default: null,
            type: cc.Node,
        },
        playerData: [],
        blindInfo: [],
        prizeInfo: [],
        tournamentInfoTab: {
            default: null,
            type: TourInfo,
        },
        tournamentDetailTab: {
            default: null,
            type: TourDetail,
        },
        tournamentTableTab: {
            default: null,
            type: TourTable,
        },
        timerSchedule: null,
        tableId: null,
    },

    /**
     * @description Turn on the table update braodcast listening
     * @method onEnable
     * @memberof Popups.TournamentLobbyInfoPopup#
     */
    onEnable: function () {
        pomelo.on(K.LobbyBroadcastRoute.tableUpdate, this.updateEntries.bind(this));
    },

    /**
     * @description  Update the entries of table data
     * @method updateEntries
     * @param {Object} data
     * @memberof Popups.TournamentLobbyInfoPopup#
     */
    updateEntries: function (data) {
        if (data._id == this.tableId)
        {
            this.entriesLbl.string = data.updated.enrolledPlayers;
        }
    },

    /**
     * @description Turn off the table update broadcast listening
     * @method onDisable
     * @memberof Popups.TournamentLobbyInfoPopup#
     */
    onDisable: function(){
        pomelo.off(K.LobbyBroadcastRoute.tableUpdate, this.updateEntries.bind(this));
    },

    /**
     * @description Method called from popUpManager to set initial view of this popup using some data
     * @method onShow
     * @param {Object} data
     * @memberof Popups.TournamentLobbyInfoPopup#
     */
    onShow: function (data) {
        this.tableId = data.tableData._id;
        this.startTimer(false);
        this.tournamentTableTab.node.active = false;
        this.tournamentDetailTab.node.active = false;
        this.tournamentInfoTab.node.active = false;

        //console.log(JSON.stringify(data));
        if (data != null) {
            //data handling for empty results
            data.tableData.playersInfo = !!data.tableData.playersInfo ? data.tableData.playersInfo : [];
            // data.tableData.playersInfo = !!data.tableData.playersInfo ? data.tableData.playersInfo : [];
            var channels = (!!data.lobbyInfo.result) ? data.lobbyInfo.result.channels : [];
            data.tableData.state = data.lobbyInfo.tournamentState;

            this.tournNameLbl.string = data.tableData.channelName;
            this.entriesLbl.string = data.tableData.enrolledPlayers;
           
            //  var prizePool = data.tableData.maxPlayersForTournament * data.tableData.entryfees;
            data.tableData.prizePool = !!(data.tableData.prizePool) ? data.tableData.prizePool : data.tableData.enrolledPlayers * data.tableData.entryfees;
            this.prizePoolLbl.string = data.tableData.prizePool || "0";
            this.buyInLbl.string = data.tableData.entryfees + data.tableData.housefees + data.tableData.bountyfees;

            if (data.lobbyInfo.tournamentState == K.SitNGoState.RUNNING) {
                this.startTimer(true, data.lobbyInfo.runningFor);
                this.runningForLbl.string = "Running for " + GameManager.getTimeDuration(data.lobbyInfo.runningFor);
            } else {
                this.runningForLbl.string = "";
            }
            if (data.tableData.tournamentType === K.TournamentType.SitNGo) {
                this.startsAtHeaderLbl.node.active = false;
                this.startsAtLbl.string = "";
            } else {
                this.startsAtHeaderLbl.node.active = true;
                this.startsAtLbl.string = GameManager.getTimeByMilli(data.tableData.tournamentStartTime);
            }

            this.tournamentTableTab.setTableData(channels, data.tableData.playersInfo, data.tableData, this.onPokerLobby.bind(this));
            var satelliteParent = (data.tableData.tournamentType == K.TournamentType.Satellite) ? data.prizeInfo.parentTournament.channelName : "";
            this.tournamentInfoTab.setTableData(data.tableData, data.blindInfo, satelliteParent);

            //var isRegister = (data.tableData.state == K.SitNGoState.REGISTER) || (data.tableData.state == K.SitNGoState.RUNNING && (data.tableData.isLateRegistrationOpened || data.tableData.isRebuyOpened));
            var isRegister = data.isPrizeDecided;
            this.tournamentDetailTab.setTableData(data.tableData.playersInfo, data.prizeInfo, data.tableData.prizePool, data.tableData.tournamentType, isRegister);
        }

        this.node.getComponent('TabBtnUtil').onShowTab_03();

    },

    /**
     * @description Stops the timer when popupo closed
     * @method onHide
     * @memberof Popups.TournamentLobbyInfoPopup#
     */
    onHide: function () {
        this.startTimer(false);
    },

    /**
     * @description Poer lobby button callback
     * @method onPokerLobby
     * @memberof Popups.TournamentLobbyInfoPopup#
     */
    onPokerLobby: function () {
        this.startTimer(false);
        this.popUpManager.hide(PopUpType.TournamentLobbyInfoPopup, function () {
        });
    },

    /**
     * @description Deatails button callback
     * @method onDetails
     * @memberof Popups.TournamentLobbyInfoPopup#
     */
    onDetails: function () {
        this.activateTab(2);
    },

    /**
     * @description Table Button Callback
     * @method onTable
     * @memberof Popups.TournamentLobbyInfoPopup#
     */
    onTable: function () {
        this.activateTab(1);
    },

    /**
     * @description Information button callback
     * @method onInformation
     * @memberof Popups.TournamentLobbyInfoPopup#
     */
    onInformation: function () {
        this.activateTab(0);
    },

    /**
     * @description Observe button callback
     * @method onObserve
     * @memberof Popups.TournamentLobbyInfoPopup#
     */
    onObserve: function () {

    },

    /**
     * @description Start running for timer
     * @method startTimer
     * @param {boolean} val
     * @param {Number} timer
     * @memberof Popups.TournamentLobbyInfoPopup#
     */
    startTimer(val, timer = 0) {
        if (val) {

            this.timerSchedule = setInterval(function () {
                timer += 1000;
                this.runningForLbl.string = "Running for " + GameManager.getTimeDuration(timer);
            }.bind(this), 1000);

        } else {
            if (!!this.timerSchedule)
                clearInterval(this.timerSchedule);
        }
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});