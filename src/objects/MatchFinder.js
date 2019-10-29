import Const from '../utils/constants';

export const MatchFinder = {
    game: null,
    board: null,
    matchables: [],
    matchCoords: [],

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
        if (this.isOnGrid(r, c) === this.isOnGrid(r, c - 2) && // following left
            this.isOnGrid(r, c) === this.isOnGrid(r, c - 3)) { // following left
                this.markForSwap(this.board[r][c], this.board[r][c - 1]);
        }

        if (this.isOnGrid(r, c) === this.isOnGrid(r, c + 2) && // following right
            this.isOnGrid(r, c) === this.isOnGrid(r, c + 3)) { // following right
                this.markForSwap(this.board[r][c], this.board[r][c + 1]);
        }

        if (this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 1) && // in between top left
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 1) || // in between top left
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 1) && // following top left
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 2) || // following top left
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 1) && // following top right
            this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 2)) { // following top right
                this.markForSwap(this.board[r][c], this.board[r - 1][c]);
        }

        if (
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) && // in between bot left
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) || // in between bot right
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) && // following bot left
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 2) || // following bot left
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) && // following bot right
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 2)) { // following bot right
                this.markForSwap(this.board[r][c], this.board[r + 1][c]);
        }
    },

    isMakingColMatch(r, c) {
        if (this.isOnGrid(r, c) === this.isOnGrid(r + 2, c) && // following bottom
            this.isOnGrid(r, c) === this.isOnGrid(r + 3, c)) { // following bottom
                this.markForSwap(this.board[r][c], this.board[r + 1][c]);
        }

        if (this.isOnGrid(r, c) === this.isOnGrid(r - 2, c) && // following top
            this.isOnGrid(r, c) === this.isOnGrid(r - 3, c)) { // following top
                this.markForSwap(this.board[r][c], this.board[r - 1][c]);
        }

        if (this.isOnGrid(r, c) === this.isOnGrid(r - 1, c - 1) && // in between left top
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) || // in between left bot
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) && // following bot left
            this.isOnGrid(r, c) === this.isOnGrid(r + 2, c - 1) || // following bot left
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c - 1) && // following left top
            this.isOnGrid(r, c) === this.isOnGrid(r + 2, c - 1)) { // following left top
                this.markForSwap(this.board[r][c], this.board[r][c - 1]);
        }

        if (this.isOnGrid(r, c) === this.isOnGrid(r - 1, c + 1) && // in between right top
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) || // in between right bot
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) && // following bot right
            this.isOnGrid(r, c) === this.isOnGrid(r + 2, c + 1) || // following bot right
            this.isOnGrid(r, c) === this.isOnGrid(r + 1, c + 1) && // following right top
            this.isOnGrid(r, c) === this.isOnGrid(r + 2, c + 1)) { // following right top
                this.markForSwap(this.board[r][c], this.board[r][c + 1]);
        }


    },

    markForSwap(target, matchCell) {
        console.log(target, matchCell);
        target.swappable = true;
        target.matchingCells.push(matchCell);

        this.matchables.push(target);
        this.matchCoords.push(matchCell.coords);


        target.image.setInteractive().on('pointerdown', function() {
            this.setScale(2.4);
            this.active = true;
        });
    },

    doNext() {
        // for (const match of this.matchables) {
        //     let r = match.coords[0];
        //     let c = match.coords[1];
        //     this.board[r][c].type = -1;

        //     this.game.tweens.add({
        //         targets: this.board[r][c].image,
        //         alpha: 0.25,
        //         duration: 250,
        //         callbackScope: this.game,
        //         onComplete: () => {
        //             //this.board[r][c].image.destroy();
        //         }
        //     });
        // }
        // for (const matchable of this.matchables) {
        //     // console.log(matchable.image);
        //     matchable.image.setInteractive().on('pointerdown', function() {
        //         this.setScale(2.4);
        //     });
        //     console.log(matchable);
        // }
        for (let i = 0; i < this.matchables.length; i++) {
            this.matchables[i].image.setInteractive().on('pointerdown', function() {
                this.setScale(2.4);
            });
            this.matchables[i].active = true;
            for (let j = 0; j < this.matchables[i].matchingCells.length; j++) {
                this.matchables[i].matchingCells[j].image.setInteractive().on('pointerdown', function() {
                    this.setScale(2.4);
                });
                this.matchables[i].active = true;
            }
        }
    }
};