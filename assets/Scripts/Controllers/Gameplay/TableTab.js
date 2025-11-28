var emitter = require('EventEmitter');
/**
 * @class TableTab
 * @classdesc Manages the TableTab during Tiled mode!
 * @memberof Controllers.Gameplay
 */
cc.Class({
    extends: emitter,
    properties: {
        tabId: -1,
        tabNode: {
            default: null,
            type: cc.Node,
        },
        tabActiveNode: {
            default: null,
            type: cc.Node,
        },
        addButton: {
            default: null,
            type: cc.Node,
        },
        activeView: {
            default: null,
            type: cc.Node,
        },
        deactiveView: {
            default: null,
            type: cc.Node,
        },
        activeTableNameLbl: {
            default: null,
            type: cc.Label,
        },
        deactiveTableNameLbl: {
            default: null,
            type: cc.Label,
        },
        turnAlert: {
            default: null,
            type: cc.Node,
        },
        cardPrefab: {
            default: null,
            type: cc.Prefab,
        },
        cardPPrefab: {
            default: null,
            type: cc.Prefab,
        },
        cardParent: {
            default: null,
            type: cc.Node,
        },
        tableColors: {
            default: [],
            type: [cc.SpriteFrame]
        },
        selectedTableColors: {
            default: [],
            type: [cc.SpriteFrame]
        },
        model: null,
        cards: null,
    },

    /**
     * @description  Register callback!
     * @method onLoad
     * @memberof Controllers.Gameplay.TableTab#
     */
    onLoad: function () {
        this.tableColorChange = this.setTableColor.bind(this);
        this.playerCardsChange = this.showCards.bind(this);
        this.gameOverChange = this.removeCards.bind(this);
    },

    /**
     * @description Fire event when any Tab is selected!
     * @method onClick
     * @memberof Controllers.Gameplay.TableTab#
     */
    onClick: function () {
        GameManager.playSound(K.Sounds.click);
        //console.log("Clicked " + this.tabId);
        this.emit(K.PokerEvents.onTableTabSelected, this.tabId);
    },

    /**
     * @description Highlight the tab, which is currently being selected;
     * @method onClick
     * @param {Object} data - Object holding the data of table that is to be displayed
     * @memberof Controllers.Gameplay.TableTab#
     */
    setActiveView: function (data, bigBlind, smallBlind) {
        // console.log("TABLE TAB DATA ", data);
        this.scheduleOnce(function () {
            // this.activeTableNameLbl.string = data + ", \n" + smallBlind + "/" + bigBlind;
            this.activeView.active = true;
            this.deactiveView.active = false;
            // console.log("Activating " + data + " " + this.tabId);
        }, 0.1);

    },

    /**
     * @description setDeactive view! switches view
     * @method setDeactiveView
     * @param {Object} data
     * @memberof Controllers.Gameplay.TableTab#
     */
    setDeactiveView: function (data, bigBlind, smallBlind) {
        // console.log("TABLE TAB DATA ", data);
        this.scheduleOnce(function () {
            // this.deactiveTableNameLbl.string = data + ", \n" + smallBlind + "/" + bigBlind;
            this.activeView.active = false;
            this.deactiveView.active = true;
            //console.log("Deactivating " + data + " " + this.tabId);
        }, 0.1);

    },

    /**
     * @description set Model according to current Tab.
     * @method setModel
     * @param {Object} model - Holds the model that is to be displayed. active or deactive model 
     * @memberof Controllers.Gameplay.TableTab#
     */
    setModel: function (model) {
        this.model = model;
        if (GameScreen.isMobile) {
            this.model.off("FoldEvent", this.gameOverChange);
            this.model.on("FoldEvent", this.gameOverChange);
            this.model.off(K.GameEvents.OnTableColorChange, this.tableColorChange);
            this.model.on(K.GameEvents.OnTableColorChange, this.tableColorChange);
            this.model.off(K.PokerEvents.OnPlayerCard, this.playerCardsChange); // Comment this line in par with changes in CardDistribution to implement TableTab display with forcePlayer cards
            this.model.on(K.PokerEvents.OnPlayerCard, this.playerCardsChange); // Comment this line in par with changes in CardDistribution to implement TableTab display with forcePlayer cards
            this.model.off(K.PokerEvents.OnGameOver, this.gameOverChange);
            this.model.on(K.PokerEvents.OnGameOver, this.gameOverChange);
            this.showCards();
            this.setTableColor();
        }
    },

    /**
     * @description  display card in Table Tab!
     * @method showCards
     * @param {Object} cards 
     * @memberof Controllers.Gameplay.TableTab#
     */
    showCards: function (cards) {
        this.node.getChildByName("vari").string = "";
        if (this.model.myCards) {
            GameManager.removeAllChildren(this.cardParent);

            let cardArray = this.model.myCards;
            // if (cardArray.length == 2 || cardArray.length == 0) {
            //     cardArray.reverse();
            //     // This is HoldEm adjust for 2 cards, or make it default
            //     this.activeView.getChildByName("Base").width = 191;
            //     this.deactiveView.getChildByName("Base").width = 191;
            //     this.deactiveView.parent.getChildByName("TurnAlert").x = -80;
            //     // -80

            // } else {
            //     // This must be OMAHA HI-LO or OMAHA, adjust accordingly
            //     this.activeView.getChildByName("Base").width = 162 * 2;
            //     this.deactiveView.getChildByName("Base").width = 162 * 2;
            //     this.deactiveView.parent.getChildByName("TurnAlert").x = -144;
            //     // -156
            // }
            for (var k = 0; k < cardArray.length; k++) {
                // for (var k = this.model.myCards.length - 1; k >= 0; k--) {
                var card = this.model.getCardByData(cardArray[k]);
                if (K.PORTRAIT && false) {
                    var cardInstance = cc.instantiate(this.cardPPrefab);
                    // cardInstance.getComponent('Card').setCardColor = function () {};
                    cardInstance.getComponent('Card').init((card), this.model);
                    cardInstance.getComponent('Card').reveal(true);
                    // cardInstance.scale = new cc.Vec2(1.7, 1.7);
                    this.cardParent.addChild(cardInstance);

                    if (k == 0) {
                        cardInstance.rotation = -10;
                    }
                    else if (k == 1) {
                        cardInstance.rotation = 10;
                    }
                }
                else {
                    var cardInstance = cc.instantiate(this.cardPrefab);
                    // cardInstance.getComponent('Card').setCardColor = function () {};
                    cardInstance.getComponent('Card').init((card), this.model);
                    cardInstance.getComponent('Card').reveal(true);
                    // cardInstance.scale = new cc.Vec2(1.7, 1.7);
                    this.cardParent.addChild(cardInstance);
                }
            }

            if (cardArray.length == 0) {
                if (this.model && this.model.gameData) {
                    this.node.getChildByName("vari").getComponent(cc.Label).string = this.model.gameData.raw.roomConfig.channelVariation;
                }
                else {
                    this.node.getChildByName("vari").getComponent(cc.Label).string = "";
                }
            }
            else {
                this.node.getChildByName("vari").getComponent(cc.Label).string = "";
            }
        }
        else {
            if (this.model && this.model.gameData) {
                this.node.getChildByName("vari").getComponent(cc.Label).string = this.model.gameData.raw.roomConfig.channelVariation;
            }
            else {
                this.node.getChildByName("vari").getComponent(cc.Label).string = "";
            }
        }
    },

    /**
     * @description  Remove cards from grid!
     * @method removeCards
     * @memberof Controllers.Gameplay.TableTab#
     */
    removeCards: function (data) {
        GameManager.removeAllChildren(this.cardParent);

        if (this.model && this.model.gameData) {
            this.node.getChildByName("vari").getComponent(cc.Label).string = this.model.gameData.raw.roomConfig.channelVariation;
        }
        else {
            this.node.getChildByName("vari").getComponent(cc.Label).string = "";
        }
    },

    playAudio: function (sound) {
        if (!this.model.gameData.settings.muteGameSound) {

            GameManager.playSound(sound);
        }
    },



    /**
     * @description show alert in specific Tab!
     * @method showAlert 
     * @param {boolean} val - boolean value to show alert!
     * @memberof Controllers.Gameplay.TableTab#
     */
    showAlert: function (val) {

        this.turnAlert.active = val;
        if (val)
            this.playAudio(K.Sounds.turnSoundTopBar);
        // console.log("alert sound working")
    },

    /**
     * @description set the table color of Table Tab in  
     * @method setTableColor 
     * @memberof Controllers.Gameplay.TableTab#
     */
    setTableColor: function () {
        if (!!this.model && !!this.model.gameData) {
            var col = this.model.gameData.settings.tableColor + "";
            if (col !== undefined || col !== null) {

                // this.activeView.children[0].getComponent(cc.Sprite).spriteFrame = this.selectedTableColors[col];
                // this.deactiveView.children[0].getComponent(cc.Sprite).spriteFrame = this.tableColors[col];
            }
        }
    },

    joinSimilarTable() {
        GameManager.joinSimilar();
    },
});