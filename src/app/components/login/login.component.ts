import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string = '';
    password: string = '';

    showLoginPage: boolean = true;

    constructor(private authService : AuthService, private router: Router) { }

    togglePageMode() {
        this.showLoginPage = !this.showLoginPage;
    }

    login() {
        this.authService.login(this.email, this.password).subscribe((result) => {
            if (result) {
                this.router.navigate(['/']);
            } else {
                console.log('Invalid email or password');
            }
        });
    }

    register() {
        this.authService.register(this.email, this.password).subscribe((result) => {
            if (result) {
                this.togglePageMode();
            } else {
                // Handle authentication error (show error message, etc.)
            }
        });
    }
}
