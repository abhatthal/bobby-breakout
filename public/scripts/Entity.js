import { BoundingBox } from './BoundingBox.js'

export class Entity{
	constructor(data){
	  this.width = data.width;
	  this.height = data.height;
		this.group = new Konva.Group({
			x: data.x,
	      y: data.y
		});
	  this.shape = new Konva.Rect({
	    width: data.width,
	    height: data.height,
	    fill: data.colour
	  });
		//console.log(Konva.Rect(this.shape));
		//console.log(this.shape.getClientRect({ relativeTo: this.group }));
		
		var box = new BoundingBox(this.group, this.shape, true);
		this.bbox = box.boundingBox;
		
		this.group.add(this.shape);
		this.group.add(this.bbox);
	 }
   
   something(){
   	console.log("something");
   }
	 
	 whatAmI(){
		console.log("i am an entity");
	 }
	 
	 get render(){
	 	return this.group;
	 }
	 
	 get width(){
	 	return this.width;
	 }
	 
	 get height(){
	 	return this.height;
	 }
	 
	 set height(height){
	 	this._height = height;
	 }
	 
	 set width(width){
	 	this._width = width;
	 }
	 
}