import {Game} from './Game.js';
import {MapScene} from './world/MapScene.js';
import {FightScene} from './fight/FightScene.js';
import {InventoryScene} from './inventory/InventoryScene.js';
import {AchievementsScene} from './achievements/AchievementsScene.js';

const test = require('unit.js');

describe('Game Tests', function() {
  it('game should successfully switch to map scene', function() {
    let game;

    test
        .given('I am on a non-map scene', function() {
          Game.initialize();
          game = Game.getInstance();
          game.switchToInventory();
        })
        .when('I switch to the map scene', function() {
          game.switchToMap();
        })
        .then('I should be on the map scene', function() {
          test.bool(game.current_scene instanceof MapScene).is(true);
        });
  });
  it('game should successfully switch to inventory scene', function() {
    let game;

    test
        .given('I am on a non-inventory scene', function() {
          Game.initialize();
          game = Game.getInstance();
          game.switchToMap();
        })
        .when('I switch to the map scene', function() {
          game.switchToInventory();
        })
        .then('I should be on the map scene', function() {
          test.bool(game.current_scene instanceof InventoryScene).is(true);
        });
  });
  it('game should successfully switch to achievements scene', function() {
    let game;

    test
        .given('I am on a non-achievements scene', function() {
          Game.initialize();
          game = Game.getInstance();
          game.switchToMap();
        })
        .when('I switch to the map scene', function() {
          game.switchToAchievements();
        })
        .then('I should be on the map scene', function() {
          test.bool(game.current_scene instanceof AchievementsScene).is(true);
        });
  });
  it('game should successfully switch to fight scene', function() {
    let game;
    const npc = {};
    const map = {};

    test
        .given('I am on a non-fight scene', function() {
          Game.initialize();
          game = Game.getInstance();
          game.switchToMap();
        })
        .when('I switch to the fight scene', function() {
          game.switchToFight(npc, map);
        })
        .then('I should be on the fight scene', function() {
          test.bool(game.current_scene instanceof FightScene).is(true);
        });
  });
});
