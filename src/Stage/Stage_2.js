// Tutorial section
class Stage_2 extends Phaser.Scene{
    constructor(){
        super('stageTwo');
    }

    create(){
        // world bounds
        //this.physics.world.setBounds(0,0,800,600,true,true,true,false);

        // init ground and platform
        this.platform = this.physics.add.sprite(game.config.width/2,game.config.height/2 -50,'plat');
        this.platform.displayWidth = 900;
        this.platform.body.allowGravity = false;
        this.platform.setImmovable(true);
        this.platform.setFrictionX(0);
        this.ground = this.physics.add.sprite(game.config.width/2,game.config.height-50,'plat');
        this.ground.displayWidth = 900;
        this.ground.body.allowGravity = false;
        this.ground.setImmovable(true);
        this.ground.setFrictionX(0);
        
        /*
        this.platformY = this.physics.add.sprite(0,game.config.height/3,'platY').setScale(0.1);
        this.platformY.displayWidth = 900;
        this.platformY.body.allowGravity = false;
        this.platformY.setImmovable(true);
        this.platformY.setFrictionX(0);
        */

        // init players
        this.player1 = new Player1(this,game.config.width/3, game.config.height/2 -100, 'run');
        this.physics.add.collider(this.platform,this.player1);
        this.player1.setCollideWorldBounds(true);
        this.player2 = new Player2(this,game.config.width/2, game.config.height - 100, 'run');
        this.physics.add.collider(this.ground,this.player2);
        this.player2.setCollideWorldBounds(true);

        // init key
        keyA = this.input.keyboard.addKey(65);
        keyD = this.input.keyboard.addKey(68);
        keyW = this.input.keyboard.addKey(87);
        keyLEFT = this.input.keyboard.addKey(37);
        keyRIGHT = this.input.keyboard.addKey(39);
        keyUP = this.input.keyboard.addKey(38);
        keyE = this.input.keyboard.addKey(69);
        let keySpace = this.input.keyboard.addKey(32);

        this.over = false;

        // init interact
        this.switch = this.physics.add.sprite(game.config.width/3 + 60,game.config.height/2 -100, 'switch').setScale(0.1);
        this.physics.add.collider(this.switch,this.platform);
        this.fox2 = this.physics.add.sprite(game.config.width/5,game.config.height - 200, 'fox').setScale(3);
        this.fox2Plat = this.physics.add.collider(this.fox2,this.platform);
        this.physics.add.collider(this.fox2,this.player2);
        this.fox2.setImmovable(true);
        this.fox2.body.allowGravity = false;

        this.physics.add.overlap(this.player1,this.switch,function(){
            if(keySpace.isDown && !this.over){
                this.over =true;
            }
            console.log(this.over);
        },null,this);
        

        
    }

    update(){
        this.player1.update();
        this.player2.update();
        if(this.over){
            this.fox2.visible = false;
            this.fox2.setImmovable(false);
            this.fox2.body.allowGravity = true;
            this.fox2.setVelocityY(-500);
            this.physics.world.removeCollider(this.fox2Plat);
        }
    //    console.log(this.fox.body.onOverlap);
    }

}