/**
 * @classdesc handle pot split animation using actions / sequences
 * @class PotSplitter
 * @memberof Controllers.Gameplay
 */

var PopUpType = require('PopUpManager').PopUpType;

cc.Class({
    extends: cc.Component,

    properties: {
        centralPot: {
            default: null,
            type: cc.Node,
        },
        // TODO: use array and potID from server to set position
        potPosRef: {
            default: [],
            type: cc.Node,
        },
    },

    onLoad: function () {

    },

    /**
     * @method runPotSplitter 
     * @description Splits the pot based on winner and animates!
     * @param {Object} data - targetNode, amount, potIndex!
     * @param {Object} callback -Callback to be executed!
     * @memberof Controllers.Gameplay.PotSplitter#
     */
    runPotSplitter: function (data, potInstance, callback) {
        // for each winner
        // clone centralPot - update amount - create action - start & end pos
        // play action
        // on finish update player chips on UI
        // console.trace('pot splitter', data, potInstance);
        var counter = data.length;
        data.forEach(function (element) {

            // console.log("WINNING AMOUNT IS :- ", element)
            // if (element.playerId == GameManager.user.playerId && element.type != "REFUND") {//johny
            if (element.type != "REFUND") {
                element.targetNode.getComponent('PlayerPresenter').showWinnerBanner();
            }
            var playerAmountUpdated = false;

            var instance = cc.instantiate(this.centralPot);
            instance.active = true;
            var pos = this.potPosRef[element.potIndex || 0].getPosition();
            pos = new cc.Vec2(pos.x + Math.random() * 2, pos.y - 50); //+ Math.random() * 2);            //default
            // if(pos == this.potPosRef[0].getPosition()){
            //     pos = new cc.Vec2(100,100);
            // }else{
            //     pos = new cc.Vec2(pos.x + Math.random() * 2, pos.y - 50); //+ Math.random() * 2);
            // }
                // pos = new cc.Vec2(100,100);
            // pos = new cc.Vec2(pos.x + Math.random() * 2, (pos.y - 50)+20); //+ Math.random() * 2);
            instance.parent = element.targetNode.parent.parent.parent;
            // console.log(instance.parent)
            instance.setPosition(pos);
            var amountLabel = instance.getChildByName("PotAmount");
            amountLabel.getComponent(cc.Label).string = Math.roundOff(element.winningAmount, 2) + "";
            // amountLabel.children[0].getComponent("PokerChipsView").generateChips(Math.floor(element.winningAmount));
            pos = element.targetNode.parent.getPosition();
            var speed = 0.45;
            var moveAction = cc.moveTo(speed, cc.v2(pos.x, pos.y));

            // if (lastPot) {
            //     potInstance.active = false;
            //     potInstance.children.forEach(function (element) {
            //         element.active = true;
            //     });

            // }
            var funcAction = cc.callFunc(function () {
                // trigger update of player chips?
                // destroy self  
                // console.log("call Func");
                if (!playerAmountUpdated) {
                    playerAmountUpdated = true;
                    // if(element.totalChips)

                    // let prevAmount = Math.floor(element.targetNode.getComponent('PlayerPresenter').amountLabel.string);
                    let prevAmount = Math.roundOff(element.targetNode.getComponent('PlayerPresenter').amountLabel.string, 2);
                    if ((prevAmount + element.winningAmount).roundOff(2) <= element.totalChips) {
                        element.targetNode.getComponent('PlayerPresenter').amountLabel.string = (element.winningAmount + Number(element.targetNode.getComponent('PlayerPresenter').amountLabel.string)).roundOff(2);
                    }
                }

                (potInstance) ? potInstance.children[0].getComponent('PokerChipsView').destroyChips() : "";
                instance.destroy();
                if (counter == 0 && callback != null) {
                    callback();
                }
                // console.log("POtSplitter Winning AMount ", element.winningAmount + " & " + element.targetNode.getComponent('PlayerPresenter').amountLabel.string);

            }, this);
            var splitSequence = cc.sequence(cc.callFunc(() => {
                (potInstance) ? potInstance.parent.active = false : ""
            }), moveAction, funcAction);
            instance.runAction(splitSequence);
            counter--;

            setTimeout(function () { 

                if (cc.isValid(instance)) {
                    // (potInstance) ? potInstance.children[0].getComponent('PokerChipsView').destroyChips(): "";
                    // console.error("pot instance",potInstance.parent);
                    (potInstance) ? potInstance.parent.active = false : "";

                    if (!playerAmountUpdated) {

                        let prevAmount = Math.roundOff(element.targetNode.getComponent('PlayerPresenter').amountLabel.string, 2);
                        // console.log("timeout split", prevAmount, element.winningAmount, (prevAmount + element.winningAmount).roundOff(2), (prevAmount + element.winningAmount).roundOff(2) <= element.totalChips, (element.winningAmount + Number(element.targetNode.getComponent('PlayerPresenter').amountLabel.string)).roundOff(2))
                        if ((prevAmount + element.winningAmount).roundOff(2) <= element.totalChips) {
                            element.targetNode.getComponent('PlayerPresenter').amountLabel.string = (element.winningAmount + Number(element.targetNode.getComponent('PlayerPresenter').amountLabel.string)).roundOff(2);
                        }

                        // element.targetNode.getComponent('PlayerPresenter').amountLabel.string += Math.floor(element.winningAmount);
                    } else {
                        // element.targetNode.getComponent('PlayerPresenter').pokerPresenter.popUpManager.show(PopUpType.NotificationPopup, "Extra Addition " + element.winningAmount + " & Shown Amount " + element.targetNode.getComponent('PlayerPresenter').amountLabel.string, function () { });
                    }
                    instance.stopAllActions();
                    instance.destroy();
                    if (counter == 0 && callback != null) {
                        callback();
                    }
                    // console.log("POtSplitter LAST AMount ", element.winningAmount + " & " + element.targetNode.getComponent('PlayerPresenter').amountLabel.string);


                }
            }.bind(this), 600);

            // // showing who is the winner
            // var tmpParent = element.targetNode.parent;

            // var winnerNotify = new cc.Node("winningText");
            // var label = winnerNotify.addComponent(cc.Label);
            // winnerNotify.setPosition(cc.v2(40, 90));
            // label.string = "Winner!";
            // label.fontSize = 40;
            // label.node.color = cc.hexToColor("#DDDEE0");
            // label.lineHeight = 103;
            // // label.font = self.fontFileName;
            // tmpParent.addChild(winnerNotify, 10);
            // this.scheduleOnce(() => {
            //     winnerNotify.active = false;
            // }, 1.5);


        }, this);
    },

});
