

var ParallaxLayer = cc.Layer.extend({
    
    ctor:function(){

        this._super();

        var bg = new cc.ParallaxNode();
        var bg1 = new cc.Sprite(res.bgLayer_jpg);
        var bg2 = new cc.Sprite(res.bgLayer2_png);
        var bg3 = new cc.Sprite(res.bgLayer3_png);
        var bg4 = new cc.Sprite(res.bgLayer4_png);

        bg.addChild(bg1,1,cc.p(0.1,0),cc.p(bg1.width/2,bg1.height/2));
        bg.addChild(bg2,2,cc.p(0.3,0),cc.p(bg2.width/2,bg2.height/2));
        bg.addChild(bg3,3,cc.p(0.5,0),cc.p(bg3.width/2,bg3.height/2));
        bg.addChild(bg4,4,cc.p(1,0),cc.p(bg4.width/2,bg4.height/2));
        
        var action = cc.moveBy(1,-200,0);
        var action1 = cc.sequence(action,action.clone().reverse());
        bg.runAction(action1.repeatForever());
        this.addChild(bg);
        return true;
    }
 
});


var ParallaxScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new ParallaxLayer();
        this.addChild(layer,1);
    }
});
        


