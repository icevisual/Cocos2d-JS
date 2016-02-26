

var BatchNodeLayer = cc.Layer.extend({
    
    ctor:function(){

        this._super();

        var size = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.candy_candy_plist);
        var batchNode = new cc.SpriteBatchNode(res.candy_candy_png);
        this.addChild(batchNode);
        for(var i = 0 ; i < 4000 ; i ++){
            var ball = new cc.Sprite("#" + parseInt(Math.random() * 5 + 1) + ".png") ;
            batchNode.addChild(ball);
            ball.x = Math.random() * size.width;
            ball.y = Math.random() * size.height;
            ball.runAction(cc.rotateBy(1,360*Math.random(),360*Math.random()).repeatForever()); 
        }

        return true;
    }
 
});


var BatchNodeScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new BatchNodeLayer();
        this.addChild(layer,1);
    }
});
        


