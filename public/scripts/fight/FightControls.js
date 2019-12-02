import {Controls} from '../util/Controls.js';
// import {achievementsDown, inventoryDown} from '../globalCtrl.js';

export class FightControls extends Controls {
  constructor(data) {
    super(data);
    this.tooltips = data.tooltips;
    this.player = data.player;
    this.npc = data.npc;
    this.map = data.map;
    // console.log(this.map);
  }

  addControlBindings() {
    const self = this;
    this.keys = [];

    this.handleKeyUpMethod = this.handleKeyUpMethod || function(event) {
      self.handleKeyUp(event);
    };
    this.handleKeyDownMethod = this.handleKeyDownMethod || function(event) {
      self.handleKeyDown(event);
    };

    this.container.addEventListener('keyup', this.handleKeyUpMethod);
    this.container.addEventListener('keydown', this.handleKeyDownMethod);
  }

  removeControlBindings() {
    const self = this;
    this.keys = [];

    this.handleKeyUpMethod = this.handleKeyUpMethod || function(event) {
      self.handleKeyUp(event);
    };
    this.handleKeyDownMethod = this.handleKeyDownMethod || function(event) {
      self.handleKeyDown(event);
    };

    this.container.removeEventListener('keyup', this.handleKeyUpMethod);
    this.container.removeEventListener('keydown', this.handleKeyDownMethod);
  }

  handleKeyUp(event) {
    this.keys[event.keyCode] = false;
  };

  handleKeyDown(event) {
    this.keys[event.keyCode] = true;
  }
}
