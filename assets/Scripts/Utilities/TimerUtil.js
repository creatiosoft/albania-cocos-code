/**
 * @classdesc This utility turns off its node after preset time
 * @class TimerUtil
 * @memberof Utilities
 */
cc.Class({
    extends: cc.Component,

    properties: {
        timer:{
            default: 0,
            visible: false,
        },
        maxTimer:{
            default: 5,
        },
    },

    // use this for initialization
    onLoad: function () {

    },
    
    onEnable:function()
    {
        // reset timer
        this.timer = 0;
    },
    
    onDisable:function()
    {
        
    },

    /** @description called every frame, uncomment this function to activate update callback
      * @method update
      * @memberof Utilities.TimerUtil#
      */
    update: function (dt) {
        this.timer += dt;
        if(this.timer > this.maxTimer)
        {
            // de-activate self
            this.node.active = false;
        }
    },
});
