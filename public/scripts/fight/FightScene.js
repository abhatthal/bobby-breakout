import {Scene} from '../Scene.js';
import {Tooltip} from '../util/Tooltip.js';

export class FightScene extends Scene {
  constructor(data) {
    super(data);
    this.fightLayer = new Konva.Layer();

    // Tooltip for fight
    const fightTooltip = new Tooltip({
      x: 100,
      y: 100,
      width: 300,
      text: 'TIME TO FIGHT! coming later...\nE/SPACE TO RETURN',
    });

    this.fightLayer.add(fightTooltip.renderBox, fightTooltip.renderText);
    this.fightLayer.draw();
  }

  switchFrom(data) {
    this.fightLayer.remove();
  }

  switchTo(data) {
    data.stage.add(this.fightLayer);
  }
}
