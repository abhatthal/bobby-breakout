import { BoundingBox } from './BoundingBox.js'
import { genID, loadImage } from './helper_functions.js'

export class Entity{
  constructor(data){
    this.width = data.width;
    this.height = data.height;
    this.x = data.x;
    this.y = data.y;
    this.id = genID();

    if (data.image) {
      var imageObj;
      var promise = loadImage(data.image)
      promise.then(function(result) {
        console.log(result)
        imageObj = result;
      }) 			
    };
    this.group = new Konva.Group({
      x: this.x,
      y: this.y,
      id: this.id,
      draggable: true
    });
    this.shape = new Konva.Rect({
      width: data.width,
      height: data.height,
      fill: (data.colour) ? data.colour : null,
      fillPatternImage: (data.image) ? imageObj : null,
      name: data.name
    });
    
    this.bbox = new BoundingBox(this.group, this.shape, true);
    this.bboxArea = this.bbox.boundingBox;
    
    this.group.add(this.shape);
    this.group.add(this.bboxArea);
  } //end constructor
   
  isColliding(obj){
    return !(obj.x > this.x + this.width ||
         obj.x + obj.width < this.x ||
         obj.y > this.y + this.height ||
         obj.y + obj.height < this.y);
  }
  
  get render(){
    return this.group;
  }
  
  get x(){
    return this._x;
  }
  
  get y(){
    return this._y;
  }
  
  get width(){
    return this._width;
  }
  
  get height(){
    return this._height;
  }
  
  get bboxArea(){
    return this._bboxArea;
  }
  
  set x(val){
    this._x = val;
  }
  
  set y(val){
    this._y = val;
  }
  
  set height(height){
    this._height = height;
  }
  
  set width(width){
    this._width = width;
  }
  
  set bboxArea(area){
    this._bboxArea = area;
  }
}