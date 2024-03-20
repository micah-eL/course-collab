import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user.model';


interface LoginResponse {
    status: string;
    data: User;
    token: string;
}

interface RegisterResponse {
    status: string;
    data: User;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = "http://localhost:3002/api/";

    constructor(private http: HttpClient) {
        this.http.get(this.baseUrl + "health").pipe(
            catchError((error) => {
                alert("The backend service is currently unavailable. Please try again later.");
                return of({ error: error });
            })
        ).subscribe((response: any) => {
            console.log(response);
        });
    }

    login(email: string, password: string): Observable<User> {
        console.log('Logging in with email=', email, ' and password=', password);
        return this.http.post<LoginResponse>(this.baseUrl + "auth/login", {email, password}).pipe(
            map(response => {
                if (response.status === 'success') {
                    console.log('User registered successfully');
                    sessionStorage.setItem('authToken', response.token);
                    console.log(response.data);
                    sessionStorage.setItem('loggedInUserId', response.data._id!);
                    return response.data;
                }
                else {
                    console.log('User registration failed');
                    return response.data;
                }
            })
        );
    }

    isAuthenticatedUser(): boolean {
        return sessionStorage.getItem('authToken') !== null;
    }
    
    logout(): void {
        console.log('Logging out user with auth_token=', sessionStorage.getItem('auth_token'));
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('loggedInUserId');
    }

    register(newUser: User): Observable<boolean> {
        console.log('Registering with email=', newUser.email, ', password=', newUser.password, ', firstName=', newUser.firstName, ', and lastName=', newUser.lastName);
        return this.http.post<RegisterResponse>(this.baseUrl + "users", newUser).pipe(
            map(response => {
                if (response.status === 'success') {
                    console.log('User registered successfully');
                    return true;
                }
                else {
                    console.log('User registration failed');
                    return false;
                }
            })
        );
    }
}
