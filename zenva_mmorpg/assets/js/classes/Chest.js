class Chest extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame, coins, id) {
        super(scene, x, y, key, frame)
        this.scene = scene; //the scene game object will be added to
        this.coins = coins; //amount of coins this chest contains
        this.id = id;
    

            //enable physics
            this.scene.physics.world.enable(this);
              // add Chest to existing scene
              this.scene.add.existing(this);
              //scales chest
              this.setScale(1);
    
    }

makeactive() {

this.setActive(true);
this.setVisible(true);
this.body.checkCollision.none = false
}


makeInactive(){
    this.setActive(false);
    this.setVisible(false);
    this.body.checkCollision.none = true

}
}