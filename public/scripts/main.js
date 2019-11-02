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

var interactDown = false;
var pauseGame = false;

// Handles keys being pressed down
container.addEventListener('keydown', function (event) {
    // Down arrow or S for moving sprite down 
    if (event.keyCode === 40 || event.keyCode === 83) {
        player.y = player.y + DELTA;
    }
    // Up arrow or W to move sprite up
    else if (event.keyCode === 38 || event.keyCode === 87) {
        player.y = player.y - DELTA;
    }
    // Left arrow or A for moving sprite left
    else if (event.keyCode === 37 || event.keyCode === 65) {
        player.x = player.x - DELTA;
    }
    // Right arrow or D to move sprite right
    else if (event.keyCode === 39 || event.keyCode === 68) {
        player.x = player.x + DELTA;
    }
    // Space or E for interaction 
    else if (event.keyCode === 32 || event.keyCode === 69) {
        interactDown = true;
    }
    // Escape or P for pausing (to menu)
    else if (event.keyCode === 27 || event.keyCode === 80) {
        pauseGame = !pauseGame;
	}
	else {
		return;
	}
    event.preventDefault();
    layer.batchDraw();
})