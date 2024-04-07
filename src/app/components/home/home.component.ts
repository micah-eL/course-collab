import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

import { User } from '../../models/user.model';
import { UploadedFile } from 'src/app/models/uploaded-file.model';
import { AuthService } from '../../services/auth.service';

import { v4 as uuidv4 } from 'uuid';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    loggedInUserId: string = sessionStorage.getItem('loggedInUserId')!;
    
    files: UploadedFile[] = [];
    stagedFile?: File;

    constructor(private authService : AuthService, private router: Router) {
        this.loadFiles();
    }

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
