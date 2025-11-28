import globals from "../../globals";
import TournamentLobbyListItem from "./TournamentLobbyListItem";
import { TournamentLobbyPresenter } from "./TournamentLobbyPresenter";
import { TournamentNotification } from "..popup/TournamentNotification";
import { Tournament } from "../data/TournamentResponseTypes";
import { GameData } from "../../DataFormats/ResponseTypes";
import { PopUpType } from "../../Utilities/ScreensAndPopUps/PopUps/PopUpManager";
import * as DropDown from "../../Utilities/DropDowns/DropDown";

const {ccclass, property} = cc._decorator;


export enum TOURNAMENT_TYPE {
    ALL,
    SITNGO,
    KCOIN,
    NFT,
    NONE
}
export interface TournamentItem {
    tourName: string,
    startTime: string,
    buyIn: number,
    prize: number,
    entries: string

}
@ccclass
export class TournamentLobbyListPresenter extends cc.Component {

    @property(cc.Node)
    comingSoon: cc.Label = null;

    @property(cc.Node)
    top: cc.Label = null;

    @property(cc.Node)
    top2: cc.Label = null;

    @property(cc.Label)
    filterLabel: cc.Label = null;

    @property(DropDown)
    gameTypeDropdown: DropDown = null;
            
    @property(cc.SpriteFrame)
    activeSprite: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    inactiveSprite: cc.SpriteFrame = null;

    @property(cc.Color)
    activeColor: cc.Color = null;

    @property(cc.Color)
    inactiveColor: cc.Color = null;

    @property(cc.Node)
    tabs: cc.Node = null;

