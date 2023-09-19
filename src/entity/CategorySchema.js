const typeorm = require("typeorm");
const Category = require("../model/Category");
const Post = require("../model/Post");

const EntitySchema = new typeorm.EntitySchema({
    name: "Category",
    tableName: "categories",
    target: Category,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        }
    },
    relations: {
        posts: {
            target: "Post",
            type: "one-to-many",
            joinTable: true,
            cascade: true
        }
    }
});

module.exports = EntitySchema;