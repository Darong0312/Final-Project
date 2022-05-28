class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.image('mainMenu','./assets/menu.png');
        this.load.audio('select','./assets/audio/select.wav');
    }
    create() {
        // show menu image
        this.add.image(game.config.width/2, game.config.height/2,'mainMenu');
        // define keys
        keySpace = this.input.keyboard.addKey(32);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            this.sound.play('select');
            //this.scene.start("tutorialScene");
            this.scene.start("stageOne");
        }
    }
}