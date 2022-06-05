class PostTutorial extends Phaser.Scene {
    constructor() {
        super("PostTutorial");
    }

    preload(){
        this.load.image('postTutorial','./assets/posttutorial.png');
    }
    create() {
        // show menu image
        this.add.image(game.config.width/2, game.config.height/2,'postTutorial');
        // define keys
        keySpace = this.input.keyboard.addKey(32);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.sound.play('select');
            this.scene.start("stageOne");
        }
    }
}