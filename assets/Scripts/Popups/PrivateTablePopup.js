var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var SliderTouchType = require('SliderTouch');

/**
 * @classdesc
 * @class JoinGamePopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {
        popUpManager: {
            default: null,
            type: PopUpManager
        },
        sliderTouch: {
            default: null,
            type: SliderTouchType,
        },
        s: {
            default: null,
            type: cc.Label,
        },
        b: {
            default: null,
            type: cc.Label,
        },
        errorLbl: {
            default: null,
            type: cc.Label,
        },
        tableName: {
            default: null,
            type: cc.EditBox,
        },
        smallBlind: {
            default: null,
            type: cc.EditBox,
        },
        bigBlind: {
            default: null,
            type: cc.EditBox,
        },
        minBuyIn: {
            default: null,
            type: cc.EditBox,
        },
        maxBuyIn: {
            default: null,
            type: cc.EditBox,
        },
        maxPlayers: {
            default: null,
            type: cc.EditBox,
        },
        password: {
            default: null,
            type: cc.EditBox,
        },
        isPotLimit: {
            default: null,
            type: cc.Toggle,
        },
        holdem: {
            default: null,
            type: cc.Toggle,
        },
        omaha: {
            default: null,
            type: cc.Toggle,
        },
        omaha5: {
            default: null,
            type: cc.Toggle,
        },
        omaha6: {
            default: null,
            type: cc.Toggle,
        },
        p2: {
            default: null,
            type: cc.Toggle,
        },
        p3: {
            default: null,
            type: cc.Toggle,
        },
        p4: {
            default: null,
            type: cc.Toggle,
        },
        p5: {
            default: null,
            type: cc.Toggle,
        },
        p6: {
            default: null,
            type: cc.Toggle,
        },
        minAmount: {
            default: 0.5,
            visible: false,
        },

        maxAmount: {
            default: 500,
            visible: false,
        },
        callback: null,
    },

    onLoad: function () {
        this.sliderTouch.registerCallback(this.onSliderValueChange.bind(this));
    },

    onSliderValueChange: function (value) {
        this.minAmount = 1;
        this.maxAmount = 500;
        value = Number(value).toFixed(1);
        value = value < 0 ? 0 : value;
        value = value > 1 ? 1 : value;
        var amount = value * (this.maxAmount - this.minAmount + 1) + this.minAmount;
        amount = amount > this.maxAmount ? this.maxAmount : amount;
        
        if (value == 0) {
            amount = 0.5;
        }
        else if (value == 1) {
            amount = 500;
        }
        else {
            amount -= 1;
        }

        this.s.string = amount;
        this.b.string = amount * 2;

        this.minBuyIn.string = amount * 10;
        this.maxBuyIn.string = amount * 10 * 2;
    },

    onShow: function (data) {
        this.minAmount = 1;
        this.maxAmount = 500;
        this.onSliderValueChange(0);
    },

    onEditEndSmallBlind: function () {
        let num = Number(this.smallBlind.string);
        if (num < 1) {
            num = 1;

            this.smallBlind.blur();
            this.blured = true;
            this.smallBlind.string = num;
            this.smallBlind.focus();
        }
        if (num >= 100000) {
            num = 99999;
        }
        this.bigBlind.string = (num * 2) + '';
    },

    onEditEndMinBuyIn: function () {
        let num = Number(this.minBuyIn.string);
        if (num < Number(this.s.string) * 10) {
            num = this.s.string;

            this.minBuyIn.blur();
            this.blured = true;
            this.minBuyIn.string = num;
            this.minBuyIn.focus();
        }
        if (num >= 100000) {
            num = 99999;
        }
    },

    onClick: function () {
        GameManager.playSound(K.Sounds.click);

        this.errorLbl.string = "";

        // isOnlyAlphaNumeric = (string: string) => {
        //     return /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(string);
        // }
        var valid = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/);
        if (!valid.test(this.tableName.string)) {
            this.errorLbl.string = "Table name should be alpha numeric";
            return;
        }

        // if (this.password.string.length < 3) {
        //     this.errorLbl.string = "Invalid password";
        //     return;
        // }

        // if (Number(this.smallBlind.string) < 1) {
        //     this.errorLbl.string = "Invalid smallBlind";
        //     return;
        // }

        if (Number(this.minBuyIn.string) < Number(this.s.string)) {
            this.errorLbl.string = "minBuyIn should not be lower than the stake amount";
            return;
        }

        // if (Number(this.minBuyIn.string) < 100) {
        //     this.errorLbl.string = "Invalid minBuyIn";
        //     return;
        // }

        // if (Number(this.maxBuyIn.string) < 100) {
        //     this.errorLbl.string = "Invalid maxBuyIn";
        //     return;
        // }

        // if (Number(this.maxPlayers.string) < 2) {
        //     this.errorLbl.string = "Invalid maxPlayers";
        //     return;
        // }

        if (Number(this.minBuyIn.string) >= Number(this.maxBuyIn.string)) {
            this.errorLbl.string = "Invalid maxBuyIn";
            return;
        }

        let vari = '';
        if (this.holdem.isChecked) {
            vari = "Texas Hold’em";
        }
        else if (this.omaha5.isChecked) {
            vari = "Omaha 5";
        }
        else if (this.omaha6.isChecked) {
            vari = "Omaha 5";
        }
        else if (this.omaha.isChecked) {
            vari = "Omaha";
        }

        let maxPlayers = 2;
        if (this.p2.isChecked) {
            maxPlayers = 2;
        }
        else if (this.p3.isChecked) {
            maxPlayers = 3;
        }
        else if (this.p4.isChecked) {
            maxPlayers = 4;
        }
        else if (this.p5.isChecked) {
            maxPlayers = 5;
        }        
        else if (this.p6.isChecked) {
            maxPlayers = 6;
        }        

        ServerCom.pomeloRequest(
            "connector.entryHandler.createPrivateTable", 
            {
                tableName: this.tableName.string,
                gameVariation: vari,
                isPotLimit: (this.holdem.isChecked ? false : true),
                smallBlind: Number(this.s.string),
                bigBlind: Number(this.b.string),
                minBuyIn: Number(this.minBuyIn.string),
                maxBuyIn: Number(this.maxBuyIn.string),
                maxPlayers: maxPlayers,
                passwordForPrivate: "11111111",
                userName: GameManager.user.userName
            }, 
            function (response) {
                console.log("response", response);
                if (response.success) {

                    cc.sys.localStorage.setItem("PRIVATE_TABLE_" + this.tableName.string, response.passwordForPrivate);
                    GameManager.popUpManager.show(PopUpType.NotificationPopup, response.info, function () { });

                    GameManager.emit("refresh_private_table");
                }
                else {
                    GameManager.popUpManager.show(
                        PopUpType.CommonDialog, 
                        {
                            "title": "Error!",
                            "content" : response.info
                        }, 
                        function () {}
                    );
                }
                this.onClose();
            }.bind(this)
        );
    },

    onTextChanged: function(text, editbox, customEventData) {
        // 这里的 text 表示 修改完后的 EditBox 的文本内容
        // 这里 editbox 是一个 cc.EditBox 对象
        // 这里的 customEventData 参数就等于你之前设置的 "foobar"

        console.log("text", text, editbox.string);

        var validNumber = new RegExp(/^\d*\.?\d*$/);
        console.log(validNumber.test(text));

        if (validNumber.test(text)) {
            this.last = text;

            editbox.blur();
            this.blured = true;
            this.smallBlind.string = text;
            this.last = text;
            editbox.focus();
        }
        else {
            editbox.blur();
            this.blured = true;
            this.smallBlind.string = this.last;
            editbox.focus();
        }
    },

    onTextBegan: function(text, editbox, customEventData) {
        this.blured = false;
        this.last = this.smallBlind.string;
    },

    onClose: function () {
        this.tableName.string = "";
        this.smallBlind.string = "";
        this.bigBlind.string = "";
        this.minBuyIn.string = "";
        this.maxBuyIn.string = "";
        this.maxPlayers.string = "";
        this.password.string = "";
        this.isPotLimit.string = "";
        this.holdem.isChecked = true;
        this.omaha.isChecked = false;
        this.minAmount = 1;
        this.maxAmount = 500;
        this.sliderTouch.setSliderValue(0, false);
        this.onSliderValueChange(0);

        // this.popUpManager.hide(PopUpType.PrivateTablePopup, function () {});

        this.node.active = false;
    }

});