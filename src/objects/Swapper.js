import Const from '../utils/constants';
import Tween from '../utils/tweens';
import { Grid } from './Grid';

export const Swapper = {
    inputHandler() {
        this.prevCoords = null;
        // if selected isn't on same line - deselect
        if (this.prev) {
            this.prevCoords = Swapper._getGemGridCoords.call(this, this.prev.x, this.prev.y);
            this.prev.setScale(Const.SCALE.GEM);
        }
        // get selected coords
        if (this.selected) {
            this.currCoords = Swapper._getGemGridCoords.call(this, this.selected.x, this.selected.y);
            this.selected.setScale(Const.SCALE.GEM * Const.COEF.GEM_ACTIVE);
        }

        if (this.prev) {
            // if second pick is on the same line
            const isOnSameLine = Swapper._checkMoveValidity.call(this);
            if (isOnSameLine) {
                const isValid = Swapper._checkForMatch.call(this);
                isValid ? Swapper._swapHandler.call(this, true) : Swapper._swapHandler.call(this, false);
            }
        }
        // cache previous select
        this.prev = this.selected;
    },

    _getGemGridCoords(x, y) {
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                if (this.grid[r][c].x === x && this.grid[r][c].y === y) {
                    return { r: r, c: c };
                }
            }
        }
    },

    _checkMoveValidity() {
        return (
            this.currCoords.r === this.prevCoords.r && this.currCoords.c === this.prevCoords.c - 1 ||
            this.currCoords.r === this.prevCoords.r && this.currCoords.c === this.prevCoords.c + 1 ||
            this.currCoords.c === this.prevCoords.c && this.currCoords.r === this.prevCoords.r - 1 ||
            this.currCoords.c === this.prevCoords.c && this.currCoords.r === this.prevCoords.r + 1
        );
    },

    _checkForMatch() {
        // swapping gem type
        const cacheType = this.grid[this.currCoords.r][this.currCoords.c].type;
        this.grid[this.currCoords.r][this.currCoords.c].type = this.grid[this.prevCoords.r][this.prevCoords.c].type;
        this.grid[this.prevCoords.r][this.prevCoords.c].type = cacheType;

        return Grid.matchRow(this.currCoords.r, this.currCoords.c) ||
               Grid.matchCol(this.currCoords.r, this.currCoords.c) ||
               Grid.matchRow(this.prevCoords.r, this.prevCoords.c) ||
               Grid.matchCol(this.prevCoords.r, this.prevCoords.c);
    },

    _swapHandler(isValid) {
        if (isValid) {
            // swapping image reference
            const cacheImg = this.grid[this.currCoords.r][this.currCoords.c].image;
            this.grid[this.currCoords.r][this.currCoords.c].image = this.grid[this.prevCoords.r][this.prevCoords.c].image;
            this.grid[this.prevCoords.r][this.prevCoords.c].image = cacheImg;

            Tween.swap.valid.call(this, this.prev, this.selected);
            Tween.swap.valid.call(this, this.selected, this.prev, Grid.destroy);
        } else {
            // swapping back gem type
            const cacheType = this.grid[this.prevCoords.r][this.prevCoords.c].type;
            this.grid[this.prevCoords.r][this.prevCoords.c].type = this.grid[this.currCoords.r][this.currCoords.c].type;
            this.grid[this.currCoords.r][this.currCoords.c].type = cacheType;

            Tween.swap.invalid.call(this, this.prev, this.selected);
            Tween.swap.invalid.call(this, this.selected, this.prev);
        }
        // deselect gem
        this.selected.setScale(Const.SCALE.GEM);
        // reset cache data after swap
        this.prev = null;
        this.selected = null;
    }
};