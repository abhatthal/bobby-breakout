import { Entity } from './Entity.js'

export class Environment extends Entity{
	constructor(data){
    super(data);
    this.impassible = data.impassible || false;
  }
  
  get impassible(){
		return this._impassible;
	}
	
	set impassible(val){
		this._impassible = val;
	}
}