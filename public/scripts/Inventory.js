export class Inventory {
  constructor() {
    this.equipped = [];
    this.equipped_num = 0;
    this.inventory = [];
    this.inventory_num = 0;
    this.inventory_size = 20;

    this.layer = new Konva.Layer();
    this.inventory_icon = []
    this.equipped_icon = []

    for (var i = 0; i < this.inventory_size; i++) {
      var shape = new Konva.Rect({
        x: 350 + (i % 5) * 80,
        y: 100 + (parseInt(i / 5) * 80),
        width: 50,
        height: 50,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
        name: 'empty',
      });
      this.inventory_icon.push(shape);
      this.layer.add(shape);
    }
    for (var i = 0; i < 4; i++) {
      var shape = new Konva.Rect({
        x: 390 + (i % 4) * 80,
        y: 450,
        width: 50,
        height: 50,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4,
      });
      this.equipped_icon.push(shape);
      this.layer.add(shape);
    }

    this.layer.draw();
  }

  add(item) {
    this.inventory.push(item);
    for (var i = 0; i < this.inventory_size; i++) {
      if (this.inventory_icon[i].name() === 'empty') {
        var shape = this.inventory_icon[i];
        break;
      };
    };
    
    // Placeholder before adding item icons
    shape.fill('green');
    shape.name('filled');

    const info = new Konva.Text({
      x: 750,
      y: 100,
      text: `${item.name}\n\n${item.info}`,
      fontSize: 18,
      fill: '#555',
      padding: 20,
      width: 220,
      align: 'center',
    });
    
    const infoBox = new Konva.Rect({
      x: 750,
      y: 100,
      stroke: '#555',
      strokeWidth: 5,
      fill: '#ddd',
      width: 225,
      height: info.height(),
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.2,
      cornerRadius: 10,
    });
    var layer = this.layer;
    shape.on('mouseover', function() {
      document.body.style.cursor = 'pointer';      
      layer.add(infoBox);
      layer.add(info);
      info.show();
      infoBox.show();
      layer.draw();
    });
    shape.on('mouseout', function() {
      document.body.style.cursor = 'default';
      info.hide();
      infoBox.hide();
      layer.draw();
    });
    shape.listening(true);
    this.layer.draw();
    this.inventory_num += 1;
  }

  drop(item, icon) {
    var index = this.inventory.indexOf(item);
    if (index > -1) {
      this.inventory.splice(index, 1);
      this.inventory_num -= 1;
    }
    icon.fill('red');
    icon.name('empty');
    icon.listening(false);
    this.layer.draw();
  }

  equipped(item) {
    this.equipped.push(item);
    this.drop(item);
    this.inventory_num -= 1;
    this.equipped_num += 1;
  }

  unequipped(item) {
    var index = this.equipped.indexOf(item);
    if (index > -1) {
      this.equipped.splice(index, 1);
    }
    this.inventory.push(item);
    this.inventory_num += 1;
    this.equipped_num -= 1;
  }
}