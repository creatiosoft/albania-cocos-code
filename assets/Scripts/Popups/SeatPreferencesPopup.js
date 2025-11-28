var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var CheckBoxType = require('Checkbox');

/**
 * @classdesc
 * @class SeatPreferancesPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,
    properties: {
        popUpManager: {
            default: null,
            type: PopUpManager
        },
        checkBox: {
            default: [],
            type: CheckBoxType,
        },
        selectedSeat: "1",
        maxPlayers: 0,
        twoSeatsView: {
            default: null,
            type: cc.Node,
        },
        sixSeatsView: {
            default: null,
            type: cc.Node,
        },
        nineSeatsView: {
            default: null,
            type: cc.Node,
        },
        activeView: {
            default: null,
            type: cc.Node,
        },
    },

    /**
     * @description Show default or saved seat.
     * @method onLoad
     * @memberof Popups.SeatPreferancesPopup#
     */
    onLoad: function () {
        this.scheduleOnce(function () {
            this.showSelected();
        }.bind(this), 0.2);
    },

    /**
     * @description Call to set view according to number of max players in table and show saved seat prefernce.
     * @method onShow
     * @param {Object} data
     * @memberof Popups.SeatPreferancesPopup#
     */
    onShow: function (data) {
        this.maxPlayers = data;
        switch (data) {
            case 2:
                this.setView(true, false, false, this.twoSeatsView);
                break;
            case 6:
                this.setView(false, true, false, this.sixSeatsView);
                break;
            case 9:
                this.setView(false, false, true, this.nineSeatsView);
                break;
        }
        this.showSelected();
    },

    /**
     * @description Set Number Of Seats to Show in Popup according to the number of max players in table. 
     * @method setView
     * @param {boolean} two
     * @param {boolean} six
     * @param {boolean} nine
     * @param {Number} view
     * @memberof Popups.SeatPreferancesPopup#
     */
    setView: function (two, six, nine, view) {
        this.twoSeatsView.active = two;
        this.sixSeatsView.active = six;
        this.nineSeatsView.active = nine;
        this.activeView = view;
    },

    /**
     * @description Show stored seat prefernce in view of popup.
     * @method showSelected
     * @memberof Popups.SeatPreferancesPopup#
     */
    showSelected: function () {
        var child;
        switch (this.maxPlayers) {
            case 2:
                child = this.activeView.getChildByName("Seat_" + GameManager.user.seatPreferancesTwo);
                break;
            case 6:
                child = this.activeView.getChildByName("Seat_" + GameManager.user.seatPreferancesSix);
                break;
            case 9:
                child = this.activeView.getChildByName("Seat_" + GameManager.user.seatPreferances);
                break;
        }
        if (child !== undefined && child !== null) {
            child.getComponent(CheckBoxType).setSelection(true);
            child.getComponent(CheckBoxType).updateGroup(true);
        }
    },


    /**
     * @description Get Seat No. of clicked seat.
     * @method onButtonClick
     * @param {Object} data
     * @memberof Popups.SeatPreferancesPopup#
     */
    onButtonClick: function (data) {
        var j = data.currentTarget.parent;
        var c = j.name;
        c = c.slice(-1);
        this.selectedSeat = c;
    },

    /**
     * @description Confirm button callback.
     * @method onConfirm
     * @memberof Popups.SeatPreferancesPopup
     */
    onConfirm: function () {
        var data = {};
        data.query = {};
        data.query.playerId = GameManager.user.playerId;
        data.updateKeys = {};
        switch (this.maxPlayers) {
            case 2:
                data.updateKeys["settings.seatPrefrenceTwo"] = this.selectedSeat;
                break;
            case 6:
                data.updateKeys["settings.seatPrefrenceSix"] = this.selectedSeat;
                break;
            case 9:
                data.updateKeys["settings.seatPrefrence"] = this.selectedSeat;
                break;
        }
        var inst = this;
        ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (data) {
            if (data.success) {
                switch (inst.maxPlayers) {
                    case 2:
                        GameManager.user.seatPreferancesTwo = inst.selectedSeat;
                        break;
                    case 6:
                        GameManager.user.seatPreferancesSix = inst.selectedSeat;
                        break;
                    case 9:
                        GameManager.user.seatPreferances = inst.selectedSeat;
                        break;
                }
            } else {
            }
        }.bind(this));
        this.onCancel();
    },

    /**
     * @description Cancel button callback
     * @method onCancel
     * @memberof Popups.SeatPreferancesPopup
     */
    onCancel: function () {
        this.popUpManager.hide(PopUpType.SeatPreferenceDialog, function () {  });
    },
});
