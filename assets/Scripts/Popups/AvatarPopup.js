/**
 * @namespace Popups
 */
var root = window;
var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');
var AvatarSelection = require('AvatarSelection');

/**
 * @classdesc Manages the avatar popup
 * @class AvatarPopup
 * @extends PopUpBase
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        popUpManager: {
            default: null,
            type: PopUpManager
        },
        avatarGridParent: {
            default: null,
            type: cc.Node,
        },
        avatars: {
            default: [],
            type: AvatarSelection,
        },
        selectedAvatarID: 0,
        downloadedSprite: {
            default: null,
            type: cc.Sprite,
        },
        isAvatarTab: true,
        imageLoaded: false,
        okBtn: {
            default: null,
            type: cc.Button,
        },

        avatarScrollViewRef: {
            default: null,
            type: cc.Node,
        }
    },

    /**
     * @description This is used for initialisation
     * @method onLoad
     * @memberof Popups.AvatarPopup#
     */
    onLoad: function () {
        // console.log("AVATAR POPUP LOADED ");

        this.loadAvatars();
        this.on("SelectedAvatar", this.onSelectAvatar.bind(this));
        root.AvatarPopup = this;
        this.avatars.forEach(function (element) {
            element.unSelectAvatar();
        }, this);


        // // Fired when user updates his profile pic, he will need to notifyother running instance of change in profile image
        // ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.profileImageUpdated, function (response) {

        //     if (response.success && response.code == 200) {
        //         // console.log("AVATAR BROADCAST ", response)
        //         var profileData = {
        //             query: {
        //                 playerId: "hsdfhd"
        //             },
        //             updateKeys: {
        //                 profileImage: "0",
        //             }
        //         };

        //         var data = profileData;
        //         data.query.playerId = GameManager.user.playerId;
        //         data.updateKeys.profileImage = response.data.url;

        //         GameManager.user.profileImage = WebImageUpload.base64Data;
        //         GameManager.user.urlImg = WebImageUpload.spriteLoaded;
        //         GameManager.emit("image-loaded", GameManager.user);

        //         ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (response2) {
        //             // console.log("AVATAR UPLAOD DATA UPDATE PROFILE ", response2);
        //             if (response2.success) {
        //                 GameManager.user.profileImage = WebImageUpload.base64Data;
        //                 GameManager.user.urlImg = WebImageUpload.spriteLoaded;
        //                 //         GameManager.emit("image-loaded", GameManager.user);

        //             }
        //         }.bind(this));
        //     }

        // }.bind(this));

    },

    /**
     * @description This is used loading Avatar from prefab
     * @method loadAvatars
     * @memberof Popups.AvatarPopup#
     */
    loadAvatars: function () {
        for (var i = 0; i < GameManager.avatarPool.length; i++) {
            this.avatarGridParent.addChild(GameManager.avatarPool[i]);
            GameManager.avatarPool[i].active = true;
            GameManager.avatarPool[i].getComponent("AvatarSelection").AvatarPopUp = this;
            this.avatars.push(GameManager.avatarPool[i].getComponent("AvatarSelection"));
            //this.avatars[i].on("SelectedAvatar", this.onSelectAvatar.bind(this));\
        }
    },

    /**
     * @description This is used for initialisation and display of popups
     * @method onShow
     * @param {Object} data
     * @memberof Popups.AvatarPopup#
     */
    onShow: function (data) {
        this.soundValue = null;
        if (data != null) {
            this.soundValue = data;
        }
        //save prev avatar selection
        //  this.checkBox.setSelection(data);
        if (!GameManager.isMobile) {
            // this.registerUPandDOWN();
        }
        this.avatars.forEach(function (avatar) {
            avatar.unSelectAvatar();
        });

        this.selectedAvatarID = -1;

        // STandard case for IMage Uplaod as expected
        if (!GameManager.isMobile && !(cc.sys.os===cc.sys.OS_WINDOWS && !cc.sys.isBrowser)) {
            var imageIndex = parseInt(GameManager.user.profileImage);
            if (imageIndex != 0 && !imageIndex) {
                // base 64 selected
                this.getComponent("TabBtnUtil").onShowTab_02();
                this.onCustomImageTab();
                this.imageLoaded = true;
                this.downloadedSprite.spriteFrame = GameManager.user.urlImg;
            } else {
                this.getComponent("TabBtnUtil").onShowTab_01();
                this.onAvatarTab();
                if (imageIndex >= 0) {
                    this.selectedAvatarID = imageIndex;
                    this.avatars[imageIndex].selection.active = true;
                }
            }
        } else {
            // DELETE THESE LINES WHEN START DING CUSTOM IMAGE SELECTION ON MOBILE DEVICES
            var imageIndex = parseInt(GameManager.user.profileImage);
            if (imageIndex != 0 && !imageIndex) {
                imageIndex = 0;
            }
            // this.getComponent("TabBtnUtil").onShowTab_01();
            this.onAvatarTab();
            if (imageIndex >= 0) {
                // console.log(imageIndex)
                if (imageIndex > this.avatars.length - 1) {
                    imageIndex = 0;
                }
                this.selectedAvatarID = imageIndex;
                this.avatars[imageIndex].selection.active = true;
            }
            // till here 


        }
    },

    /**
     * @description Method for inbuilt Avatar selection
     * @method onAvatarTab
     * @memberof Popups.AvatarPopup#
     */
    onAvatarTab: function () {
        if (this.soundValue == null || this.soundValue == false) {
            GameManager.playSound(K.Sounds.click);
        }
        if (!this.isAvatarTab) {
            this.isAvatarTab = true;
            this.okBtn.interactable = true;
            this.okBtn.interactable = this.selectedAvatarID >= 0;
        }
    },

    /**
     * @description Method for custom Avatar selection
     * @method onCustomImageTab
     * @memberof Popups.AvatarPopup#
     */
    onCustomImageTab: function () {
        if (this.soundValue == null || this.soundValue == false) {
            GameManager.playSound(K.Sounds.click);
        }
        if (this.isAvatarTab) {
            this.isAvatarTab = false;
            this.okBtn.interactable = this.imageLoaded;
        }
    },

    /**
     * @description Save avatar preference
     * @method onSelectAvatar
     * @param {Number} avatarId
     * @memberof Popups.AvatarPopup#
     */
    onSelectAvatar: function (avatarId) {

        this.avatars.forEach(function (avatar) {
            avatar.unSelectAvatar();
        });

        this.avatars[avatarId].showSelection();

        this.selectedAvatarID = avatarId;
        this.okBtn.interactable = this.selectedAvatarID >= 0;
    },

    /**
     * @description Exit button callback
     * @method onConfirm
     * @memberof Popups.AvatarPopup#
     */
    onConfirm: function () {
        this.updateAvatar();
        if (this.soundValue == null || this.soundValue == false) {
            GameManager.playSound(K.Sounds.click);
        }
        //select the seat 
    },

    /**
     * @description Selects the custom Avatar
     * @method onBrowseAvatar
     * @memberof Popups.AvatarPopup#
     */
    onBrowseAvatar: function () {
        WebImageUpload.loadImage(function (spriteFrame) {
            this.okBtn.interactable = true;
            this.imageLoaded = true;
            this.downloadedSprite.spriteFrame = spriteFrame;
        }.bind(this));
    },

    /**
     * @description This is used for updating the avatar
     * @method updateAvatar
     * @memberof Popups.AvatarPopup#
     */
    updateAvatar: function () {
        //------------------------------uncomment for api call---------------------------------//
        var profileData = {
            query: {
                playerId: "hsdfhd"
            },
            updateKeys: {
                profileImage: "0",
            }
        };
        var data = profileData;
        data.query.playerId = GameManager.user.playerId;
        if (this.isAvatarTab) {
            data.updateKeys.profileImage = this.selectedAvatarID.toString();
        } else {
            data.updateKeys.profileImage = WebImageUpload.base64Data;
        }

        if (this.isAvatarTab) {
            ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (response) {
                if (response.success) {
                    if (this.isAvatarTab) {
                        // console.log(response)
                        // console.log(GameManager.user.profileImage, GameManager.user.urlImg);
                        GameManager.user.profileImage = this.selectedAvatarID;
                        GameManager.user.urlImg = GameManager.avatarImages[GameManager.user.profileImage];
                        // console.log(GameManager.user.profileImage, GameManager.user.urlImg);
                    } else {
                        GameManager.user.profileImage = WebImageUpload.base64Data;
                        GameManager.user.urlImg = WebImageUpload.spriteLoaded;
                    }
                    GameManager.emit("image-loaded", GameManager.user);
                    this.popUpManager.hide(PopUpType.AvatarDialog, function () { });
                }
            }.bind(this));
        } else {
            ServerCom.httpPostRequest(K.ServerAddress.ipAddress + ":" + K.ServerAddress.port + K.ServerAPI.imageUpload, {
                playerId: GameManager.user.playerId,
                base64Image: WebImageUpload.base64Data
            }, function (response) {
                // console.log("AVATAR UPLAOD DATA MAKING HIT  ", response);
                if (response.success) {
                    // console.log("AVATAR UPLAOD DATA MAKING HIT  ", response);
                    // data.updateKeys.profileImage = response.data.url;
                    // console.log("DATA IS ", data)
                    // ServerCom.pomeloRequest(K.PomeloAPI.updateProfile, data, function (response2) {
                    //     console.log("AVATAR UPLAOD DATA UPDATE PROFILE ", response2);
                    // if (response2.success) {
                    //         GameManager.user.profileImage = WebImageUpload.base64Data;
                    //         GameManager.user.urlImg = WebImageUpload.spriteLoaded;
                    //         GameManager.emit("image-loaded", GameManager.user);
                    this.popUpManager.hide(PopUpType.AvatarDialog, function () { });
                    // }
                    // }.bind(this));
                }
            }.bind(this));
        }
    },

    /**
     * @description Cancel button callback
     * @method onCancel
     * @memberof Popups.AvatarPopup#
     */
    onCancel: function () {
        this.popUpManager.hide(PopUpType.AvatarDialog, function () {
            AvatarPopup.avatars.forEach(function (element) {
                element.unSelectAvatar();
            }, this);

        });
        if (this.soundValue == null || this.soundValue == false) {
            GameManager.playSound(K.Sounds.click);
        }
        // GameManager.playSound(K.Sounds.click);
    },


    registerUPandDOWN: function () {
        return;
        // console.log("AVATRA SCROLL SHOWN");
        var scrollView = this.avatarScrollViewRef.getComponent(cc.ScrollView);
        this.upDownListenerAvatarScrollView = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed(key, event) {
                if (key == cc.KEY.down) {
                    // console.log("ScrollS CROLL ", scrollView.getMaxScrollOffset())
                    scrollView.scrollToOffset(cc.v2(0, scrollView.getScrollOffset().y + 180), 0.5);

                    event.stopPropagation();
                } else if (key == cc.KEY.up) {
                    // console.log("ScrollS CROLL UP ", )
                    scrollView.scrollToOffset(cc.v2(0, scrollView.getScrollOffset().y - 180), 0.5);
                    event.stopPropagation();
                } else {
                    event.stopPropagation();
                }
            }
        })
        cc.eventManager.addListener(this.upDownListenerAvatarScrollView, this.node);
    },

    onHide: function () {
        // console.log("AVATRA SCROLL HIDDNE");
        if (!GameManager.isMobile) {
            // cc.eventManager.removeListener(this.upDownListenerAvatarScrollView);
        }
    },
});