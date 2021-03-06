import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import logger from "../util/logger";

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";

    logger.error(message);
    console.log(error.stack);

    //TODO log url / data

    response
        .status(status)
        .send({
            status,
            message,
        });
}

export default errorMiddleware;
