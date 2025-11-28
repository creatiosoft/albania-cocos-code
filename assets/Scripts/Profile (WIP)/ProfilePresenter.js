var ProfileHandler = require('ProfileHandler');
/**
 * @class ProfilePresenter
 * @classdesc 
 * @memberof Profile (WIP)
 */
cc.Class({
    extends: cc.Component,

    properties: {
        ipAddress:{
            default: "",
            visible:false,
        },
        portID:
        {
            default: 0,
            visible:false,
        },
        transaction:{
            default: null,
            type: ProfileHandler,
        }
    },

    // use this for initialization
    onLoad: function () {
        
    },
    
    /**
     * @description Gets transaction history and displys on UI
     * @method onGetTransactionHistory
     * @memberof Profile (WIP).ProfilePresenter#
     */
    onGetTransactionHistory:function()
    {
        this.transaction.getTransactionHistory(0, 20, function (response) {
            if(response.success)
            {
                var result = response.result;
            }
            else
            {
                // handle error
            }            
        });
    },
    
    /**
     * @description Gets wallet information from server and displays on UI
     * @method onGetWalletInfo
     * @memberof Profile (WIP).ProfilePresenter#
     */
    onGetWalletInfo:function()
    {
        this.transaction.getWalletInfo(function (response) {
            if(response.success)
            {
                var result = response.result;
            }
            else
            {
            }            
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
