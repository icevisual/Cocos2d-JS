

var MenuItemSpriteLayer = cc.Layer.extend({
    
    ctor:function(){

        this._super();

        var spriteNormal= new cc.Sprite(res.startgame_png);
        var spriteSelected = new cc.Sprite(res.startgame2_png);
        var spriteDisabled = new cc.Sprite(res.startgame3_png);

        // var menuSprite = new cc.MenuItemSprite(spriteNormal,spriteSelected,spriteDisabled,this.startgame,this);
        // var item = new cc.MenuItemImage(res.startgame_png,res.startgame2_png,res.startgame3_png,this.startgame,this);


        // // cc.MenuItemFont.setFontSize(100);
        // var item = new cc.MenuItemFont('START GAME',this.startgame,this);
        // menuFont.fontSize = 32;
        // item.fontName = "Arial";
        var label = new cc.LabelTTF("START GAME","Arial",32);
        var item = new cc.MenuItemLabel(label,this.startgame,this);
        
        var menu = new cc.Menu(item);
        this.addChild(menu);
        
        item.setEnabled(true);
        this.schedule(function(){
            item.setEnabled(false);
        },4);
        return true;
    },
    startgame : function(){
        trace("this is MenuItemSpriteLayer",this instanceof MenuItemSpriteLayer);
    }
    
});


var MenuItemSpriteScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new MenuItemSpriteLayer();
        this.addChild(layer,1);
    }
});

