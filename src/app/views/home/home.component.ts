import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
studentList ;
  constructor() { }

  ngOnInit() {
    this.studentList = [{'name': 'student one', 'grade': 'A', 'CGPA': 90.09, 'Course': 'Science'},
    {'name': 'student two', 'grade': 'A', 'CGPA': 90.99, 'Course': 'Science'},
    {'name': 'student three', 'grade': 'A', 'CGPA': 80.09, 'Course': 'Science'},
    {'name': 'student four', 'grade': 'A', 'CGPA': 70.09, 'Course': 'Science'},
    {'name': 'student five', 'grade': 'A', 'CGPA': 60.09, 'Course': 'Science'}];
  }

}
