import {Item} from '../item/Item.js';

export const plasticSword = new Item({
  name: 'Plastic Sword',
  // eslint-disable-next-line max-len
  info: 'This is the mighty plastic sword that Bobby picked up from the ground in front of his office.',
  type: 'weapon',
  dmg: 15,
  flavourText: 'It can\'t even cut paper...',
  icon: '../../assets/sword.png',
});

export const mightySword = new Item({
  name: 'Mighty Sword',
  // eslint-disable-next-line max-len
  info: 'placeholder hope nobody reads this.',
  type: 'weapon',
  dmg: 20,
  flavourText: 'placeholder hope nobody reads this.',
  icon: '../../assets/sword.png',
});

export const studentEvaluations = new Item({
  name: 'Positive Student Evaluations',
  // eslint-disable-next-line max-len
  info: 'Nothing\'s better than the sweet sweet ecstacy of reading through your saved stash of your student\'s compliment.',
  type: 'heal',
  heal: 25,
  effect: 'ego boost',
  flavourText: '8/8 would r8 again',
  icon: '../../assets/document.png',
});

export const dadJoke = new Item({
  name: 'Dad Joke',
  info: 'Dad jokes are great to lighten the mood... I think...',
  type: 'weapon',
  dmg: 5,
  flavourText: 'GROANS',
  icon: '../../assets/glasses-with-mustache.png',
});

export const coffee = new Item({
  name: 'Coffee',
  // eslint-disable-next-line max-len
  info: 'You hate some students, but you love your job. It really be like that sometimes. Have a cup of coffee to soothe the pain of the daily grind.',
  type: 'heal',
  heal: 15,
  effect: 'morale',
  // eslint-disable-next-line max-len
  flavourText: 'Venti, half-whole milk, one quarter 1%, one quarter non-fat, extra hot, split quad shots, 1 1/2 shots decaf, 2 1/2 shots regular, no foam latte, with whip, 2 packets of splenda, 1 sugar in the raw, a touch of vanilla syrup and 3 short sprinkles of cinnamon. And stat.',
  icon: '../../assets/coffee.png',
});

export const miniBossWeapon = new Item({
  name: 'Mini Boss Item placeholder name',
  // eslint-disable-next-line max-len
  info: 'placeholder hope nobody reads this.',
  type: 'weapon',
  dmg: 20,
  flavourText: 'placeholder hope nobody reads this.',
  icon: '../../assets/sword.png',
});

export const bossWeapon = new Item({
  name: 'Boss Item placeholder name',
  // eslint-disable-next-line max-len
  info: 'placeholder hope nobody reads this.',
  type: 'weapon',
  dmg: 40,
  flavourText: 'placeholder hope nobody reads this.',
  icon: '../../assets/sword.png',
});

export const movingNPCItem = new Item({
  name: 'Moving NPC Item placeholder name',
  // eslint-disable-next-line max-len
  info: 'placeholder hope nobody reads this.',
  type: 'weapon',
  dmg: 15,
  flavourText: 'placeholder hope nobody reads this.',
  icon: '../../assets/sword.png',
});
