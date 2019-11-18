import {Environment} from './Environment.js';

export class Wall extends Environment {
  constructor(data) {
    super(data);
    this.impassible = data.impassible !== undefined ? data.impassible : true;
  }
}
