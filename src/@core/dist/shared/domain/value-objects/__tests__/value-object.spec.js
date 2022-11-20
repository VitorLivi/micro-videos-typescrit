"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const value_object_1 = require("../value-object");
class Stub extends value_object_1.ValueObject {
}
describe("ValueObject Unit Tests", () => {
    it("should set value", () => {
        let valueObject = new Stub("string value");
        expect(valueObject.value).toBe("string value");
        valueObject = new Stub({
            prop1: "value1",
        });
        expect(valueObject.value).toStrictEqual({
            prop1: "value1",
        });
    });
    it("should convert value to a string", () => {
        const date = new Date();
        const arrange = [
            { received: "", expected: "" },
            { received: "string value", expected: "string value" },
            { received: 0, expected: "0" },
            { received: -1, expected: "-1" },
            { received: 5, expected: "5" },
            { received: true, expected: "true" },
            { received: false, expected: "false" },
            { received: date, expected: date.toString() },
            {
                received: { prop1: "value1" },
                expected: JSON.stringify({ prop1: "value1" }),
            },
        ];
        arrange.forEach((element) => {
            const valueObject = new Stub(element.received);
            expect(valueObject.toString()).toBe(element.expected);
        });
    });
    it("should be a immutable object", () => {
        const object = {
            prop1: "value1",
            deep: {
                prop2: "value2",
                prop3: new Date(),
            },
        };
        const valueObject = new Stub(object);
        expect(() => {
            valueObject.value.prop1 = "value-updated";
        }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");
        expect(() => {
            valueObject.value.deep.prop2 = "value2-updated";
        }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");
        expect(valueObject.value.deep.prop3).toBeInstanceOf(Date);
    });
});
