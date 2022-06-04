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
        this.load.image('bigwall', './assets/bigwall.png');
        this.load.image('door', './assets/door.png');
        this.load.image('doorop', './assets/OPENDOOR.png');
        this.load.image('highwall', './assets/highwall.png');
        this.load.image('box', './assets/box.png');
        this.load.image('box_fragile', './assets/box_fragile.png');
        this.load.image('arrow', './assets/arrow.png');
        this.load.image('be', './assets/ekey.png');
        this.load.image('lamp','./assets/Lamp.png');
        this.load.image('oplamp','./assets/ONLamp.png');
        this.load.atlas('crab_atlas', './assets/crabbertsheet.png', './assets/crabmap.json');
        this.load.atlas('tenti_atlas', './assets/tentisheet.png', './assets/tentimap.json');
        this.load.atlas('human_atlas', './assets/humansheet.png', './assets/humanmap.json');

        this.load.audio('switch','./assets/audio/switch.wav');
        this.load.audio('jump', './assets/audio/jump.wav');
        this.load.audio('climb', './assets/audio/climb.wav');
        this.load.audio('bgm1', './assets/audio/Level1theme.wav');
    }

    create(){
        //set background
        let bg = this.add.image(game.config.width/2, game.config.height/2,"stage1");

        this.bgm1 = this.sound.add('bgm1');
        this.bgm1.setVolume(0.3);
        this.bgm1.loop = true;
        this.bgm1.play();

        this.sfxJump = this.sound.add('jump');
        this.sfxJumpIsPlaying = false;
        this.sfxClimb = this.sound.add('climb');
        this.sfxClimbIsPlaying = false;

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

        this.plat3 = this.physics.add.sprite(game.config.width/3 - 115, game.config.height - 230,"plat");
        this.plat3.body.allowGravity = false;
        this.plat3.body.checkCollision.down = false;
        this.plat3.setImmovable(true);
        this.plat3.setFrictionX(0);

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

        this.bigwall = this.physics.add.sprite((game.config.width/3)*2+55, game.config.height - 270,"bigwall");
        this.bigwall.body.allowGravity = false;
        this.bigwall.setImmovable(true);
        this.bigwall.setFrictionX(0);

        this.door = this.physics.add.sprite((game.config.width/3)*2+40, game.config.height - 210,"door");
        this.door.body.allowGravity = false;
        this.door.setImmovable(true);
        this.door.setFrictionX(0);

        this.highwall = this.physics.add.sprite((game.config.width/3)*2+95, game.config.height - 580,"highwall");
        this.highwall.body.allowGravity = false;
        this.highwall.setImmovable(true);
        this.highwall.setFrictionX(0);

        this.man = this.physics.add.sprite(game.config.width/3 + 160, game.config.height - 150, 'man');
        //this.man.displayWidth = 180;
        //this.man.displayHeight = 280;
        this.man.body.allowGravity = false;
        this.physics.add.collider(this.ground, this.man);

        this.anims.create({
            key: 'man_sweep_left',
            frames: this.anims.generateFrameNames('human_atlas', {
                prefix: 'man_sweep_left_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 6,
            repeat: -1,
            repeatDelay: 300,
            yoyo: true
        });
        this.anims.create({
            key: 'man_look_left',
            frames: this.anims.generateFrameNames('human_atlas', {
                prefix: 'man_look_left_',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: -1,
            repeatDelay: 300,
            yoyo: true
        });

        
        // init players
        this.player1 = new Player1(this,game.config.width/3 - 300, game.config.height - 100, 'monsterA').setDepth(10);
        this.physics.add.collider(this.ground,this.player1);
        this.physics.add.collider(this.highwall, this.player1);
        this.physics.add.collider(this.bigwall, this.player1);
        this.player1.setCollideWorldBounds(true);

        this.player2 = new Player2(this,game.config.width/3 - 380, game.config.height - 100, 'crab').setDepth(10);
        this.physics.add.collider(this.ground, this.player2);
        this.physics.add.collider(this.highwall, this.player2);
        this.physics.add.collider(this.bigwall, this.player2);
        this.physics.add.collider(this.plat1, this.player2);
        //this.physics.add.collider(this.plat2, this.player2);
        this.physics.add.collider(this.plat3, this.player2);
        //this.physics.add.collider(this.plat4, this.player2);
        this.physics.add.collider(this.plat5, this.player2);
        this.physics.add.collider(this.platup, this.player2);
        this.player2.setCollideWorldBounds(true);

        this.box = this.physics.add.sprite(game.config.width-120, game.config.height - 50, 'box').setScale(1);
        this.physics.add.collider(this.box,this.ground);
        this.physics.add.collider(this.box,this.player2);
        this.physics.add.collider(this.box,this.player1);
        this.box.setImmovable(true);
        this.box.body.allowGravity = false;

        // init key
        keyA = this.input.keyboard.addKey(65);
        keyD = this.input.keyboard.addKey(68);
        keyW = this.input.keyboard.addKey(87);
        keyS = this.input.keyboard.addKey(83);
        keyLEFT = this.input.keyboard.addKey(37);
        keyRIGHT = this.input.keyboard.addKey(39);
        keyUP = this.input.keyboard.addKey(38);
        keyDOWN = this.input.keyboard.addKey(40);
        keyE = this.input.keyboard.addKey(69);
    //    keySpace = this.input.keyboard.addKey(32);

        
        this.interact_button1 = false;
        this.interact_button2 = false;
        this.interact_switch = false;
        this.interact_switch2 = false;

        // init interact
        this.switch = this.physics.add.sprite(game.config.width/3 + 10, game.config.height - 555, 'switch').setScale(1);
        this.switch.body.allowGravity = false;
        this.switch.setImmovable(true);
        this.switch.setFrictionX(0);
        this.switch.alpha = 0;

        this.arrow = this.physics.add.sprite(game.config.width/3 -50, game.config.height - 555, 'arrow').setScale(1);
        this.arrow.setImmovable(true);
        this.arrow.body.allowGravity = false;
        this.arrow.visible = false;

        //init open lamp
        this.oplamp = this.physics.add.sprite(game.config.width/3 + 130, game.config.height - 355 , 'oplamp').setScale(1);
        this.oplamp.setImmovable(true);
        this.oplamp.body.allowGravity = false;

        //init switch2
        this.switch2 = this.physics.add.sprite(game.config.width-70, game.config.height - 130, 'switch').setScale(1);
        this.switch2.body.allowGravity = false;
        this.switch2.setImmovable(true);
        this.switch2.setFrictionX(0);
        this.switch2.alpha = 0;

        this.be = this.physics.add.sprite(game.config.width-110, game.config.height - 160, 'be').setScale(1);
        this.be.setImmovable(true);
        this.be.body.allowGravity = false;
        this.be.visible = false;

        // open door
        this.opdoor = this.physics.add.sprite((game.config.width/3)*2+130, game.config.height - 210,"doorop");
        this.opdoor.body.allowGravity = false;
        this.opdoor.visible = false;
        this.opdoor.setImmovable(true);
        this.opdoor.setFrictionX(0);

        // lamp
        this.lamp = this.physics.add.sprite(game.config.width/3 + 130, game.config.height - 500 , 'lamp').setScale(1);
        this.lamp.setImmovable(true);
        this.lamp.body.allowGravity = false;
        this.lamp.visible = false;

        this.gameover = false;

        this.physics.add.overlap(this.player1, this.man, function(){
            if(!this.interact_switch){
                // console.log("player1overlap");
                this.gameover = true;
            }
        },null,this);

        this.physics.add.overlap(this.player2, this.man, function(){
            if(!this.interact_switch){
                // console.log("player2overlap");
                this.gameover = true;
            }
        },null,this);

        this.button = this.physics.add.sprite(game.config.width, game.config.height - 50, "box_fragile").setScale(1);
        this.physics.add.collider(this.button,this.ground);
        this.player1_button = this.physics.add.overlap(this.player1,this.button,function(){
            if(keyE.isDown){
                this.interact_button1 = true;
                // console.log(this.interact_button1);
            }
        },null,this);
        this.player2_button = this.physics.add.overlap(this.player2,this.button,function(){
            if(keyDOWN.isDown){
                this.interact_button2 = true;
                // console.log(this.interact_button2);
            }
        },null,this);

        this.physics.add.overlap(this.player2,this.switch,function(){
            // console.log("overlapswitch");
            if(keyDOWN.isDown && !this.interact_switch){
                // console.log("switchistrue");
                this.interact_switch = true;
                this.sound.play('switch');
            }
        },null,this);

        this.physics.add.overlap(this.player1,this.switch2,function(){
            // console.log("overlapswitch2");
            if(keyE.isDown && !this.interact_switch2){
                // console.log("switch2istrue");
                this.interact_switch2 = true;
                this.sound.play('switch');
            }
        },null,this);
    }

    update(){
        this.player1.update();
        this.player2.update();

        if (!this.man.anims.isPlaying) {
            this.man.anims.play('man_sweep_left', true);
        }

        if(this.gameover){
            this.bgm1.pause();
            this.scene.start("gameOver");
        }

        if(this.interact_switch){
            this.oplamp.destroy();
            this.lamp.visible = true;
            this.man.anims.play('man_look_left', true);
        }

        //player 2 jump sfx
        if (this.player2.jump) {
            if (!this.sfxJumpIsPlaying) {
                this.sfxJump.play();
            }
            this.sfxJump.on('play', () => {
                this.sfxJumpIsPlaying = true;
                this.sfxJump.on('complete', () => {
                    this.sfxJumpIsPlaying = false;
                });
            });
        }
        
        //player 1 climb sfx
        if((keyW.isDown && this.player1.body.blocked.right) || (keyW.isDown && this.player1.body.blocked.left)){
            if(this.player1.climbTime > 0 ) {
                if (!this.sfxClimbIsPlaying) {
                    this.sfxClimb.play();
                }
                this.sfxClimb.on('play', () => {
                    this.sfxClimbIsPlaying = true;
                    this.sfxClimb.on('complete', () => {
                        this.sfxClimbIsPlaying = false;
                    });
                });
            }
        }

        if(this.switch.body.touching.none){
            this.arrow.visible = false;
        }
        else{
            this.arrow.visible = true;
        }

        if(this.switch2.body.touching.none){
            this.be.visible = false;
        }
        else{
            this.be.visible = true;
        }

        if(this.interact_switch2){
            this.bigwall.visible = false;
            this.bigwall.setImmovable(false);
            this.bigwall.body.allowGravity = true;
            this.bigwall.setVelocityY(-500);
            this.physics.world.removeCollider(this.bigwall);
            this.door.visible = false;
            this.door.setImmovable(false);
            this.door.body.allowGravity = true;
            this.door.setVelocityY(-500);
            this.physics.world.removeCollider(this.door);
            this.opdoor.visible = true;
        }

        if(this.interact_button1 && this.interact_button2){
            this.bgm1.pause();
            this.scene.start("Poststage2");
            // console.log("enter stage 2");
        }
    }
}