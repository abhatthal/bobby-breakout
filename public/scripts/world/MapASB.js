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
      info: 'ENSC students have some weird projects. Not sure what this is for but it might prove useful.',
      type: 'weapon',
      dmg: 8,
      // eslint-disable-next-line max-len
      flavourText: 'Here lie the remains of an ENSC student\'s hopes and dreams.',
      icon: '../../assets/ensc-project.jpg',
    });
    const item1Box = new ItemBox({
      item: item1,
      x: -300 + initialDisplacement.x,
      y: -600 + initialDisplacement.y,
      width: 50,
      height: 50,
      scaleX: 0.17,
      scaleY: 0.25,
    });
    const item2 = new Item({
      name: 'Sacrificial Coke Zero',
      // eslint-disable-next-line max-len
      info: 'Some say you should sacrifice a coke zero to the CMPT 361 gods before any Shermer exam.',
      type: 'heal',
      heal: 20,
      effect: 'increased average grade from students on exams',
      // eslint-disable-next-line max-len
      flavourText: 'How did this get here? CSSS vending machine is usually out of coke zeros by now...',
      icon: '../../assets/coke-zero.png',
    });
    const item2Box = new ItemBox({
      item: item2,
      x: 800 + initialDisplacement.x,
      y: -450 + initialDisplacement.y,
      width: 50,
      height: 50,
      scaleX: 0.16,
      scaleY: 0.09,
    });
    const item3 = new Item({
      name: 'Old Memes',
      // eslint-disable-next-line max-len
      info: 'Who knew that outdated memes could be so effective in delivering emotional damage to students.',
      type: 'weapon',
      dmg: 18,
      // eslint-disable-next-line max-len
      flavourText: 'Le me just feeling like a sir eating my baguette. *Drops baguette* FUUUUUUUUUU',
      icon: '../../assets/old-meme.png',
    });
    const item3Box = new ItemBox({
      item: item3,
      x: 200 + initialDisplacement.x,
      y: -200 + initialDisplacement.y,
      width: 50,
      height: 50,
    });
    const item4 = new Item({
      name: 'Plastic Poop Knife',
      // eslint-disable-next-line max-len
      info: 'It\'s a poop knife. For cutting poop. With a knife. Obviously.',
      type: 'weapon',
      dmg: 25,
      // eslint-disable-next-line max-len
      flavourText: 'A fecal cleaver? A Dung divider? A guano glaive?',
      icon: '../../assets/knife.png',
    });
    const item4Box = new ItemBox({
      item: item4,
      x: -400 + initialDisplacement.x,
      y: -1000 + initialDisplacement.y,
      width: 50,
      height: 50,
    });
    const bonusItem = new Item({
      name: 'North Korean Missiles',
      // eslint-disable-next-line max-len
      info: 'A technological marvel developed by our glorious leader.',
      type: 'weapon',
      dmg: 1,
      // eslint-disable-next-line max-len
      flavourText: 'You know what\'s more destructive than a nuclear bomb?... Words. - Kimg Jong-Un',
      icon: '../../assets/missile.png',
    });
    const bonusItemBox = new ItemBox({
      item: bonusItem,
      x: 1000 + initialDisplacement.x,
      y: -1300 + initialDisplacement.y,
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
    layer.add(item2Box.render);
    layer.add(item3Box.render);
    layer.add(item4Box.render);
    layer.add(bonusItemBox.render);

    this.npcArray = [];
    this.npcArray.push(weakNpc);
    this.npcArray.push(strongNpc);
    this.npcArray.push(miniBossNpc);
    this.npcArray.push(bossNpc);
    this.npcArray.push(movingNpc);

    this.itemArray = [];
    this.itemArray.push(item1Box);
    this.itemArray.push(item2Box);
    this.itemArray.push(item3Box);
    this.itemArray.push(item4Box);
    this.itemArray.push(bonusItemBox);

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
