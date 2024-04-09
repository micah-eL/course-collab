import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User | undefined;
  userID: string = '';


  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.userID = params['userID']; // Get userID from route params
      this.getUserInfo();
    });
  }

  getUserInfo(): void {
    this.userService.getUser(this.userID).subscribe(
      (data: any) => {
        if (data && data.status === 'success') {
          this.user = data.data;
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  

}
