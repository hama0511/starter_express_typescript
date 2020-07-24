"use strict";

import {Response, Request, NextFunction} from "express";
import passport from "passport";
import {jwtToken} from "../util/JWToken";

/*
@route
req.body : {

}
 */
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local-signUp", {session: false}, async(err, userId, info) => {
        if (err) {
            return next(err);
        }

        if (userId) {
            return res.send({
                success: true,
                token: await jwtToken.generateToken(userId)
            });
        }

        if (info.status) {
            res.status(info.status);
        }

        return res.send({
            success: false,
            message: info.message
        });
    })(req, res, next);
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local-signIn", {session: false}, async (err, email, info) => {
        if (err) {
            return next(err);
        }

        if (email) {
            return res.send({
                success: true,
                token: await jwtToken.generateToken(email)
            });
        }

        return res.status(401).send({
            success: false,
            message: info.message
        });
    })(req, res, next);
};

