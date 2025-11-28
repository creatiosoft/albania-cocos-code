const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("Script/Extend/NtScrollView")
export default class NtScrollView extends cc.ViewGroup {
    @property({ type: cc.ScrollView, tooltip: CC_DEV && '需要操作的ScrollView' })
    scrollView: cc.ScrollView = null;

    @property({ tooltip: CC_DEV && '如果这个属性被设置为 true，那么滚动行为会取消子节点上注册的触摸事件，默认被设置为 true' })
    cancelInnerEvents: boolean = true;

    pageView: cc.ScrollView = null;
    direction = null;
    start_loc = null;
    _touchMoved = false;
    // cancelInnerEvents = true;


    onLoad() {
        // let arr = cc.director.getScene().getChildByName('Canvas').getComponentsInChildren(cc.ScrollView);
        // if (arr.length > 0) this.pageView = arr[0];
        let ObIconCellSNode = this.node.parent;
        let ObLandScrolls = ObIconCellSNode.parent.parent.parent;

        this.pageView = ObLandScrolls.getComponent(cc.ScrollView);
        this.direction = null;
        this.start_loc = null;
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, true);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, true);
    }

    //this is for nested scrollview
    hasNestedViewGroup(event, captureListeners) {
        if (event.eventPhase !== cc.Event.CAPTURING_PHASE) return;

        if (captureListeners) {
            //captureListeners are arranged from child to parent
            for (var i = 0; i < captureListeners.length; ++i) {
                var item = captureListeners[i];

                if (this.node === item) {
                    if (event.target.getComponent(cc.ViewGroup)) {
                        return true;
                    }

                    return false;
                }

                if (item.getComponent(cc.ViewGroup)) {
                    return true;
                }
            }
        }

        return false;
    }

    //This is for Scrollview as children of a Button
    _stopPropagationIfTargetIsMe(event) {
        if (event.eventPhase === cc.Event.AT_TARGET && event.target === this.node) {
            event.stopPropagation();
        }
    }
    // touch event handler
    _onTouchBegan(event, captureListeners) {
        if (!this.enabledInHierarchy) return;
        if (this.hasNestedViewGroup(event, captureListeners)) return;

        var touch = event.touch;
        this.start_loc = event.touch.getLocation();
        if (this.node) {
            if (this.pageView) {
                //@ts-ignore
                this.pageView._handlePressLogic(touch);
            }

            if (this.scrollView) {
                //@ts-ignore
                this.scrollView._handlePressLogic(touch);
            }
        }

        this._touchMoved = false;
        this._stopPropagationIfTargetIsMe(event);
    }

    _onTouchMoved(event, captureListeners) {
        let now_pos = event.touch.getLocation();
        let delta_x = Math.abs(this.start_loc.x - now_pos.x);
        let delta_y = Math.abs(this.start_loc.y - now_pos.y);
        if ((delta_x > 5 || delta_y > 5) && !this.direction) {
            this.direction = delta_x > delta_y ? "pageview_move" : "scrollview_move";
            // this.direction = delta_x > delta_y ? "pageview_move" : "scrollview_move";
            // cc.log('this.direction', this.direction);
        }


        if (!this.enabledInHierarchy) return;
        if (this.hasNestedViewGroup(event, captureListeners)) return;

        var touch = event.touch;
        if (this.node) {
            this._handleMoveLogic(touch);
        }

        // Do not prevent touch events in inner nodes
        if (!this.cancelInnerEvents) {
            return;
        }

        // var deltaMove = cc.pSub(touch.getLocation(), touch.getStartLocation());
        // cc.pSub is removed, please use p1.sub(p2) instead.
        var deltaMove = touch.getLocation().sub(touch.getStartLocation());

        //FIXME: touch move delta should be calculated by DPI.
        // cc.pLength is removed, please use p.mag() instead.

        // if (cc.pLength(deltaMove) > 7) {
        if (deltaMove.mag() > 7) {
            if (!this._touchMoved && event.target !== this.node) {
                // Simulate touch cancel for target node
                var cancelEvent = new cc.Event.EventTouch(event.getTouches(), event.bubbles);
                cancelEvent.type = cc.Node.EventType.TOUCH_CANCEL;
                cancelEvent.touch = event.touch;
                //@ts-ignore
                cancelEvent.simulate = true;
                event.target.dispatchEvent(cancelEvent);
                this._touchMoved = true;
            }
        }

        this._stopPropagationIfTargetIsMe(event);
    }

    _onTouchEnded(event, captureListeners) {
        this.direction = null;
        if (!this.enabledInHierarchy) return;
        if (this.hasNestedViewGroup(event, captureListeners)) return;

        var touch = event.touch;
        if (this.node) {
            this._handleReleaseLogic(touch);
        }

        if (this.pageView) {
            //@ts-ignore
            this.pageView._dispatchEvent('touch-up');
        }

        if (this.scrollView) {
            //@ts-ignore
            this.scrollView._dispatchEvent('touch-up');
        }

        if (this._touchMoved) {
            event.stopPropagation();
        } else {
            this._stopPropagationIfTargetIsMe(event);
        }
    }

    _onTouchCancelled(event, captureListeners) {
        this.direction = null;
        if (!this.enabledInHierarchy) return;
        if (this.hasNestedViewGroup(event, captureListeners)) return;

        // Filte touch cancel event send from self
        if (!event.simulate) {
            var touch = event.touch;
            if (this.node) {
                this._handleReleaseLogic(touch);
            }
        }

        this._stopPropagationIfTargetIsMe(event);
    }

    _clampDelta(delta) {
        let x = Math.abs(delta.x);
        let y = Math.abs(delta.y);
        if (x < y) {
            delta.x = 0;
        } else {
            delta.y = 0;
        }

        return delta;
    }

    _handleMoveLogic(touch) {
        let deltaMove = this._clampDelta(touch.getDelta());
        if (this.pageView) {
            //@ts-ignore
            this.pageView._processDeltaMove(deltaMove);
        }

        if (this.scrollView) {
            //@ts-ignore
            this.scrollView._processDeltaMove(deltaMove);
        }

        // if (this.direction === "pageview_move") {
        //     if (this.pageView) {
        //         //@ts-ignore
        //         this.pageView._processDeltaMove(deltaMove);
        //     }
        // } else {
        //     if (this.scrollView) {
        //         //@ts-ignore
        //         this.scrollView._processDeltaMove(deltaMove);
        //     }
        // }
    }

    _handleReleaseLogic(touch) {
        var delta = touch.getDelta();
        delta = this._clampDelta(delta);
        if (this.pageView) {
            // //@ts-ignore
            // this.pageView._handleReleaseLogic();

            //@ts-ignore
            this.pageView._gatherTouchMove(delta);
            //@ts-ignore
            this.pageView._processInertiaScroll();
            //@ts-ignore
            this.pageView._dispatchEvent('scroll-ended');
        }

        if (this.scrollView) {
            //@ts-ignore
            this.scrollView._gatherTouchMove(delta);
            //@ts-ignore
            this.scrollView._processInertiaScroll();
            //@ts-ignore
            this.scrollView._dispatchEvent('scroll-ended');
        }
    }
}
