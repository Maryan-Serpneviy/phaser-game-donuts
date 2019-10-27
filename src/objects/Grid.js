import Const from '../utils/constants';

export const Grid = {
    generateGrid() {
        this.grid = [];
        for (let r = 0; r < Const.BOARD.ROWS; r++) {
            this.grid[r] = [];
            for (let c = 0; c < Const.BOARD.COLS; c++) {
                Grid.renderCell(r, c, this);
            }
        }
    },

    renderCell(r, c, thisArg) {
        let x = Const.BOARD.PAD_X + c * Const.BOARD.SIZE_X;
        let y = Const.BOARD.PAD_Y + r * Const.BOARD.SIZE_X;
        const randomType = Math.ceil(Math.random() * Const.BOARD.TYPES);
        const gem = thisArg.add.image(x, y, `gem-${randomType}`).setScale(Const.SCALE.GEM);
        thisArg.tweens.add({
            targets: gem,
            alpha: 1,
            duration: 200,
            callbackScope: thisArg
        });
        gem.alpha = 0.25;
        thisArg.grid[r][c] = {
            type: randomType,
            image: gem, // add reference to spicific gem for replacing if match
            coords: [r, c] // coords for replace
        };
    }
};
