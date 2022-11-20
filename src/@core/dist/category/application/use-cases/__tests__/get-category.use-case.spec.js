"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../../domain/entities/category");
const not_found_error_1 = require("../../../../shared/domain/errors/not-found.error");
const category_in_memory_repository_1 = require("../../../infra/repository/category-in-memory.repository");
const get_category_use_case_1 = require("../get-category.use-case");
describe('GetCategoryUseCase', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.CategoryInMemoryRepository();
        useCase = new get_category_use_case_1.GetCategoryUseCase.UseCase(repository);
    });
    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'invalid_id' }))
            .rejects.toThrow(new not_found_error_1.NotFoundError('Entity with id invalid_id not found'));
    });
    it('should returns a category', async () => {
        const items = [
            new category_1.Category({ name: 'Movie' }),
        ];
        repository.items = items;
        const spyFindById = jest.spyOn(repository, 'findById');
        const output = await useCase.execute({ id: items[0].id });
        expect(spyFindById).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: items.at(0).id,
            name: 'Movie',
            description: null,
            is_active: true,
            created_at: items.at(0).created_at
        });
    });
});
