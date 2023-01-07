import { Category } from "#category/domain";
import { LoadEntityError, UniqueEntityId } from "#shared/domain";
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

  it("should throw a generic error", () => {
    const error = new Error("Generic Error");
    const spyValidate = jest
      .spyOn(Category, "validate")
      .mockImplementation(() => {
        throw error;
      });
    const model = CategoryModel.build({
      id: "9366b7dc-2d71-4799-b91c-c64adb205104",
    });
    expect(() => CategoryModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalled();
    spyValidate.mockRestore();
  });

  it("should convert a category model to a category entity", () => {
    const created_at = new Date();
    const model = CategoryModel.build({
      id: "5490020a-e866-4229-9adc-aa44b83234c4",
      name: "some value",
      description: "some description",
      is_active: true,
      created_at,
    });
    const entity = CategoryModelMapper.toEntity(model);
    expect(entity.toJSON()).toStrictEqual(
      new Category(
        {
          name: "some value",
          description: "some description",
          is_active: true,
          created_at,
        },
        new UniqueEntityId("5490020a-e866-4229-9adc-aa44b83234c4")
      ).toJSON()
    );
  });
});
