import {Item} from '../item/Item.js';

// For debugging purposes - key 'x' to add an item (achievement)
export const testAchievement = new Item({
  name: 'Ya Nerd',
  info: 'ha *dabs*',
  color: 'blue',
  type: 'achievement',
});

// konamiCode - ↑ ↑ ↓ ↓ ← → ← → B A Enter
export const konamiCode = new Item({
  name: 'Konami Code',
  info: '↑ ↑ ↓ ↓ ← → ← → B A Enter',
  type: 'achievement',
});

// lazy - Don't move for 5 minutes (only attainable on Map scene)
export const lazy = new Item({
  name: 'Lazy',
  info: 'Don\'t move for 5 minutes',
  type: 'achievement',
});

// babySteps - Finish the tutorial
export const babySteps = new Item({
  name: 'Baby Steps',
  info: 'Finish the tutorial',
  type: 'achievement',
});

// warrior - First fight with an NPC
export const warrior = new Item({
  name: 'Warrior',
  info: 'First fight with an NPC',
  type: 'achievement',
});

// Marathoner - Walk 500 steps
export const marathoner = new Item({
  name: 'Marathoner',
  info: 'Walk 500 steps',
  type: 'achievement',
});
