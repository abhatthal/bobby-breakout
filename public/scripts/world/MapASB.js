import {WallLine} from './WallLine.js';
import {NPC} from './Character.js';
import {Environment} from './Environment.js'; // for spawn and end points?
import {csil_coords} from '../../assets/csil_coords.js';
import {csil_labs} from '../../assets/csil_labs.js';

export class MapASB {
  constructor(data) {
    const layer = data.layer;
    const stage = data.stage;

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

    // const wall1 = new WallLine({
    //   x: displacement.x,
    //   y: displacement.y,
    //   points: pathItem.points,
    //   colour: 'black',
    //   width: 10,
    //   height: 0,
    //   name: pathItem.name,
    //   impassible: true,
    // });
    // layer.add(wall1.render);

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

    for(let i = 0; i < csil_coords.length; i++){
      let curr = csil_coords[i];
      // console.log(curr);
      let currLine = new WallLine({
        x: displacement.x,
        y: displacement.y,
        points: curr.points,
        colour: 'black',
        width: 10,
        height: 0,
        name: curr.name,
        impassible: true,
      });
      this.blockArray.push(currLine);
    }

    for(let i = 0; i < this.blockArray.length; i++){
      let curr = this.blockArray[i];
      layer.add(curr.render);
    }

    // #region text on map
    // this.textArray = [];
    // for(let i = 0; i < csil_labs.length; i++){
    //   let curr = csil_labs[i];
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
