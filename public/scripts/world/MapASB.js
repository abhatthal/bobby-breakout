import {NPC} from './Character.js';
// import {Environment} from './Environment.js'; // for spawn and end points?
import {CsilCoords} from '../../assets/csil_coords.js';
import {Wall} from './Wall.js';
// import {CsilLabs} from '../../assets/csil_labs.js';

export class MapASB {
  constructor(data) {
    const layer = data.layer;

    const npc = new NPC({
      x: 400,
      y: 50,
      width: 60,
      height: 60,
      colour: 'yellow',
      impassible: true,
      hp: 100,
      enableFace: true,
    });
    // npc.isSeeing(player);
    layer.add(npc.render);

    this.npcArray = [];
    this.npcArray.push(npc);

    this.blockArray = [];
    // console.log(this.blockArray)

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
          x: x + 700,
          y: y + 500,
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
