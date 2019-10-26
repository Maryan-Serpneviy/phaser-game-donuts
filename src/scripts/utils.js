export default {
    createText(ctx, x, y, text, family, size, color = '#fff') {
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
    },
    getElemSize(mobScale, deskScale) {
        const isMobile = window.innerHeight / window.innerWidth > 1;
        return isMobile ? mobScale : deskScale;
    }
}