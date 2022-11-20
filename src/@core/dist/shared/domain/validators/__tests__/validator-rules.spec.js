"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_rules_1 = require("../validator-rules");
const validation_error_1 = require("../../errors/validation-error");
function assertIsInvalid(expected) {
    expect(() => {
        runRule(expected);
    }).toThrow(expected.error);
}
function assertIsValid(expected) {
    expect(() => {
        runRule(expected);
    }).not.toThrow(expected.error);
}
function runRule({ value, property, rule, params = [], }) {
    const validator = validator_rules_1.ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
}
describe("ValidatorRules Unit Tests", () => {
    test("values method", () => {
        const validator = validator_rules_1.ValidatorRules.values("some value", "field");
        expect(validator).toBeInstanceOf(validator_rules_1.ValidatorRules);
        expect(validator["value"]).toBe("some value");
        expect(validator["property"]).toBe("field");
    });
    test("required validation rule", () => {
        let arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "", property: "field" },
        ];
        const error = new validation_error_1.ValidationError("The field is required");
        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: "required",
                error,
            });
        });
        arrange = [
            { value: "test", property: "field" },
            { value: 5, property: "field" },
            { value: 0, property: "field" },
            { value: false, property: "field" },
        ];
        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: "required",
                error,
            });
        });
    });
    test("string validation rule", () => {
        let arrange = [
            { value: 5, property: "field" },
            { value: {}, property: "field" },
            { value: false, property: "field" },
        ];
        const error = new validation_error_1.ValidationError("The field must be a string");
        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: "string",
                error,
            });
        });
        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "test", property: "field" },
        ];
        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: "string",
                error,
            });
        });
    });
    test("maxLength validation rule", () => {
        let arrange = [{ value: "aaaaaa", property: "field" }];
        const error = new validation_error_1.ValidationError("The field must be less or equal than 5 characters");
        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: "maxLength",
                error,
                params: [5],
            });
        });
        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "aaaaa", property: "field" },
        ];
        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: "maxLength",
                error,
                params: [5],
            });
        });
    });
    test("boolean validation rule", () => {
        let arrange = [
            { value: 5, property: "field" },
            { value: "true", property: "field" },
            { value: "false", property: "field" },
        ];
        const error = new validation_error_1.ValidationError("The field must be a boolean");
        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: "boolean",
                error,
            });
        });
        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: false, property: "field" },
            { value: true, property: "field" },
        ];
        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: "boolean",
                error,
                params: [5],
            });
        });
    });
});
