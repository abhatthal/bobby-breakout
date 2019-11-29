import {WallLine} from './WallLine.js';
import {NPC} from './Character.js';
// import {Environment} from './Environment.js'; // for spawn and end points?
import {CsilCoords} from '../../assets/csil_coords.js';
// import {CsilLabs} from '../../assets/csil_labs.js';

export class MapASB {
  constructor(data) {
    const layer = data.layer;
    const stage = data.stage;

    const displacement = {
      x: (stage.width()/2 - 30),
      y: (stage.height()/2 - 30),
      // x: -665,
      // y: -3170,
    };

    /*
    ISSUE:
    -bounding boxes not triggering actual collision since only a signle instance of WallLine is made
    -WallLine points all clustered around displacement value
    -should convert WallLine class to make new lines based on array of points passed in
    -rn its just drawing the cluster of points
    -can do similar method like in LineBoundingBox to split the array of data into pairs
    -set the Line's x,y = (x1,y1)? each Line is an (x1,y1) (x2,y2)
    */

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
      const currLine = new WallLine({
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
