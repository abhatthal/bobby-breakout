import { Wall } from './Wall.js'

var stage = new Konva.Stage({
	container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

var layer = new Konva.Layer();
stage.add(layer);


var block = new Wall({
	x: Math.random() * window.innerWidth/2,
	y: Math.random() * window.innerHeight/2,
	width: 100,
	height: 100, 
	colour: 'blue'
});
block.something();
block.noYou();
block.whatAmI();

layer.add(block.render);

var rect = new Konva.Rect({
	x: 20,
  y: 20,
  width: 100,
  height: 100,
  fill: 'red'
})

layer.add(rect);
layer.draw();