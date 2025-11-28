// var Crypto = require('crypto');
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
       
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        
    },


    onClick: function(){
        // this.text = Crypto.createHash('sha1').update('abc').digest('hex');
        // this.label.string = this.text;
    },
});
