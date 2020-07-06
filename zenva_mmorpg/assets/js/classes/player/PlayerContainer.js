
const Direction = {
RIGHT: 'RIGHT',
LEFT: 'LEFT',
UP: 'UP',
DOWN: 'DOWN',



};

class PlayerContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, frame, health, maxHealth, id, attackAudio) {
        super(scene, x, y);
        this.scene = scene;
        this.velocity = 120; //player velocity when moving
        this.currentDirection = Direction.RIGHT;
        this.playerAttacking = false;
        this.playerMagicAttacking = false;
        this.flipX = true;
        this.swordHit = false;
        this.magicHit = false;
        this.health = health;
        this.maxHealth = maxHealth;
        this.id = id;
        this.attackAudio = attackAudio;


            //set size on the container
            this.setSize(32, 32);
            //enable physics
            this.scene.physics.world.enable(this);
             //collide world bounds
              this.body.setCollideWorldBounds(true);
              // add player container to existing scene
              this.scene.add.existing(this);
              //camera to follow player container
              this.scene.cameras.main.startFollow(this);

              //create player and add to container
              this.player = new Player(this.scene, 0, 0, key, frame);
              this.add(this.player);
    
              //create weapon object
              this.weapon = this.scene.add.image(20, 0, 'items', 4);
              this.scene.add.existing(this.weapon);
              this.weapon.setScale(0.75);
              this.scene.physics.world.enable(this.weapon);
              this.add(this.weapon);
              this.weapon.alpha = 0;

               //create Magic object
               this.pMagic = this.scene.add.image(25, 0, 'items', 5);
               this.scene.add.existing(this.pMagic);
               this.pMagic.setScale(0.75);
               this.scene.physics.world.enable(this.pMagic);
               this.add(this.pMagic);
               this.pMagic.alpha = 0;

              //create player healthbar
              this.createHealthBar();
    }

    createHealthBar() {
        this.healthBar = this.scene.add.graphics();
        this.updateHealthBar();
      
    }
  
    updateHealthBar() {
      this.healthBar.clear(this.healthBar);
      this.healthBar.fillStyle(0xFFFFFF, 1);
      this.healthBar.fillRect(this.x -16, this.y - 25, 32, 5);
      this.healthBar.fillGradientStyle(0xff0000, 0xFFFFFF, 4);
      this.healthBar.fillRect(this.x -16, this.y - 25, 32* (this.health / this.maxHealth), 5);
  
    }
  
    updateHealth(health) {
      this.health = health;
      this.updateHealthBar();
      
    }

    respawn(playerObject){
        this.health = playerObject.health;
        this.setPosition(playerObject.x, playerObject.y);
        this.updateHealthBar()


    }
    update(cursors) {

        this.body.setVelocity(0);
    
        if (cursors.left.isDown) {
            this.body.setVelocityX(-this.velocity);
            this.currentDirection = Direction.LEFT;
            this.weapon.setPosition(-20, 0);
            this.pMagic.setPosition(-25, 0);
            this.player.flipX = false;
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(this.velocity);
            this.currentDirection = Direction.RIGHT;
            this.weapon.setPosition(20, 0);
            this.pMagic.setPosition(25, 0);
            this.player.flipX = false;
    
        }
    
        if (cursors.up.isDown) {
            this.body.setVelocityY(-this.velocity);
            this.currentDirection = Direction.UP;
            this.weapon.setPosition(0, -25);
            this.pMagic.setPosition(0, -30);
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(this.velocity);
            this.currentDirection = Direction.DOWN;
            this.weapon.setPosition(0, 25);
            this.pMagic.setPosition(0, 30);
     
        }
    if (Phaser.Input.Keyboard.JustDown (cursors.space) && !this.playerAttacking){
            this.weapon.alpha = 1;
            this.playerAttacking = true;
            this.attackAudio.play();
            this.scene.time.delayedCall(300, () => {this.weapon.alpha= 0;
            this.playerAttacking = false;
           this.swordHit = false;
            }, [], this);
    }
        if (this.playerAttacking) {
            if (this.weapon.flipX) {
                this.weapon.angle -= 10;
            } else {
                this.weapon.angle += 10;

            }

        } else {
            if (this.currentDirection === Direction.DOWN) {
                this.weapon.setAngle(-270);
            } else if (this.currentDirection === Direction.UP) {
                this.weapon.setAngle(-90);
            } else {
                this.weapon.setAngle(0);
            }

                this.weapon.flipX = false;
                if (this.currentDirection === Direction.LEFT) {
                    this.weapon.flipX = true;
                }

 }
        if (this.playerAttacking) {
            if (this.weapon.flipX) {
                this.weapon.angle -= 10;
            } else {
                this.weapon.angle += 10;

            }

        } else {
            if (this.currentDirection === Direction.DOWN) {
                this.weapon.setAngle(-270);
            } else if (this.currentDirection === Direction.UP) {
                this.weapon.setAngle(-90);
            } else {
                this.weapon.setAngle(0);
            }

                this.weapon.flipX = false;
                if (this.currentDirection === Direction.LEFT) {
                    this.weapon.flipX = true;
                }

                

            }

            // magic attack
            
            if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.playerMagicAttacking) {
                this.pMagic.alpha = 1;
                this.playerMagicAttacking = true;
                this.scene.time.delayedCall(600, () => {
                    this.pMagic.alpha = 0;
                    this.playerMagicAttacking = false;
                    this.magicHit = false;


                }, [], this);



            }

            if (this.playerMagicAttacking) {
                if (this.pMagic.flipX) {
                    this.pMagic.angle -= 10;
                } else {
                    this.pMagic.angle += 10;
    
                }
    
            } else {
                if (this.currentDirection === Direction.DOWN) {
                    this.pMagic.setAngle(-270);
                } else if (this.currentDirection === Direction.UP) {
                    this.pMagic.setAngle(-90);
                } else {
                    this.pMagic.setAngle(0);
                }
    
                    this.pMagic.flipX = false;
                    if (this.currentDirection === Direction.LEFT) {
                        this.pMagic.flipX = true;
                    }





                this.updateHealthBar();
        }
            }
        }