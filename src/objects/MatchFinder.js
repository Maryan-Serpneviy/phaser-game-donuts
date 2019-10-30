import Const from '../utils/constants';

export const MatchFinder = {
    game: null,
    grid: null,
    matchesFound: [],

    isMakingMatch(row, col) {
        MatchFinder.game = this;
        MatchFinder.grid = this.grid;

        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                MatchFinder._isMakingRowMatch(row, col);
                MatchFinder._isMakingColMatch(row, col);
            }
        }
    },

    matchesAvailable(grid) {
        this.grid = grid;
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[r].length; c++) {
                this._isMakingRowMatch(r, c, 'just checking');
                this._isMakingColMatch(r, c, 'just checking');
            }
        }
        if (this.matchesFound.length) {
            return true;
        }
        return false;
    },

    _isOnGrid(r, c) {
        if (r >= 0 && r < Const.BOARD.ROWS &&
            c >= 0 && c < Const.BOARD.COLS &&
            this.grid[r] !== undefined &&
            this.grid[r][c] !== undefined
            ) {
            return this.grid[r][c].type;
        }
        return false;
    },

    _isMakingRowMatch(r, c, check) {
        if (this._isOnGrid(r, c) === this._isOnGrid(r, c - 2) && // following left
            this._isOnGrid(r, c) === this._isOnGrid(r, c - 3)) { // following left
                this._getPossibleMatches(this.grid[r][c], this.grid[r][c - 1], check);
        }

        if (this._isOnGrid(r, c) === this._isOnGrid(r, c + 2) && // following right
            this._isOnGrid(r, c) === this._isOnGrid(r, c + 3)) { // following right
                this._getPossibleMatches(this.grid[r][c], this.grid[r][c + 1], check);
        }

        if (this._isOnGrid(r, c) === this._isOnGrid(r - 1, c - 1) && // in between top left
            this._isOnGrid(r, c) === this._isOnGrid(r - 1, c + 1) || // in between top left
            this._isOnGrid(r, c) === this._isOnGrid(r - 1, c - 1) && // following top left
            this._isOnGrid(r, c) === this._isOnGrid(r - 1, c - 2) || // following top left
            this._isOnGrid(r, c) === this._isOnGrid(r - 1, c + 1) && // following top right
            this._isOnGrid(r, c) === this._isOnGrid(r - 1, c + 2)) { // following top right
                this._getPossibleMatches(this.grid[r][c], this.grid[r - 1][c], check);
        }

        if (
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c - 1) && // in between bot left
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c + 1) || // in between bot right
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c - 1) && // following bot left
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c - 2) || // following bot left
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c + 1) && // following bot right
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c + 2)) { // following bot right
                this._getPossibleMatches(this.grid[r][c], this.grid[r + 1][c], check);
        }
        return false;
    },

    _isMakingColMatch(r, c, check) {
        if (this._isOnGrid(r, c) === this._isOnGrid(r + 2, c) && // following bottom
            this._isOnGrid(r, c) === this._isOnGrid(r + 3, c)) { // following bottom
                this._getPossibleMatches(this.grid[r][c], this.grid[r + 1][c], check);
        }

        if (this._isOnGrid(r, c) === this._isOnGrid(r - 2, c) && // following top
            this._isOnGrid(r, c) === this._isOnGrid(r - 3, c)) { // following top
                this._getPossibleMatches(this.grid[r][c], this.grid[r - 1][c], check);
        }

        if (this._isOnGrid(r, c) === this._isOnGrid(r - 1, c - 1) && // in between left top
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c - 1) || // in between left bot
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c - 1) && // following bot left
            this._isOnGrid(r, c) === this._isOnGrid(r + 2, c - 1) || // following bot left
            this._isOnGrid(r, c) === this._isOnGrid(r - 1, c - 1) && // following left top
            this._isOnGrid(r, c) === this._isOnGrid(r - 2, c - 1)) { // following left top
                this._getPossibleMatches(this.grid[r][c], this.grid[r][c - 1], check);
        }

        if (this._isOnGrid(r, c) === this._isOnGrid(r - 1, c + 1) && // in between right top
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c + 1) || // in between right bot
            this._isOnGrid(r, c) === this._isOnGrid(r + 1, c + 1) && // following bot right
            this._isOnGrid(r, c) === this._isOnGrid(r + 2, c + 1) || // following bot right
            this._isOnGrid(r, c) === this._isOnGrid(r - 1, c + 1) && // following right top
            this._isOnGrid(r, c) === this._isOnGrid(r - 2, c + 1)) { // following right top
                this._getPossibleMatches(this.grid[r][c], this.grid[r][c + 1], check);
        }
        return false;
    },

    _getPossibleMatches(target, matchCell, check) {
        if (!check) {
            this.game.matchingCells.push(matchCell);
        }
        if (this.matchesFound.includes(matchCell)) {
            return;
        }
        this.matchesFound.push(matchCell);
    }
};