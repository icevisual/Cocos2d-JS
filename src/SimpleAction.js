
var ControlActionLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        cc.audioEngine.playMusic(res.sound_bg,true);
        // var effect = cc.audioEngine.playEffect(res.sound_click_bubble,false);
        cc.audioEngine.setEffectsVolume(1);
        // cc.audioEngine.setMusicVolume(0.2);
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite(res.item_3);
        ball.x = 0;
        ball.y = size.height/2;
        this.addChild(ball,1);
        var action = cc.moveBy(3,cc.p(size.width/2,0));
        var callback = cc.callFunc(this.callback,this,"message");
        var sequence = cc.sequence(action,callback);
        ball.runAction(sequence);
        // setTimeout(function(){
        //     ball.pause();
        // },2000);
        // setTimeout(function(){
        //     ball.resume();
        // },3000);
        // 
        if('mouse' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.MOUSE,
                onMouseDown:function(event){
                    var pos = event.getLocation();
                    var target = event.getCurrentTarget();
                    if (event.getButton() === cc.EventMouse.BUTTON_RIGHT) {
                        trace("onRightMouseDown At " + pos.x+" "+pos.y);
                    }else if (event.getButton() === cc.EventMouse.BUTTON_LEFT){
                        trace("onLeftMouseDown At " + pos.x + " " + pos.y );
                    }
                },
                onMouseUp:function(event){
                    var pos = event.getLocation();
                    var target = event.getCurrentTarget();
                    trace("onMouseUp At " + pos.x + " " + pos.y );
                },
                onMouseMove:function(event){
                    var pos = event.getLocation();
                    var target = event.getCurrentTarget();
                    trace("onMouseMove At "+ pos.x + " " + pos.y );
                }
            },this);
        }

        return true ;

    },
    callback:function(nodeExcutingAction,data){
         cc.audioEngine.setMusicVolume(0.2);
        var effect = cc.audioEngine.playEffect(res.sound_click_bubble,false);
        trace(nodeExcutingAction instanceof cc.Sprite,data);
    }
});


