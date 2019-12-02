import {Character} from './Character.js';
import {DIRECTION} from '../util/helper_functions.js';
const test = require('unit.js');

describe('Character Tests', function() {
  it('character should have a face', function() {
    let character;

    test
        .when('I create a new character', function() {
          character = new Character({
            name: 'Bobby Chan',
            x: 30,
            y: -30,
            width: 60,
            height: 60,
            image: 'assets/bobby.jpg',
            colour: 'grey',
            hp: 100,
            enableFace: true,
          });
        })
        .then('The character should have face defined', function() {
          test.object(character.face).isNot(undefined);
          test.object(character.face).isNot(null);
        });
  });
  it('character should have a speed', function() {
    let character;

    test
        .when('I create a new character', function() {
          character = new Character({
            name: 'Bobby Chan',
            x: 30,
            y: -30,
            width: 60,
            height: 60,
            image: 'assets/bobby.jpg',
            colour: 'grey',
            hp: 100,
            enableFace: true,
          });
        })
        .then('The character should have face defined', function() {
          test.number(character.speed).isNot(undefined);
          test.number(character.speed).isNot(null);
        });
  });
  it('Character simulate move should behave expectedly', function() {
    let character;
    const initialX = 0;
    const initialY = 0;
    const dir = DIRECTION.LEFT;
    const speed = 5;
    let simulatedMove;

    test
        .given('I create a new character', function() {
          character = new Character({
            name: 'Bobby Chan',
            x: initialX,
            y: initialY,
            width: 60,
            height: 60,
            image: 'assets/bobby.jpg',
            colour: 'grey',
            hp: 100,
            enableFace: true,
          });
        })
        .when('I simulate move this character left 5 units', function() {
          simulatedMove = character.simulateMove(dir, speed);
        })
        .then('The new position should be left 5 units', function() {
          test.number(simulatedMove.x).is(-5);
          test.number(simulatedMove.y).is(0);
        });
  });
});

describe('Player Tests', function() {
  it('Player checkCollision should behave expectedly', function() {
    let player;
    let environment;
    const initialX = 0;
    const initialY = 0;
    const width = 60;
    const height = 60;

    test
        .given('I create a new Player', function() {
          player = new Player({
            name: 'Bobby Chan',
            x: initialX,
            y: initialY,
            width: width,
            height: height,
            image: 'assets/bobby.jpg',
            colour: 'grey',
            hp: 100,
            enableFace: true,
          });
        })
        .when('I create a new Environment intersecting with it', function() {
          environment = new Environment({
            x: initialX + width/2,
            y: initialY + height/2,
            width: 20,
            height: 150,
            colour: 'blue',
            name: 'wall',
          });
        })
        .then('The objects should be colliding', function() {
          test.bool(player.checkCollision(player, environment)).is(true);
        });
  });
});
