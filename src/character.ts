export class Character {
  public health: number;
  public level: number;
  public alive: boolean;


  constructor(health: number, level: number) {
    this.health = health;
    this.level = level;
    this.alive = true;
  }
}
