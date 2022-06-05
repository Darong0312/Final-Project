class Postfinal extends Phaser.Scene {
    constructor() {
        super("PostFinal");
    }

    preload(){
        this.load.image('postfinal','./assets/postfinal.png');
    }
    create() {
        // show menu image
        this.add.image(game.config.width/2, game.config.height/2,'postfinal');
        // define keys
        keySpace = this.input.keyboard.addKey(32);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.sound.play('select');
            this.scene.start("win");
        }
    }
}