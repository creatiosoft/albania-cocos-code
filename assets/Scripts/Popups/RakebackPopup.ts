import { PopUpType } from "../Utilities/ScreensAndPopUps/PopUps/PopUpManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RakebackPopup extends cc.Component {

    @property(cc.Label) dateTimeLabel: cc.Label = null!;
    @property(cc.Label) amountLabel: cc.Label = null!;


    data: any = null;
    start() {
        this.scheduleOnce(() => {
            this.setView();
        }, 0.001);
    }

    setView() {
        this.data = this.node.getComponent("PopUpBase").data;
        this.initViews(this.data);
    }

    protected onEnable(): void {
        this.unscheduleAllCallbacks();
        this.scheduleOnce(() => {
            this.setView();
        }, 0.001);
    }

    initViews(data: any) {
        if (data == undefined) {
            return;
        }
        this.data = data;
        let dateObj = new Date(data.transferAt);

        let dateStr = dateObj.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        this.dateTimeLabel.string = "Bonus Date: " + dateStr;
        this.amountLabel.string = data.bonusAmount.toString();
    }

    closePopup() {

        let body = {
            notificationId: this.data.notificationId,
        };
        const url = globalThis.K.Token.auth_server+"/api/notifications/dismiss-rakeback";

        globalThis.ServerCom.httpPostRequest(
            url,
            body,
            (response: any) => {
                if (response && response.success) {
                    globalThis.GameManager.popUpManager.hide(PopUpType.RakebackPopup, function () {});
                } else {
                    globalThis.GameManager.popUpManager.hide(PopUpType.RakebackPopup, function () {});
                }
            },
            (error: any) => {
                    globalThis.GameManager.popUpManager.hide(PopUpType.RakebackPopup, function () {});
            }
        );
    }

    // update (dt) {}.  
}
