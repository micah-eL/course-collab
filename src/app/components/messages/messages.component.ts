import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UploadedFile } from 'src/app/models/uploaded-file.model';
import { AuthService } from 'src/app/services/auth.service';
import { Comment } from 'src/app/models/comment.model';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  title: string = '';
  text: string = '';
  firstName: string = '';
  lastName: string  = '';
  commentInput: string = ''; // Initialize comment input variable

  files: UploadedFile[] = [];
  stagedFile?: File;

  comments: Comment[] = [];

  loggedInUserId: string = sessionStorage.getItem('loggedInUserId')!;

  constructor(private userService: UserService, private elementRef: ElementRef) {this.loadFiles(); this.loadComments();}

  ngOnInit(): void {
    this.extractUrlParameters();
    this.getUserInfo();
  }

  getUserInfo(){
    this.userService.getUser(this.loggedInUserId)?.subscribe(
      res => {
        this.firstName = res.data.firstName;
        this.lastName  = res.data.lastName;
      },
      error => {
        console.error('Failed to fetch user:', error);
      }
  );
  }

  extractUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);

    // Decode the URL-encoded parameters
    this.title = decodeURIComponent(urlParams.get('title')!);
    this.text = decodeURIComponent(urlParams.get('text')!);
  }

  deleteComment(index: number): void{
    if (this.comments[index].uploadedBy === this.loggedInUserId) {
      this.comments.splice(index, 1);
      localStorage.setItem('comments', JSON.stringify(this.comments)); 
    }
    else {
        alert("You do not have permission to delete this file.");
    }
    
  }

  loadComments(): void {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      this.comments = JSON.parse(storedComments);
    }
  }

  submitComment(): void {
    if (this.commentInput === '') return;
    
    const newComment: Comment = {
      firstName: this.firstName,
      lastName: this.lastName,
      comment: this.commentInput,
      uploadedBy: this.loggedInUserId,
      courseId: this.title
    };
  
    this.comments.push(newComment);
    this.commentInput = '';
    this.saveComments(); 
  }

  saveComments(): void {
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }

  clearFileInput(): void {
    const fileInput = this.elementRef.nativeElement.querySelector('#fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  }
  
  onFileSelected(event: any): void {
    this.stagedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.stagedFile) {
        const newFile: UploadedFile = {
            id: uuidv4(),
            fileName: this.stagedFile.name,
            //temporary course id?
            courseId: this.title,
            uploadedBy: this.loggedInUserId,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.files.push(newFile);   
        this.saveFiles();           
        this.stagedFile = undefined; 
        this.clearFileInput();
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
