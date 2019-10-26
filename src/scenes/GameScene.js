import Image from '../scripts/images';
import Const from '../scripts/constants';
import Util from '../scripts/utils';
import Timer from '../objects/Timer';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('hand', Image.hand);
        this.load.image('background', Image.background);
        this.load.image('score', Image.score);
        this.load.image('timer', Image.timer);
        this.load.image('timeup',Image.timeUp);

        this.load.image('shadow', Image.shadow);
        this.load.image('gem-01', Image.gem1);
        this.load.image('gem-02', Image.gem2);
        this.load.image('gem-03', Image.gem3);
        this.load.image('gem-04', Image.gem4);
        this.load.image('gem-05', Image.gem5);
        this.load.image('gem-06', Image.gem6);

        this.load.image('gem-11', Image.gem11);
        this.load.image('gem-12', Image.gem12);
    }

    create() {
        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.displayWidth = window.innerWidth;
        bg.displayHeight = window.innerHeight;

        const scoreBox = this.add.image(null, 0, 'score').setOrigin(0, 0).setScale(Const.SCALE.MOB.SCORE);
        scoreBox.x = window.innerWidth / 2 - scoreBox.width - 35;
        const timerBox = this.add.image(window.innerWidth / 2, 0, 'timer').setOrigin(0, 0).setScale(Const.SCALE.MOB.SCORE);
        timerBox.x = window.innerWidth - scoreBox.width - 35;

        this.scoreLabel = Util.createText(this, null, 65, '0', Const.FONT, Const.SIZE.MOB.SCORE);
        this.scoreLabel.x = window.innerWidth / 2 - scoreBox.width / 2;
        this.timerLabel = Util.createText(this, null, 65, Timer().formatTime(Const.TIMER_VAL), Const.FONT, Const.SIZE.MOB.SCORE);
        this.timerLabel.x = window.innerWidth / 2 + 135;

        Timer(this, this.timerLabel, Const.TIMER_VAL).initTimer();
    }
}