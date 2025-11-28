
const {ccclass, property} = cc._decorator;
// import {GameManager} from './../Controllers/GameManager';
// var GameManager = require('GameManager').GameManager;
// import {FriendCard} from './../pages/FriendCard'
// var GameManager = require("GameManager");

@ccclass
export class TutorialManager extends cc.Component {

    @property(cc.Node)
    tutoSteps: cc.Node[] = []
    @property(cc.Node)
    gotItNode: cc.Node = null;
    @property(cc.Node)
    nextNode: cc.Node = null;
    @property(cc.Node)
    skipNode: cc.Node = null;
    
    curStep = 0;


    readonly finishedTuto = 'FINISH_TUTORIAL';

    start () {
        this.showSteps(-1);
        this.gotItNode.active = this.skipNode.active = this.nextNode.active = false;
        if (!this.isFinishTuto())
            this.startTuto();
        else {
            this.node.active = false;
        }
        
    }

    startTuto() {
        this.curStep = 0;
        this.gotItNode.active = false;
        this.skipNode.active = this.nextNode.active = true;
        this.showSteps(this.curStep);
    }

    onClickNextBtn() {
        window.GameManager.playSound(K.Sounds.click);
        this.curStep ++;
        this.showSteps (this.curStep);
    }

    showSteps(step) {
        this.tutoSteps.forEach((node, i)  => {
            node.active = i === step;
        })
        if (this.curStep === this.tutoSteps.length - 1) {
            this.gotItNode.active = true;
            this.skipNode.active = this.nextNode.active = false;
        }
    }

    onClickSkipBtn() {
        window.GameManager.playSound(K.Sounds.click);
        this.markTutoDone();
    }

    onClickGotItBtn() {
        window.GameManager.playSound(K.Sounds.click);
        this.markTutoDone();
    }

    markTutoDone() {
        localStorage.setItem(this.finishedTuto, 'true');
        this.node.active = false;
    }

    isFinishTuto() {
        const isFinish = localStorage.getItem(this.finishedTuto);
        return !!isFinish && isFinish === 'true';
    }



    




}
