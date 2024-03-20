import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    loggedInUserId: string = localStorage.getItem('loggedInUserId')!;

    constructor(private authService : AuthService, private router: Router) { }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }
}
