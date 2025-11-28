var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

/**
 * @classdesc
 * @class SitNGoResultPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        popUpManager: {
            default: null,
            type: PopUpManager
        },
        infoLbl: {
            default: null,
            type: cc.Label,
        },
        prizeData: null,
        spectator: false,
        dataA: null,
        messageLbl: {
            default: null,
            type: cc.Label,
        },
        headingLbl: {
            default: null,
            type: cc.Label,
        },
    },

    /**
     * @description This is used for initialisation
     * @method onLoad
     * @memberof Popups.SitNGoResultPopup#
     */
    onLoad: function () {

    },

    /**
     * @description Method called from popUpManager to set initial view of this popUp using some data
     * @method onShow
     * @param {Object} data
     * @memberof Popups.SitNGoResultPopup#
     */
    onShow: function (data) {
        if (data != null) {
            if (!!data.rank) {
                this.infoLbl.string = "Rank - " + data.rank + "\n Chips earned - " + data.chipsWon;
                if (data.chipsWon < 1) {
                    this.messageLbl.string = "Better Luck Next Time";
                }
                else {
                    this.messageLbl.string = "Congratulations!!!"
                    // switch (data.rank) {
                    // case 1:
                    // this.messageLbl.string += "";
                    // }
                }
            }
            else {
                this.spectator = true;
                this.infoLbl.string = "Game Over";
                this.messageLbl.string = "";
            }
            this.dataA = data.pokerPresenter;
            this.prizeData = data;
            this.headingLbl.string = this.dataA.model.roomConfig.channelName + " Results";
        }
    },

    /**
     * @description When Enter button is clicked
     * @method onClickEnter
     * @memberof Popups.SitNGoResultPopup#
     */
    onClickEnter: function () {
       this.onExit();
    },

    /**
     * @description Exit button callback
     * @method onExit
     * @memberof Popups.SitNGoResultPopup#
     */
    onExit: function () {
        var prizedata = {
            playerId: this.prizeData.playerId,
            gameVersionCount: this.prizeData.gameVersionCount,
            tournamentId: this.prizeData.tournamentId
        };
        var inst = this;
        if (this.spectator) {
            inst.exitGame(inst);
        } else {
            ServerCom.pomeloRequest(K.PomeloAPI.collectPrize, prizedata, function (response) {
                if (response.success) {
                    if (!response.isGameRunning) {
                        inst.exitGame(inst);
                    } else {
                        inst.dataA.leaveTable();
                        inst.popUpManager.hide(PopUpType.SitNGoResultPopup, function () {  });
                    }
                }
            });
        }

        // this.popUpManager.hide(PopUpType.SitNGoResultPopup, function () { });
    },


    /**
     * @description Quits from selected ongoing game
     * @method exitGame
     * @param {Object} inst
     * @memberof Popups.SitNGoResultPopup#
     */
    exitGame: function (inst) {
        for (var index = 0; index < GameManager.gameModel.activePokerModels.length; index++) {
            if (this.dataA.model === GameManager.gameModel.activePokerModels[index]) {
                GameManager.gameModel.activePokerModels.splice(index, 1);
                break;
            }
        }
        this.dataA.model.node.destroy();
        GameManager.scheduleOnce(function () {
            GameManager.gameModel.emit(K.GameEvents.OnTableClosed);
        }, 0.3);
        inst.popUpManager.hide(PopUpType.SitNGoResultPopup, function () { });
    }

});
