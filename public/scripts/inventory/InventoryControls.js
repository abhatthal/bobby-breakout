import {Controls} from '../util/Controls.js';
import {Game} from '../Game.js';
import {Item} from '../Item.js';

export class InventoryControls extends Controls {
  constructor(data) {
    super(data);
    this.tooltips = data.tooltips;
  }

  addControlBindings() {
    const self = this;
    this.keys = [];

    this.handleKeyUpMethod = this.handleKeyUpMethod || function(event) {
      self.handleKeyUp(event);
    };
    this.handleKeyDownMethod = this.handleKeyDownMethod || function(event) {
      self.handleKeyDown(event);
    };

    this.container.addEventListener('keyup', this.handleKeyUpMethod);
    this.container.addEventListener('keydown', this.handleKeyDownMethod);
  }

  removeControlBindings() {
    const self = this;
    this.keys = [];

    this.handleKeyUpMethod = this.handleKeyUpMethod || function(event) {
      self.handleKeyUp(event);
    };
    this.handleKeyDownMethod = this.handleKeyDownMethod || function(event) {
      self.handleKeyDown(event);
    };

    this.container.removeEventListener('keyup', this.handleKeyUpMethod);
    this.container.removeEventListener('keydown', this.handleKeyDownMethod);
  }

  handleKeyUp(event) {
    this.keys[event.keyCode] = false;
  };

  handleKeyDown(event) {
    this.keys[event.keyCode] = true;

    // For debugging purposes, add items
    if (this.keys[90]) {
      const item = new Item({
        name: 'Plastic Sword',
        info: 'This is the mighty plastic sword that Bobby picked up from the ground in front of his office.',
        type: 'weapon',
        dmg: 15,
        flavourText: 'It can\'t even cut paper...',
        icon: '../../assets/sword.png',
      });
      this.player.inventory.add(item);
    }
    if (this.keys[88]) {
      const item = new Item({
        name: 'Positive Student Evaluations',
        info: 'Nothing\'s better than the sweet sweet ecstacy of reading through your saved stash of your student\'s compliment.',
        type: 'heal',
        heal: 10,
        effect: 'ego boost',
        flavourText: '8/8 would r8 again',
        icon: '../../assets/document.png',
      });
      this.player.inventory.add(item);
    }
    if (this.keys[67]) {
      const item = new Item({
        name: 'Dad Joke',
        info: 'Dad jokes are great to lighten the mood... I think...',
        type: 'weapon',
        dmg: 5,
        flavourText: 'GROANS',
        icon: '../../assets/glasses-with-mustache.png',
      });
      this.player.inventory.add(item);
    }
    if (this.keys[86]) {
      const item = new Item({
        name: 'Coffee',
        info: 'You hate some students, but you love your job. It really be like that sometimes. Have a cup of coffee to soothe the pain of the daily grind.',
        type: 'heal',
        heal: 5,
        effect: 'morale',
        flavourText: 'Venti, half-whole milk, one quarter 1%, one quarter non-fat, extra hot, split quad shots, 1 1/2 shots decaf, 2 1/2 shots regular, no foam latte, with whip, 2 packets of splenda, 1 sugar in the raw, a touch of vanilla syrup and 3 short sprinkles of cinnamon. And stat.',
        icon: '../../assets/coffee.png',
      });
      this.player.inventory.add(item);
    }
    // i for inventory menu exit
    if (this.keys[73]) {
      const game = Game.getInstance();
      game.switchToMap();
    }
  }
}
