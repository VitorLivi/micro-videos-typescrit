"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_in_memory_repository_1 = require("../../../infra/repository/category-in-memory.repository");
const create_category_use_case_1 = require("../create-category.use-case");
describe('CreateCategoryUseCase', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.CategoryInMemoryRepository();
        useCase = new create_category_use_case_1.CreateCategoryUseCase.UseCase(repository);
    });
    it('should create a category', async () => {
        const spyInsert = jest.spyOn(repository, 'insert');
        let output = await useCase.execute({ name: 'test' });
        expect(output).toStrictEqual({
            id: repository.items.at(0).id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: repository.items.at(0).created_at
        });
        expect(spyInsert).toHaveBeenCalledTimes(1);
        output = await useCase.execute({ name: 'test', description: 'test', is_active: false });
        expect(output).toStrictEqual({
            id: repository.items.at(1).id,
            name: 'test',
            description: 'test',
            is_active: false,
            created_at: repository.items.at(1).created_at
        });
        expect(spyInsert).toHaveBeenCalledTimes(2);
    });
});
