import {MovingNPC, WeakNPC, StrongNPC, MiniBossNPC, BossNPC} from './NPC.js';
// import {Environment} from './Environment.js'; // for spawn and end points?
import {CsilCoords} from '../../assets/csil_coords.js';
import {Wall} from './Wall.js';
// import {CsilLabs} from '../../assets/csil_labs.js';

export class MapASB {
  constructor(data) {
    const layer = data.layer;

    const initialDisplacement = {
      x: 1100,
      y: 1100,
    };
    // initialDisplacement.x = 300;
    // initialDisplacement.y = 2200;
    // initialDisplacement.y = 700;

    const weakNpc = new WeakNPC({
      name: 'weak npc',
      x: 20 + initialDisplacement.x,
      y: -40 + initialDisplacement.y,
      width: 60,
      height: 60,
      colour: 'yellow',
      impassible: true,
      hp: 100,
      enableFace: true,
    });
    weakNpc.group.rotate(90);
    const strongNpc = new StrongNPC({
      name: 'strong npc',
      x: 280 + initialDisplacement.x,
      y: -550 + initialDisplacement.y,
      width: 60,
      height: 60,
      colour: 'orange',
      impassible: true,
      hp: 100,
      enableFace: true,
    });
    strongNpc.group.rotate(90);
    const miniBossNpc = new MiniBossNPC({
      name: 'mini boss npc',
      x: 630 + initialDisplacement.x,
      y: -2095 + initialDisplacement.y,
      width: 60,
      height: 60,
      colour: 'magenta',
      impassible: true,
      hp: 100,
      enableFace: true,
    });
    miniBossNpc.group.rotate(270);
    const bossNpc = new BossNPC({
      name: 'boss npc',
      x: 285 + initialDisplacement.x,
      y: -2775 + initialDisplacement.y,
      width: 250,
      height: 250,
      colour: 'red',
      impassible: true,
      hp: 100,
      enableFace: true,
    });
    bossNpc.group.rotate(0);
    const movingNpc = new MovingNPC({
      name: 'moving npc',
      x: -200 + initialDisplacement.x,
      y: -1575 + initialDisplacement.y,
      width: 60,
      height: 60,
      colour: 'cyan',
      impassible: true,
      hp: 100,
      enableFace: true,
    });
    movingNpc.group.rotate(270);
    movingNpc.moveLoop(layer, data.player);
    // npc.isSeeing(player);
    layer.add(weakNpc.render);
    layer.add(strongNpc.render);
    layer.add(miniBossNpc.render);
    layer.add(bossNpc.render);
    layer.add(movingNpc.render);

    this.npcArray = [];
    this.npcArray.push(weakNpc);
    this.npcArray.push(strongNpc);
    this.npcArray.push(miniBossNpc);
    this.npcArray.push(bossNpc);
    this.npcArray.push(movingNpc);

    this.blockArray = [];
    // console.log(this.blockArray)

    // Locked door before boss
    this.lockedWall = new Wall({
      x: 354 + initialDisplacement.x,
      y: -1976 + initialDisplacement.y,
      width: 150,
      height: 15,
      colour: 'orange',
      name: 'lockedwall',
      impassible: true,
    });
    this.blockArray.push(this.lockedWall);

    for (let i = 0; i < CsilCoords.length; i++) {
      const curr = CsilCoords[i];
      // console.log(curr);
      console.assert(curr.points.length % 2 == 0);
      for (let j = 0; j < curr.points.length-2; j+=2) {
        // iterate over every pair of points
        // we should create a rect between each sequential pair of points:
        // eg. if we have points [(0,0), (1,1) (2,1)]
        // we should create a rect between (0,0) and (1,1), and (1,1) and (2,1)
        // Each pair is the at the _center_ of the rectangle we want to draw

        // Center of this rectangle should be at p1 + (p2 - p1)/2
        const p1x = curr.points[j+0];
        const p1y = curr.points[j+1];
        const p2x = curr.points[j+2];
        const p2y = curr.points[j+3];
        const width = 15 + Math.abs(p2x - p1x);
        const height = 15 + Math.abs(p2y - p1y);
        // x,y coordinates for the origin
        // by default the origin is the top left of the rectangle.
        // For these calculations, we should move the x/y values to the top left
        const x = p1x + (p2x - p1x)/2 - width/2;
        const y = p1y + (p2y - p1y)/2 - height/2;

        const currRect = new Wall({
          x: x + initialDisplacement.x,
          y: y + initialDisplacement.y,
          width: width,
          height: height,
          colour: 'black',
          name: curr.name,
          impassible: true,
        });
        this.blockArray.push(currRect);
      }
    }

    for (let i = 0; i < this.blockArray.length; i++) {
      const curr = this.blockArray[i];
      layer.add(curr.render);
    }

    // #region text on map
    // this.textArray = [];
    // for(let i = 0; i < CsilLabs.length; i++){
    //   let curr = CsilLabs[i];
    //   let currText =  new Konva.Text({
    //     x: curr.points[0],
    //     y: curr.points[1],
    //     text: curr.name,
    //     fontSize: 20,
    //     fontFamily: 'Calibri',
    //     fill: 'grey',
    //   });
    //   layer.add(currText);
    //   // this.textArray.push(currText);
    // }
    // #endregion

    this.spawnArray = [];
    // this.spawnArray.push(startPoint);
    // this.spawnArray.push(endPoint);

    this.mapArray = [];
    this.mapArray.push(...this.blockArray);
    this.mapArray.push(...this.spawnArray);
    this.mapArray.push(...this.npcArray);

    layer.draw();
  }
}
