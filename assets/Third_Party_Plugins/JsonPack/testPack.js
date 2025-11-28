cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        var json = {
            type: 'world',
            name: 'earth',
            children: [{
                type: 'continent',
                name: 'America',
                children: [{
                    type: 'country',
                    name: 'Chile',
                    children: [{
                        type: 'commune',
                        name: 'Antofagasta'
                    }]
                }]
            }, {
                    type: 'continent',
                    name: 'Europe'
                }]
        };

        var packed = jsonpack.pack(json);


    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
