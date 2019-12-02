import {Environment} from './Environment.js';
import {DIRECTION} from '../util/helper_functions.js';
const test = require('unit.js');

describe('Environment Tests', function() {
  it('environment should be passable by default', function() {
    let environment;

    test
        .when('I create a new environment obj', function() {
          environment = new Environment({
            x: 0,
            y: 0,
            width: 20,
            height: 150,
            colour: 'blue',
            name: 'wall',
          });
        })
        .then('The environment should be passable', function() {
          test.bool(environment.impassible).is(false);
        });
  });
  it('environment scroll should behave expectedly', function() {
    let environment;
    const initialX = 0;
    const initialY = 0;
    const speed = 5;

    test
        .given('I create a new character', function() {
          environment = new Environment({
            x: initialX,
            y: initialY,
            width: 20,
            height: 150,
            colour: 'blue',
            name: 'wall',
          });
        })
        .when('I scroll this environment in all directions', function() {
          environment.scroll(DIRECTION.LEFT, speed);
          environment.scroll(DIRECTION.DOWN, speed);
          environment.scroll(DIRECTION.UP, speed/2);
          environment.scroll(DIRECTION.RIGHT, speed/2);
        })
        .then('The new position should be correct', function() {
          test.number(environment.x).is(-speed/2);
          test.number(environment.y).is(-speed/2);
        });
  });
});
