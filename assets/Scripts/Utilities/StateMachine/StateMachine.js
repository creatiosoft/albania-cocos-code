/**
 * @namespace Utilities.StateMachine
 */
var StateType = require("State");
var TransitionType = require("Transition");
var emitter = require('EventEmitter');

/**
 * @class StateMachine
 * @memberof Utilities.StateMachine
 */
var StateMachine = cc.Class({
    extends: emitter,

    properties: {
        states: {
            default: [],
            type: [TransitionType],
        },

        currentState: {
            default: null,
            type: StateType,
        },
    },

    /**
     * @description adds a new state to machine
     * @method addState
     * @param {String} stateName name of the new state
     * @memberof Utilities.StateMachine.StateMachine#
     */
    addState: function (stateName) {
        this.states.push(this.node.addComponent(stateName));
    },

    /**
     * @description adds a transition to machine.
     * @method addTransition
     * @param {String} fromStateName name of the state from which transition is happening.
     * @param {String} transition transition which is triggered.
     * @param {String} toStateName name of the new currentState.
     * @memberof Utilities.StateMachine.StateMachine#
     */
    addTransition: function (fromStateName, transitionName, toStateName) {
        var s1 = this.node.getComponent(fromStateName);
        var t = this.node.addComponent(transitionName);
        t.fromState = s1;
        t.on("onTransition",this.onTransition.bind(this));
        t.toState = this.node.getComponent(toStateName);
        s1.transitions.push(t);
    },

    /**
     * @description Transition event: fired when a transition fires it from the current available states.
     * @method onTransition
     * @memberof Utilities.StateMachine.StateMachine#
     */
    onTransition: function (sender) {
        if (this.currentState == sender.fromState) {
            this.changeState(sender.toState);
        }
    },

    /**
     * @description Initializes StateMachine. Should be called after adding states and machines
     * @method initStateMachine
     * @memberof Utilities.StateMachine.StateMachine#
     */
    initStateMachine: function (stateName) {
        var s = this.node.getComponent(stateName);
        this.states.forEach(function (state) {
            state.transitions.forEach(function (transition) {
                transition.enabled = false;
            }, this);
            state.enabled = false;
        }, this);
        this.changeState(s);
    },

    /**
     * @description Changes current state and invokes exit and leave callbacks
     * @method changeState
     * @memberof Utilities.StateMachine.StateMachine# 
     */
    changeState: function (newStateObj) {
        if (this.currentState == null) {
            this.currentState = newStateObj;
            this.currentState.onStateEnter();
        } else {
            this.currentState.onStateExit();
            this.currentState = newStateObj;
            this.currentState.onStateEnter();
        }
    },

});
