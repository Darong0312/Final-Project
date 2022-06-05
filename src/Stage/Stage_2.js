// Tutorial section
class Stage_2 extends Phaser.Scene{
    constructor(){
        super('stageTwo');
    }

    preload(){
        this.load.image('back','./assets/tutorial_bg.png');
        this.load.image('switch','./assets/switch.jpg');
        this.load.image('tenti','./assets/tenti.png');
        this.load.image('stage1Bg', './assets/backgrounds1.png');
        this.load.image('box_fragile', './assets/box_fragile.png');
        this.load.image('platform', './assets/wood_platform.png');
        this.load.image('crab', './assets/Crab.png');
        this.load.image('platformY', './assets/wood_platformY.png');
        this.load.image('box', './assets/box.png');
        this.load.image('human','./assets/olman.png');
        this.load.image('stage_2','./assets/stage_2.jpg');
        this.load.image('door', './assets/door.png');
        this.load.image('doorop', './assets/OPENDOOR.png');
        this.load.image('lunchbox','./assets/lunchbox.png');
        this.load.image('open_box','./assets/OPENBOX.png');
        this.load.image('exit','./assets/gray_plat.png');
        this.load.image('down', './assets/arrow.png');
        this.load.image('E_Key', './assets/ekey.png');
        this.load.atlas('crab_atlas', './assets/crabbertsheet.png', './assets/crabmap.json');
        this.load.atlas('tenti_atlas', './assets/tentisheet.png', './assets/tentimap.json');
        this.load.atlas('human_atlas', './assets/humansheet.png', './assets/humanmap.json');


        this.load.audio('switch','./assets/audio/switch.wav');
        this.load.audio('jump', './assets/audio/jump.wav');
        this.load.audio('climb', './assets/audio/climb.wav');
        this.load.audio('fall', './assets/audio/fall.wav');
        this.load.audio('bgm2', './assets/audio/level2theme.wav');
        this.load.audio('death', './assets/audio/death.wav');
    }


    
    create(){
            // world bounds
            //this.physics.world.setBounds(0,0,800,600,true,true,true,false);
            //set background
            let bg = this.add.image(game.config.width/2, game.config.height/2,"stage_2");

            this.bgm2 = this.sound.add('bgm2');
            this.bgm2.setVolume(0.3);
            this.bgm2.loop = true;
            this.bgm2.play();

            //stuff so sound only repeats after completely playing once
            this.sfxJump = this.sound.add('jump');
            this.sfxJumpComplete = false;
            this.sfxJumpIsPlaying = false;
            this.sfxClimb = this.sound.add('climb');
            this.sfxClimbIsPlaying = false;

            this.sfxFall = this.sound.add('fall');
            this.sfxFallIsPlaying = false;

    
            // init ground and platform
            this.tutorial_bg = this.add.tileSprite(0, 0, 2400, 650, 'stage_2').setOrigin(0, 0);

            // set up ground
            this.ground = this.physics.add.sprite(game.config.width/2,game.config.height - 10,'platform');
            this.ground.displayWidth = 2400;
            this.ground.body.allowGravity = false;
            this.ground.setImmovable(true);
            this.ground.setFrictionX(0);

            // init players
            this.player1 = new Player1(this,game.config.width/3 - 250, game.config.height - 100, 'tenti').setDepth(1);
            this.physics.add.collider(this.ground,this.player1);
            this.player1.setCollideWorldBounds(true);
    
            this.player2 = new Player2(this,game.config.width/3 - 300, game.config.height -100, 'crab').setDepth(1);
            this.physics.add.collider(this.ground, this.player2);
            this.player2.setCollideWorldBounds(true);

            this.door = this.physics.add.sprite(game.config.width / 3 + 270, game.config.height - 250,"door");
            this.door.displayHeight = 400;
            this.door.body.allowGravity = false;
            this.door.setImmovable(true);
            this.physics.add.collider(this.player1,this.door);
            this.physics.add.collider(this.player2,this.door);

            this.doorOpen = this.physics.add.sprite(game.config.width / 3 + 300, game.config.height - 250,"doorop").setScale(0.9).setDepth(0);
            this.doorOpen.body.allowGravity = false;
            this.doorOpen.displayHeight = 400;
            this.doorOpen.setImmovable(true);
            this.doorOpen.visible = false;

            this.switch = this.physics.add.sprite(game.config.width/2 + 340,game.config.height - 250, "switch");
            this.switch.body.allowGravity = false;
            this.switch.setImmovable(true);

            // box in box stack: width = 80, height = 80
            // setting the first layer of the box stack
            this.boxStack1 = this.physics.add.sprite(game.config.width/2 + 300, game.config.height - 60, 'box').setScale(1);
            this.physics.add.collider(this.boxStack1,this.ground);
            this.physics.add.collider(this.boxStack1,this.player2);
            this.physics.add.collider(this.boxStack1,this.player1);
            this.boxStack1.setImmovable(true);
            this.boxStack1.body.allowGravity = false;

            this.boxStack2 = this.physics.add.sprite(game.config.width/2 + 380, game.config.height - 60, 'box').setScale(1);
            this.physics.add.collider(this.boxStack2,this.ground);
            this.physics.add.collider(this.boxStack2,this.player2);
            this.physics.add.collider(this.boxStack2,this.player1);
            this.boxStack2.setImmovable(true);
            this.boxStack2.body.allowGravity = false;

            this.boxStack3 = this.physics.add.sprite(game.config.width/2 + 460, game.config.height - 60, 'box').setScale(1);
            this.physics.add.collider(this.boxStack3,this.ground);
            this.physics.add.collider(this.boxStack3,this.player2);
            this.physics.add.collider(this.boxStack3,this.player1);
            this.boxStack3.setImmovable(true);
            this.boxStack3.body.allowGravity = false;

            this.boxStack3 = this.physics.add.sprite(game.config.width/2 + 540, game.config.height - 60, 'box').setScale(1);
            this.physics.add.collider(this.boxStack3,this.ground);
            this.physics.add.collider(this.boxStack3,this.player2);
            this.physics.add.collider(this.boxStack3,this.player1);
            this.boxStack3.setImmovable(true);
            this.boxStack3.body.allowGravity = false;
            

            // setting 2nd layer of the box stack
            this.boxStack4 = this.physics.add.sprite(game.config.width/2 + 340, game.config.height - 140, 'box').setScale(1);
            this.physics.add.collider(this.boxStack4,this.ground);
            this.physics.add.collider(this.boxStack4,this.player2);
            this.physics.add.collider(this.boxStack4,this.player1);
            this.boxStack4.setImmovable(true);
            this.boxStack4.body.allowGravity = false;

            this.boxStack5 = this.physics.add.sprite(game.config.width/2 + 420, game.config.height - 140, 'box').setScale(1);
            this.physics.add.collider(this.boxStack5,this.ground);
            this.physics.add.collider(this.boxStack5,this.player2);
            this.physics.add.collider(this.boxStack5,this.player1);
            this.boxStack5.setImmovable(true);
            this.boxStack5.body.allowGravity = false;

            this.boxStack6 = this.physics.add.sprite(game.config.width/2 + 500, game.config.height - 140, 'box').setScale(1);
            this.physics.add.collider(this.boxStack6,this.ground);
            this.physics.add.collider(this.boxStack6,this.player2);
            this.physics.add.collider(this.boxStack6,this.player1);
            this.boxStack6.setImmovable(true);
            this.boxStack6.body.allowGravity = false;

            // 3rd layer of the box stack
            this.boxStack7 = this.physics.add.sprite(game.config.width/2 + 420, game.config.height - 220, 'box').setScale(1);
            this.physics.add.collider(this.boxStack7,this.ground);
            this.physics.add.collider(this.boxStack7,this.player2);
            this.physics.add.collider(this.boxStack7,this.player1);
            this.boxStack7.setImmovable(true);
            this.boxStack7.body.allowGravity = false;

            // setting platform
            this.platform = this.physics.add.sprite(game.config.width /2 + 750, game.config.height/2 - 160);
            this.physics.add.collider(this.platform,this.player1);
            this.physics.add.collider(this.platform,this.player2);
            this.platform.setImmovable(true);
            this.platform.body.allowGravity = false;
            this.platform.displayWidth = 280;
            this.platform.displayHeight = 50;

            // set door switch instruction box
            this.switch_box = this.physics.add.sprite(game.config.width/2 + 340,game.config.height - 300, 'E_Key');
            this.switch_box.setImmovable(true);
            this.switch_box.visible = false;
            this.switch_box.body.allowGravity = false;
                        
            // setting ladder for crab
            this.ladder1 = this.physics.add.sprite(game.config.width /2 + 610, game.config.height - 270, 'platform');
            this.ladder1.setImmovable(true);
            this.ladder1.body.allowGravity = false;
            this.ladder1.displayWidth = 300;
            this.ladder1.body.checkCollision.down = false;

            this.ladder2 = this.physics.add.sprite(game.config.width /2 + 1100, game.config.height - 270, 'platform');
            this.ladder2.setImmovable(true);
            this.ladder2.body.allowGravity = false;
            this.ladder2.displayWidth = 100;
            this.ladder2.body.checkCollision.down = false;
            this.ladder2.body.checkCollision.left = false;

            this.ladder3 = this.physics.add.sprite(game.config.width /2 + 1100, game.config.height - 400, 'platform');
            this.ladder3.setImmovable(true);
            this.ladder3.body.allowGravity = false;
            this.ladder3.displayWidth = 200;
            this.ladder3.body.checkCollision.down = false;
            this.ladder3.body.checkCollision.left = false;

            // set camera
            this.cameras.main.setBounds(0,0,1800,600);
            this.physics.world.setBounds(0,0,1850,600);

            this.cameras.main.startFollow(this.player1,true,0.05,0.05);


            // setting sight
            this.sight = this.physics.add.sprite(game.config.width/2 + 1000, game.config.height - 100).setScale(11);
            this.physics.add.overlap(this.sight,this.player1,function(){
                this.sound.play('death');
                this.gameOver = true;
            },null,this);
            this.physics.add.overlap(this.sight,this.player2,function(){
                this.sound.play('death');
                this.gameOver = true;
            },null,this);
            this.sight.setImmovable(true);
            this.sight.displayWidth = 500;
            this.sight.displayHeight = 300;
            
            this.sight.body.allowGravity = false;

            // setting human
            this.human = this.physics.add.sprite(game.config.width + 100, game.config.height - 110, 'human').setScale(0.9);
            this.physics.add.collider(this.human,this.player1);
            this.physics.add.collider(this.human,this.player2);
            this.human.setImmovable(true);
            this.human.body.allowGravity = false;

            // exit
            this.exit = this.physics.add.sprite(game.config.width + 500, game.config.height - 20, 'exit').setScale(0.9);
            this.exit.setImmovable(true);
            this.exit.body.allowGravity = false;

            // exit box
            this.exit_box = this.physics.add.sprite(game.config.width + 500, game.config.height - 60, 'down');
            this.exit_box.setImmovable(true);
            this.exit_box.body.allowGravity = false;
            this.exit_box.visible = false;

            // human sweep right
            this.anims.create({
                key: 'man_sweep_right',
                frames: this.anims.generateFrameNames('human_atlas', {
                    prefix: 'man_sweep_right_',
                    start: 1,
                    end: 3,
                    suffix: '',
                    zeroPad: 4
                }),
                frameRate: 10,
                repeat: -1,
                repeatDelay: 300,
                yoyo: true
            });
            // human look back and forth left
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
                yoyo: true
            });
            this.human.anims.play('man_sweep_right', true);

            // setting lunch box, need to replace the texture later
            this.lunch = this.physics.add.sprite(game.config.width/2 + 650, game.config.height/2 - 400, 'lunchbox').setScale(0.8);

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
            keyShift = this.input.keyboard.addKey(16);
            keySpace = this.input.keyboard.addKey(32);
        
            this.interact_switch = false;
            this.humanSight = false;
            this.gameOver = false;
            this.push_lunch = false;
            this.onGround = false;
            this.win = false;

            // switch
            this.physics.add.overlap(this.player1,this.switch,function(){
                if(keyE.isDown && !this.interact_switch){
                    this.interact_switch = true;
                    this.sound.play('switch');
                }
            },null,this);

            // sight overlap
            this.sightBox = this.physics.add.overlap(this.player1,this.switch,function(){
                this.humanSight = true;
            },null,this);

            // ladder 1
            this.physics.add.collider(this.player1,this.ladder1);
            this.physics.add.collider(this.player2,this.ladder1);

            // ladder 2
            this.physics.add.collider(this.player1,this.ladder2);
            this.physics.add.collider(this.player2,this.ladder2);

            // ladder 3
            this.physics.add.collider(this.player1,this.ladder3);
            this.physics.add.collider(this.player2,this.ladder3);

            // lunch box on platform
            this.lunchOnPlatform = this.physics.add.collider(this.platform,this.lunch);

            // lunch box on ground
            this.lunchOnGround = this.physics.add.collider(this.ground,this.lunch,function(){
                this.onGround = true;
            },null,this);

            // lunch overlap with player
            this.physics.add.overlap(this.player2,this.lunch,function(){
                if(keyDOWN.isDown && !this.push_lunch){
                    this.push_lunch = true;
                }
            },null,this);
 
            // exit overlap
            this.physics.add.overlap(this.player2,this.exit,function(){
                if(keyDOWN.isDown && !this.win){
                    this.win = true;
                }
            },null,this);

    }    

    update(){
        this.player1.update();
        this.player2.update();

        // restart scene
        if(this.gameOver){
            this.bgm2.pause();
            this.scene.start("gameOver");
        }

        if(this.switch.body.touching.none){
            this.switch_box.visible = false;
        }
        else{
            this.switch_box.visible = true;
        }

        //player 2 jump sfx
        if (this.sfxJumpComplete && keyUP.isUp) {
            this.sfxJumpIsPlaying = false;
            this.sfxJumpComplete = false;
        }
        if (this.player2.jump) {
            if (!this.sfxJumpIsPlaying) {
                this.sfxJump.play();
            }
            this.sfxJump.on('play', () => {
                this.sfxJumpIsPlaying = true;
                this.sfxJump.on('complete', () => {
                    this.sfxJumpComplete = true;
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

        // open the door
        if(this.interact_switch){
            // this.door.visible = false;
            // this.door.setImmovable(false);
            // this.door.body.allowGravity = true;
            // this.door.setVelocityY(-500);
            this.door.destroy();
            this.doorOpen.visible = true;
        }
 
        // when the player interact with the lunch box, push it down to the ground
        if(this.push_lunch){
            this.physics.world.removeCollider(this.lunchOnPlatform);
        }

        // remove sight hit box
        if(this.onGround){
            this.human.anims.play('man_look_left', true);
            this.sight.destroy();
            this.exit_box.visible = true;
            if (!this.sfxFallIsPlaying) {
                this.sfxFall.play();
                this.sfxFallIsPlaying = true;
            }
            if(this.lunch.body.touching.down){
                this.lunch.setTexture('open_box');
            }
        }

        if(this.win){
            this.scene.start("Poststage2");
        }
    }

}