import {DIRECTION, keysHistory, getScene, oppositeDirection} from '../util/helper_functions.js';
import {Game} from '../Game.js';
import {Controls} from './Controls.js';
import {achievementsDown, inventoryDown} from '../globalCtrl.js';
import * as AL from '../achievements/AchievementsList.js';
import {userStats} from '../Stats.js';
import {MiniBossNPC} from '../world/NPC.js';

export class MapControls extends Controls {
  constructor(data) {
    super(data);
    this.tooltips = data.tooltips;

    this._triggeredNPC = undefined;
    this._atEndPoint = false;
    this._inInventoryWindow = false;
    this._scrollSpeed = 20;
    this._numberKeysDown = 0;
  }

  addControlBindings() {
    const self = this;
    this.keys = [];

    this.handleKeyUpMethod = this.handleKeyUpMethod || function(event) {
      self._numberKeysDown--;
      self.handleKeyUp(event);
    };
    this.handleKeyDownMethod = this.handleKeyDownMethod || function(event) {
      if (self.keys[event.keyCode]) {
        return;
      }
      self._numberKeysDown++;
      self.keys[event.keyCode] = true;
      keysHistory.push(event.keyCode);

      if (self._numberKeysDown == 1) {
        self.handleKeyDownLogic();
      }
    };

    this.container.addEventListener('keyup', this.handleKeyUpMethod);
    this.container.addEventListener('keydown', this.handleKeyDownMethod);

    // This lets NPCs continue moving immediately after a fight finishes/scene switches,
    // or else they stay frozen
    if (this._triggeredNPC instanceof MiniBossNPC) {
      console.log('removing wall');
      this.shouldRemoveWall = true;
    }
    this._triggeredNPC = undefined;
    this.handleKeyDownLogic();
  }

  removeControlBindings() {
    const self = this;
    this.keys = [];

    this.handleKeyUpMethod = this.handleKeyUpMethod || function(event) {
      self._numberKeysDown--;
      self.handleKeyUp(event);
    };
    this.handleKeyDownMethod = this.handleKeyDownMethod || function(event) {
      if (self.keys[event.keyCode]) {
        return;
      }
      self._numberKeysDown++;
      self.keys[event.keyCode] = true;
      if (self._numberKeysDown == 1) {
        self.handleKeyDownLogic();
      }
    };

    this.container.removeEventListener('keyup', this.handleKeyUpMethod);
    this.container.removeEventListener('keydown', this.handleKeyDownMethod);
  }

  handleKeyUp(event) {
    this.keys[event.keyCode] = false;
  };

  handleKeyDownLogic() {
    this.doInteractionKeyDown();

    /*
      PSEUDO-CODE MOVEMENT ALGORITHM
      store x (old pos)
      check x' (new pos)
      if x' collision == false
        then deltaX = x' - x
        movePlayerOrEnvironment(deltaX)
      else
        no movement
        return
    */

    // visual indicator to player if colliding
    let isColliding = false;
    let playerMoveDirX;
    let playerMoveDirY;

    // #region Check Next Movement Direction
    // Down arrow or S for moving sprite down
    if (this.keys[40] || this.keys[83]) {
      playerMoveDirY = DIRECTION.DOWN;
    } else if (this.keys[38] || this.keys[87]) {
      // Up arrow or W to move sprite up
      playerMoveDirY = DIRECTION.UP;
    }

    // Left arrow or A for moving sprite left
    if (this.keys[37] || this.keys[65]) {
      playerMoveDirX = DIRECTION.LEFT;
    } else if (this.keys[39] || this.keys[68]) {
      // Right arrow or D to move sprite right
      playerMoveDirX = DIRECTION.RIGHT;
    }

    // Shift for sprinting
    let speedMultiplier = 1;
    if (this.keys[16]) {
      speedMultiplier = 2.5;
    }

    // get simulated new player position
    [playerMoveDirX, playerMoveDirY].forEach((dir) => {
      const newPos = this.player.simulateMove(dir, this._scrollSpeed * speedMultiplier);
      let willCollide = false;

      const playerSim = {
        x: newPos[0],
        y: newPos[1],
        width: this.player.width,
        height: this.player.height,
        offsetX: this.player.offsetX,
        offsetY: this.player.offsetY,
      };
      // console.log(playerSim, newPos);

      // BLOCKS: check if simulated position will collide to any node
      this.map.blockArray.forEach((node) => {
        // console.log(node);
        // console.log(this.player);
        if (this.player.checkCollision(node, playerSim)) {
          // console.log(node);
          willCollide = true;
          isColliding = true; // for visual indicator, change colour to red
        }
      });

      // ITEMS: check collision
      this.map.itemArray.forEach((node) => {
        if (this.player.checkCollision(node, playerSim)) {
          this.player.inventory.add(node.item, node.scaleX, node.scaleY);
          node.x = 1000000000;
          node.shape.hide();
        }
      });

      // NPCS: check collision among them
      this.map.npcArray.forEach((node) => {
        if (this.player.checkCollision(node, playerSim)) {
          willCollide = true;
          isColliding = true; // for visual indicator, change colour to red
        }

        // check if player is w/in sight
        if (node.isSeeing(this.player)) {
          if (this._triggeredNPC == undefined && node.hp > 0) {
            this._triggeredNPC = node;
            node.walkForwardsToPlayer(this.layer, this.player, () => {
              const game = Game.getInstance();
              game.switchToFight(this._triggeredNPC, this.map);
            });
          }
        } else {
          // NPCs should freeze when fight begins and resume after it ends
          if (this._triggeredNPC == undefined) {
            node.shouldMove = true;
          } else {
            node.shouldMove = false;
          }
        }
      });

      // WALL REMOVAL ONCE NPC IS DEAD
      if (this.shouldRemoveWall) {
        this.map.lockedWall.scroll(DIRECTION.LEFT, 10000);
      }

      // CHECKPOINTS: spawn and end point
      this.map.spawnArray.forEach((node) => {
        if (this.player.checkCollision(node, playerSim)) {
          if (node.name === 'start') {
            // console.log('i am at the spawn', node.id);
          } else if (node.name === 'end') {
            // console.log('i am a winner', node.id);
            this._atEndPoint = true;
            this.layer.add(this.tooltips.completion.renderBox, this.tooltips.completion.renderText);
            this.layer.draw();
          }
        } else {
          this._atEndPoint = false;
          this.tooltips.completion.remove();
        }
      });

      // change colour to show collision if they move in that direction
      if (isColliding) {
        this.player.shape.attrs.fill = 'orange';
      } else {
        this.player.shape.attrs.fill = 'grey';
      }
      // console.log(willCollide);

      // only move if next simulated position wont collide with anything
      // and there's no npc currently triggering a fight
      if (!willCollide && this._triggeredNPC == undefined) {
        this.map.mapArray.forEach((node) => {
          node.scroll(oppositeDirection(dir), this._scrollSpeed * speedMultiplier);
        });
      }
    });

    this.layer.batchDraw();

    if (this._numberKeysDown > 0) {
      setTimeout(() => {
        this.handleKeyDownLogic(event);
      }, 10);
    }
  }

