// import {genID, loadImage} from './helper_functions.js';

export class Entity {
  constructor(data) {
    this.walkedSteps = (data.walkedSteps) ? data.walkedSteps : 0;
    // TODO: add at least 4 more metrics
  } // end constructor

  // updates the database based on passed in stats
  updateStats({
    walkedSteps = 0,
  }) {
    // TODO: update database
  }

  set walkedSteps(val) {
    this._walkedSteps += val;
  }

  get walkedSteps() {
    return this._walkedSteps;
  }
}
