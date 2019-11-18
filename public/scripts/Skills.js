// Note: skill hit is consider opposite logic.
// Player attack --> npc.skillA1.hpChange(-5);
class Skill {
  constructor(data) {
    this.description = data.description;
    this.damage = data.damage;
  }

  get description() {
    return this._description;
  }
  set description(val) {
    this._description = val;
  }
  // use for get hit and self healing
  hpChange(obj, val) {
    obj.hp += val;
  }
}
