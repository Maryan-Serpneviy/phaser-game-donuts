import Phaser from 'phaser';
import Image from './scripts/images';
import TitleScene from './scenes/TitleScene';
import TutorialScene from './scenes/TutorialScene';

const titleScene = new TitleScene();
const tutorialScene = new TutorialScene();

const config = {
  mode: Phaser.Scale.RESIZE,
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: window.devicePixelRatio,
  physics: {
    default: 'arcade',
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

function preload() {
  this.load.image('score', Image.score);
  this.load.image('timeup',Image.timeUp);

  this.load.image('gem-01', Image.gem1);
  this.load.image('gem-02', Image.gem2);
  this.load.image('gem-03', Image.gem3);
  this.load.image('gem-04', Image.gem4);
  this.load.image('gem-05', Image.gem5);
  this.load.image('gem-06', Image.gem6);
  this.load.image('gem-07', Image.gem7);
  this.load.image('gem-08', Image.gem8);
  this.load.image('gem-09', Image.gem9);
  this.load.image('gem-10', Image.gem10);
  this.load.image('gem-11', Image.gem11);
  this.load.image('gem-12', Image.gem12);
  this.load.image('hand', Image.hand);
  this.load.image('shadow', Image.shadow);

  this.load.image('particle-ex1', Image.particle_ex1);
  this.load.image('particle-ex2', Image.particle_ex2);
  this.load.image('particle-ex3', Image.particle_ex3);
  this.load.image('particle-1', Image.particle1);
  this.load.image('particle-2', Image.particle2);
  this.load.image('particle-3', Image.particle3);
  this.load.image('particle-4', Image.particle4);
  this.load.image('particle-5', Image.particle5);
}

function create() {
  
}

function update() {

}
