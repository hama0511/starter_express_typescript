"use strict";

import { Response, Request, NextFunction } from "express";
import logger from "../util/logger";
import HttpException from "../exceptions/HttpException";
import {Person} from "../models/table/person.model";
import {PersonSchema} from "../models/schema/PersonSchema";
import {personService} from "../service/person.service";

/*
@route
req.body.person: Person
 */
export const createPerson = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`body is ${JSON.stringify(req.body)}`);

    const person: PersonSchema = req.body.person;

    if (!person) {
        return next(new HttpException(400, "INVALID_PARAM"));
    }

    if(!person.name || !person.password) {
        return next(new HttpException(400, "INVALID_PARAM"));
    }

    const result: Person = await personService.createPerson(person);

    res.send({
        sucess:true,
        person:result
    });
};

