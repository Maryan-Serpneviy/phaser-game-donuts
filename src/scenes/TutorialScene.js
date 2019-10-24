import Image from '../scripts/images';
import Const from '../scripts/constants';

export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super({key: 'TutorialScene'});
    }

    preload() {
        // this.load.image('background', Image.background);
    }

    create() {
        const SCREEN_WIDTH = this.game.scale.gameSize._width;
        const SCREEN_HEIGHT = this.game.scale.gameSize._height;

        // const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        // bg.displayWidth = window.innerWidth;
        // bg.displayHeight = window.innerHeight;
        
    }
}