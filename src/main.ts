import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import path from "path";

// Controllers (route handlers)
import * as userController from "./controllers/user.controller";
import errorMiddleware from "./middleware/error.middleware";
import {NextFunction} from "express";
import {Request, Response} from "express";
import {checkAuth} from "./middleware/auth/validate.auth";

// Create Express server
const main = express();

// Express configuration
main.set("port", process.env.PORT || 3000);
main.set("views", path.join(__dirname, "../views"));
main.set("view engine", "pug");
main.use(compression());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: true }));
main.use(lusca.xframe("SAMEORIGIN"));
main.use(lusca.xssProtection(true));
main.use((req, res, next) => {
    next();
});

function _(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
}

/**
 * routes.
 */
main.post("/user/sign-up", _(userController.signUp));
main.post("/user/get-token", _(userController.getToken));
main.post("/user/refresh-token", _(userController.tokenRefresh));
main.get("/user", checkAuth, _(userController.getUser));

/**
 * error handler.
 */
main.use(errorMiddleware);

export default main;
