

var MenuTtemToggleLayer = cc.Layer.extend({
    
    ctor:function(){

        this._super();

        var size = cc.director.getWinSize();
        var lineX = new cc.LayerColor(cc.color(255,255,255),size.width,1);
        lineX.x = 0;
        lineX.y = size.height/2;
        this.addChild(lineX,1);
        var lineY = new cc.LayerColor(cc.color(255,255,255),1,size.height);
        lineY.x = size.width/2;
        lineY.y = 0;
        this.addChild(lineY,1);

        // var label = new cc.LabelTTF(text,font,fontSize,labelSize,hAlign,vAlign);
        var aboutText = new cc.LabelTTF('About this game \n...','Arial',20,cc.size(350,200),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICALTEXT_ALIGNMENT_TOP);
        aboutText.x = size.width / 2;
        aboutText.y = size.height / 2;
        this.addChild(aboutText);

        cc.MenuItemFont.setFontSize(32);
        cc.MenuItemFont.setFontName('Arial');
        var on = new cc.MenuItemFont('OON');
        var off = new cc.MenuItemFont('OFF');
        // var item = new cc.MenuItemToggle(off,on,this.toggleMusic,this);
        var menu = new cc.Menu(on,off);
        this.addChild(menu);
        // menu.alignItemsVertically();
        // menu.alignItemsHorizontally(20);
        menu.alignItemsHorizontallyWithPadding(200);
        // menu.x = 100;
        // menu.y = 100;
        return true;
    },
    toggleMusic:function(){

        if(this.musicOff){
            trace('Music Off');
            this.musicOff = false;
        }else{
            trace('Music On');
            this.musicOff = true;
        }
    }
 
});


var MenuTtemToggleScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new MenuTtemToggleLayer();
        this.addChild(layer,1);
    }
});
        


