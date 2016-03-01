

var BMFontLayer = cc.Layer.extend({
    
    ctor:function(){

        this._super();
        var size = cc.director.getWinSize();
        var bmFont1 = new cc.LabelBMFont("AABBCC",res.Font_font_fnt,500,cc.TEXT_ALIGNMENT_CENTER);
        bmFont1.color = cc.color(255,0,0);
        this.addChild(bmFont1);
        bmFont1.x = size.width / 2;
        bmFont1.y = size.height / 2;

        var label = new cc.LabelTTF("AABBCC","Arial",32,cc.TEXT_ALIGNMENT_CENTER);
        label.setColor(cc.color(255,0,0));
        this.addChild(label);
        label.x  = size.width / 2;
        label.y  = size.height / 2 + 50;
        //(text, fontName, fontSize, dimensions, hAlignment, vAlignment)
        return true;
    }
 
});


var BMFontScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new BMFontLayer();
        this.addChild(layer,1);
    }
});
        

