"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("./category");
const lodash_1 = require("lodash");
const unique_entity_id_vo_1 = require("../../../shared/domain/value-objects/unique-entity-id.vo");
describe("Category Unit Tests", () => {
    beforeEach(() => {
        category_1.Category.validate = jest.fn();
    });
    test("constructor of category", () => {
        let category = new category_1.Category({ name: "Movie" });
        let props = (0, lodash_1.omit)(category.props, ["created_at"]);
        expect(category_1.Category.validate).toHaveBeenCalled();
        expect(props).toStrictEqual({
            name: "Movie",
            description: null,
            is_active: true,
        });
        expect(category.props.created_at).toBeInstanceOf(Date);
        let created_at = new Date();
        category = new category_1.Category({
            name: "Movie",
            description: "some description",
            is_active: false,
            created_at,
        });
        expect(category.props).toStrictEqual({
            name: "Movie",
            description: "some description",
            is_active: false,
            created_at,
        });
        category = new category_1.Category({
            name: "Movie",
            description: "other description",
        });
        expect(category.props).toMatchObject({
            name: "Movie",
            description: "other description",
        });
        category = new category_1.Category({
            name: "Movie",
            is_active: true,
        });
        expect(category.props).toMatchObject({
            name: "Movie",
            is_active: true,
        });
        created_at = new Date();
        category = new category_1.Category({
            name: "Movie",
            created_at,
        });
        expect(category.props).toMatchObject({
            name: "Movie",
            created_at,
        });
    });
    test("id field", () => {
        const data = [
            { props: { name: "Movie" } },
            { props: { name: "Movie" }, id: null },
            { props: { name: "Movie" }, id: undefined },
            { props: { name: "Movie" }, id: new unique_entity_id_vo_1.UniqueEntityId() },
        ];
        data.forEach((element) => {
            const category = new category_1.Category(element.props, element.id);
            expect(category.id).not.toBeNull();
            expect(category.uniqueEntityId).toBeInstanceOf(unique_entity_id_vo_1.UniqueEntityId);
        });
    });
    test("getter an setter of name prop", () => {
        const category = new category_1.Category({ name: "Movie" });
        expect(category.name).toBe("Movie");
        category["name"] = "Movie 2";
        expect(category.name).toBe("Movie 2");
    });
    test("getter and setter of description prop", () => {
        let category = new category_1.Category({ name: "Movie" });
        expect(category.description).toBeNull();
        category = new category_1.Category({ name: "Movie", description: "some description" });
        expect(category.description).toBe("some description");
        category = new category_1.Category({ name: "Movie" });
        category["description"] = "other description";
        expect(category.description).toBe("other description");
        category["description"] = undefined;
        expect(category.description).toBeNull();
        category["description"] = null;
        expect(category.description).toBeNull();
    });
    test("getter and setter of is_active prop", () => {
        let category = new category_1.Category({ name: "Movie" });
        expect(category.is_active).toBeTruthy();
        category = new category_1.Category({
            name: "Movie",
            is_active: true,
        });
        expect(category.is_active).toBeTruthy();
        category = new category_1.Category({
            name: "Movie",
            is_active: false,
        });
        expect(category.is_active).toBeFalsy();
    });
    test("getter of created_at prop", () => {
        let category = new category_1.Category({ name: "Movie" });
        expect(category.created_at).toBeInstanceOf(Date);
        let created_at = new Date();
        category = new category_1.Category({
            name: "Movie",
            created_at,
        });
        expect(category.created_at).toBe(created_at);
    });
    test("update method", () => {
        const category = new category_1.Category({ name: "Movie" });
        category.update("Movie 2", "some description");
        expect(category_1.Category.validate).toBeCalledTimes(2);
        expect(category.props).toMatchObject({
            name: "Movie 2",
            description: "some description",
        });
    });
    test("deactivate method", () => {
        const category = new category_1.Category({ name: "Movie" });
        category.deactivate();
        expect(category.is_active).toBeFalsy();
    });
    test("activate method", () => {
        const category = new category_1.Category({ name: "Movie", is_active: false });
        category.activate();
        expect(category.is_active).toBeTruthy();
    });
});
