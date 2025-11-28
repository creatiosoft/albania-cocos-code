cc.Class({
    extends: cc.Component,

    properties: {
        stickerList: {
            default: [],       
            type: cc.Prefab, 
            visible: true
        },
        stickerSprite: {
            default: null,       
            type: cc.Sprite, 
            visible: true 
        },
        stickerTemp: {
            default: null,
            type: cc.Prefab,
        },
    },

    onLoad: function () {
        // stickerTemp
        this.stickerList = [];
        // for (var i = 0; i < GameManager.stickerImages.length; i++) {
        //     let stickerImages = GameManager.stickerImages[i];
        //     let poolObject = cc.instantiate(this.stickerTemp);
        //     poolObject.getComponent(cc.Sprite).spriteFrame = stickerImages;
        //     this.stickerList[i] = poolObject;
        // }
    },

    getWorldPos: function(node) {
        return node.convertToWorldSpaceAR(cc.v2(0, 0));
    },

    setWorldPos: function(node, posWS) {
        node.setPosition(node.parent.convertToNodeSpaceAR(posWS));
    },    

    showSticker: function (parentNode, stickerId, posStart, posEnd, parentScale=1.0) {
        console.log('@@@@@ showSticker   ',stickerId)
        // this.STICKER_ID = ['1', '2', '3', '4', '5', '6', '7', '8' , '9', '10', '11'];        
        // console.log('@@@@@ this.STICKER_ID   ',this.STICKER_ID)
        // const idx = this.STICKER_ID.indexOf(stickerId);

        // if ( idx >= 0) {
            const sticker = cc.instantiate(this.stickerTemp);
            sticker.active = true;
            sticker.getComponent(cc.Sprite).spriteFrame = GameManager.stickerImages[Number(stickerId) - 1];
            sticker.parent = this.node;
            this.setWorldPos(sticker, posEnd);
            // const end = sticker.getPosition();
            // this.setWorldPos(sticker, posStart);
            sticker.active = true;
            // const stickerText = sticker.getChildByName('StickerText');
            sticker.scale = 0.25;
            // const runTextAnim = () => {
            //     cc.tween(stickerText)
            //     .to(0.25, {scale: 0.8})
            //     .to(0.25, {scale: 1.2})
            //     .to(0.25, {scale: 0.8})
            //     .to(0.25, {scale: 1.2})
            //     .start()
            // };
            // cc.tween(sticker)
            // .to(1, {position: end }, { easing: 'cubicInOut'} ).call(runTextAnim)
            // .start();

            setTimeout( () => {
                this.hideSticker(sticker);
            }, 3000)
        // }
    },

    hideSticker: function(sticker) {
        sticker.active = false;
        sticker.destroy();
    },
    start () {

    },

});
