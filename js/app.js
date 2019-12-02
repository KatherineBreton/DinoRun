const App = function(){
    this.VERSION = '0.0.1';
};

App.prototype.start = function(){
    //Scenes
    let scenes = [];
    scenes.push(Boot);
    scenes.push(Preload);
    scenes.push(Menu);

    //game config
    const CONFIG = {
        type: Phaser.AUTO,
        parent: 'phaser-app',
        title: 'Dino Run',
        width: 640,
        height: 360,
        scene: scenes,
        pixelArt: true,
        backgroundColor: '#33ccff'
    };

    //Create game app
    let game = new Phaser.Game(CONFIG);

    //Global configuration accessible in the whole game
    game.CONFIG = {
        width: CONFIG.width,
        height: CONFIG.height,
        centerX : Math.round(0.5 * CONFIG.width),
        centerY : Math.round(0.5 * CONFIG.height)
        // tile (size in pixel of every individual tiles
    };

    //Sound
    game.sound_on = true;
};