"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../../domain/entities/category");
const category_in_memory_repository_1 = require("../../../infra/repository/category-in-memory.repository");
const not_found_error_1 = require("../../../../shared/domain/errors/not-found.error");
const delete_category_use_case_1 = require("../delete-category.use-case");
describe("DeleteCategoryUseCase Unit Tests", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.CategoryInMemoryRepository();
        useCase = new delete_category_use_case_1.DeleteCategoryUseCase.UseCase(repository);
    });
    it("should thorws error when entity not found", async () => {
        expect(() => useCase.execute({ id: "fake id" }))
            .rejects.toThrow(new not_found_error_1.NotFoundError("Entity with id fake id not found"));
    });
    it("should delete a category", async () => {
        const items = [new category_1.Category({ name: "test 1" })];
        repository.items = items;
        await useCase.execute({ id: items[0].id });
        expect(repository.items).toHaveLength(0);
    });
});
