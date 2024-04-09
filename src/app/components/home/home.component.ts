import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    loggedInUserId: string = sessionStorage.getItem('loggedInUserId')!;
    constructor(private authService : AuthService, private userService : UserService, private router: Router) {}
    //User's course data (remember to link to courses)
    private courses = [{
        department: 'CMPT',
        title: 'Introduction to Programming II',
        value: '125'
    }]
    //Loads the courses of the user
    ngOnInit(): void {
        this.populateCourses();
    }
    populateCourses() {
        this.userService.getUser(this.loggedInUserId)?.subscribe(
            res => {
              this.courses = res.data.joinedCourses;

              const cardContainer = document.getElementById('courseContainer') as HTMLElement;
              this.courses.forEach(item => {
                  const cardElement = document.createElement('div');
                  cardElement.className = 'col';
                  cardElement.innerHTML = this.generateCard(item.department + " " + item.value, item.title);
                  cardContainer.appendChild(cardElement);
              })
            },
            error => {
              console.error('Failed to fetch user:', error);
            }
        );
    }

    //Dynamically generate cards
    generateCard(title: String, text: String) {
        return `
            <div class="card shadow mb-3" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${text}</p>
                    <a class="icon-link icon-link-hover" href="/messages?title=${title}&text=${text}">
                    Course Page
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg>
                    </a>
                </div>
            </div>
        `;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }
    
}
