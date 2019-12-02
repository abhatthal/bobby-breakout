import {Inventory} from './Inventory.js';
import {Item} from '../Item.js';
const test = require('unit.js');

describe('Inventory Tests', function() {
  const fakeStage = {};
  const fakePlayer = {};

  it('adds items to inventory', function() {
    let inventory;
    let itemToAdd;

    test
        .given('I have an empty inventory', function() {
          inventory = new Inventory({stage: fakeStage, player: fakePlayer});
        })
        .when('I add item to my inventory', function() {
          itemToAdd = new Item({
            name: 'Bad Student Evaluations',
            // eslint-disable-next-line max-len
            info: 'placeholder',
            type: 'weapon',
            dmg: 15,
            flavourText: 'placeholder',
            icon: '../../assets/bobby.jpg',
          });
          inventory.add(itemToAdd);
        })
        .then('The item should be added to my inventory', function() {
          test.array(inventory.inventory).contains(itemToAdd);
        });
  });
  it('doesnt add item to inventory when full', function() {
    let inventory;
    let itemToAdd;

    test
        .given('I have an full inventory', function() {
          inventory = new Inventory({stage: fakeStage, player: fakePlayer});
          for (const i = 0; i < inventory.inventory_size; ++i) {
            inventory.add(new Item({
              name: 'Bad Student Evaluations',
              // eslint-disable-next-line max-len
              info: 'placeholder',
              type: 'weapon',
              dmg: 15,
              flavourText: 'placeholder',
              icon: '../../assets/bobby.jpg',
            }));
          }
        })
        .when('I add item to my inventory', function() {
          itemToAdd = new Item({
            name: 'Some other item',
            // eslint-disable-next-line max-len
            info: 'placeholder',
            type: 'weapon',
            dmg: 10,
            flavourText: 'placeholder',
            icon: '../../assets/bobby.jpg',
          });
          inventory.add(itemToAdd);
        })
        .then('The item should NOT added to my inventory', function() {
          test.array(inventory.inventory).notContains(itemToAdd);
        });
  });
  it('equips items to inventory', function() {
    let inventory;
    let itemToEquip;

    test
        .given('I have an item in my inventory', function() {
          inventory = new Inventory({stage: fakeStage, player: fakePlayer});
          inventory.add(itemToEquip = new Item({
            name: 'Bad Student Evaluations',
            // eslint-disable-next-line max-len
            info: 'placeholder',
            type: 'weapon',
            dmg: 15,
            flavourText: 'placeholder',
            icon: '../../assets/bobby.jpg',
          }));
          test.array(inventory.inventory).contains(itemToEquip);
        })
        .when('I equip the item in my inventory', function() {
          inventory.equip(itemToEquip);
        })
        .then('The item should NOT be in my inventory and be equipped', function() {
          test.array(inventory.inventory).notContains(itemToAdd);
          test.array(inventory.equipped).contains(itemToEquip);
        });
  });
  it('unequips items to inventory', function() {
    let inventory;
    let itemToEquip;

    test
        .given('I have an equipped item', function() {
          inventory = new Inventory({stage: fakeStage, player: fakePlayer});
          inventory.add(itemToEquip = new Item({
            name: 'Bad Student Evaluations',
            // eslint-disable-next-line max-len
            info: 'placeholder',
            type: 'weapon',
            dmg: 15,
            flavourText: 'placeholder',
            icon: '../../assets/bobby.jpg',
          }));
          test.array(inventory.inventory).contains(itemToEquip);
          inventory.equip(itemToEquip);
          test.array(inventory.inventory).notContains(itemToEquip);
          test.array(inventory.equipped).contains(itemToEquip);
        })
        .when('I unequip the item in my inventory', function() {
          inventory.unequip(itemToEquip);
        })
        .then('The item should NOT be in my inventory and be equipped', function() {
          test.array(inventory.inventory).contains(itemToAdd);
          test.array(inventory.equipped).notContains(itemToEquip);
        });
  });
});
