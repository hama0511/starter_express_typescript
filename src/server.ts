import errorHandler from "errorhandler";

import main from "./main";
import {sequelize} from "./models/DB";
import "source-map-support/register";

/**
 * Error Handler. Provides full stack - remove for production
 */
main.use(errorHandler());

/**
 * Start Express server.
 */
(async () => {
    await main.listen(main.get("port"));

    await sequelize.sync({force: false});
})();