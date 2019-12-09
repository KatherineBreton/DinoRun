const App = function(){
    this.VERSION = '0.0.1';
};

App.prototype.start = function(){
    //Scenes
    let scenes = [];
    scenes.push(Boot);
    scenes.push(Preload);
    scenes.push(Menu);
    scenes.push(Play);

    //game config
    const CONFIG = {
        type: Phaser.AUTO,
        parent: 'phaser-app',
        title: 'Dino Run',
        width: 1200,
        height: 768,
        scene: scenes,
        pixelArt: true,
        backgroundColor: '0x33ccff',
        physics:{
            default : 'arcade'
        }
    };

    //Create game app
    let game = new Phaser.Game(CONFIG);

    //Global configuration accessible in the whole game
    game.URL = '';
    game.CONFIG = {
        width: CONFIG.width,
        height: CONFIG.height,
        centerX : Math.round(0.5 * CONFIG.width),
        centerY : Math.round(0.5 * CONFIG.height),
        // tile (size in pixel of every individual tiles
    };
    game.OPTIONS = {
        platformStartSpeed : 250,
        spawnRange : [ 100, 200 ], /* initially 100, 250 */
        platformSizeRange: [ 500, 750 ], /* initially 50, 250 */
        playerGravity : 900,
        jumpForce : 400,
        playerStartPosition: 200,
        meteorPosition: - 40,
        jump: 1
    };

    //Sound
    game.sound_on = true;
};