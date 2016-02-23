


var ScheduleLayer = cc.Layer.extend({
    sprite : null,
    prevX : 0,
    prevY : 0,
    ctor: function() {
        this._super();
        
        return true;
    }
});




var ScheduleScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new ScheduleLayer();
        this.addChild(layer,2);
    }
});

