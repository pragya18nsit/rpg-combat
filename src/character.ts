export class Character {
  public health: number;
  public level: number;
  public alive: boolean;
  public maxAttackRange: number;

  constructor(health: number, level: number, fighterType: string) {
    this.health = health;
    this.level = level;
    this.alive = true;

    this.maxAttackRange = this.getAttackRange(fighterType);
  }

  isDamagedBy(attacker: Character = null, damage: number)  {
    if(attacker === this)
      return;
    if(this.maxAttackRange === 20 && attacker.maxAttackRange === 2  )
      return;
    const damageAmount = this.getDamageAmount(attacker, damage);
    if(damageAmount > this.health){
      this.health = 0;
      this.alive = false;
      return;
    }
    this.health = this.health - damageAmount;
  }

  isHealedBy(healer: Character = null, heal: number) {
    if (healer === this && this.alive) {
      this.health = this.health + heal > 1000 ? 1000 : this.health + heal
    }
  }

  private getDamageAmount(attacker: Character, damage: number) {
    if (this.level - attacker.level >= 5) {
      return damage / 2;
    } else if (attacker.level - this.level >= 5) {
      return  damage + (damage / 2);
    }
    return damage;
  }

  private getAttackRange(fighterType: string){
    return fighterRanges[fighterType];
  }
}

enum fighterRanges {
  Melee = 2,
  Ranged = 20
}