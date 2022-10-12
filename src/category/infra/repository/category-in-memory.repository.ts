import { SortDirection } from "shared/domain/repository/repository-contracts";
import { InMemorySearchableRepository } from "../../../shared/domain/repository/in-memory.repository";
import { Category } from "../../domain/entities/category";
import CategoryRepository from "../../domain/repository/category.repository";

export default class CategoryInMemoryRepository
extends InMemorySearchableRepository<Category>
implements CategoryRepository.Repository {
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<Category[]> {
    if (!sort) {
      return super.applySort(items, "created_at", "desc");
    }

    return super.applySort(items, sort, sort_dir);
  }
} 
