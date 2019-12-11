class Play extends Phaser.Scene{
    constructor() {
        super({ key: 'Play', active: false });
    }

    init(){
        this.URL = this.sys.game.URL;
        this.CONFIG = this.sys.game.CONFIG;
        this.OPTIONS = this.sys.game.OPTIONS;
        this.isGameOver = false;
        this.playerJumps = 0;
        this.startTime = new Date();
        this.playerPosition = this.OPTIONS.playerStartPosition;
        this.platformSpeed = this.OPTIONS.platformStartSpeed;
        this.lives = this.OPTIONS.lives;
    }

    create() {
        this.background = this.add.image(320, 180, 'background');
        console.log(this.CONFIG.centerX + this.OPTIONS.centerY);
        this.livesBar = this.add.image(140, 40, 'life1');
        this.livesBar.setDepth(4);
        this.livesBar2 = this.add.image(140, 40, 'life2');
        this.livesBar2.setDepth(3);
        this.livesBar3 = this.add.image(140, 40, 'life3');
        this.livesBar3.setDepth(2);
        this.livesBar4 = this.add.image(140, 40, 'emptyLife');
        this.livesBar4.setDepth(1);

        this.music = this.sound.add('gameMusic', true);
        this.music.play();

        this.score = new Text(
            this,
            this.CONFIG.centerX + 180,
            30,
            'Score : ',
            'title'
        );

       this.debugText =  this.add.text(this.CONFIG.centerX - 280, 320, 'debug:',{
            fontSize: '20px', fill: 'black'
        });

        //Group with all active platforms
        this.platformGroup = this.add.group({
        });

        //Pool
        // Object pooling is a technique which stores a collection of a particular object that an application
        // will create and keep on hand for those situations where creating each instance is expensive
        this.platformPool = this.add.group({
        });

        this.obstacleGroup = this.add.group({
            removeCallback: function (obstacle) {
                obstacle.scene.obstaclePool.add(obstacle);
            }
        });

        this.obstaclePool = this.add.group({
            /*removeCallback: function (obstacle) {
                obstacle.scene.obstacleGroup.add(obstacle);
            }*/
        });

        this.meatGroup = this.add.group({
            removeCallback: function (meat) {
                meat.scene.obstaclePool.add(meat);
            }
        });

        this.meatPool = this.add.group({
        });

        this.addedPlatforms = 0;

        //Adding the platform
        this.addPlatform(this.game.config.width, this.game.config.width / 2);

        //Adding the player
        this.player = this.physics.add.sprite(this.OPTIONS.playerStartPosition, this.game.config.height / 2, 'player');
        this.player.setGravityY(this.OPTIONS.playerGravity);

        //Adding the meteor
        this.meteor = this.physics.add.sprite(this.OPTIONS.meteorPosition, 200, 'meteor');
        this.meteor.depth = 5;

        //Collision between the player and the platform/meteor/obstacle
        this.physics.add.collider(this.player, this.platformGroup, ()=> {
            if(!this.player.anims.isPlaying){
                this.player.anims.play('walk', true);
            }
        }, null, this);
        this.physics.add.overlap(this.player, this.meteor, function (player, meteor) {
            this.isGameOver = true;
            this.scene.pause();
        }, null, this);

        //Click with the mouse or use the keyboard to make the player jump
        this.input.keyboard.on('keyup', this.jump, this);
        this.input.on("pointerdown", this.jump, this);

        // this.time.addEvent({
        //     delay: 3000,
        //     loop: true,
        //     callback: this.increaseSpeed()
        // });
    }

    // increaseSpeed(){
        // this.platformSpeed = this.platformSpeed * 2;
    // }

    addPlatform(platformWidth, posX){
        this.addedPlatforms++;
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        }else{
            if(this.addedPlatforms != 1) {

                let randomIndex = Math.floor((Math.random() * this.OPTIONS.platformPools.length) );

                let platformPool = this.OPTIONS.platformPools[randomIndex];
                // this.debugText.setText("Pool : " + platformPool.name);

                for(let i = 0; i < platformPool.platforms.length; i++) {
                    let p = platformPool.platforms[i];
                    platform = this.physics.add.sprite(posX + p.posX, (this.game.config.height * 0.8) + p.posY, 'platform');
                    platform.setImmovable(true);
                    platform.setVelocityX(this.platformSpeed * -1);
                    this.platformGroup.add(platform);
                }
                this.handleObstacle(platformWidth, posX);
                this.handleMeat(platformWidth, posX);
            }else {
                platform = this.physics.add.sprite(posX, this.game.config.height * 0.8, 'platform');
                platform.setImmovable(true);
                platform.setVelocityX(this.platformSpeed * -1);
                platform.displayWidth = platformWidth;
                this.platformGroup.add(platform);
            }
        }
        this.nextPlatformDistance = this.OPTIONS.spawnRange;
    }

    handleObstacle(platformWidth, posX) {
        let obstacle;
        if(this.obstaclePool.getLength()){
            obstacle = this.obstaclePool.getFirst();
            obstacle.x = posX;
            obstacle.active = true;
            obstacle.visible = true;
            this.obstaclePool.remove(obstacle);
        }else{
            obstacle = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), 0, 'obstacle');
            obstacle.setGravityY(400);

            for(let i = 0; i < this.platformGroup.getChildren().length; i++) {
                let p =  this.platformGroup.getChildren()[i];
                this.physics.add.collider(obstacle, p);
            }
            this.physics.add.overlap(this.player, obstacle, () => {
                this.obstacleCollide();
                this.obstaclePool.remove(obstacle);
                obstacle.destroy();
            }, null, this);
            this.obstacleGroup.add(obstacle);
        }
    }

    handleMeat(platformWidth, posX){
        let meat;
        if(this.meatPool.getLength()){
            meat = this.meatPool.getFirst();
            meat.x = posX;
            meat.active = true;
            meat.visible = true;
            this.meatPool.remove(meat);
        }else{
            meat = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), 0, 'meat');
            meat.setGravityY(400);

            for(let i = 0; i < this.platformGroup.getChildren().length; i++) {
                let p =  this.platformGroup.getChildren()[i];
                this.physics.add.collider(meat, p);
            }
            this.physics.add.overlap(this.player, meat, () => {
                this.meatCollide();
                this.meatPool.remove(meat);
                meat.destroy();
            }, null, this);
            this.meatGroup.add(meat);
        }
    }

    //When the player touches an obstacle
    obstacleCollide(){
        if(this.lives === 3){
            this.livesBar.destroy();
            this.lives--;
        }else if (this.lives === 2){
            this.livesBar2.destroy();
            this.lives--;
        }else{
            this.livesBar3.destroy();
            this.lives--;
        }
    }

    //When the player gets a piece of meat
    meatCollide(){
        if(this.lives < 3){
            if(this.lives === 2){
                this.livesBar = this.add.image(140, 40, 'life1');
                this.livesBar.setDepth(4);
                this.lives++;
            }else if (this.lives === 1){
                this.livesBar2 = this.add.image(140, 40, 'life2');
                this.livesBar2.setDepth(3);
                this.lives++;
            }
        }
    }

    jump(){
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.OPTIONS.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(this.OPTIONS.jumpForce * -1);
            this.playerJumps ++;
        }
        this.player.anims.play('jump', true);
    }

    getScore(score){
        this.score.destroy();
        this.score = new Text(
            this,
            this.CONFIG.centerX + 180,
            30,
            'Score : ' + score,
            'title'
        );
    }

    //Get the time in seconds for the score
    getTime(){
        this.currentTime = new Date();
        let timeDifference = this.currentTime.getTime() - this.startTime.getTime();
        let time = Math.abs(timeDifference / 1000);
        if(time < 10){
            return time.toString().substr(0, 1);
        }else if(time > 10 && time < 100){
            return time.toString().substr(0, 2);
        }else{
            return time.toString().substr(0, 3)
        }
    }

    update(){
        // this.player.anims.play('walk', true);
        this.meteor.anims.play('burn', true);

        // this.debugText.setText("Lives : " + this.lives);
        this.getScore(this.getTime());

        if((this.player.y > this.game.config.height) || (this.lives === 0)){
            if(this.lives === 3){
                this.livesBar.destroy();
                this.livesBar2.destroy();
                this.livesBar3.destroy();
            }else if (this.lives === 2){
                this.livesBar2.destroy();
                this.livesBar3.destroy();
            }else{
                this.livesBar3.destroy();
            }
            this.isGameOver = true;
            // this.input.on('pointerdown', () => this.scene.restart());
        }

        //GameOver message
        if(this.isGameOver){
            this.physics.pause();
            this.player.anims.stop();
            this.meteor.anims.stop();
            this.music.pause();
            this.time.addEvent({
                delay: 800,
                callback: () => { this.scene.start('GameOver'); },
                callbackScope: this
            });
            // this.gameOverMessage = new Text(
            //     this,
            //     this.CONFIG.centerX,
            //     this.CONFIG.centerY,
            //     'Game Over',
            //     'title'
            // );
        }

        this.player.x = this.playerPosition;

        //Recycling platforms
        let minDistance = this.game.config.width;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = this.game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);

        //Adding new platforms
        if(minDistance > this.nextPlatformDistance){
            let nextPlatformWidth = this.OPTIONS.platformSizeRange;
            this.addPlatform(nextPlatformWidth, this.game.config.width + nextPlatformWidth / 2);
        }

       // Recycling obstacles
       //  this.obstacleGroup.getChildren().forEach(function(obstacle){
       //      if(obstacle < - obstacle / 2){
       //          this.obstacleGroup.killAndHide(obstacle);
       //          this.obstacleGroup.remove(obstacle);
       //      }
       //  }, this);
    }
}