import {Entity} from './Entity.js'

export class Environment extends Entity{
	constructor(data){
  	super(data);
  }
  
  noYou(){
  	console.log("no u");
  }
	
	//override
	whatAmI(){
		console.log("i am an environment")
	}
}