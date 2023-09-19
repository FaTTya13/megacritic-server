require('dotenv').config();
require('reflect-metadata');
const typeorm = require("typeorm");

// const UserSchema = require("./src/entity/UserSchema");
// const PostSchema = require("./src/entity/PostSchema");
// const CategorySchema = require("./src/entity/CategorySchema");
// const UserRoleSchema = require("./src/entity/UserRoleSchema");


const dataSource = new typeorm.DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: false,
    // entities: [UserSchema,PostSchema,CategorySchema,UserRoleSchema],
    entities: [
        require("./src/entity/PostSchema"),
        require("./src/entity/CategorySchema"),
        require("./src/entity/UserSchema"),
        require("./src/entity/UserRoleSchema"),
    ],
})


dataSource
.initialize()
.then( async () => {
    console.log('Connected to Postgres');
})

module.exports = dataSource;