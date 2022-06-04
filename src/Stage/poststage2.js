class Poststage2 extends Phaser.Scene {
    constructor() {
        super("Poststage2");
    }

    preload(){
        this.load.image('poststage2','./assets/poststage2.png');
    }
    create() {
        // show menu image
        this.add.image(game.config.width/2, game.config.height/2,'poststage2');
        // define keys
        keySpace = this.input.keyboard.addKey(32);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start("stageTwo");
        }
    }
}