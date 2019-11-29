import {genID} from '../util/helper_functions.js';

export class CharacterLayout {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.width = (data.width) ? data.width : 200; // default to 160 if not specified
    this.height = (data.height) ? data.height : 400;
    this.id = genID();

    this.primaryColor = '#b22222'; // firebrick
    this.secondaryColor = '#0000ff'; // blue
    this.tertiaryColor = 'black';

    this.group = new Konva.Group({
      // x, y specific to text and box for now since we're not rendering by group
      // when rendering by group works, comment out x, y attributes for text and box
      // and assign x, y here
      // remember to update position in moveTo if doing so

      // x: this.x,
      // y: this.y,
      id: this.id,
    });

    this.headBox = new Konva.Rect({
      x: this.x + (this.width)*0.4,
      y: this.y + 50,
      stroke: this.tertiaryColor,
      strokeWidth: 5,
      fill: this.tertiaryColor,
      width: (this.width)*0.2,
      height: (this.width)*0.2,
    });

    this.bodyBox = new Konva.Rect({
      x: this.x + (this.width)*0.25,
      y: this.y + 50 + (this.width)*0.2,
      stroke: this.tertiaryColor,
      strokeWidth: 5,
      fill: this.primaryColor,
      width: (this.width)*0.5,
      height: (this.height)*0.3,
    });

    this.leftarmBox = new Konva.Rect({
      x: this.x + (this.width)*0.15,
      y: this.y + 50 + (this.width)*0.2,
      stroke: this.tertiaryColor,
      strokeWidth: 5,
      fill: this.primaryColor,
      width: (this.width)*0.1,
      height: (this.height)*0.25,
    });

    this.rightarmBox = new Konva.Rect({
      x: this.x + (this.width)*0.75,
      y: this.y + 50 + (this.width)*0.2,
      stroke: this.tertiaryColor,
      strokeWidth: 5,
      fill: this.primaryColor,
      width: (this.width)*0.1,
      height: (this.height)*0.25,
    });

    this.leftlegBox = new Konva.Rect({
      x: this.x + (this.width)*0.25,
      y: this.y + 50 + (this.width)*0.2 + (this.height)*0.3,
      stroke: this.tertiaryColor,
      strokeWidth: 5,
      fill: this.secondaryColor,
      width: (this.width)*0.25,
      height: (this.height)*0.4,
    });

    this.rightlegBox = new Konva.Rect({
      x: this.x + (this.width)*0.5,
      y: this.y + 50 + (this.width)*0.2 + (this.height)*0.3,
      stroke: this.tertiaryColor,
      strokeWidth: 5,
      fill: this.secondaryColor,
      width: (this.width)*0.25,
      height: (this.height)*0.4,
    });

    this.group.add(this.headBox, this.bodyBox,
        this.leftlegBox, this.rightlegBox, this.leftarmBox, this.rightarmBox);
  }

  remove() {
    this.headBox.remove();
    this.bodyBox.remove();
    this.leftlegBox.remove();
    this.rightlegBox.remove();
    this.leftarmBox.remove();
    this.rightarmBox.remove();
    this.group.remove();
    return;
  }

  get renderheadBox() {
    return this.headBox;
  }

  get renderbodyBox() {
    return this.bodyBox;
  }

  get renderleftlegBox() {
    return this.leftlegBox;
  }

  get renderrightlegBox() {
    return this.rightlegBox;
  }

  get renderleftarmBox() {
    return this.leftarmBox;
  }

  get renderrightarmBox() {
    return this.rightarmBox;
  }

  get primaryColor() {
    return this._primaryColor;
  }

  get secondaryColor() {
    return this._secondaryColor;
  }

  get tertiaryColor() {
    return this._tertiaryColor;
  }

  set primaryColor(val) {
    this._primaryColor = val;
  }

  set secondaryColor(val) {
    this._secondaryColor = val;
  }

  set tertiaryColor(val) {
    this._tertiaryColor = val;
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
