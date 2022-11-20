"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFreeze = void 0;
function deepFreeze(object) {
    const propertyNames = Object.getOwnPropertyNames(object);
    for (const name of propertyNames) {
        const value = object[name];
        if (value && typeof value === "object") {
            deepFreeze(value);
        }
    }
    return Object.freeze(object);
}
exports.deepFreeze = deepFreeze;
