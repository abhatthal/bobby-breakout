import {Scene} from '../Scene.js';
import {Tooltip} from '../util/ToolTip.js';
import {FightControls} from './FightControls.js';
import {Game} from '../Game.js';
import * as skilldefault from '../skilldefault.js';
import {Player} from '../world/Character.js';
import * as AL from '../achievements/AchievementsList.js';

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
        item: this.inventory.equipped[0],
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
        item: this.inventory.equipped[1],
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
        item: this.inventory.equipped[2],
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
        item: this.inventory.equipped[3],
        // eslint-disable-next-line max-len
        text: `${this.inventory.equipped[3].name} (${(this.inventory.equipped[3].type === 'weapon') ? (this.inventory.equipped[3].dmg + ' dmg'):('+' + this.inventory.equipped[3].heal + ' hp')})`,
      }),
      playerTooltip: new Tooltip({
        x: data.stage.width()*2/10,
        y: data.stage.height()*4.5/10,
        width: 200,
        height: 120,
        text: 'Bobby Chan',
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

    this.phaseUI = {
      dialogueBox: new Tooltip({
        name: 'dialogue',
        x: data.stage.width()/6,
        y: data.stage.height() - 200,
        width: 600,
        height: 150,
        text: '',
      }),
    };

    this.phases = ['e1Attack', 'e1AttackInfo', 'e2Attack', 'e2AttackInfo', 'await'];
    this.currPhase = this.phases[0];
    // console.log(this.phases[0]);

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
    const enemyName = `${npc.name}`;
    this.tooltips['enemyTooltip'].text = enemyName;
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

  // Enemy fight strategy
  doEnemyAttack(player, item) {
    // console.log(item);
    if (player.hp >= 0) {
      player.hp -= item.dmg;
    }
    this.updatePlayerHP(player);
  }

  heal(player, item) {
    // Player is full health
    if (player.hp >= 100) {
      return;
    }
    player.hp += item.heal;
    this.updatePlayerHP(player);
  }

  getDialogueAttackText(attackerIndex) {
    let txt = '';
    if (this.fightOrder[attackerIndex] instanceof Player) {
      // eslint-disable-next-line max-len
      txt = `${this.fightOrder[attackerIndex].name} used ${this._currSelectedSkill.name.toUpperCase()}`;
    } else {
      // console.log(this.fightOrder[attackerIndex].inventoryItem);
      // eslint-disable-next-line max-len
      txt = `${this.fightOrder[attackerIndex].name} used ${this.fightOrder[attackerIndex].inventoryItem.name.toUpperCase()}`;
    }
    return txt;
  }

  getDialogueAttackInfoText(attackerIndex, player, npc) {
    let txt = '';
    if (this.fightOrder[attackerIndex] instanceof Player) {
      if (this._currSelectedSkill.type === 'weapon') {
        this.doDamage(npc, this._currSelectedSkill);
        // eslint-disable-next-line max-len
        txt = `${this._currSelectedSkill.name.toUpperCase()} did ${this._currSelectedSkill.dmg} damage!`;
      } else {
        this.heal(player, this._currSelectedSkill);
        // eslint-disable-next-line max-len
        txt = `${this._currSelectedSkill.name.toUpperCase()} healed ${this.fightOrder[attackerIndex].name} for ${this._currSelectedSkill.heal} health!`;
      }
    } else {
      // console.log(this.fightOrder[attackerIndex].inventoryItem);
      this.doEnemyAttack(player, this.fightOrder[attackerIndex].inventoryItem);
      // eslint-disable-next-line max-len
      txt = `${this.fightOrder[attackerIndex].name}'s ${this.fightOrder[attackerIndex].inventoryItem.name}`;
    }
    return txt;
  }

  updateFightPhases(player, npc) {
    let dialogueText = '';
    if (npc.hp <= 0) {
      player.hp = player.MAX_HP;
      const game = Game.getInstance();
      game.switchToMap();
    }

    if (this.currPhase === this.phases[0]) {
      // PHASE 0: p used x skill
      dialogueText = this.getDialogueAttackText(0); // attacker 0 in fightOrder array
    } else if (this.currPhase === this.phases[1]) {
      // PHASE 1: x skill did x.dmg
      dialogueText = this.getDialogueAttackInfoText(0, player, npc);
    } else if (this.currPhase === this.phases[2]) {
      // PHASE 2: p2 used y skill
      dialogueText = this.getDialogueAttackText(1);
    } else if (this.currPhase === this.phases[3]) {
      // PHASE 3: y skill did y.dmg
      dialogueText = this.getDialogueAttackInfoText(1, player, npc);
    }

    this.phaseUI['dialogueBox'].text = dialogueText;
    this.fightLayer.draw();
  }


  setFightOrder(player, npc) {
    // assign fight order based on speed
    if (player.fightSpeed >= npc.fightSpeed) {
      this.fightOrder = [player, npc];
    } else {
      this.fightOrder = [npc, player];
    }
  }

  getNextPhase(p) {
    let index = this.phases.indexOf(p);
    console.log('old phase', index);
    index++;
    if (index >= this.phases.length-1) {
      index = 0;
      // make dialogue box invisible to allow user to select next skill
      this.phaseUI['dialogueBox'].tipBox.visible(false);
      this.phaseUI['dialogueBox'].tipText.visible(false);
    }
    console.log('new phase', index, this.phases[index]);
    return this.phases[index];
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
    // sets who attacks first, is used in updateFightPhases
    this.setFightOrder(data.player, data.npc);
    this.controls.addControlBindings();

    // warrior - First fight with an NPC
    this.player.achievements.add(AL.warrior);
  }

  fightSceneLoad(player, npc) {
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
    this.fightLayer.add(
        this.phaseUI['dialogueBox'].renderBox,
        this.phaseUI['dialogueBox'].renderText,
    );
    this.phaseUI['dialogueBox'].tipBox.visible(false);
    this.phaseUI['dialogueBox'].tipText.visible(false);
    console.assert(this.phaseUI['dialogueBox'] != null);


    this.updatePlayerHP(player);
    this.updateNpcHP(npc);

    this.fightLayer.on('mouseover', function(evt) {
      const shape = evt.target;
      if (shape.name() === 'skill' || shape.name() === 'dialogue') {
        document.body.style.cursor = 'pointer';
      }
    });
    this.fightLayer.on('mouseout', function(evt) {
      const shape = evt.target;
      if (shape.name() === 'skill' || shape.name() === 'dialogue') {
        document.body.style.cursor = 'default';
      }
    });

    const fight = this;
    this.fightLayer.on('click', (evt) => {
      const shape = evt.target;
      if (shape.name() === 'skill') {
        console.log(fight.currPhase);
        this._currSelectedSkill = this.inventory.equipped[shape.attrs.id];
        fight.phaseUI['dialogueBox'].tipBox.visible(true);
        fight.phaseUI['dialogueBox'].tipText.visible(true);
        fight.updateFightPhases(player, npc);
      }

      if (shape.name() === 'dialogue' && fight.currPhase !== fight.phases[fight.phases.length-1]) {
        // console.log('clicked ', shape);
        fight.currPhase = fight.getNextPhase(fight.currPhase);
        fight.updateFightPhases(player, npc);
      }
    });

    this.fightLayer.draw();
  }
}
