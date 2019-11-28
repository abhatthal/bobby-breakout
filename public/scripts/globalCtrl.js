import * as AL from './achievements/AchievementsList.js';

// For controls across all scenes
export function achievementsDown(ctx) {
  // For debugging purposes, a key 'x' to add an item (achievement)
  if (ctx.keys[88]) {
    ctx.player.achievements.add(AL.testAchievement);
  }
}

export function inventoryDown(ctx) {
}
