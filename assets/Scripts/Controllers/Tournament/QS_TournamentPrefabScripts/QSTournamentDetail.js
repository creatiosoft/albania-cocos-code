/**
 * @namespace Controllers.Tournament
 */
var PopUpType = require('PopUpManager').PopUpType;
/**
 * @classdesc
 * @class QSTournamentDetails
 * @memberof Controllers.Tournament
 */
cc.Class({
    extends: cc.Component,

    properties: {
        tournamentTitleLbl: {
            default: null,
            type: cc.Label,
        },
        startsInTimeLbl: {
            default: null,
            type: cc.Label,
        },
        startsAtTimeLbl: {
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
        data: null,
    },

    onLoad: function() {

    },

    /**
     * @description Sets details of tournament in side table
     * @method setValues
     * @param {Object} data
     * @memberof Controllers.Tournament.QSTournamentDetails#
     */
    setValues: function(data) {
        this.data = data;
        this.tournamentTitleLbl.string = data.channelName || "";
        this.startsAtTimeLbl.string = GameManager.getTimeByMilli(data.tournamentStartTime);
        var date = new Date().getTime();
        if (data.tournamentStartTime > date) {
            this.startsInTimeLbl.string = GameManager.getTimeDuration(data.tournamentStartTime, false) || "";
        } else {
            this.startsInTimeLbl.string = "";
        }
        this.buyInLbl.string = data.buyIn || "";
        this.prizePoolLbl.string = (!!data.enrolledPlayers && data.entryfees) ? (data.enrolledPlayers * data.entryfees) : "0";
        this.entriesLbl.string = data.enrolledPlayers || "0";
    },

    /**
     * @description Register button callback(Tournament)
     * @method onRegister
     * @memberof Controllers.Tournament.QSTournamentDetails#
     */
    onRegister: function() {
        var data1 = {};
        data1._id = this.data._id;
        data1.gameVersionCount = this.data.gameVersionCount;
        TournamentHandler.registerTournament(data1, function(response) {
        }.bind(this), function(response) {
        }, 5000, false);
    },

    /**
     * @description Tournament Lobby button callback
     * @method onTournamentLobby
     * @memberof Controllers.Tournament.QSTournamentDetails#
     */
    onTournamentLobby: function() {
        var data = {};
        data._id = this.data._id;
        data.gameVersionCount = this.data.gameVersionCount;
        data.tournamentType = K.TournamentType.Normal;
        TournamentHandler.tournamentLobbyInfo(this.data, function(response) {
            if (!!response.tableData) {
                GameManager.popUpManager.show(PopUpType.TournamentLobbyInfoPopup, response, function() { });
            }
            else {
            }
        }.bind(this), function(response) {
        }.bind(this));
    },
});