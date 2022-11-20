"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../entity");
const unique_entity_id_vo_1 = require("../../domain/value-objects/unique-entity-id.vo");
const uuid_1 = require("uuid");
class StubEntity extends entity_1.Entity {
}
describe("Entity Unit Tests", () => {
    it("should set props and id", () => {
        const arrange = { prop1: "test", prop2: 1 };
        const entity = new StubEntity(arrange);
        expect(entity.props).toStrictEqual(arrange);
        expect(entity.uniqueEntityId).toBeInstanceOf(unique_entity_id_vo_1.UniqueEntityId);
        expect(entity.id).not.toBeNull();
        expect((0, uuid_1.validate)(entity.id)).toBeTruthy();
    });
    it("should accept a valid uuid", () => {
        const arrange = { prop1: "test", prop2: 1 };
        const uniqueEntityId = new unique_entity_id_vo_1.UniqueEntityId();
        const entity = new StubEntity(arrange, uniqueEntityId);
        expect(entity.uniqueEntityId).toBeInstanceOf(unique_entity_id_vo_1.UniqueEntityId);
        expect(entity.id).toBe(uniqueEntityId.value);
    });
    it("should convert a entity to JSON", () => {
        const arrange = { prop1: "test", prop2: 1 };
        const entity = new StubEntity(arrange);
        expect(entity.toJSON()).toStrictEqual({
            id: entity.id,
            ...arrange,
        });
    });
});
