
cc.Class({
    extends: cc.Component,

    properties: {
        contentParent: {
            default: null,
            type: cc.Node,
        },
        players: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    start() {
        GameManager.emit("disablePageView");
    },

    onShow: function (data) {
        this.contentParent.children.forEach(function (element, i) {
            element.active = false;
        }, this);

        // {
        //     "err": null,
        //     "data": {
        //         "success": true,
        //         "data": [
        //             {
        //                 "_id": "665daeb272f0808cbe44d868",
        //                 "playersResults": {
        //                     "13e2893d-7e82-4849-ab93-f957f9b61f9d": {
        //                         "buyIn": 1000,
        //                         "currentChips": 980
        //                     },
        //                     "2473e21b-20dc-4b66-ba85-59c5b9269133": {
        //                         "buyIn": 1000,
        //                         "currentChips": 1018
        //                     }
        //                 }
        //             }
        //         ]
        //     },
        //     "requestedPlayerId": "13e2893d-7e82-4849-ab93-f957f9b61f9d",
        //     "eventOrigin": "room.channelHandler.getCurrentGameResult"
        // }

        // this.players.string = "0";
        if (data && data[0] && data[0].playersResults) {
            this.players.node.parent.active = true;
            let da = data[0].playersResults;
            this.players.string = Object.keys(da).length;
            let i = 0;
            for (var key in da) {
                let d = da[key];
                this.contentParent.children[i].active = true;
                cc.find('name', this.contentParent.children[i]).getComponent(cc.Label).string = d.playerName || "???";
                cc.find('buy', this.contentParent.children[i]).getComponent(cc.Label).string = d.buyIn;
                cc.find('w', this.contentParent.children[i]).getComponent(cc.Label).string = (d.winning.toFixed(2) > 0 ? "+" : "" ) + d.winning.toFixed(2);

                if (d.winning.toFixed(2) >= 0) {
                    cc.find('w', this.contentParent.children[i]).color = new cc.Color().fromHEX("#15DE41");
                }
                else {
                    cc.find('w', this.contentParent.children[i]).color = new cc.Color().fromHEX("#FF0000");            
                }

                // if (d.currentChips > 0) {
                //     cc.find('w', this.contentParent.children[i]).color = new cc.Color().fromHEX("#33FF00");
                // }
                // else {
                //     cc.find('w', this.contentParent.children[i]).color = new cc.Color().fromHEX("#FF0000");
                // }

                if (d.playerName == GameManager.user.userName) {
                    cc.find('name', this.contentParent.children[i]).color = new cc.Color().fromHEX("#E6C888");
                    cc.find('buy', this.contentParent.children[i]).color = new cc.Color().fromHEX("#E6C888");
                    cc.find('w', this.contentParent.children[i]).color = new cc.Color().fromHEX("#E6C888");
                }

                i += 1;
            }
        }
        else {
            this.players.string = "";
            this.players.node.parent.active = false;
        }

        // for (var i = 0; i < data.length; i++) {
            // let da = data[0].playersResults;

            // let i = 0;
            // for (var key in da) {
            //     let d = da[key];
            //     this.contentParent.children[i].active = true;
            //     cc.find('name', this.contentParent.children[i]).getComponent(cc.Label).string = d.playerName || "???";
            //     cc.find('buy', this.contentParent.children[i]).getComponent(cc.Label).string = d.buyIn;
            //     cc.find('w', this.contentParent.children[i]).getComponent(cc.Label).string = (d.currentChips >= 0 ? "+" : "-" ) + d.currentChips;

            //     if (d.currentChips > 0) {
            //         cc.find('w', this.contentParent.children[i]).color = new cc.Color().fromHEX("#33FF00");
            //     }
            //     else {
            //         cc.find('w', this.contentParent.children[i]).color = new cc.Color().fromHEX("#FF0000");
            //     }

            //     i += 1;
            // }
            
        // }
    },
    
    onClose: function () {
        GameManager.emit("enablePageView");
        this.node.active = false;
        GameManager.emit("showJoinSimlar");
    }

});
