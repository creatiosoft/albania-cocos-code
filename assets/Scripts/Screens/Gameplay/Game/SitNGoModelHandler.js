var PopUpType = require('PopUpManager').PopUpType;
var GameData = require('ResponseTypes').GameData;
/**
 * @class SitNGoModelHandler
 * @classdesc This script uses prototype property to add functionality in the PokerModel and PokerPresenter.
 * @memberof Screens.Gameplay.Game
 */

/**
 * @method SitNGoModelHandler
 * @description created a Prototype
 * @memberof Screens.Gameplay.Game.SitNGoModelHandler#
 */
function SitNGoModelHandler() {

}
/**
 * @method setSitGoModel
 * @description A prototype setSitNGoModel method is added in SitNGoModelHandler to enable/disable some functionality in PokerModel like to disable sitHere
 * @param {Object} pokerModel -reference to pokermodel
 * @memberof Screens.Gameplay.Game.SitNGoModelHandler#
 */
SitNGoModelHandler.prototype.setSitNGoModel = function (pokerModel) {

    pokerModel.playerElimination = function (data) {
        pokerModel.emit(K.PokerEvents.onSitnGoElimination, data);
    };

    pokerModel.sitHere = function (index, buyIn, callback) { };
    /**
     * try!
     * @method playerNewChannel
     * @param {object} data -
     * @description Leave current channel and join the new channel(Table)
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.playerNewChannel = function (data) {
        for (var index = 0; index < pokerModel.gameModel.activePokerModels.length; index++) {
            if (pokerModel === pokerModel.gameModel.activePokerModels[index]) {
                pokerModel.gameModel.activePokerModels.splice(index, 1);
                break;
            }
        }
        var tableId = pokerModel.roomConfig.tableId;
        pokerModel.node.destroy();
        // need delay for actual node destruction by engine
        GameManager.scheduleOnce(function () {
            GameManager.gameModel.emit(K.GameEvents.OnTableClosed);
            var channel = {};
            channel.channelId = data.newChannelId;
            channel.channelType = "TOURNAMENT";
            channel.tableId = "";
            channel.isRequested = true;
            GameManager.join(channel.channelId, K.PomeloAPI.joinChannel, channel);
            // }
        }.bind(this), 0.3);
    };
    /**
     * @method onBrakTime
     * @description //
     * @param {object} data -
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.onBreakTime = function (data) {
        pokerModel.emit(K.PokerEvents.onBreakTime, data);
    };
    /**
     * @method onBreakTimeStart
     * @description //
     * @param {object} data -
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.onBreakTimeStart = function (data) {
        //pokerModel.breakTime = data.breakTime;
        pokerModel.emit(K.PokerEvents.onBreakTimeStart, data);
    };
    /**
     * @method onRebuyStatus
     * @description Broadcast callback, emits event on pokerPresenter
     * @param {object} data Response data from server
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.onRebuyStatus = function (data) {
        pokerModel.emit(K.PokerEvents.onRebuyStatus, data);
    };

    /**
     * @description Emits event on poker presenter, when blind changes
     * @method onBlindsChanged
     * @param {Object} response
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.onBlindsChanged = function (response) {
        //console.log("response");
        // clearInterval(pokerModel.timerRef);
        // if (pokerModel.gameData.tableDetails.blindTimeRemaining <= 0) {
        //     pokerModel.stopBlindChangeTimer();
        // } else {
        pokerModel.gameData.tableDetails.blindTimeRemaining = response.blindTimeRemaining;
        pokerModel.roomConfig.nextSmallBlind = response.nextSmallBlind;
        pokerModel.roomConfig.nextBigBlind = response.nextBigBlind;
        pokerModel.roomConfig.nextAnte = response.nextAnte;
        pokerModel.emit(K.PokerEvents.onBlindsChanged);
        //  pokerModel.startBlindChangeTimer();
        // }
    };

    /**
     * @description Starts blind Change timer, invoked by onBlindsChanged()
     * @method startBlindChangeTimer
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.startBlindChangeTimer = function () {
        pokerModel.timerRef = setInterval(function () {
            pokerModel.gameData.tableDetails.blindTimeRemaining -= 1000;
            if (pokerModel.gameData.tableDetails && pokerModel.gameData.tableDetails.blindTimeRemaining <= 0) {
                pokerModel.gameData.tableDetails.blindTimeRemaining = 0;
                pokerModel.emit(K.PokerEvents.onBlindsChanged);
                clearInterval(pokerModel.timerRef);
            }
            pokerModel.emit(K.PokerEvents.onBlindsChanged);
        }.bind(pokerModel), 1000);
    };

    /**
     * @description Emits an event on poker presenter when 
     * @method stopBlindChangeTimer
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.stopBlindChangeTimer = function () {
        // clearInterval(pokerModel.timerRef);
        pokerModel.emit(K.PokerEvents.onBlindsChangeStopped);
    };

    /**
     * @description Broadcast callback. Emits an event on poker presenter when Addon Time Starts
     * @method onAddOnTimeStarts
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.onAddOnTimeStarts = function (response) {
        // if (pokerModel.tableDetails.tableDetails.isAddon) {

        // }
        this.gameData.tableDetails.isAddon = true;
        // pokerPresenter.addonBtn.active = true;
        // pokerModel.addonTimerRef = setInterval(function () {
        //     pokerModel.gameData.tableDetails.addonTimeRemaining -= 1000;
        //     if (pokerModel.gameData.tableDetails.addonTimeRemaining <= 0)
        //         pokerModel.emit(K.PokerEvents.onAddonTimeEnd);
        // }.bind(pokerModel), 1000);
        pokerModel.emit(K.PokerEvents.onAddonChanged);
    };

    /**
     * @description  Broadcast callback. Emits an event on poker presenter when Addon Time Ends
     * @method onAddOnTimeEnds
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.onAddOnTimeEnds = function (response) {
       this.gameData.tableDetails.isAddon = false;
        // pokerPresenter.addonBtn.active = true;
        // clearInterval(pokerModel.addonTimerRef);
        pokerModel.emit(K.PokerEvents.onAddonChanged);
    };

    /**
     * @description On Addon button click
     * @method onAddonClick
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.onAddonClick = function () {
        if (pokerPresenter.model.tableDetails.isAddon) {
            let requestObject = {};
            requestObject.channelId = pokerModel.gameData.channelId;
            requestObject.playerId = pokerModel.gameData.playerId;
            requestObject.tournamentId = pokerModel.roomConfig.tableId;
            ServerCom.pomeloRequest(K.PomeloAPI.addon, requestObject, function (responseObject) {
                if (responseObject.success) {
                    //updatechips
                    pokerPresenter.onPlayerCoins(pokerModel.getPlayerById(pokerModel.gameData.playerId));

                } else {

                }

            }, null, false, false);
        } else return;
    };

    /**
     * @description On DoubleRebuy button click
     * @method onAddonClick
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.onDoubleRebuyClick = function () {
        let requestObject = {};
        requestObject.tournamentId = pokerModel.gameData.roomConfig.tableId;
        requestObject.playerId = pokerModel.gameData.playerId.
            requestObject.gameVersionCount;
        requestObject.channelId = pokerModel.gameData.channelId;
        ServerCom.pomeloRequest(K.PomeloAPI.doubleRebuy, requestObject, function (responseObject) {
            if (responseObject.success) {
                //updatechips
                pokerPresenter.onPlayerCoins(pokerModel.getPlayerById(pokerModel.gameData.playerId));

            } else { }
        }, null, false, false);
    };

    /**
     * @description On Rebuy button click
     * @method onRebuyClick
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.onRebuyClick = function () {
        let requestObject = {};
        requestObject.tournamentId = pokerModel.gameData.roomConfig.tableId;
        requestObject.playerId = pokerModel.gameData.playerId.
            requestObject.gameVersionCount;
        requestObject.channelId = pokerModel.gameData.channelId;
        ServerCom.pomeloRequest(K.PomeloAPI.rebuyInTournament, requestObject, function (responseObject) {
            if (responseObject.success) {
                //updatechips
                pokerPresenter.onPlayerCoins(pokerModel.getPlayerById(pokerModel.gameData.playerId));

            }
            else { }
        }, null, false, false);
    };
    // /**
    //  * @description On rebuyCheckbox selection
    //  * @method updateAutoRebuyCheckbox
    //  * @memberof Screens.Gameplay.Game.PokerModel#
    //  */
    // pokerModel.updateAutoRebuyCheckbox = function () {
    //     if (pokerPresenter.isAutoRebuyAllowed() && pokerModel.rebuyCheckbox.getSelection()) {
    //         let requestObject = {};
    //         requestObject.channelId = pokerModel.gameData.channelId;
    //         requestObject.playerId = pokerModel.gameData.playerId.
    //             requestObject.isAutoRebuy;
    //         ServerCom.pomeloRequest(K.PomeloAPI.updateAutoRebuy, requestObject, function (responseObject) {
    //             if (responseObject.success) {
    //                 pokerModel.rebuyCheckbox.setSelection(true);
    //                 //updatechips
    //                 pokerPresenter.onPlayerCoins(pokerModel.getPlayerById(pokerModel.gameData.playerId));
    //             } else {
    //                 if (responseObject)
    //                     console.log("chips will be updated on Broadcast");
    //             }
    //         }, null, false, false);
    //     } else return;
    // };

    /**
     * @description To update server when player checks auto addon checks
     * @method updateAutoAddon
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    // pokerModel.updateAutoAddon = function () {
    //     let requestObject = {};
    //     requestObject.channelId = pokerModel.gameData.channelId;
    //     requestObject.playerId = pokerModel.gameData.playerId.
    //         requestObject.isAutoAddOn = true;
    //     ServerCom.pomeloRequest(, requestObject, function (responseObject) {
    //         if (responseObject.success) {
    //             pokerPresenter.addonCheckbox.setSelection(true);
    //         }
    //     }, null, false, false);
    // };

    /**
    * @description Displays 3 buttons when player is out of chips
    * @method onBankrupt
    * @memberof Screens.Gameplay.Game.PokerModel#
    */
    pokerModel.onBankrupt = function (response) {
        // ServerCom.pomeloRequest(K.PomeloAPI.getTables, request, function (responseObject) {
        //     pokerPresenter.leaveBtn.active = true;
        //     pokerPresenter.rebuyBtn.active = responseObject.result.isRebuyAllowed;
        //     if (responseObject.result.isRebuyAllowed && (responseObject.result.numberOfRebuy <= 0)) {
        //         pokerPresenter.doubleRebuyBtn.active = true;
        //     }
        // }, null, false, false);
    };


    /**
    * @description Leave Tournament button callback 
    * @method onLeaveTournament
    * @memberof Screens.Gameplay.Game.PokerModel#
    */
    pokerModel.onLeaveTournament = function () {
        // if (pokerPresenter.playerHand.state != K.PlayerState.Left) {
        //     var requestObject = {};
        //     requestObject.channelId = pokerPresenter.model.gameData.channelId;
        //     requestObject.playerId = pokerPresenter.model.gameData.playerId;
        //     Servercom.pomeloRequest(K.PomeloAPI.leaveTourney, requestObject, function (responseObject) {
        //         if (responseObject.success) {
        //             pokerPresenter.playerHand.state = K.PlayerState.Left;
        //             pokerPresenter.playerHand.onStateChange();
        //         }

        //     }, error, null, true, true);
        // }
    };
    /**
     * @method onInitializePoker
     * @description Registerd some broadcast for SitNGoModel.
     * @memberof Screens.Gameplay.Game.PokerModel#
     */
    pokerModel.onInitializePoker = function () {
        pokerModel.gameModel.registerBroadcastCallbacks(pokerModel.gameData.channelId, K.BroadcastRoute.playerNewChannel, pokerModel.playerNewChannel.bind(pokerModel));
        pokerModel.gameModel.registerBroadcastCallbacks(pokerModel.gameData.channelId, K.BroadcastRoute.playerElimination, pokerModel.playerElimination.bind(pokerModel));
        pokerModel.gameModel.registerBroadcastCallbacks(pokerModel.gameData.channelId, K.BroadcastRoute.breakTime, pokerModel.onBreakTime.bind(pokerModel));
        pokerModel.gameModel.registerBroadcastCallbacks(pokerModel.gameData.channelId, K.BroadcastRoute.breakTimerStart, pokerModel.onBreakTimeStart.bind(pokerModel));
        pokerModel.gameModel.registerBroadcastCallbacks(pokerModel.gameData.channelId, K.BroadcastRoute.rebuyStatus, pokerModel.onRebuyStatus.bind(pokerModel));
        pokerModel.gameModel.registerBroadcastCallbacks(pokerModel.gameData.channelId, K.BroadcastRoute.onBankrupt, pokerModel.onBankrupt.bind(pokerModel));

        pokerModel.gameModel.registerBroadcastCallbacks(pokerModel.gameData.channelId, K.BroadcastRoute.updateBlind, pokerModel.onBlindsChanged.bind(pokerModel));
        pokerModel.gameModel.registerBroadcastCallbacks(pokerModel.gameData.channelId, K.BroadcastRoute.addonTimeStarts, pokerModel.onAddOnTimeStarts.bind(pokerModel));
        pokerModel.gameModel.registerBroadcastCallbacks(pokerModel.gameData.channelId, K.BroadcastRoute.addonTimeEnds, pokerModel.onAddOnTimeEnds.bind(pokerModel));

        if (pokerModel.roomConfig.tournamentType == pokerModel.K.TournamentType.Normal) {
            
            // pokerModel.emit(pokerModel.K.PokerEvents.onAddonChanged);
            // pokerModel.emit(pokerModel.K.PokerEvents.onAddOnCheckBox);
            // pokerModel.emit(pokerModel.K.PokerEvents.onRebuyCheckBox);
            // if (pokerModel.gameData.tableDetails.isReBuy) {
            //     var response = {};
            //     response.success = pokerModel.gameData.tableDetails.isAutoRebuy;
            //     pokerModel.emit(pokerModel.K.PokerEvents.onAddOnCheckBox, response);
            // }
            // if (pokerModel.gameData.tableDetails.isAddOn) {
            //     var response = {};
            //     response.success = pokerModel.gameData.tableDetails.isAutoAddOn;
            //     if (response.success)
            //     { pokerModel.emit(pokerModel.K.PokerEvents.onRebuyCheckBox, response); }
            //     else {
            //         response.status = response.success;
            //         pokerModel.emit(K.PokerEvents.onRebuyStatus, response)
            //     }
            // }
            pokerModel.emit(K.PokerEvents.onBlindsChanged);
        }

    };
    pokerModel.setAddOnCheckbox = function (selection, callback) {
        var data = {};
        data.playerId = GameManager.user.playerId;
        data.channelId = pokerModel.gameData.channelId;
        data.isAutoAddOn = !selection;
        ServerCom.pomeloRequest(pokerModel.K.PomeloAPI.updateAutoAddon, data, function (response) {
            if (response.success && callback) {
                //update chips, notification
                callback(response);
            }
        }.bind(this), null, 5000, false, false);
    };
    pokerModel.setRebuyCheckBox = function (selection, callback) {
        var data = {};
        data.playerId = GameManager.user.playerId;
        data.channelId = pokerModel.gameData.channelId;
         data.isAutoRebuy = !selection;
        ServerCom.pomeloRequest(pokerModel.K.PomeloAPI.updateAutoRebuy, data, function (response) {
            if (callback) {
                //update chips, notification
                callback(response);
            }
        }.bind(this), null, 5000, false, false);
    }
}
/**
 * @method setSitNGoPresenter
 * @description Add some functionality to PokerPresenter 
 * @param {object} pokerPresenter
 * @memberof Screens.Gameplay.Game.setSitNGoPresenter#
 */
