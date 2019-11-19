import {Entity} from './Entity.js';
import {DIRECTION, httpGet} from '../util/helper_functions.js';
import {VisionCone} from './BoundingBox.js';
import {Wall} from './Wall.js';

export class Character extends Entity {
  constructor(data) {
    super(data);
    this.speed = 5; // movement speed
    this.enableFace = (data.enableFace) ? data.enableFace : false;
    // Draw a face using fork off cool-ascii-faces web service
    // https://github.com/abhatthal/cool-face-service
    const text = httpGet('https://fathomless-temple-39382.herokuapp.com/?max_face_length=6');
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

  get speed() {
    return this._speed;
  }

  set speed(val) {
    this._speed = val;
  }
}

export class Player extends Character {
  constructor(data) {
    super(data);
  }

  set inventory(inv) {
    this._inventory = inv;
  }

  get inventory() {
    return this._inventory;
  }

  checkCollision(obj) { // block array of Environment objects
    if (this.isColliding(obj) ) {
      if (obj instanceof Wall) {
        // console.log('i am touching a Wall', obj.id);
        // bruno add the wall stuff here
        // ...
      } else if (obj instanceof NPC) {
        // console.log('i am touching an NPC', obj.id);
      }
      return true;
    } else {
      return false;
    }
  }
}

export class NPC extends Character {
  constructor(data) {
    super(data);
    this.friendly = data.friendly; // bool
    this.orientation = DIRECTION.LEFT;
    this.impassible = data.impassible || false;

    this.visionCone = new VisionCone(this.group, this.shape);
    this.coneArea = this.visionCone.coneArea;
    this.tempRectArea = this.visionCone.coneBindingArea;
    this.visionConeAttr = this.coneArea.getAttrs();

    this.group.add(this.coneArea);
    this.group.add(this.tempRectArea);

    this.feelers = this.visionCone.feelers;
    this.feelers.forEach((feeler) => {
      this.group.add(feeler);
    });
  }

  get impassible() {
    return this._impassible;
  }

  set impassible(val) {
    this._impassible = val;
  }

  isSeeing(obj) {
    // console.log(this.tempRectArea);
    // console.log(this.tempRectArea.absolutePosition());

    const tempRectGlobalPos = this.tempRectArea.absolutePosition();
    return !(obj.x > tempRectGlobalPos.x + this.tempRectArea.attrs.width ||
      obj.x + obj.width < tempRectGlobalPos.x ||
      obj.y > tempRectGlobalPos.y + this.tempRectArea.attrs.height ||
      obj.y + obj.height < tempRectGlobalPos.y);
  }

  checkPlayerDetection(player) {
    if (this.isSeeing(player) && player instanceof Player) {
      // console.log('i see the player');
      return true;
    } else {
      return false;
    }
  }
}
