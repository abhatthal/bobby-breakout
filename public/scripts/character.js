import { Entity } from './entity.js'

export class Character extends Entity {
    constructor(data) {
        super(data);
    }
}

export class Player extends Character {
    constructor(data) {
        super(data);
    }
}

class Vision {
    constructor(group, shape) {
        this.boundingArea = shape.getClientRect({ relativeTo: group });
        this.cone = new Konva.RegularPolygon({
            x: this.boundingArea.x + this.boundingArea.width/2,
			y: this.boundingArea.y + this.boundingArea.height*1.5,
			width: 100,
            height: 100,
            sides: 3,
            radius: 40,
            stroke: 'black',
            strokeWidth: 4
        });
    }

    get coneArea(){
		return this.cone;
	}
}

export class NPC extends Character {
    constructor(data) {
        super(data);

        this.friendly = data.friendly;
        this.orientation = 'left'

        this.visionCone = new Vision(this.group, this.shape);
		this.coneArea = this.visionCone.coneArea;
		
		this.group.add(this.coneArea);
    }
}