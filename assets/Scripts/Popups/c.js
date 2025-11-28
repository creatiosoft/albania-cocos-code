var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var SliderTouchType = require('SliderTouch');
// var CheckBoxType = require('Checkbox');
var EditBoxType = require('CustomEditBox');
var UtilEditBoxType = require('EditBoxUtil');
var SetPlayerValData = require('PostTypes').SetPlayerValData;

/**
 * @classdesc Manages Buyin popup
 * @class BuyInPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {
        minStake: {
            default: null,
            type: cc.EditBox,
        },
        maxStake: {
            default: null,
            type: cc.EditBox,
        },
        buyInUltraLow: {
            default: null,
            type: cc.Node,
        },
        buyInLow: {
            default: null,
            type: cc.Node,
        },
        buyInMedium: {
            default: null,
            type: cc.Node,
        },
        buyInHiigh: {
            default: null,
            type: cc.Node,
        },
        player2: {
            default: null,
            type: cc.Node,
        },
        player3: {
            default: null,
            type: cc.Node,
        },
        player4: {
            default: null,
            type: cc.Node,
        },
        player5: {
            default: null,
            type: cc.Node,
        },
        player6: {
            default: null,
            type: cc.Node,
        },
        player7: {
            default: null,
            type: cc.Node,
        },
        player8: {
            default: null,
            type: cc.Node,
        },
        player9: {
            default: null,
            type: cc.Node,
        },
        rit: {
            default: null,
            type: cc.Node,
        },
        noLimit: {
            default: null,
            type: cc.Node,
        },
        limit: {
            default: null,
            type: cc.Node,
        },
    },

    onDestroy: function () {
    },

    onEnable: function () {
    },

    onLoad: function () {
    },
    
    onShow: function (data) {
    },

    onClearAll: function () {
    },

    onApply: function () {
        var inst = this;
        ServerCom.pomeloRequest("connector.entryHandler.getLobbyTables", {
            isRealMoney: true,
            channelVariation: "All",
            playerId: GameManager.user.playerId,
            isLoggedIn: true,
            access_token: K.Token.access_token
        }, function (response) {
            console.log("TABLE DATA IS ", JSON.parse(JSON.stringify(response)));


            if (response.success && response.result) {
                inst.populateTable(response.result);
            } else {
                // handle error
            }
        }, null, 5000, false);
    },

    onClose: function () {
        this.node.active = false;
    },

});
