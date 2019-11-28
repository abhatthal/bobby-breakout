import * as AL from './achievements/AchievementsList.js';
import * as IL from './inventory/InventoryList.js';

// For controls across all scenes
export function achievementsDown(ctx) {
  // For debugging purposes, a key 'x' to add an item (achievement)
  if (ctx.keys[88]) {
    ctx.player.achievements.add(AL.testAchievement);
  }
}

export function inventoryDown(ctx) {
  // For debugging purposes, a key 'z' to add an item
  if (ctx.keys[90]) {
    ctx.player.inventory.add(IL.testItem);
  }
}
