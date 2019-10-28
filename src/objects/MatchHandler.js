import { Grid } from '../objects/Grid';

export const MatchHandler = {
    cellsToReplace: [],
    game: null,
    grid: null,
    handleMatches(game) {
        this.game = game;
        this.grid = game.grid;

        this._findRowsMatches();
        this._findColsMatches();
        this._replaceMatchedCells();
    },

    _findRowsMatches() {
        const grid = this.grid;
        for (let r = 0; r < grid.length; r++) {
            for (let c = 1; c < grid[r].length - 1; c++) {
                if (grid[r][c].type === grid[r][c - 1].type &&
                    grid[r][c].type === grid[r][c + 1].type) {
                        this.cellsToReplace.push(grid[r][c]);
                }
            }
        }
    },

    _findColsMatches() {
        const grid = this.grid;
        for (let r = 1; r < grid.length - 1; r++) {
            for (let c = 0; c < grid[r].length; c++) {
                if (grid[r][c].type === grid[r - 1][c].type &&
                    grid[r][c].type === grid[r + 1][c].type) {
                        this.cellsToReplace.push(grid[r][c]);
                }
            }
        }
    },

    _replaceMatchedCells() {
        const grid = this.grid;
        const matched = this.cellsToReplace;
        for (let m = 0; m < matched.length; m++) {
            for (let r = 0; r < grid.length; r++) {
                for (let c = 0; c < grid[r].length; c++) {
                    if (grid[r][c] === matched[m]) {
                        this._replaceCell(grid[r][c]);
                    }
                }
            }
        }
    },

    _replaceCell(match) {
        match.image.destroy();
        Grid.renderCell(match.coords[0], match.coords[1], this.game, 'replaced');
    }
};