"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_category_use_case_1 = require("../update-category.use-case");
const category_in_memory_repository_1 = require("../../../infra/repository/category-in-memory.repository");
const not_found_error_1 = require("../../../../shared/domain/errors/not-found.error");
const category_1 = require("../../../domain/entities/category");
describe("UpdateCategoryUseCase Unit Tests", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.CategoryInMemoryRepository();
        useCase = new update_category_use_case_1.UpdateCategoryUseCase.UseCase(repository);
    });
    it("should throws error when entity not found", async () => {
        await expect(() => useCase.execute({ id: "fake id", name: "fake" })).rejects.toThrow(new not_found_error_1.NotFoundError(`Entity with id fake id not found`));
    });
    it("should update a category", async () => {
        const spyUpdate = jest.spyOn(repository, "update");
        const entity = new category_1.Category({ name: "Movie" });
        repository.items = [entity];
        let output = await useCase.execute({ id: entity.id, name: "test" });
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: entity.id,
            name: "test",
            description: null,
            is_active: true,
            created_at: entity.created_at,
        });
        const arrange = [
            {
                input: {
                    id: entity.id,
                    name: "test",
                    description: "some description",
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    description: "some description",
                    is_active: true,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    description: null,
                    is_active: true,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                    is_active: false,
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    description: null,
                    is_active: false,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    description: null,
                    is_active: false,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                    is_active: true,
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    description: null,
                    is_active: true,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                    description: "some description",
                    is_active: false,
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    description: "some description",
                    is_active: false,
                    created_at: entity.created_at,
                },
            },
        ];
        for (const i of arrange) {
            output = await useCase.execute({
                id: i.input.id,
                name: i.input.name,
                description: i.input.description,
                is_active: i.input.is_active,
            });
            expect(output).toStrictEqual({
                id: entity.id,
                name: i.expected.name,
                description: i.expected.description,
                is_active: i.expected.is_active,
                created_at: i.expected.created_at,
            });
        }
    });
});
