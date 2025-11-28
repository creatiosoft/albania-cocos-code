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
var TableContent = cc.Class({
    extends: cc.Component,

    properties: {
        textFields: {
            default: [],
            type: cc.Label,
        },
        playerSprite: {
            default: null,
            type: cc.Sprite,
        },
        normalColor: {
            default: cc.Color.WHITE,
            // type: cc.Color,
            // visible: false,
        },
        selectedColor: {
            default: cc.Color.WHITE,
            // type: cc.Color,
        },
        channelData: {
            default: {},
            visible: false,
        },
        bg: {
            default: null,
            type: cc.Node,
        },
        dblClk: false,
        popUpManager: {
            default: null,
            type: PopupManagerType,
        },
        joinEffect: {
            default: null,
            type: cc.Node,
        },
        lockedNode: {
            default: null,
            type: cc.Node
        },
        turbo: {
            default: null,
            type: cc.Node
        },
        rit: {
            default: null,
            type: cc.Node
        },
        plyrText: {
            default: null,
            type: cc.Label,
        },

        runItTwiceIcon: {
            default: null,
            type: cc.Node
        },
    },

    statics: {
        prevSelection: null,
        callback: null,
        registered: false,
    },

    /**
     * @method onLoad 
     * @description Use this for initialization
     * @memberof Screens.Lobby.Table.TableContent#
     */
    onLoad: function () {
        var inst = this;
        if (inst.node.parent.parent.parent.parent.parent.name != "SideTable") {
            this.tableListChange = this.onTableListChanged.bind(this);
            this.onTableUpdate = this.onTableUpdated.bind(this);
            ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tableUpdate, this.onTableUpdate);
            ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.joinTableList, this.tableListChange);
            // GameManager.on(K.LobbyBroadcastRoute.joinTableList, this.tableListChange);
            // this.node.on('touchstart', function (event) {
            //     if (inst.dblClk) {
            //         if (TableContent.prevSelection === null) {
            //             return;
            //         }
            //         // if (TableContent.prevSelection.node.__inviteCode) {
            //         //     ServerCom.pomeloRequest(
            //         //         'room.channelHandler.joinChannelByInvitecode', 
            //         //         {
            //         //             'inviteCode': TableContent.prevSelection.node.__inviteCode,
            //         //             "playerId": GameManager.user.playerId,
            //         //             "networkIp":  LoginData.ipV4Address
            //         //         }, 
            //         //         function (response) {
            //         //             console.log(response);
            //         //             GameManager.onJoinSuccess(response, response.data);
            //         //             GameManager.emit("joinChannelByInvitecode");
            //         //         }, 
            //         //     null, 5000, false);
            //         //     TableContent.prevSelection = null;
            //         //     return;
            //         // }


            //         var data = new JoinData(TableContent.prevSelection.channelData);
            //         var route = K.PomeloAPI.joinChannel;

            //         if (TableContent.prevSelection.channelData.channelVariation === "Open Face Chinese Poker") {
            //             route = require("OFCConfigs").PomeloAPI.joinChannel;
            //         }
            //         if (TableContent.prevSelection.channelData.channelType == K.ChannelType.Normal) {
            //             GameManager.join(TableContent.prevSelection.channelData._id, route, data);
            //         } else if (TableContent.prevSelection.channelData.channelType == K.ChannelType.Tournament) {
            //             // if (TableContent.prevSelection.channelData.tournamentType == K.TournamentType.SitNGo) {
            //             TournamentHandler.tournamentLobbyInfo(TableContent.prevSelection.channelData, function (response) {
            //                 if (!!response.tableData) {
            //                     GameManager.popUpManager.show(PopUpType.TournamentLobbyInfoPopup, response, function () { });
            //                 }
            //             }.bind(this), function (response) { }.bind(this));
            //         }
            //         inst.dblClk = false;
            //     } else {
            //         inst.dblClk = true;
            //         setTimeout(function () {
            //             inst.dblClk = false;
            //         }, 300);
            //     }
            // }, this.node);
        }
    },

    /**
     * @method onDestroy
     * @description called When the node is destroyed, De-Regiter Broadcast
     * @memberof Screens.Lobby.Table.TableContent#
     */
    onDestroy: function () {
        if (this.tableListChange) {
            // pomelo.off(K.LobbyBroadcastRoute.tableUpdate, this.onTableUpdate);
            // pomelo.off(K.LobbyBroadcastRoute.joinTableList, this.tableListChange);
            // ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tableUpdate, this.onTableUpdated.bind(this));
            // GameManager.off(K.LobbyBroadcastRoute.joinTableList, this.tableListChange);
        }
    },

    /**
     * @method onClick
     * @description Click handler
     * @memberof Screens.Lobby.Table.TableContent#
     */
    onClick: function () {
        // console.log("onclick in tableContent..")
        if (TableContent.prevSelection !== null && TableContent.prevSelection !== undefined) {
            if (TableContent.prevSelection.node !== null && TableContent.prevSelection.node !== undefined) {
                // var lbls = TableContent.prevSelection.node.children[2];
                // if (!lbls)
                //     lbls = TableContent.prevSelection.node.children[1];
                // lbls.children.forEach(function (element) {
                //     element.color = cc.Color.BLACK;
                // }, this);
                if (!TableContent.prevSelection.joinEffect.active) {
                    TableContent.prevSelection.textFields.forEach(function (element) {
                        // element.node.color = cc.Color.BLACK;
                    }, this);
                }
                if (TableContent.prevSelection.bg == null) {
                    // TableContent.prevSelection.node.getChildByName("Bg").color = TableContent.prevSelection.normalColor;
                } else {
                    // TableContent.prevSelection.bg.color = TableContent.prevSelection.normalColor;
                }
            }
        }
        var bg = (!!this.bg) ? this.bg : this.node.getChildByName("Bg");
        this.normalColor = bg.color;
        // bg.color = this.selectedColor;
        TableContent.prevSelection = this;
        // var lbls = TableContent.prevSelection.node.children[2];
        // if (!lbls)
        //     lbls = TableContent.prevSelection.node.children[1];
        // lbls.children.forEach(function (element) {
        //     element.color = cc.Color.WHITE;
        // }, this);

        TableContent.prevSelection.textFields.forEach(function (element) {
            // element.node.color = cc.Color.WHITE;
        }, this);

        // if tournament check for already registered
        // if registered show deregister   
        if (TableContent.callback !== null) {
            TableContent.callback();
        }
        // if (!GameManager.user.muteGameSound) {

        //     GameManager.playSound(K.Sounds.click);
        // }
    },

    /**
     * @method setContentText
     * @description Set content of each label in a row
     * @param {Object} data 
     * @param {bool} textColor -Display text in Black if true else display in white
     * @memberof Screens.Lobby.Table.TableContent#
     */
    setContentText: function (data, textColor = true) {
        var count = 0;
        // console.log('setContentText ', data)
        this.textFields.forEach(function (element) {
            element.string = data[count];
            count++;
            if (textColor == true) {
                // element.node.color = cc.Color.BLACK;
            } else {
                // element.node.color = cc.Color.WHITE;
            }
        }, this);

        // this.playerSprite.fillRange = Number(data[5].split("/")[0]) / Number(data[5].split("/")[1]);

        // if (GameManager.isMobile) {
        //     this.plyrText.string = data[count];
        // }

        // if (GameManager.isP) {
        //     this.textFields[2].node.active = false;
        // }

        this.plyrText.string = data[5];
    },

    /**
     * @method onTableListChanged
     * @description control view of table in lobby joined by player
     * @param {object} eventData 
     * @memberof Screens.Lobby.Table.TableContent#
     */
    onTableListChanged: function (eventData) {
        // console.log("1", eventData.event)
        if (this.joinEffect) {
            if (this.channelData && eventData.channelId == this.channelData._id) {
                // if(this.channelData){
                // console.log("List Changed...",this.channelData,eventData.event, eventData.channelId == this.channelData._id)
                if (eventData.event == "PLAYERJOINTABLE") {
                    this.joinEffect.active = true;
                    this.textFields.forEach(function (element) {
                        // element.node.color = cc.Color.WHITE;
                    }, this);
                } else if (eventData.event == "PLAYERLEAVETABLE") {
                    this.joinEffect.active = false;
                    if (TableContent.prevSelection != this) {
                        this.textFields.forEach(function (element) {
                            // element.node.color = cc.Color.BLACK;
                        }, this);
                    }
                }
            }
        }
    },

    /**
     * @method onTableUpdated
     * @description Update any Data of contend
     * @param {Object} eventData
     * @memberof Screens.Lobby.Table.TableContent#
     */
    onTableUpdated: function (eventData) {

        if (this.channelData && eventData._id == this.channelData._id) {
            // console.log("Update table 2", eventData)
            for (var key in eventData.updated) {
                this.channelData[key] = eventData.updated[key];
                var selected = (TableContent.prevSelection) && TableContent.prevSelection._id == this.channelData._id;
                this.setContentText(this.table.makeContent(this.channelData), !selected);
            }
            // this.runItTwiceIcon.active = eventData.updated.isRunItTwice;
            // this.lockedNode.active = this.channelData.isPrivateTabel == "true";
        }
    },

    onGo() {
        let now = new Date().getTime();
        console.log("onGo", now - GameManager.lastClickTime);
        if (now - GameManager.lastClickTime < GameManager.clickInterval) {
            console.log("onGo1");
            return;
        }
        console.log("onGo2");
        GameManager.lastClickTime = now;
        GameManager.join(this.channelData._id, K.PomeloAPI.joinChannel, new JoinData(this.channelData));
    }
});
