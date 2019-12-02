import {Tooltip} from './ToolTip.js';
const test = require('unit.js');

describe('Tooltip Tests', function() {
  it('moves to specified location', function() {
    let tooltip;

    test
        .given('A tooltip exists', function() {
          tooltip = new Tooltip({
            x: data.stage.width(),
            y: data.stage.height(),
            width: 220,
            height: 50,
            text: 'Bobby Chan',
          });
        })
        .when('I move the tooltip to a x,y location', function() {
          tooltip.moveTo({
            x: 1000,
            y: 500,
          });
        })
        .then('The tooltip will move to the new x,y location', function() {
          test.number(tooltip.x).is(1000);
          test.number(tooltip.y).is(500);
        });
  });
  it('is removed', function() {
    let tooltip;

    test
        .given('A tooltip exists', function() {
          tooltip = new Tooltip({
            x: data.stage.width()-220,
            y: data.stage.height(),
            width: 220,
            height: 50,
            text: 'The Dean of CMPT',
          });
        })
        .when('I remove the tooltip', function() {
          tooltip.remove();
        })
        .then('The tooltip\'s contesnts should be removed', function() {
          test.undefined(tooltip.renderBox);
          test.undefined(tooltip.renderText);
          test.undefined(tooltip.render);
        });
  });
  it('update text', function() {
    let tooltip;

    test
        .given('A tooltip exists', function() {
          tooltip = new Tooltip({
            x: data.stage.width()-220,
            y: data.stage.height(),
            width: 220,
            height: 50,
            text: 'filler text to be updated',
          });
        })
        .when('I update the text of tooltip', function() {
          tooltip.text = 'Teacher\'s Pet';
        })
        .then('The tooltip\'s text will update to the given string', function() {
          test.string(tooltip.text).is('Teacher\'s Pet');
        });
  });
});
