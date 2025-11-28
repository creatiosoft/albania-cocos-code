import globals from "../../globals";
import { GameData } from "../../DataFormats/ResponseTypes";
import { Tournament } from "../data/TournamentResponseTypes";
import { PopUpType } from "../../Utilities/ScreensAndPopUps/PopUps/PopUpManager";
import { Login } "../../DataFormats/PostTypes";

const { ccclass, property } = cc._decorator;
export enum TOURNAMENT_ITEM_TYPE {
    NONE = 0,
    ANNOUNCED,
    REGISTERING,
    LATE_REG,
    RUNNING,
    COMPLETED,
    CANCELLED,
}
@ccclass
export default class TournamentLobbyListItem extends cc.Component {


    @property(cc.Node)
    bg_1: cc.Node = null;

    @property(cc.Node)
    bg_2: cc.Node = null;

    @property(cc.Node)
    highlightBg: cc.Node = null;

    @property(cc.Label)
    tournamentName: cc.Label = null;

    @property(cc.Label)
    tournamentType: cc.Label = null;

    @property(cc.Label)
    time: cc.Label = null;

    @property(cc.Label)
    buyIn: cc.Label = null;

    @property(cc.Label)
    prize: cc.Label = null;

    @property(cc.Label)
    btnLabel: cc.Label = null;

    @property(cc.Sprite)
    btnSprite: cc.Sprite = null;

    @property(cc.Sprite)
    bgSprite: cc.Sprite = null;

    @property(cc.SpriteFrame)
    btnFrame: cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    bgFrame: cc.SpriteFrame[] = [];

    @property(cc.Node)
    tournamentBuyin: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:
    public dblClk = false;
    public tourItemInfo = null;
    isTableExisting = false;
    isTournamentExisting = false;
    tournamentIndexFound = -1;
    indexFound = -1;
    onLoad () {
        this.setHighlight(false);
        const inst = this;
        this.node.on('touchstart', function (event) {
            if (inst.dblClk) {
                inst.dblClk = false;
            } else {
                inst.dblClk = true;
           
                setTimeout(function () {
                    inst.dblClk = false;
                }, 300);
            }
        }, this.node);        
    }

    start() {
        
    }

    initIndex(index) {
        // if (!GameManager.isMobile) {
        //     this.bg_1.active = index % 2 == 0;
        //     this.bg_2.active = index % 2 != 0;
        // }
    }

    initInfo(data) {
        // console.log("initInfo");
        // console.log(data);

        this.tourItemInfo = data;
        
        if (data.raw.tournamentType != "SIT N GO") {
            this.tournamentName.string = this.tourItemInfo.tournamentName;
        }
        else {
            this.tournamentName.string = this.tourItemInfo.raw.stageName;
            // 
            ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentLobbyResponseEvent, this.onTournamentLobbyResponseEvent.bind(this));
        }
        this.btnLabel.string = this.tourItemInfo.state;

        this.unschedule(this.breakEndsTimer);
        this.unschedule(this.startsInTimer);
        this.unschedule(this.endsInTimer);

        if (data.raw.tournamentType != "SIT N GO") {
            // if (!GameManager.isMobile) {
            //     cc.find('RoomInfo/BuyInGroup/TimeLabel', this.node).active = true;

            //     cc.find('RoomInfo/BuyInGroup/Entries', this.node).active = true;
            //     cc.find('RoomInfo/BuyInGroup/Entries2', this.node).active = false;
            // }
            {
                // cc.find('RoomInfo/TimeGroup/TimeLabel', this.node).active = false;
            }
        }
        else {
            // if (!GameManager.isMobile) {
            //     cc.find('RoomInfo/BuyInGroup/TimeLabel', this.node).active = true;

            //     cc.find('RoomInfo/BuyInGroup/Entries', this.node).active = false;
            //     cc.find('RoomInfo/BuyInGroup/Entries2', this.node).active = true;
            // }
            {
                cc.find('RoomInfo/TimeGroup/TimeLabel', this.node).active = true;
            }
        }

