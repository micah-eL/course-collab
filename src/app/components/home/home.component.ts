import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import { User } from '../../models/user.model';
import { UploadedFile } from 'src/app/models/uploaded-file.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';

import { v4 as uuidv4 } from 'uuid';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    loggedInUserId: string = sessionStorage.getItem('loggedInUserId')!;
    constructor(private authService : AuthService, private userService : UserService, private router: Router) { this.loadFiles();}
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
              console.log(res.data);
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
    
    files: UploadedFile[] = [];
    stagedFile?: File;


    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }

    onFileSelected(event: any): void {
        this.stagedFile = event.target.files[0];
    }

    uploadFile(): void {
        if (this.stagedFile) {
            const newFile: UploadedFile = {
                id: uuidv4(),
                fileName: this.stagedFile.name,
                courseId: "TMP_COURSE_ID",
                uploadedBy: this.loggedInUserId,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            this.files.push(newFile);   
            this.saveFiles();           
            this.stagedFile = undefined; 
        }
    }

    deleteFile(index: number): void {
        if (this.files[index].uploadedBy === this.loggedInUserId) {
            this.files.splice(index, 1);
            this.saveFiles(); 
        }
        else {
            alert("You do not have permission to delete this file.");
        }
    }

    saveFiles(): void {
        localStorage.setItem('uploadedFiles', JSON.stringify(this.files));
    }

    loadFiles(): void {
        const savedFiles = localStorage.getItem('uploadedFiles');
        this.files = savedFiles ? JSON.parse(savedFiles).map((file: UploadedFile) => ({
            ...file,
            createdAt: file.createdAt ? new Date(file.createdAt) : undefined,
            updatedAt: file.updatedAt ? new Date(file.updatedAt) : undefined
        })) : [];
    }
}
