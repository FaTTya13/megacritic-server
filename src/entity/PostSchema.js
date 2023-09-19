const typeorm = require("typeorm");
const Post = require("../model/Post");
const Category = require("../model/Category");
const User = require("../model/User");

const PostSchema = new typeorm.EntitySchema({
    name: "Post",
    tableName: "posts",
    target: Post,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        text: {
            type: "text"
        },
        title: {
            type: "varchar"
        }
    },
    relations: {
        categories: {
            target: "Category",
            type: "many-to-one",
            joinTable: true,
            cascade: true
        },
        users: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true
        }
    }
});

module.exports = PostSchema;