

var MenuItemSpriteLayer = cc.Layer.extend({
    
    ctor:function(){

        this._super();

        var spriteNormal= new cc.Sprite(res.startgame_png);
        var spriteSelected = new cc.Sprite(res.startgame2_png);
        var spriteDisabled = new cc.Sprite(res.startgame3_png);

        var menuSprite = new cc.MenuItemSprite(spriteNormal,spriteSelected,spriteDisabled,this.startgame,this);

        var menu = new cc.Menu(menuSprite);
        this.addChild(menu);
        menuSprite.setEnabled(false);
        menuSprite.setEnabled(true);
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

