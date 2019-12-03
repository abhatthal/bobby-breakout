import {isPremium, getUsername} from '../util/helper_functions.js';
import * as AL from './AchievementsList.js';

export class Achievements {
  constructor() {
    this.Achievements = [];
    this.Achievements_num = 0;
    this.Achievements_size = 20;
    const that = this;

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

    // Freemium users should not be able to receive achievements
    if (isPremium()) {
      // get achievements from database
      const socket = io.connect();
      socket.on('connect', function() {
        socket.emit('achievementsReceived', getUsername(), function(data) {
          // console.log(data.msg);
          // console.log(data);
          Object.keys(data).forEach(function(key) {
            if (data[key]) {
              const item = AL[key];
              item.fromDatabase = true;
              that.add(item);
            }
          });
        }); // emit
      }); // on
      // console.log(this.Achievements);
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
    } else {
      const fremiumMsg = new Konva.Text({
        x: 0,
        y: 50,
        text: 'Become Premium to Unlock Achievements',
        fontSize: 30,
        fill: '#555',
        padding: 20,
        width: 1050,
        align: 'center',
        fill: 'black',
      });
      this.layer.add(fremiumMsg);
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

    // Freemium users should not be able to receive achievements
    if (!(isPremium())) {
      console.log('Achievement ignored, only for premium users');
      return;
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
    if (!(item.fromDatabase)) {
      const notificationContainer = document.getElementById('achievement');
      notificationContainer.style.display = 'block';
      notificationContainer.style.width = '100%';
      notificationContainer.style.position = 'absolute';
      notificationContainer.innerHTML = '<img src = \'/assets/trophy.png\'>';
      notificationContainer.innerHTML += '<span>Achievement Unlocked: ';
      notificationContainer.innerHTML += item.name + '</span>';
      setTimeout(function() {
        notificationContainer.style.display = 'none';
      }, 3000);
    }

    // tell if an achievement is present
    const that = this;
    function isThere(name) {
      for (let i = 0; i < that.Achievements.length; i++) {
        if (that.Achievements[i].name == name) {
          return true;
        }
      }
      return false;
    }

    // collect achievements
    const achievementsData = {
      username: getUsername(),
      testAchievement: isThere('Ya Nerd'),
      konamiCode: isThere('Konami Code'),
      lazy: isThere('Lazy'),
      babySteps: isThere('Baby Steps'),
      warrior: isThere('Warrior'),
      marathoner: isThere('Marathoner'),
    };

    // persist to database
    const socket = io.connect();
    socket.on('connect', function() {
      socket.emit('achievementsSent', achievementsData);
    });
  }
}
