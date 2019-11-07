import Const from '../utils/constants';
import Tween from '../utils/tweens';
import { Match } from './Match';

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

        Match.isMakingMatch.call(this, this.currCoords.r, this.currCoords.c);
        if (this.prev) {
            // if second pick is on the same line
            const isOnSameLine = Swapper._checkMoveValidity.call(this);
            if (isOnSameLine) {
                const matches = [...new Set(this.matchingCells)];
                // if move is making match
                let isInvalid = true;
                for (let i = 0; i < matches.length; i++) {
                    if (this.currCoords.r === matches[i].coords.r && this.currCoords.c === matches[i].coords.c) {
                        isInvalid = false;
                        break;
                    }
                }
                // deselect gem
                this.selected.setScale(Const.SCALE.GEM);

                isInvalid ? Swapper._swapHandler.call(this, false) : Swapper._swapHandler.call(this, true);
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
        if (this.currCoords.r === this.prevCoords.r && this.currCoords.c === this.prevCoords.c - 1 ||
            this.currCoords.r === this.prevCoords.r && this.currCoords.c === this.prevCoords.c + 1 ||
            this.currCoords.c === this.prevCoords.c && this.currCoords.r === this.prevCoords.r - 1 ||
            this.currCoords.c === this.prevCoords.c && this.currCoords.r === this.prevCoords.r + 1) {
                return true;
        }
        return false;
    },

    _swapHandler(isValid) {
        if (isValid) {
            // swapping gem type
            const cacheType = this.grid[this.prevCoords.r][this.prevCoords.c].type;
            this.grid[this.prevCoords.r][this.prevCoords.c].type = this.grid[this.currCoords.r][this.currCoords.c].type;
            this.grid[this.currCoords.r][this.currCoords.c].type = cacheType;
            // swapping image reference
            const cacheImg = this.grid[this.prevCoords.r][this.prevCoords.c].image;
            this.grid[this.prevCoords.r][this.prevCoords.c].image = this.grid[this.currCoords.r][this.currCoords.c].image;
            this.grid[this.currCoords.r][this.currCoords.c].image = cacheImg;

            Tween.swap.valid.call(this, this.prev, this.selected);
            Tween.swap.valid.call(this, this.selected, this.prev);
        } else {
            Tween.swap.invalid.call(this, this.prev, this.selected);
            Tween.swap.invalid.call(this, this.selected, this.prev);
        }
        // reset cache data after swap
        this.prev = null;
        this.selected = null;
        this.matchingCells = [];
    }
};