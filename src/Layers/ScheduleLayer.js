


var ScheduleLayer = cc.Layer.extend({
    sprite : null,
    prevX : 0,
    prevY : 0,
    ctor: function() {
        this._super();
        
        // this.schedule(this.tick,0.5,cc.REPEAT_FOREVER,1);
        // this.scheduleOnce(function(){
        //     trace('scheduleOnce');
        // },2);
        // this.tickCount = 0;
        // 
        this.scheduleUpdate();
        this.schedule(this.scheduleTest,1);
        this.scheduleOnce(this.scheduleOnceTest,3);

        setTimeout(function(){
            trace("Pause "+this.currentTime());
            this.pause();
        }.bind(this),2000);

        setTimeout(function(){
            trace("resume "+ this.currentTime());
             this.resume();
        }.bind(this),5000);

        trace("load " + this.currentTime());
        this.frame = 0;
        return true;
    },
    update:function(){
        this.frame ++ ;
        if(this.frame % 10 == 0 ){
            trace("Update 10 frames ");
        }
    },
    scheduleTest: function(){
        trace("scheduleTest "+this.currentTime());
    },
    scheduleOnceTest: function(){
        trace("scheduleOnceTest "+this.currentTime());
    },
    currentTime:function(){
        return parseInt(new Date().getTime() / 1000 );
    },
    tick : function(){
        trace('tick');
        this.tickCount ++ ;
        if(this.tickCount == 5 ){
            this.unschedule(this.tick);
        }
    }
});




var ScheduleScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new ScheduleLayer();
        this.addChild(layer,2);
    }
});

