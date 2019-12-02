import {Scene} from '../Scene.js';
import {Tooltip} from '../util/ToolTip.js';
// import {CharacterLayout} from './CharacterLayout.js';
// import {Dialogtip} from './DialogTip.js';
import {AnimationTip} from './AnimationTip.js';

export class LoadScene extends Scene {
  constructor(data) {
    super(data);
    this.loadLayer = new Konva.Layer();

    // Tooltip for fight
    this.tooltips = {
      loadTooltip: new Tooltip({
        x: 100,
        y: 50,
        width: 1000,
        height: 1100,
        primaryColor: 'black',
        secondaryColor: 'black',
        tertiaryColor: 'black',
        text: 'Enemy encountered! Be ready to fight!',
      }),
    };

    this.loadAnimationItem = {
      animationRotate: new AnimationTip({
        x: data.stage.width() * 0.5,
        y: data.stage.height() * 0.5,
      }),
    };
  }

  // incomplete, can not continous show hide a tip
  loadSceneLoad(data) {
    console.log('load scene start');
    data.stage.add(this.loadLayer);
    this.loadLayer.add(
        this.tooltips['loadTooltip'].renderBox,
        this.tooltips['loadTooltip'].renderText,
        this.loadAnimationItem['animationRotate'].renderhexagon,
    );
    // this.rotate(this.loadAnimationItem['animationRotate'].renderhexagon, 10000, 10);
    this.loadAnimationItem['animationRotate'].animationRotate(this.loadLayer,10000,10,5000);
    console.log('load scene end');
    this.loadLayer.draw();
  }

  rotate(obj, speed, frame) {
    setTimeout(() => {
      obj.rotate(speed);
      this.loadLayer.draw();
    }, frame);
  }
}
