import {DIRECTION, oppositeDirection} from '../util/helper_functions.js';
import {Game} from '../Game.js';
import {Controls} from './Controls.js';

export class MapControls extends Controls {
  constructor(data) {
    super(data);
    this.tooltips = data.tooltips;

    this._readyToInteract = undefined;
    this._atEndPoint = false;
    this._inInventoryWindow = false;
  }

  addControlBindings() {
    const self = this;
    this.keys = [];

    this.handleKeyUpMethod = this.handleKeyUpMethod || function(event) {
      self.handleKeyUp(event);
    };
    this.handleKeyDownMethod = this.handleKeyDownMethod || function(event) {
      self.handleKeyDownLogic(event);
    };

    this.container.addEventListener('keyup', this.handleKeyUpMethod);
    this.container.addEventListener('keydown', this.handleKeyDownMethod);
  }

  removeControlBindings() {
    const self = this;
    this.keys = [];

    this.handleKeyUpMethod = this.handleKeyUpMethod || function(event) {
      self.handleKeyUp(event);
    };
    this.handleKeyDownMethod = this.handleKeyDownMethod || function(event) {
      self.handleKeyDownLogic(event);
    };

    this.container.removeEventListener('keyup', this.handleKeyUpMethod);
    this.container.removeEventListener('keydown', this.handleKeyDownMethod);
  }

  handleKeyUp(event) {
    this.keys[event.keyCode] = false;
  };

  handleKeyDownLogic(event) {
    this.keys[event.keyCode] = true;
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
    let willCollide = false;
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

    // get simulated new player position
    const newPos = this.player.simulateMove(playerMoveDirX, playerMoveDirY);

    const playerSim = {
      x: newPos[0],
      y: newPos[1],
      width: this.player.width,
      height: this.player.height,
    };
    // console.log(playerSim, newPos);

    // check if simulated position will collide to any node
    this.map.blockArray.forEach((node) => {
      if (this.player.checkCollision(node, playerSim)) {
        console.log('will collide');
        willCollide = true;
        isColliding = true; // for visual indicator, change colour to red
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
    if (!willCollide) {
      this.map.mapArray.forEach((node) => {
        node.scroll(oppositeDirection(playerMoveDirX));
        node.scroll(oppositeDirection(playerMoveDirY));
      });
    }

    // check if player is on spawn point or end points
    // #region spawn point check stuff
    // this.map.spawnArray.forEach((node) => {
    //   this.player.checkCollision(node);
    //   if (this.player.isColliding(node)) {
    //     // trigger some interaction, for now, change colour
    //     if (node.name === 'start') {
    //       // console.log('i am at the spawn', node.id);
    //     } else if (node.name === 'end') {
    //       // console.log('i am a winner', node.id);
    //       this._atEndPoint = true;
    //       this.layer.add(this.tooltips.completion.renderBox,
    //         this.tooltips.completion.renderText);
    //       this.layer.draw();
    //     }
    //   } else {
    //     this._atEndPoint = false;
    //     this.tooltips.completion.remove();
    //   }
    // });
    // #endregion

    event.preventDefault();
    this.layer.batchDraw();
  }

  doInteractionKeyDown() {
    // Space or E for interaction
    if (this.keys[32] || this.keys[69]) {
      console.log(this._atEndPoint);
      if (this._atEndPoint) {
        alert('YOU WIN! Play again?');
        location.reload();
      } else if (this._readyToInteract) {
        if (this._readyToInteract.hp > 0) {
          const game = Game.getInstance();
          game.switchToFight(this._readyToInteract, this.map);
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
      alert('Game Paused\nPress ok to continue');
      this.keys[27] = false;
      this.keys[80] = false;
    }
  }
}
