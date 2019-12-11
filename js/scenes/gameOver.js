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
        this.gameOver = this.add.image(this.CONFIG.centerX, this.CONFIG.centerY, 'gameOver');
        this.input.on('pointerdown', () => this.scene.start('Play'));
        this.replayText = new Text(
            this,
            this.CONFIG.centerX,
            280,
            'Cliquez pour rejouer',
            'title'
        );
    }

    update(){

    }
}