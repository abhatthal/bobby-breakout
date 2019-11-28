import * as AL from './achievements/AchievementsList.js';
import * as IL from './inventory/InventoryList.js';
import {keysPressed} from './util/helper_functions.js';

// For controls across all scenes
export function achievementsDown(ctx) {
  // For debugging purposes, a key 'x' to add an item (achievement)
  if (ctx.keys[88]) {
    ctx.player.achievements.add(AL.testAchievement);
  }

  // konamiCode - up up down down left right left right b a enter
  if (ctx.keys[13]) {
    const konami = [38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
    if (JSON.stringify(keysPressed(10)) === JSON.stringify(konami)) {
      ctx.player.achievements.add(AL.konamiCode);
    }
  }
}

export function inventoryDown(ctx) {
  // For debugging purposes, a key 'z' to add an item
  if (ctx.keys[90]) {
    ctx.player.inventory.add(IL.testItem);
  }
}
