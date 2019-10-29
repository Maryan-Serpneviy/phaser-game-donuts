import Const from '../utils/constants';

export const MatchFinder = {
    game: null,
    grid: null,

    isMakingMatch(row, col) {
        // this.matchingCells = [];
        MatchFinder.game = this;
        MatchFinder.grid = this.grid;

        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                MatchFinder.isMakingRowMatch(row, col);
                MatchFinder.isMakingColMatch(row, col);
            }
        }
    },

    isOnGrid(r, c) {
        if (r >= 0 && r < Const.BOARD.ROWS &&
            c >= 0 && c < Const.BOARD.COLS &&
            this.grid[r] !== undefined &&
            this.grid[r][c] !== undefined) {
            return this.grid[r][c].type;
        }
        return false;
    },

    isMakingRowMatch(r, c) {
        if (this.isOnGrid(r, c) === this.isOnGrid(r, c - 2) && // following left
            this.isOnGrid(r, c) === this.isOnGrid(r, c - 3)) { // following left
                this.markForSwap(this.grid[r][c], this.grid[r][c - 1]);
        }

        if (this.isOnGrid(r, c) === this.isOnGrid(r, c + 2) && // following right
            this.isOnGrid(r, c) === this.isOnGrid(r, c + 3)) { // following right
                this.markForSwap(this.grid[r][c], this.grid[r][c + 1]);
        }

        if (this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 1) && // in between top left
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 1) || // in between top left
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 1) && // following top left
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 2) || // following top left
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 1) && // following top right
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 2)) { // following top right
                this.markForSwap(this.grid[r][c], this.grid[r - 1][c]);
        }

        if (
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) && // in between bot left
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) || // in between bot right
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) && // following bot left
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 2) || // following bot left
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) && // following bot right
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 2)) { // following bot right
                this.markForSwap(this.grid[r][c], this.grid[r + 1][c]);
        }
        return false;
    },

    isMakingColMatch(r, c) {
        if (this.isOnGrid(r, c) === this.isOnGrid(r + 2, c) && // following bottom
            this.isOnGrid(r, c) === this.isOnGrid(r + 3, c)) { // following bottom
                this.markForSwap(this.grid[r][c], this.grid[r + 1][c]);
        }

        if (this.isOnGrid(r, c) === this.isOnGrid(r - 2, c) && // following top
            this.isOnGrid(r, c) === this.isOnGrid(r - 3, c)) { // following top
                this.markForSwap(this.grid[r][c], this.grid[r - 1][c]);
        }

        if (this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 1) && // in between left top
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) || // in between left bot
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) && // following bot left
            this.isOnGrid(r, c) === this.isOnGrid(r + 2, c - 1) || // following bot left
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 1) && // following left top
            this.isOnGrid(r, c) === this.isOnGrid(r - 2, c - 1)) { // following left top
                this.markForSwap(this.grid[r][c], this.grid[r][c - 1]);
        }

        if (this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 1) && // in between right top
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) || // in between right bot
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) && // following bot right
            this.isOnGrid(r, c) === this.isOnGrid(r + 2, c + 1) || // following bot right
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 1) && // following right top
            this.isOnGrid(r, c) === this.isOnGrid(r - 2, c + 1)) { // following right top
                this.markForSwap(this.grid[r][c], this.grid[r][c + 1]);
        }
        return false;
    },

    markForSwap(target, matchCell) {
        this.game.matchingCells.push(matchCell);
    }
};