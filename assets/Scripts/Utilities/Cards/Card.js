/**
 * @namespace Utilities.Cards
 */

/**
 * @classdesc Card Class Generate the cards.
 * @class Card
 * @extends EventEmitter
 * @memberof Utilities.Cards
 */
var EventEmitter = require('EventEmitter');
cc.Class({
    extends: EventEmitter,

    properties: {
        // nodes
        point: {
            default: null,
            type: cc.Label
        },

        bigSuit: {
            default: null,
            type: cc.Sprite
        },

        smallSuit: {
            default: null,
            type: cc.Sprite
        },

        backFace: {
            default: null,
            type: cc.Sprite
        },


        frontFace: {
            default: null,
            type: cc.Sprite
        },

        texFaces: {
            default: [],
            type: cc.SpriteFrame
        },

        texRedFaces: {
            default: [],
            type: cc.SpriteFrame
        },

        texBlueFaces: {
            default: [],
            type: cc.SpriteFrame
        },

        texGreenFaces: {
            default: [],
            type: cc.SpriteFrame
        },

        texSuitBig: {
            default: [],
            type: cc.SpriteFrame
        },

        texSuitSmall: {
            default: [],
            type: cc.SpriteFrame
        },

        suit: {
            default: null,
        },
        isFaceCard: {
            default: false,
        },
        cardColorChangeCb: {
            default: null,
        },

        cardRank: 0,

        redTextColor: cc.Color.WHITE,
        blackTextColor: cc.Color.WHITE,
        blueTextColor: cc.Color.WHITE,
        greenTextColor: cc.Color.WHITE,
        cardData: null,
        model: null,
        isCommunityCard: false,
    },

    onLoad: function () {
        this.setOriginalPosition();
    },

    /**
     * @description Actions to be taken after the node is destroyed
     * @method onDestroy
     * @memberof Utilities.Cards.Card#
     */
    onDestroy: function () {
        if (this.model)
            this.model.off(K.GameEvents.onCardColorChange, this.cardColorChangeCb);

        GameManager.off("updateCardBackImage", this.onUpdateCardBackImage.bind(this));
    },

    /**
     * @description Initialize card
     * @method init
     * @param {Object} card -Object having value of card
     * @param {Object} model -Game Model
     * @memberof Utilities.Cards.Card#
     */
    init: function (card, model, toBePlayerCards = false) {
        this.isCommunityCard = false;
        this.model = model;
        this.toBePlayerCards = toBePlayerCards && GameManager.isMobile;
        this.cardColorChangeCb = function(arg, model) {
            // console.error("MOdel", model == this.model, arg);
            if(this.model == model) {
                this.setCardColor(arg);
            }
        }.bind(this);//this.setCardColor.bind(this);
        this.model.off(K.GameEvents.onCardColorChange, this.cardColorChangeCb);
        this.model.on(K.PokerEvents.onCardColorChange, this.cardColorChangeCb);
        // this.model.off(K.GameEvents.onCardColorChange, this.setCardColor(data, model).bind(this));
        // this.model.on(K.PokerEvents.onCardColorChange, this.setCardColor(data, model).bind(this));
        this.onUpdateCardBackImage();
        if (!card) {
            return;
        }

        this.card = card;
        this.isFaceCard = card.point > 10;
        this.cardRank = card.point;
        this.suit = card.suit;

        this.isFaceCard = false;

        if (this.isFaceCard && !this.toBePlayerCards) {
            // if (this.isFaceCard && !this.toBePlayerCards) {//johnny
            if (this.suit === K.Suit.Heart || this.suit === K.Suit.Diamond)
                this.bigSuit.spriteFrame = this.texRedFaces[card.point - 10 - 1];
            else {
                this.bigSuit.spriteFrame = this.texFaces[card.point - 10 - 1];
            }

            if (K.PORTRAIT && 0) {
                this.bigSuit.node.scale = 0.5;
            }
            else {
                // this.bigSuit.node.width = 101.3;
                // this.bigSuit.node.height = 101.4;
                this.bigSuit.node.setPosition(0, -17.8);
                this.bigSuit.node.getComponent(cc.Widget).left = -0.0015;
                this.bigSuit.node.getComponent(cc.Widget).right = -0.0015;
                this.bigSuit.node.getComponent(cc.Widget).top = 0.2599;
                this.bigSuit.node.getComponent(cc.Widget).bottom = 0;
            }
        } else {
            this.bigSuit.spriteFrame = this.texSuitBig[card.suit - 1];
            // if (this.suit === K.Suit.Heart || this.suit === K.Suit.Diamond)
            //     this.bigSuit.spriteFrame = this.texRedFaces[card.point - 10 - 1];
            // else {
            //     this.bigSuit.spriteFrame = this.texFaces[card.point - 10 - 1];
            // }
            // this.bigSuit.node.width = 71.5;
            // this.bigSuit.node.height = 75.4;

            if (K.PORTRAIT && 0) {
                this.bigSuit.node.scale = 0.7;
            }
            else {
                this.bigSuit.node.setPosition(10.8, -23.5);
                this.bigSuit.node.getComponent(cc.Widget).left = 0.2530;
                this.bigSuit.node.getComponent(cc.Widget).right = 0.0391;
                this.bigSuit.node.getComponent(cc.Widget).top = 0.3962;
                this.bigSuit.node.getComponent(cc.Widget).bottom = 0.0531;
            }

        }
        this.point.string = card.pointName;
        this.smallSuit.spriteFrame = this.texSuitSmall[card.suit - 1];
        if (this.model.gameData.settings.cardColor) {
            this.setCardColor(K.CardColoring.FourCardColor);
        } else {
            this.setCardColor(K.CardColoring.TwoCardColor);
        }

        GameManager.off("updateCardBackImage", this.onUpdateCardBackImage.bind(this));
        GameManager.on("updateCardBackImage", this.onUpdateCardBackImage.bind(this));
        this.onUpdateCardBackImage();

        if (this.isCommunityCard) {
            this.smallSuit.node.active = false;
            this.bigSuit.node.y = -20;
        }
        else {
            this.smallSuit.node.active = true;
            this.bigSuit.node.y = -30;
        }
    },

    /**
     * @description Reveal Card
     * @method reveal
     * @param {boolean} isFaceUp 
     * @memberof Utilities.Cards.Card#
     */
    reveal: function (isFaceUp) {
        this.point.node.active = isFaceUp;
        this.bigSuit.node.active = isFaceUp;
        this.smallSuit.node.active = isFaceUp;
        this.frontFace.node.active = isFaceUp;
        this.backFace.node.active = !isFaceUp;
        if (this.isCommunityCard) {
            this.smallSuit.node.active = false;
            this.bigSuit.node.y = -20;
        }
        else {
            this.smallSuit.node.active = true;
            this.bigSuit.node.y = -30;
        }
    },

    /**
     * @description Sets the color of the card
     * @method setCardColor
     * @param {Object} deckSettings - CardColoring values
     * @memberof Utilities.Cards.Card#
     */
    setCardColor: function (deckSettings, pokerModel) {
        if (this.suit === null) {
            return;
        }

        // check for player settings and change color
        if (deckSettings === K.CardColoring.TwoCardColor) {
            // if card is not JQK set color of big texure
            if (!this.isFaceCard || this.toBePlayerCards) {
                if (this.suit === K.Suit.Heart || this.suit === K.Suit.Diamond) {
                    this.bigSuit.node.color = this.redTextColor;
                } else {
                    this.bigSuit.node.color = this.blackTextColor;
                }
            } else {
                if (this.suit === K.Suit.Heart || this.suit === K.Suit.Diamond) {
                    this.bigSuit.spriteFrame = this.texRedFaces[this.cardRank - 10 - 1];
                } else {
                    this.bigSuit.spriteFrame = this.texFaces[this.cardRank - 10 - 1];
                }
            }
            if (this.suit === K.Suit.Heart || this.suit === K.Suit.Diamond) {
                this.point.node.color = this.redTextColor;
                this.smallSuit.node.color = this.redTextColor;
            } else {
                this.point.node.color = this.blackTextColor;
                this.smallSuit.node.color = this.blackTextColor;
            }
        } else //if(deckSettings === K.CardColoring.FourCardColor)
        {
            if (!this.isFaceCard || this.toBePlayerCards) {
                if (this.suit === K.Suit.Heart) {
                    this.bigSuit.node.color = this.redTextColor;
                } else if (this.suit === K.Suit.Diamond) {
                    this.bigSuit.node.color = this.blueTextColor;
                } else if (this.suit === K.Suit.Spade) {
                    this.bigSuit.node.color = this.blackTextColor;
                } else {
                    this.bigSuit.node.color = this.greenTextColor;
                }
            } else {
                if (this.suit === K.Suit.Heart) {
                    this.bigSuit.spriteFrame = this.texRedFaces[this.cardRank - 10 - 1];
                } else if (this.suit === K.Suit.Diamond) {
                    this.bigSuit.spriteFrame = this.texBlueFaces[this.cardRank - 10 - 1];
                } else if (this.suit === K.Suit.Spade) {
                    this.bigSuit.spriteFrame = this.texFaces[this.cardRank - 10 - 1];
                } else {
                    this.bigSuit.spriteFrame = this.texGreenFaces[this.cardRank - 10 - 1];
                }
            }
            if (this.suit === K.Suit.Heart) {
                this.point.node.color = this.redTextColor;
                this.smallSuit.node.color = this.redTextColor;
            } else if (this.suit === K.Suit.Diamond) {
                this.point.node.color = this.blueTextColor;
                this.smallSuit.node.color = this.blueTextColor;
            } else if (this.suit === K.Suit.Spade) {
                this.point.node.color = this.blackTextColor;
                this.smallSuit.node.color = this.blackTextColor;
            } else {
                this.point.node.color = this.greenTextColor;
                this.smallSuit.node.color = this.greenTextColor;

            }
        }
    },

    /**
     * @description Reset the color of card(White).
     * @method resetCardColor
     * @memberof Utilities.Cards.Card#
     */
    resetCardColor: function () {
        this.point.node.color = cc.Color.WHITE;
        this.smallSuit.node.color = cc.Color.WHITE;
        this.bigSuit.node.color = cc.Color.WHITE;
        this.node.scale = 1;
        this.node.opacity = 255;
        this.node.children[0].getComponent(cc.Sprite).enabled = true;
        this.reveal(false);
        this.restoreGray();
    },

    /**
     * @description Set Cards Original Position
     * @method setOriginalPosition
     * @param {Object|Vec2} pos - Position of card
     * @memberof Utilities.Cards.Card# 
     */
    setOriginalPosition: function (pos) {
        this.originalPosition = this.node.position;
        //  this.originalZorder = this.node.getLocalZOrder();
        this.originalScale = 1;
    },

    /**
     * @description Return Card To Its Original Position
     * @method returnToOriginalPosition
     * @memberof Utilities.Cards.Card#
     */
    returnToOriginalPosition: function () {
        // var mov = cc.moveTo(0.2, new cc.v2(this.originalPosition.x, this.originalPosition.y));
        // this.node.runAction(mov);
        this.node.position = this.originalPosition;
        // this.node.scale = this.originalScale;
        //  this.node.setLocalZOrder(this.originalZorder);
    },

    onUpdateCardBackImage: function() {
        if (this.backFace) {
            if (this.model && this.model.presenter) {
                if (this.model.presenter.isTournament2) {
                    for (var i = 0; i < GameManager.cardBackImagesTour.length; i++) {
                        let stickerImages = GameManager.cardBackImagesTour[i];
                        if (GameManager.user.defaultTourCard != "" && GameManager.user.defaultTourCard._id) {
                            if (stickerImages.___data._id == GameManager.user.defaultTourCard._id) {
                                this.backFace.spriteFrame = GameManager.cardBackImagesTour[i];
                            };
                        }
                    }
                }
                else {
                    for (var i = 0; i < GameManager.cardBackImages.length; i++) {
                        let stickerImages = GameManager.cardBackImages[i];
                        if (GameManager.user.defaultCard != "" && GameManager.user.defaultCard._id) {
                            if (stickerImages.___data._id == GameManager.user.defaultCard._id) {
                                this.backFace.spriteFrame = GameManager.cardBackImages[i];
                            };
                        }
                    }
                }
            }
        }
    },

    gray: function() {
        this.point.setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
        this.bigSuit.setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
        this.smallSuit.setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
        this.backFace.setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
        this.frontFace.node.color = new cc.Color().fromHEX("#BBBBBB");
    },

    restoreGray: function() {
        this.point.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
        this.bigSuit.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
        this.smallSuit.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
        this.backFace.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
        this.frontFace.node.color = new cc.Color().fromHEX("#FFFFFF");
    },

});
