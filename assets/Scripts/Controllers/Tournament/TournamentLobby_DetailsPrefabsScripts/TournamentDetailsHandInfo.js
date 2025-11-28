/**
 * @namespace Controllers.Tournament.TournamentLobby_DetailsPrefabsScripts
 */

/**
 * @class TournamentDetailsHandInfo
 * @memberof Controllers.Tournament.Tournament.TournamentLobby_DetailsPrefabsScripts
 */
cc.Class({
    extends: cc.Component,

    properties: {
        startLbl:{
            default:null,
            type:cc.Label,
        },
        stopLbl:{
            default:null,
            type:cc.Label,
        },
    },

    onLoad: function () {

    },

    /**
     * @method setValues
     * @param {Object} data
     * @memberof Controllers.Tournament.Tournament.TournamentLobby_DetailsPrefabsScripts.TournamentDetailsHandInfo#
     */
    setValues:function(data){
        this.startLbl.string="";
        this.stopLbl.string="";
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
