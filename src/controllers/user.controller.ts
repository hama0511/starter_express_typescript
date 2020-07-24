"use strict";

import {Response, Request, NextFunction} from "express";
import passport from "passport";
import {paramUtil} from "../util/param";
import {jwtToken} from "../util/jwt-token";

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
                data: {
                    accessToken: await jwtToken.generateAccessToken(userId),
                    refreshToken: await jwtToken.generateRefreshToken(userId)
                }
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

/*

 */
export const getToken = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local-signIn", {session: false}, async (err, userId, info) => {
        if (err) {
            return next(err);
        }

        if (userId) {
            return res.send({
                success: true,
                data: {
                    accessToken: await jwtToken.generateAccessToken(userId),
                    refreshToken: await jwtToken.generateRefreshToken(userId)
                }
            });
        }

        return res.status(401).send({
            success: false,
            message: info.message
        });
    })(req, res, next);
};

/*
 req.data = JSON ({
 ..refreshToken: string
 })
 res.data : {
 ..accessToken: string
 ..refreshToken: string
 }
*/
export const tokenRefresh = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.body.refreshToken;
    if (!paramUtil.checkParam(refreshToken)) {
        return res.status(400).send({
            success: false,
            message: "잘못된 요청입니다."
        });
    }

    const userId = jwtToken.decodeRefreshToken(refreshToken);
    if (!userId) {
        return res.status(403).send({
            success: false,
            message: "권한이 없습니다."
        });
    }

    return res.send({
        success: true,
        data: {
            accessToken: await jwtToken.generateAccessToken(userId),
            refreshToken: await jwtToken.generateRefreshToken(userId)
        }
    });
};

/*
 req.data = JSON ({
 })
 res.data : {
 }
*/
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!paramUtil.checkParam([req.body.user22444])) {
        return res.status(400).send({
            success: false,
            message: "잘못된 요청입니다."
        });
    }

    const userKey = req.user;
    return res.send({
        success: true,
        data: {
            userKey: userKey
        }
    });
};