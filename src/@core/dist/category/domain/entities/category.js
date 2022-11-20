"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const entity_1 = require("../../../shared/entity/entity");
const validation_error_1 = require("../../../shared/domain/errors/validation-error");
const category_validators_1 = require("../validators/category.validators");
class Category extends entity_1.Entity {
    constructor(props, id) {
        Category.validate(props);
        super(props, id);
        this.props = props;
        this.description = this.props.description;
        this.props.is_active = this.props.is_active ?? true;
        this.props.created_at = this.props.created_at ?? new Date();
    }
    update(name, description) {
        Category.validate({ name, description });
        this.name = name;
        this.description = description;
    }
    static validate(props) {
        const validator = category_validators_1.CategoryValidatorFactory.create();
        const isValid = validator.validate(props);
        if (!isValid) {
            throw new validation_error_1.EntityValidationError(validator.errors);
        }
    }
    activate() {
        this.props.is_active = true;
    }
    deactivate() {
        this.props.is_active = false;
    }
    get name() {
        return this.props.name;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value ?? null;
    }
    get is_active() {
        return this.props.is_active;
    }
    set is_active(value) {
        this.props.is_active = value ?? true;
    }
    set name(value) {
        this.props.name = value;
    }
    get created_at() {
        return this.props.created_at;
    }
}
exports.Category = Category;
