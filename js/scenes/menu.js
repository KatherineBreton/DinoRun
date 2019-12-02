class Menu extends Phaser.Scene{
    constructor() {
        super({ key: 'Menu', active: false });
    }

    init(){
        this.CONFIG = this.sys.game.CONFIG;
    }

    preload(){

    }

    create(){
        console.log("Menu");
        this.text = this.add.text(this.CONFIG.centerX, this.CONFIG.centerY, 'Menu');
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');
    }
}