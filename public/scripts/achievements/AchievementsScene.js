import {Scene} from '../Scene.js';
import {Achievements} from './Achievements.js';

export class AchievementsScene extends Scene {
  constructor(data) {
    super(data);
    this.playerAchievements = new Achievements();
    data.player.Achievements = this.playerAchievements;
    this.layer = this.playerAchievements.layer;

    // Assert Achievements and equipped is empty
    for (let i = 0; i < this.playerAchievements.Achievements_num; i++) {
      console.assert(this.playerAchievements.Achievements_icon[i].name() === 'empty');
    };
    for (let i = 0; i < this.playerAchievements.equipped_num; i++) {
      console.assert(this.playerAchievements.equipped_icon[i].name() === 'empty');
    };

    // Tooltip for Achievements
    this.tooltips = {};

    this.controls = new AchievementsControls({
      layer: this.layer,
      player: data.player,
      container: data.stage.container(),
      map: this.map,
      tooltips: this.tooltips,
    });

    const AchievementsMenu = document.getElementById('AchievementsMenu');
    const equippedMenu = document.getElementById('equippedMenu');
    let currentShape;

    document.getElementById('dropButton').addEventListener('click', () => {
      this.playerAchievements.drop(currentShape);
    });

    document.getElementById('equipButton').addEventListener('click', () => {
      const index = this.playerAchievements.Achievements_icon.indexOf(currentShape);
      this.playerAchievements.equip(this.playerAchievements.Achievements[index], currentShape);
    });

    document.getElementById('unequipButton').addEventListener('click', () => {
      const index = this.playerAchievements.equipped_icon.indexOf(currentShape);
      this.playerAchievements.unequip(this.playerAchievements.equipped[index], currentShape);
    });

    data.stage.on('contextmenu', function(e) {
      e.evt.preventDefault();
      if (e.target.name() === 'filled') {
        currentShape = e.target;
        equippedMenu.style.display = 'none';
        AchievementsMenu.style.display = 'initial';
        const containerRect = data.stage.container().getBoundingClientRect();
        // AchievementsMenu.style.top = containerRect.top + data.stage.getPointerPosition().y + 4 +'px';
        // AchievementsMenu.style.left = containerRect.left + data.stage.getPointerPosition().x+4 + 'px';
      } else if (e.target.name() === 'equipped') {
        currentShape = e.target;
        AchievementsMenu.style.display = 'none';
        equippedMenu.style.display = 'initial';
        const containerRect = data.stage.container().getBoundingClientRect();
        equippedMenu.style.top = containerRect.top + data.stage.getPointerPosition().y + 4 +'px';
        equippedMenu.style.left = containerRect.left + data.stage.getPointerPosition().x + 4 + 'px';
      } else {
        return;
      }
    });

    window.addEventListener('click', () => {
      // hide menu
      AchievementsMenu.style.display = 'none';
      equippedMenu.style.display = 'none';
    });
  }

  switchFrom(data) {
    console.assert(data != null);
    this.controls.removeControlBindings();
    this.layer.remove();
  }

  switchTo(data) {
    console.assert(data != null);
    data.stage.add(this.playerAchievements.layer);
    this.controls.addControlBindings();
  }
}
