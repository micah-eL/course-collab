import { Component} from '@angular/core';
import { Router } from '@angular/router'; 

import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Course } from 'src/app/models/user.model';
import { User } from 'src/app/models/user.model';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent{
    loggedInUserId: string = sessionStorage.getItem('loggedInUserId')!;
    user: User | undefined;
    constructor(private authService : AuthService, private userService : UserService, private router: Router) {this.getUserInfo();}
    courses: Course[]= []
    
    getUserInfo(): void {
        this.userService.getUser(this.loggedInUserId).subscribe(
          (data: any) => {
            if (data && data.status === 'success') {
              this.user = data.data;
              this.courses = this.user!.joinedCourses
            }
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
    }
    
    unRegister(index: number): void{
        this.courses.splice(index, 1);
        this.userService.updateUser(this.loggedInUserId, this.courses).subscribe(
            (userData: any) => {
              console.log(this.courses);
              console.log(userData.joinedCourses)
            },
            (error) => {
              console.error('Error updating user with registered course:', error);
            } 
        );
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }
    
}
