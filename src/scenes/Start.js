export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('logo', 'assets/phaser.png');

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('knight', 'assets/knight.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('mage', 'assets/mage.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('rogue', 'assets/rogue.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('button', 'assets/startButton.png'); // Add a button image to your assets folder
        this.load.image('puzzleButton', 'assets/puzzleButton.png'); // Add a button image to your assets folder

    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        const logo = this.add.image(640, 200, 'logo');

        const knight = this.add.sprite(600, 460, 'knight');
        const mage = this.add.sprite(640, 460, 'mage');
        const rogue = this.add.sprite(680, 460, 'rogue');



        this.anims.create({ key: 'walk_rightStart', frames: this.anims.generateFrameNumbers('knight', { start: 24, end: 26 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'walk_rightStart2', frames: this.anims.generateFrameNumbers('mage', { start: 24, end: 26 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'walk_rightStart3', frames: this.anims.generateFrameNumbers('rogue', { start: 24, end: 26 }), frameRate: 8, repeat: -1 });


        knight.play('walk_rightStart');
        mage.play('walk_rightStart2');
        rogue.play('walk_rightStart3');


        this.tweens.add({
            targets: logo,
            y: 400,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            loop: -1
        });

        // Add a button to start multiplayer
        const button = this.add.image(640, 520, 'button').setInteractive();
        button.setScale(0.05);

        button.on('pointerdown', () => {
            this.scene.start('CharacterCreate');
        });

        // Add a button to start multiplayer
        const puzzleButton = this.add.image(640, 595, 'puzzleButton').setInteractive();
        puzzleButton.setScale(0.10);

        puzzleButton.on('pointerdown', () => {
            this.scene.start('PuzzleScene');
        });
    }

    update() {
        this.background.tilePositionX += 2;
    }
    
}
