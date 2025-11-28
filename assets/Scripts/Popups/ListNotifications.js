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
var ListNotifications = cc.Class({
    extends: cc.Component,

    properties: {

        contentNode: {
            default: null,
            type: cc.Node,
        },
        itemNode: {
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

    onClose: function () {
        this.node.active = false;
    },

    onRemove: function(event, customEventData) {

    },

    onRead: function(event, customEventData) {

    },

    onMore: function(event, customEventData) {

    },

    onLess: function(event, customEventData) {

    },
});



