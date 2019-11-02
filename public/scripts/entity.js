class BoundingBox{
	constructor(group, shape, isVisible){
		this.boundingArea = shape.getClientRect({ relativeTo: group });
		this.box = new Konva.Rect({
			x: this.boundingArea.x,
			y: this.boundingArea.y,
			width: this.boundingArea.width,
			height: this.boundingArea.height,
			stroke: 'cyan',
			strokeWidth: 5
		});
	}
	
	get boundingBox(){
		return this.box;
	}
}

class Entity{
	constructor(data){
	  	this._width = data.width;
	  	this._height = data.height;
		this.group = new Konva.Group({
			x: data.x,
	      	y: data.y
		});
	  	this.shape = new Konva.Rect({
	    	width: data.width,
	    	height: data.height,
	    	fill: data.colour
	  });
		var box = new BoundingBox(this.group, this.shape, true);
		this.bbox = box.boundingBox;
		
		this.group.add(this.shape);
		this.group.add(this.bbox);
	 }
   
	get render(){
		return this.group;
	}
	
	get width(){
		return this._width;
	}
	
	get height(){
		return this._height;
	}
	
	set height(height){
		this._height = height;
	}
	
	set width(width){
		this._width = width;
	}	 

	get x(){
		return this.group.x();
	}
	
	get y(){
		return this.group.y();
	}
	
	set x(x){
		this.group.x(x);
	}
	
	set y(y){
		this.group.y(y);
	}	 
}

export default Entity;