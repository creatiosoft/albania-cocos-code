var EmitterType = require('EventEmitter');
cc.Class({
    extends: EmitterType,

    properties: {
        toState : {
            default: null,
        },

         fromState : {
            default: null,
        },
    },

    triggerTransition:function(){
        this.emit("onTransition",this);
    },
});
