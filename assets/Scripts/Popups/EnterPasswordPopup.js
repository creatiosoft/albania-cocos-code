let PopUpManager = require('PopUpManager').PopUpManager;
let PopUpType = require('PopUpManager').PopUpType;
let PopUpBase = require('PopUpBase');

/**
 * @classdesc 
 * @class EnterPasswordPopup
 * @extends PopUpBase
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {
        passwordEditBox: {
            default: null,
            type: cc.EditBox
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    onShow: function (data) {
        this.passwordEditBox.string = "";
        this.data = data;
    },


    onSubmit: function () {
        GameManager.playSound(K.Sounds.click);
        if (this.passwordEditBox.string == "") {
            return;
        }

        if (this.data.type == "WAITING_LIST") {
            this.data.toCallFunction(this.data.flag, this.data.id, function (response) {
                this.data.cb(response, this.onQuit.bind(this));
            }.bind(this), null, this.passwordEditBox.string);
        } else {
            this.data.data.password = this.passwordEditBox.string;
            ServerCom.pomeloRequest(this.data.route, this.data.data,
                /*function(response) {
                               if (response.success) {
                                   GameManager.emit(K.LobbyBroadcastRoute.joinTableList, { channelId: _id });
                               }
                               onSuccess(response);
                           }*/
                this.data.onSuccess, this.data.onFail);
            // this.onQuit();            
        }
        

    },

    onQuit: function () {
        GameManager.popUpManager.hide(PopUpType.EnterPasswordPopup, function () {});
        GameManager.playSound(K.Sounds.click);

    }
});