import "reflect-metadata";
import { DataSource } from "typeorm";
import { Message } from "../models/Message";
import { MenuItem } from "../models/MenuItem";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    synchronize: true,
    entities: [Message, MenuItem],
});
