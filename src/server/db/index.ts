import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
dotenv.config();

import { Application } from "../applications/entities";
import { User } from "../users/entities";
import { Vehicle } from "../vehicles/entities";

export const AppDataSource = new DataSource({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    type: "mariadb",
    port: 3306,
    entities: [
        Application,
        User,
        Vehicle
    ],
    synchronize: true,
    logging: false,
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
.then(() => {
    console.log("Database synchronized");
})
.catch((error) => console.log(error));
