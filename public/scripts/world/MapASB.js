import {MovingNPC, WeakNPC, StrongNPC, MiniBossNPC, BossNPC} from './NPC.js';
// import {Environment} from './Environment.js'; // for spawn and end points?
import {CsilCoords} from '../../assets/csil_coords.js';
import {Wall} from './Wall.js';
import {Item} from '../item/Item.js';
import {ItemBox} from '../item/ItemBox.js';
// import {CsilLabs} from '../../assets/csil_labs.js';

export class MapASB {
  constructor(data) {
    const layer = data.layer;

    const initialDisplacement = {
      x: 1100,
      y: 1200,
    };
    
    const item1 = new Item({
      name: 'Weird ENSC Project',
      // eslint-disable-next-line max-len
      info: 'You hate some students, but you love your job. It really be like that sometimes. Have a cup of coffee to soothe the pain of the daily grind.',
      type: 'heal',
      heal: 5,
      effect: 'morale',
      // eslint-disable-next-line max-len
      flavourText: 'Venti, half-whole milk, one quarter 1%, one quarter non-fat, extra hot, split quad shots, 1 1/2 shots decaf, 2 1/2 shots regular, no foam latte, with whip, 2 packets of splenda, 1 sugar in the raw, a touch of vanilla syrup and 3 short sprinkles of cinnamon. And stat.',
      icon: '../../assets/ensc-project.jpg',
    });
    const item1Box = new ItemBox({
      item: item1,
      x: -300 + initialDisplacement.x,
      y: -600 + initialDisplacement.y,
      width: 50,
      height: 50,
    });
    const item2 = new Item({
      name: 'Coffee',
      // eslint-disable-next-line max-len
      info: 'You hate some students, but you love your job. It really be like that sometimes. Have a cup of coffee to soothe the pain of the daily grind.',
      type: 'heal',
      heal: 5,
      effect: 'morale',
      // eslint-disable-next-line max-len
      flavourText: 'Venti, half-whole milk, one quarter 1%, one quarter non-fat, extra hot, split quad shots, 1 1/2 shots decaf, 2 1/2 shots regular, no foam latte, with whip, 2 packets of splenda, 1 sugar in the raw, a touch of vanilla syrup and 3 short sprinkles of cinnamon. And stat.',
      icon: '../../assets/coffee.png',
    });
    const item3 = new Item({
      name: 'Coffee',
      // eslint-disable-next-line max-len
      info: 'You hate some students, but you love your job. It really be like that sometimes. Have a cup of coffee to soothe the pain of the daily grind.',
      type: 'heal',
      heal: 5,
      effect: 'morale',
      // eslint-disable-next-line max-len
      flavourText: 'Venti, half-whole milk, one quarter 1%, one quarter non-fat, extra hot, split quad shots, 1 1/2 shots decaf, 2 1/2 shots regular, no foam latte, with whip, 2 packets of splenda, 1 sugar in the raw, a touch of vanilla syrup and 3 short sprinkles of cinnamon. And stat.',
      icon: '../../assets/coffee.png',
    });
    const item4 = new Item({
      name: 'Plastic Poop Knife',
      // eslint-disable-next-line max-len
      info: 'You hate some students, but you love your job. It really be like that sometimes. Have a cup of coffee to soothe the pain of the daily grind.',
      type: 'heal',
      heal: 5,
      effect: 'morale',
      // eslint-disable-next-line max-len
      flavourText: 'Venti, half-whole milk, one quarter 1%, one quarter non-fat, extra hot, split quad shots, 1 1/2 shots decaf, 2 1/2 shots regular, no foam latte, with whip, 2 packets of splenda, 1 sugar in the raw, a touch of vanilla syrup and 3 short sprinkles of cinnamon. And stat.',
      icon: '../../assets/knife.png',
    });
    const item4Box = new ItemBox({
      item: item4,
      x: -400 + initialDisplacement.x,
      y: -1000 + initialDisplacement.y,
      width: 50,
      height: 50,
    });
    const weakNpc = new WeakNPC({
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

    layer.add(item1Box.render);
    layer.add(item4Box.render);

    this.npcArray = [];
    this.npcArray.push(weakNpc);
    this.npcArray.push(strongNpc);
    this.npcArray.push(miniBossNpc);
    this.npcArray.push(bossNpc);
    this.npcArray.push(movingNpc);

    this.itemArray = [];
    this.itemArray.push(item1Box);
    this.itemArray.push(item4Box);

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
    this.mapArray.push(...this.itemArray);

    layer.draw();
  }
}
