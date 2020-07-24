import * as jwt from "jsonwebtoken";

class JWToken {
    generateToken = async (userKey: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            jwt.sign(
                {userKey: userKey}, // 토큰의 정보
                process.env.JWT_SECRET as string, // 비밀키
                {expiresIn: "30 minutes"}, // 30분 후에 만료되는 토큰
                (err: any, token: string) => {
                    if (!err) {
                        resolve(token);
                    } else {
                        reject(err);
                    }
                },
            );
        });
    }
}

export const jwtToken = new JWToken();