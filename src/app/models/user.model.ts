import { v4 as uuidv4 } from 'uuid';

export class User {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    joinedCourses: Course[];

    constructor(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        joinedCourses: Course[] = [],
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

export interface Course {
    department: string;
    title: string;
    courseCode: string;
}

