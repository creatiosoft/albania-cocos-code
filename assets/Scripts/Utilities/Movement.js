/**
 * @class Movement
 * @classdesc Manages the dragging movement
 * @memberof Utilities
 */
cc.Class({
    extends: cc.Component,
    properties: {
        startMoving: false,
        dragging: false,
        disableDrag: true,
        target: null,
        dragElements: {
            type: [cc.Node],
            default: [],
        }
    },

    /**
     * @description Used for initialisation
     * @method onLoad
     * @memberof Utilities.Movement#
     */
    onLoad: function () {
        this.registerTouchInput();
    },

    /**
     * @description Registers the Touch input 
     * @method registerTouchInput
     * @memberof Utilities.Movement#
     */
    registerTouchInput: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.dragging = true;
            this.dropZone = null;
            this.target = null;
            event.stopPropagation();
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            event.stopPropagation();
            if (this.dragging) {
                var touch = event.touch;
                this.target = this.node.parent.convertTouchToNodeSpaceAR(touch);
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            event.stopPropagation();
            if (this.dragging) {
                this.dragging = false;
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            event.stopPropagation();
            if (this.dragging) {
                this.dragging = false;
            }
        }, this);
    },

    /**
     * @description Implements dragging movement
     * @method dragCard
     * @param {Number} dt
     * @memberof Utilities.Movement#
     */
    dragCard: function (dt) {
        this.node.position = this.node.position.lerp(this.target, 20 * dt);
        this.dragElements.forEach(function (element) {
            element.position = this.node.position;
        }, this);
    },

    /**
     * @description Updates the fragging movement
     * @method update
     * @param {Number} dt
     * @memberof Utilities.Movement#
     */
    update: function (dt) {
        if (!!this.target && this.dragging) {
            this.dragCard(dt);
        }
    },
});