        if (this.tourItemInfo.state == "Open To Register") {
            if (data.raw.playerData) {
                this.btnLabel.string = "Registered";
                this.btnSprite.spriteFrame = this.btnFrame[1];
                if (data.raw.tournamentType == "SIT N GO") {
                    if (data.raw.playerData.tableId) {
                        this.btnLabel.string = "Enter Table";
                        this.btnSprite.spriteFrame = this.btnFrame[2];
                    }
                    else {
                        this.btnLabel.string = "Deregister";
                        this.btnSprite.spriteFrame = this.btnFrame[2];
                    }
                }
            }
            else {
                if (data.raw.tournamentType == "SIT N GO") {
                    this.btnLabel.string = "Register";
                }
                else {
                    // if (GameManager.isMobile) {
                        // this.btnLabel.string = "Enter";
                        this.btnLabel.string = "Register";
                    // }
                }
                this.btnSprite.spriteFrame = this.btnFrame[1];
            }
            // this.bgSprite.spriteFrame = this.bgFrame[1];
            // 

            if (!GameManager.isMobile) {
                //cc.find('RoomInfo/NameGroup/NameLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup2/BuyInLayout/Label', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/BuyInGroup/Entries/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup/Entries2/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup/Entries/Icon', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                
                //// cc.find('RoomInfo/BuyInGroup/BuyInLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //// cc.find('RoomInfo/BuyInGroup/BuyInLayout/Label', this.node).color = new cc.Color().fromHEX("#FFFFFF");

                //cc.find('RoomInfo/BuyInGroup/TimeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/NameGroup/Layout/Label1', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Label2', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Label3', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Label4', this.node).color = new cc.Color().fromHEX("#FEBF01");
            }
            else {
                //cc.find('RoomInfo/NameGroup/NameLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/NameGroup/Layout/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Entries/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/NameGroup/Layout/Entries/Icon', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                
                //cc.find('RoomInfo/BuyInGroup/BuyInLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup/BuyInLayout/Label', this.node).color = new cc.Color().fromHEX("#FFFFFF");

                //cc.find('RoomInfo/TimeGroup/TimeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/TimeGroup/Layout/Label1', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/TimeGroup/Layout/Label2', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/TimeGroup/Layout/Label3', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/TimeGroup/Layout/Label4', this.node).color = new cc.Color().fromHEX("#FEBF01");
            }
        }
        else if (this.tourItemInfo.state == "PUBLISHED") {
            if (data.raw.tournamentType == "SIT N GO") {
                this.btnLabel.string = "Register";
            }
            else {
                // if (GameManager.isMobile) {
                    this.btnLabel.string = "Upcoming";
                // }
            }
            this.btnSprite.spriteFrame = this.btnFrame[0];

        }
        else if (this.tourItemInfo.state == "RUNNING") {
            if (data.raw.tournamentType == "SIT N GO") {
            this.btnLabel.string = "Running";
            }
            else {
                if (GameManager.isMobile) {
                    // this.btnLabel.string = "Enter";
                }
            }
            this.btnSprite.spriteFrame = this.btnFrame[2];
            // this.bgSprite.spriteFrame = this.bgFrame[2];
            // 
            if (!GameManager.isMobile) {
                //cc.find('RoomInfo/NameGroup/NameLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup2/BuyInLayout/Label', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/BuyInGroup/Entries/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup/Entries2/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup/Entries/Icon', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                
                //// cc.find('RoomInfo/BuyInGroup/BuyInLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //// cc.find('RoomInfo/BuyInGroup/BuyInLayout/Label', this.node).color = new cc.Color().fromHEX("#FFFFFF");

                //cc.find('RoomInfo/BuyInGroup/TimeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/NameGroup/Layout/Label1', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Label2', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Label3', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Label4', this.node).color = new cc.Color().fromHEX("#FEBF01");
            }
            else {
                //cc.find('RoomInfo/NameGroup/NameLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/NameGroup/Layout/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Entries/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/NameGroup/Layout/Entries/Icon', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                
                //cc.find('RoomInfo/BuyInGroup/BuyInLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup/BuyInLayout/Label', this.node).color = new cc.Color().fromHEX("#FFFFFF");

                //cc.find('RoomInfo/TimeGroup/TimeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/TimeGroup/Layout/Label1', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/TimeGroup/Layout/Label2', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/TimeGroup/Layout/Label3', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/TimeGroup/Layout/Label4', this.node).color = new cc.Color().fromHEX("#FEBF01");
            }

            // 
            if (data.raw.playerData && this.tourItemInfo.raw.playerData.status != "ELIMINATED") {
                if (data.raw.tournamentType == "SIT N GO") {
                    this.btnLabel.string = "Registered";
                }
                else {
                    if (GameManager.isMobile) {
                        // this.btnLabel.string = "Enter";   
                    }
                }
                this.btnSprite.spriteFrame = this.btnFrame[1];
                if (data.raw.tournamentType == "SIT N GO") {    
                    if (data.raw.playerData.tableId) {
                        this.btnLabel.string = "Enter Table";
                        this.btnSprite.spriteFrame = this.btnFrame[2];
                    }
                }
            }
        }
        else if (this.tourItemInfo.state == "Open To Late Register") {
            if (data.raw.tournamentType == "SIT N GO") {    
                this.btnLabel.string = "Late Reg";
            }
            else {
                // if (GameManager.isMobile) {
                //     // this.btnLabel.string = "Enter";
                // }
                // else {
                    this.btnLabel.string = "Late Reg";
                // }
            }
            this.btnSprite.spriteFrame = this.btnFrame[3];
            // this.bgSprite.spriteFrame = this.bgFrame[3];
            // 
            if (!GameManager.isMobile) {
                //cc.find('RoomInfo/NameGroup/NameLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup2/BuyInLayout/Label', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/BuyInGroup/Entries/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup/Entries2/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup/Entries/Icon', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                
                //// cc.find('RoomInfo/BuyInGroup/BuyInLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //// cc.find('RoomInfo/BuyInGroup/BuyInLayout/Label', this.node).color = new cc.Color().fromHEX("#FFFFFF");

                //cc.find('RoomInfo/BuyInGroup/TimeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/NameGroup/Layout/Label1', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Label2', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Label3', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Label4', this.node).color = new cc.Color().fromHEX("#FEBF01");
            }
            else {
                //cc.find('RoomInfo/NameGroup/NameLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/NameGroup/Layout/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Entries/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/NameGroup/Layout/Entries/Icon', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                
                //cc.find('RoomInfo/BuyInGroup/BuyInLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup/BuyInLayout/Label', this.node).color = new cc.Color().fromHEX("#FFFFFF");

                //cc.find('RoomInfo/TimeGroup/TimeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/TimeGroup/Layout/Label1', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/TimeGroup/Layout/Label2', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/TimeGroup/Layout/Label3', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/TimeGroup/Layout/Label4', this.node).color = new cc.Color().fromHEX("#FEBF01");
            }

        }
        else if (this.tourItemInfo.state == "CLOSED" || this.tourItemInfo.state == "CANCELED") {
            this.btnLabel.string = (this.tourItemInfo.state == "CLOSED" ? "Closed" : "Canceled");
            this.btnSprite.spriteFrame = this.btnFrame[4];
            // this.bgSprite.spriteFrame = this.bgFrame[4];
            // if (!GameManager.isMobile) {
            //     cc.find('RoomInfo/Btn/Btn/CountDown/info', this.node).getComponent(cc.Label).string = "";
            //     cc.find('RoomInfo/Btn/Btn/CountDown/time', this.node).getComponent(cc.Label).string = "";
            //     // 
            //     //cc.find('RoomInfo/NameGroup/NameLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
            //     //cc.find('RoomInfo/BuyInGroup2/BuyInLayout/Label', this.node).color = new cc.Color().fromHEX("#FEBF01");
            //     //cc.find('RoomInfo/BuyInGroup/Entries/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
            //     //cc.find('RoomInfo/BuyInGroup/Entries2/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
            //     //cc.find('RoomInfo/BuyInGroup/Entries/Icon', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                
            //     //// cc.find('RoomInfo/BuyInGroup/BuyInLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
            //     //// cc.find('RoomInfo/BuyInGroup/BuyInLayout/Label', this.node).color = new cc.Color().fromHEX("#FFFFFF");

            //     //cc.find('RoomInfo/BuyInGroup/TimeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
            //     //cc.find('RoomInfo/NameGroup/Layout/Label1', this.node).color = new cc.Color().fromHEX("#FEBF01");
            //     //cc.find('RoomInfo/NameGroup/Layout/Label2', this.node).color = new cc.Color().fromHEX("#FEBF01");
            //     //cc.find('RoomInfo/NameGroup/Layout/Label3', this.node).color = new cc.Color().fromHEX("#FEBF01");
            //     //cc.find('RoomInfo/NameGroup/Layout/Label4', this.node).color = new cc.Color().fromHEX("#FEBF01");
            // }
            // else 
            {
                cc.find(GameManager.isMobile ? 'Btn/CountDown/info' : 'RoomInfo/BuyInGroup/CountDown/info', this.node).getComponent(cc.Label).string = "";
                cc.find(GameManager.isMobile ? 'Btn/CountDown/time' : 'RoomInfo/BuyInGroup/CountDown/time', this.node).getComponent(cc.Label).string = "";
                // 
                //cc.find('RoomInfo/NameGroup/NameLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/NameGroup/Layout/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/NameGroup/Layout/Entries/PrizeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/NameGroup/Layout/Entries/Icon', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                
                //cc.find('RoomInfo/BuyInGroup/BuyInLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/BuyInGroup/BuyInLayout/Label', this.node).color = new cc.Color().fromHEX("#FFFFFF");

                //cc.find('RoomInfo/TimeGroup/TimeLabel', this.node).color = new cc.Color().fromHEX("#FFFFFF");
                //cc.find('RoomInfo/TimeGroup/Layout/Label1', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/TimeGroup/Layout/Label2', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/TimeGroup/Layout/Label3', this.node).color = new cc.Color().fromHEX("#FEBF01");
                //cc.find('RoomInfo/TimeGroup/Layout/Label4', this.node).color = new cc.Color().fromHEX("#FEBF01");
            }
        }

