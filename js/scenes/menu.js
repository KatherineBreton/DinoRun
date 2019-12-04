class Menu extends Phaser.Scene{
    constructor() {
        super({ key: 'Menu', active: false });
    }

    init(){
        this.URL = this.sys.game.URL;
        this.CONFIG = this.sys.game.CONFIG;
    }

    create(){
        console.log(this.CONFIG);
        //Game Title Dino Run
        this.title = new Text(
            this,
            this.CONFIG.centerX,
            75,
            'Dino Run',
            'title',
        );

        //Click to play
        this.text = new Text(
            this,
            this.CONFIG.centerX,
            this.CONFIG.centerY,
            'Cliquez pour jouer',
            'standard'
        );

        this.createMouseInput();
        this.createKeyboardInput();

        // let bitmap = this.add.bitmapText(250, 200, 'clickPixel', 'Dino Run', 38).setOrigin(0.5).setCenterAlign();
        // bitmap.setText([
        //     'Test bitmap'
        // ]);
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