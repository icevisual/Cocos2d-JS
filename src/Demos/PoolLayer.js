var ReuseSprite = cc.Sprite.extend({

    ctor:function(url){
        this._super(url);
    },
    reuse:function(param){
        // trace("resue",param);
    },
    unuse:function(){
        // trace("unuse");
    }

});
var all = 1500;
var PoolLayer = cc.Layer.extend({
    tag: 0,
    deleteTag :0,
    ctor:function(){

        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.candy_candy_plist);
        this.tag = this.deleteTag = 0;

        this.scheduleUpdate();
        this.scheduleOnce(function(){
            this.pause();
        },10);
        return true;
    },
    update:function(){
        var size = cc.director.getWinSize();
        if(this.tag - this.deleteTag > all){
            for(var i = 0; i < all / 2 ; i ++){
                var ball = this.getChildByTag(this.deleteTag);
                cc.pool.putInPool(ball);
                this.removeChild(ball);
                this.deleteTag ++;
            }
        }
        var param = "something";
        for(var i = 0 ; i < all / 2 ; i ++){
            var ball = null;
            if(cc.pool.hasObject(ReuseSprite)){
                ball = cc.pool.getFromPool(ReuseSprite,param);
            }else{
                ball = new ReuseSprite("#"+parseInt(Math.random()*5+1) + ".png");
            }
            this.addChild(ball,1,this.tag);
            this.tag ++;
            ball.x = Math.random() * size.width;
            ball.y = Math.random() * size.height;
        }
    }
 
});


var NoPoolLayer = cc.Layer.extend({
    tag: 0,
    deleteTag :0,
    ctor:function(){

        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.candy_candy_plist);
        this.tag = this.deleteTag = 0;

        this.scheduleUpdate();
        this.scheduleOnce(function(){
            this.pause();
        },10);
        return true;
    },
    update:function(){
        var size = cc.director.getWinSize();
        if(this.tag - this.deleteTag > all){
            for(var i = 0; i < all / 2 ; i ++){
                this.removeChildByTag(this.deleteTag,false);
                this.deleteTag ++;
            }
        }
        var param = "something";
        for(var i = 0 ; i < all / 2 ; i ++){
            var ball = new ReuseSprite("#"+parseInt(Math.random()*5+1) + ".png");
            this.addChild(ball,1,this.tag);
            this.tag ++;
            ball.x = Math.random() * size.width;
            ball.y = Math.random() * size.height;
        }
    }
 
});


var BakeLayer = cc.Layer.extend({

    ctor:function(){
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.candy_candy_plist);
        var size = cc.director.getWinSize();
        var layer = new cc.Layer();
        this.addChild(layer);
        for(var i = 0 ;i < 8000 ; i ++){
            var node = new cc.Sprite("#" + parseInt(Math.random() * 5 + 1) + ".png" );
            layer.addChild(node);
            node.x = Math.random() * size.width;
            node.y = Math.random() * size.height + 200;
        }
        // layer.bake();
    }

});

var PoolScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new NoPoolLayer();
        this.addChild(layer,1);
    }
});
        


