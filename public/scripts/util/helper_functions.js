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

export function isColliding(obj1, obj2) {
  console.assert(obj1 != null);
  console.assert(obj2 != null);
  return !(obj1.x - obj1.offsetX > obj2.x - obj2.offsetX + obj2.width ||
       obj1.x - obj1.offsetX + obj1.width < obj2.x - obj2.offsetX ||
       obj1.y - obj1.offsetY > obj2.y - obj2.offsetY + obj2.height ||
       obj1.y - obj1.offsetY + obj1.height - obj2.offsetY < obj2.y);
}

export const DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  UP: 'UP',
  DOWN: 'DOWN',
  UNIT_LEFT: -1,
  UNIT_RIGHT: 1,
  UNIT_UP: -1, // up should be -1 since origin is top-left
  UNIT_DOWN: 1, // down should be +1 since origin is top-left
};

export function oppositeDirection(dir) {
  let oppDir;
  if (dir === DIRECTION.RIGHT) {
    oppDir = DIRECTION.LEFT;
  } else if (dir === DIRECTION.LEFT) {
    oppDir = DIRECTION.RIGHT;
  } else if (dir === DIRECTION.UP) {
    oppDir = DIRECTION.DOWN;
  } else if (dir === DIRECTION.DOWN) {
    oppDir = DIRECTION.UP;
  }
  return oppDir;
}

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

export function getUsername() {
  const url = new URL(window.location.href);
  return url.searchParams.get('username');
}

export const keysHistory = [];
// get an array of the last n keys pressed
export function keysPressed(n) {
  return keysHistory.slice(-n);
}

export function getScene() {
  const game = Game.getInstance();
  return game.current_scene.constructor.name;
}
