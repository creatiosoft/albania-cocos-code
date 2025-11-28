// var ChatPanel = require('ChatPanel');
// var gameScreenType = require("GameScreen");
/**
 * @class TableInfoPanel
 * @classdesc
 * @memberof Controllers.Gameplay.ChatPanel
 */
cc.Class({
    extends: cc.Component,

    properties: {
        infoLabel: {
            default: null,
            type: cc.Label,
        },
        pokerModel: {
            default: null,
            type: cc.Node,
        },

        tableInfoDataCell: {
            default: null,
            type: cc.Prefab,
        },

        scrollViewContent: {
            default: null,
            type: cc.Node,
        },
        // gameScreen: {
        //     default: null,
        //     type: gameScreenType,
        // },

    },

    /**
     * @description This is used for initialisation.
     * @method onLoad
     * @memberof Controllers.Gameplay.ChatPanel.TableInfoPanel#
     */
    onLoad: function () {
        //pokerGame = this.pokerModel.getComponent('PokerModel');
        // console.error(" TABLE INFO JSON ", this.pokerModel.getComponent('PokerModel').roomConfig.info);
        // this.infoLabel.string = this.pokerModel.getComponent('PokerModel').roomConfig.info;

        this.populateTableInfo(this.pokerModel.getComponent('PokerModel').roomConfig.info);
    },

    populateTableInfo: function (infoString) {
        // console.error("OBJECT KEY COUNT ",Object.keys(infoString).length);
        //  cc.instantiate(this.cardPrefab);
        this.infoLabel.string = JSON.stringify(infoString);

        for (let key in infoString) {
            let dataCell = cc.instantiate(this.tableInfoDataCell);
            dataCell.getChildByName("Key").getComponent(cc.Label).string = key;
            dataCell.getChildByName("data").getComponent(cc.Label).string = infoString[key];
            this.scrollViewContent.addChild(dataCell);
        }

    },

    onEnable: function () {
        // var pokerGame = null;
        // if (this.gameScreen.prevSelection == null) {
        //     pokerGame = GameScreen.gameModel.activePokerModels[GameScreen.gameModel.activePokerModels.length - 1];
        // } else {
        //     pokerGame = GameScreen.gameModel.activePokerModels[GameScreen.prevSelection];
        // }
        // this.infoLabel.string = pokerGame.roomConfig.info;
    },

});