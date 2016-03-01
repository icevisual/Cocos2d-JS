

var AnimationLayer = cc.Layer.extend({
    
    ctor:function(){

        this._super();

        var size = cc.director.getWinSize();
        

        ccs.armatureDataManager.addArmatureFileInfo(res.DemoPlayer_DemoPlayer_ExportJson);
        this._armature = new ccs.Armture("DemoPlayer");
        this._armature.getAnimation().play("fire");

        this._armature.scaleX = -0.25;
        this._armature.scaleY = 0.25;
        this._armature.x = size.width / 2;
        this._armature.y = size.height / 2;
        this._armature.getAnimation().setMovementEventCallFunc(this.animationEventHandler,this);
        this.addChild(this._armature);
        return true;


        cc.spriteFrameCache.addSpriteFrames(res.grossini_plist);
        var size = cc.director.getWinSize();
        var animation = new cc.Animation();
        for(var i = 1 ; i <= 14 ; i ++){

            var png_name = 'grossini_dance_';
            if(i < 10 ){
                png_name += '0' ;
            }
            png_name +=  i  ;
            png_name += '.png';
            animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame(png_name));
        }
        animation.setDelayPerUnit(1/14);
        animation.setLoops(5);
        var action = cc.animate(animation);
        action.repeatForever();
        man = new cc.Sprite();
        man.runAction(action);

        var layerColor = new cc.LayerColor(cc.color(255,255,255),size.width,size.height);
        this.addChild(layerColor);

        layerColor.addChild(man);
        man.x = size.width / 2;
        man.y = size.height / 2;
        return true;
    },
    animationEventHandler:function(armature,movementType,movementID){
        if(movementType == ccs.MovementEventType.loopComplete){
            if(movementID == "fire"){
                var moveBy = cc.moveBy(2,cc.p());
            }
        }
    }
 
});


var AnimationScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new AnimationLayer();
        this.addChild(layer,1);
    }
});
        


