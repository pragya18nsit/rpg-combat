export class Character {
  public health: number;
  public level: number;
  public alive: boolean;


  constructor(health: number, level: number) {
    this.health = health;
    this.level = level;
    this.alive = true;
  }

  isDamagedBy(attacker: Character = null, damage: number) : number {
    if(attacker !== this) {
      damage = this.getDamageAmount(attacker, damage);
      if(damage > this.health){
        this.health = 0;
        this.alive = false;
      }
      else {
        this.health = this.health - damage;
      }
    }
    return this.health;
  }

  isHealedBy(healer: Character = null, heal: number): number {
    if(healer === this) {
      if (this.alive) {
        this.health = this.health + heal > 1000 ? 1000 : this.health + heal
      }
    }
    return this.health;
  }

  private getDamageAmount(attacker: Character, damage: number) {
    let damageAmount = damage;
    if (this.level - attacker.level >= 5) {
      damageAmount = damage / 2;
    } else if (attacker.level - this.level >= 5) {
      damageAmount = damage + (damage / 2);
    }
    return damageAmount;
  }
}
