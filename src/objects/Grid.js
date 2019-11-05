import Const from '../utils/constants';

export const Grid = {
    matchMakers: [],
    destroyedPerCol: new Array(Const.GRID.COLS),

    renderGrid(game = this) {
        game.grid = [];
        this.game = game;
        this.grid = game.grid;

        for (let r = 0; r < Const.GRID.ROWS; r++) {
            this.grid.push(new Array(Const.GRID.COLS));
            for (let c = 0; c < Const.GRID.COLS; c++) {
                while (this._matchRow(r, c) || this._matchCol(r, c)) {
                    if (this.grid[r][c]) {
                        this.matchMakers.push(this.grid[r][c]);
                    }
                    const x = Const.GRID.PAD_X + c * Const.GAME.GEMW;
                    const y = Const.GRID.PAD_Y + r * Const.GAME.GEMH;
                    this._renderCell(r, c, x, y);
                }
            }
        }
        this._destroyMatches();
        console.log('rendering new grid...')
    },

    _renderCell(r, c, x, y) {
        const randomType = Math.ceil(Math.random() * Const.GRID.TYPES);
        const gem = this.game.add.image(x, y, `gem-${randomType}`).setScale(Const.SCALE.GEM);
        this.grid[r][c] = {
            type: randomType,
            image: gem,
            x: x,
            y: y,
            coords: { r: r, c: c }
        };
        this.grid[r][c].image.setInteractive().on('pointerdown', setSelected);

        function setSelected() {
            this.scene.selected = this;
        }
    },

    _isOnGrid(r, c) {
        if (r >= 0 && r < Const.GRID.ROWS &&
            c >= 0 && c < Const.GRID.COLS &&
            this.grid[r] !== undefined &&
            this.grid[r][c] !== undefined &&
            this.grid[r][c].hasOwnProperty('type')) {
            return this.grid[r][c].type;
        }
        return false;
    },

    _matchRow(r, c) {
        if (this._isOnGrid(r, c) === this._isOnGrid(r, c - 1) &&
            this._isOnGrid(r, c) === this._isOnGrid(r, c - 2) ||
            this._isOnGrid(r, c) === this._isOnGrid(r, c + 1) &&
            this._isOnGrid(r, c) === this._isOnGrid(r, c + 2) ||
            this._isOnGrid(r, c) === this._isOnGrid(r, c - 1) &&
            this._isOnGrid(r, c) === this._isOnGrid(r, c + 1)) {
                return true;
        }
        return false;
    },

    _matchCol(r, c) {
        if (this._isOnGrid(r, c) === this._isOnGrid(r - 1, c) &&
            this._isOnGrid(r, c) === this._isOnGrid(r - 2, c) ||
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c) &&
            this._isOnGrid(r, c) === this._isOnGrid(r + 2, c) ||
            this._isOnGrid(r, c) === this._isOnGrid(r - 1, c) &&
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c)) {
                return true;
        }
        return false;
    },

    _destroyMatches() {
        for (let i = 0; i < this.matchMakers.length; i++) {
            this.matchMakers[i].image.destroy();
        }
    },

    destroy(game = this) {
        this.grid = game.grid;
        this.cols = Const.GRID.COLS;
        const matchMakers = [];

        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                if (this._matchRow(r, c) || this._matchCol(r, c)) {
                    this.grid[r][c].destroyed = true;
                    matchMakers.push(this.grid[r][c]);
                    this.game.tweens.add({
                        targets: this.grid[r][c].image,
                        alpha: 0.5,
                        // x: this.grid[r][c].image.setScale(2),
                        // y: this.grid[r][c].image.setScale(0),
                        duration: 300,
                        ease: 'Elastic',
                        callbackScope: game,
                        onComplete: () => {
                            this.grid[r][c].image.destroy();
                            matchMakers.shift(this.grid[r][c]);
                            if (!matchMakers.length) {
                                this._descendImages();
                            }
                        }
                    });
                }
            }
        }
        this._calculateDestroyedPerCol();
    },

    _calculateDestroyedPerCol() {
        this.destroyedPerCol.fill(0, 0, Const.GRID.COLS);
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                if (this.grid[r][c].destroyed) {
                    this.destroyedPerCol[c]++;
                }
            }
        }
    },

    _descendImages() {
        for (let c = Const.GRID.COLS - 1; c >= 0; c--) {
            for (let r = 0; r < Const.GRID.ROWS - 1; r++) {
                if (this.destroyedPerCol[c] > 0) {
                    // destroyed at the top of column ? break : shift
                    if (this.grid[r][c].destroyed) {
                        break;
                    }
                    this.game.tweens.add({
                        targets: this.grid[r][c].image,
                        y: this.grid[r][c].image.y + Const.GAME.GEMH * this.destroyedPerCol[c],
                        duration: 400,
                        ease: 'Elastic',
                        rotation: 40,
                        callbackScope: this.game
                    });
                    if (this.grid[r + 1][c].destroyed) {
                        break;
                    }
                }
            }
        }
        this._searchDestroyed();
    },

    _searchDestroyed() {
        for (let c = 0; c < Const.GRID.COLS; c++) {
            for (let r = Const.GRID.ROWS - 1; r >= 0; r--) {
                if (this.grid[r][c].destroyed &&
                    this.destroyedPerCol[c] > 0 &&
                    r - this.destroyedPerCol[c] >= 0) {
                        this._swapGridCells(r, c, r - this.destroyedPerCol[c], c);
                }
            }
        }
        this._replenishGrid();
    },

    _swapGridCells(r1, c1, r2, c2) {
        //console.log(`fir r: ${r1}, c:${c1}, dest r: ${r2}, c: ${c2}`);
        
        const cacheType = this.grid[r1][c1].type;
        this.grid[r1][c1].type = this.grid[r2][c2].type;
        this.grid[r2][c2].type = cacheType;
        this.grid[r1][c1].destroyed = false;
        this.grid[r2][c2].destroyed = true;

        // const cache = Object.assign(this.grid[r1][c1]);
        // this.grid[r1][c1] = Object.assign(this.grid[r2][c2]);
        // this.grid[r2][c2] = Object.assign(cache);
    },

    _replenishGrid() {
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                if (this.grid[r][c].destroyed) {
                    this.grid[r][c].destroyed = false;
                    this._renderCell(r, c, this.grid[r][c].image.x, this.grid[r][c].image.y)
                }
            }
        }
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                console.log(this.grid[r][c]);
            }
        }
    }
};
