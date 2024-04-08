import { v4 as uuidv4 } from 'uuid';

export class User {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    joinedCourses: string[];

    constructor(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        joinedCourses: string[] = [],
        _id: string = uuidv4()
    ) 
    {
        this._id = _id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.joinedCourses = joinedCourses;
    }
}
