class Menu extends Phaser.Scene{
    constructor() {
        super({ key: 'Menu', active: false });
    }

    init(){
        this.URL = this.sys.game.URL;
        this.CONFIG = this.sys.game.CONFIG;
    }

    preload(){

    }

    create(){
        this.text = this.add.text(this.CONFIG.centerX, this.CONFIG.centerY, 'Menu');
        this.text.setOrigin(0.5);
        this.text.setColor('#000000');
    }
}