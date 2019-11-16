import {Wall} from './Wall.js';
import {Environment} from './Environment.js';
import {Player, NPC} from './Character.js';
import {DIRECTION} from './helper_functions.js';
import {Tooltip} from './Tooltip.js';

// Set premium content visbility
const premiumContainer = document.getElementById('premium_content');
const url = new URL(window.location.href);
const isPremium = url.searchParams.get('premium');

if (isPremium === 'true') {
  premiumContainer.style.display = 'block';
}
// END premium content visbility

const stage = new Konva.Stage({
  container: 'container',
  width: 1000,
  height: 500,
});

const layer = new Konva.Layer();
stage.add(layer);

const fightLayer = new Konva.Layer();

// Tooltip for fight
const fightTooltip = new Tooltip({
  x: 100,
  y: 100,
  width: 300,
  text: 'TIME TO FIGHT! coming later...\nE/SPACE TO RETURN',
});

fightLayer.add(fightTooltip.renderBox, fightTooltip.renderText);
fightLayer.draw();

const startPoint = new Environment({
  x: 0,
  y: stage.height() - 120,
  width: 120,
  height: 120,
  colour: 'green',
  name: 'start',
});
layer.add(startPoint.render);

const endPoint = new Environment({
  x: stage.width() - 120,
  y: 0,
  width: 120,
  height: 120,
  colour: 'red',
  name: 'end',
});
layer.add(endPoint.render);

// Tooltip for completing level
const completionTooltip = new Tooltip({
  x: stage.width() - 400,
  y: 0,
  width: 240,
  text: 'E/SPACE\nTO COMPLETE LEVEL',
});


const player = new Player({
  x: 40,
  y: stage.height() - 80,
  width: 40,
  height: 40,
  image: 'assets/bobby.jpg',
  colour: 'grey',
  hp: 100,
});
layer.add(player.render);


const block = new Wall({
  x: stage.width() / 2 - 70,
  y: stage.height() / 2,
  width: 300,
  height: 30,
  colour: 'orange',
  name: 'wall',
});
layer.add(block.render);

const block2 = new Wall({
  x: stage.width() / 2,
  y: stage.height() - 150,
  width: 20,
  height: 150,
  colour: 'blue',
  name: 'wall',
  impassible: true,
});
layer.add(block2.render);


// borders for stage
const stageTop = new Wall({
  x: 0,
  y: 0,
  width: stage.width(),
  height: 0,
  colour: 'green',
  name: 'wall',
});
layer.add(stageTop.render);

const stageBottom = new Wall({
  x: 0,
  y: stage.height(),
  width: stage.width(),
  height: 0,
  colour: 'green',
  name: 'wall',
});
layer.add(stageBottom.render);

const stageLeft = new Wall({
  x: 0,
  y: 0,
  width: 0,
  height: stage.height(),
  colour: 'green',
  name: 'wall',
});
layer.add(stageLeft.render);

const stageRight = new Wall({
  x: stage.width(),
  y: 0,
  width: 0,
  height: stage.height(),
  colour: 'green',
  name: 'wall',
});
layer.add(stageRight.render);


const npc = new NPC({
  x: 400,
  y: 50,
  width: 40,
  height: 40,
  colour: 'yellow',
  impassible: true,
  hp: 100,
});
npc.isSeeing(player);
layer.add(npc.render);


const npcArray = [];
npcArray.push(npc);

const blockArray = [];
blockArray.push(block);
blockArray.push(block2);
blockArray.push(stageTop);
blockArray.push(stageBottom);
blockArray.push(stageLeft);
blockArray.push(stageRight);
// console.log(blockArray);

const spawnArray = [];
spawnArray.push(startPoint);
spawnArray.push(endPoint);

layer.draw();


const container = stage.container();
container.tabIndex = 1;
container.focus();

const keys = [];

// Tooltip for interaction
const tooltip = new Tooltip({
  x: 0,
  y: 0,
  text: 'E/SPACE\nTO INTERACT',
});

let readyToInteract = false;
let inFightScene = false;
let atEndPoint = false;
// Handles keys being pressed down
container.addEventListener('keydown', function(event) {
  keys[event.keyCode] = true;

  doKeyProcess(keys);

  let isColliding = false;
  blockArray.forEach((node) => {
    if (player.checkCollision(node)) {
      // handle impassible walls here
      if (node.impassible === true) {
        doReverseMovement(keys);
      }
      isColliding = true;
    }
  });
  if (isColliding) {
    player.shape.attrs.fill = 'red';
  } else {
    player.shape.attrs.fill = 'grey';
  }

  npcArray.forEach((node) => {
    player.checkCollision(node);
    node.checkPlayerDetection(player);
    if (player.isColliding(node)) {
      // trigger some interaction, for now, change colour
      // console.log('i am touching an NPC', node.id);
      // handle impassible NPCs here
      if (node.impassible === true) {
        doReverseMovement(keys);
      }
      isColliding = true;
    }
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
      readyToInteract = true;
    } else {
      tooltip.remove();
      readyToInteract = false;
    }
  });

  spawnArray.forEach((node) => {
    player.checkCollision(node);
    if (player.isColliding(node)) {
      // trigger some interaction, for now, change colour
      if (node.name === 'start') {
        // console.log('i am at the spawn', node.id);
      } else if (node.name === 'end') {
        // console.log('i am a winner', node.id);
        atEndPoint = true;
        layer.add(completionTooltip.renderBox, completionTooltip.renderText);
        layer.draw();
      } else {
        // console.log('i am not sure where i am...', node.id);
        // console.log(node.name);
      }
    } else {
      atEndPoint = false;
      completionTooltip.remove();
    }
  });

  event.preventDefault();
  layer.batchDraw();
});

// Handles when a key is released
container.addEventListener('keyup', function(event) {
  keys[event.keyCode] = false;
});

function doKeyProcess(keys) {
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
    if (atEndPoint) {
      alert('YOU WIN! Play again?');
      location.reload();
    } else if (inFightScene) {
      fightLayer.remove();
      stage.add(layer);
      inFightScene = false;
    } else if (readyToInteract) {
      layer.remove();
      stage.add(fightLayer);
      inFightScene = true;
    }
  }
  // Escape or P for pausing (to menu)
  if (keys[27] || keys[80]) {
    alert('Game Paused\nPress ok to continue');
    keys[27] = false;
    keys[80] = false;
  }
}

function doReverseMovement(keys) {
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
