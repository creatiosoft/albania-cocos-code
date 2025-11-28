var K = require("GameConfig").K;

cc.Class({
    extends: cc.Component,

    properties: {
        pokerPresenter: {
            default: null,
            type: cc.Node
        },
    },

    /**
     * @method onLoad
     * @description Lifecycle callback, Used to Register some broadcast as tableUpdate, Perform some alignmetn of widget!
     * @memberof Screens.Lobby.Table.Table#
     */
    onLoad: function () {

    },

    
    onDisable: function () {

    },

    onEnable: function () {
    },

    onClose: function() {
        // this.node.active = false;
        this.pokerPresenter.getComponent("PokerPresenter").toLobby();
    },

    setData:function (data) {
        // [
        //   {
        //     "eventType": "TournamentsBreakStarts",
        //     "data": {
        //       "isInBreak": true,
        //       "currentBreakDetails": {
        //         "breakStartTimeToDisplay": "28/1/2023 12:55 pm",
        //         "breakStartTime": 1674910500189,
        //         "breakEndTimeToDisplay": "28/1/2023 1:0 pm",
        //         "breakEndTime": 1674910800189
        //       },
        //       "nextBreakDetails": {
        //         "breakStartTimeToDisplay": "28/1/2023 1:55 pm",
        //         "breakStartTime": 1674914100387,
        //         "breakEndTimeToDisplay": "28/1/2023 2:0 pm",
        //         "breakEndTime": 1674914400387
        //       }
        //     }
        //   }
        // ]
        this.data = data;

        if (this.data.currentBreakDetails) {
            let timeRemaining = GameManager.getMTimeDuration(Number(this.data.currentBreakDetails.breakEndTime));
            cc.find('Timer/t1/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[0][0];
            cc.find('Timer/t2/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[0][1];
            cc.find('Timer/t3/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[1][0];
            cc.find('Timer/t4/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[1][1];
            this.updateBreakEndsTimer();
        }
        else {
            let timeRemaining = GameManager.getMTimeDuration(Number(this.data.currentTournamentBreak.breakEndTime));
            cc.find('Timer/t1/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[0][0];
            cc.find('Timer/t2/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[0][1];
            cc.find('Timer/t3/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[1][0];
            cc.find('Timer/t4/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[1][1];
            this.updateBreakEndsTimer();
        }
    },

    updateBreakEndsTimer() {
        this.unschedule(this.breakEndsTimer);
        this.breakEndsTimer();
        this.schedule(this.breakEndsTimer, 1);
    },

    breakEndsTimer() {
        // this.data.breakTime -= 1000;

        // currentTournamentBreak

        if (this.data.currentBreakDetails) {
            let timeRemaining = GameManager.getMTimeDuration(Number(this.data.currentBreakDetails.breakEndTime));
            cc.find('Timer/t1/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[0][0];
            cc.find('Timer/t2/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[0][1];
            cc.find('Timer/t3/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[1][0];
            cc.find('Timer/t4/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[1][1];
            if (timeRemaining == "00:00") {
                this.unschedule(this.breakEndsTimer);
                this.node.active = false;    
            }
        }
        else {
            let timeRemaining = GameManager.getMTimeDuration(Number(this.data.currentTournamentBreak.breakEndTime));
            cc.find('Timer/t1/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[0][0];
            cc.find('Timer/t2/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[0][1];
            cc.find('Timer/t3/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[1][0];
            cc.find('Timer/t4/v', this.node).getComponent(cc.Label).string = timeRemaining.split(":")[1][1];
            if (timeRemaining == "00:00") {
                this.unschedule(this.breakEndsTimer);
                this.node.active = false;    
            }
        }

        
        // if (this.data.breakTime <= 0) {
        //     this.unschedule(this.breakEndsTimer);
        //     this.node.active = false;
        //     cc.find('counter', this.node).getComponent(cc.Label).string = "";
        // }
    }

});
