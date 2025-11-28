cc.Class({
    extends: cc.Component,

    properties: {
        // skipButton: {
        //     default: null,
        //     type: cc.Button,
        //     visible: true,
        // }        
    },

    onLoad() {
    },

    start() {
        this.defaultPos = this.node.getPosition();
        // this.skipButton.interactable = false;
        // let widget = this.skipButton.getComponent(cc.Widget);
        // if ( widget && widget.enable ) {
            // widget.target = this.node.parent;
            // widget.horizontalcenter = widget.verticalcenter = true;
            // widget.top = widget.bottom = widget.left = widget.right = 0;
        // }
    },

    init(targetPlayerId, pokerPresenter) {
        this.targetPlayerId = targetPlayerId;
        this.pokerPresenter = pokerPresenter;
        this.show();
    },

    show: function() {
        this.node.active = true;
        // let pos = this.node.parent.getChildByName("DummyStickerPop").getPosition();        
        // const t = this;
        // cc.tween(this.node)
        // .to(0.3, {position: pos},  { easing: 'circIn'} ).call( () => {t.skipButton.interactable = true})
        // .start();   
        // t.skipButton.interactable = true}
    },

    hide: function() {
        let pos = this.defaultPos;       
        const t = this;
        t.node.active = false;
        // cc.tween(this.node)s
        // .to(0.3, {position: pos},  { easing: 'circOut'} ).call( () => {t.node.active = false;})
        // .start();
    },

    onClickSticker: function(event, custom) {
        this.hide();        
        this.clientSendStickerEvent(custom);
    },

    clientSendStickerEvent: function(stickerId) {
        let payload = {};
        payload.channelId = this.pokerPresenter.model.gameData.channelId;
        payload.senderId = this.pokerPresenter.model.gameData.playerId;
        payload.sendToAll = false;
        payload.stickerId = (stickerId) + '';
        payload.receiverId = this.targetPlayerId;
        // console.log('clientSendStickerEvent ', payload);
         
        if (this.pokerPresenter.isTournament()) {
            ServerCom.socketIORequest("tournamentGameEvent|emoji", {
                tournamentId: this.pokerPresenter.model.gameData.raw.tournamentId,
                tableId: this.pokerPresenter.model.gameData.channelId,
                emoji: stickerId,
                playerId: payload.senderId,
                toPlayerId: payload.receiverId,
            }, function(response) {
                if(response.success) {

                }
            }, null, 5000, false);
        }
        else {
        ServerCom.pomeloRequest(K.PomeloAPI.sendSticker, payload, function(response){
            console.log("sendSticker reponse", response);
            if(response.success) {

            }
        }, null, 5000, false);
        } 
    }

});
