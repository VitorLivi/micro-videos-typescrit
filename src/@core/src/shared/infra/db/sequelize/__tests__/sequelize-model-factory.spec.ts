import { Model, Column, PrimaryKey, DataType, Table } from "sequelize-typescript";
import { SequelizeModelFactory } from "../sequelize.model-factory";
import _chance from "chance";
import { validate as uuidValidate } from "uuid";
import { Sequelize } from "sequelize-typescript";

const chance = _chance();

@Table({})
class StubModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  id: string;

  @Column({allowNull: false, type: DataType.STRING(255)})
  name: string;

  static mockFactory = jest.fn(() => ({
      id: chance.guid({version: 4}),
      name: chance.word()
  }))

  static factory() {
    return new SequelizeModelFactory(StubModel, StubModel.mockFactory)
  }
}

describe('SequelizeModelFactory Unit Tests', () => {
  let sequelize: Sequelize;

  beforeAll(() => (
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      logging: false,
      models: [StubModel]
    })
  ))

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  });

  afterAll(async () => {
    await sequelize.close()
  });

  test('create method', async () => {
    let model = await StubModel.factory().create();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalled();

    let modelFound = await StubModel.findByPk(model.id);
    expect(model.id).toEqual(modelFound?.id);

    model = await StubModel.factory().create({
      id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      name: "test"
    });
    expect(model.id).toBe("9366b7dc-2d71-4799-b91c-c64adb205104");
    expect(model.name).toBe("test");
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
    
    modelFound = await StubModel.findByPk(model.id);
    expect(model.id).toEqual(modelFound?.id);
  });
})
