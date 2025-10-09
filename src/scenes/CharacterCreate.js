export class CharacterCreate extends Phaser.Scene {
    constructor() {
        super('CharacterCreate');
    }
    init() {
        // Initialization code if needed
    }

    preload() {
        this.load.image('background2', 'assets/space2.png');
        this.load.image('arrow', 'assets/arrow.png');
        //this.load.image('button', 'assets/startButton.png');


        //this.load.image('defaultF', 'assets/char/defaultF/face_m_default.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair0_1', 'assets/char/defaultF/face_m_b_hair0.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair0_1', 'assets/char/defaultF/face_f_b_hair0.png', { frameWidth: 48, frameHeight: 48 });

        this.load.image('face_1_b_hair1_1', 'assets/char/defaultF/face_m_b_hair1_w.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair1_2', 'assets/char/defaultF/face_m_b_hair1_d.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair1_3', 'assets/char/defaultF/face_m_b_hair1_b.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair1_4', 'assets/char/defaultF/face_m_b_hair1_u.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair1_5', 'assets/char/defaultF/face_m_b_hair1_g.png', { frameWidth: 48, frameHeight: 48 });

        this.load.image('face_1_b_hair2_1', 'assets/char/defaultF/face_m_b_hair2_w.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair2_2', 'assets/char/defaultF/face_m_b_hair2_d.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair2_3', 'assets/char/defaultF/face_m_b_hair2_b.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair2_4', 'assets/char/defaultF/face_m_b_hair2_u.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair2_5', 'assets/char/defaultF/face_m_b_hair2_g.png', { frameWidth: 48, frameHeight: 48 });

        this.load.image('face_1_b_hair3_1', 'assets/char/defaultF/face_m_b_hair3_w.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair3_2', 'assets/char/defaultF/face_m_b_hair3_d.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair3_3', 'assets/char/defaultF/face_m_b_hair3_b.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair3_4', 'assets/char/defaultF/face_m_b_hair3_u.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_1_b_hair3_5', 'assets/char/defaultF/face_m_b_hair3_g.png', { frameWidth: 48, frameHeight: 48 });

        this.load.image('face_2_b_hair1_1', 'assets/char/defaultF/face_f_b_hair1_w.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair1_2', 'assets/char/defaultF/face_f_b_hair1_d.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair1_3', 'assets/char/defaultF/face_f_b_hair1_b.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair1_4', 'assets/char/defaultF/face_f_b_hair1_u.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair1_5', 'assets/char/defaultF/face_f_b_hair1_p.png', { frameWidth: 48, frameHeight: 48 });

        this.load.image('face_2_b_hair2_1', 'assets/char/defaultF/face_f_b_hair2_w.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair2_2', 'assets/char/defaultF/face_f_b_hair2_d.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair2_3', 'assets/char/defaultF/face_f_b_hair2_b.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair2_4', 'assets/char/defaultF/face_f_b_hair2_u.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair2_5', 'assets/char/defaultF/face_f_b_hair2_p.png', { frameWidth: 48, frameHeight: 48 });

        this.load.image('face_2_b_hair3_1', 'assets/char/defaultF/face_f_b_hair3_w.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair3_2', 'assets/char/defaultF/face_f_b_hair3_d.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair3_3', 'assets/char/defaultF/face_f_b_hair3_b.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair3_4', 'assets/char/defaultF/face_f_b_hair3_u.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('face_2_b_hair3_5', 'assets/char/defaultF/face_f_b_hair3_p.png', { frameWidth: 48, frameHeight: 48 });

        
        this.load.spritesheet('anim_1_b_hair0_1', 'assets/char/anim/anim_m_hair0.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair0_1', 'assets/char/anim/anim_f_hair0.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('anim_1_b_hair1_1', 'assets/char/anim/anim_m_b_hair1_w.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_1_b_hair1_2', 'assets/char/anim/anim_m_b_hair1_d.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_1_b_hair1_3', 'assets/char/anim/anim_m_b_hair1_y.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_1_b_hair1_4', 'assets/char/anim/anim_m_b_hair1_b.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_1_b_hair1_5', 'assets/char/anim/anim_m_b_hair1_g.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('anim_1_b_hair2_1', 'assets/char/anim/anim_m_b_hair2_w.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_1_b_hair2_2', 'assets/char/anim/anim_m_b_hair2_d.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_1_b_hair2_3', 'assets/char/anim/anim_m_b_hair2_y.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_1_b_hair2_4', 'assets/char/anim/anim_m_b_hair2_b.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_1_b_hair2_5', 'assets/char/anim/anim_m_b_hair2_g.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('anim_1_b_hair3_1', 'assets/char/anim/anim_m_b_hair3_w.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_1_b_hair3_2', 'assets/char/anim/anim_m_b_hair3_d.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_1_b_hair3_3', 'assets/char/anim/anim_m_b_hair3_y.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_1_b_hair3_4', 'assets/char/anim/anim_m_b_hair3_b.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_1_b_hair3_5', 'assets/char/anim/anim_m_b_hair3_g.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('anim_2_b_hair1_1', 'assets/char/anim/anim_f_b_hair1_w.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair1_2', 'assets/char/anim/anim_f_b_hair1_d.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair1_3', 'assets/char/anim/anim_f_b_hair1_y.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair1_4', 'assets/char/anim/anim_f_b_hair1_b.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair1_5', 'assets/char/anim/anim_f_b_hair1_p.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('anim_2_b_hair2_1', 'assets/char/anim/anim_f_b_hair2_w.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair2_2', 'assets/char/anim/anim_f_b_hair2_d.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair2_3', 'assets/char/anim/anim_f_b_hair2_y.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair2_4', 'assets/char/anim/anim_f_b_hair2_b.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair2_5', 'assets/char/anim/anim_f_b_hair2_p.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('anim_2_b_hair3_1', 'assets/char/anim/anim_f_b_hair3_w.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair3_2', 'assets/char/anim/anim_f_b_hair3_d.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair3_3', 'assets/char/anim/anim_f_b_hair3_y.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair3_4', 'assets/char/anim/anim_f_b_hair3_b.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('anim_2_b_hair3_5', 'assets/char/anim/anim_f_b_hair3_p.png', { frameWidth: 64, frameHeight: 64 });
        
    }

    create() {
        this.anims.create({ key: 'anim_1_b_hair0_1', frames: this.anims.generateFrameNumbers('anim_1_b_hair0_1', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair0_1', frames: this.anims.generateFrameNumbers('anim_2_b_hair0_1', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });

        this.anims.create({ key: 'anim_1_b_hair1_1', frames: this.anims.generateFrameNumbers('anim_1_b_hair1_1', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_1_b_hair1_2', frames: this.anims.generateFrameNumbers('anim_1_b_hair1_2', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_1_b_hair1_3', frames: this.anims.generateFrameNumbers('anim_1_b_hair1_3', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_1_b_hair1_4', frames: this.anims.generateFrameNumbers('anim_1_b_hair1_4', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_1_b_hair1_5', frames: this.anims.generateFrameNumbers('anim_1_b_hair1_5', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });

        this.anims.create({ key: 'anim_1_b_hair2_1', frames: this.anims.generateFrameNumbers('anim_1_b_hair2_1', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_1_b_hair2_2', frames: this.anims.generateFrameNumbers('anim_1_b_hair2_2', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_1_b_hair2_3', frames: this.anims.generateFrameNumbers('anim_1_b_hair2_3', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_1_b_hair2_4', frames: this.anims.generateFrameNumbers('anim_1_b_hair2_4', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_1_b_hair2_5', frames: this.anims.generateFrameNumbers('anim_1_b_hair2_5', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });

        this.anims.create({ key: 'anim_1_b_hair3_1', frames: this.anims.generateFrameNumbers('anim_1_b_hair3_1', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_1_b_hair3_2', frames: this.anims.generateFrameNumbers('anim_1_b_hair3_2', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_1_b_hair3_3', frames: this.anims.generateFrameNumbers('anim_1_b_hair3_3', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_1_b_hair3_4', frames: this.anims.generateFrameNumbers('anim_1_b_hair3_4', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_1_b_hair3_5', frames: this.anims.generateFrameNumbers('anim_1_b_hair3_5', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });

        this.anims.create({ key: 'anim_2_b_hair1_1', frames: this.anims.generateFrameNumbers('anim_2_b_hair1_1', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair1_2', frames: this.anims.generateFrameNumbers('anim_2_b_hair1_2', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair1_3', frames: this.anims.generateFrameNumbers('anim_2_b_hair1_3', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair1_4', frames: this.anims.generateFrameNumbers('anim_2_b_hair1_4', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair1_5', frames: this.anims.generateFrameNumbers('anim_2_b_hair1_5', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });

        this.anims.create({ key: 'anim_2_b_hair2_1', frames: this.anims.generateFrameNumbers('anim_2_b_hair2_1', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair2_2', frames: this.anims.generateFrameNumbers('anim_2_b_hair2_2', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair2_3', frames: this.anims.generateFrameNumbers('anim_2_b_hair2_3', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair2_4', frames: this.anims.generateFrameNumbers('anim_2_b_hair2_4', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair2_5', frames: this.anims.generateFrameNumbers('anim_2_b_hair2_5', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });

        this.anims.create({ key: 'anim_2_b_hair3_1', frames: this.anims.generateFrameNumbers('anim_2_b_hair3_1', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair3_2', frames: this.anims.generateFrameNumbers('anim_2_b_hair3_2', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair3_3', frames: this.anims.generateFrameNumbers('anim_2_b_hair3_3', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair3_4', frames: this.anims.generateFrameNumbers('anim_2_b_hair3_4', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'anim_2_b_hair3_5', frames: this.anims.generateFrameNumbers('anim_2_b_hair3_5', { start: 0, end: 2 }), frameRate: 4, repeat: -1 });

        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background2');
        this.add.text(650, 50, 'Create your Character', { font: '24px Arial', fill: '#fff' }).setOrigin(0.5);

        var portrayText = 'face_1_b_hair0_1';
        var animText = 'anim_1_b_hair0_1';
        var portray = this.add.image(625, 310, portrayText);
        var animChar = this.add.sprite(420, 410, animText).setScale(2);

        animChar.play('anim_1_b_hair0_1', true);

        var btype = 1;
        var htype = 0;
        var hcolor = 1;

        const b_arrow_l = this.add.image(700, 200, 'arrow').setScale(0.02).setAngle(180).setInteractive();
        var btext = this.add.text(800, 200, 'Body: Type '+btype, { font: '18px Arial', fill: '#fff' }).setOrigin(0.5);
        const b_arrow_r = this.add.image(900, 200, 'arrow').setScale(0.02).setAngle(0).setInteractive();

        const h_arrow_l = this.add.image(700, 240, 'arrow').setScale(0.02).setAngle(180).setInteractive();
        var htext = this.add.text(800, 240, 'Hair: Type '+htype, { font: '18px Arial', fill: '#fff' }).setOrigin(0.5);
        const h_arrow_r = this.add.image(900, 240, 'arrow').setScale(0.02).setAngle(0).setInteractive();

        const c_arrow_l = this.add.image(700, 280, 'arrow').setScale(0.02).setAngle(180).setInteractive();
        var ctext = this.add.text(800, 280, 'Hair: Color '+hcolor, { font: '18px Arial', fill: '#fff' }).setOrigin(0.5);
        const c_arrow_r = this.add.image(900, 280, 'arrow').setScale(0.02).setAngle(0).setInteractive();

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        
        const button = this.add.image(800, 420, 'button').setInteractive();
        button.setScale(0.05);

        button.on('pointerdown', () => {
            this.anims.create({ key: 'created', frames: this.anims.generateFrameNumbers('anim_'+btype+'_b_hair'+htype+'_'+hcolor, { start: 15, end: 17 }), frameRate: 4, repeat: -1 });
            animChar.play('created', true);
            CharacterData = { btype: btype, htype: htype, hcolor: hcolor };
            sleep(1000).then(() => { this.scene.start('CharacterSelect', {CharacterData}); });
            //;
        });

        //Body Type
        b_arrow_l.on('pointerdown', () => {
            btype--;
            if(btype == 0) { btype = 2;};
            btext.setText('Body: Type '+btype);
            portrayText = 'face_'+btype+'_b_hair'+htype+'_'+hcolor;
            animText = 'anim_'+btype+'_b_hair'+htype+'_'+hcolor;
            portray.setTexture(portrayText);
            animChar.play(animText, true);
        });
        b_arrow_r.on('pointerdown', () => {
            btype++;
            if(btype == 3) { btype = 1;};
            btext.setText('Body: Type '+btype);
            portrayText = 'face_'+btype+'_b_hair'+htype+'_'+hcolor;
            animText = 'anim_'+btype+'_b_hair'+htype+'_'+hcolor;
            portray.setTexture(portrayText);
            animChar.play(animText, true);
        });

        //Hair Type
        h_arrow_l.on('pointerdown', () => {
            htype--;
            if (htype <= 0) { htype = 3;};
            htext.setText('Hair: Type '+htype);
            portrayText = 'face_'+btype+'_b_hair'+htype+'_'+hcolor;
            animText = 'anim_'+btype+'_b_hair'+htype+'_'+hcolor;
            portray.setTexture(portrayText);
            animChar.play(animText, true);
        });
        h_arrow_r.on('pointerdown', () => {
            htype++;
            if (htype == 4) { htype = 1;};
            htext.setText('Hair: Type '+htype);
            portrayText = 'face_'+btype+'_b_hair'+htype+'_'+hcolor;
            animText = 'anim_'+btype+'_b_hair'+htype+'_'+hcolor;
            portray.setTexture(portrayText);
            animChar.play(animText, true);
        });

        //Hair Color
        c_arrow_l.on('pointerdown', () => {
            hcolor--;
            if (hcolor == 0) { hcolor = 5; };
            ctext.setText('Hair : Color '+hcolor);
            portrayText = 'face_'+btype+'_b_hair'+htype+'_'+hcolor;
            animText = 'anim_'+btype+'_b_hair'+htype+'_'+hcolor;
            portray.setTexture(portrayText);
            animChar.play(animText, true);
        });
        c_arrow_r.on('pointerdown', () => {
            hcolor++;
            if (hcolor == 6) { hcolor = 1; };
            ctext.setText('Hair: Color '+hcolor);
            portrayText = 'face_'+btype+'_b_hair'+htype+'_'+hcolor;
            animText = 'anim_'+btype+'_b_hair'+htype+'_'+hcolor;
            portray.setTexture(portrayText);
            animChar.play(animText, true);
        });
        
    }
}