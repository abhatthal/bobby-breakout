import {Stats} from './Stats.js';

const test = require('unit.js');

describe('Stats Tests', function() {
  it('stats should successfully record walked steps', function() {
    let stats;

    test
        .given('I have a stats instance', function() {
          stats = new Stats({
            userID: 12,
          });
        })
        .when('I record walked steps stats', function() {
          stats.updateStats({userID: 12, walkedSteps: 20});
        })
        .then('The walked steps should increase', function() {
          test.number(stats.walkedSteps).is(20);
        });
  });
  it('stats should successfully record play time', function() {
    let stats;

    test
        .given('I have a stats instance', function() {
          stats = new Stats({
            userID: 12,
          });
        })
        .when('I record played time stats', function() {
          stats.updateStats({userID: 12, playTime: 30});
        })
        .then('The walked steps should increase', function() {
          test.number(stats.playTime).is(30);
        });
  });
});
