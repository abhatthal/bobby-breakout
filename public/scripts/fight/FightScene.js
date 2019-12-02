import {Scene} from '../Scene.js';
import {FightControls} from './FightControls.js';
import * as skilldefault from '../skilldefault.js';
import {CharacterLayout} from './CharacterLayout.js';
import {Dialogtip} from './DialogTip.js';
import {AnimationTip} from './AnimationTip.js';

export class FightScene extends Scene {
  constructor(data) {
    super(data);
    this.fightLayer = new Konva.Layer();
    this.player = data.player;

    this.animationtips = {
      animationItem1: new AnimationTip({
        x: data.stage.width() * 0.3,
        y: data.stage.height() * 0.3,
        side: 6,
        raidus: 20,
      }),
    };

    this.CharacterLayout = {
      playerLayout: new CharacterLayout({
        x: data.stage.width() * 0.1,
        y: data.stage.height() * 0.2,
      }),

      enemyLayout: new CharacterLayout({
        x: data.stage.width() * 0.8,
        y: data.stage.height() * 0.2,
      }),
    };

    this.dialogtips = {
      playerDialogtip: new Dialogtip({
        x: data.stage.width() * 0.1,
        y: data.stage.height() * 0.2 - 100,
        width: 150,
        height: 300,
        text: '',
      }),

      enemyDialogtip: new Dialogtip({
        x: data.stage.width() * 0.8,
        y: data.stage.height() * 0.2 - 100,
        width: 150,
        height: 300,
        text: '',
      }),

      fightDialogtip: new Dialogtip({
        x: data.stage.width() * 0.3,
        y: data.stage.height() * 0.2 - 100,
        width: 500,
        height: 150,
        text: 'TIME TO FIGHT! coming later...\nE/SPACE TO RETURN',
      }),
      skillA1Dialogtip: new Dialogtip({
        x: data.stage.width() * 0.3,
        y: data.stage.height() * 0.9,
        width: 150,
        height: 50,
        text: 'A1 Z',
      }),
      skillA2Dialogtip: new Dialogtip({
        x: data.stage.width() * 0.3 + 150,
        y: data.stage.height() * 0.9,
        width: 150,
        height: 50,
        text: 'A2 X',
      }),
      skillA3Dialogtip: new Dialogtip({
        x: data.stage.width() * 0.3 + 300,
        y: data.stage.height() * 0.9,
        width: 150,
        height: 50,
        text: 'A3 C',
      }),
      skillA4Dialogtip: new Dialogtip({
        x: data.stage.width() * 0.3 + 450,
        y: data.stage.height() * 0.9,
        width: 150,
        height: 50,
        text: 'A4 V',
      }),
      escapeDialogtip: new Dialogtip({
        x: data.stage.width() * 0.3,
        y: data.stage.height() * 0.9 - 80,
        width: 600,
        height: 150,
        text: 'Q to normal attack; E to escape fight',
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

  switchFrom(data) {
    console.assert(data != null);
    this.controls.removeControlBindings();
    this.fightLayer.remove();
  }

  switchTo(data) {
    this.controls = new FightControls({
      layer: this.fightLayer,
      player: data.player,
      container: data.stage.container(),
      tooltips: this.tooltips,
      dialogtips: this.dialogtips,
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

  animation1(obj, startpos, endpos, frame) {
    this.fightLayer.draw();
    obj.moveTo(startpos);
    const speed = 30;
    const diffx = endpos.x - startpos.x;
    const diffy = endpos.y - startpos.y;
    const magnitude = (diffx^2 + diffy^2)^0.5;
    const unitvecx = diffx / magnitude;
    const unitvecy = diffy / magnitude;

    obj.x += unitvecx * speed;
    obj.y += unitvecy * speed;

    if (obj.x <= endpos.x || obj.y <= endpos.y) {
      obj.hide();
      return;
    } else {
      setTimeout(() => {
        this.animation1(obj, {x: startpos.x + unitvecx * speed, y: startpos.y + unitvecy * speed},
            endpos, frame);
      }, 10);
    }
    // this.animationtips['animationItem1'].renderhexagon.show();
    // this.animationtips['animationItem1'].slidTo(endpos, frame);
    // this.animationtips['animationItem1'].renderhexagon.hide();
  }

  fightSceneLoad(player, npc) {
    // #region old ui
    const playerStatText = 'Bobby here! \nsmash all ppl \nblocking your way\n' + player.hp; //
    const enemyStatText = 'Enemy: \ncome fight bobby\n\n' + npc.hp;

    this.dialogtips['playerDialogtip'].text = playerStatText;
    this.dialogtips['enemyDialogtip'].text = enemyStatText;

    this.fightLayer.add(
        this.dialogtips['skillA1Dialogtip'].renderBox,
        this.dialogtips['skillA1Dialogtip'].renderText,
    );

    this.fightLayer.add(
        this.dialogtips['skillA2Dialogtip'].renderBox,
        this.dialogtips['skillA2Dialogtip'].renderText,
    );
    this.fightLayer.add(
        this.dialogtips['skillA3Dialogtip'].renderBox,
        this.dialogtips['skillA3Dialogtip'].renderText,
    );
    this.fightLayer.add(
        this.dialogtips['skillA4Dialogtip'].renderBox,
        this.dialogtips['skillA4Dialogtip'].renderText,
    );

    this.fightLayer.add(
        this.dialogtips['fightDialogtip'].renderBox,
        this.dialogtips['fightDialogtip'].renderText,
    );
    this.fightLayer.add(
        this.dialogtips['escapeDialogtip'].renderBox,
        this.dialogtips['escapeDialogtip'].renderText,
    );

    this.fightLayer.add(
        this.dialogtips['playerDialogtip'].renderBox,
        this.dialogtips['playerDialogtip'].renderText,
        this.dialogtips['enemyDialogtip'].renderBox,
        this.dialogtips['enemyDialogtip'].renderText,
    );

    this.fightLayer.add(
        this.animationtips['animationItem1'].renderhexagon,
    );
    this.animationtips['animationItem1'].moveTo({x: this.x, y: this.y});
    /*
    this.animation1(this.animationtips['animationItem1'],
        {x: this.CharacterLayout['playerLayout'].x, y: this.CharacterLayout['playerLayout'].y},
        {x: this.CharacterLayout['enemyLayout'].x, y: this.CharacterLayout['enemyLayout'].y}, 10);
*/
  this.animationtips['animationItem1'].animationMove(this.fightLayer, {x: this.CharacterLayout['playerLayout'].x, y: this.CharacterLayout['playerLayout'].y},
  {x: this.CharacterLayout['enemyLayout'].x, y: this.CharacterLayout['enemyLayout'].y}, 10, 30);

    this.fightLayer.add(
        this.CharacterLayout['playerLayout'].renderheadBox,
        this.CharacterLayout['playerLayout'].renderbodyBox,
        this.CharacterLayout['playerLayout'].renderleftlegBox,
        this.CharacterLayout['playerLayout'].renderrightlegBox,
        this.CharacterLayout['playerLayout'].renderleftarmBox,
        this.CharacterLayout['playerLayout'].renderrightarmBox,

        this.CharacterLayout['enemyLayout'].renderheadBox,
        this.CharacterLayout['enemyLayout'].renderbodyBox,
        this.CharacterLayout['enemyLayout'].renderleftlegBox,
        this.CharacterLayout['enemyLayout'].renderrightlegBox,
        this.CharacterLayout['enemyLayout'].renderleftarmBox,
        this.CharacterLayout['enemyLayout'].renderrightarmBox,
    );

    // #endregion

    // #region new ui
    // this.fightLayer.add(
    //   this.uiStuff['activityCenter'],
    //   this.uiStuff['skillsTab'],
    //   this.uiStuff['skill1'],
    //   this.uiStuff['skill2'],
    //   this.uiStuff['skill3'],
    //   this.uiEntities['player'],
    //   this.uiEntities['enemy']
    // );
    // #endregion
    this.fightLayer.draw();
  }
}
