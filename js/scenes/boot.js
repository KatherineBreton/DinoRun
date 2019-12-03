//Start the whole scene
class Boot extends Phaser.Scene{
    constructor() {
        super({ key: 'Boot', active: true });
    }

    init(){
        this.URL = this.sys.game.URL;
    }

    preload(){
        this.load.setPath(this.URL + 'assets/font');
        this.load.bitmapFont('clickPixel', 'click.png', 'click.ttf');
    }

    create(){
        this.scene.start('Preload');
    }
}