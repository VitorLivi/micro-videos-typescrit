import { CategoryRepository } from "../../domain/repository/category.repository";
import { UseCase as DefaultUseCase } from "../../../shared/application/use-case";

export namespace DeleteCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.categoryRepository.delete(input.id);
    }
  }
    
  export type Input = {
    id: string;
  };

  export type Output = void;
}

