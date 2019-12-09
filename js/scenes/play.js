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
    }

    create() {
        //Group with all active platforms
        this.platformGroup = this.add.group({
            //Once a platform is removed, it's added to the pool
            removeCallback: function (platform) {
                platform.scene.platformPool.add(platform)
            }
        });

        //Pool
        // Object pooling is a technique which stores a collection of a particular object that an application
        // will create and keep on hand for those situations where creating each instance is expensive
        this.platformPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function (platform) {
                platform.scene.platformGroup.add(platform)
            }
        });

        this.obstacleGroup = this.add.group({
            removeCallback: function (obstacle) {
                obstacle.scene.obstaclePool.add(obstacle);
            }
        });

        this.obstaclePool = this.add.group({
            removeCallback: function (obstacle) {
                obstacle.scene.obstacleGroup.add(obstacle);
            }
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
        this.physics.add.collider(this.player, this.platformGroup);
        this.physics.add.overlap(this.player, this.meteor, function (player, meteor) {
            this.isGameOver = true;
            this.scene.pause();
        }, null, this);

        this.input.keyboard.on('keyup', this.jump, this);
        this.input.on("pointerdown", this.jump, this);
    }

    increaseSpeed(){
        this.platformSpeed = this.platformSpeed + 5 / 100;
    }

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
            platform = this.physics.add.sprite(posX, this.game.config.height * 0.8, 'platform');
            platform.setImmovable(true);
            platform.setVelocityX(this.OPTIONS.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = this.OPTIONS.spawnRange;
        let obstacle;
        if(this.addedPlatforms > 1){
            if(this.obstaclePool.getLength()){
                obstacle = this.obstaclePool.getFirst();
                obstacle.x = posX;
                obstacle.active = true;
                obstacle.visible = true;
                this.obstaclePool.remove(obstacle);
            }else{
                obstacle = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), this.game.config.height * 0.30, 'obstacle');
                obstacle.setGravityY(400);
                this.physics.add.collider(obstacle, platform);
                this.physics.add.collider(this.player, obstacle, () => {
                    this.obstacleCollide();
                }, null, this);
                this.obstacleGroup.add(obstacle);
            }
        }
        // console.log(this.obstaclePool);
        // console.log(this.obstacleGroup);
    }

    //When the player touches an obstacle
    obstacleCollide(){
        this.playerPosition = this.playerPosition - 3;
    }

    //When the player gets a piece of meat
    meatCollide(){
        this.playerPosition = this.playerPosition + 3;
    }

    jump(){
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.OPTIONS.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(this.OPTIONS.jumpForce * -1);
            this.playerJumps ++;
        }
    }

    getScore(score){
        new Text(
            this,
            this.CONFIG.centerX + 180,
            30,
            'Score : ' + score,
            'title'
        );
    }

    getTime(){
        this.currentTime = new Date();
        let timeDifference = this.currentTime.getTime() - this.startTime.getTime();
        let time = Math.abs(timeDifference / 1000);
        return time;
    }

    update(){
        // this.getScore(this.getTime().toString().substr(0, 1));
        this.getScore(this.getTime().toString().substr(0, 1));

        if(this.player.y > this.game.config.height){
            this.isGameOver = true;
            this.scene.pause();
        }

        //GameOver message
        if(this.isGameOver){
            this.gameOverMessage = new Text(
                this,
                this.CONFIG.centerX,
                this.CONFIG.centerY,
                'Game Over',
                'title'
            );
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
        this.obstacleGroup.getChildren().forEach(function(obstacle){
            if(obstacle < - obstacle / 2){
                this.obstacleGroup.killAndHide(obstacle);
                this.obstacleGroup.remove(obstacle);
            }
        }, this);
    }
}