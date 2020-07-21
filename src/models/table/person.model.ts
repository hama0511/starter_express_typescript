import {Table, Column, Model, DefaultScope, Scopes, AllowNull} from "sequelize-typescript";
import {PersonSchema} from "../schema/PersonSchema";

@DefaultScope(()=>({
    //기본 쿼리에서 password를 제거하도록..
    //제거하지 않으면 클라이언트에 비밀번호가 노출될 수 있음.
    attributes: ["id", "name"]
}))
@Scopes(()=>({
    //패스워드 포함하여 쿼리하는 스코프
    all: {}
}))
@Table
export class Person extends Model<Person> implements PersonSchema {

    constructor(schema?: PersonSchema) {
        super(schema);
    }

    @AllowNull(false)
    @Column
    name: string;

    @Column
    birthday: Date;

    @Column
    password: string;

}