

var GameLayer = cc.Layer.extend({
    
    mapPanel : null,
    ui:null,

    score : 0,
    level : 0,
    steps : 0,
    limitStep : 0,
    targetScore : 0,

    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();
        var bg = new cc.Sprite(res.candy_bg_jpg);
        this.addChild(bg);
        bg.x = size.width / 2;
        bg.y = size.height / 2;

        var clippingPanel = new cc.ClippingNode();
        this.addChild(clippingPanel);
        this.mapPanel = new cc.Layer();
        this.mapPanel.x = (size.width - Constant.CANDY_WIDTH * Constant.MAP_SIZE) /2;
        this.mapPanel.y = (size.height - Constant.CANDY_WIDTH * Constant.MAP_SIZE) /2;
        clippingPanel.addChild(this.mapPanel,1);

        var stencil = new cc.DrawNode();
        stencil.drawRect(
            cc.p(this.mapPanel.x,this.mapPanel.y),
            cc.p(this.mapPanel.x + Constant.CANDY_WIDTH * Constant.MAP_SIZE,
                this.mapPanel.y + Constant.CANDY_WIDTH * Constant.MAP_SIZE),
            cc.color(0,0,0),1,cc.color(0,0,0));
        clippingPanel.stencil = stencil;
        this._init();
        this.ui = new GameUI(this);
        this.addChild(this.ui,3);



        return true;
    },

    _init:function(){
        this.steps = 0;
        this.score = 0;
        this.level = 0;
        this.limitStep = 30;
        this.targetScore = 100;
        this.map = [];

        for(var i = 0 ; i < Constant.MAP_SIZE; i ++){
            var column = [];
            for(var j = 0 ; j < Constant.MAP_SIZE ; j ++){
                var candy = Candy.createRandomType(i,j);
                this.mapPanel.addChild(candy);
                candy.x = i * Constant.CANDY_WIDTH + Constant.CANDY_WIDTH/2;
                candy.y = j * Constant.CANDY_WIDTH + Constant.CANDY_WIDTH/2;
                column.push(candy);
            }
            this.map.push(column);
        }

    }
 
});


var GameScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new GameLayer();
        this.addChild(layer,1);
    }
});
        


