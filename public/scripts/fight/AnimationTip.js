
export class AnimationTip {
  constructor(data) {
    this.primaryColor = data.primaryColor || this.getRandomColor();
    this.secondaryColor = data.secondaryColor || this.getRandomColor();
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
    const diffx = endpos.x - startpos.x;
    const diffy = endpos.y - startpos.y;
    const magnitude = Math.sqrt(diffx*diffx + diffy*diffy);
    const unitvecx = diffx / magnitude;
    const unitvecy = diffy / magnitude;
    let dx = unitvecx * speed;
    let dy = unitvecy * speed;

    if (Math.abs(endpos.x - startpos.x) < Math.abs(dx)) {
      dx = endpos.x - startpos.x;
    }
    if (Math.abs(endpos.y - startpos.y) < Math.abs(dy)) {
      dy = endpos.y - startpos.y;
    }

    // eslint-disable-next-line max-len
    if (Math.abs(endpos.x-startpos.x) < Math.abs(unitvecx*speed) && Math.abs(endpos.y-startpos.y) < Math.abs(unitvecy*speed)) {
      // finished animation
      this.hexagon.hide();
      layer.draw();
      return;
    }

    this.x = startpos.x + dx;
    this.y = startpos.y + dy;
    this.moveTo({x: this.x, y: this.y});

    layer.draw();

    setTimeout(() => {
      this.animationMove(layer,
          {
            x: this.x,
            y: this.y,
          },
          endpos,
          frame,
          speed);
    }, 10);
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
