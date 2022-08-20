import { deepFreeze } from "../object";
describe("object Unity Tests", () => {
  it("should not freeze a scalar value", () => {
    const string = deepFreeze("a");
    expect(typeof string).toBe("string");

    let boolean = deepFreeze(true);
    expect(typeof boolean).toBe("boolean");

    boolean = deepFreeze(false);
    expect(typeof boolean).toBe("boolean");

    const number = deepFreeze(5);
    expect(typeof number).toBe("number");
  });

  it("should be a immutable object", () => {
    const object = deepFreeze({
      prop1: "value1",
      deep: {
        prop2: "value2",
        prop3: new Date(),
      },
    });

    expect(() => {
      (object as any).prop1 = "value1-updated";
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );

    expect(() => {
      (object as any).deep.prop2 = "value1-updated";
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect(object.deep.prop3).toBeInstanceOf(Date);
  });
});
