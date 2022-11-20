"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategoryUseCase = void 0;
const category_output_1 = require("../dto/category-output");
var GetCategoryUseCase;
(function (GetCategoryUseCase) {
    class UseCase {
        constructor(categoryRepo) {
            this.categoryRepo = categoryRepo;
        }
        async execute(input) {
            const entity = await this.categoryRepo.findById(input.id);
            return category_output_1.CategoryOutputMapper.toOutput(entity);
        }
    }
    GetCategoryUseCase.UseCase = UseCase;
})(GetCategoryUseCase = exports.GetCategoryUseCase || (exports.GetCategoryUseCase = {}));
