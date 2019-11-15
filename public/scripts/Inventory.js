export class Inventory {
    constructor() {
        this.equipt = [];
        this.equipt_num = 0;
        this.inventory = [];
        this.inventory_filled = 0;
        this.inventory_size = 16;

        this.layer = new Konva.Layer();
        this.layer.draw();
    }

    add(item) {
        this.inventory.push(item);
    }

    drop(item) {
        var index = this.inventory.indexOf(item);
        if (index > -1) {
            this.inventory.splice(index, 1);
        }
    }

    equipt(item) {
        this.equipt.push(item);
        this.drop(item);
    }

    unequipt(item) {
        var index = this.equipt.indexOf(item);
        if (index > -1) {
            this.equipt.splice(index, 1);
        }
        this.inventory.push(item);
    }
}