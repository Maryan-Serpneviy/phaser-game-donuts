import Phaser from 'phaser';
import Image from '../scripts/images';
import Const from '../scripts/constants';
import '../assets/fonts/fonts.css';

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

        const donut = this.add.image(donutShadow.x, donutShadow.y, 'donut')
            .setOrigin(0, 0).setScale(Const.TITLE.SCALE.DONUT);
        const donutOffsetY = donut.height * Const.TITLE.SCALE.DONUT + donut.y;

        this.add.image(SCREEN_WIDTH / 2, donutOffsetY + 230, 'btn-play').setScale(Const.TITLE.SCALE.PLAY);
        
        this.add.image(SCREEN_WIDTH - 130, SCREEN_HEIGHT - 150, 'btn-sfx')
            .setOrigin(0, 0).setScale(Const.TITLE.SCALE.SFX);

        createText(this, SCREEN_WIDTH / 5, SCREEN_HEIGHT - 125, 'HOW TO PLAY', 'cursive', '80px');
    }
}

function createText(ctx, x, y, text, family, size) {
    const t = ctx.add.text(x, y, text, { fontFamily: family, fontSize: size });
    t.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15, true);
    return t;
}