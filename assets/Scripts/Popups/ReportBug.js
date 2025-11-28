var PopUpType = require('PopUpManager').PopUpType;

cc.Class({
    extends: cc.Component,

    properties: {
        pokerModel: {
            default: null,
            type: cc.Node,
        },
        contentParent: {
            default: null,
            type: cc.Node,
        },
        item: {
            default: null,
            type: cc.Node,
        },
        scrollView: {
            default: null,
            type: cc.Node,
        },
        tableId: {
            default: null,
            type: cc.Label,
        },
        gameId: {
            default: null,
            type: cc.Label,
        },
        gameType: {
            default: null,
            type: cc.Label,
        },
        gameDate: {
            default: null,
            type: cc.Label,
        },
        selected: {
            default: null,
            type: cc.Label,
        },
        description: {
            default: null,
            type: cc.EditBox,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.pokerGame = this.pokerModel.getComponent('PokerModel');
    },

    start() {
    },

    onShow: function (data) {

        this.scrollView.active = false;
        this.selected.string = "Select your Issue";
        this.description.string = '';

        GameManager.emit("disablePageView");

        this.tableId.string = "#" + this.pokerGame.gameData.tableId;
        this.gameId.string = "#" + this.pokerGame.gameData.channelId;
        this.gameType.string = this.pokerGame.roomConfig.channelVariation;
        let date = new Date();
        this.gameDate.string = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' }) + ", " + date.toLocaleTimeString("en-US").substr(0, (date.toLocaleTimeString("en-US") + " ").indexOf(" "));
        // [
        //     "Disconnection issue",
        //     "Game issue",
        //     "Score issue",
        //     "Request a call back",
        //     "Orthers"
        // ]

        console.log("this.pokerGame.roomConfig", this.pokerGame.roomConfig);
        console.log("this.pokerGame.gameData", this.pokerGame.gameData);

        this.contentParent.removeAllChildren(true);
        for (var i = 0; i < data.length; i++) {
            let stickerImages = data[i];
            let poolObject = cc.instantiate(this.item);
            poolObject.active = true;
            poolObject.y = 0;
            poolObject.getComponent(cc.Label).string = stickerImages;
            poolObject.getComponent(cc.Button).clickEvents[0].customEventData = stickerImages;
            poolObject.parent = this.contentParent;
        }
    },

    onSelect: function(event, msg) {
        this.selected.string = msg;
        this.scrollView.active = false;
    },

    onShowScrollView: function() {
        if (this.scrollView.active) {
            this.scrollView.active = false;
        }
        else {
            this.scrollView.active = true;
        }
    },

    onHideScrollView: function() {
        this.scrollView.active = false;
    },
    
    onClose: function () {
        GameManager.emit("enablePageView");
        this.node.active = false;
    },
    
    onReport: function () {
        if (this.selected.string == "Select your Issue") {
            return;
        }
        if (this.description.string.trim() == "") {
            return;
        }

        let inst = this;
        ServerCom.pomeloRequest("connector.entryHandler.reportBug",
            {
                "gameType": this.pokerGame.roomConfig.channelVariation,
                "gameId": this.pokerGame.gameData.tableId,
                "tableId": "tableId",
                "issue": this.selected.string,
                "note": this.description.string,
                "playerId": GameManager.user.playerId
            }, function (response) {
            console.log("reportBug", response);

            if (response.success) {
                inst.description.string = '';
                inst.selected.string = 'Select your Issue';
                inst.node.active = false;

                GameManager.popUpManager.show(
                    PopUpType.CommonDialog, 
                    {
                        "title": "Thanks!",
                        "content" : "Your report has been sent to the developer."
                    }, 
                    function () {}
                );
            }
        });
    }

});
