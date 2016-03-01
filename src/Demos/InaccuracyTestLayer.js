


var InaccuracyTestLayer = cc.Layer.extend({
    
    ctor:function(){

        this._super();
        var startTime = new Date().getTime();
        var count = 0 ;
        this.schedule2(function(){
            var timePass = new Date().getTime() - startTime;
            count ++ ;
            var delta = timePass - (count ) * 100;
            trace("time pass",timePass,"total delta",delta,"count",count);
        },0.1);
        this.scheduleOnce(function(){
            this.pause();
        },20);

        this.scheduleUpdate();
        return true;
    },
    update:function(){
        for (var i = 0; i <= 10000000; i++) {
            b = 1/0.22222;
        }
    },
    schedule2 :function(callback,interval){
        var then = Date.now();
        interval *= 1000;
        this.schedule(function(){
            var now = Date.now();
            var delta = now - then ;
            if(delta > interval){
                then = now - (delta % interval);
                callback.call(this);
            }
        }.bind(this),0);
    }
 
});


var InaccuracyScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new InaccuracyTestLayer();
        this.addChild(layer,1);
    }
});

