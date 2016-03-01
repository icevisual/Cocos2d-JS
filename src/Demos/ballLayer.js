

var BallLayer = cc.Layer.extend({
    deltaX : 1,
    ball:null,
    frame:0,
    bg:null,
    ct:0,
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite(res.item_2);
        ball.x = 0;
        ball.y = size.height / 2;
        this.addChild(ball);
        this.ball = ball;
        this.bg = new cc.DrawNode();
        this.addChild(this.bg);
        this.scheduleUpdate();

        return true;
    },
    update:function(){
        var size = cc.director.getWinSize();
        this.ball.x += this.deltaX;
        if(this.ball.x >= size.width || this.ball.x <= 0 ){
            this.deltaX *= -1;
        }
        this.ball.y = Math.sin(this.frame/20) * 50 + size.height /2 ;

        this.bg.drawDot(new cc.Point(this.ball.x,this.ball.y),4,cc.color(this.gtColor(255),this.gtColor(0),this.gtColor(155)));
        this.frame ++;
    },
    rdColor : function(){
        return Math.round(255 * Math.random());
    },
    gtColor:function(base){
        return Math.abs(base - this.frame ) % 255;
    }
});




var BallScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new BallLayer();
        this.addChild(layer,2);
        // 
    }
});




