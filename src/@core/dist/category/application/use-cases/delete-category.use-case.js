"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryUseCase = void 0;
var DeleteCategoryUseCase;
(function (DeleteCategoryUseCase) {
    class UseCase {
        constructor(categoryRepository) {
            this.categoryRepository = categoryRepository;
        }
        async execute(input) {
            await this.categoryRepository.delete(input.id);
        }
    }
    DeleteCategoryUseCase.UseCase = UseCase;
})(DeleteCategoryUseCase = exports.DeleteCategoryUseCase || (exports.DeleteCategoryUseCase = {}));
