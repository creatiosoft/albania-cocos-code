var stickerPopup = require('StickersPopup');

cc.Class({
    extends: cc.Component,

    properties: {
        stickerId: {
            default : '',
            visible : true
        }
    },


    onLoad () {
        // this.registerHoverEvents();
        // stickerPopup.stickerBaseList.push(this);
        // console.log('stickerPopup.stickerBaseList');
    },

    start () {

    },
    registerHoverEvents: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (cc.isValid(this.node)) {
                this.onMouse_Enter();
            }
        }.bind(this), this);
    },

    onMouse_Enter: function() {
        console.log('stickerId ',this.stickerId);
    }
    // update (dt) {},
});
