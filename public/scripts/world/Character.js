import {Entity} from './Entity.js';
import {DIRECTION, httpGet, isColliding} from '../util/helper_functions.js';
// import {Skills} from './Skills.js';
// import * as defaultskill from './skilldefault.js';
import {Inventory} from '../inventory/Inventory.js';
import {Achievements} from '../achievements/Achievements.js';

export class Character extends Entity {
  constructor(data) {
    super(data);
    this.speed = 5; // movement speed
    this.fightSpeed = 0; // for fight priority
    this.skillA1 = null; // defaultskill.Skill1;
    this.enableFace = data.enableFace;
    // Draw a face using fork off cool-ascii-faces web service
    const text = httpGet('https://cool-ascii-faces.onrender.com?max_face_length=6');
    this.face = new Konva.Text({
      x: -15,
      y: 0,
      width: 90,
      height: 90,
      text: (text.length < 6) ? text : '( ﾟヮﾟ)', // ensure we get a face that fits
      fontSize: 16,
      fill: '#555',
      padding: 20,
      align: 'center',
    });
    if (this.enableFace) {
      this.group.add(this.face);
    }
  }

  // #region old movement code
  move(dir) {
    switch (dir) {
      case DIRECTION.LEFT:
        this.x += this.speed * DIRECTION.UNIT_LEFT;
        this.group.x(this.x);
        break;
      case DIRECTION.RIGHT:
        this.x += this.speed * DIRECTION.UNIT_RIGHT;
        this.group.x(this.x);
        break;
      case DIRECTION.UP:
        this.y += this.speed * DIRECTION.UNIT_UP;
        this.group.y(this.y);
        break;
      case DIRECTION.DOWN:
        this.y += this.speed * DIRECTION.UNIT_DOWN;
        this.group.y(this.y);
        break;
    }
  }
  // #endregion

  simulateMove(dir, speed) {
    let newX = this.x;
    let newY = this.y;
    switch (dir) {
      case DIRECTION.LEFT:
        newX = this.x + speed * DIRECTION.UNIT_LEFT;
        break;
      case DIRECTION.RIGHT:
        newX = this.x + speed * DIRECTION.UNIT_RIGHT;
        break;
      case DIRECTION.UP:
        newY = this.y + speed * DIRECTION.UNIT_UP;
        break;
      case DIRECTION.DOWN:
        newY = this.y + speed * DIRECTION.UNIT_DOWN;
        break;
    }
    return [newX, newY];
  }

  get speed() {
    return this._speed;
  }

  get fightSpeed() {
    return this._fightSpeed;
  }

  get skillA1() {
    return this._skillA1;
  }

  set speed(val) {
    console.assert(typeof val === 'number');
    console.assert(val > -1);
    this._speed = val;
  }

  set fightSpeed(val) {
    this._fightSpeed = val;
  }

  set skillA1(val) {
    this._skillA1 = val;
  }
}

export class Player extends Character {
  constructor(data) {
    super(data);
  }

  set inventory(inv) {
    console.assert(inv instanceof Inventory);
    this._inventory = inv;
  }

  get inventory() {
    return this._inventory;
  }

  set achievements(ach) {
    console.assert(ach instanceof Achievements);
    this._achievements = ach;
  }

  get achievements() {
    return this._achievements;
  }

  // checkCollision(obj) { // block array of Environment objects
  checkCollision(obj, obj2) { // block array of Environment objects
    console.assert(obj != null);
    if (isColliding(obj, obj2) ) {
      return true;
    } else {
      return false;
    }
  }
}
