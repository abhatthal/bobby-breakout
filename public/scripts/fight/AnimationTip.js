import {genID} from '../util/helper_functions.js';

export class AnimationTip {
  constructor(data) {
    this.primaryColor = this.getRandomColor();
    this.secondaryColor = this.getRandomColor();

    this.hexagon = new Konva.RegularPolygon({
      x: 0,
      y: 0,
      sides: this.randomnumber(),
      radius: this.randomnumber(),
      fill: this.primaryColor,
      stroke: this.secondaryColor,
      strokeWidth: this.randomnumber(),
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  randomnumber() {
    return Math.random() % 10;
  }

  moveTo(pos) {
    this.hexagon.x = pos.x;
    this.hexagon.y = pos.y;
  }

  animationTo(pos) {
    hexagon.x(
        amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + centerX,
    );
    hexagon.y(
        amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + centerX,
    );
  }

  get renderhexagon() {
    return this.hexagon;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(val) {
    this._x = val;
  }

  set y(val) {
    this._y = val;
  }
}
