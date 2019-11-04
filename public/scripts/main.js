import { Wall } from './Wall.js'
import { Player, NPC } from './Character.js'
import { DIRECTION } from './helper_functions.js';

var stage = new Konva.Stage({
	container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

var layer = new Konva.Layer();
stage.add(layer);


var player = new Player({
	x: Math.random() * window.innerWidth/2,
	y: Math.random() * window.innerHeight/2,
	width: 40,
	height: 40, 
	image: 'assets/bobby.jpg',
});
layer.add(player.render);


var block = new Wall({
	x: Math.random() * window.innerWidth/2,
	y: Math.random() * window.innerHeight/2,
	width: 100,
	height: 100, 
	colour: 'blue',
	name: 'wall'
});
layer.add(block.render);

var block2 = new Wall({
	x: Math.random() * window.innerWidth/2,
	y: Math.random() * window.innerHeight/2,
	width: 50,
	height: 100, 
	colour: 'green',
	name: 'wall'
});
layer.add(block2.render);

var npc = new NPC({
	x: Math.random() * window.innerWidth/2,
	y: Math.random() * window.innerHeight/2,
	width: 40,
	height: 40, 
	colour: 'yellow'
});

npc.isSeeing();

layer.add(npc.render);

var npcArray = []
npcArray.push(npc)

var blockArray = [];
blockArray.push(block);
blockArray.push(block2);
blockArray.push(npc);
console.log(blockArray);

layer.draw();


var container = stage.container();
container.tabIndex = 1;
container.focus();

var keys = [];

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
    pauseGame = !pauseGame;
	}
	

	blockArray.forEach((node) => {
		if(player.isColliding(node)){
			//trigger some interaction, for now, change colour
			player.shape.attrs.fill = 'red';
			console.log("i am touching", node);
		} 
		else{
			player.shape.attrs.fill = 'grey';
		}
		
	});

	// npcArray.forEach((node) => {
	// 	if(node.isSeen(player)){
	// 		//trigger some interaction, for now, change colour
	// 		console.log("i am touching", node);
	// 	} 
		
	// });


  event.preventDefault();
  layer.batchDraw();
});

// Handles when a key is released
container.addEventListener('keyup', function(event) {
	keys[event.keyCode] = false;
});