        // if (!GameManager.isMobile) {
        //     cc.find('RoomInfo/NameGroup/Layout/Label1', this.node).getComponent(cc.Label).string = data.gameVariation;
        //     cc.find('RoomInfo/NameGroup/Layout/Label2', this.node).getComponent(cc.Label).string = data.isReentryAllowed ? "RE" : " ";
        //     cc.find('RoomInfo/NameGroup/Layout/Label3', this.node).getComponent(cc.Label).string = data.maxPlayers;
        //     cc.find('RoomInfo/NameGroup/Layout/Label4', this.node).getComponent(cc.Label).string = data.actionTypeFullName;
        // }
        // else 
        {
            cc.find('RoomInfo/TimeGroup/Layout/Label1', this.node).getComponent(cc.Label).string = data.gameVariation;
            cc.find('RoomInfo/TimeGroup/Layout/Label2', this.node).getComponent(cc.Label).string = data.isReentryAllowed ? "RE" : " ";
            cc.find(GameManager.isMobile ? 'RoomInfo/TimeGroup/Layout/Label3' : 'RoomInfo/TimeGroup/Layout2/Label3', this.node).getComponent(cc.Label).string = data.maxPlayers;
            cc.find(GameManager.isMobile ? 'RoomInfo/TimeGroup/Layout/Label4' : 'RoomInfo/TimeGroup/Layout2/Label4', this.node).getComponent(cc.Label).string = data.actionTypeFullName;
        }
        // if (!GameManager.isMobile) {
        //     cc.find('RoomInfo/NameGroup/Layout/Label4', this.node).getComponent(cc.Label).string = data.actionType;
        // }

