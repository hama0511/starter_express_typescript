import errorHandler from "errorhandler";

import main from "./main";
import {sequelize} from "./models/DB";
import "source-map-support/register";
import passport from "passport";
import "./middleware/auth/local-signup";
import "./middleware/auth/local-signin";

main.use(passport.initialize());
/**
 * Error Handler. Provides full stack - remove for production
 */
main.use(errorHandler());

/**
 * Start Express server.
 */
(async () => {
    await main.listen(main.get("port"));

    await sequelize.sync({force: true});
})();