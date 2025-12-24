var Checkbox = require('Checkbox');
// var pokerPresenterInstance = null;
var pokerPresenterType = require('PokerPresenter');

var PreCheckType = cc.Enum({
    CALL: 'Call',
    CALL_ANY: 'CallAny',
    FOLD: 'Fold',
    CHECK: 'Check',
    ALLIN: 'AllIn',
    CHECK_FOLD: 'Check_Fold',
    CALL_ANY_CHECK: 'CallAny_Check',
    NONE: 'NONE',
});


/**
 * @class OptionalPlayerInput
 * @classdesc Manages prechecks as call any, check etc.
 * @memberof Controllers.Gameplay
 */
cc.Class({
    extends: cc.Component,

    properties: {
        pokerPresenter: {
            default: null,
            type: pokerPresenterType,
        },
        set1: {
            default: [],
            type: cc.Node,
        },
        set2: {
            default: [],
            type: cc.Node,
        },
        set3: {
            default: [],
            type: cc.Node,
        },
        callLbl: {
            default: null,
            type: cc.Label,
        },
        callBBLbl: {
            default: null,
            type: cc.Label,
        },
        optionGrid: {
            default: [],
            type: cc.Node,
        },
        selectedValue: null,
        isSelected: false,
    },



    /**
     * @description 
     * @method onLoad
     * @memberof Controllers.Gameplay.OptionalPlayerInput#
     */
    onLoad: function() {
        this.callVal = 0;
        // this.enableTempPlayerInput(false);
        this.optionGrid = [this.set1, this.set2, this.set3];
        this.enableTempPlayerInput(false, 0);
        this.selectedValue = null;
        // this.scheduleOnce(function () {

        this.pokerPresenterInstance = this.node.parent.getChildByName("PokerPresenter").getComponent('PokerPresenter');
        // console.error("ppap ", this.pokerPresenterInstance.model.roomConfig)
        // }.bind(this), 0.2);
        this.requestMappings = {};

        GameManager.on("switchBB", this.switchBBNow.bind(this));
    },

    /**
     * @description Enable input according to set value!
     * @method enableTempPlayerInput
     * @param {boolean} enable -
     * @param {Number} set - 
     * @param {Number} callVal -
     * @memberof Controllers.Gameplay.OptionalPlayerInput#
     */
    enableTempPlayerInput: function(enable, set, callVal = -1, selectedPreCheckValue, calledFromResponse) {
        // console.log(" linkin park precheck called -with enable= ", enable, "calledFromResponse ", calledFromResponse)
        // this.selectedValue = enable ? this.selectedValue : null;

        this.pokerPresenterInstance = this.node.parent.getChildByName("PokerPresenter").getComponent('PokerPresenter');
        if (this.pokerPresenterInstance &&
            this.pokerPresenterInstance.model &&
            this.pokerPresenterInstance.model.roomConfig &&
            this.pokerPresenterInstance.model.roomConfig.isAllInAndFold) {
            return;
        }

        if (this.pokerPresenterInstance && !!calledFromResponse) {
            let playerPresenter = this.pokerPresenterInstance.getMyPlayer();
            if (!!playerPresenter) {
                // console.log("my player ", playerPresenter)
                // console.log("cmi", pokerPresenterInstance.model.gameData.tableDetails.currentMoveIndex, "my si=", playerPresenter.seatIndex, "my name=", playerPresenter.playerName, "pp of cm ", pokerPresenterInstance.playerHand[pokerPresenterInstance.getRotatedSeatIndex(pokerPresenterInstance.model.gameData.tableDetails.currentMoveIndex)])
                if ((this.pokerPresenterInstance.model.gameData.tableDetails.currentMoveIndex == playerPresenter.seatIndex) || (this.pokerPresenterInstance.model.gameData.tableDetails.state == K.GameState.GameOver)) {
                    // console.log("linkin park , caught the case of response come while self turn or after game over")
                    for (let k = 0; k < this.optionGrid.length; k++) {
                        for (var l = 0; l < this.optionGrid[k].length; l++) {
                            this.optionGrid[k][l].active = false;
                            this.optionGrid[k][l].getChildByName('Checkbox').getComponent(Checkbox).setSelection(false);
                        }
                    }
                    // console.log("prechecks hidden in bug case");

                    //trying
                    this.selectedValue = null;

                    return; //Returning in case of turn came and response came after 1 ms ,so the turn should not be hidden

                } else {
                    let errorOverlapFlag = false;
                    for (let k = 0; k < this.optionGrid.length; k++) {
                        for (var l = 0; l < this.optionGrid[k].length; l++) {
                            if (this.optionGrid[k][l].active) {
                                errorOverlapFlag = true;
                            }
                        }
                    }



                    if (errorOverlapFlag) {
                        // console.log("linkin park ", " precheck overlap bug found");
                    }

                }

            }

        }
        set = enable ? set : 0;
        //    console.log(set);
        // if (!!calledFromResponse) { //if active
        //     // console.log("linkin park ,precheck enabled because of response with ", selectedPreCheckValue);
        // }
        for (var i = 0; i < this.optionGrid.length; i++) {
            //  this.optionGrid[i].active = (set - 1 == i);
            this.enableSet(i, set - 1 == i, callVal, selectedPreCheckValue);
        }
    },

    /**
     * @description 
     * @method enableSet
     * @param {Number} index -
     * @param {boolean} active -
     * @param {Number} callVal -
     * @memberof Controllers.Gameplay.OptionalPlayerInput#
     */
    enableSet: function(index, active, callVal, selectedPreCheckValue) {
        //  console.log("inside enableSet");
        //  console.log(active);
        // if (this.selectedValue != null && this.selectedValue != "NONE" && selectedPreCheckValue == "NONE") {
        //     selectedPreCheckValue = this.selectedValue;
        // }
        // let checkRegisteredSucess = false;
        this.callVal = 0;
        for (var i = 0; i < this.optionGrid[index].length; i++) {

            this.optionGrid[index][i].active = active;
            this.optionGrid[index][i].getChildByName('Checkbox').getComponent(Checkbox).setSelection(false);
            // this.selectedValue = null;
            // console.log()
            if (this.optionGrid[index][i].name == "Call" && (callVal > 0)) {
                if ((callVal > 0)) {
                    this.callVal = callVal;
                    this.optionGrid[index][i].getChildByName('Label').getComponent(cc.Label).string = LocalizedManager.t('TXT_CALL') + " " + Math.floor(callVal);
                    this.optionGrid[index][i].getChildByName('Label').getComponent(cc.Label).__string = Math.floor(callVal);
                } else {
                    this.optionGrid[index][i].getChildByName('Label').getComponent(cc.Label).string = LocalizedManager.t('TXT_CALL');
                }
            }

            if (this.optionGrid[index][i].name == selectedPreCheckValue) {
                this.optionGrid[index][i].getChildByName("Checkbox").getComponent(Checkbox).onClick();
                // this.selectedValue = this.optionGrid[index][i].name;
                // checkRegisteredSucess = true;
                // console.log("shishir AJAY  Setting Precheck Done", this.selectedValue, active);
                // return;
            } else {
                // this.selectedValue = null;
            }

        }
        //this.selectedValue = null;

        this.updateBB();
    },
    tempTestFunction: function(callVal) {
        console.log(">>>>>> tempTestFunction");
        console.log("callVal", callVal);

        // console.log("TEMP Test function", callVal)
        // LocalizedManager.t('TXT_CALL') + " "+ callVal
        if (callVal == 0 || callVal == "0" || callVal == "-0") {
            this.callLbl.string = LocalizedManager.t('TXT_CALL');
        } else {
            this.callLbl.string = LocalizedManager.t('TXT_CALL') + " " + Math.floor(callVal);
        }

    },

    /**
     * @description
     * @method saveMoveFor
     * @param {Object} data
     * @memberof Controllers.Gameplay.OptionalPlayerInput#
     */
    saveMoveFor: function(data) {
        // let pokerPresenterInstance = this.node.parent.getChildByName("PokerPresenter").getComponent('PokerPresenter');
        if (this.pokerPresenterInstance) {
            this.pokerPresenterInstance.playAudio(K.Sounds.click);
            // console.log("POKER FOUND ", pokerPresenterInstance);
            let playerPresenter = this.pokerPresenterInstance.getMyPlayer();
            // console.log("linkin park, precheck clicked , declining = ", (this.pokerPresenterInstance.model.gameData.tableDetails.currentMoveIndex));
            // console.log(playerPresenter)
            if (this.pokerPresenterInstance.model.gameData.tableDetails.currentMoveIndex == playerPresenter.seatIndex) {
                // console.log("ECXITING COZ CMI ", this.pokerPresenterInstance.model.gameData.tableDetails.currentMoveIndex)
                let i = data.currentTarget.parent.getSiblingIndex();
                let j = data.currentTarget.getSiblingIndex();
                // console.error("linkin park DECLINING REGISTER PRECHECK", this.optionGrid[i][j].name, i, j);
                this.optionGrid[i][j].getChildByName('Checkbox').getComponent(Checkbox).setSelection(false);
                return;
            }
        }

        var i = data.currentTarget.parent.getSiblingIndex();
        var j = data.currentTarget.getSiblingIndex();

        var isSelected = this.optionGrid[i][j].getChildByName('Checkbox').getComponent(Checkbox).getSelection();
        // for (var k = 0; k < this.optionGrid[i].length; k++) {
        // if (k != j) {
        // this.optionGrid[i][j].getChildByName('Checkbox').getComponent(Checkbox).setSelection(false);
        this.optionGrid[i][j].getChildByName('Checkbox').getComponent(Checkbox).onClick();
        // }
        // }
        let selectedValue = isSelected ? this.optionGrid[i][j].name : null;

        let set = i + 1;

        // let callValue = -1;
        // if (this.optionGrid[i][j].name == "Call") {
        //     console.error('call value', this.optionGrid[i][j].getChildByName('Label').getComponent(cc.Label).string);
        //     callValue = Number(this.optionGrid[i][j].getChildByName('Label').getComponent(cc.Label).string);
        // }
        // Who is the kalaakaar?
        let callValue = -1;
        if (this.optionGrid[i][j].name == "Call") {
            let tmp = this.optionGrid[i][j].getChildByName('Label').getComponent(cc.Label).string;
            callValue = tmp.match(/\d+/g); //.map(Number);
            if (callValue.length > 1) {
                callValue = Number(callValue[0] + "." + callValue[1]);
            } else {
                callValue = Number(callValue[0]);
            }
        }
        // if (this.selectedValue != null) {
        this.togglePreCheckOnServer(selectedValue, set, callValue);
        // }
    },

    togglePreCheckOnServer: function(precheck, set, callVal = -1) {
        var data = {};
        data.playerId = GameManager.user.playerId;
        data.channelId = this.node.parent.getComponent('PokerModel').gameData.channelId;
        data.precheckValue = (precheck == null) ? 'NONE' : precheck;
        data.set = set;
        data.isRequested = true;
        data.callPCAmount = callVal; //callVal[0];
        // console.log("linkin park request sent to server ", data.precheckValue);

        //trying
        this.selectedValue = null;
        // console.log("req bhej")
        let requestId = this.makeId();
        this.requestMappings[requestId] = this.pokerPresenterInstance.preCheckCounter;
        console.log('pre check reaquest', data);

        {
            ServerCom.pomeloRequest(K.PomeloAPI.updatePreCheckOnServer, data, function(data) {
                if (data.success) {
                    // console.log("resp aya")
                    console.log("linkin park response of PRECHECK ACKNOWLEGED n culprit", data);

                    if (this.requestMappings[requestId] < this.pokerPresenterInstance.preCheckCounter) {
                        console.log("AVOIDED NEW FAILURE CASE")
                    } else {
                        this.selectedValue = (data.precheckValue == 'NONE') ? null : data.precheckValue;
                        this.enableTempPlayerInput(true, data.set, data.callPCAmount, data.precheckValue, true);
                    }
                    // console.error("linkin park server response and selectedValue=", data.precheckValue, data.precheckValue == "NONE")
                } else {
                    console.error("PRECHECK FUCKED UP");
                }
            }.bind(this), null, 5000, false);
        }

    },

    resetAll: function() {

    },

    makeId: function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },

    updateBB: function() {
        if (!this.pokerPresenter || !this.pokerPresenter.model || !this.pokerPresenter.model.gameData) {
            return;
        }

        this.callBBLbl.string = LocalizedManager.t('TXT_CALL') + " " + (Number(this.callLbl.__string) / this.pokerPresenter.model.gameData.tableDetails.bigBlind).toFixed(1) + 'BB';

        if (GameManager.isBB && GameManager.user.settings.stackInBB) {
            this.callLbl.node.active = false;
            this.callBBLbl.node.active = true;
        } else {
            this.callLbl.node.active = true;
            this.callBBLbl.node.active = false;
        }
    },

    switchBBNow() {
        this.updateBB();
    },

});

