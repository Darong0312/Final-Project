class Over extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    preload(){
        this.load.image('gameover','./assets/gameover.png');
        this.load.audio('select','./assets/audio/select.wav');
    }
    create() {
        // show menu image
        this.add.image(game.config.width/2, game.config.height/2,'gameover');
        // define keys
        keySpace = this.input.keyboard.addKey(32);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.sound.play('select');
            this.scene.start("menuScene");
        }
    }
}