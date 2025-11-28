// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        actionNode : {
            default : null,
            type : cc.Node
        },

        sprite : {
            default : null,
            type : cc.Sprite
        },

        stayTime: 0,
        fadeInTime : 0,
        fadeOutTime : 0,

        frames : {
            default : [],
            type : cc.SpriteFrame
        },
    },

    onEnable () {
        this.node.opacity = 255;
        this.length = this.frames.length;
        this.currentIndex = 0;
        this.sprite.spriteFrame = this.frames[this.currentIndex];
        this.execute();
    },

    onDisable() {
        this.node.stopAllActions();
        this.unscheduleAllCallbacks();
    },

    execute : function() {
        if(this.length > 1) {
            this.scheduleOnce(() => {
                this.preformFadeActions();
            }, this.stayTime);
        }
    },

    preformFadeActions : function() {
        let self = this;
        this.actionNode.runAction(cc.sequence(cc.fadeOut(this.fadeInTime), cc.callFunc(() => {

            self.currentIndex ++;

            if(self.currentIndex == self.length) {
                self.currentIndex = 0;
            }

            self.sprite.spriteFrame = self.frames[self.currentIndex];

        }), cc.fadeIn(self.fadeInTime), cc.callFunc(() =>{
            self.execute();
        })));
    },


    onClick : function() {
        window.open("https://pokerbuddy365.com");
    }

});
