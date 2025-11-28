var AbstractScreen = require('AbstractScreen');
// var LoginHandler = require('LoginHandler');
// var PopUpManager = require('PopUpManager').PopUpManager;
// var PopUpType = require('PopUpManager').PopUpType;

cc.Class({
    extends: AbstractScreen,

    properties: {
       email: {
           default:null,
           type: cc.EditBox
       }
        
    },

    // use this for initialization
    onLoad: function () {

    },
    onShow: function (init) {
    },

    onHide: function() {
        ScreenManager.showScreen(K.ScreenEnum.LoginScreen, 10, function () {},false);
            
    }
});
