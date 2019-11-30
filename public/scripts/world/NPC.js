import {Character} from './Character.js';
import {DIRECTION} from '../util/helper_functions.js';
import {VisionBox} from './BoundingBox.js';
import {isColliding} from '../util/helper_functions.js';
import {Game} from '../Game.js';
// import {Skills} from './Skills.js';
// import * as defaultskill from './skilldefault.js';
import {Item} from '../Item.js';

export class NPC extends Character {
  constructor(data) {
    super(data);
    this.friendly = data.friendly; // bool
    this.orientation = DIRECTION.LEFT;
    this.impassible = data.impassible || false;
    this.inventoryItem = data.item || undefined;

    this.visionBox = new VisionBox({
      group: this.group,
      shape: this.shape,
      offsetX: data.visionOffsetX,
      offsetY: data.visionOffsetY,
      width: data.visionWidth,
      height: data.visionHeight,
    });
    this.visionRectArea = this.visionBox.rectBindingArea;

    this.group.add(this.visionRectArea);
    this.offsetX = this.width/2;
    this.group.offsetX(this.offsetX),
    this.offsetY = this.height/2;
    this.group.offsetY(this.offsetY),

    this.scrollSpeed = 5;
  }

  get impassible() {
    return this._impassible;
  }

  set impassible(val) {
    console.assert(typeof val === 'boolean');
    this._impassible = val;
  }

  walkForwardsToPlayer(layer, player, finalCallback) {
    const speed = 2.5;
    let hitPlayer = false;
    if (this.group.rotation() == 90) {
      // move left until we collide with the player
      this.x += -speed;
      this.group.x(this.x);
      if (isColliding(this, player)) {
        this.x -= -speed;
        this.group.x(this.x);
        // We hit the player! So done moving
        hitPlayer = true;
      }
      layer.draw();
    } else if (this.group.rotation() == 180) {
      // move up until we collide with the player
      this.y += -speed;
      this.group.y(this.y);
      if (isColliding(this, player)) {
        this.y -= -speed;
        this.group.y(this.y);
        // We hit the player! So done moving
        hitPlayer = true;
      }
      layer.draw();
    } else if (this.group.rotation() == 270) {
      // move right until we collide with the player
      this.x += speed;
      this.group.x(this.x);
      if (isColliding(this, player)) {
        this.x -= speed;
        this.group.x(this.x);
        // We hit the player! So done moving
        hitPlayer = true;
      }
      layer.draw();
    } else if (this.group.rotation() == 0) {
      // move down until we collide with the player
      this.y += speed;
      this.group.y(this.y);
      if (isColliding(this, player)) {
        this.y -= speed;
        this.group.y(this.y);
        // We hit the player! So done moving
        hitPlayer = true;
      }
      layer.draw();
    }

    if (!hitPlayer) {
      setTimeout(() => {
        this.walkForwardsToPlayer(layer, player, finalCallback);
      }, 10);
    } else {
      // Trigger the fight after a small delay
      setTimeout(() => {
        finalCallback();
      }, 500);
    }
  }

