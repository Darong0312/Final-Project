class Player2 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture) {
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.ability = false;
        // setting jump variables
        this.jump = false;
        this.jumpCount = 0;

        this.interact = false;

        // player 2 run right
        this.anims.create({
            key: 'crab_run_right',
            frames: this.anims.generateFrameNames('crab_atlas', {
                prefix: 'crab_run_right_',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1
        });
        // player 2 run left
        this.anims.create({
            key: 'crab_run_left',
            frames: this.anims.generateFrameNames('crab_atlas', {
                prefix: 'crab_run_left_',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1
        });
    }

    update(){
        this.setVelocityX(0);
        if(keyLEFT.isDown){
            this.setVelocityX(-speed);
            this.anims.play('crab_run_left', true);
        }
        else if(keyRIGHT.isDown){
            this.setVelocityX(speed);
            this.anims.play('crab_run_right', true);
        }

        if(keyUP.isDown){
            if(!this.jump){
                if(this.jumpCount > 0){
                    this.setVelocityY(-300);
                    this.jump = true;
                    --this.jumpCount;
                }
            }
        }

        if(keyUP.isUp){
            this.jump = false;
        }

        if(this.body.touching.down){
            this.jumpCount = 1;
        }
/*
        if(keyShift.isDown){
            this.body.setSize(this.width,this.)
        }
*/
    }
}
