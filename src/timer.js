class Timer {
  constructor() {

  }

  startCountDown(seconds) {
    this._start = new Date().getTime();
    this._seconds = seconds;
  }

  getTimeLeft() {
    return this._seconds + Math.floor(((this._start - new Date().getTime())  % (1000 * 60)) / 1000);
  }
}

export default Timer;
