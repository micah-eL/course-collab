import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    loggedInUserId: string = sessionStorage.getItem('loggedInUserId')!;
    constructor(private authService : AuthService, private router: Router) { }
    //User's course data (remember to link to courses)
    private courses = [{
        title: '',
        text: '',
    }]
    //Loads the courses of the user
    ngOnInit(): void {

        // const cardContainer = document.getElementById('cardContainer') as HTMLElement;
        // this.courses.forEach(item => {
        //     const cardElement = document.createElement('div');
        //     cardElement.innerHTML = this.generateCard(item.title, item.text);
        //     cardContainer.appendChild(cardElement);
        // })
    }
    //Dynamically generate cards
    generateCard(title: String, text: String) {
        return `
            <div class="col">
                <div class="card shadow" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${text}</p>
                        <a href="#" class="btn btn-primary">Go</a>
                    </div>
                </div>
            </div>
        `;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }
}
