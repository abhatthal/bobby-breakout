import {Controls} from '../util/Controls.js';
import {Game} from '../Game.js';

export class FightControls extends Controls {
  constructor(data) {
    super(data);
    this.tooltips = data.tooltips;
  }

  addControlBindings() {
    const self = this;

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

    // Space or E for interaction
    if (this.keys[32] || this.keys[69]) {
      const game = Game.getInstance();
      game.switchToMap();
      this._inFightScene = false;
    }

    // during fight and key pressed
    console.log(player.skillA1);
    fightLoop(player, npc);
    if (!inFightScene) {
      fightLayer.remove();
      stage.add(layer);
      if (npc.hp <= 0) {
        alert('YOU beat an enemy!');
        npcArray.pop(npc);
      } else if (player.hp <= 0) {
        alert('YOU Fail, retry?');
        location.reload();
      }
    }
  }
}
