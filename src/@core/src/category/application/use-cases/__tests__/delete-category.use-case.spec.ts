import { Category } from "../../../domain/entities/category";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { DeleteCategoryUseCase } from "../delete-category.use-case";
import { CategoryInMemoryRepository } from "#category/infra/db/in-memory";

describe ("DeleteCategoryUseCase Unit Tests", () => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });


  it ("should thorws error when entity not found", async () => {
    expect(() => useCase.execute({ id: "fake id" }))
    .rejects.toThrow(new NotFoundError("Entity with id fake id not found"));
  });


  it ("should delete a category", async () => {
    const items = [new Category({name: "test 1"})];
    repository.items = items;
    await useCase.execute({ id: items[0].id });
    expect(repository.items).toHaveLength(0);
  });
});
