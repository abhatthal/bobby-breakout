import {Game} from './Game.js';
import {Inventory} from './inventory/Inventory.js';

// TESTING USER STATS
import {Stats} from './Stats.js';
const userStats = new Stats({
  userID: 12,
});
userStats.updateStats({walkedSteps: 5});
// TESTING USER STATS


// Set premium content visbility
const premiumContainer = document.getElementById('premium_content');
const url = new URL(window.location.href);
const isPremium = url.searchParams.get('premium');

if (isPremium === 'true') {
  premiumContainer.style.display = 'block';
}
// END premium content visbility

// Start up our game manager
Game.initialize();
const game = Game.getInstance();
const playerInventory = new Inventory();
game.start();
const inventoryMenu = document.getElementById('inventoryMenu');
const equippedMenu = document.getElementById('equippedMenu');
let currentShape;

document.getElementById('dropButton').addEventListener('click', () => {
  playerInventory.drop(currentShape);
});

document.getElementById('equipButton').addEventListener('click', () => {
  const index = playerInventory.inventory_icon.indexOf(currentShape);
  playerInventory.equip(playerInventory.inventory[index], currentShape);
});

document.getElementById('unequipButton').addEventListener('click', () => {
  const index = playerInventory.equipped_icon.indexOf(currentShape);
  playerInventory.unequip(playerInventory.equipped[index], currentShape);
});

stage.on('contextmenu', function(e) {
  e.evt.preventDefault();
  if (e.target.name() === 'filled') {
    currentShape = e.target;
    equippedMenu.style.display = 'none';
    inventoryMenu.style.display = 'initial';
    const containerRect = stage.container().getBoundingClientRect();
    inventoryMenu.style.top = containerRect.top + stage.getPointerPosition().y + 4 +'px';
    inventoryMenu.style.left = containerRect.left + stage.getPointerPosition().x + 4 + 'px';
  } else if (e.target.name() === 'equipped') {
    currentShape = e.target;
    inventoryMenu.style.display = 'none';
    equippedMenu.style.display = 'initial';
    const containerRect = stage.container().getBoundingClientRect();
    equippedMenu.style.top = containerRect.top + stage.getPointerPosition().y + 4 +'px';
    equippedMenu.style.left = containerRect.left + stage.getPointerPosition().x + 4 + 'px';
  } else {
    return;
  }
});

window.addEventListener('click', () => {
  // hide menu
  inventoryMenu.style.display = 'none';
  equippedMenu.style.display = 'none';
});