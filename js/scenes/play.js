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
        this.platformPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });

        this.playerJumps = 0;
        this.addPlatform(this.CONFIG.width, this.CONFIG.width / 2);
        this.player = this.physics.add.sprite(this.OPTIONS.playerStartPosition, this.CONFIG.height / 2, 'player');
        this.player.setGravityY(this.OPTIONS.playerGravity);

        this.physics.add.collider(this.player, this.platformGroup);

    }

    addPlatform(platformWidth, posX){
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        }else{
            platform = this.physics.add.sprite(posX, this.CONFIG.height * 0.8, 'platform');
            platform.setImmovable(true);
            platform.setVelocityX(this.OPTIONS.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(this.OPTIONS.spawnRange[0], this.OPTIONS.spawnRange[1]);
    }

    update(){

    }
}