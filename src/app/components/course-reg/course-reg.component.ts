import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-reg',
  templateUrl: './course-reg.component.html',
  styleUrls: ['./course-reg.component.css']
})
export class CourseRegComponent implements OnInit {
  courses: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    // manual add, still need to retrieve courses from sfu
    const exampleCourse = {
      code: 'CMPT',
      number: '372',
      name: 'Software Engineering',
    };

    this.courses.push(exampleCourse);
  }

  registerCourse(course: any) {
    // Logic to register for courses
    console.log('Registered for course:', course);
  }
}
