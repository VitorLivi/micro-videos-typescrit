import { Category } from "#category/domain";
import {NotFoundError, UniqueEntityId} from "#shared/domain";
import { Sequelize } from "sequelize-typescript"
import { CategoryModel } from "../category-model";
import { CategorySequelizeRepository } from "../category-repository";

describe("CategorySequelizeRepository", () => {
  let sequelize: Sequelize
  let repository: CategorySequelizeRepository

  beforeAll(() => (
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      logging: false,
      models: [CategoryModel]
    })
  ))

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel)
    await sequelize.sync({ force: true })
  });

  afterAll(async () => {
    await sequelize.close()
  });

  it("should inserts a new entity", async () => {
    let category = new Category({ name: "Movie" })

    await repository.insert(category)
    let model = await CategoryModel.findByPk(category.id)
    expect(model.toJSON()).toStrictEqual(category.toJSON())

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false
    })

    await repository.insert(category)
    model = await CategoryModel.findByPk(category.id)
    expect(model.toJSON()).toStrictEqual(category.toJSON())
  })

  it("should throws error when entity not found", async () => {
    await expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError("Entity with id fake id not found")
    )

    await expect(repository.findById(new UniqueEntityId("3c81b600-e040-4fc4-b90d-de4910e52b86"))).rejects.toThrow(new NotFoundError("Entity with id 3c81b600-e040-4fc4-b90d-de4910e52b86 not found"))
  })

  it("should find an entity by id", async () => {
    const entity = new Category({name: "Movie"});
    await repository.insert(entity);

    let foundEntity = await repository.findById(entity.id);
    expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());

    foundEntity = await repository.findById(entity.uniqueEntityId);
    expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());
  });

  it("should return all categories", async () => {
    const entity = new Category({name: "Movie"});
    await repository.insert(entity);
    const foundEntities = await repository.findAll();
    expect(foundEntities).toHaveLength(1);
    expect(JSON.stringify(foundEntities)).toBe(JSON.stringify([entity]));
  });

  it("search", async () => {
    await CategoryModel.factory().create()
  });

});
