

var ParticleLayer = cc.Layer.extend({
    
    ctor:function(){

        this._super();

        return true;
    }
 
});


var ParticleScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new ParticleLayer();
        this.addChild(layer,1);
    }
});
        

