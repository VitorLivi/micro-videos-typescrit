import InMemoryRepository from '../in-memory.repository';
import Entity from '../../../entity/entity';
import UniqueEntityId from '../../value-objects/unique-entity-id.vo';

type StubEntityProps = {
  name: string;
  price: number;
}

class StubEntity extends Entity<StubEntityProps> {}
class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository Unit Tests', () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it('should insert an entity', async () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    await repository.insert(entity);

    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it ('should throws error when entity not found', () => {
    expect(repository.findById(
      'invalid-id'
    )).rejects.toThrowError(`Entity with id invalid-id not found`);
    expect(repository.findById(
      new UniqueEntityId('3c81b600-e040-4fc4-b90d-de4910e52b86')
    )).rejects.toThrowError(`Entity with id 3c81b600-e040-4fc4-b90d-de4910e52b86 not found`);
  });

  it ('should find an entity by id', async () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    await repository.insert(entity);

    let foundEntity = await repository.findById(entity.id);
    expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());

    foundEntity = await repository.findById(entity.uniqueEntityId);
    expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should return all entities', async () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    await repository.insert(entity);

    const entities = await repository.findAll();
    expect(entities).toStrictEqual([entity]);
  })

  it ('should thorws error on update when entity not found', () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    expect(repository.update(entity)).rejects.toThrowError(`Entity with id ${entity.id} not found`);
  });

  it('should update an entity', async () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    await repository.insert(entity);

    const updatedEntity = new StubEntity({ name: 'test', price: 20 }, entity.uniqueEntityId);
    await repository.update(updatedEntity);

    const foundEntity = await repository.findById(entity.id);
    expect(foundEntity.toJSON()).toStrictEqual(updatedEntity.toJSON());
  });

  it ('should thorws error on delete when entity not found', () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    expect(repository.delete(entity.id)).rejects.toThrowError(`Entity with id ${entity.id} not found`);
    expect(repository.delete(entity.uniqueEntityId)).rejects.toThrowError(`Entity with id ${entity.uniqueEntityId} not found`);
  });

  it ('should delete an entity', async () => {
    const entity = new StubEntity({ name: 'test', price: 10 });

    await repository.insert(entity);
    await repository.delete(entity.id);
    expect(repository.items).toStrictEqual([]);

    await repository.insert(entity);
    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toStrictEqual([]);
  })
})