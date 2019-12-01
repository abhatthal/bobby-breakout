export class BoundingBox {
  constructor(group, shape, isVisible) {
    console.assert(shape != null);
    console.assert(group != null);
    this.boundingArea = shape.getClientRect({relativeTo: group});
    this.box = new Konva.Rect({
      x: this.boundingArea.x,
      y: this.boundingArea.y,
      width: this.boundingArea.width,
      height: this.boundingArea.height,
      stroke: 'cyan',
      strokeWidth: (isVisible) ? 5 : 0,
    });
  }

  get boundingBox() {
    return this.box;
  }
}

export class VisionBox {
  constructor(data) {
    const group = data.group;
    const shape = data.shape;
    const width = data.width || 110;
    const height = data.height || 100;

    console.assert(shape != null);
    console.assert(group != null);
    this.boundingArea = shape.getClientRect({relativeTo: group}); // edge of parent
    const offsetX = data.offsetX || - (this.boundingArea.width / 2 - width/2);
    const offsetY = data.offsetY || - (this.boundingArea.height);

    this.rectBindingArea = new Konva.Rect({
      x: this.boundingArea.x - offsetX,
      y: this.boundingArea.y - offsetY,
      cornerRadius: 5,
      width: width,
      height: height,
      stroke: 'black',
      // fill: 'magenta',
      strokeWidth: 2,
    });

    this.startPoints = {
      x: this.boundingArea.x + this.boundingArea.width / 2,
      y: this.boundingArea.y + this.boundingArea.height,
    };
  }// end constructor

  get visionRect() {
    return this.rectBindingArea;
  }
}
