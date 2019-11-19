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
    }
  }

  doKeyfight(keys) {    
    // press Q for normal hit
    // normalattack.hpchange(npc, 0);
    // player.skillA1.hpchange(npc, 0);
    // npc.hp -= 50;

    // console.log(player.skillA1);

    player.skillA1.hpChange(npc, -50);

    // alert(player.skillA1.descripttion);
    // npc.skillA1.hpchange(-50);
    console.log(npc.hp);
  }

  fightLoop(subject, opponent) {
    // assume player act first
    if (subject.fightSpeed >= opponent.fightSpeed) {
      this.doKeyfight(this.keys, opponent);
      this.enemyfight(opponent, subject);
    } else {
      this.enemyfight(opponent, subject);
      this.doKeyfight(this.keys, opponent);
    }
    this.fightSceneLoad(player, npc);
  }

  // Enemy fight strategy
  enemyfight(opponent, subject) {
    // alert(opponent.hp, subject.hp);
    // opponent.skillA1.hpchange(subject, 0);
  }
}
