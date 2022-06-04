class Pretu extends Phaser.Scene {
    constructor() {
        super("preTutorial");
    }

    preload(){
        this.load.image('pretutorial','./assets/pretutorial.png');
    }
    create() {
        // show menu image
        this.add.image(game.config.width/2, game.config.height/2,'pretutorial');
        // define keys
        keySpace = this.input.keyboard.addKey(32);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start("tutorialScene");
        }
    }
}