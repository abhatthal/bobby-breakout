import { Wall } from './Wall.js'
import { Environment } from './Environment.js'
import { Player, NPC } from './Character.js'
import { DIRECTION } from './helper_functions.js';

var stage = new Konva.Stage({
  container: 'container',
  width: 1000,
  height: 500
});

var layer = new Konva.Layer();
stage.add(layer);


var startPoint = new Environment({
  x: 0,
  y: stage.height() - 120,
  width: 120,
  height: 120, 
  colour: 'green',
  name: 'start'
});
layer.add(startPoint.render);

var endPoint = new Environment({
  x: stage.width() - 120,
  y: 0,
  width: 120,
  height: 120, 
  colour: 'red',
  name: 'end'
});
layer.add(endPoint.render);


var player = new Player({
  x: 40,
  y: stage.height() - 80,
  width: 40,
  height: 40, 
  image: 'assets/bobby.jpg',
  colour: 'grey'
});
layer.add(player.render);


var block = new Wall({
  x: stage.width() / 2 - 70,
  y: stage.height() / 2,
  width: 300,
  height: 30, 
  colour: 'orange',
  name: 'wall'
});
layer.add(block.render);

var block2 = new Wall({
  x: stage.width() / 2,
  y: stage.height() - 150,
  width: 20,
  height: 150, 
  colour: 'blue',
  name: 'wall'
});
layer.add(block2.render);


// borders for stage
var stageTop = new Wall({
  x: 0,
  y: 0,
  width: stage.width(),
  height: 0, 
  colour: 'green',
  name: 'wall',
});
layer.add(stageTop.render);

var stageBottom = new Wall({
  x: 0,
  y: stage.height(),
  width: stage.width(),
  height: 0, 
  colour: 'green',
  name: 'wall',
});
layer.add(stageBottom.render);

var stageLeft = new Wall({
  x: 0,
  y: 0,
  width: 0,
  height: stage.height(), 
  colour: 'green',
  name: 'wall',
});
layer.add(stageLeft.render);

var stageRight = new Wall({
  x: stage.width(),
  y: 0,
  width: 0,
  height: stage.height(), 
  colour: 'green',
  name: 'wall',
});
layer.add(stageRight.render);


var npc = new NPC({
  x: 400,
  y: 50,
  width: 40,
  height: 40, 
  colour: 'yellow'
});
npc.isSeeing(player);
layer.add(npc.render);


var npcArray = [];
npcArray.push(npc);

var blockArray = [];
blockArray.push(block);
blockArray.push(block2);
blockArray.push(stageTop);
blockArray.push(stageBottom);
blockArray.push(stageLeft);
blockArray.push(stageRight);
console.log(blockArray);

// An array containing start and end spawns
// presently does nothing
var spawnArray = [];
spawnArray.push(startPoint);
spawnArray.push(endPoint);

layer.draw();


var container = stage.container();
container.tabIndex = 1;
container.focus();

var keys = [];

// Tooltip for interaction
var tooltip = new Konva.Text({
  x: 0,
  y: 0,
  text: "E/SPACE\nTO INTERACT",
  fontSize: 18,
  fill: '#555',
  padding: 20,
  align: 'center'
})

var tooltipBox = new Konva.Rect({
  x: 0,
  y: 0,
  stroke: '#555',
  strokeWidth: 5,
  fill: '#ddd',
  width: 160,
  height: tooltip.height(),
  shadowColor: 'black',
  shadowBlur: 10,
  shadowOffsetX: 10,
  shadowOffsetY: 10,
  shadowOpacity: 0.2,
  cornerRadius: 10
})

// Handles keys being pressed down
container.addEventListener('keydown', function(event) {
  keys[event.keyCode] = true;

  // Down arrow or W for moving sprite down 
  if (keys[40] || keys[83]) {
    player.move(DIRECTION.UP);
  }
  // Up arrow or S to move sprite up
  else if (keys[38] || keys[87]) {
    player.move(DIRECTION.DOWN);
  }
  
  // Left arrow or A for moving sprite left
  if (keys[37] || keys[65]) {
    player.move(DIRECTION.LEFT);
  }
  // Right arrow or D to move sprite right
  else if (keys[39] || keys[68]) {
    player.move(DIRECTION.RIGHT);
  }
  
  // Space or E for interaction 
  if (keys[32] || keys[69]) {
    interactDown = true;
  }
  // Escape or P for pausing (to menu)
  if (keys[27] || keys[80]) {
    alert("Game Paused\nPress ok to continue");
    keys[27] = false;
    keys[80] = false;
  }
  

  blockArray.forEach((node) => {
    player.checkCollision(node);    
  });

  npcArray.forEach((node) => {
    player.checkCollision(node);
    node.checkPlayerDetection(player);
    if(player.isColliding(node)) {
      //trigger some interaction, for now, change colour
      console.log("i am touching an NPC", node.id);
    }
    if(node.isSeeing(player)) {
      console.log("i see the player");
      tooltip.x(node.x + 50);
      tooltip.y(node.y - 50);
      tooltipBox.x(node.x + 50);
      tooltipBox.y(node.y - 50);
      layer.add(tooltipBox);
      layer.add(tooltip);
      layer.draw();
    }
    else {
      tooltip.remove();
      tooltipBox.remove();
    }
  });

  spawnArray.forEach((node) => {
    player.checkCollision(node);
    if(player.isColliding(node)) {
      //trigger some interaction, for now, change colour
      if (node.name === 'start') {
        console.log("i am at the spawn", node.id);
      }
      else if (node.name === 'end') {
        console.log("i am a winner", node.id);
        setTimeout(function() {
          alert("YOU WIN! Play again?");
          location.reload();
        }, 1000);
      }
      else {
        console.log("i am not sure where i am...", node.id);
        console.log(node.name);
      }
    }
  });


  event.preventDefault();
  layer.batchDraw();
});

// Handles when a key is released
container.addEventListener('keyup', function(event) {
  keys[event.keyCode] = false;
});