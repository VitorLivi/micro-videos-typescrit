"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_fields_1 = require("../class-validator-fields");
const libClassValidator = require("class-validator");
class StubClassValidatorFields extends class_validator_fields_1.ClassValidatorFields {
}
describe('ClassValidatorFields Unit Tests', () => {
    it('should initialize erros and validated data variables with null', () => {
        const validator = new StubClassValidatorFields();
        expect(validator.errors).toBeNull();
        expect(validator.validatedData).toBeNull();
    });
    it('should validate with erros', () => {
        const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
        spyValidateSync.mockReturnValue([
            { property: 'field',
                constraints: {
                    isRequired: 'The field is required'
                }
            }
        ]);
        const validator = new StubClassValidatorFields();
        expect(validator.validate(null)).toBeFalsy();
        expect(spyValidateSync).toBeCalled();
        expect(validator.validatedData).toBeNull();
        expect(validator.errors).toStrictEqual({
            field: ['The field is required']
        });
    });
    it('should validate without erros', () => {
        const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
        spyValidateSync.mockReturnValue([]);
        const validator = new StubClassValidatorFields();
        expect(validator.validate({ field: 'value' })).toBeTruthy();
        expect(spyValidateSync).toBeCalled();
        expect(validator.validatedData).toStrictEqual({ field: 'value' });
        expect(validator.errors).toBeNull();
    });
});
