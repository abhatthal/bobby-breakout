export class Item {
  constructor(data) {
    this.name = data.name;
    this.info = data.info;
    this.type = data.type;
    this.dmg = (data.dmg) ? data.dmg : 0;
    this.heal = (data.heal) ? data.heal : 0;
    this.icon = (data.icon) ? data.icon : null;
    this.flavourText = (data.flavourText) ? data.flavourText : '';

    function loadImage(url) {
      return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
    }

    // let img;
    // const image = new Image();
    // image.onload = function() {
    //   img = image;
    // };
    // image.src = this.icon;
    // this.img = img;
    this.img = loadImage(this.icon);
  }
}
