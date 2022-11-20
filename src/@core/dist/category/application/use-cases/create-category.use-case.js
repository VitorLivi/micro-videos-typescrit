"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryUseCase = void 0;
const category_1 = require("../../domain/entities/category");
const category_output_1 = require("../dto/category-output");
var CreateCategoryUseCase;
(function (CreateCategoryUseCase) {
    class UseCase {
        constructor(categoryRepo) {
            this.categoryRepo = categoryRepo;
        }
        async execute(input) {
            const entity = new category_1.Category(input);
            await this.categoryRepo.insert(entity);
            return category_output_1.CategoryOutputMapper.toOutput(entity);
        }
    }
    CreateCategoryUseCase.UseCase = UseCase;
})(CreateCategoryUseCase = exports.CreateCategoryUseCase || (exports.CreateCategoryUseCase = {}));
