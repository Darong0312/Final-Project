let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:600},
            debug: true
        }
    },
    scene: [ Menu , Tutorial , Stage_2, Stage_1, Stage_3, Credits, Over, Win, Pretu, PostTutorial, Poststage1, Poststage2, Postfinal]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyA,keyD,keyW,keyS,keyLEFT,keyRIGHT,keyUP,keyShift, timer;

var keySpace,keyE,keyDOWN;

var owl;