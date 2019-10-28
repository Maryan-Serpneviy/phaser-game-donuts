import Const from '../utils/constants';

export const MatchFinder = {
    game: null,
    board: null,
    matchable: [],
    findMatches(game) {
        this.game = game;
        this.board = game.grid;
        for (let r = 0; r < this.board.length; r++) {
            for (let c = 0; c < this.board[r].length; c++) {
                this.isMakingRowMatch(r, c);
                this.isMakingColMatch(r, c);
            }
        }
    },

    isOnGrid(r, c) {
        if (r >= 0 && r < Const.BOARD.ROWS &&
            c >= 0 && c < Const.BOARD.COLS &&
            this.board[r] !== undefined &&
            this.board[r][c] !== undefined) {
            return this.board[r][c].type;
        }
        return false;
    },

    isMakingRowMatch(r, c) {
        if (this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 1) && // in between top left
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 1) || // in between top right
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) && // in between bot left
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) || // in between bot right
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 1) && // following top right
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 2) || // following top right
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) && // following bot right
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 2) || // following bot right
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 1) && // following top left
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 2) || // following top left
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 1) && // following top right
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 2) || // following top right
            this.isOnGrid(r, c) === this.isOnGrid(r, c - 2) && // following left
            this.isOnGrid(r, c) === this.isOnGrid(r, c - 3) || // following left
            this.isOnGrid(r, c) === this.isOnGrid(r, c + 2) && // following right
            this.isOnGrid(r, c) === this.isOnGrid(r, c + 3)) { // following right
                console.log(`match ${this.isOnGrid(r, c)}`);
        }
    },

    isMakingColMatch(r, c) {
        if (this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 1) && // in between left top
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) || // in between left bot
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 1) && // in between right top
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) || // in between right bot
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) && // following bot left
            this.isOnGrid(r, c) === this.isOnGrid(r + 2, c - 1) || // following bot left
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) && // following bot right
            this.isOnGrid(r, c) === this.isOnGrid(r + 2, c + 1) || // following bot right
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) && // following left top
            this.isOnGrid(r, c) === this.isOnGrid(r + 2, c - 1) || // following left top
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) && // following right top
            this.isOnGrid(r, c) === this.isOnGrid(r + 2, c + 1) || // following right top
            this.isOnGrid(r, c) === this.isOnGrid(r + 2, c) && // following bottom
            this.isOnGrid(r, c) === this.isOnGrid(r + 3, c) || // following bottom
            this.isOnGrid(r, c) === this.isOnGrid(r - 2, c) && // following top
            this.isOnGrid(r, c) === this.isOnGrid(r - 3, c)) { // following top
                console.log(`match ${this.isOnGrid(r, c)}`);
            }
    }

};