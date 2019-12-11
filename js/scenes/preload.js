class Preload extends Phaser.Scene{
    constructor() {
        super({ key: 'Preload', active: false });
    }

    init(){
        this.URL = this.sys.game.URL;
        this.CONFIG = this.sys.game.CONFIG;
    }

    preload(){
    //    Loading Bar
        this.createLoadingBar();
    //    Load SpriteSheets
        //path
        this.load.setPath(this.URL + 'assets/img');
        //files
        this.load.image('juraLogo', 'jura.png');
        this.load.spritesheet('player', 'dino.png', { frameWidth: 80, frameHeight: 60});
        this.load.image('platform', 'platform.png');
        this.load.spritesheet('meteor', 'meteors.png', { frameWidth: 230, frameHeight: 230 });
        this.load.image('obstacle', 'obstacle1.png');
        this.load.image('gameOver', 'Game_Over.png');
        this.load.image('life1', 'life.png');
        this.load.image('life2', 'life1.png');
        this.load.image('life3', 'life2.png');
        this.load.image('emptyLife', 'life3.png');
        this.load.image('meat', 'meat.png');
        this.load.image('background', 'background.jpg');

        this.load.setPath(this.URL + 'assets/audio');
        this.load.audio('gameMusic', 'gameMusic.mp3');
        this.load.audio('gameOverMusic', 'gameOverMusic.mp3');
    }

    create(){
        this.animate();
        //When everything is done loading, redirect to menu
        this.time.addEvent({
            delay: 1000,
            callback: () => { this.scene.start('Menu'); },
            callbackScope: this
        });
    }

    createLoadingBar(){
        //    Title
        this.title = new Text(
            this,
            this.CONFIG.centerX,
            75,
            'Chargement du jeu',
            'title',
            0.5
        );

        //    Progress Text
        this.txt_progress = new Text(
            this,
            this.CONFIG.centerX -5,
            this.CONFIG.centerY,
            'Chargement...',
            'preload',
            { x: 0.5, y: 1 }
        );

    //    Progress Bar
        let x = 80;
        let y = this.CONFIG.centerY + 25;

        this.progress = this.add.graphics({ x: x, y: y });
        this.border = this.add.graphics({ x: x, y: y });

        //progress callback
        this.load.on('progress', this.onProgress, this);
    }

    onProgress(value){
        //width of the progress bar
        let w = this.CONFIG.width - 2 * this.progress.x;
        let h = 18;

        //Progress bar style
        this.progress.clear();
        this.progress.fillStyle('0xFFFFFF', 1);
        this.progress.fillRect(0, 0, w * value, h);

        //Border of the progress bar
        this.border.clear();
        this.border.lineStyle(2, '0x4D6592', 1);
        this.border.strokeRect(0, 0, w * value, h);

        this.txt_progress.setText(Math.round(value * 100) + '%');
    }

    animate(){
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'burn',
            frames: this.anims.generateFrameNumbers('meteor', { start: 0, end: 4 }),
            frameRate: 12,
            repeat: -1
        });


    }
}