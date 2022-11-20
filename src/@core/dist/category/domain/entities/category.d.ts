import { UniqueEntityId } from "../../../shared/domain/value-objects/unique-entity-id.vo";
import { Entity } from "../../../shared/entity/entity";
export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
};
export declare class Category extends Entity<CategoryProperties> {
    readonly props: CategoryProperties;
    constructor(props: CategoryProperties, id?: UniqueEntityId);
    update(name: string, description: string): void;
    static validate(props: CategoryProperties): void;
    activate(): void;
    deactivate(): void;
    get name(): string;
    get description(): string;
    private set description(value);
    get is_active(): boolean;
    private set is_active(value);
    private set name(value);
    get created_at(): Date;
}
