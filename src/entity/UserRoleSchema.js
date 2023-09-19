const typeorm = require("typeorm");
const User = require("../model/User");
const UserRole = require("../model/UserRole");

const UserRoleSchema = new typeorm.EntitySchema({
    name: "UserRole",
    tableName: "userRoles",
    target: UserRole,
    columns: {
        role: {
            primary: true,
            type: "varchar",
            default: "user"
        }
    },
    relations: {
        users: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true
        }
    }
});

module.exports = UserRoleSchema;