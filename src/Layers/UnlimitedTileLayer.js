

var UnlimitedTileLayer = cc.Layer.extend({
    
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
        this.mapBottom = 1;

        var map = new cc.TMXTiledMap(res.map1_tmx);
        var layer = map.getLayer('块层 1');
        var tile0 = layer.getTileAt(cc.p(1,1));

        var map = new cc.SpriteBatchNode(res.tile0_png);
        for(var i = 0 ; i < this.screenSize + 2; i ++){
            for(var j = 0 ; j < this.screenSize + 2 ; j ++){
                var tile= new cc.Sprite("res/tile0.png");
                tile.x = i * this.tileSize + this.tileSize / 2;
                tile.y = j * this.tileSize + this.tileSize / 2;
                map.addChild(tile);

                var label = new cc.LabelTTF(i+ "" +j,"Arial",4);
                label.x = tile.width / 2 ;
                label.y = tile.height / 2 + 10;
                label.setColor(cc.color(0,0,0));
                tile.addChild(label,5);
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

        cc.eventManager.addListener({
            event:cc.EventListener.KEYBOARD,
            onKeyReleased:function(keyCode,event){
                // this.keyMove(keyCode,event);
                this.unschedule();
            }.bind(this),
            onKeyPressed:function(keyCode,event){
                // this.schedule(function(){
                    this.keyMove(keyCode,event);
                // }.bind(this),0.5)
            }.bind(this)
        },this);
    },
    keyMove:function(keyCode,event){
        if(keyCode == cc.KEY.right){
            this.moveLeft(event,-this.tileSize,0);
        }
        if(keyCode == cc.KEY.left){
            this.moveRight(event,this.tileSize,0);
        }
        if(keyCode == cc.KEY.up){
            this.moveDown(event,0,-this.tileSize);
        }
        if(keyCode == cc.KEY.down){
            this.moveUp(event,0,this.tileSize);
        }
        if(keyCode == cc.KEY.f5){
            window.location.reload();
        }
    },
    getGIDAt:function(i,j){
        return "res/tile0.png";
    },
    moveUp:function(event,deltaX,deltaY){
        this.map.x += deltaX;
        this.map.y += deltaY;
        trace(this.map.x,this.map.y);

        if( this.mapBottom - 1 - this.map.y/this.tileSize < 1 ){
            for(var i = -this.mapLeft ; i < this.mapRight ; i ++){
                var tile = new cc.Sprite(this.getGIDAt(this.mapBottom,i));
                tile.x = i * this.tileSize + this.tileSize / 2;
                tile.y = -(this.mapBottom ) * this.tileSize + this.tileSize / 2;
                this.map.addChild(tile);

                var label = new cc.LabelTTF(i+ "" +this.mapBottom,"Arial",4);
                label.x = tile.width / 2 ;
                label.y = tile.height / 2 ;
                label.setColor(cc.color(255,255,255));
                tile.addChild(label,5);
            }
            this.mapBottom ++;
        }

    },
    moveDown:function(event,deltaX,deltaY){
        this.map.x += deltaX;
        this.map.y += deltaY;
        trace(this.map.x,this.map.y);
        if(this.map.y/this.tileSize + this.mapTop - this.screenSize < 1){
            for(var i = -this.mapLeft ; i < this.mapRight ; i ++){
                var tile = new cc.Sprite(this.getGIDAt(this.mapTop,i));
                tile.x = i * this.tileSize + this.tileSize / 2;
                tile.y = (this.mapTop + 1)* this.tileSize + this.tileSize / 2;
                this.map.addChild(tile);

                var label = new cc.LabelTTF(i+ "" +this.mapTop,"Arial",4);
                label.x = tile.width / 2 ;
                label.y = tile.height / 2 ;
                label.setColor(cc.color(255,255,255));
                tile.addChild(label,5);
            }
            this.mapTop ++;
        }
    },
    moveLeft:function(event,deltaX,deltaY){
        this.map.x += deltaX;
        this.map.y += deltaY;
        trace(this.map.x,this.map.y);
        if(this.map.x/this.tileSize + this.mapRight - this.screenSize < 1){
            for(var i = -this.mapBottom ; i < this.mapTop ; i ++){
                var tile = new cc.Sprite(this.getGIDAt(this.mapRight,i));
                tile.x = (this.mapRight + 1 )* this.tileSize + this.tileSize / 2;
                tile.y = i * this.tileSize + this.tileSize / 2;
                trace(i,this.mapRight,tile.x,tile.y);
                this.map.addChild(tile);


                var label = new cc.LabelTTF(this.mapRight+ "" +i,"Arial",4);
                label.x = tile.width / 2 ;
                label.y = tile.height / 2 ;
                label.setColor(cc.color(255,255,255));
                tile.addChild(label,5);


            }
            this.mapRight ++;
        }
    },
    moveRight:function(event,deltaX,deltaY){
        // trace(deltaX,deltaY);
        this.map.x += deltaX;
        this.map.y += deltaY;
        trace(this.map.x,this.map.y);
         // ( (this.moveLeft - 1)* 32 - this.map.x ) /32 < 1
        if( this.mapLeft - 1 - this.map.x/this.tileSize < 1 ){
            for(var i = -this.mapBottom ; i < this.mapTop ; i ++){
                var tile = new cc.Sprite(this.getGIDAt(this.mapLeft,i));
                tile.x = -(this.mapLeft ) * this.tileSize + this.tileSize / 2;
                tile.y = i * this.tileSize + this.tileSize / 2;
                this.map.addChild(tile);

                var label = new cc.LabelTTF(this.mapLeft+ "" +i,"Arial",4);
                label.x = tile.width / 2 ;
                label.y = tile.height / 2 ;
                label.setColor(cc.color(255,255,255));
                tile.addChild(label,5);
            }
            this.mapLeft ++;
        }
    },
    move:function(event){
        if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
            this.map.x += event.getDeltaX();
            this.map.y += event.getDeltaY();
        }
    }
});

var UnlimitedTileScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new UnlimitedTileLayer();
        this.addChild(layer,1);
    }
});

