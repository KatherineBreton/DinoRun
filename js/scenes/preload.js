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
        this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 })
    }

    create(){
        //When everything is done, redirect to menu
        // this.scene.start('Menu');
    }

    createLoadingBar(){
    //    Title
        let console = new Text();
        console.log(console);
        this.title = new Text(
            this,
            this.CONFIG.centerX,
            75,
            'Loading Game',
            'preload',
            0.5
        );
    //    Progress Text
        this.txt_progress = new Text(
            this,
            this.CONFIG.centerX,
            this.CONFIG.centerY - 5,
            'Loading...',
            'preload',
            { x: 0.5, y: 1 }
        );
    //    Bar
        this.load.on('progress', this.onProgress, this);
    }

    onProgress(value){
        this.txt_progress.setText(Math.round(value * 100) + '%');
        console.log(this.txt_progress.text);
    }
}