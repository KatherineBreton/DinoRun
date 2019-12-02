const App = function(){

};

App.prototype.start = function(){
    //Game Config
    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-app',
        title: 'Dino Run',
        width: 640,
        height: 360,
        scene: 'scenes',
        pixelArt: true
    };

    //Scenes
    let scenes = [];
    scenes.push(Boot);
    scenes.push(Preload);
    scenes.push(Menu);

    //Create game app
    let game = new Phaser.Game(config);
}