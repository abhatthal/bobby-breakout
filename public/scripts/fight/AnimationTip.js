
export class AnimationTip {
  constructor(data) {
    this.primaryColor = this.getRandomColor();
    this.secondaryColor = this.getRandomColor();
    this.side = 5;
    this.radius = 20;

    this.hexagon = new Konva.RegularPolygon({
      x: data.x,
      y: data.y,
      sides: this.side, // this.randomnumber(),
      radius: this.radius, // this.randomnumber(),
      fill: this.primaryColor,
      stroke: this.secondaryColor,
      strokeWidth: 2, // this.randomnumber(),
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

  randomnumber(val) {
    return Math.round(Math.random() % val);
  }

  moveTo(pos) {
    this.hexagon.x(pos.x);
    this.hexagon.y(pos.y);
  }
/*
  sildTo(pos, frame) {
    this.hexagon.x = pos.x;
    this.hexagon.y = pos.y;
    let anim = new Konva.Animation(function(frame) {
      hexagon.x(
          Math.sin(frame));
    });
  }
*/
/*
  animationTo(pos) {
    hexagon.x(
        amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + centerX,
    );
    hexagon.y(
        amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + centerX,
    );
  }
*/
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
