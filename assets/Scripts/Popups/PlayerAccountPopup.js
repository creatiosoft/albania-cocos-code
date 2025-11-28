var CheckboxType = require("Checkbox");
var PopUpBase = require('PopUpBase');
var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;

/**
 * @classdesc
 * @class PlayerAccountPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {
        popUpManager: {
            default: null,
            type: PopUpManager
        },
        availBalLbl: {
            default: null,
            type: cc.Label,
        },
        stars: {
            default: [],
            type: [cc.Node],
        },
        vipCoinsLbl: {
            default: null,
            type: cc.Label,
        },
        playerImg: {
            default: null,
            type: cc.Sprite,
        },
        playerNameLbl: {
            default: null,
            type: cc.Label,
        },
        passwordLbl: {
            default: null,
            type: cc.Label,
        },
        currentPasswordLbl: {
            default: null,
            type: cc.Label,
        },
        newPasswordLbl: {
            default: null,
            type: cc.Label,
        },
        passwordStrength: {
            default: [],
            type: [cc.Node],
        },
        confirmPasswordLbl: {
            default: null,
            type: cc.Label,
        },
        showCharacter: {
            default: null,
            type: CheckboxType,
        },
        emailLbl: {
            default: null,
            type: cc.Label,
        },
        phoneLbl: {
            default: null,
            type: cc.Label,
        },
        addressLbl: {
            default: null,
            type: cc.Label,
        },
        dobLbl: {
            default: null,
            type: cc.Label,
        },

        editBoxOpened: {
            default: false,
        },

        gameHistroyGrid: {
            default: null,
            type: cc.Node,
        },

        editBoxOpenedType: {
            default: -1,
        },
    },

    onLoad: function () {

    },

    /**
     * @description Method called from popUpManager to set initial view of this popUp using some data
     * @method onShow
     * @param {Object} data
     * @memberof Popups.PlayerAccountPopup#
     */
    
    onShow: function (data) {
        this.playerNameLbl.string = GameManager.user.firstName;
        this.playerImg.spriteFrame = GameManager.user.urlImg;
        if (data !== null) {
            this.availBalLbl.string = data.availBalance.toString();
            this.vipCoinsLbl.string = data.vipCoins.toString();
            this.playerNameLbl.string = data.playerName;
            this.passwordLbl.string = data.password;
            this.currentPasswordLbl.string = "";
            this.newPasswordLbl.string = "";
            this.confirmPasswordLbl.string = "";
            this.emailLbl.string = data.email;
            this.phone.string = data.phoneNumber;
            this.addressLbl.string = data.address;
            this.dobLbl.string = data.dob.toString();
            for (var i = 0; i < element.length; i++) {
                this.stars[i].active = i < data.stars;
            }
            GameManager.off("image-loaded", this.imageLoaded.bind(this));
            GameManager.on("image-loaded", this.imageLoaded.bind(this));
        }

    },

    /**
     * @description Called when image is Loaded
     * @method imageLoaded
     * @param {Object} user 
     * @memberof Popups.PlayerAccountPopup#
     */
    imageLoaded: function (user) {
        if (GameManager.user.playerId === user.playerId) {
            this.playerImg.spriteFrame = user.urlImg;
        }
    },

    /**
     * @description Called when name is edited
     * @method onEditName
     * @memberof Popups.PlayerAccountPopup#
     */
    onEditName: function () {
        this.editBoxOpenedType = 0;
    },

    /**
     * @description Called when password is edited
     * @method onEditPassword
     * @memberof Popups.PlayerAccountPopup#
     */
    onEditPassword: function () {
        this.editBoxOpenedType = 1;
    },

    /**
     * @description Called when e-mail is edited
     * @method onEditEmail
     * @memberof Popups.PlayerAccountPopup#
     */
    onEditEmail: function () {
        this.editBoxOpenedType = 2;
    },

    /**
     * @description Called when phone is edited
     * @method onEditPhone
     * @memberof Popups.PlayerAccountPopup#
     */
    onEditPhone: function () {
        this.editBoxOpenedType = 3;
    },

    /**
     * @description Called when address is edited
     * @method onEditAddress
     * @memberof Popups.PlayerAccountPopup#
     */
    onEditAddress: function () {
        this.editBoxOpenedType = 4;
    },

    /**
     * @description Called when Date of birth is edited
     * @method onEditDOB
     * @memberof Popups.PlayerAccountPopup#
     */
    onEditDOB: function () {
        this.editBoxOpenedType = 5;
    },

    /**
     * @description Closes all edit box and save edited setting
     * @method onApply
     * @memberof Popups.PlayerAccountPopup#
     */
    onApply: function () {
        this.editBoxOpenedType = -1;
        switch (this.editBoxOpenedType) {

        }
    },

    /**
     * @description Cancel button callback
     * @method onCancel
     * @memberof Popups.PlayerAccountPopup#
     */
    onCancel: function () {
        this.editBoxOpenedType = -1;
    },

    /**
     * @description Called when image is changed
     * @method onChangeImage
     * @memberof Popups.PlayerAccountPopup#
     */
    onChangeImage: function () {
        this.popUpManager.show(PopUpType.AvatarDialog, null, function () { });
        this.onClose();
    },

    onPlayerAccount: function () {

    },

    onGameHistory: function () {

    },

    /**
     * @description Cancel button callback
     * @method onClose
     * @memberof Popups.PlayerAccountPopup#
     */
    onClose: function () {
        this.popUpManager.hide(PopUpType.PlayerAccountPopup, function () {  });
    }

});
