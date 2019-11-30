import {BoundingBox} from './BoundingBox.js';
import {genID, loadImage} from '../util/helper_functions.js';

export class Entity {
  constructor(data) {
    this.name = data.name;
    this.width = data.width;
    this.height = data.height;
    this.x = data.x;
    this.y = data.y;
    this.id = genID();
    this.hp = (data.hp) ? data.hp : null;
    this.dmg = (data.dmg) ? data.dmg : null;
    this.globalX = data.globalX;
    this.globalY = data.globalY;
    this.offsetX = 0;
    this.offsetY = 0;

    let imageObj;
    if (data.image) {
      const promise = loadImage(data.image);
      promise.then(function(result) {
        // console.log(result);
        imageObj = result;
      });
    };
    this.group = new Konva.Group({
      x: this.x,
      y: this.y,
      id: this.id,
    });
    this.shape = new Konva.Rect({
      width: data.width,
      height: data.height,
      fill: (data.colour) ? data.colour : null,
      fillPatternImage: (data.image) ? imageObj : null,
      name: data.name,
    });

    this.bbox = new BoundingBox(this.group, this.shape, false);
    this.bboxArea = this.bbox.boundingBox;

    this.group.add(this.shape);
    this.group.add(this.bboxArea);
  } // end constructor


  get render() {
    return this.group;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get bboxArea() {
    return this._bboxArea;
  }

  get hp() {
    return this._hp;
  }

  get dmg() {
    return this._dmg;
  }

  set x(val) {
    console.assert(typeof val === 'number');
    this._x = val;
  }

  set y(val) {
    console.assert(typeof val === 'number');
    this._y = val;
  }

  set height(height) {
    console.assert(typeof height === 'number');
    this._height = height;
  }

  set width(width) {
    console.assert(typeof width === 'number');
    this._width = width;
  }

  set bboxArea(area) {
    console.assert(area != null);
    this._bboxArea = area;
  }

  set hp(val) {
    this._hp = val;
  }

  set dmg(val) {
    this._dmg = val;
  }
}
