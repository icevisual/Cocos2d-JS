


var AccelerometerLayer = cc.Layer.extend({
    sprite : null,
    prevX : 0,
    prevY : 0,
    ctor: function() {
        this._super();
        var winSize = cc.director.getWinSize();

        this.scheduleOnce(function(){
            trace("scheduleOnce");
        },2);

        cc.eventManager.addCustomListener(cc.game.EVENT_HIDE,function(){
            trace('Game Hide');
        });
        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW,function(){
            trace('Game Show');

        });
        if('accelerometer' in cc.sys.capabilities){
            cc.inputManager.setAccelerometerInterval(1/30);
            cc.inputManager.setAccelerometerEnabled(true);
            cc.eventManager.addListener({
                event:cc.EventListener.ACCELERATION,
                callback:function(accelerometerInfo,event){
                    var target = event.getCurrentTarget();
                    // trace("Accel x: " + accelerometerInfo.x + " y: " + accelerometerInfo.y + " z: " + accelerometerInfo.z
                    //     + " time: " + accelerometerInfo.timestamp);
                    var w = winSize.width;
                    var h = winSize.height;
                    var x = w * accelerometerInfo.x + w / 2;
                    var y = h * accelerometerInfo.y + h / 2;

                    x = x * 0.2 + target.prevX * 0.8 ;
                    y = y * 0.2 + target.prevY * 0.8 ; 
                    target.prevX = x;
                    target.prevY = y;
                    target.sprite.x = x;
                    target.sprite.y = y;

                }
            },this);

            var sprite = new cc.Sprite(res.item_2);
            this.addChild(sprite);
            sprite.x = winSize.width / 2;
            sprite.y = winSize.height / 2;
            this.prevX = 0;
            this.prevY = 0;
            this.sprite = sprite;
        }else{
            logTrace("Accelerometer is not supported");
        }
        return true;
    }
});




var AccelerometerScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new AccelerometerLayer();
        this.addChild(layer,2);
    }
});

