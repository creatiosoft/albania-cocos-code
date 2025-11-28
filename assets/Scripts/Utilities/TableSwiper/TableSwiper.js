cc.Class({
    extends: cc.Component,

    properties: {
        holder: cc.Node,
        blockNode: cc.Node,
        startScrollingWaitTimer: 0.4,
        selfMoveTimer: null,
        swipeTimer: 0.4,

    },

    onLoad() {
        // cc.view.setDesignResolutionSize(ScreenManager.node.width,1080,cc.ResolutionPolicy.FIXED_WIDTH);
        // this.getPositionsForResolution();
        // this.registerTouchSwipeEvents();
        // this.getPositionsForResolution();

        //     GameManager.gameModel.on("LEAVE FOR TABLE SWIPE", () => {
        //         this.deRegisterTouchSwipeEvents();
        //         this.forceReset();
        //     });
        //     GameManager.gameModel.on("JOIN FOR TABLE SWIPE", () => {
        //         this.registerTouchSwipeEvents();
        //     });
    },

    forceReset() {
        this.holder.setPosition(0, 0);
        let count = 0;
        this.holder.children.forEach((e, i) => {
            if (cc.isValid(e, true)) {
                e.setPosition(count * ScreenManager.node.width, 0);
                count++;
            }
        }, this);
    },
    getPositionsForResolution() {
        // this.positions = [];
        this.worldPositions = [];
        this.holder.children.forEach((e) => {
            this.worldPositions.push(e.parent.convertToWorldSpaceAR(e.position).x);
            // this.positions.push(e.position.x)
        }, this);

        console.log("getPositionsForResolution", this.worldPositions);
    },

    registerTouchSwipeEvents() {
        // console.error("re")
        this.getPositionsForResolution();
        // let n = K.PPC ? this.node.parent.children[1] : this.node.parent.children[0];
        let n = this.node.parent.children[0];

        n.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.correctViewIfNeeded();
            this.startPos = new cc.Vec2(event.touch.getLocation());
            this.startDate = new Date();
            this.originalPos = this.holder.position.x;
        }.bind(this));

        n.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.moveDate = new Date();
            let secs = (this.moveDate - this.startDate) / 1000;
            let x = event.touch.getLocation();
            this.prevMovePos = !!this.movePos ? this.movePos : this.startPos;
            this.movePos = new cc.Vec2(x.x, x.y);
            console.log("this.movePos", this.movePos.x, this.movePos.y);
            if (secs > this.startScrollingWaitTimer) {
                console.log("startSlowSwipe");
                this.startSlowSwipe();
            } else {
                if (this.selfMoveTimer == null) {
                    this.selfMoveTimer = setTimeout(() => {
                        this.startSlowSwipe(true);
                    }, this.startScrollingWaitTimer * 1000);
                }
            }
        }.bind(this));

        n.on(cc.Node.EventType.TOUCH_END, function (event) {
            clearTimeout(this.selfMoveTimer);
            this.selfMoveTimer = null;
            this.endDate = new Date();
            let secs = (this.endDate - this.startDate) / 1000;
            let x = event.touch.getLocation();
            this.endPos = new cc.Vec2(x.x, x.y);
            if (secs > this.startScrollingWaitTimer) {
                this.checkIfSwipe();
            } else {
                this.doImmediateSwipe();
            }
            this.movePos = null;
        }.bind(this));
    },

    deRegisterTouchSwipeEvents() {
        let n = this.node.parent.children[0];
        n.off(cc.Node.EventType.TOUCH_START);
        n.off(cc.Node.EventType.TOUCH_MOVE);
        n.off(cc.Node.EventType.TOUCH_END);
    },

    getCurrentViewStatus(offset = 10, whileMove = false, direction) {
        console.log("getCurrentViewStatus", offset, whileMove, direction);
        let toReturn = -1;
        let offsetL = offset;
        let offsetR = offset;
        if (whileMove) {
            if (direction == "LEFT") {
                offsetL = 50;
            }
            if (direction == "RIGHT") {
                offsetR = 50;
            }
        }
        this.holder.children.forEach(function (elem, i) {
            let x = elem.parent.convertToWorldSpaceAR(elem.position).x;
            console.error("Z ", i, "   ", parseInt(x), (this.worldPositions[0]), parseInt(x) > parseInt(this.worldPositions[0]) - offsetL, parseInt(x) < parseInt(this.worldPositions[0]) + offsetR)
            if ((parseInt(x) > (parseInt(this.worldPositions[0]) - offsetL)) && (parseInt(x) < (parseInt(this.worldPositions[0]) + offsetR))) {
                toReturn = i;
            }
        }, this);

        console.log("toReturn", toReturn);
        return toReturn;
    },


    correctViewIfNeeded() {
        if (this.getCurrentViewStatus() == -1) {
            this.tryToRestore();
        } else {
            // console.log("everything correct with current visible =", this.getCurrentViewStatus())
        }
    },

    tryToRestore() {
        return;
        let toReturn = -1;
        this.holder.children.forEach(function (elem, i) {
            let x = elem.parent.convertToWorldSpaceAR(elem.position).x;
            // console.log("A", parseInt(x), parseInt(this.worldPositions[0]))
            if (parseInt(x) > parseInt(this.worldPositions[0]) - 960 && parseInt(x) < parseInt(this.worldPositions[0]) + 960) {
                toReturn = i;
            }
        }, this);
        if (toReturn != -1)
            this.restoreEverything(toReturn);
        else
            this.restoreEverything(0);
        return toReturn;
    },


    restoreEverything(forcedIndex) {
        return;
        console.log("TableSwiper restoreEverything forcedIndex", forcedIndex);
        let currentIndex = (!!forcedIndex || forcedIndex == 0) ? forcedIndex : this.getCurrentViewStatus();
        if (currentIndex == -1) {
            this.tryToRestore();
            return
        }
        this.holder.setPosition(0, 0);

        this.holder.children.forEach((e, i) => {
            if (i == currentIndex) {
                e.setPosition(0, 0);
            } else if (i < currentIndex) {
                e.setPosition(0 - ((currentIndex - i) * ScreenManager.node.width), 0);
            } else {
                e.setPosition(0 + ((i - currentIndex) * ScreenManager.node.width), 0);
                }
        }, this);
    },

    swipeBtn() {
        if (this.node.children[0].active)
            this.node.children[0].active = false;
        else
            this.node.children[1].active = false;
    },

    startSlowSwipe(initial) {
        let y = this.prevMovePos.sub(this.movePos);
        let x = this.startPos.sub(this.movePos);
        if (y.x > 0) {
            console.log("startSlowSwipe RIGHT");
            this.adjustPagesHeirarchy("RIGHT", "move");
        } else {
            console.log("startSlowSwipe LEFT");
            this.adjustPagesHeirarchy("LEFT", "move");
        }

        if (initial) {
            this.holder.runAction(cc.moveTo(this.swipeTimer / 1.3, this.originalPos - x.x, 0).easing(cc.easeIn(0.5)));
        } else {
            this.holder.setPosition(this.originalPos - x.x, 0);
        }
    },

    checkIfSwipe() {
        let x = this.startPos.sub(this.endPos);
        this.blockNode.active = true;
        let seq = null;
        let cf = cc.callFunc(() => {
            this.blockNode.active = false;
            this.restoreEverything();
            let i = this.getCurrentViewStatus();
            if (i == -1) {
                GameScreen.onTabSelection(0);
            } else {
                GameScreen.onTabSelection(i);
            }
        });
        if (Math.abs(x.x) > 200) {
            if (x.x > 0) {
                seq = cc.sequence(cc.moveTo(this.swipeTimer, this.originalPos - ScreenManager.node.width, 0).easing(cc.easeIn(0.5)), cf)
            } else {
                seq = cc.sequence(cc.moveTo(this.swipeTimer, this.originalPos + ScreenManager.node.width, 0).easing(cc.easeIn(0.5)), cf)
            }
        } else {
            //wapas wapas anim
            seq = cc.sequence(cc.moveTo(this.swipeTimer, this.originalPos, 0).easing(cc.easeIn(0.5)), cf)
        }
        this.holder.runAction(seq);
    },

    doImmediateSwipe() {
        //dont check big offset
        //check smaller offset for imm swipe

        let x = this.startPos.sub(this.endPos);
        if (Math.abs(x.x) > 60) { //hardcoded
            if (x.x > 0) {
                //Swipe to left
                this.adjustPagesHeirarchy("RIGHT");
                this.runSwipeAction(this.originalPos - ScreenManager.node.width);
                return

                if (this.getInfoOfCurrentVisibleScreen() == "RIGHT") {
                    //Right Corner case
                    this.adjustPagesHeirarchy("RIGHT");
                    this.runSwipeAction(this.originalPos - ScreenManager.node.width); //hardcoded.
                } else {
                    //Normal case
                    this.runSwipeAction(this.originalPos - ScreenManager.node.width);
                }
            } else {
                //Swipe to right
                this.adjustPagesHeirarchy("LEFT");
                this.runSwipeAction(this.originalPos + ScreenManager.node.width);
                return

                if (this.getInfoOfCurrentVisibleScreen() == "LEFT") {
                    //Left Corner Case
                    this.adjustPagesHeirarchy("LEFT");
                    this.runSwipeAction(this.originalPos + ScreenManager.node.width);
                } else {
                    //Normal Case
                    this.runSwipeAction(this.originalPos + ScreenManager.node.width);
                }
            }
        }
    },

    runSwipeAction(desiredContentXpos) {
        this.blockNode.active = true;
        let seq = cc.sequence(cc.moveTo(0.3, desiredContentXpos, 0), cc.callFunc(() => {
            this.blockNode.active = false;
            let i = this.getCurrentViewStatus();
            if (i == -1) {
                GameScreen.onTabSelection(0)
            } else {
                GameScreen.onTabSelection(i)
            }
        }))
        this.holder.runAction(seq)
    },

    adjustPagesHeirarchy(direction, ifFromMove) {
        console.log("adjustPagesHeirarchy", direction, ifFromMove);
        let ci; // = this.getCurrentViewStatus(400);
        if (ifFromMove == "move") {
            ci = this.getCurrentViewStatus(400, true, direction);
            // console.log(ci)
        } else {
            ci = this.getCurrentViewStatus(400);
        }
        // console.error("adjustPagesHeirarchy", direction, ci); //, ci != 0, ci != this.holder.children.length - 1)
        this.newChecker(ci, direction)
        return
        // if (direction == "LEFT") {
        //     if (ci != 0) {
        //         //////console.log("returning cz direction=left & ci=", ci)
        //         return;
        //     }
        // } else if (direction == "RIGHT") {
        //     //////console.log("returning cz direction=right & ci=", ci)
        //     if (ci != this.holder.children.length - 1) {
        //         return
        //     }
        // }
        // let n = this.holder.children;
        // let p = [];
        // n.forEach(function (element) {
        //     p.push(element);
        // }, this);

        // //////console.error("CHANGING CHILD")
        // if (direction == "LEFT") {
        //     let temp = n[0].position;
        //     // this.holder.removeChild(n[n.length - 1], false);
        //     // this.holder.insertChild(p[p.length - 1], 0);
        //     p[p.length - 1].setPosition(temp.x - ScreenManager.node.width, 0);
        //     // this.tabsMgmt();

        // } else if (direction == "RIGHT") {
        //     let temp = n[n.length - 1].position;
        //     // this.holder.removeChild(n[0], false);
        //     // this.holder.insertChild(p[0], p.length - 1);
        //     p[0].setPosition(temp.x + ScreenManager.node.width, 0);
        //     // this.tabsMgmt();
        // }
    },
  
    newChecker(ci, direction) {
        if (ci == -1) {
            // ci = this.newM();
            return
        }
        let arr = [];
        this.holder.children.forEach((e) => {
            arr.push(e.x);
        }, this);
        arr.sort(function (a, b) {
            return a - b;
        });
        if (direction == "LEFT") {
            if (this.holder.children[ci].x == arr[0]) {
                let t = null;
                this.holder.children.forEach((e) => {
                    if (e.x == arr[arr.length - 1]) {
                        t = e;
                    }
                }, this);
                if (t != null) {
                    t.setPosition(arr[0] - ScreenManager.node.width, 0)
                }
            }
        } else if (direction == "RIGHT") {
            if (this.holder.children[ci].x == arr[arr.length - 1]) {
                let t = null;
                this.holder.children.forEach((e) => {
                    if (e.x == arr[0]) {
                        t = e;
                    }
                }, this);
                if (t != null) {
                    t.setPosition(arr[arr.length - 1] + ScreenManager.node.width, 0);
                }
            }
        }
    }
})
