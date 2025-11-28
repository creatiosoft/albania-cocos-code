const {ccclass, property} = cc._decorator;
import { GameData } from "../../DataFormats/ResponseTypes";
import { Tournament } from "../data/TournamentResponseTypes";

export enum TOUR_LOBBY_TAB {
    INFO = 0,
    TABLE,
    BLIND_STRUCT
}
export enum TOUR_LOBBY_MAIN_TAB {
    STATS = 0,
    TOURNAMENT
}
@ccclass
export class  TournamentInGameInfo extends cc.Component {

    @property(cc.Label)
    tournamentName: cc.Label = null;

    @property(cc.Label)
    desc: cc.Label = null;

    @property(cc.Node)
    tabBtns: cc.Node[] = [];

    @property(cc.Node)
    tabPage: cc.Node[] = [];

    @property(cc.SpriteFrame)
    tabBtnSprite: cc.SpriteFrame[] = [];

    @property(cc.Color)
    labeActiveColor: cc.Color[] = [];

    @property(cc.Node)
    tabBtnsMain: cc.Node[] = [];

    @property(cc.Node)
    tabPageMain: cc.Node[] = [];

    @property(cc.SpriteFrame)
    tabBtnSpriteMain: cc.SpriteFrame[] = [];

    @property(cc.Color)
    labeActiveColorMain: cc.Color[] = [];

    setTabActive( tab: TOUR_LOBBY_TAB) {
        // this.tabBtns.forEach( (t,i) => {
        //     t.active = tab === i;
        // })
        this.setButtonActive(tab);
        console.log('@@@@@ setTabActive ',tab)
        this.tabPage.forEach( (page,i) => {
            page.active = tab == i;
            console.log('@@@@@ page ',i , 'active ',page.active)
        })
    }

    setTabActiveMain( tab: TOUR_LOBBY_TAB) {
        // this.tabBtns.forEach( (t,i) => {
        //     t.active = tab === i;
        // })
        this.setButtonActiveMain(tab);
        console.log('@@@@@ setTabActiveMain ',tab)
        // this.tabPageMain.forEach( (page,i) => {
        //     page.active = tab == i;
        //     console.log('@@@@@ page ',i , 'active ',page.active)
        // })
    }

    setButtonActive(btnID: TOUR_LOBBY_TAB){
        this.tabBtns.forEach( (btn,i) => {
            const index = btnID == i ? 0 : 1;
            // btn.getComponent(cc.Sprite).spriteFrame = this.tabBtnSprite[index];
            // btn.children[0].color = this.labeActiveColor[index];
            // console.log('@@@@@ page ',i , 'active ',page.active)

            btn.children[0].color = this.labeActiveColor[index];
            btn.children[0].getComponent(cc.Label).enableUnderline = (btnID == i ? true : false);
        })
    }

    setButtonActiveMain(btnID: TOUR_LOBBY_MAIN_TAB){
        this.tabBtnsMain.forEach( (btn,i) => {
            const index = btnID == i ? 0 : 1;
            // btn.getComponent(cc.Sprite).spriteFrame = this.tabBtnSprite[index];
            // btn.children[0].color = this.labeActiveColor[index];
            // console.log('@@@@@ page ',i , 'active ',page.active)

            btn.children[0].color = this.labeActiveColor[index];
            btn.children[0].getComponent(cc.Label).enableUnderline = (btnID == i ? true : false);
        })
    }
    
    onLoad() {
        if (K.GoToTable) {
            return;
        }
        this.setTabActive(0);
        this.setTabActiveMain(0);
        // 
        cc.systemEvent.on(K.SocketIOEvent.Lobby.TournamentRefresh, this.onTournamentRefresh.bind(this), this.node);
        // ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentRefresh, this.onTournamentRefresh.bind(this));
        // ServerCom.socketIOBroadcast(K.SocketIOBroadcast.Lobby.TournamentUpdated, this.onTournamentUpdated.bind(this));
    }

    onBtnClick(event, customEvent) {
        const tab = parseInt(customEvent);
        this.setTabActive(customEvent)
    }

