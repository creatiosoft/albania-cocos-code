cc.Class({
    extends: cc.Component,

    properties: {
        note_editBox: cc.EditBox,
        colorHolder: cc.Node //togglecontainer
    },


    onLoad() {
        this.colors = [
            new cc.Color(255, 255, 255),
            new cc.Color(206, 210, 2),
            new cc.Color(204, 123, 1),
            new cc.Color(200, 0, 0),
            new cc.Color(238, 1, 172),
            new cc.Color(13, 10, 255),
            new cc.Color(16, 240, 255),
        ];

    },

    start() {
        //blue -    61,255,255,
        //pink 153 0 255
        //yellow 255,235 0 
        //gren  4 255 187
        //red 255 68 10

    },
    init(flag, color, text, targetPlayerId, pokerPresenter) {
        console.log(color, text, flag)
        if (!this.colors) {
            this.colors = [
                new cc.Color(255, 255, 255),
                new cc.Color(206, 210, 2),
                new cc.Color(204, 123, 1),
                new cc.Color(200, 0, 0),
                new cc.Color(238, 1, 172),
                new cc.Color(13, 10, 255),
                new cc.Color(16, 240, 255),
            ];

        }
        this.node.active = true;
        if (flag) {
            this.note_editBox.string = text;

            let col_ind = this.findColIndex(color);
            if (col_ind < 0) {
                col_ind = 0;
            }
            this.colorHolder.getComponent(cc.ToggleContainer).toggleItems[col_ind].isChecked = true;
            this.setColor(this.colors[col_ind]);

        } else {
            this.note_editBox.string = "";
            this.colorHolder.getComponent(cc.ToggleContainer).toggleItems[0].isChecked = true;
            this.setColor(this.colors[0]);

        }
        //manage color 
        this.targetPlayerId = targetPlayerId;
        this.pokerPresenter = pokerPresenter;
    },

    findColIndex(color) {
        let toReturn = -1;
        this.colors.forEach((col, i) => {
            if (col.r == color.r && col.g == color.g && col.b == color.b) {
                toReturn = i;
            }
        })
        return toReturn;
    },

    onRemoveColor() {},

    onColorSelected(data, custom, c) {
        this.setColor(this.colors[data.node.name]);
        // 
        this.onSave();
    },

    setColor(color) {
        this.selectedColor = {};
        this.selectedColor.r = color.r;
        this.selectedColor.g = color.g;
        this.selectedColor.b = color.b;
    },

    onEscape() {
        // this.node.active = false;
    },

    onSave() {

        var tempData = this.note_editBox.string.trim();
        // if (!tempData) {
        //     return
        // }
        if (this.targetPlayerId != "") {
            var inst = this;
            let data = {
                playerId: GameManager.user.playerId,
                forPlayerId: this.targetPlayerId,
                notes: tempData,
                color: this.selectedColor //todo
            }
            ServerCom.pomeloRequest(K.PomeloAPI.createNote, data, function (response) {
                if (response.success) {
                    if (!inst.pokerPresenter || !inst.pokerPresenter.model)
                        return;
                    inst.pokerPresenter.model.updateNotes(inst.targetPlayerId, inst.selectedColor, data.notes);
                    inst.onEscape();
                } else {
                    if (response.info.localeCompare("notes for this player already exist") == 0) {
                        inst.updateNotes(inst.targetPlayerId, tempData);
                    }
                }
            }, null, 5000, false, false);

        }


    },

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
        data.updateKeys.color = this.selectedColor; //"1";//todo
        var inst = this;
        ServerCom.pomeloRequest(K.PomeloAPI.updateNote, data, function (response) {
            if (response.success) {
                if (!this.pokerPresenter || !this.pokerPresenter.model)
                    return;
                this.pokerPresenter.model.updateNotes(id, this.selectedColor, note);
                this.onEscape();
            } else {}
        }.bind(this), null, 5000, false, false);
    },

    onDelete() {
        //if exists note

        if (this.targetPlayerId != "") {
            var profileData = {
                query: {
                    playerId: "hsdfhd",
                    forPlayerId: "sdfsdf"
                },
            };
            var data = profileData;
            data.query.playerId = GameManager.user.playerId;
            data.query.forPlayerId = this.targetPlayerId;
            var inst = this;
            ServerCom.pomeloRequest(K.PomeloAPI.deleteNote, data, function (response) {
                if (response.success) {
                    if (!this.pokerPresenter || !this.pokerPresenter.model)
                        return;
                    this.pokerPresenter.model.updateNotes(inst.targetPlayerId, null, null);
                    this.note_editBox.string = "";
                }
            }.bind(this), null, 5000, false, false);
        }
    },
    onCancel() {
        this.onEscape();
    },
});