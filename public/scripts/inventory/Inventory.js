import {Item} from '../Item.js';

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
        fillPatternScale: {
          x: 0.1,
          y: 0.1,
        },
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
        fillPatternScale: {
          x: 0.1,
          y: 0.1,
        },
        stroke: 'black',
        strokeWidth: 4,
        name: 'empty',
      });
      this.equipped_icon.push(shape);
      this.layer.add(shape);
    }

    this.layer.draw();

    let item = new Item({
      name: 'Plastic Sword',
      // eslint-disable-next-line max-len
      info: 'This is the mighty plastic sword that Bobby picked up from the ground in front of his office.',
      type: 'weapon',
      dmg: 15,
      flavourText: 'It can\'t even cut paper...',
      icon: '../../assets/sword.png',
    });
    this.equip(item);
    item = new Item({
      name: 'Positive Student Evaluations',
      // eslint-disable-next-line max-len
      info: 'Nothing\'s better than the sweet sweet ecstacy of reading through your saved stash of your student\'s compliment.',
      type: 'heal',
      heal: 10,
      effect: 'ego boost',
      flavourText: '8/8 would r8 again',
      icon: '../../assets/document.png',
    });
    this.equip(item);
    item = new Item({
      name: 'Dad Joke',
      info: 'Dad jokes are great to lighten the mood... I think...',
      type: 'weapon',
      dmg: 5,
      flavourText: 'GROANS',
      icon: '../../assets/glasses-with-mustache.png',
    });
    this.equip(item);
    item = new Item({
      name: 'Coffee',
      // eslint-disable-next-line max-len
      info: 'You hate some students, but you love your job. It really be like that sometimes. Have a cup of coffee to soothe the pain of the daily grind.',
      type: 'heal',
      heal: 5,
      effect: 'morale',
      // eslint-disable-next-line max-len
      flavourText: 'Venti, half-whole milk, one quarter 1%, one quarter non-fat, extra hot, split quad shots, 1 1/2 shots decaf, 2 1/2 shots regular, no foam latte, with whip, 2 packets of splenda, 1 sugar in the raw, a touch of vanilla syrup and 3 short sprinkles of cinnamon. And stat.',
      icon: '../../assets/coffee.png',
    });
    this.equip(item);
  }

  add(item) {
    // Inventory is full --> do nothing
    if (this.inventory_num >= this.inventory_size) {
      return;
    }

    let shape;
    let i = 0;
    for (; i < this.inventory_size; i++) {
      if (this.inventory_icon[i].name() === 'empty') {
        shape = this.inventory_icon[i];
        break;
      };
    };
    console.assert(shape.name() === 'empty');
    this.inventory[i] = item;

    // Placeholder before adding item icons
    shape.fill(null);

    const self = this;
    Promise.resolve(item.img).then(function(imgValue) {
      // This ensures we wait for images to load before setting the fill pattern
      // This avoids black boxes.
      shape.fillPatternImage(imgValue);
      self.layer.draw();
    });
    shape.name('filled');

    const title = new Konva.Text({
      x: 750,
      y: 100,
      text: `${item.name}`,
      fontSize: 22,
      fontStyle: 'bold',
      fill: '#555',
      padding: 20,
      width: 220,
      align: 'center',
    });

    const info = new Konva.Text({
      x: 750,
      y: 100 + title.height(),
      text: `${item.info}`,
      fontSize: 18,
      fill: '#555',
      padding: 20,
      width: 220,
      align: 'center',
    });

    const stats = new Konva.Text({
      x: 750,
      y: 100 + title.height() + info.height(),
      text: `${(item.type === 'weapon') ?
          `Damage: ${item.dmg}`:
          `Effect: +${item.heal} ${item.effect} (HP)`}`,
      fontSize: 18,
      fill: '#555',
      padding: 20,
      width: 220,
      align: 'center',
    });

    const flavourText = new Konva.Text({
      x: 750,
      y: 100 + title.height() + info.height() + stats.height(),
      text: `${item.flavourText}`,
      fontStyle: 'italic',
      fontSize: 15,
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
      height: title.height() + info.height() + stats.height() + flavourText.height(),
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
      layer.add(title);
      layer.add(stats);
      layer.add(flavourText);
      info.show();
      title.show();
      stats.show();
      flavourText.show();
      infoBox.show();
      layer.draw();
    });
    shape.on('mouseout', function() {
      document.body.style.cursor = 'default';
      info.hide();
      title.hide();
      stats.hide();
      flavourText.hide();
      infoBox.hide();
      layer.draw();
    });
    shape.listening(true);
    this.layer.draw();
    this.inventory_num += 1;
    console.assert(this.inventory_num <= this.inventory_size);
  }

  drop(icon) {
    console.assert(icon.name() === 'filled');
    this.inventory_num -= 1;
    console.assert(this.inventory_num > -1);
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
    let i = 0;
    for (; i < this.equipped_size; i++) {
      if (this.equipped_icon[i].name() === 'empty') {
        shape = this.equipped_icon[i];
        break;
      };
    };
    console.assert(shape.name() === 'empty');
    this.equipped[i] = item;
    if (inventoryIcon) {
      this.drop(inventoryIcon);
    }
    this.equipped_num += 1;
    shape.fill(null);

    const self = this;
    Promise.resolve(item.img).then(function(imgValue) {
      // This ensures we wait for images to load before setting the fill pattern
      // This avoids black boxes.
      shape.fillPatternImage(imgValue);
      self.layer.draw();
    });
    shape.name('equipped');
    shape.listening(true);

    const title = new Konva.Text({
      x: 750,
      y: 100,
      text: `${item.name}`,
      fontSize: 22,
      fontStyle: 'bold',
      fill: '#555',
      padding: 20,
      width: 220,
      align: 'center',
    });

    const info = new Konva.Text({
      x: 750,
      y: 100 + title.height(),
      text: `${item.info}`,
      fontSize: 18,
      fill: '#555',
      padding: 20,
      width: 220,
      align: 'center',
    });

    const stats = new Konva.Text({
      x: 750,
      y: 100 + title.height() + info.height(),
      text: `${(item.type === 'weapon') ?
          `Damage: ${item.dmg}`:
          `Effect: +${item.heal} ${item.effect} (HP)`}`,
      fontSize: 18,
      fill: '#555',
      padding: 20,
      width: 220,
      align: 'center',
    });

    const flavourText = new Konva.Text({
      x: 750,
      y: 100 + title.height() + info.height() + stats.height(),
      text: `${item.flavourText}`,
      fontStyle: 'italic',
      fontSize: 15,
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
      height: title.height() + info.height() + stats.height() + flavourText.height(),
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
      layer.add(title);
      layer.add(stats);
      layer.add(flavourText);
      info.show();
      title.show();
      stats.show();
      flavourText.show();
      infoBox.show();
      layer.draw();
    });
    shape.on('mouseout', function() {
      document.body.style.cursor = 'default';
      info.hide();
      title.hide();
      stats.hide();
      flavourText.hide();
      infoBox.hide();
      layer.draw();
    });

    console.assert(this.equipped_num <= this.equipped_size);
    this.layer.draw();
  }

  unequip(item, icon) {
    // If the inventory is full --> do nothing
    if (this.inventory_num >= this.inventory_size) {
      return;
    }

    console.assert(icon.name() === 'equipped');
    this.add(item);
    this.equipped_num -= 1;
    console.assert(this.equipped_num > -1);
    icon.fill('yellow');
    icon.name('empty');
    icon.listening(false);
    this.layer.draw();
  }
}
