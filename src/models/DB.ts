import {Sequelize} from "sequelize-typescript";
import {User} from "./table/user.model";
import logger from "../util/logger";
import {DB_URL, USERNAME, PASSWORD} from "../util/secrets";

logger.debug(`connect with ${DB_URL}`);
logger.debug(`username ${USERNAME}`);
logger.debug(`password ${PASSWORD}`);

export const sequelize =  new Sequelize({
    host: DB_URL,
    database: "ebdb",
    dialect: "mysql",
    username: USERNAME,
    password: PASSWORD,
    models: [User]
});

