class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)
        this.scene = scene;
 

            //enable physics
            this.scene.physics.world.enable(this);
            //set immovable if another object collides with player
            this.setImmovable(false);
            //scale player
             this.setScale(1);
              // add player to existing scene
              this.scene.add.existing(this);

    
    }
}