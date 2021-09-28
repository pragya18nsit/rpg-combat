import { Character } from "./character";
import * as assert from "assert";

describe("characters when created", () => {
  const character = new Character(1000, 1, "Melee");

  it("should have initial health as 1000, level as 1 and should be alive", () => {
    expect(character.health).toEqual(1000);
    expect(character.level).toEqual(1);
    expect(character.alive).toEqual(true);
  });
});

describe("characters when damaged", () => {

  const character = new Character(1000, 1, "Melee");
  const attacker =  new Character(1000, 1, "Melee");

  it.each`
    damage          |  expectedHealth         |  isAlive         
    ${100}          |  ${900}                 |  ${true}
    ${1100}         |  ${0}                   |  ${false}  
   
  `(
    `should decrease health or character dies if health becomes 0`,
    async ({ damage, expectedHealth, isAlive }) => {
      character.isDamagedBy(attacker, damage);
      expect(character.health).toEqual(expectedHealth);
      expect(character.alive).toEqual(isAlive);
    });
});

describe("characters when healed 1", () => {

  let character, attacker;
  beforeEach(() => {
    character = new Character(1000, 1, "Melee");
    attacker = new Character(1000, 1, "Melee");
  });

  it.each`
    damage          |  healAmount   |  healer              |  expectedHealth    |  isAlive    
    ${1100}         |  ${1100}      |  ${null}             |  ${0}              |  ${false}  
    ${500}          |  ${3000}      |  ${character}        |  ${1000}           |  ${true}    
   
  `(
    `should decrease health or character dies if health becomes 0`,
    async ({ damage, healAmount, healer, expectedHealth, isAlive }) => {

      character.isDamagedBy(attacker, damage);
      character.isHealedBy(healer, healAmount);
      expect(character.alive).toEqual(isAlive);
      expect(character.health).toEqual(expectedHealth);

    });
});
  describe("characters when healed 2", () => {

  it("should not heal dead characters", () =>{
    const character = new Character(1000, 1, "Melee");
    const attacker =  new Character(1000, 1, "Melee");
    character.isDamagedBy(attacker, 1100);
    character.isHealedBy(null, 1100);
    expect(character.alive).toEqual(false);
    expect(character.health).toEqual(0);

  });

  it("should not exceed health of 1000", () =>{
    const character = new Character(1000, 1, "Melee");
    const attacker =  new Character(1000, 1, "Melee");
    character.isDamagedBy(attacker, 500);
    character.isHealedBy(character, 3000);
    expect(character.alive).toEqual(true);
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
    it.each`
    characterFighterType          |  attackerFighterType         |  expectedHealth         
    ${"Ranged"}                   |  ${"Melee"}                  |  ${1000}
    ${"Melee"}                    |  ${"Ranged"}                 |  ${600}  
    ${"Melee"}                    |  ${"Melee"}                  |  ${600}  
    ${"Ranged"}                   |  ${"Ranged"}                 |  ${600}  
  `(
      `fighters should be able to damage to other fighters according to their range type`,
      async ({ characterFighterType, attackerFighterType, expectedHealth }) => {

        const character = new Character(1000, 1, characterFighterType);
        const attacker = new Character(1000, 1, attackerFighterType);
        character.isDamagedBy(attacker, 400);
        expect(character.health).toEqual(expectedHealth);
      });
  });
});