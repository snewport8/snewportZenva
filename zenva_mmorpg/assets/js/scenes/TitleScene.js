class TitleScene extends Phaser.Scene {

    constructor() {
        super('Title');
    }




    create() {

        //create Title text
        this.titleText= this.add.text(this.scale.width / 2, this.scale.height / 2.75, 
            'Welcome Adventurer', {fontSize: '64px', fill: '#fff'});
        this.titleText.setOrigin(0.5);

          
        
         //Creates the Play button
        this.startGameButton = new UiButton(
        this,
        this.scale.width / 2,
        this.scale.height * 0.65,
        'button1',
        'button2',
        'Start',
        this.startScene.bind(this, 'Game'),
        );


    }

            startScene(targetScene) {
                    this.scene.start(targetScene);

            }

}