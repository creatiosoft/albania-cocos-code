import TransactionEntry from "./TransactionEntry";
import TransactionTableEntry from "./TransactionTableEntry";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TransactionContainer extends cc.Component {

    @property(cc.Label) dateLabel: cc.Label = null!;
    @property(cc.Prefab) DepositEntryPrefab: cc.Prefab = null!;
    @property(cc.Prefab) WithdrawalEntryPrefab: cc.Prefab = null!;
    @property(cc.Prefab) GameplayEntryPrefab: cc.Prefab = null!;

    @property(cc.Node) contentNode: cc.Node = null!;

    start() {

    }

    setView(date: any, data: any) {
        this.dateLabel.string = date; 
        this.contentNode.removeAllChildren();
        this.addTransactionHistory(date, data);
    }

    addTransactionHistory(date: any, data: any) {
        for (let i = 0; i < data.length; i++) {
            let transaction = data[i];
            if (transaction.category == "Bonus") {
                let entryNode = cc.instantiate(this.DepositEntryPrefab);
                entryNode.getComponent(TransactionEntry).setView(date, transaction);
                this.contentNode.addChild(entryNode);
            } else if (transaction.category == "Withdrawal") {
                let entryNode = cc.instantiate(this.WithdrawalEntryPrefab);
                entryNode.getComponent(TransactionEntry).setView(date, transaction);
                this.contentNode.addChild(entryNode);
            } else if (transaction.category == "Deposit") {
                let entryNode = cc.instantiate(this.DepositEntryPrefab);
                entryNode.getComponent(TransactionEntry).setView(date, transaction);
                this.contentNode.addChild(entryNode);
            } else if (transaction.category == "Gameplay") {
                let entryNode = cc.instantiate(this.GameplayEntryPrefab);
                entryNode.getComponent(TransactionTableEntry).setView(date, transaction);
                this.contentNode.addChild(entryNode);
            }
        }
    }

    getDate(){
        return this.dateLabel.string;
    }
}
