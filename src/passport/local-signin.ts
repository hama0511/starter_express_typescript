import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {Request} from "express";
import md5 from "md5";
import {User} from "../models/table/user.model";

passport.use(
    "local-signIn",
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
            session: false,
        },
        async (req: Request, email: string, password: string, done: any) => {
            try {
                // 이메일을 통해 유저를 찾고,
                const user = await User.scope("all").findOne({
                    where: {"email": email}
                });
                if (user) {
                    // 비밀번호를 검증한 다음
                    const isValidPassword = user.password == md5(password);

                    // 비밀번호가 맞다면 유저를 다음 미들웨어로 넘기고
                    // 아니라면 에러를 보낸다.
                    return isValidPassword
                        ? done(null, user)
                        : done(null, false, {message: "wrong password"});
                }

                // 유저가 이메일을 통해 검색되지 않으면 잘못된 이메일 혹은 존재하지 않는 유저
                return done(null, false, {message: "wrong email"});
            } catch (error) {
                return done(error, false);
            }
        },
    ),
);