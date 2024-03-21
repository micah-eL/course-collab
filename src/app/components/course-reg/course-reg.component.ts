import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-reg',
  templateUrl: './course-reg.component.html',
  styleUrls: ['./course-reg.component.css']
})
export class CourseRegComponent implements OnInit {
  // courses: any[] = [];

  // TO BE CHANGED: manual add, still need to retrieve courses from sfu
  courses: any[] = [   
  { code: 'CMPT', number: '372', name: 'Software Engineering' },
  { code: 'BUS', number: '101', name: 'Introduction to Business' },
  { code: 'ENG', number: '201', name: 'English Literature' }
]
  searchResult: any[] = [];
  searchQuery: string  = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    //initially display all data on the courses until any query inserted on the search bar
    this.searchResult = this.courses;
  }

  registerCourse(course: any) {
    // Logic to register for courses
    console.log('Registered for course:', course);
  }

  searchCourses(searchQuery: string) {
    if (searchQuery.trim() !== '') {
      this.searchResult = this.courses.filter(course =>
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      this.searchResult = this.courses;
    }
  }


  clearSearch() {
    this.searchQuery = '';
    this.searchResult = this.courses;
  }

}
