/**
 * @classdesc
 * @class TournamentTablePlayersOnTableInfo
 * @memberof Controllers.Tournament
 */
cc.Class({
    extends: cc.Component,

    properties: {
        playerIdLbl: {
            default: null,
            type: cc.Label,
        },
        chipsLbl: {
            default: null,
            type: cc.Label,
        },
        setPlayersRankFunc: null,
        id: null,
    },

    /**
     * @description This is used for initialisation
     * @method onLoad
     * @memberof Controllers.Tournament.TournamentTablePlayersOnTableInfo#
     */
    onLoad: function () {
        this.setPlayersRankFunc = this.setData.bind(this);
          ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tournamentLobby, this.setPlayersRankFunc);
    },

    /**
     * @description Called to update new value of Player Name and Chips
     * @method setData
     * @param {Object} data
     * @memberof Controllers.Tournament.TournamentTablePlayersOnTableInfo#
     */
    setData: function(data)
    {
        if(data.playerId == this.id  ){
            this.playerIdLbl.string = data.updated.playerName;
            this.chipsLbl.string = data.updated.chips;
        }
    },

    /**
     * @description Called to set initial value of Player Name and Chips
     * @method setValues
     * @param {Object} data
     * @param {Number} id
     * @memberof Controllers.Tournament.TournamentTablePlayersOnTableInfo#
     */
    setValues: function (data , id) {
        this.id = id;
        this.playerIdLbl.string = data.userName || "";
        this.chipsLbl.string = data.chips || "";
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
