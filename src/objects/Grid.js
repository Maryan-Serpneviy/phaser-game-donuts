import Const from '../utils/constants';

export default class Grid {
    constructor(rows, cols, types, size) {
        this.rows = rows;
        this.cols = cols;
        this.types = types;
        this.size = size;
    }

    createGrid(ctx) {
        this.grid = [];
        for (let r = 0; r < this.rows; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.cols; c++) {
                this.renderCell(ctx, r, c);
            }
        }
    }

    renderCell(ctx, r, c) {
        let x = 110 + c * this.size;
        let y = this.size * 1.8 + r * this.size;
        const randomType = Math.ceil(Math.random() * this.types);
        const cell = ctx.add.image(x, y, `gem-${randomType}`).setScale(Const.SCALE.GEM);
        ctx.tweens.add({
            targets: cell,
            alpha: 1,
            duration: 200,
            callbackScope: ctx
        });
        cell.alpha = 0.25;
        this.grid[r][c] = randomType;
    }
}
