// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var PopUpBase = require('PopUpBase');
var dp, downloading, downloaded, timer, failedNode, tryDownloadTimer, progress, prevProgress, pInterval, progressPerc;
cc.Class({
    extends: PopUpBase,

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
        updateNode: {
            default: null,
            type: cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        dp = this.updateNode.getChildByName('Downloading').getChildByName('progressBar').getComponent(cc.ProgressBar);
        downloading = this.updateNode.getChildByName('Downloading');
        downloaded = this.updateNode.getChildByName('Downloaded');
        timer = null;
        failedNode = this.updateNode.getChildByName('FailedNode');
        tryDownloadTimer = 650000;
        progress = 0;
        prevProgress = 0;
        pInterval = null;

        //rajat 26th Aug, 2019
        let perc = this.updateNode.getChildByName('ProgressPercent');
        if (!!perc) {
            progressPerc = perc.getComponent(cc.Label);
        }
    },

    onUpdateApp: function () {
        // GameManager.playSound(K.Sounds.click);
        if (cc.sys.os === cc.sys.OS_IOS || cc.sys.isBrowser) {
            if (cc.sys.os === cc.sys.OS_IOS && cc.sys.os != cc.sys.isBrowser) {
                cc.sys.openURL("https://apps.apple.com/us/app/pokerbuddy365/id1588847992");

            }
            return;
        }
        if (!cc.sys.isBrowser && cc.sys.os === cc.sys.OS_WINDOWS) {
            cc.game.end();
        }

        this.updateNode.active = true;
        downloading.active = true;
        downloaded.active = false;
        failedNode.active = false;
        dp.progress = 0;

        // timer = setInterval(() => {
        //     downloading.active = false;
        //     failedNode.active = true;
        //     clearInterval(timer);
        // }, tryDownloadTimer);


        var cb = function () {
            if (prevProgress == progress) {
                // clearInterval(pInterval);
                downloading.active = false;
                failedNode.active = true;
            } else {
                prevProgress = progress;
                timer = setTimeout(cb, tryDownloadTimer);
            }
        }.bind(this);
        timer = setTimeout(cb, tryDownloadTimer);

        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "updateApp", "()V");

        // pInterval = setInterval(() => {
        //     // progress =  jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "GetDownloadProgress", "()I");
        //     // this.progress(progress);
        // }, 40);
    },

    progress: function (passed) {
        dp.progress = (passed / 100);
        progressPerc.string = String(passed) + "%";
        console.log("progress bar called", dp.progress);
        // clearInterval(timer);

        // timer = setInterval(() => {
        //     downloading.active = false;
        //     failedNode.active = true;
        //     clearInterval(timer);
        // }, tryDownloadTimer);


        if (dp.progress == 1) {
            clearInterval(pInterval);
            clearTimeout(timer);
            downloading.active = false;
            downloaded.active = true;
        }
    },

    retryInstall: function () {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/DownloadService", "retryInstall", "()V");
    }
    // update (dt) {},
});