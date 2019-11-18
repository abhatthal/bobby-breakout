export class Inventory {
  constructor() {
    this.equipped = [];
    this.equipped_num = 0;
    this.equipped_size = 4;
    this.inventory = [];
    this.inventory_num = 0;
    this.inventory_size = 20;

    this.layer = new Konva.Layer();
    this.inventory_icon = [];
    this.equipped_icon = [];

    const inventoryTitle = new Konva.Text({
      x: 0,
      y: 0,
      text: 'Inventory',
      fontSize: 40,
      fill: '#555',
      padding: 20,
      width: 1050,
      align: 'center',
      fill: 'black',
    });
    this.layer.add(inventoryTitle);

    const equippedTitle = new Konva.Text({
      x: 0,
      y: 390,
      text: 'Equipped',
      fontSize: 30,
      fill: '#555',
      padding: 20,
      width: 1050,
      align: 'center',
      fill: 'black',
    });
    this.layer.add(equippedTitle);

    const playerInfo = new Konva.Text({
      x: 20,
      y: 100,
      text: `Bobby Chan\n\nStatistics:`,
      fontSize: 18,
      fill: '#555',
      padding: 20,
      width: 300,
      align: 'center',
    });

    const playerInfoBox = new Konva.Rect({
      x: 20,
      y: 100,
      stroke: '#555',
      strokeWidth: 5,
      fill: '#ddd',
      width: 300,
      height: playerInfo.height(),
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.2,
      cornerRadius: 10,
    });
    this.layer.add(playerInfoBox);
    this.layer.add(playerInfo);

    for (let i = 0; i < this.inventory_size; i++) {
      const shape = new Konva.Rect({
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
    for (let i = 0; i < 4; i++) {
      const shape = new Konva.Rect({
        x: 390 + (i % 4) * 80,
        y: 450,
        width: 50,
        height: 50,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4,
        name: 'empty',
      });
      this.equipped_icon.push(shape);
      this.layer.add(shape);
    }

    this.layer.draw();
  }

  add(item) {
    // Inventory is full --> do nothing
    if (this.inventory_num >= this.inventory_size) {
      return;
    }
    let shape;
    for (let i = 0; i < this.inventory_size; i++) {
      if (this.inventory_icon[i].name() === 'empty') {
        shape = this.inventory_icon[i];
        break;
      };
    };
    this.inventory[i] = item;

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

    const layer = this.layer;
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

  drop(icon) {
    this.inventory_num -= 1;
    icon.fill('red');
    icon.name('empty');
    icon.listening(false);
    this.layer.draw();
  }

  equip(item, inventoryIcon) {
    // Equipped is full --> do nothing
    if (this.equipped_num >= this.equipped_size) {
      return;
    }

    let shape;
    for (let i = 0; i < this.equipped_size; i++) {
      if (this.equipped_icon[i].name() === 'empty') {
        shape = this.equipped_icon[i];
        break;
      };
    };
    this.equipped[i] = item;
    this.drop(inventoryIcon);
    this.equipped_num += 1;
    shape.fill('green');
    shape.name('equipped');
    shape.listening(true);

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

    const layer = this.layer;
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

    this.layer.draw();
  }

  unequip(item, icon) {
    // If the inventory is full --> do nothing
    if (this.inventory_num >= this.inventory_size) {
      return;
    }

    this.add(item);
    this.equipped_num -= 1;
    icon.fill('yellow');
    icon.name('empty');
    icon.listening(false);
    this.layer.draw();
  }
}
