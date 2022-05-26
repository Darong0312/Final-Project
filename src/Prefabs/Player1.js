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

        // player 1 Idle right
        this.anims.create({
            key: 'tenti_idle_right',
            frames: this.anims.generateFrameNames('tenti_atlas', {
                prefix: 'tenti_idle_right_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 7,
            repeat: -1,
            yoyo: true
        });
        // player 1 Idle left
        this.anims.create({
            key: 'tenti_idle_left',
            frames: this.anims.generateFrameNames('tenti_atlas', {
                prefix: 'tenti_idle_left_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 7,
            repeat: -1,
            yoyo: true
        });
    }

    update(){
        this.setVelocityX(0);

        if(!this.anims.isPlaying) {
            this.anims.play('tenti_idle_right', true);
        }

        if(keyA.isDown){
            this.setVelocityX(-speed);
            this.anims.play('tenti_idle_left', true);
        }
        else if(keyD.isDown){
            this.setVelocityX(speed);
            this.anims.play('tenti_idle_right', true);
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

        // if(keyW.isDown){
        //     console.log("pressed")
        //     this.climbTimer.paused = false;
        //     this.climbTimer.reset(this.timedEvent);
        // }
        // else{
        //     this.climbTimer.paused = false;
        //     this.climbTimer.reset(this.timedEvent);
        // }

    }
    
}
