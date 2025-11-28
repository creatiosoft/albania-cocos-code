cc.Class({
    extends: cc.Component,

    properties: {
        container: {
            default: null,
            type: cc.Node
        },
        scrollView: null,


    },

    // use this for initialization
    onLoad: function () {



    },
    onEnable: function () {
        this.scrollIt();
        this.registerUPandDOWN();
    },


    scrollIt: function () {
        this.scrollView = this.node.getComponent(cc.ScrollView);
        this.handle = this.node.getChildByName('scrollBar').getChildByName('bar');
        this.handle.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            event.bubbles = false;
            event.stopPropagation();
            var deltaY = event.getDeltaY();
            var currentOffset = this.scrollView.getScrollOffset();
            var offset = new cc.Vec2(0, 0);
            if (deltaY > 0) {
                var x = cc.v2(0, currentOffset.y - 10);
                this.scrollView.scrollToOffset(x);
            }
            else if (deltaY < 0) {
                var x = cc.v2(0, currentOffset.y + 10);
                this.scrollView.scrollToOffset(x);
            }
        }.bind(this));
    },

    /**
      * @description Scroll down by one line
      */
    onUpScrollClick: function () {

        let sView = this.getComponent(cc.ScrollView);

        var currentOffset = sView.getScrollOffset();
        let viewChildrenCount = sView.content.children.length;

        var x = cc.v2(0, currentOffset.y - 26);
        this.scrollView.scrollToOffset(x, 0.2);

    },

    /**
     * @description Scroll Down by one line
     */
    onDownScrollClick: function () {
        let sView = this.getComponent(cc.ScrollView);
        var currentOffset = sView.getScrollOffset();

        var x = cc.v2(0, currentOffset.y + 26);
        this.scrollView.scrollToOffset(x, 0.2);

    },


    registerUPandDOWN: function () {
        return
        // console.log("AVATRA SCROLL SHOWN");
        var scrollView = this;
        this.upDownListenerAvatarScrollView = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed(key, event) {
                if (key == cc.KEY.down) {
                    // console.log("ScrollS CROLL DOWN ", )
                    scrollView.onDownScrollClick();
                    event.stopPropagation();
                } else if (key == cc.KEY.up) {
                    // console.log("ScrollS CROLL UP ", )
                    scrollView.onUpScrollClick();
                    event.stopPropagation();
                } else {
                    event.stopPropagation();
                }
            }
        })
        cc.eventManager.addListener(this.upDownListenerAvatarScrollView, this.node);
    },
});
