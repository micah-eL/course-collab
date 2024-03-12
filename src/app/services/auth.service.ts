import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user.model';


interface AuthResponse {
    status: string;
    data: User;
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }

    login(email: string, password: string): Observable<boolean> {
        console.log('Logging in with email=', email, ' and password=', password);

        if (email === 'test_user@sfu.ca' && password === 'testpass') {
            const authToken = 'abcdefg.hijklmn.opqrstuv'; // Generate or receive the actual token from course-collab-auth service
            localStorage.setItem('auth_token', authToken);
            return of(true);
        } 
        else {
            return of(false);
        }
    }

    isAuthenticatedUser(): boolean {
        return localStorage.getItem('auth_token') !== null;
    }
    
    logout(): void {
        console.log('Logging out user with auth_token=', localStorage.getItem('auth_token'));
        localStorage.removeItem('auth_token');
    }

    register(email: string, password: string): Observable<boolean> {
        console.log('Registering with email=', email, ' and password=', password);

        return of(true);
    }
}
