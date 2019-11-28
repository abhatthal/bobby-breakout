import {Wall} from './Wall.js';
import {LineBoundingBox} from './BoundingBox.js';

export class WallLine extends Wall{
  constructor(data){
    super(data);
    // overwrite: super class's shape, use line instead
    this.shape = new Konva.Line({
      points: data.points,
      stroke: (data.colour) ? data.colour : null,
      strokeWidth: data.width,
      name: data.name,
    });
    // console.log(data.points);
    // console.log(this.impassible);

    // overwrite: new bounding box for the line
    this.bbox = new LineBoundingBox(this.group, data.points, true);
    // this.bboxArea = this.bbox.boundingBox;

    // overwrite: group content
    this.group.add(this.shape);
    // this.group.add(this.bboxArea);
  }
}