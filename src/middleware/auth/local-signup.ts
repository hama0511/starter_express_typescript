import passport from "passport";
import {IVerifyOptions, Strategy as LocalStrategy} from "passport-local"; // auth-local 전략
import { Request } from "express";
import md5 from "md5";
import {User} from "../../models/table/user.model";
import {userService} from "../../service/user.service";

passport.use(
    "local-signUp", // 각 전략마다 이름을 지어줄 수 있습니다. 만약 생략한다면 local이라는 이름을 사용하게 됩니다.
    new LocalStrategy(
        {
            usernameField: "email", // 우리는 username 대신에 email을 사용합니다.
            passReqToCallback: true, // req 객체를 callback 함수에 넘깁니다.
            session: false, // 세션은 따로 사용하지 않습니다.
        },
        async (req: Request, email: string, password: string, done) => {
            try {
                // const test: IVerifyOptions = {
                //     message: "",
                //     status: 409
                // };
                const user = await User.findOne({
                    where: {"email": email}
                });
                if (user) {
                    return done(null, false, {
                        message: "user exists!",
                        status: 409
                    } as IVerifyOptions);
                }

                const { name } = req.body;

                const newUser = await userService.createUser({
                    birthday: undefined,
                    email: email,
                    name: name,
                    password: md5(password)
                });
                return done(null, newUser.id);
            } catch (error) {
                return done(error, false);
            }
        },
    ),
);