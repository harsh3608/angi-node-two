import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/services/student.service';
import { Student } from '../shared/models/student-models';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit{
  students: Student[] = [];

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.studentService.GetAllStudents().subscribe(
      (res) => {
        this.students = res;
        console.log(this.students);
      }
    )
  }

}
