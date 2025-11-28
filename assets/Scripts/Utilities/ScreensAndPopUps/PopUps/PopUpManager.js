var PopUpBase = require('PopUpBase');
/**
 * @description Types of popup and dialog boxes
 * @enum {Number}
 * @memberof Utilities.ScreenAndPopUps.PopUpManager#
 */
var PopUpType = new cc.Enum({

    DisconnectDialog: 0,
    TableColorPreferenceDialog: 1,
    SeatPreferenceDialog: 2,
    AvatarDialog: 3,
    BuyInPopup: 4,
    LobbySettingsPopup: 5,
    CashierPopup: 6,
    PlayerAccountPopup: 7,
    InsufficientPopup: 8,
    TournamentLobbyInfoPopup: 9,
    GamePreferencesPopup: 10,
    MaxTablesJoinedPopup: 11,
    SitNGoResultPopup: 12,
    QuickSeatPopUp: 13,
    ResultPopup: 14,
    BlindChangedPopup: 15,
    PlayerInfoPopup: 16,
    ConfirmDialogQuickSeatSitNGo: 17,
    HandHistoryPopup: 18,
    VideoPlayerPopup: 19,
    InstructionPopup: 20,
    MultiLoginPopup: 21,
    JoinGamePopup: 22,
    NotificationPopup: 23,
    MaintenancePopup: 24,
    UpdatePopup: 25,
    InGamePreferencesPopup: 26,
    OnLogOutPopup: 27,
    CashoutPopup: 28,
    ForgotPasswordPopUp: 29,
    EnterPasswordPopup: 30,
    GameInfoPopup: 31,
    HandHistoryDetailPopup: 32,
    GameVariation: 33,
    InviteToPlayPopup: 34,
    ProfilePopup: 35,    
    RegDialog: 36,
    CommonDialog: 37,
    FreeBuyin: 38,
    UpdateCategory: 39,
    RemoveDataDialog: 40,
    NewVersionPopup: 41,
    AdminNoticePopup: 42,
    None: 100
});

/**
 * @author Modified: #1 Dharmaraj P - Animation callBack bug fix
 * @classdesc Manages all the popUps functionality - show/hide PopUp
 * @class PopUpManager
 * @memberof Utilities.ScreenAndPopUps
 */
var PopUpManager = cc.Class({
    extends: cc.Component,

    properties: {
        popUps: {
            default: [],
            type: PopUpBase,
        },
        currentPopUp: {
            default: PopUpType.None,
            type: PopUpType
        },
        currentOverLayedPopUps: {
            default: [],
            type: PopUpType,
        },
        enterListener: {
            default: null,
            visible: false,
        },

        PopupType : {
            visible: false,
            get() {
                return PopUpType;
            },
        },
    },

    onLoad: function () {
        window.PopupManager = this;
        // this.registerEnterKey();
        //   this.currentOverLayedPopUps.push(PopUpType.None);
    },

    onEnable: function () {
        this.registerEnterKey();
    },

    onDisable: function () {
        this.unregisterEnterKey();
    },

    /**
     * @description Show Pop up
     * @method show
     * @param {Number} popUp -popUp index
     * @param {Object} data -data to be sent
     * @memberof Utilities.ScreenAndPopUps.PopUpManager#
     */
    show: function (popUp, data, callback) {
        // this.scheduleOnce(function() {
        var self = null;
        var isOpen = (this.currentOverLayedPopUps.indexOf(popUp) === -1) ? false : true;
        if (popUp !== null && popUp !== PopUpType.None && !isOpen) {
            this.currentOverLayedPopUps.push(popUp);

            // this.popUps[popUp].node.active = true;

            self = this.popUps[popUp];
            self.node.active = true;

            var anim = this.popUps[popUp].getComponent('AnimBase');
            var inst = this;
            if (anim !== null) {
                anim.node.opacity = 0;
                anim.play("showPopUp", function () {
                    inst.popUps[popUp].onShow(data);

                    if (callback)
                        callback();
                });
            } else {
                this.popUps[popUp].onShow(data);

                if (callback)
                    callback();
            }
            this.currentPopUp = popUp;

            GameManager.emit("hideJoinSimlar");
        }
        // }, 0.1);
        return self;
    },

    /**
     * @description Hides PopUp
     * @method hide
     * @param {Number} popUp -popUp index
     * @param {callBack} callBack
     * @memberof Utilities.ScreenAndPopUps.PopUpManager#
     */
    hide: function (popUp, callBack) {
        // this.scheduleOnce(function () {
        //var instance = this;
        var isOpen = (this.currentOverLayedPopUps.indexOf(popUp) == -1) ? false : true;
        if (popUp !== null && popUp !== PopUpType.None && isOpen) {
            this.currentOverLayedPopUps.splice(this.currentOverLayedPopUps.indexOf(popUp), 1);
            // var anim = this.popUps[popUp].getComponent('AnimBase');
            // var inst = this;
            // if (anim !== null) {
            //     anim.play("hidePopUp", function () {
            //         inst.popUps[popUp].onHide();
            //         if (callBack)
            //             callBack();
            //     });
            // } else {
                this.popUps[popUp].onHide();
                if (callBack)
                    callBack();
                this.popUps[popUp].node.active = false;
            // }
            //   this.popUps[popUp].node.active = false;
            this.currentPopUp = this.currentOverLayedPopUps[this.currentOverLayedPopUps.length - 1] || null;

        }

        GameManager.emit("showJoinSimlar");
        // }.bind(this), 0.2);

    },

    /**
     * @description Hide current PopUp
     * @method hideCurrentPopUp
     * @memberof Utilities.ScreenAndPopUps.PopUpManager#
     */
    hideCurrentPopUp: function () {
        this.hide(this.currentPopUp);
    },

    /**
     * @description Hide all Popups
     * @method hideAllPopUps
     * @memberof Utilities.ScreenAndPopUps.PopUpManager#
     */
    hideAllPopUps: function () {
        if (this.currentOverLayedPopUps.length !== 0) {
            // console.error("hidden popup");
            this.hide(this.currentOverLayedPopUps[this.currentOverLayedPopUps.length - 1], this.hideAllPopUps.bind(this));
        }
    },

    checkIfPopupActive: function () {
        return (this.currentPopUp || this.currentOverLayedPopUps.length > 0) ? true : false;
    },

    checkIfPopupTypeActive: function (popup) {
        return (this.currentPopUp && this.currentPopUp === popup) ? true : false;
    },    

    /**
     * @description Calls ok/signIn button when enter is pressed in editbox
     * @method registerEnterKey
     * @memberof Utilities.ScreenAndPopUps.PopUpManager#
     */
    registerEnterKey: function () {
        return
        var enterKeyRef = this;

        this.enterListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed(key, event) {
                if (key == cc.KEY.enter && enterKeyRef.currentPopUp != null && enterKeyRef.popUps[enterKeyRef.currentPopUp]) {
                    enterKeyRef.popUps[enterKeyRef.currentPopUp].onClickEnter();
                    event.stopPropagation();
                }
            },
        });
        cc.eventManager.addListener(this.enterListener, this.node.zIndex + 1);
    },

    /**
     * @description Removes Listnere for enter key
     * @method unregisterEnterKey
     * @memberof Utilities.ScreenAndPopUps.PopUpManager#
     */
    unregisterEnterKey: function () {
        // cc.eventManager.removeListener(this.enterListener);
    },

});

module.exports = {
    PopUpManager: PopUpManager,
    PopUpType: PopUpType
}
