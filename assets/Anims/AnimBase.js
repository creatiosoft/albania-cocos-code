var instance
/**
 * Animation Base Class
 */
cc.Class({
    extends: cc.Component,

    properties: {
      animCtrl : {
        default : null,
        type : cc.Animation,  
      },
      
      callBack : {
       default : null,
       visible : false,   
      },
    },

    // use this for initialization
    onLoad: function () {
        instance = this;
      
    },
    /**
     * Play Clip
     */
    play : function(name, callBack){
        this.callBack = callBack;
        this.animCtrl.play(name, 0);
    },
    /**
     * Stop clip
     */
    stop : function(){
        this.animCtrl.stop();
        //this.animCtrl.removeClip('card_move',true);
        //this.animCtrl.play('idle');
    },
    /**
     * Call back on animation clip finished
     */
    onAnimFinished : function(){
        // this.stop();
        this.callBack();
    },
  
});
