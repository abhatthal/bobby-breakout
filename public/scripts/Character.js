import { Entity } from './Entity.js';
import { DIRECTION } from './helper_functions.js';
import { VisionCone } from './BoundingBox.js';

export class Character extends Entity {
	constructor(data) {
		super(data);
		this.speed = 5; //movement speed
	}

	move(dir) {
		// console.log(dir);
		if (dir === DIRECTION.LEFT) {
			this.x += this.speed * DIRECTION.UNIT_LEFT;
			this.group.x(this.x);
		}
		else if (dir === DIRECTION.RIGHT) {
			this.x += this.speed * DIRECTION.UNIT_RIGHT;
			this.group.x(this.x);
		}

		if (dir === DIRECTION.UP) {
			this.y += this.speed * DIRECTION.UNIT_UP;
			this.group.y(this.y);
		}
		else if (dir === DIRECTION.DOWN) {
			this.y += this.speed * DIRECTION.UNIT_DOWN;
			this.group.y(this.y);
		}
	}

	get speed() {
		return this._speed;
	}

	set speed(val) {
		this._speed = val;
	}
}

export class Player extends Character {
	constructor(data) {
		super(data);
	}
}

export class NPC extends Character {
	constructor(data) {
		super(data);
		this.friendly = data.friendly; //bool
		this.orientation = DIRECTION.LEFT;

		this.visionCone = new VisionCone(this.group, this.shape);
		this.coneArea = this.visionCone.coneArea;
		this.visionConeAttr = this.coneArea.getAttrs();

		this.group.add(this.coneArea);
		
		this.feelers = this.visionCone.feelers;
		this.feelers.forEach((feeler) => {
			this.group.add(feeler);
		});
	}

	isSeeing(){
		console.log(this.visionConeAttr);
		console.log(this.coneArea.absolutePosition());

	}
}