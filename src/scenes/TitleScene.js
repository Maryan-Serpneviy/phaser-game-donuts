import Image from '../scripts/images';
import Const from '../scripts/constants';
import Util from '../scripts/utils';

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
        let res = SCREEN_HEIGHT / SCREEN_WIDTH;

        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.displayWidth = window.innerWidth;
        bg.displayHeight = window.innerHeight;

        const logo = this.add.image(null, SCREEN_HEIGHT * Const.LOGO_PAD_Y, 'logo')
            .setOrigin(0, 0).setScale(Const.SCALE.LOGO);
        logo.x = SCREEN_WIDTH / 2 - logo.width * Const.SCALE.LOGO / 2;
        const logoOffsetY = logo.height * Const.SCALE.LOGO + logo.y
        
        const donutShadow = this.add.image(null, logoOffsetY + 20, 'big-shadow').setOrigin(0, 0);
        const donutScale = (SCREEN_HEIGHT - donutShadow.width) * Const.COEF.DONUT;
        donutShadow.setScale(donutScale);
        donutShadow.x = SCREEN_WIDTH / 2 - donutShadow.width * donutScale / 2;
        
        this.add.image(donutShadow.x, donutShadow.y, 'donut').setOrigin(0, 0).setScale(donutScale);

        const play = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT - 350, 'btn-play');
        const playScale = (SCREEN_HEIGHT - play.width) * Const.COEF.PLAY;
        play.setScale(playScale);
        
        const sfx = this.add.image(SCREEN_WIDTH - 130, SCREEN_HEIGHT - 135, 'btn-sfx')
            .setOrigin(0, 0).setScale(Const.SCALE.SFX);

        const tutorial = Util.createText(this, null, SCREEN_HEIGHT - 125, 'HOW TO PLAY', Const.FONT, Const.SIZE.GOTO);
        tutorial.x = SCREEN_WIDTH / 2 - tutorial.width / 2;

        Util.activate(play, playScale * Const.COEF.POINTER, playScale, this, 'TutorialScene');
        Util.activate(tutorial, Const.COEF.POINTER, 1, this, 'TutorialScene');
        Util.activate(sfx, Const.SCALE.SFX * Const.COEF.POINTER, Const.SCALE.SFX);
    }
}