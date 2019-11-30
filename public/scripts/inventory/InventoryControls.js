import {Controls} from '../util/Controls.js';
import {Game} from '../Game.js';
import {Item} from '../Item.js';
import {achievementsDown, inventoryDown} from '../globalCtrl.js';
import {keysHistory} from '../util/helper_functions.js';
import * as IL from './InventoryList.js';

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
    keysHistory.push(event.keyCode);

    // All global achievements
    achievementsDown(this);
    // All global inventory
    inventoryDown(this);

    // For debugging purposes, add items
    if (this.keys[90]) {
      this.player.inventory.add(IL.plasticSword);
    }
    if (this.keys[88]) {
      this.player.inventory.add(IL.studentEvaluations);
    }
    if (this.keys[67]) {
      this.player.inventory.add(IL.dadJoke);
    }
    if (this.keys[86]) {
      this.player.inventory.add(IL.coffee);
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
