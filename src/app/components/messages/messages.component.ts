import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
  loggedInUserId: string = '';
  
  constructor(private userService: UserService) {}
  ngOnInit(): void{
    this.loggedInUserId = sessionStorage.getItem('loggedInUserId') || '';
  }
  saveFile() {
    
  }
}
