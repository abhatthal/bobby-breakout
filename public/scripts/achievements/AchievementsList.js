import {Item} from '../Item.js';

// For debugging purposes - key 'x' to add an item (achievement)
export const testAchievement = new Item({
  name: 'Ya Nerd',
  info: 'ha *dabs*',
  color: 'blue',
});

// konamiCode - ↑ ↑ ↓ ↓ ← → ← → B A Enter
export const konamiCode = new Item({
  name: 'Konami Code',
  info: '↑ ↑ ↓ ↓ ← → ← → B A Enter',
})

// lazy - Don't move for 5 minutes (only attainable on Map scene)
export const lazy = new Item({
  name: 'Lazy',
  info: 'Don\'t move for 5 minutes',
})

// babySteps - Finish the tutorial
export const babySteps = new Item({
  name: 'Baby Steps',
  info: 'Finish the tutorial',
})

// warrior - First fight with an NPC
export const warrior = new Item({
  name: 'Warrior',
  info: 'First fight with an NPC',
})

// Marathoner - Walk 500 steps
export const marathoner = new Item({
  name: 'Marathoner',
  info: 'Walk 500 steps',
})