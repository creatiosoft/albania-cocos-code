var EventEmitter = require('EventEmitter');

 /**
 * @classdesc Handles background Process for Card movement
 * @class CardMovement
 * @extends EventEmitter
 * @memberof Utilities.Cards
 */
cc.Class({
    extends: EventEmitter,

    properties: {
        dropZones: {
            default: [],
            type: [cc.Node]
        },
        dragging: false,
        dropZone: {
            default: null,
            type: cc.Node,
        },
        enableDragging: true,
        DragManager: null,
    },

    // use this for initialization
 onLoad: function () {
 
},
    /**
     * @description Registers Touch Events
     * @method registerTouchInput
     * @memberof Utilities.Cards.CardMovement#
     */
  registerTouchInput: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // // console.log(event);
            // // console.log('card touch start');
            this.dragging = true;
            this.dropZone = null;
            this.target = null;
            if (this.disableDrag == false) {
                DragManager.emit('onCardDragStart', this.dropZone, this.node);
            }
            //        event.stopPropagation();
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            //  // console.log(event);
            //   event.stopPropagation();
            if (this.dragging && this.disableDrag == false) {
                var touch = event.touch;
                this.target = this.node.parent.convertTouchToNodeSpaceAR(touch);
                // this.dragCard(localTouchLoc);
                // this.dragCard();
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            //event.stopPropagation();
            if (this.dragging) {
                this.dragging = false;
                this.stopDrag();
            }
        }, this);
          this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            //          event.stopPropagation();
            if (this.dragging) {
                this.dragging = false;
                this.stopDrag();
            }
        }, this);

    },

    /**
     * @description Regitser for touch events.
     * @method onEnable
     * @memberof Utilities.Cards.CardMovement#
     */
    onEnable: function() {
        this.checkCollisions();
        this.touchListener = this.registerTouchInput();
    },

    /**
     * @description How to drag the card
     * @method dragCard
     * @param {Number} dt
     * @memberof Utilities.Cards.CardMovement#
     */
   dragCard: function (dt) {
        // // console.log(' drag card');
        this.node.position = this.node.position.lerp(this.target, 20 * dt);
        // this.node.position = new cc.Vec2(this.target.x, this.target.y);
        this.node.setLocalZOrder(15);
        this.node.scale = new cc.Vec2(1, 1);
        this.node.rotation = 0;
        this.checkCollisions();
        //DragManager.emit('onCardDragStart', this.dropZone, this.node);
    },

    /**
     * @description 
     * @method addDropZone
     * @param {Object} node
     * @memberof Utilities.Cards.CardMovement#
     */
    addDropZone: function(node) {
        this.dropZones.push(node);
    },

    /**
     * @description 
     * @method removeDropZone
     * @param {Object} node
     * @memberof Utilities.Cards.CardMovement#
     */
    removeDropZone: function(node) {
        this.dropZones.splice(this.dropZones.indexOf(node), 1);
    },

    /**
     * @description HAndles the collision of cards
     * @method checkCollisions
     * @memberof Utilities.Cards.CardMovement#
     */
    checkCollisions: function () {
        if (this.node != null) {
            // var nodeRect = this.node.getBoundingBoxToWorld();
            var nodePos = this.node.parent.convertToWorldSpaceAR(this.node.position);
            var nodeRect = new cc.Rect(nodePos.x - this.node.width / 2, nodePos.y - this.node.height / 2, this.node.width, this.node.height);
        }
        else {
            return;
        }
        var temp = null;
        var tempArr = [];
        var distArray = [];
        for (var i = 0; i < DragManager.dropZones.length; i++) {
            if (!!DragManager.dropZones[i]) {
                // if (DragManager.dropZones[i] != this.node
                //     && DragManager.dropZones[i].active && DragManager.dropZones[i].getBoundingBoxToWorld().intersects(nodeRect)) {
                //     var dropZonePos = DragManager.dropZones[i].convertToWorldSpace(DragManager.dropZones[i].position);
                //     tempArr.push(DragManager.dropZones[i]);
                // }
                if (DragManager.dropZones[i] != this.node
                    && DragManager.dropZones[i].active) {
                    var dropZonePos = DragManager.dropZones[i].parent.convertToWorldSpaceAR(DragManager.dropZones[i].position);
                    var dropZoneRect = new cc.Rect(dropZonePos.x - DragManager.dropZones[i].width / 2, dropZonePos.y - DragManager.dropZones[i].height / 2, DragManager.dropZones[i].width, DragManager.dropZones[i].height);
                    if (dropZoneRect.intersects(nodeRect)) {
                        tempArr.push(DragManager.dropZones[i]);
                        var intersectRect = cc.rectIntersection(nodeRect, dropZoneRect);
                        var overLap = (intersectRect.width * intersectRect.height) / (dropZoneRect.width * dropZoneRect.height);
                        distArray.push(overLap);
                    }
                }

            }
        }
        
        var min = Math.max.apply(null, distArray);
        temp = tempArr[distArray.indexOf(min)];
        /**********************************************************/

        if (!!temp && this.dropZone != temp) {
            if (!!this.dropZone) {
                DragManager.emit('exitDropZone', this.dropZone, this.node);
            }
            this.dropZone = temp;
            DragManager.emit('enterDropZone', this.dropZone, this.node);
        } else if (!temp && !!this.dropZone) {
            DragManager.emit('exitDropZone', this.dropZone);
            this.dropZone = temp;
        }
    },
    
    update: function (dt) {
        if (!!this.target && this.dragging && this.disableDrag == false) {
            this.dragCard(dt);
        }
    },

    /**
     * @description Stops Dragging Card
     * @method stopDrag
     * @memberof Utilities.Cards.CardMovement#
     */
    stopDrag: function() {
        this.DragManager.emit('onCardDragStop', this.dropZone, this.node);
    },

    onDestroy: function() {
    },

    /**
     * @description Lifecycle callback
     * @method onDisable
     * @memberof Utilities.Cards.CardMovement#
     */  
    onDisable: function() {
        cc.eventManager.removeListener(this.touchListener);
       // this.destroy();
    }
});