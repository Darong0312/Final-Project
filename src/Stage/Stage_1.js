class Stage_1 extends Phaser.Scene{
    constructor(){
        super('stageOne');
    }

    preload(){
        this.load.image('stage1','./assets/backgrounds1.png');
        this.load.image('man','./assets/olman.png');
        this.load.image('plat','./assets/ladder.png');
        this.load.image('platup','./assets/platup.png');
        this.load.image('platform', './assets/wood_platform.png');
        this.load.image('switch','./assets/switch.jpg');
        this.load.image('monsterA','./assets/monsterA_idle.png');
        this.load.image('crab', './assets/Crab.png');
        this.load.atlas('crab_atlas', './assets/crabbertsheet.png', './assets/crabmap.json');
        this.load.atlas('tenti_atlas', './assets/tentisheet.png', './assets/tentimap.json');

        this.load.audio('switch','./assets/audio/switch.wav');
    }

    create(){
        //set background
        let bg = this.add.image(game.config.width/2, game.config.height/2,"stage1");


        // player 1 Idle right
        this.anims.create({
            key: 'tenti_idle_right',
            frames: this.anims.generateFrameNames('tenti_atlas', {
                prefix: 'tenti_idle_right_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 7,
            repeat: -1,
            yoyo: true
        });
        // player 1 Idle left
        this.anims.create({
            key: 'tenti_idle_left',
            frames: this.anims.generateFrameNames('tenti_atlas', {
                prefix: 'tenti_idle_left_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 7,
            repeat: -1,
            yoyo: true
        });

        // init ground and platform
        this.tutorial_bg = this.add.tileSprite(0, 0, 1200, 650, 'stage1').setOrigin(0, 0);
        this.ground = this.physics.add.sprite(game.config.width/2,game.config.height,'platform');
        this.ground.displayWidth = 1200;
        this.ground.body.allowGravity = false;
        this.ground.setImmovable(true);
        this.ground.setFrictionX(0);

        this.plat1 = this.physics.add.sprite(game.config.width/3 - 115, game.config.height - 100,"plat");
        this.plat1.body.allowGravity = false;
        this.plat1.body.checkCollision.down = false;
        this.plat1.setImmovable(true);
        this.plat1.setFrictionX(0);

        /*this.plat2 = this.physics.add.sprite(game.config.width/3 - 115, game.config.height - 160,"plat");
        this.plat2.body.allowGravity = false;
        this.plat2.body.checkCollision.down = false;
        this.plat2.setImmovable(true);
        this.plat2.setFrictionX(0);*/

        this.plat3 = this.physics.add.sprite(game.config.width/3 - 115, game.config.height - 230,"plat");
        this.plat3.body.allowGravity = false;
        this.plat3.body.checkCollision.down = false;
        this.plat3.setImmovable(true);
        this.plat3.setFrictionX(0);

        /*this.plat4 = this.physics.add.sprite(game.config.width/3 - 115, game.config.height - 305,"plat");
        this.plat4.body.allowGravity = false;
        this.plat4.body.checkCollision.down = false;
        this.plat4.setImmovable(true);
        this.plat4.setFrictionX(0);*/

        this.plat5 = this.physics.add.sprite(game.config.width/3 - 115, game.config.height - 360,"plat");
        this.plat5.body.allowGravity = false;
        this.plat5.body.checkCollision.down = false;
        this.plat5.setImmovable(true);
        this.plat5.setFrictionX(0);

        this.platup = this.physics.add.sprite(game.config.width/3 + 20, game.config.height - 505,"platup");
        this.platup.body.allowGravity = false;
        this.platup.body.checkCollision.down = false;
        this.platup.setImmovable(true);
        this.platup.setFrictionX(0);

        this.man = this.physics.add.sprite(game.config.width/3 + 160, game.config.height - 150, 'man');
        this.man.displayWidth = 180;
        this.man.displayHeight = 280;
        this.man.body.allowGravity = false;
        this.physics.add.collider(this.ground, this.man);

        
        // init players
        this.player1 = new Player1(this,game.config.width/3 - 300, game.config.height - 100, 'monsterA');
        this.physics.add.collider(this.ground,this.player1);
        this.player1.setCollideWorldBounds(true);

        this.player2 = new Player2(this,game.config.width/3 - 370, game.config.height - 100, 'crab');
        this.physics.add.collider(this.ground, this.player2);
        this.physics.add.collider(this.plat1, this.player2);
        //this.physics.add.collider(this.plat2, this.player2);
        this.physics.add.collider(this.plat3, this.player2);
        //this.physics.add.collider(this.plat4, this.player2);
        this.physics.add.collider(this.plat5, this.player2);
        this.physics.add.collider(this.platup, this.player2);
        this.player2.setCollideWorldBounds(true);

        // init key
        keyA = this.input.keyboard.addKey(65);
        keyD = this.input.keyboard.addKey(68);
        keyW = this.input.keyboard.addKey(87);
        keyLEFT = this.input.keyboard.addKey(37);
        keyRIGHT = this.input.keyboard.addKey(39);
        keyUP = this.input.keyboard.addKey(38);
        keyDOWN = this.input.keyboard.addKey(40);
        keyE = this.input.keyboard.addKey(69);
    //    keySpace = this.input.keyboard.addKey(32);

        
        //this.interact_button1 = false;
        //this.interact_button2 = false;
        this.interact_switch = false;

        // init interact
        this.switch = this.physics.add.sprite(game.config.width/3 + 10, game.config.height - 555, 'switch').setScale(1);
        this.switch.body.allowGravity = false;
        this.switch.setImmovable(true);
        this.switch.setFrictionX(0);
        this.switch.alpha = 0;

        this.gameover = false;

        this.physics.add.overlap(this.player1, this.man, function(){
            if(!this.interact_switch){
                console.log("player1overlap");
                this.gameover = true;
            }
        },null,this);

        this.physics.add.overlap(this.player2, this.man, function(){
            if(!this.interact_switch){
                console.log("player2overlap");
                this.gameover = true;
            }
        },null,this);


        /*
        this.button = this.physics.add.sprite(game.config.width, game.config.height/2 - 600, "box_fragile").setScale(1);
        this.physics.add.collider(this.button,this.platform2);
        this.player1_button = this.physics.add.overlap(this.player1,this.button,function(){
            if(keyE.isDown){
                this.interact_button1 = true;
                console.log(this.interact_button1);
            }
        },null,this);
        this.player2_button = this.physics.add.overlap(this.player2,this.button,function(){
            if(keyDOWN.isDown){
                this.interact_button2 = true;
                console.log(this.interact_button2);
            }
        },null,this);
        */
        this.physics.add.overlap(this.player2,this.switch,function(){
            console.log("overlapswitch");
            if(keyDOWN.isDown && !this.interact_switch){
                console.log("switchistrue");
                this.interact_switch = true;
                this.sound.play('switch');
            }
        },null,this);
        
    }

    update(){
        this.player1.update();
        this.player2.update();

        if(this.gameover){
            this.scene.restart();
        }

        if (keyD.isDown || !this.player1.anims.isPlaying) {
            this.player1.anims.play('tenti_idle_right', true);
        } else if (keyA.isDown) {
            this.player1.anims.play('tenti_idle_left', true);
        }

        /*
        if(this.interact_button1 && this.interact_button2){
            this.scene.start("stageTwo");
            console.log("enter stage 2");
        }*/
    }
}