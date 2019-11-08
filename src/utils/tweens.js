import Const from './constants';

export default {
    swap: {
        invalid(d1, d2) {
            this.tweens.add({
                targets: d2,
                x: d1.x,
                y: d1.y,
                duration: 400,
                ease: 'Back',
                yoyo: true,
                rotation: 40,
                callbackScope: this
            });
        },

        valid(d1, d2, after) {
            this.tweens.add({
                targets: d2,
                x: d1.x,
                y: d1.y,
                duration: 400,
                ease: 'Elastic',
                rotation: 40,
                callbackScope: this,
                onComplete: () => {
                    if (after) {
                        after.call(this);
                    }
                }
            });
        }
    },
    descend(cell, destroyed) {
        this.tweens.add({
            targets: cell.image,
            y: cell.image.y + Const.GAME.GEMH * destroyed,
            duration: 400,
            ease: 'Elastic',
            rotation: 40,
            callbackScope: this
        });
    },
    render(cell) {
        this.tweens.add({
            targets: cell.image,
            scaleX: Const.SCALE.GEM,
            scaleY: Const.SCALE.GEM,
            delay: 250,
            duration: 250,
            ease: 'Linear',
            callbackScope: this
        });
    }
};