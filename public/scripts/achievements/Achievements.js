import {isPremium} from '../util/helper_functions.js';

export class Achievements {
  constructor() {
    this.Achievements = [];
    this.Achievements_num = 0;
    this.Achievements_size = 20;

    this.layer = new Konva.Layer();
    this.Achievements_icon = [];

    const GamePaused = new Konva.Text({
      x: 0,
      y: 0,
      text: 'Game Paused',
      fontSize: 40,
      fill: '#555',
      padding: 20,
      width: 1050,
      align: 'center',
      fill: 'black',
    });
    this.layer.add(GamePaused);

    const AchievementsTitle = new Konva.Text({
      x: 0,
      y: 50,
      text: 'Achievements',
      fontSize: 30,
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
        y: 120 + (parseInt(i / 5) * 80),
        width: 50,
        height: 50,
        fill: 'gray',
        stroke: 'black',
        strokeWidth: 4,
        name: 'empty',
      });
      this.Achievements_icon.push(shape);
      this.layer.add(shape);
    }

    this.layer.draw();
  }

  add(item) {
    // Achievements is full --> do nothing
    if (this.Achievements_num >= this.Achievements_size) {
      return;
    }

    // Already have this achievement --> do nothing
    let i = 0;
    for (i = 0; i < this.Achievements.length; i++) {
      if (JSON.stringify(item) === JSON.stringify(this.Achievements[i])) {
        return;
      }
    }

    // Freemium users should not be able to see achievement details
    if (!(isPremium())) {
      item.info = '';
    }

    let shape;
    for (i = 0; i < this.Achievements_size; i++) {
      if (this.Achievements_icon[i].name() === 'empty') {
        shape = this.Achievements_icon[i];
        break;
      };
    };
    console.assert(shape.name() === 'empty');
    this.Achievements[i] = item;

    // Placeholder before adding item icons
    shape.fill(item.color);
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

    // Achievement Notification
    const notificationContainer = document.getElementById('achievement');
    notificationContainer.style.display = 'block';
    notificationContainer.style.position = 'absolute';
    notificationContainer.style.width = '100%';
    // eslint-disable-next-line max-len
    notificationContainer.innerHTML = '<img src = \'/assets/trophy.png\'><span>Achievement Unlocked: ' + item.name + '</span>';
    setTimeout(function() {
      notificationContainer.style.display = 'none';
    }, 3000);
  }
}
