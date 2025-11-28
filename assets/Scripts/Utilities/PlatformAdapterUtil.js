/**
 * @class PlatformAdapterUtil
 * @classdesc Enables UI elements based on platform
 * @memberof Utilities
 */
cc.Class({
    extends: cc.Component,

    properties: {
        enableForBrowser:{
            default: false,
        }
    },

    /**
     * @description This is used for initialization
     * @method onLoad
     * @memberof Utilities.PlatformAdapterUtil#
     */
    onLoad: function () {
        if(this.enableForWeb)
        {
            if(!cc.sys.isBrowser)
            {
                this.node.active = false;
            }
        }
        else
        {
            // this.node.active = true;
        }
    },
});