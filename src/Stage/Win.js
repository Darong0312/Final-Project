class Win extends Phaser.Scene {
    constructor() {
        super("win");
    }

    preload(){
        this.load.image('win','./assets/win.png');
    }
    create() {
        // show menu image
        this.add.image(game.config.width/2, game.config.height/2,'win');
        // define keys
        keySpace = this.input.keyboard.addKey(32);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start("menuScene");
        }
    }
}