
const { ccclass, property } = cc._decorator;

@ccclass
export default class TransactionEntry extends cc.Component {

    @property(cc.Label) transactionTypeLabel: cc.Label = null!;
    @property(cc.Label) transactionStatusLabel: cc.Label = null!;
    @property(cc.Label) amountLabel: cc.Label = null!;
    @property(cc.Label) closingBalanceLabel: cc.Label = null!;
    @property(cc.Label) dateLabel: cc.Label = null!;

    start() {

    }

    setView(date: any, data: any) {
        this.transactionTypeLabel.string = data.category;
        this.transactionStatusLabel.string = data.status;
        let dateObj = new Date(data.date);
        let dateStr = dateObj.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

        this.dateLabel.string = dateStr+ " | " + data.transactionId.toString();
        if (data.category == "Bonus") {
            this.transactionStatusLabel.string = "";
            this.dateLabel.string = date;
        }
        let amountBalance = data.amount;
        this.amountLabel.string = amountBalance.toFixed(4);
        
        let closingBalance = data.closingBalance;
        this.closingBalanceLabel.string = this.formatAmount(closingBalance);
    }
    private formatAmount(value: number): string {
        if (value === undefined || value === null) return "-";
        return value.toFixed(2);
    }
}
