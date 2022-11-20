
import { PaginationOutputMapper } from '../../../shared/application/dto/pagination-output';
import { PaginationOutputDto } from "../../../shared/application/dto/pagination-output";
import { SearchInputDto } from "../../../shared/application/dto/search-input";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutputMapper } from "../dto/category-output";
import { CategoryOutput } from "../dto/category-output";
import { UseCase as DefaultUseCase }from "../../../shared/application/use-case";

export namespace ListCategoriesUseCase {
  export class UseCase implements DefaultUseCase<Input, Output>{
    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new CategoryRepository.SearchParams(input);
      const searchResult = await this.categoryRepo.search(params);

      return this.toOutput(searchResult)
    }

    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
      return {
        items: searchResult.items.map((category) => CategoryOutputMapper.toOutput(category)),
        ...PaginationOutputMapper.toOutput(searchResult)
      }
    }
  }

  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<CategoryOutput>;
}