    onBtnClickMain(event, customEvent) {
        const tab = parseInt(customEvent);
        this.setTabActiveMain(customEvent)
    }

    onBackBtnClick(event, customEvent) {
        this.node.active = false;
    }

    onTournamentResultsWinnerBtnClick(event, customEvent) {
        this.tournamentResultsWinner.active = true;
    }

    onTournamentResultsPlacementBtnClick(event, customEvent) {
        this.tournamentResultsPlacement.active = true;
    }

    start () {
        this.tourData = this.node.parent.parent.getComponent("PokerModel").tourData;
        this.updateData();
    }

    onTournamentUpdated(data) {
        console.log(">>>>>>>>>> onTournamentUpdated in game");
        console.log(data);
    },

    onTournamentRefresh(data) {
        console.log(">>>>>>>>>> onTournamentRefresh in game");
        if (data && this.tourData && data._id == this.tourData.id) {
            this.tourData = new Tournament(data);
            this.updateData();
        }
    }

    onEnable() {
        this.tourData = this.node.parent.parent.getComponent("PokerModel").tourData;
    }

    updateData() {
        if (K.GoToTable) {
            return;
        }
        // this.tourData = this.node.parent.parent.getComponent("PokerModel").tourData;
        // console.log("updateData");
        // console.log(this.tourData);
        this.updateInfo();
        this.updateTables();
        this.updatePrize();
        this.updatePositionPaid();
        this.updateBlindAndPayout();
    }

