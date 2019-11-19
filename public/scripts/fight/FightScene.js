import {Scene} from '../Scene.js';
import {Tooltip} from '../util/Tooltip.js';
import {FightControls} from './FightControls.js';

export class FightScene extends Scene {
  constructor(data) {
    super(data);
    this.fightLayer = new Konva.Layer();

    // Tooltip for fight
    this.tooltips = {
      fightTooltip: new Tooltip({
        x: 100,
        y: 100,
        width: 300,
        text: 'TIME TO FIGHT! coming later...\nE/SPACE TO RETURN',
      }),
    };

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
  }

  switchFrom(data) {
    this.controls.removeControlBindings();
    this.fightLayer.remove();
  }

  switchTo(data) {
    data.stage.add(this.fightLayer);
    this.controls.addControlBindings();
  }
}
