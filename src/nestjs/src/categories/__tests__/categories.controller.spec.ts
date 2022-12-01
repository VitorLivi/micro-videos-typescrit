import { CreateCategoryUseCase, GetCategoryUseCase, ListCategoriesUseCase, UpdateCategoryUseCase } from '@fc/micro-videos/category/application';
import { SortDirection } from '@fc/micro-videos/shared/domain';
import { CategoriesController } from '../categories.controller';
import { CreateCategoryDto } from '../dto/create-category.dto';
import {UpdateCategoryDto} from '../dto/update-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController()
  });

  it('should creates a category', async () => {
    const expectedOutput: CreateCategoryUseCase.Output = {
      id: "81cb5e80-0a6c-4d8f-88be-cd664d973820",
      name: "Movie",
      description: "Some description",
      is_active: true,
      created_at: new Date()
    }

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
    }

    controller['createUseCase'] = mockCreateUseCase as any;
    const input: CreateCategoryDto = {
      name: "Movie",
      description: "Some description",
      is_active: true
    }
    const output = await controller.create(input);
    expect(mockCreateUseCase.execute).toBeCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should updates a category', async () => {
    const id = "81cb5e80-0a6c-4d8f-88be-cd664d973820";
    const expectedOutput: UpdateCategoryUseCase.Output = {
      id,
      name: "Movie",
      description: "Some description",
      is_active: true,
      created_at: new Date()
    }

    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
    }

    controller['updateUseCase'] = mockUpdateUseCase as any;
    const input: UpdateCategoryDto = {
      name: "Movie",
      description: "Some description",
      is_active: true
    }
    const output = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toBeCalledWith({id, ...input});
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should deletes a category', async () => {
    const expectedOutput = undefined
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
    }
    controller['deleteUseCase'] = mockDeleteUseCase as any;
    const id = "81cb5e80-0a6c-4d8f-88be-cd664d973820";
    const output = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toBeCalledWith({id});
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should gets a category', async () => {
    const id = "81cb5e80-0a6c-4d8f-88be-cd664d973820";
    const expectedOutput: GetCategoryUseCase.Output = {
      id,
      name: "Movie",
      description: "Some description",
      is_active: true,
      created_at: new Date()
    }

    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
    }

    controller['getUseCase'] = mockGetUseCase as any;
    const output = await controller.findOne(id);
    expect(mockGetUseCase.execute).toBeCalledWith({id});
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should list categories', async () => {
    const expectedOutput: ListCategoriesUseCase.Output = {
      items: [
        {
          id: '9366b7dc-2d71-4799-b91c-c64adb205104',
          name: 'Movie',
          description: 'some description',
          is_active: true,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    controller['listUseCase'] = mockListUseCase as any;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test',
    };
    const output = await controller.search(searchParams);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(expectedOutput).toEqual(output);
  });
});
