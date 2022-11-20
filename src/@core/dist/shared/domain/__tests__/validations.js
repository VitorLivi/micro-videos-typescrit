"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("expect");
expect_1.default.extend({
    containsErrorMessages(expected, received) {
        if (typeof expected === "function") {
            try {
                expected();
                return isValid();
            }
            catch (e) {
                const error = e;
                return assertContainsErrorsMessages(error.error, received);
            }
        }
        else {
            const { validator, data } = expected;
            const validated = validator.validate(data);
            if (validated) {
                return isValid();
            }
            return assertContainsErrorsMessages(validator.errors, received);
        }
    },
});
function isValid() {
    return { pass: true, message: () => "" };
}
function assertContainsErrorsMessages(expected, received) {
    const isMatch = expect_1.default.objectContaining(received).asymmetricMatch(expected);
    return isMatch
        ? { pass: true, message: () => "" }
        : {
            pass: false,
            message: () => `The validation errors not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(expected)}`,
        };
}
