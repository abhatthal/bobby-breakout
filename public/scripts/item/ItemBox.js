import {Environment} from '../world/Environment.js';
import {isColliding} from '../util/helper_functions.js';

export class ItemBox extends Environment {
  constructor(data) {
    super(data);
    this.item = data.item;

    this.shape.stroke('black');
    this.shape.strokeWidth(5);

    const shape = this.shape;
    Promise.resolve(this.item.img).then(function(imgValue) {
      // This ensures we wait for images to load before setting the fill pattern
      // This avoids black boxes.
      shape.fillPatternImage(imgValue);
    });
  }
}