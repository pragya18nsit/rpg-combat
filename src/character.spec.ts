import { Character } from "./character";

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
