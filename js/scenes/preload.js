class Preload extends Phaser.Scene{
    constructor() {
        super({ key: 'Preload', active: false });
    }

    init(){
        this.CONFIG = this.sys.game.CONFIG;
    }

    preload(){
    //    Loading Bar
        this.createLoadingBar();
    //    Load SpriteSheets

    }

    create(){
        //When everything is done, redirect to menu
        this.scene.start('Menu');
    }

    createLoadingBar(){
    //    Title
    //    Progress Text
    //    Bar
    }
}