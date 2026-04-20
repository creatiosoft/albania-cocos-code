import TransactionContainer from "./TransactionContainer";

const { ccclass, property } = cc._decorator;

interface Transaction {
    transactionId: string;
    category: string;
    type: string;
    amount: number;
    closingBalance: number;
    status: string;
    date: number;
}

interface GroupedTransaction {
    date: string;
    data: Transaction[];
}

@ccclass
export default class TransactionHistoryPopup extends cc.Component {

    @property(cc.Prefab) TransactionContainerPrefab: cc.Prefab = null!;
    @property(cc.Node) contentNode: cc.Node = null!;
    @property(cc.ToggleContainer) filterToggleContainer: cc.ToggleContainer = null!;
    @property(cc.Label) noRecordLabel: cc.Label = null!;
    @property(cc.ScrollView) scrollView: cc.ScrollView = null!;
    currentPage: number = 1;
    fetchingData: boolean = false;

    onEnable() {
        this.currentPage = 1;
        this.contentNode.removeAllChildren();
        const toggles = this.filterToggleContainer.toggleItems;

        if (toggles && toggles.length > 1) {
            toggles.forEach((toggle, index) => {
                toggle.isChecked = (index === 0);
            });
        }
        this.fetchTransactionHistory();
    }

    start() {
        if (this.scrollView) {
            this.scrollView.node.on('scroll-to-bottom', this.onScrollEnded, this);
        }
    }



    private fetchTransactionHistory() {
        let fillterArr = ["All", "Deposit", "Withdrawal", "Gameplay", "Bonus"];
        let selectedIndex = -1;

        this.filterToggleContainer.toggleItems.forEach((toggle, index) => {
            if (toggle.isChecked) {
                selectedIndex = index;
            }
        });

        console.log("Selected Index:", selectedIndex);
        const type = fillterArr[selectedIndex] || "All";
        const page = this.currentPage;

        const url = `${globalThis.K.Token.auth_server}/api/transactions/history?category=${type}&page=${page}&limit=10`;

        globalThis.ServerCom.httpGetRequest(
            url,
            null,
            (response: any) => {
                if (response && response.success) {

                    this.fetchingData = false;

                    if (response.data.length === 0) {
                        this.noRecordLabel.node.active = this.currentPage == 1;
                        this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
                    }

                    const groupedData = this.groupByDateArray(response.data);
                    groupedData.forEach(group => {
                        this.addTransactionEntry(group);
                    });

                } else {
                    console.error("Failed to fetch transaction history:", response);
                }
            },
            (error: any) => {
                console.error("Network error:", error);
            }
        );
    }

    private groupByDateArray(transactions: Transaction[]): GroupedTransaction[] {
        const map: Record<string, Transaction[]> = {};

        transactions.forEach((txn) => {
            const formattedDate = this.formatDate(txn.date);

            if (!map[formattedDate]) {
                map[formattedDate] = [];
            }

            map[formattedDate].push(txn);
        });

        const result: GroupedTransaction[] = Object.keys(map).map((date) => ({
            date,
            data: map[date],
        }));

        // ✅ Sort latest first
        result.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return result;
    }

    private formatDate(timestamp: number): string {
        const d = new Date(timestamp);

        return d.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    private addTransactionEntry(groupData: GroupedTransaction) {
        if(this.contentNode.children.length >0){
            const lastChild = this.contentNode.children[this.contentNode.children.length - 1];
            const lastChildComp = lastChild.getComponent(TransactionContainer);
            if(lastChildComp){
                const lastDate = lastChildComp.getDate();
                if(lastDate == groupData.date){
                    // If the date is same as last entry, we can reuse the same container
                    lastChildComp.addTransactionHistory(groupData.date, groupData.data);
                    return;
                }
            }
        }
        const entryNode = cc.instantiate(this.TransactionContainerPrefab);

        const comp = entryNode.getComponent(TransactionContainer);
        if (!comp) {
            console.error("TransactionContainer component missing");
            return;
        }

        comp.setView(groupData.date, groupData.data);
        this.contentNode.addChild(entryNode);
        this.noRecordLabel.node.active = this.contentNode.childrenCount === 0;
    }

    onClickFillter() {
        this.currentPage = 1;
        this.contentNode.removeAllChildren();
        this.fetchTransactionHistory();
    }

    onDestroy() {
        if (this.scrollView) {
            this.scrollView.node.off('scroll-to-bottom', this.onScrollEnded, this);
        }
    }

    onScrollEnded() {
        if (this.fetchingData) return;
        this.currentPage = this.currentPage + 1;
        this.fetchingData = true;
        this.fetchTransactionHistory();
    }

}