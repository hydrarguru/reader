import { Sequelize } from "sequelize";
import { Community, Post, User } from "./schema";

export const client = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

