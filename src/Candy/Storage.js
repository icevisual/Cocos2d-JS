
var Storage = {
    get:function(key){
        var level = cc.sys.localStorage.getItem(key) || 0;
        return parseInt(level);
    },
    set:function(key,value){
        cc.sys.localStorage.setItem(key,value);
        return true;
    },
    getCurrentLevel:function(){
        var level = cc.sys.localStorage.getItem("level") || 0;
        return parseInt(level);
    },
    setCurrentLevel:function(level){
        cc.sys.localStorage.setItem("level",level);
        return true;
    },
    setCurrentScore:function(score){
        this.set("score",score);
    },
    getCurrentScore:function(){
        return this.get("score");
    }
};