// import {httpGet} from './helper_functions.js';

export class Stats {
  constructor(data) {
    this.userID = data.userID;
    this._walkedSteps = 0;
    // TODO: add at least 4 more metrics
  }
  // updates the database based on passed in stats
  updateStats({
    userID = this.userID,
    walkedSteps = this.walkedSteps,
  } = {}) {
    const socket = io.connect();
    socket.on('connect', function() {
      socket.emit('userID', userID);
      socket.emit('walkedSteps', walkedSteps);
    });
  }

  set walkedSteps(val) {
    this._walkedSteps += val;
  }

  get walkedSteps() {
    return this._walkedSteps;
  }
}
