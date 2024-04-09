import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Course } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:3002/api/"

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(userID: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + `users/${userID}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'users', user);
  }

  updateUser(userID: string, joinedCourses: Course[]): Observable<User> {
    const body = { joinedCourses }; // Wrap joinedCourses in an object
    return this.http.patch<User>(this.baseUrl + `users/${userID}`, body);
  }

  deleteUser(userID: string): Observable<any> {
    return this.http.delete(this.baseUrl + `users/${userID}`);
  }
}