    updateInfo() {

        this.tournamentName.string = this.tourData.tournamentName;
        let date = new Date(this.tourData.raw.tournamentStartTime);

        if (this.tourData.raw.isReentryAllowed) {
            cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/Reentriesv', this.node).getComponent(cc.Label).string = this.tourData.raw.playerData.reentries + "/" + this.tourData.raw.numberOfReentry;
        }
        else {
            cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/Reentriesv', this.node).getComponent(cc.Label).string = "N/A";
        }


        this.desc.string = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short' }) + ", " + (date.toLocaleTimeString("en-US").substr(0, (date.toLocaleTimeString("en-US") + " ").indexOf(" "))) + "(" + this.tourData.gameVariation + ")";

        // this.tourData = this.node.parent.parent.getComponent("PokerModel").tourData;
        // cc.find('Bg/TabPage/Stats/GameInfo/nextbreak/Label', this.node).getComponent(cc.Label).string = "30mins";
        cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/Entrantsv', this.node).getComponent(cc.Label).string = (this.tourData.raw.playerRemainingRatio ? this.tourData.raw.playerRemainingRatio.inGamePlayers + "/" + this.tourData.raw.playerRemainingRatio.registeredPlayers : "N/A");
        cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/Entrantsv2', this.node).getComponent(cc.Label).string = (this.tourData.raw.playerRemainingRatio ? (this.tourData.raw.maxPlayersAllowed - this.tourData.raw.playerRemainingRatio.inGamePlayers) + "Remainning" : "");
        cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/v', this.node).getComponent(cc.Label).string = this.tourData.raw.currentBlindLevel.smallBlind + "/" + this.tourData.raw.currentBlindLevel.bigBlind + "/" + this.tourData.raw.currentBlindLevel.ante + "(" + this.tourData.raw.currentBlindLevel.level + ")";
        
        let nextBlindLevel = null;
        for(let i = 0; i < this.tourData.raw.blindRule.blindRuleArr.length; i ++) {
            let blindRule = this.tourData.raw.blindRule.blindRuleArr[i];
            if (blindRule.level == this.tourData.raw.currentBlindLevel.level) {
                if (i == this.tourData.raw.blindRule.blindRuleArr.length - 1) {
                    nextBlindLevel = this.tourData.raw.blindRule.blindRuleArr[i];
                }
                else {
                    nextBlindLevel = this.tourData.raw.blindRule.blindRuleArr[i + 1];
                }
                break;
            }
        }
        
        cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/v2', this.node).getComponent(cc.Label).string = nextBlindLevel.smallBlind + "/" + nextBlindLevel.bigBlind + "/" + nextBlindLevel.ante + "(" + nextBlindLevel.level + ")";
        // cc.find('Bg/TabPage/Stats/GameInfo/nextBlind/curBlindInfo', this.node).getComponent(cc.Label).string = nextBlindLevel.smallBlind + "/" + nextBlindLevel.bigBlind;
        // cc.find('Bg/TabPage/Stats/GameInfo/nextBlind/anteInfo', this.node).getComponent(cc.Label).string = "Ante " + nextBlindLevel.ante;
        
    
        cc.find('Bg/Stats/GameInfo/Stacks Statistics/Rectangle 2963/v', this.node).getComponent(cc.Label).string = this.tourData.tablesStack.length == 0 ? "N/A" : this.tourData.maxStack;
        cc.find('Bg/Stats/GameInfo/Stacks Statistics/Rectangle 2963/v3', this.node).getComponent(cc.Label).string = this.tourData.tablesStack.length == 0 ? "N/A" : this.tourData.minStack;
        cc.find('Bg/Stats/GameInfo/Stacks Statistics/Rectangle 2963/v2', this.node).getComponent(cc.Label).string = this.tourData.tablesStack.length == 0 ? "N/A" : this.tourData.avgStack;
        
        cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/v3', this.node).getComponent(cc.Label).string = "10:00:00";
        // 

        console.log("!!!!!!!!!!!! updateInfo", this.tourData.currentBlindLevel);

        if (this.tourData.currentBlindLevel.nextBlindLevelTime > 0) {
            this.updateBlindTimer();
        }
        else {
            cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/v3', this.node).getComponent(cc.Label).string = "00:00";
        }

        if (this.tourData.raw.tournamentType != "SIT N GO") {
            this.updateBreakTimer();
            cc.find('Bg/Stats/GameInfo/Level', this.node).active = true;
            cc.find('Bg/Stats/GameInfo/Total Registrations', this.node).active = true;
            cc.find('Bg/Stats/GameInfo/Stacks Statistics', this.node).active = true;
            cc.find('Bg/Stats/GameInfo/Timebreak', this.node).active = true;

            cc.find('Bg/TopBase/MainVariationTab/Detail', this.node).active = true;
            cc.find('Bg/TopBase/MainVariationTab/Stats', this.node).active = true;
            cc.find('Bg/TopBase/MainVariationTab/StatsSitAndGo', this.node).active = false;


            if (this.tourData.raw.isLateEntryOpen) {
                cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/btn/state', this.node).getComponent(cc.Label).string = "Late Reg";
                this.updateEndsInTimer();
            }
            else {
                cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/btn/state', this.node).getComponent(cc.Label).string = "Running";
            }
        }
        else {
            // cc.find('Bg/TabPage/Stats/GameInfo/next_break', this.node).active = false;
            cc.find('Bg/TopBase/MainVariationTab/Detail', this.node).active = false;
            cc.find('Bg/TopBase/MainVariationTab/Stats', this.node).active = false;
            cc.find('Bg/TopBase/MainVariationTab/StatsSitAndGo', this.node).active = true;
            // // 
            // cc.find('Bg/TabPage/Stats/GameInfo/sitandgo', this.node).active = true;
            // // 
            // cc.find('Bg/TabPage/Stats/GameInfo/sitandgo/Name', this.node).getComponent(cc.Label).string = this.tourData.raw.stageName;
            // cc.find('Bg/TabPage/Stats/GameInfo/sitandgo/Name/value', this.node).getComponent(cc.Label).string = this.tourData.raw.gameVariation;

            // // cc.find('Bg/TabPage/Stats/GameInfo/sitandgo/Buyin', this.node).getComponent(cc.Label).string = this.tourData.raw.stageName;
            // cc.find('Bg/TabPage/Stats/GameInfo/sitandgo/Buyin/value', this.node).getComponent(cc.Label).string = (this.tourData.raw.entryFees || 0) + "(Reg.) + " + (this.tourData.raw.houseFees || 0) + "(Fee)";

            // // cc.find('Bg/TabPage/Stats/GameInfo/sitandgo/Prize', this.node).getComponent(cc.Label).string = this.tourData.raw.stageName;
            // cc.find('Bg/TabPage/Stats/GameInfo/sitandgo/Prize/value', this.node).getComponent(cc.Label).string = this.tourData.raw.guaranteedValue;

            cc.find('Bg/Stats/GameInfo/Level', this.node).active = true;
            cc.find('Bg/Stats/GameInfo/Total Registrations', this.node).active = false;
            cc.find('Bg/Stats/GameInfo/Stacks Statistics', this.node).active = true;
            cc.find('Bg/Stats/GameInfo/Timebreak', this.node).active = false;
        }
    }

