import Const from '../utils/constants';
import { Grid } from '../objects/Grid';

export const MatchHandler = {
    cellsToReplace: [],
    game: null,
    grid: null,
    handleMatches(game) {
        // MatchHandler.game = this.game;
        // MatchHandler.grid = this.grid;
        this.game = game;
        this.grid = game.grid;
        
        this.findRowsMatches();
        this.findColsMatches();
        this.replaceMatchedCells();
    },

    findRowsMatches() {
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

    findColsMatches() {
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

    replaceMatchedCells() {
        const grid = this.grid;
        const matched = this.cellsToReplace;
        for (let m = 0; m < matched.length; m++) {
            for (let r = 0; r < grid.length; r++) {
                for (let c = 0; c < grid[r].length; c++) {
                    if (grid[r][c] === matched[m]) {
                        // console.log(grid[r][c]);
                        // console.log(c);
                        // grid[r].splice(c, 1);
                        this.replaceCell(grid[r][c]);
                    }
                }
            }
        }
    },

    replaceCell(match) {
        
        // let x = Const.BOARD.PAD_X + c * this.size;
        // let y = Const.BOARD.PAD_Y + r * this.size;
        console.log(match);
        //match.type = Math.ceil(Math.random() * Const.BOARD.TYPES);
        match.image.destroy();

        
    }
};