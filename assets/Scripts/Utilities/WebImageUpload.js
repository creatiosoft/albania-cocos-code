var self;
/**
 * @class WebImageUpload
 * @classdesc Manages the uploads of profile picture of user
 * @memberof Utilities
 */
cc.Class({
    extends: cc.Component,

    properties: {

        base64Data: null,
        imageLoaded: null,
        spriteLoaded: null,
    },

    onLoad: function() {
        window.WebImageUpload = this;
    },

   /**
     * @description Loads Image
     * @method loadImage
     * @param {callback} callback
     * @memberof Utilities. WebImageUpload#
     */
    loadImage: function(callBack) {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "file");
        x.setAttribute("value", "Click me");
        x.setAttribute("id", "Upload");
        x.setAttribute("hidden", "true");
        x.setAttribute("accept", "image/*");
        self = this;
        x.onchange = function(input) {
            self.readURL(this);
        };
        document.body.appendChild(x);
        this.imageLoaded = callBack;
        document.getElementById('Upload').click();
    },


    /**
     * @description Resizes the image to be uploaded
     * @method readURL
     * @param {Object} input
     * @memberof Utilities. WebImageUpload#
     */
    readURL: function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                // if (document.getElementById('Upload').files[0].size < 204800) {

                self.base64Data = e.target.result;
                // var imgElement = window.UploadImage.createElement("IMG");
                // imgElement.setAttribute("src", e.target.result);
                var imgElement = new Image();
                imgElement.src = e.target.result;
                self.scheduleOnce(function() {
                    //console.log(imgElement.width + " , " + imgElement.height);
                    var k = self._resize(imgElement, 500, 500);
                    if (k != false) {

                        self.base64Data = k;
                        self.scheduleOnce(function() {
                            var texture2d = new cc.Texture2D();
                            texture2d.initWithElement(imgElement);
                            texture2d.handleLoadedTexture();
                            self.spriteLoaded = new cc.SpriteFrame(texture2d);
                            self.imageLoaded(self.spriteLoaded);
                        }, 0.2);
                    } else {
                        alert('There was a problem, please upload again');
                    }
                }, 0.2);
            };
            reader.readAsDataURL(input.files[0]);
        }
    },

    /**
     * @description resizes the canvas according to the size of image
     * @method _resize
     * @param {Object} img
     * @param {Number} maxWidth
     * @param {Number} maxHeight
     * @memberof Utilities. WebImageUpload#
     */
    _resize: function(img, maxWidth, maxHeight) {
        var ratio = 1;
        var canvas = document.createElement("canvas");
        canvas.style.display = "none";
        document.body.appendChild(canvas);

        var canvasCopy = document.createElement("canvas");
        canvasCopy.style.display = "none";
        document.body.appendChild(canvasCopy);

        var ctx = canvas.getContext("2d");
        var copyContext = canvasCopy.getContext("2d");

        if (img.width > maxWidth)
            ratio = maxWidth / img.width;
        else if (img.height > maxHeight)
            ratio = maxHeight / img.height;

        canvasCopy.width = img.width;
        canvasCopy.height = img.height;
        // console.log(img.width + ", " +
        //     img.height);
        try {
            copyContext.drawImage(img, 0, 0);
        } catch (e) {
            alert("There was a problem - please reupload your image");
            return false;
        }
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // the line to change
        //ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
        // the method signature you are using is for slicing
        ctx.drawImage(canvasCopy, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL("image/png");
        document.body.removeChild(canvas);
        document.body.removeChild(canvasCopy);
        return dataURL;
        // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");


    },

});