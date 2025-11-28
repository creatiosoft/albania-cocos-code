import { JoinChannel } from "../../DataFormats/PostTypes";
import { GameData } from "../../DataFormats/ResponseTypes";
import { Tournament } from "../data/TournamentResponseTypes";
import { PopUpType } from "../../Utilities/ScreensAndPopUps/PopUps/PopUpManager";
import { Login } "../../DataFormats/PostTypes";

const {ccclass, property} = cc._decorator;
export enum TOUR_LOBBY_TAB {
    INFO = 0,
    TABLE,
    BLIND_STRUCT
}
@ccclass
export class TournamentLobbyPresenter extends cc.Component {

    private static _instance: TournamentLobbyPresenter = null;

    @property(cc.Label)
    header1: cc.Label = null;

    @property(cc.Label)
    header2: cc.Label = null;

    @property(cc.Label)
    header3: cc.Label = null;

    @property(cc.Node)
    reentryBtn: cc.Node = null;

    @property(cc.Node)
    enterTableBtn: cc.Node = null;

    @property(cc.Node)
    deRegisterTableBtn: cc.Node = null;

    @property(cc.Node)
    lateRegisterBtn: cc.Node = null;

    @property(cc.Node)
    registerBtn: cc.Node = null;

    @property(cc.Node)
    stateBtn: cc.Node = null;

    @property(cc.Node)
    CountDown: cc.Node = null;

    @property(cc.Label)
    CountDowninfo: cc.Label = null;

    @property(cc.Label)
    CountDowntime: cc.Label = null;

    @property(cc.Label)
    desc: cc.Label = null;

    @property(cc.Label)
    late: cc.Label = null;

    @property(cc.Label)
    minmaxPlayers: cc.Label = null;

    @property(cc.Label)
    curBlindInfo: cc.Label = null;

    @property(cc.Label)
    nextBlindInfo: cc.Label = null;

    @property(cc.Label)
    timerBlindInfo: cc.Label = null;

    @property(cc.Label)
    playerPerTables: cc.Label = null;

    @property(cc.Label)
    isReentryAllowed: cc.Label = null;

    @property(cc.Label)
    isRebuyAllowed: cc.Label = null;

    @property(cc.Label)
    isAddonAllowed: cc.Label = null;

    @property(cc.Label)
    registrationBeforeStarttime: cc.Label = null;

    @property(cc.Label)
    tournamentStartTime: cc.Label = null;    

    @property(cc.Label)
    startingChips: cc.Label = null;
    
    @property(cc.Label)
    status: cc.Label = null;

    @property(cc.Label)
    gameType: cc.Label = null;

    @property(cc.Label)
    tournamentName: cc.Label = null;

    @property(cc.Label)
    guaranteedValue: cc.Label = null;

    @property(cc.Label)
    entryFees: cc.Label = null;

    @property(cc.Label)
    uniqueEntries: cc.Label = null;

    @property(cc.Label)
    reentriesCount: cc.Label = null;

    @property(cc.Label)
    highestStack: cc.Label = null;

    @property(cc.Label)
    lowestStack: cc.Label = null;

    @property(cc.Label)
    avarageStack: cc.Label = null;


    @property(cc.Node)
    tabBtns: cc.Node[] = [];

    @property(cc.Node)
    tabPage: cc.Node[] = [];

    // @property(cc.SpriteFrame)
    // tabBtnSprite: cc.SpriteFrame[] = [];

    @property(cc.Color)
    labeActiveColor: cc.Color[] = [];

    @property(cc.SpriteFrame)
    btnFrame: cc.SpriteFrame[] = [];

    @property(cc.Node)
    blindAndPayout: cc.Node = null;

    @property(cc.Node)
    tournamentBuyin: cc.Node = null;

    @property(cc.Node)
    tournamentResultPlacement: cc.Node = null;

    @property(cc.Node)
    tournamentResultWinner: cc.Node = null;

    _curTab: TOUR_LOBBY_TAB = TOUR_LOBBY_TAB.INFO;

    playerFilter:string = "";

    isTableExisting = false;
    isTournamentExisting = false;

    tournamentIndexFound = -1;
    indexFound = -1;

    setTabActive( tab: TOUR_LOBBY_TAB) {
        // this.tabBtns.forEach( (t,i) => {
        //     t.active = tab === i;
        // })
        this.setButtonActive(tab);
        // console.log('@@@@@ setTabActive ',tab)
        this.tabPage.forEach( (page,i) => {
            page.active = tab == i;
            // console.log('@@@@@ page ',i , 'active ',page.active)
        })
    }

    setButtonActive(btnID: TOUR_LOBBY_TAB){
        this.tabBtns.forEach( (btn,i) => {
            const index = btnID == i ? 0 : 1;
            // btn.getComponent(cc.Sprite).spriteFrame = this.tabBtnSprite[index];
            btn.children[0].color = this.labeActiveColor[index];
            btn.children[0].getComponent(cc.Label).enableUnderline = (btnID == i ? true : false);
            // console.log('@@@@@ page ',i , 'active ',page.active)
        })
    }

    
    getInstance() {
        if (!TournamentLobbyPresenter._instance) {
            TournamentLobbyPresenter._instance = this;
        }
        return TournamentLobbyPresenter._instance;
    }

    onLoad() {
        if (!TournamentLobbyPresenter._instance) {
            TournamentLobbyPresenter._instance = this;
        }
        // cc.systemEvent.on( 'EnterLobbyTournament', this.enterLobby, this );        
        this.setTabActive(TOUR_LOBBY_TAB.INFO);
        cc.systemEvent.on(K.SocketIOEvent.Lobby.TournamentRefresh, this.onTournamentRefresh.bind(this), this.node);
        // ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentRefresh, this.onTournamentRefresh.bind(this));
        ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentClosed, this.onTournamentClosed.bind(this));
        // ServerCom.socketIOBroadcast("Tournament:Cancelled", this.onTournamentCancelled.bind(this));