  // doKeyDown() {
  doInteractionKeyDown() {
    // this.keys[event.keyCode] = true;
    // keysHistory.push(event.keyCode);

    // any movement of the sprite
    if (this.keys[40] || this.keys[83] ||
      this.keys[38] || this.keys[87] ||
      this.keys[37] || this.keys[65] ||
      this.keys[39] || this.keys[68]) {
      userStats.walkedSteps = 1; // increment by 1
      // console.log(userStats.walkedSteps);
      if (userStats.walkedSteps == 500) {
        // Marathoner - Walk 500 steps
        this.player.achievements.add(AL.marathoner);
      }
    }

    // Space or E for interaction
    if (this.keys[32] || this.keys[69]) {
      console.log('at endpoint? ', this._atEndPoint);
      if (this._atEndPoint) {
        // babySteps - Finish the tutorial
        this.player.achievements.add(AL.babySteps);
        setTimeout(function() {
          alert('YOU WIN! Play again?');
          location.reload();
        }, 3500);
      } else if (this._triggeredNPC) {
        console.log('ready to interact with npc? ', this._triggeredNPC);
        if (this._triggeredNPC.hp > 0) {
          const game = Game.getInstance();
          game.switchToFight(this._triggeredNPC, this.map);
        }
      }
    }
    // I to open inventory window
    if (this.keys[73]) {
      const game = Game.getInstance();
      game.switchToInventory();
    }
    // Escape or P for pausing (to menu)
    if (this.keys[27] || this.keys[80]) {
      // alert('Game Paused\nPress ok to continue');
      // Show achievements menu
      const game = Game.getInstance();
      game.switchToAchievements(this._readyToInteract, this.map);
      this.keys[27] = false;
      this.keys[80] = false;
    }

    // lazy - don't move for 5 minutes (only attainable on Map scene)
    const histBefore = keysHistory.length;
    const that = this;
    setTimeout(function() {
      const histAfter = keysHistory.length;
      if (histBefore === histAfter && getScene() == 'MapScene') {
        that.player.achievements.add(AL.lazy);
      }
    }, 1000 * 60 * 5);

    // All global achievements
    achievementsDown(this);
    // All global inventory
    inventoryDown(this);
  }

  doReverseMovement() {
    // Down arrow or W for moving sprite down
    if (this.keys[40] || this.keys[83]) {
      this.player.move(DIRECTION.DOWN);
    } else if (this.keys[38] || this.keys[87]) {
      // Up arrow or S to move sprite up
      this.player.move(DIRECTION.UP);
    }

    // Left arrow or A for moving sprite left
    if (this.keys[37] || this.keys[65]) {
      this.player.move(DIRECTION.RIGHT);
    } else if (this.keys[39] || this.keys[68]) {
      // Right arrow or D to move sprite right
      this.player.move(DIRECTION.LEFT);
    }
  }
}
