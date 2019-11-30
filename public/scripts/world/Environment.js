import {Entity} from './Entity.js';
import {DIRECTION} from '../util/helper_functions.js';

export class Environment extends Entity {
  constructor(data) {
    super(data);
    this.impassible = data.impassible || false;
  }

  get impassible() {
    return this._impassible;
  }

  set impassible(val) {
    console.assert(typeof val === 'boolean');
    this._impassible = val;
  }

  scroll(dir, speed) {
    switch (dir) {
      case DIRECTION.LEFT:
        this.x += speed * DIRECTION.UNIT_LEFT;
        this.group.x(this.x);
        break;
      case DIRECTION.RIGHT:
        this.x += speed * DIRECTION.UNIT_RIGHT;
        this.group.x(this.x);
        break;
      case DIRECTION.UP:
        this.y += speed * DIRECTION.UNIT_UP;
        this.group.y(this.y);
        break;
      case DIRECTION.DOWN:
        this.y += speed * DIRECTION.UNIT_DOWN;
        this.group.y(this.y);
        break;
    }
  }
}
