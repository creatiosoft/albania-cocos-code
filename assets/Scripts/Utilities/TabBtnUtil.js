/**
 * @classdesc For handling tab functionalities - later use
 * @class TabBtnUtil
 * @memberof Utilities
 */
cc.Class({
    extends: cc.Component,

    properties: {
        tabs: {
            default: [],
            type: cc.Node,
        },
        tabButtons: {
            default: [],
            type: cc.Sprite,
        },
        currentTab: {
            default: 0,
            // visible: false,
            // type: cc.Node,
        },
        activeSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        inactiveSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        activeColor: {
            default: new cc.Color(),
            // type: cc.Color,
        },
        inactiveColor: {
            default: new cc.Color(),
            // type: cc.Color,
        },
        chatBtn: {
            default: null,
            type: cc.Node,
        },
        tableVariation: {
            default: null,
            type: cc.Node,
        },
        tournemantVariation: {
            default: null,
            type: cc.Node,
        },
        buddiesVariaton: {
            default: null,
            type: cc.Node,
        },   
        gameTypeFilter: {
            default: null,
            type: cc.Node,
        },        

        ifSwitchOutline: false,
        inactiveOutline: new cc.Color(),
        activeOutline: new cc.Color(),
    },

    // use this for initialization
    onLoad: function () {
        this.onShowTab_01;
    },

    start: function () {

    },

    /**
     * @description Updates the current table content
     * @method updateCurrentTable
     * @memberof Utilities.TabBtnUtil#
     */
    updateCurrentTable: function () {
        if (this.tabs[this.currentTab].getComponent('Table'))
            this.tabs[this.currentTab].getComponent('Table').onEnable();
    },

    /**
     * @description Handles tab transition
     * @method: setActiveTab
     * @param {Object} currTab -Define Current Tab
     * @param {Object} prevTab -Define Previous Tab
     * @memberof Utilities.TabBtnUtil#     
     */
    setActiveTab: function (currTab, prevTab) {
        if (prevTab !== null) //&& prevTab !== undefined)
        {
            prevTab.active = false;
        }
        currTab.active = true;
    },

    /**
     * @description Handles tab button transition
     * @method setActiveButton 
     * @param {Object} currTab -Define Current Tab
     * @param {Object} prevTab -Define Previous Tab
     * @memberof Utilities.TabBtnUtil#   
     */
    setActiveButton: function (currBtn, prevBtn) {
        if (prevBtn !== null) // && prevBtn !== undefined)
        {
            prevBtn.getComponent(cc.Sprite).spriteFrame = this.inactiveSprite;
            prevBtn.node.getChildByName("Label").color = this.inactiveColor;
            if (this.ifSwitchOutline) {
                prevBtn.node.getChildByName("Label").getComponent(cc.LabelOutline).color = this.inactiveOutline;
            }
            prevBtn.node.getChildByName("Label").enableUnderline = false;
        }
        // currBtn.spriteFrame = this.activeSprite;
        currBtn.node.getChildByName("Label").color = this.activeColor;
        // if (this.ifSwitchOutline) {
        //     currBtn.node.getChildByName("Label").getComponent(cc.LabelOutline).color = this.activeOutline;
        // }
        currBtn.node.getChildByName("Label").enableUnderline = true;


    },

    /**
     * @description Show Tab_01 button handler and Active Tab and corresponding data Container
     * @method onShowTab_01
     * @memberof Utilities.TabBtnUtil#
     */
    onShowTab_01: function () {
        this.setActiveTab(this.tabs[0], this.tabs[this.currentTab]);
        this.setActiveButton(this.tabButtons[0], this.tabButtons[this.currentTab]);
        this.currentTab = 0;
        if ( this.tableVariation ) {
            this.tableVariation.active = true;
            if (this.buddiesVariaton) {
                this.buddiesVariaton.active = false;
            }
            if (this.gameTypeFilter) {
                this.gameTypeFilter.active = true;
            }
        }
        if (this.tournemantVariation) {
            this.tournemantVariation.active = false;
        }

        // GameManager.playSound(K.Sounds.click);

    },

    /**
     * @description Show Tab_02 button handler
     * @method onShowTab_02
     * @memberof Utilities.TabBtnUtil#
     */
    onShowTab_02: function () {
        if (!!this.chatBtn && GameManager.isMobile) {
            // this.chatBtn.active = false;
        }
        if (GameManager.gameModel.activePokerModels.length >= 2 && !!this.chatBtn) {
            // this.chatBtn.active = false;
        }
        this.setActiveTab(this.tabs[1], this.tabs[this.currentTab]);
        this.setActiveButton(this.tabButtons[1], this.tabButtons[this.currentTab]);
        this.currentTab = 1;
        // GameManager.playSound(K.Sounds.click);
        
        if ( this.tableVariation ) {
            this.tableVariation.active = false;
        }
        if (this.tournemantVariation) {
            this.tournemantVariation.active = true;
        }

        // if (this.gameTypeFilter) {
        //     this.gameTypeFilter.active = true;
        // }

    },

    /**
     * @description Show Tab_03 button handler
     * @method onShowTab_03
     * @memberof Utilities.TabBtnUtil#
     */
    onShowTab_03: function () {
        this.setActiveTab(this.tabs[2], this.tabs[this.currentTab]);
        this.setActiveButton(this.tabButtons[2], this.tabButtons[this.currentTab]);
        this.currentTab = 2;

        if ( this.tableVariation ) {
            this.tableVariation.active = false;
        }
        if (this.tournemantVariation) {
            this.tournemantVariation.active = true;
        }
        
        // if ( this.tableVariation ) {
        //     this.tableVariation.active = false;
        //     this.buddiesVariaton.active = false;        
        // }
        // if (this.gameTypeFilter) {
        //     this.gameTypeFilter.active = false;
        // } 
        
        // if (this.tournemantVariation) {
        //     this.tournemantVariation.active = true;
        // }        
        // GameManager.playSound(K.Sounds.click);

    },

    /**
     * @description Show Tab_04 button handler
     * @method onShowTab_04
     * @memberof Utilities.TabBtnUtil#
     */
    onShowTab_04: function () {
        this.setActiveTab(this.tabs[3], this.tabs[this.currentTab]);
        this.setActiveButton(this.tabButtons[3], this.tabButtons[this.currentTab]);
        this.currentTab = 3;
        if ( this.tableVariation ) {
            this.tableVariation.active = false;
            this.buddiesVariaton.active = true;        
        }
        if (this.gameTypeFilter) {
            this.gameTypeFilter.active = false;
        }
        if (this.tournemantVariation) {
            this.tournemantVariation.active = false;
        }           
        // GameManager.playSound(K.Sounds.click);

    },

    /**
     * @description Show Tab_05 button handler
     * @method onShowTab_05
     * @memberof Utilities.TabBtnUtil#
     */
    onShowTab_05: function () {
        this.setActiveTab(this.tabs[4], this.tabs[this.currentTab]);
        this.setActiveButton(this.tabButtons[4], this.tabButtons[this.currentTab]);
        this.currentTab = 4;
        // GameManager.playSound(K.Sounds.click);

    },

    /**
     * @description Show Tab_06 button handler
     * @method onShowTab_06
     * @memberof Utilities.TabBtnUtil#
     */
    onShowTab_06: function () {
        if (this.tabs.length < 6) {
            return;
        }
        this.setActiveTab(this.tabs[5], this.tabs[this.currentTab]);
        this.setActiveButton(this.tabButtons[5], this.tabButtons[this.currentTab]);
        this.currentTab = 5;
        // GameManager.playSound(K.Sounds.click);

    },

});
