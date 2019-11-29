import {Scene} from '../Scene.js';
import {Tooltip} from '../util/ToolTip.js';
// import {CharacterLayout} from './CharacterLayout.js';
// import {Dialogtip} from './DialogTip.js';

export class LoadScene extends Scene {
  constructor(data) {
    super(data);
    this.loadLayer = new Konva.Layer();

    // Tooltip for fight
    this.tooltips = {
      loadTooltip: new Tooltip({
        x: 250,
        y: 30,
        width: 1000,
        height: 1100,
        primaryColor: 'black',
        secondaryColor: 'black',
        tertiaryColor: 'black',
        text: 'TESTTTTTTTTTTTTTTIIIIIIIIINNNNNNNNNNNGGGGGGGGGGGGG',
      }),
    };
    this.counter = 0;
    this.intervalID = null;
    this.loadLayer.draw();
  }

  // incomplete, can not continous show hide a tip
  loadSceneLoad(data) {
    console.log('load scene start');
    data.stage.add(this.loadLayer);
    this.loadLayer.add(
        this.tooltips['loadTooltip'].renderBox,
        this.tooltips['loadTooltip'].renderText,
    );

    while (this.counter < 5) {
      this.interval();
    }
    clearInterval(this.intervalID);
    console.log('load scene end');
    this.counter = 0;
  }

  interval() {
    this.intervalID = setInterval(this.flashLayer(), 400);
  }

  flashLayer() {
    console.log('did' + this.counter);
    if (this.counter % 2 === 0) {
      this.loadLayer.show(
          this.tooltips['loadTooltip'].renderBox,
          this.tooltips['loadTooltip'].renderText,
      );
      this.loadLayer.draw();
      console.log('test' + this.counter);
    } else {
      this.loadLayer.hide(
          this.tooltips['loadTooltip'].renderBox,
          this.tooltips['loadTooltip'].renderText,
      );
      this.loadLayer.draw();
      console.log('test222' + this.counter);
    }
    this.counter++;
  }

}
