export class ToolTip {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.text = data.text;

    this.primaryColor = '#555';
    this.secondaryColor = '#ddd';
    this.tertiaryColor = 'black';

    this.tipText = new Konva.Text({
      // x: this.x,
      // y: this.y,
      text: this.text,
      fontSize: 18,
      fill: this.primaryColor,
      padding: 20,
      align: 'center',
    });

    this.tipBox = new Konva.Rect({
      // x: this.x,
      // y: this.y,
      stroke: this.secondaryColor,
      strokeWidth: 5,
      fill: this.secondaryColor,
      width: 240,
      height: this.tipText.height(),
      shadowColor: this.tertiaryColor,
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.2,
      cornerRadius: 10,
    });

    this.toolTipGroup = new Konva.Group({
      x: this.x,
      y: this.y,
    });

    this.toolTipGroup.add(this.tipBox);
    this.toolTipGroup.add(this.tipText);
  }

  get toolTipGroup() {
    return this._toolTipGroup;
  }

  set toolTipGroup(data) {
    return;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }
}
