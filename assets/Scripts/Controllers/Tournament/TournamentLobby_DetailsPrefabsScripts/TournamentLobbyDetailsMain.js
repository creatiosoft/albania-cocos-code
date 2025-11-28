var PrizeInfo = require('TournamentDetailsPrizeInfo');
var PlayerInfo = require('TournamentDetailsPlayerInfo');
var PopUpType = require('PopUpManager').PopUpType;
var TableContent = require('TableContent');
/**
 * @class TournamentLobbyDetailsMain
 * @classdesc
 * @memberof Controllers.Tournament
 */
cc.Class({
    extends: cc.Component,

    properties: {
        playerInfoOddPrefab: {
            default: null,
            type: cc.Prefab,
        },
        playerInfoEvenPrefab: {
            default: null,
            type: cc.Prefab,
        },
        playerInfoGrid: {
            default: null,
            type: cc.Node,
        },
        prizeOddPrefab: {
            default: null,
            type: cc.Prefab,
        },
        prizeEvenPrefab: {
            default: null,
            type: cc.Prefab,
        },
        prizeGrid: {
            default: null,
            type: cc.Node,
        },
        registerPrizeContainer: {
            default: null,
            type: cc.Node,
        },
        runningPrizeContainer: {
            default: null,
            type: cc.Node,
        },
        registeredPrizeGrid: {
            default: null,
            type: cc.Node,
        },
        registeredSpecificGrid: {
            default: null,
            type: cc.Node,
        },
        satellitePrizeContainer: {
            default: null,
            type: cc.Node,
        },
        satelliteValLbl: {
            default: null,
            type: cc.Label,
        },
        satelliteParentLbl: {
            default: null,
            type: cc.RichText,
        },
        tournamentCurrentInformation: {
            default: null,
            type: cc.Node
        },
        satelliteParent: null,
        setPlayersRankFunc: null,
    },

    // use this for initialization
    /**
     * @description This is used for initialisation
     * @method onLoad
     * @memberof Controllers.Tournament.TournamentLobbyDetailsMain#
     */
    onLoad: function () {
        this.setPlayersRankFunc = this.setPlayersRank1.bind(this);
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tableView, this.setPlayersRankFunc);

    },

    /**
     * @description Sets the player rank to 1
     * @method setPlayersRank1
     * @param {Object} data
     * @memberof Controllers.Tournament.TournamentLobbyDetailsMain#
     */
    setPlayersRank1: function (data) {
        if(data.tournamentId == TableContent.prevSelection.channelData._id)
        {
            this.setPlayersRank(data.updated.ranks);
        }
    },

    /**
     * @description Destroy callback
     * @method onDestroy
     * @memberof Controllers.Tournament.TournamentLobbyDetailsMain#
     */
    onDestroy: function () {
        pomelo.off(K.LobbyBroadcastRoute.tableView, this.setPlayersRankFunc);
    },

    /**
     * @description Sets table data
     * @method setTableData
     * @param {Object} playerData -Player data 
     * @param {String} prizeRule 
     * @param {Number} prizePool -Prize pool 
     * @param {String} tourType -Type of Tournament
     * @param {boolean} isStateRegister -Is User Registered or not
     * @memberof Controllers.Tournament.TournamentLobbyDetailsMain#
     */
    setTableData: function (playerData, prizeRule, prizePool, tourType, isStateRegister) {
        // this.playerInfoGrid.removeAllChildren();
        if (tourType === K.TournamentType.Normal) {
            this.registerPrizeContainer.active = !isStateRegister;
            this.runningPrizeContainer.active = isStateRegister;
            this.satellitePrizeContainer.active = false;
        } else if (tourType == K.TournamentType.Satellite) {
            this.registerPrizeContainer.active = false;
            this.runningPrizeContainer.active = false;
            this.satellitePrizeContainer.active = true;

        } else {
            this.registerPrizeContainer.active = false;
            this.runningPrizeContainer.active = true;
            this.satellitePrizeContainer.active = false;
        }
        this.setPlayersRank(playerData);
        // this.prizeGrid.removeAllChildren();
        GameManager.removeAllChildren(this.registeredPrizeGrid);
        GameManager.removeAllChildren(this.prizeGrid);
        GameManager.removeAllChildren(this.registeredSpecificGrid);
        if (tourType == K.TournamentType.Satellite) {
            this.satelliteValLbl.string = "One entry for every " + prizeRule.parentTournament.buyIn + " in the prize pool will be awarded for :";
            this.satelliteParentLbl.string = "<u>" + prizeRule.parentTournament.channelName + "</>";
            this.satelliteParent = prizeRule.parentTournament;
        } else {
            var prizeRuleArr = [];
            prizeRuleArr = (prizeRule.list !== undefined) ? prizeRule.list : prizeRule;
            this.handlePrizeTable(prizeRuleArr, isStateRegister, tourType, prizePool);
        }

    },

    /**
     * @description Sets player rank
     * @method setPlayersRank
     * @param {Object} playerData
     * @memberof Controllers.Tournament.TournamentLobbyDetailsMain#
     */
    setPlayersRank: function (playerData) {
        
        GameManager.removeAllChildren(this.playerInfoGrid);
        for (var i = 0; i < playerData.length; i++) {
            var obj = null;
            if (i % 2 == 0) {
                obj = cc.instantiate(this.playerInfoEvenPrefab);
            } else {
                obj = cc.instantiate(this.playerInfoOddPrefab);
            }
            // var obj = cc.instantiate(this.specificTableInfoPrefab);
            this.playerInfoGrid.addChild(obj);
            obj.getComponent(PlayerInfo).setValues(playerData[i]);
        }
    },

    /**
     * @description 
     * @method handlePrizeTable
     * @param {Object} prizeRuleArr
     * @param {boolean} isStateRegister
     * @param {String} tourType
     * @param {Number} prizePool
     * @memberof Controllers.Tournament.TournamentLobbyDetailsMain#
     */
    handlePrizeTable: function (prizeRuleArr, isStateRegister, tourType, prizePool) {
        if (prizeRuleArr.length > 0) {
            var prizeArr;
            if (tourType === K.TournamentType.Normal) {
                prizeArr = prizeRuleArr;
            }
            else {
                prizeArr = prizeRuleArr[0].playerprizepercent;
            }
            // console.log(prizeArr);
            if (tourType === K.TournamentType.Normal) {
                if (!isStateRegister) {
                    this.showAllPrizes(prizeArr);

                } else {
                    this.showSpecificPrizes(prizeArr, tourType, prizePool, this.prizeGrid); // might have to change data sent
                }
            } else {
                //for sit n go only one table
                this.showSpecificPrizes(prizeArr, tourType, prizePool, this.prizeGrid);
            }
        }
    },

    /**
     * @description Displays specific prizes
     * @method showSpecificPrizes
     * @param {Object} prizeArr -Prize Array
     * @param {String} tourType - Type of Tournament
     * @param {Number} prizePool -prize pool value
     * @param {Object} grid 
     * @param {function} callback -callback to execute
     * @memberof Controllers.Tournament.TournamentLobbyDetailsMain#
     */
    showSpecificPrizes: function (prizeArr, tourType = K.TournamentType.Normal, prizePool = 0, grid = this.registeredSpecificGrid, callback = function () { }) {
        GameManager.removeAllChildren(this.prizeGrid);
        GameManager.removeAllChildren(this.registeredSpecificGrid);
        for (var i = 0; i < prizeArr.length; i++) {
            var obj = null;
            if (i % 2 == 0) {
                obj = cc.instantiate(this.prizeEvenPrefab);
            } else {
                obj = cc.instantiate(this.prizeOddPrefab);
            }
            // var obj = cc.instantiate(this.specificTableInfoPrefab);
            grid.addChild(obj);
            if (tourType === K.TournamentType.Normal) {
                obj.getComponent(PrizeInfo).setValues(prizeArr[i], prizeArr[i].prizeMoney, prizeArr[i].position, tourType, callback);
            }
            else
                obj.getComponent(PrizeInfo).setValues(prizeArr[i], prizePool, (i), tourType, callback);
        }
    },

    /**
     * @description Instantiates and displays prizes
     * @method showAllPrizes
     * @param {Object} prizeArr -Array of prizes
     * @memberof Controllers.Tournament.TournamentLobbyDetailsMain#
     */
    showAllPrizes: function (prizeArr) {
        for (var i = 0; i < prizeArr.length; i++) {
            var obj = null;
            if (i % 2 == 0) {
                obj = cc.instantiate(this.prizeEvenPrefab);
            } else {
                obj = cc.instantiate(this.prizeOddPrefab);
            }
            // var obj = cc.instantiate(this.specificTableInfoPrefab);
            this.registeredPrizeGrid.addChild(obj);
            obj.getComponent(PrizeInfo).setAllPrizeValues(prizeArr[i], this.showSpecificPrizes.bind(this));
        }
        this.showSpecificPrizes(prizeArr[0].prizes);
    },

    /** 
     * @method showParentTourLobby
     * @memberof Controllers.Tournament.TournamentLobbyDetailsMain#
     */
    showParentTourLobby: function () {
        if (!!this.satelliteParent) {
            TournamentHandler.tournamentLobbyInfo(this.satelliteParent, function (response) {
                if (!!response.tableData) {
                    GameManager.popUpManager.hide(PopUpType.TournamentLobbyInfoPopup, function () { });
                    GameManager.popUpManager.show(PopUpType.TournamentLobbyInfoPopup, response, function () { });
                } else { }
            }.bind(this), function (response) {
            }.bind(this));
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});