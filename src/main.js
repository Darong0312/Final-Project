let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:600},
            debug: true
        }
    },
    scene: [ Tutorial , Stage_2]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyA,keyD,keyW,keyLEFT,keyRIGHT,keyUP, timer,keyE;

var owl;