        cc.systemEvent.on( "leaveLobby", this.leaveLobby, this);
    }

    onEnable() {
        this.blindAndPayout.active = false;
        this.setTabActive(TOUR_LOBBY_TAB.INFO);
        // 
        if (this.tourData && this.tourData.id) {
            window.TournamentLobbyHandler.requestTournamentData(
                { tournamentId: this.tourData.id },
                (data) => {
                    console.log("data", data);
                }, 
                (error) => {
                    console.log("error", error);
                }
            );
        }
    }

    onBtnClick(event, customEvent) {
        this.blindAndPayout.active = false;
        const tab = parseInt(customEvent);
        this.setTabActive(customEvent);
    }

    onBackBtnClick(event, customEvent) {
        this.node.active = false;
    }

    enterLobby( tourData ) {
        this.tourData = tourData;
        this.node.active = true;
        this.updateData();
    }

    leaveLobby() {
        this.node.active = false;
    }

    updateData(isRefresh = false) {
        // console.log("updateData");
        // console.log(this.tourData);
        this.updateInfo(isRefresh);
        this.updateTables();
        this.updatePrize();
        this.updatePositionPaid();
        this.updateBlindAndPayout();
    }

    updateInfo(isRefresh = false) {
        this.unschedule(this.startsInTimer);
        this.unschedule(this.endsInTimer);
        this.unschedule(this.breakTimer);
        this.unschedule(this.blindTimer);
        this.unschedule(this.breakEndsTimer);
        this.unschedule(this.regStartsInTimer);
        // buttons

        this.header1.string = this.tourData.gameVariation;

        this.reentryBtn.active = false;
        this.enterTableBtn.active = false;
        this.deRegisterTableBtn.active = false;
        this.lateRegisterBtn.active = false;
        this.registerBtn.active = false;
        this.stateBtn.active = false;
        this.CountDowninfo.string = "";
        this.CountDowntime.string = "";

        if (this.tourData.state == "CLOSED") {
            this.stateBtn.active = true;
            cc.find('Label', this.stateBtn).getComponent(cc.Label).string = "Closed";
            // this.stateBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[0];
        }
        else if (this.tourData.state == "CANCELED") {
            this.stateBtn.active = true;
            cc.find('Label', this.stateBtn).getComponent(cc.Label).string = "Canceled";
            // cc.find('RoomInfoMobile/stateBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[0];
        }
        else {
            if (this.tourData.raw.playerData) {
                if (this.tourData.raw.playerData.tableId) {
                    if (this.tourData.raw.isInBreak) {
                        if (this.tourData.raw.playerData.status == "ELIMINATED") {
                            if (this.tourData.raw.isReEntryOpen && this.tourData.raw.isReentryAllowed && this.tourData.raw.playerData.reentries < this.tourData.raw.numberOfReentry) {
                                this.stateBtn.active = true;
                                cc.find('Label', this.stateBtn).getComponent(cc.Label).string = "Break Time";
                                // cc.find('RoomInfoMobile/stateBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[2];
                                this.updateBreakEndsTimer();
                            }
                            else {
                                this.stateBtn.active = true;
                                cc.find('Label', this.stateBtn).getComponent(cc.Label).string = "Running";
                                // cc.find('RoomInfoMobile/stateBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[2];
                            }
                        }
                        else {
                            this.stateBtn.active = true;
                            cc.find('Label', this.stateBtn).getComponent(cc.Label).string = "Break Time";
                            // cc.find('RoomInfoMobile/stateBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[2];
                            this.updateBreakEndsTimer();
                        }
                    }
                    else if (this.tourData.raw.playerData.status == "ELIMINATED") {
                        if (this.tourData.raw.isReEntryOpen && this.tourData.raw.isReentryAllowed && this.tourData.raw.playerData.reentries < this.tourData.raw.numberOfReentry) {
                            this.reentryBtn.active = true;
                            // cc.find('RoomInfoMobile/reentryBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[1];   
                        }
                        else {
                            this.stateBtn.active = true;
                            cc.find('Label', this.stateBtn).getComponent(cc.Label).string = "Eliminated";
                            // cc.find('RoomInfoMobile/stateBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[2];
                        }
                    }
                    else {
                        this.enterTableBtn.active = true;
                        // cc.find('RoomInfoMobile/enterTableBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[2];
                        this.newTableData = {};
                        this.newTableData.eventData = {
                            playerId: this.tourData.raw.playerData.playerId,
                            tableId: this.tourData.raw.playerData.tableId,
                        };
                        // 
                        if (!isRefresh) {
                            var newTableEvent = K.SocketIOBroadcast.Lobby.TournamentNewTable.replace("<TournamentId>", this.tourData.id).replace("<PlayerId>", this.tourData.raw.playerData.playerId);
                            socketIO.socket.off(newTableEvent);
                            ServerCom.socketIOBroadcast(newTableEvent, this.onTournamentNewTable.bind(this));

                            // ServerCom.socketIOBroadcast(this.tourData.raw.playerData.tableId + ":" + this.tourData.raw.playerData.playerId, this.onTournamentTableUserBroadcast.bind(this));
                            // var newTableEvent2 = K.SocketIOBroadcast.Lobby.TournamentElimination.replace("<TournamentId>", this.tourData.id).replace("<PlayerId>", this.tourData.raw.playerData.playerId);
                            // ServerCom.socketIOBroadcast(newTableEvent2, this.onTournamentElimination.bind(this));
                        }
                    }
                }
                else {
                    // already registered the tournament -- tournament not started yet / table not assigned
                    if (this.tourData.state == "Open To Register") {
                        this.updateStartsInTimer();
                        this.deRegisterTableBtn.active = true;
                        // cc.find('RoomInfoMobile/deRegisterTableBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[1];
                    }
                    else if (this.tourData.state == "Registration Freezed") {
                        this.stateBtn.active = true;
                        cc.find('Label', this.stateBtn).getComponent(cc.Label).string = "Registration Freezed";
                    }
                    else {
                        this.stateBtn.active = true;
                        cc.find('Label', this.stateBtn).getComponent(cc.Label).string = "Registered";
                        // cc.find('RoomInfoMobile/stateBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[2];
                    }
                }
            }
            else {
                if (this.tourData.raw.isLateEntryOpen) {
                    this.lateRegisterBtn.active = true;
                    // cc.find('RoomInfoMobile/lateRegisterBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[3];
                    this.updateEndsInTimer();
                }
                else if (this.tourData.state == "Open To Register") {
                    this.updateStartsInTimer();
                    this.registerBtn.active = true;
                    // cc.find('RoomInfoMobile/registerBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[1];
                    if (this.tourData.raw.playerRemainingRatio && this.tourData.raw.playerRemainingRatio.registeredPlayers >= this.tourData.raw.maxPlayersAllowed) {
                        this.registerBtn, this.tabPage[0]).getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
                        this.registerBtn, this.tabPage[0]).getComponent(cc.Button).interactable = false;
                    }
                    else {
                        this.registerBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
                        this.registerBtn.getComponent(cc.Button).interactable = true;
                    }
                }
                else {
                    if (this.tourData.state == "PUBLISHED") {
                        this.updateRegStartsInTimer();
                    }
                    this.stateBtn.active = true;
                    cc.find('Label', this.stateBtn).getComponent(cc.Label).string = (this.tourData.state == "PUBLISHED" ? "Register" : this.tourData.state);
                    // cc.find('RoomInfoMobile/stateBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[2];
                }
            }
        }
        
        this.playerPerTables.string = this.tourData.raw.playerPerTables;
        this.minmaxPlayers.string = this.tourData.raw.minPlayersToStart + "/" + this.tourData.raw.maxPlayersAllowed;
        this.isReentryAllowed.string = this.tourData.isReentryAllowed ? (this.tourData.numberOfReentry + " times @ Rs. " + (this.tourData.raw.reentry.reentryPrice.reentryAmount + this.tourData.raw.reentry.reentryPrice.reentryHouseFee)) : "N/A";
        
        this.isRebuyAllowed.string = "N/A";
        this.isAddonAllowed.string = "N/A";
        if (this.tourData.raw.addOn.addOnTime.length > 0 && this.tourData.raw.rebuyChips > 0) {
            this.isRebuyAllowed.string = "Rebuy Allowed";
            this.isAddonAllowed.string = "Addon Allowed";
        }
        else if (this.tourData.raw.addOn.addOnTime.length > 0) {
            this.isAddonAllowed.string = "Addon Allowed";   
        }
        else if (this.tourData.raw.rebuyChips > 0) {
            this.isRebuyAllowed.string = "Rebuy Allowed";
        }
        this.tournamentName.string = this.tourData.tournamentName;
        this.guaranteedValue.string = this.tourData.guaranteedValue;
        this.entryFees.string = ((this.tourData.raw.entryFees || 0) + (this.tourData.raw.houseFees || 0));
        this.status.string = this.tourData.state;
        let date = new Date(this.tourData.raw.registrationBeforeStarttime);
        this.registrationBeforeStarttime.string = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' }) + ", " + date.toLocaleTimeString("en-US").substr(0, (date.toLocaleTimeString("en-US") + " ").indexOf(" "));
        date = new Date(this.tourData.raw.tournamentStartTime);
        this.tournamentStartTime.string = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' }) + ", " + date.toLocaleTimeString("en-US").substr(0, (date.toLocaleTimeString("en-US") + " ").indexOf(" "));


        this.header2.string = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' });
        this.header3.string = date.toLocaleTimeString("en-US").substr(0, (date.toLocaleTimeString("en-US") + " ").indexOf(" "));

        this.desc.string = this.tournamentStartTime.string + "(" + this.tourData.gameVariation + ")";
        
        this.uniqueEntries.string = this.tourData.raw.uniqueEntries;
        this.reentriesCount.string = (this.tourData.raw.totalRebuy || 0) + "/" + this.tourData.raw.reentriesCount;

        this.late.string = this.tourData.raw.lateRegistrationAllowed ? "Till Blind Level " + this.tourData.lateRegistrationTime : "N/A";
        
        // cc.find('GameInfo/Remaining/Label', this.tabPage[0]).getComponent(cc.Label).string = (this.tourData.raw.playerRemainingRatio ? this.tourData.raw.playerRemainingRatio.inGamePlayers + "/" + (this.tourData.raw.uniqueEntries + this.tourData.raw.reentriesCount) : "N/A");
        // this.blindLevel.string = "LEVEL " + this.tourData.currentBlindLevel.level;
        this.curBlindInfo.string = this.tourData.currentBlindLevel.smallBlind + "/" + this.tourData.currentBlindLevel.bigBlind + "/" + this.tourData.currentBlindLevel.ante + "(" + this.tourData.currentBlindLevel.level +")";
        // this.anteInfo.string = "Ante " + this.tourData.currentBlindLevel.ante;
        
        if (this.tourData.raw.isInBreak || (this.tourData.state != "RUNNING" && this.tourData.state != "Open To Late Register")) {
            // cc.find('GameInfo/nextbreak/Label', this.tabPage[0]).getComponent(cc.Label).string = "00:00";
            this.timerBlindInfo.string = "00:00";
        }
        else {
            this.updateBreakTimer();
            if (this.tourData.currentBlindLevel.nextBlindLevelTime > 0) {
                this.updateBlindTimer();
            }
            else {
                this.timerBlindInfo.string = "00:00";
            }
        }

        // this.blindLevel.string = "LEVEL " + this.tourData.nextBlindLevel.level;
        this.nextBlindInfo.string = this.tourData.nextBlindLevel.smallBlind + "/" + this.tourData.nextBlindLevel.bigBlind + "/" + this.tourData.nextBlindLevel.ante + "(" + this.tourData.nextBlindLevel.level + ")";
        // this.anteInfo.string = "Ante " + this.tourData.nextBlindLevel.ante;

        this.highestStack.string = this.tourData.tablesStack.length == 0 ? "N/A" : this.tourData.maxStack;
        this.lowestStack.string = this.tourData.tablesStack.length == 0 ? "N/A" : this.tourData.minStack;
        this.avarageStack.string = this.tourData.tablesStack.length == 0 ? "N/A" : this.tourData.avgStack;

        
        this.gameType.string = this.tourData.gameVariation;
        this.startingChips.string = this.tourData.noOfChipsAtGameStart;
        // cc.find('TournamentInfo/MainInfoTop/Group1/Lbl2', this.tabPage[0]).getComponent(cc.Label).string = this.tourData.gameVariationFullName;

        // cc.find('TournamentInfo/MainInfoTop/Group2/Lbl1', this.tabPage[0]).getComponent(cc.Label).string = "RE";
        // cc.find('TournamentInfo/MainInfoTop/Group2/Lbl2', this.tabPage[0]).getComponent(cc.Label).string = this.tourData.isReentryAllowed ? "Re Entry Allowed" : "N/A";

        // cc.find('TournamentInfo/MainInfoTop/Group3/Lbl1', this.tabPage[0]).getComponent(cc.Label).string = this.tourData.maxPlayers + " Max";
        // cc.find('TournamentInfo/MainInfoTop/Group3/Lbl2', this.tabPage[0]).getComponent(cc.Label).string = this.tourData.maxPlayers + " Player Per Table";

        // cc.find('TournamentInfo/MainInfoTop/Group4/Lbl1', this.tabPage[0]).getComponent(cc.Label).string = this.tourData.actionType;
        // cc.find('TournamentInfo/MainInfoTop/Group4/Lbl2', this.tabPage[0]).getComponent(cc.Label).string = this.tourData.actionTypeFullName;

        // cc.find('TournamentInfo/MainInfoBottom/Group1/Lbl2', this.tabPage[0]).getComponent(cc.Label).string = this.tourData.noOfChipsAtGameStart;
        // cc.find('TournamentInfo/MainInfoBottom/Group2/Lbl2', this.tabPage[0]).getComponent(cc.Label).string = this.tourData.blindRule.blindRuleArr[0].smallBlind + "/" + this.tourData.blindRule.blindRuleArr[0].bigBlind;
        // cc.find('TournamentInfo/MainInfoBottom/Group3/Lbl2', this.tabPage[0]).getComponent(cc.Label).string = this.tourData.minPlayersToStart + "-" + this.tourData.raw.maxPlayersAllowed;
        // cc.find('TournamentInfo/MainInfoBottom/Group4/Lbl2', this.tabPage[0]).getComponent(cc.Label).string = this.tourData.isReentryAllowed ? (this.tourData.numberOfReentry + " times @ Rs. " + (this.tourData.raw.reentry.reentryPrice.reentryAmount + this.tourData.raw.reentry.reentryPrice.reentryHouseFee)) : "N/A";
        // cc.find('TournamentInfo/MainInfoBottom/Group6/Lbl2', this.tabPage[0]).getComponent(cc.Label).string = this.tourData.raw.lateRegistrationAllowed ? "Allowed till the Blind Level " + this.tourData.lateRegistrationTime : "Not allowed for Late registration";
    }

    updateBreakEndsTimer() {
        this.unschedule(this.breakEndsTimer);
        this.breakEndsTimer();
        this.schedule(this.breakEndsTimer, 1);
    }

    breakEndsTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(this.tourData.raw.currentTournamentBreak.breakEndTime));
        if (false) {
            this.CountDown.active = true;
            this.CountDowninfo.string = "Ends in:";
            this.CountDowntime.string = timeRemaining;
        }
        else {
            this.CountDowninfo.string = "Ends in:";
            this.CountDowntime.string = timeRemaining;
        }
        if (timeRemaining == "00:00") {
            this.CountDowninfo.string = "";
            this.CountDowntime.string = "";
        }
    }

    updateStartsInTimer() {
        this.unschedule(this.startsInTimer);
        this.startsInTimer();
        this.schedule(this.startsInTimer, 1);
    }

    updateRegStartsInTimer() {
        this.unschedule(this.regStartsInTimer);
        this.regStartsInTimer();
        this.schedule(this.regStartsInTimer, 1);
    }

    regStartsInTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(new Date(this.tourData.raw.registrationBeforeStarttime)));
        this.CountDowninfo.string = "Reg opens in:";
        this.CountDowntime.string = timeRemaining;
        if (timeRemaining == "00:00") {
            this.CountDowninfo.string = "";
            this.CountDowntime.string = "";   
        }
    }

    startsInTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(this.tourData.raw.tournamentStartDetails.startTime));
        this.CountDowninfo.string = "Reg ends in:";
        this.CountDowntime.string = timeRemaining;   
        if (timeRemaining == "00:00") {
            this.CountDowninfo.string = "";
            this.CountDowntime.string = "";   
        }
    }

    updateEndsInTimer() {
        this.unschedule(this.endsInTimer);
        this.endsInTimer();
        this.schedule(this.endsInTimer, 1);
    }

    endsInTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(this.tourData.raw.lateRegistrationEndTime) * 1000);
        this.CountDowninfo.string = "Ends in:";
        this.CountDowntime.string = timeRemaining;
        if (timeRemaining == "00:00") {
            this.CountDowninfo.string = "";
            this.CountDowntime.string = "";
        }
    }

    updateBreakTimer() {
        this.unschedule(this.breakTimer);
        this.breakTimer();
        this.schedule(this.breakTimer, 1);
    }

    breakTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(this.tourData.raw.nextBreakDetails.breakStartTime));
        // cc.find('GameInfo/nextbreak/Label', this.tabPage[0]).getComponent(cc.Label).string = timeRemaining;
    }

    updateBlindTimer() {
        this.unschedule(this.blindTimer);
        this.blindTimer();
        this.schedule(this.blindTimer, 1);
    }

    blindTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(this.tourData.currentBlindLevel.nextBlindLevelTime) * 1000);
        this.timerBlindInfo.string = timeRemaining;
    }

    onClickTableToView(sender, data) {
        console.log(sender, data);

        if (this.tourData.raw.playerData &&
            this.tourData.raw.playerData.tableId &&
            this.tourData.raw.playerData.tableId == sender.target.___tableId) {
            this.onEnterTableButton(null, this.tourData.raw.playerData.tableId, this.tourData.raw._id);
            return;
        }

        if (this.tourData.raw.playerData &&
            this.tourData.raw.playerData.tableId) {
            if (this.tourData.raw.playerData.status != "ELIMINATED") {
                GameManager.popUpManager.show(
                    PopUpType.CommonDialog, 
                    {
                        "title": "Warning",
                        "content" : "You are not allowed to observe the other tables now."
                    }, 
                    function () {}
                );
                return;
            }
        }

        socketIO.socket.off(sender.target.___tableId + ":" + GameManager.user.playerId);
        ServerCom.socketIOBroadcast(sender.target.___tableId + ":" + GameManager.user.playerId, this.onTournamentTableUserBroadcast.bind(this));

        window.TournamentLobbyHandler.requestTournamentJoinTable(
            { channelId: sender.target.___tableId },
            (data) => {
                console.log("data", data);
            }, 
            (error) => {
                console.log("error", error);
            }
        );
    }

    updateTables() {
        cc.find('scrollView/view/content', this.tabPage[5]).removeAllChildren();
        for(let i = 0; i < this.tourData.tablesStack.length; i ++) {
            let tablesStack = this.tourData.tablesStack[i];
            if (tablesStack.playersCount <= 0) {
                continue;
            }
            const instance = null;
            if (i % 2 == 0) {
                instance = cc.instantiate(cc.find('scrollView/view/rule_base', this.tabPage[5]));
            }
            else {
                instance = cc.instantiate(cc.find('scrollView/view/rule_base2', this.tabPage[5]));
            }
            instance.setPosition(0, 0);
            instance.active = true;
            if (!false) {
                cc.find('scrollView/view/content', this.tabPage[5]).addChild(instance);
            }
            else {
                cc.find('scrollView/view/content', this.tabPage[5]).addChild(instance);
            }
            cc.find('tableId/frame/tableId', instance).getComponent(cc.Label).string = tablesStack.tableMockName;
            cc.find('players/players', instance).getComponent(cc.Label).string = tablesStack.playersCount;
            cc.find('min/min', instance).getComponent(cc.Label).string = tablesStack.minStack;
            cc.find('max/max', instance).getComponent(cc.Label).string = tablesStack.maxStack;
            instance.___tableId = tablesStack.id.slice(1);
        }
    }

    updatePrize() {
        function nth(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}

        cc.find('info_top/v', this.tabPage[3]).getComponent(cc.Label).string = this.tourData.guaranteedValue;
        cc.find('info_top/v1', this.tabPage[3]).getComponent(cc.Label).string = this.tourData.playersPayout.length;
        
        cc.find('scrollView/view/content', this.tabPage[3]).removeAllChildren();
        let nextPayoutRank = null;
        for(let i = 0; i < this.tourData.raw.playersPayout.length; i ++) {
            let playerPayout = this.tourData.raw.playersPayout[i];
            if (this.tourData.raw.payoutType == "KCOIN" || true) {
                const instance = null;
                if (i % 2 == 0) {
                    instance = cc.instantiate(cc.find('scrollView/view/list', this.tabPage[3]));
                }
                else {
                    instance = cc.instantiate(cc.find('scrollView/view/list2', this.tabPage[3]));
                }
                instance.setPosition(0, 0);
                instance.active = true;
                cc.find('scrollView/view/content', this.tabPage[3]).addChild(instance);
                cc.find('viewTitle/rank/rank', instance).getComponent(cc.Label).string = playerPayout.rank;
                cc.find('viewTitle/userName/userName', instance).getComponent(cc.Label).string = playerPayout.playerName;
                cc.find('viewTitle/value/value', instance).getComponent(cc.Label).string = (playerPayout.payout * this.tourData.guaranteedValue / 100);
            }
            // else {
            //     const instance = null;
            //     if (!GameManager.isMobile) {
            //         if (i % 2 == 0) {
            //             instance = cc.instantiate(cc.find('Prize/scrollView/view/list', this.tabPage[0]));
            //         }
            //         else {
            //             instance = cc.instantiate(cc.find('Prize/scrollView/view/list2', this.tabPage[0]));
            //         }
            //     }
            //     else {
            //         instance = cc.instantiate(cc.find('scrollView/view/list', this.tabPage[2]));
            //     }
            //     instance.setPosition(0, 0);
            //     instance.active = true;
            //     cc.find('scrollView/view/content', this.tabPage[2]).addChild(instance);
            //     cc.find('viewTitle/rank', instance).getComponent(cc.Label).string = playerPayout.rank;
            //     cc.find('viewTitle/userName', instance).getComponent(cc.Label).string = playerPayout.playerName;
            //     if (!GameManager.isMobile) {
            //         cc.find('viewTitle/value', instance).getComponent(cc.Label).string = (playerPayout.nftName);
            //     }
            //     else {
            //         cc.find('viewTitle/event/value', instance).getComponent(cc.Label).string = (playerPayout.nftName);
            //     }
            // }
            if (!nextPayoutRank && playerPayout.playerId != '-') {
                if (i == 0) {
                    nextPayoutRank = "end";
                }
                else {
                    nextPayoutRank = this.tourData.raw.playersPayout[i - 1];
                }
            }
        }
        if (this.tourData.raw.payoutType == "KCOIN" || true) {
            if (nextPayoutRank) {
                if (nextPayoutRank != "end") {
                    cc.find('info_top/v2', this.tabPage[3]).getComponent(cc.Label).string = (nextPayoutRank.rank + nth(nextPayoutRank.rank) + "-" + nextPayoutRank.payoutAmount);
                }
                else {
                    cc.find('info_top/v2', this.tabPage[3]).getComponent(cc.Label).string = "--";
                }
            }
            else {
                cc.find('info_top/v2', this.tabPage[3]).getComponent(cc.Label).string = (this.tourData.raw.playersPayout[this.tourData.raw.playersPayout.length - 1].rank + nth(this.tourData.raw.playersPayout[this.tourData.raw.playersPayout.length - 1].rank) + "-" + this.tourData.raw.playersPayout[this.tourData.raw.playersPayout.length - 1].payoutAmount);   
            }
        }
        // else {
        //     if (nextPayoutRank) {
        //         if (nextPayoutRank != "end") {
        //             if (!GameManager.isMobile) {
        //                 cc.find('Prize/info_top_main/NextPayoutLayout/ValueLbl', this.tabPage[0]).getComponent(cc.Label).string = (nextPayoutRank.rank + nth(nextPayoutRank.rank) + "-" + nextPayoutRank.nftName);
        //             }
        //             else {
        //                 cc.find('info_top/NextPayoutLayout/ValueLbl', this.tabPage[2]).getComponent(cc.Label).string = (nextPayoutRank.rank + nth(nextPayoutRank.rank) + "-" + nextPayoutRank.nftName); 
        //             }
        //         }
        //         else {
        //             cc.find('info_top/NextPayoutLayout/ValueLbl', this.tabPage[2]).getComponent(cc.Label).string = "--";
        //         }
        //     }
        //     else {
        //         if (!GameManager.isMobile) {
        //             cc.find('Prize/info_top_main/NextPayoutLayout/ValueLbl', this.tabPage[0]).getComponent(cc.Label).string = (this.tourData.raw.playersPayout[this.tourData.raw.playersPayout.length - 1].rank + nth(this.tourData.raw.playersPayout[this.tourData.raw.playersPayout.length - 1].rank) + "-" + this.tourData.raw.playersPayout[this.tourData.raw.playersPayout.length - 1].nftName);
        //         }
        //         else {
        //             cc.find('info_top/NextPayoutLayout/ValueLbl', this.tabPage[2]).getComponent(cc.Label).string = (this.tourData.raw.playersPayout[this.tourData.raw.playersPayout.length - 1].rank + nth(this.tourData.raw.playersPayout[this.tourData.raw.playersPayout.length - 1].rank) + "-" + this.tourData.raw.playersPayout[this.tourData.raw.playersPayout.length - 1].nftName);
        //         }
        //     }
        // }

    }

    searchPlayerTextChanged(text) {
        this.playerFilter = text.trim();
        this.updatePositionPaid();
    }

    getUsernameRe(rank, playerName) {
        let re = 0;
        for(let i = rank + 1; i < this.tourData.leaderBoard.length; i ++) {
            let leaderBoard = this.tourData.leaderBoard[i];
            if (leaderBoard.playerName == playerName) {
                re += 1;
            }
        }
        if (re == 0) {
            return playerName;
        }
        else {
            return playerName + "(" + re + ")";
        }
    }

    updatePositionPaid() {
        cc.find('scrollView/view/content', this.tabPage[4]).removeAllChildren();
        let myRank = 0;
        for(let i = 0; i < this.tourData.leaderBoard.length; i ++) {
            let leaderBoard = this.tourData.leaderBoard[i];
            if (myRank == 0 && leaderBoard.playerId == GameManager.user.playerId) {
                myRank = i + 1;
            }
            if (this.playerFilter != "" && leaderBoard.playerName.indexOf(this.playerFilter) == -1) {
                continue;
            }

            const instance = null;
            if (i % 2 == 0) {
                instance = cc.instantiate(cc.find('scrollView/view/list', this.tabPage[4]));
            }
            else {
                instance = cc.instantiate(cc.find('scrollView/view/list2', this.tabPage[4]));
            }
            instance.setPosition(0, 0);
            instance.active = true;
            cc.find('scrollView/view/content', this.tabPage[4]).addChild(instance);
            if (this.tourData.state == "Open To Register") {
                cc.find('viewTitle/rank/rank', instance).getComponent(cc.Label).string = ('1');
            }
            else {
                cc.find('viewTitle/rank/rank', instance).getComponent(cc.Label).string = (i + 1);
            }
            cc.find('viewTitle/userName/userName', instance).getComponent(cc.Label).string = this.getUsernameRe(i, leaderBoard.playerName);
            cc.find('viewTitle/value/value', instance).getComponent(cc.Label).string = leaderBoard.chips;
        }

        if (this.tourData.state == "Open To Register") {
            cc.find('info_top/v', this.tabPage[4]).getComponent(cc.Label).string = ("-") + "/" + this.tourData.leaderBoard.length;
        }
        else {
            cc.find('info_top/v', this.tabPage[4]).getComponent(cc.Label).string = (myRank == 0 ? "-" : myRank) + "/" + this.tourData.leaderBoard.length;
        }
    }

    updateBlindAndPayout() {
        cc.find('BlindStruct/ScrollView/view/content', this.tabPage[1]).removeAllChildren();
        for(let i = 0; i < this.tourData.blindRule.blindRuleArr.length; i ++) {
            let blindRule = this.tourData.blindRule.blindRuleArr[i];

            const instance = null;
            if (i % 2 == 0) {
                instance = cc.instantiate(cc.find('BlindStruct/ScrollView/view/rule_base', this.tabPage[1]));
            }
            else {
                instance = cc.instantiate(cc.find('BlindStruct/ScrollView/view/rule_base2', this.tabPage[1]));
            }
            instance.setPosition(0, 0);
            instance.active = true;
            cc.find('BlindStruct/ScrollView/view/content', this.tabPage[1]).addChild(instance);
            cc.find('level/level', instance).getComponent(cc.Label).string = blindRule.level;
            cc.find('blind/blind', instance).getComponent(cc.Label).string = blindRule.smallBlind + "/" + blindRule.bigBlind;
            cc.find('ante/ante', instance).getComponent(cc.Label).string = blindRule.ante;
            cc.find('duration/duration', instance).getComponent(cc.Label).string = blindRule.minutes * 60;
        }

        cc.find('BlindStruct/ScrollView/view/content', this.tabPage[2]).removeAllChildren();
        for(let i = 0; i < this.tourData.raw.allPayoutStructures.length; i ++) {
            let payoutRecord = this.tourData.raw.allPayoutStructures[i];
            if (this.tourData.raw.payoutType == "KCOIN" || true) {
                const instance = null;
                if (i % 2 == 0) {
                    instance = cc.instantiate(cc.find('BlindStruct/ScrollView/view/rule_base', this.tabPage[2]));
                }
                else {
                    instance = cc.instantiate(cc.find('BlindStruct/ScrollView/view/rule_base2', this.tabPage[2]));
                }
                instance.setPosition(0, 0);
                instance.active = true;
                cc.find('BlindStruct/ScrollView/view/content', this.tabPage[2]).addChild(instance);
                cc.find('entries/entries', instance).getComponent(cc.Label).string = payoutRecord.playerRange;
                cc.find('paid/paid', instance).getComponent(cc.Label).string = payoutRecord.numberOfWinners;
            }
            // else {
            //     const instance = null;
            //     if (i % 2 == 0) {
            //         instance = cc.instantiate(cc.find('PayoutStruct/ScrollView/view/rule_base', this.blindAndPayout));
            //     }
            //     else {
            //         instance = cc.instantiate(cc.find('PayoutStruct/ScrollView/view/rule_base2', this.blindAndPayout));
            //     }
            //     instance.setPosition(0, 0);
            //     instance.active = true;
            //     cc.find('PayoutStruct/ScrollView/view/content', this.blindAndPayout).addChild(instance);
            //     cc.find('entries', instance).getComponent(cc.Label).string = payoutRecord.playerRange;
            //     cc.find('paid', instance).getComponent(cc.Label).string = payoutRecord.numberOfWinners;
            // }
        }
    }

    onBlindAndPayout() {
        this.blindAndPayout.active = true;
    }

    onCloseBlindAndPayout() {
        this.blindAndPayout.active = false;
    }

    onRegisterButton() {

        this.tournamentBuyin.active = false;
        this.tournamentBuyin.getComponent("TournamentBuyin").setData(this.tourData, 1);
        this.tournamentBuyin.active = true;
        var anim = this.tournamentBuyin.getComponent('AnimBase');
        var inst = this;
        if (anim !== null) {
            this.tournamentBuyin.opacity = 0;
            anim.play("showPopUp", function () {});
        }

        // window.TournamentLobbyHandler.requestTournamentRegister(
        //     { tournamentId: this.tourData.id },
        //     (data) => {
        //         // console.log("data", data);
        //         // cc.find('RoomInfoMobile/enterTableBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/deRegisterTableBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/lateRegisterBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/registerBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/stateBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/deRegisterTableBtn', this.tabPage[0]).active = true;

        //     }, 
        //     (error) => {
        //         // console.log("error", error);
        //     }
        // );
    }

    onDeRegisterButton() {
        window.TournamentLobbyHandler.requestTournamentDeRegister(
            { tournamentId: this.tourData.id },
            (data) => {
                // console.log("data", data);
                // cc.find('RoomInfoMobile/enterTableBtn', this.tabPage[0]).active = false;
                // cc.find('RoomInfoMobile/deRegisterTableBtn', this.tabPage[0]).active = false;
                // cc.find('RoomInfoMobile/lateRegisterBtn', this.tabPage[0]).active = false;
                // cc.find('RoomInfoMobile/registerBtn', this.tabPage[0]).active = false;
                // cc.find('RoomInfoMobile/stateBtn', this.tabPage[0]).active = false;
                // cc.find('RoomInfoMobile/lateRegisterBtn', this.tabPage[0]).active = true;
            }, 
            (error) => {
                // console.log("error", error);
            }
        );
    }

    onReEntryButton() {
        // window.TournamentLobbyHandler.requestTournamentReEntry(
        //     { tournamentId: this.tourData.id },
        //     (data) => {
        //         // console.log("data", data);
        //         // cc.find('RoomInfoMobile/enterTableBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/deRegisterTableBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/lateRegisterBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/registerBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/stateBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/lateRegisterBtn', this.tabPage[0]).active = true;
        //     }, 
        //     (error) => {
        //         // console.log("error", error);
        //     }
        // );

        this.tournamentBuyin.active = false;
        this.tournamentBuyin.getComponent("TournamentBuyin").setData(this.tourData, 3);
        this.tournamentBuyin.active = true;
    }

    onLateRegisterButton() {
        // window.TournamentLobbyHandler.requestTournamentLateRegister(
        //     { tournamentId: this.tourData.id },
        //     (data) => {
        //         // console.log("data", data);
        //         // cc.find('RoomInfoMobile/enterTableBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/deRegisterTableBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/lateRegisterBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/registerBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/stateBtn', this.tabPage[0]).active = false;
        //         // cc.find('RoomInfoMobile/enterTableBtn', this.tabPage[0]).active = true;

        //     }, 
        //     (error) => {
        //         // console.log("error", error);
        //     }
        // );

        this.tournamentBuyin.active = false;
        this.tournamentBuyin.getComponent("TournamentBuyin").setData(this.tourData, 2);
        this.tournamentBuyin.active = true;
    }

    onEnterTableButton(event, tableId, tournamentId) {
        console.log(';;;;;; onEnterTableButton', tableId, tournamentId);
        // window.TournamentLobbyHandler.requestTournamentEnterTable(
        //     { tournamentId: this.tourData.id },
        //     (data) => {
        //         console.log("data", data);
        //     }, 
        //     (error) => {
        //         console.log("error", error);
        //     }
        // );

        // GameManager.user.playerId = cc.sys.localStorage.getItem("SocketIOUserName");

        // if (tableId && this.tourData.raw.playerData && tableId == this.tourData.raw.playerData.tableId) {
        //     return;
        // }

        if (!tournamentId) {
            tournamentId = this.tourData.id;
        }

        this.isTableExisting = false;
        this.isTournamentExisting = false;
        this.indexFound = -1;
        this.tournamentIndexFound = -1;
        for (var index = 0; index < GameManager.gameModel.activePokerModels.length; index++) {
            if (!GameManager.gameModel.activePokerModels[index].tourData) {
                continue;
            }
            var id = GameManager.gameModel.activePokerModels[index].tourData.id;
            if (tournamentId === id) {
                this.isTournamentExisting = true;
                this.tournamentIndexFound = index;
                break;
            }
        }
        for (var index = 0; index < GameManager.gameModel.activePokerModels.length; index++) {
            var id = GameManager.gameModel.activePokerModels[index].roomConfig._id;
            if ((tableId ? tableId : this.tourData.raw.playerData.tableId) === id) {
                this.indexFound = index;
                this.isTableExisting = true;
                break;
            }
        }
        if (this.isTableExisting) {
            console.log(';;;;;; onEnterTableButton2');
            // enter
            ServerCom.loading.active = false;

            if (!GameManager.isMobile && !K.GoToTable) {
                window.versions.new({
                    "name": this.tourData.id,
                    "url": "?GoToTable=1&accesstoken=" + K.Token.access_token + "&channelid=" + this.tourData.id + "&playerId=" + GameManager.user.playerId + "&playerName=" + GameManager.user.userName + "&networkIp=" + window.ipV4Address + "&realChips=" + GameManager.user.realChips + "&isTournament=true"
                });
            }
            else {
                this.node.active = false;
                ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, this.indexFound, function () { });
            }
            return;
        }
        if (this.isTournamentExisting) {
            console.log(';;;;;; onEnterTableButton3');
            // reshuffle
            this.node.active = false;
            GameManager.gameModel.activePokerModels[this.tournamentIndexFound].leave();
            GameManager.gameModel.activePokerModels[this.tournamentIndexFound].presenter.resetGameForReshuffle();
            GameManager.gameModel.activePokerModels[this.tournamentIndexFound].resetGameForReshuffle();
            // GameManager.gameModel.activePokerModels[this.tournamentIndexFound].presenter.resetView();
        }

        socketIO.socket.off((tableId ? tableId : this.tourData.raw.playerData.tableId) + ":" + this.tourData.raw.playerData.playerId);
        ServerCom.socketIOBroadcast((tableId ? tableId : this.tourData.raw.playerData.tableId) + ":" + this.tourData.raw.playerData.playerId, this.onTournamentTableUserBroadcast.bind(this));
        // 
        window.TournamentLobbyHandler.requestTournamentEnterTable(
            {
                tournamentId: tournamentId
            },
            (data) => {
            }, 
            (error) => {
            },
            this.isTournamentExisting ? "Table reshuffling, please wait ......" : "Enter table, please wait ......"
        );
    }

    start () {
        ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentLobbyResponseEvent, this.onTournamentLobbyResponseEvent.bind(this));
    }

    onTournamentRefresh(data) {
        if (data._id == this.tourData.id) {
            this.tourData = new Tournament(data);
            this.updateData(true);
        }
    }

    onTournamentClosed(data) {
        this.onTournamentRefresh(data);
    }

    onTournamentLobbyResponseEvent(data) {
        if (data.eventName === "Res-Register" || data.eventName === "Res-ReEntry") {
            ServerCom.forceKeepLoading = false;
            ServerCom.loading.active = false;
            if (data && data.data && data.data.success) {
                var newTableEvent = K.SocketIOBroadcast.Lobby.TournamentNewTable.replace("<TournamentId>", data.data.requestedTournamentId).replace("<PlayerId>", data.data.requesterPlayerId);
                socketIO.socket.off(newTableEvent);
                ServerCom.socketIOBroadcast(newTableEvent, this.onTournamentNewTable.bind(this));
                // // 
                var newTableEvent2 = K.SocketIOBroadcast.Lobby.TournamentElimination.replace("<TournamentId>", data.data.requestedTournamentId).replace("<PlayerId>", data.data.requesterPlayerId);
                ServerCom.socketIOBroadcast(newTableEvent2, this.onTournamentElimination.bind(this));
                // 
                GameManager.popUpManager.show(PopUpType.RegDialog, 1, function () {});
            }
            else {
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
        else if (data.eventName === "Res-Deregister") {
            if (data && data.data && data.data.success) {
                var newTableEvent = K.SocketIOBroadcast.Lobby.TournamentNewTable.replace("<TournamentId>", data.data.requestedTournamentId).replace("<PlayerId>", data.data.requesterPlayerId);
                socketIO.socket.off(newTableEvent);
                // 
                var newTableEvent2 = K.SocketIOBroadcast.Lobby.TournamentElimination.replace("<TournamentId>", data.data.requestedTournamentId).replace("<PlayerId>", data.data.requesterPlayerId);
                socketIO.socket.off(newTableEvent2);
            }
            else {
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
        else if (data.eventName === "Res-LateRegister") {
            if (data && data.data && data.data.success) {
                var newTableEvent = K.SocketIOBroadcast.Lobby.TournamentNewTable.replace("<TournamentId>", data.data.requestedTournamentId).replace("<PlayerId>", data.data.requesterPlayerId);
                socketIO.socket.off(newTableEvent);
                ServerCom.socketIOBroadcast(newTableEvent, this.onTournamentNewTable.bind(this));
                // 
                var newTableEvent2 = K.SocketIOBroadcast.Lobby.TournamentElimination.replace("<TournamentId>", data.data.requestedTournamentId).replace("<PlayerId>", data.data.requesterPlayerId);
                ServerCom.socketIOBroadcast(newTableEvent2, this.onTournamentElimination.bind(this));

                GameManager.popUpManager.show(PopUpType.RegDialog, 1, function () {});
            }
            else {
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
        else if (data.eventName === "Res-GetTournamentData") {
            if (data.data.response._id == this.tourData.id) {
                this.tourData = new Tournament(data.data.response);
                this.updateData(true);
            }
        }
    },

    onTournamentElimination(data) {
        // console.log("onTournamentElimination", data);
        // 
        this.tournamentResultWinner.active = false;
        this.tournamentResultPlacement.getComponent("TournamentResultsPlacement").setData(data);
        this.tournamentResultPlacement.active = true;
    }   

    onTournamentNewTable(data) {
        console.log(";;;;;; onTournamentNewTable", data);
        // cc.find('RoomInfoMobile/endTime', this.tabPage[0]).active = true;
        this.newTableData = data;
        // ServerCom.socketIOBroadcast(data.eventData.tableId, this.onTournamentTableBroadcast.bind(this));

        socketIO.socket.off(data.eventData.tableId + ":" + data.eventData.playerId);
        ServerCom.socketIOBroadcast(data.eventData.tableId + ":" + data.eventData.playerId, this.onTournamentTableUserBroadcast.bind(this));
        // 
        // cc.find('RoomInfoMobile/endTime', this.tabPage[0]).active = true;

        if (data.eventData.tournamentId == this.tourData.id) {
            if (false) {
                cc.find('Bg/RoomInfoMobile/right/enterTableBtn', this.node).active = false;
                cc.find('Bg/RoomInfoMobile/right/deRegisterTableBtn', this.node).active = false;
                cc.find('Bg/RoomInfoMobile/right/lateRegisterBtn', this.node).active = false;
                cc.find('Bg/RoomInfoMobile/right/registerBtn', this.node).active = false;
                cc.find('Bg/RoomInfoMobile/right/stateBtn', this.node).active = false;
                cc.find('Bg/RoomInfoMobile/right/enterTableBtn', this.node).active = true;
                cc.find('Bg/RoomInfoMobile/right/enterTableBtn', this.node).getComponent(cc.Sprite).spriteFrame = this.btnFrame[2];
            }
            else {
                this.enterTableBtn.active = false;
                this.deRegisterTableBtn.active = false;
                this.lateRegisterBtn.active = false;
                this.registerBtn.active = false;
                this.stateBtn.active = false;
                this.enterTableBtn.active = true;
                // cc.find('RoomInfoMobile/enterTableBtn', this.tabPage[0]).getComponent(cc.Sprite).spriteFrame = this.btnFrame[2];
            }
        }
        // 

        if (GameManager.isActive) {
            GameManager.popUpManager.hideAllPopUps();
            GameManager.tableStartTime = this.newTableData.eventData.tableStartTime;
            this.onEnterTableButton(null, this.newTableData.eventData.tableId, this.newTableData.eventData.tournamentId);
        }
    }

    onTournamentTableBroadcast(data) {
        // console.log("onTournamentTableBroadcast", data);
    }

    onTournamentTableUserBroadcast(data) {
        console.log(";;;;;; GameManager.isActive", GameManager.isActive);
        console.log(";;;;;; onTournamentTableUserBroadcast", data);
        if (data.eventName == "joinChannelResponse" || data.eventName == "enterChannelResponse") {

            if (data.data.success) {
                cc.systemEvent.emit( "HideTournamentNotification" );  
                GameManager.popUpManager.hideAllPopUps();


                // console.log("globals.TournamentLobbyListPresenter", globals.TournamentLobbyListPresenter.tourList);
                // console.log("this.tourData.id", this.tourData.id);

                let correctInfo = null;
                for (let x = 0; x < TournamentLobbyListPresenter.contentHolderAll.children.length; x++) {
                    let e = TournamentLobbyListPresenter.contentHolderAll.children[x];
                    if (e.getComponent("TournamentLobbyListItem").tourItemInfo.id == data.data.tournamentId) {
                        correctInfo = e.getComponent("TournamentLobbyListItem").tourItemInfo;
                        break;
                    }
                }

                socketIO.socket.off(data.channelId + ":" + data.playerId);
                var newTableEvent2 = K.SocketIOBroadcast.Lobby.TournamentElimination.replace("<TournamentId>", data.data.tournamentId).replace("<PlayerId>", data.playerId);
                socketIO.socket.off(newTableEvent2);
                socketIO.socket.off(data.eventTo);

                if (!GameManager.isActive) {
                    ServerCom.forceKeepLoading = false;
                    ServerCom.loading.active = false;
                    return;
                }

                if (!correctInfo) {
                    console.warn("correctInfocorrectInfocorrectInfo");
                }

                data.data.gameData = new GameData(data.data);
                data.data.tourData = correctInfo ? correctInfo : this.tourData;
                if (this.isTournamentExisting) {
                    console.log(";;;;;; onTournamentTableUserBroadcast2");
                    // GameManager.gameModel.activePokerModels[this.tournamentIndexFound];
                    this.node.active = false;
                    ServerCom.forceKeepLoading = false;
                    GameManager.gameModel.activePokerModels[this.tournamentIndexFound].initiliazePoker(data.data);
                }
                else {
                    console.log(";;;;;; onTournamentTableUserBroadcast3");
                    if (!GameManager.isMobile && !K.GoToTable) {
                        window.versions.new({
                            "name": this.tourData.id,
                            "url": "?GoToTable=1&accesstoken=" + K.Token.access_token + "&channelid=" + this.tourData.id + "&tableid=" + data.channelId + "&playerId=" + GameManager.user.playerId + "&playerName=" + GameManager.user.userName + "&networkIp=" + window.ipV4Address + "&realChips=" + GameManager.user.realChips + "&isTournament=true"
                        });
                        return;
                    }
                    else {
                        this.node.active = false;
                        ScreenManager.showScreen(K.ScreenEnum.GamePlayScreen, data.data, function () { });
                    }
                }
                // 
                this.scheduleOnce(function () {
                    ServerCom.forceKeepLoading = false;
                    ServerCom.loading.active = false;
                }, 1);

            }
            else {
                ServerCom.forceKeepLoading = false;
                ServerCom.loading.active = false;
                // 
                GameManager.popUpManager.show(
                    PopUpType.CommonDialog, 
                    {
                        "title": "Error!",
                        "content" : data.data.info
                    }, 
                    function () {}
                );
            }
        }
        else if (data.eventName == "tournamentWinner") {
            this.tournamentResultPlacement.active = false;
            this.tournamentResultWinner.getComponent("TournamentResultsPlacement").setData(data);
            this.tournamentResultWinner.active = true;
        }
    }

}
