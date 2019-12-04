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
        this.load.image('player', 'player.png');
        this.load.image('platform', 'platform.png');
    }

    create(){
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
        // let txt_progress = this.add.bitmapText(this.CONFIG.centerX - 5, this.CONFIG.centerY, 'clickPixel', 'Loading...', 26, 0.5);
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
        console.log(this.txt_progress.text);
    }
}