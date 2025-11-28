/**
 * @class AdjustSpriteOrder
 * @classdesc 
 * @memberof Utilities
 */
cc.Class({
    extends: cc.Component,

    properties: {
        zOrder: -1,
        isLocal: true,
        isRelative: true,
    },

    /**
     * @description 
     * @method onEnable
     * @memberof Utilities.AdjustSpriteOrder#
     */
    onEnable: function () {
        if (this.isLocal) {
            if (this.isRelative) {
                
                this.node.setLocalZOrder(this.node.getLocalZOrder() + this.zOrder);
            }
            else {
                this.node.setLocalZOrder(this.zOrder);
            }
        }
        else {
            if (this.isRelative) {
                this.node.setGlobalZOrder(this.node.getGlobalZOrder() + this.zOrder);
            }
            else {
                this.node.setGlobalZOrder(this.zOrder);
            }
        }
    },

});
