// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var popupBase =  require('PopUpBase');

cc.Class({
    extends: popupBase,

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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // this.onSelectVariation = null;
    },


    onShow(data) {
        console.log('onshow Gamevariation', data);
        this.onSelectVariation = data.onSelectVariation;
    },

    onHide: function() {

    },


    onClickClose : function() {
        PopupManager.hide(PopupManager.PopupType.GameVariation);
    },


    onClickVariation: function(target, custom) {
        console.log('Variation selected', custom);
        //hit maar do server pe
        PopupManager.hide(PopupManager.PopupType.GameVariation);
        this.onSelectVariation(custom);
    },

    // update (dt) {},
});
