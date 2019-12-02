
export class AnimationTip {
  constructor(data) {
    this.primaryColor = this.getRandomColor();
    this.secondaryColor = this.getRandomColor();
    this.side = (data.side) ? data.side : 5;
    this.radius = (data.radius) ? data.radius : 30;

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

  animationMove(layer, startpos, endpos, frame, speed) {
    layer.draw();
    this.moveTo(startpos);
    const diffx = endpos.x - startpos.x;
    const diffy = endpos.y - startpos.y;
    const magnitude = (diffx^2 + diffy^2)^0.5;
    const unitvecx = diffx / magnitude;
    const unitvecy = diffy / magnitude;

    this.x += unitvecx * speed;
    this.y += unitvecy * speed;

    if (this.x <= endpos.x || this.y <= endpos.y) {
      this.hexagon.hide();
      return;
    } else {
      setTimeout(() => {
        this.animationMove(layer, {x: startpos.x + unitvecx * speed,
          y: startpos.y + unitvecy * speed}, endpos, frame, speed);
      }, 10);
    }
    // this.animationtips['animationItem1'].renderhexagon.show();
    // this.animationtips['animationItem1'].slidTo(endpos, frame);
    // this.animationtips['animationItem1'].renderhexagon.hide();
  }

  animationRotate(layer, speed, frame, counter) {
    if (counter = 0) {
      return;
    } else {
      setTimeout(() => {
        this.hexagon.rotate(speed);
        layer.draw();
        this.animationRotate(layer, speed, frame, counter - 1);
      }, frame);
    }
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