        if (data.raw.tournamentType != "SIT N GO") {
            let date = new Date(data.raw.tournamentStartDetails.startTime);
            let y = date.getFullYear();
            let m = ("0" + (date.getMonth() + 1)).slice(-2);
            let d = ("0" + date.getDate()).slice(-2);
            let h = ("0" + date.getHours() ).slice(-2);
            let min = ("0" + date.getMinutes()).slice(-2);
            let sec = ("0" + date.getSeconds()).slice(-2);
            // cc.find('RoomInfo/TimeGroup/TimeLabel', this.node).getComponent(cc.Label).string = y + "-" + m + "-" + d + " " + h + ":" + min + ":" + sec;
            // if (!GameManager.isMobile) {
            //     cc.find('RoomInfo/BuyInGroup/TimeLabel', this.node).getComponent(cc.Label).string = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' }) + ", " + date.toLocaleTimeString("en-US");
            // }
            // else 
            {
                cc.find('RoomInfo/TimeGroup/TimeLabel', this.node).getComponent(cc.Label).string = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' }) + ", " + date.toLocaleTimeString("en-US").substr(0, (date.toLocaleTimeString("en-US") + " ").indexOf(" "));
            }
            
            if (this.tourItemInfo.state == "RUNNING") {
                // if (!GameManager.isMobile) {
                //     cc.find('RoomInfo/BuyInGroup/Entries/PrizeLabel', this.node).getComponent(cc.Label).string = data.raw.playerRemainingRatio.inGamePlayers + "/" + data.raw.playerRemainingRatio.registeredPlayers + " Entries";
                //     cc.find('RoomInfo/BuyInGroup/Entries2/PrizeLabel', this.node).getComponent(cc.Label).string = data.raw.playerRemainingRatio.inGamePlayers + "/" + data.raw.playerRemainingRatio.registeredPlayers + " Entries";
                // }
                // else 
                {
                    cc.find('RoomInfo/NameGroup/Layout/Entries/PrizeLabel', this.node).getComponent(cc.Label).string = data.raw.playerRemainingRatio.inGamePlayers + "/" + data.raw.playerRemainingRatio.registeredPlayers;
                }
            }
            else {
                // if (!GameManager.isMobile) {
                //     cc.find('RoomInfo/BuyInGroup/Entries/PrizeLabel', this.node).getComponent(cc.Label).string = data.raw.playerRemainingRatio.registeredPlayers + "/" + data.raw.maxPlayers + " Entries";
                //     cc.find('RoomInfo/BuyInGroup/Entries2/PrizeLabel', this.node).getComponent(cc.Label).string = data.raw.playerRemainingRatio.registeredPlayers + "/" + data.raw.maxPlayers + " Entries";
                // }
                // else 
                {
                    cc.find('RoomInfo/NameGroup/Layout/Entries/PrizeLabel', this.node).getComponent(cc.Label).string = data.raw.playerRemainingRatio.registeredPlayers;   
                }
            }
        }
        else {
            // if (!GameManager.isMobile) {
            //     cc.find('RoomInfo/BuyInGroup/Entries/PrizeLabel', this.node).getComponent(cc.Label).string = data.raw.playerRemainingRatio.inGamePlayers + "/" + data.raw.maxPlayers + " Entries";
            //     cc.find('RoomInfo/BuyInGroup/Entries2/PrizeLabel', this.node).getComponent(cc.Label).string = data.raw.playerRemainingRatio.inGamePlayers + "/" + data.raw.maxPlayers + " Entries";
            //     cc.find('RoomInfo/BuyInGroup/TimeLabel', this.node).getComponent(cc.Label).string = "   ";
            // }
            // else 
            {
                cc.find('RoomInfo/NameGroup/Layout/Entries/PrizeLabel', this.node).getComponent(cc.Label).string = data.raw.playerRemainingRatio.inGamePlayers + "/" + data.raw.maxPlayers;
                cc.find('RoomInfo/TimeGroup/TimeLabel', this.node).getComponent(cc.Label).string = "";
            }
        }

        cc.find('RoomInfo/BuyInGroup/BuyInLayout/Label', this.node).getComponent(cc.Label).string = (data.raw.entryFees || 0) + (data.raw.houseFees || 0);
        // if (!GameManager.isMobile) {
        //     cc.find('RoomInfo/BuyInGroup2/BuyInLayout/Label', this.node).getComponent(cc.Label).string = (data.raw.entryFees || 0) + (data.raw.houseFees || 0);
        //     cc.find('RoomInfo/TimeGroup/Layout/PrizeLabel', this.node).getComponent(cc.Label).string = data.guaranteedValue;
        // }
        // else 
        {
            cc.find('RoomInfo/NameGroup/Layout/PrizeLabel', this.node).getComponent(cc.Label).string = data.guaranteedValue;
        }

        

