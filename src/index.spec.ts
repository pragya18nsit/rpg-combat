import { Character } from "./character";

describe("characters when created", () => {

  it("should have initial health as 1000", () => {
    const character = new Character(1000);
    expect(character.health).toEqual(1000);
  });
});
