export class CharacterSelect extends Phaser.Scene {
    constructor() {
        super('CharacterSelect');
    }

    init(data) {
        this.createdCharacter = data.CharacterData;
        console.log('Created Character: Body Type: '+this.createdCharacter.btype + ' Hair Type: '+this.createdCharacter.htype+' Hair Color: '+this.createdCharacter.hcolor);
        //this.localPlayer = this.add.sprite(640, 360, this.selectedKey, 1);
    }

    preload() {
        this.load.image('background3', 'assets/space3.png');
        this.load.image('pepeHands', 'assets/emotes/pepeHands.png');
        this.load.image('peepoHappy', 'assets/emotes/peepoHappy.png');

        this.load.spritesheet('anim_1_sm2', 'assets/char/anim/clothes/anim_1_sm2.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_sm2', 'assets/char/anim/clothes/anim_2_sm2.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.anims.create({ key: 'anim_1_sm2', frames: this.anims.generateFrameNumbers('anim_1_sm2', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_sm2', frames: this.anims.generateFrameNumbers('anim_2_sm2', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });

        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background3');
        this.add.text(650, 100, 'Pick your class', { font: '24px Arial', fill: '#fff' }).setOrigin(0.5);
        var mainChar = this.add.sprite(420, 230, 'anim_'+this.createdCharacter.btype+'_hair'+this.createdCharacter.htype+'_'+this.createdCharacter.hcolor).setScale(2);
        var mainCharB = this.add.sprite(420, 230, 'anim_'+this.createdCharacter.btype+'_sm2').setScale(2);


        mainChar.play('anim_'+this.createdCharacter.btype+'_b_hair'+this.createdCharacter.htype+'_'+this.createdCharacter.hcolor, true);
        mainCharB.play('anim_'+this.createdCharacter.btype+'_sm2', true);

        const arrow_l = this.add.image(700, 230, 'arrow').setScale(0.02).setAngle(180);
        this.add.text(810, 230, 'Adventurer', { font: '24px Arial', fill: '#fff' }).setOrigin(0.5);
        const arrow_r = this.add.image(900, 230, 'arrow').setScale(0.02).setAngle(0);
        
        this.add.text(620, 400, 'For budget reasons the starting class is the adventurer.\nThe adventurer is a Jack-of-all-Trades class that can\nfurther specialize at later levels (but not yet...)', { font: '24px Arial', fill: '#fff' }).setOrigin(0.5);
        const button = this.add.image(880, 460, 'pepeHands').setScale(0.5).setInteractive();

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        button.on('pointerdown', () => {
            this.anims.create({ key: 'created2', frames: this.anims.generateFrameNumbers('anim_'+this.createdCharacter.btype+'_sm2', { start: 15, end: 17 }), frameRate: 4, repeat: -1 });
            mainChar.play('created', true);
            mainCharB.play('created2', true);
            button.setTexture('peepoHappy');
            CharacterData = { btype: this.createdCharacter.btype, htype: this.createdCharacter.htype, hcolor: this.createdCharacter.hcolor };
            sleep(1000).then(() => { this.scene.start('MultiplayerClient', {CharacterData}); });
            //;
        });



/*         const portraits = ['knightF', 'mageF', 'rogueF'];
        const names = ['Knight', 'Mage', 'Rogue'];

        for (let i = 0; i < portraits.length; i++) {
            const char = this.add.image(350 + i * 300, 300, portraits[i]).setInteractive();
            char.setScale(2);

            this.add.text(300 + i * 350, 470, names[i], { font: '18px Arial', fill: '#fff' }).setOrigin(0.5);

            char.on('pointerdown', () => {
                this.scene.start('MultiplayerTest', { selectedCharacter: i });
            });
        } */



    }
}