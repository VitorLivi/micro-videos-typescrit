"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_in_memory_repository_1 = require("../../../infra/repository/category-in-memory.repository");
const list_categories_use_case_1 = require("../list-categories.use-case");
const category_repository_1 = require("../../../domain/repository/category.repository");
const category_1 = require("../../../domain/entities/category");
describe('ListCategoriesUseCase', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.CategoryInMemoryRepository();
        useCase = new list_categories_use_case_1.ListCategoriesUseCase.UseCase(repository);
    });
    test('toOutput method', () => {
        let result = new category_repository_1.CategoryRepository.SearchResult({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null
        });
        let output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1
        });
        const category = new category_1.Category({ name: 'movie' });
        result = new category_repository_1.CategoryRepository.SearchResult({
            items: [category],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null
        });
        output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [category.toJSON()],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1
        });
    });
    it('should returns output using empty input with categories ordered by created_at', async () => {
        const items = [
            new category_1.Category({ name: 'test 1' }),
            new category_1.Category({ name: 'test 2', created_at: new Date(new Date().getTime() + 100) }),
        ];
        repository.items = items;
        const output = await useCase.execute({});
        expect(output).toStrictEqual({
            items: [...items].reverse().map(i => i.toJSON()),
            total: 2,
            current_page: 1,
            per_page: 15,
            last_page: 1
        });
    });
    it('should returns output using pagination, sort and filter', async () => {
        const items = [
            new category_1.Category({ name: 'a' }),
            new category_1.Category({ name: 'AAA' }),
            new category_1.Category({ name: 'AaA' }),
            new category_1.Category({ name: 'b' }),
            new category_1.Category({ name: 'c' }),
        ];
        repository.items = items;
        let output = await useCase.execute({ page: 1, per_page: 2, sort: 'name', filter: 'a' });
        expect(output).toStrictEqual({
            items: [items[1].toJSON(), items[2].toJSON()],
            total: 3,
            current_page: 1,
            per_page: 2,
            last_page: 2
        });
        output = await useCase.execute({ page: 2, per_page: 2, sort: 'name', filter: 'a' });
        expect(output).toStrictEqual({
            items: [items[0].toJSON()],
            total: 3,
            current_page: 2,
            per_page: 2,
            last_page: 2
        });
        output = await useCase.execute({ page: 1, per_page: 2, sort: 'name', sort_dir: 'desc', filter: 'a' });
        expect(output).toStrictEqual({
            items: [items[0].toJSON(), items[2].toJSON()],
            total: 3,
            current_page: 1,
            per_page: 2,
            last_page: 2
        });
    });
});
