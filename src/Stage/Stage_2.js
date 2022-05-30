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
        this.load.image('crab', './assets/Crab.png');
        this.load.image('platformY', './assets/wood_platformY.png');
        this.load.image('box', './assets/box.png');
        this.load.image('human','./assets/olman.png');
        this.load.image('stage_2','./assets/stage_2');
        this.load.atlas('crab_atlas', './assets/crabbertsheet.png', './assets/crabmap.json');
        this.load.atlas('tenti_atlas', './assets/tentisheet.png', './assets/tentimap.json');

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
    
            this.box = this.physics.add.sprite(game.config.width /3 - 100, game.config.height - 60, 'box').setScale(0.5);
            this.physics.add.collider(this.box,this.ground);
            this.physics.add.collider(this.box,this.player2);
            this.physics.add.collider(this.box,this.player1);
            this.box.setImmovable(true);
            this.box.body.allowGravity = false;

            this.door = this.physics.add.sprite(game.config.width / 3, game.config.height - 250,"platformY");
            this.door.displayHeight = 400;
            this.door.body.allowGravity = false;
            this.door.setImmovable(true);
            this.physics.add.collider(this.player2,this.door);

            this.switch = this.physics.add.sprite(game.config.width/ 2 - 100,game.config.height - 50, "switch");
            this.switch.body.allowGravity = false;
            this.switch.setImmovable(true);

            // box in box stack: width = 80, height = 80
            // setting the first layer of the box stack
            this.boxStack1 = this.physics.add.sprite(game.config.width/2 - 20, game.config.height - 60, 'box').setScale(1);
            this.physics.add.collider(this.boxStack1,this.ground);
            this.physics.add.collider(this.boxStack1,this.player2);
            this.physics.add.collider(this.boxStack1,this.player1);
            this.boxStack1.setImmovable(true);
            this.boxStack1.body.allowGravity = false;

            this.boxStack2 = this.physics.add.sprite(game.config.width/2 + 60, game.config.height - 60, 'box').setScale(1);
            this.physics.add.collider(this.boxStack2,this.ground);
            this.physics.add.collider(this.boxStack2,this.player2);
            this.physics.add.collider(this.boxStack2,this.player1);
            this.boxStack2.setImmovable(true);
            this.boxStack2.body.allowGravity = false;

            this.boxStack3 = this.physics.add.sprite(game.config.width/2 + 140, game.config.height - 60, 'box').setScale(1);
            this.physics.add.collider(this.boxStack3,this.ground);
            this.physics.add.collider(this.boxStack3,this.player2);
            this.physics.add.collider(this.boxStack3,this.player1);
            this.boxStack3.setImmovable(true);
            this.boxStack3.body.allowGravity = false;

            this.boxStack3 = this.physics.add.sprite(game.config.width/2 + 220, game.config.height - 60, 'box').setScale(1);
            this.physics.add.collider(this.boxStack3,this.ground);
            this.physics.add.collider(this.boxStack3,this.player2);
            this.physics.add.collider(this.boxStack3,this.player1);
            this.boxStack3.setImmovable(true);
            this.boxStack3.body.allowGravity = false;
            

            // setting 2nd layer of the box stack
            this.boxStack4 = this.physics.add.sprite(game.config.width/2 + 20, game.config.height - 140, 'box').setScale(1);
            this.physics.add.collider(this.boxStack4,this.ground);
            this.physics.add.collider(this.boxStack4,this.player2);
            this.physics.add.collider(this.boxStack4,this.player1);
            this.boxStack4.setImmovable(true);
            this.boxStack4.body.allowGravity = false;

            this.boxStack5 = this.physics.add.sprite(game.config.width/2 + 100, game.config.height - 140, 'box').setScale(1);
            this.physics.add.collider(this.boxStack5,this.ground);
            this.physics.add.collider(this.boxStack5,this.player2);
            this.physics.add.collider(this.boxStack5,this.player1);
            this.boxStack5.setImmovable(true);
            this.boxStack5.body.allowGravity = false;

            this.boxStack6 = this.physics.add.sprite(game.config.width/2 + 180, game.config.height - 140, 'box').setScale(1);
            this.physics.add.collider(this.boxStack6,this.ground);
            this.physics.add.collider(this.boxStack6,this.player2);
            this.physics.add.collider(this.boxStack6,this.player1);
            this.boxStack6.setImmovable(true);
            this.boxStack6.body.allowGravity = false;

            // 3rd layer of the box stack
            this.boxStack7 = this.physics.add.sprite(game.config.width/2 + 100, game.config.height - 220, 'box').setScale(1);
            this.physics.add.collider(this.boxStack7,this.ground);
            this.physics.add.collider(this.boxStack7,this.player2);
            this.physics.add.collider(this.boxStack7,this.player1);
            this.boxStack7.setImmovable(true);
            this.boxStack7.body.allowGravity = false;

            // setting platform
            this.platform = this.physics.add.sprite(game.config.width - 290, game.config.height -270, 'platform');
            this.physics.add.collider(this.platform,this.player1);
            this.physics.add.collider(this.platform,this.player2);
            this.platform.setImmovable(true);
            this.platform.body.allowGravity = false;
            this.platform.displayWidth = 300;

            // setting sight
            this.sight = this.physics.add.sprite(game.config.width - 150, game.config.height - 100).setScale(10);
            this.physics.add.overlap(this.sight,this.player1,function(){
                this.gameOver = true;
            },null,this);
            this.physics.add.overlap(this.sight,this.player2,function(){
                this.gameOver = true;
            },null,this);
            this.sight.setImmovable(true);
            this.sight.body.allowGravity = false;

            // setting human
            this.human = this.physics.add.sprite(game.config.width - 240, game.config.height - 80, 'human').setScale(0.3);
            this.physics.add.collider(this.human,this.player1);
            this.physics.add.collider(this.human,this.player2);
            this.human.setImmovable(true);
            this.human.body.allowGravity = false;

            // setting lunch box, need to replace the texture later
            this.lunch = this.physics.add.sprite(game.config.width - 290, game.config.height -400, 'box').setScale(0.8);
            this.box.setImmovable(true);
            this.box.body.allowGravity = false;

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
        
            this.interact_switch = false;
            this.humanSight = false;
            this.gameOver = false;
            this.push_lunch = false;
            this.onGround = false;
            
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

            // lunch box on platform
            this.lunchOnPlatform = this.physics.add.collider(this.platform,this.lunch);

            // lunch box on ground
            this.lunchOnGround = this.physics.add.collider(this.ground,this.lunch,function(){
                this.onGround = true;
            },null,this);
            
            // lunch overlap with players
            this.physics.add.overlap(this.player1,this.lunch,function(){
                if(keyE.isDown && !this.push_lunch){
                    this.push_lunch = true;
                }
            },null,this);

            // lunch overlap with players
            this.physics.add.overlap(this.player2,this.lunch,function(){
                if(keyDOWN.isDown && !this.push_lunch){
                    this.push_lunch = true;
                }
            },null,this);
    }    

    update(){
        this.player1.update();
        this.player2.update();

        // restart scene
        if(this.gameOver){
            this.scene.restart();
        }

        // open the door
        if(this.interact_switch){
            this.door.visible = false;
            this.door.setImmovable(false);
            this.door.body.allowGravity = true;
            this.door.setVelocityY(-500);
            this.physics.world.removeCollider(this.door);
        }

        // when the player interact with the lunch box, push it down to the ground
        if(this.push_lunch){
            this.physics.world.removeCollider(this.lunchOnPlatform);
        }

        // remove sight hit box
        if(this.onGround){
            this.sight.setVelocityY(500);
        }
    }

}