export default {
    resizeIfWideScreen(canvas) {
        if (wideScreen) {
            canvas.style = `max-width: ${window.innerWidth}px; max-height: ${window.innerHeight / 2.5}px`;
        }
    },
    createText(ctx, x, y, text, family = 'Fredoka One', size, color = '#fff') {
        const t = ctx.add.text(x, y, text, { fontFamily: family, fontSize: size, fill: color });
        t.setShadow(7, 7, 'rgba(0,0,0,0.8)', 15, true);
        return t;
    },
    activate(elem, scaleDown, scaleUp, game, scene) {
        elem.setInteractive().on('pointerdown', function() {
            this.setScale(scaleDown);
        });
        elem.setInteractive().on('pointerup', function() {
            this.setScale(scaleUp);
            game.scene.start(scene);
        });
    }
};