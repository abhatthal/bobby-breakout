import {Game} from './Game.js';

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
game.start();
