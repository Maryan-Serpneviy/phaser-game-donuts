import Phaser from 'phaser';
import Image from '../scripts/images';

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

        const LOGO_PAD_X = 0.05;
        const LOGO_PAD_Y = 0.05;
        const LOGO_SCALE = 1.45;
        const logo = this.add.image(SCREEN_WIDTH * LOGO_PAD_X, SCREEN_HEIGHT * LOGO_PAD_Y, 'logo')
            .setOrigin(0, 0).setScale(LOGO_SCALE)
        const logoOffsetY = logo.height * LOGO_SCALE + logo.y
        
        const DONUT_PAD = 0.125;
        const DONUT_SCALE = 1.25;
        const donutShadow = this.add.image(SCREEN_WIDTH * DONUT_PAD, logoOffsetY + 20, 'big-shadow')
            .setOrigin(0, 0).setScale(DONUT_SCALE);

        const donut = this.add.image(donutShadow.x, donutShadow.y, 'donut')
            .setOrigin(0, 0).setScale(DONUT_SCALE);
        const donutOffsetY = donut.height * DONUT_SCALE + donut.y;
        console.log(logoOffsetY, donutOffsetY)
        const PLAY_SCALE = 2;
        const play = this.add.image(SCREEN_WIDTH / 2, donutOffsetY + 230, 'btn-play')
            .setScale(PLAY_SCALE);
        
        const SFX_SCALE = 0.8;
        const sfx = this.add.image(SCREEN_WIDTH - 150, SCREEN_HEIGHT - 150, 'btn-sfx')
            .setOrigin(0, 0).setScale(SFX_SCALE);

        const TUTORIAL_SCALE = 5;
        const tutorial = this.add.text(SCREEN_WIDTH / 5, SCREEN_HEIGHT - 125, 'HOW TO PLAY', { fontFamily: 'Fredoka One' })
            .setScale(TUTORIAL_SCALE)
    }
}