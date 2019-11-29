import {genID} from '../util/helper_functions.js';

export class Dialogtip {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.width = (data.width) ? data.width : 200; // default to 160 if not specified
    this.height = (data.height) ? data.height : 400;
    this.id = genID();
    this._text = data.text;

    this.primaryColor = '#000000'; // dimgray
    this.secondaryColor = '#f8f8ff'; // filled aliceblue
    this.tertiaryColor = '#808080'; // gray
    this.quaternaryColor = '#696969'; // dimgray

    this.tipText = new Konva.Text({
      x: this.x,
      y: this.y,
      text: this.text,
      fontSize: 18,
      fill: this.primaryColor,
      shadowColor: this.tertiaryColor,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      padding: 20,
      align: 'center',
    });

    this.tipBox = new Konva.Rect({
      x: this.x,
      y: this.y,
      stroke: this.tertiaryColor,
      strokeWidth: 4,
      fill: this.secondaryColor,
      width: this.width,
      height: this.tipText.height(),
      shadowColor: this.quaternaryColor,
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.2,
      cornerRadius: 6,
    });
  }

  remove() {
    this.tipBox.remove();
    this.tipText.remove();
    return;
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

  set primaryColor(val) {
    this._primaryColor = val;
  }

  get primaryColor() {
    return this._primaryColor;
  }

  set secondaryColor(val) {
    this._secondaryColor = val;
  }

  get secondaryColor() {
    return this._secondaryColor;
  }

  set tertiaryColor(val) {
    this._tertiaryColor = val;
  }

  get tertiaryColor() {
    return this._tertiaryColor;
  }
}