SitNGoModelHandler.prototype.setSitNGoPresenter = function (pokerPresenter) {
    pokerPresenter.onSitnGoElimination = function (data) {
        if (data.playerId = GameManager.user.playerId) {
            data.pokerPresenter = pokerPresenter;
            setTimeout(function () {
                //user might leave the current game in this time out.
                if (!!pokerPresenter) {
                    pokerPresenter.popUpManager.show(PopUpType.SitNGoResultPopup, data, function () { });
                }
            }, 2000);
        }
    };

    /**
     * @method tempOnLoad
     * @description Register Some broadcast for pokerpresenter 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.tempOnLoad = function () {
        pokerPresenter.model.on(K.PokerEvents.onSitnGoElimination, pokerPresenter.onSitnGoElimination.bind(pokerPresenter));
        pokerPresenter.model.on(K.PokerEvents.onBreakTime, pokerPresenter.onBreakTime.bind(pokerPresenter));
        pokerPresenter.model.on(K.PokerEvents.onBreakTimeStart, pokerPresenter.onBreakTimeStart.bind(pokerPresenter));
        pokerPresenter.model.on(K.PokerEvents.onRebuyStatus, pokerPresenter.onRebuyStatus.bind(pokerPresenter));

        pokerPresenter.model.on(K.PokerEvents.onBlindsChanged, pokerPresenter.notifyBlindsChanged.bind(pokerPresenter));
        pokerPresenter.model.on(K.PokerEvents.onBlindsChangeStopped, pokerPresenter.stopBlindsChangeNotification.bind(pokerPresenter));
        pokerPresenter.model.on(K.PokerEvents.onAddonChanged, pokerPresenter.onAddonChanged.bind(pokerPresenter));
        //pokerPresenter.model.on(K.PokerEvents.onAddonChanged, pokerPresenter.onAddonChanged.bind(pokerPresenter));

        pokerPresenter.model.on(K.PokerEvents.onAddOnCheckBox, pokerPresenter.addOnCheckCB.bind(pokerPresenter));
        pokerPresenter.model.on(K.PokerEvents.onRebuyCheckBox, pokerPresenter.reBuyCheckCB.bind(pokerPresenter));
        this.autoAddOnCheckBox.registerCallback(this.onAddOnCheckBox.bind(this));
        this.autoBuyInCheckBox.registerCallback(this.onRebuyCheckBox.bind(this));

    };
    pokerPresenter.tempOnJoinSuccess = function()
    {
     if (this.model.roomConfig.tournamentType == this.model.K.TournamentType.Normal) {
        this.setCheckBoxValues();
        this.rebuyBtn.active = this.model.gameData.tableDetails.isRebuy && !this.model.gameData.tableDetails.isAutoAddOn;
     }
         this.tournamentAlreadyOver();
               if (!!this.model.gameData.tableDetails.isOnBreak) {
            var breakEnds = this.model.gameData.tableDetails.breakEnds;
          
            this.startBreakTimer(( breakEnds !== undefined) ? breakEnds : false); //key needed
        
    }
};
    
    pokerPresenter.setCheckBoxValues = function() {
        this.sitOutNextBBCheckBox.node.parent.active = false;
        // this.straddleCheckBox.node.parent.active = false;
       this.autoAddOnCheckBox.node.parent.active = true;
       this.autoBuyInCheckBox.node.parent.active = true;
       this.autoAddOnCheckBox.setSelection(this.model.gameData.tableDetails.isAutoAddOn);
       this.autoBuyInCheckBox.setSelection(this.model.gameData.tableDetails.isAutoRebuy);
    //     if(this.model.gameData.tableDetails.isAddon)
    //    { 
    //        this.autoAddOnCheckBox.node.parent.active = true;
    //    this.autoAddOnCheckBox.setSelection(this.model.gameData.tableDetails.isAutoAddOn);
    // }
    //  if(this.model.gameData.tableDetails.isRebuy)
    //    { 
    //        this.autoBuyInCheckBox.node.parent.active
    //    this.autoBuyInCheckBox.setSelection(this.model.gameData.tableDetails.isAutoRebuy);
    // }
    },
    /**
     * @method resetView
     * @description reset the view for each player in table
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.resetView = function () {
        pokerPresenter.indexOffset = 0;
        for (var index = 0; index < pokerPresenter.playerHand.length; index++) {
            pokerPresenter.playerHand[index].resetSeat();
        }
        // reallocate seat
        pokerPresenter.allocateSeat();
        pokerPresenter.playerHand.forEach(function (element) {
            if (element.seatState === K.SeatState.Free) {
                element.disableView();
            }
        }, pokerPresenter);
    };

    /**
     * @method onBrakTime , nn
     * @description shows notification of Break Time Start
     * @param {object} data - 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.onBreakTime = function (data) {
        var newData = {};
        newData.info = "Break Time Starts...";
        pokerPresenter.popUpManager.show(PopUpType.PlayerInfoPopup, newData, function () { });
    };

    /**
     * @method onBrakTimeStart
     * @description shows a timer in view which indicate break time
     * @param {object} data -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.onBreakTimeStart = function (data) {
        //  var newData = {};
        // newData.info = "There will be a break of " + data.breakTime + " mins";
        pokerPresenter.startBreakTimer(data.breakTime);
        // pokerPresenter.popUpManager.show(PopUpType.PlayerInfoPopup, newData, function () { });
    };

    /**
     * @method onRebuyStatus
     * @description Active/Deactive rebuy button
     * @param {object} data-
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.onRebuyStatus = function (data) {
        pokerPresenter.rebuyBtn.active = data.status;
    };
      /**
     * @method startBreakTimer
     * @description Called to startBreakTimer
     * @param {Number} timer -
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.startBreakTimer = function(timer) { 
        this.tournamentInfo.parent.active = true;
        this.tournamentInfo.active = true;
        // console.log("i have been callled");
        // console.log(timer);
        var label = this.tournamentInfo.getComponent(cc.Label);
        if(!timer)
        {
            label.string = "This table is on Break";
        }
        var timeLeft;
        if (timer > 1000) { //THIS WILL CHANGE
         timeLeft = parseInt(parseInt(timer)/1000);
        }
        else
        {
              timeLeft = parseInt(timer) * 60;
        }      
       
        this.timerSchedule = setInterval(function() {
             label.string = "Break Time Starts...\n" + "Time Left : " + parseInt(timeLeft / 60) + ":" + (timeLeft % 60);
            timeLeft--;
            if(timeLeft <= 0)
            {
                clearInterval(this.timerSchedule.bind(this));
                  this.tournamentInfo.parent.active = false;

            }
        }.bind(this), 1000);
        // this.timerOffSchedule = setTimeout(
        //     function() {
        //         clearInterval(this.timerSchedule);
        //         if (!!this.tournamentInfo) {
        //             this.tournamentInfo.parent.active = false;
        //         }
        //     }.bind(this), timeLeft * 1000);
    };

    /**
     * @method playerLeft
     * @description reset seat view for the player
     * @param {Object} data 
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.playerLeft = function (data) {
        // reset seat view for the player
        if (data === null) {
            // already stand!
            return;
        }
        //If my player then reset the whole view
        if (data[0].playerId === pokerPresenter.model.gameData.playerId) {
            this.handleSitOutBtns(true);
            pokerPresenter.resetView();
        }
        //For another player
        pokerPresenter.playerHand[pokerPresenter.getRotatedSeatIndex(data[0].seatIndex)].disableView();
        this.scheduleOnce(function () {
            if (pokerPresenter.model.gameData.tableDetails.players.length == 0) {
                var data = {};
                data.pokerPresenter = pokerPresenter;
                pokerPresenter.popUpManager.show(PopUpType.SitNGoResultPopup, data, function () { });
            }
        }, 5);
    };

    /**
     * @description Called when game starts and when blindsChange poker event occurs. Show a popUp notification when blind changes (or K.PokerEvents.onblindsChangedEvent Occurs)
     * @method notifyBlindsChanged
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.notifyBlindsChanged = function () {
        pokerPresenter.notificationBox.active = true;
        let str;
        // if (pokerPresenter.model.gameData.tableDetails.blindTimeRemaining <= 0) {
        //     pokerPresenter.stopBlindsChangeNotification();
        // } else {
        //     let timeRemaining = GameManager.getTimeDuration(pokerPresenter.model.gameData.tableDetails.blindTimeRemaining);
        //     str = "In " + timeRemaining + " mins ";
        //     str += "Blinds " + pokerPresenter.model.roomConfig.nextSmallBlind + "/" + pokerPresenter.model.roomConfig.nextBigBlind + " Ante " + pokerPresenter.model.roomConfig.nextAnte;
        // }
        if (pokerPresenter.model.gameData.tableDetails.nextSmallBlind <= 0) {
            pokerPresenter.stopBlindsChangeNotification();
        } else {
            str = "";
            str += "Next Blinds " + pokerPresenter.model.roomConfig.nextSmallBlind + "/" + pokerPresenter.model.roomConfig.nextBigBlind + "Next Ante " + pokerPresenter.model.roomConfig.nextAnte;
        }

        pokerPresenter.notificationBox.getChildByName("Message").getComponent(cc.Label).string = str;
    };

    /**
     * @description Stops Notifying the player about blind change notification
     * @method stopBlindsChangeNotification
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.stopBlindsChangeNotification = function () {
        pokerPresenter.notificationBox.active = false;
        // clearInterval(this.timerRef);
    };

    /**
     * @description Called when AddonTimeEnd Event occurs.
     * @method onAddonTimeEnd
     * @memberof Screens.Gameplay.Game.PokerPresenter#
     */
    pokerPresenter.onAddonChanged = function () {
        this.addonBtn.active = this.model.gameData.tableDetails.isAddon;
        //this.autoAddOnCheckBox.node.parent.active = this.model.gameData.tableDetails.isAddOnAllowed;
    };

    pokerPresenter.onAddOnCheckBox = function () {
        var selection = pokerPresenter.autoAddOnCheckBox.getSelection();
        this.model.gameData.isAutoRebuy = selection;
        this.model.setAddOnCheckbox(selection, function (response) {
            if (!response.success) {
                this.model.gameData.isAutoRebuy = !selection;
            }
            this.addOnCheckCB.bind(this)
        }.bind(this));
    };

    pokerPresenter.addOnCheckCB = function () {
        this.autoAddOnCheckBox.setSelection(this.model.gameData.isAutoRebuy);
    };
    pokerPresenter.onRebuyCheckBox = function () {
        var selection = pokerPresenter.autoBuyInCheckBox.getSelection();
        this.model.setRebuyCheckBox(selection, function (response) {
            if (!response.success) {
                this.model.gameData.isAutoRebuy = !selection;
            }
            this.reBuyCheckCB.bind(this)
        }.bind(this));
    };
    pokerPresenter.reBuyCheckCB = function (response) {
      
        pokerPresenter.autoBuyInCheckBox.setSelection(this.model.gameData.isAutoRebuy);
    };
}

module.exports = {
    SitNGoModelHandler: SitNGoModelHandler,
};