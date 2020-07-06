var config = {
type: Phaser.AUTO,
width: 950,
height: 800,
scene: [
    BootScene,
    TitleScene,
    GameScene,
    UiScene,
],
    physics: {
default: 'arcade',
arcade: {
    debug: false,
    gravity: {
        y: 0,
    }
}
    },

    pixelArt: false,
    roundPixels: true,
};

var game = new Phaser.Game(config);


