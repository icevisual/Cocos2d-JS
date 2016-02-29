

var TiledMapLayer = cc.Layer.extend({
    
    ctor:function(){

        this._super();

        var map = new cc.TMXTiledMap(res.map1_tmx);
        this.addChild(map);
        var layer = map.getLayer('块层 1');
        var tile0 = layer.getTileAt(cc.p(1,1));
        var rotate = cc.rotateBy(2,360);
        tile0.runAction(rotate);
        var properties = map.getPropertiesForGID(layer.getTileGIDAt(cc.p(3,2)));
        // trace('properties.block',properties.block);
        this.scheduleOnce(function(){
            layer.setTileGID(31,cc.p(0,0));
        },2);

        return true;
    }
 
});


var UnlimitedTiledMapLayer = cc.Layer.extend({
    map:null,
    screenSize:10,
    tileSize:32,

    mapRight:0,
    mapBottom:0,
    mapLeft:0,
    mapTop:0,
    ctor: function(){
        this._super();

        this.mapRight = 11;
        this.mapLeft = 1;
        this.mapTop = 11;
        this.mapBottom = 1

        var map = new cc.SpriteBatchNode(res.tile0_png);
        for(var i = 0 ; i < this.screenSize + 2; i ++){
            for(var j = 0 ; j < this.screenSize + 2 ; j ++){
                var tile= new cc.Sprite("res/tile0.png");
                tile.x = i * this.tileSize + this.tileSize / 2;
                tile.y = j * this.tileSize + this.tileSize / 2;
                map.addChild(tile);
            }
        }
        this.map = map;
        this.map.x = -this.tileSize;
        this.map.y = -this.tileSize;
        this.addChild(this.map);
        cc.eventManager.addListener({
            event:cc.EventListener.MOUSE,
            onMouseMove:this.move.bind(this)
        },this);

        // cc.eventManager.addListener({
        //     event:cc.EventListener.KEYBOARD,
        //     onKey
        // });

        cc.eventManager.addListener({
            event:cc.EventListener.KEYBOARD,
            onKeyReleased:function(keyCode,event){
                if(keyCode == 39){
                    this.moveRight(event,-this.tileSize,0);
                }
                //39 right
                //38 up
                //37 left
                //40 down
            }.bind(this),
            onKeyPressed:function(keyCode,event){

            }
        },this);

    },
    getGIDAt:function(i,j){

    },
    moveRight:function(event,deltaX,deltaY){
        trace(deltaX,deltaY);
        this.map.x += deltaX;
        this.map.y += deltaY;

        if(this.map.x/this.tileSize + this.mapRight - this.screenSize < 1){
            for(var i = -this.mapBottom ; i < this.mapTop ; i ++){
                var tile = new cc.Sprite("res/tile0.png");
                tile.x = this.mapRight * this.tileSize + this.tileSize / 2;
                tile.y = i * this.tileSize + this.tileSize / 2;
                this.map.addChild(tile);
            }
            this.mapRight ++;
        }
    },
    move:function(event){
        if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
            this.moveRight(event,event.getDeltaX(),event.getDeltaY());


            // if(this.map.x/this.tileSize + this.mapRight - this.screenSize < 1){
            //     for(var i = - this.mapBottom ; i < this.mapTop ; i ++){
            //         var tile = new cc.Sprite("res/tile0.png");
            //         tile.x = this.mapRight * this.tileSize + this.tileSize / 2;
            //         tile.y = i * this.tileSize + this.tileSize / 2;
            //         this.map.addChild(tile);
            //     }
            //     this.mapRight ++;
            // }

        }
    }

});

var TiledMapScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new UnlimitedTiledMapLayer();
        this.addChild(layer,1);
    }
});
        

