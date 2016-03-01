



var ParticleLayer = cc.Layer.extend({
    
    ctor:function(){

        this._super();
        var particleSystem = new cc.ParticleSystem(100);
        this.addChild(particleSystem);
        var size = cc.director.getWinSize();

        particleSystem.texture = cc.textureCache.addImage(res.Particle_star_png);

        particleSystem.x = size.width / 2;
        particleSystem.y = size.height / 2;
        particleSystem.posVar = cc.p(0,0);

        particleSystem.duration = cc.ParticleSystem.DURATION_INFINTY;
        particleSystem.emitterMode = cc.ParticleSystem.MODE_RADIUS;

        particleSystem.startRadius = 0;
        particleSystem.startRadiysVar = 30;
        particleSystem.endRadius = 240;
        particleSystem.endRadiusVar = 30;

        particleSystem.rotatePerS = 180;
        particleSystem.rotatePerSVar = 0;

        particleSystem.angle = 90;
        particleSystem.angleVar = 0;

        particleSystem.life = 10;
        particleSystem.lifeVar = 0;

        particleSystem.startSpin = 0;
        particleSystem.startSpinVar = 0;
        particleSystem.endSpin = 0 ;
        particleSystem.endSpinVar = 0;

        particleSystem.startColor = cc.color(128,128,128,255);
        particleSystem.startColorVar = cc.color(128,128,128,255);
        particleSystem.endColor = cc.color(128,128,128,50);
        particleSystem.endColorVar = cc.color(26,26,26,50);

        particleSystem.startSize = 32;
        particleSystem.startSizeVar = 0;

        particleSystem.endSize = cc.ParticleSystem.START_SIZE_EQUAL_END_SIZE;
        particleSystem.emissionRate = particleSystem.totalParticles / particleSystem.life; 

        return true;
    }
});




var ParticleDemoLayer = cc.Layer.extend({
    ctor:function(){

        this._super();


        // var particleSystem = new cc.ParticleFireworks();//firework
        // var particleSystem = new cc.ParticleFire();//fire
        // var particleSystem = new cc.ParticleSun();//fire
        // var particleSystem = new cc.ParticleGalaxy();//fire
        // var particleSystem = new cc.ParticleFlower();//firework
        // var particleSystem = new cc.ParticleSnow();//snow
        // var particleSystem = new cc.ParticleRain();//snow
        // var particleSystem = new cc.ParticleMeteor();//fire
        // var particleSystem = new cc.ParticleSmoke();//fire
        // var particleSystem = new cc.ParticleSpiral();//fire
        // var particleSystem = new cc.ParticleExplosion();//firework
        var particleSystem = new cc.ParticleSystem(res.HungryHero_particles_coffee_plist);
        // particleSystem.initWithTotalParticles(200);
        // particleSystem.texture = cc.textureCache.addImage(res.Particle_fire_png);
        this.addChild(particleSystem);
        var size = cc.director.getWinSize();

        particleSystem.x = size.width / 2;
        particleSystem.y = size.height / 2;

        particleSystem.setAutoRemoveOnFinish(true);
        // this.scheduleOnce(function(){
        //     particleSystem.stopSystem();
        //     this.removeChild(particleSystem);
        // }.bind(this),2);

        return true;

    }

});


var ParticleScene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new ParticleDemoLayer();
        this.addChild(layer,1);
    }
});
        

