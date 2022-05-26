// Tutorial section
class Stage_2 extends Phaser.Scene{
    constructor(){
        super('stageTwo');
    }

    preload(){
        this.load.image('back','./assets/tutorial_bg.png');
        this.load.image('plat','./assets/platform.png');
        this.load.image('platY','./assets/platformY.png');
        this.load.image('switch','./assets/switch.jpg');
        this.load.image('rock','./assets/rock.png');
        this.load.image('monsterA','./assets/monsterA_idle.png');
        this.load.image('tutorial_bg', './assets/tutorial_bg.png');
        this.load.image('box_fragile', './assets/box_fragile.png');
        this.load.image('platform', './assets/wood_platform.png');
        this.load.image('platformY', './assets/wood_platformY.png');
        this.load.image('crab', './assets/Crab.png');
        this.load.image('platformY', './assets/wood_platformY.png');
        this.load.atlas('tenti_atlas', './assets/tentisheet.png', './assets/tentimap.json');
        this.load.image('box', './assets/box.png');

        this.load.audio('switch','./assets/audio/switch.wav');
    }


    
    create(){
            // world bounds
            //this.physics.world.setBounds(0,0,800,600,true,true,true,false);
            //set background
            let bg = this.add.image(game.config.width/2, game.config.height/2,"back");
    
            // init ground and platform
            this.tutorial_bg = this.add.tileSprite(0, 0, 1200, 650, 'tutorial_bg').setOrigin(0, 0);

            this.ground = this.physics.add.sprite(game.config.width/2,game.config.height - 10,'platform');
            this.ground.displayWidth = 1200;
            this.ground.body.allowGravity = false;
            this.ground.setImmovable(true);
            this.ground.setFrictionX(0);

            // init players
            this.player1 = new Player1(this,game.config.width/3 - 250, game.config.height - 100, 'monsterA');
            this.physics.add.collider(this.ground,this.player1);
            this.player1.setCollideWorldBounds(true);
    
            this.player2 = new Player2(this,game.config.width/3 - 300, game.config.height -100, 'crab');
            this.physics.add.collider(this.ground, this.player2);
            this.player2.setCollideWorldBounds(true);
    
            this.box = this.physics.add.sprite(game.config.width /3 - 100, game.config.height - 60, 'box').setScale(1);
            this.physics.add.collider(this.box,this.ground);
            this.physics.add.collider(this.box,this.player2);
            this.physics.add.collider(this.box,this.player1);
            this.box.setImmovable(true);
            this.box.body.allowGravity = false;

            this.door = this.physics.add.sprite(game.config.width / 3, game.config.height - 150,"platformY");
            this.door.displayHeight = 200;
            this.door.body.allowGravity = false;
            this.door.setImmovable(true);

            this.switch = this.physics.add.sprite(game.config / 2,game.config.height - 150, "switch");
            this.switch.setImmovable(true);

            // init key
            keyA = this.input.keyboard.addKey(65);
            keyD = this.input.keyboard.addKey(68);
            keyW = this.input.keyboard.addKey(87);
            keyLEFT = this.input.keyboard.addKey(37);
            keyRIGHT = this.input.keyboard.addKey(39);
            keyUP = this.input.keyboard.addKey(38);
            keyDOWN = this.input.keyboard.addKey(40);
            keyE = this.input.keyboard.addKey(69);
            keyShift = this.input.keyboard.addKey(16);
            keySpace = this.input.keyboard.addKey(32);
        
            this.interact_button1 = false;
            this.interact_button2 = false;
            this.interact_switch = false;
            

    }    

    update(){
        this.player1.update();
        this.player2.update();

    }

}