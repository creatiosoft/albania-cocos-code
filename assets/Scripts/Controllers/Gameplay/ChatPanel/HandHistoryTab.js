/**
 * @classdesc
 * @class handHistoryTab
 * @memberof Controllers.Gameplay.ChatPanel
 */
cc.Class({
    extends: cc.Component,

    properties: {
        handHistoryId: null,
        onClickCallback: null,
        replayId: null,
        onReplayCallback: null,
        id: -1,

    },

    // use this for initialization
    onLoad: function () {

    },

    /**
     * @description Hand History is callback when clicked based on handHistoryId
     * @method onClicked
     * @memberof Controllers.Gameplay.ChatPanel.handHistoryTab#
     */
    onClick: function () {
        this.onClickCallback(this.handHistoryId, this);
    },

    /**
     * @description Replay is callback when clicked based on replayId
     * @method onReplay
     * @memberof Controllers.Gameplay.ChatPanel.handHistoryTab#
     */
    onReplay: function () {
        if (!!this.onReplayCallback) {
            this.onReplayCallback(this.replayId, this.id);
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});