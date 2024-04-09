import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-reg',
  templateUrl: './course-reg.component.html',
  styleUrls: ['./course-reg.component.css']
})
export class CourseRegComponent implements OnInit {
  departments: any[] = [];
  departmentSelected: boolean = false;
  courses: any[] = [];
  searchResult: any[] = [];
  searchQuery: string = '';
  departmentCode : string = '';
  loggedInUserId: string = sessionStorage.getItem('loggedInUserId')!;
  private baseUrl = "http://localhost:3002/api";

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departmentSelected'] && !changes['departmentSelected'].firstChange) {
      this.clearSearch();
    }
  }

  loadDepartments() {
    const baseUrl = 'http://www.sfu.ca/bin/wcm/course-outlines';
    const year = '2024'
    const term = 'spring';
    const apiUrl = `${baseUrl}?${year}/${term}`;

    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.departments = data.filter(departments => departments.name);
        this.searchResult = this.departments;
      },
      (error) => {
        console.error('Error loading departments:', error);
      }
    );
  }

  loadCourses(department: any) {
      const baseUrl = 'http://www.sfu.ca/bin/wcm/course-outlines';
      const year = '2024'
      const term = 'spring';
      const departmentCode = department.value;    
  
      const apiUrl = `${baseUrl}?${year}/${term}/${departmentCode}`;
  
      this.http.get<any[]>(apiUrl).subscribe(
        (data) => {
          this.courses = data;
          this.departmentSelected = true;
          this.departmentCode = departmentCode;
          this.searchResult = this.courses;
        },
        (error) => {
          console.error('Error loading courses:', error);
        }
      );
  }

  registerCourse(course: any) {
    const registeredCourse = {
      department: this.departmentCode,
      title: course.title,
      courseCode: course.value
    };
  
    const userID = this.loggedInUserId;
  
    this.userService.getUser(userID).subscribe(
      (userData: any) => {
        const joinedCourses = userData.data.joinedCourses || []; 
        joinedCourses.push(registeredCourse);
        this.http.patch(`${this.baseUrl}/users/${userID}`, { joinedCourses }).subscribe(
          (data) => {
            console.log('User updated with registered course:', data);
            let message = `Successfully registered to ${registeredCourse.department.toUpperCase()}${registeredCourse.courseCode} - ${registeredCourse.title} course group`
            window.alert(message);
          },
          (error) => {
            console.error('Error updating user with registered course:', error);
          }
        );
      },
      (error) => {
        console.error('Error updating user with registered course:', error);
      } 
    );
  }

  search(searchQuery: string) {
    if (searchQuery.trim() !== '') {
        if (this.departmentSelected) {
            this.searchResult = this.courses.filter(course =>
                (this.departmentCode && this.departmentCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (course.value && course.value.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (course.title && course.title.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        } else {
            this.searchResult = this.departments.filter(department =>
                department.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                department.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    }
}

// TO DO: fix clear searh bar function 
  clearSearch() {
    this.searchQuery = '';
    if (this.departmentSelected){
        this.searchResult = this.courses;
    } else {
      this.searchResult = this.departments;
      console.log(this.searchQuery.length);
    }
  }

  goBacktoDepartment() {
      this.departmentSelected = false;
      this.searchResult = this.departments; 
  }

  goBackHome() {
    this.router.navigate(['/']);
  }

}
