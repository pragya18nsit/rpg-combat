export class Character {
  public health: number;
  public level: number;
  public alive: boolean;


  constructor(health: number, level: number) {
    this.health = health;
    this.level = level;
    this.alive = true;
  }

  damage(damageAmount: number) : number {
    if(damageAmount > this.health){
      this.health = 0;
      this.alive = false;
    }
    else {
      this.health = this.health - damageAmount;
    }
    return this.health;
  }

  heal(healAmount: number): number {
    if(this.alive)
    {
      this.health =  this.health + healAmount > 1000 ? 1000 :  this.health + healAmount
    }
    return this.health;
  }
}
