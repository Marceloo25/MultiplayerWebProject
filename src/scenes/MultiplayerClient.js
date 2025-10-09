export class MultiplayerClient extends Phaser.Scene {
    constructor() {
        super('MultiplayerClient');
        this.otherPlayers = {};
        this.isAnimating = false;
        this.animatingPlayers = {};
    }

    init(data) {
        this.createdCharacter = data.CharacterData;
        console.log('Created Character: Body Type: ' + this.createdCharacter.btype + ' Hair Type: ' + this.createdCharacter.htype + ' Hair Color: ' + this.createdCharacter.hcolor);
        this.selectedCharacter = 'anim_' + this.createdCharacter.btype + '_b_hair' + this.createdCharacter.htype + '_' + this.createdCharacter.hcolor;
        this.selectedCharacterC = 'anim_' + this.createdCharacter.btype + '_s';
        this.selectedCharacterB = 'animW_' + this.createdCharacter.btype + '_s';
    }

    preload() {
        this.load.image('backgroundMap', 'assets/Map002.png');
        // Load all possible character spritesheets
        this.load.spritesheet(this.selectedCharacter, 'assets/char/anim/' + this.selectedCharacter + '.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet(this.selectedCharacterC, 'assets/char/anim/clothes/' + this.selectedCharacterC + '.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet(this.selectedCharacterB, 'assets/char/anim/clothes/' + this.selectedCharacterB + '.png', { frameWidth: 48, frameHeight: 48.5 });
        this.load.spritesheet(this.selectedCharacter + '_walk', 'assets/char/anim/' + this.selectedCharacter + '_walk.png', { frameWidth: 48, frameHeight: 48.5 });

        this.load.image('chatBallon', 'assets/chat.png');
    }

    create() {
        // 8-direction animations
        this.anims.create({ key: 'walk_down', frames: this.anims.generateFrameNumbers(this.selectedCharacter + '_walk', { start: 0, end: 2 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'walk_horizontal', frames: this.anims.generateFrameNumbers(this.selectedCharacterB, { start: 12, end: 14 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'walk_diagonal_up', frames: this.anims.generateFrameNumbers(this.selectedCharacterB, { start: 24, end: 26 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'walk_up', frames: this.anims.generateFrameNumbers(this.selectedCharacter + '_walk', { start: 36, end: 38 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'idleHead', frames: this.anims.generateFrameNumbers(this.selectedCharacter, { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'idleBody', frames: this.anims.generateFrameNumbers(this.selectedCharacterC, { start: 0, end: 2 }), frameRate: 4, repeat: -1 });

        // Different character animations
        this.anims.create({ key: 'victoryHead', frames: this.anims.generateFrameNumbers(this.selectedCharacter, { start: 15, end: 17 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'victoryBody', frames: this.anims.generateFrameNumbers(this.selectedCharacterC, { start: 15, end: 17 }), frameRate: 4, repeat: -1 });

        this.anims.create({ key: 'waveHead', frames: this.anims.generateFrameNumbers(this.selectedCharacter, { start: 48, end: 50 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'waveBody', frames: this.anims.generateFrameNumbers(this.selectedCharacterC, { start: 48, end: 50 }), frameRate: 4, repeat: -1 });

        this.anims.create({ key: 'dodgeHead', frames: this.anims.generateFrameNumbers(this.selectedCharacter, { start: 45, end: 47 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'dodgeBody', frames: this.anims.generateFrameNumbers(this.selectedCharacterC, { start: 45, end: 47 }), frameRate: 4, repeat: -1 });

        this.anims.create({ key: 'swordHead1', frames: this.anims.generateFrameNumbers(this.selectedCharacter, { start: 3, end: 5 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'swordBody1', frames: this.anims.generateFrameNumbers(this.selectedCharacterC, { start: 3, end: 5 }), frameRate: 4, repeat: -1 });

        this.anims.create({ key: 'swordHead2', frames: this.anims.generateFrameNumbers(this.selectedCharacter, { start: 12, end: 14 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'swordBody2', frames: this.anims.generateFrameNumbers(this.selectedCharacterC, { start: 12, end: 14 }), frameRate: 4, repeat: -1 });

        this.anims.create({ key: 'swordHead3', frames: this.anims.generateFrameNumbers(this.selectedCharacter, { start: 39, end: 41 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'swordBody3', frames: this.anims.generateFrameNumbers(this.selectedCharacterC, { start: 39, end: 41 }), frameRate: 4, repeat: -1 });


        this.background = this.add.image(650, 320, 'backgroundMap').setScale(0.4);
        this.localPlayer = this.add.sprite(640, 362, this.selectedCharacter, 1).setScale(0.8).setDepth(100);
        this.localPlayerC = this.add.sprite(640, 362, 'anim_' + this.createdCharacter.btype + '_s', 1).setScale(0.8).setDepth(100);
        this.localPlayerB = this.add.sprite(640, 360, this.selectedCharacterB, 1).setScale(1, 1.1).setDepth(100);


        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.lastDirection = 'down';

        // Socket connection
        this.socket = io('http://localhost:3000'); // Assign to this.socket

        // Send character selection to server
        this.socket.emit('join', {
            selectedCharacter: this.selectedCharacter, // should be a string
            selectedCharacterC: this.selectedCharacterC,
            selectedCharacterB: this.selectedCharacterB,
            btype: this.createdCharacter.btype,
            htype: this.createdCharacter.htype,
            hcolor: this.createdCharacter.hcolor,
            x: 640,
            y: 362
        });

        this.socket.on('animation', ({ id, type }) => {
            if (id === this.socket.id) {
                this.playSpecialAnimation(type);
            } else if (this.otherPlayers[id]) {
                this.playOtherPlayerAnimation(id, type);
            }
        });

        this.socket.on('dodge', ({ id, x, y }) => {
            this.animatingPlayers[id] = true; // Mark as animating

            if (id === this.socket.id) {
                this.localPlayerB.visible = false;
                this.localPlayer.anims.play('dodgeHead', true);
                this.localPlayerC.anims.play('dodgeBody', true);

                this.tweens.add({
                    targets: [this.localPlayer, this.localPlayerC, this.localPlayerB],
                    x: x,
                    y: y,
                    duration: 200,
                    onComplete: () => {
                        this.localPlayerB.visible = true;
                        this.localPlayer.anims.play('idleHead', true);
                        this.localPlayerC.anims.play('idleBody', true);
                        this.isAnimating = false;
                        this.animatingPlayers[id] = false; // Animation done
                    }
                });
            } else if (this.otherPlayers[id]) {
                const player = this.otherPlayers[id];
                player.body.visible = false;
                player.head.anims.play(player.idleHeadKey, true);
                player.clothes.anims.play('dodgeBody', true);

                this.tweens.add({
                    targets: [player.head, player.clothes, player.body],
                    x: x,
                    y: y,
                    duration: 200,
                    onComplete: () => {
                        player.body.visible = true;
                        player.head.anims.play(player.idleHeadKey, true);
                        player.clothes.anims.play('idleBody', true);
                        this.animatingPlayers[id] = false; // Animation done
                    }
                });
            }
        });

        // Listen for state updates from server
        this.socket.on('state', async (players) => {
            for (const id of Object.keys(players)) {
                const data = players[id];
                const direction = data.direction || 'down';

                if (id === this.socket.id) {
                    // Update your own player
                    if (!this.animatingPlayers[id]) {
                        // Update your own position
                        this.localPlayer.x = data.x;
                        this.localPlayer.y = data.y;
                        this.localPlayerC.x = data.x;
                        this.localPlayerC.y = data.y;
                        this.localPlayerB.x = data.x;
                        this.localPlayerB.y = data.y;
                    }
                    // Animation logic for your player
                    switch (direction) {
                        case 'left':
                            this.localPlayerB.anims.play('walk_horizontal', true);
                            this.localPlayerB.setFlipX(false);
                            this.localPlayer.play('idleHead', true).setFlipX(false);
                            this.localPlayerC.play('idleBody', true).setFlipX(false);
                            break;
                        case 'right':
                            this.localPlayerB.anims.play('walk_horizontal', true);
                            this.localPlayerB.setFlipX(true);
                            this.localPlayer.play('idleHead', true).setFlipX(true);
                            this.localPlayerC.play('idleBody', true).setFlipX(true);
                            break;
                        case 'up':
                            this.localPlayerB.anims.play('walk_up', true);
                            this.localPlayerB.setFlipX(false);
                            this.localPlayer.play('idleHead', true).setFlipX(false);
                            this.localPlayerC.play('idleBody', true).setFlipX(false);
                            break;
                        case 'down':
                            this.localPlayerB.anims.play('walk_down', true);
                            this.localPlayerB.setFlipX(false);
                            this.localPlayer.play('idleHead', true).setFlipX(false);
                            this.localPlayerC.play('idleBody', true).setFlipX(false);
                            break;
                        case 'up_left':
                            this.localPlayerB.anims.play('walk_diagonal_up', true);
                            this.localPlayerB.setFlipX(true);
                            this.localPlayer.play('idleHead', true).setFlipX(false);
                            this.localPlayerC.play('idleBody', true).setFlipX(false);
                            break;
                        case 'up_right':
                            this.localPlayerB.anims.play('walk_diagonal_up', true);
                            this.localPlayerB.setFlipX(false);
                            this.localPlayer.play('idleHead', true).setFlipX(true);
                            this.localPlayerC.play('idleBody', true).setFlipX(true);
                            break;
                        case 'down_left':
                            this.localPlayerB.anims.play('walk_horizontal', true);
                            this.localPlayerB.setFlipX(false);
                            this.localPlayer.play('idleHead', true).setFlipX(false);
                            this.localPlayerC.play('idleBody', true).setFlipX(false);
                            break;
                        case 'down_right':
                            this.localPlayerB.anims.play('walk_horizontal', true);
                            this.localPlayerB.setFlipX(true);
                            this.localPlayer.play('idleHead', true).setFlipX(true);
                            this.localPlayerC.play('idleBody', true).setFlipX(true);
                            break;
                        case 'idle':
                            this.localPlayerB.anims.stop();
                            break;
                        default:
                            this.localPlayerB.anims.play('walk_down', true);
                            this.localPlayerB.setFlipX(false);
                            this.localPlayer.play('idleHead', true).setFlipX(false);
                            this.localPlayerC.play('idleBody', true).setFlipX(false);
                    }
                } else {
                    // Handle other players
                    if (!this.otherPlayers[id]) {
                        this.otherPlayers[id] = { pending: true }; // Set pending
                        await this.createOtherPlayerSprites(id, data);
                    } else if (this.otherPlayers[id].pending) {
                        // Sprite is being created, do nothing
                        continue;
                    } else {
                        if (this.animatingPlayers[id]) {
                            // Skip position update if animating
                            continue;
                        }
                        // Update positions
                        this.otherPlayers[id].head.x = data.x;
                        this.otherPlayers[id].head.y = data.y;
                        this.otherPlayers[id].clothes.x = data.x;
                        this.otherPlayers[id].clothes.y = data.y;
                        this.otherPlayers[id].body.x = data.x;
                        this.otherPlayers[id].body.y = data.y;
                    }

                    // Animation logic for other players
                    const idleHeadKey = this.otherPlayers[id].idleHeadKey;
                    const walkUpHeadKey = this.otherPlayers[id].walkUpHeadKey;
                    const walkDownHeadKey = this.otherPlayers[id].walkDownHeadKey;

                    switch (direction) {
                        case 'left':
                            this.otherPlayers[id].body.anims.play('walk_horizontal', true);
                            this.otherPlayers[id].body.setFlipX(false);
                            this.otherPlayers[id].head.play(idleHeadKey, true).setFlipX(false);
                            this.otherPlayers[id].clothes.play('idleBody', true).setFlipX(false);
                            break;
                        case 'right':
                            this.otherPlayers[id].body.anims.play('walk_horizontal', true);
                            this.otherPlayers[id].body.setFlipX(true);
                            this.otherPlayers[id].head.play(idleHeadKey, true).setFlipX(true);
                            this.otherPlayers[id].clothes.play('idleBody', true).setFlipX(true);
                            break;
                        case 'up':
                            this.otherPlayers[id].body.anims.play(walkUpHeadKey, true);
                            this.otherPlayers[id].head.play(idleHeadKey, true).setFlipX(false);
                            this.otherPlayers[id].clothes.play('idleBody', true).setFlipX(false);
                            break;
                        case 'down':
                            this.otherPlayers[id].body.anims.play(walkDownHeadKey, true);
                            this.otherPlayers[id].head.play(idleHeadKey, true).setFlipX(false);
                            this.otherPlayers[id].clothes.play('idleBody', true).setFlipX(false);
                            break;
                        case 'up_left':
                            this.otherPlayers[id].body.anims.play('walk_diagonal_up', true);
                            this.otherPlayers[id].body.setFlipX(true);
                            this.otherPlayers[id].head.play(idleHeadKey, true).setFlipX(true);
                            this.otherPlayers[id].clothes.play('idleBody', true).setFlipX(true);
                            break;
                        case 'up_right':
                            this.otherPlayers[id].body.anims.play('walk_diagonal_up', true);
                            this.otherPlayers[id].body.setFlipX(false);
                            this.otherPlayers[id].head.play(idleHeadKey, true).setFlipX(true);
                            this.otherPlayers[id].clothes.play('idleBody', true).setFlipX(true);
                            break;
                        case 'down_left':
                            this.otherPlayers[id].body.anims.play('walk_horizontal', true);
                            this.otherPlayers[id].body.setFlipX(false);
                            this.otherPlayers[id].head.play(idleHeadKey, true).setFlipX(false);
                            this.otherPlayers[id].clothes.play('idleBody', true).setFlipX(false);
                            break;
                        case 'down_right':
                            this.otherPlayers[id].body.anims.play('walk_horizontal', true);
                            this.otherPlayers[id].body.setFlipX(true);
                            this.otherPlayers[id].head.play(idleHeadKey, true).setFlipX(true);
                            this.otherPlayers[id].clothes.play('idleBody', true).setFlipX(true);
                            break;
                        case 'idle':
                            this.otherPlayers[id].body.anims.stop();
                            break;
                        default:
                            this.otherPlayers[id].body.anims.play('walk_down', true);
                            this.otherPlayers[id].body.setFlipX(false);
                            this.otherPlayers[id].head.play(idleHeadKey, true).setFlipX(false);
                            this.otherPlayers[id].clothes.play('idleBody', true).setFlipX(false);
                    }
                }
            }

            // Remove sprites for disconnected players
            Object.keys(this.otherPlayers).forEach(id => {
                if (!players[id]) {
                    this.otherPlayers[id].head.destroy();
                    this.otherPlayers[id].clothes.destroy();
                    this.otherPlayers[id].body.destroy();
                    delete this.otherPlayers[id];
                }
            });
        });

        // Store your own socket id for reference
        this.socket.on('connect', () => {
            console.log('Connected to server:', this.socket.id);
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.showExitDialog();
        });

        // Create chat input (hidden by default)
        this.chatInput = document.createElement('input');
        this.chatInput.type = 'text';
        this.chatInput.style.position = 'absolute';
        this.chatInput.style.bottom = '40px';
        this.chatInput.style.left = '50%';
        this.chatInput.style.transform = 'translateX(-50%)';
        this.chatInput.style.zIndex = 100;
        this.chatInput.style.fontSize = '20px';
        this.chatInput.style.display = 'none';
        document.body.appendChild(this.chatInput);

        // Show input on pressing 'T'
        this.input.keyboard.on('keydown-T', (event) => {
            event.preventDefault();
            this.chatInput.style.display = '';
            this.chatInput.focus();
        });

        // Send message on Enter
        this.chatInput.addEventListener('keydown', (e) => {
            const blockedKeys = ['w', 'a', 's', 'd', 't', 'W', 'A', 'S', 'D', 'T', ' ', 'Space', 'Shift'];
            const value = this.chatInput.value.trim();

            if (blockedKeys.includes(e.key)) {
                e.stopPropagation();
            }
            if (e.key === 'Enter' && value !== '') {
                if (value === '/victory') {
                    this.playSpecialAnimation('victory');
                    this.socket.emit('animation', { type: 'victory' });
                } else if (value === '/wave') {
                    this.playSpecialAnimation('wave');
                    this.socket.emit('animation', { type: 'wave' });
                } else {
                    this.socket.emit('chat', { message: value });
                }
                this.chatInput.value = '';
                this.chatInput.style.display = 'none';
            }
        });

        // Listen for chat messages
        this.socket.on('chat', ({ id, message }) => {
            this.showChatBalloon(id, message);
        });

        this.input.on('pointerdown', () => {
            this.isMouseDown = true;

            if (this.isMouseDown && !this.aimSpriteA) {
                const pointer = this.input.activePointer;
                const dx = pointer.worldX - this.localPlayer.x;
                const dy = pointer.worldY - this.localPlayer.y;
                let angle = Math.atan2(dy, dx);

                this.aimSpriteA = this.add.sprite(this.localPlayer.x, this.localPlayer.y, this.selectedCharacterC, 21)
                    .setScale(0.8).setDepth(200).setOrigin(0.5, 0.65).setFlipX(true);

                this.aimSpriteA.x = this.localPlayer.x;
                this.aimSpriteA.y = this.localPlayer.y;
                this.aimSpriteA.rotation = angle;


            }
        });

        this.input.on('pointerup', () => {
            this.isMouseDown = false;
            this.localPlayerB.visible = true;

            // Remove the two mouse sprites
            if (this.aimSpriteA) {
                this.aimSpriteA.destroy();
                this.aimSpriteA = null;
            }

        });

    }

    update() {
        // Block movement input if animating
        if (this.isAnimating) return;

        if (this.isMouseDown && this.aimSpriteA) {
            const pointer = this.input.activePointer;
            const dx = pointer.worldX - this.localPlayer.x;
            const dy = pointer.worldY - this.localPlayer.y;
            const angle = Math.atan2(dy, dx);

            // Position and rotate sprites
            this.aimSpriteA.x = this.localPlayer.x;
            this.aimSpriteA.y = this.localPlayer.y + 10;
            this.aimSpriteA.rotation = angle;

            this.localPlayerB.visible = false;

            // FlipX logic: false if pointer is on the left, true if on the right
            if (pointer.worldX < this.localPlayer.x) {
                this.localPlayerC.setFlipX(false);
                this.localPlayer.setFlipX(false);

            } else {
                this.localPlayerC.setFlipX(true);
                this.localPlayer.setFlipX(true);
            }


            //this.mouseSpriteB.x = this.localPlayer.x;
            //this.mouseSpriteB.y = this.localPlayer.y;
            //this.mouseSpriteB.rotation = angle;
        }

        // Detect dodge key
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)) ||
            Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))) {
            this.performDodge();
            return; // Block movement during dodge
        }

        // Only send movement if chat input is not focused/visible
        if (this.chatInput.style.display === 'none' || document.activeElement !== this.chatInput) {
            let input = { up: false, down: false, left: false, right: false };
            if (this.cursors.left.isDown || this.wasd.left.isDown) input.left = true;
            if (this.cursors.right.isDown || this.wasd.right.isDown) input.right = true;
            if (this.cursors.up.isDown || this.wasd.up.isDown) input.up = true;
            if (this.cursors.down.isDown || this.wasd.down.isDown) input.down = true;

            this.socket.emit('move', input);
        }



        // Update local player's balloon position
        if (this.balloon && this.balloon.bg && this.balloon.text) {
            const offsetX = 60;
            const offsetY = 60;
            const pointerOffset = 75 / 3.5; // Use your balloonHeight value

            this.balloon.bg.x = this.localPlayer.x + offsetX;
            this.balloon.bg.y = this.localPlayer.y - offsetY;
            this.balloon.text.x = this.localPlayer.x + offsetX;
            this.balloon.text.y = this.localPlayer.y - offsetY - pointerOffset / 2;
        }

        // Update other players' balloon positions
        Object.values(this.otherPlayers).forEach(player => {
            if (player.balloon && player.balloon.bg && player.balloon.text) {
                const offsetX = 50;
                const offsetY = 50;
                const pointerOffset = 75 / 3.5;
                player.balloon.bg.x = player.head.x + offsetX;
                player.balloon.bg.y = player.head.y - offsetY;
                player.balloon.text.x = player.head.x + offsetX;
                player.balloon.text.y = player.head.y - offsetY - pointerOffset / 2;
            }
        });
    }

    async loadOtherPlayerHeadSpritesheet(key) {
        if (!key || typeof key !== 'string') {
            console.error('Invalid spritesheet key:', key);
            return Promise.resolve();
        }
        const promises = [];

        // Load head spritesheet
        if (!this.textures.exists(key)) {
            this.load.spritesheet(key, 'assets/char/anim/' + key + '.png', { frameWidth: 64, frameHeight: 64 });
            promises.push(new Promise(resolve => {
                this.load.once('complete', resolve);
                this.load.start();
            }));
        }

        // Load walk spritesheet
        const walkKey = key + '_walk';
        if (!this.textures.exists(walkKey)) {
            this.load.spritesheet(walkKey, 'assets/char/anim/' + walkKey + '.png', { frameWidth: 48, frameHeight: 48.5 });
            promises.push(new Promise(resolve => {
                this.load.once('complete', resolve);
                this.load.start();
            }));
        }

        return Promise.all(promises);
    }

    async createOtherPlayerSprites(id, data) {
        await this.loadOtherPlayerHeadSpritesheet(data.selectedCharacter);

        // Unique animation key for this player's head
        const idleHeadKey = 'idleHead_' + id;
        if (!this.anims.exists(idleHeadKey)) {
            this.anims.create({
                key: idleHeadKey,
                frames: this.anims.generateFrameNumbers(data.selectedCharacter, { start: 0, end: 2 }),
                frameRate: 4,
                repeat: -1
            });
        }

        const walkUpHeadKey = 'walkUpHead_' + id;
        const walkDownHeadKey = 'walkDownHead_' + id;

        if (!this.anims.exists(walkUpHeadKey)) {
            this.anims.create({
                key: walkUpHeadKey,
                frames: this.anims.generateFrameNumbers(data.selectedCharacter + '_walk', { start: 36, end: 38 }), // adjust frame range as needed
                frameRate: 8,
                repeat: -1
            });
        }
        if (!this.anims.exists(walkDownHeadKey)) {
            this.anims.create({
                key: walkDownHeadKey,
                frames: this.anims.generateFrameNumbers(data.selectedCharacter + '_walk', { start: 0, end: 2 }), // adjust frame range as needed
                frameRate: 8,
                repeat: -1
            });
        }
        this.otherPlayers[id] = {
            head: this.add.sprite(data.x, data.y, data.selectedCharacter, 1).setScale(0.8),
            clothes: this.add.sprite(data.x, data.y, 'anim_' + data.btype + '_s', 1).setScale(0.8),
            body: this.add.sprite(data.x, data.y, data.selectedCharacterB, 1).setScale(1, 1.1),
            idleHeadKey: idleHeadKey,
            walkUpHeadKey: walkUpHeadKey,
            walkDownHeadKey: walkDownHeadKey
        };
    }

    showExitDialog() {
        // Create a dialog
        const bg = this.add.rectangle(650, 300, 300, 150, 0x000000, 0.8).setDepth(10);
        const msg = this.add.text(650, 270, 'Exit the game?', { fontSize: '24px', color: '#fff' }).setOrigin(0.5).setDepth(11);
        const yesBtn = this.add.text(600, 320, 'Yes', { fontSize: '20px', color: '#0f0' }).setOrigin(0.5).setDepth(11).setInteractive();
        const noBtn = this.add.text(700, 320, 'No', { fontSize: '20px', color: '#f00' }).setOrigin(0.5).setDepth(11).setInteractive();

        yesBtn.on('pointerdown', () => {
            this.localPlayer.destroy();
            this.localPlayerB.destroy();
            this.localPlayerC.destroy();
            this.game.destroy(true);
        });
        noBtn.on('pointerdown', () => {
            bg.destroy();
            msg.destroy();
            yesBtn.destroy();
            noBtn.destroy();
        });
    }

    showChatBalloon(id, message) {
        const balloonWidth = 100;
        const balloonHeight = 75;
        const widthPadding = 5;
        const heightPadding = 25;
        const minFontSize = 10;
        const maxFontSize = 34;
        const maxChars = 120;

        let displayMessage = message.slice(0, maxChars);

        let anchorSprite, balloonObj;
        if (id === this.socket.id) {
            anchorSprite = this.localPlayer;
            balloonObj = this;
        } else if (this.otherPlayers[id]) {
            anchorSprite = this.otherPlayers[id].head;
            balloonObj = this.otherPlayers[id];
        } else {
            return;
        }

        if (balloonObj.balloon) {
            balloonObj.balloon.bg.destroy();
            balloonObj.balloon.text.destroy();
        }

        let fontSize = maxFontSize;
        let wrappedMessage = displayMessage;
        let fits = false;
        const fontFamily = 'Arial';

        while (fontSize >= minFontSize && !fits) {
            const fontStyle = { fontSize: fontSize + 'px', fontFamily };
            wrappedMessage = this.wrapTextPixel(displayMessage, balloonWidth - widthPadding, fontStyle);

            // Measure actual text height
            const tempText = this.add.text(0, 0, wrappedMessage, fontStyle).setVisible(false);
            const textWidth = tempText.width;
            const textHeight = tempText.height;
            tempText.destroy();

            if (
                textWidth <= balloonWidth - widthPadding &&
                textHeight <= balloonHeight - heightPadding
            ) {
                fits = true;
            } else {
                fontSize--;
            }
        }

        // If it still doesn't fit, truncate the message until it does (even if only '...')
        if (!fits) {
            let truncated = displayMessage;
            const fontStyle = { fontSize: fontSize + 'px', fontFamily };
            while (truncated.length > 0) {
                let testMessage = truncated.slice(0, -1) + '...';
                let wrappedTest = this.wrapTextPixel(testMessage, balloonWidth - widthPadding, fontStyle);

                const tempText = this.add.text(0, 0, wrappedTest, fontStyle).setVisible(false);
                const textWidth = tempText.width;
                const textHeight = tempText.height;
                tempText.destroy();

                if (
                    textWidth <= balloonWidth - widthPadding &&
                    textHeight <= balloonHeight - heightPadding
                ) {
                    wrappedMessage = wrappedTest;
                    break;
                }
                truncated = truncated.slice(0, -1);
            }
            // If nothing fits, just show '...'
            if (truncated.length === 0) {
                wrappedMessage = '...';
            }
        }

        // Draw balloon background (fixed size)
        const offsetX = 60;
        const offsetY = 60;

        const bg = this.add.image(anchorSprite.x + offsetX, anchorSprite.y - offsetY, 'chatBallon')
            .setDisplaySize(balloonWidth, balloonHeight)
            .setDepth(20);

        // Draw text (centered, always fits)
        const pointerOffset = balloonHeight / 3.5;
        const text = this.add.text(
            anchorSprite.x + offsetX,
            anchorSprite.y - offsetY - pointerOffset / 2,
            wrappedMessage,
            {
                fontSize: fontSize + 'px',
                fontFamily,
                color: '#000',
                align: 'center',
                wordWrap: { width: balloonWidth - widthPadding }
            }
        ).setOrigin(0.5).setDepth(21);

        balloonObj.balloon = { bg, text };
        if (id === this.socket.id) {
            this.balloon = { bg, text };
        }

        this.time.delayedCall(3000, () => {
            bg.destroy();
            text.destroy();
            if (balloonObj.balloon) balloonObj.balloon = null;
        });
    }

    wrapTextPixel(text, maxPixelWidth, fontStyle = { fontSize: '18px', fontFamily: 'Arial' }) {
        // Create a temporary text object for measuring
        const tempText = this.add.text(0, 0, '', fontStyle).setVisible(false);
        const words = text.split(' ');
        let lines = [];
        let currentLine = '';

        for (let i = 0; i < words.length; i++) {
            let testLine = currentLine ? currentLine + ' ' + words[i] : words[i];
            tempText.setText(testLine);
            if (tempText.width <= maxPixelWidth) {
                currentLine = testLine;
            } else {
                if (currentLine) lines.push(currentLine);
                currentLine = words[i];
            }
        }
        if (currentLine) lines.push(currentLine);

        tempText.destroy(); // Clean up
        return lines.join('\n');
    }

    playSpecialAnimation(type) {
        this.isAnimating = true; // Disable input
        this.localPlayerB.visible = false;

        let headAnim, bodyAnim;
        if (type === 'victory') {
            headAnim = 'victoryHead';
            bodyAnim = 'victoryBody';
        } else if (type === 'wave') {
            headAnim = 'waveHead';
            bodyAnim = 'waveBody';
        } else {
            return;
        }

        // Play animation twice
        this.localPlayer.anims.play(headAnim, true);
        this.localPlayerC.anims.play(bodyAnim, true);

        // Animation duration: 2 loops × frame count × frameRate
        const frameCount = this.anims.get(headAnim).frames.length;
        const frameRate = this.anims.get(headAnim).frameRate;
        const duration = (frameCount / frameRate) * 2 * 1000; // ms

        this.time.delayedCall(duration, () => {
            // Show selectedCharacterB again
            this.localPlayerB.visible = true;
            // Return to idle
            this.localPlayer.anims.play('idleHead', true);
            this.localPlayerC.anims.play('idleBody', true);
            this.isAnimating = false; // Re-enable input
        });
    }

    performDodge() {
        this.isAnimating = true;
        this.animatingPlayers[this.socket.id] = true;

        let dx = 0, dy = 0;
        if (this.cursors.left.isDown || this.wasd.left.isDown) dx = -1;
        if (this.cursors.right.isDown || this.wasd.right.isDown) dx = 1;
        if (this.cursors.up.isDown || this.wasd.up.isDown) dy = -1;
        if (this.cursors.down.isDown || this.wasd.down.isDown) dy = 1;

        // Emit dodge direction to server
        this.socket.emit('dodge', { dx, dy });
    }

    playOtherPlayerAnimation(id, type) {
        const player = this.otherPlayers[id];
        if (!player) return;

        // Hide body sprite
        player.body.visible = false;

        let headAnim, bodyAnim;
        if (type === 'victory') {
            headAnim = player.idleHeadKey.replace('idleHead', 'victoryHead');
            bodyAnim = 'victoryBody';
        } else if (type === 'wave') {
            headAnim = player.idleHeadKey.replace('idleHead', 'waveHead');
            bodyAnim = 'waveBody';
        } else {
            return;
        }

        player.head.anims.play(headAnim, true);
        player.clothes.anims.play(bodyAnim, true);

        // Animation duration: 2 loops × frame count × frameRate
        const frameCount = this.anims.get(headAnim).frames.length;
        const frameRate = this.anims.get(headAnim).frameRate;
        const duration = (frameCount / frameRate) * 2 * 1000;

        this.time.delayedCall(duration, () => {
            player.body.visible = true;
            player.head.anims.play(player.idleHeadKey, true);
            player.clothes.anims.play('idleBody', true);
        });
    }
}