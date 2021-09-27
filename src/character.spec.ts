import { Character } from "./character";
import * as assert from "assert";

describe("characters when created", () => {
  const character = new Character(1000, 1, "Melee");

  it("should have initial health as 1000", () => {
    expect(character.health).toEqual(1000);
  });

  it("should have initial level as 1", () => {
    expect(character.level).toEqual(1);
  });

  it("should be alive", () => {
    expect(character.alive).toEqual(true);
  });
});

describe("characters when damaged", () => {

  it('should decrease the health', () => {
    const character = new Character(1000, 1, "Melee");
    const attacker =  new Character(1000, 1, "Melee");
    const health = character.isDamagedBy(attacker, 100);
    expect(health).toEqual(900);
    expect(character.health).toEqual(900);
  });

  it('if damage received exceeds current Health, Health becomes 0 and the character dies', () => {
    const character = new Character(1000, 1, "Melee");
    const attacker =  new Character(1000, 1, "Melee");
    const health = character.isDamagedBy(attacker, 1100);
    expect(health).toEqual(0);
    expect(character.alive).toEqual(false);
  });

});

describe("characters when healed", () => {
  it("should not heal dead characters", () =>{
    const character = new Character(1000, 1, "Melee");
    const attacker =  new Character(1000, 1, "Melee");
    character.isDamagedBy(attacker, 1100);
    character.isHealedBy(null, 1100);
    expect(character.alive).toEqual(false);
  });

  it("should not exceed health of 1000", () =>{
    const character = new Character(1000, 1, "Melee");
    const attacker =  new Character(1000, 1, "Melee");
    character.isDamagedBy(attacker, 500);
    character.isHealedBy(character, 3000);
    expect(character.health).toEqual(1000);
  });

});

describe("character", () => {
  it("cannot damage itself", () => {
    const character = new Character(1000, 1, "Melee");
    const attacker = character;
    character.isDamagedBy(attacker, 500);
    expect(character.health).toEqual(1000);
  });

  it("can damage by another character", () => {
    const character = new Character(1000, 1, "Melee");
    const attacker =  new Character(1000, 1, "Melee");
    character.isDamagedBy(attacker, 500);
    expect(character.health).toEqual(500);
  });

  it("can heal if character is same as healer", () => {
    const character = new Character(1000, 1, "Melee");
    const attacker = new Character(1000, 1, "Melee");
    character.isDamagedBy(attacker, 800);

    const healer = character;
    character.isHealedBy(healer, 100);

    expect(character.health).toEqual(300);
  });

  it("can not heal if character is different from healer", () => {
    const character = new Character(1000, 1, "Melee");
    const attacker = new Character(1000, 1, "Melee");
    character.isDamagedBy(attacker, 800);

    const healer = new Character(1000, 1, "Melee");
    character.isHealedBy(healer, 100);

    expect(character.health).toEqual(200);
  });

  it("If the target is 5 or more Levels above the attacker, Damage is reduced by 50%", ()=> {
    const character = new Character(1000, 7, "Melee");
    const attacker = new Character(1000, 1, "Melee");
    character.isDamagedBy(attacker, 800);

    expect(character.health).toEqual(600);

  });

  it("If the target is 5 or more Levels below the attacker, Damage is increased by 50%", () => {
    const character = new Character(1000, 1, "Melee");
    const attacker = new Character(1000, 7, "Melee");
    character.isDamagedBy(attacker, 800);

    expect(character.health).toEqual(0);
    expect(character.alive).toEqual(false);
  });

});

describe("characters have", ()=> {
  it("an attack Max Range", () => {
    const character = new Character(1000, 1, "Melee");
    expect(character.maxAttackRange).not.toBeNaN();
  });

  it("Melee fighters have a range of 2 meters.", () => {
    const character = new Character(1000, 1, "Melee");
    expect(character.maxAttackRange).toEqual(2);
  });

  it("Ranged fighters have a range of 20 meters.", () => {
    const character = new Character(1000, 1, "Ranged");
    expect(character.maxAttackRange).toEqual(20);
  });

  describe("Characters must be in range to deal damage to a target.", () => {
    it("Melee fighters should not be able to deal damage to ranged fighters ", () => {
      const character = new Character(1000, 1, "Ranged");
      const attacker = new Character(1000, 1, "Melee");
      character.isDamagedBy(attacker, 400);
      expect(character.health).toEqual(1000);
    });

    it("Ranged fighters should be able to damage to Melee fighters ", () => {
      const character = new Character(1000, 1, "Melee");
      const attacker = new Character(1000, 1, "Ranged");
      character.isDamagedBy(attacker, 400);
      expect(character.health).toEqual(600);
    });

    it("Melee fighters should be able to damage to Melee fighters ", () => {
      const character = new Character(1000, 1, "Melee");
      const attacker = new Character(1000, 1, "Melee");
      character.isDamagedBy(attacker, 400);
      expect(character.health).toEqual(600);
    });

    it("Ranged fighters should be able to damage to Ranged fighters ", () => {
      const character = new Character(1000, 1, "Ranged");
      const attacker = new Character(1000, 1, "Ranged");
      character.isDamagedBy(attacker, 400);
      expect(character.health).toEqual(600);
    });
  });
});