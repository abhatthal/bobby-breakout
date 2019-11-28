import {Item} from '../Item.js';

// For debugging purposes, a key 'x' to add an item (achievement)
export const testAchievement = new Item({
  name: 'Ya Nerd',
  info: 'ha *dabs*',
  color: 'blue',
});

// konamiCode - up up down down left right left right b a enter
export const konamiCode = new Item({
  name: 'Konami Code',
  info: '↑ ↑ ↓ ↓ ← → ← → B A Enter',
})