import {Table, Column, Model, DefaultScope, Scopes, AllowNull, PrimaryKey, ForeignKey} from "sequelize-typescript";
import {UserSchema} from "../schema/user.schema";

@DefaultScope(()=>({
    //기본 쿼리에서 password를 제거하도록..
    //제거하지 않으면 클라이언트에 비밀번호가 노출될 수 있음.
    attributes: ["email", "name"]

}))
@Scopes(()=>({
    //패스워드 포함하여 쿼리하는 스코프
    all: {}
}))
@Table
export class User extends Model<User> implements UserSchema {
    constructor(schema?: UserSchema) {
        super(schema);
    }

    @AllowNull(false)
    @Column
    email: string;

    @AllowNull(false)
    @Column
    name: string;

    @Column
    birthday: Date;

    @Column
    password: string;
}