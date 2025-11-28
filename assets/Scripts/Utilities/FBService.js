var fbService = null;
// var LoginPresenter =  require('LoginPresenter');

/**
 * @class FBService
 * @classdesc 
 * @memberof Utilities
 */
cc.Class({
    extends: cc.Component,

    properties: {
       fbObject:{
           default: null,
           visible: false,
       },
    //    login:{
    //        default: null,
    //        type: LoginPresenter,
    //    },
       debugLabel:{
            default: null,
            type: cc.Label,
       },
    },

    /**
     * @description 
     * @method onLoad
     * @memberof Utilities.FBService#
     */
    onLoad: function () {
        fbService = this;
        // sdkbox.PluginFacebook.init();
    },
    
    start:function()
    {
        // set listeners
        // sdkbox.PluginFacebook.setListener({
        //     onLogin: function(isLogin, msg) {
        //         fbService.onLoginSuccess();
        //         this.debugLabel.string = "onLogin!"; 
        //     },
        //     onAPI: function(tag, data) {
        //         this.debugLabel.string = "onAPI!"; 
        //     this.onPermissionSuccess(tag, data); // to check 
        //     },
        //     onSharedSuccess: function(data) {
        //         this.debugLabel.string = "onSharedSuccess!"; 
        //     },
        //     onSharedFailed: function(data) {
        //         this.debugLabel.string = "onSharedFailed!"; 
        //     },
        //     onSharedCancel: function() {
        //         this.debugLabel.string = "onSharedCancel!"; 
        //     },
        //     onPermission: function(isLogin, msg) {
        //         this.debugLabel.string = "onPermission!"; 
        //     }
        // });
    },
    
    /**
     * @description FB login button callback
     * @method onLogin
     * @memberof Utilities.FBService#
     */
    onLogin:function()
    {
        this.debugLabel.string = "OnLoginBtn!"; 
        // if(!sdkbox.PluginFacebook.isLoggedIn())
        // {
        //     sdkbox.PluginFacebook.login();
        // }
        // else
        // {
        // }
    },
    
    /**
     * @description FB logout button callback
     * @method onLogout
     * @memberof Utilities.FBService#
     */
    onLogout:function()
    {
        if(sdkbox.PluginFacebook.isLoggedIn())
        {
            sdkbox.PluginFacebook.logout();
        }
        else
        {
        }
    },
    
    /**
     * @description Login success callback
     * @method onLoginSuccess
     * @memberof Utilities.FBService#
     */
    onLoginSuccess:function()
    {
        if(sdkbox.PluginFacebook.isLoggedIn())
        {            
            sdkbox.PluginFacebook.requestReadPermissions(["public_profile", "email"]);          
        }
        else
        {
        }
    },
    
    /**
     * @description Login with permission success callback
     * @method onPermissionSuccess
     * @param {Number} Tag
     * @param {Object} data
     * @memberof Utilities.FBService#
     */
    onPermissionSuccess:function(Tag, data)
    {       
        // currently used with onAPI listener - test if it is working
        var Object = {
            name: "",
            email: "",
            token: "",
        };
        fbService.fbObject = data;
        this.debugLabel.string = fbService.fbObject;
        Object.name = fbService.fbObject['name'];
        Object.email = fbService.fbObject['email'];
        Object.token = fbService.fbObject;
        fbService.login.onSocialLogin(Object, "facebook");
    },
});