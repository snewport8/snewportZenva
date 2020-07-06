class GameManager {
    constructor(scene, mapData) {
        this.scene = scene;
        this.mapData = mapData;

        this.spawners = {};
        this.chests = {};
        this.monsters = {};
        this.players = {};


        this.playerLocations = [];
        this.chestLocations = {};
        this.monsterLocations = {};
    }


    setup() {
        this.parseMapData();
        this.setupEventListener();
        this.setupSpawners();
        this.spawnPlayer();
      }
    
      parseMapData() {
       
        this.mapData.forEach((layer) => {
          if (layer.name === 'player_locations') {
            layer.objects.forEach((obj) => {
              this.playerLocations.push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
            });

          } else if (layer.name === 'chest_locations') {
            layer.objects.forEach((obj) => {
                var spawner = getTiledProperty(obj, 'spawner');
              if (this.chestLocations[spawner]) {
                this.chestLocations[spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
              } else {
                this.chestLocations[spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]];
              }
            });

          } else if (layer.name === 'monster_locations') {
            layer.objects.forEach((obj) => {
                var spawner = getTiledProperty(obj, 'spawner');
              if (this.monsterLocations[spawner]) {
                this.monsterLocations[spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)])
              } else {
                this.monsterLocations[spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]];
              }
            });



        }


    });
    
}

setupEventListener(){
  this.scene.events.on('pickUpChest', (chestId, playerId) => {
    //update spawner
    if (this.chests[chestId]) {
      const { gold } = this.chests[chestId];

        //update players gold
      this.players[playerId].updateGold(gold);
      this.scene.events.emit('updateScore', this.players[playerId].gold);


        //removing the chest
      this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
      this.scene.events.emit('chestRemoved', chestId);

    }
   
});

this.scene.events.on('monsterAttacked', (monsterId, playerId) => {
  //update spawner
  if (this.monsters[monsterId]) {
    const { gold, attack } = this.monsters[monsterId];
    //subtract health from monster model
    this.monsters[monsterId].loseHealth();
    
    //check monster health to see if its dead, and if so to remove it
    if (this.monsters[monsterId].health <= 0) {
      

        //update players gold
        this.players[playerId].updateGold(gold);
        

            //removing monster
      this.spawners[this.monsters[monsterId].spawnerId].removeObject(monsterId);
      this.scene.events.emit('monsterRemoved', monsterId);
      
      //add bonus health to player when enemy killed
      this.players[playerId].updateHealth(2);
      this.scene.events.emit('updatePlayerHealth', playerId, this.players[playerId].health);
    } else {

      //update players health 
      this.players[playerId].updateHealth(-attack);
      this.scene.events.emit('updatePlayerHealth', playerId, this.players[playerId].health);
      
      //update monster health
      this.scene.events.emit('updateMonsterHealth', monsterId, this.monsters[monsterId].health);

      //check players health, if at or below 0 player respawn
      if (this.players[playerId].health <= 0) {
        //update players gold as consequence of death
          this.players[playerId].updateGold(parseInt(-this.players[playerId].gold / 2), 10);
          this.scene.events.emit('updateScore', this.players[playerId].gold);

          //respawn player
          this.players[playerId].respawn();
          this.scene.events.emit('respawnPlayer', this.players[playerId]);

      }
    }
   


  }
 
});

    } 


 setupSpawners(){
  const config = {
    spawnInterval: 3000,
    limit: 25,
    spawnerType: SpawnerType.CHEST,
    id: '',
  };

  let spawner;


     // create chest spawners
     Object.keys(this.chestLocations).forEach((key) => {
      config.id = `chest-${key}`;

       spawner = new Spawner(
         config, 
         this.chestLocations[key], 
         this.addChest.bind(this), 
         this.deleteChest.bind(this)
         );
         this.spawners [spawner.id] = spawner;
           });

            //create monster Spawners
            Object.keys (this.monsterLocations).forEach((key) => {
              config.id = `monster-${key}`;
              config.spawnerType = SpawnerType.MONSTER;
       
            spawner = new Spawner(
                config, 
                this.monsterLocations[key], 
                this.addMonster.bind(this), 
                this.deleteMonster.bind(this),
                this.moveMonsters.bind(this),
                );
                this.spawners[spawner.id] = spawner;
                  });


    }

spawnPlayer(){
  const player = new PlayerModel(this.playerLocations);
  this.players[player.id] = player;
  this.scene.events.emit('spawnPlayer', player);


}


addChest(chestId, chest){
  this.chests[chestId] = chest;
  this.scene.events.emit('chestSpawned', chest);
 
}
deleteChest(chestId){
  delete this.chests[chestId];
    
}


addMonster(monsterId, monster) {
  this.monsters[monsterId] = monster;
  this.scene.events.emit('monsterSpawned', monster);

}

deleteMonster(monsterId) {
  delete this.monsters[monsterId];

}

moveMonsters(){
  this.scene.events.emit('monsterMovement', this.monsters);
}

}
