var K = require("GameConfig").K;
var PopUpType = require('../../Utilities/ScreensAndPopUps/PopUps/PopUpManager').PopUpType;

cc.Class({
    extends: cc.Component,

    properties: {
        chipsLabel: {
            default: null,
            type: cc.Label
        },
        feesLabel: {
            default: null,
            type: cc.Label
        },
        feesLabel2: {
            default: null,
            type: cc.Label
        },
        regButton: {
            default: null,
            type: cc.Node
        },
        addCashButton: {
            default: null,
            type: cc.Node
        },
        type: 0,
    },

    /**
     * @method onLoad
     * @description Lifecycle callback, Used to Register some broadcast as tableUpdate, Perform some alignmetn of widget!
     * @memberof Screens.Lobby.Table.Table#
     */
    onLoad: function () {

    },

    
    onDisable: function () {

    },

    onEnable: function () {
    },

    onClose: function() {
        this.node.active = false;
    },

    setData:function (data, type) {
        console.log(data);
        this.tourItemInfo = data;
        this.type = type;
        // 
        let totalFees = (data.raw.entryFees || 0) + (data.raw.houseFees || 0);
        this.chipsLabel.string = Number(GameManager.user.realChips.toFixed(2));
        if (this.type == 1 || this.type == 2) {
            this.feesLabel.string = (data.raw.entryFees || 0) + "(Reg.)";
            this.feesLabel2.string = (data.raw.houseFees || 0) + "(Fee)";
        }
        else if (this.type == 3) {
            this.feesLabel.string = (data.raw.reentry.reentryPrice.reentryAmount + "(Reg.)");
            this.feesLabel2.string = (data.raw.reentry.reentryPrice.reentryHouseFee + "(Fee)");
        }
        else if (this.type == 4) {
            this.feesLabel.string = (data.raw.entryFees || 0) + "(Reg.)";
            this.feesLabel2.string = (data.raw.houseFees || 0) + "(Fee)";
        }
        

        if (GameManager.user.realChips < totalFees) {
            this.regButton.active = false;
            this.addCashButton.active = true;
        }
        else {
            this.regButton.active = true;
            this.addCashButton.active = false;
        }
     },

    onReg: function() {
        this.node.active = false;
        // 
        if (this.type == 1) {
            if (this.tourItemInfo.raw.tournamentType != "SIT N GO") {
                window.TournamentLobbyHandler.requestTournamentRegister(
                    { tournamentId: this.tourItemInfo.id },
                    (data) => {
                    }, 
                    (error) => {
                        ServerCom.forceKeepLoading = false;
                        ServerCom.loading.active = false;
                        GameManager.popUpManager.show(
                            PopUpType.CommonDialog, 
                            {
                                "title": "Error!",
                                "content" : error.info
                            }, 
                            function () {}
                        );
                    }
                );   
            }
        }
        else if (this.type == 2) {
            window.TournamentLobbyHandler.requestTournamentLateRegister(
                { tournamentId: this.tourItemInfo.id },
                (data) => {
                }, 
                (error) => {
                    ServerCom.forceKeepLoading = false;
                    ServerCom.loading.active = false;
                    GameManager.popUpManager.show(
                        PopUpType.CommonDialog, 
                        {
                            "title": "Error!",
                            "content" : error.info
                        }, 
                        function () {}
                    );
                }
            );
        }
        else if (this.type == 3) {
            window.TournamentLobbyHandler.requestTournamentReEntry(
                { tournamentId: this.tourItemInfo.id },
                (data) => {
                }, 
                (error) => {
                    ServerCom.forceKeepLoading = false;
                    ServerCom.loading.active = false;
                    GameManager.popUpManager.show(
                        PopUpType.CommonDialog, 
                        {
                            "title": "Error!",
                            "content" : error.info
                        }, 
                        function () {}
                    );
                }
            );
        }
        else if (this.type == 4) {
            window.TournamentLobbyHandler.requestTournamentSitAndGoRegister(
                { tournamentId: this.tourItemInfo.id },
                (data) => {
                }, 
                (error) => {
                    ServerCom.forceKeepLoading = false;
                    ServerCom.loading.active = false;
                    GameManager.popUpManager.show(
                        PopUpType.CommonDialog, 
                        {
                            "title": "Error!",
                            "content" : error.info
                        }, 
                        function () {}
                    );
                }
            );   
        }
    },

    onAddCash: function() {
        this.node.active = false;
    },

});
