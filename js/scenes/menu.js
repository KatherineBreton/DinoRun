class Menu extends Phaser.Scene{
    constructor() {
        super({ key: 'Menu', active: false });
    }

    init(){

    }

    preload(){

    }

    create(){
        this.text = this.add.text(0, 0, 'Menu');
    }
}