import {Scene} from '../Scene.js';
import {Tooltip} from '../util/ToolTip.js';
import {FightControls} from './FightControls.js';
import * as skilldefault from '../skilldefault.js';

export class FightScene extends Scene {
  constructor(data) {
    super(data);
    this.fightLayer = new Konva.Layer();

    this.player = data.player;
    this.inventory = data.player._inventory;

    // Tooltip for fight
    this.tooltips = {
      fightTooltip: new Tooltip({
        x: 250,
        y: 30,
        width: 500,
        height: 150,
        text: 'TIME TO FIGHT! coming later...\nE/SPACE TO RETURN',
      }),
      skillA1Tooltip: new Tooltip({
        name: 'skill',
        shape_id: '0',
        x: data.stage.width()/6,
        y: data.stage.height() - 100,
        width: 300,
        height: 50,
        text: `${this.inventory.equipped[0].name}`,
      }),
      skillA2Tooltip: new Tooltip({
        name: 'skill',
        shape_id: '1',
        x: data.stage.width()/6 + 300,
        y: data.stage.height() - 100,
        width: 300,
        height: 50,
        text: `${this.inventory.equipped[1].name}`,
      }),
      skillA3Tooltip: new Tooltip({
        name: 'skill',
        shape_id: '2',
        x: data.stage.width()/6,
        y: data.stage.height() - 200,
        width: 300,
        height: 50,
        text: `${this.inventory.equipped[2].name}`,
      }),
      skillA4Tooltip: new Tooltip({
        name: 'skill',
        shape_id: '3',
        x: data.stage.width()/6 + 300,
        y: data.stage.height() - 200,
        width: 300,
        height: 50,
        text: `${this.inventory.equipped[3].name}`,
      }),
      playerTooltip: new Tooltip({
        x: 20,
        y: 130,
        width: 150,
        height: 300,
        text: '',
      }),
      enemyTooltip: new Tooltip({
        x: 820,
        y: 30,
        width: 150,
        height: 300,
        text: '',
      }),
    };

    this.uiStuff = {
      activityCenter: new Konva.Rect({
        x: data.stage.width()/2 - data.stage.width()*3/5/2, // subtract half of rect width
        y: 0,
        width: data.stage.width()*3/5,
        height: 50,
        stroke: 'black',
        strokeWidth: 2,
      }),
      skillsTab: new Konva.Rect({
        x: data.stage.width()/2 - data.stage.width()*2/3/2,
        y: data.stage.height() - data.stage.height()*3/5/2,
        width: data.stage.width()*2/3,
        height: data.stage.height()*3/5,
        stroke: 'black',
        strokeWidth: 2,
      }),
      skill1: new Konva.Rect({
        x: data.stage.width()/2 - data.stage.width()*2/3/2 + 50,
        y: data.stage.height() - data.stage.height()*3/5/2 + 25,
        width: 100,
        height: 50,
        stroke: 'black',
        strokeWidth: 2,
        text: 'Q',
      }),
      skill2: new Konva.Rect({
        x: data.stage.width()/2 - data.stage.width()*2/3/2 + 50 + 100 + 10,
        y: data.stage.height() - data.stage.height()*3/5/2 + 25,
        width: 100,
        height: 50,
        stroke: 'black',
        strokeWidth: 2,
        text: 'N/A',
      }),
      skill3: new Konva.Rect({
        x: data.stage.width()/2 - data.stage.width()*2/3/2 + 50 + 100 + 10 + 100 + 10,
        y: data.stage.height() - data.stage.height()*3/5/2 + 25,
        width: 100,
        height: 50,
        stroke: 'black',
        strokeWidth: 2,
        text: 'N/A',
      }),
    };

    this.uiEntities = {
      player: new Konva.Rect({
        x: data.stage.width()*4/10,
        y: data.stage.height()*4.75/10,
        width: 80,
        height: 80,
        fill: 'grey',
      }),
      enemy: new Konva.Rect({
        x: data.stage.width()*6.5/10,
        y: data.stage.height()*3/10,
        width: 40,
        height: 40,
        fill: 'yellow',
      }),
    };

    this.controls;

    this.fightLayer.draw();

    data.player.skillA1 = skilldefault.Skill1;
  }

  doDamage(opponent, item) {
    if (opponent.hp >= 0) {
      opponent.hp -= item.dmg;
    }

    // temp update enemy hp
    // abstract this into a general function later that updates all things to do with ui?
    const enemyStatText = 'Enemy: \ncome fight bobby\n\n' + opponent.hp;
    this.tooltips['enemyTooltip'].text = enemyStatText;
    this.fightLayer.add(
        this.tooltips['enemyTooltip'].renderBox,
        this.tooltips['enemyTooltip'].renderText,
    );
    this.fightLayer.draw();
  }

  heal(player, item) {
    // Player is full health
    if (player.hp >= 100) {
      return;
    }

    player.hp += item.heal;
    const playerStatText = 'Bobby here! \nsmash all ppl \nblocking your way\n' + player.hp;
    this.tooltips['playerTooltip'].text = playerStatText;
    this.fightLayer.add(
        this.tooltips['playerTooltip'].renderBox,
        this.tooltips['playerTooltip'].renderText,
    );
    this.fightLayer.draw();
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
      ui: this.uiStuff,
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
    const playerStatText = 'Bobby here! \nsmash all ppl \nblocking your way\n' + player.hp;
    const enemyStatText = 'Enemy: \ncome fight bobby\n\n' + npc.hp;
    console.log(playerStatText);
    this.tooltips['playerTooltip'].text = playerStatText;
    this.tooltips['enemyTooltip'].text = enemyStatText;
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
        this.tooltips['playerTooltip'].renderBox,
        this.tooltips['playerTooltip'].renderText,
    );
    this.fightLayer.add(
        this.tooltips['enemyTooltip'].renderBox,
        this.tooltips['enemyTooltip'].renderText,
    );

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
    this.fightLayer.add(
        this.tooltips['fightTooltip'].renderBox,
        this.tooltips['fightTooltip'].renderText,
    );

    this.fightLayer.draw();
  }
}
