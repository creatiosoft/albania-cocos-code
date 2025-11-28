
cc.Class({
    extends: cc.Component,

    properties: {
        progress: {
            default: null,
            type: cc.ProgressBar,
        },
        label: {
            default: null,
            type: cc.Node,
        },
        logo: {
            default: null,
            type: cc.Node,
        },
        bg: {
            default: null,
            type: cc.Node,
        },
        loading: {
            default: null,
            type: cc.Node,
        },
    },

    onConfirmCustom: function() {
        if (this.node.getChildByName("Editable")) {
            this.node.getChildByName("Editable").active = false;

            K.ServerAddress.gameServer = this.node.getChildByName("Editable").getChildByName("gameServer").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.ServerAddress.gamePort = this.node.getChildByName("Editable").getChildByName("gamePort").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.ServerAddress.ipAddress = this.node.getChildByName("Editable").getChildByName("ipAddress").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.ServerAddress.port = this.node.getChildByName("Editable").getChildByName("port").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.ServerAddress.assets_server = this.node.getChildByName("Editable").getChildByName("assets_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.ServerAddress.otp_server = this.node.getChildByName("Editable").getChildByName("otp_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.ServerAddress.ads_server = this.node.getChildByName("Editable").getChildByName("ads_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.Token.auth_server = this.node.getChildByName("Editable").getChildByName("auth_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            K.Token.auth_refresh_server = this.node.getChildByName("Editable").getChildByName("auth_refresh_server").getChildByName("EditBox").getComponent(cc.EditBox).string;

            cc.sys.localStorage.setItem("EditablegameServer", this.node.getChildByName("Editable").getChildByName("gameServer").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("EditablegamePort", this.node.getChildByName("Editable").getChildByName("gamePort").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("EditableipAddress", this.node.getChildByName("Editable").getChildByName("ipAddress").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("Editableport", this.node.getChildByName("Editable").getChildByName("port").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("Editableassets_server", this.node.getChildByName("Editable").getChildByName("assets_server").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("Editableotp_server", this.node.getChildByName("Editable").getChildByName("otp_server").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("Editableads_server", this.node.getChildByName("Editable").getChildByName("ads_server").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("Editableauth_server", this.node.getChildByName("Editable").getChildByName("auth_server").getChildByName("EditBox").getComponent(cc.EditBox).string);
            cc.sys.localStorage.setItem("Editableauth_refresh_server", this.node.getChildByName("Editable").getChildByName("auth_refresh_server").getChildByName("EditBox").getComponent(cc.EditBox).string);
        }

        this.schedule(this.updateProgress);
    },

    start () {

        cc.macro.ENABLE_MULTI_TOUCH = false;

        var size = cc.size(cc.Canvas.instance.node.width, cc.Canvas.instance.node.height);
        var aspect = size.height / size.width;
        console.log("aspect", aspect);
        if (aspect > 1.5) {
        }
        else {
            this.node.scale = 0.6;
        }

        if (this.node.getChildByName("Editable") && this.node.getChildByName("Editable").active) {
            if (cc.sys.localStorage.getItem("EditablegameServer")) {
                K.ServerAddress.gameServer = this.node.getChildByName("Editable").getChildByName("gameServer").getChildByName("EditBox").getComponent(cc.EditBox).string = cc.sys.localStorage.getItem("EditablegameServer");
            }
            else {
                K.ServerAddress.gameServer = this.node.getChildByName("Editable").getChildByName("gameServer").getChildByName("EditBox").getComponent(cc.EditBox).string;    
            }

            if (cc.sys.localStorage.getItem("EditablegamePort")) {
                K.ServerAddress.gamePort = this.node.getChildByName("Editable").getChildByName("gamePort").getChildByName("EditBox").getComponent(cc.EditBox).string = cc.sys.localStorage.getItem("EditablegamePort");
            }
            else {
                K.ServerAddress.gamePort = this.node.getChildByName("Editable").getChildByName("gamePort").getChildByName("EditBox").getComponent(cc.EditBox).string;
            }

            if (cc.sys.localStorage.getItem("EditableipAddress")) {
                K.ServerAddress.ipAddress = this.node.getChildByName("Editable").getChildByName("ipAddress").getChildByName("EditBox").getComponent(cc.EditBox).string = cc.sys.localStorage.getItem("EditableipAddress");
            }
            else {
                K.ServerAddress.ipAddress = this.node.getChildByName("Editable").getChildByName("ipAddress").getChildByName("EditBox").getComponent(cc.EditBox).string;
            }

            if (cc.sys.localStorage.getItem("Editableport")) {
                K.ServerAddress.port = this.node.getChildByName("Editable").getChildByName("port").getChildByName("EditBox").getComponent(cc.EditBox).string = cc.sys.localStorage.getItem("Editableport");
            }
            else {
                K.ServerAddress.port = this.node.getChildByName("Editable").getChildByName("port").getChildByName("EditBox").getComponent(cc.EditBox).string;
            }

            if (cc.sys.localStorage.getItem("Editableassets_server")) {
                K.ServerAddress.assets_server = this.node.getChildByName("Editable").getChildByName("assets_server").getChildByName("EditBox").getComponent(cc.EditBox).string = cc.sys.localStorage.getItem("Editableassets_server");
            }
            else {
                K.ServerAddress.assets_server = this.node.getChildByName("Editable").getChildByName("assets_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            }

            if (cc.sys.localStorage.getItem("Editableotp_server")) {
                K.ServerAddress.otp_server = this.node.getChildByName("Editable").getChildByName("otp_server").getChildByName("EditBox").getComponent(cc.EditBox).string = cc.sys.localStorage.getItem("Editableotp_server");
            }
            else {
                K.ServerAddress.otp_server = this.node.getChildByName("Editable").getChildByName("otp_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            }

            if (cc.sys.localStorage.getItem("Editableads_server")) {
                K.ServerAddress.otp_server = this.node.getChildByName("Editable").getChildByName("ads_server").getChildByName("EditBox").getComponent(cc.EditBox).string = cc.sys.localStorage.getItem("Editableads_server");
            }
            else {
                K.ServerAddress.otp_server = this.node.getChildByName("Editable").getChildByName("ads_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            }   

            if (cc.sys.localStorage.getItem("Editableauth_server")) {
                K.Token.auth_server = this.node.getChildByName("Editable").getChildByName("auth_server").getChildByName("EditBox").getComponent(cc.EditBox).string = cc.sys.localStorage.getItem("Editableauth_server");
            }
            else {
                K.Token.auth_server = this.node.getChildByName("Editable").getChildByName("auth_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            }

            if (cc.sys.localStorage.getItem("Editableauth_refresh_server")) {
                K.Token.auth_refresh_server = this.node.getChildByName("Editable").getChildByName("auth_refresh_server").getChildByName("EditBox").getComponent(cc.EditBox).string = cc.sys.localStorage.getItem("Editableauth_refresh_server");
            }
            else {
                K.Token.auth_refresh_server = this.node.getChildByName("Editable").getChildByName("auth_refresh_server").getChildByName("EditBox").getComponent(cc.EditBox).string;
            }
        }
        else {
            this.schedule(this.updateProgress);
        }
        this.node.getComponent(cc.Button).interactable = false;
        this.timer = 0;
        cc.director.preloadScene("Portrait", () => {
            this.finished();
        });
    },

    updateProgress(dt) {
        this.timer += dt / 4;
        if (this.timer >= 1) {
            this.timer = 1;
            this.unschedule(this.updateProgress);
            this.next();
        }
        this.progress.progress = this.timer;
    },

    next() {
        this.logo.runAction(
            cc.fadeOut(1)
        );
        this.progress.node.runAction(
            cc.fadeOut(1)
        );
        this.node.runAction(
            cc.sequence(
                cc.delayTime(1.1),
                cc.callFunc(() => {
                    this.next2();
                }, this)
            )
        );
    },

    next2() {
        this.logo.scale = 10;
        this.logo.runAction(
            cc.sequence(
                cc.spawn(
                    cc.fadeIn(1),
                    cc.scaleTo(1, 0.9)
                ),
                cc.delayTime(0.5),
                cc.delayTime(0.5),
                // cc.moveTo(0.8, cc.v2(0, cc.Canvas.instance.node.height / 2 - 180)),
                cc.delayTime(1.0),
                cc.callFunc(() => {
                    this.node.getComponent(cc.Button).interactable = true;

                    this.isAnimationFinshed = true;

                    // if (this.isLoadngFinshed) {
                        this.isAnimationFinshed = false;
                        this.toGame();
                    // }
                }, this)
            )
        );
        this.bg.active = true;
        this.bg.opacity = 0;
        this.bg.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.fadeIn(1),
            )
        );
        this.label.active = true;
        this.label.opacity = 0;
        this.label.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.fadeIn(1),
            )
        );
    },

    finished () {
        console.log("finished");

        this.isLoadngFinshed = true;

        if (this.isAnimationFinshed) {
            this.toGame();
        }
    },

    toGame () {
        this.node.getComponent(cc.Button).interactable = false;
        this.isAnimationFinshed = false;
        this.loading.active = true;
        cc.director.loadScene("Portrait");
    }

});
