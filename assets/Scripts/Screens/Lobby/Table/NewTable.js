// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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

        contentHolder : {
            default : null,
            type: cc.Node
        },

        content : {
            default : null,
            type : cc.Node
        },

        darkColor: {
            default: new cc.Color(),
        },
        lightColor: {
            default: new cc.Color(),
        },

        selectedColor: {
            default : new cc.Color()
        },

        normalColor: {
            default : new cc.Color()
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('new table on laod', this.content);
        this.contentPool = [];
        this.compType = null;
        this.currentSelection = null;
    },


    init : function(data, compType = null) {
        console.log("content handler init", data, compType);
        this.compType = compType;
        this.createRows(data.length, 0.1, data);
    },


    createRows : function(length, delay, data) {
        for(let i = 0; i < length; i ++) {
            let current = data[i];
           this.createRow(this.compType, current);
        }

        // console.log("create rows complete", this.contentPool);
        this.populateRow(delay, 0, this.contentPool.length - 1);
    },


    createRow : function(compType, data) {
        let node = cc.instantiate(this.content);
        let comp = node.getComponent(compType);
        data.onSelection = this.onSelectTable.bind(this);
        data.getCurrentSelection = this.getCurrentSelection.bind(this);
        comp.init(data);
        // console.log(node, compType, comp);
        this.contentPool.push(comp);
        return node;
    },


    populateRow: function(delay, index, length) {
        // console.log(delay, index, length);
        if(index <= length) {
            let comp = this.contentPool[index];
            let color = (index % 2 == 0)? this.darkColor : this.lightColor;
            comp.changeBgColor(color);
            comp.node.parent =  this.contentHolder;
            comp.node.active = true;
            this.scheduleOnce(() => {
                this.populateRow(delay, ++index, length);
            }, delay);
        }
    },


    onSelectTable: function(selected) {
        if(selected === this.currentSelection) {
            return;
        }
        console.log('selection changed');
        // selected.changeBgColor(this.selectedColor);
        selected.changeSelection(this.selectedColor, cc.Color.WHITE);
        if(!!this.currentSelection) {
            this.currentSelection.changeSelection(this.normalColor, cc.Color.BLACK);
        }
        this.currentSelection = selected;
    },

    getCurrentSelection: function() {
        return this.currentSelection;
    }

});
