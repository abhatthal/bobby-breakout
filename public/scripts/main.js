/* eslint-disable require-jsdoc */
import {Wall} from './Wall.js';
import {Environment} from './Environment.js';
import {Player, NPC} from './Character.js';
import {DIRECTION} from './helper_functions.js';
import {Tooltip} from './Tooltip.js';
// import { stringify } from 'querystring';
// import {Skills} from './Skills.js';
import * as skilldefault from './skilldefault.js';

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
  enableFace: true,
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

// Tooltip for fight scene
const skillA1Tooltip = new Tooltip({
  x: 300,
  y: 400,
  width: 100,
  height: 50,
  text: 'A1 Z',
});

const skillA2Tooltip = new Tooltip({
  x: 450,
  y: 400,
  width: 100,
  height: 50,
  text: 'A2 X',
});

const skillA3Tooltip = new Tooltip({
  x: 600,
  y: 400,
  width: 100,
  height: 50,
  text: 'A3 C',
});

const skillA4Tooltip = new Tooltip({
  x: 750,
  y: 400,
  width: 100,
  height: 50,
  text: 'A4 V',
});
/*
const PlayerTooltip = new Tooltip({
  x: 20,
  y: 130,
  width: 150,
  height: 300,
  text: playerStatText, // 'Bobby here! \nsmash all ppl \nblocking your way' + `${player.hp}`,
});

const EnemyTooltip = new Tooltip({
  x: 820,
  y: 30,
  width: 150,
  height: 300,
  text: enemyStatText,
});
*/
const fightTooltip = new Tooltip({
  x: 250,
  y: 30,
  width: 500,
  height: 150,
  text: 'TIME TO FIGHT! coming later...\nE/SPACE TO RETURN',
});

const escapeTooltip = new Tooltip({
  x: 300,
  y: 320,
  width: 550,
  height: 150,
  text: 'Q to normal attack; E to escape fight',
});

function fightSceneLoad(player, npc) {
  const playerStatText = 'Bobby here! \nsmash all ppl \nblocking your way\n' + player.hp; //
  const enemyStatText = 'Bbart: \ncome fight bobby\n\n' + npc.hp;
  console.log(playerStatText);
  const playerTooltip = new Tooltip({
    x: 20,
    y: 130,
    width: 150,
    height: 300,
    text: playerStatText, // 'Bobby here! \nsmash all ppl \nblocking your way' + `${player.hp}`,
  });

  const enemyTooltip = new Tooltip({
    x: 820,
    y: 30,
    width: 150,
    height: 300,
    text: enemyStatText,
  });
  fightLayer.add(skillA1Tooltip.renderBox, skillA1Tooltip.renderText);
  fightLayer.add(skillA2Tooltip.renderBox, skillA2Tooltip.renderText);
  fightLayer.add(skillA3Tooltip.renderBox, skillA3Tooltip.renderText);
  fightLayer.add(skillA4Tooltip.renderBox, skillA4Tooltip.renderText);
  fightLayer.add(playerTooltip.renderBox, playerTooltip.renderText);
  fightLayer.add(enemyTooltip.renderBox, enemyTooltip.renderText);
  fightLayer.add(fightTooltip.renderBox, fightTooltip.renderText);
  fightLayer.add(escapeTooltip.renderBox, escapeTooltip.renderText);
  fightLayer.draw();
}

// Handles keys being pressed down
container.addEventListener('keydown', function(event) {
  keys[event.keyCode] = true;

  // key pressed in world map
  if (inFightScene == false) {
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
  } else {
    // during fight and key pressed
    console.log(player.skillA1);
    fightLoop(player, npc);
    if (!inFightScene) {
      fightLayer.remove();
      stage.add(layer);
      if (npc.hp <= 0) {
        alert('YOU beat an enemy!');
        npcArray.pop(npc);
      } else if (player.hp <= 0) {
        alert('YOU Fail, retry?');
        location.reload();
      }
    }
  }
  event.preventDefault();
  layer.batchDraw();
});

// Handles when a key is released
container.addEventListener('keyup', function(event) {
  keys[event.keyCode] = false;
});

// Skills
/*
player.skillA1 = new Skills({
  description: 'aa',
  damage: -5,
});
*/
player.skillA1 = skilldefault.Skill1;

function fightLoop(subject, opponent) {
  // assume player act first
  if (subject.fightSpeed >= opponent.fightSpeed) {
    if (inFightScene) {
      doKeyfight(keys, opponent);
      if (opponent.hp <= 0) {
        inFightScene = false;
      }
    }
    if (inFightScene) {
      enemyfight(opponent, subject);
      if (subject.hp <= 0) {
        inFightScene = false;
      }
    }
  } else {
    if (inFightScene) {
      enemyfight(opponent, subject);
      if (subject.hp <= 0) {
        inFightScene = false;
      }
    }
    if (inFightScene) {
      doKeyfight(keys, opponent);
      if (opponent.hp <= 0) {
        inFightScene = false;
      }
    }
  }
  fightSceneLoad(player, npc);
}

// Enemy fight strategy
function enemyfight(opponent, subject) {
  // alert(opponent.hp, subject.hp);
  // opponent.skillA1.hpchange(subject, 0);
}

function doKeyfight(keys) {
  // trigger escape with E
  if (keys[32] || keys[69]) {
    fightLayer.remove();
    stage.add(layer);
    inFightScene = false;
  } else if (keys[81]) {
  // press Q for normal hit
  // normalattack.hpchange(npc, 0);
    // player.skillA1.hpchange(npc, 0);
    // npc.hp -= 50;

    // console.log(player.skillA1);

    player.skillA1.hpChange(npc, -50);

    // alert(player.skillA1.descripttion);
    // npc.skillA1.hpchange(-50);
    console.log(npc.hp);
  }
}

function doKeyProcess(keys) {
  if (inFightScene == false) {
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
      } else if (readyToInteract) {
        // trigger fight loop
        layer.remove();
        fightSceneLoad(player, npc);
        stage.add(fightLayer);
        inFightScene = true;
        // fightloop(player, npc);
      }
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
