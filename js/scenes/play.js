class Play extends Phaser.Scene{
    constructor() {
        super({ key: 'Play', active: false });
    }

    init(){
        this.URL = this.sys.game.URL;
        this.CONFIG = this.sys.game.CONFIG;
        this.OPTIONS = this.sys.game.OPTIONS;

        //Initialize different depths of the game's elements
        // this.DEPTH = {
        //
        // };

        this.isGameOver = false;
        this.playerJumps = 0;
    }

    create(){
        //Group with all active platforms
        this.platformGroup = this.add.group({
            //Once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });

        //Pool
        // Object pooling is a technique which stores a collection of a particular object that an application
        // will create and keep on hand for those situations where creating each instance is expensive
        this.platformPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });

        //Adding the platform
        this.addPlatform(this.game.config.width, this.game.config.width / 2);

        //Adding the player
        this.player = this.physics.add.sprite(this.OPTIONS.playerStartPosition, this.game.config.height / 2, 'player');
        this.player.setGravityY(this.OPTIONS.playerGravity);

        //Adding the meteor
        this.meteor = this.physics.add.sprite(this.OPTIONS.meteorPosition, 200, 'meteor');
        this.meteor.depth = 5;

        //Collision between the player and the platform/meteor
        this.physics.add.collider(this.player, this.platformGroup);
        this.physics.add.overlap(this.player, this.meteor, function(player, meteor){
            this.isGameOver = true;
        });

        //When the up key is down, the player jumps
        this.input.keyboard.on('keyup', this.jump, this);
        // this.input.on("pointerdown", this.jump, this);
    }

    addPlatform(platformWidth, posX){
        let platform;
        if(this.platformPool.getLength()){
            console.log(this.game.config);
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
        this.nextPlatformDistance = Phaser.Math.Between(this.OPTIONS.spawnRange[0], this.OPTIONS.spawnRange[1]);
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

    update(){
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

        this.player.x = this.OPTIONS.playerStartPosition;

        let minDistance = this.game.config.width;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = this.game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);

        if(minDistance > this.nextPlatformDistance){
            let nextPlatformWidth = Phaser.Math.Between(this.OPTIONS.platformSizeRange[0], this.OPTIONS.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, this.game.config.width + nextPlatformWidth / 2);
            console.log(minDistance);
        }

    }
}