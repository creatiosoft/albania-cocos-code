/**
 * @namespace Profile (WIP)
 */
var ServerCom = require('ServerCom');
var transactionHistory = require('PostTypes').TransactionHistory;
var UserId = require('PostTypes').UserID;
// var LoginPresenter = require('LoginPresenter');

/**
 * @class ProfileHandler
 * @classdesc
 * @memberof Profile (WIP)
 */
cc.Class({
    extends: cc.Component,

    properties: {
        // login:{
        //     default: null,
        //     type: LoginHandler,
        // },
    },

    // use this for initialization
    start: function () {
    },
   

/**
 * @description Gets transaction history from server
 * @method getTransactionHistory
 * @param {Number} lowerLimit
 * @param {Number} upperLimit
 * @param {Callback} callback
 * @memberof Profile (WIP).ProfileHandler#
 */
getTransactionHistory:function(lowerLimit, upperLimit, callback)
{
    var address = K.ServerAddress.ipAddress + ":" + K.ServerAddress.port + K.ServerAPI.transactionHistory;    
    var data = transactionHistory;
    var loginToken = GameManager.user;
    if(loginToken !== null && loginToken !== undefined)
    {
        data.userId = loginToken.userId;
        data.lowerLimit = lowerLimit;
        data.upperLimit = upperLimit;        
    }
    ServerCom.httpPostRequest(address, data, callback);
},

/**
 * @description Gets wallet information from server
 * @method getWalletInfo
 * @param {Callback} callback
 * @memberof Profile (WIP).ProfileHandler#
 */
getWalletInfo:function(callback)
{
    var address = K.ServerAddress.ipAddress + ":" + K.ServerAddress.port + K.ServerAPI.wallet;    
    var data = UserId;
    var loginToken = GameManager.user;
    if(loginToken !== null && loginToken !== undefined)
    {
        data.userId = loginToken.userId;     
    }
    ServerCom.httpPostRequest(address, data, callback);
},

});