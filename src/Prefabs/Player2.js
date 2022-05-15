class Player2 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture) {
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.ability = false;
        this.wallClimb = false;
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
    }
}
