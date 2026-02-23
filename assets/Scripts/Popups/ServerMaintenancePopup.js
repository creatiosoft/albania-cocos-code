var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

cc.Class({
    extends: PopUpBase,

    properties: {

        message: {
            default: null,
            type: cc.Label,
        },

        dismissNode: {
            default: null,
            type: cc.Node,
        },

        dismissToggle: {
            default: null,
            type: cc.Toggle,
        },
    },

    onShow: function (data) {

        // {
        //     "action": "created",
        //     "message": "Server is scheduled for maintenance on 28th Nov 2:20 PM IST",
        //     "timestamp": 1764314987653,
        //     "taskId": "69294f6b9b6f8fffe7f0a330",
        //     "serverDownTime": "2025-11-28T08:50:06.000Z",
        //     "route": "maintenance-notification"
        // }

        this.data = data;

        this.message.string = this.data.message || this.data.info;
        this.dismissNode.active = false;

        if (this.data.showDismiss) {
            this.dismissNode.active = true;
        }
    },

    onLoad: function () {
    },

    onDissmiss: function() {

    },

    closeGame: function() {
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.close();
        } else {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.close();
            }
        }
    },

    onClose: function () {
        GameManager.popUpManager.hide(PopUpType.ServerMaintenancePopup, function () {});

        if (this.data.action == "checkServerStatus") {
            // this.closeGame();
            GameManager.logout();
        }
        else if (this.data.action == "warning") {
            if (this.data.logout) {
                // this.closeGame();
                GameManager.logout();
            }
        }
        else if (this.data.action == "kick") {
            if (this.data.logout) {
                // this.closeGame();
                GameManager.logout();
            }
        }

        if (this.data.showDismiss && this.dismissToggle.isChecked) {
            GameManager.api_notification_dismiss(this.data.taskId);
        }
    }

});