"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("../object");
describe("object Unity Tests", () => {
    it("should not freeze a scalar value", () => {
        const string = (0, object_1.deepFreeze)("a");
        expect(typeof string).toBe("string");
        let boolean = (0, object_1.deepFreeze)(true);
        expect(typeof boolean).toBe("boolean");
        boolean = (0, object_1.deepFreeze)(false);
        expect(typeof boolean).toBe("boolean");
        const number = (0, object_1.deepFreeze)(5);
        expect(typeof number).toBe("number");
    });
    it("should be a immutable object", () => {
        const object = (0, object_1.deepFreeze)({
            prop1: "value1",
            deep: {
                prop2: "value2",
                prop3: new Date(),
            },
        });
        expect(() => {
            object.prop1 = "value1-updated";
        }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");
        expect(() => {
            object.deep.prop2 = "value1-updated";
        }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");
        expect(object.deep.prop3).toBeInstanceOf(Date);
    });
});
