
cc.Class({
    extends: cc.Component,

    properties: {
        progress: {
            default: null,
            type: cc.ProgressBar,
        },
        logo: {
            default: null,
            type: cc.Node,
        },
        bg: {
            default: null,
            type: cc.Node,
        },
    },

    start () {

        console.log("startstartstartstartstartstartstartstartstart");
        this.timer = 0;

        var size = cc.size(cc.Canvas.instance.node.width, cc.Canvas.instance.node.height);
        var aspect = size.height / size.width;
        console.log("aspect", aspect);
        if (aspect > 1.5) {
        }
        else {
            this.node.scale = 0.6;
        }

        this.schedule(this.updateProgress);
    },

    updateProgress(dt) {
        this.timer += dt / 4;
        if (this.timer >= 1) {
            this.timer = 1;
            this.unschedule(this.updateProgress);
            this.next();
        }
        this.progress.progress = this.timer;
    },

    next() {
        this.logo.runAction(
            cc.fadeOut(1)
        );
        this.progress.node.runAction(
            cc.fadeOut(1)
        );
        this.node.runAction(
            cc.sequence(
                cc.delayTime(1.1),
                cc.callFunc(() => {
                    this.next2();
                }, this)
            )
        );
    },

    next2() {
        this.logo.scale = 10;
        this.logo.runAction(
            cc.sequence(
                cc.spawn(
                    cc.fadeIn(1),
                    cc.scaleTo(1, 0.9)
                ),
                cc.delayTime(0.5),
                cc.delayTime(0.5),
                // cc.moveTo(0.8, cc.v2(0, cc.Canvas.instance.node.height / 2 - 180)),
                cc.delayTime(1.0),
                cc.callFunc(() => {
                    this.node.getComponent(cc.Button).interactable = true;

                    this.isAnimationFinshed = true;

                    // if (this.isLoadngFinshed) {
                        this.isAnimationFinshed = false;
                        this.toGame();
                    // }
                }, this)
            )
        );
        this.bg.active = true;
        this.bg.opacity = 0;
        this.bg.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.fadeIn(1),
            )
        );
    },

    finished () {
        console.log("finished");

        this.isLoadngFinshed = true;

        if (this.isAnimationFinshed) {
            this.toGame();
        }
    },

    toGame () {
        this.node.active = false;
    }

});
