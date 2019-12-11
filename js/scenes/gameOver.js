class GameOver extends Phaser.Scene{
    constructor() {
        super({ key: 'GameOver', active: false });
    }

    init(){
        this.URL = this.sys.game.URL;
        this.CONFIG = this.sys.game.CONFIG;
        this.OPTIONS = this.sys.game.OPTIONS;
    }

    create(){
        this.gameOver = this.add.image(this.CONFIG.centerX, 140, 'gameOver');
        this.gameOverMusic = this.sound.add('gameOverMusic');
        this.gameOverMusic.play();
        this.input.on('pointerdown', () => this.scene.start('Play'));
        this.replayText = new Text(
            this,
            this.CONFIG.centerX,
            250,
            'Cliquez pour rejouer',
            'title'
        );
    }

    update(){

    }
}