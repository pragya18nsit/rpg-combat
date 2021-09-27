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

  isDamagedBy(attacker: Character = null, damage: number) : number {
    if(attacker !== this) {
      if(this.maxAttackRange === 20 && attacker.maxAttackRange === 2  )
        return this.health;
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

  private getAttackRange(fighterType: string){
    if(fighterType === "Melee"){
      return 2;
    }
    else if(fighterType === "Ranged"){
      return 20;
    }
  }
}
