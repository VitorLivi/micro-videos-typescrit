import { Category } from "../../domain/entities/category";
export type CategoryOutput = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
};
export declare class CategoryOutputMapper {
    static toOutput(entity: Category): CategoryOutput;
}
