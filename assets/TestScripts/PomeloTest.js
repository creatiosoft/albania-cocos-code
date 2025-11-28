var pomelo = window.pomelo;
var route = 'database.dbHandler.verifyLoginDetail';

var instance;

var PomeloTest = cc.Class({
    extends: cc.Component,

    properties: {
        lbl: {
            default: null,
            type: cc.Label,
        },
        broadcastRegister: {
            default: false,
        }
    },

    onLoad: function() {
        instance = this;
    },

    initializePomelo: function() {
        pomelo.init({
            host: "192.168.2.7",
            port: 3014,
            // encrypt: true,
            log: true
        }, function() {
            instance.lbl.string = 'pomelo.init 1';
            // pomelo.request(route, {
            //     playerToken: 'ByeC8MjM',
            // }, function (data) {
            //     instance.lbl.string = 'pomelo.request 1 ' + JSON.stringify(data);
            //     // pomelo.disconnect();
            //     // pomelo.init({
            //     //     host: data.host,
            //     //     port: data.port,
            //     //     log: true
            //     // }, function() {
            //     //     instance.lbl.string = 'pomelo.init 2';
            //     // });
            // });
        });
    },

    queryEntry: function() {
        var route = 'gate.gateHandler.queryEntry';
        pomelo.init({
            host: "192.168.45.19",
            port: 3014,
            encrypt: true,
            log: true
        }, function() {
            pomelo.request(route, {
                uid: "sasas"
            }, function(data) {
                pomelo.disconnect();
                if (data.code === 500) {
                    //showError(LOGIN_ERROR);
                    return;
                }
                // callback(data.host, data.port);
            });
        });
    },


    onClick: function() {
        //this.sendHttpRequest();
        this.queryEntry();
    },
});

