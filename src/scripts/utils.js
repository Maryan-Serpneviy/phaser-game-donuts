export default {
    createText(ctx, x, y, text, family, size) {
        const t = ctx.add.text(x, y, text, { fontFamily: family, fontSize: size });
        t.setShadow(5, 5, 'rgba(0,0,0,0.8)', 15, true);
        return t;
    }
}