var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

/**
 * @classdesc Manages Cashier PopUp
 * @class CashierPopUp
 * @extends PopUpBase
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        popUpManager: {
            default: null,
            type: PopUpManager
        },

        playerName: {
            default: null,
            type: cc.EditBox,
        },

        amount: {
            default: null,
            type: cc.EditBox,
        },

        content: {
            default: null,
            type: cc.Node,
        },

        cell: {
            default: null,
            type: cc.Node,
        },
    },

    onLoad: function () {
    },

    onShow: function (data) {
        console.log("onShow", data);

        this.cb = data.restoreActiveTab;
        this.content.removeAllChildren(true);
        this.playerName.string = "";
        this.amount.string = "";
        let count = 1;
        for (var i = 0; i < data.length; i++) {
            let record = data[i];
            const instance =  cc.instantiate(this.cell);
            instance.x = 0;
            instance.active = true;
            this.content.addChild(instance);
            // 
            instance.children[0].getComponent(cc.Label).string = count + '';
            let date = new Date(record.time);
            let y = date.getFullYear();
            let m = ("0" + (date.getMonth() + 1)).slice(-2);
            let d = ("0" + date.getDate()).slice(-2);
            let h = ("0" + date.getHours() ).slice(-2);
            let min = ("0" + date.getMinutes()).slice(-2);
            let sec = ("0" + date.getSeconds()).slice(-2);

            if (record.senderUserName == GameManager.user.userName) {
                instance.children[1].getComponent(cc.Label).string = "SEND";
            }
            else {
                instance.children[1].getComponent(cc.Label).string = "RECEIVE";
            }

            instance.children[2].getComponent(cc.Label).string = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' }) + ", " + date.toLocaleTimeString("en-US").substr(0, (date.toLocaleTimeString("en-US") + " ").indexOf(" "));
            instance.children[3].getComponent(cc.Label).string = record.senderUserName;
            instance.children[4].getComponent(cc.Label).string = record.receiverUserName;
            instance.children[5].getComponent(cc.Label).string = record.amount;
            
            count += 1;
        }


        // {
        //     "_id": "6540a454bc5ce5665c1d19e1",
        //     "senderPlayerId": "b2935d44-0049-4952-9d50-2868fb00b8c9",
        //     "senderName": " ",
        //     "senderUserName": "test01",
        //     "receiverPlayerId": "b39075d4-e677-41f3-a890-041b661095a2",
        //     "receiverName": " ",
        //     "receiverUserName": "test02",
        //     "amount": 100,
        //     "time": 1698735188902,
        //     "status": "success",
        //     "description": "100 chips was transferred from  to "
        // }
    },

    onQuit: function () {
        GameManager.playSound(K.Sounds.click);

        if (!!this.cb) {
            this.cb();
        }
        this.popUpManager.hide(PopUpType.FundTransferPopup, function () {});
    },

    onTextChanged: function(text, editbox, customEventData) {
        var validNumber = new RegExp(/^\d*\.?\d*$/);
        console.log(validNumber.test(text));

        if (validNumber.test(text)) {
            this.last = text;

            editbox.blur();
            this.blured = true;
            this.amount.string = text;
            this.last = text;
            editbox.focus();
        }
        else {
            editbox.blur();
            this.blured = true;
            this.amount.string = this.last;
            editbox.focus();
        }
    },

    onTextBegan: function(text, editbox, customEventData) {
        this.blured = false;
        this.last = this.amount.string;
    },

    onSubmit: function() {
        let amout = Number(this.amount.string);
        if (amout < 100) {
            GameManager.popUpManager.show(PopUpType.NotificationPopup, "Invalid amount", function () { });
            return;
        }
        if (this.playerName.string.trim() == "") {
            GameManager.popUpManager.show(PopUpType.NotificationPopup, "Invalid player name", function () { });
            return;
        }

        var requestObject = {
            amount: amout,
            senderUserName: GameManager.user.userName,
            receiverUserName: this.playerName.string,
        };

        ServerCom.pomeloRequest("connector.entryHandler.onTransferChips", requestObject, function (response) {
            console.log("response", response);
            if (response.success) {

                GameManager.popUpManager.show(PopUpType.NotificationPopup, "Fund transfer is done successfully!", function () { });

                requestObject = {
                    senderUserName: GameManager.user.userName,
                    receiverUserName: GameManager.user.userName,
                    skip: 0,
                    limit: 20,
                    sortValue: "time"
                };
                ServerCom.pomeloRequest("connector.entryHandler.getP2PChipsTransferringHistory", {"query": requestObject}, function (response) {
                    console.log("response", response);
                    if (response.success) {
                        this.onShow(response.data);
                    }
                    else {
                        GameManager.popUpManager.show(PopUpType.NotificationPopup, response.info, function () { });
                    }
                }.bind(this), null, 3000);
            }
            else {
                GameManager.popUpManager.show(PopUpType.NotificationPopup, response.info, function () { });
            }
        }.bind(this), null, 3000);
    }
});