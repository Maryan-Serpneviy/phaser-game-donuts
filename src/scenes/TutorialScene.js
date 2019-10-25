import Image from '../scripts/images';
import Const from '../scripts/constants';
import Util from '../scripts/utils';

export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super({key: 'TutorialScene'});
    }

    preload() {
        this.load.image('background', Image.background);
    }

    create() {
        const SCREEN_WIDTH = this.game.scale.gameSize._width;
        const SCREEN_HEIGHT = this.game.scale.gameSize._height;

        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.displayWidth = window.innerWidth;
        bg.displayHeight = window.innerHeight;

        const tutorial = Util.createText(this, null, 0, 'TUTORIAL', Const.FONT, Const.SIZE.TITLE);
        tutorial.x = SCREEN_WIDTH / 2 - tutorial.width / 2;
        
        const tutText =  Util.createText(this, 0, null, Const.TUT_CONTENT, Const.FONT, Const.SIZE.CONTENT)
        tutText.y = SCREEN_HEIGHT / 2 - tutText.height / 2;

        const back = Util.createText(this, null, SCREEN_HEIGHT - 125, 'TITLE SCREEN', Const.FONT, Const.SIZE.GOTO);
        back.x = SCREEN_WIDTH / 2 - back.width / 2;

        Util.activate(back, Const.COEF.POINTER, 1, this, 'TitleScene');
    }
}