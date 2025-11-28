cc.Class({
    extends: cc.Component,

    properties: {
        localizeKey: {
            default: '',
            visible: true
        }
    },


    onLoad () {
        const label = this.node.getComponent( cc.Label );        
        if(label) {
            this.verticalAlign = label.verticalAlign;     
        }
        this.updateText();
        cc.systemEvent.on( LocalizedManager.LanguageDidChangeEvent, this.updateText, this );
    },

    start () {

    },

    updateText: function () {
        if ( LocalizedManager.currLanguage ) {
            const label = this.node.getComponent( cc.Label );
            if ( this.localizeKey && label) {
                label.verticalAlign  = this.verticalAlign;                
                const text = LocalizedManager.t( this.localizeKey );
                label.string = text;
                if (LocalizedManager.currLanguage === 'hi_id' && this.verticalAlign === cc.Label.VerticalAlign.TOP) {
                    label.verticalAlign = cc.Label.VerticalAlign.CENTER;
                }
            }
        }
    },

    setKey: function (key) {
        this.localizeKey = key;
        this.updateText();
    }
});
