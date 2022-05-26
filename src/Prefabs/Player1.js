// allow wall climb

const speed = 300;
const time = 3;

class Player1 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture) {
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.ability = false;
        this.wallClimb = false;
        this.interact = false;
        this.climbTime = time;
        this.climb = true;
        
        this.timeup = false;
        this.timedEvent = scene.time.addEvent({ 
            delay: 1000,
            callback: () => {
                this.timup = true;
                this.climbTime--;
                console.log(this.climbTime);
                //console.log(this.timeup);
            },
            loop: true,
            callbackScope: this,
            paused: true,
        });
        this.climbTimer = scene.time.addEvent(this.timedEvent);

    }

    update(){
        this.setVelocityX(0);

        if(keyA.isDown){
            this.setVelocityX(-speed);
        }
        else if(keyD.isDown){
            this.setVelocityX(speed);
        }

        if(keyW.isDown && this.body.blocked.right){
            if(this.climbTime > 0  ){
                this.allowGravity = false;
                this.setVelocityY(-100);
            }
        }
        else{
            this.body.allowGravity = true;
        }

        if(keyW.isDown && this.body.blocked.left){
            if(this.climbTime > 0 ){
                this.allowGravity = false;
                this.setVelocityY(-100);
            }
        }
        else{
            this.body.allowGravity = true;
        }

        if(this.body.touching.down){
            this.climbTimer.paused = true;
            this.climbTime = time;
        }
        else{
            this.climbTimer.paused = false;
        }
        
    }
    
}
