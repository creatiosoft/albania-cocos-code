cc.Class({
    extends: cc.Component,

    properties: {
        localizeSprite: {
            default: null,
            type: cc.Sprite,
            visible: true
        },
        localizeSpriteFrame: {
            default: [],
            type: cc.SpriteFrame,            
            visible: true
        },
        langList : {
            default: [],
            type: [cc.String]             
        }
    },

    onLoad () {
        this.langList = ['en_us', 'hi_id'];
        this.localizeSprite = this.node.getComponent( cc.Sprite );        
        // if(label) {
        //     this.verticalAlign = label.verticalAlign;     
        // }
        this.updateSpriteFollowLang();
        cc.systemEvent.on( LocalizedManager.LanguageDidChangeEvent, this.updateSpriteFollowLang, this );
    },

    start () {

    },
    updateSpriteFollowLang: function () {
        console.log('updateSpriteFollowLang ');
        if ( LocalizedManager.currLanguage && this.localizeSprite) {
            // const label = this.node.getComponent( cc.Label );
            // if ( this.localizeKey && label) {
            //     label.verticalAlign  = this.verticalAlign;                
            //     const text = LocalizedManager.t( this.localizeKey );
            //     label.string = text;
            //     if (LocalizedManager.currLanguage === 'hi_id' && this.verticalAlign === cc.Label.VerticalAlign.TOP) {
            //         label.verticalAlign = cc.Label.VerticalAlign.CENTER;
            //     }
            // }
            const langIdx = this.langList.indexOf( LocalizedManager.currLanguage);
            console.log('updateSpriteFollowLang langIdx ',langIdx);
            console.log('updateSpriteFollowLang langIdx ',this.localizeSpriteFrame[langIdx]);
            // if (langIdx >= 0 && this.localizeSpriteFrame && this.localizeSpriteFrame[langIdx]) {
                this.localizeSprite.spriteFrame = this.localizeSpriteFrame[langIdx];
            // }
        }
    },


    // updateText: function () {
    //     if ( LocalizedManager.currLanguage ) {
    //         const label = this.node.getComponent( cc.Label );
    //         if ( this.localizeKey && label) {
    //             label.verticalAlign  = this.verticalAlign;                
    //             const text = LocalizedManager.t( this.localizeKey );
    //             label.string = text;
    //             if (LocalizedManager.currLanguage === 'hi_id' && this.verticalAlign === cc.Label.VerticalAlign.TOP) {
    //                 label.verticalAlign = cc.Label.VerticalAlign.CENTER;
    //             }
    //         }
    //     }
    // },

    // setKey: function (key) {
    //     this.localizeKey = key;
    //     this.updateText();
    // }
});
