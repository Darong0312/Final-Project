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
    }

    update(){
        this.setVelocityX(0);
        if(keyLEFT.isDown){
            this.setVelocityX(-speed);
        }
        else if(keyRIGHT.isDown){
            this.setVelocityX(speed);
        }

        if(keyUP.isDown){
            if(!this.jump){
                if(this.jumpCount > 0){
                    this.setVelocityY(-250);
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

    }
}
