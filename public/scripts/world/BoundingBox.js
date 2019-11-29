import {degreesToRadians} from '../util/helper_functions.js';

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

export class LineBoundingBox {
  constructor(group, points, isVisible) {
    console.assert(points != null);
    console.assert(group != null);

    // console.log(points.length, points);

    // data pairs
    const pairs = [];
    for (let i = 0; i < points.length; i+=2) {
      pairs.push({
        x: points[i],
        y: points[i+1],
      });
    }
    // console.log(pairs);

    this._lineBBox = [];
    // create lines from p1 -> p2
    for (let i = 0; i < pairs.length - 1; i++) {
      const p1 = pairs[i];
      const p2 = pairs[i+1];
      // console.log(p1, p2);
      // continue;
      const currLine = new Konva.Line({
        points: [p1.x, p1.y, p2.x, p2.y],
        stroke: 'black',
        strokeWidth: 10,
      });
      const boundingArea = currLine.getClientRect({relativeTo: group});
      const bbox = new Konva.Rect({
        x: boundingArea.x,
        y: boundingArea.y,
        width: boundingArea.width,
        height: boundingArea.height,
        stroke: 'cyan',
        strokeWidth: (isVisible) ? 5 : 0,
      });
      this._lineBBox.push(bbox);
    }
    console.log(this._lineBBox);

    // add all line bounding boxes to group
    for (let i = 0; i < this._lineBBox.length; i++) {
      group.add(this._lineBBox[i]);
    }
  }

  get boundingBox() {
    return this.box;
  }
}

export class VisionCone {
  constructor(group, shape) {
    console.assert(shape != null);
    console.assert(group != null);
    this.boundingArea = shape.getClientRect({relativeTo: group}); // edge of parent
    this.cone = new Konva.Wedge({
      x: this.boundingArea.x + this.boundingArea.width / 2,
      y: this.boundingArea.y + this.boundingArea.height,
      radius: 80,
      angle: 80,
      rotation: 50,
      stroke: 'black',
      strokeWidth: 4,
    });

    this.coneBindingArea = new Konva.Rect({
      x: this.boundingArea.x + this.boundingArea.width / 2 - 55,
      y: this.boundingArea.y + this.boundingArea.height,
      cornerRadius: 5,
      offset: this.boundingArea.width / 2,
      width: 110,
      height: 100,
      stroke: 'black',
      strokeWidth: 2,
    });

    this.startPoints = {
      x: this.boundingArea.x + this.boundingArea.width / 2,
      y: this.boundingArea.y + this.boundingArea.height,
    };

    this.feelerStart = new Konva.Line({
      points: [
        this.startPoints.x,
        this.startPoints.y,
        this.startPoints.x +
          this.cone.getAttr('radius') * Math.cos( degreesToRadians(this.cone.getAttr('rotation')) ),
        this.startPoints.y +
          this.cone.getAttr('radius') * Math.sin( degreesToRadians(this.cone.getAttr('rotation')) ),
      ],
      stroke: 'red',
      strokeWidth: 4,
    });

    this.feelerMid = new Konva.Line({
      points: [
        this.startPoints.x,
        this.startPoints.y,
        this.startPoints.x +
          this.cone.getAttr('radius') * Math.cos( degreesToRadians(this.cone.getAttr('rotation') +
          this.cone.getAttr('angle')/2) ),
        this.startPoints.y +
          this.cone.getAttr('radius') * Math.sin( degreesToRadians(this.cone.getAttr('rotation') +
          this.cone.getAttr('angle')/2) ),
      ],
      stroke: 'red',
      strokeWidth: 4,
    });

    this.feelerEnd = new Konva.Line({
      points: [
        this.startPoints.x,
        this.startPoints.y,
        this.startPoints.x +
          this.cone.getAttr('radius') * Math.cos( degreesToRadians(this.cone.getAttr('rotation') +
          this.cone.getAttr('angle')) ),
        this.startPoints.y +
          this.cone.getAttr('radius') * Math.sin( degreesToRadians(this.cone.getAttr('rotation') +
          this.cone.getAttr('angle')) ),
      ],
      stroke: 'red',
      strokeWidth: 4,
    });
  }// end constructor

  get coneArea() {
    return this.cone;
  }

  get coneRect() {
    return this.coneBindingArea;
  }

  get feelers() {
    return [this.feelerStart, this.feelerMid, this.feelerEnd];
  }
}
