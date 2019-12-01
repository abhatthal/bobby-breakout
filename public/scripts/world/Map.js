import {Wall} from './Wall.js';
import {NPC} from './NPC.js';
import {Environment} from './Environment.js';

export class Map {
  constructor(data) {
    const layer = data.layer;
    const stage = data.stage;

    const startPoint = new Environment({
      x: 0,
      y: stage.height() - 120,
      width: 120,
      height: 120,
      colour: 'green',
      name: 'start',
    });
    layer.add(startPoint.render);

    const endPoint = new Environment({
      x: stage.width() - 120,
      y: 0,
      width: 120,
      height: 120,
      colour: 'red',
      name: 'end',
    });
    layer.add(endPoint.render);

    // const block = new Wall({
    //   x: stage.width() / 2 - 70,
    //   y: stage.height() / 2,
    //   width: 300,
    //   height: 30,
    //   colour: 'orange',
    //   name: 'wall',
    // });
    // layer.add(block.render);

    const block2 = new Wall({
      x: stage.width() / 2,
      y: stage.height() - 150,
      width: 20,
      height: 150,
      colour: 'blue',
      name: 'wall',
      impassible: true,
    });
    layer.add(block2.render);

    // borders for stage
    const stageTop = new Wall({
      x: 0,
      y: 0,
      width: stage.width(),
      height: 0,
      colour: 'green',
      name: 'wall',
    });
    layer.add(stageTop.render);

    const stageBottom = new Wall({
      x: 0,
      y: stage.height(),
      width: stage.width(),
      height: 0,
      colour: 'green',
      name: 'wall',
    });
    layer.add(stageBottom.render);

    const stageLeft = new Wall({
      x: 0,
      y: 0,
      width: 0,
      height: stage.height(),
      colour: 'green',
      name: 'wall',
    });
    layer.add(stageLeft.render);

    const stageRight = new Wall({
      x: stage.width(),
      y: 0,
      width: 0,
      height: stage.height(),
      colour: 'green',
      name: 'wall',
    });
    layer.add(stageRight.render);

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
    // this.blockArray.push(block);
    this.blockArray.push(block2);
    this.blockArray.push(stageTop);
    this.blockArray.push(stageBottom);
    this.blockArray.push(stageLeft);
    this.blockArray.push(stageRight);
    // console.log(blockArray);

    this.spawnArray = [];
    this.spawnArray.push(startPoint);
    this.spawnArray.push(endPoint);

    this.mapArray = [];
    this.mapArray.push(...this.blockArray);
    this.mapArray.push(...this.spawnArray);
    this.mapArray.push(...this.npcArray);

    layer.draw();
  }
}
