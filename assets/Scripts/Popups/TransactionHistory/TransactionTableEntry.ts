const { ccclass, property } = cc._decorator;

@ccclass
export default class TransactionTableEntry extends cc.Component {

    @property(cc.Label) tableName: cc.Label = null!;
    @property(cc.Label) blindInfo: cc.Label = null!;
    @property(cc.Label) tableType: cc.Label = null!;
    @property(cc.Node) tableTypeIcon: cc.Node = null!;

    @property(cc.Label) buyInAmount: cc.Label = null!;
    @property(cc.Label) buyInClosingAmount: cc.Label = null!;
    @property(cc.Label) buyInTime: cc.Label = null!;

    @property(cc.Label) buyOutAmount: cc.Label = null!;
    @property(cc.Label) buyOutClosingAmount: cc.Label = null!;
    @property(cc.Label) buyOutTime: cc.Label = null!;

    @property(cc.Label) closingAmount: cc.Label = null!;

    setView(date: any, data: any) {
        this.tableName.string = data?.tableInfo?.tableName || "-";

        const sb = data?.tableInfo?.smallBlind || 0;
        const bb = data?.tableInfo?.bigBlind || 0;
        this.blindInfo.string = `${sb}/${bb}`;


        let game = data?.tableInfo?.gameVariation;

        if (game === "Texas Hold’em") {
            this.tableType.string = "NLH";
        }
        else if (game === "Omaha") {
            this.tableTypeIcon.color = new cc.Color().fromHEX("#F87617");
            this.tableType.node.color = new cc.Color().fromHEX("#F87617");
            this.tableType.string = "PLO";
        }
        else {
            this.tableType.string = game;
        }

        this.buyInAmount.string = this.formatAmount(data.totalBuyIn);
        this.buyInClosingAmount.string = this.formatAmount(data.closingBalanceAfterBuyIn);
        this.buyInTime.string = this.formatTime(data.seatTakenAt);

        this.buyOutAmount.string = this.formatAmount(data.buyOut);
        this.buyOutClosingAmount.string = this.formatAmount(data.closingBalanceAtBuyOut);
        this.buyOutTime.string = this.formatTime(data.seatLeaveAt);

        this.closingAmount.string = this.formatAmount(data.netWinnings);
    }


    private formatTime(timestamp: number): string {
        if (!timestamp) return "-";
        return new Date(timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    }


    private formatAmount(value: number): string {
        if (value === undefined || value === null) return "-";
        return value.toFixed(2);
    }
}