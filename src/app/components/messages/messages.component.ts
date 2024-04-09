import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

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
  comments = [{
    firstName: 'Missing',
    lastName: 'Missing',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id tellus et magna ultricies congue gravida eu lacus. Praesent in nunc urna.'
  }]
  loggedInUserId: string = sessionStorage.getItem('loggedInUserId')!;
  constructor(private userService: UserService) { }

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
  submitComment() {
    if(this.commentInput == '') return;
    this.comments.push({
      firstName: this.firstName,
      lastName: this.lastName,
      comment: this.commentInput 
    });
    this.commentInput = '';
  }
  
  extractUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);

    // Decode the URL-encoded parameters
    this.title = decodeURIComponent(urlParams.get('title')!);
    this.text = decodeURIComponent(urlParams.get('text')!);
  }
}
