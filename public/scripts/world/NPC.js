import {Character} from './Character.js';
import {DIRECTION} from '../util/helper_functions.js';
import {VisionCone} from './BoundingBox.js';
// import {Skills} from './Skills.js';
// import * as defaultskill from './skilldefault.js';
// import {Inventory} from '../inventory/Inventory.js';

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

    this.scrollSpeed = 5;
  }

  get impassible() {
    return this._impassible;
  }

  set impassible(val) {
    console.assert(typeof val === 'boolean');
    this._impassible = val;
  }

  isSeeing(obj) {
    console.assert(obj != null);
    // console.log(this.tempRectArea);
    // console.log(this.tempRectArea.absolutePosition());

    const tempRectGlobalPos = this.tempRectArea.absolutePosition();
    return !(obj.x > tempRectGlobalPos.x + this.tempRectArea.attrs.width ||
      obj.x + obj.width < tempRectGlobalPos.x ||
      obj.y > tempRectGlobalPos.y + this.tempRectArea.attrs.height ||
      obj.y + obj.height < tempRectGlobalPos.y);
  }

  checkPlayerDetection(player) {
    console.assert(player instanceof Player);
    if (this.isSeeing(player) && player instanceof Player) {
      // console.log('i see the player');
      return true;
    } else {
      return false;
    }
  }

  scroll(dir, speed) {
    switch (dir) {
      case DIRECTION.LEFT:
        this.x += speed * DIRECTION.UNIT_LEFT;
        this.group.x(this.x);
        break;
      case DIRECTION.RIGHT:
        this.x += speed * DIRECTION.UNIT_RIGHT;
        this.group.x(this.x);
        break;
      case DIRECTION.UP:
        this.y += speed * DIRECTION.UNIT_UP;
        this.group.y(this.y);
        break;
      case DIRECTION.DOWN:
        this.y += speed * DIRECTION.UNIT_DOWN;
        this.group.y(this.y);
        break;
    }
  }
}

