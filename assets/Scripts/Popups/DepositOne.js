var PopUpManager = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var PopUpBase = require('PopUpBase');

/**
 * @classdesc Manages gamepreferences popUp
 * @class GamePreferencesPopup
 * @memberof Popups
 */
cc.Class({
    extends: PopUpBase,

    properties: {

        bankHolderList: {
            default: null,
            type: cc.Node,
        },
        scrollViewEmpty: {
            default: null,
            type: cc.Node,
        },
        scrollView: {
            default: null,
            type: cc.Node,
        },
        scrollViewItem: {
            default: null,
            type: cc.Node,
        },

        vpHistoryNode: {
            default: null,
            type: cc.Node,
        },

        vpSuccess: {
            default: null,
            type: cc.Node,
        },
        vpSuccessItem: {
            default: null,
            type: cc.Node,
        },
        vpErrorMessage: {
            default: null,
            type: cc.Label,
        },
        vpSubmit: {
            default: null,
            type: cc.Button,
        },
        vpPhone: {
            default: null,
            type: cc.EditBox,
        },
        vpWithdrawAmount: {
            default: null,
            type: cc.EditBox,
        },
        vpWithdrawAccount: {
            default: null,
            type: cc.EditBox,
        },
        playerName: {
            default: null,
            type: cc.Label,
        },
        playerId: {
            default: null,
            type: cc.Label,
        }, 
        playerImg: {
            default: null,
            type: cc.Sprite
        },

        flagScrollView: {
            default: null,
            type: cc.Node,
        },
        flagScrollViewContent: {
            default: null,
            type: cc.Node,
        },
        flagItem: {
            default: null,
            type: cc.Node,
        },
        selectedBankNode: {
            default: null,
            type: cc.Node,
        },
        selectedBankNodePlaceHolder: {
            default: null,
            type: cc.Node,
        },
    },

    /**
     * @description For initialization.
     * @method onLoad
     * @memberof Popups.GamePreferencesPopup#
     */
    onLoad: function () {
        this.playerName.string = GameManager.user.userName;
        this.playerId.string = GameManager.user.playerId;

        // 
        // {
        //     "id": "68c819729fbe7f95e4ccaf1e",
        //     "bankName": "Khane Bank",
        //     "ibanNumber": "DE89370400440532013000",
        //     "redirectLink": "https://bank.com/transfer",
        //     "bankIcon": "/static/uploads/BankIcons/1757944177351.png"
        // }
        GameManager.getBankList(
            (data) => {
                console.log("GameManager.getBankList", data.data);

                this.flagScrollViewContent.removeAllChildren();

                for (var i = 0; i < data.data.length; i++) {
                    const instance =  cc.instantiate(this.flagItem);
                    instance.setPosition(0, 0);
                    instance.active = true;

                    (function (roomImage, instance) {
                        cc.loader.load(roomImage, function (err, tex) {
                            instance.children[0].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                        });
                    })(K.ServerAddress.assets_server_s + data.data[i].bankIcon, instance);

                    // cc.loader.load(K.ServerAddress.assets_server_s + data.data[i].bankIcon, function (err, tex) {
                    //     instance.children[0].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                    // });

                    instance.children[1].getComponent(cc.Label).string = data.data[i].bankName;
                    instance.getComponent(cc.Button).clickEvents[0].customEventData = data.data[i].id;
                    instance.parent = this.flagScrollViewContent;
                    instance.__data = data.data[i];
                }
            }
        );
    },

    onEnable: function() {
        this.playerImg.spriteFrame = GameManager.user.urlImg;
    },

    /**
     * @description Manage default states of buttons in popup.
     * @method onShow
     * @param{Object} data
     * @memberof Popups.GamePreferencesPopup#   
     */

    onShow: function (data) {
        this.data = data;
        this.vpWithdrawAmount.string = this.data.price + " MNT";
    },

    
    onDeposit: function() {
       this.vpErrorMessage.string = "";
       GameManager.createRequest(
            this.vpWithdrawAccount.string, 
            "+976" + this.vpPhone.string, 
            this.selectedBankNode.productId, 
            this.selectedBankNode.bankId,
            (data) => {
                console.log("GameManager.createRequest", data);

                if (data.success == true || data.status == "success") {
                    // {
                    //     "referenceId": "DEPO78J7ADL",
                    //     "status": "PENDING",
                    //     "createdAt": "2025-09-16T01:36:50.329Z",
                    //     "updatedAt": "2025-09-16T01:36:50.329Z"
                    // }
                    this.vpErrorMessage.string = "";
                    this.vpSuccess.active = true;
                    this.vpSuccessItem.children[0].getComponent(cc.Sprite).spriteFrame = this.selectedBankNode.children[0].getComponent(cc.Sprite).spriteFrame;
                    this.vpSuccessItem.children[1].getComponent(cc.Label).string = data.data.referenceId;
                }
                else {
                    this.vpErrorMessage.node.active = true;
                    if (data.message) {
                        this.vpErrorMessage.string = data.message;
                    }
                    else {
                        this.vpErrorMessage.string = data.error[0].message;
                    }
                }
            }
        );
    },

    onHistory: function() {
        GameManager.getHistory(
            (data) => {
                console.log("GameManager.getHistory", data);
                this.vpHistoryNode.active = true;
                // [
                //     {
                //         "referenceId": "DEPCE1P0ZIJ",
                //         "name": "11d",
                //         "mobileNumber": "+97633333333",
                //         "depositAmount": 10000,
                //         "status": "PENDING",
                //         "createdAt": "2025-09-16T01:49:47.146Z",
                //         "updatedAt": "2025-09-16T01:49:47.146Z"
                //     },
                //     {
                //         "referenceId": "DEPUD5XALW3",
                //         "name": "11d",
                //         "mobileNumber": "+97633333333",
                //         "depositAmount": 10000,
                //         "status": "PENDING",
                //         "createdAt": "2025-09-16T01:49:35.548Z",
                //         "updatedAt": "2025-09-16T01:49:35.548Z"
                //     },
                //     {
                //         "referenceId": "DEP8R5MSU5G",
                //         "name": "sxc",
                //         "mobileNumber": "+97611111111",
                //         "depositAmount": 10000,
                //         "status": "PENDING",
                //         "createdAt": "2025-09-16T01:47:16.244Z",
                //         "updatedAt": "2025-09-16T01:47:16.244Z"
                //     },
                //     {
                //         "referenceId": "DEPCPZMI19E",
                //         "name": "sxc",
                //         "mobileNumber": "+97611111111",
                //         "depositAmount": 1000,
                //         "status": "PENDING",
                //         "createdAt": "2025-09-16T01:45:22.879Z",
                //         "updatedAt": "2025-09-16T01:45:22.879Z"
                //     },
                //     {
                //         "referenceId": "DEP1WJC3H55",
                //         "name": "sxc",
                //         "mobileNumber": "+97611111111",
                //         "depositAmount": 1000,
                //         "status": "PENDING",
                //         "createdAt": "2025-09-16T01:45:00.802Z",
                //         "updatedAt": "2025-09-16T01:45:00.802Z"
                //     },
                //     {
                //         "referenceId": "DEPO78J7ADL",
                //         "name": "sxc",
                //         "mobileNumber": "+97611111111",
                //         "depositAmount": 1000,
                //         "status": "PENDING",
                //         "createdAt": "2025-09-16T01:36:50.329Z",
                //         "updatedAt": "2025-09-16T01:36:50.329Z"
                //     }
                // ]
                function formatDate(isoString) {
                  // 创建 Date 对象
                  const date = new Date(isoString);
                  
                  // 获取各个时间部分
                  const day = String(date.getDate()).padStart(2, '0');
                  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
                  const year = date.getFullYear();
                  const hours = String(date.getHours()).padStart(2, '0');
                  const minutes = String(date.getMinutes()).padStart(2, '0');
                  
                  // 组合成目标格式
                  return `${day}-${month}-${year} ${hours}:${minutes}`;
                }


                if (data.success == true || data.status == "success") {
                    this.scrollView.removeAllChildren();
                    if (data.data.history.length == 0) {
                        this.scrollViewEmpty.active = true;
                    }
                    else {
                        this.scrollViewEmpty.active = false;
                        for (var i = 0; i < data.data.history.length; i++) {
                            const instance =  cc.instantiate(this.scrollViewItem);
                            instance.setPosition(0, 0);
                            instance.active = true;
                            instance.children[0].getComponent(cc.Label).string = formatDate(data.data.history[i].updatedAt);
                            instance.children[1].getComponent(cc.Label).string = data.data.history[i].depositAmount;
                            instance.children[2].getComponent(cc.Label).string = data.data.history[i].chipsValue;
                            instance.children[3].getComponent(cc.Label).string = data.data.history[i].referenceId;
                            
                            if (data.data.history[i].status == "PENDING") {
                                instance.children[4].active = false;
                                instance.children[5].active = true;
                                instance.children[6].active = false;
                            }
                            else if (data.data.history[i].status == "APPROVED") {
                                instance.children[4].active = true;
                                instance.children[5].active = false;
                                instance.children[6].active = false;
                            }
                            else {
                                instance.children[4].active = false;
                                instance.children[5].active = false;
                                instance.children[6].active = true;
                            }
                            instance.parent = this.scrollView;

                            instance.children[7].active = true;
                            if (data.data.history.length - 1 == i) {
                                instance.children[7].active = false;
                            }
                        }
                    }
                }
            }
        );
    },


    onCloseSuccess:function() {
        this.vpSuccess.active = false;
        cc.sys.openURL(this.selectedBankNode.redirectLink);
    },


    onBack: function() {
        this.node.active = false;
        this.vpWithdrawAccount.string = "";
        this.vpPhone.string = "";
        this.selectedBankNode.active = false;
        this.selectedBankNode.children[0].getComponent(cc.Sprite).spriteFrame = null;
        this.selectedBankNode.children[1].getComponent(cc.Label).string = "";
        this.selectedBankNode.children[3].getComponent(cc.Label).string = "";

        this.selectedBankNodePlaceHolder.active = true;

        this.vpSubmit.interactable = false;

        this.flagScrollViewContent.children.forEach((elem) => {
            elem.children[2].getComponent(cc.Toggle).isChecked = false;
        }, this);
    },

    onHistoryBack: function() {
        this.vpHistoryNode.active = false;
    },

    onCopy: function() {
        window.navigator.clipboard.writeText(this.playerId.string)
            .then(() => {
                console.log('PlayerId copied to clipboard');
            })
            .catch(err => {
                console.error('Could not copy playerId: ', err);
            }
        );
        GameManager.popUpManager.show(PopUpType.NotificationPopup, "PlayerId copied!", function () { });
    },

    onCopyIBan: function() {
        window.navigator.clipboard.writeText(this.vpSuccessItem.children[1].getComponent(cc.Label).string)
            .then(() => {
                console.log('PlayerId copied to clipboard');
            })
            .catch(err => {
                console.error('Could not copy playerId: ', err);
            }
        );
        GameManager.popUpManager.show(PopUpType.NotificationPopup, "PlayerId copied!", function () { });
    },


    showFlagScrollView: function() {
        this.flagScrollView.active = !this.flagScrollView.active;

        // 获取 itemB 的世界坐标
        // let itemBWorldPos = this.selectedBankNode.parent.parent.convertToWorldSpaceAR(this.selectedBankNode.parent.position);
        // // 转换为相对于 holder 的坐标
        // let itemBHolderPos = this.bankHolderList.convertToNodeSpace(itemBWorldPos);

        // cc.log(itemBHolderPos); // 这是 itemB 相对于 holder 的坐标

        // this.flagScrollView.y = itemBHolderPos.y;

        // console.log(this.node.getChildByName("items").getChildByName("list").getChildByName("view").getChildByName("content").y);
    },

    hideFlagScrollView: function() {
        this.flagScrollView.active = false;
    },

    onSelectButton: function(event, customEventData) {
        console.log("onSelectButton", customEventData);

        this.flagScrollViewContent.children.forEach((elem) => {
            elem.children[2].getComponent(cc.Toggle).isChecked = false;
        }, this);
        event.target.children[2].getComponent(cc.Toggle).isChecked = true;

        this.hideFlagScrollView();

        this.selectedBankNode.active = true;
        this.selectedBankNode.children[0].getComponent(cc.Sprite).spriteFrame = event.target.children[0].getComponent(cc.Sprite).spriteFrame;
        this.selectedBankNode.children[1].getComponent(cc.Label).string = event.target.__data.bankName;
        this.selectedBankNode.children[3].getComponent(cc.Label).string = event.target.__data.ibanNumber;
        this.selectedBankNode.bankId = event.target.__data.id;
        this.selectedBankNode.productId = this.data._id;
        this.selectedBankNode.redirectLink = event.target.__data.redirectLink;
        this.selectedBankNode.ibanNumber = event.target.__data.ibanNumber;

        this.selectedBankNodePlaceHolder.active = false;

        this.onCheck();
    },

    onCheck: function() {
        this.vpSubmit.interactable = false;
        if (this.vpPhone.string === "" ||
            this.vpWithdrawAccount.string === "" ||
            !this.selectedBankNode.active) {
            return;
        }
        this.vpSubmit.interactable = true;
    },

});
