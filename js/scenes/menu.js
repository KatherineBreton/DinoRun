class Menu extends Phaser.Scene{
    constructor() {
        super({ key: 'Menu', active: false });
    }

    init(){
        this.URL = this.sys.game.URL;
        this.CONFIG = this.sys.game.CONFIG;
    }

    create(){
        //Game Title Dino Run
        this.logo = this.add.image(this.CONFIG.centerX, this.CONFIG.centerY, 'juraLogo');
        // this.title = new Text(
        //     this,
        //     this.CONFIG.centerX,
        //     310,
        //     'Cliquez pour faire sauter le dino',
        //     'title',
        // );

        // //Click to play
        // this.text = new Text(
        //     this,
        //     this.CONFIG.centerX,
        //     300,
        //     'Cliquez pour jouer',
        //     'standard'
        // );

        this.createMouseInput();
        this.createKeyboardInput();
    }

    createMouseInput(){
        this.input.on('pointerup', this.goPlay, this);
    }

    createKeyboardInput(){
        function handleKeyUp(e){
            switch (e.code){
                case 'Enter':
                    this.goPlay();
                    break;
            }
        }
        this.input.keyboard.on('keyup', handleKeyUp, this);
    }

    goPlay(){
        this.scene.start('Play');
    }
}