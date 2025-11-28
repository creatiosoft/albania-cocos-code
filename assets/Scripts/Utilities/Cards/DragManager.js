/**
 * @classdesc DragManger class manages dragging of nodes!
 * @class DragManager 
 * @memberof Utilities.Cards
 */
var EventEmitter = require('EventEmitter');
cc.Class({
    extends: EventEmitter,

    properties: {
        dropZones: {
            default: [],
            type: [cc.Node]
        },
        dragElements: {
            default: [],
            type: [cc.Node]
        }
    },


    onLoad: function () {
    },
    
    /**
     * @description adds the drop zone in an array!
     * @method addDropZone
     * @param {Object} node -the node where other object will be dropped in.
     * @memberof Utilities.Cards.DragManager#
     */
    addDropZone: function (node) {
        if (this.dropZones.indexOf(node) == -1) {
            this.dropZones.push(node);
        }
    },

    /**
     * @description To remove Drop Zone
     * @method removeDropZone
     * @param {Object} node -Node to remove
     * @memberof Utilities.Cards.DragManager# 
     */
    removeDropZone: function (node) {
        if (this.dropZones.indexOf(node) != -1) {
            this.dropZones.splice(this.dropZones.indexOf(node), 1);
        }
    },

    /**
     * @description To add Drag elements
     * @method addDragElement
     * @param {Object} node
     * @memberof Utilities.Cards.DragManager# 
      */
    addDragElement: function (node) {
        if (this.dragElements.indexOf(node) == -1) {
            this.dragElements.push(node);
        }
    },

    /**
     * @description To remove Drag Element
     * @method removeDragElement
     * @param {Object} node
     * @memberof Utilities.Cards.DragManager# 
     */
    removeDragElement: function (node) {
        if (this.dragElements.indexOf(node) != -1) {
            this.dragElements.splice(this.dragElements.indexOf(node), 1);
        }
    },
    
    /**
     * @description remove Cards from dropZone
     * @method removeAllCards
     * @memberof Utilities.Cards.DragManager# 
     */
    removeAllCards: function () {
        // for (var i = 0; i < this.dragElements.length; i++) {
        //     if (!!this.dragElements[i].getComponent('Card')) {
        //         this.removeDropZone(this.dragElements[i]);
        //     }
        // }
        // var noOfCards = this.dropZones.length - 5;
        // this.dropZones.splice(4, noOfCards);
        //   this.dropZones = [];
        while (this.dropZones.length > 5) {
            this.dropZones.pop();
        }
    }
});
