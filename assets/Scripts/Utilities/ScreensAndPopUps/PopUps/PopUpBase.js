/**
 * @namespace Utilities.ScreensAndPopUps
 */
var emitter = require('EventEmitter');
/**
 * @classdesc Base Class for All Pop Ups
 * @class PopUpBase
 * @memberof Utilities.ScreensAndPopUps.PopUps
 * @extends EventEmitter
 */
cc.Class({
    extends: emitter,

    properties: {
        data: {
            default: null,
            visible: false,
        },
    },

    onLoad: function() {

    },

    onShow: function(data) {
        this.data = data;
    },

    onHide: function() {

    },
    onButtonClickEvent: function() {

    },
    onDestroy: function() {

    },
    onClickEnter : function(){
        
    },
   
});
