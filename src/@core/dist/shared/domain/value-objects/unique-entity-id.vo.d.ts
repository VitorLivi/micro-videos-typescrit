import { ValueObject } from "./value-object";
export declare class UniqueEntityId extends ValueObject<string> {
    readonly id?: string;
    constructor(id?: string);
    private validate;
}
