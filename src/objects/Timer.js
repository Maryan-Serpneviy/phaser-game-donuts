export default function Timer(ctx, label, init) {
  let initTime = init;

  function formatTime(time) {
      let seconds = parseInt(time, 10);
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds - hours * 3600) / 60);
      seconds = seconds - hours * 3600 - minutes * 60;

      if (minutes < 10) { minutes = `0${minutes}` }
      if (seconds < 10) { seconds = `0${seconds}` }
      return `${minutes}:${seconds}`;
  }

  return {
      initTimer() {
          ctx.timer = ctx.time.addEvent({
              delay: 1000,
              callback: this.reducer,
              callbackScope: ctx,
              loop: true
          });
      },

      reducer() {
          initTime--;
          label.setText(formatTime(initTime));
          if (initTime === 0) {
              ctx.timer.remove();
          }
      },

      addBonusTime() {
          initTime += 5;
      },

      formatTime(time) {
        return formatTime(time);
      }
  };
}