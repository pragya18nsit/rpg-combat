import { Character } from "./character";
import * as assert from "assert";

describe("characters when created", () => {
  const character = new Character(1000, 1);

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
    const character = new Character(1000, 1);
    const health = character.damage(100);
    expect(health).toEqual(900);
    expect(character.health).toEqual(900);
  });

  it('if damage received exceeds current Health, Health becomes 0 and the character dies', () => {
    const character = new Character(1000, 1);
    const health = character.damage(1100);
    expect(health).toEqual(0);
    expect(character.alive).toEqual(false);
  });

});

describe("characters when healed", () => {
  it("should not heal dead characters", () =>{
    const character = new Character(1000, 1);
    character.damage(1100);
    character.heal(1100);
    expect(character.alive).toEqual(false);
  });

  it("should not exceed health of 1000", () =>{
    const character = new Character(1000, 1);
    character.damage(500);
    character.heal(3000);
    expect(character.health).toEqual(1000);
  });

});