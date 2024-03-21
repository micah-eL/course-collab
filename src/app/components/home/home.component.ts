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
                        <a class="icon-link icon-link-hover" href="#">
                        Course Page
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                        </svg>
                      </a>
                      <a class="icon-link" href="#">
                        Discussion
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-text" viewBox="0 0 16 16">
                          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                          <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                        </svg>
                      </a>
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
