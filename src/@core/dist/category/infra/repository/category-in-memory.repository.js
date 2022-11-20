"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryInMemoryRepository = void 0;
const in_memory_repository_1 = require("#shared/domain/repository/in-memory.repository");
class CategoryInMemoryRepository extends in_memory_repository_1.InMemorySearchableRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = ["name", "created_at"];
    }
    async applyFilter(items, filter) {
        if (!filter) {
            return items;
        }
        return items.filter((i) => {
            return i.name.toLowerCase().includes(filter.toLowerCase());
        });
    }
    async applySort(items, sort, sort_dir) {
        if (!sort) {
            return super.applySort(items, "created_at", "desc");
        }
        return super.applySort(items, sort, sort_dir);
    }
}
exports.CategoryInMemoryRepository = CategoryInMemoryRepository;
