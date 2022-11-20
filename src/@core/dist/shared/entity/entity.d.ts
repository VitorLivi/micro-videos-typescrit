import { UniqueEntityId } from "../domain/value-objects/unique-entity-id.vo";
export declare abstract class Entity<Props = any> {
    readonly props: Props;
    readonly uniqueEntityId: UniqueEntityId;
    constructor(props: Props, id?: UniqueEntityId);
    get id(): string;
    toJSON(): Required<{
        id: string;
    } & Props>;
}
