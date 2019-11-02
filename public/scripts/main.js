import Wall from './environment.js'
import Character from './character.js'

var div = document.getElementById('container')

var stage = new Konva.Stage({
    container: div,
    width: window.innerWidth/2,
    height: window.innerHeight/2
});

var layer = new Konva.Layer();
stage.add(layer);

var player = new Character({
	x: Math.random() * window.innerWidth/4,
	y: Math.random() * window.innerHeight/4,
	width: 100,
	height: 100, 
	colour: 'blue'
});

layer.add(player.render);
layer.draw()

var container = stage.container();
container.tabIndex = 1;
container.focus();

const DELTA = 5;

var keys = [];

// Handles keys being pressed down
container.addEventListener('keydown', function(event) {
	keys[event.keyCode] = true;

    // Down arrow or S for moving sprite down 
    if (keys[40] || keys[83]) {
        player.y = player.y + DELTA;
	}
	// Up arrow or W to move sprite up
	else if (keys[38] || keys[87]) {
        player.y = player.y - DELTA;
	}
	
    // Left arrow or A for moving sprite left
    if (keys[37] || keys[65]) {
        player.x = player.x - DELTA;
    }
    // Right arrow or D to move sprite right
    else if (keys[39] || keys[68]) {
        player.x = player.x + DELTA;
	}
	
    // Space or E for interaction 
    if (keys[32] || keys[69]) {
        interactDown = true;
    }
    // Escape or P for pausing (to menu)
    if (keys[27] || keys[80]) {
        pauseGame = !pauseGame;
	}
    event.preventDefault();
    layer.batchDraw();
});

// Handles when a key is released
container.addEventListener('keyup', function(event) {
	keys[event.keyCode] = false;
});