/**
 * @namespace Controllers.Tournament.TournamentLobby_InfoPrefabsScripts 
 * */

/**
 * @classdesc Sets values in left table(blind structure) of Tournament Information tab
 * @class TournamentInfoBlindInfo
 * @memberof Controllers.Tournament
 */
cc.Class({
    extends: cc.Component,

    properties: {
        rankLbl: {
            default: null,
            type: cc.Label,
        },
        blindsLbl: {
            default: null,
            type: cc.Label,
        },
        anteLbl: {
            default: null,
            type: cc.Label,
        },
        minutesLbl: {
            default: null,
            type: cc.Label,
        },
        timeBankLbl: {
            default: null,
            type: cc.Label,
        }
    },

    // use this for initialization
    onLoad: function() {

    },

    /**
     * @description Sets blind structure in Tournament Information tab
     * @method setValues
     * @param {Object} data
     * @memberof Controllers.Tournament.TournamentLobby_InfoPrefabsScripts.TournamentInfoBlindInfo#
     */
    setValues: function(data) {
        this.rankLbl.string = data.level || "";
        this.blindsLbl.string = data.smallBlind + "/" + data.bigBlind || "";
        this.anteLbl.string = data.ante || "";
        this.minutesLbl.string = data.minutes || "";
        //this.timeBankLbl.string = data.timeBank || "";
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});