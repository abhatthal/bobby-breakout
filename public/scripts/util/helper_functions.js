/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {Game} from '../Game.js';
// generates random string of length 16
export function genID() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let id = '';
  for (let i = 0; i < 16; i++) {
    id += chars.charAt(Math.round(Math.random() * chars.length));
  }
  return id;
}

export const DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  UP: 'UP',
  DOWN: 'DOWN',
  UNIT_LEFT: -1,
  UNIT_RIGHT: 1,
  UNIT_UP: 1,
  UNIT_DOWN: -1,
};

export async function loadImage(imageUrl) {
  let img;
  const imageLoadPromise = new Promise((resolve) => {
    img = new Image();
    img.onload = resolve;
    img.src = imageUrl;
  });

  await imageLoadPromise;
  return img;
}

export function degreesToRadians(degree) {
  return degree * Math.PI/180;
}

export function radiansToDegrees(radians) {
  return radians * 180/Math.PI;
}

export function httpGet(theUrl) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

export function isPremium() {
  const url = new URL(window.location.href);
  return (url.searchParams.get('premium') === 'true');
}

export var keysHistory = [];
// get an array of the last n keys pressed
export function keysPressed(n) {
  return keysHistory.slice(-n);
}

export function getScene() {
  const game = Game.getInstance();
  return game.current_scene.constructor.name;
}