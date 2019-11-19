import {Scene} from '../Scene.js';
import {Tooltip} from '../util/Tooltip.js';
import {FightControls} from './FightControls.js';
import * as skilldefault from './skilldefault.js';

export class FightScene extends Scene {
  constructor(data) {
    super(data);
    this.fightLayer = new Konva.Layer();
    
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
        x: 300,
        y: 400,
        width: 100,
        height: 50,
        text: 'A1 Z',
      }),
      escapeTooltip: new Tooltip({
        x: 300,
        y: 320,
        width: 550,
        height: 150,
        text: 'Q to normal attack; E to escape fight',
      }),
    };
    
    //#region Tooltip for fight scene
    /*
    const skillA2Tooltip = new Tooltip({
      x: 450,
      y: 400,
      width: 100,
      height: 50,
      text: 'A2 X',
    });
    
    const skillA3Tooltip = new Tooltip({
      x: 600,
      y: 400,
      width: 100,
      height: 50,
      text: 'A3 C',
    });
    
    const skillA4Tooltip = new Tooltip({
      x: 750,
      y: 400,
      width: 100,
      height: 50,
      text: 'A4 V',
    });
    
    const PlayerTooltip = new Tooltip({
      x: 20,
      y: 130,
      width: 150,
      height: 300,
      text: playerStatText, // 'Bobby here! \nsmash all ppl \nblocking your way' + `${player.hp}`,
    });
    
    const EnemyTooltip = new Tooltip({
      x: 820,
      y: 30,
      width: 150,
      height: 300,
      text: enemyStatText,
    });
    */
   //#endregion

    this.controls = new FightControls({
      layer: this.fightLayer,
      player: data.player,
      container: data.stage.container(),
      map: this.map,
      tooltips: this.tooltips,
    });
    this.fightLayer.add(
      this.tooltips['fightTooltip'].renderBox,
      this.tooltips['fightTooltip'].renderText,
    );
    this.fightLayer.draw();

    data.player.skillA1 = skilldefault.Skill1;
  }

  switchFrom(data) {
    this.controls.removeControlBindings();
    this.fightLayer.remove();
  }

  switchTo(data) {
    data.stage.add(this.fightLayer);
    this.fightSceneLoad(player, npc);
    this.controls.addControlBindings();
  }

  fightSceneLoad(player, npc) {
    const playerStatText = 'Bobby here! \nsmash all ppl \nblocking your way\n' + player.hp; //
    const enemyStatText = 'Enemy: \ncome fight bobby\n\n' + npc.hp;
    console.log(playerStatText);
    const playerTooltip = new Tooltip({
      x: 20,
      y: 130,
      width: 150,
      height: 300,
      text: playerStatText,
    });
  
    const enemyTooltip = new Tooltip({
      x: 820,
      y: 30,
      width: 150,
      height: 300,
      text: enemyStatText,
    });
    fightLayer.add(skillA1Tooltip.renderBox, skillA1Tooltip.renderText);
    /*
    fightLayer.add(skillA2Tooltip.renderBox, skillA2Tooltip.renderText);
    fightLayer.add(skillA3Tooltip.renderBox, skillA3Tooltip.renderText);
    fightLayer.add(skillA4Tooltip.renderBox, skillA4Tooltip.renderText);
    */
    fightLayer.add(playerTooltip.renderBox, playerTooltip.renderText);
    fightLayer.add(enemyTooltip.renderBox, enemyTooltip.renderText);
    fightLayer.add(fightTooltip.renderBox, fightTooltip.renderText);
    fightLayer.add(escapeTooltip.renderBox, escapeTooltip.renderText);
    fightLayer.draw();
  }

  doKeyfight(keys) {
    // trigger escape with E
    if (keys[32] || keys[69]) {
      fightLayer.remove();
      stage.add(layer);
      inFightScene = false;
    } else if (keys[81]) {
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
  }

  fightLoop(subject, opponent) {
    // assume player act first
    if (subject.fightSpeed >= opponent.fightSpeed) {
      if (inFightScene) {
        doKeyfight(keys, opponent);
        if (opponent.hp <= 0) {
          inFightScene = false;
        }
      }
      if (inFightScene) {
        enemyfight(opponent, subject);
        if (subject.hp <= 0) {
          inFightScene = false;
        }
      }
    } else {
      if (inFightScene) {
        enemyfight(opponent, subject);
        if (subject.hp <= 0) {
          inFightScene = false;
        }
      }
      if (inFightScene) {
        doKeyfight(keys, opponent);
        if (opponent.hp <= 0) {
          inFightScene = false;
        }
      }
    }
    fightSceneLoad(player, npc);
  }

  // Enemy fight strategy
  enemyfight(opponent, subject) {
    // alert(opponent.hp, subject.hp);
    // opponent.skillA1.hpchange(subject, 0);
  }
}
  