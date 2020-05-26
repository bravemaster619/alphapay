import { expect } from "chai";
import { getRandomString } from "../..//helper/helper";

describe("getRandomString", () => {
  it("should return string", () => {
    const random = getRandomString();
    expect(random).to.be.a("string");
    expect(random).to.be.not.empty;
  });
});