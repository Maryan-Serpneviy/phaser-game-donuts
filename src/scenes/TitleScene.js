import Const from '../utils/constants';
import Util from '../utils/utils';
import Image from '../utils/images';

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        this.load.image('hand', Image.hand);
        this.load.image('background', Image.background);
        this.load.image('logo', Image.logo);
        this.load.image('btn-play', Image.btnPlay);
        this.load.image('btn-sfx', Image.btnSfx);
        this.load.image('big-shadow', Image.bigShadow);
        this.load.image('donut', Image.donut);
    }

    create() {
        Util.resizeIfWideScreen(this.game.canvas);

        const handCursor = "url('../src/assets/images/game/hand.png'), pointer";
        this.game.input.setDefaultCursor(handCursor);

        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.displayWidth = window.innerWidth;
        bg.displayHeight = window.innerHeight;

        const logo = this.add.image(null, window.innerHeight * 0.05, 'logo')
            .setOrigin(0, 0).setScale(Const.SCALE.LOGO);
        logo.x = window.innerWidth / 2 - logo.width * Const.SCALE.LOGO / 2;
        const logoOffsetY = logo.height * Const.SCALE.LOGO + logo.y;

        const donutShadow = this.add.image(null, logoOffsetY + 20, 'big-shadow')
            .setOrigin(0, 0).setScale(Const.SCALE.DONUT);
        donutShadow.x = window.innerWidth / 2 - donutShadow.width * Const.SCALE.DONUT / 2;
        const donutOffsetY = donutShadow.height * Const.SCALE.DONUT + donutShadow.y + logo.y;

        this.add.image(donutShadow.x, donutShadow.y, 'donut').setOrigin(0, 0).setScale(Const.SCALE.DONUT);

        const play = this.add.image(window.innerWidth / 2, donutOffsetY + 50, 'btn-play').setScale(Const.SCALE.PLAY);
        const playOffsetY = play.height * Const.SCALE.PLAY + play.y;

        const tutorial = Util.createText(this, null, playOffsetY - 50, 'HOW TO PLAY', Const.FONT, Const.SIZE.GOTO);
        tutorial.x = window.innerWidth / 2 - tutorial.width / 2;

        const sfx = this.add.image(window.innerWidth / 2 + play.width * Const.SCALE.PLAY, donutOffsetY, 'btn-sfx');
        sfx.setScale(Const.SCALE.SFX);

        Util.activate(play, Const.SCALE.PLAY * Const.COEF.POINTER, Const.SCALE.PLAY, this, 'GameScene');
        Util.activate(tutorial, Const.COEF.POINTER, 1, this, 'TutorialScene');
        Util.activate(sfx, Const.SCALE.SFX * Const.COEF.POINTER, Const.SCALE.SFX);
    }
}