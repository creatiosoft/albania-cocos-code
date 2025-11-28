// This utility sets the resolution policy using onLoad callback

var resPolicy = cc.Enum({
    EXACT_FIT: 0,
    NO_BORDER: 1,
    SHOW_ALL: 2,
    FIXED_HEIGHT: 3,
    FIXED_WIDTH: 4,
    UNKNOWN: 5,
});

cc.Class({
    extends: cc.Component,

    properties: {
        policy:{
            default: resPolicy.UNKNOWN,
            type: resPolicy,
        },
    },

    // use this for initialization
    onLoad: function () {
        // cc.view.setResolutionPolicy(cc.ResolutionPolicy.EXACT_FIT);
        this.setResPolicy();
    },
    
     /*
     * Sets resolution policy
     */
    setResPolicy:function()
    {
        cc.view.setResolutionPolicy(this.policy); 
        
    },

});
