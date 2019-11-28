import {WallLine} from './WallLine.js';
import {NPC} from './Character.js';
import {Environment} from './Environment.js'; // for spawn and end points?

export class MapASB {
  constructor(data) {
    const layer = data.layer;
    const stage = data.stage;
    const pathItem = {'name': 'washroom-men',
    'area': 3504.55126953125,
    'points': [4437.999920356164-4000,
     4548.103221692632-4000,
     4437.999920356164-4000,
     4760.2879335327325-4000,
     3897.2498953026175-4000,
     4760.2879335327325-4000,
     3897.2498953026175-4000,
     4432.02277050792-4000,
     4338.296266571071-4000,
     4432.02277050792-4000],
    'centroid': [594.233369904518, 657.197497566684]}

    const tasc = [{'name': 'tasc-barrier',
    'area': 0.00684174522758,
    'points': [5004.485569138999,
     7302.0227705079205,
     5406.416840196498,
     7302.0227705079205],
    'centroid': [null, null]},
   {'name': 'tasc-right',
    'area': -0.00230627576821,
    'points': [5406.416840196498,
     7022.358022205331,
     5406.416840196498,
     7302.0227705079205],
    'centroid': [null, null]},
   {'name': 'tasc-left',
    'area': 0.00365301547572,
    'points': [5004.485569138999,
     7026.68956526628,
     5004.485569138999,
     7302.0227705079205],
    'centroid': [null, null]}]

    const displacement = {
      x: (stage.width()/2 - 30),
      y: (stage.height()/2 - 30),
    }

    /*
    TEMP: 
    - turn points -> single array of points [x1, y1, x2, y2, x3, y3] 
    - not array of pairs, for now to test have points1 = to that
    
    TODO: 
    - map too small, scale all coords by a factor of like 4? or maybe 5? quickly do it in python then rexport?
    - make new bounding box class that returns a bounding box for each line rather than the whole line obj as a whole
    - probably for loop the new line bounding box class to create it for the whole thing
    */

    const wall1 = new WallLine({
      x: displacement.x,
      y: displacement.y,
      points: pathItem.points,
      colour: 'black',
      width: 10,
      height: 0,
      name: pathItem.name,
      impassible: true,
    });
    layer.add(wall1.render);
    


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
    this.blockArray.push(wall1);
    // console.log(this.blockArray)

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
