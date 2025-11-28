/**
 * @classdesc handles card distribution animation
 * @class CardDistributer
 * @memberof Utilities.CardDistributer
 */
cc.Class({
    extends: cc.Component,

    properties: {
        dealer: {
            default: null,
            type: cc.Node,
        },
        cardPrefab: {
            default: null,
            type: cc.Prefab,
        },
        timersToKill: []
    },

    /**
     * @description Splits the pot based on winner and animates
     * @method distributeCards
     * @memberof Utilities.CardDistributer.CardDistributer
     * @param {Object} data 
     */
    distributeCards: function (noOfCards, data, pokerPresenter) {
        // data - player position
        // instantiate 2 cards
        // set position, rotation
        // play animation - move to target, scale, fade
        // destroy
        this.timersToKill = [];
        let animationDelayInCardsDistibution = .121;
        let count = 0;
        let self = this;
        // running it twice :), simple hack
        var prevAnchorPoint;
        for (var i = 0; i < noOfCards; i++) {
            data.forEach(function (element) {

                var targets = element.targetNode.getChildByName("HandPlayer").getChildByName("Cards").children;
                if (targets.length < 1) {
                    targets = element.targetNode.getChildByName("HandPlayer").getChildByName("MyCards").children;
                }
                var instance = targets[i];
                var target = instance.getPosition();
                var WPcord = this.dealer.parent.convertToWorldSpaceAR(cc.v2(this.dealer.getPosition()));
                instance.setPosition(instance.parent.convertToNodeSpaceAR(WPcord));
                // instance.setScale(0.4);
                instance.opacity = 0;

                let rotateAction = cc.repeat(cc.rotateBy(0.1, 360), 2).easing(cc.easeCubicActionOut());

                let skewer = cc.sequence(cc.skewTo(0.1, 22, 0).easing(cc.easeCubicActionOut()), cc.skewTo(0.1, 0, 0).easing(cc.easeCubicActionOut()));
                // var moveAction = cc.moveTo(0.2, cc.v2(target.x, target.y)).easing(cc.easeCubicActionOut());
                var moveAction = cc.spawn(rotateAction, skewer, cc.moveTo(0.2, cc.v2(target.x, target.y)).easing(cc.easeCubicActionOut()));

                // var scaleAction = cc.scaleTo(0.15, 1).easing(cc.easeCubicActionOut());
                var fadeAction = cc.fadeIn(0.2).easing(cc.easeCubicActionOut());
                var delayInAnimaiton = cc.delayTime(animationDelayInCardsDistibution * count);


                // Strike out then, scale down and hide on player profile
                // var cardsStrikeOut = cc.scaleTo(0.1, 1);
                // var cardsFadeOut = cc.spawn(cc.scaleTo(0.2, 0.05), cc.fadeOut(0.2));
                // scale & fade
                var funcAction = cc.callFunc(() => {
                    // CardPool.destroyCard(instance, function () { });
                    instance.setPosition(target);
                    if (noOfCards * data.length == instance.CountTag) {
                        // pokerPresenter.forceAddPlayerCards(); COMMENTED TO STOP RUNNING TWICE< ISSUE ON ANDROID DEVICES
                        //////////////////////////////////// Uncomment to delay table Tab cards untill user switches tab to table. Also look TableTab.js (setModel())
                        // if (GameManager.isMobile) {
                        //     let tabInstance,  tableTabComp;;
                        //     for (var i = 0; i < GameManager.activeTableCount; i++) {
                        //         console.log("GAME SCREEN ", GameScreen)
                        //         tabInstance = GameScreen.tableTabs[i]; //cc.instantiate(this.tableTabPrefab);
                        //         tableTabComp = tabInstance.getComponent('TableTab');
                        //         tableTabComp.showCards();
                        //     }
                        // }
                    };
                    // addPlayerCards()
                }, this);

                var show = cc.callFunc(() => {
                    instance.opacity = 145;
                    pokerPresenter.playAudio(K.Sounds.playerCardFlip);
                });

                var splitSequence = cc.sequence(show, moveAction, funcAction);
                instance.runAction(cc.sequence(delayInAnimaiton, splitSequence));
                // instance.runAction(cc.sequence(delayInAnimaiton, scaleAction));
                instance.runAction(cc.sequence(delayInAnimaiton, fadeAction));

                (function (ins, tar, x) {
                    self.timersToKill.push(setTimeout(() => {
                    // setTimeout(() => {
                        if (cc.isValid(ins)) {
                            ins.stopAllActions();
                            ins.setPosition(tar);
                            ins.setScale(1);
                            ins.opacity = 255;
                            // ins.rotation = 0;
                            ins.skewX = 0;
                            ins.skewY = 0;
                            if (noOfCards * data.length == ins.CountTag) {
                                // console.error("TIMEOUT CALLED RED ALERT ")
                                pokerPresenter.forceAddPlayerCards();
                                //////////////////////////////////// Uncomment to delay table Tab cards untill user switches tab to table. Also look TableTab.js (setModel())
                                // if (GameManager.isMobile) {
                                //     let tabInstance,  tableTabComp;;
                                //     for (var i = 0; i < GameManager.activeTableCount; i++) {
                                //         console.log("GAME SCREEN ", GameScreen)
                                //         tabInstance = GameScreen.tableTabs[i]; //cc.instantiate(this.tableTabPrefab);
                                //         tableTabComp = tabInstance.getComponent('TableTab');
                                //         tableTabComp.showCards();
                                //     }
                                // }
                            };

                        }
                    }, x));
                })(instance, target, (0.5 + (animationDelayInCardsDistibution * count)) * 1000);
                count++;
                instance.CountTag = count;
            }, this);
        }
    },

    clearTimers: function () {
        this.timersToKill.forEach(function (element) {
            clearTimeout(element);
        }, this);
        this.timersToKill = [];
    },
});