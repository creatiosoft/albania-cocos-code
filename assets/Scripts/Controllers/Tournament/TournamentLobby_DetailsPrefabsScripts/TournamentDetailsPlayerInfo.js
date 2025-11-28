/**
 * @class TournamentDetailsPlayerInfo
 * @memberof Controllers.Tournament.TournamentLobby_DetailsPrefabsScripts
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
        ChipsLbl: {
            default: null,
            type: cc.Label,
        },
    },

    onLoad: function () {

    },

    /**
     * @description Sets Player values
     * @method setValues
     * @param {Object} data
     * @memberof Controllers.Tournament.TournamentLobby_DetailsPrefabsScripts.TournamentDetailsPlayerInfo#
     */
    setValues: function (data) {
        this.rankLbl.string = data.rank|| "";
        this.playerIdLbl.string = data.userName || "";
        this.ChipsLbl.string = data.chipsWon;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
