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
        this.isClimbing = false;
        
        this.timeup = false;
        this.timedEvent = scene.time.addEvent({ 
            delay: 2500,
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
        //player 1 run right
        this.anims.create({
            key: 'tenti_run_right',
            frames: this.anims.generateFrameNames('tenti_atlas', {
                prefix: 'tenti_run_right_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 13,
            repeat: -1,
        });
        //player 1 run left
        this.anims.create({
            key: 'tenti_run_left',
            frames: this.anims.generateFrameNames('tenti_atlas', {
                prefix: 'tenti_run_left_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 13,
            repeat: -1
        });
        //player 1 climb left
        this.anims.create({
            key: 'tenti_climb_left',
            frames: this.anims.generateFrameNames('tenti_atlas', {
                prefix: 'tenti_climb_left_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 13,
            repeat: -1
        });
        //player 1 climb right
        this.anims.create({
            key: 'tenti_climb_right',
            frames: this.anims.generateFrameNames('tenti_atlas', {
                prefix: 'tenti_climb_right_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 13,
            repeat: -1
        });
        //player 1 squish right
        this.anims.create({
            key: 'tenti_squish_right',
            frames: this.anims.generateFrameNames('tenti_atlas', {
                prefix: 'tenti_squish_right_',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: 0,
        });
        //player 1 squish left
        this.anims.create({
            key: 'tenti_squish_left',
            frames: this.anims.generateFrameNames('tenti_atlas', {
                prefix: 'tenti_squish_left_',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: 0,
        });
    }

    update(){
        this.setVelocityX(0);

        if(!keyA.isDown && !keyD.isDown && this.anims.isPlaying) {
            if(this.anims.currentAnim.key === 'tenti_run_left' || this.anims.currentAnim.key === 'tenti_climb_left') {
                this.anims.play('tenti_idle_left', true);
            }
            else if (this.anims.currentAnim.key === 'tenti_run_right' || this.anims.currentAnim.key === 'tenti_climb_right') {
                this.anims.play('tenti_idle_right', true);
            }
        }
        else if (!keyA.isDown && !keyD.isDown && !this.anims.isPlaying) {
            this.anims.play('tenti_idle_right', true);
        }

        if(keyA.isDown){
            this.setVelocityX(-speed);
            if (!this.isClimbing) {
                this.anims.play('tenti_run_left', true);
            }
        }
        else if(keyD.isDown){
            this.setVelocityX(speed);
            if (!this.isClimbing) {
                this.anims.play('tenti_run_right', true);
            }
        }

        if(keyW.isDown && this.body.blocked.right){
            if(this.climbTime > 0 ){
                this.allowGravity = false;
                this.setVelocityY(-100);
                //this.isClimbing = true;
                //this.anims.play('tenti_climb_right', true);
            }
        }
        else{
            this.body.allowGravity = true;
            //this.isClimbing = false;
        }

        if(keyW.isDown && this.body.blocked.left){
            if(this.climbTime > 0 ){
                this.allowGravity = false;
                this.setVelocityY(-100);
                this.isClimbing = true;
                //this.anims.play('tenti_climb_left', true);
            }
        }
        else{
            this.body.allowGravity = true;
            //this.isClimbing = false;
        }

        if(this.body.touching.down){
            this.climbTimer.paused = true;
            this.climbTime = time;
        }
        else{
            this.climbTimer.paused = false;
        }

        //tenti squish
        if (keyS.isDown) {
            if (this.anims.currentAnim.key === 'tenti_idle_right' || this.anims.currentAnim.key === 'tenti_run_right') {
                this.anims.play('tenti_squish_right');
            }
            else if (keyS.isDown && this.anims.currentAnim.key === 'tenti_idle_left' || this.anims.currentAnim.key === 'tenti_run_left') {
                this.anims.play('tenti_squish_left');
            }
        }
        
    }
    
}
