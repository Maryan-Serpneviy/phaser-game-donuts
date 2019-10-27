import Const from '../utils/constants';
import Util from '../utils/utils';
import Image from '../utils/images';

export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TutorialScene' });
    }

    preload() {
        this.load.image('hand', Image.hand);
        this.load.image('background', Image.background);
    }

    create() {
        Util.resizeIfWideScreen(this.game.canvas);

        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.displayWidth = window.innerWidth;
        bg.displayHeight = window.innerHeight;

        const tutorial = Util.createText(this, null, 0, 'TUTORIAL', Const.FONT, Const.SIZE.TITLE);
        tutorial.x = window.innerWidth / 2 - tutorial.width / 2;

        const tutContent = Util.createText(this, null, null, Const.TUT_CONTENT, Const.FONT, Const.SIZE.CONTENT);
        tutContent.x = window.innerWidth / 2 - tutContent.width / 2;
        tutContent.y = window.innerHeight / 2 - tutContent.height / 2;

        const goBack = Util.createText(this, null, window.innerHeight - 125, 'TITLE SCREEN', Const.FONT, Const.SIZE.GOTO);
        goBack.x = window.innerWidth / 2 - goBack.width / 2;

        Util.activate(goBack, Const.COEF.POINTER, 1, this, 'TitleScene');
    }
}