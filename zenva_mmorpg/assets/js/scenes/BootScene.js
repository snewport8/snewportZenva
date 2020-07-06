class BootScene extends Phaser.Scene {

    constructor() {
        super({
            
            key:"BootScene"
        });
    }


     preload(){

     //load images
    this.loadImages();
    //load spritesheets
    this.loadSpriteSheets();
    //load audio
    this.loadAudio();
    //load tilemap
    this.loadTileMap();

        
    
        
   
    }

    loadImages(){
 
    this.load.image('button1', 'assets/images/ui/wood_button1.png');
    this.load.image('button2', 'assets/images/ui/wood_button2.png');
    this.load.image('wall_01', 'assets/images/ui/wall_01.png');
    //load the map tileset image
    this.load.image('background', 'assets/level/background-extruded.png')

    }


    loadSpriteSheets(){
        this.load.spritesheet('items', 'assets/images/items.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('characters', 'assets/images/characters.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('monsters', 'assets/images/monsters.png', {frameWidth: 32, frameHeight: 32});
    }


    loadAudio(){
        this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
        this.load.audio('enemyDeath', ['assets/audio/EnemyDeath.wav']);
        this.load.audio('playerAttack', ['assets/audio/PlayerAttack.wav']);
        this.load.audio('playerDamage', ['assets/audio/PlayerDamage.wav']);
        this.load.audio('playerDeath', ['assets/audio/PlayerDeath.wav']);



        this.load.audio('Loop1', ['assets/audio/Music_loop1.mp3']);
    }


    loadTileMap(){
        //load JSON map file made on tiled software
        this.load.tilemapTiledJSON('map', 'assets/level/GameMap1.json');   
     }

    create(){
    
this.scene.start('Title');

    }
}
