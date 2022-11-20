import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output";
import { UseCase as DefaultUseCase } from "../../../shared/application/use-case";
export declare namespace UpdateCategoryUseCase {
    class UseCase implements DefaultUseCase<Input, Output> {
        private categoryRepo;
        constructor(categoryRepo: CategoryRepository.Repository);
        execute(input: Input): Promise<Output>;
    }
    type Input = {
        id: string;
        name: string;
        description?: string;
        is_active?: boolean;
    };
    type Output = CategoryOutput;
}