        // this.btnSprite.spriteFrame = this.btnFrame[btnIdx];
        // if (!GameManager.isMobile) {
        //     cc.find('RoomInfo/Btn/Btn/CountDown/info', this.node).getComponent(cc.Label).string = "";
        //     cc.find('RoomInfo/Btn/Btn/CountDown/time', this.node).getComponent(cc.Label).string = "";
        // }
        // else 
        {
            cc.find(GameManager.isMobile ? 'Btn/CountDown/info' : 'RoomInfo/BuyInGroup/CountDown/info', this.node).getComponent(cc.Label).string = "";
            cc.find(GameManager.isMobile ? 'Btn/CountDown/time' : 'RoomInfo/BuyInGroup/CountDown/time', this.node).getComponent(cc.Label).string = "";
        }


        if (data.raw.tournamentType != "SIT N GO") {
            if (this.tourItemInfo.state == "CLOSED" || this.tourItemInfo.state == "CANCELED") {
            }
            else {
                if (this.tourItemInfo.raw.playerData) {
                    if (this.tourItemInfo.raw.playerData.tableId) {
                        if (this.tourItemInfo.raw.isInBreak) {
                            this.btnLabel.string = "Break Time";
                            this.btnSprite.spriteFrame = this.btnFrame[1];
                        }
                        else if (this.tourItemInfo.raw.playerData.status == "ELIMINATED") {
                            this.btnLabel.string = "Eliminated";
                            this.btnSprite.spriteFrame = this.btnFrame[1];
                            this.unschedule(this.endsInTimer);
                            // if (!GameManager.isMobile) {
                            //     cc.find('RoomInfo/Btn/Btn/CountDown/time', this.node).getComponent(cc.Label).string = "";
                            // }
                            // else 
                            {
                                cc.find('Btn/CountDown/time', this.node).getComponent(cc.Label).string = "";
                            }
                        }
                        else {
                            this.btnLabel.string = "Registered";
                            this.btnSprite.spriteFrame = this.btnFrame[1];
                        }
                    }
                    else {
                        // already registered the tournament -- tournament not started yet / table not assigned
                        if (this.tourItemInfo.state == "Open To Register") {
                            this.updateStartsInTimer();
                        }
                        else {
                        }
                    }
                }
                else if (this.tourItemInfo.raw.player_list) {
                    let isInGame = false;
                    for (let id in this.tourItemInfo.raw.player_list) {
                        if (this.tourItemInfo.raw.player_list[id].playerId == GameManager.user.playerId && this.tourItemInfo.raw.player_list[id].status == "ACTIVE") {
                            isInGame = true;
                            break;
                        }
                    }
                    if (isInGame) {
                        // cc.find('RoomInfoMobile/enterTableBtn', this.tabPage[0]).active = true;
                        // cc.find('RoomInfoMobile/enterTableBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[2];
                    }
                }
                else {
                    if (this.tourItemInfo.raw.isInBreak) {
                        this.btnLabel.string = "Break Time";
                        this.btnSprite.spriteFrame = this.btnFrame[1];
                    }
                    else if (this.tourItemInfo.raw.isLateEntryOpen) {
                        this.updateEndsInTimer();
                    }
                    else if (this.tourItemInfo.state == "Open To Register") {
                        if (data.raw.tournamentType != "SIT N GO") {
                            this.updateStartsInTimer();
                        }
                    }
                    else {
                        if (this.tourItemInfo.state == "PUBLISHED") {
                            //// cc.find('Btn/CountDown/info', this.node).color = new cc.color(255, 0, 0);
                            //// cc.find('Btn/CountDown/time', this.node).color = new cc.color(255, 0, 0);
                            this.updateRegStartsInTimer();
                        }
                    }
                }
            }
            this.btnSprite.node.getComponent(cc.Button).interactable = false;
        }
        else {
            this.btnSprite.node.getComponent(cc.Button).interactable = true;
        }

        // if (!GameManager.isMobile) {
        //     cc.find('RoomInfo/BuyInGroup/TimeLabel', this.node).active = true;
        // }
        // else 
        {
            cc.find('RoomInfo/TimeGroup/TimeLabel', this.node).active = true;
        }
        // if (GameManager.isMobile) {
            cc.find('RoomInfo/TimeGroup/TimeLabel', this.node).getComponent(cc.Label).string = data.raw.payoutType;
        // }

        // 
        this.tourItemInfo.btnLabel = this.btnLabel;
        this.tourItemInfo.node = this.node;

