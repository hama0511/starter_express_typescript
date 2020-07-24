import {User} from "../models/table/user.model";
import {UserSchema} from "../models/schema/user.schema";

class UserService {
    async createUser(user: UserSchema): Promise<User> {
        const result: User = await new User(user).save();
        return result;
    };
}

export const userService = new UserService();