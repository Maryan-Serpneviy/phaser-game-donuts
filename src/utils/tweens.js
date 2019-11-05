export default {
    tweeenSwap(d1, d2) {
        this.tweens.add({
            targets: d2,
            x: d1.x,
            y: d1.y,
            duration: 400,
            ease: 'Elastic',
            rotation: 40,
            callbackScope: this
        });
    }
}