var SimpleActionLayer = cc.Layer.extend({
    deltaX : 1,
    ball:null,
    frame:0,
    bg:null,
    ct:0,
    isMouseDown : 0,
    rdColor : function(){
        return Math.round(255 * Math.random());
    },
    gtColor:function(base){
        return Math.abs(base - this.frame ) % 255;
    },
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite(res.item_2);
        ball.x = 0;//size.width / 2;
        ball.y = size.height / 2;
        this.addChild(ball,5);

        var lineX = new cc.LayerColor(cc.color(255,255,255),size.width,1);
        lineX.x = 0;
        lineX.y = size.height/2;
        this.addChild(lineX,1);
        var lineY = new cc.LayerColor(cc.color(255,255,255),1,size.height);
        lineY.x = size.width/2;
        lineY.y = 0;
        this.addChild(lineY,1);


        ball.x = size.width/2;
        ball.y = size.height/2;
        var action = cc.moveBy(2,0,-(size.height/2 - ball.height/2));
        action.easing(cc.easeElasticIn());
        var back = action.clone().reverse();
        back.easing(cc.easeBounceIn());
        ball.runAction(cc.sequence(action,back));

// http://localhost-cocos.com/test/logs/index.php
        if('keyboard' in cc.sys.capabilities){

            cc.eventManager.addListener({
                event:cc.EventListener.KEYBOARD,
                onKeyReleased:function(keyCode,event){
                    if(keyCode == cc.KEY.back){
                        trace("key Code " + keyCode);
                        cc.director.end();
                    }else if(keyCode == cc.KEY.z){
                        trace("key Code " + keyCode);
                    }
                },
                onKeyPressed:function(keyCode,event){

                }
            },this);
        }

        if('touches' in cc.sys.capabilities){



            var helloLabel = new cc.LabelTTF("touches valid", "Arial", 38);
            // position the label on the center of the screen
            helloLabel.x = size.width / 2;
            helloLabel.y = size.height / 2 - 200;
            // add the label as a child to this layer
            this.addChild(helloLabel, 5);


            cc.eventManager.addListener({
                event:cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegin:function(touch,event){
                    var pos = touch.getLocation();
                    var id = touch.getID();
                    var target = touch.getCurrentTarget();
                    logTrace("onTouchBegin at " + pos.x + " " + pos.y);
                    var winSize = cc.director.getWinSize();
                    if(pos.x < winSize.width /2 ){
                        return true;
                    }
                    return false;
                },
                onTouchMoved:function(touch,event){
                    var pos = touch.getLocation();
                    var id = touch.getID();
                    trace("onTouchMoved at " + pos.x + " " + pos.y);
                },
                onTouchEnded:function(touch,event){
                    var pos = touch.getLocation();
                    var id = touch.getID();
                    trace("onTouchEnded at " + pos.x + " " + pos.y);
                },
                onTouchCanceled:function(touch,event){
                    var pos = touch.getLocation();
                    var id = touch.getID();
                    trace("onTouchCanceled at " + pos.x + " " + pos.y);
                }
            },this);
        }else{

            var helloLabel = new cc.LabelTTF("touches invalid", "Arial", 38);
            // position the label on the center of the screen
            helloLabel.x = size.width / 2;
            helloLabel.y = size.height / 2 + 200;
            // add the label as a child to this layer
            this.addChild(helloLabel, 5);

        }


        return true;



        this.bg = new cc.DrawNode();
        this.addChild(this.bg);
        if('mouse' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.MOUSE,
                onMouseDown:function(event){
                    
                    var pos = event.getLocation();
                    var target = event.getCurrentTarget();
                    target.isMouseDown = 1;
                    if (event.getButton() === cc.EventMouse.BUTTON_RIGHT) {
                        trace("onRightMouseDown At " + pos.x+" "+pos.y);
                    }else if (event.getButton() === cc.EventMouse.BUTTON_LEFT){
                        trace("onLeftMouseDown At " + pos.x + " " + pos.y );
                    }
                },
                onMouseUp:function(event){
                    
                    var pos = event.getLocation();
                    var target = event.getCurrentTarget();
                    target.isMouseDown = 0;
                    trace("onMouseUp At " + pos.x + " " + pos.y );
                },
                onMouseMove:function(event){
                    var pos = event.getLocation();
                    var target = event.getCurrentTarget();
                    // trace("onMouseMove At "+ pos.x + " " + pos.y );
                    var delta = event.getDelta();
                    trace("onMouseMove delta " + delta.x + " " + delta.y );
                    // if(target.isMouseDown){
                    //    target.bg.drawDot(new cc.Point(pos.x,pos.y),4,cc.color(target.gtColor(255),target.gtColor(0),target.gtColor(155)));
                    // }
                }
            },this);
        }


        return true;



        var action1 = cc.moveBy(5,cc.p(size.width/2,0));
        var action2 = cc.scaleBy(1,2);
        var reverse = action2.reverse();
        var sequence = cc.sequence(action2,cc.delayTime(0.5),reverse);
        var repeat  =cc.repeat(sequence,2);
        var spawn = cc.spawn(action1,repeat);
        ball.runAction(spawn);
        return true;


        // var action  = new cc.moveTo(1,cc.p(size.width/2,size.height / 2));
        // // ball.x = size.width / 2;
        // var action1 = new cc.scaleTo(1,2,2);
        // var action2 = new cc.scaleTo(0.3,1,1);
        // var sequence = cc.sequence(action1,action2);
        // var repeat = cc.repeatForever(sequence);
        // ball.runAction(cc.sequence(action,repeat));
        // // this.runAction(action3)1
        // return true;
        // 
        var action = cc.moveBy(1,cc.p(size.width/2,0));
        // var reverse = action.reverse();
        var reverse = cc.reverseTime(action);
        var sequence = cc.sequence(action,reverse);
        ball.runAction(sequence);
        return true;


        var action  =  cc.moveTo(1,cc.p(size.width/2,size.height / 2));
        var action1 =  cc.moveBy(1,cc.p(size.width/2,size.height / 2));
        var action2 =  cc.scaleTo(1,2,2);
        var action3 =  cc.scaleTo(0.3,1,1);
        var action4 =  cc.fadeIn(2);
        var action5 =  cc.blink(2,10);
        var action6 =  cc.tintTo(0.3,100,0,0);
        var action7 =  cc.tintTo(0.3,255,255,255);
        // ball.opacity = 0;
        // 
        var sequence1 = cc.sequence(action,action2);
        var sequence2 = cc.sequence(sequence1,action3);
        var sequenec3 = cc.sequence(action2,action3);
        var repeat = cc.repeat(sequenec3,2);
        var repeat1 = cc.repeatForever(sequenec3);
        var sequenec4 = cc.sequence(sequence2,action1.reverse());
        var spawn = cc.spawn(action,action2);
        var reverse = cc.reverseTime(sequenec4);
        ball.runAction(sequenec4);
        // this.runAction(action3);
        return true;
    }
});



var SimpleActionScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new SimpleActionLayer();
        this.addChild(layer,2);
        // 
    }
});




