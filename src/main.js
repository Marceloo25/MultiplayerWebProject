import { Start } from './scenes/Start.js';
import { CharacterSelect } from './scenes/CharacterSelect.js';
import { MultiplayerClient } from './scenes/MultiplayerClient.js';
import { CharacterCreate } from './scenes/CharacterCreate.js';
import { PuzzleScene } from './scenes/PuzzleScene.js';


const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        Start,
        MultiplayerClient,
        CharacterSelect,
        CharacterCreate,
        PuzzleScene // Add this line
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);           