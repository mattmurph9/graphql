/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FieldDefinitionNode } from "graphql";
import getRelationshipMeta from "../../../src/schema/get-relationship-meta";

describe("getRelationshipMeta", () => {
    test("should return undefined if no directive found", () => {
        // @ts-ignore
        const field: FieldDefinitionNode = {
            directives: [
                {
                    // @ts-ignore
                    name: { value: "RANDOM 1" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 2" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 3" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 4" },
                },
            ],
        };

        const result = getRelationshipMeta(field);

        expect(result).toEqual(undefined);
    });

    test("should throw direction required", () => {
        const field: FieldDefinitionNode = {
            directives: [
                {
                    // @ts-ignore
                    name: { value: "relationship", arguments: [] },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 2" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 3" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 4" },
                },
            ],
        };

        try {
            getRelationshipMeta(field);

            throw new Error("I should not throw");
        } catch (error) {
            expect(error.message).toEqual("@relationship direction required");
        }
    });

    test("should throw direction not a string", () => {
        const field: FieldDefinitionNode = {
            directives: [
                {
                    // @ts-ignore
                    name: {
                        value: "relationship",
                    },
                    arguments: [
                        {
                            // @ts-ignore
                            name: { value: "direction" },
                            // @ts-ignore
                            value: { kind: "NOT A STRING!" },
                        },
                    ],
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 2" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 3" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 4" },
                },
            ],
        };

        try {
            getRelationshipMeta(field);

            throw new Error("I should not throw");
        } catch (error) {
            expect(error.message).toEqual("@relationship direction not a string");
        }
    });

    test("should throw direction invalid", () => {
        const field: FieldDefinitionNode = {
            directives: [
                {
                    // @ts-ignore
                    name: {
                        value: "relationship",
                    },
                    arguments: [
                        {
                            // @ts-ignore
                            name: { value: "direction" },
                            // @ts-ignore
                            value: { kind: "StringValue", value: "INVALID!" },
                        },
                    ],
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 2" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 3" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 4" },
                },
            ],
        };

        try {
            getRelationshipMeta(field);

            throw new Error("I should not throw");
        } catch (error) {
            expect(error.message).toEqual("@relationship direction invalid");
        }
    });

    test("should throw type required", () => {
        const field: FieldDefinitionNode = {
            directives: [
                {
                    // @ts-ignore
                    name: {
                        value: "relationship",
                    },
                    arguments: [
                        {
                            // @ts-ignore
                            name: { value: "direction" },
                            // @ts-ignore
                            value: { kind: "StringValue", value: "IN" },
                        },
                    ],
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 2" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 3" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 4" },
                },
            ],
        };

        try {
            getRelationshipMeta(field);

            throw new Error("I should not throw");
        } catch (error) {
            expect(error.message).toEqual("@relationship type required");
        }
    });

    test("should throw type not a string", () => {
        const field: FieldDefinitionNode = {
            directives: [
                {
                    // @ts-ignore
                    name: {
                        value: "relationship",
                    },
                    arguments: [
                        {
                            // @ts-ignore
                            name: { value: "direction" },
                            // @ts-ignore
                            value: { kind: "StringValue", value: "IN" },
                        },
                        {
                            // @ts-ignore
                            name: { value: "type" },
                            // @ts-ignore
                            value: { kind: "INVALID" },
                        },
                    ],
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 2" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 3" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 4" },
                },
            ],
        };

        try {
            getRelationshipMeta(field);

            throw new Error("I should not throw");
        } catch (error) {
            expect(error.message).toEqual("@relationship type not a string");
        }
    });

    test("should return the correct meta", () => {
        const field: FieldDefinitionNode = {
            directives: [
                {
                    // @ts-ignore
                    name: {
                        value: "relationship",
                    },
                    arguments: [
                        {
                            // @ts-ignore
                            name: { value: "direction" },
                            // @ts-ignore
                            value: { kind: "StringValue", value: "IN" },
                        },
                        {
                            // @ts-ignore
                            name: { value: "type" },
                            // @ts-ignore
                            value: { kind: "StringValue", value: "ACTED_IN" },
                        },
                    ],
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 2" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 3" },
                },
                {
                    // @ts-ignore
                    name: { value: "RANDOM 4" },
                },
            ],
        };

        const result = getRelationshipMeta(field);

        expect(result).toMatchObject({
            type: "ACTED_IN",
            direction: "IN",
        });
    });
});