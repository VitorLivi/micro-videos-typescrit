import { CategoryRepository } from "../../domain/repository/category.repository";
import { UseCase as DefaultUseCase } from "../../../shared/application/use-case";
export declare namespace DeleteCategoryUseCase {
    class UseCase implements DefaultUseCase<Input, Output> {
        private categoryRepository;
        constructor(categoryRepository: CategoryRepository.Repository);
        execute(input: Input): Promise<Output>;
    }
    type Input = {
        id: string;
    };
    type Output = void;
}
