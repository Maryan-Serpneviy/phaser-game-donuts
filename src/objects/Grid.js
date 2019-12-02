import Const from '../utils/constants';
import Tween from '../utils/tweens';

export const Grid = {
    matchMakers: [],
    destroyedPerCol: new Array(Const.GRID.COLS),
    matchCount: 0,

    renderGrid(game = this) {
        game.grid = [];
        this.game = game;
        this.grid = game.grid;

        for (let r = 0; r < Const.GRID.ROWS; r++) {
            this.grid.push(new Array(Const.GRID.COLS));
            for (let c = 0; c < Const.GRID.COLS; c++) {
                while (this.matchRow(r, c) || this.matchCol(r, c)) {
                    if (this.grid[r][c]) {
                        this.matchMakers.push(this.grid[r][c]);
                    }
                    const x = Const.GRID.OFFSET_X + c * Const.GAME.GEMW;
                    const y = Const.GRID.OFFSET_Y + r * Const.GAME.GEMH;
                    this._renderCell(r, c, x, y);
                }
            }
        }
        this._destroyMatches();
    },

    matchRow(r, c) {
        return (
            this._isOnGrid(r, c) === this._isOnGrid(r, c - 1) && this._isOnGrid(r, c) === this._isOnGrid(r, c - 2) ||
            this._isOnGrid(r, c) === this._isOnGrid(r, c + 1) && this._isOnGrid(r, c) === this._isOnGrid(r, c + 2) ||
            this._isOnGrid(r, c) === this._isOnGrid(r, c - 1) && this._isOnGrid(r, c) === this._isOnGrid(r, c + 1)
        );
    },

    matchCol(r, c) {
        return (
            this._isOnGrid(r, c) === this._isOnGrid(r - 1, c) && this._isOnGrid(r, c) === this._isOnGrid(r - 2, c) ||
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c) && this._isOnGrid(r, c) === this._isOnGrid(r + 2, c) ||
            this._isOnGrid(r, c) === this._isOnGrid(r - 1, c) && this._isOnGrid(r, c) === this._isOnGrid(r + 1, c)
        );
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

    _markRowMatches() {
        for (let r = 0; r < Const.GRID.ROWS; r++) {
            for (let c = 1; c < Const.GRID.COLS - 1; c++) {
                if (this.grid[r][c].type === this.grid[r][c - 1].type &&
                    this.grid[r][c].type === this.grid[r][c + 1].type) {
                        this.grid[r][c].match = true;
                        this.grid[r][c - 1].match = true;
                        this.grid[r][c + 1].match = true;
                        this.matchCount++;
                }
            }
        }
    },

    _markColMatches() {
        for (let c = 0; c < Const.GRID.COLS; c++) {
            for (let r = 1; r < Const.GRID.ROWS - 1; r++) {
                if (this.grid[r][c].type === this.grid[r - 1][c].type &&
                    this.grid[r][c].type === this.grid[r + 1][c].type) {
                        this.grid[r][c].match = true;
                        this.grid[r - 1][c].match = true;
                        this.grid[r + 1][c].match = true;
                        this.matchCount++;
                }
            }
        }
    },

    _renderCell(r, c, x, y, destroy) {
        //console.log(this.grid[r][c]);
        const randomType = Math.ceil(Math.random() * Const.GRID.TYPES);
        const gem = this.game.add.image(x, y, `gem-${randomType}`).setScale(Const.SCALE.GEM);
        gem.scaleX = 0;
        gem.scaleY = 0;
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
        Tween.render.call(this.game, this.grid[r][c], destroy);
    },

    _destroyMatches() {
        for (let i = 0; i < this.matchMakers.length; i++) {
            this.matchMakers[i].image.destroy();
        }
        this.matchMakers = [];
    },

    destroy() {
        let matchCount = 0;

        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                if (Grid.matchRow(r, c) || Grid.matchCol(r, c)) {
                    matchCount++;
                    this.grid[r][c].destroyed = true;
                    this.tweens.add({
                        targets: this.grid[r][c].image,
                        scaleX: 0,
                        scaleY: 0,
                        duration: 400,
                        ease: 'Linear',
                        callbackScope: this,
                        onComplete: () => {
                            this.grid[r][c].image.destroy();
                            matchCount--;
                            if (matchCount === 0) {
                                //Grid._calculateDestroyedPerCol();
                                Grid._descendImages();
                            }
                        }
                    });
                }
            }
        }
        Grid._calculateDestroyedPerCol();
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
        let fallCount = 0;

        for (let c = Const.GRID.COLS - 1; c >= 0; c--) {
            for (let r = 0; r < Const.GRID.ROWS - 1; r++) {
                if (this.destroyedPerCol[c] > 0) {
                    // destroyed at the top of column ? break : shift
                    if (this.grid[r][c].destroyed) {
                        break;
                    }
                    fallCount++;
                    this.game.tweens.add({
                        targets: this.grid[r][c].image,
                        y: this.grid[r][c].image.y + Const.GAME.GEMH * this.destroyedPerCol[c],
                        duration: 400,
                        ease: 'Elastic',
                        rotation: 40,
                        callbackScope: this.game,
                        onComplete: () => {
                            fallCount--;
                            if (fallCount === 0) {
                                this._replenishGrid();
                            }
                        }
                    });
                    //Tween.descend.call(this.game, this.grid[r][c], this.destroyedPerCol[c], this._replenishGrid);
                    if (this.grid[r + 1][c].destroyed) {
                        break;
                    }
                }
            }
        }
        Grid._searchDestroyed();
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
    },

    _swapGridCells(r1, c1, r2, c2) {
        //console.log(`fir r: ${r1}, c:${c1}, dest r: ${r2}, c: ${c2}`);
        const cacheType = this.grid[r1][c1].type;
        this.grid[r1][c1].type = this.grid[r2][c2].type;
        this.grid[r2][c2].type = cacheType;
        this.grid[r1][c1].destroyed = false;
        this.grid[r2][c2].destroyed = true;
    },

    _replenishGrid() {
        console.log('replenish')
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                if (this.grid[r][c].destroyed) {
                    // const randomType = Math.ceil(Math.random() * Const.GRID.TYPES);
                    // const donut = this.game.add.image(x, y, `gem-${randomType}`).setScale(Const.SCALE.GEM);
                    // this.grid[r][c] = {
                    //     type: randomType,
                    //     image: donut,
                    //     x: this.grid[r][c].image.x,
                    //     y: this.grid[r][c].image.y,
                    //     coords: { r: r, c: c }
                    // };
                    // gem.scaleX = 0;
                    // gem.scaleY = 0;
                    
                    
                    Grid._renderCell(r, c, this.grid[r][c].image.x, this.grid[r][c].image.y, this.destroy);
                }
            }
        }
    },

    _render(r, c, x, y, destroy) {
        //console.log(this.grid[r][c]);
        const randomType = Math.ceil(Math.random() * Const.GRID.TYPES);
        const gem = this.game.add.image(x, y, `gem-${randomType}`).setScale(Const.SCALE.GEM);
        gem.scaleX = 0;
        gem.scaleY = 0;
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
        Tween.render.call(this.game, this.grid[r][c], destroy);
    },

};
