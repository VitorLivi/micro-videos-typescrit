import { Category } from "#category/domain";
import { LoadEntityError } from "#shared/domain";
import { Sequelize } from "sequelize-typescript";
import { CategoryModelMapper } from "../category-mapper";
import { CategoryModel } from "../category-model";

describe('CategoryModelMapper Unit Tests', () => {
  let sequelize: Sequelize

  beforeAll(() => (
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      logging: false,
      models: [CategoryModel]
    })
  ))

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  });

  afterAll(async () => {
    await sequelize.close()
  });

  it ('should throws error when category is invalid', () => {
    const model = CategoryModel.build({id: "3c81b600-e040-4fc4-b90d-de4910e52b86"});
    try {
      CategoryModelMapper.toEntity(model);
      fail('The category is valid, but it needs throws a LoadEntityError');
    } catch (error) {
      expect(error).toBeInstanceOf(LoadEntityError);
      expect(error.error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ],
      });
    }
  });

  it ('should throw a generic error', () => {
    const error = new Error('Generic Error');
    const spyValidate = jest.spyOn(Category, 'validate')
    .mockImplementation(() => {
      throw error;
    });

    const model = CategoryModel.build({id: "3c81b600-e040-4fc4-b90d-de4910e52b86"});
    expect(() => CategoryModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toBeCalled();
  });
});
