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


        //player 2 idle right
        this.anims.create({
            key: 'crab_idle_right',
            frames: this.anims.generateFrameNames('crab_atlas', {
                prefix: 'crab_jump_right_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 2,
            repeat: -1
        })
        //player 2 idle left
        this.anims.create({
            key: 'crab_idle_left',
            frames: this.anims.generateFrameNames('crab_atlas', {
                prefix: 'crab_jump_left_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 2,
            repeat: -1
        })
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
        // player 2 jump left
        this.anims.create({
            key: 'crab_jump_left',
            frames: this.anims.generateFrameNames('crab_atlas', {
                prefix: 'crab_jump_left_',
                start: 2,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 2,
            repeat: 0
        });
        // player 2 jump right
        this.anims.create({
            key: 'crab_jump_right',
            frames: this.anims.generateFrameNames('crab_atlas', {
                prefix: 'crab_jump_right_',
                start: 2,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 2,
            repeat: 0
        });
        // player 2 push left
        this.anims.create({
            key: 'crab_push_left',
            frames: this.anims.generateFrameNames('crab_atlas', {
                prefix: 'crab_push_left_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 0
        });
        // player 2 push right
        this.anims.create({
            key: 'crab_push_right',
            frames: this.anims.generateFrameNames('crab_atlas', {
                prefix: 'crab_push_right_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 0
        });

        this.setSize(50,50);
    }

    update(){
        this.setVelocityX(0);
        if (!this.anims.isPlaying) {
            this.anims.play('crab_idle_right', true);
        }

        if(!keyLEFT.isDown && !keyRIGHT.isDown && this.anims.isPlaying) {
            if(this.anims.currentAnim.key === 'crab_run_left') {
                this.anims.play('crab_idle_left', true);
            }
            else if (this.anims.currentAnim.key === 'crab_run_right') {
                this.anims.play('crab_idle_right', true);
            }
        }
        else if (keyLEFT.isUp && keyRIGHT.isUp && this.body.touching.down) {
            this.anims.play('crab_idle_right', true);
        }

        if(keyLEFT.isDown){
            this.setVelocityX(-speed);
            if (this.body.touching.down) {
                this.anims.play('crab_run_left', true);
            }
        }
        else if(keyRIGHT.isDown){
            this.setVelocityX(speed);
            if (this.body.touching.down) {
                this.anims.play('crab_run_right', true);
            }
        }

        if(keyUP.isDown){
            if(!this.jump){
                if(this.jumpCount > 0){
                    this.setVelocityY(-300);
                    this.jump = true;
                    --this.jumpCount;
                    if (keyRIGHT.isDown) {
                        this.anims.play('crab_jump_right', true);
                    }
                    else if (keyLEFT.isDown) {
                        this.anims.play('crab_jump_left', true);
                    }
                    else {
                        if (this.anims.currentAnim.key === 'crab_idle_right') {
                            this.anims.play('crab_jump_right', true);
                        }
                        else if (this.anims.currentAnim.key === 'crab_idle_left') {
                            this.anims.play('crab_jump_left', true);
                        }
                    }
                }
            }
        }

        if(keyDOWN.isDown){
            if(this.anims.currentAnim.key === 'crab_run_left' || this.anims.currentAnim.key === 'crab_idle_left') {
                this.anims.play('crab_push_left', true);
            }
            else if (this.anims.currentAnim.key === 'crab_run_right' || this.anims.currentAnim.key === 'crab_idle_right') {
                this.anims.play('crab_puy_right', true);
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
