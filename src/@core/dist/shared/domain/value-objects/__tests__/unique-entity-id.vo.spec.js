"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_vo_1 = require("../unique-entity-id.vo");
const invalid_uuid_error_1 = require("../../errors/invalid-uuid.error");
const uuid_1 = require("uuid");
function spyValidateMethod() {
    return jest.spyOn(unique_entity_id_vo_1.UniqueEntityId.prototype, "validate");
}
describe("UniqueEntityId Unit Tests", () => {
    it("should throw error when uuid is invalid", () => {
        const validateSpy = spyValidateMethod();
        expect(() => new unique_entity_id_vo_1.UniqueEntityId("invalid-uuid")).toThrow(new invalid_uuid_error_1.InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    });
    it("should accept a uuid passed in constructor", () => {
        const validateSpy = spyValidateMethod();
        const uuid = "81cb5e80-0a6c-4d8f-88be-cd664d973820";
        const valueObject = new unique_entity_id_vo_1.UniqueEntityId(uuid);
        expect(valueObject.value).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });
    it("should generate valid uuid when nothing is passed to constructor", () => {
        const validateSpy = spyValidateMethod();
        const valueObject = new unique_entity_id_vo_1.UniqueEntityId();
        expect((0, uuid_1.validate)(valueObject.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});
