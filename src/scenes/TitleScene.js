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
        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.displayWidth = window.innerWidth;
        bg.displayHeight = window.innerHeight;

        const logo = this.add.image(null, window.innerHeight * Const.LOGO_PAD_Y, 'logo').setOrigin(0, 0)
        const logoScale = Util.getElemSize(Const.SCALE.MOB.LOGO, Const.SCALE.DESC.LOGO);
        logo.setScale(logoScale);
        logo.x = window.innerWidth / 2 - logo.width * logoScale / 2;
        const logoOffsetY = logo.height * logoScale + logo.y;
        
        const donutShadow = this.add.image(null, logoOffsetY + 20, 'big-shadow').setOrigin(0, 0);
        const donutScale = Util.getElemSize(Const.SCALE.MOB.DONUT, Const.SCALE.DESC.DONUT);
        donutShadow.setScale(donutScale);
        donutShadow.x = window.innerWidth / 2 - donutShadow.width * donutScale / 2;
        const donutOffsetY = (donutShadow.height * donutScale + donutShadow.y) + logo.y;
        
        this.add.image(donutShadow.x, donutShadow.y, 'donut').setOrigin(0, 0).setScale(donutScale);

        const play = this.add.image(window.innerWidth / 2, donutOffsetY + 20, 'btn-play');
        const playScale = Util.getElemSize(Const.SCALE.MOB.PLAY, Const.SCALE.DESC.PLAY);
        play.setScale(playScale);
        const playOffsetY = (play.height * playScale + play.y);

        const tutorialSize = Util.getElemSize(Const.SIZE.MOB.GOTO, Const.SIZE.DESC.GOTO);
        const tutorial = Util.createText(this, null, playOffsetY - 50, 'HOW TO PLAY', Const.FONT, tutorialSize);
        tutorial.x = window.innerWidth / 2 - tutorial.width / 2;

        const sfx = this.add.image(window.innerWidth / 2 + play.width * playScale, donutOffsetY - 100, 'btn-sfx');
        const sfxScale = Util.getElemSize(Const.SCALE.MOB.SFX, Const.SCALE.DESC.SFX);
        sfx.setScale(sfxScale);

        Util.activate(play, playScale * Const.COEF.POINTER, playScale, this, 'TutorialScene');
        Util.activate(tutorial, Const.COEF.POINTER, 1, this, 'TutorialScene');
        Util.activate(sfx, sfxScale * Const.COEF.POINTER, sfxScale);
    }
}