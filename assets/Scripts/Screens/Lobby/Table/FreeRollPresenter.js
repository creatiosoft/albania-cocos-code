// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var table = require('NewTable');

var self = cc.Class({
    extends: table,

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

        // base :{
        //     visible: false,
        //     get() {
        //         return self;
        //     },
        //     set(value) {

        //     }
        // }

        targets: {
            default: [],
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.currentSelection = null;
        this._super();
        this.base = self.prototype;
    },

    start () {
        
        ServerCom.pomeloRequest(K.PomeloAPI.getFreeRollTables, {}, function(response) {
            console.log("free roll response", response);
            if(response.success) {
                this.base.init.call(this, response.result, "FreeRollContent");
            }else{
                console.log(response.result);
            }
        }.bind(this));
    },

    onEnable: function() {
        this.targets.forEach((e) => {
            e.active = false;
        });
    },

    onDisable: function() {
        this.targets.forEach((e) => {
            e.active = true;
        });
    },
});
