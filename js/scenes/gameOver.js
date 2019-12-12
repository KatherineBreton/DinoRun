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
        console.log(this.OPTIONS.scoreArray);
        this.gameOver = this.add.image(this.CONFIG.centerX, 100, 'gameOver');
        this.gameOverMusic = this.sound.add('gameOverMusic');
        this.gameOverMusic.play();
        this.input.on('pointerdown', () => {
            this.scene.start('Play');
            this.gameOverMusic.pause();
        }, this);
        this.replayText = new Text(
            this,
            this.CONFIG.centerX,
            280,
            'Cliquez pour rejouer',
            'title'
        );
        this.score = new Text(
            this,
            this.CONFIG.centerX,
            200,
            'Votre score est de :  ' + this.OPTIONS.scoreArray[this.OPTIONS.scoreArray.length - 1],
            'title'
        );
    }

    update(){

    }
}