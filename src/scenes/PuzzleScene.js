export class PuzzleScene extends Phaser.Scene {

    constructor() {
        super('PuzzleScene');
    }

    preload() {}

    create() {
        // Add a gray background to the scene
        this.add.rectangle(400, 300, 1800, 900, 0x888888).setOrigin(0.5);

        this.input.keyboard.on('keydown-ESC', () => {
            this.showExitDialog();
        });
    }

    showExitDialog() {
        // Create a dialog
        const bg = this.add.rectangle(650, 300, 300, 150, 0x000000, 0.8).setDepth(10);
        const msg = this.add.text(650, 270, 'Exit the game?', { fontSize: '24px', color: '#fff' }).setOrigin(0.5).setDepth(11);
        const yesBtn = this.add.text(600, 320, 'Yes', { fontSize: '20px', color: '#0f0' }).setOrigin(0.5).setDepth(11).setInteractive();
        const noBtn = this.add.text(700, 320, 'No', { fontSize: '20px', color: '#f00' }).setOrigin(0.5).setDepth(11).setInteractive();

        yesBtn.on('pointerdown', () => {
            this.game.destroy(true);
        });
        noBtn.on('pointerdown', () => {
            bg.destroy();
            msg.destroy();
            yesBtn.destroy();
            noBtn.destroy();
        });
    }

    update() {}

}
