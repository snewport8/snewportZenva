class UiButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, hoverKey, text, targetCallback) {
        super(scene, x, y);
        this.scene = scene; //the scene container will be added to
        this.x = x; // x pos of container
        this.y = y; // y pos of container
        this.key = key; // background image of button
        this.hoverKey = hoverKey; //the image displayed on mouse over
        this.text = text; // text on button
        this.targetCallback = targetCallback; // callback function called when button pressed

 // create Ui Button
        this.createButton();
     //add this container to phaser scene
        this.scene.add.existing(this); 
    }

    createButton() {

//create play button
this.button = this.scene.add.image(0, 0, 'button1');  
//make button interactive
this.button.setInteractive();
//scale button
this.button.setScale(1.4);

//creates button text
this.buttonText = this.scene.add.text(0,0, this.text, {fontSize: '26px', fill: '#fff'});
//center button text inside Ui button
Phaser.Display.Align.In.Center(this.buttonText, this.button);

//adds the 2 game objects to container
this.add(this.button);
this.add(this.buttonText);

//listen for events
this.button.on('pointerdown', () => {
    this.targetCallback();
  
});

this.button.on('pointerover', () => {
    this.button.setTexture(this.hoverKey);

});

this.button.on('pointerout', () => {
    this.button.setTexture(this.key);
});

    }
}

            