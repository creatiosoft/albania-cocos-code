/**
 * @classdesc 
 * @class TournamentTablePlayersInfo
 * @memberof Controllers.Tournament
 */
cc.Class({
    extends: cc.Component,

    properties: {
        rankLbl: {
            default: null,
            type: cc.Label,
        },
        playerIdLbl: {
            default: null,
            type: cc.Label,
        },
        chipsLbl: {
            default: null,
            type: cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    /**
     * @description Used for setting up Rank, Username and Chipswon
     * @method setValues
     * @param {Object} data
     * @memberof Controllers.Tournament.TournamentTablePlayersInfo#
     */
    setValues: function (data) {
        this.rankLbl.string = data.rank||"";
        this.playerIdLbl.string = data.userName || "";
        this.chipsLbl.string = data.chipsWon;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
