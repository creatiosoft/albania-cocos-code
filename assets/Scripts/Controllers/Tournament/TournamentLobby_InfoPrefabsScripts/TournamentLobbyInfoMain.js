var BlindInfoPrefab = require('TournamentInfoBlindInfo');
/**
 * @classdesc Sets values right table(Tournament information) in Tournament Table tab
 * @class TournamentLobbyInfoMain
 * @memberof Controllers.Tournament.TournamentLobby_InfoPrefabsScripts
 */
cc.Class({
    extends: cc.Component,

    properties: {
        reBuyLbl: {
            default: null,
            type: cc.Label,
        },
        addOn: {
            default: null,
            type: cc.Label
        },
        vPP: {
            default: null,
            type: cc.Label
        },
        tickets: {
            default: null,
            type: cc.Label
        },
        addOnValue: {
            default: null,
            type: cc.Label
        },
        vPPValue: {
            default: null,
            type: cc.Label
        },
        //unused
        bountyLbl: {
            default: null,
            type: cc.Label,
        },
        breaksLbl: {
            default: null,
            type: cc.Label,
        },
        minPlayersLbl: {
            default: null,
            type: cc.Label,
        },
        playersPerTableLbl: {
            default: null,
            type: cc.Label,
        },
        timeBreakLbl: {
            default: null,
            type: cc.Label,
        },
        gameLbl: {
            default: null,
            type: cc.Label,
        },
        unregistrationLbl: {
            default: null,
            type: cc.Label,
        },
        lateRegistrationLbl: {
            default: null,
            type: cc.Label,
        },
        chatLangLbl: {
            default: null,
            type: cc.Label,
        },
        satelliteValLbl: {
            default: null,
            type: cc.Label,
        },
        blindInfoOddPrefab: {
            default: null,
            type: cc.Prefab,
        },
        blindInfoEvenPrefab: {
            default: null,
            type: cc.Prefab,
        },
        blindInfoParent: {
            default: null,
            type: cc.Node,
        },

    },

    onLoad: function() {

    },

    /**
     * @description
     * @method setTableData
     * @param {Object} data
     * @param {Object} blindInfo
     * @param {String} satelliteParent
     * @memberof Controllers.Tournament.TournamentLobby_InfoPrefabsScripts.TournamentLobbyInfoMain#
     */
    setTableData: function(data, blindInfo, satelliteParent = "") {
        //this.bountyLbl.string = "A " + data.bounty + " Bounty will be awarded for each player eliminated.";
        //this.bountyLbl.node.parent.active = false;
        var minPl = 0;
        var maxPl = 0;
        // this.playersPerTableLbl.string = "Each table has a maximum of " + data.maxPlayers + " players.";
        this.playersPerTableLbl.string = "Minimum Required " + data.minPlayersForTournament + " Maximum of " + data.maxPlayersForTournament + "players.";
        this.gameLbl.string = data.channelVariation;
        // this.chatLangLbl.string = "English chat only in this tournament.";
        this.chatLangLbl.node.parent.active = false;
        this.unregistrationLbl.string = "Unregistration always allowed before the tournament starts.";
        this.satelliteValLbl.node.parent.active = false;
        if (data.tournamentType !== K.TournamentType.SitNGo) {
            this.lateRegistrationLbl.node.parent.active = true;
            this.breaksLbl.node.parent.active = true;
            var lateRegTime = 0;
            var msg = "";
            if (data.lateRegistrationAllowed) {
                lateRegTime = data.lateRegistrationTime;
                msg = "Late registration available for the first" + lateRegTime + " min of play.";
            } else {
                msg = "Late registration not allowed for this tournament.";
            }
            this.lateRegistrationLbl.string = msg;

            this.breaksLbl.string = "There is a " + data.tournamentBreakTime + " minute break every" + data.tournamentBreakDuration + " minutes.";
            minPl = data.minPlayersForTournament;
            maxPl = data.maxPlayersForTournament;
            if (data.tournamentType == K.TournamentType.Satellite) {
                this.satelliteValLbl.node.parent.active = true;
                this.satelliteValLbl.string = "Qualify for " + satelliteParent;
            }
        } else {
            this.lateRegistrationLbl.node.parent.active = false;
            this.breaksLbl.node.parent.active = false;

            minPl = data.minPlayers;
            maxPl = data.maxPlayers;
        }

        this.minPlayersLbl.string = "Minimum players required are" + minPl + ", and maximum of " + maxPl + " players.";
        this.timeBreakLbl.string = "There is a " + data.extraTimeAllowed + " second time bank available for this tournament";
        this.setBlindInfo(blindInfo);
    },

    /**
     * @description 
     * @method setBlindInfo
     * @param {Object} blindInfo
     * @memberof Controllers.Tournament.TournamentLobby_InfoPrefabsScripts.TournamentLobbyInfoMain#
     */
    setBlindInfo: function(blindInfo) {
        // this.blindInfoParent.removeAllChildren();
        GameManager.removeAllChildren(this.blindInfoParent);

        for (var i = 0; i < blindInfo.list.length; i++) {
            var blindObj = null;
            if (i % 2 == 0) {
                blindObj = cc.instantiate(this.blindInfoEvenPrefab);
            } else {
                blindObj = cc.instantiate(this.blindInfoOddPrefab);
            }
            this.blindInfoParent.addChild(blindObj);
            blindObj.getComponent(BlindInfoPrefab).setValues(blindInfo.list[i]);
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});