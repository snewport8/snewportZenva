class Map {

    constructor(scene, key, tileSetName, bgLayerName, blockedLayerName){
    
        this.scene = scene; //scene map beloings to
        this.key = key; // Tiled JSON file
        this.tileSetName = tileSetName;
        this.bgLayerName = bgLayerName;
        this.blockedLayerName = blockedLayerName;
        this.createMap();
    }

    createMap(){
        //create tile map
            this.map = this.scene.make.tilemap({ key: this.key});

        //add tileset image to map
            this.tiles = this.map.addTilesetImage(this.tileSetName, this.tileSetName, 32, 32, 1, 2);

        //create background 
        this.backgroundLayer = this.map.createStaticLayer(this.bgLayerName, this.tiles, 0, 0);
        this.backgroundLayer.setScale(1);

        //create blocked layer
        this.blockedLayer = this.map.createStaticLayer(this.blockedLayerName, this.tiles, 0,0);
        this.blockedLayer.setScale (1)
        this.blockedLayer.setCollisionByExclusion([-1]);

        //update worldbounds to size of map
        this.scene.physics.world.bounds.width = this.map.widthInPixels;
        this.scene.physics.world.bounds.height = this.map.heightInPixels;

        //set camera bound to prevent black area outside of map
        this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels , this.map.heightInPixels );


}

}