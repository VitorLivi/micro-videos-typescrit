import { Sequelize } from "sequelize-typescript"
import { CategoryModel } from '../category-model';

describe("CategoryModel Unit Tests", () => {
  let sequelize: Sequelize

  beforeAll(() => (
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      models: [CategoryModel]
    })
  ))

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  });

  afterAll(async () => {
    await sequelize.close()
  });

  it('teste', () => {
  })
})