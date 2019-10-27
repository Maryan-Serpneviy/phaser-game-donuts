import Phaser from 'phaser';

import TitleScene from './scenes/TitleScene';
import TutorialScene from './scenes/TutorialScene';
import GameScene from './scenes/GameScene';

const titleScene = new TitleScene();
const tutorialScene = new TutorialScene();
const gameScene = new GameScene();

const config = {
  mode: Phaser.Scale.RESIZE,
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: window.devicePixelRatio,
  physics: {
    default: 'arcade'
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.start('TitleScene');
game.scene.add('TutorialScene', tutorialScene);
game.scene.add('GamsScene', gameScene);
// game.scene.start('GameScene');

function preload() {

}

function create() {

}

function update() {
  
}