import { Environment } from './Environment.js'

export class Wall extends Environment{
	constructor(data){	
  	super(data);
  }
	
	//override
	whatAmI(){
		console.log("i am a wall")
	}
}