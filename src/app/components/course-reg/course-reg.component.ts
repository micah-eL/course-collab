import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDepartments();
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
    // Logic to register for courses
    console.log('Registered for course:', course);
  }

  searchCourses(searchQuery: string) {
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
    } else {
        this.searchResult = this.departmentSelected ? this.courses : this.departments;
    }
}

  clearSearch() {
    this.searchQuery = '';
    this.searchResult = this.courses;
  }

  goBack() {
      this.departmentSelected = false;
      this.searchResult = this.departments; 
  }

}
