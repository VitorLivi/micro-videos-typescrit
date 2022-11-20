"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryUseCase = void 0;
const category_output_1 = require("../dto/category-output");
var UpdateCategoryUseCase;
(function (UpdateCategoryUseCase) {
    class UseCase {
        constructor(categoryRepo) {
            this.categoryRepo = categoryRepo;
        }
        async execute(input) {
            const entity = await this.categoryRepo.findById(input.id);
            entity.update(input.name, input.description);
            if (input.is_active === true) {
                entity.activate();
            }
            if (input.is_active === false) {
                entity.deactivate();
            }
            await this.categoryRepo.update(entity);
            return category_output_1.CategoryOutputMapper.toOutput(entity);
        }
    }
    UpdateCategoryUseCase.UseCase = UseCase;
})(UpdateCategoryUseCase = exports.UpdateCategoryUseCase || (exports.UpdateCategoryUseCase = {}));
