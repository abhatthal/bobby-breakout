export class BoundingBox{
	constructor(group, shape, isVisible){
		this.boundingArea = shape.getClientRect({ relativeTo: group });
		this.box = new Konva.Rect({
			x: this.boundingArea.x,
			y: this.boundingArea.y,
			width: this.boundingArea.width,
			height: this.boundingArea.height,
			stroke: 'cyan',
			strokeWidth: (isVisible) ? 5 : 0
		});
	}
	
	get boundingBox(){
		return this.box;
	}
}