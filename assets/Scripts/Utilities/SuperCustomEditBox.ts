const {ccclass, property} = cc._decorator;

@ccclass
export default class SuperCustomEditBox extends cc.Component {

    onLoad () {
    }

    start () {

    }

    onAndroidBegin (editbox) {
        // console.log("onBegin");
        // editbox.string = "";
        // editbox.node.getChildByName("TEXT_LABEL").opacity = 0;
        // editbox.node.getChildByName("PLACEHOLDER_LABEL").opacity = 0;
    }

    onAndroidEnded (editbox) {
        // console.log("onEnded");
        // console.log(editbox.string);
        
        // editbox.node.getChildByName("TEXT_LABEL").opacity = 255;
        // editbox.node.getChildByName("PLACEHOLDER_LABEL").opacity = 255;
    }
}
