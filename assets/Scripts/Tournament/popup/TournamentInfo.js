var K = require("GameConfig").K;

cc.Class({
    extends: cc.Component,

    properties: {
        pokerPresenter: {
            default: null,
            type: cc.Node
        },
    },

    /**
     * @method onLoad
     * @description Lifecycle callback, Used to Register some broadcast as tableUpdate, Perform some alignmetn of widget!
     * @memberof Screens.Lobby.Table.Table#
     */
    onLoad: function () {

    },

    
    onDisable: function () {

    },

    onEnable: function () {
    },

    onClose: function() {
        this.node.active = false;
        // kick
        this.pokerPresenter.getComponent("PokerPresenter").model.kickPlayerOutOfTheGame(this.pokerPresenter.getComponent("PokerPresenter").model);
        this.pokerPresenter.getComponent("PokerPresenter").leaveTable();
    },

    setData:function (data) {
        this.data = data;
        cc.find('Title', this.node).getComponent(cc.Label).string = this.data.title;
        cc.find('Content', this.node).getComponent(cc.Label).string = this.data.content;
    },

});
