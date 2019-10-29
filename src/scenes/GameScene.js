import Image from '../utils/images';
import Const from '../utils/constants';
import Util from '../utils/utils';
import { Timer } from '../objects/Timer';
import { GridGenerator } from '../objects/GridGenerator';
import { MatchFinder } from '../objects/MatchFinder';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('hand', Image.hand);
        this.load.image('background', Image.background);
        this.load.image('score', Image.score);
        this.load.image('timer', Image.timer);
        this.load.image('timeup', Image.timeUp);

        this.load.image('shadow', Image.shadow);
        this.load.image('gem-1', Image.gem1);
        this.load.image('gem-2', Image.gem2);
        this.load.image('gem-3', Image.gem3);
        this.load.image('gem-4', Image.gem4);
        this.load.image('gem-5', Image.gem5);
        this.load.image('gem-6', Image.gem6);

        this.load.image('gem-7', Image.gem11);
        this.load.image('gem-8', Image.gem12);
    }

    create() {
        Util.resizeIfWideScreen(this.game.canvas);

        const handCursor = "url('../src/assets/images/game/hand.png'), pointer";
        this.game.input.setDefaultCursor(handCursor);

        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.displayWidth = window.innerWidth;
        bg.displayHeight = window.innerHeight;

        const scoreBox = this.add.image(null, 0, 'score').setOrigin(0, 0).setScale(Const.SCALE.SCORE);
        scoreBox.x = window.innerWidth / 2 - scoreBox.width - 35;
        const timerBox = this.add.image(null, 0, 'timer').setOrigin(0, 0).setScale(Const.SCALE.SCORE);
        timerBox.x = window.innerWidth / 2 - 75;

        this.scoreLabel = Util.createText(this, null, 70, '0', Const.FONT, Const.SIZE.SCORE);
        this.scoreLabel.x = window.innerWidth / 2 - scoreBox.width / 2;
        this.timerLabel = Util.createText(this, null, 70, Timer.formatTime(Const.TIMER_INIT), Const.FONT, Const.SIZE.SCORE);
        this.timerLabel.x = window.innerWidth / 2 + 132;

        Timer.initTimer.call(this, this.timerLabel);
        GridGenerator.generateGrid(this);

        this.matchingCells = [];
        this.prev = null;

        this.input.on('pointerdown', this.donutPicker, this);
    }

    donutPicker() {
        // if selected isn't part of match - clear
        if (this.prev) {
            this.prev.setScale(Const.SCALE.GEM);
        }
        // get selected coords
        const donutCoords = this.getDonutGridCoords(this.selected.x, this.selected.y);
        if (this.matchingCells.length) {
            const matches = [...new Set(this.matchingCells)];
            for (let m = 0; m < matches.length; m++) {
                if (this.selected.x === matches[m].x && this.selected.y === matches[m].y) {
                    console.log('swap')
                }
            }
            // if selected isn't part of match clear matches
            this.matchingCells = [];
            console.log('clear');
        }
        // get matching cells
        MatchFinder.isMakingMatch.call(this, donutCoords.r, donutCoords.c);

        // cache previous select
        this.prev = this.selected;
        // scale if makes match
        if (this.matchingCells.length) {
            this.selected.setScale(Const.SCALE.GEM * Const.COEF.GEM_ACTIVE);
        }
    }

    getDonutGridCoords(x, y) {
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                if (this.grid[r][c].x === x && this.grid[r][c].y === y) {
                    return this.grid[r][c].gridCoords;
                }
            }
        }
    }

    getSelected(x, y) {
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                if (this.grid[r][c].x === x && this.grid[r][c].y === y) {
                    return this.grid[r][c];
                }
            }
        }
    }
}