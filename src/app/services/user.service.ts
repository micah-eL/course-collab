import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  // private baseUrl = "http://34.145.3.31:3002/api/";
  private baseUrl = "http://localhost:3002/api/"
  getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'users');
  }

  getUser(userID: string): Observable<any> {
    return this.http.get(this.baseUrl + `users/${userID}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl + 'users', user);
  }

  updateUser(userID: string, joinedCourses: string[]): Observable<any> {
    const body = joinedCourses; 
    return this.http.patch(this.baseUrl + `users/${userID}`, body);
  }

  deleteUser(userID: string): Observable<any> {
    return this.http.delete(this.baseUrl + `users/${userID}`);
  }
}
