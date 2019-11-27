import {Controls} from '../util/Controls.js';
import {Game} from '../Game.js';
import {Item} from '../Item.js';

export class InventoryControls extends Controls {
  constructor(data) {
    super(data);
    this.tooltips = data.tooltips;
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

    // For debugging purposes, a key 'z' to add an item
    if (this.keys[90]) {
      const item = new Item({
        name: 'Sword',
        info: 'looool',
      });
      this.player.inventory.add(item);
    }
    // i for inventory menu exit
    if (this.keys[73]) {
      const game = Game.getInstance();
      game.switchToMap();
    }
    // p for Achievements menu
    if (this.keys[80]) {
      const game = Game.getInstance();
      game.switchToAchievements();
    }
  }
}
