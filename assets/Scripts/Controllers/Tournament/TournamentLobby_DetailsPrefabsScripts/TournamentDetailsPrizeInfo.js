/**
 * @class TournamentDetailsPrizeInfo
 * @classdesc
 * @memberof Controllers.Tournament.TournamentLobby_DetailsPrefabsScripts
 */
cc.Class({
    extends: cc.Component,

    properties: {
        placeLbl: {
            default: null,
            type: cc.Label,
        },
        awardIdLbl: {
            default: null,
            type: cc.Label,
        },
        satelliteTicketLbl: {
            default: null,
            type: cc.Label,
        },
        callback: null,
        callbackData: null,
    },

    onLoad: function () {

    },

    /**
     * @description 
     * @method setValues
     * @param {Object} data
     * @param {Number} prizePool
     * @param {String} place
     * @param {String} tourType
     * @param {function} callback
     * @memberof Controllers.Tournament.TournamentLobby_DetailsPrefabsScripts.TournamentDetailsPrizeInfo#
     */
    setValues: function (data, prizePool, place, tourType, callback) {
        if (tourType === K.TournamentType.Normal) {
            this.placeLbl.string = place;
            this.awardIdLbl.string = prizePool;
            this.satelliteTicketLbl.string = "";
        } else {
            this.placeLbl.string = place + 1;
            this.awardIdLbl.string = (prizePool * data.value) / 100;
            this.satelliteTicketLbl.string = data.satelliteTicket || "";
        }
        this.callback = callback;
        // this.callbackData = callbackData;
    },

    /**
     * @description 
     * @method setAllPrizeValues
     * @param {Object} data
     * @param {function} callback
     * @memberof Controllers.Tournament.TournamentLobby_DetailsPrefabsScripts.TournamentDetailsPrizeInfo#
     */
    setAllPrizeValues: function (data, callback) {
        this.placeLbl.string = data.lowerLimit + "-" + data.upperlimit;
        this.awardIdLbl.string = data.noOfPrizes;
        this.satelliteTicketLbl.string = data.satelliteTicket || "";
        this.callbackData = data.prizes;
        this.callback = callback;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    /**
     * @description 
     * @method onClick
     * @memberof Controllers.Tournament.TournamentLobby_DetailsPrefabsScripts.TournamentDetailsPrizeInfo#
     */
    onClick: function () {
        if (!!this.callback) {
            this.callback(this.callbackData);
        }
    },
});
