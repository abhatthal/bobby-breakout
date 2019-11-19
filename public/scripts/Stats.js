// import {httpGet} from './helper_functions.js';

export class Stats {
  constructor(data) {
    this.userID = data.userID;
    this._walkedSteps = 0;
    this._playTime = 0; // seconds
    // TODO: add at least 3 more metrics
  }
  // updates the database based on passed in stats

  updateStats({
    userID = this.userID,
    walkedSteps = this.walkedSteps,
    playTime = this.playTime,
  } = {}) {
    const statsData = {username: userID, type: 'walkedSteps', value: walkedSteps};
    const socket = io.connect();
    socket.on('connect', function() {
      socket.emit('statsSent', statsData);
    });
  }

  set walkedSteps(val) {
    this._walkedSteps += val;
  }

  get walkedSteps() {
    return this._walkedSteps;
  }

  set playTime(val) {
    this._playTime = val;
  }

  get playTime() {
    return this._playTime;
  }
}
