var reportIssue = require('PostTypes').reportIssue;
// var gameScreenType = require("GameScreen");
var TabBtnUtil = require('TabBtnUtil');

/**
 * @class ChatPanel
 * @classdesc Manages the chat panel in Gameplay
 * @memberof Controllers.Gameplay.ChatPanel
 */
cc.Class({
    extends: cc.Component,

    properties: {
        isVisible: true,
        reportLabel: {
            default: null,
            type: cc.EditBox,
        },
        infoLabel: {
            default: null,
            type: cc.Label,
        },
        // gameScreen: {
        //     default: null,
        //     type: gameScreenType,
        // },
        indicator: {
            default: null,
            type: cc.Node,
        },
        isMobile: false,
        isMobileView: false,
        bgA: {
            default: null,
            type: cc.Node,
        },
        onHideCallBack: null,
    
    },

    /**
     * @description This is used for initialisation
     * @method onLoad
     * @memberof Controllers.Gameplay.ChatPanel.ChatPanel#
     */
    onLoad: function () {
        // this.node.parent.getComponent(cc.Widget).enabled=false
        window.ChatPanel = this;
        this.actA = cc.moveTo(0.1, new cc.Vec2(0, -177));
        let xx = (this.johnnyMobile) ? 5 : 0;
        this.actB = cc.moveTo(0.1, new cc.Vec2(0, xx));
        this.isMobile = false; //GameScreen.isMobile;
        this.johnnyMobile = GameScreen.isMobile;
        if (this.isMobileView) {
            // this.scheduleOnce(function () {
            //     this.hideMobileView();
            // }.bind(this), 0.5);
            this.isVisible = false;
            setTimeout(function () {
                // this.node.active = false;
            }.bind(this), 500);
            this.onHideCallBack = function () {
                if (!(GameScreen.viewType == 1 && GameManager.activeTableCount > 1)) {
                    this.hideMobileView();
                }
                if (GameScreen.viewType == 1 && this.isMobileView) {
                    if (GameManager.activeTableCount == 2) {
                        this.node.getComponent(cc.Widget).right = 0.319;

                    } else {
                        this.node.getComponent(cc.Widget).right = -0.0124;

                    }
                }
            }.bind(this);
            GameManager.on(K.GameEvents.OnTableClosed, this.onHideCallBack);
            GameScreen.node.on("grid-refreshed", this.onHideCallBack);
        } else {
            // this.onHide();
            this.isVisible = false;
        }
        // console.log("chat", this.node)
        // setTimeout(() => {
        //     console.log(this.node)

        // }, 600)
    },

    /**
     * @description Lifecycle callback
     * @method onDestroy
     * @memberof Controllers.Gameplay.ChatPanel.ChatPanel#
     */
    onDestroy: function () {
        if (this.isMobileView) {
            GameManager.off(K.GameEvents.OnTableClosed, this.onHideCallBack);
            GameScreen.node.off("grid-refreshed", this.onHideCallBack);
        }
    },

    /**
     * @description Hide the entire panel
     * @method onHide
     * @memberof Controllers.Gameplay.ChatPanel.ChatPanel#
     */
    onHide: function () {
        // console.error("shishir", this.isMobile, this.isVisible)

        if (this.isMobile) {
            // this.node.active = false;
            return;
        }
        this.node.stopAllActions();
        if ((GameScreen.viewType == 1 && GameManager.activeTableCount > 1 && this.isMobileView)) {
            this.switchMobileView();
        } else {
            // console.error("else case")
            if (!this.isMobileView) {

                var toY = this.isVisible ? -150 : 0;
                if (this.johnnyMobile) {
                    toY = this.isVisible ? -162 : 5
                }
                var act = cc.moveTo(0.1, new cc.Vec2(0, toY));
                this.node.runAction(act);
                this.isVisible = !this.isVisible;
                // console.error(1)
            } else {
                this.hideMobileView();
                // console.error(2)
            }
        }
    },

    /**
     * @description Hides the mobile view
     * @method hideMobileView
     * @memberof Controllers.Gameplay.ChatPanel.ChatPanel#
     */
    hideMobileView: function () {
        var funcAction = cc.callFunc(function () {
            // this.node.active = false;
            // console.log(this.node.parent.parent.parent.position)
        }, this);
        // let y = cc.moveTo(2, -960, -716.8);
        let y = cc.moveTo(0.2, 431, -67)
        // var splitSequence = cc.sequence(this.actA, funcAction);
        var splitSequence = cc.sequence(y, funcAction);

        this.node.parent.runAction(splitSequence);
        this.isVisible = false;
        this.switchBg();
    },

    /**
     * @description Enables/shows the mobile view
     * @method showMobileView
     * @memberof Controllers.Gameplay.ChatPanel.ChatPanel#
     */

    showMobileView: function () {
        // this.node.active = true;
        // console.error("show obile view", this.node.parent.name)
        // this.node.parent.parent.runAction(cc.moveTo(2, -960, -534.6));
        this.node.parent.runAction(cc.moveTo(0.2, 431, 113.5))
        this.isVisible = true;
        this.switchBg();
    },

    /**
     * @description Toggles mobile view
     * @method switchMobileView
     * @memberof Controllers.Gameplay.ChatPanel.ChatPanel#
     */
    switchMobileView: function () {
        if (this.isMobileView) {
            if (this.isVisible) {
                this.hideMobileView();
            } else {
                this.showMobileView();
            }
        }
    },

    /**
     * @description Show the entire panel according to selected tab 
     * @method showPanel
     * @memberof Controllers.Gameplay.ChatPanel.ChatPanel#
     */
    showPanel: function () {
        // console.error("show panel", this.isMobile, this.isMobileView)
        if (this.isMobile) {
            // this.node.active = true;
            return;
        }

        if ((GameScreen.viewType == 1 && GameManager.activeTableCount > 1)) {
            if (!this.isVisible) {
                this.node.stopAllActions();
                this.isVisible = true;
                this.switchBg();
                // this.node.active = true;
                // console.log("convict")
                this.node.runAction(this.actB);
            }
        } else {
            if (!this.isVisible) {
                this.node.stopAllActions();
                var toY = 0;
                if (this.johnnyMobile) {
                    toY = 5;
                }
                var act = cc.moveTo(0.1, new cc.Vec2(0, toY));
                this.node.runAction(act);
                this.isVisible = true;
            }
        }
    },

    /**
     * @description
     * @method onEnable
     * @memberof Controllers.Gameplay.ChatPanel.ChatPanel#
     */
    onEnable: function () {
        if (this.node.getComponent('TabBtnUtil'))
            this.node.getComponent('TabBtnUtil').onShowTab_01();
        // this.onHide();
    },

    /**
     * @description FeedBack submit button callback
     * @method reportIssue
     * @memberof Controllers.Gameplay.ChatPanel.ChatPanel#
     */
    reportIssue: function () {
        if (this.reportIssue.string != "") {
            var data = new reportIssue(GameManager.user.playerId, this.reportLabel.string);
            ServerCom.pomeloRequest(K.PomeloAPI.reportIssue, data, function (response) {

                if (response.success) {             }
            });
            this.reportLabel.string = "";
        }
    },

    /**
     * @method mobClosePanel
     * @memberof Controllers.Gameplay.ChatPanel.ChatPanel#
     */
    mobClosePanel: function () {
        this.bgA.active = false;
        if (this.isVisible) {
            var funcAction = cc.callFunc(function () {
                // this.node.active = false;
            }, this);

            var splitSequence = cc.sequence(this.actA, funcAction);
            this.node.runAction(splitSequence);
            this.isVisible = !this.isVisible;
            // this.switchBg();
            // this.indicator.rotation = this.isVisible ? 0 : 180;
        }
    },

    /**
     * @description Changes the background
     * @method switchBg
     * @memberof Controllers.Gameplay.ChatPanel.ChatPanel#
     */
    switchBg: function () {
        if (!!this.bgA) {

            if (this.isVisible) {
                this.bgA.active = true;
            } else {
                this.bgA.active = false;
            }
        }
    },


});
