// Tutorial section
class Tutorial extends Phaser.Scene{
    constructor(){
        super('tutorialScene');
    }

    preload(){
        this.load.image('plat','./assets/platform.png');
        this.load.image('platY','./assets/platformY.png');
        this.load.image('switch','./assets/switch.jpg');
        this.load.image('rock','./assets/rock.png');
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

        this.load.audio('switch','./assets/audio/switch.wav');
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
        this.player1 = new Player1(this,game.config.width/3 - 200, game.config.height/2 -100, 'run');
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
        this.switch = this.physics.add.sprite(game.config.width/3 + 200,game.config.height/2 -100, 'switch').setScale(0.1);
        this.physics.add.collider(this.switch,this.platform);

        this.fox = this.physics.add.sprite(game.config.width/3 - 100,game.config.height/2 -100, 'rock').setScale(0.2);
        this.physics.add.collider(this.fox,this.platform);
        this.physics.add.collider(this.fox,this.player1);
        this.fox.setImmovable(true);
        this.fox.body.allowGravity = false;

        this.rock = this.physics.add.sprite(game.config.width/5,game.config.height - 100, 'rock').setScale(0.5);
        this.rockPlat = this.physics.add.collider(this.rock,this.platform);
        this.physics.add.collider(this.rock,this.player2);
        this.rock.setImmovable(true);
        this.rock.body.allowGravity = false;

        this.physics.add.overlap(this.player1,this.switch,function(){
            if(keySpace.isDown && !this.over){
                this.over =true;
                this.sound.play('switch');
            }
            console.log(this.over);
        },null,this);
        
        this.intro = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2 - 50,"Player 1 is the top one, Controled by WAD");
        this.intro2 = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2 - 20,"can wall climb by A/D + W to wall climb when blocked by object");
        this.intro3 = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2 + 10,"Player 2 is the bottom one, Controled by Left Right Up arrow");
        this.intro4 = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2 + 30,"Able to double jump");
        this.intro5 = this.add.text(borderUISize + borderPadding, 300,"Player 1 can interact with the switch");
        this.intro9 = this.add.text(borderUISize + borderPadding, 350,"by press space bar when it is overlap with the switch");
    }

    update(){
        this.player1.update();
        this.player2.update();
        if(this.over){
            this.rock.visible = false;
            this.rock.setImmovable(false);
            this.rock.body.allowGravity = true;
            this.rock.setVelocityY(-500);
            this.physics.world.removeCollider(this.rockPlat);
        }
    //    console.log(this.fox.body.onOverlap);
    }
}