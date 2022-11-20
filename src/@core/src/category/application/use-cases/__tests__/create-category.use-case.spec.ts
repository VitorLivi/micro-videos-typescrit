import { CategoryInMemoryRepository } from '../../../infra/repository/category-in-memory.repository';
import { CreateCategoryUseCase } from '../create-category.use-case';

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase.UseCase(repository);
  });

  it('should create a category', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    let output = await useCase.execute({name: 'test'});
    expect(output).toStrictEqual({
      id: repository.items.at(0).id,
      name: 'test',
      description: null,
      is_active: true,
      created_at: repository.items.at(0).created_at
    });
    expect(spyInsert).toHaveBeenCalledTimes(1);

    output = await useCase.execute({name: 'test', description: 'test', is_active: false});
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
