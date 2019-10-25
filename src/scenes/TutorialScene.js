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
        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.displayWidth = window.innerWidth;
        bg.displayHeight = window.innerHeight;

        const tutorialSize = Util.getElemSize(Const.SIZE.MOB.TITLE, Const.SIZE.DESC.TITLE);
        const tutorial = Util.createText(this, null, 0, 'TUTORIAL', Const.FONT, tutorialSize);
        tutorial.x = window.innerWidth / 2 - tutorial.width / 2;
        
        const tutContentSize = Util.getElemSize(Const.SIZE.MOB.CONTENT, Const.SIZE.DESC.CONTENT);
        const tutContent =  Util.createText(this, null, null, Const.TUT_CONTENT, Const.FONT, tutContentSize)
        tutContent.x = window.innerWidth / 2 - tutContent.width / 2;
        tutContent.y = window.innerHeight / 2 - tutContent.height / 2;

        const goBackSize = Util.getElemSize(Const.SIZE.MOB.GOTO, Const.SIZE.DESC.GOTO);
        const goBack = Util.createText(this, null, window.innerHeight - 125, 'TITLE SCREEN', Const.FONT, goBackSize);
        goBack.x = window.innerWidth / 2 - goBack.width / 2;

        Util.activate(goBack, Const.COEF.POINTER, 1, this, 'TitleScene');
    }
}