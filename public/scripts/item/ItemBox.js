import {Environment} from '../world/Environment.js';

export class ItemBox extends Environment {
  constructor(data) {
    super(data);
    this.item = data.item;
    this.scaleY = (data.scaleY) ? data.scaleY : 0.1;
    this.scaleX = (data.scaleX) ? data.scaleX : 0.1;

    this.shape.stroke('black');
    this.shape.strokeWidth(5);

    const shape = this.shape;
    Promise.resolve(this.item.img).then(function(imgValue) {
      // This ensures we wait for images to load before setting the fill pattern
      // This avoids black boxes.
      shape.fillPatternImage(imgValue);
    });

    this.shape.fillPatternScaleX(this.scaleX);
    this.shape.fillPatternScaleY(this.scaleY);
  }
}