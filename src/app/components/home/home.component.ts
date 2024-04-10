import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/user.model';
import { UploadedFile } from 'src/app/models/uploaded-file.model';
import { AuthService } from '../../services/auth.service';

import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    loggedInUserId: string = sessionStorage.getItem('loggedInUserId')!;
    
    files: UploadedFile[] = [];
    selectedFile?: File;

    constructor(private authService : AuthService, private router: Router, private http: HttpClient) {
        this.loadFiles();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
    }

    uploadFile(): void {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append('file', this.selectedFile, this.selectedFile.name);
            formData.append('course', 'cmpt-372');
            formData.append('semester', 'spring-2024');
            formData.append('uploadedBy', this.loggedInUserId);
            formData.append('createdAt', new Date().toISOString());
       
            this.selectedFile = undefined; 
            this.http.post('http://localhost:3003/api/upload', formData).subscribe({
                next: (response) => console.log('Upload successful', response),
                error: (error) => console.error('Upload error', error)
            });
        } else {
            console.error('No file selected');
        }
    }

    deleteFile(index: number): void {
        // TODO: use response[index].metadata.uploadedBy where response[index] is the file you want (response is result of getFiles())
        if (this.files[index].uploadedBy === this.loggedInUserId) { 
            this.files.splice(index, 1);
            this.saveFiles(); 
        }
        else {
            alert("You do not have permission to delete this file.");
        }
    }

    saveFiles(): void {
        // TODO
        localStorage.setItem('uploadedFiles', JSON.stringify(this.files));
    }

    // Call downloadFile(): `this.downloadFile("cmpt-372", "spring-2024", "tmp2.txt");`
    private getFile(filePath: string): Observable<Blob> {
        return this.http.post<Blob>(`http://localhost:3003/api/download`, { filePath: filePath }, { responseType: 'blob' as 'json' });
    }
    downloadFile(course: string, semester: string, filename: string) {
        this.getFile(course + "/" + semester + "/" + filename).subscribe({
            next: (data: Blob) => {
                const blob = new Blob([data]);
                
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = filename; 
                document.body.appendChild(a);
                a.click();
                
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            },
            error: (error) => console.error('Error downloading the file:', error)
        });
    }

    getFiles() {
        this.http.post(`http://localhost:3003/api/files`, {course: 'cmpt-372', semester: 'spring-2024', responseType: 'blob'}).subscribe({
            next: (response) => {
                console.log('Download successful', response);
            },
            error: (error) => console.error('Download error', error)
        });
    }

    loadFiles(): void {
        // TODO
        const savedFiles = localStorage.getItem('uploadedFiles');
        this.files = savedFiles ? JSON.parse(savedFiles).map((file: UploadedFile) => ({
            ...file
        })) : [];
    }
}
