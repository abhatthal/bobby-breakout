import {Scene} from '../Scene.js';
import {Tooltip} from '../util/ToolTip.js';
import {FightControls} from './FightControls.js';
import {Game} from '../Game.js';
import * as skilldefault from '../skilldefault.js';

export class FightScene extends Scene {
  constructor(data) {
    super(data);
    this.fightLayer = new Konva.Layer();

    this.player = data.player;
    this.inventory = data.player._inventory;

    // Tooltip for fight
    this.tooltips = {
      skillA1Tooltip: new Tooltip({
        name: 'skill',
        shape_id: '0',
        x: data.stage.width()/6,
        y: data.stage.height() - 100,
        width: 300,
        height: 50,
        // eslint-disable-next-line max-len
        text: `${this.inventory.equipped[0].name} (${(this.inventory.equipped[0].type === 'weapon') ? (this.inventory.equipped[0].dmg + ' dmg'):('+' + this.inventory.equipped[0].heal + ' hp')})`,
      }),
      skillA2Tooltip: new Tooltip({
        name: 'skill',
        shape_id: '1',
        x: data.stage.width()/6 + 300,
        y: data.stage.height() - 100,
        width: 300,
        height: 50,
        // eslint-disable-next-line max-len
        text: `${this.inventory.equipped[1].name} (${(this.inventory.equipped[1].type === 'weapon') ? (this.inventory.equipped[1].dmg + ' dmg'):('+' + this.inventory.equipped[1].heal + ' hp')})`,
      }),
      skillA3Tooltip: new Tooltip({
        name: 'skill',
        shape_id: '2',
        x: data.stage.width()/6,
        y: data.stage.height() - 200,
        width: 300,
        height: 50,
        // eslint-disable-next-line max-len
        text: `${this.inventory.equipped[2].name} (${(this.inventory.equipped[2].type === 'weapon') ? (this.inventory.equipped[2].dmg + ' dmg'):('+' + this.inventory.equipped[2].heal + ' hp')})`,
      }),
      skillA4Tooltip: new Tooltip({
        name: 'skill',
        shape_id: '3',
        x: data.stage.width()/6 + 300,
        y: data.stage.height() - 200,
        width: 300,
        height: 50,
        // eslint-disable-next-line max-len
        text: `${this.inventory.equipped[3].name} (${(this.inventory.equipped[3].type === 'weapon') ? (this.inventory.equipped[3].dmg + ' dmg'):('+' + this.inventory.equipped[3].heal + ' hp')})`,
      }),
      playerTooltip: new Tooltip({
        x: data.stage.width()*2/10,
        y: data.stage.height()*4.5/10,
        width: 200,
        height: 120,
        text: 'Bobby',
      }),
      playerHpTooltip: new Tooltip({
        x: data.stage.width()*2/10,
        y: data.stage.height()*4.5/10 - 50,
        width: 150,
        height: 50,
        text: '',
      }),
      enemyTooltip: new Tooltip({
        x: data.stage.width()*5.5/10,
        y: data.stage.height()*1/10,
        width: 200,
        height: 120,
        text: 'Enemy',
      }),
      enemyHpTooltip: new Tooltip({
        x: data.stage.width()*5.5/10,
        y: data.stage.height()*1/10 - 50,
        width: 150,
        height: 50,
        text: '',
      }),
    };

    this.controls;

    this.fightLayer.draw();

    data.player.skillA1 = skilldefault.Skill1;
  }

  updatePlayerHP(player) {
    // console.log(player.hp);
    const playerStatText = 'HP: ' + player.hp + ' / ' + player.MAX_HP;
    this.tooltips['playerHpTooltip'].text = playerStatText;
    this.fightLayer.add(
        this.tooltips['playerHpTooltip'].renderBox,
        this.tooltips['playerHpTooltip'].renderText,
        this.tooltips['playerTooltip'].renderBox,
        this.tooltips['playerTooltip'].renderText,
    );
    this.fightLayer.draw();
  }

  updateNpcHP(npc) {
    const enemyStatText = 'HP: ' + npc.hp + ' / ' + npc.MAX_HP;
    this.tooltips['enemyHpTooltip'].text = enemyStatText;
    this.fightLayer.add(
        this.tooltips['enemyHpTooltip'].renderBox,
        this.tooltips['enemyHpTooltip'].renderText,
        this.tooltips['enemyTooltip'].renderBox,
        this.tooltips['enemyTooltip'].renderText,
    );
    this.fightLayer.draw();
  }

  doDamage(opponent, item) {
    if (opponent.hp >= 0) {
      opponent.hp -= item.dmg;
    }
    this.updateNpcHP(opponent);
  }

  heal(player, item) {
    // Player is full health
    if (player.hp >= 100) {
      return;
    }
    player.hp += item.heal;
    this.updatePlayerHP(player);
  }

  fightLoop(subject, opponent, item) {
    if (opponent.hp <= 0) {
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
      if (item.type === 'weapon') {
        this.doDamage(opponent, item);
      } else {
        this.heal(subject, item);
      }
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

  switchFrom(data) {
    console.assert(data != null);
    this.controls.removeControlBindings();
    this.fightLayer.off();
    this.fightLayer.remove();
  }

  switchTo(data) {
    this.controls = new FightControls({
      layer: this.fightLayer,
      player: data.player,
      container: data.stage.container(),
      tooltips: this.tooltips,
      map: data.map,
      npc: data.npc,
    });
    console.assert(data != null);
    data.stage.add(this.fightLayer);
    this.fightSceneLoad(data.player, data.npc);
    // this.fightLoop(data.player, data.npc);
    this.controls.addControlBindings();
  }

  fightSceneLoad(player, npc) {
    // #region old ui
    this.fightLayer.add(
        this.tooltips['skillA1Tooltip'].renderBox,
        this.tooltips['skillA1Tooltip'].renderText,
    );

    this.fightLayer.add(
        this.tooltips['skillA2Tooltip'].renderBox,
        this.tooltips['skillA2Tooltip'].renderText,
    );
    this.fightLayer.add(
        this.tooltips['skillA3Tooltip'].renderBox,
        this.tooltips['skillA3Tooltip'].renderText,
    );
    this.fightLayer.add(
        this.tooltips['skillA4Tooltip'].renderBox,
        this.tooltips['skillA4Tooltip'].renderText,
    );

    this.updatePlayerHP(player);
    this.updateNpcHP(npc);

    this.fightLayer.on('mouseover', function(evt) {
      const shape = evt.target;
      if (shape.name() === 'skill') {
        document.body.style.cursor = 'pointer';
      }
    });
    this.fightLayer.on('mouseout', function(evt) {
      const shape = evt.target;
      if (shape.name() === 'skill') {
        document.body.style.cursor = 'default';
      }
    });

    const fight = this;
    this.fightLayer.on('click', function(evt) {
      const shape = evt.target;
      if (shape.name() === 'skill') {
        fight.fightLoop(player, npc, player.inventory.equipped[shape.id()]);
      }
    });

    this.fightLayer.draw();
  }
}