    @property(cc.Node)
    tournamentNotification: cc.Node = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Node)
    contentCashierAll: cc.Node = null;

    @property(cc.Node)
    contentHolderAll: cc.Node = null;

    @property(cc.Node)
    contentHolderSitNGo: cc.Node = null;

    @property(cc.Node)
    contentHolderFreeroll: cc.Node = null;

    @property(cc.Node)
    contentHolderKCoin: cc.Node = null;

    @property(cc.Node)
    contentHolderNFT: cc.Node = null;

    @property(cc.Node)
    tournamentItem: cc.Node = null;

    @property(TournamentLobbyPresenter)
    tournamentLobbyPresenter: TournamentLobbyPresenter = null;

    @property(cc.Node)
    tabNodes: cc.Node[] = [];

    @property(cc.Node)
    tabBtns0: cc.Node[] = [];

    @property(cc.Node)
    tabBtns: cc.Node[] = [];

    @property(cc.Node)
    tabBtns2: cc.Node[] = [];

    @property(cc.Node)
    header0: cc.Node = null;

    @property(cc.Node)
    header1: cc.Node = null;

    @property(cc.Node)
    header2: cc.Node = null;

    @property(cc.Node)
    tabPage: cc.Node[] = [];

    @property(cc.SpriteFrame)
    tabBtnSprite: cc.SpriteFrame[] = [];

    @property(cc.Color)
    labeActiveColor: cc.Color[] = [];    

    @property(cc.Node)
    selectedTableDetails: cc.Node = null;

    @property(cc.Node)
    selectedTableDetailsTour: cc.Node = null;
    
    curTab: TOURNAMENT_TYPE = TOURNAMENT_TYPE.NONE;

    isInitDone = false;
    currentTab = 0;
    currentTabSNG = 0;
    lockClick = false;

    filterTab = 1;

    private static _instance: TournamentLobbyListPresenter = null;
    
    public tournamentData = [];
    public currentTableData = [];
    public tourList: TournamentLobbyListItem[] = [];

    public tournamentSitNGoData = [];
    public currentTableSitNGoData = [];
    public tourSitNGoList: TournamentLobbyListItem[] = [];

    public tournamentNFTData = [];
    public currentTableNFTData = [];
    public tourNFTList: TournamentLobbyListItem[] = [];

    public tournamentAllData = [];
    public currentTableAllData = [];
    public tourAllList: TournamentLobbyListItem[] = [];

    public selectedTournament = null;

    public typeFilter = 0;
    public typeFilterSNG = 0;

    onTabChange(event, customEvent) {

    }

    setTabActive( tab: TOURNAMENT_TYPE) {
        // this.tabBtns.forEach( (t,i) => {
        //     t.active = tab === i;
        // })
        // this.setButtonActive(tab);
        // console.log('@@@@@ setTabActive ',tab)
        // this.tabPage.forEach( (page,i) => {
        //     page.active = tab == i;
        //     console.log('@@@@@ page ',i , 'active ',page.active)
        // })
    }

    onBtnClick(event, customEvent) {
        const tab = parseInt(customEvent);
        this.setTabActive(customEvent)
    }

    setButtonActive(btnID: TOURNAMENT_TYPE){
        // this.tabBtns.forEach( (btn,i) => {
        //     const index = btnID == i ? 0 : 1;
        //     btn.getComponent(cc.Sprite).spriteFrame = this.tabBtnSprite[index];
        //     btn.children[0].color = this.labeActiveColor[index];
        //     // console.log('@@@@@ page ',i , 'active ',page.active)
        // })
    }


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if( !TournamentLobbyListPresenter._instance )  {
            TournamentLobbyListPresenter._instance = this;
        }        
        globals.TournamentLobbyListPresenter = this;
        window['TournamentLobbyListPresenter'] = this;

        // this.contentHolderAll.active = true;
        // this.contentHolderKCoin.active = false;
        // this.contentHolderNFT.active = false;
        // this.contentHolderSitNGo.active = false;

        ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentList, this.onTournamentList.bind(this));
        ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentLobbyEvent, this.onTournamentLobbyEvent.bind(this));
        ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentClosed, this.onTournamentClosed.bind(this));
        ServerCom.socketIOBroadcast("Tournament:Removed", this.onTournamentRemoved.bind(this));
        ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentRefresh, this.onTournamentRefresh.bind(this));
        ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentLobbyResponseEvent, this.onTournamentLobbyResponseEvent.bind(this));
        ServerCom.socketIOBroadcast("turnBroadcast:" + GameManager.user.playerId, this.onTournamentTurnBroadcast.bind(this));
        // 
        cc.systemEvent.on(K.SocketIOEvent.Lobby.TournamentSelect, this.onTournamentSelect, this);
        cc.systemEvent.on("HideTournamentNotification", this.onHideTournamentNotification, this);

        cc.systemEvent.on('TournamentItemUnPicked', this.onTournamentItemUnPicked, this);
        cc.systemEvent.on('TournamentItemPicked', this.onTournamentItemPicked, this);

        cc.systemEvent.on( "breakEndsTimer", this.onBreakEndsTimer, this);
        cc.systemEvent.on( "regStartsInTimer", this.onRegStartsInTimer, this);
        cc.systemEvent.on( "startsInTimer", this.onStartsInTimer, this);
        cc.systemEvent.on( "endsInTimer", this.onEndsInTimer, this);

        this.tournamentData = [];

        // var gameTypeContent = ["All", "Hold'em", "Omaha"];
        // this.gameTypeDropdown.setContent(gameTypeContent);
        // this.gameTypeDropdown.registerCallback(this.applyFilter.bind(this));


        GameManager.on(K.GameEvents.onReset, function () {
            this.tourList = [];
            this.contentHolderKCoin.removeAllChildren();
            this.contentHolderNFT.removeAllChildren();
            this.contentHolderSitNGo.removeAllChildren();
            this.contentHolderAll.removeAllChildren();
            this.tournamentLobbyPresenter.leaveLobby();

            socketIO.socket.off(K.SocketIOBroadcast.Lobby.TournamentList);
            socketIO.socket.off(K.SocketIOBroadcast.Lobby.TournamentLobbyEvent);
            socketIO.socket.off(K.SocketIOBroadcast.Lobby.TournamentClosed);
            socketIO.socket.off(K.SocketIOBroadcast.Lobby.TournamentRefresh);
            socketIO.socket.off(K.SocketIOBroadcast.Lobby.TournamentLobbyResponseEvent);

            ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentList, this.onTournamentList.bind(this));
            ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentLobbyEvent, this.onTournamentLobbyEvent.bind(this));
            ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentClosed, this.onTournamentClosed.bind(this));
            ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentRefresh, this.onTournamentRefresh.bind(this));
            ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentLobbyResponseEvent, this.onTournamentLobbyResponseEvent.bind(this));

            window.TournamentLobbyHandler.requestTournamentLobbyList(
                {},
                (data) => {
                }, 
                (error) => {
                }
            );
        }.bind(this));

        this.scheduleOnce(() => {
            window.TournamentLobbyHandler.requestTournamentLobbyList(
                {},
                (data) => {
                }, 
                (error) => {
                }
            );
        }, 0.1);
    },

    onHideTournamentNotification() {
        // for(let i = 0; i < this.tournamentNotification.children.length; i ++) {
        //     this.tournamentNotification.children[i].active = false;
        // }
    },

    onEnable() {
        console.log("onEnableonEnableonEnable");

        if (this.curTab == TOURNAMENT_TYPE.NFT) {
            this.top.active = false;
            this.top2.active = true;

            // this.header0.active = false;
            // this.header1.active = true;
        }
        else {
            this.top.active = true;
            this.top2.active = false;

            // this.header0.active = true;
            // this.header1.active = false;
        }

        socketIO.socket.off(K.SocketIOBroadcast.Lobby.TournamentRefresh);


        ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentRefresh, this.onTournamentRefresh.bind(this));

        if (!GameManager.isMobile)
            this.refreshSideTable(null);

        if (GameManager.user.category == "DIAMOND") {
            this.comingSoon.active = false;
        } else {
            this.comingSoon.active = true;
        }

        this.animate(0.02);
    },

    onTournamentSelect( tourData ) {
        // console.log('onTournamentSelect', tourData);
        // this.tournamentLobbyPresenter.node.active = true;
        this.tournamentLobbyPresenter.enterLobby(tourData);
    }    

    onTournamentItemUnPicked( tourData ) {
        console.log('onTournamentItemUnPicked', tourData);

        if (!GameManager.isMobile)
            this.refreshSideTable(tourData);
    }    
    
    onTournamentItemPicked( tourData ) {
        console.log('onTournamentItemPicked', tourData);

        if (!GameManager.isMobile)
            this.refreshSideTable(tourData);
    }    

    onBreakEndsTimer( tourData ) {
        if (GameManager.isMobile)
            return;
        // if (this.selectedTournament && this.selectedTournament.id == tourData.tournamentId) {
        //     cc.find("Bottom/info", this.selectedTableDetailsTour).active = true;
        //     cc.find("Bottom/info/k", this.selectedTableDetailsTour).getComponent(cc.Label).string = "Break Time Ends in";
        //     cc.find("Bottom/info/k2", this.selectedTableDetailsTour).getComponent(cc.Label).string = tourData.timeRemaining;
        // }
    }

    onRegStartsInTimer( tourData ) {
        if (GameManager.isMobile)
            return;
        // if (this.selectedTournament && this.selectedTournament.id == tourData.tournamentId) {
        //     cc.find("Bottom/info", this.selectedTableDetailsTour).active = true;
        //     cc.find("Bottom/info/k", this.selectedTableDetailsTour).getComponent(cc.Label).string = "Registration Starts in";
        //     cc.find("Bottom/info/k2", this.selectedTableDetailsTour).getComponent(cc.Label).string = tourData.timeRemaining;
        // }
    }

    onStartsInTimer( tourData ) {
        if (GameManager.isMobile)
            return;
        // if (this.selectedTournament && this.selectedTournament.id == tourData.tournamentId) {
        //     cc.find("Bottom/info", this.selectedTableDetailsTour).active = true;
        //     cc.find("Bottom/info/k", this.selectedTableDetailsTour).getComponent(cc.Label).string = "Registration Ends in";
        //     cc.find("Bottom/info/k2", this.selectedTableDetailsTour).getComponent(cc.Label).string = tourData.timeRemaining;
        // }
    }

    onEndsInTimer( tourData ) {
        if (GameManager.isMobile)
            return;
        // if (this.selectedTournament && this.selectedTournament.id == tourData.tournamentId) {
        //     cc.find("Bottom/info", this.selectedTableDetailsTour).active = true;
        //     cc.find("Bottom/info/k", this.selectedTableDetailsTour).getComponent(cc.Label).string = "Late Registration Ends in";
        //     cc.find("Bottom/info/k2", this.selectedTableDetailsTour).getComponent(cc.Label).string = tourData.timeRemaining;
        // }
    }


    refreshSideTable (tourData) {
        if (GameManager.isMobile) {
            return;
        }
        return;

        this.selectedTableDetails.active = false;
        this.selectedTableDetailsTour.active = true;
        cc.find("Bottom/New Node/TournamentLobbyButton", this.selectedTableDetailsTour).active = false;
        cc.find("Bottom/New Node/TournamentLobbyButton2", this.selectedTableDetailsTour).active = false;
        cc.find("Bottom/bgHolder/bg4", this.selectedTableDetailsTour).active = false;
        cc.find("Bottom/bgHolder/bg5", this.selectedTableDetailsTour).active = false;

        cc.find("Head/TableName", this.selectedTableDetailsTour).getComponent(cc.Label).string = "";
        cc.find("AvgNWaiting/state", this.selectedTableDetailsTour).getComponent(cc.Label).string = "";
        cc.find("AvgNWaiting/memver_bar/playerCount", this.selectedTableDetailsTour).getComponent(cc.Label).string = "0/0";

        cc.find("Bottom/info", this.selectedTableDetailsTour).active = false;
        cc.find("Bottom/bgHolder/bg1/v", this.selectedTableDetailsTour).getComponent(cc.Label).string = "";
        cc.find("Bottom/bgHolder/bg2/v", this.selectedTableDetailsTour).getComponent(cc.Label).string = "";
        cc.find("Bottom/bgHolder/bg3/v", this.selectedTableDetailsTour).getComponent(cc.Label).string = "";
        // cc.find("Bottom/bgHolder/bg4/v", this.selectedTableDetailsTour).getComponent(cc.Label).string = "";
        // cc.find("Bottom/bgHolder/bg5/v", this.selectedTableDetailsTour).getComponent(cc.Label).string = "";

        this.selectedTournament = null;
        if (tourData) {
            this.selectedTournament = tourData;

            if (tourData.raw.tournamentType != "SIT N GO") {
                cc.find("Bottom/New Node/TournamentLobbyButton2", this.selectedTableDetailsTour).active = true;
            }
            else {
                cc.find("Bottom/New Node/TournamentLobbyButton2", this.selectedTableDetailsTour).active = false;
                cc.find("Bottom/info", this.selectedTableDetailsTour).active = false;
            }
            cc.find("Bottom/New Node/TournamentLobbyButton", this.selectedTableDetailsTour).active = true;
            cc.find("Bottom/New Node/TournamentLobbyButton/scaler/New Label", this.selectedTableDetailsTour).getComponent(cc.Label).string = tourData.state;
            cc.find("Head/TableName", this.selectedTableDetailsTour).getComponent(cc.Label).string = tourData.tournamentName;
            cc.find("AvgNWaiting/state", this.selectedTableDetailsTour).getComponent(cc.Label).string = tourData.btnLabel.string;
            cc.find("AvgNWaiting/memver_bar/playerCount", this.selectedTableDetailsTour).getComponent(cc.Label).string = cc.find('RoomInfo/BuyInGroup/Entries/PrizeLabel', tourData.node).getComponent(cc.Label).string.replace(" Entries", "");

            cc.find("Bottom/bgHolder/bg1/v", this.selectedTableDetailsTour).getComponent(cc.Label).string = tourData.guaranteedValue;
            cc.find("Bottom/bgHolder/bg2/v", this.selectedTableDetailsTour).getComponent(cc.Label).string = (tourData.raw.entryFees || 0) + (tourData.raw.houseFees || 0);
            cc.find("Bottom/bgHolder/bg3/v", this.selectedTableDetailsTour).getComponent(cc.Label).string = tourData.noOfChipsAtGameStart;


            if (tourData.state == "Open To Register") {
            }
            else if (tourData.state == "PUBLISHED") {
            }
            else if (tourData.state == "RUNNING") {
                cc.find("Bottom/bgHolder/bg4", this.selectedTableDetailsTour).active = true;
                cc.find("Bottom/bgHolder/bg5", this.selectedTableDetailsTour).active = true;
                cc.find("Bottom/bgHolder/bg4/v", this.selectedTableDetailsTour).getComponent(cc.Label).string = GameManager.getTimePassed(tourData.tournamentStartTime, false);
                cc.find("Bottom/bgHolder/bg5/v", this.selectedTableDetailsTour).getComponent(cc.Label).string = "Level " + tourData.currentBlindLevel.level
                cc.find("Bottom/bgHolder/bg5/v2", this.selectedTableDetailsTour).getComponent(cc.Label).string = tourData.currentBlindLevel.smallBlind + "/" + tourData.currentBlindLevel.bigBlind + " Ante " + tourData.currentBlindLevel.ante;
            }
            else if (tourData.state == "Open To Late Register") {
                cc.find("Bottom/bgHolder/bg4", this.selectedTableDetailsTour).active = true;
                cc.find("Bottom/bgHolder/bg5", this.selectedTableDetailsTour).active = true;
                cc.find("Bottom/bgHolder/bg4/v", this.selectedTableDetailsTour).getComponent(cc.Label).string = GameManager.getTimePassed(tourData.tournamentStartTime, false);
                cc.find("Bottom/bgHolder/bg5/v", this.selectedTableDetailsTour).getComponent(cc.Label).string = "Level " + tourData.currentBlindLevel.level;
                cc.find("Bottom/bgHolder/bg5/v2", this.selectedTableDetailsTour).getComponent(cc.Label).string = tourData.currentBlindLevel.smallBlind + "/" + tourData.currentBlindLevel.bigBlind + " Ante " + tourData.currentBlindLevel.ante;
            }
            else if (tourData.state == "CLOSED" || tourData.state == "CANCELED") {
            }
        }
        else {
            this.selectedTableDetailsTour.active = false;
        }
    },

    onTournamentLobbyButton() {
        if (this.selectedTournament) {
            this.tournamentLobbyPresenter.enterLobby(this.selectedTournament);
        }
    },

    refreshIndex() {
        for (let i = 0; i < this.contentHolderKCoin.children.length; i ++) {
            let child = this.contentHolderKCoin.children[i];
            child.getComponent(TournamentLobbyListItem).initIndex(i);
        }
        for (let i = 0; i < this.contentHolderNFT.children.length; i ++) {
            let child = this.contentHolderNFT.children[i];
            child.getComponent(TournamentLobbyListItem).initIndex(i);
        }
        for (let i = 0; i < this.contentHolderAll.children.length; i ++) {
            let child = this.contentHolderAll.children[i];
            child.getComponent(TournamentLobbyListItem).initIndex(i);
        }
        for (let i = 0; i < this.contentHolderSitNGo.children.length; i ++) {
            let child = this.contentHolderSitNGo.children[i];
            child.getComponent(TournamentLobbyListItem).initIndex(i);
        }
    }

    createTournamentList(data) {
        this.tourList = [];
        this.contentHolderKCoin.removeAllChildren();
        this.contentHolderNFT.removeAllChildren();
        for (let tournamentId in data) {
            let tournamentInfo = data[tournamentId];
            // if (tournamentInfo.state == "CLOSED") {
            //     continue;
            // }

            if (tournamentInfo.tournamentType != "freeRoll") {
                const instance =  cc.instantiate(this.tournamentItem);
                instance.setPosition(0, 0);
                instance.active = true;
                // instance.opacity = 0;
                this.contentHolderKCoin.insertChild(instance, 0);
                const tableContent = instance.getComponent(TournamentLobbyListItem);
                this.tourList.push(tableContent)
                tableContent.initInfo(new Tournament(data[tournamentId]));
            }
            else {
                const instance =  cc.instantiate(this.tournamentItem);
                instance.setPosition(0, 0);
                instance.active = true;
                // instance.opacity = 0;
                this.contentHolderNFT.insertChild(instance, 0);
                const tableContent = instance.getComponent(TournamentLobbyListItem);
                this.tourNFTList.push(tableContent)
                tableContent.initInfo(new Tournament(data[tournamentId]));
            }
            // 
            if (tournamentInfo.tournamentType != "freeRoll") {
                const instance3 = cc.instantiate(this.tournamentItem);
                instance3.setPosition(0, 0);
                instance3.active = true;
                // instance3.opacity = 0;
                this.contentHolderAll.insertChild(instance3, 0);
                const tableContent3 = instance3.getComponent(TournamentLobbyListItem);
                tableContent3.initInfo(new Tournament(tournamentInfo));
            }

            console.log("tournamentInfo", tournamentInfo);
        }
        // 
        this.refreshIndex();
        this.updateTablesFilterType();
    }

    onTournamentTurnBroadcast(data) {
        console.log("onTournamentTurnBroadcast", data);

        // this.tourList.forEach( t => {
        //     t.setHighlight(false);
        // });
        // this.tourSitNGoList.forEach( t => {
        //     t.setHighlight(false);
        // });

        if (ScreenManager.currentScreen == K.ScreenEnum.GamePlayScreen) {
            return;
        }

        let tourData = null;
        for(let i = 0; i < this.tourList.length; i ++) {
            console.log("this.tourList", this.tourList[i].tourItemInfo);
            if (data.eventData.tournamentId == this.tourList[i].tourItemInfo.id) {
                tourData = this.tourList[i].tourItemInfo;
                break;
            }
        }
        if (!tourData) {
            for(let i = 0; i < this.tourSitNGoList.length; i ++) {
                console.log("this.tourSitNGoList", this.tourSitNGoList[i].tourItemInfo);
                if (data.eventData.tournamentId == this.tourSitNGoList[i].tourItemInfo.id) {
                    tourData = this.tourSitNGoList[i].tourItemInfo;
                    break;
                }
            }
        }

        if (tourData) {
            let target = null;
            // for(let i = 0; i < this.tournamentNotification.children.length; i ++) {
            //     let child = this.tournamentNotification.children[i];
            //     if (child.getComponent("TournamentNotification").data && child.getComponent("TournamentNotification").data.tournamentId == data.eventData.tournamentId) {
            //         target = child;
            //         break;
            //     }
            // }
            // if (!target) {
            //     for(let i = 0; i < this.tournamentNotification.children.length; i ++) {
            //         let child = this.tournamentNotification.children[i];
            //         if (child.getComponent("TournamentNotification").data == null) {
            //             target = child;
            //             break;
            //         }
            //     }
            // }

            // if (target) {
            //     target.getComponent("TournamentNotification").setData(data, tourData, 0);
            //     target.getComponent("TournamentNotification").show();
            // }
        }
    }

    createTournamentSitNGoList(data) {
        // this.currentTableSitNGoData = data || [];
        this.tourSitNGoList = [];
        this.contentHolderSitNGo.removeAllChildren();
        for (let i = 0; i < data.length; i ++) {
            let stage = data[i];
            if (stage.tournaments.length <= 0) {
                continue;
            }
            for (let j = 0; j < stage.tournaments.length; j ++) {
                let tournamentInfo = stage.tournaments[j];
                // if (tournamentInfo.state == "CLOSED") {
                //     continue;
                // }
                let tournamentId = tournamentInfo._id; 
                const instance =  cc.instantiate(this.tournamentItem);
                instance.setPosition(0, 0);
                instance.active = true;
                // instance.opacity = 0;
                this.contentHolderSitNGo.insertChild(instance, 0);
                const tableContent = instance.getComponent(TournamentLobbyListItem);
                this.tourSitNGoList.push(tableContent)
                tableContent.initInfo(new Tournament(tournamentInfo));
                // 
                const instance3 = cc.instantiate(this.tournamentItem);
                instance3.setPosition(0, 0);
                instance3.active = true;
                // instance3.opacity = 0;
                this.contentHolderAll.insertChild(instance3, this.tourList.length);
                const tableContent3 = instance3.getComponent(TournamentLobbyListItem);
                tableContent3.initInfo(new Tournament(tournamentInfo));
            }
        }
        this.refreshIndex();
        this.updateTablesFilterType();
    }

    removeHighlightAll() {
        this.tourList.forEach( t => {
            t.setHighlight(false);
        });
        this.tourNFTList.forEach( t => {
            t.setHighlight(false);
        });
        this.tourSitNGoList.forEach( t => {
            t.setHighlight(false);
        });
        this.tourAllList.forEach( t => {
            t.setHighlight(false);
        });
    },

    // 
    onTournamentList(data) {
        // console.log("onTournamentList");
        if (data.eventName === "Res-GetUserProfile") {
            if (data && data.data && data.data.response) {
                // console.log("Res-GetUserProfile");
            }
        } 
        else if (data.eventName === "Res-GetAllTournamentList") {
            if (data && data.data && data.data.response) {
                // console.log("Res-GetAllTournamentList");   
                // this.tournamentData = data.data.response;
                this.isInitDone = true;
                this.createTournamentList( data.data.response );
                // 
                window.TournamentLobbyHandler.requestTournamentSitAndGoStages(
                    {},
                    (data) => {
                        // console.log("requestTournamentLobbyList okokok");
                        // this.createTournamentList( this.tournamentData );
                    }, 
                    (error) => {
                    }
                );
            }
        }
        else if (data.eventName === "Res-GetSitNGoStages") {
            if (data && data.data && data.data.response) {
                console.log("Res-GetSitNGoStages");   

                this.isInitDone = true;
                this.createTournamentSitNGoList( data.data.response );

                // this.animate(0.02);
            }
        }
    },

    onTournamentLobbyEvent(data) {
        // console.log("onTournamentLobbyEvent");
    },

    onTournamentUpdated(data) {
        console.log(">>>>>>>>>> onTournamentUpdated in lobby");
        console.log(data);
    },

    onTournamentClosed(data) {
        // console.log("onTournamentUpdated");
        this.onTournamentRefresh(data);
    },

    onTournamentRemoved(data) {
        if (!this.isInitDone) {
            return;
        }
        let isFound = false;
        for (var i = 0; i < this.contentHolderAll.children.length; i++) {
            let instance = this.contentHolderAll.children[i];
            let tourItemInfo = instance.getComponent(TournamentLobbyListItem).tourItemInfo;
            if (data.tournamentId == tourItemInfo.id) {
                isFound = true;
                this.contentHolderAll.children[i].removeFromParent(true);
            }
        }
        if (isFound) {
            // update
            for (var i = 0; i < this.contentHolderKCoin.children.length; i++) {
                let instance = this.contentHolderKCoin.children[i];
                let tourItemInfo = instance.getComponent(TournamentLobbyListItem).tourItemInfo;
                if (data.tournamentId == tourItemInfo.id) {
                    this.contentHolderKCoin.children[i].removeFromParent(true);
                    break;
                }
            }
            for (var i = 0; i < this.contentHolderNFT.children.length; i++) {
                let instance = this.contentHolderNFT.children[i];
                let tourItemInfo = instance.getComponent(TournamentLobbyListItem).tourItemInfo;
                if (data.tournamentId == tourItemInfo.id) {
                    this.contentHolderKCoin.children[i].removeFromParent(true);
                    break;
                }
            }
            for (var i = 0; i < this.contentHolderSitNGo.children.length; i++) {
                let instance = this.contentHolderSitNGo.children[i];
                let tourItemInfo = instance.getComponent(TournamentLobbyListItem).tourItemInfo;
                if (data.tournamentId == tourItemInfo.id) {
                    this.contentHolderSitNGo.children[i].removeFromParent(true);
                    break;
                }
            } 
        }
    },

    onTournamentRefresh(data) {
        if (K.GoToTable) {
            return;
        }
        if (!this.isInitDone) {
            return;
        }
        cc.systemEvent.emit(K.SocketIOEvent.Lobby.TournamentRefresh, data);
        console.log(">>>>>>>>>> onTournamentRefresh in lobby");
        // 
        let isFound = false;
        for (var i = 0; i < this.contentHolderAll.children.length; i++) {
            let instance = this.contentHolderAll.children[i];
            let tourItemInfo = instance.getComponent(TournamentLobbyListItem).tourItemInfo;
            if (data._id == tourItemInfo.id) {
                isFound = true;
                // if (data.state == "CLOSED") {
                //     this.contentHolderAll.children[i].removeFromParent(true);
                // }
                // else {
                    this.contentHolderAll.children[i].getComponent(TournamentLobbyListItem).initInfo(new Tournament(data));
                // }
                break;
            }
        }
        if (!isFound) {

            for (var i = 0; i < this.contentHolderNFT.children.length; i++) {
                let instance = this.contentHolderNFT.children[i];
                let tourItemInfo = instance.getComponent(TournamentLobbyListItem).tourItemInfo;
                if (data._id == tourItemInfo.id) {

                    isFound = true;
                    this.contentHolderNFT.children[i].getComponent(TournamentLobbyListItem).initInfo(new Tournament(data));
                    break;
                }
            }
        }


        if (!isFound) {
            // if (data.state != "CLOSED") {
                if (data.tournamentType != "SIT N GO") {
                    if (data.tournamentType != "freeRoll") {
                        const instance1 =  cc.instantiate(this.tournamentItem);
                        instance1.setPosition(0, 0);
                        instance1.active = true;
                        this.contentHolderKCoin.insertChild(instance1, 0);
                        const tableContent1 = instance1.getComponent(TournamentLobbyListItem);
                        tableContent1.initInfo(new Tournament(data));
                    }
                    else {
                        const instance1 =  cc.instantiate(this.tournamentItem);
                        instance1.setPosition(0, 0);
                        instance1.active = true;
                        this.contentHolderNFT.insertChild(instance1, 0);
                        const tableContent1 = instance1.getComponent(TournamentLobbyListItem);
                        tableContent1.initInfo(new Tournament(data));
                    }

                    if (data.tournamentType != "freeRoll") {
                        const instance3 = cc.instantiate(this.tournamentItem);
                        instance3.setPosition(0, 0);
                        instance3.active = true;
                        this.contentHolderAll.insertChild(instance3, 0);
                        const tableContent3 = instance3.getComponent(TournamentLobbyListItem);
                        tableContent3.initInfo(new Tournament(data));
                    }
                }
                else {
                    const instance2 =  cc.instantiate(this.tournamentItem);
                    instance2.setPosition(0, 0);
                    instance2.active = true;
                    this.contentHolderSitNGo.insertChild(instance2, 0);
                    const tableContent2 = instance2.getComponent(TournamentLobbyListItem);
                    tableContent2.initInfo(new Tournament(data));   

                    const instance3 = cc.instantiate(this.tournamentItem);
                    instance3.setPosition(0, 0);
                    instance3.active = true;
                    this.contentHolderAll.insertChild(instance3, 0);
                    const tableContent3 = instance3.getComponent(TournamentLobbyListItem);
                    tableContent3.initInfo(new Tournament(data));
                }
            // }
        }
        else {
            // update
            if (data.tournamentType != "SIT N GO") {
                for (var i = 0; i < this.contentHolderKCoin.children.length; i++) {
                    let instance = this.contentHolderKCoin.children[i];
                    let tourItemInfo = instance.getComponent(TournamentLobbyListItem).tourItemInfo;
                    if (data._id == tourItemInfo.id) {
                        // if (data.state == "CLOSED") {
                            // this.contentHolderKCoin.children[i].removeFromParent(true);
                        // }
                        // else {
                            this.contentHolderKCoin.children[i].getComponent(TournamentLobbyListItem).initInfo(new Tournament(data));

                            if (this.selectedTournament && this.selectedTournament.id == tourItemInfo.id) {
                                this.refreshSideTable(this.selectedTournament);
                            }
                        // }
                        break;
                    }
                }
                // for (var i = 0; i < this.contentHolderNFT.children.length; i++) {
                //     let instance = this.contentHolderNFT.children[i];
                //     let tourItemInfo = instance.getComponent(TournamentLobbyListItem).tourItemInfo;
                //     if (data._id == tourItemInfo.id) {
                //         // if (data.state == "CLOSED") {
                //             // this.contentHolderKCoin.children[i].removeFromParent(true);
                //         // }
                //         // else {
                //             this.contentHolderNFT.children[i].getComponent(TournamentLobbyListItem).initInfo(new Tournament(data));

                //             if (this.selectedTournament && this.selectedTournament.id == tourItemInfo.id) {
                //                 this.refreshSideTable(this.selectedTournament);
                //             }
                //         // }
                //         break;
                //     }
                // }
            }
            else {
                for (var i = 0; i < this.contentHolderSitNGo.children.length; i++) {
                    let instance = this.contentHolderSitNGo.children[i];
                    let tourItemInfo = instance.getComponent(TournamentLobbyListItem).tourItemInfo;
                    if (data._id == tourItemInfo.id) {
                        // if (data.state == "CLOSED") {
                        //     this.contentHolderSitNGo.children[i].removeFromParent(true);
                        // }
                        // else {
                            this.contentHolderSitNGo.children[i].getComponent(TournamentLobbyListItem).initInfo(new Tournament(data));

                            if (this.selectedTournament && this.selectedTournament.id == tourItemInfo.id) {
                                this.refreshSideTable(this.selectedTournament);
                            }
                        // }
                        break;
                    }
                } 
            }
        }

        this.updateTablesFilterType();
    },

    animate (interval=0.05) {
        for (let i = 0; i < this.scrollView.content.children.length; i ++) {
            let child = this.scrollView.content.children[i];
            child.opacity = 0;
            this.scheduleOnce(() => {
                console.log("animate");
                child.opacity = 255;
                child.x = 1000;
                child.runAction(
                    cc.sequence(
                        cc.moveTo(0.3, cc.v2(0, child.y)),
                        cc.callFunc(() => {
                            // child.x = 0;
                            console.log("animate done");
                        })
                    )
                );
            }, interval * i);
        }
    }

    onShowAll () {
        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 1);

        if (GameManager.lobbyListType == 2) {
            return;
        }
        this.setActiveButton(this.tabBtns0[0], this.tabBtns0[1]);
        this.setActiveButton(this.tabBtns0[0], this.tabBtns0[2]);
        this.setActiveButton(this.tabBtns0[0], this.tabBtns0[3]);

        this.curTab = TOURNAMENT_TYPE.ALL;
        this.contentHolderAll.active = true;
        this.contentHolderKCoin.active = false;
        this.contentHolderSitNGo.active = false;
        this.contentHolderNFT.active = false;
        this.contentCashierAll.active = false;
        this.scrollView.content = this.contentHolderAll;
        GameManager.playSound(K.Sounds.click);

        this.animate();
    },


    onShowTournament () {

        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 1);

        // this.header1.active = true;
        // this.header2.active = false;
        // if (!GameManager.isMobile) {
        //     this.filterLabel.string = "Start time";
        // }
        if (this.gameTypeDropdown) {
            this.gameTypeDropdown.node.parent.active = true;
        }
        this.setActiveButton(this.tabBtns0[1], this.tabBtns0[0]);
        this.setActiveButton(this.tabBtns0[1], this.tabBtns0[2]);
        this.setActiveButton(this.tabBtns0[1], this.tabBtns0[3]);

        this.refreshSideTable(null);
        this.curTab = TOURNAMENT_TYPE.KCOIN;
        this.contentHolderAll.active = false;
        this.contentHolderKCoin.active = true;
        this.contentHolderSitNGo.active = false;
        this.contentHolderNFT.active = false;
        this.contentCashierAll.active = false;
        this.scrollView.content = this.contentHolderKCoin;
        GameManager.playSound(K.Sounds.click);

        this.animate();
    },

    onShowSitNGo () {

        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 1);

        if (!GameManager.isMobile) {
            // this.filterLabel.string = "Players";
        }
        // this.header1.active = false;
        // this.header2.active = true;
        if (this.gameTypeDropdown) {
            this.gameTypeDropdown.node.parent.active = false;
        }
        this.setActiveButton(this.tabBtns0[2], this.tabBtns0[0]);
        this.setActiveButton(this.tabBtns0[2], this.tabBtns0[1]);
        this.setActiveButton(this.tabBtns0[2], this.tabBtns0[3]);

        this.refreshSideTable(null);
        this.curTab = TOURNAMENT_TYPE.SITNGO;
        this.contentHolderAll.active = false;
        this.contentHolderKCoin.active = false;
        this.contentHolderSitNGo.active = true;
        this.contentCashierAll.active = false;
        this.contentHolderNFT.active = false;
        this.scrollView.content = this.contentHolderSitNGo;
        GameManager.playSound(K.Sounds.click);

        this.animate();
    },

    onShowTournamentNFT () {

        if (this.lockClick) {
            return;
        }
        this.lockClick = true;
        this.scheduleOnce(() => {
            this.lockClick = false;
        }, 1);
        
        this.refreshSideTable(null);
        this.curTab = TOURNAMENT_TYPE.NFT;
        this.contentHolderAll.active = false;
        this.contentHolderKCoin.active = false;
        this.contentHolderSitNGo.active = false;
        this.contentHolderNFT.active = true;
        this.contentCashierAll.active = false;
        this.scrollView.content = this.contentHolderNFT;
        GameManager.playSound(K.Sounds.click);

        this.setActiveButton(this.tabBtns0[3], this.tabBtns0[0]);
        this.setActiveButton(this.tabBtns0[3], this.tabBtns0[1]);
        this.setActiveButton(this.tabBtns0[3], this.tabBtns0[2]);

        this.animate();
    },



    onTournamentLobbyResponseEvent(data) {
        // if (data.eventName === "Res-RegisterSNG") {
        //     if (data && data.data && data.data.success) {
        //         GameManager.popUpManager.show(PopUpType.RegDialog, 1, function () {});
        //     }
        // }
        if (data.eventName === "Res-GetTournamentData") {
            this.onTournamentRefresh(data.data.response);
        }
    },

    onFreeroll() {
        this.typeFilter = 1;
        this.setActiveButton(this.tabBtns[1], this.tabBtns[this.currentTab]);
        this.updateTablesFilterType();
        this.currentTab = 1;
    },

    onGaurenteed() {
        this.typeFilter = 2;
        this.setActiveButton(this.tabBtns[2], this.tabBtns[this.currentTab]);
        this.updateTablesFilterType();
        this.currentTab = 2;
    },

    onAll() {
        this.typeFilter = 0;
        this.setActiveButton(this.tabBtns[0], this.tabBtns[this.currentTab]);
        this.updateTablesFilterType();
        this.currentTab = 0;
    },

    onAllSNG() {
        this.typeFilterSNG = 0;
        this.setActiveButton(this.tabBtns2[0], this.tabBtns2[this.currentTabSNG]);
        this.updateTablesFilterType();
        this.currentTabSNG = 0;
    },

    onHolemSNG() {
        this.typeFilterSNG = 1;
        this.setActiveButton(this.tabBtns2[1], this.tabBtns2[this.currentTabSNG]);
        this.updateTablesFilterType();
        this.currentTabSNG = 1;
    },

    onOhamaSNG() {
        this.typeFilterSNG = 2;
        this.setActiveButton(this.tabBtns2[2], this.tabBtns2[this.currentTabSNG]);
        this.updateTablesFilterType();
        this.currentTabSNG = 2;
    },

    updateTablesFilterType() {
        // let game = this.gameTypeDropdown.getSelection();

        for (let i = 0; i < this.contentHolderKCoin.children.length; i ++) {
            let child = this.contentHolderKCoin.children[i];
            child.active = true;
            let tourItemInfo = child.getComponent(TournamentLobbyListItem).tourItemInfo;
            console.log("contentHolderKCoin tourItemInfo", tourItemInfo);

            if (this.typeFilter == 1) {
                if (tourItemInfo.tournamentType != "freeRoll") {
                    child.active = false;
                }
            }
            else if (this.typeFilter == 2) {
                if (!tourItemInfo.isGtdEnabled) {
                    child.active = false;
                }
            }
            

            if (this.typeFilterSNG == 2) {
                if (tourItemInfo.gameVariation == "PLO") {
                    child.active = false;
                }
            }
            else if (this.typeFilterSNG == 1) {
                if (tourItemInfo.gameVariation == "NLH") {
                    child.active = false;
                }
            }
        }

        for (let i = 0; i < this.contentHolderSitNGo.children.length; i ++) {
            let child = this.contentHolderSitNGo.children[i];
            child.active = true;
            let tourItemInfo = child.getComponent(TournamentLobbyListItem).tourItemInfo;
            console.log("contentHolderSitNGo tourItemInfo", tourItemInfo);

            if (this.typeFilterSNG == 1) {
                if (tourItemInfo.gameVariation == "Omaha") {
                    child.active = false;
                }
            }
            else if (this.typeFilterSNG == 2) {
                if (tourItemInfo.gameVariation == "Texas Hold’em") {
                    child.active = false;
                }
            }

            // if (game == "All") {

            // }
            // else if (game == "Hold'em") {
            //     if (tourItemInfo.gameVariation == "Omaha") {
            //         child.active = false;
            //     }
            // }
            // else if (game == "Omaha") {
            //     if (tourItemInfo.gameVariation == "Texas Hold’em") {
            //         child.active = false;
            //     }
            // }
        }
    },

    onFilter() {
        this.filterTab += 1;
        if (this.filterTab > 2) {
            this.filterTab = 1;
        }
        if (this.filterTab == 1) {
            this.header0.active = true;
            this.header1.active = false;
            this.header2.active = false;
        }
        else if (this.filterTab == 2) {
            this.header0.active = false;
            this.header1.active = true;
            this.header2.active = false;
        }
        else if (this.filterTab == 3) {
            this.header0.active = false;
            this.header1.active = false;
            this.header2.active = true;
        }
    },

    onFilterHoldem() {
        
    },

    onFilterOhama() {
        
    },

    onFilterAll() {
        
    },

    setActiveButton (currBtn, prevBtn) {
        if (prevBtn !== null)
        {
            // prevBtn.getComponent(cc.Sprite).spriteFrame = this.inactiveSprite;
            prevBtn.getChildByName("pressed").active = false;
            // prevBtn.getChildByName("Label").color = this.inactiveColor;
            prevBtn.getChildByName("Label").color = new cc.Color().fromHEX("#FFFFFF");
        }
        // currBtn.getComponent(cc.Sprite).spriteFrame = this.activeSprite;
        // currBtn.getChildByName("Label").color = this.activeColor;
        currBtn.getChildByName("pressed").active = true;
        currBtn.getChildByName("Label").color = new cc.Color().fromHEX("#531400");

    },

    applyFilter () {
        // let game = this.gameTypeDropdown.getSelection();
        // console.log("game", game);

        this.updateTablesFilterType();
    }

    // onTournamentBroadcast(data) {
    //     console.log("onTournamentBroadcast");
    // },

}

