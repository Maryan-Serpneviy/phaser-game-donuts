import Const from '../utils/constants';

export const Timer = {
    initTime: Const.TIMER_INIT,
    timerText: null,

    initTimer(timerText) {
        Timer.timerText = timerText;
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: Timer.reducer,
            callbackScope: this,
            loop: true
        });
    },

    reducer() {
        Timer.initTime--;
        Timer.timerText.setText(Timer.formatTime(Timer.initTime));
        if (Timer.initTime === 0) {
            this.timer.remove();
        }
    },

    addBonusTime() {
        this.initTime += 5;
    },

    formatTime(time) {
        let seconds = parseInt(time, 10);
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds - hours * 3600) / 60);
        seconds = seconds - hours * 3600 - minutes * 60;

        if (minutes < 10) { minutes = `0${minutes}` }
        if (seconds < 10) { seconds = `0${seconds}` }
        return `${minutes}:${seconds}`;
    }
};
