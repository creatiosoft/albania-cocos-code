cc.Class({
    extends: cc.Component,

    properties: {
        skipButton: {
            default: null,
            type: cc.Button,
            visible: true,
        },
        contentHolder: {
            default: null,
            type: cc.Node,
        },
        buddiesItemContent: {
            default: null,
            type: cc.Prefab,
        },  
        inputName: {
            default: null,
            type: cc.EditBox,
        },                
        channelId : '',
    },

    onLoad() {
        // this.getBuddiesListData();
    },

    createBuddiesList: function(data) {
        this.currentTableData = data || [];
        this.contentHolder.removeAllChildren();
        // this.isBuddiesListTab = true;
        if (data.length === 0) {
            LocalizedManager.setTextKey(this.bottomInfoLbl.node, 'TXT_NO_BUDDIES_AVAILABLE');
            this.bottomInfo.active = true;            
            return;
        }
        data.forEach((element, i) => {
            // content = this.makeContent(entry);
            // setTimeout( () => { 
            const instance =  cc.instantiate(this.buddiesItemContent);
            instance.setPosition(0, 0);
            instance.active = true;
            this.contentHolder.addChild(instance);
            const tableContent = instance.getComponent('BuddiesItemIngame');
            element.index = i;
            element.channelId = this.channelId;
            tableContent.initInfo(element);
            // }, 0.1 * i);
        });
    },    

    getBuddiesListData() {
        let payload = {};

        payload.playerId = GameManager.user.playerId;
        console.log('getBuddiesListData ', payload);
        
        const requestCallback = (response) => {
            console.log("sendFriendRequest requestCallback reponse", response);
            this.createBuddiesList(response.friends || response.result);
        };

        ServerCom.pomeloRequest(K.BuddyAPI.getFriendList, payload, function(response){
            console.log("sendFriendRequest reponse", response);
            if(response.success) {
                requestCallback(response);
            }
        }, null, 5000, false);


        
    },
    start() {
        this.defaultPos = this.node.getPosition();
        this.skipButton.interactable = false;
        let widget = this.skipButton.getComponent(cc.Widget);
        // if ( widget && widget.enable ) {
            widget.target = this.node.parent;
            // widget.horizontalcenter = widget.verticalcenter = true;
            // widget.top = widget.bottom = widget.left = widget.right = 0;
        // }
    },

    init(channelId) {
    // init(targetPlayerId, pokerPresenter) {
        // this.targetPlayerId = targetPlayerId;
        // this.pokerPresenter = pokerPresenter;
        this.channelId = channelId;
        this.getBuddiesListData();        
        this.show();
    },

    autoSearch() {
        console.log('autoSearch autoSearch')
        const playerName = this.inputName.string;        
        const child = this.contentHolder.children;     
        if(this.inputName.string === '' && this.contentHolder.children.length > 0) {
            child.forEach( e => {
                e.active = true;
            })
            return;
        }
        if (this.inputName.string == null || this.inputName.string == '' || this.inputName.string == undefined) {
            child.forEach( e => {
                e.active = true;
            })
            return;
        }

        child.forEach( e => {
            
            e.active = e.getComponent('BuddiesItemIngame').getName().toLowerCase().indexOf(playerName.toLowerCase()) != -1;
        })
    },

    findLocalPlayer() {
        const playerName = this.inputName.string;
        const child = this.contentHolder.children;        
        if (this.inputName.string == null || this.inputName.string == '' || this.inputName.string == undefined) {
            child.forEach( e => {
                e.active = true;
            })
            return;
        }

        child.forEach( e => {
            
            e.active = e.getComponent('BuddiesItemIngame').getName().toLowerCase().indexOf(playerName.toLowerCase()) != -1;
        })

    },    

    show: function() {
        this.isShowing = true;
        this.inputName.string = '';
        this.node.active = true;
        let pos = this.node.parent.getChildByName("DummyStickerPop").getPosition();        
        const t = this;
        cc.tween(this.node)
        .to(0.3, {position: pos},  { easing: 'circIn'} ).call( () => {t.skipButton.interactable = true})
        .start();   
    },

    hideIfShowing: function() {
        if (this.isShowing) {
            this.node.active = false;
            this.hide();
        }
    },
    hide: function() {
        this.isShowing = true;
        this.skipButton.interactable = false;
        let pos = this.defaultPos;       
        const t = this;
        cc.tween(this.node)
        .to(0.3, {position: pos},  { easing: 'circOut'} ).call( () => {t.node.active = false;})
        .start();
    },
    sendInviteAll() {
        const child = this.contentHolder.children;       
        this.curInvite = 0; 
        const t = this;
        const sendInvite = () => {
            console.log('sendInvite for player ',t.curInvite);
            if ( t.curInvite == t.contentHolder.children.length) {
                return;
            }
            t.contentHolder.children[t.curInvite].getComponent('BuddiesItemIngame').onClickInviteBtn(sendInvite);
            t.curInvite++;
        }
        sendInvite(0);
        // child.forEach( e => {
        //     e.active = e.getComponent('BuddiesItemIngame').onClickInviteBtn();
        // })        
    }

});