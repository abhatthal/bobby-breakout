import {Achievements} from './Achievements.js';
import {testAchievement} from './AchievementsList.js';
const test = require('unit.js');

describe('Achievement Tests', function() {
  it('adds achievements', function() {
    let achievementsList;
    let achievementToAdd;

    test
        .given('I have an empty achievements list', function() {
          achievementsList = new Achievements();
        })
        .when('I add an achievement to my inventory', function() {
          achievementToAdd = testAchievement;
          achievementsList.add(itemToAdd);
        })
        .then('The item should be successfully added to my achievements', function() {
          test.array(achievementsList.Achievements).contains(achievementToAdd);
        });
  });
  it('adding an already achieved achievement', function() {
    let achievementsList;
    let achievementToAdd;

    test
        .given('I have an achievements list with one test achievement', function() {
          achievementsList = new Achievements();
          achievementToAdd = testAchievement;
          achievementsList.add(itemToAdd);
          test.array(achievementsList.Achievements).contains(achievementToAdd);
          test.number(achievementsList.Achievements_num).is(1);
        })
        .when('I add the same achievement to my achievements again', function() {
          achievementsList.add(itemToAdd);
        })
        .then('The item should not be added again to my inventory', function() {
          test.array(achievementsList.Achievements).contains(achievementToAdd);
          test.number(achievementsList.Achievements_num).is(1);
        });
  });
});
