import {genID} from './helper_functions.js';

export class Tooltip {
  constructor(data) {
    this.name = (data.name) ? data.name : null;
    this.shape_id = (data.shape_id) ? data.shape_id : null,
    this.x = data.x;
    this.y = data.y;
    this.width = (data.width) ? data.width : 160; // default to 160 if not specified
    this.id = genID();
    this._text = data.text;

    this.primaryColor = '#555';
    this.secondaryColor = '#ddd';
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

    this.tipText = new Konva.Text({
      name: this.name,
      id: this.shape_id,
      x: this.x,
      y: this.y,
      text: this.text,
      fontSize: 18,
      fill: this.primaryColor,
      padding: 20,
      align: 'center',
    });

    this.tipBox = new Konva.Rect({
      name: this.name,
      id: this.shape_id,
      x: this.x,
      y: this.y,
      stroke: this.primaryColor,
      strokeWidth: 5,
      fill: this.secondaryColor,
      width: this.width,
      height: (data.height)? data.height : this.tipText.height(),
      shadowColor: this.tertiaryColor,
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.2,
      cornerRadius: 10,
    });

    this.group.add(this.tipBox, this.tipText);
  }

  remove() {
    this.tipBox.remove();
    this.tipText.remove();
    this.group.remove();
    return;
  }

  moveTo(pos) {
    this.x = pos.x;
    this.y = pos.y;
    // update each Konva obj's pos
    // this.group.x(this.x);
    // this.group.y(this.y);
    this.tipBox.x(this.x);
    this.tipBox.y(this.y);
    this.tipText.x(this.x);
    this.tipText.y(this.y);
  }

  // rendering by group not working for some reason
  // for now return separately with renderBox and renderText
  get render() {
    return this.group;
  }

  get renderBox() {
    return this.tipBox;
  }

  get renderText() {
    return this.tipText;
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

  set text(val) {
    this._text = val;
    this.tipText.text(this.text);
    this.tipBox.height(this.tipText.height());
    this.tipBox.width(this.tipText.width());
  }

  get text() {
    return this._text;
  }
}
