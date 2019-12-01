export class Item {
  constructor(data) {
    this.name = data.name;
    this.info = data.info;
    this.type = data.type;
    this.dmg = (data.dmg) ? data.dmg : 0;
    this.heal = (data.heal) ? data.heal : 0;
    this.effect = (data.effect) ? data.effect : '';
    this.icon = (data.icon) ? data.icon : null;
    this.flavourText = (data.flavourText) ? data.flavourText : '';
    this.x = (data.x) ? data.x : null;
    this.y = (data.y) ? data.y : null;

    function loadImage(url) {
      return new Promise((r) => {
        const i = new Image(); i.onload = (() => r(i)); i.src = url;
      });
    }

    this.img = loadImage(this.icon);
  }
}
