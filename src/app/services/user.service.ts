import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = "http://localhost:3002/api/";
    // "http://34.145.3.31:3002/api/";

    constructor(private http: HttpClient){}

    getUser(userID: string): Observable<User>{
        return this.http.get<User>(this.baseUrl+userID).pipe(
            catchError((error: any) => {
              return throwError(error.error || 'Server error');
            })
        );
    }

    updateUser(user: User): Observable<User> {
        return this.http.patch<User>(this.baseUrl + user._id, user).pipe(
          catchError((error: any) => {
            return throwError(error.error || 'Server error');
          })
        );
      }
    
      deleteUser(userID: string): Observable<any> {
        return this.http.delete<any>(this.baseUrl + userID).pipe(
          catchError((error: any) => {
            return throwError(error.error || 'Server error');
          })
        );
      }
}