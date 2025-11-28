var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var CheckBoxType = require('Checkbox');

/**
 * @classdesc
 * @class TableColorSelectionPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        popUpManager: {
            default: null,
            type: PopUpManager
        },
        tables: {
            default: [],
            type: cc.Node,
        },

        selection: {
            default: null,
            type: cc.Node,
        },

        selectedID: 0,
    },

    // use this for initialization
    onLoad: function () {

    },

    /**
     * @description Method called from popUpManager to set intial view of this popUp using some data
     * @method onShow
     * @param {Object} selected
     * @memberof Popups.TableColorSelectionPopup#
     */
    onShow: function (selected) {
        this.selectedID = GameManager.user.tableColor;
        this.selectTable();
    },

    /**
     * @description Select the table of color yellow and ID = 0
     * @method onTable1Selection
     * @memberof Popups.TableColorSelectionPopup
     */
    onTable1Selection: function () { //yellow
        this.selectedID = 0;
        this.selectTable();
    },

    /**
     * @description Select the table of color red and ID = 1
     * @method onTable2Selection
     * @memberof Popups.TableColorSelectionPopup#
     */
    onTable2Selection: function () {//red
        this.selectedID = 1;
        this.selectTable();
    },

    /**
     * @description Select the table of color green and ID = 2
     * @method onTable3Selection
     * @memberof Popups.TableColorSelectionPopup#
     */
    onTable3Selection: function () {//green
        this.selectedID = 2;
        this.selectTable();
    },

    /**
     * @description Select the table of color blue and ID = 3
     * @method onTable4Selection=
     * @memberof Popups.TableColorSelectionPopup#
     */
    onTable4Selection: function () {//blue
        this.selectedID = 3;
        this.selectTable();
    },

    /**
     * @description Used for selection of the table
     * @method selectTable
     * @memberof Popups.TableColorSelectionPopup#
     */
    selectTable: function () {
        this.selection.position = this.tables[this.selectedID].position;

    },

    /**
     * @description When enter button clicked
     * @method onConfirm
     * @memberof Popups.TableColorSelectionPopup#
     */
    onConfirm: function () {
        var data = {};
        data.query = {};
        data.query.playerId = GameManager.user.playerId;
        data.updateKeys = {};
        data.updateKeys["settings.tableColor"] = this.selectedID;
        ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (response) {
            if (response.success) {
                GameManager.user.tableColor = this.selectedID;
                GameManager.emit(K.GameEvents.OnTableColorChange, this.tables[this.selectedID].getChildByName("TableImg").getComponent(cc.Sprite).spriteFrame);
            } else {
            }
        }.bind(this));
        this.onCancel();
    },

    /**
     * @description Cancel button callback
     * @method onCancel
     * @memberof Popups.TableColorSelectionPopup#
     */
    onCancel: function () {
        this.popUpManager.hide(PopUpType.TableColorPreferenceDialog, function () {  });
    },

});
