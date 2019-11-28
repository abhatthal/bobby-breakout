// import { stringify } from 'querystring';
// import {Skills} from './Skills.js';
import {Game} from './Game.js';
import {isPremium} from './util/helper_functions.js';

// TESTING USER STATS
import {Stats} from './Stats.js';
const userStats = new Stats({
  userID: 12,
});
// TESTING USER STATS

// Set premium content visbility
const premiumContainer = document.getElementById('premium_content');
const url = new URL(window.location.href);
const username = url.searchParams.get('username');
// const isPremium = url.searchParams.get('premium');

if (isPremium() === 'true') {
  premiumContainer.style.display = 'block';
}
// END premium content visbility

// Skills
/*
player.skillA1 = new Skills({
  description: 'aa',
  damage: -5,
});
*/

// Start up our game manager
Game.initialize();
const game = Game.getInstance();
game.start();
userStats.updateStats({userID: username, walkedSteps: 100});
