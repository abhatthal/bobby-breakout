import { Entity } from './Entity.js';
import { DIRECTION } from './helper_functions.js';

export class Character extends Entity {
    constructor(data) {
        super(data);
        this.speed = 5; //movement speed
    }

    move(dir){ 
        // console.log(dir);
        if(dir === DIRECTION.LEFT){
            this.x += this.speed * DIRECTION.UNIT_LEFT;
            this.group.x(this.x);
        }
        else if(dir === DIRECTION.RIGHT){
            this.x += this.speed * DIRECTION.UNIT_RIGHT;
            this.group.x(this.x);
        }

        if(dir === DIRECTION.UP){
            this.y += this.speed * DIRECTION.UNIT_UP;
            this.group.y(this.y);
        }
        else if(dir === DIRECTION.DOWN){
            this.y += this.speed * DIRECTION.UNIT_DOWN;
            this.group.y(this.y);
        }
    }

    get speed(){
        return this._speed;
    }

    set speed(val){
        this._speed = val;
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