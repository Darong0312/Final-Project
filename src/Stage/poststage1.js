class Poststage1 extends Phaser.Scene {
    constructor() {
        super("Poststage1");
    }

    preload(){
        this.load.image('poststage1','./assets/poststage1.png');
    }
    create() {
        // show menu image
        this.add.image(game.config.width/2, game.config.height/2,'poststage1');
        // define keys
        keySpace = this.input.keyboard.addKey(32);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start("stageOne");
        }
    }
}