  isSeeing(obj) {
    console.assert(obj != null);
    // console.log(this.tempRectArea);
    // console.log(this.tempRectArea.absolutePosition());

    const tempRectGlobalPos = this.visionRectArea.absolutePosition();
    const offsetX = this.visionRectArea.offsetX();
    const offsetY = this.visionRectArea.offsetY();
    const width = this.visionRectArea.width();
    const height = this.visionRectArea.height();
    let rightX;
    let leftX;
    let topY;
    let bottomY;

    if (this.group.rotation() == 0) {
      rightX = tempRectGlobalPos.x - offsetX + width;
      leftX = tempRectGlobalPos.x - offsetX;
      topY = tempRectGlobalPos.y - offsetY;
      bottomY = tempRectGlobalPos.y - offsetY + height;
    } else if (this.group.rotation() == 90) {
      rightX = tempRectGlobalPos.x - offsetX;
      leftX = tempRectGlobalPos.x - offsetX - height;
      topY = tempRectGlobalPos.y - offsetY;
      bottomY = tempRectGlobalPos.y - offsetY + width;
    } else if (this.group.rotation() == 180) {
      rightX = tempRectGlobalPos.x - offsetX;
      leftX = tempRectGlobalPos.x - offsetX - width;
      topY = tempRectGlobalPos.y - offsetY - height;
      bottomY = tempRectGlobalPos.y - offsetY;
    } else if (this.group.rotation() == 270) {
      rightX = tempRectGlobalPos.x - offsetX + height;
      leftX = tempRectGlobalPos.x - offsetX;
      topY = tempRectGlobalPos.y - offsetY - width;
      bottomY = tempRectGlobalPos.y - offsetY;
    }
    return !(obj.x - obj.offsetX > rightX ||
      obj.x - obj.offsetX + obj.width < leftX ||
      obj.y - obj.offsetY > bottomY ||
      obj.y - obj.offsetY + obj.height < topY);
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


export class WeakNPC extends NPC {
  constructor(data) {
    data.item = new Item({
      name: 'Plastic Sword',
      // eslint-disable-next-line max-len
      info: 'This is the mighty plastic sword that Bobby picked up from the ground in front of his office.',
      type: 'weapon',
      dmg: 5,
      flavourText: 'It can\'t even cut paper...',
      icon: '../../assets/sword.png',
    });
    data.visionWidth = data.width / 2;
    data.visionHeight = 150;
    super(data);
  }
}

export class StrongNPC extends NPC {
  constructor(data) {
    data.item = new Item({
      name: 'Mighty Sword',
      // eslint-disable-next-line max-len
      info: 'placeholder hope nobody reads this.',
      type: 'weapon',
      dmg: 20,
      flavourText: 'placeholder hope nobody reads this.',
      icon: '../../assets/sword.png',
    });
    data.visionWidth = data.width / 2;
    data.visionHeight = 250;
    super(data);
  }
}

export class MiniBossNPC extends NPC {
  constructor(data) {
    data.item = new Item({
      name: 'Mini Boss Item placeholder name',
      // eslint-disable-next-line max-len
      info: 'placeholder hope nobody reads this.',
      type: 'weapon',
      dmg: 20,
      flavourText: 'placeholder hope nobody reads this.',
      icon: '../../assets/sword.png',
    });
    data.visionWidth = 200;
    data.visionHeight = 150;
    super(data);
  }
}

export class BossNPC extends NPC {
  constructor(data) {
    data.item = new Item({
      name: 'Boss Item placeholder name',
      // eslint-disable-next-line max-len
      info: 'placeholder hope nobody reads this.',
      type: 'weapon',
      dmg: 40,
      flavourText: 'placeholder hope nobody reads this.',
      icon: '../../assets/sword.png',
    });
    data.visionWidth = 800;
    data.visionHeight = 120;
    super(data);
  }
}

export class MovingNPC extends NPC {
  constructor(data) {
    data.item = new Item({
      name: 'Moving NPC Item placeholder name',
      // eslint-disable-next-line max-len
      info: 'placeholder hope nobody reads this.',
      type: 'weapon',
      dmg: 15,
      flavourText: 'placeholder hope nobody reads this.',
      icon: '../../assets/sword.png',
    });
    data.visionWidth = data.width/2;
    data.visionHeight = 400;
    super(data);

    // For movement
    this.displacedX = 0;
    this.displacedY = 0;
    this.direction = 1; // 1 or negative 1
    this.speed = 10;
    this.shouldMove = true;
  }

  moveLoop(layer, player) {
    if (this.shouldMove) {
      if (this.displacedX > 900 || this.displacedX < 0) {
        this.direction *= -1;
        this.group.rotate(this.direction * 180);
      }
      this.x += this.speed * this.direction;
      this.displacedX += this.speed * this.direction;
      if (isColliding(this, player)) {
        // undo movement
        this.x -= this.speed * this.direction;
        this.displacedX -= this.speed * this.direction;
      }
    }
    this.group.x(this.x);
    layer.draw();

    if (this.isSeeing(player)) {
      // Trigger fight animation + scene here!
      this.walkForwardsToPlayer(layer, player, () => {
        const game = Game.getInstance();
        game.switchToFight(this, this.map);
      });
    } else {
      setTimeout(() => {
        if (this.hp > 0) {
          this.moveLoop(layer, player);
        }
      }, 10);
    }
  }
}
