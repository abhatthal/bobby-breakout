import {Controls} from '../util/Controls.js';
import {Game} from '../Game.js';

export class FightControls extends Controls {
  constructor(data) {
    super(data);
    this.tooltips = data.tooltips;
    this.player = data.player;
    this.npc = data.npc;
    console.log(this.npc);
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

    // q key
    if (this.keys[81]) {
      this.fightLoop(this.player, this.npc);
    }
  }

  doDamage(player, opponent) {
    // press Q for normal hit
    // normalattack.hpchange(npc, 0);
    // player.skillA1.hpchange(npc, 0);
    // npc.hp -= 50;

    // console.log(player.skillA1);

    player.skillA1.hpChange(opponent, -10);
    console.log(opponent.hp);

    // alert(player.skillA1.descripttion);
    // npc.skillA1.hpchange(-50);
  }

  fightLoop(subject, opponent) {
    // assume player act first
    if (subject.fightSpeed >= opponent.fightSpeed) {
      this.doDamage(subject, opponent);
      this.enemyfight(opponent, subject);
    } else {
      this.enemyfight(opponent, subject);
      this.doDamage(subject, opponent);
    }
    // this.fightSceneLoad(subject, npc);
  }

  // Enemy fight strategy
  enemyfight(opponent, subject) {
    // alert(opponent.hp, subject.hp);
    // opponent.skillA1.hpchange(subject, 0);
  }
}
