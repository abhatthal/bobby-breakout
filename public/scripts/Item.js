export class Item {
  constructor(data) {
    this.name = data.name;
    this.info = data.info;
    this.color = (data.color) ? data.color: 'green';
  }
}
