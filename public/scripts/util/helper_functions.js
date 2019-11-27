/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
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
  return !(obj1.x > obj2.x + obj2.width ||
       obj1.x + obj1.width < obj2.x ||
       obj1.y > obj2.y + obj2.height ||
       obj1.y + obj1.height < obj2.y);
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
