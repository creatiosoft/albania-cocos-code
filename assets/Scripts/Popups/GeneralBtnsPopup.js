var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

cc.Class({
    extends: PopUpBase,

    onClickEnter: function () {

        this.onQuit();
    },
    onQuit: function () {
        //Quit Game
        let url = "";
        if (GameManager.isSD && cc.sys.platform == cc.sys.WIN32) {
            /*On update in window take you to website */

        }

        if (GameManager.isSD && cc.sys.platform == cc.sys.MACOS) {
            /*On update in mac take you to website */

        }
        //cc.sys.openURL(url);
        window.open(url, "_self")
        GameManager.playSound(K.Sounds.click);
        cc.game.end();

    },

});