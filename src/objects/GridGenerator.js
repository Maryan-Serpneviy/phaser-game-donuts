import Const from '../utils/constants';

export const GridGenerator = {
    matchMakers: [],
    generateGrid(game) {
        game.grid = [];
        this.game = game;
        this.grid = game.grid;

        for (let r = 0; r < Const.BOARD.ROWS; r++) {
            this.grid.push(new Array(Const.BOARD.COLS));
            for (let c = 0; c < Const.BOARD.COLS; c++) {
                while (this.matchRow(r, c) || this.matchCol(r, c)) {
                    if (this.grid[r][c]) {
                        this.matchMakers.push(this.grid[r][c]);
                    }
                    this._renderCell(r, c);
                }
            }
        }
        this._destroyMatches();
    },

    _renderCell(r, c) {
        const x = Const.BOARD.PAD_X + c * Const.BOARD.SIZE_X;
        const y = Const.BOARD.PAD_Y + r * Const.BOARD.SIZE_X;
        const randomType = Math.ceil(Math.random() * Const.BOARD.TYPES);
        const gem = this.game.add.image(x, y, `gem-${randomType}`).setScale(Const.SCALE.GEM);
        this.game.tweens.add({
            targets: gem,
            alpha: 1,
            duration: 200,
            callbackScope: this.game
        });
        gem.alpha = 0.25;
        this.grid[r][c] = {
            type: randomType,
            image: gem, // add reference to spicific gem for replacing if match
            gridCoords: { r, c }, // coords for replace
            x: x,
            y: y
        };
        this.grid[r][c].image.setInteractive().on('pointerdown', setSelected);

        function setSelected() {
            this.scene.selected = this;
        }
    },

    matchRow(r, c) {
        if (this._isWithinRrid(r, c) === this._isWithinRrid(r, c - 1) &&
            this._isWithinRrid(r, c) === this._isWithinRrid(r, c - 2) ||
            this._isWithinRrid(r, c) === this._isWithinRrid(r, c + 1) &&
            this._isWithinRrid(r, c) === this._isWithinRrid(r, c + 2) ||
            this._isWithinRrid(r, c) === this._isWithinRrid(r, c - 1) &&
            this._isWithinRrid(r, c) === this._isWithinRrid(r, c + 1)) {
                return true;
        }
        return false;
    },

    matchCol(r, c) {
        if (this._isWithinRrid(r, c) === this._isWithinRrid(r - 1, c) &&
            this._isWithinRrid(r, c) === this._isWithinRrid(r - 2, c) ||
            this._isWithinRrid(r, c) === this._isWithinRrid(r + 1, c) &&
            this._isWithinRrid(r, c) === this._isWithinRrid(r + 2, c) ||
            this._isWithinRrid(r, c) === this._isWithinRrid(r - 1, c) &&
            this._isWithinRrid(r, c) === this._isWithinRrid(r + 1, c)) {
                return true;
        }
        return false;
    },

    _isWithinRrid(r, c) {
        if (r >= 0 && r < Const.BOARD.ROWS &&
            c >= 0 && c < Const.BOARD.COLS &&
            this.grid[r] !== undefined &&
            this.grid[r][c] !== undefined) {
            return this.grid[r][c].type;
        }
        return false;
    },

    _destroyMatches() {
        for (let i = 0; i < this.matchMakers.length; i++) {
            this.matchMakers[i].image.destroy();
        }
    }
};
