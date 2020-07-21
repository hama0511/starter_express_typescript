import {PersonSchema} from "../models/schema/PersonSchema";
import {Person} from "../models/table/person.model";

class PersonService {
    async createPerson(person: PersonSchema): Promise<Person> {
        const result: Person = await new Person({
            name: person.name,
            password: person.password,
            birthday: person.birthday
        }).save();
        return result;
    };
}

export const personService = new PersonService();