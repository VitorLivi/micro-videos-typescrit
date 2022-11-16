import UniqueEntityId from "../unique-entity-id.vo";
import InvalidUuidError from "../../errors/invalid-uuid.error";
import { validate } from "uuid";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityId Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("invalid-uuid")).toThrow(
      new InvalidUuidError()
    );
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const validateSpy = spyValidateMethod();
    const uuid = "81cb5e80-0a6c-4d8f-88be-cd664d973820";
    const valueObject = new UniqueEntityId(uuid);
    expect(valueObject.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should generate valid uuid when nothing is passed to constructor", () => {
    const validateSpy = spyValidateMethod();
    const valueObject = new UniqueEntityId();
    expect(validate(valueObject.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
