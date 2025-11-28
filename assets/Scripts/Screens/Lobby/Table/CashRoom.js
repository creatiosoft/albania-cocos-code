// inherits Table.js
// 
var JoinData = require('PostTypes').JoinChannel;
var Table = require('Table');
var TableContent = require('TableContent');
var Advancefilter = require('Advancefilter');
// var Checkbox = require('Checkbox');
var DropDownType = require('DropDown');
var timerID = null;

var Variation = cc.Enum({
    None: -1,
    TexasHoldem: 1,
    Omaha: 2,
    OmahaHiLo: 3,
    OpenFaceChinesePoker: 4,
});

var tabType = cc.Enum({
    CashGames: 1,
    SitAndGo: 2,
    Tournaments: 3,
});

/**
 * @class CashTablePresenter
 * @classdesc handles table view manipulation for cash 
 * @extends Table
 * @memberof Screens.Lobby.Table
 */
var CashRoom = cc.Class({
    extends: cc.Component,

    properties: {
        dblClk: false,
        filter: {
            default: null,
            type: cc.Node,
        },
        top: {
            default: null,
            type: cc.Node,
        },
        top2: {
            default: null,
            type: cc.Node,
        },
        contentHolder: {
            default: null,
            type: cc.Node,
        },
        original: {
            default: null,
            type: cc.Node,
        },
        cashierTable: {
            default: null,
            type: cc.Node,
        },
        variation: Variation.TexasHoldem,
        isShowHoldem: false,
        isShowPLO: false,
        isShowMega: false,
        isShowAllIn: false,
        isShowFast: false,
        isShowAll: true,
        lockClick: false,
    },

    statics: {
        init: false,
        prevSelection: null,
        isPriactice: false,
    },

    onLoad: function () {
        ServerCom.pomeloBroadcast("newRoomAdd", this.onNewRoomAdd.bind(this));
        ServerCom.pomeloBroadcast("deleteRoom", this.onDeleteRoom.bind(this));
        GameManager.on("onRoomUpdate2", this.onRoomUpdate2.bind(this));
        GameManager.on("AdvancefilterUpdated", this.onAdvancefilterUpdated.bind(this));
        cc.systemEvent.on("leaveLobby", this.leaveLobby, this);
    },

    leaveLobby: function () {
        this.contentHolder.removeAllChildren(true);
    },

    onClick: function (event) {

        // let self = this;
        // if (self.dblClk) {
        //     if (CashRoom.prevSelection === null) {
        //         return;
        //     }

        //     if (self.lockClick) {
        //         return;
        //     }
        //     self.lockClick = true;
        //     self.scheduleOnce(() => {
        //         self.lockClick = false;
        //     }, 1);

        //     console.log("CashRoom.prevSelection", CashRoom.prevSelection);
        //     self.cashierTable.active = true;
        //     self.cashierTable.getComponent("Table").roomId = cc.find('go', CashRoom.prevSelection).getComponent(cc.Button).clickEvents[0].customEventData;
        //     self.cashierTable.getComponent('Table').onEnable();

        //     self.scheduleOnce(() => {
        //         self.node.scale = 0;
        //     }, 0.1);

        //     self.dblClk = false;
        // } else {
        //     self.dblClk = true;
        //     setTimeout(function () {
        //         self.dblClk = false;
        //     }, 200);
        // }
        // CashRoom.prevSelection = event.target;
    },

    onNewRoomAdd: function(data) {
        console.log("onNewRoomAdd", data);
        data = data.updated;
        let instance = cc.instantiate(this.original);
        instance.active = true;
        instance.setPosition(0, 0);
        cc.find('TableName', instance).getComponent(cc.Label).string = data.channelName;
        cc.find('avgPot', instance).getComponent(cc.Label).string = GameManager.convertChips(data.smallBlind) + "/" + GameManager.convertChips(data.bigBlind) + '';
        cc.find('l/vari/vari', instance).getComponent(cc.Label).string = data.channelVariation;

        if (data.channelVariation == 'Texas Hold’em') {
            // cc.find('TableName', instance).color = new cc.Color().fromHEX("#040C2F");

            cc.find('l/vari/vari', instance).getComponent(cc.Label).string = 'Hold’em';
            cc.loader.loadRes('tags/holdem', cc.SpriteFrame, function (err, tex) {
                if (!err) {
                    cc.find('l/vari', instance).getComponent(cc.Sprite).spriteFrame = tex;
                }
            });

            // cc.loader.loadRes('tags2/holdem', cc.SpriteFrame, function (err, tex) {
            //     if (!err) {
            //         cc.find('holdem', instance).getComponent(cc.Sprite).spriteFrame = tex;
            //     }
            // });
        }
        else if (data.channelVariation == 'Omaha') {
            // cc.find('TableName', instance).color = new cc.Color().fromHEX("#035306");
            cc.find('l/vari/vari', instance).getComponent(cc.Label).string = 'PLO';
            cc.loader.loadRes('tags/plo', cc.SpriteFrame, function (err, tex) {
                if (!err) {
                    cc.find('l/vari', instance).getComponent(cc.Sprite).spriteFrame = tex;
                }
            });

            // cc.loader.loadRes('tags2/plo', cc.SpriteFrame, function (err, tex) {
            //     if (!err) {
            //         cc.find('holdem', instance).getComponent(cc.Sprite).spriteFrame = tex;
            //     }
            // });
        }
        else if (data.channelVariation == 'Omaha 5') {
            // cc.find('TableName', instance).color = new cc.Color().fromHEX("#C140FF");
            cc.find('l/vari/vari', instance).getComponent(cc.Label).string = 'PLO 5';
            cc.loader.loadRes('tags/plo5', cc.SpriteFrame, function (err, tex) {
                if (!err) {
                    cc.find('l/vari', instance).getComponent(cc.Sprite).spriteFrame = tex;
                }
            });

            // cc.loader.loadRes('tags2/plo5', cc.SpriteFrame, function (err, tex) {
            //     if (!err) {
            //         cc.find('holdem', instance).getComponent(cc.Sprite).spriteFrame = tex;
            //     }
            // });
        }
        else if (data.channelVariation == 'Omaha 6') {
            // cc.find('TableName', instance).color = new cc.Color().fromHEX("#1F61C4");
            cc.find('l/vari/vari', instance).getComponent(cc.Label).string = 'PLO 6';
            cc.loader.loadRes('tags/plo6', cc.SpriteFrame, function (err, tex) {
                if (!err) {
                    cc.find('l/vari', instance).getComponent(cc.Sprite).spriteFrame = tex;
                }
            });

            // cc.loader.loadRes('tags2/plo6', cc.SpriteFrame, function (err, tex) {
            //     if (!err) {
            //         cc.find('holdem', instance).getComponent(cc.Sprite).spriteFrame = tex;
            //     }
            // });
        }
        else if (data.channelVariation == 'Mega Hold’em') {
            // cc.find('TableName', instance).color = new cc.Color().fromHEX("#FFB000");
            cc.find('l/vari/vari', instance).getComponent(cc.Label).string = 'Mega Hold’em';
            cc.loader.loadRes('tags/mega', cc.SpriteFrame, function (err, tex) {
                if (!err) {
                    cc.find('l/vari', instance).getComponent(cc.Sprite).spriteFrame = tex;
                }
            });

            // cc.loader.loadRes('tags2/mega', cc.SpriteFrame, function (err, tex) {
            //     if (!err) {
            //         cc.find('holdem', instance).getComponent(cc.Sprite).spriteFrame = tex;
            //     }
            // });
        }
        else {
            cc.loader.loadRes('tags/holdem', cc.SpriteFrame, function (err, tex) {
                if (!err) {
                    cc.find('l/vari', instance).getComponent(cc.Sprite).spriteFrame = tex;
                }
            });

            // cc.loader.loadRes('tags2/holdem', cc.SpriteFrame, function (err, tex) {
            //     if (!err) {
            //         cc.find('holdem', instance).getComponent(cc.Sprite).spriteFrame = tex;
            //     }
            // });
        }

        if (data.roomImage) {
            cc.find('icon', instance).roomImage = data.roomImage;
            cc.loader.load(K.ServerAddress.assets_server_s + data.roomImage, function (err, tex) {
                if (err) {   
                }
                else{
                    cc.find('icon', instance).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                }
            });
        }

        cc.find('Rit_Icon', instance).active = data.isRunItTwice;
        cc.find('allin_Icon', instance).active = data.isAllInAndFold;
        cc.find('go/Background/MinMax', instance).getComponent(cc.Label).string = GameManager.convertChips(data.minBuyIn);
        cc.find('players/plyrLbl', instance).getComponent(cc.Label).string = data.totalPlayer || 0;
        cc.find('sta', instance).active = false;
        cc.find('go', instance).getComponent(cc.Button).clickEvents[0].customEventData = data._id;
        instance.getComponent(cc.Button).clickEvents[0].customEventData = data._id;
        this.contentHolder.addChild(instance);
    },

    onRoomUpdate2: function(data) {
        console.log("onRoomUpdate2", data);

        for (var i = 0; i < this.contentHolder.children.length; i++) {
            let c = this.contentHolder.children[i];
            if (cc.find('go', c).getComponent(cc.Button).clickEvents[0].customEventData == data._id) {

                if (data.updated && data.updated.playingPlayers != null && data.updated.playingPlayers != undefined) {
                    cc.find('players/plyrLbl', c).getComponent(cc.Label).string = data.updated.playingPlayers;
                }

                break;
            }
        }
    },

    onDeleteRoom: function(data) {
        console.log("onDeleteRoom", data);

        for (var i = 0; i < this.contentHolder.children.length; i++) {
            let c = this.contentHolder.children[i];
            if (cc.find('go', c).getComponent(cc.Button).clickEvents[0].customEventData == data._id) {
                c.removeFromParent(true);
                break;
            }
        }
    },

    /**
     * @method onEnable
     * @description Life Cycle callback, call super() method; 
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    onEnable: function () {
        // this.top.active = !CashRoom.isPriactice;
        // this.top2.active = CashRoom.isPriactice;
        // var sch = function () {
        //     // console.log("GET  TABLE DATA CALLED ", this);
        //     this.onGetTableData();
        // };
        // cc.director.getScheduler().unschedule(sch, this);
        // if (!cc.director.getScheduler().isScheduled(sch, this)) {
        // console.log("SCHEDULING GET TABLE DATA ONCE");
        // this.scheduleOnce(sch.bind(this), 0.01);

        if (Advancefilter.config.enabled) {
            if (GameManager.isMobile) {
                // cc.find("Filters/GameType", this.node).color = new cc.color(4, 146, 99);
            }
            else {
                // cc.find("GameVariation/Filters/GameType", this.node).color = new cc.color(0, 255, 100);
            }
        }
        else {
            if (GameManager.isMobile) {
                // cc.find("Filters/GameType", this.node).color = new cc.color(255, 255, 255);
            }
            else {
                // cc.find("GameVariation/Filters/GameType", this.node).color = new cc.color(255, 255, 255);   
            }
        }
    },

    onEnable2: function (data, animated=true) {
        animated = false;
        // this.top.active = !CashRoom.isPriactice;
        // this.top2.active = CashRoom.isPriactice;

        // this.top.active = true;
        // this.top2.active = false;
        
        if (Advancefilter.config.enabled) {
            if (GameManager.isMobile) {
                // cc.find("Filters/GameType", this.node).color = new cc.color(4, 146, 99);
            }
            else {
                // cc.find("GameVariation/Filters/GameType", this.node).color = new cc.color(0, 255, 100);
            }
        }
        else {
            if (GameManager.isMobile) {
                // cc.find("Filters/GameType", this.node).color = new cc.color(255, 255, 255);
            }
            else {
                // cc.find("GameVariation/Filters/GameType", this.node).color = new cc.color(255, 255, 255);
            }
        }

        this.populateTable(data, animated);
    },

    onGetTableData: function (channelType = null) {
        var inst = this;
        ServerCom.pomeloRequest("connector.entryHandler.getLobbyRooms", {
            isRealMoney: false,
            channelVariation: "All",
            playerId: GameManager.user.playerId,
            isLoggedIn: true,
            access_token: K.Token.access_token
        }, function (response) {
            console.log("TABLE DATA IS ", JSON.parse(JSON.stringify(response)));
            

            if (response.success && response.result) {
                inst.populateTable(response.result);
            } else {
                // handle error
            }
        }, null, 5000, false);
    },

    populateTable: function (data, animated=true) {

        animated = false;

        console.log("isShowHoldem", this.isShowHoldem);
        console.log("isShowPLO", this.isShowPLO);
        console.log("isShowMega", this.isShowMega);
        console.log("isShowAllIn", this.isShowAllIn);
        console.log("isShowFast", this.isShowFast);
        console.log("isShowAll", this.isShowAll);

        this.contentHolder.removeAllChildren(true);

        this.cashierTable.getComponent("Table").roomData = data;

        for (var i = 0; i < data.length; i++) {
            let hit = false;
            if(this.isShowAll) {
                hit = true;
            }
            else {
                if (this.isShowHoldem && data[i].gameInfo.GameVariation == "Texas Hold’em" && !data[i].isAllInAndFold) {
                    hit = true;
                }
                if (this.isShowPLO && (data[i].gameInfo.GameVariation == "Omaha" || data[i].gameInfo.GameVariation == "Omaha 5" || data[i].gameInfo.GameVariation == "Omaha 6")) {
                    hit = true;
                }
                if (this.isShowMega && data[i].gameInfo.GameVariation == "Mega Hold’em") {
                    hit = true;
                }
                if (this.isShowFast && data[i].turnTime == 10) {
                    hit = true;
                }
                if (this.isShowAllIn && data[i].isAllInAndFold) {
                    hit = true;
                }

                if (!hit) {
                    continue;
                }
            }

            let adHit = false;
            if (Advancefilter.config.enabled) {
                if (Advancefilter.config.players["2"] && data[i].maxPlayers == 2) {
                    adHit = true;
                }
                if (Advancefilter.config.players["3"] && data[i].maxPlayers == 3) {
                    adHit = true;
                }
                if (Advancefilter.config.players["4"] && data[i].maxPlayers == 4) {
                    adHit = true;
                }
                if (Advancefilter.config.players["5"] && data[i].maxPlayers == 5) {
                    adHit = true;
                }
                if (Advancefilter.config.players["6"] && data[i].maxPlayers == 6) {
                    adHit = true;
                }
                if (Advancefilter.config.players["7"] && data[i].maxPlayers == 7) {
                    adHit = true;
                }
                if (Advancefilter.config.players["8"] && data[i].maxPlayers == 8) {
                    adHit = true;
                }
                if (Advancefilter.config.players["9"] && data[i].maxPlayers == 9) {
                    adHit = true;
                }

                // UltraLow --> 0-1
                // Low --> 1-20
                // Medium --> 20-100
                // High --> > 100
                if (Advancefilter.config.buyin["UltraLow"]) {
                    if (data[i].minBuyIn > 0 && data[i].minBuyIn <= 1) {
                        adHit = true;
                    }
                }
                if (Advancefilter.config.buyin["Low"]) {
                    if (data[i].minBuyIn > 1 && data[i].minBuyIn <= 20) {
                        adHit = true;
                    }
                }
                if (Advancefilter.config.buyin["Medium"]) {
                    if (data[i].minBuyIn > 20 && data[i].minBuyIn <= 100) {
                        adHit = true;
                    }
                }
                if (Advancefilter.config.buyin["High"]) {
                    if (data[i].minBuyIn > 100) {
                        adHit = true;
                    }
                }
                if (Advancefilter.config.limit["NoLimit"] && !data[i].isPotLimit) {
                    adHit = true;
                }
                if (Advancefilter.config.limit["PotLimit"] && data[i].isPotLimit) {
                    adHit = true;
                }
                if (Advancefilter.config.format["rit"] && data[i].isRunItTwice) {
                    adHit = true;
                }

                if (Advancefilter.config.stakes["min"] != "" && Advancefilter.config.stakes["max"] != "") {
                    if (data[i].smallBlind >= Number(Advancefilter.config.stakes["min"]) &&
                        data[i].smallBlind <= Number(Advancefilter.config.stakes["max"])) {
                        adHit = true;
                    }
                }
                else if (Advancefilter.config.stakes["max"] != "" && data[i].smallBlind <= Number(Advancefilter.config.stakes["max"])) {
                    adHit = true;
                }
                else if (Advancefilter.config.stakes["min"] != "" && data[i].smallBlind >= Number(Advancefilter.config.stakes["min"])) {
                    adHit = true;
                }

                if (!adHit) {
                    continue;
                }
            }

            let instance = cc.instantiate(this.original);
            instance.active = true;
            if (animated) {
                instance.opacity = 0;
            }
            cc.find('TableName', instance).getComponent(cc.Label).string = data[i].roomName;
            cc.find('avgPot', instance).getComponent(cc.Label).string = GameManager.convertChips(data[i].smallBlind) + "/" + GameManager.convertChips(data[i].bigBlind) + "";
            cc.find('l/vari/vari', instance).getComponent(cc.Label).string = data[i].gameInfo.GameVariation;
            if (data[i].gameInfo.GameVariation == 'Texas Hold’em') {
                // cc.find('TableName', instance).color = new cc.Color().fromHEX("#040C2F");
                cc.find('l/vari/vari', instance).getComponent(cc.Label).string = 'Hold’em';
                cc.loader.loadRes('tags/holdem', cc.SpriteFrame, function (err, tex) {
                    if (!err) {
                        cc.find('l/vari', instance).getComponent(cc.Sprite).spriteFrame = tex;
                    }
                });

                // cc.loader.loadRes('tags2/holdem', cc.SpriteFrame, function (err, tex) {
                //     if (!err) {
                //         cc.find('holdem', instance).getComponent(cc.Sprite).spriteFrame = tex;
                //     }
                // });
            }
            else if (data[i].gameInfo.GameVariation == 'Omaha') {
                // cc.find('TableName', instance).color = new cc.Color().fromHEX("#035306");
                cc.find('l/vari/vari', instance).getComponent(cc.Label).string = 'PLO';
                cc.loader.loadRes('tags/plo', cc.SpriteFrame, function (err, tex) {
                    if (!err) {
                        cc.find('l/vari', instance).getComponent(cc.Sprite).spriteFrame = tex;
                    }
                });
                // cc.loader.loadRes('tags2/plo', cc.SpriteFrame, function (err, tex) {
                //     if (!err) {
                //         cc.find('holdem', instance).getComponent(cc.Sprite).spriteFrame = tex;
                //     }
                // });
            }
            else if (data[i].gameInfo.GameVariation == 'Omaha 5') {
                // cc.find('TableName', instance).color = new cc.Color().fromHEX("#C140FF");
                cc.find('l/vari/vari', instance).getComponent(cc.Label).string = 'PLO 5';
                cc.loader.loadRes('tags/plo5', cc.SpriteFrame, function (err, tex) {
                    if (!err) {
                        cc.find('l/vari', instance).getComponent(cc.Sprite).spriteFrame = tex;
                    }
                });
                // cc.loader.loadRes('tags2/plo5', cc.SpriteFrame, function (err, tex) {
                //     if (!err) {
                //         cc.find('holdem', instance).getComponent(cc.Sprite).spriteFrame = tex;
                //     }
                // });
            }
            else if (data[i].gameInfo.GameVariation == 'Omaha 6') {
                // cc.find('TableName', instance).color = new cc.Color().fromHEX("#1F61C4");
                cc.find('l/vari/vari', instance).getComponent(cc.Label).string = 'PLO 6';
                cc.loader.loadRes('tags/plo6', cc.SpriteFrame, function (err, tex) {
                    if (!err) {
                        cc.find('l/vari', instance).getComponent(cc.Sprite).spriteFrame = tex;
                    }
                });
                // cc.loader.loadRes('tags2/plo6', cc.SpriteFrame, function (err, tex) {
                //     if (!err) {
                //         cc.find('holdem', instance).getComponent(cc.Sprite).spriteFrame = tex;
                //     }
                // });
            }
            else if (data[i].gameInfo.GameVariation == 'Mega Hold’em') {
                // cc.find('TableName', instance).color = new cc.Color().fromHEX("#FFB000");
                cc.find('l/vari/vari', instance).getComponent(cc.Label).string = 'Mega Hold’em';
                cc.loader.loadRes('tags/mega', cc.SpriteFrame, function (err, tex) {
                    if (!err) {
                        cc.find('l/vari', instance).getComponent(cc.Sprite).spriteFrame = tex;
                    }
                });
                // cc.loader.loadRes('tags2/mega', cc.SpriteFrame, function (err, tex) {
                //     if (!err) {
                //         cc.find('holdem', instance).getComponent(cc.Sprite).spriteFrame = tex;
                //     }
                // });
            }
            else {
                cc.loader.loadRes('tags/holdem', cc.SpriteFrame, function (err, tex) {
                    if (!err) {
                        cc.find('l/vari', instance).getComponent(cc.Sprite).spriteFrame = tex;
                    }
                });
                // cc.loader.loadRes('tags2/holdem', cc.SpriteFrame, function (err, tex) {
                //     if (!err) {
                //         cc.find('holdem', instance).getComponent(cc.Sprite).spriteFrame = tex;
                //     }
                // });
            }

            cc.find('Rit_Icon', instance).active = data[i].isRunItTwice;
            cc.find('allin_Icon', instance).active = data[i].isAllInAndFold;
            cc.find('go/Background/MinMax', instance).getComponent(cc.Label).string = data[i].gameInfo.BuyIn;
            cc.find('players/plyrLbl', instance).getComponent(cc.Label).string = data[i].totalPlayer;
            cc.find('sta', instance).active = false;
            cc.find('go', instance).getComponent(cc.Button).clickEvents[0].customEventData = data[i]._id;
            instance.getComponent(cc.Button).clickEvents[0].customEventData = data[i]._id;



            if (data[i].roomImage) {

                if (cc.find('icon', instance).getComponent(cc.Sprite).spriteFrame) {
                    if (data[i].roomImage == cc.find('icon', instance).roomImage) {

                    }
                    else {
                        cc.loader.load(K.ServerAddress.assets_server_s + data[i].roomImage, function (err, tex) {
                            if (err) {   
                            }
                            else{
                                cc.find('icon', instance).roomImage = data[i].roomImage;
                                cc.find('icon', instance).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                            }
                        });
                    }
                }
                else {
                    cc.find('icon', instance).roomImage = data[i].roomImage;
                    cc.loader.load(K.ServerAddress.assets_server_s + data[i].roomImage, function (err, tex) {
                        if (err) {   
                        }
                        else{
                            cc.find('icon', instance).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                        }
                    });
                }
            }

            this.contentHolder.addChild(instance);

            if (animated) {
                this.scheduleOnce(() => {
                    instance.x = 1000;
                    instance.opacity = 255;
                    instance.runAction(
                        cc.sequence(
                            cc.moveTo(0.3, cc.v2(0, instance.y)),
                            cc.callFunc(() => {
                                // instance.x = 0;
                            })
                        )
                    );
                }, 0.05 * i);
            }
        }
    },


    /**
     * @method tableContentClick
     * @description Method called for everytime a table is clicked
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    tableContentClick: function () {
        // if (TableContent.prevSelection !== null) {
        //     this.tempSelection = this.contentPool.indexOf(TableContent.prevSelection.node);
        // }
        // if (!GameManager.isMobile)
        //     this.refreshSideTable();
    },

    /**
     * @method addTable
     * @description Add Table From DashBoard to lobby!
     * @param {object} data -Table content data!
     * @memberof  CashTablePresenter#
     */
    addTable: function (data) {
        if (data.updated.channelType == K.ChannelType.Normal) {
            this._super(data);
        }
    },


//     onHFTSound: function () {
//         GameManager.playSound(K.Sounds.click);
// // console.log("HFT")
//         this.applyFilter();
//     },
    
    


    /**
     * @method makeContent
     * @description Returns content array based on table data
     * @param {object} data -
     * @memberof Screens.Lobby.Table.CashTablePresenter#
     */
    makeContent: function (data) {

        // make data - need more datas from server
        if (this.variation == K.Variation.OpenFaceChinesePoker) {
            var content = [data.channelName, data.chipsPointRatio, data.channelVariation, GameManager.getGameTypeByValue(data.turnTime), data.minBuyIn, data.maxBuyIn, data.playingPlayers + "/" + data.maxPlayers, data.queuePlayers];
        } else {
            if (data && data.avgPot) {
                //this is done because the avg stack is  used to set avgpot; askVivek
                data.avgStack = data.avgPot;
            }
            let variation = data.channelVariation;
            switch (data.channelVariation) {
                case K.Variation.TexasHoldem:
                    variation = LocalizedManager.t( 'TXT_HOLDEM' );
                    break;
                case K.Variation.Omaha:
                    variation = LocalizedManager.t( 'TXT_OMAHA' );
                    break;
                case K.Variation.OmahaHiLo:
                    variation = LocalizedManager.t( 'TXT_OMAHA_HI_LO' );
                    break;
                default:
                    variation = data.channelVariation;
                     break;
            }
            if (!GameManager.isMobile)
                var content = [data.channelName, data.smallBlind + "/" + data.bigBlind, variation, data.minBuyIn, data.maxBuyIn, data.playingPlayers + "/" + data.maxPlayers, data.queuePlayers, " " + data.avgStack, parseInt(data.flopPercent)];
                // var content = [data.channelName, data.smallBlind + "/" + data.bigBlind, variation, data.minBuyIn, data.maxBuyIn, data.playingPlayers + "/" + data.maxPlayers, parseInt(data.flopPercent), " " + data.avgStack, data.queuePlayers];
            else
                var content = [data.channelName, data.smallBlind + "/" + data.bigBlind + ", " + variation, LocalizedManager.t( 'TXT_AVG_POT') + ': ' + data.avgStack, data.minBuyIn + "/" + data.maxBuyIn, LocalizedManager.t( 'TXT_PLAYERS') , data.playingPlayers + "/" + data.maxPlayers];
        }

        return content;
    },

    getTableData2: function (roomId, filter, callback) {
        ServerCom.pomeloRequest("connector.entryHandler.getTableByRoomId", {
            isRealMoney: true,
            channelVariation: filter,
            playerId: GameManager.user.playerId,
            isLoggedIn: true,
            access_token: K.Token.access_token,
            roomId: roomId
        }, callback, null, 5000, false);
    },

    goto: function(event, msg) {
        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 1);
        
        console.log('goto', msg);

        var inst = this;

        
        inst.cashierTable.getComponent("Table").roomId = msg;

        // ServerCom.forceKeepLoading = true;
        this.getTableData2(msg, 1, (response) => {

            // ServerCom.forceKeepLoading = false;
            ServerCom.loading.active = false;
            inst.cashierTable.getComponent('Table').onEnable2(response.result);
            inst.cashierTable.active = true;
            inst.node.scale = 0;

            inst.top.active = false;
            inst.top2.active = true;
        });

        // this.scheduleOnce(() => {
        //     inst.cashierTable.active = true;
        //     inst.node.active = false;
        // }, 0.5);
    },

    onAdvancefilterUpdated: function() {
        if (Advancefilter.config.enabled) {
            cc.find("filter", this.filter).color = new cc.color(255, 166, 39);
        }
        else {
            cc.find("filter", this.filter).color = new cc.color(255, 255, 255);
        }
        this.onGetTableData();
    }

});
