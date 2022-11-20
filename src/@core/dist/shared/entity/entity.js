"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const unique_entity_id_vo_1 = require("../domain/value-objects/unique-entity-id.vo");
class Entity {
    constructor(props, id) {
        this.props = props;
        this.uniqueEntityId = id || new unique_entity_id_vo_1.UniqueEntityId();
    }
    get id() {
        return this.uniqueEntityId.value;
    }
    toJSON() {
        return {
            id: this.id,
            ...this.props,
        };
    }
}
exports.Entity = Entity;
