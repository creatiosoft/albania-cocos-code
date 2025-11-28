var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var LoginData = require('PostTypes').Login;

/**
 * @classdesc
 * @class JoinGamePopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {
        popUpManager: {
            default: null,
            type: PopUpManager
        },
        code: {
            default: null,
            type: cc.EditBox,
        },
    },

    onLoad: function () {
    },

    onShow: function (data) {
    },

    onCode: function () {
        let self = this;
        console.log("onCode", LoginData.ipV4Address);

        if (GameScreen != null) {
            if(GameManager.isMobile) {
                GameManager.activeTableCount = GameScreen.gridParent.getComponent(cc.PageView).getPages().length;
            }
            else {
                GameManager.activeTableCount = GameScreen.gridParent.children.length;
            }
        } else {
            GameManager.activeTableCount = 0;
        }

        if (GameManager.activeTableCount >= GameManager.maxTableCounts) {
            GameManager.popUpManager.show(PopUpType.MaxTablesJoinedPopup, null, function () { });
            return;
        }
        
        ServerCom.pomeloRequest(
            'room.channelHandler.joinChannelByInvitecode', 
            {
                'inviteCode': this.code.string,
                "playerId": GameManager.user.playerId,
                "networkIp":  LoginData.ipV4Address
            }, 
            function (response) {
                console.log(response);

                if (response.success) {
                    console.log("onCode", JSON.stringify(response));

                    // GameManager.onJoinSuccess(response, response.data);

                    if (GameManager.verifyTablePrivate(response.channelId)) {
                        GameManager.onJoinSuccess(response, response.data);
                    }
                    else {
                        
                    }

                    self.onClose();
                }
                else {
                    GameManager.popUpManager.show(
                        PopUpType.CommonDialog, 
                        {
                            "title": "Error!",
                            "content" : response.info
                        }, 
                        function () {}
                    );
                    self.onClose();
                }
            }, 
        null, 5000, false);
    },

    onClose: function () {
        this.code.string = '';
        this.node.active = false;
    }

});