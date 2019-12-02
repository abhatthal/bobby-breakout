import {NPC} from './NPC.js';
import {DIRECTION} from '../util/helper_functions.js';
const test = require('unit.js');

describe('NPC Tests', function() {
  it('NPC should have a vision box', function() {
    let character;

    test
        .when('I create a new character', function() {
          character = new NPC({
            name: 'CMPT 276 Student',
            x: 0,
            y: 0,
            width: 60,
            height: 60,
            colour: 'yellow',
            impassible: true,
            hp: 100,
            enableFace: true,
          });
        })
        .then('The character should have face defined', function() {
          test.object(character.visionBox).isNot(undefined);
          test.object(character.visionBox).isNot(null);
        });
  });
  it('character should be able to see player', function() {
    let npc;
    let player;
    const initialX = 0;
    const initialY = 0;

    test
        .given('I create a new NPC', function() {
          npc = new NPC({
            name: 'CMPT 276 Student',
            x: initialX,
            y: initialY,
            width: 60,
            height: 60,
            colour: 'yellow',
            impassible: true,
            hp: 100,
            enableFace: true,
          });
          npc.group.rotation(90); // looking left
        })
        .when('I create a new player in its vision', function() {
          player = new Player({
            name: 'Bobby Chan',
            x: initialX - 50,
            y: initialY,
            width: 60,
            height: 60,
            image: 'assets/bobby.jpg',
            colour: 'grey',
            hp: 100,
            enableFace: true,
          });
        })
        .then('The npc should see the player', function() {
          test.bool(npc.isSeeing(player)).is(true);
        });
  });
  it('NPC scroll should behave expectedly', function() {
    let npc;
    const initialX = 0;
    const initialY = 0;
    const speed = 5;

    test
        .given('I create a new NPC', function() {
          npc = new NPC({
            name: 'CMPT 276 Student',
            x: initialX,
            y: initialY,
            width: 60,
            height: 60,
            colour: 'yellow',
            impassible: true,
            hp: 100,
            enableFace: true,
          });
        })
        .when('I scroll this environment in all directions', function() {
          npc.scroll(DIRECTION.LEFT, speed);
          npc.scroll(DIRECTION.DOWN, speed);
          npc.scroll(DIRECTION.UP, speed/2);
          npc.scroll(DIRECTION.RIGHT, speed/2);
        })
        .then('The new position should be correct', function() {
          test.number(npc.x).is(-speed/2);
          test.number(npc.y).is(-speed/2);
        });
  });
});
