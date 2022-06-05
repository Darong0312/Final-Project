class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    preload(){
        this.load.image('credit','./assets/credits.png');
        this.load.image('crab','./assets/Crab.png');
        this.load.image('tenti','./assets/tenti.png');

        this.load.atlas('crab_atlas', './assets/crabbertsheet.png', './assets/crabmap.json');
        this.load.atlas('tenti_atlas', './assets/tentisheet.png', './assets/tentimap.json');

    }
    create() {
        this.anims.create({
            key: 'crab_run_right',
            frames: this.anims.generateFrameNames('crab_atlas', {
                prefix: 'crab_run_right_',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'tenti_run_right',
            frames: this.anims.generateFrameNames('tenti_atlas', {
                prefix: 'tenti_run_right_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 13,
            repeat: -1,
        });

        // show menu image
        this.add.image(game.config.width/2, game.config.height/2,'credit');
        // define keys
        keySpace = this.input.keyboard.addKey(32);

        // init players
        this.player1 = new Player1(this,game.config.width/3 - 270, game.config.height - 30, 'tenti').setDepth(1);
        this.player2 = new Player2(this,game.config.width/3 - 350, game.config.height - 30, 'crab').setDepth(1);
        this.player1.body.allowGravity = false;
        this.player2.body.allowGravity = false;


        this.player2.anims.play('crab_run_right', true);
        this.player1.anims.play('tenti_run_right',true);
        
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start("menuScene");
        }
    }
}