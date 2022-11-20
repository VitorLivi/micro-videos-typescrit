import { SortDirection } from "#shared/domain/repository/repository-contracts";
import { InMemorySearchableRepository } from "#shared/domain/repository/in-memory.repository";
import { Category } from "#category/domain/entities/category";
import { CategoryRepository } from "#category/domain/repository/category.repository";
export declare class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository.Repository {
    sortableFields: string[];
    protected applyFilter(items: Category[], filter: CategoryRepository.Filter): Promise<Category[]>;
    protected applySort(items: Category[], sort: string | null, sort_dir: SortDirection | null): Promise<Category[]>;
}
