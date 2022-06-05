// Stage 3
class Stage_3 extends Phaser.Scene{
    constructor(){
        super('stageThree');
    }

    preload(){
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
        this.load.image('gray_y','./assets/gray_y.png');
        this.load.image('down', './assets/arrow.png');
        this.load.image('E_Key', './assets/ekey.png');
        this.load.image('stage_3','./assets/stage_3.png');
        this.load.image('wood_box','./assets/tallcrate.png');
        this.load.image('exitsign', './assets/exitsign.png');

        this.load.image('night','./assets/final_1.png');
        this.load.image('back','./assets/final_2.png');
        this.load.image('mid','./assets/final_3.png');
        this.load.image('front','./assets/final_4.png');

        this.load.atlas('crab_atlas', './assets/crabbertsheet.png', './assets/crabmap.json');
        this.load.atlas('tenti_atlas', './assets/tentisheet.png', './assets/tentimap.json');
        this.load.atlas('human_atlas', './assets/humansheet.png', './assets/humanmap.json');


        this.load.audio('switch','./assets/audio/switch.wav');
        this.load.audio('jump', './assets/audio/jump.wav');
        this.load.audio('climb', './assets/audio/climb.wav');
        this.load.audio('fall', './assets/audio/fall.wav');
        this.load.audio('bgm2', './assets/audio/level2theme.wav');
    }


    
    create(){
            // world bounds
            //this.physics.world.setBounds(0,0,800,600,true,true,true,false);
            //set background
            // let bg = this.add.image(game.config.width/2, game.config.height/2,"stage_3");

            this.bgm2 = this.sound.add('bgm2');
            this.bgm2.setVolume(0.3);
            this.bgm2.loop = true;
            this.bgm2.play();

            // init background
            this.stage_3_bg = this.add.tileSprite(0, 0, 2400, 600, 'stage_3').setOrigin(0, 0).setDepth(5);
            this.night = this.add.tileSprite(0,0,2400,600,'night').setOrigin(0).setDepth(0);
            this.back = this.add.tileSprite(0,0,2400,600,'back').setOrigin(0).setDepth(1);
            this.mid = this.add.tileSprite(0,0,2400,600,'mid').setOrigin(0).setDepth(2);
            this.front = this.add.tileSprite(0,0,2400,600,'front').setOrigin(0).setDepth(3);

            //stuff so sound only repeats after completely playing once
            this.sfxJump = this.sound.add('jump');
            this.sfxJumpComplete = false;
            this.sfxJumpIsPlaying = false;
            this.sfxClimb = this.sound.add('climb');
            this.sfxClimbIsPlaying = false;

            this.sfxFall = this.sound.add('fall');
            this.sfxFallIsPlaying = false;

            // set up ground
            this.ground = this.physics.add.sprite(game.config.width/2,game.config.height - 10,'platform');
            this.ground.displayWidth = 2400;
            this.ground.body.allowGravity = false;
            this.ground.setImmovable(true);
            this.ground.setFrictionX(0);

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
        

            // init players
            this.player1 = new Player1(this,game.config.width/3 - 250, game.config.height - 100, 'tenti').setDepth(10);
            this.physics.add.collider(this.ground,this.player1);
            this.player1.setCollideWorldBounds(true);
    
            this.player2 = new Player2(this,game.config.width/3 - 300, game.config.height -100, 'crab').setDepth(10);
            this.physics.add.collider(this.ground, this.player2);
            this.player2.setCollideWorldBounds(true);

            // set camera
            this.cameras.main.setBounds(0,0,1800,600);
            this.physics.world.setBounds(0,0,1800,600);

            this.cameras.main.startFollow(this.player1,true,0.05,0.05);
            this.cameras.main.setZoom(1.5);

            // set up box
            this.box = this.physics.add.sprite(game.config.width/2 + 235,game.config.height- 75,"wood_box").setScale(0.6).setDepth(10);
            this.box.body.allowGravity = false;
            this.box.displayHeight = 115;
            this.box.setImmovable(true);

            this.physics.add.collider(this.box,this.player1);
            this.physics.add.collider(this.box,this.player2);

            this.out1 = false;
            this.out2 = false;
            this.win = false;

            // exit
            this.exit = this.physics.add.sprite(game.config.width + 500, game.config.height - 100, "exitsign").setScale(0.9).setDepth(9);
            this.exit.setImmovable(true);
            this.exit.body.allowGravity = false;
    }    

    update(){
        this.player1.update();
        this.player2.update();

        // check if player is out of the sewer
        if(this.player1.x >= 885){
            this.out1 = true;
        }
        if(this.player2.x >= 885){
            this.out2 = true;
        }

        if(this.player1.x >= 1700 && this.player2.x >= 1700){
            this.win = true;
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

        
        if(keyD.isDown && keyRIGHT.isDown && this.out1 && this.out2){
            this.back.tilePositionX += 0.5;
            this.mid.tilePositionX += 1;
            this.front.tilePositionX += 1.5;
        }

        if(this.win){
            this.scene.start("PostFinal");
        }
    }

}