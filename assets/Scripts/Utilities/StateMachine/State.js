cc.Class({
    extends: cc.Component,

    properties: {
        transitions: {
            default: [],
        },
    },

    onStateEnter: function () {
        this.enabled = true;
        this.transitions.forEach(function (transition) {
            transition.enabled = true;
        }, this);
    },

    onStateExit: function () {
        this.transitions.forEach(function (transition) {
            transition.enabled = false;
        }, this);
        this.enabled = false;
    },
});
