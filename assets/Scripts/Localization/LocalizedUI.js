// const GAME_LANGUAGE = {
//     ENGLISH: 'en_us',
//     HINDI: 'hi_id'
// }
// const LOCAL_SAVE_LANGUAGE = 'LOCAL_SAVE_LANGUAGE'

cc.Class({
    extends: cc.Component,

    // properties: {
    //     currLanguage: {
    //         default: null,
    //         visible: false
    //     },
    //     textFile: {
    //         default: null,
    //         visible: true,
    //         type: cc.JsonAsset
    //     },
    //     textTable: [],
    //     textLanuage: [],
    // },
    // GAME_LANGUAGE = cc.Enum({
    //     ENGLISH : 'en_us',
    //     HINDI : 'hi_id'
    // }),
    // LOCAL_SAVE_LANGUAGE = 'LOCAL_SAVE_LANGUAGE',



    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // window.LocalizedManager = this;
        // this.textTable = this.textFile.json;
        // // this.currLanguage = cc.sys.localStorage.getItem(LOCAL_SAVE_LANGUAGE);
        // // if (this.currLanguage == null || this.currLanguage == undefined || this.currLanguage === '') {
        // // this.currLanguage = GAME_LANGUAGE.ENGLISH;
        // //     cc.sys.localStorage.setItem(LOCAL_SAVE_LANGUAGE, this.currLanguage);
        // // }
        // this.currLanguage = GAME_LANGUAGE.ENGLISH;
        // // this.loadTextLanguage(this.currLanguage);
        // this.LanguageDidChangeEvent = 'LanguageDidChangeEvent';

    },

    // start() {

    // },

    // loadTextLanguage: function (lang) {
    //     this.textLanuage = [];
    //     this.textTable.forEach(line => {
    //         var par = {
    //             KEY: line['KEY'],
    //             lang: line[lang]
    //         }
    //         this.textLanuage.push(par);
    //     });
    //     // cc.log('this.textLanuage ', this.textLanuage);
    // },

    // t: function (key) {
    //     // for (let i = 0; i < this.textTable.length; i++) {
    //     //     let line = this.textTable[i];
    //     //     if (line.KEY === key) {
    //     //         return line[this.currLanguage] || line[GAME_LANGUAGE.ENGLISH] || key;
    //     //     }
    //     // }
    //     const keyText = this.textTable[key] || {};
    //     const text = keyText[this.currLanguage] || keyText[GAME_LANGUAGE.ENGLISH] || key
    //     return text;
    // },

    clickOnLanguageBtn: function (event, customEventData) {
        // console.log('clickOnLanguageBtn', customEventData);
        const newLang = '' + customEventData;
        // if (newLang === this.currLanguage) {
        //     return;
        // }
        // this.currLanguage = newLang;
        // // console.log('Dispatch a change LANGUAGE EVENT');
        // const changeLangEvent = new cc.Event.EventCustom( this.LanguageDidChangeEvent, true );
        // cc.systemEvent.dispatchEvent( changeLangEvent );        
        LocalizedManager.changeLanguage(newLang);
    }
    // update (dt) {},
});
