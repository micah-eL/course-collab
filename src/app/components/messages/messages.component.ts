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

  constructor() { }

  ngOnInit(): void {
    this.extractUrlParameters();
  }

  extractUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);

    // Decode the URL-encoded parameters
    this.title = decodeURIComponent(urlParams.get('title')!);
    this.text = decodeURIComponent(urlParams.get('text')!);
  }
}
