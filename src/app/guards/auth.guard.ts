import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private router: Router, private authService : AuthService,) { }

    canActivate() {
        if (!this.authService.isAuthenticatedUser()) {
            console.log('User is not authenticated. Redirecting to login page.');
            this.router.navigate(['login']);
        }
        return true;
    }
}