import {Scene} from '../Scene.js';
import {Map} from './Map.js';
import {Tooltip} from '../util/Tooltip.js';
import {DIRECTION} from '../util/helper_functions.js';
import {Game} from '../Game.js';

export class MapScene extends Scene {
  constructor(data) {
    super(data);
    this._layer = new Konva.Layer();

    this.map = new Map({layer: this.layer, stage: data.stage});

    this.layer.add(data.player.render);
  }

  get layer() {
    return this._layer;
  }

  switchFrom() {
    // This removes a child froma its parents without needing acces to the parent
    this.layer.remove();
  }

  switchTo(data) {
    const container = data.stage.container();
    const stage = data.stage;
    const player = data.player;
    const layer = this.layer;
    const self = this;

    stage.add(this.layer);

    const keys = [];
    // Handles when a key is released
    container.addEventListener('keyup', function(event) {
      keys[event.keyCode] = false;
    });

    // Tooltip for completing level
    const completionTooltip = new Tooltip({
      x: stage.width() - 400,
      y: 0,
      width: 240,
      text: 'E/SPACE\nTO COMPLETE LEVEL',
    });

    // Tooltip for interaction
    const tooltip = new Tooltip({
      x: 0,
      y: 0,
      text: 'E/SPACE\nTO INTERACT',
    });

    this._readyToInteract = false;
    this._inFightScene = false;
    this._atEndPoint = false;
    // Handles keys being pressed down
    container.addEventListener('keydown', function(event) {
      keys[event.keyCode] = true;

      self.doKeyProcess(keys, player);

      // TODO: Reorganize this better in new class
      // TODO: move to checkMovementCollision();
      let isColliding = false;
      self.map.blockArray.forEach((node) => {
        if (player.checkCollision(node)) {
          // handle impassible walls here
          if (node.impassible === true) {
            self.doReverseMovement(keys, player);
          }
          isColliding = true;
        }
      });
      if (isColliding) {
        player.shape.attrs.fill = 'red';
      } else {
        player.shape.attrs.fill = 'grey';
      }

      self.map.npcArray.forEach((node) => {
        player.checkCollision(node);
        node.checkPlayerDetection(player);
        if (player.isColliding(node)) {
          // trigger some interaction, for now, change colour
          // console.log('i am touching an NPC', node.id);
          // handle impassible NPCs here
          if (node.impassible === true) {
            self.doReverseMovement(keys, player);
          }
          isColliding = true;
        }
        // TODO: move to checkSightCollision();
        if (node.isSeeing(player)) {
          // console.log('i see the player');

          tooltip.moveTo({
            x: node.x + 50,
            y: node.y - 50,
          });

          layer.add(tooltip.renderBox, tooltip.renderText);
          // not sure why adding tooltip by a group doesn't work
          // layer.add(tooltip.render);

          layer.draw();
          self._readyToInteract = true;
        } else {
          tooltip.remove();
          self._readyToInteract = false;
        }
      });
      // TODO: move to checkPointCollision()
      self.map.spawnArray.forEach((node) => {
        player.checkCollision(node);
        if (player.isColliding(node)) {
          // trigger some interaction, for now, change colour
          if (node.name === 'start') {
            // console.log('i am at the spawn', node.id);
          } else if (node.name === 'end') {
            // console.log('i am a winner', node.id);
            // setTimeout(function() {
            //   alert('YOU WIN! Play again?');
            //   location.reload();
            // }, 1000);
            self._atEndPoint = true;
            layer.add(completionTooltip.renderBox, completionTooltip.renderText);
            layer.draw();
          } else {
            // console.log('i am not sure where i am...', node.id);
            // console.log(node.name);
          }
        } else {
          self._atEndPoint = false;
          completionTooltip.remove();
        }
      });

      event.preventDefault();
      layer.batchDraw();
    });
  }

  doKeyProcess(keys, player) {
    // Down arrow or W for moving sprite down
    if (keys[40] || keys[83]) {
      player.move(DIRECTION.UP);
    } else if (keys[38] || keys[87]) {
      // Up arrow or S to move sprite up
      player.move(DIRECTION.DOWN);
    }

    // Left arrow or A for moving sprite left
    if (keys[37] || keys[65]) {
      player.move(DIRECTION.LEFT);
    } else if (keys[39] || keys[68]) {
      // Right arrow or D to move sprite right
      player.move(DIRECTION.RIGHT);
    }

    // Space or E for interaction
    if (keys[32] || keys[69]) {
      console.log(this._atEndPoint);
      if (this._atEndPoint) {
        alert('YOU WIN! Play again?');
        location.reload();
      } else if (this._inFightScene) {
        const game = Game.getInstance();
        game.switchToMap();
        this._inFightScene = false;
      } else if (this._readyToInteract) {
        const game = Game.getInstance();
        game.switchToFight();
        this._inFightScene = true;
      }
    }
    // Escape or P for pausing (to menu)
    if (keys[27] || keys[80]) {
      alert('Game Paused\nPress ok to continue');
      keys[27] = false;
      keys[80] = false;
    }
  }

  doReverseMovement(keys, player) {
    // Down arrow or W for moving sprite down
    if (keys[40] || keys[83]) {
      player.move(DIRECTION.DOWN);
    } else if (keys[38] || keys[87]) {
      // Up arrow or S to move sprite up
      player.move(DIRECTION.UP);
    }

    // Left arrow or A for moving sprite left
    if (keys[37] || keys[65]) {
      player.move(DIRECTION.RIGHT);
    } else if (keys[39] || keys[68]) {
      // Right arrow or D to move sprite right
      player.move(DIRECTION.LEFT);
    }
  }
}
