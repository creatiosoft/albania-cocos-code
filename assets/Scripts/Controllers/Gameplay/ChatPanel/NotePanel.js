var DropDownType = require('DropDown');
// var pokerGame = null;
var ChatPanel = require('ChatPanel');
var CreateNote = require('PostTypes').CreateNote;
var GetNote = require('PostTypes').GetNote;
var playersChanged = null;

/**
 * @classdesc
 * @class NotePanel
 * @memberof Controllers.Gameplay.ChatPanel
 */
cc.Class({
    extends: cc.Component,

    properties: {
        playersDropdown: {
            default: null,
            type: DropDownType,
        },
        colorDropDown: {
            default: null,
            type: DropDownType,
        },
        editBox: {
            default: null,
            type: cc.EditBox,
        },
        gameData: {
            default: null,
        },
        playersName: {
            default: [],
        },
        selectedPlayerName: "",
        selectedPlayerID: "",
        selectedColor: {
            default: cc.Color.White,
        },
        noteGridParent: {
            default: null,
            type: cc.Node,
        },
        notePrefab: {
            default: null,
            type: cc.Prefab,
        },
        notes: [],
        namesInNotes: [],
        tempName: "",
        colors: {
            default: [],
            type: [cc.Color],
        },
        gridRefreshedRef: null,
        pokerModel: {
            default: null,
            type: cc.Node,
        },
        pokerGame: null,
        // createdAt: [],
        deleteBtn: {
            default: null,
            type: cc.Node,
        }
    },

    gridRefreshed: function () {
        // this.onEnable();
    },

    /**
     * @description Initialise dropdown with name of available players.
     * @method onLoad
     * @memberof Controllers.Gameplay.ChatPanel.NotePanel#
     */
    onLoad: function () {
        // this.editBox.string.trim();
        this.pokerGame = this.pokerModel.getComponent('PokerModel');
        this.gameData = this.pokerGame.gameData;
        this.gridRefreshedRef = this.gridRefreshed.bind(this);
        playersChanged = this.onPlayersChanged.bind(this);
        GameScreen.node.on("grid-refreshed", this.gridRefreshedRef);
        this.registerBroadcast();
        this.initPlayersDropdown();
        this.initColor();
    },

    /**
     * @description Call AsyncTask recursively
     * @method getNote
     * @memberof Controllers.Gameplay.ChatPanel.NotePanel
     */
    getNote: function () {
        if (!this.selectedPlayerID)
            return;
        var data = new GetNote(GameManager.user.playerId, this.selectedPlayerID);
        this.editBox.string = "";
        ServerCom.pomeloRequest(K.PomeloAPI.getNote, data, function (response) {
            if (response.success) {
                if (!this.editBox)
                    return;
                this.editBox.string = response.result.notes;
                this.colorDropDown.setColor(response.result.color, true);
            } else {}
        }.bind(this), null, 5000, false, false);
    },

    /**
     * @description Update Notes Api called after create notes if notes for a particular player already exists.
     * @method updateNotes
     * @param {Number} id
     * @param {string} note
     * @memberof Controllers.Gameplay.ChatPanel.NotePanel#
     */
    updateNotes: function (id, note) {
        var profileData = {
            query: {
                playerId: "hsdfhd",
                forPlayerId: "sdfsdf"
            },
            updateKeys: {
                notes: "",
                color: "1",
            }
        };
        var data = profileData;
        data.query.playerId = GameManager.user.playerId;
        data.query.forPlayerId = id;
        data.updateKeys.notes = note;
        data.updateKeys.color = this.selectedColor; //"1";
        var inst = this;
        ServerCom.pomeloRequest(K.PomeloAPI.updateNote, data, function (response) {
            if (response.success) {
                if (!this.pokerGame)
                    return;
                this.pokerGame.updateNotes(inst.selectedPlayerID, this.selectedColor, note);
            } else {}
        }.bind(this), null, 5000, false, false);
    },

    /**
     * @description Intialise Player's Name in DropDown
     * @method initPlayersDropdown
     * @memberof Controllers.Gameplay.ChatPanel.NotePanel
     */
    initPlayersDropdown: function () {
        this.playersName = [];
        this.gameData.tableDetails.players.forEach(function (element) {
            if (!(element.playerName === GameManager.user.userName)) {
                this.playersName.push(element.playerName);
            }
        }, this);
        this.playersDropdown.prevSelection = null;
        this.playersDropdown.showDefault();
        this.playersDropdown.registerCallback(this.updatePlayerID.bind(this));
        this.playersDropdown.setContent(this.playersName);
        // this.scheduleOnce(
        //     function() {
        this.playersDropdown.prevSelection = null;
        this.colorDropDown.prevSelection = null;
        this.colorDropDown.showDefault();
        // this.getNote();
        // }, 0.1
        // );
    },

    /**
     * @description 
     * @method initColor
     * @memberof Controllers.Gameplay.ChatPanel.NotePanel#
     */
    initColor: function () {
        this.colorDropDown.setContent(this.colors);
        this.colorDropDown.registerCallback(this.updatePlayerColor.bind(this));
        this.colorDropDown.showDefault();
    },

    /**
     * @description 
     * @method updatePlayerColor
     * @param {Object} color
     * @memberof Controllers.Gameplay.ChatPanel.NotePanel#
     */
    updatePlayerColor: function (color) {
        // this.selectedColor = color;
        this.selectedColor = {};
        this.selectedColor.r = color.r;
        this.selectedColor.g = color.g;
        this.selectedColor.b = color.b;
    },

    /**
     * @description Call create note update notes if notes if notes already exists for a player.
     * @method onSubmit
     * @memberof Controllers.Gameplay.ChatPanel.NotePanel#
     */
    onSubmit: function () {
        this.deleteBtn.active = true;
        // if (this.editBox.string == "") {
        //     this.getNote();
        //     return;
        // }
        var tempData = this.editBox.string.trim();
        // this.editBox.string = this.editBox.string.trim();
        if (this.selectedPlayerID != "") {
            var inst = this;
            var data = new CreateNote(GameManager.user.playerId, this.selectedPlayerID, tempData, inst.selectedColor);
            ServerCom.pomeloRequest(K.PomeloAPI.createNote, data, function (response) {
                if (response.success) {
                    if (!inst.pokerGame)
                        return;
                    inst.pokerGame.updateNotes(inst.selectedPlayerID, inst.selectedColor, data.notes);
                } else {
                    if (response.info.localeCompare("notes for this player already exist") == 0) {
                        inst.updateNotes(inst.selectedPlayerID, tempData);
                    }
                }
            }, null, 5000, false, false);

        }

        // this.editBox.string = "";
        // this.editBox.string = this.editBox.string.trim();
    },

    /**
     * @description Update Id of selected Player In DropDown
     * @method updatePlayerID
     * @param {String} name
     * @memberof Controllers.Gameplay.ChatPanel.NotePanel#
     */
    updatePlayerID: function (name) {
        var emptyDD = true;
        this.gameData.tableDetails.players.forEach(function (element) {
            if (element.playerName == name) {
                this.selectedPlayerID = element.playerId;
                emptyDD = false;
                this.getNote();
            }
        }, this);
        if (emptyDD)
            this.selectedPlayerID = "";
        this.selectedPlayerName = name;
    },


    /**
     * @description 
     * @method registerBroadcast
     * @memberof Controllers.Gameplay.ChatPanel.NotePanel#
     */
    registerBroadcast: function () {
        if (!this.pokerGame)
            return;
        this.pokerGame.off(K.PokerEvents.OnSit, playersChanged);
        this.pokerGame.on(K.PokerEvents.OnSit, playersChanged);
        this.pokerGame.off(K.PokerEvents.OnLeave, playersChanged);
        this.pokerGame.on(K.PokerEvents.OnLeave, playersChanged);
    },

    /**
     * @description 
     * @method onPlayersChanged
     * @memberof Controllers.Gameplay.ChatPanel.NotePanel#
     */
    onPlayersChanged: function () {
        this.initPlayersDropdown();
    },

    /**
     * @description Used to delete notes set on other players
     * @method deleteNotes
     * @memberof Controllers.Gameplay.ChatPanel.NotePanel#
     */
    deleteNotes: function (id, note) {
        if (this.selectedPlayerID != "") {
            var profileData = {
                query: {
                    playerId: "hsdfhd",
                    forPlayerId: "sdfsdf"
                },
            };
            var data = profileData;
            data.query.playerId = GameManager.user.playerId;
            data.query.forPlayerId = this.selectedPlayerID;
            var inst = this;
            ServerCom.pomeloRequest(K.PomeloAPI.deleteNote, data, function (response) {
                if (response.success) {
                    if (!this.pokerGame)
                        return;
                    this.pokerGame.updateNotes(inst.selectedPlayerID, null, null);
                    this.editBox.string = "";
                }
            }.bind(this), null, 5000, false, false);
        }
    },

    editingStarted: function () {
        this.deleteBtn.active = false;
    },
});