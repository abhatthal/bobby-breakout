export class Achievements {
  constructor() {
    this.Achievements = [];
    this.Achievements_num = 0;
    this.Achievements_size = 20;

    this.layer = new Konva.Layer();
    this.Achievements_icon = [];

    const AchievementsTitle = new Konva.Text({
      x: 0,
      y: 0,
      text: 'Achievements',
      fontSize: 40,
      fill: '#555',
      padding: 20,
      width: 1050,
      align: 'center',
      fill: 'black',
    });
    this.layer.add(AchievementsTitle);

    for (let i = 0; i < this.Achievements_size; i++) {
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
      this.Achievements_icon.push(shape);
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
      // this.equipped_icon.push(shape);
      this.layer.add(shape);
    }

    this.layer.draw();
  }

  add(item) {
    // Achievements is full --> do nothing
    if (this.Achievements_num >= this.Achievements_size) {
      return;
    }

    let shape;
    let i = 0;
    for (; i < this.Achievements_size; i++) {
      if (this.Achievements_icon[i].name() === 'empty') {
        shape = this.Achievements_icon[i];
        break;
      };
    };
    console.assert(shape.name() === 'empty');
    this.Achievements[i] = item;

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
    this.Achievements_num += 1;
    console.assert(this.Achievements_num <= this.Achievements_size);
  }
}
