import Entity from './entity.js'

class Environment extends Entity{
	constructor(data){
  	super(data);
  }
}

class Wall extends Environment{
	constructor(data){	
  	super(data);
  }
}

export default Wall;