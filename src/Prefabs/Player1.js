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
        
        /*
        this.clock = this.time.addEvent({
            delay:1000,
            callback: decreaseTime,
            callbackScope: this,
            loop: true
        })

        function decreaseTime(){
            this.climbTime -= 1000;
        }
        */
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
            if(this.climbTime >=0 ){
                this.allowGravity = false;
                this.setVelocityY(-100);
            }
        }
        else{
            this.body.allowGravity = true;
        }

        if(keyW.isDown && this.body.blocked.left){
            if(this.climbTime >=0 ){
                this.allowGravity = false;
                this.setVelocityY(-100);
            }
        }
        else{
            this.body.allowGravity = true;
        }


        if(this.body.touching.down){
            this.climb = true;
            this.climbTime = time;
            console.log(this.climbTime);
        }
        else{
            this.countDown = setInterval( ()=>{
                //this.climbTime --;
                //console.log(this.climbTime);
                if(this.climbTime <=0 || this.climbTime < 1){
                    this.climb = false;
                    console.log(this.climbTime);
                    clearInterval(this.countDown);
                }
            },1000)
        }

    }

}
