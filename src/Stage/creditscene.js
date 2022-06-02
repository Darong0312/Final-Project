class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    preload(){
        this.load.image('credit','./assets/credits.png');
    }
    create() {
        // show menu image
        this.add.image(game.config.width/2, game.config.height/2,'credit');
        // define keys
        keySpace = this.input.keyboard.addKey(32);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start("menuScene");
        }
    }
}