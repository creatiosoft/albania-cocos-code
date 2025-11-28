var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var CheckBoxType = require('Checkbox');
/**
 * @classdesc Shows this pop up on insufficient chips
 * @class InSufficientChipsPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        popUpManager: {
            default: null,
            type: PopUpManager
        },
        
    },

    /**
     * @description This is used for Initialisation
     * @method onLoad
     * @memberof Popups.InSufficientChipsPopup#
     */
    onLoad: function () {

    },

    /**
     * @description  Method called from popUpManager to set initial view of this popUp using some data
     * @method onShow
     * @param {Object} data
     * @memberof Popups.InSufficientChipsPopup#
     */
    onShow : function(data){

    },

    /**
     * @description Exit button callback
     * @method onClickEnter
     * @memberof Popups.InSufficientChipsPopup#
     */
    onClickEnter: function () {
       this.onBuyIn();
    },

    /**
     * @description Buyin callback
     * @method onBuyIn
     * @memberof Popups.InSufficientChipsPopup#
     */
    onBuyIn: function () {
        
    },

    /**
     * @description Cancel button callback
     * @method onLater
     * @memberof Popups.InSufficientChipsPopup#
     */
    onLater: function () {
        this.popUpManager.hide(PopUpType.InSufficient, function () {  });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
