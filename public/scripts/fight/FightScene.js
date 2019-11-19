import {Scene} from '../Scene.js';
import {Tooltip} from '../util/Tooltip.js';
import {FightControls} from './FightControls.js';
import * as skilldefault from '../skilldefault.js';

export class FightScene extends Scene {
  constructor(data) {
    super(data);
    this.fightLayer = new Konva.Layer();

    this.player = data.player;
    
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

    this.uiStuff ={
      activityCenter: new Konva.Rect({
        x: data.stage.width()/2 - data.stage.width()*3/5/2, // subtract half of rect width
        y: 0,
        width: data.stage.width()*3/5,
        height: 50,
        stroke: 'black',
        strokeWidth: 2
      }),
      skillsTab: new Konva.Rect({
        x: data.stage.width()/2 - data.stage.width()*2/3/2,
        y: data.stage.height() - data.stage.height()*3/5/2,
        width: data.stage.width()*2/3,
        height: data.stage.height()*3/5,
        stroke: 'black',
        strokeWidth: 2,
      }),
      player: new Konva.Rect({
        x: data.stage.width()*4/10,
        y: data.stage.height()*4.75/10,
        width: 80,
        height: 80,
        fill: 'grey'
      }),
      enemy: new Konva.Rect({
        x: data.stage.width()*6.5/10,
        y: data.stage.height()*3/10,
        width: 40,
        height: 40,
        fill: 'yellow'
      })
    }

    this.controls = new FightControls({
      layer: this.fightLayer,
      player: data.player,
      container: data.stage.container(),
      map: this.map,
      tooltips: this.tooltips,
    });

    this.fightLayer.draw();

    data.player.skillA1 = skilldefault.Skill1;
  }

  switchFrom(data) {
    this.controls.removeControlBindings();
    this.fightLayer.remove();
  }

  switchTo(data) {
    this.controls = new FightControls({
      layer: this.fightLayer,
      player: data.player,
      container: data.stage.container(),
      map: this.map,
      tooltips: this.tooltips,
      npc: data.npc,
    });
    data.stage.add(this.fightLayer);
    this.fightSceneLoad(data.player, data.npc);
    // this.fightLoop(data.player, data.npc);
    this.controls.addControlBindings();
  }

  fightSceneLoad(player, npc) {
    // #region old ui
    // const playerStatText = 'Bobby here! \nsmash all ppl \nblocking your way\n' + player.hp; //
    // const enemyStatText = 'Enemy: \ncome fight bobby\n\n' + npc.hp;
    // console.log(playerStatText);
    // this.tooltips['playerTooltip'].text = playerStatText;
    // this.tooltips['enemyTooltip'].text = enemyStatText;
    // this.fightLayer.add(this.tooltips['skillA1Tooltip'].renderBox, this.tooltips['skillA1Tooltip'].renderText);

    // const skillA2Tooltip = new Tooltip({
    //   x: 450,
    //   y: 400,
    //   width: 100,
    //   height: 50,
    //   text: 'A2 X',
    // });
    
    // const skillA3Tooltip = new Tooltip({
    //   x: 600,
    //   y: 400,
    //   width: 100,
    //   height: 50,
    //   text: 'A3 C',
    // });
    
    // const skillA4Tooltip = new Tooltip({
    //   x: 750,
    //   y: 400,
    //   width: 100,
    //   height: 50,
    //   text: 'A4 V',
    // });
    // this.fightLayer.add(skillA2Tooltip.renderBox, skillA2Tooltip.renderText);
    // this.fightLayer.add(skillA3Tooltip.renderBox, skillA3Tooltip.renderText);
    // this.fightLayer.add(skillA4Tooltip.renderBox, skillA4Tooltip.renderText);
    
    // this.fightLayer.add(this.tooltips['playerTooltip'].renderBox, this.tooltips['playerTooltip'].renderText);
    // this.fightLayer.add(this.tooltips['enemyTooltip'].renderBox, this.tooltips['enemyTooltip'].renderText);
    // this.fightLayer.add(this.tooltips['fightTooltip'].renderBox, this.tooltips['fightTooltip'].renderText);
    // this.fightLayer.add(this.tooltips['escapeTooltip'].renderBox, this.tooltips['escapeTooltip'].renderText);
    // #endregion

    this.fightLayer.add(
      this.uiStuff['activityCenter'],
      this.uiStuff['skillsTab'],
      this.uiStuff['player'],
      this.uiStuff['enemy']      
    );
    this.fightLayer.draw();
  }

  // doKeyfight(subject, opponent) {    
  //   // press Q for normal hit
  //   // normalattack.hpchange(npc, 0);
  //   // player.skillA1.hpchange(npc, 0);
  //   // npc.hp -= 50;

  //   // console.log(player.skillA1);

  //   subject.skillA1.hpChange(opponent, -50);

  //   // alert(player.skillA1.descripttion);
  //   // npc.skillA1.hpchange(-50);
  //   console.log(opponent.hp);
  // }

  // fightLoop(subject, opponent) {
  //   console.log(subject.fightSpeed, opponent.fightSpeed)
  //   // assume player act first
  //   if (subject.fightSpeed >= opponent.fightSpeed) {
  //     this.doKeyfight(subject, opponent);
  //     this.enemyfight(opponent, subject);
  //   } else {
  //     this.enemyfight(opponent, subject);
  //     this.doKeyfight(subject, opponent);
  //   }
  //   this.fightSceneLoad(subject, opponent);
  // }

  // // Enemy fight strategy
  // enemyfight(opponent, subject) {
  //   // alert(opponent.hp, subject.hp);
  //   // opponent.skillA1.hpchange(subject, 0);
  // }
}
  