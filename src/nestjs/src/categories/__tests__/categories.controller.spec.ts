import { CreateCategoryUseCase } from '@fc/micro-videos/category/application';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../categories.controller';
import { CategoriesService } from '../categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';

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
      execute: jest.fn().mockReturnValue(expectedOutput)
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
  it('should updates a category', () => {
  });
  it('should deletes a category', () => {
  });
  it('should gets a category', () => {
  });
  it('should list categories', () => {
  });
});
