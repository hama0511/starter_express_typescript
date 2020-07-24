import {Response, Request, NextFunction} from "express";
import {jwtToken} from "../../util/jwt-token";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    let userKey = null;
    if (authHeader) {
        userKey = jwtToken.decodeAccessToken(authHeader);
    }

    if (!userKey) {
        return res.status(403).send({
            success: false,
            message: "권한이 없습니다."
        });
    }

    req.user = userKey;
    next();
};
