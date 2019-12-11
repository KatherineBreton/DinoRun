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
    scenes.push(GameOver);

    //game config
    const CONFIG = {
        type: Phaser.AUTO,
        parent: 'phaser-app',
        title: 'JuraPixel',
        width: 640,
        height: 360,
        scene: scenes,
        pixelArt: true,
        backgroundColor: '0x000000', /*'0x33ccff'*/
        physics:{
            default : 'arcade',
            // arcade: {debug:true}
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
        scoreArray : [],
        lives : 3,
        platformStartSpeed : 250,
        backgroundSpeed : 150,
        spawnRange : 0, /* initially 100, 250 */
        platformSizeRange:500, /* initially 50, 250 */
        playerGravity : 900,
        jumpForce : 400,
        playerStartPosition: 200,
        meteorPosition: - 40,
        jumps: 2,
        platformPools: [
            {
                name: 'pool1',
                platforms: [
                    { posX: 0, posY: 0 },
                    { posX: 180, posY: -30 },
                    { posX: 450, posY: -30, },
                    { posX: 570, posY: 0, },
                    { posX: 660, posY: 40, },
                    { posX: 810, posY: 0, },
                    { posX: 930, posY: 0, }
                ]
            },
            {
                name: 'pool2',
                platforms: [
                    { posX: 0, posY: 0, },
                    { posX: 150, posY: 30, },
                    { posX: 270, posY: 30, },
                    { posX: 440, posY: 0, },
                    { posX: 620, posY: -30, },
                    { posX: 690, posY: -30, },
                    { posX: 970, posY: 0, },
                    { posX: 1000, posY: 0, },
                    { posX: 1300, posY: 0, }
                ]
            },
            {
                name: 'pool3',
                platforms: [
                    { posX: 0, posY: 0, },
                    { posX: 180, posY: -40, },
                    { posX: 260, posY: -40, },
                    { posX: 520, posY: 0, },
                    { posX: 690, posY: -40, },
                    { posX: 900, posY: 0, },
                    { posX: 1200, posY: 0, }
                ]
            },
            {
                name: 'pool4',
                platforms: [
                    { posX: 0, posY: 0, },
                    { posX: 150, posY: 30, },
                    { posX: 270, posY: 30, },
                    { posX: 510, posY: 0, },
                    { posX: 660, posY: -30, },
                    { posX: 810, posY: 0, },
                    { posX: 1030, posY: 0, },
                    { posX: 1060, posY: 0, }
                ]
            },
            {
                name: 'pool5',
                platforms: [
                    { posX: 0, posY: 0, },
                    { posX: 150, posY: -75, },
                    { posX: 270, posY: -75, },
                    { posX: 510, posY: -100, },
                    { posX: 710, posY: -120, },
                    { posX: 780, posY: -120, },
                    { posX: 900, posY: -50, },
                    { posX: 930, posY: -50, },
                    { posX: 1030, posY: 0, },
                    { posX: 1060, posY: 0, }
                ]
            },
            {
                name: 'pool6',
                platforms: [
                    { posX: 0, posY: 0, },
                    { posX: 250, posY: -55, },
                    { posX: 280, posY: -55, },
                    { posX: 510, posY: -100, },
                    { posX: 600, posY: -100, },
                    { posX: 780, posY: -140, },
                    { posX: 900, posY: -140, },
                    { posX: 930, posY: -140, },
                    { posX: 1130, posY: 0, },
                    { posX: 1200, posY: 0, }
                ]
            },
            {
                name: 'pool7',
                platforms: [
                    { posX: 0, posY: 0, },
                    { posX: 90, posY: 0, },
                    { posX: 270, posY: -50, },
                    { posX: 510, posY: -100, },
                    { posX: 710, posY: -100, },
                    { posX: 780, posY: -100, },
                    { posX: 900, posY: -30, },
                    { posX: 930, posY: -30, },
                    { posX: 1160, posY: -50, },
                    { posX: 1300, posY: 0, },
                    { posX: 1360, posY: 0, }
                ]
            }
        ]
    };

    //Sound
    game.sound_on = true;
};
