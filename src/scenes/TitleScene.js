import Image from '../scripts/images';
import Const from '../scripts/constants';
import TutorialScene from './TutorialScene';

const tutorialScene = new TutorialScene();

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({key: 'TitleScene'});
    }

    preload() {
        this.load.image('background', Image.background);
        this.load.image('logo', Image.logo);
        this.load.image('btn-play', Image.btnPlay);
        this.load.image('btn-sfx', Image.btnSfx);
        this.load.image('big-shadow', Image.bigShadow);
        this.load.image('donut', Image.donut);
    }

    create() {
        const SCREEN_WIDTH = this.game.scale.gameSize._width;
        const SCREEN_HEIGHT = this.game.scale.gameSize._height;

        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.displayWidth = window.innerWidth;
        bg.displayHeight = window.innerHeight;

        const logo = this.add.image(null, SCREEN_HEIGHT * Const.TITLE.LOGO_PAD_Y, 'logo')
            .setOrigin(0, 0).setScale(Const.TITLE.SCALE.LOGO);
        logo.x = SCREEN_WIDTH / 2 - this.children.list[1].width * Const.TITLE.SCALE.LOGO / 2;
        const logoOffsetY = logo.height * Const.TITLE.SCALE.LOGO + logo.y
        
        const donutShadow = this.add.image(null, logoOffsetY + 20, 'big-shadow')
            .setOrigin(0, 0).setScale(Const.TITLE.SCALE.DONUT);
        donutShadow.x = SCREEN_WIDTH / 2 - this.children.list[2].width * Const.TITLE.SCALE.DONUT / 2;

        this.add.image(donutShadow.x, donutShadow.y, 'donut')
            .setOrigin(0, 0).setScale(Const.TITLE.SCALE.DONUT);
        const play = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT - 350, 'btn-play').setScale(Const.TITLE.SCALE.PLAY);

        activatePlayBtn(play);
        
        const sfx = this.add.image(SCREEN_WIDTH - 130, SCREEN_HEIGHT - 135, 'btn-sfx')
            .setOrigin(0, 0).setScale(Const.TITLE.SCALE.SFX);

        const TUTORIAL_WIDTH = 278;
        const tutorial = createText(this, SCREEN_WIDTH / 2 - TUTORIAL_WIDTH, SCREEN_HEIGHT - 125, 'HOW TO PLAY', 'Fredoka One', '80px');

        tutorial.setInteractive().on('pointerdown', () => {
            console.log('start tutorial scene');
            this.scene.start(tutorialScene);
        }, this);
    }
}

function createText(ctx, x, y, text, family, size) {
    const t = ctx.add.text(x, y, text, { fontFamily: family, fontSize: size });
    t.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15, true);
    return t;
}

function activatePlayBtn(btn) {
    btn.setInteractive().on('pointerdown', function() {
        this.setScale(Const.TITLE.SCALE.PLAY * 1.075);
    });
    btn.setInteractive().on('pointerup', function() {
        console.log('start game');
        this.setScale(Const.TITLE.SCALE.PLAY);
    });
}