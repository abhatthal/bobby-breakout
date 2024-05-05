// import { stringify } from 'querystring';
// import {Skills} from './Skills.js';
import {Game} from './Game.js';
import {isPremium, getUsername} from './util/helper_functions.js';
import {userStats} from './Stats.js';

// Set premium content visbility
const premiumContainer = document.getElementById('premium_content');
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
userStats.updateStats({userID: getUsername()});

