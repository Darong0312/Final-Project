// Tutorial section
class Tutorial extends Phaser.Scene{
    constructor(){
        super('tutorialScene');
    }

    preload(){
        this.load.image('plat','./assets/platform.png');
        this.load.spritesheet('run','./assets/Run.png',{
            frameWidth: 46,
            frameHeight: 57,
            startFrame: 0, 
            endFrame: 7
        });

        this.load.spritesheet('fox','./assets/foxani.png', {
            frameWidth: 48,
            frameHeight: 72,
            startFrame:0,
            endFrame: 5
        });
    }

    create(){
        // world bounds
        //this.physics.world.setBounds(0,0,800,600,true,true,true,false);

        // init ground and platform
        this.platform = this.physics.add.sprite(game.config.width/2,game.config.height/2,'plat');
        this.platform.displayWidth = 900;
        this.platform.body.allowGravity = false;
        this.platform.setImmovable(true);
        this.platform.setFrictionX(0);
        this.ground = this.physics.add.sprite(game.config.width/2,game.config.height,'plat');
        this.ground.displayWidth = 900;
        this.ground.body.allowGravity = false;
        this.ground.setImmovable(true);
        this.ground.setFrictionX(0);
        
        // init players
        this.player1 = new Player1(this,game.config.width/2, game.config.height/2 - 60, 'run');
        this.physics.add.collider(this.platform,this.player1);
        this.player1.setCollideWorldBounds(true);
        this.player2 = new Player2(this,game.config.width/2, game.config.height - 60, 'run');
        this.physics.add.collider(this.ground,this.player2);
        this.player2.setCollideWorldBounds(true);

        // init key
        keyA = this.input.keyboard.addKey(65);
        keyD = this.input.keyboard.addKey(68);
        keyLEFT = this.input.keyboard.addKey(37);
        keyRIGHT = this.input.keyboard.addKey(39);
        keyE = this.input.keyboard.addKey(69);
        let keySpace = this.input.keyboard.addKey(32);

        this.over = false;
        // init interact
        this.fox = this.physics.add.sprite(game.config.width/3,game.config.height/2 - 60, 'fox');
        this.physics.add.collider(this.fox,this.platform);
        this.fox2 = this.physics.add.sprite(game.config.width/5,game.config.height/2 - 60, 'fox');
        this.fox2Plat = this.physics.add.collider(this.fox2,this.platform);
        this.physics.add.collider(this.fox2,this.player1);
        this.fox2.setImmovable(true);
        this.fox2.body.allowGravity = false;
        // this.fox.setInteractive().
        //     on(this.physics.add.overlap(this.player1,this.fox), () => {
        //         console.log('overlap');
        //     });
    /*
        this.fox.setFrictionX(0);
        this.fox.setSize(this.fox.width,this.fox.height);
        this.physics.add.overlap(this.player1,this.fox,function(){
            this.fox.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    console.log('overlap')
                });
        });
        */

        this.physics.add.overlap(this.player1,this.fox,function(){
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