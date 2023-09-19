const typeorm = require("typeorm");
const Post = require("../model/Post");
const UserRole = require("../model/UserRole");
const User = require("../model/User");

const UserSchema = new typeorm.EntitySchema({
    name: "User",
    tableName: "users",
    target: User,
    columns: {
        id: {
            primary: true,
            type: "varchar",
        },
        username: {
            type: "varchar"
        },
        email: {
            type: "varchar"
        },
        password: {
            type: "varchar"
        },
        registryDate: {
            type: "varchar"
        },
        lastLoginDate: {
            type: "varchar",
            default: ""
        },
        role: {
            type: "varchar",
            default: "user"
        },
    },
    relations: {
        posts: {
            target: "Post",
            type: "one-to-many",
            joinTable: true,
            cascade: true
        },
        userRoles: {
            target: "UserRole",
            type: "one-to-many",
            joinTable: true,
            cascade: true
        }
    }
});

module.exports = UserSchema;