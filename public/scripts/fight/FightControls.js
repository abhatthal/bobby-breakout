import {Controls} from '../util/Controls.js';
import {Game} from '../Game.js';

export class FightControls extends Controls {
  constructor(data) {
    super(data);
    this.tooltips = data.tooltips;
    this.ui = data.ui;
    this.player = data.player;
    this.npc = data.npc;
    this.map = data.map;
    console.log(this.map)
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
    
    if(opponent.hp >= 0){
      player.skillA1.hpChange(opponent, -10);
      console.log(opponent.hp);
    }

    // temp update enemy hp
    // abstract this into a general function later that updates all things to do with ui?
    const enemyStatText = 'Enemy: \ncome fight bobby\n\n' + opponent.hp;
    this.tooltips['enemyTooltip'].text = enemyStatText;
    this.layer.add(this.tooltips['enemyTooltip'].renderBox, this.tooltips['enemyTooltip'].renderText);
    this.layer.draw()
  }

  fightLoop(subject, opponent) {
    console.log(opponent.hp)
    if (opponent.hp <= 0){
      // remove enemy when dead. currently not working.
      // issue: doesn't rerender the current mapscene after going back to it

      // console.log(this.map.npcArray);
      // const index = this.map.npcArray.indexOf(opponent);
      // if(index > -1){ //opponent exists in array
      //   this.map.npcArray.splice(index, 1); //remove 1 element @ specified index
      // }
      // console.log(this.map.npcArray);
      const game = Game.getInstance();
      game.switchToMap();
    }
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
