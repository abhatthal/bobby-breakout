import {FightScene} from './FightScene.js';
import {Player} from '../world/Character.js';
import {BossNPC} from '../world/NPC.js';
const test = require('unit.js');

describe('FightScene Tests', function() {
  it('should have a the agruments passed in stored locally', function() {
    let stage;
    let player;
    let fightScene;

    test
        .given('I have a game instance', function() {
          stage = new Konva.Stage({
            container: 'container',
            width: document.getElementById('container').clientWidth,
            height: document.getElementById('container').clientHeight,
          });
          player = new Player({
            name: 'Bobby Chan',
            x: stage.width()/2 - 30,
            y: stage.height()/2 - 30,
            globalX: 5280.31,
            globalY: 7207.55,
            width: 60,
            height: 60,
            image: 'assets/bobby.jpg',
            colour: 'grey',
            hp: 100,
            enableFace: true,
          });
        })
        .when('I create a new fight scene', function() {
          fightScene = new FightScene({
            stage: stage,
            player: player,
          });
        })
        .then('The arguements passed in should not be null or undefined', function() {
          test.object(fightScene.player).isNot(undefined);
          test.object(fightScene.player).isNot(null);
        });
  });
  it('should be switched to map when player dies', function() {
    let stage;
    let player;
    let npc;
    let Game;

    test
        .given('I have a fight scene', function() {
          stage = new Konva.Stage({
            container: 'container',
            width: document.getElementById('container').clientWidth,
            height: document.getElementById('container').clientHeight,
          });
          player = new Player({
            name: 'Bobby Chan',
            x: stage.width()/2 - 30,
            y: stage.height()/2 - 30,
            globalX: 5280.31,
            globalY: 7207.55,
            width: 60,
            height: 60,
            image: 'assets/bobby.jpg',
            colour: 'grey',
            hp: 100,
            enableFace: true,
          });
          npc = new BossNPC({
            name: 'Faculty',
            x: 285 + initialDisplacement.x,
            y: -2775 + initialDisplacement.y,
            width: 250,
            height: 250,
            colour: 'red',
            impassible: true,
            hp: 100,
            enableFace: true,
          });
          fightScene = new FightScene({
            stage: stage,
            player: player,
          });
          game = Game.getInstance();
        })
        .when('The npc\'s hp is 0 or less than 0', function() {
          if (npc.hp <= 0) {
            player.hp = player.MAX_HP;
            game.switchToMap();
          }
        })
        .then('The current scene in the game should be map', function() {
          test.object(game.current_scene).is(game.mapScene);
        });
  });
  it('player\'s hp should be replenished after defeating the enemy', function() {
    let stage;
    let player;
    let npc;
    let Game;

    test
        .given('I have a fight scene', function() {
          stage = new Konva.Stage({
            container: 'container',
            width: document.getElementById('container').clientWidth,
            height: document.getElementById('container').clientHeight,
          });
          player = new Player({
            name: 'Bobby Chan',
            x: stage.width()/2 - 30,
            y: stage.height()/2 - 30,
            globalX: 5280.31,
            globalY: 7207.55,
            width: 60,
            height: 60,
            image: 'assets/bobby.jpg',
            colour: 'grey',
            hp: 100,
            enableFace: true,
          });
          npc = new BossNPC({
            name: 'Faculty',
            x: 285 + initialDisplacement.x,
            y: -2775 + initialDisplacement.y,
            width: 250,
            height: 250,
            colour: 'red',
            impassible: true,
            hp: 100,
            enableFace: true,
          });
          fightScene = new FightScene({
            stage: stage,
            player: player,
          });
          game = Game.getInstance();
        })
        .when('The player defeats the npc', function() {
          if (npc.hp <= 0) {
            player.hp = player.MAX_HP;
            game.switchToMap();
          }
        })
        .then('The player\'s hp should be replenished', function() {
          test.number(player.hp).is(player.MAX_HP);
        });
  });
});