        cc.find('icon', this.node).active = false;
        if (this.tourItemInfo.raw.roomImage) {
            let self = this;
            cc.loader.load(K.ServerAddress.assets_server_s + this.tourItemInfo.raw.roomImage, function (err, tex) {
                if (err) {   
                }
                else{
                    cc.find('icon', self.node).active = true;
                    cc.find('icon', self.node).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                }
            });
        }
    }

    updateBreakEndsTimer() {
        this.unschedule(this.startsInTimer);
        this.unschedule(this.endsInTimer);
        this.unschedule(this.regStartsInTimer);
        this.unschedule(this.breakEndsTimer);
        this.breakEndsTimer();
        this.schedule(this.breakEndsTimer, 1);
    }

    breakEndsTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(this.tourItemInfo.raw.currentTournamentBreak.breakEndTime));
        // if (!GameManager.isMobile) {
        //     cc.find('RoomInfo/Btn/Btn/CountDown/info', this.node).getComponent(cc.Label).string = "Ends in:";
        //     cc.find('RoomInfo/Btn/Btn/CountDown/time', this.node).getComponent(cc.Label).string = timeRemaining;

        //     cc.systemEvent.emit( "breakEndsTimer", {"tournamentId": this.tourItemInfo.id , "timeRemaining": timeRemaining} );
        // }
        // else 
        {
            cc.find(GameManager.isMobile ? 'Btn/CountDown/info' : 'RoomInfo/BuyInGroup/CountDown/info', this.node).getComponent(cc.Label).string = "Ends in:";
            cc.find(GameManager.isMobile ? 'Btn/CountDown/time' : 'RoomInfo/BuyInGroup/CountDown/time', this.node).getComponent(cc.Label).string = timeRemaining;
        }
    }

    updateRegStartsInTimer() {
        this.unschedule(this.startsInTimer);
        this.unschedule(this.endsInTimer);
        this.unschedule(this.regStartsInTimer);
        this.unschedule(this.breakEndsTimer);
        this.regStartsInTimer();
        this.schedule(this.regStartsInTimer, 1);
    }

    regStartsInTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(new Date(this.tourItemInfo.raw.registrationBeforeStarttime)));
        // if (!GameManager.isMobile) {
        //     cc.find('RoomInfo/Btn/Btn/CountDown/info', this.node).getComponent(cc.Label).string = "Opens in:";
        //     cc.find('RoomInfo/Btn/Btn/CountDown/time', this.node).getComponent(cc.Label).string = timeRemaining;

        //     cc.systemEvent.emit( "regStartsInTimer", {"tournamentId": this.tourItemInfo.id , "timeRemaining": timeRemaining} );
        // }
        // else 

        let date = new Date(this.tourItemInfo.raw.registrationBeforeStarttime);
        // timeRemaining = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' }) + " " + timeRemaining;
        timeRemaining = (date.toDateString().split(' ')[1]) + " " + (date.getDate()) + " " + timeRemaining;
        {
            cc.find(GameManager.isMobile ? 'Btn/CountDown/info' : 'RoomInfo/BuyInGroup/CountDown/info', this.node).getComponent(cc.Label).string = "Reg opens in:";
            cc.find(GameManager.isMobile ? 'Btn/CountDown/time' : 'RoomInfo/BuyInGroup/CountDown/time', this.node).getComponent(cc.Label).string = timeRemaining;
        }
    }

    updateStartsInTimer() {
        this.unschedule(this.startsInTimer);
        this.unschedule(this.endsInTimer);
        this.unschedule(this.regStartsInTimer);
        this.unschedule(this.breakEndsTimer);
        this.startsInTimer();
        this.schedule(this.startsInTimer, 1);
    }

    startsInTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(this.tourItemInfo.raw.tournamentStartDetails.startTime));
        // if (!GameManager.isMobile) {
        //     cc.find('RoomInfo/Btn/Btn/CountDown/info', this.node).getComponent(cc.Label).string = "Ends in:";
        //     cc.find('RoomInfo/Btn/Btn/CountDown/time', this.node).getComponent(cc.Label).string = timeRemaining;

        //     cc.systemEvent.emit( "startsInTimer", {"tournamentId": this.tourItemInfo.id , "timeRemaining": timeRemaining} );
        // }
        // else 


        let date = new Date(this.tourItemInfo.raw.tournamentStartDetails.startTime);
        // timeRemaining = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' }) + " " + timeRemaining;
        timeRemaining = (date.toDateString().split(' ')[1]) + " " + (date.getDate()) + " " + timeRemaining;

        {
            cc.find(GameManager.isMobile ? 'Btn/CountDown/info' : 'RoomInfo/BuyInGroup/CountDown/info', this.node).getComponent(cc.Label).string = "Reg ends in:";
            cc.find(GameManager.isMobile ? 'Btn/CountDown/time' : 'RoomInfo/BuyInGroup/CountDown/time', this.node).getComponent(cc.Label).string = timeRemaining;
        }
    }

    updateEndsInTimer() {
        this.unschedule(this.startsInTimer);
        this.unschedule(this.endsInTimer);
        this.unschedule(this.regStartsInTimer);
        this.unschedule(this.breakEndsTimer);
        this.endsInTimer();
        this.schedule(this.endsInTimer, 1);
    }

    endsInTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(this.tourItemInfo.raw.lateRegistrationEndTime) * 1000);
        // if (!GameManager.isMobile) {
        //     cc.find('RoomInfo/Btn/Btn/CountDown/info', this.node).getComponent(cc.Label).string = "Ends in:";
        //     cc.find('RoomInfo/Btn/Btn/CountDown/time', this.node).getComponent(cc.Label).string = timeRemaining;

        //     cc.systemEvent.emit( "endsInTimer", {"tournamentId": this.tourItemInfo.id , "timeRemaining": timeRemaining} );
        // }
        // else 

        let date = new Date(Number(this.tourItemInfo.raw.lateRegistrationEndTime) * 1000);
        // timeRemaining = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' }) + " " + timeRemaining;
        timeRemaining = (date.toDateString().split(' ')[1]) + " " + (date.getDate()) + " " + timeRemaining;
        {
            cc.find(GameManager.isMobile ? 'Btn/CountDown/info' : 'RoomInfo/BuyInGroup/CountDown/info', this.node).getComponent(cc.Label).string = "Reg ends in:";
            cc.find(GameManager.isMobile ? 'Btn/CountDown/time' : 'RoomInfo/BuyInGroup/CountDown/time', this.node).getComponent(cc.Label).string = timeRemaining;
        }
    }

    setHighlight(highlight) {
        this.highlightBg.active = highlight;

        if (highlight) {
            // if (!GameManager.isMobile) {
            //     this.scheduleOnce(function () {
            //         this.highlightBg.active = false;
            //     }, 0.3);
            // }
        }
    }

    onTournamentItemSecondClick() {
        cc.systemEvent.emit( K.SocketIOEvent.Lobby.TournamentSelect, this.tourItemInfo );      
    }

    onClick() {
        if (this.highlightBg.active) {
            if (this.tourItemInfo.raw.tournamentType == "SIT N GO") {
                return;
            }
            // if (!GameManager.isMobile) {
            //     return;
            // }
            this.onTournamentItemSecondClick();
        } else {
            globals.TournamentLobbyListPresenter.removeHighlightAll();
            this.setHighlight(true);
        }
        cc.systemEvent.emit( 'TournamentItemPicked', this.tourItemInfo ); 
    }

    onClickButton(sender) {
        console.log("onClickButton", this.tourItemInfo);
        console.log("onClickButton", sender);

        if (this.tourItemInfo.raw.tournamentType != "SIT N GO") {
            return;
        }
        if (sender.target.children[0].getComponent(cc.Label).string == "Enter Table") {
            let tableId = "";
            for (let id in this.tourItemInfo.raw.player_list) {
                if (this.tourItemInfo.raw.player_list[id].playerId == GameManager.user.playerId) {
                    tableId = this.tourItemInfo.raw.player_list[id].tableId;
                    break;
                }
            }
            if (tableId == "" && this.tourItemInfo.raw.playerData) {
                tableId = this.tourItemInfo.raw.playerData.tableId;
            }

            this.isTableExisting = false;
            this.isTournamentExisting = false;
            this.indexFound = -1;
            this.tournamentIndexFound = -1;
            // for (var index = 0; index < GameManager.gameModel.activePokerModels.length; index++) {
            //     var id = GameManager.gameModel.activePokerModels[index].tourData.id;
            //     if (this.tourData.id === id) {
            //         this.isTournamentExisting = true;
            //         this.tournamentIndexFound = index;
            //         break;
            //     }
            // }
            for (var index = 0; index < GameManager.gameModel.activePokerModels.length; index++) {
                var id = GameManager.gameModel.activePokerModels[index].roomConfig._id;
                if ((tableId ? tableId : this.tourItemInfo.raw.playerData.tableId) === id) {
                    this.indexFound = index;
                    this.isTableExisting = true;
                    break;
                }
            }
            if (this.isTableExisting) {
                // enter
                ServerCom.loading.active = false;

                if (!GameManager.isMobile && !K.GoToTable) {
                    window.versions.new({
                        "name": this.tourData.id,
                        "url": "?GoToTable=1&accesstoken=" + K.Token.access_token + "&channelid=" + this.tourData.id + "&playerId=" + GameManager.user.playerId + "&playerName=" + GameManager.user.userName + "&networkIp=" + window.ipV4Address + "&realChips=" + GameManager.user.realChips + "&isTournament=true"
                    });
                }
                else {
                    ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, this.indexFound, function () { });
                }
                return;
            }
            ServerCom.socketIOBroadcast(tableId + ":" + GameManager.user.playerId, this.onTournamentTableUserBroadcast.bind(this));
            // 
            window.TournamentLobbyHandler.requestTournamentEnterTable(
                {
                    tournamentId: this.tourItemInfo.id
                },
                (data) => {
                }, 
                (error) => {
                },
                "Enter table, please wait ......"
            );
        }
        else if (this.tourItemInfo.state == "Open To Register") {
            if (!this.tourItemInfo.raw.playerData) {

                this.tournamentBuyin.active = false;
                this.tournamentBuyin.getComponent("TournamentBuyin").setData(this.tourItemInfo, 4);
                this.tournamentBuyin.active = true;
                var anim = this.tournamentBuyin.getComponent('AnimBase');
                var inst = this;
                if (anim !== null) {
                    anim.play("showPopUp", function () {});
                }

                // window.TournamentLobbyHandler.requestTournamentSitAndGoRegister(
                //     { tournamentId: this.tourItemInfo.id },
                //     (data) => {
                //     }, 
                //     (error) => {
                //     }
                // );   
            }
            else {
                window.TournamentLobbyHandler.requestTournamentDeRegister(
                    { tournamentId: this.tourItemInfo.id },
                    (data) => {
                    }, 
                    (error) => {
                        // console.log("error", error);
                    }
                );
            }
        }
        else if (this.tourItemInfo.state == "RUNNING") {
            for (let tableId in this.tourItemInfo.raw.tablesStack) {
                tableId = tableId.slice(1);
                socketIO.socket.off(tableId + ":" + GameManager.user.playerId);
                ServerCom.socketIOBroadcast(tableId + ":" + GameManager.user.playerId, this.onTournamentTableUserBroadcast.bind(this));
                window.TournamentLobbyHandler.requestTournamentJoinTable(
                    { channelId: tableId },
                    (data) => {
                        console.log("data", data);
                    }, 
                    (error) => {
                        console.log("error", error);
                    }
                );
                break;
            }
        }
    }

    onTournamentLobbyResponseEvent(data) {
        if (data.eventName === "Res-RegisterSNG") {
            ServerCom.forceKeepLoading = false;
            ServerCom.loading.active = false;
            if (data && data.data && data.data.success && data.data.requestedTournamentId == this.tourItemInfo.id) {
                var newTableEvent = K.SocketIOBroadcast.Lobby.TournamentNewTable.replace("<TournamentId>", data.data.requestedTournamentId).replace("<PlayerId>", data.data.requesterPlayerId);

                socketIO.socket.off(newTableEvent);
                ServerCom.socketIOBroadcast(newTableEvent, this.onTournamentNewTable.bind(this));
                GameManager.popUpManager.show(PopUpType.RegDialog, 1, function () {});
            }
        }
    },

    onTournamentTableUserBroadcast(data) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>onTournamentTableUserBroadcast", data);
        if (data.eventName == "joinChannelResponse" || data.eventName == "enterChannelResponse") {

            // for (let tableId in this.tourItemInfo.raw.tablesStack) {
            //     tableId = tableId.slice(1);
            //     socketIO.off(tableId + ":" + GameManager.user.playerId);
            //     break;
            // }

            if (data.data.success) {
                GameManager.popUpManager.hideAllPopUps();
                cc.systemEvent.emit( "HideTournamentNotification");

                // socketIO.off(this.newTableData.eventData.tableId + ":" + this.newTableData.eventData.playerId);
                // socketIO.off(this.tourData.raw.playerData.tableId + ":" + this.tourData.raw.playerData.playerId);
                socketIO.socket.off(data.eventTo);
                socketIO.socket.off(data.channelId + ":" + data.playerId);
                var newTableEvent2 = K.SocketIOBroadcast.Lobby.TournamentElimination.replace("<TournamentId>", this.tourItemInfo.id).replace("<PlayerId>", data.playerId);
                socketIO.socket.off(newTableEvent2);

                if (!GameManager.isActive) {
                    ServerCom.forceKeepLoading = false;
                    ServerCom.loading.active = false;
                    return;
                }
                data.data.gameData = new GameData(data.data);
                data.data.tourData = this.tourItemInfo;
                
                if (this.isTournamentExisting) {
                    // GameManager.gameModel.activePokerModels[this.tournamentIndexFound];
                    GameManager.gameModel.activePokerModels[this.tournamentIndexFound].initiliazePoker(data.data);
                }
                else {
                    if (!GameManager.isMobile && !K.GoToTable) {
                        window.versions.new({
                            "name": this.tourItemInfo.id,
                            "url": "?GoToTable=1&accesstoken=" + K.Token.access_token + "&channelid=" + this.tourItemInfo.id + "&tableid=" + data.channelId + "&playerId=" + GameManager.user.playerId + "&playerName=" + GameManager.user.userName + "&networkIp=" + window.ipV4Address + "&realChips=" + GameManager.user.realChips + "&isTournament=true"
                        });
                    }
                    else {
                        ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, data.data, function () { });
                    }
                }
                // 
                this.scheduleOnce(function () {
                    ServerCom.forceKeepLoading = false;
                    ServerCom.loading.active = false;
                }, 1.2);

            }
            else {
                ServerCom.forceKeepLoading = false;
                ServerCom.loading.active = false;
                // 
                GameManager.popUpManager.show(
                    PopUpType.CommonDialog, 
                    {
                        "title": "Error!",
                        "content" : (data.data.info ? data.data.info : data.data.response)
                    }, 
                    function () {}
                );
            }
        }
    }

    onTournamentNewTable(data) {
        console.log("onTournamentNewTable", data);
        // cc.find('RoomInfoMobile/endTime', this.tabPage[0]).active = true;
        // this.newTableData.eventData.tableId

        ServerCom.socketIOBroadcast(data.eventData.tableId + ":" + GameManager.user.playerId, this.onTournamentTableUserBroadcast.bind(this));
        // 

        GameManager.tableStartTime = data.eventData.tableStartTime;

        if (GameManager.isActive) {
            window.TournamentLobbyHandler.requestTournamentEnterTable(
                {
                    tournamentId: this.tourItemInfo.id
                },
                (data) => {
                }, 
                (error) => {
                },
                "Enter table, please wait ......"
            );
        }
    }

    // update (dt) {}
}
