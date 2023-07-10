/** import graphql king method */
const {Kind} = require("graphql");

/**
 * Parses an object value from a value node.
 * @param valueNode - The value node to parse.
 * @returns {Object} - The parsed object.
 */
function parseObject(valueNode) {
    /** Create an empty object using null as the prototype */
    const value = Object.create(null);

    /** Iterate over each field in the value node */
    valueNode.fields.forEach(field => {
        /** Assign the parsed value of the field to the corresponding property in the object */
        value[field.name.value] = parseValueNode(field.value);
    });

    /** Return the parsed object */
    return value;
}

/**
 * Parses a value node and returns the corresponding value.
 * @param valueNode - The value node to parse.
 * @returns {*} - The parsed value.
 */
function parseValueNode(valueNode) {
    /** Switch over value node kind */
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            /** If the value node is a string or boolean, return the value as is */
            return valueNode.value;
        case Kind.INT:
        case Kind.FLOAT:
            /** If the value node is an integer or float, convert the value to a number and return it */
            return Number(valueNode.value);
        case Kind.OBJECT:
            /** If the value node is an object, parse the object and return it */
            return parseObject(valueNode.value);
        case Kind.LIST:
            /** If the value node is a list, parse each value in the list and return the array of parsed values */
            return valueNode.values.map(parseValueNode);
        default:
            /** For any other kind of value node, return null */
            return null;
    }
}

/**
 * Parses a literal value node and returns the corresponding value.
 * @param valueNode - The literal value node to parse.
 * @returns {*} - The parsed value.
 */
function parseLiteral(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
            /**
             * If the value node is a string, check if it starts with "{".
             * If it does, parse the value as JSON. Otherwise, return the value as is.
             */
            return valueNode.value.charAt(0) === '{' ? JSON.parse(valueNode.value) : valueNode.value;
        case Kind.INT:
        case Kind.FLOAT:
            /** If the value node is an integer or float, convert the value to a number and return it */
            return Number(valueNode.value);
        case Kind.OBJECT:
            /**
             * Handle parsing an object value node here
             * ...
             * Add the necessary code to parse the object value node
             * ...
             */
            break;
        /** Return null ass default value */
        default:
            return null;
    }
}

/**
 * Converts a value to an object if it is of object type or a JSON string.
 * @param {*} value - The value to convert.
 * @returns {object|null} - The converted object, or null if conversion is not possible.
 */
function toObject(value) {
    if (typeof value === 'object') {
        /** If the value is already an object, return it as is */
        return value;
    }
    if (typeof value === "string" && value.charAt(0) === "{") {
        /** If the value is a string and starts with '{', parse it as JSON and return the parsed object */
        return JSON.parse(value);
    }
    /** Return null if the value is not an object or a JSON string */
    return null;
}

module.exports = {
    parseObject,
    parseValueNode,
    parseLiteral,
    toObject,
}