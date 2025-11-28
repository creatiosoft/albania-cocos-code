// attached to table row prefab
var JoinData = require('PostTypes').JoinChannel;
var PopupManagerType = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var LoginData = require('PostTypes').Login;

/**
 * @class TableContent
 * @classdesc This class is used in content node to manage view and maintain the selection / update records. 
 * @memberof Screens.Lobby.Table
 */
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tableUpdate, this.onTableUpdated.bind(this));
    },

    onTableUpdated: function (eventData) {

        if (eventData._id == this.table._id) {
            // console.log("Update table 2", eventData)
            for (var key in eventData.updated) {
                if (key == 'playingPlayers') {
                    if (eventData.updated.playingPlayers > 0) {
                        cc.find('expire', this.node).active = false;
                        cc.find('remove/scaler/New Node', this.node).getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
                        cc.find('remove', this.node).getComponent(cc.Button).enabled = false;
                    }
                    else {
                        cc.find('expire', this.node).active = true;
                        cc.find('remove/scaler/New Node', this.node).getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
                        cc.find('remove', this.node).getComponent(cc.Button).enabled = true;

                        if (eventData.updated.expiredAt) {
                            this.table.expiredAt = eventData.updated.expiredAt;
                            let timeRemaining = GameManager.getMTimeDuration(Number(this.table.expiredAt));
                            cc.find('expire', this.node).getComponent(cc.Label).string = "Expire in: " + timeRemaining;
                        }
                    }
                    break;
                }
            }
        }
    },

    init: function(table) {
        let self = this;
        this.table = table;
        let timeRemaining = GameManager.getMTimeDuration(Number(table.expiredAt));
        cc.find('expire', this.node).getComponent(cc.Label).string = "Expire in: " + timeRemaining;
        cc.find('TableName', this.node).getComponent(cc.Label).string = table.channelName;
        cc.find('sta/Stakes', this.node).getComponent(cc.Label).string = 'Blinds: ' + table.smallBlind + "/" + table.bigBlind;
        cc.find('vari/vari', this.node).getComponent(cc.Label).string = table.channelVariation;

        if (table.playingPlayers > 0) {
            cc.find('expire', this.node).active = false;
            cc.find('remove/scaler/New Node', this.node).getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
            cc.find('remove', this.node).getComponent(cc.Button).enabled = false;
        }
        else {
            cc.find('expire', this.node).active = true;
            cc.find('remove/scaler/New Node', this.node).getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
            cc.find('remove', this.node).getComponent(cc.Button).enabled = true;
        }

        this.schedule(() => {
            var date = new Date();
            let milli = parseInt(this.table.expiredAt);
            if (date.getTime() < this.table.expiredAt) {
                let timeRemaining = GameManager.getMTimeDuration(Number(this.table.expiredAt));
                cc.find('expire', this.node).getComponent(cc.Label).string = "Expire in: " + timeRemaining;
            }
            else {
                let timeRemaining = GameManager.getMTimeDuration(Number(this.table.expiredAt));
                cc.find('expire', this.node).getComponent(cc.Label).string = "Expired";
            }
        }, 1);

        if (table.channelVariation == 'Texas Hold’em') {
            cc.find('vari/vari', this.node).getComponent(cc.Label).string = 'Hold’em';
            cc.loader.loadRes('tags/holdem', cc.SpriteFrame, function (err, tex) {
                if (!err) {
                    cc.find('vari', self.node).getComponent(cc.Sprite).spriteFrame = tex;
                }
            });
        }
        else if (table.channelVariation == 'Omaha') {
            cc.find('vari/vari', this.node).getComponent(cc.Label).string = 'PLO';
            cc.loader.loadRes('tags/plo', cc.SpriteFrame, function (err, tex) {
                if (!err) {
                    cc.find('vari', self.node).getComponent(cc.Sprite).spriteFrame = tex;
                }
            });
        }
        else if (table.channelVariation == 'Omaha 5') {
            cc.find('vari/vari', this.node).getComponent(cc.Label).string = 'PLO5';
            cc.loader.loadRes('tags/plo5', cc.SpriteFrame, function (err, tex) {
                if (!err) {
                    cc.find('vari', self.node).getComponent(cc.Sprite).spriteFrame = tex;
                }
            });
        }
        else if (table.channelVariation == 'Omaha 6') {
            cc.find('vari/vari', this.node).getComponent(cc.Label).string = 'PLO6';
            cc.loader.loadRes('tags/plo6', cc.SpriteFrame, function (err, tex) {
                if (!err) {
                    cc.find('vari', self.node).getComponent(cc.Sprite).spriteFrame = tex;
                }
            });
        }
        else if (table.channelVariation == 'Mega Hold’em') {
            cc.find('vari/vari', this.node).getComponent(cc.Label).string = 'Mega Hold’em';
            cc.loader.loadRes('tags/mega', cc.SpriteFrame, function (err, tex) {
                if (!err) {
                    cc.find('vari', self.node).getComponent(cc.Sprite).spriteFrame = tex;
                }
            });
        }
        else {
            cc.loader.loadRes('tags/holdem', cc.SpriteFrame, function (err, tex) {
                if (!err) {
                    cc.find('vari', self.node).getComponent(cc.Sprite).spriteFrame = tex;
                }
            });
        }

        cc.find('buy/Background/MinMax', this.node).getComponent(cc.Label).string = table.minBuyIn + "/" + table.maxBuyIn;
        cc.find('avgPot', this.node).getComponent(cc.Label).string = 'Avrg. Pot: ' + table.avgStack;
        cc.find('remove', this.node).getComponent(cc.Button).clickEvents[0].customEventData = table._id;

        this.node.__inviteCode = table.inviteCode;
    },

    onDestroy: function () {
        
    },

    onJoin: function () {
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
                'inviteCode': this.table.inviteCode,
                "playerId": GameManager.user.playerId,
                "networkIp":  LoginData.ipV4Address
            }, 
            function (response) {
                console.log(response);
                GameManager.emit("joinChannelByInvitecode");
                if (GameManager.verifyTablePrivate(response.channelId)) {
                    GameManager.onJoinSuccess(response, response.data);
                }
                else {
                    
                }
            }, 
        null, 5000, false);
    }
});