    updateBlindTimer() {
        this.unschedule(this.blindTimer);
        this.blindTimer();
        this.schedule(this.blindTimer, 1);
    }

    blindTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(this.tourData.raw.currentBlindLevel.nextBlindLevelTime) * 1000);
        // console.log("!!!!!!!!!!!! blindTimer", timeRemaining);
        cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/v3', this.node).getComponent(cc.Label).string = timeRemaining;
    }

    updateBreakTimer() {
        this.unschedule(this.breakTimer);
        this.breakTimer();
        this.schedule(this.breakTimer, 1);
    }

    breakTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(this.tourData.raw.nextBreakDetails.breakStartTime));
        cc.find('Bg/Stats/GameInfo/Timebreak/Rectangle 2963/v', this.node).getComponent(cc.Label).string = timeRemaining;
    }

    updateTables() {
        cc.find('scrollView/view/content', this.tabPage[2]).removeAllChildren();
        for(let i = 0; i < this.tourData.tablesStack.length; i ++) {
            let tablesStack = this.tourData.tablesStack[i];
            if (tablesStack.playersCount <= 0) {
                continue;
            }
            const instance = null;
            if (i % 2 == 0) {
                instance = cc.instantiate(cc.find('scrollView/view/rule_base', this.tabPage[2]));
            }
            else {
                instance = cc.instantiate(cc.find('scrollView/view/rule_base2', this.tabPage[2]));
            }
            instance.setPosition(0, 0);
            instance.active = true;
            if (false) {
                cc.find('scrollView/view/content', this.tabPage[2]).addChild(instance);
            }
            else {
                cc.find('scrollView/view/content', this.tabPage[2]).addChild(instance);
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

        cc.find('info_top/v', this.tabPage[1]).getComponent(cc.Label).string = this.tourData.guaranteedValue;
        cc.find('info_top/v1', this.tabPage[1]).getComponent(cc.Label).string = this.tourData.playersPayout.length;

        cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/Paidv', this.node).getComponent(cc.Label).string = this.tourData.playersPayout.length;
        
        cc.find('scrollView/view/content', this.tabPage[1]).removeAllChildren();
        let nextPayoutRank = null;
        for(let i = 0; i < this.tourData.raw.playersPayout.length; i ++) {
            let playerPayout = this.tourData.raw.playersPayout[i];
            if (this.tourData.raw.payoutType == "KCOIN" || true) {
                const instance = null;
                if (i % 2 == 0) {
                    instance = cc.instantiate(cc.find('scrollView/view/list', this.tabPage[1]));
                }
                else {
                    instance = cc.instantiate(cc.find('scrollView/view/list2', this.tabPage[1]));
                }
                if (i == 0) {
                    cc.find('Bg/Stats/GameInfo/Stacks Statistics/Rectangle 2963/1stprize', this.node).getComponent(cc.Label).string = (playerPayout.payout * this.tourData.guaranteedValue / 100);
                }
                instance.setPosition(0, 0);
                instance.active = true;
                cc.find('scrollView/view/content', this.tabPage[1]).addChild(instance);
                cc.find('viewTitle/rank/rank', instance).getComponent(cc.Label).string = playerPayout.rank;
                cc.find('viewTitle/userName/userName', instance).getComponent(cc.Label).string = playerPayout.playerName;
                cc.find('viewTitle/value/value', instance).getComponent(cc.Label).string = (playerPayout.payout * this.tourData.guaranteedValue / 100);
            }
            cc.find('Bg/Stats/GameInfo/Stacks Statistics/Rectangle 2963/nextv', this.node).getComponent(cc.Label).string = "N/A";
            if (!nextPayoutRank && playerPayout.playerId != '-') {
                if (i == 0) {
                    nextPayoutRank = "end";
                }
                else {
                    nextPayoutRank = this.tourData.raw.playersPayout[i - 1];
                    cc.find('Bg/Stats/GameInfo/Stacks Statistics/Rectangle 2963/nextv', this.node).getComponent(cc.Label).string = (nextPayoutRank.payout * this.tourData.guaranteedValue / 100);
                }
            }
        }
        if (this.tourData.raw.payoutType == "KCOIN" || true) {
            if (nextPayoutRank) {
                if (nextPayoutRank != "end") {
                    cc.find('info_top/v2', this.tabPage[1]).getComponent(cc.Label).string = (nextPayoutRank.rank + nth(nextPayoutRank.rank) + "-" + nextPayoutRank.payoutAmount);
                }
                else {
                    cc.find('info_top/v2', this.tabPage[1]).getComponent(cc.Label).string = "--";
                }
            }
            else {
                cc.find('info_top/v2', this.tabPage[1]).getComponent(cc.Label).string = (this.tourData.raw.playersPayout[this.tourData.raw.playersPayout.length - 1].rank + nth(this.tourData.raw.playersPayout[this.tourData.raw.playersPayout.length - 1].rank) + "-" + this.tourData.raw.playersPayout[this.tourData.raw.playersPayout.length - 1].payoutAmount);   
            }
        }


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
        cc.find('scrollView/view/content', this.tabPage[0]).removeAllChildren();
        let myRank = 0;
        for(let i = 0; i < this.tourData.leaderBoard.length; i ++) {
            let leaderBoard = this.tourData.leaderBoard[i];
            if (myRank == 0 && leaderBoard.playerId == GameManager.user.playerId) {
                myRank = i + 1;
            }
            // if (this.playerFilter != "" && leaderBoard.playerName.indexOf(this.playerFilter) == -1) {
            //     continue;
            // }

            const instance = null;
            if (i % 2 == 0) {
                instance = cc.instantiate(cc.find('scrollView/view/list', this.tabPage[0]));
            }
            else {
                instance = cc.instantiate(cc.find('scrollView/view/list2', this.tabPage[0]));
            }
            instance.setPosition(0, 0);
            instance.active = true;
            cc.find('scrollView/view/content', this.tabPage[0]).addChild(instance);
            if (this.tourData.state == "Open To Register") {
                cc.find('viewTitle/rank/rank', instance).getComponent(cc.Label).string = ('1');
            }
            else {
                cc.find('viewTitle/rank/rank', instance).getComponent(cc.Label).string = (i + 1);
            }
            cc.find('viewTitle/userName/userName', instance).getComponent(cc.Label).string = this.getUsernameRe(i, leaderBoard.playerName);
            cc.find('viewTitle/value/value', instance).getComponent(cc.Label).string = leaderBoard.chips;
        }

        if (myRank != 0) {
            cc.find('info_top/v', this.tabPage[0]).getComponent(cc.Label).string = myRank;
            cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/vrank', this.node).getComponent(cc.Label).string = myRank + "/" + this.tourData.leaderBoard.length;
        }
        else {
            cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/vrank', this.node).getComponent(cc.Label).string = "N/A";   
        }
    }

    updateBlindAndPayout() {
        cc.find('BlindStruct/ScrollView/view/content', this.tabPage[3]).removeAllChildren();
        for(let i = 0; i < this.tourData.blindRule.blindRuleArr.length; i ++) {
            let blindRule = this.tourData.blindRule.blindRuleArr[i];

            const instance = null;
            if (i % 2 == 0) {
                instance = cc.instantiate(cc.find('BlindStruct/ScrollView/view/rule_base', this.tabPage[3]));
            }
            else {
                instance = cc.instantiate(cc.find('BlindStruct/ScrollView/view/rule_base2', this.tabPage[3]));
            }
            instance.setPosition(0, 0);
            instance.active = true;
            cc.find('BlindStruct/ScrollView/view/content', this.tabPage[3]).addChild(instance);
            cc.find('level/level', instance).getComponent(cc.Label).string = blindRule.level;
            cc.find('blind/blind', instance).getComponent(cc.Label).string = blindRule.smallBlind + "/" + blindRule.bigBlind;
            cc.find('ante/ante', instance).getComponent(cc.Label).string = blindRule.ante;
            cc.find('duration/duration', instance).getComponent(cc.Label).string = blindRule.minutes * 60;
        }

        // cc.find('BlindStruct/ScrollView/view/content', this.tabPage[3]).removeAllChildren();
        // for(let i = 0; i < this.tourData.raw.allPayoutStructures.length; i ++) {
        //     let payoutRecord = this.tourData.raw.allPayoutStructures[i];
        //     if (this.tourData.raw.payoutType == "KCOIN" || true) {
        //         const instance = null;
        //         if (i % 2 == 0) {
        //             instance = cc.instantiate(cc.find('BlindStruct/ScrollView/view/rule_base', this.tabPage[3]));
        //         }
        //         else {
        //             instance = cc.instantiate(cc.find('BlindStruct/ScrollView/view/rule_base2', this.tabPage[3]));
        //         }
        //         instance.setPosition(0, 0);
        //         instance.active = true;
        //         cc.find('BlindStruct/ScrollView/view/content', this.tabPage[1]).addChild(instance);
        //         cc.find('entries/entries', instance).getComponent(cc.Label).string = payoutRecord.playerRange;
        //         cc.find('paid/paid', instance).getComponent(cc.Label).string = payoutRecord.numberOfWinners;
        //     }
        //     // else {
        //     //     const instance = null;
        //     //     if (i % 2 == 0) {
        //     //         instance = cc.instantiate(cc.find('PayoutStruct/ScrollView/view/rule_base', this.blindAndPayout));
        //     //     }
        //     //     else {
        //     //         instance = cc.instantiate(cc.find('PayoutStruct/ScrollView/view/rule_base2', this.blindAndPayout));
        //     //     }
        //     //     instance.setPosition(0, 0);
        //     //     instance.active = true;
        //     //     cc.find('PayoutStruct/ScrollView/view/content', this.blindAndPayout).addChild(instance);
        //     //     cc.find('entries', instance).getComponent(cc.Label).string = payoutRecord.playerRange;
        //     //     cc.find('paid', instance).getComponent(cc.Label).string = payoutRecord.numberOfWinners;
        //     // }
        // }
    }

    reset() {
        cc.systemEvent.off(K.SocketIOEvent.Lobby.TournamentRefresh);
        if (this.node && this.node.targetOff) {
            this.node.targetOff(this.node);
        }
    }

    onDestroy () {
        cc.systemEvent.off(K.SocketIOEvent.Lobby.TournamentRefresh);
        if (this.node && this.node.targetOff) {
            this.node.targetOff(this.node);
        }
    },

    updateEndsInTimer() {
        this.unschedule(this.endsInTimer);
        this.endsInTimer();
        this.schedule(this.endsInTimer, 1);
    }

    endsInTimer() {
        let timeRemaining = GameManager.getMTimeDuration(Number(this.tourData.raw.lateRegistrationEndTime) * 1000);
        cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/latev', this.node).getComponent(cc.Label).string = "Ends in " + timeRemaining;
        if (timeRemaining == "00:00") {
            this.unschedule(this.endsInTimer);
            cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/btn/state', this.node).getComponent(cc.Label).string = "Running";   
            cc.find('Bg/Stats/GameInfo/Level/Rectangle 2963/latev', this.node).getComponent(cc.Label).string = "";
        }
    }
}
