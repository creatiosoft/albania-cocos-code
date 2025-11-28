// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var root = window.K.ServerAddress;

var InputType = cc.Enum({
    gameHost : 0,
    gamePort : 1,
    maintenanceHost : 2,
    maintenancePort : 3,
    dashboardHost : 4,
    dashboardPort : 5,
    None : 100,
});

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        errorMessage : {
            default : null,
            type: cc.Label
        },


        editBoxes : {
            default : [],
            type : cc.EditBox
        },

        toggleGroup: {
            default : null,
            type: cc.ToggleGroup
        },

        noneToggle : {
            default : null,
            type: cc.Toggle
        },

        nextScreen: {
            default : null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    //     this.toggleIP = 0;
    // },

    start () {
        this.noneToggle.isChecked = true;
    },


    onClickUpdate : function() {
        // GameManager.init();
        this.node.active = false;
        this.nextScreen.active = true;
        // ScreenManager.showScreen(K.ScreenEnum.LoginScreen, true, function() {
            
        // });
    },

    onTogglevalueChanged : function (target, custom) {
        console.log('on Toggle value changed', custom);
        if(custom == InputType.None) {
            console.log("no change required");
            this.setEBValue();
        }else{
            this.setIPWithToggle(custom);
        }
    },

    setIP: function () {
        root.gameServer = this.editBoxes[InputType.gameHost].string;
        root.gamePort = this.editBoxes[InputType.gamePort].string;
        
        root.maintainanceIP = "http://" + this.editBoxes[InputType.maintenanceHost].string;
        root.maintainancePort = this.editBoxes[InputType.maintenancePort].string;

        root.ipAddress = "http://" + this.editBoxes[InputType.dashboardHost].string;
        root.port = this.editBoxes[InputType.dashboardPort].string;
    },


    setIPWithToggle: function (value) {
        root.gameServer = "192.168.2." + value;
        
        root.maintainanceIP = "http://192.168.2." + value;

        root.ipAddress = "http://192.168.2." + value;

        console.log(root.gameServer, root.maintainanceIP, root.ipAddress);
        this.setEBValue();
    },


    setEBValue : function() {
        this.editBoxes[InputType.gameHost].string = root.gameServer;
        this.editBoxes[InputType.gamePort].string = root.gamePort;
        
        this.editBoxes[InputType.maintenanceHost].string = root.maintainanceIP;
        this.editBoxes[InputType.maintenancePort].string = root.maintainancePort;

        this.editBoxes[InputType.dashboardHost].string = root.ipAddress;
        this.editBoxes[InputType.dashboardPort].string = root.port;
    },

    // update (dt) {},
});
