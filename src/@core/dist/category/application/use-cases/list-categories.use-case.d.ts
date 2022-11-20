import { PaginationOutputDto } from "../../../shared/application/dto/pagination-output";
import { SearchInputDto } from "../../../shared/application/dto/search-input";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output";
import { UseCase as DefaultUseCase } from "../../../shared/application/use-case";
export declare namespace ListCategoriesUseCase {
    class UseCase implements DefaultUseCase<Input, Output> {
        private categoryRepo;
        constructor(categoryRepo: CategoryRepository.Repository);
        execute(input: Input): Promise<Output>;
        private toOutput;
    }
    type Input = SearchInputDto;
    type Output = PaginationOutputDto<CategoryOutput>;
}
