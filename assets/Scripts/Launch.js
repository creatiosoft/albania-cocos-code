
cc.Class({
    extends: cc.Component,

    properties: {
    },

    start () {

        cc.macro.ENABLE_MULTI_TOUCH = false;

        // var size = cc.size(cc.Canvas.instance.node.width, cc.Canvas.instance.node.height);
        // var aspect = size.height / size.width;
        // console.log("aspect", aspect);
        // if (aspect > 1.5) {
        // }
        // else {
        //     this.node.scale = 0.6;
        // }
        // this.toGame();
    },

    toGame () {
        cc.director.loadScene("Portrait");
    }

});
