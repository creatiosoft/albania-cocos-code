/**
 * @classdesc
 * @class TournamentTableRunningTableInfo
 * @memberof Controllers.Tournament
 */
cc.Class({
    extends: cc.Component,

    properties: {
        id: -1,
        tableLbl: {
            default: null,
            type: cc.Label,
        },
        playersLbl: {
            default: null,
            type: cc.Label,
        },
        largestStackLbl: {
            default: null,
            type: cc.Label,
        },
        smallestStackLbl: {
            default: null,
            type: cc.Label,
        },
        players: null,
        callback: null,
        baseColor: new cc.color(),
        setPlayersDataFunc: null,
    },

    /**
     * @description This is used for initialisation
     * @method onLoad
     * @memberof Controllers.Tournament.TournamentTableRunningTableInfo#
     */
    onLoad: function () {
        this.setPlayersDataFunc = this.setData.bind(this);
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tournamentLobby, this.setPlayersDataFunc);
    },

    /**
     * @description Called for updating data of Largest and Smallest stack
     * @method setData
     * @param {Object} data
     * @memberof Controllers.Tournament.TournamentTableRunningTableInfo#
     */
    setData: function(data)
    {
      if(this.id == data._id ){
        this.largestStackLbl.string = data.updated.largestStack;
        this.smallestStackLbl.string = data.updated.smallestStack;
        
      }
    },

    /**
     * @description 
     * @method onDestroy
     * @memberof Controllers.Tournament.TournamentTableRunningTableInfo#
     */
    onDestroy: function () {
        pomelo.off(K.LobbyBroadcastRoute.tournamentLobby, this.setPlayersDataFunc);
    },

    /**
     * @description
     * @method setValues
     * @param {Object} data
     * @param {Number} id
     * @memberof Controllers.Tournament.TournamentTableRunningTableInfo#
     */
    setValues: function (data, id) {
        this.id = id;
        this.players = data.players;
        this.tableLbl.string = id + 1; //data.channelName || "";
        this.playersLbl.string = data.players.length || "";
        this.largestStackLbl.string = (!!data.largestStack) ? (data.largestStack.chips || "") : "";
        this.smallestStackLbl.string = (!!data.smallestStack) ? (data.smallestStack.chips || "") : "";
        this.baseColor = this.node.getChildByName('Base').color;
    },

    /**
     * @description Hightlight the selected node
     * @method onClick
     * @memberof Controllers.Tournament.TournamentTableRunningTableInfo#
     */
    onClick: function () {
        this.callback(this.players, this.id);
        this.node.getChildByName('Base').color = new cc.color(72, 70, 38);
    },

    /**
     * @description Remove the hightlighted color on selection removal 
     * @method removeSelection
     * @memberof Controllers.Tournament.TournamentTableRunningTableInfo#
     */
    removeSelection: function () {
        this.node.getChildByName('Base').color = this.baseColor;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
