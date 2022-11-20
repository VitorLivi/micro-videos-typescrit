import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output";
import { UseCase as DefaultUseCase } from "#shared/application/use-case";
export declare namespace GetCategoryUseCase {
    class UseCase implements DefaultUseCase<Input, Output> {
        private categoryRepo;
        constructor(categoryRepo: CategoryRepository.Repository);
        execute(input: Input): Promise<Output>;
    }
    type Input = {
        id: string;
    };
    type Output = CategoryOutput;
}
