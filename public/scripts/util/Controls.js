export class Controls {
  constructor(data) {
    this.keys = [];

    this.layer = data.layer;
    this.player = data.player;
    this.container = data.container;
    this.map = data.map;

    this.isBound = false;
  }

  // to be overrode
  addControlBindings() {

  }

  // to be overrode
  removeControlBindings() {

  }
}
