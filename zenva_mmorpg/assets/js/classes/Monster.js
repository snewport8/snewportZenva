class Monster extends Phaser.Physics.Arcade.Image {
constructor (scene, x, y, key, frame, id, health, maxHealth){
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.id = id;
    this.health = health;
    this.maxHealth = maxHealth;

  //enable physics
  this.scene.physics.world.enable(this);
  //set immovable if another object collides with monster
  this.setImmovable(false);
  //scale monster
  this.setScale(1);
  //collide world bounds
  this.setCollideWorldBounds(true);
  // add monster to existing scene
  this.scene.add.existing(this);
  //update monster origin point
  this.setOrigin(0);
  //health bars
  this.createHealthBar();
  }

  createHealthBar() {
      this.healthBar = this.scene.add.graphics();
      this.updateHealthBar();
    
  }

  updateHealthBar() {
    this.healthBar.clear(this.healthBar);
    this.healthBar.fillStyle(0x000000, 1);
    this.healthBar.fillRect(this.x, this.y - 8, 32, 5);
    this.healthBar.fillGradientStyle(0xff0000, 0x000000, 4);
    this.healthBar.fillRect(this.x, this.y - 8, 32* (this.health / this.maxHealth), 5);

  }

  updateHealth(health) {
    this.health = health;
    this.updateHealthBar();
    
  }

  makeActive() {

    this.setActive(true);
    this.setVisible(true);
    this.body.checkCollision.none = false
    this.updateHealthBar();
    }
    
    
    makeInactive(){
        this.setActive(false);
        this.setVisible(false);
        this.body.checkCollision.none = true
        this.healthBar.clear();
    
    }
    
    update() {this.updateHealthBar()}
}