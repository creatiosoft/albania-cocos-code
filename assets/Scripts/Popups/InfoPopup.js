var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
cc.Class({
    extends: PopUpBase,

    properties: {
        popUpManager: {
            default: null,
            type: PopUpManager
        },

        keyLabels: {
            default: [],
            type: cc.Label
        },

        valueLabels: {
            default: [],
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onShow: function (data) {
        GameManager.emit("disablePageView");
        // console.log(data);
        this.sound = data.playSound;
        let count = 0;

        for (let key in data.info) {

            if (count < this.keyLabels.length && key.indexOf("Rake") == -1 && key.indexOf("Cap") == -1 && key.indexOf("Max") == -1) {
                this.keyLabels[count].string = key;
                this.valueLabels[count].string = data.info[key];
                count++;
            }
        }

        this.keyLabels.forEach((elem) => {
            if (elem.string == "keys") {
                elem.node.active = false;
            }
            else {
                 elem.node.active = true;   
            }
        });

        this.valueLabels.forEach((elem) => {
            if (elem.string == "values") {
                elem.node.active = false;
            }
            else {
                 elem.node.active = true;   
            }
        });
    },

    onQuit: function () {
        GameManager.emit("enablePageView");
        this.popUpManager.hide(PopUpType.GameInfoPopup, function () { });
        this.sound(K.Sounds.click)
        // GameManager.playSound(K.Sounds.click);
    }
}); 