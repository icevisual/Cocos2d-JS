var layerColor = new cc.LayerColor(cc.color(255, 255, 255), 100, 100);
//this.addChild(layerColor);
//
var layerGradient = new cc.LayerGradient(cc.color(255, 0, 0), cc.color(0, 0, 255));
// this.addChild(layerGradient);
var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    helloLabel:null,
    ctor: function() {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            this.closeClicked.bind(this));
        closeItem.attr({
            x:size.width - 20,
            y:20,
            anchorX:0.5,
            anchorY:0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu,1);
        this.helloLabel = new cc.LabelTTF("Hello World f","Arial",38);
        this.helloLabel.x = size.width / 2;
        this.helloLabel.y = size.height / 2;
        this.addChild(this.helloLabel,5);
        return true;
    },
    closeClicked:function(){
        this.removeChild(this.helloLabel);
    }

});






var Plane = cc.Sprite.extend({
    life : 100,
    ctor : function(imageUrl){
        this._super(imageUrl);
        this.life = 100;
    },

    onHit:function(){

        this.life -= 20;
    }

});

var SecondScene = cc.Scene.extend({
    onEnter : function(){

        this._super();
        var layer = new cc.LayerGradient(cc.color(255,0,0),cc.color(0,0,255));
        this.addChild(layer);
    }

});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer,2);
        // 
        // 
        // var size = cc.winSize;
        // // helloLabel.x = size.width / 2;
        // // helloLabel.y = size.height / 2 + 200;

        // var startLine = new cc.LayerColor(cc.color(100,100,100),size.width,2);
        // startLine.x = 0;
        // startLine.y = 0;
        // this.addChild(startLine,1);

        // var bg = new cc.LayerColor(cc.color(100,100,100),200,200);
        // bg.x = 100;
        // bg.y = 100;

        // this.addChild(bg,1);



        // var ball1 = new cc.Sprite(res.item_2);
        // this.addChild(ball1,2);
        // ball1.x = 100;
        // ball1.y = 300;
        // // this.addChild(ball1,0);
        // var ball2 = new cc.Sprite(res.item_3);
        // bg.addChild(ball2,1);
        // ball2.x = 100;
        // ball2.y = 100;

        // setTimeout(function(){
        //     cc.director.runScene(new cc.TransitionSlideInB(2,new SecondScene())); 
        //     // cc.director.runScene(new SecondScene());
        // },3000);
    }
});


// var object = function(){
//     this.fullname = "this is full name of object";
//     console.log("this is object");
// };
// var object1 = new object();
// object1.name = "object1";
// var object2 = new object();
// object2.name = "object2";
// console.log(object1.name,object2.name);
// console.log(object1.fullname,object2.fullname);



