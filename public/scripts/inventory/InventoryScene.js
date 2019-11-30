import {Scene} from '../Scene.js';
import {Inventory} from './Inventory.js';
import {InventoryControls} from './InventoryControls.js';

export class InventoryScene extends Scene {
  constructor(data) {
    super(data);
    this.playerInventory = new Inventory();
    data.player.inventory = this.playerInventory;
    this.layer = this.playerInventory.layer;

    // Assert inventory and equipped is empty
    for (let i = 0; i < this.playerInventory.inventory_num; i++) {
      console.assert(this.playerInventory.inventory_icon[i].name() === 'empty');
    };
    for (let i = 0; i < this.playerInventory.equipped_num; i++) {
      console.assert(this.playerInventory.equipped_icon[i].name() === 'equipped');
    };

    // Tooltip for inventory
    this.tooltips = {};

    this.controls = new InventoryControls({
      layer: this.layer,
      player: data.player,
      container: data.stage.container(),
      map: this.map,
      tooltips: this.tooltips,
    });

    const inventoryMenu = document.getElementById('inventoryMenu');
    const equippedMenu = document.getElementById('equippedMenu');
    let currentShape;

    document.getElementById('dropButton').addEventListener('click', () => {
      this.playerInventory.drop(currentShape);
    });

    document.getElementById('equipButton').addEventListener('click', () => {
      const index = this.playerInventory.inventory_icon.indexOf(currentShape);
      this.playerInventory.equip(this.playerInventory.inventory[index], currentShape);
    });

    document.getElementById('unequipButton').addEventListener('click', () => {
      const index = this.playerInventory.equipped_icon.indexOf(currentShape);
      this.playerInventory.unequip(this.playerInventory.equipped[index], currentShape);
    });

    data.stage.on('contextmenu', function(e) {
      if (e.target.name() === 'filled') {
        currentShape = e.target;
        equippedMenu.style.display = 'none';
        inventoryMenu.style.display = 'initial';
        const containerRect = data.stage.container().getBoundingClientRect();
        inventoryMenu.style.top = containerRect.top + data.stage.getPointerPosition().y + 4 +'px';
        inventoryMenu.style.left = containerRect.left + data.stage.getPointerPosition().x+4 + 'px';
      } else if (e.target.name() === 'equipped') {
        currentShape = e.target;
        inventoryMenu.style.display = 'none';
        equippedMenu.style.display = 'initial';
        const containerRect = data.stage.container().getBoundingClientRect();
        equippedMenu.style.top = containerRect.top + data.stage.getPointerPosition().y + 4 +'px';
        equippedMenu.style.left = containerRect.left + data.stage.getPointerPosition().x + 4 + 'px';
      } else {
        return;
      }
    });

    window.addEventListener('click', () => {
      // hide menu
      inventoryMenu.style.display = 'none';
      equippedMenu.style.display = 'none';
    });
  }

  switchFrom(data) {
    console.assert(data != null);
    this.controls.removeControlBindings();
    this.layer.remove();
  }

  switchTo(data) {
    console.assert(data != null);
    data.stage.add(this.playerInventory.layer);
    this.controls.addControlBindings();
  }
}
