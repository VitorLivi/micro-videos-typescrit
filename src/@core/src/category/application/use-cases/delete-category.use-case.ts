import { CategoryRepository } from "../../domain/repository/category.repository";
import UseCase from "../../../shared/application/use-case";

export class DeleteCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    await this.categoryRepository.delete(input.id);
  }
}
  

export default DeleteCategoryUseCase;

export type Input = {
  id: string;
};

export type Output = void;
