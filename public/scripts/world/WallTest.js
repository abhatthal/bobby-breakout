import {Wall} from './Wall.js';
const test = require('unit.js');

describe('Wall Tests', function() {
  it('wall should be impassable by default', function() {
    let environment;

    test
        .when('I create a new wall obj', function() {
          environment = new Wall({
            x: 0,
            y: 0,
            width: 20,
            height: 150,
            colour: 'blue',
            name: 'wall',
          });
        })
        .then('The wall should be impassable', function() {
          test.bool(environment.impassible).is(true);
        });
  });
});
